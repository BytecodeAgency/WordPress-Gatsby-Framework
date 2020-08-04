import { configure, addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

// automatically import all files ending in *.stories.js in the UI package
const req = require.context('../src/', true, /ui\/.*\.stories.(j|t)sx/);
// const req = require.context('../src/', true, /ui\/.*\/.*stories.(j|t)sx/);
function loadStories() {
    req.keys().forEach(filename => req(filename));
}

addParameters({
    options: {
        name: 'Bytecode Compiler UI Components',
        hierarchySeparator: /\./,
        hierarchyRootSeparator: /\|/,
        addonPanelInRight: true, // default setting
        sortStoriesByKind: true, // https://github.com/storybooks/storybook/issues/5827
    },
    backgrounds: [
        { name: 'white', value: '#fff', default: true },
        { name: 'black', value: '#000' },
    ],
});

// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
    enqueue: () => {},
    hovering: () => {},
};

// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = '';

// This is to utilized to override the window.___navigate method Gatsby defines
// and uses to report what path a Link would be taking us to if it wasn't inside
// a storybook
window.___navigate = pathname => {
    action('NavigateTo:')(pathname);
};

configure(loadStories, module);
