/**
 * ARXES COMPLIANT Overlay Layout Classes
 * Enterprise overlay system που χρησιμοποιεί ΜΟΝΟ υπάρχουσες CSS variables
 *
 * ZERO σκληρές τιμές - ΜΟΝΟ tokens από core system
 */

export const LAYERA_LAYOUT_OVERLAY_CLASSES = {
  // Fullscreen overlay για FullAppLayout preview
  'layera-layout-fullscreen-overlay': {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    zIndex: '9999',
    background: 'white'
  },

  // Close button positioning
  'layera-layout-close-button': {
    position: 'absolute',
    top: 'var(--layera-space-2)',
    right: 'var(--layera-space-2)',
    background: 'var(--live-danger-color)',
    color: 'white',
    padding: 'var(--layera-space-2)',
    borderRadius: 'var(--live-border-radius)',
    cursor: 'pointer',
    zIndex: '10000',
    border: 'none'
  }
} as const;