/**
 * 🌫️ LAYERA SHADOWS VARIABLES - Core shadow system tokens
 *
 * Enterprise Foundation Tokens για shadows και elevation
 * Single source of truth για όλα τα shadow values
 */

// SHADOW ELEVATION SCALE - Progressive shadow depths
export const SHADOW_SCALE = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  xxl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
} as const;

// UNIFIED SHADOWS VARIABLES - CSS Variables για export
export const SHADOW_VARIABLES = {
  'shadow-none': 'none',
  'shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  'shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  'shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  'shadow-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  'shadow-xxl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
} as const;

// Helper types για type safety
export type ShadowScale = keyof typeof SHADOW_SCALE;