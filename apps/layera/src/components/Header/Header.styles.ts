/**
 * Header.styles.ts - Enterprise Header Styles
 *
 * ARXES Compliant styles separation
 * - Pure design token references
 * - Zero hardcoded values
 * - Type-safe style definitions
 * - Separated from component logic
 */

export const headerStyles = {
  container: {
    position: 'fixed' as const,
    top: 'var(--layera-header-fixed-top)',
    left: 'var(--layera-header-fixed-left)',
    right: 'var(--layera-header-fixed-right)',
    zIndex: 'var(--layera-header-fixed-zIndex)',
    height: 'var(--layera-header-fixed-height)',
    backgroundColor: 'var(--layera-color-surface-primary)',
    display: 'var(--layera-global-display-flex)',
    alignItems: 'var(--layera-global-alignItems-center)',
    justifyContent: 'var(--layera-global-justifyContent-spaceBetween)',
    padding: 'var(--layera-global-reset-padding) var(--layera-global-spacing-4)',
    borderBottom: 'var(--layera-global-borderWidth-1) var(--layera-global-borderStyle-solid) var(--layera-color-border-light)'
  },
  flexContainer: {
    display: 'var(--layera-global-display-flex)',
    alignItems: 'var(--layera-global-alignItems-center)',
    gap: 'var(--layera-global-spacing-3)'
  },
  flexNavigation: {
    display: 'var(--layera-global-display-flex)',
    alignItems: 'var(--layera-global-alignItems-center)',
    gap: 'var(--layera-global-spacing-2)'
  },
  actionButton: {
    width: 'var(--layera-global-spacing-8)',
    height: 'var(--layera-global-spacing-8)',
    backgroundColor: 'var(--layera-btn-action-backgroundColor)',
    border: 'var(--layera-global-border-none)',
    borderRadius: 'var(--layera-btn-action-borderRadius)',
    display: 'var(--layera-global-display-flex)',
    alignItems: 'var(--layera-global-alignItems-center)',
    justifyContent: 'var(--layera-global-justifyContent-center)',
    cursor: 'var(--layera-global-cursor-pointer)'
  },
  ghostButton: {
    width: 'var(--layera-global-spacing-8)',
    height: 'var(--layera-global-spacing-8)',
    backgroundColor: 'var(--layera-global-color-transparent)',
    border: 'var(--layera-global-border-none)',
    display: 'var(--layera-global-display-flex)',
    alignItems: 'var(--layera-global-alignItems-center)',
    justifyContent: 'var(--layera-global-justifyContent-center)',
    cursor: 'var(--layera-global-cursor-pointer)'
  },
  whiteIcon: {
    color: 'var(--layera-icon-colorWhite)',
    pointerEvents: 'none' as const
  },
  headerTitle: {
    color: 'var(--layera-color-text-primary)',
    fontSize: 'var(--layera-fontSize-base)',
    fontWeight: 'var(--layera-fontWeight-semibold)'
  },
  blueIcon: {
    color: 'var(--layera-color-accent-blue)'
  },
  greenIcon: {
    color: 'var(--layera-color-accent-green)'
  },
  paddingLarge: {
    padding: 'var(--layera-global-spacing-6)'
  },
  gridContainer: {
    display: 'var(--layera-global-display-grid)',
    gridTemplateColumns: 'var(--layera-grid-cols-1)',
    gap: 'var(--layera-global-spacing-6)'
  },
  gridTablet: {
    '@media (min-width: var(--layera-global-breakpoint-md))': {
      gridTemplateColumns: 'var(--layera-grid-cols-2)'
    }
  },
  cardClickable: {
    backgroundColor: 'var(--layera-color-surface-primary)',
    borderRadius: 'var(--layera-global-borderRadius-lg)',
    padding: 'var(--layera-global-spacing-4)',
    border: 'var(--layera-global-borderWidth-1) var(--layera-global-borderStyle-solid) var(--layera-color-border-primary)',
    boxShadow: 'var(--layera-global-shadow-sm)',
    cursor: 'var(--layera-global-cursor-pointer)',
    transition: 'var(--layera-global-transition-all)'
  },
  typography: {
    fontFamily: 'var(--layera-global-fontFamily-system)',
    color: 'var(--layera-color-text-primary)'
  },
  typographyLarge: {
    fontSize: 'var(--layera-fontSize-lg)',
    fontWeight: 'var(--layera-fontWeight-semibold)',
    color: 'var(--layera-color-text-primary)'
  },
  typographySmall: {
    fontSize: 'var(--layera-fontSize-sm)',
    color: 'var(--layera-color-text-secondary)'
  },
  marginBottomSmall: {
    marginBottom: 'var(--layera-global-spacing-2)'
  }
} as const;

export type HeaderStylesType = typeof headerStyles;