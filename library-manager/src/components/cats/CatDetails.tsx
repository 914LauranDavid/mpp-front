import { Button, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import { useCatStore } from "../../stores/CatStore";
import { useAuth0 } from "@auth0/auth0-react";

function CatDetails() {
  const { user, getIdTokenClaims } = useAuth0();
  const [isManagerOrAdmin, setIsManagerOrAdmin] = useState(false);

  const { getCatById, updateCat, getUserRoleName } = useCatStore();

  useEffect(() => {
    console.log('will get claims');

    getIdTokenClaims().then(tokenClaims => {
      if (tokenClaims !== undefined) {
        const token = tokenClaims.__raw;

        getUserRoleName(token).then(roleName => setIsManagerOrAdmin(roleName === "Manager" || roleName === "Admin"));
      };
    });
  }, [user]);


  const params = useParams<{ id: string }>();
  const id = params.id;

  if (!id) {
    console.log("params incorrect...");
    return <h1>The parameters are incorrect</h1>;
  }

  const [cat, setCat] = useState({ id: parseInt(id), name: "", age: -1, weight: -1 });

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

    getIdTokenClaims().then(token => {
      if (token) {
        updateCat(parseInt(id), { id: cat.id, name: nameInput, age: cat.age, weight: cat.weight }, token.__raw);
        getCatById(parseInt(id)).then(received => setCat(received));
      }
    });
  };

  const [ageInput, setAgeInput] = useState(0);
  const handleNewAgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (ageInput < 0) {
      alert('Age cannot be negative');
      return;
    }

    cat.age = ageInput;

    getIdTokenClaims().then(token => {
      if (token)
        updateCat(parseInt(id), { id: cat.id, name: cat.name, age: ageInput, weight: cat.weight }, token.__raw);
    });
    getCatById(parseInt(id)).then(received => setCat(received));
  };

  const [weightInput, setWeightInput] = useState(0);
  const handleNewWeightSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (weightInput < 0) {
      alert('Weight cannot be negative');
      return;
    }

    cat.weight = weightInput;

    getIdTokenClaims().then(token => {
      if (token)
        updateCat(parseInt(id), { id: cat.id, name: cat.name, age: cat.age, weight: weightInput }, token.__raw);
    });

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
              {isManagerOrAdmin && <Button onClick={() => setIsNameInputShown(!isNameInputShown)} aria-label="openNameInput">
                <EditIcon />
              </Button>}
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
              {isManagerOrAdmin && <Button onClick={() => setIsAgeInputShown(!isAgeInputShown)} aria-label="openAgeInput">
                <EditIcon />
              </Button>}
              {isAgeInputShown && <form onSubmit={handleNewAgeSubmit}>
                <TextField
                  size="small"
                  id="ageInput"
                  aria-label="ageInput"
                  placeholder="New age"
                  inputProps={{ type: "number", min: 0 }}
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
              {isManagerOrAdmin && <Button onClick={() => setIsWeightInputShown(!isWeightInputShown)} aria-label="openWeightInput">
                <EditIcon />
              </Button>}
              {isWeightInputShown && <form onSubmit={handleNewWeightSubmit}>
                <TextField
                  size="small"
                  id="weightnput"
                  placeholder="New weight"
                  inputProps={{ type: "number", step: "0.1", min: 0 }}
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
