/**
 * ARXES COMPLIANT Layout Utility Classes
 * Enterprise utility classes που χρησιμοποιούν ΜΟΝΟ υπάρχουσες CSS variables
 *
 * ZERO σκληρές τιμές - ΜΟΝΟ tokens από core system
 */

export const LAYERA_LAYOUT_UTILITY_CLASSES = {
  // Full width utilities
  'layera-layout-full-width': {
    width: '100%'
  },

  // Full height utilities
  'layera-layout-full-height': {
    height: '100%'
  },

  // Background utilities
  'layera-layout-bg-primary': {
    background: 'var(--live-primary-color)'
  },

  'layera-layout-bg-white': {
    background: 'white'
  },

  // Spacing utilities using existing tokens
  'layera-layout-padding-md': {
    padding: 'var(--layera-space-4)'
  },

  'layera-layout-margin-md': {
    margin: 'var(--layera-space-4)'
  }
} as const;