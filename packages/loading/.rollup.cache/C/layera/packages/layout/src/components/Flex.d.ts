import React from 'react';
export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
    justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    gap?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
    marginTop?: string | number;
    marginBottom?: string | number;
    marginLeft?: string | number;
    marginRight?: string | number;
    minHeight?: string | number;
    backgroundColor?: string;
    className?: string;
    style?: React.CSSProperties;
    as?: 'div' | 'button' | 'span' | 'section' | 'article' | 'header' | 'footer' | 'nav';
    id?: string;
    role?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLElement>;
}
export declare const Flex: React.ForwardRefExoticComponent<FlexProps & React.RefAttributes<HTMLDivElement>>;
