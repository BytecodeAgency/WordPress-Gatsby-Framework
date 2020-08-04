import React from 'react';
import styled from 'styled-components';
import Theme from '@wp-compiler/types/request/Theme';
import { mobileMenuBreakPoint } from '../../helpers/breakpoints';

const Button = (props: Theme | any) => {
    return (
        <Styledbutton
            {...props}
            className={`menu button-base ${props.className}`}
        >
            {props.children}
        </Styledbutton>
    );
};

const Styledbutton = styled.a`
    display: block;
    background-color: ${(props: { theme: Theme }) =>
        props.theme.colors.primary};
    color: ${(props: { theme: Theme }) => props.theme.colors.secondary};
    margin: 0 0;
    user-select: none;
    font-size: 1.2rem;
    &:hover {
        cursor: pointer;
    }
`;

export default Button;
