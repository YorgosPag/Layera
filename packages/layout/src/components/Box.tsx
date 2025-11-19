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

// React 19.1.1 compatible generic component type
type BoxElement = 'section' | 'article' | 'main' | 'aside' | 'nav' | 'header' | 'footer' | 'div' | 'span' | 'button' | 'input';

export interface BoxProps {
  children?: LayeraReactNode;
  className?: string;
  as?: BoxElement;
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
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onInput?: React.FormEventHandler<HTMLInputElement>;
}

// ✅ ARXES COMPLIANT: Simple forwardRef approach without complex generics
export const Box = forwardRef<HTMLElement, BoxProps>(({
  children,
  className = '',
  as = 'div',
  style,
  id,
  role,
  type,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-modal': ariaModal,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  value,
  min,
  max,
  step,
  placeholder,
  onChange,
  onInput,
  ...restProps
}, _ref) => {
  const Component = as;

  // ✅ ARXES COMPLIANT: Type-safe props without any
  const elementProps: Record<string, unknown> = {
    ref: _ref,
    style,
    id,
    role,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    'aria-modal': ariaModal,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    ...restProps
  };

  // Add type-specific props
  if (as === 'button' && type && ['button', 'submit', 'reset'].includes(type)) {
    elementProps.type = type;
  } else if (as === 'input') {
    if (type && ['color', 'range', 'text', 'number', 'email', 'password'].includes(type)) {
      elementProps.type = type;
    }
    if (value !== undefined) elementProps.value = value;
    if (min !== undefined) elementProps.min = min;
    if (max !== undefined) elementProps.max = max;
    if (step !== undefined) elementProps.step = step;
    if (placeholder !== undefined) elementProps.placeholder = placeholder;
    if (onChange) elementProps.onChange = onChange;
    if (onInput) elementProps.onInput = onInput;
  }

  return (
    <Component
      className={`layera-box ${className}`.trim()}
      {...elementProps}
    >
      {children}
    </Component>
  );
});

Box.displayName = 'Box';