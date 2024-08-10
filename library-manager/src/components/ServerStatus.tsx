import { Box } from "@mui/material";
import { useCatStore } from "../stores/CatStore";

function ServerStatus() {
    const { isServerDown, getPendingOperations } = useCatStore();

    return (
        <Box sx={
            isServerDown ? { color: 'red', bgcolor: 'ivory', textAlign: 'left', padding: '1%' }
                : { color: '#36454f', bgcolor: 'ivory', textAlign: 'left', padding: '1%' }
        }>
            {isServerDown ? `Server is down. You have ${getPendingOperations().length} pending operations.` : "Server is up"}
        </Box>
    )
}

export default ServerStatus;