import { Cat, CatWithoutId, errorCat } from "../domain/Cat";
import { create } from "zustand";
import {
    makeAddCall, makeAllCall, makeCountCall, makeDeleteCall, makeGetByIdCall, makeGetToysPerCatCall,
    makeGetUsersFavoriteBreedCall, makeUpdateCall, makeGetUserRoleNameCall, makeGetAllUsersCall,
    makeGetOthersRoleNameCall, makeAddUserCall, makeDeleteUserCall, makeUpdateUserRoleCall,
    makeUpdateUserNameCall, makeAgeDistributionCall
} from "../api/CatsApi";
import { User, UserToBeCreated } from "../domain/User";

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

interface useCatStoreProps {
    catsOnPage: Cat[],
    fetch: (sortByNameDirection: string, page: number) => void,
    fetchLastPageAndSortDirection: () => void,
    getCount: () => Promise<number>,
    addCat: (cat: CatWithoutId, token: string) => void,
    deleteCat: (id: number, token: string) => void,
    updateCat: (id: number, newCat: Cat, token: string) => void,
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
    fetchAgeDistribution: () => void
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
                        { id: operation.id, name: operation.cat.name, age: operation.cat.age, weight: operation.cat.weight },
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
            console.log('store token=' + JSON.stringify(token));
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
                    console.log('will add delete to pending. response status: ' + JSON.stringify(response["status"]));

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
            makeUpdateCall(id, newCat, token).then((response) => {
                if (response === undefined) {
                    pendingOperations.push({ type: updateOperationCode, id: id, cat: newCat, token: token });
                    console.log('pending operations: ' + JSON.stringify(pendingOperations));
                }

                get().fetch(lastSortDirection, lastFetchedPage);
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
            console.log('store token=' + JSON.stringify(token));
            makeAddUserCall(user, token);
        },
        deleteUser: (userId, token) => {
            console.log('store token=' + JSON.stringify(token));
            makeDeleteUserCall(userId, token);
        },
        updateUserRole: (userId, newRole, token) => {
            console.log('store token=' + JSON.stringify(token));
            makeUpdateUserRoleCall(userId, newRole, token);
        },
        updateUserName: (userId, newName, token) => {
            console.log('store token=' + JSON.stringify(token));
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
    }
});
