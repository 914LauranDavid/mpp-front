import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useCatStore } from "../../stores/CatStore";
import { useAuth0 } from "@auth0/auth0-react";

const CAT_INITIAL_CUTENESS = 5;

function AddCat() {
  const { getIdTokenClaims } = useAuth0();

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);

  const { addCat } = useCatStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.length === 0) {
      alert('Name cannot be empty');
      return;
    }

    getIdTokenClaims().then(token => {
      if (token)
        addCat({ name: name, age: age, weight: weight, cuteness: CAT_INITIAL_CUTENESS, ownerId: "", avatarUrl: "" }, token.__raw);
    });
  };

  return (
    <Box sx={{ bgcolor: '#f8faca', p: 2 }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <TextField
            id="nameInput"
            label="Name"
            placeholder="Enter cat's name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            id="ageInput"
            label="Age (in years)"
            placeholder="Enter cat's age"
            type="number"
            inputProps={{ min: 1 }}
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value))}
            fullWidth
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            id="weightInput"
            label="Weight (in kg)"
            placeholder="Enter cat's weight"
            type="number"
            inputProps={{ step: "0.1", min: 1 }}
            value={weight}
            onChange={(e) => setWeight(parseFloat(e.target.value))}
            fullWidth
          />
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Add Cat
        </Button>
      </form>
    </Box>
  );
}

export default AddCat;
