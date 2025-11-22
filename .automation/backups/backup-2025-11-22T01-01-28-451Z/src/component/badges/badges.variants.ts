/**
 * 🎯 LAYERA BADGE VARIANTS - Προκαθορισμένοι συνδυασμοί badge tokens
 *
 * Component-ready badge variants που χαρτογραφούν σε component tokens
 * Παρέχει έτοιμες συνταγές για διαφορετικούς τύπους badges/chips
 */

import { BADGE_VARIABLES } from './badges.variables';

// DEFAULT BADGE VARIANTS - Βασικά badges για κείμενο
export const BADGE_DEFAULT_VARIANTS = {
  // Default badge
  default: {
    background: BADGE_VARIABLES['badge-background'],
    color: BADGE_VARIABLES['badge-text-color'],
    border: BADGE_VARIABLES['badge-border'],
    borderRadius: BADGE_VARIABLES['badge-border-radius'],
    transition: BADGE_VARIABLES['badge-transition'],
    usage: 'Basic text badges for labels and tags',
  },

  // Default badge states
  hover: {
    background: BADGE_VARIABLES['badge-background-hover'],
    color: BADGE_VARIABLES['badge-text-hover'],
    border: BADGE_VARIABLES['badge-border-hover'],
    shadow: BADGE_VARIABLES['badge-shadow-hover'],
    usage: 'Badge hover state for interactive badges',
  },

  active: {
    background: BADGE_VARIABLES['badge-background-active'],
    color: BADGE_VARIABLES['badge-text-active'],
    border: BADGE_VARIABLES['badge-border-active'],
    usage: 'Badge active/pressed state',
  },

  disabled: {
    background: BADGE_VARIABLES['badge-background-disabled'],
    color: BADGE_VARIABLES['badge-text-disabled'],
    border: BADGE_VARIABLES['badge-border-disabled'],
    usage: 'Badge disabled state',
  },
} as const;

// SUCCESS BADGE VARIANTS - Για επιτυχή actions/states
export const BADGE_SUCCESS_VARIANTS = {
  default: {
    background: BADGE_VARIABLES['badge-success-background'],
    color: BADGE_VARIABLES['badge-success-color'],
    border: BADGE_VARIABLES['badge-success-border'],
    borderRadius: BADGE_VARIABLES['badge-border-radius'],
    usage: 'Success badges για completed/approved states',
  },

  // Success με διαφορετικά sizes
  sm: {
    background: BADGE_VARIABLES['badge-success-background'],
    color: BADGE_VARIABLES['badge-success-color'],
    border: BADGE_VARIABLES['badge-success-border'],
    padding: BADGE_VARIABLES['badge-sm-padding'],
    fontSize: BADGE_VARIABLES['badge-sm-font-size'],
    usage: 'Small success badges',
  },

  lg: {
    background: BADGE_VARIABLES['badge-success-background'],
    color: BADGE_VARIABLES['badge-success-color'],
    border: BADGE_VARIABLES['badge-success-border'],
    padding: BADGE_VARIABLES['badge-lg-padding'],
    fontSize: BADGE_VARIABLES['badge-lg-font-size'],
    usage: 'Large success badges',
  },
} as const;

// ERROR BADGE VARIANTS - Για errors/failures
export const BADGE_ERROR_VARIANTS = {
  default: {
    background: BADGE_VARIABLES['badge-error-background'],
    color: BADGE_VARIABLES['badge-error-color'],
    border: BADGE_VARIABLES['badge-error-border'],
    borderRadius: BADGE_VARIABLES['badge-border-radius'],
    usage: 'Error badges για failed/rejected states',
  },

  sm: {
    background: BADGE_VARIABLES['badge-error-background'],
    color: BADGE_VARIABLES['badge-error-color'],
    padding: BADGE_VARIABLES['badge-sm-padding'],
    fontSize: BADGE_VARIABLES['badge-sm-font-size'],
    usage: 'Small error badges',
  },

  lg: {
    background: BADGE_VARIABLES['badge-error-background'],
    color: BADGE_VARIABLES['badge-error-color'],
    padding: BADGE_VARIABLES['badge-lg-padding'],
    fontSize: BADGE_VARIABLES['badge-lg-font-size'],
    usage: 'Large error badges',
  },
} as const;

// WARNING BADGE VARIANTS - Για warnings/cautions
export const BADGE_WARNING_VARIANTS = {
  default: {
    background: BADGE_VARIABLES['badge-warning-background'],
    color: BADGE_VARIABLES['badge-warning-color'],
    border: BADGE_VARIABLES['badge-warning-border'],
    borderRadius: BADGE_VARIABLES['badge-border-radius'],
    usage: 'Warning badges για attention-needed states',
  },

  sm: {
    background: BADGE_VARIABLES['badge-warning-background'],
    color: BADGE_VARIABLES['badge-warning-color'],
    padding: BADGE_VARIABLES['badge-sm-padding'],
    fontSize: BADGE_VARIABLES['badge-sm-font-size'],
    usage: 'Small warning badges',
  },
} as const;

