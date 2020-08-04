const { getBuildRequest } = require('./src/compiler/index');
const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        resolve: {
            alias: {
                '@wp-compiler': path.resolve(__dirname, 'src'),
            },
        },
    });
};


exports.createPages = async ({ actions: { createPage } }) => {
    const buildRequest = await getBuildRequest();
    const apiKey = buildRequest.apikey;
    const mapsKey = buildRequest.mapskey;
    const theme = buildRequest.theme;
    const pages = buildRequest.pages;

    // Create a page for each page in buildRequest.
    buildRequest.pages.forEach(page => {
        createPage({
            path: page.url,
            component: require.resolve('./src/compiler/index'),
            context: { apiKey, mapsKey, theme, page, pages },
        });
    });
};
