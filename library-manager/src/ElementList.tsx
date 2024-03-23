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

function EntitiesTable({ allCats }: { allCats: any[] }) {
  return (
    <TableContainer>
      <Table sx={{ minWidth: "50%" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Weight</TableCell>
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
      <EntitiesTable allCats={allCats} />

      <Divider />
    </Box>
  );
}

export default ElementList;
