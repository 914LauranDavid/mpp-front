import axios from "axios";
import { Cat, CatWithoutId, errorCat } from "../domain/Cat";
import { CatNumberPair } from "../stores/CatStore";
import { getRequestConfigWithToken } from "../auth/TokenHandler";
import { RawUser, User, UserToBeCreated } from "../domain/User";

// const baseBackendUrl = "http://localhost:3000/";
const baseBackendUrl = "https://cat-app-backend-7a809be297e0.herokuapp.com/";

export const makeAllCall = (sortByNameDirection: string, page: number) => {
    return axios
        .get(baseBackendUrl + "cats/all?sortByNameDirection=" + sortByNameDirection + "&page=" + page)
        .then(({ data }) => {
            console.log('all call result: ' + data);
            return data;
        })
        .catch((error) => {
            console.log("Error fetching cats: " + error);
            return [errorCat];
        });
}

export const makeCountCall = () => {
    return axios
        .get(baseBackendUrl + "cats/count")
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
        .get(baseBackendUrl + "cats/get-by-id/" + id)
        .then(({ data }) => {
            return data as Cat;
        })
        .catch((error) => {
            console.log("Error getting by id: " + error);
            return errorCat;
        });
}

export const makeAddCall = (newCat: CatWithoutId, token: string) => {
    console.log('makeaddcall: token=' + JSON.stringify(token));
    return axios.post(baseBackendUrl + "cats/add/", newCat, getRequestConfigWithToken(token))
        .catch((error) => console.log("Couldn't add cat: " + error));
}

export const makeDeleteCall = (id: number, token: string) => {
    return axios.delete(baseBackendUrl + "cats/delete/" + id, getRequestConfigWithToken(token))
        .catch((error) => console.log("Couldn't delete cat: " + error));
}

export const makeUpdateCall = (id: number, newCat: Cat, token: string) => {
    return axios.put(
        baseBackendUrl + "cats/update/" + id, { name: newCat.name, age: newCat.age, weight: newCat.weight },
        getRequestConfigWithToken(token)
    )
        .catch((error) => console.log("Couldn't update cat: " + error));
}

export const makeGetToysPerCatCall = (count: number) => {
    return axios
        .get(baseBackendUrl + "cats/toys_per_cat?count=" + count)
        .then(({ data }) => {
            return data as CatNumberPair[];
        })
        .catch((error) => {
            console.log("Error getting toys per cat in CatsApi: " + error);
            return [] as CatNumberPair[];
        });
}

export const makeGetUsersFavoriteBreedCall = (userId: string, token: string) => {
    return axios
        .get(baseBackendUrl + "cats/users-favorite-breed", getRequestConfigWithToken(token))
        .then(({ data }) => {
            return data as string;
        })
        .catch((error) => {
            console.log('Error getting fav breed: ' + error);
            console.log(userId);
            return "";
        });
}

export const makeGetUserRoleNameCall = (token: string) => {
    return axios
        .get(baseBackendUrl + "users/role-name/", getRequestConfigWithToken(token))
        .then(({ data }) => {
            console.log('user role name ok: ' + data);
            return data as string;
        })
        .catch((error) => {
            console.log('Error getting user role name: ' + error);
            return "";
        });
}

export const makeGetAllUsersCall = (token: string) => {
    return axios
        .get(baseBackendUrl + "users/get-all", getRequestConfigWithToken(token))
        .then(({ data }) => {
            console.log('get all users call ok: ' + data);
            return data as RawUser[];
        })
        .catch((error) => {
            console.log('Error getting all users: ' + error);
            return [];
        });
}

export const makeGetOthersRoleNameCall = (othersId: string, token: string) => {
    return axios
        .get(baseBackendUrl + `users/others-role-name?others_id=${othersId}`, getRequestConfigWithToken(token))
        .then(({ data }) => {
            console.log('other users role name ok: ' + data);
            return data as string;
        })
        .catch((error) => {
            console.log('Error getting other users role name: ' + error);
            return "";
        });
}

export const makeAddUserCall = (user: UserToBeCreated, token: string) => {
    console.log('makeaddusercall: token=' + JSON.stringify(token));

    return axios.post(baseBackendUrl + "users/create", user, getRequestConfigWithToken(token))
        .catch((error) => console.log("Couldn't add user: " + error));
}

export const makeDeleteUserCall = (userId: string, token: string) => {
    console.log('makeaddusercall: token=' + JSON.stringify(token));

    return axios.delete(baseBackendUrl + "users/delete/" + userId, getRequestConfigWithToken(token))
        .catch((error) => console.log("Couldn't delete user: " + error));
}

export const makeUpdateUserRoleCall = (userId: string, newRole: string, token: string) => {
    console.log(' will call ' + "users/update-role/" + userId);
    return axios.put(
        baseBackendUrl + "users/update-role/" + userId, { newRole: newRole },
        getRequestConfigWithToken(token)
    )
        .catch((error) => console.log("Couldn't update user: " + error));
}

export const makeUpdateUserNameCall = (userId: string, newName: string, token: string) => {
    console.log(' will call ' + "users/update-name/" + userId);
    return axios.put(
        baseBackendUrl + "users/update-name/" + userId, { newName: newName },
        getRequestConfigWithToken(token)
    )
        .catch((error) => console.log("Couldn't update users name: " + error));
}