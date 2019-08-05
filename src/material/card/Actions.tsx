import React from 'react';
import classnames from 'classnames';

import { CSS_CLASSES } from './constant';

export interface ActionsProps extends React.HTMLProps<HTMLDivElement> {
    className?: string;
    fullBleed?: boolean;
}

const Actions: React.FunctionComponent<ActionsProps> = ({
    className = '',
    children,
    fullBleed = false,
    ...otherProps
}) => {
    const classes = classnames(CSS_CLASSES.ACTIONS, className, {
        [CSS_CLASSES.ACTIONS_FULL_BLEED]: fullBleed,
    });
    return (
        <div className={classes} {...otherProps}>
            {children}
        </div>
    );
};

export default Actions;
