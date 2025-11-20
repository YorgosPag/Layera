/**
 * 🌫️ LAYERA SHADOWS VARIANTS - Semantic shadow combinations
 *
 * Προκαθορισμένες συνδυασμοί shadow tokens για συγκεκριμένες χρήσεις
 * Component-ready shadow variants που χαρτογραφούν στο core scale
 */

import { SHADOW_SCALE } from './shadows.variables';

// SEMANTIC SHADOW VARIANTS - Meaning-based shadow combinations
export const SHADOW_VARIANTS = {
  // No elevation
  flat: {
    elevation: SHADOW_SCALE.none,
    usage: 'Buttons flush with surface, flat panels',
  },

  // Subtle elevation
  raised: {
    elevation: SHADOW_SCALE.sm,
    usage: 'Cards, raised buttons, form inputs',
  },

  // Standard elevation
  floating: {
    elevation: SHADOW_SCALE.md,
    usage: 'Dropdowns, tooltips, standard modals',
  },

  // Higher elevation
  overlay: {
    elevation: SHADOW_SCALE.lg,
    usage: 'Dialogs, popovers, drawers',
  },

  // Maximum elevation
  modal: {
    elevation: SHADOW_SCALE.xl,
    usage: 'Full-screen modals, important overlays',
  },

  // Extreme elevation για special cases
  popup: {
    elevation: SHADOW_SCALE.xxl,
    usage: 'Contextual menus, notifications',
  },
} as const;

// Helper types
export type ShadowVariant = keyof typeof SHADOW_VARIANTS;