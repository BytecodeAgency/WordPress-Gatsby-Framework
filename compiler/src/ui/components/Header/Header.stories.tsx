import React from 'react';

import { storiesOf } from '@storybook/react';

import Header from './Header';
import testRequest from '@wp-compiler/ui/test/testRequest';
import { Container } from 'react-grid-system';

const theme = testRequest.theme;

storiesOf('Header', module).add('standard Header', () => (
    <Container>
        <Header
            theme={theme}
            imageUrl={'https://placekitten.com/1200/600'}
            text={'This kitten is so cute'}
        />
    </Container>
));
