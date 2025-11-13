import { useMemo } from 'react';
import { ButtonSize, ButtonVariant, ButtonTokens } from '../types';

/**
 * useButton Hook - Παρέχει πρόσβαση στο Layera Button Design System
 *
 * Επιστρέφει τα button design tokens και utility functions
 * για programmatic χρήση των button standards
 */
export const useButton = () => {
  const buttonTokens: ButtonTokens = useMemo(() => ({
    sizes: {
      xs: {
        height: '2rem',
        padding: `${SPACING_SCALE.SM}px 0.75rem`,
        fontSize: '0.75rem',
        iconSize: '0.875rem',
        gap: '0.375rem'
      },
      sm: {
        height: '2.25rem',
        padding: `${SPACING_SCALE.SM}px 1rem`,
        fontSize: '0.875rem',
        iconSize: '1rem',
        gap: `${SPACING_SCALE.SM}px`
      },
      md: {
        height: '2.75rem',
        padding: `${SPACING_SCALE.MD}px 1.25rem`,
        fontSize: '1rem',
        iconSize: '1.125rem',
        gap: `${SPACING_SCALE.SM}px`
      },
      lg: {
        height: '3rem',
        padding: `${SPACING_SCALE.MD - SPACING_SCALE.XS / 2}px ${SPACING_SCALE.XL - SPACING_SCALE.SM}px`,
        fontSize: '1.125rem',
        iconSize: '1.25rem',
        gap: `${SPACING_SCALE.SM}px`
      },
      xl: {
        height: '3.5rem',
        padding: `${SPACING_SCALE.MD}px ${SPACING_SCALE.XXL}px`,
        fontSize: '1.25rem',
        iconSize: '1.5rem',
        gap: '0.75rem'
      }
    },
    variants: {
      primary: {
        background: 'var(--la-bg-info)',
        color: 'var(--la-text-on-info)',
        border: 'var(--la-bg-info)',
        hover: {
          background: 'color-mix(in srgb, var(--la-bg-info) 80%, black 20%)',
          color: 'var(--la-text-on-info)',
          border: 'color-mix(in srgb, var(--la-bg-info) 80%, black 20%)'
        },
        active: {
          background: 'color-mix(in srgb, var(--la-bg-info) 70%, black 30%)',
          color: 'var(--la-text-on-info)',
          border: 'color-mix(in srgb, var(--la-bg-info) 70%, black 30%)'
        },
        focus: {
          outline: '2px solid color-mix(in srgb, var(--la-bg-info) 50%, transparent 50%)',
          ring: '0 0 0 2px color-mix(in srgb, var(--la-bg-info) 30%, transparent 70%)'
        },
        disabled: {
          background: 'var(--la-bg-tertiary)',
          color: 'var(--la-text-tertiary)',
          border: 'var(--la-border-primary)'
        }
      },
      secondary: {
        background: 'var(--la-text-secondary)',
        color: 'var(--la-text-on-dark)',
        border: 'var(--la-text-secondary)',
        hover: {
          background: 'color-mix(in srgb, var(--la-text-secondary) 80%, black 20%)',
          color: 'var(--la-text-on-dark)',
          border: 'color-mix(in srgb, var(--la-text-secondary) 80%, black 20%)'
        },
        active: {
          background: 'color-mix(in srgb, var(--la-text-secondary) 70%, black 30%)',
          color: 'var(--la-text-on-dark)',
          border: 'color-mix(in srgb, var(--la-text-secondary) 70%, black 30%)'
        },
        focus: {
          outline: '2px solid color-mix(in srgb, var(--la-text-secondary) 50%, transparent 50%)',
          ring: '0 0 0 2px color-mix(in srgb, var(--la-text-secondary) 30%, transparent 70%)'
        },
        disabled: {
          background: 'var(--la-bg-tertiary)',
          color: 'var(--la-text-tertiary)',
          border: 'var(--la-border-primary)'
        }
      },
      outline: {
        background: 'transparent',
        color: 'var(--la-bg-info)',
        border: 'var(--la-bg-info)',
        hover: {
          background: 'var(--la-bg-info)',
          color: 'var(--la-text-on-info)',
          border: 'var(--la-bg-info)'
        },
        active: {
          background: 'color-mix(in srgb, var(--la-bg-info) 70%, black 30%)',
          color: 'var(--la-text-on-info)',
          border: 'color-mix(in srgb, var(--la-bg-info) 70%, black 30%)'
        },
        focus: {
          outline: '2px solid color-mix(in srgb, var(--la-bg-info) 50%, transparent 50%)',
          ring: '0 0 0 2px color-mix(in srgb, var(--la-bg-info) 30%, transparent 70%)'
        },
        disabled: {
          background: 'var(--la-bg-tertiary)',
          color: 'var(--la-text-tertiary)',
          border: 'var(--la-border-primary)'
        }
      },
      ghost: {
        background: 'transparent',
        color: 'var(--la-text-primary)',
        border: 'transparent',
        hover: {
          background: 'var(--la-bg-tertiary)',
          color: 'var(--la-text-primary)',
          border: 'transparent'
        },
        active: {
          background: 'var(--la-bg-secondary)',
          color: 'var(--la-text-primary)',
          border: 'transparent'
        },
        focus: {
          outline: '2px solid var(--la-border-secondary)',
          ring: '0 0 0 2px color-mix(in srgb, var(--la-border-primary) 30%, transparent 70%)'
        },
        disabled: {
          background: 'var(--la-bg-tertiary)',
          color: 'var(--la-text-tertiary)',
          border: 'var(--la-border-primary)'
        }
      },
      danger: {
        background: 'var(--la-bg-danger)',
        color: 'var(--la-text-on-dark)',
        border: 'var(--la-bg-danger)',
        hover: {
          background: 'color-mix(in srgb, var(--la-bg-danger) 80%, black 20%)',
          color: 'var(--la-text-on-dark)',
          border: 'color-mix(in srgb, var(--la-bg-danger) 80%, black 20%)'
        },
        active: {
          background: 'color-mix(in srgb, var(--la-bg-danger) 70%, black 30%)',
          color: 'var(--la-text-on-dark)',
          border: 'color-mix(in srgb, var(--la-bg-danger) 70%, black 30%)'
        },
        focus: {
          outline: '2px solid color-mix(in srgb, var(--la-bg-danger) 50%, transparent 50%)',
          ring: '0 0 0 2px color-mix(in srgb, var(--la-bg-danger) 30%, transparent 70%)'
        },
        disabled: {
          background: 'var(--la-bg-tertiary)',
          color: 'var(--la-text-tertiary)',
          border: 'var(--la-border-primary)'
        }
      },
      success: {
        background: 'var(--la-bg-success)',
        color: 'var(--la-text-on-success)',
        border: 'var(--la-bg-success)',
        hover: {
          background: 'color-mix(in srgb, var(--la-bg-success) 80%, black 20%)',
          color: 'var(--la-text-on-success)',
          border: 'color-mix(in srgb, var(--la-bg-success) 80%, black 20%)'
        },
        active: {
          background: 'color-mix(in srgb, var(--la-bg-success) 70%, black 30%)',
          color: 'var(--la-text-on-success)',
          border: 'color-mix(in srgb, var(--la-bg-success) 70%, black 30%)'
        },
        focus: {
          outline: '2px solid color-mix(in srgb, var(--la-bg-success) 50%, transparent 50%)',
          ring: '0 0 0 2px color-mix(in srgb, var(--la-bg-success) 30%, transparent 70%)'
        },
        disabled: {
          background: 'var(--la-bg-tertiary)',
          color: 'var(--la-text-tertiary)',
          border: 'var(--la-border-primary)'
        }
      },
      warning: {
        background: 'var(--la-bg-warning)',
        color: 'var(--la-text-on-dark)',
        border: 'var(--la-bg-warning)',
        hover: {
          background: 'color-mix(in srgb, var(--la-bg-warning) 80%, black 20%)',
          color: 'var(--la-text-on-dark)',
          border: 'color-mix(in srgb, var(--la-bg-warning) 80%, black 20%)'
        },
        active: {
          background: 'color-mix(in srgb, var(--la-bg-warning) 70%, black 30%)',
          color: 'var(--la-text-on-dark)',
          border: 'color-mix(in srgb, var(--la-bg-warning) 70%, black 30%)'
        },
        focus: {
          outline: '2px solid color-mix(in srgb, var(--la-bg-warning) 50%, transparent 50%)',
          ring: '0 0 0 2px color-mix(in srgb, var(--la-bg-warning) 30%, transparent 70%)'
        },
        disabled: {
          background: 'var(--la-bg-tertiary)',
          color: 'var(--la-text-tertiary)',
          border: 'var(--la-border-primary)'
        }
      },
      info: {
        background: 'var(--la-bg-info)',
        color: 'var(--la-text-on-info)',
        border: 'var(--la-bg-info)',
        hover: {
          background: 'color-mix(in srgb, var(--la-bg-info) 80%, black 20%)',
          color: 'var(--la-text-on-info)',
          border: 'color-mix(in srgb, var(--la-bg-info) 80%, black 20%)'
        },
        active: {
          background: 'color-mix(in srgb, var(--la-bg-info) 70%, black 30%)',
          color: 'var(--la-text-on-info)',
          border: 'color-mix(in srgb, var(--la-bg-info) 70%, black 30%)'
        },
        focus: {
          outline: '2px solid color-mix(in srgb, var(--la-bg-info) 50%, transparent 50%)',
          ring: '0 0 0 2px color-mix(in srgb, var(--la-bg-info) 30%, transparent 70%)'
        },
        disabled: {
          background: 'var(--la-bg-tertiary)',
          color: 'var(--la-text-tertiary)',
          border: 'var(--la-border-primary)'
        }
      }
    },
    transitions: {
      default: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      fast: 'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
      slow: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    radius: {
      none: '0',
      sm: '0.25rem',
      md: '0.375rem',
      lg: `${SPACING_SCALE.SM}px`,
      full: '9999px'
    }
  }), []);

  /**
   * Δημιουργεί CSS styles object από button props
   */
  const getButtonStyles = ({
    variant = 'primary',
    size = 'md'
  }: {
    variant?: ButtonVariant;
    size?: ButtonSize;
  }) => {
    const variantTokens = buttonTokens.variants[variant];
    const sizeTokens = buttonTokens.sizes[size];

    return {
      height: sizeTokens.height,
      padding: sizeTokens.padding,
      fontSize: sizeTokens.fontSize,
      backgroundColor: variantTokens.background,
      color: variantTokens.color,
      border: `1px solid ${variantTokens.border}`,
      borderRadius: buttonTokens.radius.md,
      transition: buttonTokens.transitions.default,
      fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: sizeTokens.gap
    };
  };

  /**
   * Δημιουργεί CSS classes string από button props
   */
  const getButtonClasses = ({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    className = ''
  }: {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    loading?: boolean;
    className?: string;
  }) => {
    return [
      'layera-btn',
      `layera-btn--${variant}`,
      `layera-btn--${size}`,
      fullWidth && 'layera-btn--full-width',
      loading && 'layera-btn--loading',
      className
    ].filter(Boolean).join(' ');
  };

  /**
   * Επιστρέφει τα CSS custom properties ως object
   */
  const getCSSCustomProperties = () => {
    const properties: Record<string, string> = {};

    // Size properties
    Object.entries(buttonTokens.sizes).forEach(([size, tokens]) => {
      properties[`--layera-btn-${size}-height`] = tokens.height;
      properties[`--layera-btn-${size}-padding`] = tokens.padding;
      properties[`--layera-btn-${size}-font-size`] = tokens.fontSize;
      properties[`--layera-btn-${size}-icon-size`] = tokens.iconSize;
      properties[`--layera-btn-${size}-gap`] = tokens.gap;
    });

    // Variant properties
    Object.entries(buttonTokens.variants).forEach(([variant, tokens]) => {
      properties[`--layera-btn-${variant}-bg`] = tokens.background;
      properties[`--layera-btn-${variant}-color`] = tokens.color;
      properties[`--layera-btn-${variant}-border`] = tokens.border;
      properties[`--layera-btn-${variant}-hover-bg`] = tokens.hover.background;
      properties[`--layera-btn-${variant}-hover-color`] = tokens.hover.color;
      properties[`--layera-btn-${variant}-hover-border`] = tokens.hover.border;
      properties[`--layera-btn-${variant}-active-bg`] = tokens.active.background;
      properties[`--layera-btn-${variant}-active-color`] = tokens.active.color;
      properties[`--layera-btn-${variant}-active-border`] = tokens.active.border;
      properties[`--layera-btn-${variant}-focus-outline`] = tokens.focus.outline;
      properties[`--layera-btn-${variant}-focus-ring`] = tokens.focus.ring;
    });

    // Transition properties
    Object.entries(buttonTokens.transitions).forEach(([key, value]) => {
      properties[`--layera-btn-transition-${key}`] = value;
    });

    // Radius properties
    Object.entries(buttonTokens.radius).forEach(([key, value]) => {
      properties[`--layera-btn-radius-${key}`] = value;
    });

    return properties;
  };

  return {
    tokens: buttonTokens,
    getButtonStyles,
    getButtonClasses,
    getCSSCustomProperties
  };
};

export default useButton;