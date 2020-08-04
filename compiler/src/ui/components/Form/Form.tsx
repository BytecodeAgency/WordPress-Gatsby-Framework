import React, { useState } from 'react';
import styled from 'styled-components';
import Theme from '@wp-compiler/types/request/Theme';
import { Col } from 'react-grid-system';
import axios, { AxiosResponse } from 'axios';
import { mobileMenuBreakPoint } from '../../helpers/breakpoints';
import { InputType } from '@wp-compiler/types/request/PageBlocks/Form';

export const useSignUpForm = (callback: Function, fields: InputType[]) => {
    const startState: any = fields.reduce((reducer, field) => {
        return { ...reducer, [field.name]: '' };
    },                                    {});
    const [inputs, setInputs] = useState(startState);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if (event) {
            event.preventDefault();
            setInputs(startState);
        }
        callback(inputs);
    };
    const handleInputChange = (event: any) => {
        event.persist();
        if (event.target.files) {
            const files = event.target.files;
            for (let i = 0; i < files.length; i = i + 1) {
                const file = files[i];
                setInputs((inputs: any) => ({
                    ...inputs,
                    [`file${i}`]: file,
                }));
            }
        }
        setInputs((inputs: any) => ({
            ...inputs,
            [event.target.name]: event.target.value,
        }));
    };
    return {
        handleSubmit,
        handleInputChange,
        inputs,
    };
};

export const submitForm = (url: string, setSendStatus: Function) => (
    formFields: any,
) => {
    const success = 'successvol verzonden';
    const error = 'Er ging iets mis met verzenden. Probeer het later opnieuw!';
    const bodyData = new FormData();
    Object.keys(formFields)
        .map(key => ({ key, value: formFields[key] }))
        .forEach(keyValuePair => {
            if (keyValuePair.value.isFile) {
                bodyData.append(keyValuePair.key, keyValuePair.value);
            } else {
                bodyData.set(keyValuePair.key, keyValuePair.value);
            }
        });
    axios
        .post(url, bodyData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response: AxiosResponse) =>
            setSendStatus({
                isSuccess: response.status === 200,
                message: response.status === 200 ? success : error,
            }),
        )
        .catch((response: AxiosResponse) =>
            setSendStatus({
                isSuccess: false,
                message: error,
            }),
        );
};

const Form: React.FC<FormProps> = ({
    fields,
    theme,
    sizes,
    submitButtonText,
    submitUrl,
    title,
}) => {
    const [sendStatus, setSendStatus] = useState();

    const {
        inputs,
        handleInputChange,
        handleSubmit,
    }: {
        inputs: any;
        handleInputChange: any;
        handleSubmit: any;
    } = useSignUpForm(submitForm(submitUrl, setSendStatus), fields);

    const createInputFields = (fields: InputType[]) => {
        const inputFields = fields.map((field: InputType) => {
            if (field.type === 'textarea') {
                return (
                    <InputContainer
                        className={'form-input-container'}
                        key={`form-${field.name}`}
                    >
                        <StyledTextArea
                            name={field.name}
                            id={field.name}
                            theme={theme}
                            className=
                                {`menu form-input form-input-${field.name}`}
                            placeholder={field.placeholder}
                            onChange={handleInputChange}
                            value={inputs[field.name]}
                            required={field.required}
                        />
                    </InputContainer>
                );
            }
            if (field.type === 'file') {
                return (
                    <InputContainer
                        className={'form-input-container'}
                        key={`form-${field.name}`}
                    >
                        <StyledInput
                            type="file"
                            name={field.name}
                            id={field.name}
                            theme={theme}
                            className=
                                {`menu form-input form-input-${field.name}`}
                            placeholder={field.placeholder}
                            onChange={handleInputChange}
                            value={inputs[field.name]}
                            required={field.required}
                            multiple
                        />
                    </InputContainer>
                );
            }
            return (
                <InputContainer
                    className={'form-input-container'}
                    key={`form-${field.name}`}
                >
                    <StyledInput
                        type={field.type}
                        name={field.name}
                        id={field.name}
                        theme={theme}
                        className={`menu form-input form-input-${field.name}`}
                        placeholder={field.placeholder}
                        onChange={handleInputChange}
                        value={inputs[field.name]}
                        required={field.required}
                    />
                </InputContainer>
            );
        });
        return inputFields;
    };

    return (
        <StyledCol md={sizes.md} sm={sizes.sm}>
            <FormContainer className={'form-container'}>
                <FormTitle dangerouslySetInnerHTML={{ __html: title }} />
                <StyledForm
                    onSubmit={handleSubmit}
                    className={'form'}
                    id={'form'}
                >
                    {createInputFields(fields)}
                    <SubmitButton
                        type="submit"
                        theme={theme}
                        className={'menu form-submit'}
                    >
                        {submitButtonText}
                    </SubmitButton>
                    {sendStatus && (
                        <Message success={sendStatus.isSuccess} theme={theme}>
                            {sendStatus.message}
                        </Message>
                    )}
                </StyledForm>
            </FormContainer>
        </StyledCol>
    );
};

