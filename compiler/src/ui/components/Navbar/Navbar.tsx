import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Theme from '@wp-compiler/types/request/Theme';
import { mobileMenuBreakPoint } from '../../helpers/breakpoints';
import HTMLDisplay from '../HTMLDisplay/HTMLDisplay';
import MenuItem from '@wp-compiler/types/request/MenuItem';

const closeMenuCross = (color: string) => (
    <svg width="32" height="19" xmlns="http://www.w3.org/2000/svg">
        <g>
            <title>Close menu</title>
            <rect
                fill="none"
                id="canvas_background"
                height="402"
                width="582"
                y="-1"
                x="-1"
            />
        </g>
        <g>
            <title>Cross</title>
            <g fillRule="evenodd" fill="none" id="Home">
                <g fill={color} id="Desktop-HD-Copy-2">
                    <g id="Menu-Mobile">
                        <rect
                            stroke="null"
                            x="4.062489"
                            // tslint:disable-next-line: max-line-length
                            transform="rotate(-44.70132827758789 15.785093307495112,9.417304039001463) "
                            height="1"
                            width="23.44521"
                            y="8.917303"
                            id="Rectangle-3-Copy"
                        />
                        <rect
                            stroke="null"
                            x="4.062489"
                            // tslint:disable-next-line: max-line-length
                            transform="rotate(45 15.785093307495117,9.41730213165283) "
                            height="1"
                            width="23.44521"
                            y="8.917303"
                            id="svg_1"
                        />
                    </g>
                </g>
            </g>
        </g>
    </svg>
);

const hamburgerMenu = (color: string) => (
    <svg width="32px" height="19px" viewBox="0 0 32 19" version="1.1">
        <defs />
        <g
            id="Home"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
        >
            <g
                id="Desktop-HD-Copy-2"
                transform="translate(-18.000000, -26.000000)"
                fill={color}
            >
                <g id="Menu-Mobile" transform="translate(0.000000, -1.000000)">
                    <g
                        id="Buttons/menu_mobile"
                        transform="translate(18.000000, 27.000000)"
                    >
                        <rect
                            id="Rectangle-3"
                            x="0"
                            y="0"
                            width="32"
                            height="2"
                        />
                        <rect
                            id="Rectangle-3-Copy"
                            x="0"
                            y="9"
                            width="32"
                            height="2"
                        />
                        <rect
                            id="Rectangle-3-Copy-2"
                            x="0"
                            y="17"
                            width="32"
                            height="2"
                        />
                    </g>
                </g>
            </g>
        </g>
    </svg>
);

const Navbar: React.FC<NavbarProps> = ({ logoUrl, navbarItems, theme }) => {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const switchMenuIsOpen = () => setMenuIsOpen(!menuIsOpen);

    const NavbarItems =
        navbarItems &&
        navbarItems.map(navbarItem => (
            <NavBarItem
                key={navbarItem.label}
                href={navbarItem.url}
                text={navbarItem.label}
                theme={theme}
                className={'navbar-item'}
            />
        ));

    return (
        <NavbarContainer
            className={'navbar-outer-container'}
            menubg={theme.colors.menubg}
        >
            <InnerNavBar className={'menu navbar-inner-container'}>
                {logoUrl && (
                    <StyledLogo className={'navbar-logo'} src={logoUrl} />
                )}
                <ContentContainer>
                    <TopBar className={'topbar'}>
                        <HTMLDisplay
                            innerHtml={{
                                __html: theme.topbar ? theme.topbar : '',
                            }}
                        />
                    </TopBar>
                    <NavBarItems
                        className={'navbar-item-list'}
                        menuIsOpen={menuIsOpen}
                        theme={theme}
                    >
                        {NavbarItems}
                    </NavBarItems>
                    <OpenMenuButton
                        menuIsOpen={menuIsOpen}
                        onClick={switchMenuIsOpen}
                    >
                        {hamburgerMenu(theme.colors.primary)}
                    </OpenMenuButton>
                    <CloseMenuButton
                        menuIsOpen={menuIsOpen}
                        onClick={switchMenuIsOpen}
                    >
                        {closeMenuCross(theme.colors.primary)}
                    </CloseMenuButton>
                </ContentContainer>
            </InnerNavBar>
        </NavbarContainer>
    );
};

export default Navbar;

const NavbarContainer = styled.div`
    display: block;
    background: ${(props: { menubg: string }) => props.menubg};
    width: 100vw;
    height: 100%;
    max-height: 133px;
    margin: 0;
    padding: 0;
    @media (max-width: ${mobileMenuBreakPoint}) {
        max-height: 2.5rem;
        width: auto;
    }
`;

