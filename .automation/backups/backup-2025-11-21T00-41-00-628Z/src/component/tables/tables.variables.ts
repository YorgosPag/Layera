/**
 * 📊 LAYERA TABLES VARIABLES - Table component design tokens
 *
 * Concrete τιμές που χαρτογραφούν semantic tokens σε συγκεκριμένες CSS properties
 * για Table components. Όλες οι τιμές προέρχονται από το core token system.
 */

// TABLE TYPE DEFINITIONS
export type TableVariant = 'default' | 'striped' | 'bordered' | 'hover' | 'compact' | 'responsive';
export type TableSize = 'sm' | 'md' | 'lg' | 'xl';
export type TableDensity = 'compact' | 'normal' | 'spacious';
export type TableBorderStyle = 'none' | 'horizontal' | 'vertical' | 'all' | 'outline';

// CORE TABLE VARIABLES - Βασικές τιμές που χρησιμοποιούν core tokens
export const TABLE_VARIABLES = {
  // Base table properties
  'table-font-family': 'var(--layera-fontFamily-body)',
  'table-font-size': 'var(--layera-fontSize-sm)',
  'table-line-height': 'var(--layera-lineHeight-normal)',
  'table-text-color': 'var(--layera-color-text-primary)',

  // Table layout & structure
  'table-width': '100%',
  'table-border-collapse': 'collapse',
  'table-border-spacing': '0',

  // Cell padding & spacing
  'table-cell-padding': 'var(--layera-global-spacing-3) var(--layera-global-spacing-4)',
  'table-cell-padding-vertical': 'var(--layera-global-spacing-3)',
  'table-cell-padding-horizontal': 'var(--layera-global-spacing-4)',

  // Header styling
  'table-header-background': 'var(--layera-color-surface-secondary)',
  'table-header-color': 'var(--layera-color-text-primary)',
  'table-header-font-weight': 'var(--layera-fontWeight-semibold)',
  'table-header-font-size': 'var(--layera-fontSize-sm)',
  'table-header-border-bottom': '2px solid var(--layera-color-border-primary)',
  'table-header-padding': 'var(--layera-global-spacing-3) var(--layera-global-spacing-4)',

  // Row styling
  'table-row-background': 'var(--layera-color-surface)',
  'table-row-hover-background': 'var(--layera-color-surface-hover)',
  'table-row-active-background': 'var(--layera-color-surface-active)',
  'table-row-selected-background': 'var(--layera-color-primary-50)',

  // Borders & dividers
  'table-border-color': 'var(--layera-color-border-muted)',
  'table-border-width': 'var(--layera-global-borderWidth-default)',
  'table-border-style': 'solid',
  'table-border-radius': 'var(--layera-global-borderRadius-md)',

  // Striped rows
  'table-stripe-background': 'var(--layera-color-surface-muted)',
  'table-stripe-opacity': '0.5',

  // Responsive behavior
  'table-scroll-shadow': 'inset -15px 0 15px -15px rgba(0, 0, 0, 0.1)',
  'table-min-width': 'var(--layera-global-spacing-200)',

  // Loading & empty states
  'table-loading-background': 'var(--layera-color-surface-muted)',
  'table-loading-animation': 'pulse var(--layera-duration-slow) infinite',
  'table-empty-color': 'var(--layera-color-text-muted)',
  'table-empty-font-style': 'italic',

  // Interactive states
  'table-hover-transform': 'none',
  'table-focus-outline': '2px solid var(--layera-color-primary-500)',
  'table-focus-outline-offset': '2px',

  // Transitions
  'table-transition': 'background-color var(--layera-duration-fast) var(--layera-easing-ease-out)',
  'table-row-transition': 'background-color var(--layera-duration-fast) var(--layera-easing-ease-out)',

  // Sorting indicators
  'table-sort-icon-size': 'var(--layera-global-spacing-4)',
  'table-sort-icon-color': 'var(--layera-color-text-secondary)',
  'table-sort-active-color': 'var(--layera-color-primary-500)',

  // Caption styling
  'table-caption-color': 'var(--layera-color-text-secondary)',
  'table-caption-font-size': 'var(--layera-fontSize-sm)',
  'table-caption-margin-bottom': 'var(--layera-global-spacing-2)',

  // Footer styling
  'table-footer-background': 'var(--layera-color-surface-secondary)',
  'table-footer-color': 'var(--layera-color-text-secondary)',
  'table-footer-font-size': 'var(--layera-fontSize-xs)',
  'table-footer-border-top': '1px solid var(--layera-color-border-muted)',

  // Responsive breakpoints
  'table-breakpoint-mobile': 'var(--layera-breakpoint-sm)',
  'table-breakpoint-tablet': 'var(--layera-breakpoint-md)',

  // Z-index για sticky headers
  'table-header-z-index': 'var(--layera-zIndex-sticky)',

  // ENTERPRISE TEXT ALIGNMENT - Tables
  'table-text-align-horizontal-left': 'left',
  'table-text-align-horizontal-center': 'center',
  'table-text-align-horizontal-right': 'right',
  'table-text-align-horizontal-justify': 'justify',
  'table-text-align-vertical-top': 'top',
  'table-text-align-vertical-middle': 'middle',
  'table-text-align-vertical-bottom': 'bottom',
} as const;

