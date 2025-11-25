/**
 * 🃏 CARD COMPONENT TOKENS
 *
 * Συγκεντρώνει όλα τα card-related tokens από το FullAppPreview_Mockup.html:
 * - Card Height: 80-200px (default: 120px)
 * - Card Border Radius: 0-32px (default: 8px)
 * - Card Colors: 6-color system με background + border variants
 * - Card Shadow levels
 *
 * Component targeting support για setTargetComponent('cards')
 */

import { type LayeraColorType } from '../core/colors';

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎯 CARD TOKEN DEFINITIONS - Unified card system από HTML mockup
// ═══════════════════════════════════════════════════════════════════════════════════════

export const LAYERA_CARD_TOKENS = {
  // Card variants που αντιστοιχούν στα HTML mockup classes (.card-primary, .card-secondary, etc.)
  variants: {
    primary: {
      backgroundColor: '#E3F2FD',  // Light blue background
      borderColor: 'var(--live-primary-color)',
      textColor: '#1565C0'
    },

    secondary: {
      backgroundColor: '#F3E5F5',  // Light purple background
      borderColor: 'var(--live-secondary-color)',
      textColor: '#4A148C'
    },

    success: {
      backgroundColor: '#E8F5E8',  // Light green background
      borderColor: 'var(--live-success-color)',
      textColor: '#2E7D32'
    },

    warning: {
      backgroundColor: '#FFF3E0',  // Light orange background
      borderColor: 'var(--live-warning-color)',
      textColor: '#E65100'
    },

    danger: {
      backgroundColor: '#FFEBEE',  // Light red background
      borderColor: 'var(--live-danger-color)',
      textColor: '#C62828'
    },

    info: {
      backgroundColor: '#E1F5FE',  // Light cyan background
      borderColor: 'var(--live-info-color)',
      textColor: '#0D47A1'
    }
  },

  // Card sizing που χρησιμοποιούν τα HTML mockup controls
  sizing: {
    height: 'var(--live-card-height)',              // data-control="card-height"
    borderRadius: 'var(--live-cards-border-radius)', // data-control="cards-border-radius"
    borderWidth: 'var(--live-border-width)',        // data-control="border-width"
    padding: 'var(--live-padding)'                  // data-control="padding"
  },

  // Card shadow levels από HTML mockup select
  shadow: {
    none: 'none',
    small: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    medium: '0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12)',
    large: '0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.10)'
  },

  // Card states
  states: {
    default: {
      transform: 'scale(1)',
      transition: 'all 0.2s ease'
    },
    hover: {
      transform: 'scale(1.02)',
      transition: 'all 0.2s ease',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)'
    },
    active: {
      transform: 'scale(0.98)',
      transition: 'all 0.1s ease'
    }
  }
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🔄 CARD LIVE VARIABLES - CSS Custom Properties collection
// ═══════════════════════════════════════════════════════════════════════════════════════

export const LAYERA_CARD_LIVE_VARS = {
  // Card-specific live variables που συνδυάζουν όλα τα controls
  '--layera-card-background-primary': '#E3F2FD',
  '--layera-card-background-secondary': '#F3E5F5',
  '--layera-card-background-success': '#E8F5E8',
  '--layera-card-background-warning': '#FFF3E0',
  '--layera-card-background-danger': '#FFEBEE',
  '--layera-card-background-info': '#E1F5FE',

  '--layera-card-border-primary': 'var(--live-primary-color)',
  '--layera-card-border-secondary': 'var(--live-secondary-color)',
  '--layera-card-border-success': 'var(--live-success-color)',
  '--layera-card-border-warning': 'var(--live-warning-color)',
  '--layera-card-border-danger': 'var(--live-danger-color)',
  '--layera-card-border-info': 'var(--live-info-color)',

  '--layera-card-height': 'var(--live-card-height)',
  '--layera-card-border-radius': 'var(--live-cards-border-radius)',
  '--layera-card-border-width': 'var(--live-border-width)',
  '--layera-card-padding': 'var(--live-padding)',
  '--layera-card-shadow': 'var(--layera-shadow-small)'
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎯 CARD UTILITIES - Helper functions για component integration
// ═══════════════════════════════════════════════════════════════════════════════════════

export type LayeraCardVariant = keyof typeof LAYERA_CARD_TOKENS.variants;
export type LayeraCardShadow = keyof typeof LAYERA_CARD_TOKENS.shadow;
export type LayeraCardState = keyof typeof LAYERA_CARD_TOKENS.states;

/**
 * Δημιουργεί CSS object για card variant
 */
export function getCardVariantCSS(variant: LayeraCardVariant): Record<string, string> {
  const variantTokens = LAYERA_CARD_TOKENS.variants[variant];
  const sizing = LAYERA_CARD_TOKENS.sizing;

  return {
    backgroundColor: variantTokens.backgroundColor,
    borderColor: variantTokens.borderColor,
    color: variantTokens.textColor,
    height: sizing.height,
    borderRadius: sizing.borderRadius,
    borderWidth: sizing.borderWidth,
    borderStyle: 'solid',
    padding: sizing.padding,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };
}

/**
 * Παίρνει shadow CSS για card
 */
export function getCardShadowCSS(shadow: LayeraCardShadow): string {
  return LAYERA_CARD_TOKENS.shadow[shadow];
}

/**
 * Παίρνει CSS για card state (hover, active, etc.)
 */
export function getCardStateCSS(state: LayeraCardState): Record<string, string | number> {
  return LAYERA_CARD_TOKENS.states[state];
}

/**
 * Δημιουργεί πλήρες CSS για card component
 */
export function getFullCardCSS(
  variant: LayeraCardVariant,
  shadow: LayeraCardShadow = 'small',
  state: LayeraCardState = 'default'
): Record<string, string | number> {
  return {
    ...getCardVariantCSS(variant),
    boxShadow: getCardShadowCSS(shadow),
    ...getCardStateCSS(state)
  };
}

/**
 * Παίρνει όλα τα available card variants
 */
export function getCardVariants(): LayeraCardVariant[] {
  return Object.keys(LAYERA_CARD_TOKENS.variants) as LayeraCardVariant[];
}