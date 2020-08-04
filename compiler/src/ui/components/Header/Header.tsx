import React from 'react';
import styled from 'styled-components';
import Theme from '@wp-compiler/types/request/Theme';
import Link from '@wp-compiler/types/request/PageBlocks/Link';
import { Col } from 'react-grid-system';
import HTMLDisplay from '../HTMLDisplay/HTMLDisplay';
import { mobileMenuBreakPoint } from '../../helpers/breakpoints';
import Button from '../Button/Button';

const Header: React.FC<HeaderProps> = ({ imageUrl, text, links, theme }) => {

    const linkButtons = links ? links.map((link, index) => {
        return (
            <ButtonContainer
                theme={theme}
                className={`slider-button slider-button-${index}`}
            >
                <LinkButton
                    theme={theme}
                    href={link.link.url}
                    title={link.link.title}
                    key={link.link.title + index}
                    className={`slider-button-inner-${index}`}
                >
                    {link.link.title}
                </LinkButton>
            </ButtonContainer>
        );
    }) : '';

    return (
        <StyledCol md={12} sm={12}>
            <HeaderContainer className={'header-container'}>
                <HeaderImage src={imageUrl} className={'header-image'} />
                <HeaderText>
                    <HTMLDisplay
                        className={'header-text'}
                        innerHtml={{ __html: text ? text : '' }}
                    />
                </HeaderText>
                <ButtonsWithLinks className={'header-button-list'}>
                    {linkButtons}
                </ButtonsWithLinks>
            </HeaderContainer>
        </StyledCol>
    );
};

export default Header;

const ButtonsWithLinks = styled.div`
    display: block;
    position: absolute;
    left: 11%;
    width: 100%;
    top: 0%;
`;

const ButtonContainer = styled.span`
    min-width: auto;
    display: inline-flex;
    @media (max-width: ${mobileMenuBreakPoint}) {
        font-size: 0.75rem;
        margin-right: 0rem;
        margin-bottom: 0.5rem;
        max-height: 3rem;
    }
`;

const LinkButton = styled(Button)`
    padding: 0;
`;

const HeaderContainer = styled.div`
    position: relative;
    width: 100vw;
    height: auto;
    margin: 0;
    padding: 0;
`;

const HeaderText = styled.div`
    position: absolute;
    top: 40%;
    font-size: 3rem;
    color: white;
`;

const StyledCol = styled(Col)`
    height: auto;
`;

const HeaderImage = styled.img`
    display: block;
    min-width: 100%;
`;

interface HeaderProps {
    imageUrl: string;
    text?: string;
    links?: { link: Link }[];
    theme: Theme;
}
