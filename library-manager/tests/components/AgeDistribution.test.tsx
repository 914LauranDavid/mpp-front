// Note: jest and mui x-charts are incompatible

// import React from 'react';
// import { render, screen, act } from '@testing-library/react';
// import AgeDistribution from '../../src/components/cats/AgeDistribution';
// import '@testing-library/jest-dom';
// import { BrowserRouter } from 'react-router-dom';
// import { useCatStore } from '../../src/stores/CatStore';
// import { useAuth0 } from "@auth0/auth0-react";
// import { mocked } from "jest-mock";

// // Mock the useAuth0 hook
// jest.mock("@auth0/auth0-react");
// const mockedUseAuth0 = mocked(useAuth0);

// // Mock the useCatStore hook
// jest.mock('../../src/stores/CatStore', () => ({
//     useCatStore: jest.fn(() => ({
//         ageDistribution: [{ age: 3, count: 5 }, { age: 4, count: 7 }],
//         fetchAgeDistribution: jest.fn(), // Mock fetchAgeDistribution function
//     }))
// }));

// describe('AgeDistribution', () => {
//     beforeEach(() => {
//         // Mock the return value of useAuth0 hook
//         mockedUseAuth0.mockReturnValue({
//             isAuthenticated: true,
//             user: { email: "johndoe@me.com", email_verified: true, sub: "auth0|12345678901234" },
//             logout: jest.fn(),
//             loginWithRedirect: jest.fn(),
//             getAccessTokenWithPopup: jest.fn(),
//             getAccessTokenSilently: jest.fn(),
//             getIdTokenClaims: jest.fn(() => Promise.resolve({ __raw: "fake_token" })),
//             loginWithPopup: jest.fn(),
//             isLoading: false,
//             handleRedirectCallback: jest.fn()
//         });
//     });

//     it('renders the age distribution chart', async () => {
//         await act(async () => {
//             render(
//                 <BrowserRouter>
//                     <AgeDistribution />
//                 </BrowserRouter>
//             );
//         });

//         const chart = screen.getByTestId("age-distribution-chart");
//         expect(chart).toBeInTheDocument();
//     });
// });
