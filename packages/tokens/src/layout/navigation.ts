/**
 * ARXES COMPLIANT Navigation Layout Classes
 * Enterprise navigation classes που χρησιμοποιούν ΜΟΝΟ υπάρχουσες CSS variables
 *
 * ZERO σκληρές τιμές - ΜΟΝΟ tokens από core system
 */

export const LAYERA_LAYOUT_NAVIGATION_CLASSES = {
  // Main layout container
  'layera-layout-main-container': {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden'
  },

  // Flex layout για sidebars + main content
  'layera-layout-flex-container': {
    display: 'flex',
    flex: '1',
    minHeight: '0'
  },

  // Sidebar transitions
  'layera-layout-sidebar-transition': {
    transition: 'width 0.3s ease',
    overflow: 'hidden'
  }
} as const;