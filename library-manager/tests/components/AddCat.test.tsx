import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import AddCat from '../../src/components/AddCat';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { Addchart } from '@mui/icons-material';

const mockAddCat = jest.fn();

jest.mock('../../src/stores/CatStore', () => ({
    useCatStore: jest.fn(() => ({
        addCat: mockAddCat
    }))
}));

describe('AddCat', () => {
    // it('inputs render correctly', () => {
    //     render(<BrowserRouter><AddCat /></BrowserRouter>);

    //     expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    //     expect(screen.getByPlaceholderText('Age')).toBeInTheDocument();
    //     expect(screen.getByPlaceholderText('Weight')).toBeInTheDocument();
    //     expect(screen.getByLabelText('addIcon')).toBeInTheDocument();
    // });

    it('does not call addCat when pressing add with empty name', async () => {
        render(<BrowserRouter><AddCat /></BrowserRouter>);

        fireEvent.click(screen.getByLabelText("addIcon"));

        expect(mockAddCat).not.toHaveBeenCalled();
    });

    it('calls addCat and when pressing add', async () => {
        render(<BrowserRouter><AddCat /></BrowserRouter>);

        await userEvent.type(screen.getByPlaceholderText("Name"), 'AddedCat');
        await userEvent.type(screen.getByPlaceholderText("Age"), '12');
        await userEvent.type(screen.getByPlaceholderText("Weight"), '3.5');
        fireEvent.click(screen.getByLabelText("addIcon"));

        expect(mockAddCat).toHaveBeenCalled();
    });

    
});
