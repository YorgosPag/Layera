/**
 * 🎨 LAYERA BACKGROUND VARIANTS - Semantic background combinations
 *
 * Προκαθορισμένες συνδυασμοί background tokens για συγκεκριμένες χρήσεις
 * Component-ready background variants που χαρτογραφούν σε semantic tokens
 */

import { BACKGROUND_VARIABLES as BACKGROUND_SEMANTIC } from './background.variables';

// SEMANTIC BACKGROUND VARIANTS - Context-based background combinations
export const BACKGROUND_VARIANTS = {
  // Page contexts
  page: {
    primary: BACKGROUND_SEMANTIC['background-default'],
    secondary: BACKGROUND_SEMANTIC['background-subtle'],
    usage: 'Main page backgrounds, content areas',
  },

  // Card contexts
  card: {
    default: BACKGROUND_SEMANTIC.default,
    elevated: BACKGROUND_SEMANTIC.subtle,
    interactive: BACKGROUND_SEMANTIC.hover,
    usage: 'Card components, elevated surfaces',
  },

  // Interactive contexts
  interactive: {
    default: BACKGROUND_SEMANTIC.default,
    hover: BACKGROUND_SEMANTIC.hover,
    active: BACKGROUND_SEMANTIC.active,
    disabled: BACKGROUND_SEMANTIC.disabled,
    usage: 'Buttons, clickable elements',
  },

  // Brand contexts
  brand: {
    primary: BACKGROUND_SEMANTIC.primary,
    primaryLight: BACKGROUND_SEMANTIC.primaryLight,
    primaryDark: BACKGROUND_SEMANTIC.primaryDark,
    secondary: BACKGROUND_SEMANTIC.secondary,
    usage: 'Brand surfaces, hero sections',
  },

  // Feedback contexts
  feedback: {
    success: BACKGROUND_SEMANTIC.success,
    warning: BACKGROUND_SEMANTIC.warning,
    error: BACKGROUND_SEMANTIC.error,
    info: BACKGROUND_SEMANTIC.info,
    usage: 'Alert backgrounds, status indicators',
  },

  // Overlay contexts
  overlay: {
    light: BACKGROUND_SEMANTIC.subtle,
    medium: BACKGROUND_SEMANTIC.muted,
    usage: 'Modal overlays, dropdown backgrounds',
  },
} as const;

// Helper types
export type BackgroundVariant = keyof typeof BACKGROUND_VARIANTS;