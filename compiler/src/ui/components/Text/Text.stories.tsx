import React from 'react';

import { storiesOf } from '@storybook/react';

import Text from './Text';
import testRequest from '@wp-compiler/ui/test/testRequest';

const theme = testRequest.theme;

storiesOf('Text', module).add('standard Text', () => (
    <Text theme={theme} text={'<p>test</p>'} sizes={{ md: 6, sm: 6 }} />
));
