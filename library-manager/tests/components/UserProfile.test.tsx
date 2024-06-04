import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import UserProfile from '../../src/components/UserProfile';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { Addchart } from '@mui/icons-material';
import { useAuth0 } from "@auth0/auth0-react";
import { mocked } from "jest-mock";

const mockAddCat = jest.fn();

const user = {
    email: "johndoe@me.com",
    name: "John Doe",
    email_verified: true,
    sub: "auth0|12345678901234"
};

jest.mock("@auth0/auth0-react");

const mockedUseAuth0 = mocked(useAuth0);

jest.mock('../../src/stores/CatStore', () => ({
    useCatStore: jest.fn(() => ({
        addCat: mockAddCat,
        getUserRoleName: jest.fn(() => Promise.resolve("Admin")),
        getUsersFavoriteBreed: jest.fn(() => Promise.resolve("orange"))
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

    it('user data renders correctly', async () => {
        await act(async () => {
            render(<BrowserRouter><UserProfile /></BrowserRouter>);
        });

        expect(screen.getByText(/John Doe/)).toBeInTheDocument();
        expect(screen.getByText(/orange/)).toBeInTheDocument();
        expect(screen.getByText(/johndoe@me.com/)).toBeInTheDocument();
        expect(screen.getByText(/Admin/)).toBeInTheDocument();
    });
});
