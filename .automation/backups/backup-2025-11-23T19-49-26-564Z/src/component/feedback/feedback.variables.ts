/**
 * 📢 LAYERA FEEDBACK VARIABLES - Feedback component design tokens
 *
 * Concrete τιμές που χαρτογραφούν semantic tokens σε συγκεκριμένες CSS properties
 * για Feedback components (Alerts, Toasts, Notifications, Status Messages).
 * Όλες οι τιμές προέρχονται από το core token system.
 */

// FEEDBACK TYPE DEFINITIONS
export type FeedbackComponentType = 'alert' | 'toast' | 'notification' | 'banner' | 'inline' | 'modal';
export type FeedbackComponentVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';
export type FeedbackComponentSize = 'sm' | 'md' | 'lg' | 'xl';
export type FeedbackPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'center';

// CORE FEEDBACK VARIABLES - Βασικές τιμές που χρησιμοποιούν core tokens
export const FEEDBACK_COMPONENT_VARIABLES = {
  // Base feedback properties
  'feedback-font-family': 'var(--layera-fontFamily-body)',
  'feedback-font-size': 'var(--layera-fontSize-sm)',
  'feedback-line-height': 'var(--layera-lineHeight-normal)',
  'feedback-text-color': 'var(--layera-color-text-primary)',

  // Layout & spacing
  'feedback-padding': 'var(--layera-global-spacing-3) var(--layera-global-spacing-4)',
  'feedback-margin': 'var(--layera-global-spacing-2)',
  'feedback-gap': 'var(--layera-global-spacing-3)',
  'feedback-border-radius': 'var(--layera-global-borderRadius-md)',
  'feedback-border-width': 'var(--layera-global-borderWidth-default)',

  // Icon styling
  'feedback-icon-size': 'var(--layera-global-spacing-5)',
  'feedback-icon-margin-right': 'var(--layera-global-spacing-2)',

  // Close button
  'feedback-close-size': 'var(--layera-global-spacing-6)',
  'feedback-close-color': 'var(--layera-color-text-secondary)',
  'feedback-close-hover-color': 'var(--layera-color-text-primary)',

  // Title styling
  'feedback-title-font-size': 'var(--layera-fontSize-base)',
  'feedback-title-font-weight': 'var(--layera-fontWeight-semibold)',
  'feedback-title-margin-bottom': 'var(--layera-global-spacing-1)',
  'feedback-title-color': 'var(--layera-color-text-primary)',

  // Message styling
  'feedback-message-font-size': 'var(--layera-fontSize-sm)',
  'feedback-message-color': 'var(--layera-color-text-secondary)',
  'feedback-message-line-height': 'var(--layera-lineHeight-relaxed)',

  // Action buttons area
  'feedback-actions-margin-top': 'var(--layera-global-spacing-3)',
  'feedback-actions-gap': 'var(--layera-global-spacing-2)',

  // Transitions & animations
  'feedback-transition': 'all var(--layera-duration-normal) var(--layera-easing-ease-out)',
  'feedback-slide-transition': 'transform var(--layera-duration-normal) var(--layera-easing-ease-out)',
  'feedback-fade-transition': 'opacity var(--layera-duration-fast) var(--layera-easing-ease-out)',

  // Shadow & elevation
  'feedback-shadow': 'var(--layera-shadow-md)',
  'feedback-shadow-toast': 'var(--layera-shadow-lg)',
  'feedback-shadow-modal': 'var(--layera-shadow-xl)',

  // Progress bar (για auto-dismiss notifications)
  'feedback-progress-height': 'var(--layera-global-spacing-1)',
  'feedback-progress-background': 'var(--layera-color-surface-muted)',

  // Toast specific
  'feedback-toast-width': 'var(--layera-global-spacing-80)',
  'feedback-toast-max-width': 'var(--layera-global-spacing-100)',
  'feedback-toast-z-index': 'var(--layera-zIndex-toast)',

  // Banner specific
  'feedback-banner-padding': 'var(--layera-global-spacing-2) var(--layera-global-spacing-4)',
  'feedback-banner-border-radius': 'var(--layera-global-borderRadius-sm)',

  // Modal feedback specific
  'feedback-modal-padding': 'var(--layera-global-spacing-6)',
  'feedback-modal-max-width': 'var(--layera-global-spacing-120)',

  // Responsive breakpoints
  'feedback-breakpoint-mobile': 'var(--layera-breakpoint-sm)',
  'feedback-breakpoint-tablet': 'var(--layera-breakpoint-md)',

  // Z-index management
  'feedback-z-index-inline': 'var(--layera-zIndex-base)',
  'feedback-z-index-toast': 'var(--layera-zIndex-toast)',
  'feedback-z-index-modal': 'var(--layera-zIndex-modal)',
} as const;

