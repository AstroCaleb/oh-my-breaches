import React from 'react';
import { shallow } from 'enzyme';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import moment from 'moment';

import BreachesData from './BreachesData';
import BreachDetails from '../app/components/BreachDetails';

beforeAll(() => {
    require('whatwg-fetch');
});

afterEach(cleanup);

describe('<BreachDetails />', () => {
    it('should render section and content correctly', () => {
        render(<BreachDetails
            details={BreachesData[0]}
            closeBreachDetailsFn={() => {}}
        />);

        const formattedDate = moment(BreachesData[0].BreachDate).format('MMMM D, YYYY');
        const formattedUsers = (BreachesData[0].PwnCount).toLocaleString(undefined);
        const breachTitle = screen.queryByText(/Breach Title One/i);
        const breachDomain = screen.queryByText(/breacheddomain.com/i);
        const breachDate = screen.queryByText(formattedDate);
        const breachUsers = screen.queryByText(formattedUsers);

        expect(breachTitle).toBeInTheDocument();
        expect(breachDomain).toBeInTheDocument();
        expect(breachDate).toBeInTheDocument();
        expect(breachUsers).toBeInTheDocument();
    });

    it('should render logo', () => {
        const breachDetails = shallow(<BreachDetails
            details={BreachesData[0]}
            closeBreachDetailsFn={() => {}}
        />);
        expect(breachDetails.find('img').prop('src')).toEqual('https://domain.com/logopath.png');
    });
});
