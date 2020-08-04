import React from 'react';

import { storiesOf } from '@storybook/react';

import Map from './Map';
import testRequest from '@wp-compiler/ui/test/testRequest';

const theme = testRequest.theme;

storiesOf('Map', module).add('standard Map', () => (
    <Map
        theme={theme}
        map={{ address: 'test', lat: 'test', lng: 'test' }}
        sizes={{ md: 6, sm: 6 }}
    />
));
