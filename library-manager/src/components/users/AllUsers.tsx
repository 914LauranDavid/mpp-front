import {
    Box,
    Button,
    Divider,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

import { useCatStore } from "../../stores/CatStore";
import { useAuth0 } from "@auth0/auth0-react";
import { User } from "../../domain/User";
import AddUser from "./AddUser";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


function UsersTable() {
    const { user, getIdTokenClaims } = useAuth0();
    const { getAllUsers, deleteUser, updateUserRole, updateUserName } = useCatStore();
    const [allUsers, setAllUsers] = useState<User[]>([]);

    useEffect(() => {
        updateShownUsers();
    }, [user]);

    const handleDelete = (userId: string) => {
        getIdTokenClaims().then(token => {
            if (token) {
                deleteUser(userId, token.__raw);
                updateShownUsers();
            }
        });
    }

    const [roleInput] = useState<{ [key: number]: string }>({});
    const handleNewRoleSubmit = (userId: string, role: string) => {
        getIdTokenClaims().then(token => {
            if (token) {
                updateUserRole(userId, role, token.__raw);
                updateShownUsers();
            }
        });
    };

    const updateShownUsers = () => {
        getIdTokenClaims().then(tokenClaims => {
            if (tokenClaims)
                getAllUsers(tokenClaims?.__raw).then(receivedUsers => {
                    setAllUsers(receivedUsers);
                    console.log('received these uers: ' + JSON.stringify(receivedUsers));
                }
                );
        });
    }

    // const handleRoleInputChange = (userIndex: number, value: string) => {
    //     setRoleInput(prev => ({ ...prev, [userIndex]: value }));
    // };

    const [newNameInputs, setNewNameInputs] = useState<{ [key: string]: string }>({});

    const handleNewNameSubmit = (userId: string) => {
        const newName = newNameInputs[userId];

        if (!newName || newName.trim() === "") {
            console.log('Name was empty!!');
            alert('Name cannot be empty');  
            return;
        }

        getIdTokenClaims().then(token => {
            if (token) {
                updateUserName(userId, newName, token.__raw);
                updateShownUsers();
            }
        });
    };

    const handleNewNameChange = (userId: string, value: string) => {
        console.log('we are in handlenewnamechange');
        setNewNameInputs(prevState => ({ ...prevState, [userId]: value }));
    };

    return (
        <div>
            <TableContainer>
                <Table sx={{ minWidth: "50%" }}>
                    <TableHead >
                        <TableRow>
                            <TableCell sx={{ fontWeight: 800, }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 800, }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 800, }}>Role</TableCell>
                            <TableCell sx={{ fontWeight: 800, }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allUsers.map((user, userIndex) => (
                            <TableRow key={user.id}>
                                <TableCell sx={{}}>
                                    {user.name}
                                    <form onSubmit={(e) => { e.preventDefault(); handleNewNameSubmit(user.id); }}>
                                        <TextField
                                            id={`newNameInput-${user.id}`}
                                            data-testid={`newNameInput-${user.id}`}
                                            placeholder="New name"
                                            size="small"
                                            value={newNameInputs[user.id] || ""}
                                            onChange={(e) => handleNewNameChange(user.id, e.target.value)}
                                        />
                                        <Button type="submit" aria-label="submitName" data-testid={`newNameButton-${user.id}`}>
                                            <CheckCircleOutlineIcon sx={{ cursor: 'pointer' }} />
                                        </Button>
                                    </form>
                                </TableCell>
                                <TableCell>
                                    {user.email}
                                </TableCell>
                                <TableCell>
                                    {user.role}
                                    <form onSubmit={(e) => { e.preventDefault(); handleNewRoleSubmit(user.id, roleInput[userIndex]); }}>
                                        {/* <TextField
                                            size="small"
                                            id={"roleInput" + userIndex}
                                            value={roleInput[userIndex]}
                                            onChange={(e) => handleRoleInputChange(userIndex, e.target.value)}
                                        />
                                        <Button type="submit" aria-label="submitName">
                                            <CheckCircleOutlineIcon sx={{ cursor: 'pointer' }} />
                                        </Button> */}
                                        <Select
                                            labelId={`role-select-label-${user.id}`}
                                            id={`role-select-${user.id}`}
                                            data-testid={`role-select-${user.id}`}
                                            value={user.role}
                                            onChange={(e) => handleNewRoleSubmit(user.id, e.target.value as string)}
                                        >
                                            <MenuItem value="Admin">Admin</MenuItem>
                                            <MenuItem value="Manager">Manager</MenuItem>
                                            <MenuItem value="Regular User">Regular User</MenuItem>
                                        </Select>
                                    </form>
                                </TableCell>
                                <TableCell>
                                    <DeleteForeverIcon sx={{ cursor: 'pointer', color: 'red', }}
                                        onClick={() => handleDelete(user.id)} aria-label={`deleteIcon${user.id}`}
                                        />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <AddUser />
        </div>
    );
}

function AllUsers() {
    return (
        <Box sx={{ bgcolor: '#f8faca' }}>
            <UsersTable />
            <Divider />
        </Box>
    );
}

export default AllUsers;
