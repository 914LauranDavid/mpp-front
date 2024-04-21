import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { CatNumberPair, useCatStore } from "../stores/CatStore";

function ToysPerCat() {
    //   const { getCatById, updateCat } = useCatStore();
    const { getToysPerCat } = useCatStore();

    const [toysPerCat, setToysPerCat] = useState([] as CatNumberPair[]);

    useEffect(() => {
        getToysPerCat().then(received => setToysPerCat(received));
    }, []);

    return (
        <TableContainer>
            <Table sx={{ minWidth: "50%" }}>
                <TableHead >
                    <TableRow>
                        <TableCell sx={{ fontWeight: 800, }}>Cat Name</TableCell>
                        <TableCell sx={{ fontWeight: 800, }}>Number of Toys</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {toysPerCat.map(({cat, theNumber}) => (
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
    );
}

export default ToysPerCat;