// SIZE VARIANTS για table components
export const TABLE_SIZE_VARIABLES = {
  // Small tables
  small: {
    'table-font-size': 'var(--layera-fontSize-xs)',
    'table-cell-padding': 'var(--layera-global-spacing-2) var(--layera-global-spacing-3)',
    'table-header-padding': 'var(--layera-global-spacing-2) var(--layera-global-spacing-3)',
    'table-header-font-size': 'var(--layera-fontSize-xs)',
    'table-min-width': 'var(--layera-global-spacing-150)',
  },

  // Medium tables (default)
  medium: {
    'table-font-size': 'var(--layera-fontSize-sm)',
    'table-cell-padding': 'var(--layera-global-spacing-3) var(--layera-global-spacing-4)',
    'table-header-padding': 'var(--layera-global-spacing-3) var(--layera-global-spacing-4)',
    'table-header-font-size': 'var(--layera-fontSize-sm)',
    'table-min-width': 'var(--layera-global-spacing-200)',
  },

  // Large tables
  large: {
    'table-font-size': 'var(--layera-fontSize-base)',
    'table-cell-padding': 'var(--layera-global-spacing-4) var(--layera-global-spacing-5)',
    'table-header-padding': 'var(--layera-global-spacing-4) var(--layera-global-spacing-5)',
    'table-header-font-size': 'var(--layera-fontSize-base)',
    'table-min-width': 'var(--layera-global-spacing-250)',
  },

  // Extra large tables
  xl: {
    'table-font-size': 'var(--layera-fontSize-lg)',
    'table-cell-padding': 'var(--layera-global-spacing-5) var(--layera-global-spacing-6)',
    'table-header-padding': 'var(--layera-global-spacing-5) var(--layera-global-spacing-6)',
    'table-header-font-size': 'var(--layera-fontSize-lg)',
    'table-min-width': 'var(--layera-global-spacing-300)',
  },
} as const;

// DENSITY VARIANTS για table spacing
export const TABLE_DENSITY_VARIABLES = {
  // Compact density
  compact: {
    'table-cell-padding': 'var(--layera-global-spacing-2)',
    'table-header-padding': 'var(--layera-global-spacing-2)',
    'table-row-height': 'var(--layera-global-spacing-8)',
  },

  // Normal density (default)
  normal: {
    'table-cell-padding': 'var(--layera-global-spacing-3) var(--layera-global-spacing-4)',
    'table-header-padding': 'var(--layera-global-spacing-3) var(--layera-global-spacing-4)',
    'table-row-height': 'var(--layera-global-spacing-12)',
  },

  // Spacious density
  spacious: {
    'table-cell-padding': 'var(--layera-global-spacing-5) var(--layera-global-spacing-6)',
    'table-header-padding': 'var(--layera-global-spacing-5) var(--layera-global-spacing-6)',
    'table-row-height': 'var(--layera-global-spacing-16)',
  },
} as const;

// BORDER STYLE VARIABLES
export const TABLE_BORDER_VARIABLES = {
  // No borders
  none: {
    'table-border': 'none',
    'table-cell-border': 'none',
    'table-header-border': 'none',
  },

  // Horizontal borders only
  horizontal: {
    'table-border': 'none',
    'table-cell-border': 'none',
    'table-cell-border-bottom': '1px solid var(--layera-color-border-muted)',
    'table-header-border-bottom': '2px solid var(--layera-color-border-primary)',
  },

  // Vertical borders only
  vertical: {
    'table-border': 'none',
    'table-cell-border': 'none',
    'table-cell-border-right': '1px solid var(--layera-color-border-muted)',
    'table-header-border-right': '1px solid var(--layera-color-border-primary)',
  },

  // All borders
  all: {
    'table-border': '1px solid var(--layera-color-border-muted)',
    'table-cell-border': '1px solid var(--layera-color-border-muted)',
    'table-header-border': '1px solid var(--layera-color-border-primary)',
  },

  // Outline only
  outline: {
    'table-border': '2px solid var(--layera-color-border-primary)',
    'table-cell-border': 'none',
    'table-header-border-bottom': '2px solid var(--layera-color-border-primary)',
  },
} as const;

// SEMANTIC VARIANTS για table context
export const TABLE_SEMANTIC_VARIABLES = {
  // Data tables
  data: {
    'table-background': 'var(--layera-color-surface)',
    'table-header-background': 'var(--layera-color-surface-secondary)',
    'table-stripe-background': 'var(--layera-color-surface-muted)',
  },

  // Dashboard tables
  dashboard: {
    'table-background': 'var(--layera-color-surface)',
    'table-header-background': 'var(--layera-color-primary-50)',
    'table-stripe-background': 'var(--layera-color-primary-25)',
  },

  // Report tables
  report: {
    'table-background': 'var(--layera-color-surface)',
    'table-header-background': 'var(--layera-color-neutral-100)',
    'table-stripe-background': 'var(--layera-color-neutral-50)',
  },

  // Comparison tables
  comparison: {
    'table-background': 'var(--layera-color-surface)',
    'table-header-background': 'var(--layera-color-info-50)',
    'table-stripe-background': 'var(--layera-color-info-25)',
  },
} as const;

// RESPONSIVE TABLE VARIABLES
export const RESPONSIVE_TABLE_VARIABLES = {
  // Mobile-first approach
  mobile: {
    'table-font-size': 'var(--layera-fontSize-xs)',
    'table-cell-padding': 'var(--layera-global-spacing-2)',
    'table-overflow': 'auto',
    'table-min-width': '100%',
  },

  // Tablet adaptations
  tablet: {
    'table-font-size': 'var(--layera-fontSize-sm)',
    'table-cell-padding': 'var(--layera-global-spacing-3)',
    'table-overflow': 'visible',
    'table-min-width': 'auto',
  },

  // Desktop optimizations
  desktop: {
    'table-font-size': 'var(--layera-fontSize-base)',
    'table-cell-padding': 'var(--layera-global-spacing-4)',
    'table-overflow': 'visible',
    'table-min-width': 'auto',
  },
} as const;