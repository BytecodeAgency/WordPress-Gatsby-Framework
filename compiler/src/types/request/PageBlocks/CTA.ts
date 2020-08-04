import Link from './Link';

interface Cta {
    type: 'cta';
    image?: string;
    text: string;
    link?: Link | null;
    sizes: {md: number, sm: number};
}

export default Cta;
