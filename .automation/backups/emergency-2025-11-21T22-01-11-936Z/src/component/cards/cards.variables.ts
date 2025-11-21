/**
 * 🎯 LAYERA CARD VARIABLES - Card component design tokens
 *
 * Concrete τιμές που χαρτογραφούν semantic tokens σε συγκεκριμένες CSS properties
 * για Card components. Όλες οι τιμές προέρχονται από το core token system.
 */

// Import των core tokens που χρησιμοποιούμε
import { SPACING_VARIABLES } from '../../core/spacing/spacing.variables';

// CARD TYPE DEFINITIONS
export type CardVariant = 'elevated' | 'outlined' | 'filled' | 'property' | 'job' | 'info' | 'success' | 'warning' | 'error' | 'neutral';
export type CardSize = 'sm' | 'md' | 'lg' | 'xl';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

// CORE CARD VARIABLES - Βασικές τιμές που χρησιμοποιούν core tokens
export const CARD_VARIABLES = {
  // Base card properties
  'card-font-family': 'var(--layera-fontFamily-body)',
  'card-font-size': 'var(--layera-fontSize-base)',
  'card-line-height': 'var(--layera-lineHeight-normal)',
  'card-text-color': 'var(--layera-color-text-primary)',

  // Transitions & animations
  'card-transition': 'var(--layera-duration-normal) var(--layera-easing-ease-out)',
  'card-transition-transform': 'transform var(--layera-duration-fast) var(--layera-easing-ease-out)',
  'card-transition-shadow': 'box-shadow var(--layera-duration-normal) var(--layera-easing-ease-out)',

  // Shadow tokens για διαφορετικές καταστάσεις
  'card-shadow-default': 'var(--layera-shadow-sm)',
  'card-shadow-hover': 'var(--layera-shadow-lg)',
  'card-shadow-focus': 'var(--layera-shadow-outline)',

  // Border & spacing
  'card-border-radius': 'var(--layera-global-borderRadius-md)',
  'card-border-width': 'var(--layera-global-borderWidth-default)',

  // Header section
  'card-header-gap': 'var(--layera-spacing-3)',
  'card-header-margin-bottom': 'var(--layera-spacing-4)',
  'card-header-padding': 'var(--layera-spacing-4) var(--layera-spacing-4) 0',

  // Title styling
  'card-title-font-size': 'var(--layera-fontSize-lg)',
  'card-title-font-weight': 'var(--layera-fontWeight-semibold)',
  'card-title-line-height': 'var(--layera-lineHeight-tight)',
  'card-title-color': 'var(--layera-color-text-primary)',
  'card-title-margin-bottom': 'var(--layera-spacing-1)',

  // ENHANCED CARD BACKGROUNDS - COLORFUL CARDS για visibility
  'card-background-default': 'var(--layera-color-neutral-light)', // ΛΕΥΚΟ για default cards
  'card-background-primary': 'var(--layera-color-warning-light)', // ΚΙΤΡΙΝΟ για primary cards
  'card-background-secondary': 'var(--layera-color-info-light)', // ΜΠΛΕ για secondary cards
  'card-background-success': 'var(--layera-color-success-light)', // ΠΡΑΣΙΝΟ για success cards
  'card-background-warning': 'var(--layera-color-warning-main)', // ΠΟΡΤΟΚΑΛΙ για warning cards
  'card-background-error': 'var(--layera-color-error-light)', // ΚΟΚΚΙΝΟ για error cards
  'card-background-info': 'var(--layera-color-info-light)', // ΜΠΛΕ για info cards
  'card-background-neutral': 'var(--layera-color-neutral-light)', // ΓΚΡΙ για neutral cards

  // VISIBLE BORDERS για card definition - 2px solid borders
  'card-border-default': '2px solid var(--layera-color-neutral-dark)',
  'card-border-primary': '2px solid var(--layera-color-warning-main)',
  'card-border-secondary': '2px solid var(--layera-color-info-main)',
  'card-border-success': '2px solid var(--layera-color-success-main)',
  'card-border-warning': '2px solid var(--layera-color-warning-main)',
  'card-border-error': '2px solid var(--layera-color-error-main)',
  'card-border-info': '2px solid var(--layera-color-info-main)',
  'card-border-neutral': '2px solid var(--layera-color-neutral-dark)',

  // CORE CARD VISUAL PROPERTIES για ορατότητα
  'card-padding': 'var(--layera-spacing-4)', // 16px padding
  'card-margin': 'var(--layera-spacing-2)', // 8px margin
  'card-min-height': 'auto', // Dynamic height based on content
  'card-display': 'block',
  'card-position': 'relative',

  // ENTERPRISE TEXT ALIGNMENT - Cards (reference core μεταβλητές)
  'card-text-align-horizontal-left': 'var(--layera-core-text-align-left)',
  'card-text-align-horizontal-center': 'var(--layera-core-text-align-center)',
  'card-text-align-horizontal-right': 'var(--layera-core-text-align-right)',
  'card-text-align-horizontal-justify': 'var(--layera-core-text-align-justify)',
  'card-text-align-vertical-top': 'var(--layera-core-text-align-vertical-top)',
  'card-text-align-vertical-middle': 'var(--layera-core-text-align-vertical-middle)',
  'card-text-align-vertical-bottom': 'var(--layera-core-text-align-vertical-bottom)',

  // Subtitle styling
  'card-subtitle-font-size': 'var(--layera-fontSize-sm)',
  'card-subtitle-font-weight': 'var(--layera-fontWeight-medium)',
  'card-subtitle-color': 'var(--layera-color-text-secondary)',
  'card-subtitle-margin-bottom': 'var(--layera-spacing-2)',

  // Description styling
  'card-description-font-size': 'var(--layera-fontSize-sm)',
  'card-description-color': 'var(--layera-color-text-muted)',
  'card-description-line-height': 'var(--layera-lineHeight-relaxed)',

  // Icon styling
  'card-icon-size': 'var(--layera-spacing-6)',
  'card-icon-color': 'var(--layera-color-text-accent)',

  // Content area
  'card-content-padding': '0 var(--layera-spacing-4)',
  'card-content-gap': 'var(--layera-spacing-3)',

  // Footer section
  'card-footer-margin-top': 'var(--layera-spacing-4)',
  'card-footer-padding': 'var(--layera-spacing-4)',
  'card-footer-padding-top': 'var(--layera-spacing-3)',
  'card-footer-border': '1px solid var(--layera-color-border-muted)',
  'card-footer-background': 'var(--layera-color-surface-muted)',

  // Actions area
  'card-actions-gap': 'var(--layera-spacing-2)',
  'card-actions-margin': 'var(--layera-spacing-2)',

  // Loading & empty states
  'card-loading-background': 'var(--layera-color-surface-muted)',
  'card-loading-animation': 'pulse var(--layera-duration-slow) infinite',
  'card-empty-color': 'var(--layera-color-text-muted)',
  'card-empty-font-style': 'italic',

  // Interactive states
  'card-hover-transform': 'translateY(-2px)',
  'card-active-transform': 'translateY(1px)',
  'card-focus-outline': '2px solid var(--layera-color-primary-500)',
  'card-focus-outline-offset': 'var(--layera-spacing-0-5)', // 2px

  // Responsive breakpoints για card behavior
  'card-breakpoint-mobile': 'var(--layera-breakpoint-sm)',
  'card-breakpoint-tablet': 'var(--layera-breakpoint-md)',
  'card-breakpoint-desktop': 'var(--layera-breakpoint-lg)',

  // Z-index για layering
  'card-z-index-base': 'var(--layera-zIndex-base)',
  'card-z-index-elevated': 'var(--layera-zIndex-raised)',
  'card-z-index-modal': 'var(--layera-zIndex-modal)',
} as const;

// SPECIALIZED CARD VARIABLES - Domain-specific τιμές
export const SPECIALIZED_CARD_VARIABLES = {
  // Property cards - για real estate domain
  'property-card-backdrop-filter': 'blur(8px) saturate(180%)',
  'property-card-background': 'rgba(255, 255, 255, 0.9)',
  'property-card-border': '1px solid rgba(255, 255, 255, 0.3)',
  'property-card-shadow': '0 8px 32px rgba(0, 0, 0, 0.1)',
  'property-card-title-background': 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(240, 240, 240, 0.9))',
  'property-card-title-shadow': '0 2px 4px rgba(0, 0, 0, 0.1)',

  // Job cards - για job listings
  'job-card-accent-color': 'var(--layera-color-primary-500)',
  'job-card-accent-background': 'var(--layera-color-primary-50)',

  // Dashboard cards - για metrics και stats
  'dashboard-card-metric-font-size': 'var(--layera-fontSize-3xl)',
  'dashboard-card-metric-font-weight': 'var(--layera-fontWeight-bold)',
  'dashboard-card-metric-color': 'var(--layera-color-primary-600)',
  'dashboard-card-trend-positive': 'var(--layera-color-success-500)',
  'dashboard-card-trend-negative': 'var(--layera-color-error-500)',
  'dashboard-card-trend-neutral': 'var(--layera-color-text-muted)',
} as const;

