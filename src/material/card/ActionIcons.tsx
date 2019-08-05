import React from 'react';
import classnames from 'classnames';

import { CSS_CLASSES } from './constant';

type ChildType = React.ReactElement<React.HTMLProps<HTMLImageElement | HTMLOrSVGElement>>;

export interface ActionIconsProps extends React.HTMLProps<HTMLDivElement> {
    className?: string;
    children?: ChildType | ChildType[];
}

const addIconClassToChildren = (children: ChildType | ChildType[]) => {
    return React.Children.map(children as ChildType | ChildType[], item => {
        const className = classnames((item as ChildType).props.className, CSS_CLASSES.ACTION, CSS_CLASSES.ACTION_ICON);
        const props = Object.assign({}, (item as ChildType).props, { className });
        return React.cloneElement(item as ChildType, props);
    });
};

const ActionIcons: React.FunctionComponent<ActionIconsProps> = ({ className = '', children, ...otherProps }) => {
    const classes = classnames(CSS_CLASSES.ACTION_ICONS, className);
    if (!children) return null;
    return (
        <div className={classes} {...otherProps}>
            {addIconClassToChildren(children)}
        </div>
    );
};

export default ActionIcons;
