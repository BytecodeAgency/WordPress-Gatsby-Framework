import React from 'react';
import styled from 'styled-components';
import Theme from '@wp-compiler/types/request/Theme';
import { Col } from 'react-grid-system';
import { mobileMenuBreakPoint } from '../../helpers/breakpoints';
import HTMLDisplay from '../HTMLDisplay/HTMLDisplay';

const Text: React.FC<TextProps> = ({ text, theme, sizes }) => {
    return (
        <StyledCol md={sizes.md} sm={sizes.sm}>
            <TextContainer className={'text-container'} theme={theme}>
                <HTMLDisplay
                    className={'text'}
                    innerHtml={{ __html: text ? text : '' }}
                />
            </TextContainer>
        </StyledCol>
    );
};

export default Text;

const TextContainer = styled.div`
    display: inline-flex;
    width: 100%;
    height: auto;
    word-wrap: break-word;
    padding: 0;
    margin: 0;
    @media (max-width: ${mobileMenuBreakPoint}) {
        display: block;
        max-width: 100vw;
    }
`;

const StyledCol = styled(Col)`
    height: auto;
    padding: 0;
`;

interface TextProps {
    text: string;
    sizes: { sm: number; md: number };
    theme: Theme;
}
