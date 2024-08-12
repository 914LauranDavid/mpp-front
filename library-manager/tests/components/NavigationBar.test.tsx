import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import NavigationBar from '../../src/components/NavigationBar';
import { useAuth0 } from "@auth0/auth0-react";
import { mocked } from "jest-mock";
import { act } from 'react-dom/test-utils';

const user = {
    email: "johndoe@me.com",
    email_verified: true,
    sub: "auth0|12345678901234"
};

jest.mock("@auth0/auth0-react");

const mockedUseAuth0 = mocked(useAuth0);

jest.mock('../../src/stores/CatStore', () => ({
    useCatStore: jest.fn(() => ({
        getUserRoleName: jest.fn(() => Promise.resolve("Admin"))
    }))
}));

describe('if admin', () => {
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

    it('renders correctly', async () => {
        await act(async () => {
            render(<BrowserRouter><NavigationBar /></BrowserRouter>); 
        });

        expect(screen.getByText('CatApp')).toBeInTheDocument();
        expect(screen.getByText('All cats')).toBeInTheDocument();
        expect(screen.getByText('Add a new cat')).toBeInTheDocument();
    });
});
