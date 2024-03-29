import { Button, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Cat } from "../model/Cat";
import EditIcon from '@mui/icons-material/Edit';

function CatDetails({
  getCatById,
  updateCat,
}: {
  getCatById: (id: number) => Cat
  updateCat: (id: number, newCat: Cat) => void;
}) {
  const params = useParams<{ id: string }>();
  const id = params.id;

  if (!id) {
    return <h1>The parameters are incorrect</h1>;
  }

  // const cat = allCats.find((cat) => cat.id === parseInt(id));
  let cat = getCatById(parseInt(id));

  if (cat.id === -1) {
    return <h1>No cat with this id.</h1>;
  }

  const [nameInput, setNameInput] = useState("");
  const handleNewNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (nameInput === "") {
      alert('Name cannot be empty');
      return;
    }

    updateCat(cat.id, { id: cat.id, name: nameInput, age: cat.age, weight: cat.weight });
    cat = getCatById(cat.id);  // TODO see if this is ok
  };

  const [ageInput, setAgeInput] = useState(0);
  const handleNewAgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    cat.age = ageInput;

    updateCat(cat.id, { id: cat.id, name: cat.name, age: ageInput, weight: cat.weight });
    cat = getCatById(cat.id);  // TODO see if this is ok
  };

  const [weightInput, setWeightInput] = useState(0);
  const handleNewWeightSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    cat.weight = weightInput;

    updateCat(cat.id, { id: cat.id, name: cat.name, age: cat.age, weight: weightInput });
    cat = getCatById(cat.id);  // TODO see if this is ok
  };

  const [isNameInputShown, setIsNameInputShown] = useState(false);
  const [isAgeInputShown, setIsAgeInputShown] = useState(false);
  const [isWeightInputShown, setIsWeightInputShown] = useState(false);

  return (
    <TableContainer sx={{ bgcolor: '#f8faca' }}>
      <Table sx={{ minWidth: "50%" }}>
        <TableBody>
          <TableRow>
            <TableCell sx={{ fontWeight: 800, }}>Name</TableCell>
            <TableCell sx={{ fontStyle: 'italic' }}>{cat.name}</TableCell>
            <TableCell>
              <Button onClick={() => setIsNameInputShown(!isNameInputShown)}>
                <EditIcon />
              </Button>
              {isNameInputShown && <form onSubmit={handleNewNameSubmit}>
                <TextField
                  size="small"
                  id="nameInput"
                  placeholder="New name"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                />
                <Button type="submit">
                  <CheckCircleOutlineIcon sx={{ cursor: 'pointer' }} />
                </Button>
              </form>}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: 800, }}>Age</TableCell>
            <TableCell sx={{ fontStyle: 'italic' }}>{cat.age}</TableCell>
            <TableCell>
              <Button onClick={() => setIsAgeInputShown(!isAgeInputShown)}>
                <EditIcon />
              </Button>
              {isAgeInputShown && <form onSubmit={handleNewAgeSubmit}>
                <TextField
                  size="small"
                  id="ageInput"
                  placeholder="New age"
                  inputProps={{ type: "number" }}
                  value={ageInput}
                  onChange={(e) => setAgeInput(parseInt(e.target.value))}
                />
                <Button type="submit">
                  <CheckCircleOutlineIcon sx={{ cursor: 'pointer' }} />
                </Button>
              </form>}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: 800, }}>Weight</TableCell>
            <TableCell sx={{ fontStyle: 'italic' }}>{cat.weight}</TableCell>
            <TableCell>
              <Button onClick={() => setIsWeightInputShown(!isWeightInputShown)}>
                <EditIcon />
              </Button>
              {isWeightInputShown && <form onSubmit={handleNewWeightSubmit}>
                <TextField
                  size="small"
                  id="weightnput"
                  placeholder="New weight"
                  inputProps={{ type: "number", step: "0.1" }}
                  value={weightInput}
                  onChange={(e) => setWeightInput(parseFloat(e.target.value))}
                />
                <Button type="submit">
                  <CheckCircleOutlineIcon sx={{ cursor: 'pointer' }} />
                </Button>
              </form>}
            </TableCell>
          </TableRow>
        </TableBody>

      </Table>
    </TableContainer>
  );
}

export default CatDetails;