const InnerNavBar = styled.nav`
    display: inline-flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
`;
const ContentContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const Logo = styled.img`
    width: auto;
    min-height: 100%;
    @media (max-width: ${mobileMenuBreakPoint}) {
        max-height: 2.5rem;
        width: auto;
    }
`;

const TopBar = styled.div`
    display: block;
    position: relative;
    top: 0;
    right: 0;
    min-width: 75%;
    text-align: right;
    min-height: 51px;
    height: 50%;
    margin-right: 3rem;
    margin-top: -0.5rem;
    z-index: 1;
    @media (max-width: ${mobileMenuBreakPoint}) {
        display: none;
        margin-right: 0;
    }
`;

const OpenMenuButton = styled.div`
    display: none;
    padding-right: 2rem;
    margin-top: 2rem;
    align-items: center;
    @media (max-width: ${mobileMenuBreakPoint}) {
        display: ${(props: { menuIsOpen: boolean }) =>
            props.menuIsOpen ? 'none' : 'block'};
        position: absolute;
        right: -1rem;
    }
`;

const CloseMenuButton = styled.div`
    display: none;
    padding-right: 2rem;
    margin-top: 2rem;
    align-items: center;
    z-index: 1201;
    transition: 0.2s ease;
    @media (max-width: ${mobileMenuBreakPoint}) {
        display: ${(props: { menuIsOpen: boolean }) =>
            !props.menuIsOpen ? 'none' : 'block'};
        position: fixed;
        right: -1rem;
    }
`;

const LogoLink = ({
    className,
    ...props
}: {
    className?: string;
    src?: string;
}) => {
    const { src } = props;
    return (
        <Link to={'/'} className={className}>
            <Logo src={src} />
        </Link>
    );
};

const StyledLogo = styled(LogoLink)`
    width: 20%;
    min-height: 5rem;
    @media (max-width: ${mobileMenuBreakPoint}) {
        height: 100%;
        width: 50%;
    }
`;

const StyledLink = styled(Link)`
    text-transform: none;
    position: relative;
    transition: all 0.2s ease;
    text-decoration: none;
    &::after {
        content: '';
        position: absolute;
        border-bottom: solid 0.2rem
            ${(props: { to: string; className: string; theme: Theme }) =>
                props.theme.colors.primary};
        bottom: -0.5rem;
        left: 50%;
        right: 50%;
        transition: all 0.2s ease;
    }
    &:hover {
        cursor: pointer;
        color: ${(props: { to: string; className: string; theme: Theme }) =>
            props.theme.colors.primary};
        &::after {
            left: 0;
            right: 0;
        }
    }
`;

const NavbarItemBase = ({
    className,
    ...props
}: {
    className?: string;
    key?: string;
    href: string;
    text: string;
    theme: Theme;
}) => {
    const { href, text, theme } = props;
    return (
        <li className={className}>
            <StyledLink to={href} className="menu" theme={theme}>
                {text}
            </StyledLink>
        </li>
    );
};

const NavBarItem = styled(NavbarItemBase)`
    display: inline-flex;
    padding: 0 3rem;
    text-align: center;
    vertical-align: middle;
    margin-bottom: auto;
    margin-top: auto;
    font-size: 20px/24px;
    &:last-child {
        padding-right: 0;
    }
    @media (max-width: ${mobileMenuBreakPoint}) {
        padding: 0;
        margin: 1rem 0;
        text-align: left;
        vertical-align: top;
    }
`;

const NavBarItems = styled.ul`
    display: block;
    text-align: right;
    z-index: 1200;
    height: 100%;
    margin-right: 2rem;
    @media (max-width: ${mobileMenuBreakPoint}) {
        display: flex;
        flex-direction: column;
        width: 15rem;
        height: 100vh;
        position: fixed;
        right: ${(props: { menuIsOpen: boolean; theme: Theme }) =>
            props.menuIsOpen ? '-5rem' : '-50rem'};
        top: -2%;
        bottom: 0;
        padding-top: 10rem;
        transition: all 0.4s ease;
        color: white;
        background: ${(props: { menuIsOpen: boolean; theme: Theme }) =>
            props.theme.colors.secondary};
    }
`;

interface NavbarProps {
    logoUrl?: string;
    navbarItems?: MenuItem[];
    theme: Theme;
}
