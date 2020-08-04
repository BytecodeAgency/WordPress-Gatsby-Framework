import React from 'react';

import { storiesOf } from '@storybook/react';

import CTA from './CTA';
import testRequest from '@wp-compiler/ui/test/testRequest';
import { Container } from 'react-grid-system';

const theme = testRequest.theme;
const link = {
    title: 'test',
    url: '#',
    target: '_blank',
};

storiesOf('CTA', module).add('standard CTA', () => (
    <Container>
        <CTA
            theme={theme}
            imageUrl={'https://placekitten.com/1200/600'}
            text={'This kitten is so cute'}
            link={link}
            sizes={{ md: 6, sm: 6 }}
        />
    </Container>
));
