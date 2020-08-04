import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Navbar from './Navbar';
import testRequest from '@wp-compiler/ui/test/testRequest';

const theme = testRequest.theme;

storiesOf('Navbar', module).add('standard navbar without props', () => (
    <Navbar theme={theme} />
));

storiesOf('Navbar', module).add('standard navbar with navbaritems', () => {
    const items = [
        {
            url: 'jantje',
            label: 'link',
        },
    ];
    return <Navbar theme={theme} navbarItems={items} />;
});

storiesOf('Navbar', module).add('standard navbar with logo and items', () => {
    const items = [
        {
            url: 'jantje',
            label: 'link',
        },
    ];
    const kittenImg = 'http://placekitten.com/2000/600';
    return <Navbar theme={theme} navbarItems={items} logoUrl={kittenImg} />;
});
