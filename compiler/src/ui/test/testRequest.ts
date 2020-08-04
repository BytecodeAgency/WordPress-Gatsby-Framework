// tslint:disable: max-line-length

import BuildRequest from '@wp-compiler/types/request/BuildRequest';

const testRequest: BuildRequest = {
    apikey: 'abcabcabcabc',
    mapskey: 'AIzaSyDPEbTVXq7J3TIGbM3Ss-UZX5wx23z4EMQ',
    theme: {
        manifest: {
            name: 'Manifest name example',
            shortname: 'Shortname',
            iconurl: 'https://bytecode.nl',
            themecolor: '#81d742',
            backgroundcolor: '#4c4c4c',
        },
        colors: {
            primary: '#de9a2c',
            secondary: '#32302c',
            tertiary: '#fefefc',
            pagebg: '#6d6d6d',
            menubg: '#fefefc',
            menutext: '#32302c',
            headingtext: '#7a7a7a',
            bodytext: '#32302c',
            buttonbg: '#0a0a0a',
            buttontext: '#686868',
        },
        fonts: {
            menu: {
                name: 'Roboto',
                weightsavailable: ['300', '600', '700'],
                weightdefault: '300',
            },
            heading: {
                name: 'Roboto',
                weightsavailable: ['300'],
                weightdefault: '300',
            },
            body: {
                name: 'Roboto',
                weightsavailable: ['300'],
                weightdefault: '300',
            },
        },
        logo: 'https://placekitten.com/300/200',
        menu: [],
        footer: [],
        gtag: 'aaaaaa',
        foot: 'console.log("example foot!");',
        css: 'body {\r\n  background-color: purple !important;\r\n}',
    },
    pages: [
        {
            title: 'Test',
            url: '/test',
            seo: [['test', 'test'], ['test', 'test']],
            rows: [
                {
                    class: 'class',
                    content: [{
                        type: 'header',
                        image: 'https://placekitten.com/1000/1000',
                        text: 'Kittens are amazing!!\n',
                    }],
                },
                {
                    class: 'class',
                    content: [{
                        type: 'slider',
                        slides: [
                            {
                                image: 'https://placekitten.com/1000/1000',
                                text: 'test</p>\n',
                                links: [
                                    {
                                        link: {
                                            title: 'Hello world!',
                                            url: 'https://localhost:8000/test/',
                                            target: '',
                                        },
                                    },
                                ],
                            },
                            {
                                image: 'https://placekitten.com/1000/1000',
                                text: 'test</p>\n',
                                links: [
                                    {
                                        link: {
                                            title: 'Test',
                                            url: 'https://localhost:8000/test/',
                                            target: '',
                                        },
                                    },
                                ],
                            },
                        ],
                    }],
                },
                {
                    class: 'class',
                    content: [{
                        type: 'carousel',
                        images: [
                            {
                                image: 'https://placekitten.com/1000/1000',
                            },
                        ],
                    }],
                },
                {
                    class: 'class',
                    content: [{
                        type: 'cta',
                        image: 'https://placekitten.com/1000/1000',
                        text: 'test</p>\n',
                        link: {
                            title: 'Hello world!',
                            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                            target: '',
                        },
                        sizes: { sm: 6, md: 6 },
                    }],
                },
                {
                    class: 'class',
                    content: [{
                        type: 'links',
                        links: [
                            {
                                link: {
                                    title: 'Hello world!',
                                    url: 'https://localhost:8000/test/',
                                    target: '',
                                },
                            },
                        ],
                        sizes: { sm: 6, md: 6 },
                    }],
                },
            ],
        },
    ],
};

export default testRequest;
