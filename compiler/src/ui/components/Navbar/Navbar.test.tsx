import React from 'react';
import 'react-dom';
import { mount } from 'enzyme';
import Navbar from './Navbar';
import Theme from '@wp-compiler/types/request/Theme';
import testRequest from '@wp-compiler/ui/test/testRequest';

describe('Navbar', () => {
    const theme : Theme = testRequest.theme;
    const navBarItems = [
        {
            url: 'link',
            label: 'label',
        },
    ];
    let wrapper: any;

    it('should render', () => {
        wrapper = mount(
            <Navbar navbarItems={navBarItems} logoUrl={''} theme={theme} />,
        );
        expect(wrapper.type()).toEqual(Navbar);
    });

    it('the navbar should contains links', () => {
        wrapper = mount(
            <Navbar navbarItems={navBarItems} logoUrl={''} theme={theme} />,
        );
        expect(wrapper.find('li').text()).toContain('label');
    });

    it('the navbar should contain a Logo', () => {
        wrapper = mount(
            <Navbar
                navbarItems={navBarItems}
                logoUrl={'logoUrl'}
                theme={theme}
            />,
        );
        expect(wrapper.find('img').exists()).toEqual(true);
    });

    it('the navbar should not contain a Logo', () => {
        wrapper = mount(<Navbar theme={theme} />);
        expect(wrapper.find('img')).toEqual({});
    });

    it('the navbar should not have links when none are assigned', () => {
        wrapper = mount(<Navbar theme={theme} />);
        expect(wrapper.find('li')).toEqual({});
    });
});
