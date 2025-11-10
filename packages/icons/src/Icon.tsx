// Layera Icons - Main Icon Component
// Enterprise pattern: Ενιαίο component για όλα τα εικονίδια

import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseIconProps, IconSize, IconVariant, IconTheme } from './types';

// 🏢 ENTERPRISE ARCHITECTURE - Single Source of Truth με fallback constants

// 🏢 ENTERPRISE ARCHITECTURE - 100% SSOT Tokens με fallback
const ENTERPRISE_TOKENS = {
  sizes: {
    xs: 'var(--la-icon-xs)', // CSS Variable από SSOT
    sm: 'var(--la-icon-smBase)', // CSS Variable από SSOT
    md: 'var(--la-icon-md)', // CSS Variable από SSOT
    lg: 'var(--la-icon-lg)', // CSS Variable από SSOT
    xl: 'var(--la-icon-xl)', // CSS Variable από SSOT
    xxl: 'var(--la-icon-xxl)', // CSS Variable από SSOT
    xxxl: 'var(--la-icon-xxxl)' // CSS Variable από SSOT
  },
  strokes: {
    thin: 1,    // από SSOT
    light: 1.5,  // από SSOT - DEFAULT
    normal: 2, // από SSOT
    bold: 2.5     // από SSOT
  },
  colors: {
    primary: 'var(--la-icon-colorPrimary)',   // CSS Variable από SSOT
    secondary: 'var(--la-icon-colorSecondary)', // CSS Variable από SSOT
    success: 'var(--la-icon-colorSuccess)',   // CSS Variable από SSOT
    warning: 'var(--la-icon-colorWarning)',   // CSS Variable από SSOT
    danger: 'var(--la-icon-colorDanger)',     // CSS Variable από SSOT
    info: 'var(--la-icon-colorInfo)',         // CSS Variable από SSOT
    neutral: 'var(--la-icon-colorNeutral)'    // CSS Variable από SSOT
  },
  // 🌙 Dark theme colors
  darkColors: {
    primary: 'var(--la-iconAdvanced-theming-darkPrimary)',
    secondary: 'var(--la-iconAdvanced-theming-darkSecondary)',
    neutral: 'var(--la-iconAdvanced-theming-darkNeutral)',
    success: 'var(--la-iconAdvanced-theming-darkSuccess)',
    warning: 'var(--la-iconAdvanced-theming-darkWarning)',
    danger: 'var(--la-iconAdvanced-theming-darkDanger)',
    info: 'var(--la-iconAdvanced-theming-darkInfo)'
  },
  // 🎯 Interactive states
  interactive: {
    opacity: {
      default: 'var(--la-iconAdvanced-interactive-opacity-default)',
      hover: 'var(--la-iconAdvanced-interactive-opacity-hover)',
      active: 'var(--la-iconAdvanced-interactive-opacity-active)',
      disabled: 'var(--la-iconAdvanced-interactive-opacity-disabled)'
    },
    scale: {
      default: 'var(--la-iconAdvanced-interactive-scale-default)',
      hover: 'var(--la-iconAdvanced-interactive-scale-hover)',
      active: 'var(--la-iconAdvanced-interactive-scale-active)'
    },
    transition: {
      fast: 'var(--la-iconAdvanced-interactive-transition-fast)',
      normal: 'var(--la-iconAdvanced-interactive-transition-normal)',
      slow: 'var(--la-iconAdvanced-interactive-transition-slow)'
    }
  },
  // ♿ Accessibility
  accessibility: {
    focusRing: {
      width: 'var(--la-iconAdvanced-accessibility-focusRing-width)',
      color: 'var(--la-iconAdvanced-accessibility-focusRing-color)'
    },
    contrast: {
      normal: 'var(--la-iconAdvanced-accessibility-contrast-normal)',
      large: 'var(--la-iconAdvanced-accessibility-contrast-large)'
    }
  },
  // 📱 Touch targets
  touchTarget: {
    mobile: 'var(--la-iconAdvanced-sizing-touchTargetMobile)',
    desktop: 'var(--la-iconAdvanced-sizing-touchTargetDesktop)'
  }
};

// Μεγέθη εικονιδίων σε pixels - 100% SSOT values
const ICON_SIZES = {
  xs: ENTERPRISE_TOKENS.sizes.xs,     // όλα από SSOT
  sm: ENTERPRISE_TOKENS.sizes.sm,     // όλα από SSOT
  md: ENTERPRISE_TOKENS.sizes.md,     // όλα από SSOT
  lg: ENTERPRISE_TOKENS.sizes.lg,     // όλα από SSOT
  xl: ENTERPRISE_TOKENS.sizes.xl,     // όλα από SSOT
  xxl: ENTERPRISE_TOKENS.sizes.xxl,   // όλα από SSOT
  xxxl: ENTERPRISE_TOKENS.sizes.xxxl  // όλα από SSOT
};

// Χρώματα θεμάτων - Enterprise SSOT colors 🏢
const THEME_COLORS = {
  primary: ENTERPRISE_TOKENS.colors.primary,     // από SSOT
  secondary: ENTERPRISE_TOKENS.colors.secondary, // από SSOT
  success: ENTERPRISE_TOKENS.colors.success,     // από SSOT
  warning: ENTERPRISE_TOKENS.colors.warning,     // από SSOT
  danger: ENTERPRISE_TOKENS.colors.danger,       // από SSOT
  info: ENTERPRISE_TOKENS.colors.info,           // από SSOT
  neutral: ENTERPRISE_TOKENS.colors.neutral      // από SSOT
};

