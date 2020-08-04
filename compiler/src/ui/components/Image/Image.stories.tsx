import React from 'react';

import { storiesOf } from '@storybook/react';

import Image from './Image';
import { Container } from 'react-grid-system';

storiesOf('Image', module).add('standard Image', () => (
    <Container>
        <Image
            imageUrl={'https://placekitten.com/1200/600'}
            sizes={{ md: 6, sm: 6 }}
        />
    </Container>
));

storiesOf('Image', module).add('standard Image with hover', () => (
    <Container>
        <Image
            imageUrl={'https://placekitten.com/1200/600'}
            sizes={{ md: 6, sm: 6 }}
            hoverContent={'<div>HOVER</div>'}
        />
    </Container>
));
