import BuildRequest from '../types/request/BuildRequest';
import Theme from '../types/request/Theme';
import Page from '../types/request/Page';
import Layout from '../ui/components/Layout/Layout';
import React from 'react';
import PageBlock from '../types/request/PageBlock';
import exampleData from './Exampledata';
import { Row, ScreenClassProvider } from 'react-grid-system';
import styled from 'styled-components';

// component imports
import Header from '../ui/components/Header/Header';
import CTA from '../ui/components/CTA/CTA';
import Slider from '../ui/components/Slider/Slider';
import Image from '../ui/components/Image/Image';
import Carousel from '../ui/components/Carousel/Carousel';
import Links from '../ui/components/Links/Links';
import Form from '../ui/components/Form/Form';
import Text from '../ui/components/Text/Text';
import Map from '../ui/components/Map/Map';

export const createPages = (buildRequest: BuildRequest) => {
    const apiKey: string = buildRequest.apikey;
    const mapsKey: string = buildRequest.mapskey;
    const theme: Theme = buildRequest.theme;
    const pages: Page[] = buildRequest.pages;

    const renderedPages = pages.map(page =>
        createPage({ pageContext: { apiKey, mapsKey, theme, page, pages } }),
    );

    return renderedPages;
};

export const createPage = ({
    pageContext: { apiKey, mapsKey, theme, page, pages },
}: {
    pageContext: {
        apiKey: string;
        mapsKey: string;
        theme: Theme;
        page: Page;
        pages: Page[];
    };
}) => {
    const title = page.title;
    const url = page.url;
    const seo = page.seo;
    const rows = page.rows;

    const renderedRows = rows.map((row, index) => (
        <StyledRow
            nogutter
            align={'center'}
            key={`Row-${index}`}
            className={row.class}
        >
            {
                row.content.map(block =>
                    renderPageBlock(apiKey, mapsKey, theme, block))
            }
        </StyledRow>
    ));

    return (
        <ScreenClassProvider>
            <Layout
                theme={theme}
                title={title}
                seo={seo}
                url={url}
                keywords={['site']}
                navBarLinks={theme.menu}
            >
                {renderedRows}
            </Layout>
        </ScreenClassProvider>
    );
};

const renderPageBlock = (
    apiKey: string,
    mapsKey: string,
    theme: Theme,
    pageBlock: PageBlock,
) => {
    switch (pageBlock.type) {
    case 'header':
        return (
                <Header
                    key={getRandomKey(pageBlock.type)}
                    theme={theme}
                    imageUrl={pageBlock.image}
                    text={pageBlock.text}
                    links={pageBlock.links}
                />
        );
    case 'cta':
        return (
                <CTA
                    key={getRandomKey(pageBlock.type)}
                    imageUrl={pageBlock.image}
                    text={pageBlock.text}
                    link={pageBlock.link}
                    theme={theme}
                    sizes={pageBlock.sizes}
                />
        );
    case 'carousel':
        return (
                <Carousel
                    images={pageBlock.images}
                    theme={theme}
                    key={getRandomKey(pageBlock.type)}
                />
        );
    case 'form':
        return (
                <Form
                    fields={pageBlock.fields}
                    theme={theme}
                    sizes={pageBlock.sizes}
                    key={getRandomKey(pageBlock.type)}
                    submitButtonText={pageBlock.submit}
                    title={pageBlock.title}
                    submitUrl={pageBlock.submit_url}
                />
        );
    case 'map':
        return (
                <Map
                    theme={theme}
                    map={pageBlock.map}
                    sizes={pageBlock.sizes}
                />
        );
    case 'links':
        return (
                <Links
                    links={pageBlock.links}
                    theme={theme}
                    key={getRandomKey(pageBlock.type)}
                    sizes={pageBlock.sizes}
                />
        );
    case 'slider':
        return (
                <Slider
                    theme={theme}
                    slides={pageBlock.slides}
                    key={getRandomKey(pageBlock.type)}
                />
        );
    case 'image':
        return (
                <Image
                    key={getRandomKey(pageBlock.type)}
                    imageUrl={pageBlock.image}
                    sizes={pageBlock.sizes}
                    hoverContent={pageBlock.hover_content}
                />
        );
    case 'text':
        return (
                <Text
                    key={getRandomKey(pageBlock.type)}
                    theme={theme}
                    sizes={pageBlock.sizes}
                    text={pageBlock.text}
                />
        );
    default:
        <div>Non existing component</div>;
    }
};

export const getBuildRequest = () => {
    return process.env.json ? JSON.parse(process.env.json) : exampleData;
};

export const getRandomKey = (pageBlockType: string) => {
    const randomNumber = Math.random() * 10000;
    const randomNumberAsString = randomNumber.toString().substring(0, 10);
    return pageBlockType + randomNumberAsString;
};

const StyledRow = styled(Row)`
    margin: 0;
    padding: 0;
    min-width: 100vw;
    min-height: auto;
`;

export default createPage;
