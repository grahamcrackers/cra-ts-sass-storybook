/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import React from 'react';
import classnames from 'classnames';
import {
    withRipple,
    InjectedProps,
    // @ts-ignore TODO(issues/955) Remove once possible
    RippledComponentProps, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '../ripple';
import { MDCIconButtonToggleAdapter } from '@material/icon-button/adapter';
import { MDCIconButtonToggleFoundation } from '@material/icon-button/foundation';
import { MDCIconButtonToggleEventDetail } from '@material/icon-button/types';
import IconToggle from './IconToggle';

const ARIA_PRESSED = 'aria-pressed';

interface ElementAttributes {
    // from HTMLAttributes
    [ARIA_PRESSED]?: boolean | 'false' | 'mixed' | 'true';
}

type IconButtonTypes = HTMLButtonElement | HTMLAnchorElement;
export interface IconButtonBaseProps extends ElementAttributes {
    handleChange?: (evt: MDCIconButtonToggleEventDetail) => void;
    isLink?: boolean;
}

interface IconButtonBaseState extends ElementAttributes {
    classList: Set<string>;
}

export interface IconButtonProps<T extends IconButtonTypes>
    extends InjectedProps<T>,
        IconButtonBaseProps,
        React.HTMLProps<T> {
    type?: React.ButtonHTMLAttributes<T>['type'];
}

class IconButtonBase<T extends IconButtonTypes> extends React.Component<IconButtonProps<T>, IconButtonBaseState> {
    foundation!: MDCIconButtonToggleFoundation;

    constructor(props: IconButtonProps<T>) {
        super(props);
        this.state = {
            classList: new Set(),
            [ARIA_PRESSED]: props[ARIA_PRESSED],
        };
    }

    static defaultProps = {
        className: '',
        handleChange: () => {},
        initRipple: () => {},
        isLink: false,
        onClick: () => {},
        unbounded: true,
    };

    componentDidMount() {
        this.foundation = new MDCIconButtonToggleFoundation(this.adapter);
        this.foundation.init();
    }

    get classes() {
        const { classList } = this.state;
        const { className } = this.props;
        return classnames('mdc-icon-button', Array.from(classList), className);
    }

    get adapter(): MDCIconButtonToggleAdapter {
        return {
            addClass: (className: string) => this.setState({ classList: this.state.classList.add(className) }),
            removeClass: (className: string) => {
                const { classList } = this.state;
                classList.delete(className);
                this.setState({ classList });
            },
            hasClass: (className: string) => this.classes.split(' ').includes(className),
            setAttr: this.updateState,
            notifyChange: this.props.handleChange!,
        };
    }

    updateState = (key: keyof IconButtonBaseState, value: string | boolean) => {
        this.setState(prevState => ({
            ...prevState,
            [key]: value,
        }));
    };

    handleClick_ = (e: React.MouseEvent<T>) => {
        this.props.onClick!(e);
        this.foundation.handleClick();
    };

    render() {
        const {
            children,
            initRipple,
            isLink,
            /* eslint-disable @typescript-eslint/no-unused-vars */
            className,
            handleChange,
            onClick,
            unbounded,
            [ARIA_PRESSED]: ariaPressed,
            /* eslint-enable @typescript-eslint/no-unused-vars */
            ...otherProps
        } = this.props;

        const props = {
            className: this.classes,
            ref: initRipple,
            [ARIA_PRESSED]: this.state[ARIA_PRESSED],
            onClick: this.handleClick_,
            ...otherProps,
        };
        if (isLink) {
            return <a {...(props as IconButtonProps<HTMLAnchorElement>)}>{children}</a>;
        }
        return <button {...(props as IconButtonProps<HTMLButtonElement>)}>{children}</button>;
    }
}

const IconButton = withRipple<IconButtonProps<IconButtonTypes>, IconButtonTypes>(IconButtonBase);

export default IconButton;
export { IconToggle, IconButtonBase };