// Στυλ για κάθε variant - Enterprise stroke widths από SSOT 🎯
const VARIANT_STYLES = {
  solid: {
    fill: 'currentColor',
    stroke: 'none'
  },
  outline: {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: ENTERPRISE_TOKENS.strokes.normal // από SSOT
  },
  light: {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: ENTERPRISE_TOKENS.strokes.light // DEFAULT από SSOT
  },
  duotone: {
    fill: 'currentColor',
    stroke: 'currentColor',
    strokeWidth: ENTERPRISE_TOKENS.strokes.thin, // από SSOT
    opacity: 0.8
  },
  bold: {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: ENTERPRISE_TOKENS.strokes.bold // Bold από SSOT
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
  variant = 'light', // SST default από design tokens
  theme = 'primary',
  className = '',
  style,
  onClick,
  children,
  'aria-label': ariaLabel,
  title,
  // 🏢 Enterprise features
  darkMode = false,
  interactive = false,
  disabled = false,
  focusable = true,
  touchTarget = 'desktop',
  contrast = 'normal',
  transition = 'normal',
  ...props
}) => {
  // 🏢 Enterprise size calculation με CSS Variables SSOT
  const iconSize = typeof size === 'number' ? `${size}px` : ICON_SIZES[size];

  // Touch target με CSS calc() για enterprise support
  const minTouchTarget = onClick && touchTarget === 'mobile'
    ? `max(${iconSize}, var(--la-iconAdvanced-sizing-touchTargetMobile))`
    : onClick && touchTarget === 'desktop'
    ? `max(${iconSize}, var(--la-iconAdvanced-sizing-touchTargetDesktop))`
    : iconSize;

  // 🌙 Dark mode color calculation
  const colorTheme = darkMode ? ENTERPRISE_TOKENS.darkColors : ENTERPRISE_TOKENS.colors;
  const color = colorTheme[theme] || THEME_COLORS[theme];

  // ♿ Accessibility opacity based on state
  const currentOpacity = disabled
    ? ENTERPRISE_TOKENS.interactive.opacity.disabled
    : ENTERPRISE_TOKENS.interactive.opacity.default;

  // Στυλ για το variant
  const variantStyle = VARIANT_STYLES[variant];

  // 🏢 Enterprise final style με όλα τα advanced features
  const finalStyle: React.CSSProperties = {
    width: minTouchTarget,
    height: minTouchTarget,
    color: color,
    opacity: currentOpacity,
    display: 'inline-block',
    verticalAlign: 'middle',
    flexShrink: 0,
    // 🎯 Interactive states
    transition: interactive ? ENTERPRISE_TOKENS.interactive.transition[transition] : 'none',
    cursor: onClick && !disabled ? 'pointer' : 'default',
    // ♿ Accessibility
    outline: focusable ? `${ENTERPRISE_TOKENS.accessibility.focusRing.width} solid transparent` : 'none',
    outlineOffset: ENTERPRISE_TOKENS.accessibility.focusRing.width,
    // 📱 Touch targets
    minWidth: onClick ? minTouchTarget : 'auto',
    minHeight: onClick ? minTouchTarget : 'auto',
    ...style
  };

  // 🏢 Enterprise CSS κλάσεις με advanced features
  const classes = [
    'layera-icon',
    `layera-icon--${name}`,
    `layera-icon--${variant}`,
    `layera-icon--${theme}`,
    `layera-icon--size-${typeof size === 'string' ? size : 'custom'}`,
    onClick ? 'layera-icon--clickable' : '',
    // 🏢 Enterprise states
    darkMode ? 'layera-icon--dark' : '',
    interactive ? 'layera-icon--interactive' : '',
    disabled ? 'layera-icon--disabled' : '',
    focusable ? 'layera-icon--focusable' : '',
    `layera-icon--touch-${touchTarget}`,
    `layera-icon--contrast-${contrast}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <svg
      className={classes}
      {...(finalStyle && { style: finalStyle })}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      // ♿ Enhanced accessibility
      aria-label={ariaLabel || `${name} icon`}
      aria-disabled={disabled}
      aria-hidden={!focusable && !onClick}
      // 🎯 Interactive handling με disabled support
      onClick={onClick && !disabled ? onClick : undefined}
      role={onClick ? 'button' : 'img'}
      tabIndex={focusable && onClick && !disabled ? 0 : -1}
      onKeyDown={onClick && focusable && !disabled ? (e: React.KeyboardEvent<SVGSVGElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
      // 🎯 Interactive states με SSOT values
      onMouseEnter={interactive ? (e: React.MouseEvent<SVGSVGElement>) => {
        e.currentTarget.style.opacity = ENTERPRISE_TOKENS.interactive.opacity.hover.toString();
        e.currentTarget.style.transform = `scale(${ENTERPRISE_TOKENS.interactive.scale.hover})`;
      } : undefined}
      onMouseLeave={interactive ? (e: React.MouseEvent<SVGSVGElement>) => {
        e.currentTarget.style.opacity = currentOpacity.toString();
        e.currentTarget.style.transform = `scale(${ENTERPRISE_TOKENS.interactive.scale.default})`;
      } : undefined}
      onFocus={focusable ? (e: React.FocusEvent<SVGSVGElement>) => {
        e.currentTarget.style.outline = `${ENTERPRISE_TOKENS.accessibility.focusRing.width} solid ${ENTERPRISE_TOKENS.accessibility.focusRing.color}`;
      } : undefined}
      onBlur={focusable ? (e: React.FocusEvent<SVGSVGElement>) => {
        e.currentTarget.style.outline = 'none';
      } : undefined}
      {...variantStyle}
      {...props}
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
};

export default Icon;