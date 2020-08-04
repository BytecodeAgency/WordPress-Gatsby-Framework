const { getBuildRequest } = require('./src/compiler/index');

const getConfig = async () => {
    const buildRequest = await getBuildRequest();
    const manifest = buildRequest.theme.manifest;
    return {
        pathPrefix: `/`,
        plugins: [
            'gatsby-plugin-typescript',
            'gatsby-plugin-react-helmet',
            {
                resolve: `gatsby-plugin-styled-components`,
                options: {
                    ssr: true,
                    minify: true,
                },
            },
            // {
            //     resolve: `gatsby-plugin-manifest`,
            //     options: {
            //       name: manifest.name,
            //       short_name: manifest.shortname,
            //       start_url: "/",
            //       background_color: manifest.backgroundcolor,
            //       theme_color: manifest.themecolor,
            //       display: "standalone",
            //       icon: manifest.iconurl, // This path is relative to the root of the site.
            //     },
            //   },
        ],
    };
}

module.exports = getConfig();
