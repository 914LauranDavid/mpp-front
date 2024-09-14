import axios from "axios";
import { Cat, CatWithoutId, ERROR_CAT } from "../domain/Cat";
import { CatNumberPair } from "../stores/CatStore";
import { getRequestConfigWithToken } from "../auth/TokenHandler";
import { RawUser, UserToBeCreated } from "../domain/User";
import { CatQuizQuestion } from "../components/cats/OwnedCatDetails";

// const baseBackendUrl = "http://localhost:3000/";
const baseBackendUrl = "https://localhost:4443/";
// const baseBackendUrl = "https://ec2-13-49-120-237.eu-north-1.compute.amazonaws.com:4443/";
// const baseBackendUrl = "http://ec2-13-49-120-237.eu-north-1.compute.amazonaws.com:3000/";

export const makeAllCall = (sortByNameDirection: string, page: number) => {
    return axios
        .get(baseBackendUrl + "cats?sortByNameDirection=" + sortByNameDirection + "&page=" + page)
        .then(({ data }) => {
            console.log('all call result: ' + data);
            return data;
        })
        .catch((error) => {
            console.log("Error fetching cats: " + error);
            return [ERROR_CAT];
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
            return ERROR_CAT;
        });
}

export const makeAddCall = (newCat: CatWithoutId, token: string) => {
    console.log('makeaddcall: token=' + JSON.stringify(token));
    return axios.post(baseBackendUrl + "cats/", newCat, getRequestConfigWithToken(token))
        .catch((error) => {
            console.log("Couldn't add cat: " + error);
            alert('Backend error: ' + error);
        });
}

export const makeDeleteCall = (id: number, token: string) => {
    return axios.delete(baseBackendUrl + "cats/" + id, getRequestConfigWithToken(token))
        .then(response => { return response; })
        .catch((error) => { console.log("Couldn't delete cat: " + error); return error; });
}

export const makeUpdateCall = (id: number, newCat: Cat, token: string) => {
    return axios.put(
        baseBackendUrl + "cats/" + id, { name: newCat.name, age: newCat.age, weight: newCat.weight },
        getRequestConfigWithToken(token)
    )
        .then(() => true)
        .catch((error) => { console.log("Couldn't update cat: " + error); return false; });
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
            console.log('user role name: ' + data);
            return data as string;
        })
        .catch((error) => {
            console.log('Error getting user role name: ' + error);
            return "";
        });
}

export const makeGetUserMoneyCall = (token: string) => {
    return axios
        .get(baseBackendUrl + "users/money/", getRequestConfigWithToken(token))
        .then(({ data }) => {
            console.log('user money: ' + data);
            return data as number;
        })
        .catch((error) => {
            console.log('Error getting user money: ' + error);
            return -1;
        });
}

export const makeGetAllUsersCall = (token: string) => {
    return axios
        .get(baseBackendUrl + "users/get-all", getRequestConfigWithToken(token))
        .then(({ data }) => {
            console.log('get all users call: ' + data);
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
            console.log('other users role name: ' + data);
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
        .catch((error) => alert("Invalid user: " + error));
}

export const makeDeleteUserCall = (userId: string, token: string) => {
    console.log('makeaddusercall: token=' + JSON.stringify(token));

    return axios.delete(baseBackendUrl + "users/delete/" + userId, getRequestConfigWithToken(token))
        .catch((error) => console.log("Couldn't delete user: " + error));
}

export const makeUpdateUserRoleCall = (userId: string, newRole: string, token: string) => {
    console.log('will call ' + "users/update-role/" + userId);
    return axios.put(
        baseBackendUrl + "users/update-role/" + userId, { newRole: newRole },
        getRequestConfigWithToken(token)
    )
        .catch((error) => console.log("Couldn't update user: " + error));
}

export const makeUpdateUserNameCall = (userId: string, newName: string, token: string) => {
    console.log('will call ' + "users/update-name/" + userId);
    return axios.put(
        baseBackendUrl + "users/update-name/" + userId, { newName: newName },
        getRequestConfigWithToken(token)
    )
        .catch((error) => console.log("Couldn't update users name: " + error));
}

export const makeAgeDistributionCall = () => {
    return axios
        .get(baseBackendUrl + "cats/age-distribution")
        .then(({ data }) => {
            console.log('age distrib result: ' + data);
            return data;
        })
        .catch((error) => {
            console.log("Error getting age distrib: " + error);
            return [];
        });
}

export const makeGetMyCatsCall = (token: string) => {
    console.log('in catsapi, getMyCats');
    return axios
        .get(baseBackendUrl + "cats/mine", getRequestConfigWithToken(token))
        .then(({ data }) => {
            return data as Cat[];
        })
        .catch((error) => {
            console.log('Error getting my cats: ' + error);
            return [];
        });
}

export const makeBuyCatCall = (catId: number, token: string) => {
    console.log('catsapi buycall');
    return axios.post(baseBackendUrl + "cats/buy", { catId: catId }, getRequestConfigWithToken(token))
        .catch((error) => alert("Invalid buying: " + error));
}

export const makeProcessBoughtMoneyCall = (token: string) => {
    console.log('catsapi process bought call');
    return axios.post(baseBackendUrl + "users/process-bought-money", {}, getRequestConfigWithToken(token))
        .catch((error) => alert("Invalid processing bought money: " + error));
}

export const makeUpdateCatCuteness = (catId: number, newCuteness: number) => {
    return axios.put(
        baseBackendUrl + "cats/update-cuteness/" + catId, { newCuteness: newCuteness }
    )
        .then(() => true)
        .catch((error) => { console.log("Couldn't update cat's cuteness: " + error); return false; });
}

export const makeGetQuizQuestionsCall = () => {
    console.log('entered api getquizq');
    return axios.post(
        baseBackendUrl + 'cats/quiz-questions/'
    )
        .then(({ data }) => {
            console.log('quiz questions result: ' + JSON.stringify(data));

            let questions: CatQuizQuestion[] = [];
            for (let oneGivenQuestion of data)
                questions.push({ question: oneGivenQuestion.question, options: oneGivenQuestion.options, answer: oneGivenQuestion.answer })

            return questions;
        })
        .catch((error) => {
            console.log("Error getting quiz questions: " + error);
            return [] as CatQuizQuestion[];
        });
}

export const makeGetLeaderbordCall = () => {
    return axios
        .get(baseBackendUrl + "users/leaderboard")
        .then(({ data }) => {
            console.log('api leaderboard result: ' + JSON.stringify(data));
            return data;
        })
        .catch((error) => {
            console.log("Error getting leaderboard: " + error);
            return [];
        });
}

export const makeSetCatAvatarCall = (catId: number, prompt: string, token: string) => {
    console.log(`makeSetCatAvatarCall: id=${catId}, prompt=${prompt}`);
    return axios.post(baseBackendUrl + "cats/set-avatar", { catId: catId, prompt: prompt }, getRequestConfigWithToken(token))
        .then(({ data }) => {
            console.log('set avatar response: ' + JSON.stringify(data));
            return data;
        })
        .catch((error) => alert("Invalid set cat avatar: " + error));
}

export const makeGetMyCutestCatCall = (token: string) => {
    return axios
        .get(baseBackendUrl + "cats/my-cutest", getRequestConfigWithToken(token))
        .then(({ data }) => {
            return data as Cat;
        })
        .catch((error) => {
            console.log('Error getting my cutest cat: ' + error);
            return ERROR_CAT;
        });
}
