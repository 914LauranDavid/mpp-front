import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function CatDetails({
  allCats,
  setAllCats,
}: {
  allCats: any[];
  setAllCats: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const params = useParams<{ id: string }>();
  const id = params.id;
  if (!id) {
    return <h1>bad</h1>;
  }
  const cat = allCats.find((cat) => cat.id === parseInt(id));

  const [nameInput, setNameInput] = useState("");
  const handleNewNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    cat.name = nameInput;

    const newAllCats = allCats.map(currentCat => currentCat);
    
    setAllCats(newAllCats);
  };

  const [ageInput, setAgeInput] = useState(0);
  const handleNewAgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    cat.age = ageInput;

    const newAllCats = allCats.map(currentCat => currentCat);
    
    setAllCats(newAllCats);
  };

  const [weightInput, setWeightInput] = useState(0);
  const handleNewWeightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    cat.weight = weightInput;

    const newAllCats = allCats.map(currentCat => currentCat);
    
    setAllCats(newAllCats);
  };

  return (
    <TableContainer>
      <Table sx={{ minWidth: "50%" }}>
        {/* <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Weight</TableCell>
          </TableRow>
        </TableHead> */}
        <TableBody>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>{cat.id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>{cat.name}</TableCell>
            <TableCell>
              <form onSubmit={handleNewNameSubmit}>
                <TextField
                  id="nameInput"
                  placeholder="New name"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                />
                <Button type="submit">
                  <CheckCircleOutlineIcon sx={{cursor: 'pointer'}}/>
                </Button>
              </form>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Age</TableCell>
            <TableCell>{cat.age}</TableCell>
            <TableCell>
              <form onSubmit={handleNewAgeSubmit}>
                <TextField
                  id="ageInput"
                  placeholder="New age"
                  inputProps={{ type: "number" }}
                  value={ageInput}
                  onChange={(e) => setAgeInput(parseInt(e.target.value))}
                />
                <Button type="submit">
                  <CheckCircleOutlineIcon sx={{cursor: 'pointer'}}/>
                </Button>
              </form>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Weight</TableCell>
            <TableCell>{cat.weight}</TableCell>
            <TableCell>
              <form onSubmit={handleNewWeightSubmit}>
                <TextField
                  id="weightnput"
                  placeholder="New weight"
                  inputProps={{ type: "number", step: "0.1" }}
                  value={weightInput}
                  onChange={(e) => setWeightInput(parseFloat(e.target.value))}
                />
                <Button type="submit">
                  <CheckCircleOutlineIcon sx={{cursor: 'pointer'}}/>
                </Button>
              </form>
            </TableCell>
          </TableRow>
        </TableBody>

      </Table>
    </TableContainer>
    // <div>
    //   <h1>Cat details</h1>
    //   <h2>{cat.name}</h2>
    // </div>
  );
}

export default CatDetails;
