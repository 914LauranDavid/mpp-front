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
import axios from "axios";

import { useCatStore } from "../stores/CatStore";

function CatsTable() {
  const [sortByNameDirection, setSortByNameDirection] = useState("asc");

  const { allCats, deleteCat, sortByName, fetch } = useCatStore();

  useEffect(() => {
    sortByName(sortByNameDirection);
  }, [sortByNameDirection]);

  useEffect(() => {
    fetch();
  }, []);

  const handleSortByNameClick = () => {
    if (sortByNameDirection === "desc")
      setSortByNameDirection("asc");
    else
      setSortByNameDirection("desc");
  }

  const getSortByNameButtonOrderUiText = () => {
    if (sortByNameDirection === "desc")
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
          {allCats.map((cat) => (
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

function AllCats() {
  // id (not visible), string field, float field
  // lista cu entitatile; crud (add--generate id)
  // fara persistenta
  // testare (unit tests), validare
  return (
    <Box sx={{ bgcolor: '#f8faca' }}>
      <CatsTable />
      <Divider />
    </Box>
  );
}

export default AllCats;
