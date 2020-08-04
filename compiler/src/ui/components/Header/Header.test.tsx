import React from 'react';
import 'react-dom';
import { mount } from 'enzyme';
import Header from './Header';
import Theme from '@wp-compiler/types/request/Theme';
import testRequest from '@wp-compiler/ui/test/testRequest';

describe('Header', () => {
    const theme : Theme = testRequest.theme;
    let wrapper: any;

    it('should render', () => {
        wrapper = mount(
            <Header imageUrl={''} text={'interesting'} theme={theme} />,
        );
        expect(wrapper.type()).toEqual(Header);
    });
});
