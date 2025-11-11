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

export interface TypographyProps {
  size?: FontSize;
  weight?: FontWeight;
  align?: TextAlign;
  color?: TextColor;
  lineHeight?: LineHeight;
  className?: string;
  children: React.ReactNode;
}

export interface HeadingProps extends Omit<TypographyProps, 'children'>, Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'color'> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children?: React.ReactNode;
}

export interface TextProps extends Omit<TypographyProps, 'children'>, Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'color'> {
  as?: 'p' | 'span' | 'div' | 'label';
  children?: React.ReactNode;
}

// Enterprise Typography Scale - βασισμένο στα industry standards
// Χρησιμοποιεί CSS custom properties για Single Source of Truth
export interface TypographyScale {
  fontSizes: Record<FontSize, string>;
  fontWeights: Record<FontWeight, string>;
  lineHeights: Record<LineHeight, string>;
  letterSpacing: Record<FontSize, string>;
}