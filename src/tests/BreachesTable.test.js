import React from 'react';
import { shallow } from 'enzyme';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

import BreachesData from './BreachesData';
import BreachesTable from '../app/components/BreachesTable';

beforeAll(() => {
    require('whatwg-fetch');
});

afterEach(cleanup);

describe('BreachesData', () => {
    it('has three results', () => {
        expect(BreachesData).toHaveLength(3);
    });
});

describe('<BreachesTable />', () => {
    it('renders 1 table element', () => {
        const breachesTable = shallow(
            <BreachesTable breaches={BreachesData} />
        );
        expect(breachesTable.find('table')).toHaveLength(1);
    });

    it('renders 3 tbody elements', () => {
        const breachesTable = shallow(
            <BreachesTable breaches={BreachesData} />
        );
        expect(breachesTable.find('tbody')).toHaveLength(3);
    });

    test('renders 1 tbody after filtering breaches', () => {
        render(<BreachesTable breaches={BreachesData} />)
        fireEvent.change(screen.getByPlaceholderText('Type at least 3 characters'), { target: {value: 'BreachNameOne'} });

        setTimeout(() => {
            const tbodyElements = screen.getAllByTestId('list-tbody');
            expect(tbodyElements).toHaveLength(1)
        }, 200);
      });
});
