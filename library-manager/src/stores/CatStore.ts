import { Cat, CatWithoutId, errorCat } from "../domain/Cat";
import { create } from "zustand";
import {
    makeAddCall, makeAllCall, makeCountCall, makeDeleteCall, makeGetByIdCall, makeGetToysPerCatCall,
    makeGetUsersFavoriteBreedCall, makeUpdateCall, makeGetUserRoleNameCall, makeGetAllUsersCall,
    makeGetOthersRoleNameCall, makeAddUserCall, makeDeleteUserCall, makeUpdateUserRoleCall,
    makeUpdateUserNameCall, makeAgeDistributionCall, makeGetUserMoneyCall, makeGetMyCatsCall,
    makeBuyCatCall, makeProcessBoughtMoneyCall, makeUpdateCatCuteness, makeGetQuizQuestionsCall,
    makeGetLeaderbordCall, makeSetCatAvatarCall, makeGetMyCutestCatCall
} from "../api/CatsApi";
import { User, UserToBeCreated } from "../domain/User";
import { CatQuizQuestion } from "../components/cats/OwnedCatDetails";

let lastFetchedPage = 0;
let lastSortDirection = "asc";
let pendingOperations: UserOperation[] = [];

let cachedCats: Cat[] = [];

let addOperationCode = 1;
let updateOperationCode = 2;
let deleteOperationCode = 3;
interface UserOperation {
    type: number,
    id: number,
    cat: CatWithoutId,
    token: string
};

export interface CatNumberPair {
    cat: Cat,
    theNumber: number
}

export interface AgeAndCount {
    age: number,
    count: number
}

export interface UserNameTotalCutenessPair {
    userName: string,
    totalCuteness: number
}

interface useCatStoreProps {
    catsOnPage: Cat[],
    fetch: (sortByNameDirection: string, page: number) => void,
    fetchLastPageAndSortDirection: () => void,
    getCount: () => Promise<number>,
    addCat: (cat: CatWithoutId, token: string) => void,
    deleteCat: (id: number, token: string) => void,
    updateCat: (id: number, newCat: Cat, token: string) => Promise<boolean>,
    getCatById: (id: number) => Promise<Cat>,
    isServerDown: boolean,
    getPendingOperations: () => UserOperation[],
    getToysPerCat: (count: number) => Promise<CatNumberPair[]>,
    getUsersFavoriteBreed: (userId: string, token: string) => Promise<string>,
    getUserRoleName: (token: string) => Promise<string>,
    getAllUsers: (token: string) => Promise<User[]>,
    addUser: (user: UserToBeCreated, token: string) => void,
    deleteUser: (email: string, token: string) => void,
    updateUserRole: (userId: string, newRole: string, token: string) => void,
    updateUserName: (userId: string, newName: string, token: string) => void,
    ageDistribution: AgeAndCount[],
    fetchAgeDistribution: () => void,
    getUserMoney: (token: string) => Promise<number>,
    getMyCats: (token: string) => Promise<Cat[]>,
    buyCat: (catId: number, token: string) => void,
    processBoughtMoney: (token: string) => void,
    updateCatCuteness: (catId: number, newCuteness: number) => Promise<Boolean>,
    getQuizQuestions: () => Promise<CatQuizQuestion[]>,
    getLeaderboard: () => Promise<UserNameTotalCutenessPair[]>,
    setCatAvatar: (catId: number, prompt: string, token: string) => Promise<string>,
    getMyCutestCat: (token: string) => Promise<Cat>
}


