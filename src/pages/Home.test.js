import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';
//for database things (if we have, use beforeEach and afterEach with a test db)

describe('Test Layout Example', () => {
    test('1 should not be 3', () => {
        expect(1).not.toBe(3);
    });
});

// shallow is for single component
// mount when you need to test children 
describe('Enzyme example', () => {
    test('H1 tag is rendered correctly', () => {
        const wrapper = shallow(<Home />);
        // shows whole component jsx
        console.log(wrapper.debug())
        expect(wrapper.find('h1').first().text()).toBe("Home Page");
    });
});