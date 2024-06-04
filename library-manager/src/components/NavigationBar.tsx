import { useAuth0 } from "@auth0/auth0-react";
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCatStore } from "../stores/CatStore";

function NavigationBar() {
    const { user, getIdTokenClaims } = useAuth0();
    const { getUserRoleName } = useCatStore();
    const [isManagerOrAdmin, setIsManagerOrAdmin] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    

    useEffect(() => {
        console.log('will get claims');

        getIdTokenClaims().then(tokenClaims => {
            if (tokenClaims !== undefined) {
                const token = tokenClaims.__raw;

                getUserRoleName(token).then(roleName => {
                    setIsManagerOrAdmin(roleName === "Manager" || roleName === "Admin");
                    setIsAdmin(roleName === "Admin");
                });
            };
        });
    }, [user]);

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        sx={{
                            mr: 2,
                            fontSize: 30,
                            fontFamily: 'sans-serif',
                            fontWeight: 1000,
                            letterSpacing: '.1rem',
                            color: 'white'
                        }}
                    >
                        CatApp
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                        <Link to="/cats">
                            <Button sx={{ my: 2, color: 'white', display: 'block', fontWeight: 700 }}>
                                All cats
                            </Button>
                        </Link>
                        {isManagerOrAdmin && <Link to="/cat/add">
                            <Button sx={{ my: 2, color: 'white', display: 'block', fontWeight: 700 }}>
                                Add a new cat
                            </Button>
                        </Link>}
                        <Link to="/cat/age_distribution">
                            <Button sx={{ my: 2, color: 'white', display: 'block', fontWeight: 700 }}>
                                Age distribution
                            </Button>
                        </Link>
                        <Link to="/cat/toys_per_cat">
                            <Button sx={{ my: 2, color: 'white', display: 'block', fontWeight: 700 }}>
                                Toys per cat
                            </Button>
                        </Link>
                        <Link to="/profile">
                            <Button sx={{ my: 2, color: 'goldenrod', display: 'block', fontWeight: 700 }}>
                                Profile
                            </Button>
                        </Link>
                        {isAdmin && <Link to="/users">
                            <Button sx={{ my: 2, color: 'goldenrod', display: 'block', fontWeight: 700 }}>
                                All users
                            </Button>
                        </Link>}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavigationBar;