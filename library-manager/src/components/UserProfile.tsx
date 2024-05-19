import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { useCatStore } from "../stores/CatStore";

const UserProfile = () => {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently, getIdTokenClaims } = useAuth0();
    const { getUsersFavoriteBreed } = useCatStore();

    const [favoriteBreed, setFavoriteBreed] = useState("loading...");

    useEffect(() => {
        if (user?.sub) {
            let userId = user?.sub;

            getIdTokenClaims().then(token => {
                console.log('token: ' + token);
                getUsersFavoriteBreed(userId.substring(6, userId.length), token.__raw).then(received => setFavoriteBreed(received));
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