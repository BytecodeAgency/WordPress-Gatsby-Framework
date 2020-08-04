import React, { useState } from 'react';
import styled from 'styled-components';
import Theme from '@wp-compiler/types/request/Theme';
import { Col } from 'react-grid-system';
import Slide from '@wp-compiler/types/request/PageBlocks/Slide';
import Button from '../Button/Button';
import { mobileMenuBreakPoint } from '../../helpers/breakpoints';
import HTMLDisplay from '../HTMLDisplay/HTMLDisplay';

const Slider: React.FC<SliderProps> = ({ slides, theme }) => {
    const firstSlide = {
        ...slides[slides.length - 1],
        ...{ index: slides.length - 1 },
    };
    const [currentSlide, setSlide] = useState(firstSlide);
    const nextSlide = (steps: number) => {
        const newIndex = Math.abs(currentSlide.index + steps) % slides.length;
        const newSlide = { ...slides[newIndex], ...{ index: newIndex } };
        setSlide(newSlide);
    };

    const linkButtons = currentSlide.links.map((link, index) => {
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
    });

    return (
        <StyledCol md={12} sm={12}>
            <SliderContainer className={'slider-container'}>
                <HeaderImage
                    className={'slider-image'}
                    src={currentSlide.image}
                />
                <SliderContent className={'slider-heading'}>
                    <SliderButton
                        theme={theme}
                        className={'slider-previous'}
                        onClick={() => nextSlide(-1)}
                    />
                    <SpaceFiller />
                    <SliderButton
                        theme={theme}
                        className={'slider-next'}
                        onClick={() => nextSlide(1)}
                    />
                </SliderContent>
                <SliderText className={'slider-text'}>
                    <HTMLDisplay
                        className={'body slider-text'}
                        innerHtml={{
                            __html: currentSlide.text ? currentSlide.text : '',
                        }}
                    />
                </SliderText>
                <ButtonsWithLinks className={'slider-button-list'}>
                    {linkButtons}
                </ButtonsWithLinks>
            </SliderContainer>
        </StyledCol>
    );
};

export default Slider;

const SliderContainer = styled.div`
    position: relative;
    width: 100vw;
    height: auto;
    margin: 0;
    padding: 0;
`;

const SpaceFiller = styled.span`
    display: inline-flex;
    margin: 0 auto;
`;

const SliderText = styled.div`
    display: inline-block;
    position: absolute;
    left: 45%;
    top: 10%;
    z-index: 1;
    margin: 0 auto;
    font-size: 3rem;
    color: white;
    @media (max-width: ${mobileMenuBreakPoint}) {
        font-size: 1.5rem;
        margin-left: 1rem;
    }
`;

const ButtonsWithLinks = styled.div`
    display: flex;
    justify-content: space-evenly;
    position: absolute;
    width: 50%;
    z-index: 999;
    left: 44%;
    top: 40%;
    @media (max-width: ${mobileMenuBreakPoint}) {
        flex-direction: column;
        height: 70%;
        left: 10%;
        width: 50%;
        top: 5%;
    }
`;

const SliderContent = styled.div`
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    z-index: 999;
    margin: 0 auto;
    left: 0;
    right: 0;
    top: 35%;
    text-align: center;
    width: 90vw;
    color: white;
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

const StyledCol = styled(Col)`
    height: auto;
`;

const SliderButton = styled(Button)`
    width: 2rem;
    text-align: center;
    margin: 0;
    vertical-align: middle;
    @media (max-width: ${mobileMenuBreakPoint}) {
        max-width: 1rem;
    }
`;

const HeaderImage = styled.img`
    display: block;
    width: 100%;
    height: 100%;
    background-image: url(${(props: { src: string }) => props.src});
    background-repeat: no-repeat;
    background-size: cover;
`;

interface SliderProps {
    slides: Slide[];
    theme: Theme;
}
