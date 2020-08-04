import Link from './Link';

interface Header {
    type: 'header';
    image: string;
    text: string;
    links?: {link: Link}[];
}

export default Header;
