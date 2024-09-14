import React from 'react';
import { render, fireEvent, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import AllUsers from '../../src/components/users/AllUsers';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { Addchart } from '@mui/icons-material';
import { useAuth0 } from "@auth0/auth0-react";
import { mocked } from "jest-mock";

const mockAddCat = jest.fn();
const mockUpdateUserRole = jest.fn();
const mockDeleteUser = jest.fn();
const mockUpdateUserName = jest.fn();

const user = {
    email: "johndoe@me.com",
    name: "John Doe",
    email_verified: true,
    sub: "auth0|12345678901234"
};

jest.mock("@auth0/auth0-react");

const mockedUseAuth0 = mocked(useAuth0);

let allUsers = [
    { id: 1, name: 'theAdmin', role: 'Admin', email: 'something@da.com' },
    { id: 2, name: 'theRegularUser', role: 'Regular User', email: 'yes@da.com' }
]

jest.mock('../../src/stores/CatStore', () => ({
    useCatStore: jest.fn(() => ({
        addCat: mockAddCat,
        getUserRoleName: jest.fn(() => Promise.resolve("Admin")),
        getAllUsers: jest.fn(() => Promise.resolve(allUsers)),
        updateUserRole: mockUpdateUserRole,
        deleteUser: mockDeleteUser,
        updateUserName: mockUpdateUserName
    }))
}));

describe('UserProfile', () => {
    beforeEach(() => {
        mockedUseAuth0.mockReturnValue({
            isAuthenticated: true,
            user,
            logout: jest.fn(),
            loginWithRedirect: jest.fn(),
            getAccessTokenWithPopup: jest.fn(),
            getAccessTokenSilently: jest.fn(),
            getIdTokenClaims: jest.fn(() => Promise.resolve({ __raw: "fake_token" })),
            loginWithPopup: jest.fn(),
            isLoading: false,
            handleRedirectCallback: jest.fn()
        });
    });

    it('users render correctly', async () => {
        await act(async () => {
            render(<BrowserRouter><AllUsers /></BrowserRouter>);
        });

        expect(screen.getByText(/theAdmin/)).toBeInTheDocument();
        expect(screen.getByText(/theRegularUser/)).toBeInTheDocument();
        expect(screen.getByText(/something@da.com/)).toBeInTheDocument();
        expect(screen.getByText(/yes@da.com/)).toBeInTheDocument();
    });

    it('delete button calls deleteUser', async () => {
        await act(async () => {
            render(<BrowserRouter><AllUsers /></BrowserRouter>);
        });

        await act(async () => {
            fireEvent.click(screen.getByLabelText("deleteIcon1"));
        });

        expect(mockDeleteUser).toHaveBeenCalled();
    });
});
