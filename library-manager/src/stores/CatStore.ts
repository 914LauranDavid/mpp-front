import { Cat } from "../model/Cat";
import { create } from "zustand";

const hardcodedCats = [
    { id: 1, name: "Sofia", age: 2, weight: 2.3 },
    { id: 2, name: "Raymond", age: 5, weight: 3.8 },
];

const errorCat: Cat = { id: -1, name: "Error", age: -1, weight: -1 };

interface useCatStoreProps {
    allCats: Cat[],
    getCatById: (id: number) => Cat,
    addCat: (cat: Cat) => void,
    deleteCat: (id: number) => void,
    updateCat: (id: number, newCat: Cat) => void,
    sortByName: (direction: string) => void
    // setAll: (newCats: Cat[]) => void
}

export const useCatStore = create<useCatStoreProps>((set, get) => ({
    allCats: hardcodedCats,
    getCatById: (id: number) => {
        const { allCats } = get();
        const cat = allCats.find(cat => cat.id === id);
        if (cat !== undefined)
            return cat;
        return errorCat;
    },
    addCat: (newCat: Cat) => set((state) => ({ allCats: [...state.allCats, newCat] })),
    deleteCat: (id: number) => set((state) => ({ allCats: state.allCats.filter(cat => cat.id !== id) })),
    updateCat: (id: number, newCat: Cat) => set((state) => ({
        allCats: state.allCats.map(currentCat => {
            if (currentCat.id === id)
                return newCat;
            return currentCat;
        })
    }
    )),
    sortByName: (direction: string) => set((state) => ({
        allCats: (direction === "asc" ?
            state.allCats.sort((a, b) => a.name < b.name ? -1 : 1) :
            state.allCats.sort((a, b) => a.name > b.name ? -1 : 1))
    }))
}));