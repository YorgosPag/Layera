/**
 * 📊 LAYERA DIMENSIONS VARIANTS - Shared dimension semantic names
 *
 * Semantic variant names για shared dimensions και transforms
 * Maps abstract names to concrete implementations
 */

import type {
  DimensionTransforms,
  DimensionPercentages,
  DimensionViewport,
  DimensionShared
} from './dimensions.class';

// TRANSFORM VARIANTS - CSS transform semantic names
export const TRANSFORM_VARIANTS: DimensionTransforms = {
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

// PERCENTAGE VARIANTS - Common percentage values
export const PERCENTAGE_VARIANTS: DimensionPercentages = {
  zero: '0%',
  quarter: '25%',
  half: '50%',
  threeQuarter: '75%',
  full: '100%',
} as const;

// VIEWPORT VARIANTS - Viewport-relative dimensions
export const VIEWPORT_VARIANTS: DimensionViewport = {
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

// SHARED VARIANTS - Common shared values
export const SHARED_VARIANTS: DimensionShared = {
  transparent: 'transparent',
  inherit: 'inherit',
  auto: 'auto',
  none: 'none',
  initial: 'initial',
  unset: 'unset',
} as const;

// Export για χρήση σε άλλα modules
export {
  TRANSFORM_VARIANTS as TransformVariants,
  PERCENTAGE_VARIANTS as PercentageVariants,
  VIEWPORT_VARIANTS as ViewportVariants,
  SHARED_VARIANTS as SharedVariants,
};