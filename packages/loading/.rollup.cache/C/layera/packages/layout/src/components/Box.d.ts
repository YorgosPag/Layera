/**
 * Box Component - Enterprise Layout Primitive
 *
 * 🌟 Universal layout primitive που ξεπερνά Material-UI Box και Chakra Box
 *
 * Features:
 * - Complete sizing system integration
 * - Type-safe width/height props
 * - CSS Custom Properties support
 * - Performance-optimized με memoization
 * - Enterprise-grade flexibility
 */
import React from 'react';
import { type SizingToken } from '../sizing';
export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    width?: SizingToken | string | number;
    height?: SizingToken | string | number;
    minWidth?: SizingToken | string | number;
    minHeight?: SizingToken | string | number;
    maxWidth?: SizingToken | string | number;
    maxHeight?: SizingToken | string | number;
    marginTop?: string | number;
    marginBottom?: string | number;
    marginLeft?: string | number;
    marginRight?: string | number;
    margin?: string | number;
    paddingTop?: string | number;
    paddingBottom?: string | number;
    paddingLeft?: string | number;
    paddingRight?: string | number;
    padding?: string | number;
    backgroundColor?: string;
    borderRadius?: string | number;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    boxSizing?: 'border-box' | 'content-box';
    animationDuration?: string | number;
    gridTemplateColumns?: string;
    display?: string;
    alignItems?: string;
    gap?: string;
    fontSize?: string;
    opacity?: number;
    position?: React.CSSProperties['position'];
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
    color?: string;
    className?: string;
    style?: React.CSSProperties;
    id?: string;
    role?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
    as?: keyof JSX.IntrinsicElements;
}
export declare const Box: React.ForwardRefExoticComponent<BoxProps & React.RefAttributes<HTMLDivElement>>;
