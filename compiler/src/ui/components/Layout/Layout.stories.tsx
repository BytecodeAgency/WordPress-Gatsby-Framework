import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Layout from './Layout';
import testRequest from '@wp-compiler/ui/test/testRequest';

const theme = testRequest.theme;

storiesOf('Navbar', module).add('standard navbar without props', () => (
    <Layout
        theme={theme}
        title={'test page'}
        url={'/this_page'}
        seo={[['test', 'test']]}
        keywords={['Cool site']}
    >
        <div>This is a layout</div>
    </Layout>
));
