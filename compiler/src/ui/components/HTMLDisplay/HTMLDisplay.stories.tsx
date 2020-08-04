import React from 'react';

import { storiesOf } from '@storybook/react';

import HTMLDisplay from './HTMLDisplay';
import { Container } from 'react-grid-system';

storiesOf('HTMLDisplay', module).add('standard HTMLDisplay', () => (
    <Container>
        <HTMLDisplay innerHtml={{ __html: '<div> test <div>' }} />
    </Container>
));
