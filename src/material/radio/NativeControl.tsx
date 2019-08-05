import React from 'react';
import classnames from 'classnames';

export interface NativeControlProps extends React.HTMLProps<HTMLInputElement> {
    className?: string;
    rippleActivatorRef?: React.RefObject<HTMLInputElement>;
}

const NativeControl: React.FunctionComponent<NativeControlProps> = ({
    rippleActivatorRef,
    className = '',
    ...otherProps
}) => {
    return (
        <input
            type="radio"
            className={classnames('mdc-radio__native-control', className)}
            ref={rippleActivatorRef}
            {...otherProps}
        />
    );
};

export default NativeControl;
