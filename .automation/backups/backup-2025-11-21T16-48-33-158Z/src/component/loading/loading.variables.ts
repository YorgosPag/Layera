/**
 * ⚡ LAYERA LOADING/SPINNER COMPONENT TOKENS
 *
 * Component tokens για Loading και Spinner components που χαρτογραφούν semantic tokens σε συγκεκριμένες loading χρήσεις
 * Enterprise component layer - τελευταίο επίπεδο της τρι-επίπεδης ιεραρχίας
 */

// Import των semantic και core tokens που χρησιμοποιούμε
import { BACKGROUND_VARIABLES } from '../../semantic/background/background.variables';
import { TEXT_VARIABLES } from '../../semantic/text/text.variables';
import { BORDER_SEMANTIC_VARIABLES } from '../../semantic/border/border.variables';
import { MOTION_VARIABLES } from '../../core/motion/motion.variables';
import { SPACING_VARIABLES } from '../../core/spacing/spacing.variables';
import { BORDER_VARIABLES } from '../../core/borders/borders.variables';
import { SHADOW_VARIABLES } from '../../core/shadows/shadows.variables';
import { FONT_SIZE_SCALE, FONT_WEIGHT_SCALE } from '../../core/typography/typography.variables';

// UNIFIED LOADING VARIABLES - Όλα τα loading tokens ενωμένα για CSS export
export const LOADING_VARIABLES = {
  // BASE LOADING TOKENS
  'loading-background': BACKGROUND_VARIABLES['background-default'],
  'loading-background-overlay': BACKGROUND_VARIABLES['background-muted'],
  'loading-text-color': TEXT_VARIABLES['text-secondary'],
  'loading-text-description': TEXT_VARIABLES['text-tertiary'],

  // SPINNER TOKENS
  'spinner-color': TEXT_VARIABLES['text-primary'],
  'spinner-color-secondary': TEXT_VARIABLES['text-tertiary'],
  'spinner-background': 'transparent',
  'spinner-border-width': '2px',
  'spinner-border-style': 'solid',
  'spinner-border-radius': BORDER_VARIABLES['border-radius-full'],

  // SPINNER SIZE TOKENS - Different spinner sizes
  'spinner-xs-size': SPACING_VARIABLES['spacing-3'],
  'spinner-xs-border-width': '1px',

  'spinner-sm-size': SPACING_VARIABLES['spacing-4'],
  'spinner-sm-border-width': '2px',

  'spinner-md-size': SPACING_VARIABLES['spacing-6'],
  'spinner-md-border-width': '2px',

  'spinner-lg-size': SPACING_VARIABLES['spacing-8'],
  'spinner-lg-border-width': '3px',

  'spinner-xl-size': SPACING_VARIABLES['spacing-12'],
  'spinner-xl-border-width': '4px',

  // SPINNER ANIMATION TOKENS
  'spinner-animation-duration': MOTION_VARIABLES['duration-slow'],
  'spinner-animation-easing': 'linear',
  'spinner-animation-iteration': 'infinite',
  'spinner-animation-name': 'spin',

  // LOADING OVERLAY TOKENS
  'overlay-background': 'rgba(255, 255, 255, 0.8)',
  'overlay-background-dark': 'rgba(0, 0, 0, 0.5)',
  'overlay-z-index': SPACING_VARIABLES['spacing-50'],
  'overlay-backdrop-filter': 'blur(2px)',

  // SKELETON TOKENS
  'skeleton-background': BACKGROUND_VARIABLES['background-muted'],
  'skeleton-background-active': BACKGROUND_VARIABLES['background-hover'],
  'skeleton-border-radius': BORDER_VARIABLES['border-radius-4'],
  'skeleton-animation-duration': MOTION_VARIABLES['duration-slow'],
  'skeleton-animation-easing': 'ease-in-out',

  // SKELETON SIZE TOKENS
  'skeleton-text-height': SPACING_VARIABLES['spacing-4'],
  'skeleton-text-small-height': SPACING_VARIABLES['spacing-3'],
  'skeleton-text-large-height': SPACING_VARIABLES['spacing-5'],
  'skeleton-avatar-size': SPACING_VARIABLES['spacing-12'],
  'skeleton-button-height': SPACING_VARIABLES['spacing-10'],
  'skeleton-card-height': SPACING_VARIABLES['spacing-32'],

  // PROGRESS BAR TOKENS
  'progress-background': BACKGROUND_VARIABLES['background-muted'],
  'progress-fill': BACKGROUND_VARIABLES['background-active'],
  'progress-height': SPACING_VARIABLES['spacing-2'],
  'progress-border-radius': BORDER_VARIABLES['border-radius-full'],
  'progress-transition': MOTION_VARIABLES['transition-normal'],

  // PROGRESS BAR SIZE VARIANTS
  'progress-sm-height': SPACING_VARIABLES['spacing-1'],
  'progress-md-height': SPACING_VARIABLES['spacing-2'],
  'progress-lg-height': SPACING_VARIABLES['spacing-3'],

  // PROGRESS BAR COLORS
  'progress-success-fill': BACKGROUND_VARIABLES['background-success'],
  'progress-error-fill': BACKGROUND_VARIABLES['background-error'],
  'progress-warning-fill': BACKGROUND_VARIABLES['background-warning'],
  'progress-info-fill': BACKGROUND_VARIABLES['background-default'],

  // DOTS LOADING TOKENS
  'dots-size': SPACING_VARIABLES['spacing-2'],
  'dots-gap': SPACING_VARIABLES['spacing-1'],
  'dots-color': TEXT_VARIABLES['text-primary'],
  'dots-animation-delay': '0.1s',
  'dots-animation-duration': MOTION_VARIABLES['duration-normal'],

  // PULSE LOADING TOKENS
  'pulse-scale-start': '1',
  'pulse-scale-mid': '1.05',
  'pulse-scale-end': '1',
  'pulse-opacity-start': '1',
  'pulse-opacity-mid': '0.7',
  'pulse-opacity-end': '1',
  'pulse-duration': MOTION_VARIABLES['duration-slow'],

  // WAVE LOADING TOKENS
  'wave-height': SPACING_VARIABLES['spacing-8'],
  'wave-width': SPACING_VARIABLES['spacing-1'],
  'wave-gap': SPACING_VARIABLES['spacing-0-5'],
  'wave-color': TEXT_VARIABLES['text-primary'],
  'wave-animation-delay': '0.1s',
  'wave-animation-duration': MOTION_VARIABLES['duration-normal'],

  // LOADING STATE TOKENS
  'loading-message-font-size': FONT_SIZE_SCALE.sm,
  'loading-message-font-weight': FONT_WEIGHT_SCALE.medium,
  'loading-message-margin-top': SPACING_VARIABLES['spacing-3'],
  'loading-message-text-align': 'var(--layera-core-text-align-center)',

  // LOADING BUTTON TOKENS
  'loading-button-opacity': '0.6',
  'loading-button-cursor': 'not-allowed',
  'loading-button-spinner-margin': SPACING_VARIABLES['spacing-2'],

  // LOADING PAGE TOKENS
  'loading-page-min-height': '100vh',
  'loading-page-display': 'flex',
  'loading-page-align': 'center',
  'loading-page-justify': 'center',
  'loading-page-flex-direction': 'column',
  'loading-page-gap': SPACING_VARIABLES['spacing-4'],

  // LOADING CARD TOKENS
  'loading-card-padding': SPACING_VARIABLES['spacing-4'],
  'loading-card-border-radius': BORDER_VARIABLES['border-radius-8'],
  'loading-card-background': BACKGROUND_VARIABLES['background-default'],
  'loading-card-shadow': SHADOW_VARIABLES['shadow-sm'],

  // INDETERMINATE PROGRESS TOKENS
  'indeterminate-animation-duration': '2s',
  'indeterminate-animation-easing': 'ease-in-out',
  'indeterminate-background-size': '200% 100%',
  'indeterminate-background-position': '-200% 0',
  'indeterminate-background-position-end': '200% 0',

  // SHIMMER EFFECT TOKENS
  'shimmer-background': 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
  'shimmer-animation-duration': '1.5s',
  'shimmer-animation-timing': 'ease-in-out',
  'shimmer-animation-iteration': 'infinite',

  // LOADING ACCESSIBILITY TOKENS
  'loading-aria-busy': 'true',
  'loading-aria-live': 'polite',
  'loading-aria-label': 'Loading content',
  'loading-screen-reader-text': 'Loading, please wait',

  // LOADING PERFORMANCE TOKENS
  'loading-will-change': 'transform, opacity',
  'loading-transform-origin': 'center center',
  'loading-backface-visibility': 'hidden',
} as const;

// Helper types για type safety
export type LoadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type LoadingType = 'spinner' | 'skeleton' | 'progress' | 'dots' | 'pulse' | 'wave' | 'shimmer';
export type LoadingVariant = 'default' | 'overlay' | 'inline' | 'button' | 'page' | 'card';
export type LoadingState = 'loading' | 'success' | 'error' | 'warning' | 'info';