import React from 'react';
import { mount } from 'enzyme';
import Map from './Map';
import testRequest from '@wp-compiler/ui/test/testRequest';

describe('Button', () => {
    let wrapper: any;
    beforeEach(() => {
        wrapper = mount(
            <Map
                theme={testRequest.theme}
                map={{ address: 'test', lat: 'test', lng: 'test' }}
                sizes={{ md: 6, sm: 6 }}
            />,
        );
    });

    it('should render', () => {
        expect(wrapper.type()).toEqual(Map);
    });
});
