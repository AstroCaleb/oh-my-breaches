import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../app/App';

beforeAll(() => {
    require('whatwg-fetch');
});

afterEach(cleanup);

describe('<App />', () => {
    it('should render welcome text', () => {
        render(<App />);
        const welcomeText = screen.queryByText(/Welcome/i);
        expect(welcomeText).toBeInTheDocument();
    });
});
