import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import AddCat from '../../src/components/AddCat';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { Cat } from "../../src/model/Cat";
import { Addchart } from '@mui/icons-material';

describe('AddCat', () => {
    let allCats = [{ id: 1, name: "Ana", age: 5, weight: 1.3 }, { id: 2, name: "Andrei", age: 3, weight: 2.3 }];
    const getAllCats = jest.fn(() => allCats);
    const addCat = jest.fn((cat: Cat) => allCats = [...allCats, cat]);

    it('inputs render correctly', () => {
        render(<BrowserRouter><AddCat getAllCats={getAllCats} addCat={addCat} /></BrowserRouter>);

        expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Age')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Weight')).toBeInTheDocument();
        expect(screen.getByLabelText('addIcon')).toBeInTheDocument();
    });

    it('calls addCat and adds cat when pressing add', async () => {
        render(<BrowserRouter><AddCat getAllCats={getAllCats} addCat={addCat} /></BrowserRouter>);

        await userEvent.type(screen.getByPlaceholderText("Name"), 'AddedCat');
        await userEvent.type(screen.getByPlaceholderText("Age"), '12');
        await userEvent.type(screen.getByPlaceholderText("Weight"), '3.5');
        fireEvent.click(screen.getByLabelText("addIcon"));

        expect(addCat).toHaveBeenCalled();
        expect(allCats).toEqual([{ id: 1, name: "Ana", age: 5, weight: 1.3 }, { id: 2, name: "Andrei", age: 3, weight: 2.3 },
        { id: 3, name: "AddedCat", age: 12, weight: 3.5 }]);
    });

    it('does not add cat when pressing add with empty name', () => {
        render(<BrowserRouter><AddCat getAllCats={getAllCats} addCat={addCat} /></BrowserRouter>);

        fireEvent.click(screen.getByLabelText("addIcon"));

        expect(allCats).toEqual([{ id: 1, name: "Ana", age: 5, weight: 1.3 }, { id: 2, name: "Andrei", age: 3, weight: 2.3 },
        { id: 3, name: "AddedCat", age: 12, weight: 3.5 }]);
    });
});
