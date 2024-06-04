import { Box, Button, TextField } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import { useCatStore } from "../../stores/CatStore";
import { useAuth0 } from "@auth0/auth0-react";

function AddCat() {
  const { getIdTokenClaims } = useAuth0();

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

    getIdTokenClaims().then(token => {
      if (token)
        addCat({ name: name, age: age, weight: weight }, token.__raw);
    });
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
          inputProps={{ type: "number", min: 1 }}
          defaultValue={age}
          onChange={(e) => setAge(parseInt(e.target.value))}
        />
        <TextField
          id="weightInput"
          placeholder="Weight"
          inputProps={{ type: "number", step: "0.1", min: 1 }}
          defaultValue={weight}
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
