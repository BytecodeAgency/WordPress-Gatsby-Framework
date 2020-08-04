import React from 'react';
import 'react-dom';
import { mount } from 'enzyme';
import Slider from './Slider';
import Theme from '@wp-compiler/types/request/Theme';
import testRequest from '@wp-compiler/ui/test/testRequest';
import Slide from '@wp-compiler/types/request/PageBlocks/Slide';

describe('Slider', () => {
    const theme: Theme = testRequest.theme;
    let wrapper: any;

    it('should render', () => {
        const slides: Slide[] = [{
            image: 'test',
            text: 'text',
            links: [{ link: { url: 'test.nl', title: '', target: '' } }],
        }];
        wrapper = mount(<Slider slides={slides} theme={theme} />);
        expect(wrapper.type()).toEqual(Slider);
    });
});
