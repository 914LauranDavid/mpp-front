import { useState } from "react";
import { Cat } from "../model/Cat";

// TODO remove the file after moving it to the backend

const hardcodedCats = [
    { id: 1, name: "Sofia", age: 2, weight: 2.3 },
    { id: 2, name: "Raymond", age: 5, weight: 3.8 },
];

export const startCatRepository = () => {
    const [allCats, setAllCats] = useState<Cat[]>(hardcodedCats);

    const errorCat: Cat = { id: -1, name: "Error", age: -1, weight: -1 };

    const getAllCats = () => allCats;

    const getCatById = (id: number) => {
        const cat = allCats.find(cat => cat.id === id);
        if (cat !== undefined)
            return cat;
        return errorCat;
    }

    const addCat = (newCat: Cat) => {
        setAllCats([...allCats, newCat]);
    }

    const deleteCat = (id: number) => {
        setAllCats(allCats.filter(cat => cat.id !== id));
    }

    const updateCat = (id: number, newCat: Cat) => {
        setAllCats(allCats.map(currentCat => {
            if (currentCat.id === id)
                return newCat;
            return currentCat;
        }));
    }

    const setAll = (newCats: Cat[]) => {
        setAllCats([...newCats]);
    }

    return { getAllCats, getCatById, addCat, deleteCat, updateCat, setAll };
}
