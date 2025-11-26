/**
 * ⚡ LAYERA MOTION VARIANTS - Semantic motion combinations
 *
 * Προκαθορισμένες συνδυασμοί motion tokens για συγκεκριμένες χρήσεις
 * Component-ready motion variants που χαρτογραφούν στο core scale
 */

import { DURATION_SCALE, EASING_SCALE } from './motion.variables';

// SEMANTIC MOTION VARIANTS - Meaning-based motion combinations
export const MOTION_VARIANTS = {
  // Micro-interactions
  microInteraction: {
    duration: DURATION_SCALE.fast,
    easing: EASING_SCALE.easeOut,
    usage: 'Button hovers, small state changes',
  },

  // Standard UI transitions
  uiTransition: {
    duration: DURATION_SCALE.normal,
    easing: EASING_SCALE.standard,
    usage: 'Modal opens, tab switches, dropdowns',
  },

  // Page transitions
  pageTransition: {
    duration: DURATION_SCALE.slow,
    easing: EASING_SCALE.easeInOut,
    usage: 'Route changes, large content shifts',
  },

  // Enter animations
  fadeIn: {
    duration: DURATION_SCALE.normal,
    easing: EASING_SCALE.easeOut,
    usage: 'Content appearing, tooltips',
  },

  // Exit animations
  fadeOut: {
    duration: DURATION_SCALE.fast,
    easing: EASING_SCALE.easeIn,
    usage: 'Content disappearing, notifications',
  },

  // Emphasis animations
  bounce: {
    duration: DURATION_SCALE.slower,
    easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    usage: 'Success states, call-to-action emphasis',
  },

  // Accessibility-friendly (reduced motion)
  reducedMotion: {
    duration: DURATION_SCALE.instant,
    easing: EASING_SCALE.linear,
    usage: 'For users who prefer reduced motion',
  },
} as const;

// Helper types
export type MotionVariant = keyof typeof MOTION_VARIANTS;