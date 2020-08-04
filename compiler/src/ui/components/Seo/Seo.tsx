/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import Helmet from 'react-helmet';
import Meta from '@wp-compiler/types/request/Meta';

const SEO_TAG = 0;
const SEO_CONTENT = 1;

// tslint:disable-next-line: function-name
function SEO({
    description,
    keywords,
    meta,
    title,
}: {
    description?: string;
    keywords: string[];
    meta: string[][];
    title: string;
}) {
    const author = '';
    const formattedMetaData: Meta[] = meta.map(metaObject => {
        return {
            name: metaObject[SEO_TAG],
            content: metaObject[SEO_CONTENT],
        };
    });
    const desc = formattedMetaData.find(x => x.name === 'description');
    const metaDescription = desc
        ? desc.content
        : 'eenBytecode website';
    return (
        <Helmet
            title={title}
            titleTemplate={`${title}`}
            meta={[
                {
                    name: 'description',
                    content: metaDescription,
                },
                {
                    property: 'og:title',
                    content: title,
                },
                {
                    property: 'og:description',
                    content: metaDescription,
                },
                {
                    property: 'og:type',
                    content: 'website',
                },
                {
                    name: 'twitter:card',
                    content: 'summary',
                },
                {
                    name: 'twitter:creator',
                    content: author,
                },
                {
                    name: 'twitter:title',
                    content: title,
                },
                {
                    name: 'twitter:description',
                    content: metaDescription,
                },
                {
                    name: 'keywords',
                    content: keywords.join(','),
                },
            ].concat(formattedMetaData)}
        />
    );
}
export default SEO;
