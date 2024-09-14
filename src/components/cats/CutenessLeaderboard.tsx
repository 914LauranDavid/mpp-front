import { useEffect, useState } from "react";
import { Box, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { UserNameTotalCutenessPair, useCatStore } from "../../stores/CatStore";
import SillyLoading from "../utilities/SillyLoading";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

function CutenessLeaderboard() {
    const { getLeaderboard } = useCatStore();
    const [leaderboard, setLeaderboard] = useState<UserNameTotalCutenessPair[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const data = await getLeaderboard();
                setLeaderboard(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
                setIsLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    if (isLoading) {
        return <SillyLoading />;
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', backgroundColor: '#f0f0f0', padding: 2 }}>
            <Card sx={{ width: '90%', maxWidth: 800, padding: 3, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom sx={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e6c300', fontWeight: 'bold'
                    }}>
                        <EmojiEventsIcon sx={{ marginRight: 1, color: '#e6c300' }} /> Greatest cuteness owners
                    </Typography>
                    <TableContainer>
                        <Table sx={{ minWidth: "50%" }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 800 }}>User</TableCell>
                                    <TableCell sx={{ fontWeight: 800 }}>Total Cuteness</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {leaderboard.map((entry, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ fontStyle: 'italic' }}>{entry.userName}</TableCell>
                                        <TableCell>{entry.totalCuteness}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Box>
    );
}

export default CutenessLeaderboard;
