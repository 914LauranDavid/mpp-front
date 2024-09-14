import { Box } from "@mui/material";
import { Offline, Online } from "react-detect-offline"

function NetworkStatus() {
    return (
        <Box>
            <Offline><Box sx={{ color: 'red', bgcolor: 'orange', textAlign: 'left', padding: '1%' }}>You are offline</Box></Offline>
            <Online><Box sx={{ color: 'green', bgcolor: 'whitesmoke', textAlign: 'left', padding: '1%' }}>You are online</Box></Online>
        </Box>
    );
}

export default NetworkStatus;