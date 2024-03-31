import axios from "axios";
import { Cat, CatWithoutId, errorCat } from "../domain/Cat";

const baseUrl = "http://localhost:3000/";

export const makeAllCall = (sortByNameDirection: string, page: number) => {
    return axios
        .get(baseUrl + "cats/all?sortByNameDirection=" + sortByNameDirection + "&page=" + page)
        .then(({ data }) => {
            console.log('all call result: ' + data);
            return data;
        })
        .catch((error) => {
            console.log("Error fetching cats: " + error);
            return [];
        });
}

export const makeCountCall = () => {
    return axios
        .get(baseUrl + "cats/count")
        .then(({ data }) => {
            return data.count as number;
        })
        .catch((error) => {
            console.log("Error getting count: " + error);
            return 0;
        });
}

export const makeGetByIdCall = (id: number) => {
    return axios
        .get(baseUrl + "cats/get-by-id/" + id)
        .then(({ data }) => {
            return data as Cat;
        })
        .catch((error) => {
            console.log("Error getting by id: " + error);
            return errorCat;
        });
}

export const makeAddCall = (newCat: CatWithoutId) => {
    return axios.post(baseUrl + "cats/add/", newCat)
        .catch((error) => console.log("Couldn't add cat: " + error));
}

export const makeDeleteCall = (id: number) => {
    return axios.delete(baseUrl + "cats/delete/" + id)
        .catch((error) => console.log("Couldn't delete cat: " + error));
}

export const makeUpdateCall = (id: number, newCat: Cat) => {
    return axios.put(baseUrl + "cats/update/" + id, { name: newCat.name, age: newCat.age, weight: newCat.weight })
        .catch((error) => console.log("Couldn't update cat: " + error));
}
