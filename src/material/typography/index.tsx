import typographyHOC from './Typography';

export const Body1 = typographyHOC<HTMLParagraphElement>({
    classModifier: 'body1',
    tag: 'p',
});

export const Body2 = typographyHOC<HTMLParagraphElement>({
    classModifier: 'body2',
    tag: 'p',
});

export const Button = typographyHOC<HTMLSpanElement>({
    classModifier: 'button',
    tag: 'span',
});

export const Caption = typographyHOC<HTMLSpanElement>({
    classModifier: 'caption',
    tag: 'span',
});

export const Headline1 = typographyHOC<HTMLHeadingElement>({
    classModifier: 'headline1',
    tag: 'h1',
});

export const Headline2 = typographyHOC<HTMLHeadingElement>({
    classModifier: 'headline2',
    tag: 'h2',
});

export const Headline3 = typographyHOC<HTMLHeadingElement>({
    classModifier: 'headline3',
    tag: 'h3',
});

export const Headline4 = typographyHOC<HTMLHeadingElement>({
    classModifier: 'headline4',
    tag: 'h4',
});

export const Headline5 = typographyHOC<HTMLHeadingElement>({
    classModifier: 'headline5',
    tag: 'h5',
});

export const Headline6 = typographyHOC<HTMLHeadingElement>({
    classModifier: 'headline6',
    tag: 'h6',
});

export const Overline = typographyHOC<HTMLSpanElement>({
    classModifier: 'overline',
    tag: 'span',
});

export const Subtitle1 = typographyHOC<HTMLHeadingElement>({
    classModifier: 'subtitle1',
    tag: 'h6',
});

export const Subtitle2 = typographyHOC<HTMLHeadingElement>({
    classModifier: 'subtitle2',
    tag: 'h6',
});
