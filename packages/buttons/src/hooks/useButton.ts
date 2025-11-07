import { useMemo } from 'react';
import { ButtonSize, ButtonVariant, ButtonTokens } from '../types';
import { SPACING_SCALE } from '@layera/constants';

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
        padding: 'var(--la-space-2) 0.75rem', // 🎯 SST: SM spacing
        fontSize: '0.75rem',
        iconSize: '0.875rem',
        gap: '0.375rem'
      },
      sm: {
        height: '2.25rem',
        padding: 'var(--la-space-2) 1rem', // 🎯 SST: SM spacing
        fontSize: '0.875rem',
        iconSize: '1rem',
        gap: 'var(--la-space-2)' // 🎯 SST: SM spacing
      },
      md: {
        height: '2.75rem',
        padding: 'var(--la-space-4) 1.25rem', // 🎯 SST: MD spacing
        fontSize: '1rem',
        iconSize: '1.125rem',
        gap: 'var(--la-space-2)' // 🎯 SST: SM spacing
      },
      lg: {
        height: '3rem',
        padding: 'var(--la-space-md-minus-xs-half-xl-minus-sm-padding)', // 🎯 SST: Complex button padding
        fontSize: '1.125rem',
        iconSize: '1.25rem',
        gap: 'var(--la-space-2)' // 🎯 SST: SM spacing
      },
      xl: {
        height: '3.5rem',
        padding: 'var(--la-button-padding-xl)', // 🎯 SST: Button padding token
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
      },
      elevated: {
        background: 'var(--la-color-surface)',
        color: 'var(--la-text-primary)',
        border: 'var(--la-border-primary)',
        hover: {
          background: 'var(--la-color-surface-hover)',
          color: 'var(--la-text-primary)',
          border: 'var(--la-border-primary)'
        },
        active: {
          background: 'var(--la-color-surface-active)',
          color: 'var(--la-text-primary)',
          border: 'var(--la-border-strong)'
        },
        focus: {
          outline: 'var(--la-border-width-xs) solid var(--la-bg-primary)',
          ring: '0 0 0 var(--la-border-width-xs) var(--la-color-focus-ring)'
        },
        disabled: {
          background: 'var(--la-bg-tertiary)',
          color: 'var(--la-text-tertiary)',
          border: 'var(--la-border-primary)'
        }
      },
      neumorphic: {
        background: 'var(--la-color-surface-secondary)',
        color: 'var(--la-text-primary)',
        border: 'none',
        hover: {
          background: 'var(--la-color-surface-secondary)',
          color: 'var(--la-text-primary)',
          border: 'none'
        },
        active: {
          background: 'var(--la-color-surface-secondary)',
          color: 'var(--la-text-primary)',
          border: 'none'
        },
        focus: {
          outline: 'var(--la-border-width-xs) solid var(--la-bg-primary)',
          ring: '0 0 0 var(--la-border-width-xs) var(--la-color-focus-ring)'
        },
        disabled: {
          background: 'var(--la-bg-tertiary)',
          color: 'var(--la-text-tertiary)',
          border: 'var(--la-border-primary)'
        }
      },
      gradient: {
        background: 'var(--la-color-gradient-primary)',
        color: 'var(--la-color-white)',
        border: 'none',
        hover: {
          background: 'var(--la-color-gradient-primary-hover)',
          color: 'var(--la-color-white)',
          border: 'none'
        },
        active: {
          background: 'var(--la-color-gradient-primary-active)',
          color: 'var(--la-color-white)',
          border: 'none'
        },
        focus: {
          outline: 'var(--la-border-width-xs) solid var(--la-color-focus)',
          ring: '0 0 0 var(--la-border-width-xs) var(--la-color-focus-ring)'
        },
        disabled: {
          background: 'var(--la-bg-tertiary)',
          color: 'var(--la-text-tertiary)',
          border: 'var(--la-border-primary)'
        }
      },
      flat: {
        background: 'var(--la-bg-info)',
        color: 'var(--la-text-on-info)',
        border: 'none',
        hover: {
          background: 'color-mix(in srgb, var(--la-bg-info) 90%, black 10%)',
          color: 'var(--la-text-on-info)',
          border: 'none'
        },
        active: {
          background: 'color-mix(in srgb, var(--la-bg-info) 80%, black 20%)',
          color: 'var(--la-text-on-info)',
          border: 'none'
        },
        focus: {
          outline: 'inset 0 0 0 2px var(--la-bg-primary)',
          ring: 'none'
        },
        disabled: {
          background: 'var(--la-bg-tertiary)',
          color: 'var(--la-text-tertiary)',
          border: 'var(--la-border-primary)'
        }
      },
      soft: {
        background: 'var(--la-color-info-soft)',
        color: 'var(--la-bg-info)',
        border: 'none',
        hover: {
          background: 'var(--la-color-info-soft-hover)',
          color: 'var(--la-color-info-dark)',
          border: 'none'
        },
        active: {
          background: 'var(--la-color-info-soft-active)',
          color: 'var(--la-color-info-darker)',
          border: 'none'
        },
        focus: {
          outline: 'var(--la-border-width-xs) solid var(--la-bg-info)',
          ring: '0 0 0 var(--la-border-width-xs) var(--la-color-focus-ring)'
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
      lg: 'var(--la-space-2)', // 🎯 SST: SM spacing
      full: 'var(--la-radius-full)'
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
  const getCSSCustomProperties = (): Record<string, string> => {
    const properties: Record<string, string> = {};

    // Size properties
    Object.entries(buttonTokens.sizes).forEach(([size, tokens]) => {
      properties[`--la-btn-${size}-height`] = tokens.height;
      properties[`--la-btn-${size}-padding`] = tokens.padding;
      properties[`--la-btn-${size}-font-size`] = tokens.fontSize;
      properties[`--la-btn-${size}-icon-size`] = tokens.iconSize;
      properties[`--la-btn-${size}-gap`] = tokens.gap;
    });

    // Variant properties
    Object.entries(buttonTokens.variants).forEach(([variant, tokens]) => {
      properties[`--la-btn-${variant}-bg`] = tokens.background;
      properties[`--la-btn-${variant}-color`] = tokens.color;
      properties[`--la-btn-${variant}-border`] = tokens.border;
      properties[`--la-btn-${variant}-hover-bg`] = tokens.hover.background;
      properties[`--la-btn-${variant}-hover-color`] = tokens.hover.color;
      properties[`--la-btn-${variant}-hover-border`] = tokens.hover.border;
      properties[`--la-btn-${variant}-active-bg`] = tokens.active.background;
      properties[`--la-btn-${variant}-active-color`] = tokens.active.color;
      properties[`--la-btn-${variant}-active-border`] = tokens.active.border;
      properties[`--la-btn-${variant}-focus-outline`] = tokens.focus.outline;
      properties[`--la-btn-${variant}-focus-ring`] = tokens.focus.ring;
    });

    // Transition properties
    Object.entries(buttonTokens.transitions).forEach(([key, value]) => {
      properties[`--la-btn-transition-${key}`] = value;
    });

    // Radius properties
    Object.entries(buttonTokens.radius).forEach(([key, value]) => {
      properties[`--la-btn-radius-${key}`] = value;
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