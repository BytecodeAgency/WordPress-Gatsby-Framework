import React from 'react';
import styled from 'styled-components';
import { Col } from 'react-grid-system';
import { mobileMenuBreakPoint } from '../../helpers/breakpoints';
import HTMLDisplay from '../HTMLDisplay/HTMLDisplay';

const Image: React.FC<ImageProps> = ({ imageUrl, sizes, hoverContent }) => {
    return (
        <StyledCol md={sizes.md} sm={sizes.sm} className={'image-col'}>
            <ImageContainer className={'image-container'}>
                <Img className={'image-image'} src={imageUrl} />
                {hoverContent ? (
                    <HoverDisplay
                        className={'image-hover'}
                        innerHtml={{ __html: hoverContent }}
                    />
                ) : (
                    ''
                )}
            </ImageContainer>
        </StyledCol>
    );
};

export default Image;

const HoverDisplay = styled(HTMLDisplay)`
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
`;

const ImageContainer = styled.div`
    display: inline-flex;
    width: 100%;
    height: auto;
    word-wrap: break-word;
    padding: 0;
    margin: 0;
    &:hover ${HoverDisplay} {
        display: inline-block;
    }
    @media (max-width: ${mobileMenuBreakPoint}) {
        display: block;
    }
`;

const StyledCol = styled(Col)`
    height: auto;
    padding: 0;
`;

const Img = styled.img`
    width: 100%;
`;

interface ImageProps {
    imageUrl: string;
    sizes: { sm: number; md: number };
    hoverContent?: string;
}
