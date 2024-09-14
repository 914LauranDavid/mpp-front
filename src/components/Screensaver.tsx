import { Box, IconButton, Typography } from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import { useAuth0 } from "@auth0/auth0-react";
import { useCatStore } from "../stores/CatStore";
import { useEffect, useState } from "react";

interface ScreensaverProps {
    onExit: () => void;
}

function Screensaver({ onExit }: ScreensaverProps) {
    const { getIdTokenClaims } = useAuth0();

    const { getMyCutestCat } = useCatStore();

    const [cat, setCat] = useState({ id: 0, name: "", age: -1, weight: -1, cuteness: -1, ownerId: "", avatarUrl: "" });

    useEffect(() => {
        getIdTokenClaims().then(async tokenClaims => {
            if (tokenClaims !== undefined) {
                const token = tokenClaims.__raw;

                getMyCutestCat(token).then(received => setCat(received));
            }
        });
    }, []);

    return (
        <Box
            sx={{
                backgroundImage: `url('images/cat_heaven.jpeg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
                backgroundColor: 'black',
                color: 'white',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 9999, 
                overflow: 'hidden', 
            }}
        >
            <Typography variant="h1" sx={{ mb: 2 }}>
                {cat.avatarUrl ? (
                    <img src={cat.avatarUrl} alt="Cat Avatar" style={{ maxWidth: '100%', height: 'auto', borderRadius: 8 }} />
                ) : (
                    <span>No avatar :(</span>
                )}
            </Typography>
            <Typography variant="h4">
                This is {cat.name}, your cutest cat. <br />
                <Typography variant="h4" color="pink" fontWeight={"bold"}>{cat.cuteness} cuteness</Typography>
            </Typography>
            <IconButton
                onClick={onExit}
                sx={{
                    mt: 4,
                    color: 'white',
                    fontSize: '2rem'
                }}
            >
                <LightModeIcon fontSize="large" />
                <Typography sx={{
                    color: 'white', fontStyle: 'italic', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', ml: 1
                }}>cat-tinue</Typography>
            </IconButton>
        </Box>
    );
}

export default Screensaver;
