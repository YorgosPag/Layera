/**
 * 📋 HEADER COMPONENT TOKENS
 *
 * Συγκεντρώνει όλα τα header-related tokens από το FullAppPreview_Mockup.html:
 * - Header Border Radius: 0-32px (default: 0px)
 * - Header Colors: 6-color system
 * - Header Height: από dimensions (60px)
 *
 * Component targeting support για setTargetComponent('header')
 */

export const LAYERA_HEADER_TOKENS = {
  // Header variants για different color schemes
  variants: {
    primary: {
      backgroundColor: 'var(--live-primary-color)',
      textColor: '#FFFFFF',
      borderColor: 'var(--live-primary-color)'
    },

    secondary: {
      backgroundColor: 'var(--live-secondary-color)',
      textColor: '#FFFFFF',
      borderColor: 'var(--live-secondary-color)'
    },

    success: {
      backgroundColor: 'var(--live-success-color)',
      textColor: '#FFFFFF',
      borderColor: 'var(--live-success-color)'
    },

    warning: {
      backgroundColor: 'var(--live-warning-color)',
      textColor: '#000000',
      borderColor: 'var(--live-warning-color)'
    },

    danger: {
      backgroundColor: 'var(--live-danger-color)',
      textColor: '#FFFFFF',
      borderColor: 'var(--live-danger-color)'
    },

    info: {
      backgroundColor: 'var(--live-info-color)',
      textColor: '#FFFFFF',
      borderColor: 'var(--live-info-color)'
    }
  },

  // Header sizing από HTML mockup controls
  sizing: {
    height: 'var(--layera-header-height)',           // 60px default
    borderRadius: 'var(--live-headers-border-radius)', // data-control="header-border-radius"
    padding: 'var(--live-padding)'                   // data-control="padding"
  }
} as const;

export const LAYERA_HEADER_LIVE_VARS = {
  '--layera-header-height': 'var(--layera-header-height)',
  '--layera-header-border-radius': 'var(--live-headers-border-radius)',
  '--layera-header-padding': 'var(--live-padding)'
} as const;

export type LayeraHeaderVariant = keyof typeof LAYERA_HEADER_TOKENS.variants;