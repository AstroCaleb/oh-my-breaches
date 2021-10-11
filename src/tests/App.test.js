import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../app/App';

test('renders learn react link', () => {
    render(<App />);
    const welcomeElement = screen.queryByText(/Welcome/i);
    expect(welcomeElement).toBeInTheDocument();
});
