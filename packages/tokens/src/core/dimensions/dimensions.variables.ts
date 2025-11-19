/**
 * 📐 LAYERA DIMENSIONS VARIABLES - Concrete shared dimension values
 *
 * ΜΟΝΑΔΙΚΗ ΠΗΓΗ ΣΚΛΗΡΩΝ ΤΙΜΩΝ για shared dimensions!
 * Όλες οι shared dimension τιμές ορίζονται εδώ και μόνο εδώ.
 *
 * Enterprise Standards:
 * - Standard CSS values για transforms, percentages, viewport units
 * - Shared dimensions για common geometric patterns
 * - Semantic naming για maintainability
 */

import type { DimensionsTokensClass } from './dimensions.class';

// TRANSFORM VALUES - CSS transform concrete values
export const TRANSFORM_VALUES = {
  rotate: {
    zero: '0deg',
    quarter: '90deg',
    half: '180deg',
    full: '360deg',
  },
  scale: {
    zero: '0',
    quarter: '0.25',
    half: '0.5',
    normal: '1',
    double: '2',
  },
  translate: {
    zero: '0',
    quarter: '25%',
    half: '50%',
    full: '100%',
  },
} as const;

// PERCENTAGE VALUES - Standard percentage values
export const PERCENTAGE_VALUES = {
  zero: '0%',
  quarter: '25%',
  half: '50%',
  threeQuarter: '75%',
  full: '100%',
} as const;

// VIEWPORT VALUES - Viewport unit values
export const VIEWPORT_VALUES = {
  width: {
    quarter: '25vw',
    half: '50vw',
    threeQuarter: '75vw',
    full: '100vw',
  },
  height: {
    quarter: '25vh',
    half: '50vh',
    threeQuarter: '75vh',
    full: '100vh',
  },
} as const;

// SHARED VALUES - Common CSS shared values
export const SHARED_VALUES = {
  transparent: 'transparent',
  inherit: 'inherit',
  auto: 'auto',
  none: 'none',
  initial: 'initial',
  unset: 'unset',
} as const;

// CONSOLIDATED DIMENSIONS TOKENS - Ready for CSS generation
export const DIMENSIONS_TOKENS: DimensionsTokensClass = {
  transforms: TRANSFORM_VALUES,
  percentages: PERCENTAGE_VALUES,
  viewport: VIEWPORT_VALUES,
  shared: SHARED_VALUES,

  // System configuration
  namespace: 'layera-shared',
  version: '1.0.0',
  accessibility: true,
} as const;

// CSS VARIABLES για export (από GoogleSignInButton.css)
export const DIMENSIONS_VARIABLES = {
  // Transform values
  'shared-dimensions-zero-degrees': TRANSFORM_VALUES.rotate.zero,
  'shared-dimensions-quarter-rotation': TRANSFORM_VALUES.rotate.quarter,
  'shared-dimensions-half-rotation': TRANSFORM_VALUES.rotate.half,
  'shared-dimensions-full-rotation': TRANSFORM_VALUES.rotate.full,

  // Scale values
  'shared-dimensions-zero-scale': TRANSFORM_VALUES.scale.zero,
  'shared-dimensions-quarter-scale': TRANSFORM_VALUES.scale.quarter,
  'shared-dimensions-half-scale': TRANSFORM_VALUES.scale.half,
  'shared-dimensions-normal-scale': TRANSFORM_VALUES.scale.normal,
  'shared-dimensions-double-scale': TRANSFORM_VALUES.scale.double,

  // Percentage values
  'shared-dimensions-zero-percent': PERCENTAGE_VALUES.zero,
  'shared-dimensions-quarter-percent': PERCENTAGE_VALUES.quarter,
  'shared-dimensions-half-percent': PERCENTAGE_VALUES.half,
  'shared-dimensions-three-quarter-percent': PERCENTAGE_VALUES.threeQuarter,
  'shared-dimensions-full-percent': PERCENTAGE_VALUES.full,

  // Viewport values
  'shared-dimensions-viewport-width': VIEWPORT_VALUES.width.full,
  'shared-dimensions-viewport-height': VIEWPORT_VALUES.height.full,

  // Shared values
  'shared-dimensions-transparent': SHARED_VALUES.transparent,
  'shared-dimensions-auto': SHARED_VALUES.auto,
  'shared-dimensions-none': SHARED_VALUES.none,
} as const;

// Export για χρήση σε άλλα modules
export {
  TRANSFORM_VALUES as TransformValues,
  PERCENTAGE_VALUES as PercentageValues,
  VIEWPORT_VALUES as ViewportValues,
  SHARED_VALUES as SharedValues,
};