/**
 * 🔘 BUTTON COMPONENT TOKENS
 *
 * Συγκεντρώνει όλα τα button-related tokens από το FullAppPreview_Mockup.html:
 * - Button Height: 24-56px (default: 36px)
 * - Button Padding: 8-32px (default: 16px)
 * - Button Font Size: 10-20px (default: 14px)
 * - Button Border Radius: 0-32px (default: 6px)
 * - Button Colors: 6-color system με live theming
 *
 * Component targeting support για setTargetComponent('buttons')
 */

import {
  getLiveColorVar,
  type LayeraColorType
} from '../core/colors';
import {
  getLiveSpacingVar
} from '../core/spacing';
import {
  getLiveBorderRadiusVar
} from '../core/borders';
import {
  getLiveDimensionVar
} from '../core/dimensions';
import {
  getLiveTypographyVar
} from '../core/typography';

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎯 BUTTON TOKEN DEFINITIONS - Unified button system
// ═══════════════════════════════════════════════════════════════════════════════════════

export const LAYERA_BUTTON_TOKENS = {
  // Button variants που αντιστοιχούν στα HTML mockup classes (.primary-btn, .secondary-btn, etc.)
  variants: {
    primary: {
      background: 'var(--live-primary-color)',
      color: '#FFFFFF',
      borderColor: 'var(--live-primary-color)',
      hoverBackground: 'var(--live-primary-color)',
      hoverOpacity: 0.9
    },

    secondary: {
      background: 'var(--live-secondary-color)',
      color: '#FFFFFF',
      borderColor: 'var(--live-secondary-color)',
      hoverBackground: 'var(--live-secondary-color)',
      hoverOpacity: 0.9
    },

    success: {
      background: 'var(--live-success-color)',
      color: '#FFFFFF',
      borderColor: 'var(--live-success-color)',
      hoverBackground: 'var(--live-success-color)',
      hoverOpacity: 0.9
    },

    warning: {
      background: 'var(--live-warning-color)',
      color: '#000000',
      borderColor: 'var(--live-warning-color)',
      hoverBackground: 'var(--live-warning-color)',
      hoverOpacity: 0.9
    },

    danger: {
      background: 'var(--live-danger-color)',
      color: '#FFFFFF',
      borderColor: 'var(--live-danger-color)',
      hoverBackground: 'var(--live-danger-color)',
      hoverOpacity: 0.9
    },

    info: {
      background: 'var(--live-info-color)',
      color: '#FFFFFF',
      borderColor: 'var(--live-info-color)',
      hoverBackground: 'var(--live-info-color)',
      hoverOpacity: 0.9
    }
  },

  // Button sizing που χρησιμοποιούν τα HTML mockup controls
  sizing: {
    height: 'var(--live-button-height)',        // data-control="button-height"
    padding: 'var(--live-button-padding)',      // data-control="button-padding"
    fontSize: 'var(--live-button-font-size)',   // data-control="button-font-size"
    borderRadius: 'var(--live-buttons-border-radius)' // data-control="buttons-border-radius"
  },

  // Button state styles
  states: {
    default: {
      opacity: 1,
      transform: 'scale(1)',
      transition: 'all 0.2s ease'
    },
    hover: {
      opacity: 0.9,
      transform: 'scale(1.02)',
      transition: 'all 0.2s ease'
    },
    active: {
      opacity: 0.8,
      transform: 'scale(0.98)',
      transition: 'all 0.1s ease'
    },
    disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
      transform: 'scale(1)'
    }
  }
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🔄 BUTTON LIVE VARIABLES - CSS Custom Properties collection
// ═══════════════════════════════════════════════════════════════════════════════════════

export const LAYERA_BUTTON_LIVE_VARS = {
  // Button-specific live variables που συνδυάζουν όλα τα controls
  '--layera-button-background-primary': 'var(--live-primary-color)',
  '--layera-button-background-secondary': 'var(--live-secondary-color)',
  '--layera-button-background-success': 'var(--live-success-color)',
  '--layera-button-background-warning': 'var(--live-warning-color)',
  '--layera-button-background-danger': 'var(--live-danger-color)',
  '--layera-button-background-info': 'var(--live-info-color)',

  '--layera-button-height': 'var(--live-button-height)',
  '--layera-button-padding': 'var(--live-button-padding)',
  '--layera-button-font-size': 'var(--live-button-font-size)',
  '--layera-button-border-radius': 'var(--live-buttons-border-radius)',
  '--layera-button-border-width': 'var(--live-border-width)'
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎯 BUTTON UTILITIES - Helper functions για component integration
// ═══════════════════════════════════════════════════════════════════════════════════════

export type LayeraButtonVariant = keyof typeof LAYERA_BUTTON_TOKENS.variants;
export type LayeraButtonState = keyof typeof LAYERA_BUTTON_TOKENS.states;

/**
 * Δημιουργεί CSS object για button variant
 */
export function getButtonVariantCSS(variant: LayeraButtonVariant): Record<string, string> {
  const variantTokens = LAYERA_BUTTON_TOKENS.variants[variant];
  const sizing = LAYERA_BUTTON_TOKENS.sizing;

  return {
    backgroundColor: variantTokens.background,
    color: variantTokens.color,
    borderColor: variantTokens.borderColor,
    height: sizing.height,
    padding: `0 ${sizing.padding}`,
    fontSize: sizing.fontSize,
    borderRadius: sizing.borderRadius,
    borderWidth: 'var(--live-border-width)',
    borderStyle: 'solid',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '500',
    transition: 'all 0.2s ease'
  };
}

/**
 * Παίρνει CSS για button state (hover, active, etc.)
 */
export function getButtonStateCSS(state: LayeraButtonState): Record<string, string | number> {
  return LAYERA_BUTTON_TOKENS.states[state];
}

/**
 * Δημιουργεί πλήρες CSS για button component
 */
export function getFullButtonCSS(variant: LayeraButtonVariant, state: LayeraButtonState = 'default'): Record<string, string | number> {
  return {
    ...getButtonVariantCSS(variant),
    ...getButtonStateCSS(state)
  };
}

/**
 * Παίρνει όλα τα available button variants
 */
export function getButtonVariants(): LayeraButtonVariant[] {
  return Object.keys(LAYERA_BUTTON_TOKENS.variants) as LayeraButtonVariant[];
}