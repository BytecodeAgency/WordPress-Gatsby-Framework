import React from 'react';
import 'react-dom';
import { getGlobalStyles, getFontUrl } from './global-css';
import testRequest from '@wp-compiler/ui/test/testRequest';
import Theme from '@wp-compiler/types/request/Theme';

const theme: Theme = testRequest.theme;
const differentFonts = {
    fonts: {
        menu: {
            name: 'Arial',
            weightsavailable: ['300', '600', '700'],
            weightdefault: '300',
        },
        heading: {
            name: 'Roboto',
            weightsavailable: ['300', '400', '500'],
            weightdefault: '300',
        },
        body: {
            name: 'Roboto',
            weightsavailable: ['300'],
            weightdefault: '300',
        },
    },
};

const ThemewithNoWeightsFonts = {
    fonts: {
        menu: {
            name: 'Arial',
            weightsavailable: [],
            weightdefault: '300',
        },
        heading: {
            name: 'Roboto',
            weightsavailable: [],
            weightdefault: '300',
        },
        body: {
            name: 'Roboto',
            weightsavailable: [],
            weightdefault: '300',
        },
    },
};

const differentTheme: Theme = { ...testRequest.theme, ...differentFonts };

const ThemewithNoWeights: Theme = {
    ...testRequest.theme,
    ...ThemewithNoWeightsFonts,
};

describe('FontUrlGeneration', () => {
    it('the generator should create the appropriate url with theme', () => {
        expect(getFontUrl(theme)).toEqual(
            'https://fonts.googleapis.com/css?family=Roboto:300,600,700',
        );
    });

    it('the generator should create the appropriate url with theme 2', () => {
        expect(getFontUrl(differentTheme)).toEqual(
            'https://fonts.googleapis.com/css?family=' +
                'Arial:300,600,700|Roboto:300,400,500',
        );
    });

    it('the generator should create the appropriate url with theme 2', () => {
        expect(getFontUrl(ThemewithNoWeights)).toEqual(
            'https://fonts.googleapis.com/css?family=Arial|Roboto',
        );
    });
});

describe('getGlobalStyles', () => {
    it('the generator should create the appropriate url with theme', () => {
        expect(getGlobalStyles(theme)).toContain(
            theme.manifest.backgroundcolor,
        );
    });
});
