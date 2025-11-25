/**
 * 📊 TABLE COMPONENT TOKENS
 *
 * Συγκεντρώνει όλα τα table-related tokens από το FullAppPreview_Mockup.html:
 * - Table Border Radius: 0-32px (default: 4px)
 * - Table Colors: 6-color system για headers και borders
 * - Table Cell Padding: από dimensions
 *
 * Component targeting support για setTargetComponent('tables')
 */

export const LAYERA_TABLE_TOKENS = {
  // Table variants για different color schemes
  variants: {
    primary: {
      headerBackground: 'var(--live-primary-color)',
      headerTextColor: '#FFFFFF',
      borderColor: 'var(--live-primary-color)'
    },

    secondary: {
      headerBackground: 'var(--live-secondary-color)',
      headerTextColor: '#FFFFFF',
      borderColor: 'var(--live-secondary-color)'
    },

    success: {
      headerBackground: 'var(--live-success-color)',
      headerTextColor: '#FFFFFF',
      borderColor: 'var(--live-success-color)'
    },

    warning: {
      headerBackground: 'var(--live-warning-color)',
      headerTextColor: '#000000',
      borderColor: 'var(--live-warning-color)'
    },

    danger: {
      headerBackground: 'var(--live-danger-color)',
      headerTextColor: '#FFFFFF',
      borderColor: 'var(--live-danger-color)'
    },

    info: {
      headerBackground: 'var(--live-info-color)',
      headerTextColor: '#FFFFFF',
      borderColor: 'var(--live-info-color)'
    }
  },

  // Table sizing από HTML mockup controls
  sizing: {
    borderRadius: 'var(--live-tables-border-radius)', // data-control="tables-border-radius"
    borderWidth: 'var(--live-border-width)',
    cellPadding: 'var(--layera-table-cell-padding)',
    minHeight: '300px',
    maxHeight: '70vh'
  },

  // Table styles
  styles: {
    rowBackground: '#FFFFFF',
    rowAlternateBackground: '#F8F9FA',
    rowHoverBackground: '#F1F3F4',
    borderCollapse: 'separate',
    borderSpacing: '0'
  }
} as const;

export const LAYERA_TABLE_LIVE_VARS = {
  '--layera-table-border-radius': 'var(--live-tables-border-radius)',
  '--layera-table-border-width': 'var(--live-border-width)',
  '--layera-table-cell-padding': 'var(--layera-table-cell-padding)',
  '--layera-table-row-background': '#FFFFFF',
  '--layera-table-row-alternate': '#F8F9FA',
  '--layera-table-row-hover': '#F1F3F4'
} as const;

export type LayeraTableVariant = keyof typeof LAYERA_TABLE_TOKENS.variants;