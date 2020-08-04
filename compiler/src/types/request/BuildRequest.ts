import Theme from './Theme';
import Page from './Page';

interface BuildRequest {
    apikey: string; // Format to be specified
    mapskey: string;
    theme: Theme;
    pages: Page[];
}

export default BuildRequest;
