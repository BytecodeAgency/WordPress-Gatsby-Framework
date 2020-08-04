import React from 'react';
import styled from 'styled-components';
import Theme from '@wp-compiler/types/request/Theme';
import { Col } from 'react-grid-system';
import { mobileMenuBreakPoint } from '../../helpers/breakpoints';
import HTMLDisplay from '../HTMLDisplay/HTMLDisplay';

const Footer: React.FC<FooterProps> = ({ theme }) => {
    const footerColumns = theme.footer.map((footerItem, index) => (
        <Column
            key={`footer${index}`}
            className={`footer-column footer-column${index}`}
        >
            <Title>
                <HTMLDisplay
                    className={`footer-title footer-title${index}`}
                    innerHtml={{
                        __html: footerItem.title ? footerItem.title : '',
                    }}
                />
            </Title>
            <Text key={index}>
                <HTMLDisplay
                    className={`footer-text footer-text${index}`}
                    innerHtml={{
                        __html: footerItem.content ? footerItem.content : '',
                    }}
                />
            </Text>
        </Column>
    ));

    return (
        <>
        <StyledCol md={12} sm={12}>
            <FooterContainer theme={theme} className={'footer-container'}>
                {footerColumns}
            </FooterContainer>
        </StyledCol>
        <StyledCol md={12} sm={12}>
            <HTMLDisplay
                className={'bottombar-container'}
                innerHtml={{
                    __html: theme.bottombar ? theme.bottombar : '',
                }}
            />
            </StyledCol>
        </>
    );
};

export default Footer;

const FooterContainer = styled.div`
    display: inline-flex;
    justify-content: space-evenly;
    width: 100%;
    height: auto;
    min-height: 20vh;
    margin-top: -4px;
    background-color: ${(props: { theme: Theme }) =>
        props.theme.colors.tertiary};
    @media (max-width: ${mobileMenuBreakPoint}) {
        display: block;
    }
`;

const Text = styled.div`
    text-align: left;
    vertical-align: top;
    @media (max-width: ${mobileMenuBreakPoint}) {
        display: block;
        width: 50vw;
        padding: 1rem;
        padding-left: 2rem;
    }
`;

const Title = styled.h1`
    text-align: left;
    @media (max-width: ${mobileMenuBreakPoint}) {
        display: block;
        padding-left: 1rem;
        font-size: 3rem;
    }
`;

const Column = styled.div`
    display: inline-block;
    text-align: left;
    vertical-align: top;
`;

const StyledCol = styled(Col)`
    height: auto;
`;

interface FooterProps {
    theme: Theme;
}
