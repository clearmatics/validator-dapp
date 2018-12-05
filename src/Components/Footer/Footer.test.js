import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';

describe('Footer', () => {
	let wrapper;
	beforeEach(() => (wrapper = shallow(<Footer />)));

	it('should render correctly', () => expect(wrapper).toMatchSnapshot());

	it('should render a <div />', () => {
		expect(wrapper.find('div').length).toEqual(1);
	});

	it('should render a <img />', () => {
		expect(wrapper.find('img').length).toEqual(1);
	});
	it('should render a <span />', () => {
		expect(wrapper.find('span').length).toEqual(1);
	});
});
