import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import { useCatStore } from "../../stores/CatStore";
import { useAuth0 } from "@auth0/auth0-react";

function AddUser() {
    const { getIdTokenClaims } = useAuth0();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Regular User");

    const { addUser } = useCatStore();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (name.length == 0) {
            alert('Name cannot be empty');
            return;
        } else if (email.length == 0) {
            alert('Email cannot be empty');
            return;
        } else if (password.length == 0) {
            alert('Password cannot be empty');
            return;
        }

        getIdTokenClaims().then(token => {
            if (token)
                addUser({ name: name, email: email, password: password, role: role }, token.__raw);
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
                    id="emailInput"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    id="passwordInput"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {/* <TextField
                    id="roleIdInput"
                    placeholder="Role"
                    inputProps={{ type: "number" }}
                    onChange={(e) => setRoleId(parseInt(e.target.value))}
                /> */}
                <Select
                    id="roleSelect"
                    value={role}
                    onChange={(e) => setRole(e.target.value as string)}
                >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                    <MenuItem value="Regular User">Regular User</MenuItem>
                </Select>
                <Button type="submit" aria-label="submitAddUserButton">
                    <AddCircleOutlineIcon aria-label="addIcon" />
                </Button>
            </form>
        </Box>
    );
}

export default AddUser;
