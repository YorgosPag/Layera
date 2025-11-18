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
        height: 'var(--layera-global-button-height-xs)',
        padding: `var(--layera-global-spacing-2) var(--layera-global-spacing-3)`,
        fontSize: 'var(--layera-fontSize-xs)',
        iconSize: 'var(--layera-iconSize-sm)',
        gap: 'var(--layera-global-spacing-1-5)'
      },
      sm: {
        height: 'var(--layera-global-button-height-sm)',
        padding: `var(--layera-global-spacing-2) var(--layera-global-spacing-4)`,
        fontSize: 'var(--layera-fontSize-sm)',
        iconSize: 'var(--layera-iconSize-base)',
        gap: `var(--layera-global-spacing-2)`
      },
      md: {
        height: 'var(--layera-global-button-height-md)',
        padding: `var(--layera-global-spacing-4) var(--layera-global-spacing-5)`,
        fontSize: 'var(--layera-fontSize-base)',
        iconSize: 'var(--layera-iconSize-lg)',
        gap: `var(--layera-global-spacing-2)`
      },
      lg: {
        height: 'var(--layera-global-button-height-lg)',
        padding: `var(--layera-global-spacing-3) var(--layera-global-spacing-6)`,
        fontSize: 'var(--layera-fontSize-lg)',
        iconSize: 'var(--layera-iconSize-xl)',
        gap: `var(--layera-global-spacing-2)`
      },
      xl: {
        height: 'var(--layera-global-button-height-xl)',
        padding: `var(--layera-global-spacing-4) var(--layera-global-spacing-12)`,
        fontSize: 'var(--layera-fontSize-xl)',
        iconSize: 'var(--layera-iconSize-2xl)',
        gap: 'var(--layera-global-spacing-3)'
      }
    },
    variants: {
      primary: {
        background: 'var(--layera-colorUtilities-utilities-background-semantic-info)',
        color: 'var(--layera-text-on-info)',
        border: 'var(--layera-colorUtilities-utilities-background-semantic-info)',
        hover: {
          background: 'color-mix(in srgb, var(--layera-colorUtilities-utilities-background-semantic-info) 80%, black 20%)',
          color: 'var(--layera-text-on-info)',
          border: 'color-mix(in srgb, var(--layera-colorUtilities-utilities-background-semantic-info) 80%, black 20%)'
        },
        active: {
          background: 'color-mix(in srgb, var(--layera-colorUtilities-utilities-background-semantic-info) 70%, black 30%)',
          color: 'var(--layera-text-on-info)',
          border: 'color-mix(in srgb, var(--layera-colorUtilities-utilities-background-semantic-info) 70%, black 30%)'
        },
        focus: {
          outline: 'var(--layera-iconInteractive-accessibility-focusRing-width) solid color-mix(in srgb, var(--layera-colorUtilities-utilities-background-semantic-info) 50%, transparent 50%)',
          ring: '0 0 0 var(--layera-iconInteractive-accessibility-focusRing-width) color-mix(in srgb, var(--layera-colorUtilities-utilities-background-semantic-info) 30%, transparent 70%)'
        },
        disabled: {
          background: 'var(--layera-colorUtilities-utilities-background-tertiary)',
          color: 'var(--layera-colorUtilities-utilities-text-tertiary)',
          border: 'var(--layera-colorUtilities-utilities-border-primary)'
        }
      },
      secondary: {
        background: 'var(--layera-colorUtilities-utilities-text-secondary)',
        color: 'var(--layera-colorUtilities-utilities-text-inverted)',
        border: 'var(--layera-colorUtilities-utilities-text-secondary)',
        hover: {
          background: 'color-mix(in srgb, var(--layera-colorUtilities-utilities-text-secondary) 80%, black 20%)',
          color: 'var(--layera-colorUtilities-utilities-text-inverted)',
          border: 'color-mix(in srgb, var(--layera-colorUtilities-utilities-text-secondary) 80%, black 20%)'
        },
        active: {
          background: 'color-mix(in srgb, var(--layera-colorUtilities-utilities-text-secondary) 70%, black 30%)',
          color: 'var(--layera-colorUtilities-utilities-text-inverted)',
          border: 'color-mix(in srgb, var(--layera-colorUtilities-utilities-text-secondary) 70%, black 30%)'
        },
        focus: {
          outline: 'var(--layera-iconInteractive-accessibility-focusRing-width) solid color-mix(in srgb, var(--layera-colorUtilities-utilities-text-secondary) 50%, transparent 50%)',
          ring: '0 0 0 var(--layera-iconInteractive-accessibility-focusRing-width) color-mix(in srgb, var(--layera-colorUtilities-utilities-text-secondary) 30%, transparent 70%)'
        },
        disabled: {
          background: 'var(--layera-colorUtilities-utilities-background-tertiary)',
          color: 'var(--layera-colorUtilities-utilities-text-tertiary)',
          border: 'var(--layera-colorUtilities-utilities-border-primary)'
        }
      },
      outline: {
        background: 'transparent',
        color: 'var(--layera-colorUtilities-utilities-background-semantic-info)',
        border: 'var(--layera-colorUtilities-utilities-background-semantic-info)',
        hover: {
          background: 'var(--layera-colorUtilities-utilities-background-semantic-info)',
          color: 'var(--layera-text-on-info)',
          border: 'var(--layera-colorUtilities-utilities-background-semantic-info)'
        },
        active: {
          background: 'color-mix(in srgb, var(--layera-colorUtilities-utilities-background-semantic-info) 70%, black 30%)',
          color: 'var(--layera-text-on-info)',
          border: 'color-mix(in srgb, var(--layera-colorUtilities-utilities-background-semantic-info) 70%, black 30%)'
        },
        focus: {
          outline: 'var(--layera-iconInteractive-accessibility-focusRing-width) solid color-mix(in srgb, var(--layera-colorUtilities-utilities-background-semantic-info) 50%, transparent 50%)',
          ring: '0 0 0 var(--layera-iconInteractive-accessibility-focusRing-width) color-mix(in srgb, var(--layera-colorUtilities-utilities-background-semantic-info) 30%, transparent 70%)'
        },
        disabled: {
          background: 'var(--layera-colorUtilities-utilities-background-tertiary)',
          color: 'var(--layera-colorUtilities-utilities-text-tertiary)',
          border: 'var(--layera-colorUtilities-utilities-border-primary)'
        }
      },
      ghost: {
        background: 'transparent',
        color: 'var(--layera-colorUtilities-utilities-text-primary)',
        border: 'transparent',
        hover: {
          background: 'var(--layera-colorUtilities-utilities-background-tertiary)',
          color: 'var(--layera-colorUtilities-utilities-text-primary)',
          border: 'transparent'
        },
        active: {
          background: 'var(--layera-colorUtilities-utilities-background-secondary)',
          color: 'var(--layera-colorUtilities-utilities-text-primary)',
          border: 'transparent'
        },
        focus: {
          outline: 'var(--layera-iconInteractive-accessibility-focusRing-width) solid var(--layera-colorUtilities-utilities-border-secondary)',
          ring: '0 0 0 var(--layera-iconInteractive-accessibility-focusRing-width) color-mix(in srgb, var(--layera-colorUtilities-utilities-border-primary) 30%, transparent 70%)'
        },
        disabled: {
          background: 'var(--layera-colorUtilities-utilities-background-tertiary)',
          color: 'var(--layera-colorUtilities-utilities-text-tertiary)',
          border: 'var(--layera-colorUtilities-utilities-border-primary)'
        }
      },
      danger: {
        background: 'var(--layera-colorUtilities-utilities-background-semantic-error)',
        color: 'var(--layera-colorUtilities-utilities-text-inverted)',
        border: 'var(--layera-colorUtilities-utilities-background-semantic-error)',
        hover: {
          background: 'color-mix(in srgb, var(--layera-colorUtilities-utilities-background-semantic-error) 80%, black 20%)',
          color: 'var(--layera-colorUtilities-utilities-text-inverted)',
          border: 'color-mix(in srgb, var(--layera-colorUtilities-utilities-background-semantic-error) 80%, black 20%)'
        },
        active: {
          background: 'color-mix(in srgb, var(--layera-colorUtilities-utilities-background-semantic-error) 70%, black 30%)',
          color: 'var(--layera-colorUtilities-utilities-text-inverted)',
          border: 'color-mix(in srgb, var(--layera-colorUtilities-utilities-background-semantic-error) 70%, black 30%)'
        },
        focus: {
          outline: 'var(--layera-iconInteractive-accessibility-focusRing-width) solid color-mix(in srgb, var(--layera-colorUtilities-utilities-background-semantic-error) 50%, transparent 50%)',
          ring: '0 0 0 var(--layera-iconInteractive-accessibility-focusRing-width) color-mix(in srgb, var(--layera-colorUtilities-utilities-background-semantic-error) 30%, transparent 70%)'
        },
        disabled: {
          background: 'var(--layera-colorUtilities-utilities-background-tertiary)',
          color: 'var(--layera-colorUtilities-utilities-text-tertiary)',
          border: 'var(--layera-colorUtilities-utilities-border-primary)'
        }
      },
      success: {
        background: 'var(--layera-colorUtilities-utilities-background-semantic-success)',
        color: 'var(--layera-text-on-success)',
        border: 'var(--layera-colorUtilities-utilities-background-semantic-success)',
        hover: {
          background: 'color-mix(in srgb, var(--layera-colorUtilities-utilities-background-semantic-success) 80%, black 20%)',
          color: 'var(--layera-text-on-success)',
          border: 'color-mix(in srgb, var(--layera-colorUtilities-utilities-background-semantic-success) 80%, black 20%)'
        },
        active: {
          background: 'color-mix(in srgb, var(--layera-colorUtilities-utilities-background-semantic-success) 70%, black 30%)',
          color: 'var(--layera-text-on-success)',
          border: 'color-mix(in srgb, var(--layera-colorUtilities-utilities-background-semantic-success) 70%, black 30%)'
        },
        focus: {
          outline: 'var(--layera-iconInteractive-accessibility-focusRing-width) solid color-mix(in srgb, var(--layera-colorUtilities-utilities-background-semantic-success) 50%, transparent 50%)',
          ring: '0 0 0 var(--layera-iconInteractive-accessibility-focusRing-width) color-mix(in srgb, var(--layera-colorUtilities-utilities-background-semantic-success) 30%, transparent 70%)'
        },
        disabled: {
          background: 'var(--layera-colorUtilities-utilities-background-tertiary)',
          color: 'var(--layera-colorUtilities-utilities-text-tertiary)',
          border: 'var(--layera-colorUtilities-utilities-border-primary)'
        }
      },
      warning: {
        background: 'var(--layera-colorUtilities-utilities-background-semantic-warning)',
        color: 'var(--layera-colorUtilities-utilities-text-inverted)',
        border: 'var(--layera-colorUtilities-utilities-background-semantic-warning)',
        hover: {
          background: 'color-mix(in srgb, var(--layera-colorUtilities-utilities-background-semantic-warning) 80%, black 20%)',
          color: 'var(--layera-colorUtilities-utilities-text-inverted)',
          border: 'color-mix(in srgb, var(--layera-colorUtilities-utilities-background-semantic-warning) 80%, black 20%)'
        },
        active: {
          background: 'color-mix(in srgb, var(--layera-colorUtilities-utilities-background-semantic-warning) 70%, black 30%)',
          color: 'var(--layera-colorUtilities-utilities-text-inverted)',
          border: 'color-mix(in srgb, var(--layera-colorUtilities-utilities-background-semantic-warning) 70%, black 30%)'
        },
        focus: {
          outline: 'var(--layera-iconInteractive-accessibility-focusRing-width) solid color-mix(in srgb, var(--layera-colorUtilities-utilities-background-semantic-warning) 50%, transparent 50%)',
          ring: '0 0 0 var(--layera-iconInteractive-accessibility-focusRing-width) color-mix(in srgb, var(--layera-colorUtilities-utilities-background-semantic-warning) 30%, transparent 70%)'
        },
        disabled: {
          background: 'var(--layera-colorUtilities-utilities-background-tertiary)',
          color: 'var(--layera-colorUtilities-utilities-text-tertiary)',
          border: 'var(--layera-colorUtilities-utilities-border-primary)'
        }
      },
      info: {
        background: 'var(--layera-colorUtilities-utilities-background-semantic-info)',
        color: 'var(--layera-text-on-info)',
        border: 'var(--layera-colorUtilities-utilities-background-semantic-info)',
        hover: {
          background: 'color-mix(in srgb, var(--layera-colorUtilities-utilities-background-semantic-info) 80%, black 20%)',
          color: 'var(--layera-text-on-info)',
          border: 'color-mix(in srgb, var(--layera-colorUtilities-utilities-background-semantic-info) 80%, black 20%)'
        },
        active: {
          background: 'color-mix(in srgb, var(--layera-colorUtilities-utilities-background-semantic-info) 70%, black 30%)',
          color: 'var(--layera-text-on-info)',
          border: 'color-mix(in srgb, var(--layera-colorUtilities-utilities-background-semantic-info) 70%, black 30%)'
        },
        focus: {
          outline: 'var(--layera-iconInteractive-accessibility-focusRing-width) solid color-mix(in srgb, var(--layera-colorUtilities-utilities-background-semantic-info) 50%, transparent 50%)',
          ring: '0 0 0 var(--layera-iconInteractive-accessibility-focusRing-width) color-mix(in srgb, var(--layera-colorUtilities-utilities-background-semantic-info) 30%, transparent 70%)'
        },
        disabled: {
          background: 'var(--layera-colorUtilities-utilities-background-tertiary)',
          color: 'var(--layera-colorUtilities-utilities-text-tertiary)',
          border: 'var(--layera-colorUtilities-utilities-border-primary)'
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
      sm: 'var(--layera-global-borderRadius-sm)',
      md: 'var(--layera-global-borderRadius-md)',
      lg: `var(--layera-global-spacing-2)`,
      full: 'var(--layera-radius-pill)'
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
      border: `var(--layera-global-borderWidth-1) solid ${variantTokens.border}`,
      borderRadius: buttonTokens.radius.md,
      transition: buttonTokens.transitions.default,
      fontFamily: 'var(--layera-fontFamily-primary)',
      fontWeight: 'var(--layera-fontWeight-medium)',
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