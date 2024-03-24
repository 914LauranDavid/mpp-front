import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  List,
  ListItem,
  ListItemButton,
  OutlinedInput,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Unstable_NumberInput as NumberInput } from "@mui/base/Unstable_NumberInput";
import { Link } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// function createCat(id: number, name: string, age: number, weight: number) {
//   return { id, name, age, weight };
// }

// let nextId = 3;

// const allCats = [
//   createCat(1, "Sofia", 2, 2.5),
//   createCat(2, "Raymond", 4, 4.3),
// ];

// function OneListElement({ name }: { name: string }) {
//   return (
//     <ListItem>
//       {name}
//       <ListItemButton>
//         <EditIcon />
//       </ListItemButton>
//     </ListItem>
//   );
// }

// interface PropsTable {
//   allCats: Cats;
// }

function EntitiesTable({ allCats, setAllCats }: { allCats: any[]; setAllCats: React.Dispatch<React.SetStateAction<any[]>> }) {
  function deleteCat(catId: number) {
    const newAllCats = allCats.filter(cat => cat.id !== catId);
    setAllCats(newAllCats);
  }

  return (
    <TableContainer>
        <Table sx={{ minWidth: "50%" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allCats.map((cat) => (
            <TableRow key={cat.id}>
              <TableCell>
                <Link to={`/cats/${cat.id}`}>{cat.name}</Link>
              </TableCell>
              <TableCell>{cat.age}</TableCell>
              <TableCell>{cat.weight}</TableCell>
              <TableCell><DeleteForeverIcon sx={{cursor: 'pointer'}} onClick={() => deleteCat(cat.id)}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

interface Cat {
  id: number;
  name: string;
  age: number;
  weight: number;
}

interface Cats extends Array<Cat> {}

interface Props {
  allCats: Cats;
}

function ElementList({
  allCats,
  setAllCats,
}: {
  allCats: any[];
  setAllCats: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  // id (not visible), string field, float field
  // lista cu entitatile; crud (add--generate id)
  // fara persistenta
  // testare (unit tests), validare
  return (
    <Box>
      {/* <List sx={{ bgcolor: "purple", color: "gold" }}>
        <OneListElement name="First item" />
        <OneListElement name="Second item" />
      </List> */}
      <EntitiesTable allCats={allCats} setAllCats={setAllCats} />

      <Divider />
    </Box>
  );
}

export default ElementList;
