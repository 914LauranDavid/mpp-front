import { useAuth0 } from "@auth0/auth0-react";
import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from "@mui/material";
import NightsStayIcon from '@mui/icons-material/NightsStay';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCatStore } from "../stores/CatStore";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ADMIN_USER_ROLE_NAME, MANAGER_USER_ROLE_NAME } from "../utils/Constants";

interface NavigationBarProps {
    onToggleScreensaver: () => void;
}

function NavigationBar({ onToggleScreensaver }: NavigationBarProps) {
    const { user, isAuthenticated, getIdTokenClaims } = useAuth0();
    const { getUserRoleName, getUserMoney } = useCatStore();
    const [isManagerOrAdmin, setIsManagerOrAdmin] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [moneyAmount, setMoneyAmount] = useState<number>(-1);

    useEffect(() => {
        console.log('will get claims');

        getIdTokenClaims().then(tokenClaims => {
            if (tokenClaims !== undefined) {
                const token = tokenClaims.__raw;

                getUserRoleName(token).then(roleName => {
                    setIsManagerOrAdmin(roleName === MANAGER_USER_ROLE_NAME || roleName === ADMIN_USER_ROLE_NAME);
                    setIsAdmin(roleName === ADMIN_USER_ROLE_NAME);
                });

                getUserMoney(token).then(received => setMoneyAmount(received));
                setInterval(() => {
                    getUserMoney(token).then(received => setMoneyAmount(received));
                }, 5000);
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
                        CatAdv.
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Link to="/cats">
                            <Button sx={{ my: 2, color: 'white', display: 'block', fontWeight: 700 }}>
                                Store
                            </Button>
                        </Link>
                        {isManagerOrAdmin && <Link to="/cat/add">
                            <Button sx={{ my: 2, color: 'white', display: 'block', fontWeight: 700 }}>
                                Add cat
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
                        <Link to="/leaderboard">
                            <Button sx={{ my: 2, color: 'white', display: 'block', fontWeight: 700 }}>
                                Leaderboard
                            </Button>
                        </Link>
                        {isAdmin && <Link to="/users">
                            <Button sx={{ my: 2, color: 'goldenrod', display: 'block', fontWeight: 700 }}>
                                Users
                            </Button>
                        </Link>}
                        {isAuthenticated &&
                            <Link to="/profile">
                                <Button
                                    sx={{ my: 2, color: 'goldenrod', display: 'flex', alignItems: 'center', fontWeight: 700 }}
                                    startIcon={<AccountCircleIcon />}
                                >
                                    Me
                                    <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
                                        <Typography sx={{ ml: 1, color: '#f6762a', fontWeight: 'bold' }}>🐾{moneyAmount}</Typography>
                                    </Box>
                                </Button>
                            </Link>
                        }
                    </Box>
                    <IconButton
                        onClick={onToggleScreensaver}
                        sx={{
                            color: 'white',
                            fontSize: '2rem',
                            ml: 25
                        }}
                    >
                        <NightsStayIcon fontSize="large" />
                        <Typography sx={{
                            color: 'white', fontStyle: 'italic', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                        }}>pawse</Typography>
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavigationBar;
