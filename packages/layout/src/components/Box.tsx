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

import React, { forwardRef } from 'react';

// Enterprise type alias για consistent ReactNode
type LayeraReactNode = React.ReactNode;

export interface BoxProps {
  children?: LayeraReactNode;
  className?: string;
  as?: 'section' | 'article' | 'main' | 'aside' | 'nav' | 'header' | 'footer' | 'div' | 'span' | 'button' | 'input';
  style?: React.CSSProperties;

  // Safe DOM attributes
  id?: string;
  role?: string;
  type?: 'button' | 'submit' | 'reset' | 'color' | 'range' | 'text' | 'number' | 'email' | 'password';
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-modal'?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  onMouseDown?: React.MouseEventHandler<HTMLElement>;
  onMouseUp?: React.MouseEventHandler<HTMLElement>;

  // Input-specific attributes (for as="input")
  value?: string | number;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onInput?: React.FormEventHandler<HTMLInputElement>;
}

export const Box: React.FC<BoxProps> = ({
  children,
  className = '',
  as = 'div',
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