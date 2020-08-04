import React from 'react';
import 'react-dom';
import { mount } from 'enzyme';
import Form, { submitForm } from './Form';
import Theme from '@wp-compiler/types/request/Theme';
import testRequest from '@wp-compiler/ui/test/testRequest';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Form', () => {
    const theme: Theme = testRequest.theme;
    const FormFields = [
        {
            name: 'name',
            placeholder: 'test',
            required: true,
            type: 'text',
        },
        {
            name: 'email',
            placeholder: 'test',
            required: true,
            type: 'text',
        },
        {
            name: 'number',
            placeholder: 'test',
            required: true,
            type: 'text',
        },
        {
            name: 'message',
            placeholder: 'test',
            required: true,
            type: 'text',
        },
    ];
    let wrapper: any;

    it('should render', () => {
        wrapper = mount(
            <Form
                fields={FormFields}
                sizes={{ md: 6, sm: 6 }}
                theme={theme}
                title={'form'}
                submitUrl={'test'}
                submitButtonText={'submit'}
            />,
        );
        expect(wrapper.type()).toEqual(Form);
    });

    it('should send a post request when submit is pressed', () => {
        wrapper = mount(
            <Form
                fields={FormFields}
                sizes={{ md: 6, sm: 6 }}
                theme={theme}
                title={'form'}
                submitUrl={'test'}
                submitButtonText={'submit'}
            />,
        );
        mockedAxios.post.mockResolvedValueOnce({ data: {} });
        wrapper
            .find('#name')
            .find('input')
            .simulate('change', { target: { value: 'Hello' } });
        wrapper
            .find('#email')
            .find('input')
            .simulate('change', { target: { value: 'Hello@hello' } });
        wrapper.find('form').simulate('submit');
        expect(mockedAxios.post).toBeCalled();
    });
});

describe('submitForm', () => {
    const testData = {
        name: 'test',
    };

    it('submitForm should return the correct values when failing', async () => {
        const mockedCallBack = jest.fn();
        const builtSubmitter = submitForm('test', mockedCallBack);
        mockedAxios.post.mockResolvedValueOnce({ data: {} });
        await builtSubmitter(testData);
        expect(mockedCallBack).toBeCalled();
        expect(mockedCallBack.mock.calls[0][0]).toStrictEqual({
            isSuccess: false,
            message:
                'Er ging iets mis met verzenden.' +
                ' Probeer het later opnieuw!',
        });
    });
});
