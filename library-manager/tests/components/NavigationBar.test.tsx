import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import NavigationBar from '../../src/components/NavigationBar';

describe('AllCats', () => {
    it('renders correctly', () => {
        render(<BrowserRouter><NavigationBar /></BrowserRouter>);  // TODO see if we need router

        expect(screen.getByText('CatApp')).toBeInTheDocument();
        expect(screen.getByText('All cats')).toBeInTheDocument();
        expect(screen.getByText('Add a new cat')).toBeInTheDocument();
    });
});
