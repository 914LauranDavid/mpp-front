import { Box, Typography } from "@mui/material";

function SillyLoading() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center'
            }}
        >
            <Typography
                variant="h4"
                sx={{ mb: 2 }} 
            >
                🐱
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                Car data is being fetched...
            </Typography>
        </Box>
    );
}

export default SillyLoading;
