import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import CatDetails from '../../src/components/cats/CatDetails';
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { mocked } from "jest-mock";

const user = {
    email: "johndoe@me.com",
    name: "John Doe",
    email_verified: true,
    sub: "auth0|12345678901234"
};

jest.mock("@auth0/auth0-react");

const mockedUseAuth0 = mocked(useAuth0);


const mockGetCatById = jest.fn(() => {
    return Promise.resolve({ id: 3, name: "Thecat", age: 12, weight: 2.5 });
});
const mockUpdateCat = jest.fn();

jest.mock('../../src/stores/CatStore', () => ({
    useCatStore: jest.fn(() => ({
        getCatById: mockGetCatById,
        updateCat: mockUpdateCat,
        getUserRoleName: jest.fn(() => Promise.resolve("Admin"))
    }))
}));

describe('CatDetails', () => {
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

    it('the details render correctly', async () => {
        render(
            <MemoryRouter initialEntries={[`/cats/3`]}>
                <Routes>
                    <Route
                        path="/cats/:id"
                        element={<CatDetails />}
                    />
                </Routes>
            </MemoryRouter>
        );

        await new Promise(resolve => setTimeout(resolve, 1000));

        expect(screen.getByText('Thecat')).toBeInTheDocument();
        expect(screen.queryByText('Error')).not.toBeInTheDocument();
    });

    it('calls updateCat when updating name', async () => {
        await act(async () => {
            render(
                <MemoryRouter initialEntries={[`/cats/3`]}>
                    <Routes>
                        <Route
                            path="/cats/:id"
                            element={<CatDetails />}
                        />
                    </Routes>
                </MemoryRouter>
            );
        });

        fireEvent.click(screen.getByLabelText("openNameInput"));
        await userEvent.type(screen.getByPlaceholderText("New name"), 'Sofia');

        fireEvent.click(screen.getByLabelText("submitName"));

        await new Promise(resolve => setTimeout(resolve, 1000));

        expect(mockUpdateCat).toHaveBeenCalled();
    });

    it('calls updateCat when updating age', async () => {
        await act(async () => {
            render(
                <MemoryRouter initialEntries={[`/cats/3`]}>
                    <Routes>
                        <Route
                            path="/cats/:id"
                            element={<CatDetails />}
                        />
                    </Routes>
                </MemoryRouter>
            );
        });

        fireEvent.click(screen.getByLabelText("openAgeInput"));
        await userEvent.type(screen.getByLabelText("ageInput"), "21");

        fireEvent.click(screen.getByLabelText("submitAge"));

        await new Promise(resolve => setTimeout(resolve, 1000));

        expect(mockUpdateCat).toHaveBeenCalled();
    });

    it('calls updateCat when updating weight', async () => {
        await act(async () => {
            render(
                <MemoryRouter initialEntries={[`/cats/3`]}>
                    <Routes>
                        <Route
                            path="/cats/:id"
                            element={<CatDetails />}
                        />
                    </Routes>
                </MemoryRouter>
            );
        });

        fireEvent.click(screen.getByLabelText("openWeightInput"));
        await userEvent.type(screen.getByLabelText("weightInput"), "2.1");

        fireEvent.click(screen.getByLabelText("submitWeight"));

        await new Promise(resolve => setTimeout(resolve, 1000));

        expect(mockUpdateCat).toHaveBeenCalled();
    });
});
