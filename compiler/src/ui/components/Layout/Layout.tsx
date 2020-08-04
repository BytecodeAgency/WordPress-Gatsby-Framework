import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import SEO from '../Seo/Seo';
import Navbar from '../Navbar/Navbar';
import {
    getGlobalStyles,
    getFontUrl,
} from '../../../compiler/helpers/global-css/global-css';
import Theme from '@wp-compiler/types/request/Theme';
import { Container } from 'react-grid-system';
import Footer from '../Footer/Footer';
import MenuItem from '@wp-compiler/types/request/MenuItem';

const Main = styled.main`
    width: 100vw;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    @media (max-width: ${props => props.theme.breakpointMobileMenu}) {
        padding-top: 7rem;
    }
`;

const StyledContainer = styled(Container)`
    padding: 0 !important;
    margin: 0 !important;
    min-height: auto;
    min-width: 100vw;
`;

const Head = ({ theme }: { theme: Theme }) => {
    const link = `${theme.manifest.iconurl}/favicon.ico`;
    const gtag = theme.gtag;
    const gtag_url = `https://www.googletagmanager.com/gtag/js?id=${gtag}`;
    return (
        <Helmet>
            <style data-info="base-styling">{getGlobalStyles(theme)}</style>
            <style data-info="bytecode-global-styling">{theme.css}</style>
            <meta name="robots" content="index, follow" />
            <meta
                http-equiv="Content-Type"
                content="text/html; charset=utf-8"
            />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <link type="text/plain" rel="author" href="/humans.txt" />
            <link rel="stylesheet" href="https://use.typekit.net/kcu2skl.css" />
            <link
                rel="stylesheet"
                href="https://pro.fontawesome.com/releases/v5.11.2/css/all.css"
            />
            <link href={getFontUrl(theme)} rel="stylesheet" />
            <link rel="shortcut icon" type="image/x-icon" href={link} />
            <script async src={gtag_url}></script>
            <script>
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', ${gtag});
                `}
            </script>
        </Helmet >
    );
};

const Layout = ({
    children,
    theme,
    title,
    url,
    seo,
    keywords,
    navBarLinks,
}: {
    children: any;
    theme: Theme;
    title: string;
    url: string;
    seo: string[][];
    keywords: string[];
    navBarLinks?: MenuItem[];
}) => {
    return (
        <div className={'layout-body'}>
            <Head theme={theme} />
            <SEO title={title} meta={seo} keywords={keywords} />
            <Navbar
                logoUrl={theme.logo}
                navbarItems={navBarLinks}
                theme={theme}
            />
            <Main className={'main layout-main'} theme={theme}>
                <StyledContainer className={'layout-main-child'}>
                    {children}
                </StyledContainer>
            </Main>
            <Footer theme={theme} />
        </div>
    );
};
export default Layout;
