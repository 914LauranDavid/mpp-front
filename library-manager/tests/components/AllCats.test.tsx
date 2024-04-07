import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AllCats from '../../src/components/AllCats';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { Cat } from "../../src/domain/Cat"
import { useCatStore } from '../../src/stores/CatStore';

const mockDeleteCat = jest.fn();
const mockFetch = jest.fn();
const mockCats = [{ id: 1, name: "Ana", age: 512, weight: 1.3 }, { id: 2, name: "Andrei", age: 3, weight: 2.354 },
{ id: 3, name: "Anaaaaa", age: 5, weight: 1.3 }, { id: 4, name: "Ion", age: 5, weight: 1.3 }, { id: 5, name: "Ionut", age: 5, weight: 1.3 }];
// { id: 6, name: "Ionel", age: 5, weight: 1.3 }, { id: 7, name: "Ionel2", age: 5, weight: 1.3 }, { id: 8, name: "Ionel3", age: 5, weight: 1.3 }];

jest.mock('../../src/stores/CatStore', () => ({
    useCatStore: jest.fn(() => ({
        catsOnPage: mockCats,
        getCount: jest.fn(() => Promise.resolve(8)),
        deleteCat: mockDeleteCat,
        fetch: mockFetch,
    }))
}));

describe('AllCats', () => {
    // let allCats = [{ id: 1, name: "Ana", age: 5, weight: 1.3 }, { id: 2, name: "Andrei", age: 3, weight: 2.3 }];
    // const getAllCats = jest.fn(() => allCats);
    // const setAll = jest.fn((cats: Cat[]) => { });
    // const deleteCat = jest.fn((id: number) => allCats = allCats.filter(cat => cat.id !== id));

    it('table header renders correctly', () => {
        render(<BrowserRouter><AllCats /></BrowserRouter>);

        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Age')).toBeInTheDocument();
    });

    it('table content renders correctly', () => {
        render(<BrowserRouter><AllCats /></BrowserRouter>);

        expect(screen.getByText('Ana')).toBeInTheDocument();
        expect(screen.getByText('512')).toBeInTheDocument();
        expect(screen.getByText('Andrei')).toBeInTheDocument();
        expect(screen.getByText('Ionut')).toBeInTheDocument();

        expect(screen.queryByText('2.354')).not.toBeInTheDocument();  // weight does not appear
    });

    it('calls deleteCat when pressing delete', () => {
        render(<BrowserRouter><AllCats /></BrowserRouter>);

        fireEvent.click(screen.getByLabelText("deleteIcon1"));
        expect(mockDeleteCat).toHaveBeenCalled();
    });
});

describe('AllCatsSort', () => {
    it('calls fetch after pressing sort', () => {
        render(<BrowserRouter><AllCats /></BrowserRouter>);

        fireEvent.click(screen.getByText("Sort decreasingly by name"));
        expect(mockFetch).toHaveBeenCalled();
    });
});

describe('AllCatsChangePage', () => {
    it('calls fetch after pressing next', async () => {
        render(<BrowserRouter><AllCats /></BrowserRouter>);

        await new Promise(resolve => setTimeout(resolve, 1000));

        fireEvent.click(screen.getByText("Next"));
        expect(mockFetch).toHaveBeenCalled();
    });
});
