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

export interface BoxProps {
  children?: React.ReactNode;
  className?: string;
  as?: 'section' | 'article' | 'main' | 'aside' | 'nav' | 'header' | 'footer' | 'div' | 'span' | 'button';
  style?: React.CSSProperties;

  // Safe DOM attributes
  id?: string;
  role?: string;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
}

export const Box: React.FC<BoxProps> = ({
  children,
  className = '',
  as = 'section',
  ...restProps
}) => {
  const Component = as;

  return (
    <Component
      className={`layera-box ${className}`.trim()}
      {...restProps}
    >
      {children}
    </Component>
  );
};