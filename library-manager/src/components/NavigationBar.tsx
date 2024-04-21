import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function NavigationBar() {
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
                            <Button sx={{ my: 2, color: 'black', display: 'block', fontWeight: 700 }}>
                                All cats
                            </Button>
                        </Link>
                        <Link to="/cat/add">
                            <Button sx={{ my: 2, color: 'black', display: 'block', fontWeight: 700 }}>
                                Add a new cat
                            </Button>
                        </Link>
                        <Link to="/cat/age_distribution">
                            <Button sx={{ my: 2, color: 'black', display: 'block', fontWeight: 700 }}>
                                Age distribution
                            </Button>
                        </Link>
                        <Link to="/cat/toys_per_cat">
                            <Button sx={{ my: 2, color: 'black', display: 'block', fontWeight: 700 }}>
                                Toys per cat
                            </Button>
                        </Link>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavigationBar;