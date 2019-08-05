import React from 'react';
import classnames from 'classnames';

import ActionButtons from './ActionButtons';
import ActionIcons from './ActionIcons';
import Actions from './Actions';
import PrimaryContent from './PrimaryContent';
import Media from './Media';

import { CSS_CLASSES } from './constant';

export interface CardProps extends React.HTMLProps<HTMLDivElement> {
    className?: string;
    outlined?: boolean;
}

const Card: React.FunctionComponent<CardProps> = ({ children, className = '', outlined = false, ...otherProps }) => {
    const classes = classnames(CSS_CLASSES.ROOT, className, {
        [CSS_CLASSES.OUTLINED]: outlined,
    });
    return (
        <div className={classes} {...otherProps}>
            {children}
        </div>
    );
};

export {
    ActionButtons as CardActionButtons,
    ActionIcons as CardActionIcons,
    Actions as CardActions,
    PrimaryContent as CardPrimaryContent,
    Media as CardMedia,
};

export default Card;
