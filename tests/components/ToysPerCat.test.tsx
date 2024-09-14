import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToysPerCat from '../../src/components/ToysPerCat';
import '@testing-library/jest-dom'

jest.mock('../../src/stores/CatStore', () => ({
    useCatStore: () => ({
        getToysPerCat: jest.fn(() => Promise.resolve([
            { cat: { id: 1, name: 'Fluffy' }, theNumber: 5 },
            { cat: { id: 2, name: 'Whiskers' }, theNumber: 3 },
        ])),
    }),
}));

describe('ToysPerCat', () => {
    it('renders table headers correctly', () => {
        render(<ToysPerCat />);

        expect(screen.getByText('Cat Name')).toBeInTheDocument();
        expect(screen.getByText('Number of Toys')).toBeInTheDocument();
    });

    it('renders data correctly', async () => {
        render(<ToysPerCat />);

        await waitFor(() => {
            expect(screen.getByText('Fluffy')).toBeInTheDocument();
            expect(screen.getByText('Whiskers')).toBeInTheDocument();
            expect(screen.getByText('5')).toBeInTheDocument();
            expect(screen.getByText('3')).toBeInTheDocument();
        });
    });
});
