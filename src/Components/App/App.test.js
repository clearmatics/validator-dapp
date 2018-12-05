import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../Footer/Footer';
import App from './App';

describe('App', () => {
	let wrapper;
	beforeEach(() => (wrapper = shallow(<App />)));

	it('should render correctly', () => expect(wrapper).toMatchSnapshot());

	it('should render a <div />', () => {
		expect(wrapper.find('div').length).toEqual(2);
	});

	it('should render the Footer Component', () => {
		expect(wrapper.containsMatchingElement(<Footer />)).toEqual(true);
	});
});
