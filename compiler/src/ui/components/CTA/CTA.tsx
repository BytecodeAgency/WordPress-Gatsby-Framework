import React from 'react';
import styled from 'styled-components';
import Theme from '@wp-compiler/types/request/Theme';
import Link from '@wp-compiler/types/request/PageBlocks/Link';
import { Col } from 'react-grid-system';
import Button from '../Button/Button';
import { mobileMenuBreakPoint } from '../../helpers/breakpoints';
import HTMLDisplay from '../HTMLDisplay/HTMLDisplay';

const CTA: React.FC<CTAProps> = ({ imageUrl, text, link, theme, sizes }) => {
    return (
        <StyledCol md={sizes.md} sm={sizes.sm}>
            <CTAContainer className={'cta-container'}>
                {imageUrl && (
                    <CTAImage src={imageUrl} className={'cta-image'} />
                )}
                <CTAText className={'cta-text-box'}>
                    <HTMLDisplay
                        className={'cta-text'}
                        innerHtml={{
                            __html: text ? text : '',
                        }}
                    />
                </CTAText>
                {link && (
                    <CTALink
                        href={link.url}
                        className={'cta-link'}
                        theme={theme}
                    >
                        {link.title}
                    </CTALink>
                )}
            </CTAContainer>
        </StyledCol>
    );
};

export default CTA;

const CTAContainer = styled.div`
    position: relative;
    width: 98%;
    height: auto;
    margin: 1% 0;
    margin-bottom: 0;
`;

const CTAText = styled.div`
    display: block;
    position: absolute;
    z-index: 1;
    margin: 0 auto;
    left: 30%;
    right: 0;
    top: 10%;
    font-size: 2.5rem;
    color: white;
    max-width: 64%;
    @media (max-width: ${mobileMenuBreakPoint}) {
        font-size: 1.5rem;
        left: 45%;
    }
`;

const StyledCol = styled(Col)`
    height: auto;
`;

const CTAImage = styled.img`
    display: block;
    max-width: 100%;
    height: auto;
    margin: 0 auto;
`;

const CTALink = styled(Button)`
    display: block;
    position: absolute;
    z-index: 999;
    left: 45%;
    top: 60%;
    font-size: 1.5rem;
    @media (max-width: ${mobileMenuBreakPoint}) {
        font-size: 1rem;
    }
`;

interface CTAProps {
    imageUrl?: string;
    text?: string;
    link?: Link | null;
    theme: Theme;
    sizes: { sm: number; md: number };
}
