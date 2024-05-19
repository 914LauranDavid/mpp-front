import { Cat, CatWithoutId, errorCat } from "../domain/Cat";
import { create } from "zustand";
import { makeAddCall, makeAllCall, makeCountCall, makeDeleteCall, makeGetByIdCall, makeGetToysPerCatCall, makeGetUsersFavoriteBreedCall, makeUpdateCall } from "../api/CatsApi";
import { Server } from "socket.io";
import { Toy } from "../domain/Toy";

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
    cat: CatWithoutId
};

export interface CatNumberPair {
    cat: Cat,
    theNumber: number
}

interface useCatStoreProps {
    catsOnPage: Cat[],
    fetch: (sortByNameDirection: string, page: number) => void,
    fetchLastPageAndSortDirection: () => void,
    getCount: () => Promise<number>,
    addCat: (cat: CatWithoutId) => void,
    deleteCat: (id: number) => void,
    updateCat: (id: number, newCat: Cat) => void,
    getCatById: (id: number) => Promise<Cat>,
    isServerDown: boolean,
    getPendingOperations: () => UserOperation[],
    getToysPerCat: (count: number) => Promise<CatNumberPair[]>,
    getUsersFavoriteBreed: (userId: string, token: string) => Promise<string>
}


export const useCatStore = create<useCatStoreProps>((set, get) => {
    const processPendingOperations = () => {
        console.log('will process the pending operations now');
        
        let pendingOperationsCopy: UserOperation[] = JSON.parse(JSON.stringify(pendingOperations));
        pendingOperations = [];

        pendingOperationsCopy.forEach((operation) => {
            switch (operation.type) {
                case addOperationCode:
                    get().addCat(operation.cat);
                    break;
                case updateOperationCode:
                    get().updateCat(
                        operation.id,
                        { id: operation.id, name: operation.cat.name, age: operation.cat.age, weight: operation.cat.weight }
                    );
                    break;
                case deleteOperationCode:
                    get().deleteCat(operation.id);
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
        addCat: (newCat: CatWithoutId) => {
            makeAddCall(newCat).then((response) => {
                if (response === undefined) {
                    pendingOperations.push({ type: addOperationCode, id: 0, cat: newCat });
                    console.log('pending operations: ' + JSON.stringify(pendingOperations));
                }

                get().fetch(lastSortDirection, lastFetchedPage);
            });
        },
        deleteCat: (id: number) => {
            makeDeleteCall(id).then((response) => {
                if (response === undefined) {
                    pendingOperations.push({ type: deleteOperationCode, id: id, cat: errorCat });
                    console.log('pending operations: ' + JSON.stringify(pendingOperations));
                }

                get().fetch(lastSortDirection, lastFetchedPage);
            });
        },
        updateCat: (id: number, newCat: Cat) => {
            makeUpdateCall(id, newCat).then((response) => {
                if (response === undefined) {
                    pendingOperations.push({ type: updateOperationCode, id: id, cat: newCat });
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
        }
    }
});
