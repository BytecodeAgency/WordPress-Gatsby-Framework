import React from 'react';
import 'react-dom';
import { mount } from 'enzyme';
import CTA from './CTA';
import Theme from '@wp-compiler/types/request/Theme';
import testRequest from '@wp-compiler/ui/test/testRequest';

describe('CTA', () => {
    const theme : Theme = testRequest.theme;
    const link = {
        title: 'test',
        url: '#',
        target: '_blank',
    };
    let wrapper: any;

    it('should render', () => {
        wrapper = mount(
            <CTA
                imageUrl={''}
                text={'interesting'}
                theme={theme}
                link={link}
                sizes={{ sm: 6, md: 6 }}
            />,
        );
        expect(wrapper.type()).toEqual(CTA);
    });
});
