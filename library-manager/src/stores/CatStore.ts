import { Cat, CatWithoutId, errorCat } from "../domain/Cat";
import { create } from "zustand";
import { makeAddCall, makeAllCall, makeCountCall, makeDeleteCall, makeGetByIdCall, makeUpdateCall } from "../api/CatsApi";
import { Server } from "socket.io";

let lastFetchedPage = 0;
let lastSortDirection = "asc";

interface useCatStoreProps {
    catsOnPage: Cat[],
    fetch: (sortByNameDirection: string, page: number) => void,
    fetchLastPageAndSortDirection: () => void,
    getCount: () => Promise<number>,
    addCat: (cat: CatWithoutId) => void,
    deleteCat: (id: number) => void,
    updateCat: (id: number, newCat: Cat) => void,
    getCatById: (id: number) => Promise<Cat>,
    isServerDown: boolean
}


export const useCatStore = create<useCatStoreProps>((set, get) => (
    {
        catsOnPage: [],
        fetch: (sortByNameDirection: string, page: number) => {
            lastFetchedPage = page;
            lastSortDirection = sortByNameDirection;

            return makeAllCall(sortByNameDirection, page).then(result => {
                set(() => ({ catsOnPage: result }));

                if (result.length === 1 && result[0] === errorCat) {
                    console.log(`catStore: makeAll returned error`);
                    set(({ isServerDown: true }));
                } else {
                    set(({ isServerDown: false }));
                }
            });
        },
        fetchLastPageAndSortDirection : () => {
            get().fetch(lastSortDirection, lastFetchedPage);
        },
        getCount: () => {
            return makeCountCall();
        },
        getCatById: (id: number) => {
            return makeGetByIdCall(id);
        },
        addCat: (newCat: CatWithoutId) => {
            makeAddCall(newCat).then(() => get().fetch(lastSortDirection, lastFetchedPage));
        },
        deleteCat: (id: number) => {
            makeDeleteCall(id).then(() => get().fetch(lastSortDirection, lastFetchedPage));
        },
        updateCat: (id: number, newCat: Cat) => {
            makeUpdateCall(id, newCat).then(() => get().fetch(lastSortDirection, lastFetchedPage));
        },
        isServerDown: false
    }));
