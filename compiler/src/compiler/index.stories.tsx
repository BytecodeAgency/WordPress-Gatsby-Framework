import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { createPages } from './index';
import exampleData from './Exampledata';

storiesOf('ExamplePages', module).add('standard pages ', () => {
    return createPages(exampleData);
});
