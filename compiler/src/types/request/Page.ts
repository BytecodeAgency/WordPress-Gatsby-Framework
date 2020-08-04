import PageContent from './PageContent';

interface Page {
    title: string;
    url: string;
    seo: string[][];
    rows: PageContent[];
}

export default Page;
