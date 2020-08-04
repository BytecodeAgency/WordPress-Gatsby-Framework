import React, { Fragment } from 'react';
import styled from 'styled-components';
import Theme from '@wp-compiler/types/request/Theme';
import Link from '@wp-compiler/types/request/PageBlocks/Link';
import { Col } from 'react-grid-system';
import Button from '../Button/Button';
import { mobileMenuBreakPoint } from '../../helpers/breakpoints';

const Links = ({ links, theme, sizes }: LinksProps) => {
    return (
        <Col sm={sizes.sm} md={sizes.md}>
            <LinkItems links={links} theme={theme} />
        </Col>
    );
};

const LinkItems = ({ links, theme }: LinksItemProps) => {
    return (
        <LinkList className={'link-list-container'}>
            {links.map(link => (
                <LinkItem
                    key={
                        link.link.target +
                        Math.random()
                            .toString()
                            .substring(0, 10)
                    }
                    className={'link-item'}
                >
                    <StyledButton
                        href={link.link.url}
                        target={link.link.target}
                        className={'link-button'}
                        theme={theme}
                    >
                        {link.link.title}
                    </StyledButton>
                </LinkItem>
            ))}
        </LinkList>
    );
};

export default Links;

const LinkList = styled.ul`
    display: flex;
    justify-content: space-around;
    width: 100%;
    @media (max-width: ${mobileMenuBreakPoint}) {
        display: block;
    }
`;

const LinkItem = styled.li`
    display: inline-block;
    list-style-type: none;
    width: 500px;
    @media (max-width: ${mobileMenuBreakPoint}) {
        margin: 1rem;
        width: 320px;
    }
`;

const StyledButton = styled(Button)`
    margin: 0;
    width: 80%;
    display: inline-block;
    @media (max-width: ${mobileMenuBreakPoint}) {
        font-size: 0.8em;
    }
`;

interface LinksProps {
    links: { link: Link }[];
    theme: Theme;
    sizes: { sm: number; md: number };
}

interface LinksItemProps {
    links: { link: Link }[];
    theme: Theme;
}
