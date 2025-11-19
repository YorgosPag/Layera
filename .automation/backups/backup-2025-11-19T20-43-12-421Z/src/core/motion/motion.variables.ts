/**
 * ⚡ LAYERA MOTION VARIABLES - Core motion system tokens
 *
 * Enterprise Foundation Tokens για transitions, animations και motion
 * Single source of truth για όλα τα motion values
 */

// DURATION SCALE - Progressive animation durations
export const DURATION_SCALE = {
  instant: '0ms',
  fast: '100ms',
  normal: '200ms',
  slow: '300ms',
  slower: '500ms',
  slowest: '750ms',
} as const;

// EASING SCALE - Standard easing functions
export const EASING_SCALE = {
  linear: 'linear',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  // Material Design easing curves
  standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',
} as const;

// UNIFIED MOTION VARIABLES - CSS Variables για export
export const MOTION_VARIABLES = {
  'duration-instant': '0ms',
  'duration-fast': '100ms',
  'duration-normal': '200ms',
  'duration-slow': '300ms',
  'duration-slower': '500ms',
  'duration-slowest': '750ms',

  'easing-linear': 'linear',
  'easing-ease-in': 'ease-in',
  'easing-ease-out': 'ease-out',
  'easing-ease-in-out': 'ease-in-out',
  'easing-standard': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  'easing-decelerate': 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  'easing-accelerate': 'cubic-bezier(0.4, 0.0, 1, 1)',

  'transition-fast': '0.1s ease-out',
  'transition-normal': '0.2s ease-out',
  'transition-slow': '0.3s ease-out',
} as const;

// Helper types για type safety
export type Duration = keyof typeof DURATION_SCALE;
export type Easing = keyof typeof EASING_SCALE;