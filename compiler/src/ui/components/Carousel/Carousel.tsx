import React from 'react';
import styled from 'styled-components';
import Theme from '@wp-compiler/types/request/Theme';
import { Col } from 'react-grid-system';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { mobileMenuBreakPoint } from '../../helpers/breakpoints';

const PrevArrowButton = (props: SlickArrowProps) => {
    const { className, style, onClick, theme } = props;
    return (
        <img
            className={`carousel-button-prev ${className}`}
            style={{
                ...style,
            }}
            onClick={onClick}
            src={'https://placekitten.com/400x400'}
        />
    );
};

const NextArrowButton = (props: SlickArrowProps) => {
    const { className, style, onClick, theme } = props;
    return (
        <img
            className={`carousel-button-next ${className}`}
            style={{
                ...style,
            }}
            onClick={onClick}
            src={'https://placekitten.com/400x400'}
        />
    );
};

const Carousel = ({ images, theme }: CarouselProps) => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        arrows: true,
        nextArrow: <NextArrowButton theme={theme} />,
        prevArrow: <PrevArrowButton theme={theme} />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <Col md={11} sm={11} offset={{ md: 0.5, sm: 0.5 }}>
            <StyledSlider {...settings} className={'carousel-slider'}>
                {CarouselItems(images)}
            </StyledSlider>
        </Col>
    );
};

const CarouselItems = (images: { image: string }[]) => {
    const carouselItems = images.map((image, i) => (
        <CarouselImageContainer key={i} className={'carousel-image-container'}>
            <CarouselImage className={'carousel-image'} src={image.image} />
        </CarouselImageContainer>
    ));
    if (carouselItems.length > 0) {
        return carouselItems;
    }
    return [<div>no images</div>];
};

export default Carousel;

const CarouselImage = styled.img`
    display: block;
    width: auto;
    height: 100%;
    margin: 0 auto;
`;

const CarouselImageContainer = styled.div`
    align-content: center;
`;

const StyledSlider = styled(Slider)`
    margin: 100px auto;
    @media (max-width: ${mobileMenuBreakPoint}) {
        max-width: 100vw;
    }
`;

interface CarouselProps {
    images: { image: string }[];
    theme: Theme;
}

interface SlickArrowProps {
    className?: string;
    style?: any;
    onClick?: any;
    theme: Theme;
}
