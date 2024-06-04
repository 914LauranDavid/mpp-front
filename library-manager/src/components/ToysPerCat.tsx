import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { CatNumberPair, useCatStore } from "../stores/CatStore";

function ToysPerCat() {
    const { getToysPerCat } = useCatStore();

    const [toysPerCat, setToysPerCat] = useState([] as CatNumberPair[]);
    const [countToShow, setCountToShow] = useState(50);

    useEffect(() => {
        getToysPerCat(countToShow).then(received => setToysPerCat(received));
    }, [countToShow]);


    useEffect(() => {
        function handleScroll() {
            const windowHeight = window.innerHeight;
            const documentHeight = document.body.clientHeight;
            const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

            if (Math.abs(documentHeight - scrollTop - windowHeight) < 5) {
                setCountToShow(countToShow => countToShow + 50);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <Box>
            <TableContainer data-testid="toys-per-cat-table">
                <Table sx={{ minWidth: "50%" }}>
                    <TableHead >
                        <TableRow>
                            <TableCell sx={{ fontWeight: 800, }}>Cat Name</TableCell>
                            <TableCell sx={{ fontWeight: 800, }}>Number of Toys</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {toysPerCat.slice(0, countToShow).map(({ cat, theNumber }) => (
                            <TableRow key={cat.id}>
                                <TableCell sx={{ fontStyle: 'italic' }}>
                                    {cat.name}
                                </TableCell>
                                <TableCell>{theNumber}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default ToysPerCat;
