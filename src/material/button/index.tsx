import React from 'react';
import classnames from 'classnames';
import {
    withRipple,
    InjectedProps,
    // @ts-ignore TODO(issues/955) Remove once possible
    RippledComponentProps, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '../ripple';

import { CSS_CLASSES } from './constant';

type ButtonTypes = HTMLButtonElement | HTMLAnchorElement;

export interface ButtonProps<T extends ButtonTypes> extends InjectedProps<T>, React.HTMLProps<T> {
    raised?: boolean;
    unelevated?: boolean;
    outlined?: boolean;
    dense?: boolean;
    icon?: React.ReactElement<React.HTMLProps<HTMLOrSVGElement>>;
    trailingIcon?: React.ReactElement<React.HTMLProps<HTMLOrSVGElement>>;
    // Made a combination of changes suggested in this issue to make the typings work
    // https://github.com/material-components/material-components-web-react/issues/781#issuecomment-479031747
    type?: React.ButtonHTMLAttributes<T>['type'];
}

const renderIcon = (icon?: React.ReactElement<React.HTMLProps<HTMLOrSVGElement>>) =>
    icon
        ? React.cloneElement(icon, {
              className: classnames(CSS_CLASSES.ICON, icon.props.className),
          })
        : null;

export const Button = <T extends ButtonTypes>({
    className = '',
    raised = false,
    unelevated = false,
    outlined = false,
    dense = false,
    disabled = false,
    icon,
    href,
    children,
    initRipple,
    trailingIcon,
    // eslint disabled since we do not want to include
    // this in ...otherProps.
    // if unbounded is passed to the <button> element, it will throw
    // a warning.
    unbounded = false, // eslint-disable-line @typescript-eslint/no-unused-vars
    ...otherProps
}: ButtonProps<T>) => {
    const props = {
        className: classnames(CSS_CLASSES.ROOT, className, {
            [CSS_CLASSES.RAISED]: raised,
            [CSS_CLASSES.UNELEVATED]: unelevated,
            [CSS_CLASSES.OUTLINED]: outlined,
            [CSS_CLASSES.DENSE]: dense,
        }),
        ref: initRipple,
        disabled,
        ...otherProps,
    };

    if (href) {
        return (
            <a {...(props as React.HTMLProps<HTMLAnchorElement>)} href={href}>
                {!trailingIcon ? renderIcon(icon) : null}
                <span className={CSS_CLASSES.LABEL}>{children}</span>
                {trailingIcon ? renderIcon(trailingIcon) : null}
            </a>
        );
    }

    return (
        <button {...(props as ButtonProps<HTMLButtonElement>)}>
            {!trailingIcon ? renderIcon(icon) : null}
            <span className={CSS_CLASSES.LABEL}>{children}</span>
            {trailingIcon ? renderIcon(trailingIcon) : null}
        </button>
    );
};

Button.defaultProps = {
    initRipple: () => {},
};

export default withRipple<ButtonProps<ButtonTypes>, ButtonTypes>(Button);
