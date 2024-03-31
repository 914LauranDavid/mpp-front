import { Cat, CatWithoutId } from "../domain/Cat";
import { create } from "zustand";
import { makeAddCall, makeAllCall, makeCountCall, makeDeleteCall, makeGetByIdCall, makeUpdateCall } from "../api/CatsApi";

let lastFetchedPage = 0;
let lastSortDirection = "asc";

interface useCatStoreProps {
    catsOnPage: Cat[],
    fetch: (sortByNameDirection: string, page: number) => void,
    getCount: () => Promise<number>,
    addCat: (cat: CatWithoutId) => void,
    deleteCat: (id: number) => void,
    updateCat: (id: number, newCat: Cat) => void,
    getCatById: (id: number) => Promise<Cat>
}

export const useCatStore = create<useCatStoreProps>((set, get) => ({
    catsOnPage: [],
    fetch: (sortByNameDirection: string, page: number) => {
        lastFetchedPage = page;
        lastSortDirection = sortByNameDirection;

        makeAllCall(sortByNameDirection, page).then(result => {
            set(() => ({ catsOnPage: result }))
        });

        // axios
        //     .get("http://localhost:3000/cats/all?sortByNameDirection=" + sortByNameDirection + "&page=" + page)
        //     .then(({ data }) => {
        //         set(() => ({ catsOnPage: data }));
        //     })
        //     .catch((error) => {
        //         set(() => ({ catsOnPage: [] }));
        //         console.log("Error fetching cats: " + error);
        //     });
    },
    getCount: () => {
        return makeCountCall();

        // return axios
        //     .get("http://localhost:3000/cats/count")
        //     .then(({ data }) => {
        //         return data.count as number;
        //     })
        //     .catch((error) => {
        //         console.log("Error getting count: " + error);
        //         return 0;
        //     });
    },
    getCatById: (id: number) => {
        return makeGetByIdCall(id);

        // return axios
        //     .get("http://localhost:3000/cats/get-by-id/" + id)
        //     .then(({ data }) => {
        //         return data as Cat;
        //     })
        //     .catch((error) => {
        //         console.log("Error getting by id: " + error);
        //         return errorCat;
        //     });
    },
    addCat: (newCat: CatWithoutId) => {
        makeAddCall(newCat).then(() => get().fetch(lastSortDirection, lastFetchedPage));


        // axios.post("http://localhost:3000/cats/add/", newCat)
        //     .then((res) => { console.log(res); get().fetch(lastSortDirection, lastFetchedPage); })
        //     .catch((error) => console.log("Couldn't add cat: " + error));
    },
    deleteCat: (id: number) => {
        makeDeleteCall(id).then(() => get().fetch(lastSortDirection, lastFetchedPage));

        // axios.delete("http://localhost:3000/cats/delete/" + id)
        //     .then((res) => { console.log(res); get().fetch(lastSortDirection, lastFetchedPage); })
        //     .catch((error) => console.log("Couldn't delete cat: " + error));
    },
    updateCat: (id: number, newCat: Cat) => {
        makeUpdateCall(id, newCat).then(() => get().fetch(lastSortDirection, lastFetchedPage));

        // axios.put("http://localhost:3000/cats/update/" + id, { name: newCat.name, age: newCat.age, weight: newCat.weight })
        //     .then((res) => { console.log(res); get().fetch(lastSortDirection, lastFetchedPage); })
        //     .catch((error) => console.log("Couldn't update cat: " + error));
    }
}));
