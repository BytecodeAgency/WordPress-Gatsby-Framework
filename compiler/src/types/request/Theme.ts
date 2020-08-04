import MenuItem from './MenuItem';
import Font from './Font';
import FooterItem from './FooterItem';

interface Theme {
    manifest: {
        // For manifest.json
        name: string;
        shortname: string;
        iconurl: string;
        themecolor: string; // HEX
        backgroundcolor: string; // HEX
    };
    colors: {
        primary: string; // HEX
        secondary: string; // HEX
        tertiary: string; // HEX
        pagebg: string; // HEX
        menubg: string; // HEX
        menutext: string; // HEX
        headingtext: string; // HEX
        bodytext: string; // HEX
        buttonbg: string; // HEX
        buttontext: string; // HEX
    };
    fonts: {
        menu: Font;
        heading: Font;
        body: Font;
        [key: string]: Font;
    };
    logo: string; // URL to logo
    menu: MenuItem[];
    footer: FooterItem[];
    topbar?: string;
    bottombar?: string;
    gtag?: string;
    foot?: string; // Loads all non essential JS
    css?: string; // CSS overwrites
}

export default Theme;
