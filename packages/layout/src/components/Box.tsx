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
import { SIZING_SCALE, getSizingVar, getSizingValue, type SizingToken } from '../sizing';

export interface BoxProps {
  children?: React.ReactNode;

  // Sizing properties (enterprise-grade)
  width?: SizingToken | string | number;
  height?: SizingToken | string | number;
  minWidth?: SizingToken | string | number;
  minHeight?: SizingToken | string | number;
  maxWidth?: SizingToken | string | number;
  maxHeight?: SizingToken | string | number;

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
  if (typeof value === 'string' && value in SIZING_SCALE) {
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
  className,
  style,
  as: Component = 'div',
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

      // Merge με user styles
      ...style
    };
  }, [width, height, minWidth, minHeight, maxWidth, maxHeight, style]);

  return (
    <Component
      className={className}
      style={boxStyles}
      {...rest}
    >
      {children}
    </Component>
  );
};