export default Form;

const FormContainer = styled.div`
    margin: 0%;
    padding: 2vw;
    width: 90vw;
    border: 3vw solid #f5f5f5;
`;

const StyledCol = styled(Col)`
    height: auto;
    z-index: 1;
`;

const StyledForm = styled.form`
    width: 49%;
`;

const Message = styled.div`
    display: block;
    padding-bottom: 2rem;
    margin: 1.5rem 0;
    font-size: 150%;
    outline: none;
    width: 90%;
    color: ${(props: { success: boolean; theme: Theme }) =>
        props.success
            ? props.theme.colors.secondary
            : props.theme.colors.primary};
    @media (max-width: ${mobileMenuBreakPoint}) {
        padding-bottom: 0.5rem;
    }
`;

const FormTitle = styled.h2`
    margin-bottom: 2rem;
`;
const StyledInput = styled.input`
    display: block;
    padding-bottom: 2rem;
    font-size: 150%;
    outline: none;
    width: 90%;
    &::placeholder {
        font-family: ${(props: { theme: Theme }) =>
            props.theme.fonts.menu.name};
        font-weight: ${(props: { theme: Theme }) =>
            props.theme.fonts.menu.weightdefault};
        color: ${(props: { theme: Theme }) => props.theme.colors.menutext};
        opacity: 1; /* Firefox */
    }
    @media (max-width: ${mobileMenuBreakPoint}) {
        padding-bottom: 0.5rem;
    }
`;

const StyledTextArea = styled.textarea`
    display: block;
    padding-bottom: 2rem;
    font-size: 150%;
    outline: none;
    width: 90%;
    &::placeholder {
        font-family: ${(props: { theme: Theme }) =>
            props.theme.fonts.menu.name};
        font-weight: ${(props: { theme: Theme }) =>
            props.theme.fonts.menu.weightdefault};
        color: ${(props: { theme: Theme }) => props.theme.colors.menutext};
        opacity: 1; /* Firefox */
    }
    @media (max-width: ${mobileMenuBreakPoint}) {
        padding-bottom: 0.5rem;
    }
`;

const InputContainer = styled.div`
    margin-bottom: 2rem;
`;

const SubmitButton = styled.button`
    border: none;
    box-shadow: 0px 0px 0px transparent;
    display: block;
    background-color: ${(props: { theme: Theme }) =>
        props.theme.colors.primary};
    color: ${(props: { theme: Theme }) => props.theme.colors.secondary};
    border-radius: 5px;
    user-select: none;
    font-size: 1.2rem;
    padding: 1rem 2rem;
    &:hover {
        background-color: ${(props: { theme: Theme }) =>
            props.theme.colors.secondary};
        color: ${(props: { theme: Theme }) => props.theme.colors.primary};
    }
    @media (max-width: ${mobileMenuBreakPoint}) {
        font-size: 1rem;
    }
`;

interface FormProps {
    fields: InputType[];
    theme: Theme;
    sizes: { sm: number; md: number };
    submitButtonText: string;
    title: string;
    submitUrl: string;
}
