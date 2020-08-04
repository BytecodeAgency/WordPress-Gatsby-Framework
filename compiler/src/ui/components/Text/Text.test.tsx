import React from 'react';
import { mount } from 'enzyme';
import Text from './Text';
import testRequest from '@wp-compiler/ui/test/testRequest';

describe('Button', () => {
    const testText = 'Test Text';
    let wrapper: any;
    beforeEach(() => {
        wrapper = mount(
            <Text
                theme={testRequest.theme}
                text={ testText }
                sizes={{ md: 6, sm: 6 }}
            />,
        );
    });

    it('should render', () => {
        expect(wrapper.type()).toEqual(Text);
    });
});
