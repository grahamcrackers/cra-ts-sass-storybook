import { storiesOf } from '@storybook/react';
import React from 'react';
import IconButton from '../src/material/icon-button';
import MaterialIcon from '../src/material/material-icon';

storiesOf('Icon Buttons', module).add('Icon Button', () => {
    return (
        <IconButton>
            <MaterialIcon icon="favorite" />
        </IconButton>
    );
});