// INFO BADGE VARIANTS - Για πληροφοριακά badges
export const BADGE_INFO_VARIANTS = {
  default: {
    background: BADGE_VARIABLES['badge-info-background'],
    color: BADGE_VARIABLES['badge-info-color'],
    border: BADGE_VARIABLES['badge-info-border'],
    borderRadius: BADGE_VARIABLES['badge-border-radius'],
    usage: 'Info badges για informational content',
  },

  secondary: {
    background: BADGE_VARIABLES['badge-secondary-background'],
    color: BADGE_VARIABLES['badge-secondary-color'],
    border: BADGE_VARIABLES['badge-secondary-border'],
    borderRadius: BADGE_VARIABLES['badge-border-radius'],
    usage: 'Secondary info badges με muted styling',
  },
} as const;

// PRIMARY BADGE VARIANTS - Για highlighted content
export const BADGE_PRIMARY_VARIANTS = {
  default: {
    background: BADGE_VARIABLES['badge-primary-background'],
    color: BADGE_VARIABLES['badge-primary-color'],
    border: BADGE_VARIABLES['badge-primary-border'],
    borderRadius: BADGE_VARIABLES['badge-border-radius'],
    usage: 'Primary badges για important highlights',
  },

  interactive: {
    background: BADGE_VARIABLES['badge-primary-background'],
    color: BADGE_VARIABLES['badge-primary-color'],
    border: BADGE_VARIABLES['badge-primary-border'],
    cursor: BADGE_VARIABLES['interactive-badge-cursor'],
    transition: BADGE_VARIABLES['badge-transition'],
    usage: 'Interactive primary badges με hover effects',
  },
} as const;

// CHIP VARIANTS - Larger, interactive badges
export const CHIP_VARIANTS = {
  // Default chip
  default: {
    height: BADGE_VARIABLES['chip-height'],
    padding: BADGE_VARIABLES['chip-padding'],
    fontSize: BADGE_VARIABLES['chip-font-size'],
    fontWeight: BADGE_VARIABLES['chip-font-weight'],
    borderRadius: BADGE_VARIABLES['chip-border-radius'],
    gap: BADGE_VARIABLES['chip-gap'],
    background: BADGE_VARIABLES['badge-background'],
    color: BADGE_VARIABLES['badge-text-color'],
    usage: 'Default interactive chips',
  },

  // Chip με close button
  withClose: {
    height: BADGE_VARIABLES['chip-height'],
    padding: BADGE_VARIABLES['chip-padding'],
    fontSize: BADGE_VARIABLES['chip-font-size'],
    borderRadius: BADGE_VARIABLES['chip-border-radius'],
    gap: BADGE_VARIABLES['chip-gap'],
    background: BADGE_VARIABLES['badge-background'],
    color: BADGE_VARIABLES['badge-text-color'],
    closeSize: BADGE_VARIABLES['chip-close-size'],
    closeColor: BADGE_VARIABLES['chip-close-color'],
    usage: 'Chips με removable functionality',
  },

  // Chip με avatar/icon
  withIcon: {
    height: BADGE_VARIABLES['chip-height'],
    padding: BADGE_VARIABLES['chip-padding'],
    fontSize: BADGE_VARIABLES['chip-font-size'],
    borderRadius: BADGE_VARIABLES['chip-border-radius'],
    gap: BADGE_VARIABLES['chip-gap'],
    background: BADGE_VARIABLES['badge-background'],
    color: BADGE_VARIABLES['badge-text-color'],
    iconSize: BADGE_VARIABLES['chip-icon-size'],
    avatarSize: BADGE_VARIABLES['chip-avatar-size'],
    usage: 'Chips με icon ή avatar',
  },
} as const;

// DOT INDICATOR VARIANTS - Μικρά dot badges
export const DOT_VARIANTS = {
  default: {
    size: BADGE_VARIABLES['dot-size'],
    margin: BADGE_VARIABLES['dot-margin'],
    background: BADGE_VARIABLES['dot-background'],
    borderRadius: BADGE_VARIABLES['badge-border-radius'],
    usage: 'Simple dot indicators',
  },

  status: {
    online: {
      size: BADGE_VARIABLES['dot-size'],
      background: BADGE_VARIABLES['status-online-background'],
      borderRadius: BADGE_VARIABLES['badge-border-radius'],
      usage: 'Online status dot',
    },

    offline: {
      size: BADGE_VARIABLES['dot-size'],
      background: BADGE_VARIABLES['status-offline-background'],
      borderRadius: BADGE_VARIABLES['badge-border-radius'],
      usage: 'Offline status dot',
    },

    away: {
      size: BADGE_VARIABLES['dot-size'],
      background: BADGE_VARIABLES['status-away-background'],
      borderRadius: BADGE_VARIABLES['badge-border-radius'],
      usage: 'Away status dot',
    },

    busy: {
      size: BADGE_VARIABLES['dot-size'],
      background: BADGE_VARIABLES['status-busy-background'],
      borderRadius: BADGE_VARIABLES['badge-border-radius'],
      usage: 'Busy status dot',
    },
  },
} as const;

