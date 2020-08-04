import Link from './Link';

interface Links {
    type?: 'links';
    links: {link: Link}[];
    sizes: {sm: number, md: number};
}

export default Links;
