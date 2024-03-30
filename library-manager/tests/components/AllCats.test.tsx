import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AllCats from '../../src/components/AllCats';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { Cat } from "../../src/model/Cat"

describe('AllCats', () => {
    let allCats = [{ id: 1, name: "Ana", age: 5, weight: 1.3 }, { id: 2, name: "Andrei", age: 3, weight: 2.3 }];
    const getAllCats = jest.fn(() => allCats);
    const setAll = jest.fn((cats: Cat[]) => { });
    const deleteCat = jest.fn((id: number) => allCats = allCats.filter(cat => cat.id !== id));

    it('table header renders correctly', () => {
        render(<BrowserRouter><AllCats setAll={setAll} getAllCats={getAllCats} deleteCat={deleteCat} /></BrowserRouter>);

        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Age')).toBeInTheDocument();
    });

    it('table content renders correctly', () => {
        render(<BrowserRouter><AllCats setAll={setAll} getAllCats={getAllCats} deleteCat={deleteCat} /></BrowserRouter>);

        expect(screen.getByText('Ana')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
        expect(screen.getByText('Andrei')).toBeInTheDocument();

        expect(screen.queryByText('2.3')).not.toBeInTheDocument();  // weight does not appear
    });

    it('calls deleteCat when pressing delete', () => {
        render(<BrowserRouter><AllCats setAll={setAll} getAllCats={getAllCats} deleteCat={deleteCat} /></BrowserRouter>);

        fireEvent.click(screen.getByLabelText("deleteIcon1"));
        expect(deleteCat).toHaveBeenCalled();
    });

    it('cat is deleted afterpressing delete', () => {
        render(<BrowserRouter><AllCats setAll={setAll} getAllCats={getAllCats} deleteCat={deleteCat} /></BrowserRouter>);

        expect(allCats).toEqual([{ id: 2, name: "Andrei", age: 3, weight: 2.3 }]);
    });
});

describe('AllCatsSort', () => {
    let allCats = [{ id: 1, name: "Ana", age: 5, weight: 1.3 }, { id: 2, name: "Andrei", age: 3, weight: 2.3 }];
    const getAllCats = jest.fn(() => allCats);
    const setAll = jest.fn((cats: Cat[]) => { });
    const deleteCat = jest.fn((id: number) => allCats = allCats.filter(cat => cat.id !== id));


    it('sorts the array decreasingly after pressing sort', () => {
        render(<BrowserRouter><AllCats setAll={setAll} getAllCats={getAllCats} deleteCat={deleteCat} /></BrowserRouter>);

        fireEvent.click(screen.getByText("Sort decreasingly by name"));
        expect(allCats).toEqual([{ id: 2, name: "Andrei", age: 3, weight: 2.3 },
        { id: 1, name: "Ana", age: 5, weight: 1.3 }]);
    });
});