export const useCatStore = create<useCatStoreProps>((set, get) => {
    const processPendingOperations = () => {
        console.log('will process the pending operations now');

        let pendingOperationsCopy: UserOperation[] = JSON.parse(JSON.stringify(pendingOperations));
        pendingOperations = [];

        pendingOperationsCopy.forEach((operation) => {
            switch (operation.type) {
                case addOperationCode:
                    get().addCat(operation.cat, operation.token);
                    break;
                case updateOperationCode:
                    get().updateCat(
                        operation.id,
                        {
                            id: operation.id, name: operation.cat.name, age: operation.cat.age, weight: operation.cat.weight,
                            cuteness: operation.cat.cuteness, ownerId: operation.cat.ownerId, avatarUrl: operation.cat.avatarUrl
                        },
                        operation.token
                    );
                    break;
                case deleteOperationCode:
                    get().deleteCat(operation.id, operation.token);
                    break;
            }
        });
    }

    return {
        catsOnPage: [],
        fetch: (sortByNameDirection: string, page: number) => {
            if (page === 0)
                return;

            lastFetchedPage = page;
            lastSortDirection = sortByNameDirection;

            return makeAllCall(sortByNameDirection, page).then(result => {
                set(() => ({ catsOnPage: result }));

                if (result.length === 1 && result[0] === errorCat) {
                    console.log(`catStore: makeAll returned error`);
                    set(({ isServerDown: true }));
                    set(() => ({ catsOnPage: cachedCats }));
                } else {
                    set(({ isServerDown: false }));
                    cachedCats = JSON.parse(JSON.stringify(result));
                    processPendingOperations();
                }
            });
        },
        fetchLastPageAndSortDirection: () => {
            get().fetch(lastSortDirection, lastFetchedPage);
        },
        getCount: () => {
            return makeCountCall();
        },
        getCatById: (id: number) => {
            return makeGetByIdCall(id);
        },
        addCat: (newCat: CatWithoutId, token: string) => {
            console.log('entered store addCat');
            makeAddCall(newCat, token).then((response) => {
                if (response === undefined) {
                    pendingOperations.push({ type: addOperationCode, id: 0, cat: newCat, token: token });
                    console.log('pending operations: ' + JSON.stringify(pendingOperations));
                }

                get().fetch(lastSortDirection, lastFetchedPage);
            });
        },
        deleteCat: (id: number, token: string) => {
            makeDeleteCall(id, token).then((response) => {
                if (response === undefined || response.code === "ERR_NETWORK") {
                    console.log('will add delete to pending. response: ' + JSON.stringify(response));

                    pendingOperations.push({ type: deleteOperationCode, id: id, cat: errorCat, token: token });
                    console.log('pending operations: ' + JSON.stringify(pendingOperations));
                } else if (response.code === "ERR_BAD_REQUEST") {
                    alert('You wont delete this cat, she/he has toys');
                }
                else {
                    console.log('deleted response: ' + JSON.stringify(response));
                }

                get().fetch(lastSortDirection, lastFetchedPage);
            }).catch();
        },
        updateCat: (id: number, newCat: Cat, token: string) => {
            return makeUpdateCall(id, newCat, token).then((response) => {
                if (response === undefined) {
                    pendingOperations.push({ type: updateOperationCode, id: id, cat: newCat, token: token });
                    console.log('pending operations: ' + JSON.stringify(pendingOperations));
                    return false;
                }

                get().fetch(lastSortDirection, lastFetchedPage);
                return response;
            });
        },
        isServerDown: false,
        getPendingOperations: () => {
            return pendingOperations;
        },
        getToysPerCat: (count) => {
            return makeGetToysPerCatCall(count);
        },
        getUsersFavoriteBreed: (userId, token) => {
            return makeGetUsersFavoriteBreedCall(userId, token);
        },
        getUserRoleName: (token) => {
            return makeGetUserRoleNameCall(token);
        },
        getAllUsers: async (token) => {
            const allUsersRaw = await makeGetAllUsersCall(token);
            const allUsers = [];

            for (let rawUser of allUsersRaw) {
                const roleName = await makeGetOthersRoleNameCall(rawUser.user_id.substring(6, rawUser.user_id.length), token);
                allUsers.push({ name: rawUser.name, email: rawUser.email, role: roleName, id: rawUser.user_id });
            }

            return allUsers;
        },
        addUser: (user, token) => {
            makeAddUserCall(user, token);
        },
        deleteUser: (userId, token) => {
            makeDeleteUserCall(userId, token);
        },
        updateUserRole: (userId, newRole, token) => {
            makeUpdateUserRoleCall(userId, newRole, token);
        },
        updateUserName: (userId, newName, token) => {
            makeUpdateUserNameCall(userId, newName, token);
        },
        ageDistribution: [],
        fetchAgeDistribution: () => {
            return makeAgeDistributionCall().then(result => {
                set(() => ({ ageDistribution: result }));

                if (result.length === 1 && result[0] === errorCat) {
                    console.log(`catStore: makeAgeDistributionCall returned error`);
                    set(({ isServerDown: true }));
                    // set(() => ({ catsOnPage: cachedCats }));
                } else {
                    set(({ isServerDown: false }));
                    // cachedCats = JSON.parse(JSON.stringify(result));
                    processPendingOperations();
                }
            });
        },
        getUserMoney: (token) => {
            return makeGetUserMoneyCall(token);
        },
        getMyCats: async (token) => {
            return makeGetMyCatsCall(token);
        },
        buyCat: async (catId, token) => {
            console.log('store buy cat');
            return makeBuyCatCall(catId, token);
        },
        processBoughtMoney: async (token) => {
            console.log('store process bought money');
            return makeProcessBoughtMoneyCall(token);
        },
        updateCatCuteness: async (catId, newCuteness) => {
            console.log(`store update cuteness: ${catId}, ${newCuteness}`);
            return makeUpdateCatCuteness(catId, newCuteness);
        },
        getQuizQuestions: async () => {
            const questions = makeGetQuizQuestionsCall();
            console.log('store got these questions: ' + JSON.stringify(questions));
            return questions;
        },
        getLeaderboard: async () => {
            return makeGetLeaderbordCall();
        },
        setCatAvatar: async (catId, prompt, token) => {
            console.log(`setcatavatar: id=${catId}, prompt=${prompt}`);
            return makeSetCatAvatarCall(catId, prompt, token);
        },
        getMyCutestCat: async (token) => {
            // return { id: 1, name: 'test', age: 5, weight: 5, cuteness: 70, ownerId: 'aa' };
            return makeGetMyCutestCatCall(token);
        }
    }
});
