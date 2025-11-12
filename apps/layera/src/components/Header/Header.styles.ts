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
    backgroundColor: 'var(--layera-color-text-inverse)',
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
    color: 'var(--layera-colorUtilities-utilities-text-neutral-white)',
    fontSize: 'var(--layera-fontSize-base)',
    fontWeight: 'var(--layera-fontWeight-semibold)'
  },
  blueIcon: {
    color: 'var(--layera-color-accent-blue)'
  },
  greenIcon: {
    color: 'var(--layera-color-accent-green)'
  }
} as const;

export type HeaderStylesType = typeof headerStyles;