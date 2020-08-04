import Theme from '@wp-compiler/types/request/Theme';
import Font from '@wp-compiler/types/request/Font';
import { css } from 'styled-components';

const breakpoints: number[] = [540, 750, 960, 1400, 2560];

export const getGlobalStyles = (theme: Theme) => {
    const typographyClasses: string[] = Object.keys(theme.fonts);

    const typographyClassStyling = typographyClasses
        .map(
            (element: string) => `.${element} {
        font-family: ${theme.fonts[element].name};
        font-weight: ${theme.fonts[element].weightdefault};
    }`,
        )
        .join('\n');

    const bodyStyling = typographyClasses.find(x => x === 'body');

    const bodyStyle = bodyStyling
        ? `font-family: ${theme.fonts[bodyStyling].name};
    font-weight: ${theme.fonts[bodyStyling].weightdefault};`
        : '';

    const GlobalStylesRaw = css`
        html {
            width: 100%;
            background: ${theme.manifest.backgroundcolor};
            padding: 0;
            margin: 0;
            overflow-x: hidden;
        }
        @media screen and (min-width: ${breakpoints[3] * 1.4}px) {
            html {
                font-size: 80%;
            }
        }
        a {
            color: inherit;
            text-decoration: none;
        }
        img {
            margin: 0;
            padding: 0;
        }
        @media (max-width: ${breakpoints[0]}px) {
            h1 {
                font-size: 4rem;
            }
        }
        body {
            overflow-x: hidden;
            padding: 0;
            margin: 0;
            position: relative;
            ${bodyStyle}
        }
        textarea {
            resize: vertical;
        }
        ::selection {
            background: ${theme.colors.tertiary};
            color: ${theme.colors.primary};
        }
        #map{
            height: 100%;
        }
        ${typographyClassStyling}
    `;

    return GlobalStylesRaw.join('');
};

export const getFontUrl = (theme: Theme) => {
    const base = 'https://fonts.googleapis.com/css?family=';
    const fonts = theme.fonts;
    const reduceFunction = (
        accumulator: Map<string, string[]>,
        nextValue: Font,
    ) => {
        const mapValue = accumulator.get(nextValue.name);
        const weightArray = mapValue ? mapValue : [];
        const newWeights = nextValue.weightsavailable.filter(
            weight => !weightArray.includes(weight),
        );
        const newArray = weightArray.concat(newWeights);
        const newMap = accumulator.set(nextValue.name, newArray);
        return newMap;
    };
    const fontMap = Object.values(fonts).reduce(
        reduceFunction,
        new Map<string, string[]>(),
    );
    const allFonts = Array.from(fontMap.keys()).map((fontName: string) => {
        const name = fontName.replace(' ', '+');
        const weights = fontMap.get(fontName);
        const joinedWeights = weights ? weights.join(',') : '';
        return joinedWeights ? `${name}:${joinedWeights}` : name;
    });

    return base + allFonts.join('|');
};

export default getGlobalStyles;