// SIZE VARIANTS για feedback components
export const FEEDBACK_SIZE_VARIABLES = {
  // Small feedback
  small: {
    'feedback-padding': 'var(--layera-global-spacing-2) var(--layera-global-spacing-3)',
    'feedback-font-size': 'var(--layera-fontSize-xs)',
    'feedback-icon-size': 'var(--layera-global-spacing-4)',
    'feedback-close-size': 'var(--layera-global-spacing-5)',
    'feedback-gap': 'var(--layera-global-spacing-2)',
  },

  // Medium feedback (default)
  medium: {
    'feedback-padding': 'var(--layera-global-spacing-3) var(--layera-global-spacing-4)',
    'feedback-font-size': 'var(--layera-fontSize-sm)',
    'feedback-icon-size': 'var(--layera-global-spacing-5)',
    'feedback-close-size': 'var(--layera-global-spacing-6)',
    'feedback-gap': 'var(--layera-global-spacing-3)',
  },

  // Large feedback
  large: {
    'feedback-padding': 'var(--layera-global-spacing-4) var(--layera-global-spacing-5)',
    'feedback-font-size': 'var(--layera-fontSize-base)',
    'feedback-icon-size': 'var(--layera-global-spacing-6)',
    'feedback-close-size': 'var(--layera-global-spacing-7)',
    'feedback-gap': 'var(--layera-global-spacing-4)',
  },

  // Extra large feedback
  xl: {
    'feedback-padding': 'var(--layera-global-spacing-5) var(--layera-global-spacing-6)',
    'feedback-font-size': 'var(--layera-fontSize-lg)',
    'feedback-icon-size': 'var(--layera-global-spacing-7)',
    'feedback-close-size': 'var(--layera-global-spacing-8)',
    'feedback-gap': 'var(--layera-global-spacing-5)',
  },
} as const;

// VARIANT STATE VARIABLES για διαφορετικά feedback states
export const FEEDBACK_VARIANT_VARIABLES = {
  // Success feedback
  success: {
    'feedback-background': 'var(--layera-color-background-success)',
    'feedback-border-color': 'var(--layera-color-border-success)',
    'feedback-icon-color': 'var(--layera-color-success-500)',
    'feedback-title-color': 'var(--layera-color-text-success)',
    'feedback-progress-color': 'var(--layera-color-success-400)',
  },

  // Warning feedback
  warning: {
    'feedback-background': 'var(--layera-color-background-warning)',
    'feedback-border-color': 'var(--layera-color-border-warning)',
    'feedback-icon-color': 'var(--layera-color-warning-500)',
    'feedback-title-color': 'var(--layera-color-text-warning)',
    'feedback-progress-color': 'var(--layera-color-warning-400)',
  },

  // Error feedback
  error: {
    'feedback-background': 'var(--layera-color-background-error)',
    'feedback-border-color': 'var(--layera-color-border-error)',
    'feedback-icon-color': 'var(--layera-color-error-500)',
    'feedback-title-color': 'var(--layera-color-text-error)',
    'feedback-progress-color': 'var(--layera-color-error-400)',
  },

  // Info feedback
  info: {
    'feedback-background': 'var(--layera-color-background-info)',
    'feedback-border-color': 'var(--layera-color-border-info)',
    'feedback-icon-color': 'var(--layera-color-info-500)',
    'feedback-title-color': 'var(--layera-color-text-info)',
    'feedback-progress-color': 'var(--layera-color-info-400)',
  },

  // Neutral feedback
  neutral: {
    'feedback-background': 'var(--layera-color-surface-secondary)',
    'feedback-border-color': 'var(--layera-color-border-default)',
    'feedback-icon-color': 'var(--layera-color-text-secondary)',
    'feedback-title-color': 'var(--layera-color-text-primary)',
    'feedback-progress-color': 'var(--layera-color-text-muted)',
  },
} as const;

