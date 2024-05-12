import { Box } from "@mui/material";
import { useCatStore } from "../stores/CatStore";

function ServerStatus() {
    const { isServerDown, getPendingOperations } = useCatStore();

    return (
        <Box sx={
            isServerDown ? { color: 'red', bgcolor: 'ivory', textAlign: 'left', padding: '1%' }
                : { color: '#36454f', bgcolor: 'ivory', textAlign: 'left', padding: '1%' }
        }>
            {isServerDown ? "Server is down" : "Server is up"}
            . You have {getPendingOperations().length} pending operations.
        </Box>
    ) // TODO only show no. of pending op. if server down and >0
}

export default ServerStatus;