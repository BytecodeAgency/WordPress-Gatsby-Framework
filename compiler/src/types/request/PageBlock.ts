import Header from './PageBlocks/Header';
import Form from './PageBlocks/Form';
import Maps from './PageBlocks/Maps';
import Slider from './PageBlocks/Slider';
import Carousel from './PageBlocks/Carousel';
import CTA from './PageBlocks/CTA';
import Text from './PageBlocks/Text';
import Links from './PageBlocks/Links';
import Image from './PageBlocks/Image';

type PageBlock =
    | Header
    | Form
    | Maps
    | Slider
    | Carousel
    | CTA
    | Image
    | Links
    | Text;
export default PageBlock;
