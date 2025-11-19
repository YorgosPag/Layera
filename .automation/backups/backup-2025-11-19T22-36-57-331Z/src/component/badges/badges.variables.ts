/**
 * 🎯 LAYERA BADGE/CHIP COMPONENT TOKENS
 *
 * Component tokens για Badge και Chip components που χαρτογραφούν semantic tokens σε συγκεκριμένες badge χρήσεις
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

// UNIFIED BADGE VARIABLES - Όλα τα badge tokens ενωμένα για CSS export
export const BADGE_VARIABLES = {
  // BASE BADGE TOKENS
  'badge-background': BACKGROUND_VARIABLES['background-default'],
  'badge-background-hover': BACKGROUND_VARIABLES['background-hover'],
  'badge-background-active': BACKGROUND_VARIABLES['background-active'],
  'badge-background-disabled': BACKGROUND_VARIABLES['background-disabled'],

  // BADGE TEXT TOKENS
  'badge-text-color': TEXT_VARIABLES['text-primary'],
  'badge-text-hover': TEXT_VARIABLES['text-primary'],
  'badge-text-active': TEXT_VARIABLES['text-primary'],
  'badge-text-disabled': TEXT_VARIABLES['text-disabled'],

  // BADGE BORDER TOKENS
  'badge-border': BORDER_SEMANTIC_VARIABLES['border-default'],
  'badge-border-hover': BORDER_SEMANTIC_VARIABLES['border-hover'],
  'badge-border-active': BORDER_SEMANTIC_VARIABLES['border-focus'],
  'badge-border-disabled': BORDER_SEMANTIC_VARIABLES['border-disabled'],
  'badge-border-radius': BORDER_VARIABLES['border-radius-full'],
  'badge-border-width': '1px',

  // BADGE SIZE TOKENS - Different badge sizes
  'badge-xs-height': '16px',
  'badge-xs-padding': `${SPACING_VARIABLES['spacing-1']} ${SPACING_VARIABLES['spacing-2']}`,
  'badge-xs-font-size': '10px',
  'badge-xs-line-height': '1.2',

  'badge-sm-height': '20px',
  'badge-sm-padding': `${SPACING_VARIABLES['spacing-1']} ${SPACING_VARIABLES['spacing-2']}`,
  'badge-sm-font-size': '12px',
  'badge-sm-line-height': '1.3',

  'badge-md-height': '24px',
  'badge-md-padding': `${SPACING_VARIABLES['spacing-1']} ${SPACING_VARIABLES['spacing-3']}`,
  'badge-md-font-size': '14px',
  'badge-md-line-height': '1.4',

  'badge-lg-height': '28px',
  'badge-lg-padding': `${SPACING_VARIABLES['spacing-2']} ${SPACING_VARIABLES['spacing-3']}`,
  'badge-lg-font-size': '14px',
  'badge-lg-line-height': '1.5',

  // BADGE VARIANT TOKENS - Success (από job cards)
  'badge-success-background': BACKGROUND_VARIABLES['background-success'],
  'badge-success-color': TEXT_VARIABLES['text-primary'],
  'badge-success-border': BORDER_SEMANTIC_VARIABLES['border-success'],

  // BADGE VARIANT TOKENS - Error
  'badge-error-background': BACKGROUND_VARIABLES['background-error'],
  'badge-error-color': TEXT_VARIABLES['text-primary'],
  'badge-error-border': BORDER_SEMANTIC_VARIABLES['border-error'],

  // BADGE VARIANT TOKENS - Warning
  'badge-warning-background': BACKGROUND_VARIABLES['background-warning'],
  'badge-warning-color': TEXT_VARIABLES['text-primary'],
  'badge-warning-border': BORDER_SEMANTIC_VARIABLES['border-warning'],

  // BADGE VARIANT TOKENS - Info
  'badge-info-background': BACKGROUND_VARIABLES['background-default'],
  'badge-info-color': TEXT_VARIABLES['text-secondary'],
  'badge-info-border': BORDER_SEMANTIC_VARIABLES['border-default'],

  // BADGE VARIANT TOKENS - Primary
  'badge-primary-background': BACKGROUND_VARIABLES['background-active'],
  'badge-primary-color': TEXT_VARIABLES['text-primary'],
  'badge-primary-border': BORDER_SEMANTIC_VARIABLES['border-focus'],

  // BADGE VARIANT TOKENS - Secondary
  'badge-secondary-background': BACKGROUND_VARIABLES['background-muted'],
  'badge-secondary-color': TEXT_VARIABLES['text-secondary'],
  'badge-secondary-border': BORDER_SEMANTIC_VARIABLES['border-default'],

  // BADGE SHADOW TOKENS
  'badge-shadow': 'none',
  'badge-shadow-hover': SHADOW_VARIABLES['shadow-sm'],

  // BADGE TRANSITION TOKENS
  'badge-transition': MOTION_VARIABLES['transition-fast'],

  // CHIP TOKENS (larger, interactive badges)
  'chip-height': '32px',
  'chip-padding': `${SPACING_VARIABLES['spacing-2']} ${SPACING_VARIABLES['spacing-4']}`,
  'chip-font-size': '14px',
  'chip-font-weight': '500',
  'chip-border-radius': BORDER_VARIABLES['border-radius-full'],
  'chip-gap': SPACING_VARIABLES['spacing-2'],

  // CHIP CLOSE BUTTON
  'chip-close-size': SPACING_VARIABLES['spacing-4'],
  'chip-close-color': TEXT_VARIABLES['text-tertiary'],
  'chip-close-hover': TEXT_VARIABLES['text-primary'],
  'chip-close-padding': SPACING_VARIABLES['spacing-1'],

  // CHIP AVATAR/ICON
  'chip-avatar-size': SPACING_VARIABLES['spacing-6'],
  'chip-icon-size': SPACING_VARIABLES['spacing-4'],

  // DOT INDICATOR TOKENS
  'dot-size': SPACING_VARIABLES['spacing-2'],
  'dot-margin': SPACING_VARIABLES['spacing-1'],
  'dot-background': BACKGROUND_VARIABLES['background-active'],

  // NOTIFICATION BADGE TOKENS
  'notification-badge-size': SPACING_VARIABLES['spacing-4'],
  'notification-badge-font-size': '10px',
  'notification-badge-background': BACKGROUND_VARIABLES['background-error'],
  'notification-badge-color': TEXT_VARIABLES['text-primary'],
  'notification-badge-border': 'none',
  'notification-badge-shadow': SHADOW_VARIABLES['shadow-sm'],

  // STATUS BADGE TOKENS
  'status-online-background': BACKGROUND_VARIABLES['background-success'],
  'status-offline-background': BACKGROUND_VARIABLES['background-muted'],
  'status-away-background': BACKGROUND_VARIABLES['background-warning'],
  'status-busy-background': BACKGROUND_VARIABLES['background-error'],

  // COUNT BADGE TOKENS
  'count-badge-min-width': SPACING_VARIABLES['spacing-5'],
  'count-badge-max-number': '99',
  'count-badge-overflow-text': '99+',

  // INTERACTIVE BADGE TOKENS
  'interactive-badge-cursor': 'pointer',
  'interactive-badge-hover-transform': 'scale(1.05)',
  'interactive-badge-active-transform': 'scale(0.95)',

  // LOADING STATE TOKENS
  'badge-loading-opacity': '0.6',
  'badge-loading-animation': 'pulse var(--layera-motion-duration-slow) infinite',
} as const;

// Helper types για type safety
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';
export type BadgeVariant = 'default' | 'success' | 'error' | 'warning' | 'info' | 'primary' | 'secondary';
export type BadgeType = 'badge' | 'chip' | 'dot' | 'notification' | 'status' | 'count';
export type BadgeState = 'default' | 'hover' | 'active' | 'disabled' | 'loading';