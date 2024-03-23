import { Box, Button, Divider, TextField } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";

let nextId = 3;

function AddCat({
  allCats,
  setAllCats,
}: {
  allCats: any[];
  setAllCats: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    alert("congratulations for submitting");

    e.preventDefault();

    setAllCats([...allCats, { id: nextId, name: name, age: age, weight: weight }]);
    nextId++;
    // allCats.push(createCat(nextId));
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <TextField
          id="nameInput"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="ageInput"
          placeholder="Age"
          inputProps={{ type: "number" }}
          value={age}
          onChange={(e) => setAge(parseInt(e.target.value))}
        />
        <TextField
          id="weightInput"
          placeholder="Weight"
          inputProps={{ type: "number", step: "0.1" }}
          value={weight}
          onChange={(e) => setWeight(parseFloat(e.target.value))}
        />
        <Button type="submit">
          <AddCircleOutlineIcon />
        </Button>
      </form>
    </Box>
  );
}

export default AddCat;
