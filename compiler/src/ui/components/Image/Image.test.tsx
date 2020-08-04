import React from 'react';
import { mount } from 'enzyme';
import Image from './Image';

describe('Image', () => {
    let wrapper: any;
    beforeEach(() => {
        wrapper = mount(<Image sizes={{ sm: 12, md: 12 }} imageUrl={''} />);
    });

    it('should render', () => {
        expect(wrapper.type()).toEqual(Image);
    });
});
