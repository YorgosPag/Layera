// Layera Icons - Main Icon Component
// Enterprise pattern: Ενιαίο component για όλα τα εικονίδια

import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseIconProps, IconSize, IconVariant, IconTheme } from './types';

// Μεγέθη εικονιδίων σε pixels
const ICON_SIZES = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32
};

// Χρώματα θεμάτων (Layera Brand Colors)
const THEME_COLORS = {
  primary: 'var(--la-color-blue-600, var(--la-color-brand-hover))',    // Κύριο μπλε Layera
  secondary: 'var(--la-color-slate-500, var(--la-text-muted))',  // Γκρι
  success: 'var(--la-color-emerald-500, var(--la-color-success))',    // Πράσινο
  warning: 'var(--la-color-amber-500, var(--la-color-warning))',    // Πορτοκαλί
  danger: 'var(--la-color-red-500, var(--la-color-error))',     // Κόκκινο
  info: 'var(--la-color-cyan-500, var(--la-color-info))',       // Ανοιχτό μπλε
  neutral: 'var(--la-color-gray-500, var(--la-text-secondary))'     // Ουδέτερο γκρι
};

// Στυλ για κάθε variant
const VARIANT_STYLES = {
  solid: {
    fill: 'currentColor',
    stroke: 'none'
  },
  outline: {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2
  },
  light: {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5
  },
  duotone: {
    fill: 'currentColor',
    stroke: 'currentColor',
    strokeWidth: 1,
    opacity: 0.8
  }
};

export interface IconProps extends BaseIconProps {
  name: string;
  children?: React.ReactNode; // SVG path content
}

/**
 * Layera Icon Component
 *
 * Ενιαίο component για όλα τα εικονίδια στο Layera ecosystem
 * Υποστηρίζει διαφορετικά μεγέθη, variants και θέματα
 *
 * @example
 * <Icon name="home" size="md" variant="outline" theme="primary" />
 * <Icon name="map" size={24} variant="solid" theme="success" />
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  variant = 'outline',
  theme = 'neutral',
  className = '',
  style,
  onClick,
  children,
  'aria-label': ariaLabel,
  title,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ...props
}) => {
  // Υπολογισμός μεγέθους
  const iconSize = typeof size === 'number' ? size : ICON_SIZES[size];

  // Υπολογισμός χρώματος
  const color = THEME_COLORS[theme];

  // Στυλ για το variant
  const variantStyle = VARIANT_STYLES[variant];

  // Τελικό στυλ
  const finalStyle: React.CSSProperties = {
    width: iconSize,
    height: iconSize,
    color: color,
    display: 'inline-block',
    verticalAlign: 'middle',
    flexShrink: 0,
    ...style
  };

  // CSS κλάσεις
  const classes = [
    'layera-icon',
    `layera-icon--${name}`,
    `layera-icon--${variant}`,
    `layera-icon--${theme}`,
    `layera-icon--size-${typeof size === 'string' ? size : 'custom'}`,
    onClick ? 'layera-icon--clickable' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <svg
      className={classes}
      {...(finalStyle && { style: finalStyle })}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={ariaLabel || `${name} icon`}
      onClick={onClick}
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e: React.KeyboardEvent<SVGSVGElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
      {...variantStyle}
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
};

export default Icon;