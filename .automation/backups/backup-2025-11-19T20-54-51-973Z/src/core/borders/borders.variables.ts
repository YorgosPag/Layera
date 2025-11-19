/**
 * 🔲 LAYERA BORDERS VARIABLES - Core border system tokens
 *
 * Enterprise Foundation Tokens για borders και border-radius
 * Single source of truth για όλα τα border values
 */

// BORDER WIDTH SCALE - Progressive border widths
export const BORDER_WIDTH_SCALE = {
  0: '0px',
  1: '1px',
  2: '2px',
  3: '3px',
  4: '4px',
  8: '8px',
} as const;

// BORDER RADIUS SCALE - Progressive border radius values
export const BORDER_RADIUS_SCALE = {
  0: '0px',
  2: '2px',
  4: '4px',
  6: '6px',
  8: '8px',
  12: '12px',
  16: '16px',
  20: '20px',
  24: '24px',
  full: '9999px',
  circle: '50%',          // από GoogleSignInButton.css
  md: '6px',             // από GoogleSignInButton.css (alias for 6px)
} as const;

// BORDER STYLE SCALE - Standard border styles
export const BORDER_STYLE_SCALE = {
  none: 'none',
  solid: 'solid',
  dashed: 'dashed',
  dotted: 'dotted',
} as const;

// UNIFIED BORDERS VARIABLES - CSS Variables για export
export const BORDER_VARIABLES = {
  'border-width-0': BORDER_WIDTH_SCALE[0],
  'border-width-1': BORDER_WIDTH_SCALE[1],
  'border-width-2': BORDER_WIDTH_SCALE[2],
  'border-width-3': BORDER_WIDTH_SCALE[3],
  'border-width-4': BORDER_WIDTH_SCALE[4],
  'border-width-8': BORDER_WIDTH_SCALE[8],

  'border-radius-0': BORDER_RADIUS_SCALE[0],
  'border-radius-2': BORDER_RADIUS_SCALE[2],
  'border-radius-4': BORDER_RADIUS_SCALE[4],
  'border-radius-6': BORDER_RADIUS_SCALE[6],
  'border-radius-8': BORDER_RADIUS_SCALE[8],
  'border-radius-12': BORDER_RADIUS_SCALE[12],
  'border-radius-16': BORDER_RADIUS_SCALE[16],
  'border-radius-20': BORDER_RADIUS_SCALE[20],
  'border-radius-24': BORDER_RADIUS_SCALE[24],
  'border-radius-full': BORDER_RADIUS_SCALE.full,
  'border-radius-circle': BORDER_RADIUS_SCALE.circle,    // από GoogleSignInButton.css
  'border-radius-md': BORDER_RADIUS_SCALE.md,            // από GoogleSignInButton.css

  'border-style-none': BORDER_STYLE_SCALE.none,
  'border-style-solid': BORDER_STYLE_SCALE.solid,
  'border-style-dashed': BORDER_STYLE_SCALE.dashed,
  'border-style-dotted': BORDER_STYLE_SCALE.dotted,
} as const;

// Helper types για type safety
export type BorderWidth = keyof typeof BORDER_WIDTH_SCALE;
export type BorderRadius = keyof typeof BORDER_RADIUS_SCALE;
export type BorderStyle = keyof typeof BORDER_STYLE_SCALE;