// NOTIFICATION BADGE VARIANTS - Για notifications/counts
export const NOTIFICATION_BADGE_VARIANTS = {
  default: {
    size: BADGE_VARIABLES['notification-badge-size'],
    fontSize: BADGE_VARIABLES['notification-badge-font-size'],
    background: BADGE_VARIABLES['notification-badge-background'],
    color: BADGE_VARIABLES['notification-badge-color'],
    border: BADGE_VARIABLES['notification-badge-border'],
    borderRadius: BADGE_VARIABLES['badge-border-radius'],
    shadow: BADGE_VARIABLES['notification-badge-shadow'],
    usage: 'Notification count badges',
  },

  count: {
    minWidth: BADGE_VARIABLES['count-badge-min-width'],
    fontSize: BADGE_VARIABLES['notification-badge-font-size'],
    background: BADGE_VARIABLES['notification-badge-background'],
    color: BADGE_VARIABLES['notification-badge-color'],
    borderRadius: BADGE_VARIABLES['badge-border-radius'],
    overflow: BADGE_VARIABLES['count-badge-overflow-text'],
    usage: 'Count badges με overflow handling',
  },
} as const;

// SIZE VARIANTS - Για διαφορετικά μεγέθη
export const BADGE_SIZE_VARIANTS = {
  xs: {
    height: BADGE_VARIABLES['badge-xs-height'],
    padding: BADGE_VARIABLES['badge-xs-padding'],
    fontSize: BADGE_VARIABLES['badge-xs-font-size'],
    lineHeight: BADGE_VARIABLES['badge-xs-line-height'],
    usage: 'Extra small badges',
  },

  sm: {
    height: BADGE_VARIABLES['badge-sm-height'],
    padding: BADGE_VARIABLES['badge-sm-padding'],
    fontSize: BADGE_VARIABLES['badge-sm-font-size'],
    lineHeight: BADGE_VARIABLES['badge-sm-line-height'],
    usage: 'Small badges',
  },

  md: {
    height: BADGE_VARIABLES['badge-md-height'],
    padding: BADGE_VARIABLES['badge-md-padding'],
    fontSize: BADGE_VARIABLES['badge-md-font-size'],
    lineHeight: BADGE_VARIABLES['badge-md-line-height'],
    usage: 'Medium badges (default)',
  },

  lg: {
    height: BADGE_VARIABLES['badge-lg-height'],
    padding: BADGE_VARIABLES['badge-lg-padding'],
    fontSize: BADGE_VARIABLES['badge-lg-font-size'],
    lineHeight: BADGE_VARIABLES['badge-lg-line-height'],
    usage: 'Large badges',
  },
} as const;

// MASTER BADGE VARIANTS - Όλα τα variants μαζί
export const BADGE_VARIANTS = {
  default: BADGE_DEFAULT_VARIANTS,
  success: BADGE_SUCCESS_VARIANTS,
  error: BADGE_ERROR_VARIANTS,
  warning: BADGE_WARNING_VARIANTS,
  info: BADGE_INFO_VARIANTS,
  primary: BADGE_PRIMARY_VARIANTS,
  chip: CHIP_VARIANTS,
  dot: DOT_VARIANTS,
  notification: NOTIFICATION_BADGE_VARIANTS,
  size: BADGE_SIZE_VARIANTS,
} as const;

// Helper types για type safety
export type BadgeVariantType = keyof typeof BADGE_VARIANTS;
export type BadgeDefaultVariant = keyof typeof BADGE_DEFAULT_VARIANTS;
export type BadgeSuccessVariant = keyof typeof BADGE_SUCCESS_VARIANTS;
export type BadgeErrorVariant = keyof typeof BADGE_ERROR_VARIANTS;
export type ChipVariant = keyof typeof CHIP_VARIANTS;
export type DotVariant = keyof typeof DOT_VARIANTS;
export type NotificationVariant = keyof typeof NOTIFICATION_BADGE_VARIANTS;
export type BadgeSizeVariant = keyof typeof BADGE_SIZE_VARIANTS;