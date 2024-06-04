import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import AddCat from '../../src/components/cats/AddCat';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { Addchart } from '@mui/icons-material';
import { useAuth0 } from "@auth0/auth0-react";
import { mocked } from "jest-mock";

const mockAddCat = jest.fn();

const user = {
    email: "johndoe@me.com",
    email_verified: true,
    sub: "auth0|12345678901234"
};

jest.mock("@auth0/auth0-react");

const mockedUseAuth0 = mocked(useAuth0);

jest.mock('../../src/stores/CatStore', () => ({
    useCatStore: jest.fn(() => ({
        addCat: mockAddCat,
        getUserRoleName: jest.fn(() => Promise.resolve("Admin"))
    }))
}));

describe('AddCat', () => {
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

    it('inputs render correctly', async () => {
        await act(async () => {
            render(<BrowserRouter><AddCat /></BrowserRouter>);
        });

        expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Age')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Weight')).toBeInTheDocument();
        expect(screen.getByLabelText('addIcon')).toBeInTheDocument();
    });

    it('does not call addCat when pressing add with empty name', async () => {
        await act(async () => {
            render(<BrowserRouter><AddCat /></BrowserRouter>);
        });

        await act(async () => {
            fireEvent.click(screen.getByLabelText("addIcon"));
        });

        expect(mockAddCat).not.toHaveBeenCalled();
    });

    it('calls addCat and when pressing add', async () => {
        await act(async () => {
            render(<BrowserRouter><AddCat /></BrowserRouter>);
        });

        await userEvent.type(screen.getByPlaceholderText("Name"), 'AddedCat');
        await userEvent.type(screen.getByPlaceholderText("Age"), '12');
        await userEvent.type(screen.getByPlaceholderText("Weight"), '3.5');
        await act(async () => {
            fireEvent.click(screen.getByLabelText("addIcon"));
        });

        expect(mockAddCat).toHaveBeenCalled();
    });
});
