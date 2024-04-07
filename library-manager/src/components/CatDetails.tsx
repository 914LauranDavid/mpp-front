import { Button, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import { useCatStore } from "../stores/CatStore";

function CatDetails() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { getCatById, updateCat } = useCatStore();

  if (!id) {
    console.log("params incorrect...");
    return <h1>The parameters are incorrect</h1>;
  }

  const [cat, setCat] = useState({ id: -1, name: "", age: -1, weight: -1 });

  useEffect(() => {
    getCatById(parseInt(id)).then(received => setCat(received));
  }, []);

  const [nameInput, setNameInput] = useState("");
  const handleNewNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (nameInput === "") {
      alert('Name cannot be empty');
      return;
    }

    updateCat(cat.id, { id: cat.id, name: nameInput, age: cat.age, weight: cat.weight });
    getCatById(parseInt(id)).then(received => setCat(received));
  };

  const [ageInput, setAgeInput] = useState(0);
  const handleNewAgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    cat.age = ageInput;

    updateCat(cat.id, { id: cat.id, name: cat.name, age: ageInput, weight: cat.weight });
    getCatById(parseInt(id)).then(received => setCat(received));
  };

  const [weightInput, setWeightInput] = useState(0);
  const handleNewWeightSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    cat.weight = weightInput;

    updateCat(cat.id, { id: cat.id, name: cat.name, age: cat.age, weight: weightInput });
    getCatById(parseInt(id)).then(received => setCat(received));
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
              <Button onClick={() => setIsNameInputShown(!isNameInputShown)} aria-label="openNameInput">
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
                <Button type="submit" aria-label="submitName">
                  <CheckCircleOutlineIcon sx={{ cursor: 'pointer' }} />
                </Button>
              </form>}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: 800, }}>Age</TableCell>
            <TableCell sx={{ fontStyle: 'italic' }}>{cat.age}</TableCell>
            <TableCell>
              <Button onClick={() => setIsAgeInputShown(!isAgeInputShown)} aria-label="openAgeInput">
                <EditIcon />
              </Button>
              {isAgeInputShown && <form onSubmit={handleNewAgeSubmit}>
                <TextField
                  size="small"
                  id="ageInput"
                  aria-label="ageInput"
                  placeholder="New age"
                  inputProps={{ type: "number" }}
                  value={ageInput}
                  onChange={(e) => setAgeInput(parseInt(e.target.value))}
                />
                <Button type="submit" aria-label="submitAge">
                  <CheckCircleOutlineIcon sx={{ cursor: 'pointer' }} />
                </Button>
              </form>}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: 800, }}>Weight</TableCell>
            <TableCell sx={{ fontStyle: 'italic' }}>{cat.weight}</TableCell>
            <TableCell>
              <Button onClick={() => setIsWeightInputShown(!isWeightInputShown)} aria-label="openWeightInput">
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
                <Button type="submit" aria-label="submitWeight">
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
