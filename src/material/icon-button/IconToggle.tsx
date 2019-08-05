import React from 'react';
import classnames from 'classnames';

export interface IconToggleProps {
    className?: string;
    isOn?: boolean;
}

const IconToggle: React.FunctionComponent<IconToggleProps> = ({ isOn = false, className = '', children = '' }) => {
    const classes = classnames('mdc-icon-button__icon', { 'mdc-icon-button__icon--on': isOn }, className);
    return <div className={classes}>{children}</div>;
};

export default IconToggle;