// POSITION VARIABLES για toast positioning
export const FEEDBACK_POSITION_VARIABLES = {
  'top-left': {
    'feedback-position-top': 'var(--layera-global-spacing-4)',
    'feedback-position-left': 'var(--layera-global-spacing-4)',
    'feedback-transform-enter': 'translateX(-100%)',
    'feedback-transform-exit': 'translateX(-100%)',
  },
  'top-center': {
    'feedback-position-top': 'var(--layera-global-spacing-4)',
    'feedback-position-left': '50%',
    'feedback-transform': 'translateX(-50%)',
    'feedback-transform-enter': 'translateY(-100%)',
    'feedback-transform-exit': 'translateY(-100%)',
  },
  'top-right': {
    'feedback-position-top': 'var(--layera-global-spacing-4)',
    'feedback-position-right': 'var(--layera-global-spacing-4)',
    'feedback-transform-enter': 'translateX(100%)',
    'feedback-transform-exit': 'translateX(100%)',
  },
  'bottom-left': {
    'feedback-position-bottom': 'var(--layera-global-spacing-4)',
    'feedback-position-left': 'var(--layera-global-spacing-4)',
    'feedback-transform-enter': 'translateX(-100%)',
    'feedback-transform-exit': 'translateX(-100%)',
  },
  'bottom-center': {
    'feedback-position-bottom': 'var(--layera-global-spacing-4)',
    'feedback-position-left': '50%',
    'feedback-transform': 'translateX(-50%)',
    'feedback-transform-enter': 'translateY(100%)',
    'feedback-transform-exit': 'translateY(100%)',
  },
  'bottom-right': {
    'feedback-position-bottom': 'var(--layera-global-spacing-4)',
    'feedback-position-right': 'var(--layera-global-spacing-4)',
    'feedback-transform-enter': 'translateX(100%)',
    'feedback-transform-exit': 'translateX(100%)',
  },
  'center': {
    'feedback-position-top': '50%',
    'feedback-position-left': '50%',
    'feedback-transform': 'translate(-50%, -50%)',
    'feedback-transform-enter': 'translate(-50%, -50%) scale(0.8)',
    'feedback-transform-exit': 'translate(-50%, -50%) scale(0.8)',
  },
} as const;

// ANIMATION KEYFRAMES VALUES
export const FEEDBACK_ANIMATION_VALUES = {
  // Slide in from left
  slideInLeft: {
    '0%': { transform: 'translateX(-100%)', opacity: '0' },
    '100%': { transform: 'translateX(0)', opacity: '1' },
  },

  // Slide in from right
  slideInRight: {
    '0%': { transform: 'translateX(100%)', opacity: '0' },
    '100%': { transform: 'translateX(0)', opacity: '1' },
  },

  // Slide in from top
  slideInTop: {
    '0%': { transform: 'translateY(-100%)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' },
  },

  // Slide in from bottom
  slideInBottom: {
    '0%': { transform: 'translateY(100%)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' },
  },

  // Fade in
  fadeIn: {
    '0%': { opacity: '0', transform: 'scale(0.9)' },
    '100%': { opacity: '1', transform: 'scale(1)' },
  },

  // Progress bar animation
  progressDecrement: {
    '0%': { width: '100%' },
    '100%': { width: '0%' },
  },

  // Shake animation για error states
  shake: {
    '0%, 100%': { transform: 'translateX(0)' },
    '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-10px)' },
    '20%, 40%, 60%, 80%': { transform: 'translateX(10px)' },
  },
} as const;