// STATE VARIANTS για cards
export const CARD_STATE_VARIABLES = {
  // Loading state
  loading: {
    'card-loading-shimmer-background': 'linear-gradient(90deg, var(--layera-color-surface-muted) 25%, var(--layera-color-surface-secondary) 50%, var(--layera-color-surface-muted) 75%)',
    'card-loading-shimmer-size': '200% 100%',
    'card-loading-shimmer-animation': 'shimmer var(--layera-duration-slow) infinite linear',
  },

  // Error state
  error: {
    'card-error-background': 'var(--layera-color-background-error)',
    'card-error-border': 'var(--layera-color-border-error)',
    'card-error-color': 'var(--layera-color-text-error)',
    'card-error-icon-color': 'var(--layera-color-error-500)',
  },

  // Success state
  success: {
    'card-success-background': 'var(--layera-color-background-success)',
    'card-success-border': 'var(--layera-color-border-success)',
    'card-success-color': 'var(--layera-color-text-success)',
    'card-success-icon-color': 'var(--layera-color-success-500)',
  },

  // Warning state
  warning: {
    'card-warning-background': 'var(--layera-color-background-warning)',
    'card-warning-border': 'var(--layera-color-border-warning)',
    'card-warning-color': 'var(--layera-color-text-warning)',
    'card-warning-icon-color': 'var(--layera-color-warning-500)',
  },

  // Info state
  info: {
    'card-info-background': 'var(--layera-color-background-info)',
    'card-info-border': 'var(--layera-color-border-info)',
    'card-info-color': 'var(--layera-color-text-info)',
    'card-info-icon-color': 'var(--layera-color-info-500)',
  },

  // Disabled state
  disabled: {
    'card-disabled-background': 'var(--layera-color-surface-disabled)',
    'card-disabled-border': 'var(--layera-color-border-disabled)',
    'card-disabled-color': 'var(--layera-color-text-disabled)',
    'card-disabled-opacity': 'var(--layera-opacity-disabled)',
    'card-disabled-cursor': 'not-allowed',
  },
} as const;

// RESPONSIVE CARD VARIABLES
export const RESPONSIVE_CARD_VARIABLES = {
  // Mobile-first approach
  mobile: {
    'card-padding': 'var(--layera-spacing-3)',
    'card-margin': 'var(--layera-spacing-2)',
    'card-border-radius': 'var(--layera-global-borderRadius-sm)',
    'card-title-font-size': 'var(--layera-fontSize-base)',
    'card-min-height': 'auto',
  },

  // Tablet adaptations
  tablet: {
    'card-padding': 'var(--layera-spacing-4)',
    'card-margin': 'var(--layera-spacing-3)',
    'card-border-radius': 'var(--layera-global-borderRadius-md)',
    'card-title-font-size': 'var(--layera-fontSize-lg)',
    'card-min-height': '140px',
  },

  // Desktop optimizations
  desktop: {
    'card-padding': 'var(--layera-spacing-5)',
    'card-margin': 'var(--layera-spacing-4)',
    'card-border-radius': 'var(--layera-global-borderRadius-lg)',
    'card-title-font-size': 'var(--layera-fontSize-xl)',
    'card-min-height': '160px',
  },
} as const;

// ANIMATION KEYFRAMES VALUES
export const CARD_ANIMATION_VALUES = {
  // Shimmer effect για loading
  shimmer: {
    '0%': { backgroundPosition: '-200% 0' },
    '100%': { backgroundPosition: '200% 0' },
  },

  // Pulse effect για loading
  pulse: {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '0.5' },
  },

  // Fade in animation
  fadeIn: {
    '0%': { opacity: '0', transform: 'translateY(20px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },

  // Slide up animation
  slideUp: {
    '0%': { transform: 'translateY(100%)' },
    '100%': { transform: 'translateY(0)' },
  },
} as const;