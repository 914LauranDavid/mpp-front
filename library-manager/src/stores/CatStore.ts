import axios from "axios";
import { Cat } from "../model/Cat";
import { create } from "zustand";

interface CatWithoutId { name: string, age: number, weight: number };


const errorCat: Cat = { id: -1, name: "Error", age: -1, weight: -1 };
let lastFetchedPage = 0;
let lastSortDirection = "asc";

interface useCatStoreProps {
    allCats: Cat[],
    // selectedCatId: number,
    // selectCat: (id: number) => void,
    fetch: (sortByNameDirection: string, page: number) => void,
    getCount: () => Promise<number>,
    addCat: (cat: CatWithoutId) => void,
    deleteCat: (id: number) => void,
    updateCat: (id: number, newCat: Cat) => void,
    // sortByName: (direction: string) => void,

    getCatById: (id: number) => Promise<Cat>
    // setAll: (newCats: Cat[]) => void
}

export const useCatStore = create<useCatStoreProps>((set, get) => ({
    allCats: [],
    // selectedCatId: 1,
    fetch: (sortByNameDirection: string, page: number) => {
        console.log("catStore: sortDir=" + sortByNameDirection);

        lastFetchedPage = page;
        lastSortDirection = sortByNameDirection;

        axios
            .get("http://localhost:3000/cats/all?sortByNameDirection=" + sortByNameDirection + "&page=" + page)
            .then(({ data }) => {
                set(() => ({ allCats: data }));
                console.log("CatStore: allCats=" + (data as Cat[]).map(cat => cat.age));
            })
            .catch((error) => {
                set(() => ({ allCats: [] }));
                console.log(error);
            });
    },
    getCount: async () => {
        try {
            const response = await axios
                .get("http://localhost:3000/cats/count");
            return response.data.count as number;
        }
        catch (error) {
            return 0;
        }
    },
    // selectCat: (id: number) => set({ selectedCatId: id }),
    getCatById: async (id: number) => {
    try {
        const response = await axios
            .get("http://localhost:3000/cats/get-by-id/" + id);
        console.log("will respond with cat of age " + response.data.age);
        return response.data as Cat;
    }
    catch (error) {
        return errorCat;
    }

    // .then(({ data }) => {

    // })
    // .catch((error) => {
    //     set(() => ({ allCats: [] }));
    //     console.log(error);
    // });

    // const { allCats } = get();
    // const cat = allCats.find(cat => cat.id === id);
    // if (cat !== undefined)
    //     return cat;
    // return errorCat;
},
    addCat: (newCat: CatWithoutId) => {
        axios.post("http://localhost:3000/cats/add/", newCat)
            .then((res) => { console.log(res); get().fetch(lastSortDirection, lastFetchedPage); })
            .catch((error) => console.log("Couldn't add cat: " + error));
    },
    deleteCat: (id: number) => {
        axios.delete("http://localhost:3000/cats/delete/" + id)
            .then((res) => { console.log(res); get().fetch(lastSortDirection, lastFetchedPage); })
            .catch((error) => console.log("Couldn't delete cat: " + error));
    },
    updateCat: (id: number, newCat: Cat) => {
        axios.put("http://localhost:3000/cats/update/" + id, { name: newCat.name, age: newCat.age, weight: newCat.weight })
            .then((res) => { console.log(res); get().fetch(lastSortDirection, lastFetchedPage); })
            .catch((error) => console.log("Couldn't update cat: " + error));

        // allCats: state.allCats.map(currentCat => {
        //     if (currentCat.id === id)
        //         return newCat;
        //     return currentCat;
        // })
    }
    // sortByName: (direction: string) => set((state) => ({
    //     allCats: (direction === "asc" ?
    //         state.allCats.sort((a, b) => a.name < b.name ? -1 : 1) :
    //         state.allCats.sort((a, b) => a.name > b.name ? -1 : 1))
    // }))
}));