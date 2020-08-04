import Link from './Link';

interface Slide{
    image: string;
    text: string;
    links: {link: Link}[];
}

export default Slide;
