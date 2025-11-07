// Layera Button System Types - Enterprise UI Component Library

import { ReactNode, ComponentPropsWithoutRef } from 'react';

/**
 * Button size variants με WCAG 2.1 compliance
 * Minimum 44x44px για touch targets
 */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Button visual variants - Enterprise design patterns
 */
export type ButtonVariant =
  | 'primary'      // Κύρια δράση - high emphasis
  | 'secondary'    // Δευτερεύουσα δράση - medium emphasis
  | 'outline'      // Περίγραμμα - medium emphasis
  | 'ghost'        // Διάφανο - low emphasis
  | 'danger'       // Καταστροφική δράση - error state
  | 'success'      // Επιτυχής δράση - success state
  | 'warning'      // Προειδοποίηση - warning state
  | 'info'         // Πληροφοριακό - info state
  | 'elevated'     // 🆕 Modern elevated design with shadow depth
  | 'neumorphic'   // 🆕 Subtle neumorphic design for premium feel
  | 'gradient'     // 🆕 Modern gradient background for highlights
  | 'flat'         // 🆕 Completely flat design for minimalist UIs
  | 'soft';        // 🆕 Soft rounded design with subtle colors

/**
 * Button loading state variants
 */
export type ButtonLoadingVariant = 'spinner' | 'dots' | 'pulse';

/**
 * Icon position within button
 */
export type IconPosition = 'left' | 'right' | 'only';

/**
 * Base button properties για accessibility και functionality
 */
export interface BaseButtonProps {
  /** Button visual variant */
  variant?: ButtonVariant;

  /** Button size - affects padding, font-size, min-height */
  size?: ButtonSize;

  /** Full width button */
  fullWidth?: boolean;

  /** Loading state - shows spinner and disables interaction */
  loading?: boolean;

  /** Loading spinner variant */
  loadingVariant?: ButtonLoadingVariant;

  /** Loading text to show instead of children */
  loadingText?: string;

  /** Icon element to display */
  icon?: ReactNode;

  /** Icon position relative to text */
  iconPosition?: IconPosition;

  /** Additional CSS class names */
  className?: string;

  /** Inline styles */
  style?: React.CSSProperties;

  /** Children content */
  children?: ReactNode;
}

/**
 * Button component props που extend native button attributes
 */
export interface ButtonProps extends BaseButtonProps, Omit<ComponentPropsWithoutRef<'button'>, keyof BaseButtonProps> {
  /** Button type - default is 'button' για accessibility */
  type?: 'button' | 'submit' | 'reset';

  // Additional CSS properties that should NOT be passed to DOM (handled internally)
  margin?: string | number;
  marginTop?: string | number;
  marginBottom?: string | number;
  marginLeft?: string | number;
  marginRight?: string | number;
  padding?: string | number;
  width?: string | number;
  border?: string;
  borderRadius?: string | number;
  fontWeight?: string;
  transition?: string;
  color?: string;
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'; // ΜΟΝΑΔΙΚΗ ΠΗΓΗ ΑΛΗΘΕΙΑΣ από box-model CSS values
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  fontSize?: string;
  title?: string;
}

/**
 * Link button component props που extend native anchor attributes
 */
export interface LinkButtonProps extends BaseButtonProps, Omit<ComponentPropsWithoutRef<'a'>, keyof BaseButtonProps> {
  /** Link destination */
  href: string;

  /** Link target */
  target?: string;

  /** Link relationship */
  rel?: string;
}

/**
 * Button group properties για related actions
 */
export interface ButtonGroupProps {
  /** Button group orientation */
  orientation?: 'horizontal' | 'vertical';

  /** Spacing between buttons */
  spacing?: ButtonSize;

  /** All buttons same size */
  uniform?: boolean;

  /** Additional CSS class names */
  className?: string;

  /** Children buttons */
  children: ReactNode;
}

/**
 * Button design tokens interface
 */
export interface ButtonTokens {
  sizes: Record<ButtonSize, {
    height: string;
    padding: string;
    fontSize: string;
    iconSize: string;
    gap: string;
  }>;

  variants: Record<ButtonVariant, {
    background: string;
    color: string;
    border: string;
    hover: {
      background: string;
      color: string;
      border: string;
    };
    active: {
      background: string;
      color: string;
      border: string;
    };
    focus: {
      outline: string;
      ring: string;
    };
    disabled: {
      background: string;
      color: string;
      border: string;
    };
  }>;

  transitions: {
    default: string;
    fast: string;
    slow: string;
  };

  radius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
}