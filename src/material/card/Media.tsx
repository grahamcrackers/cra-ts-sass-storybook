import React from 'react';
import classnames from 'classnames';

import { CSS_CLASSES } from './constant';

export interface MediaProps extends React.HTMLProps<HTMLDivElement> {
    className?: string;
    square?: boolean;
    wide?: boolean;
    contentClassName?: string;
    imageUrl?: string;
    style?: React.CSSProperties;
}

interface MediaChildren {
    children?: React.ReactNode;
    contentClassName?: string;
}

interface StyleValues {
    imageUrl: string;
    style: React.CSSProperties;
}

const renderChildren: (mediaChildren: MediaChildren) => React.ReactElement<HTMLDivElement> | undefined = ({
    children,
    contentClassName,
}) => {
    if (!children) {
        return;
    }
    const classes = classnames(CSS_CLASSES.MEDIA_CONTENT, contentClassName);
    return <div className={classes}>{children}</div>;
};

const getStyles: (styleValues: StyleValues) => React.CSSProperties = ({ imageUrl, style }) => {
    return Object.assign({}, { backgroundImage: `url(${imageUrl})` }, style);
};

const Media: React.FunctionComponent<MediaProps> = ({
    className = '',
    contentClassName = '',
    children,
    square = false,
    wide = false,
    imageUrl = '',
    style = {},
    ...otherProps
}) => {
    const classes = classnames(CSS_CLASSES.MEDIA, className, {
        [CSS_CLASSES.MEDIA_SQUARE]: square,
        [CSS_CLASSES.MEDIA_16_9]: wide,
    });

    return (
        <div className={classes} style={getStyles({ imageUrl, style })} {...otherProps}>
            {renderChildren({ children, contentClassName })}
        </div>
    );
};

export default Media;
