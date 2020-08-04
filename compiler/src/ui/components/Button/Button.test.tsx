import React from 'react';
import { mount } from 'enzyme';
import Button from './Button';
import testRequest from '@wp-compiler/ui/test/testRequest';

describe('Button', () => {
    const testText = 'Test Text';
    let wrapper: any;
    beforeEach(() => {
        wrapper = mount(<Button theme={testRequest.theme}>{testText}</Button>);
    });

    it('should render', () => {
        expect(wrapper.type()).toEqual(Button);
    });

    it('should render the text', () => {
        expect(wrapper.text()).toBe(testText);
    });
});
