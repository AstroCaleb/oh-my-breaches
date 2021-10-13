import React from 'react';
import { shallow, mount } from 'enzyme';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import BreachesData from './BreachesData';
import UserLookup from '../app/components/UserLookup';

beforeAll(() => {
    require('whatwg-fetch');
});

afterEach(cleanup);

describe('<UserLookup />', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders 1 form element', () => {
        const userLookupWrapper = shallow(<UserLookup />);
        expect(userLookupWrapper.find('form')).toHaveLength(1);
    });

    it('renders 1 input with no value', () => {
        const { getByPlaceholderText } = render(<UserLookup />);
        expect(getByPlaceholderText('Email or Phone').value).toBe('');
    });

    describe('Entering user info', () => {
        it('should update input value', () => {
            const { getByPlaceholderText } = render(<UserLookup />);

            fireEvent.change(getByPlaceholderText('Email or Phone'), { target: {value: 'Test'} });
            expect(getByPlaceholderText('Email or Phone').value).toBe('Test');
        });

        it('should trigger state update', () => {
            const setLookupInfo = jest.fn();
            const wrapper = mount(<UserLookup onChange={setLookupInfo} />);
            const handleChange = jest.spyOn(React, 'useState');
            handleChange.mockImplementation(lookupInfo => [lookupInfo, setLookupInfo]);

            wrapper.find('#find-breaches-input').simulate('click');
            expect(setLookupInfo).toBeTruthy();
        });
    });
});
