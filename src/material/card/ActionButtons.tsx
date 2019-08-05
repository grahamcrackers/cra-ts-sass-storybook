import React from 'react';
import classnames from 'classnames';

import { CSS_CLASSES } from './constant';

type ChildType = React.ReactElement<React.HTMLProps<HTMLButtonElement | HTMLAnchorElement>>;

export interface ActionButtonsProps extends React.HTMLProps<HTMLDivElement> {
    className?: string;
    children?: ChildType | ChildType[];
}

const addButtonClassToChildren = (children: ChildType | ChildType[]) => {
    return React.Children.map(children as ChildType | ChildType[], item => {
        const className = classnames(
            (item as ChildType).props.className,
            CSS_CLASSES.ACTION,
            CSS_CLASSES.ACTION_BUTTON,
        );
        const props = Object.assign({}, (item as ChildType).props, { className });
        return React.cloneElement(item as ChildType, props);
    });
};

const ActionButtons: React.FunctionComponent<ActionButtonsProps> = ({ className = '', children, ...otherProps }) => {
    const classes = classnames(CSS_CLASSES.ACTION_BUTTONS, className);
    if (!children) return null;
    return (
        <div className={classes} {...otherProps}>
            {addButtonClassToChildren(children)}
        </div>
    );
};

export default ActionButtons;
