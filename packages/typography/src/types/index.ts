// Typography Types για το Layera Design System
import React from 'react';

export type FontSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';

export type FontWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';

export type TextAlign = 'left' | 'center' | 'right' | 'justify';

export type TextColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'neutral'
  | 'muted'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

export type LineHeight = 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose';

export type StyleProps = Pick<React.CSSProperties,
  | "marginTop" | "marginBottom" | "marginLeft" | "marginRight"
  | "paddingTop" | "paddingBottom" | "paddingLeft" | "paddingRight"
  | "alignItems" | "gap" | "justifyContent" | "flexDirection"
  | "fontSize" | "minWidth" | "textAlign"
>;

export interface TypographyProps {
  size?: FontSize;
  weight?: FontWeight;
  align?: TextAlign;
  color?: TextColor;
  lineHeight?: LineHeight;
  className?: string;
  children?: React.ReactNode;
}

export interface HeadingProps extends TypographyProps, StyleProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export interface TextProps extends TypographyProps, StyleProps, Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  as?: 'p' | 'span' | 'div' | 'label';
}

// Enterprise Typography Scale - βασισμένο στα industry standards
export interface TypographyScale {
  fontSizes: Record<FontSize, string>;
  fontWeights: Record<FontWeight, number>;
  lineHeights: Record<LineHeight, number>;
  letterSpacing: Record<FontSize, string>;
}