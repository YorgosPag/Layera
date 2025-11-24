/**
 * 🪟 MODAL COMPONENT TOKENS
 *
 * Συγκεντρώνει όλα τα modal-related tokens από το FullAppPreview_Mockup.html:
 * - Modal Width: 300-600px (default: 400px)
 * - Modal Border Radius: 0-32px (default: 12px)
 * - Modal Colors: 6-color system με border-left accent
 *
 * Component targeting support για setTargetComponent('modals')
 */

import { type LayeraColorType } from '../core/colors';

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎯 MODAL TOKEN DEFINITIONS - Unified modal system από HTML mockup
// ═══════════════════════════════════════════════════════════════════════════════════════

export const LAYERA_MODAL_TOKENS = {
  // Modal variants που αντιστοιχούν στα HTML mockup classes (.modal-primary, .modal-secondary, etc.)
  variants: {
    primary: {
      borderLeftColor: 'var(--live-primary-color)',
      backgroundColor: '#FFFFFF',
      textColor: '#333333'
    },

    secondary: {
      borderLeftColor: 'var(--live-secondary-color)',
      backgroundColor: '#FFFFFF',
      textColor: '#333333'
    },

    success: {
      borderLeftColor: 'var(--live-success-color)',
      backgroundColor: '#FFFFFF',
      textColor: '#333333'
    },

    warning: {
      borderLeftColor: 'var(--live-warning-color)',
      backgroundColor: '#FFFFFF',
      textColor: '#333333'
    },

    danger: {
      borderLeftColor: 'var(--live-danger-color)',
      backgroundColor: '#FFFFFF',
      textColor: '#333333'
    },

    info: {
      borderLeftColor: 'var(--live-info-color)',
      backgroundColor: '#FFFFFF',
      textColor: '#333333'
    }
  },

  // Modal sizing που χρησιμοποιούν τα HTML mockup controls
  sizing: {
    width: 'var(--live-modal-width)',                // data-control="modal-width"
    borderRadius: 'var(--live-modals-border-radius)', // data-control="modals-border-radius"
    borderLeftWidth: '4px',                          // Accent border
    padding: 'var(--live-padding)',                  // data-control="padding"
    minHeight: '200px',
    maxHeight: '80vh'
  },

  // Modal overlay και backdrop
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(4px)',
    zIndex: 1000
  },

  // Modal states
  states: {
    default: {
      transform: 'scale(1)',
      opacity: 1,
      transition: 'all 0.2s ease'
    },
    entering: {
      transform: 'scale(0.95)',
      opacity: 0,
      transition: 'all 0.2s ease'
    },
    exiting: {
      transform: 'scale(0.95)',
      opacity: 0,
      transition: 'all 0.2s ease'
    }
  }
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🔄 MODAL LIVE VARIABLES - CSS Custom Properties collection
// ═══════════════════════════════════════════════════════════════════════════════════════

export const LAYERA_MODAL_LIVE_VARS = {
  // Modal-specific live variables που συνδυάζουν όλα τα controls
  '--layera-modal-border-left-primary': 'var(--live-primary-color)',
  '--layera-modal-border-left-secondary': 'var(--live-secondary-color)',
  '--layera-modal-border-left-success': 'var(--live-success-color)',
  '--layera-modal-border-left-warning': 'var(--live-warning-color)',
  '--layera-modal-border-left-danger': 'var(--live-danger-color)',
  '--layera-modal-border-left-info': 'var(--live-info-color)',

  '--layera-modal-width': 'var(--live-modal-width)',
  '--layera-modal-border-radius': 'var(--live-modals-border-radius)',
  '--layera-modal-padding': 'var(--live-padding)',
  '--layera-modal-background': '#FFFFFF',
  '--layera-modal-text-color': '#333333',
  '--layera-modal-overlay-background': 'rgba(0, 0, 0, 0.5)'
} as const;

export type LayeraModalVariant = keyof typeof LAYERA_MODAL_TOKENS.variants;
export type LayeraModalState = keyof typeof LAYERA_MODAL_TOKENS.states;

/**
 * Δημιουργεί CSS object για modal variant
 */
export function getModalVariantCSS(variant: LayeraModalVariant): Record<string, string> {
  const variantTokens = LAYERA_MODAL_TOKENS.variants[variant];
  const sizing = LAYERA_MODAL_TOKENS.sizing;

  return {
    backgroundColor: variantTokens.backgroundColor,
    borderLeftColor: variantTokens.borderLeftColor,
    borderLeftWidth: sizing.borderLeftWidth,
    borderLeftStyle: 'solid',
    color: variantTokens.textColor,
    width: sizing.width,
    borderRadius: sizing.borderRadius,
    padding: sizing.padding,
    minHeight: sizing.minHeight,
    maxHeight: sizing.maxHeight,
    position: 'relative',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
  };
}

/**
 * Παίρνει CSS για modal overlay
 */
export function getModalOverlayCSS(): Record<string, string | number> {
  return {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: LAYERA_MODAL_TOKENS.overlay.backgroundColor,
    backdropFilter: LAYERA_MODAL_TOKENS.overlay.backdropFilter,
    zIndex: LAYERA_MODAL_TOKENS.overlay.zIndex,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };
}

export function getModalVariants(): LayeraModalVariant[] {
  return Object.keys(LAYERA_MODAL_TOKENS.variants) as LayeraModalVariant[];
}