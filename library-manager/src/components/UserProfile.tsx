import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useCatStore } from "../stores/CatStore";
import BuyMoney from "../BuyMoney";
import { Box, Typography, Avatar, Card, CardContent, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SillyLoading from "./utilities/SillyLoading";

const UserProfile = () => {
    const { user, isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();
    const { getUsersFavoriteBreed, getUserRoleName } = useCatStore();
    const navigate = useNavigate();

    const [favoriteBreed, setFavoriteBreed] = useState("loading...");
    const [userRoleName, setUserRoleName] = useState("loading...");

    useEffect(() => {
        if (user?.sub) {
            let userId = user?.sub;

            getIdTokenClaims().then(token => {
                if (token) {
                    getUsersFavoriteBreed(userId.substring(6, userId.length), token.__raw).then(received => setFavoriteBreed(received));
                    getUserRoleName(token.__raw).then(received => setUserRoleName(received));
                }
            });
        }
    }, [user]);

    if (isLoading) {
        return (
            <SillyLoading />
        );
    }

    if (isAuthenticated && user?.name) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', backgroundColor: '#f0f0f0', padding: 1 }}>
                <Card sx={{ width: '90%', maxWidth: 800, padding: 2, boxShadow: 3 }}>
                    <CardContent>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                <Avatar
                                    src={user.picture}
                                    alt={user.name}
                                    sx={{ width: 150, height: 150 }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        marginTop: 3,
                                        backgroundColor: '#3f51b5',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#303f9f'
                                        },
                                        borderRadius: '8px',
                                        padding: '10px 20px',
                                        fontSize: '16px'
                                    }}
                                    onClick={() => navigate("/my-cats")}
                                >
                                    See My Cats
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Typography variant="h4" gutterBottom>
                                    {user.name}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Role: {userRoleName}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Email: {user.email}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Favorite Breed: {favoriteBreed}
                                </Typography>
                                <Box sx={{ marginTop: 2 }}>
                                    <BuyMoney />
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
            <Typography variant="h6">
                Not authenticated
            </Typography>
        </Box>
    );
};

export default UserProfile;
