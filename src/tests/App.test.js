import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../app/App';

test('Welcome text is rendered', () => {
    render(<App />);
    const welcomeElement = screen.queryByText(/Welcome/i);
    expect(welcomeElement).toBeInTheDocument();
});
