import {
  Box,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Cat } from "../model/Cat";
import { useEffect, useState } from "react";

function CatsTable(
  { getAllCats, deleteCat, setAll }:
    {
      getAllCats: () => Cat[];
      deleteCat: (id: number) => void;
      setAll: (cats: Cat[]) => void;
    }) {
  const [sortedByName, setSortedByName] = useState("nothing");

  useEffect(() => {
    if (sortedByName === "asc") {
      setAll(getAllCats().sort((a, b) => a.name < b.name ? -1 : 1));
    } else if (sortedByName === "desc") {
      setAll(getAllCats().sort((a, b) => a.name > b.name ? -1 : 1));
    }
  }, [sortedByName]);

  const handleSortByNameClick = () => {
    if (sortedByName === "desc")
      setSortedByName("asc");
    else
      setSortedByName("desc");
  }

  const getSortByNameButtonOrderUiText = () => {
    if (sortedByName === "desc")
      return " increasingly ";
    else
      return " decreasingly ";
  }

  return (
    <TableContainer>
      <Table sx={{ minWidth: "50%" }}>
        <TableHead >
          <TableRow>
            <TableCell sx={{ fontWeight: 800, }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 800, }}>Age</TableCell>
            <TableCell sx={{ fontWeight: 800, }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getAllCats().map((cat) => (
            <TableRow key={cat.id}>
              <TableCell sx={{ fontStyle: 'italic' }}>
                <Link to={`/cats/${cat.id}`}>{cat.name}</Link>
              </TableCell>
              <TableCell>{cat.age}</TableCell>
              <TableCell>
                <DeleteForeverIcon sx={{ cursor: 'pointer', color: 'red', }}
                  onClick={() => deleteCat(cat.id)} aria-label={`deleteIcon${cat.id}`} />
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              <Button onClick={() => handleSortByNameClick()}>
                Sort {getSortByNameButtonOrderUiText()} by name
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function AllCats({ getAllCats, deleteCat, setAll }: {
  getAllCats: () => Cat[];
  deleteCat: (id: number) => void;
  setAll: (cats: Cat[]) => void;
}) {
  // id (not visible), string field, float field
  // lista cu entitatile; crud (add--generate id)
  // fara persistenta
  // testare (unit tests), validare
  return (
    <Box sx={{ bgcolor: '#f8faca' }}>
      <CatsTable getAllCats={getAllCats} deleteCat={deleteCat} setAll={setAll} />
      <Divider />
    </Box>
  );
}

export default AllCats;
