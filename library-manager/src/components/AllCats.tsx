import {
  Box,
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

function CatsTable({ getAllCats, deleteCat }: { getAllCats: () => Cat[]; deleteCat: (id: number) => void; }) {
  return (
    <TableContainer>
      <Table sx={{ minWidth: "50%" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getAllCats().map((cat) => (
            <TableRow key={cat.id}>
              <TableCell>
                <Link to={`/cats/${cat.id}`}>{cat.name}</Link>
              </TableCell>
              <TableCell>{cat.age}</TableCell>
              <TableCell><DeleteForeverIcon sx={{ cursor: 'pointer' }} onClick={() => deleteCat(cat.id)} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function AllCats({ getAllCats, deleteCat }: {
  getAllCats: () => Cat[];
  deleteCat: (id: number) => void;
}) {
  // id (not visible), string field, float field
  // lista cu entitatile; crud (add--generate id)
  // fara persistenta
  // testare (unit tests), validare
  return (
    <Box>
      <CatsTable getAllCats={getAllCats} deleteCat={deleteCat} />
      <Divider />
    </Box>
  );
}

export default AllCats;
