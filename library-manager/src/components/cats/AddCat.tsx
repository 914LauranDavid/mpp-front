import { Box, Button, TextField } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import { useCatStore } from "../../stores/CatStore";

function AddCat() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);

  const { addCat } = useCatStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.length == 0) {
      alert('Name cannot be empty');
      return;
    }

    addCat({ name: name, age: age, weight: weight });
  };

  return (
    <Box sx={{ bgcolor: '#f8faca' }}>
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
          onChange={(e) => setAge(parseInt(e.target.value))}
        />
        <TextField
          id="weightInput"
          placeholder="Weight"
          inputProps={{ type: "number", step: "0.1" }}
          onChange={(e) => setWeight(parseFloat(e.target.value))}
        />
        <Button type="submit" aria-label="submitAddCatButton">
          <AddCircleOutlineIcon aria-label="addIcon" />
        </Button>
      </form>
    </Box>
  );
}

export default AddCat;
