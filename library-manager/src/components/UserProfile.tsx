import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useCatStore } from "../stores/CatStore";

const UserProfile = () => {
    const { user, isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();
    const { getUsersFavoriteBreed, getUserRoleName } = useCatStore();

    const [favoriteBreed, setFavoriteBreed] = useState("loading...");
    const [userRoleName, setUserRoleName] = useState("loading...");

    useEffect(() => {
        if (user?.sub) {
            let userId = user?.sub;

            getIdTokenClaims().then(token => {
                console.log('token: ' + token);
                if (token) {
                    getUsersFavoriteBreed(userId.substring(6, userId.length), token.__raw).then(received => setFavoriteBreed(received));
                    getUserRoleName(token.__raw).then(received => setUserRoleName(received));
                }
            });

        }
    }, [user]);

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    if (isAuthenticated && user?.name) {
        return (
            <div>
                <img src={user.picture} alt={user.name} />
                <h2>Your name: {user.name}</h2>
                <h3>Role: {userRoleName}</h3>
                <p>Your email: {user.email}</p>
                <p>Favorite breed: {favoriteBreed} </p>

            </div>
        );
    }
    else
        return (
            <div>
                not authenticated
            </div>
        );
};

export default UserProfile;