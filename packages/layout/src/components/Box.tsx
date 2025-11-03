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

import React, { useMemo } from 'react';
import { SPACING_SCALE } from '@layera/constants';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getSizingVar, getSizingValue, type SizingToken } from '../sizing';

export interface BoxProps {
  children?: React.ReactNode;

  // Sizing properties (enterprise-grade)
  width?: SizingToken | string | number;
  height?: SizingToken | string | number;
  minWidth?: SizingToken | string | number;
  minHeight?: SizingToken | string | number;
  maxWidth?: SizingToken | string | number;
  maxHeight?: SizingToken | string | number;

  // CSS properties that should NOT be passed to DOM (handled internally)
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
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky' | string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  color?: string;
  minHeight?: string | number;

  // Common CSS properties
  className?: string;
  style?: React.CSSProperties;

  // HTML attributes
  id?: string;
  role?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;

  // Event handlers
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;

  // Polymorphic as prop
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Utility function για sizing value conversion
 */
const resolveSizingValue = (value: SizingToken | string | number | undefined): string | undefined => {
  if (value === undefined) return undefined;

  // If it's a SizingToken, get the value
  if (typeof value === 'string' && value in SPACING_SCALE) {
    const result = getSizingValue(value as SizingToken);
    return typeof result === 'number' ? `${result}px` : result;
  }

  // If it's a number, add px
  if (typeof value === 'number') {
    return `${value}px`;
  }

  // If it's a string, return as-is (allows CSS values like '100%', 'auto', etc.)
  return value;
};

export const Box: React.FC<BoxProps> = ({
  children,
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  margin,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  padding,
  backgroundColor,
  borderRadius,
  textAlign,
  boxSizing,
  animationDuration,
  gridTemplateColumns,
  display,
  alignItems,
  gap,
  fontSize,
  opacity,
  position,
  top,
  right,
  bottom,
  left,
  color,
  className,
  style,
  as: Component = 'div',
  id,
  role,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...rest
}) => {
  // Memoized styles για performance
  const boxStyles = useMemo((): React.CSSProperties => {
    return {
      // Sizing properties
      width: resolveSizingValue(width),
      height: resolveSizingValue(height),
      minWidth: resolveSizingValue(minWidth),
      minHeight: resolveSizingValue(minHeight),
      maxWidth: resolveSizingValue(maxWidth),
      maxHeight: resolveSizingValue(maxHeight),

      // Layout properties - individual values override shorthand
      margin: typeof margin === 'number' ? `${margin}px` : margin,
      marginTop: typeof marginTop === 'number' ? `${marginTop}px` : marginTop,
      marginBottom: typeof marginBottom === 'number' ? `${marginBottom}px` : marginBottom,
      marginLeft: typeof marginLeft === 'number' ? `${marginLeft}px` : marginLeft,
      marginRight: typeof marginRight === 'number' ? `${marginRight}px` : marginRight,

      padding: typeof padding === 'number' ? `${padding}px` : padding,
      paddingTop: typeof paddingTop === 'number' ? `${paddingTop}px` : paddingTop,
      paddingBottom: typeof paddingBottom === 'number' ? `${paddingBottom}px` : paddingBottom,
      paddingLeft: typeof paddingLeft === 'number' ? `${paddingLeft}px` : paddingLeft,
      paddingRight: typeof paddingRight === 'number' ? `${paddingRight}px` : paddingRight,

      // Visual properties
      backgroundColor,
      borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
      textAlign,
      boxSizing,
      animationDuration: typeof animationDuration === 'number' ? `${animationDuration}ms` : animationDuration,
      gridTemplateColumns,
      display,
      alignItems,
      gap,
      fontSize,
      opacity,
      position,
      top,
      right,
      bottom,
      left,
      color,

      // Merge με user styles
      ...style
    };
  }, [width, height, minWidth, minHeight, maxWidth, maxHeight, margin, marginTop, marginBottom, marginLeft, marginRight, padding, paddingTop, paddingBottom, paddingLeft, paddingRight, backgroundColor, borderRadius, textAlign, boxSizing, animationDuration, gridTemplateColumns, display, alignItems, gap, fontSize, opacity, position, top, right, bottom, left, color, style]);

  // Only safe DOM props
  const domProps = {
    id,
    role,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    onClick,
    onMouseEnter,
    onMouseLeave,
    ...rest
  };

  return (
    <Component
      className={className}
      style={boxStyles}
      {...domProps}
    >
      {children}
    </Component>
  );
};