/**
 * 📐 LAYERA DIMENSIONS CLASS - Shared dimension types and structure
 *
 * Defines the type structure for shared dimensions, transforms, and geometric values
 * Foundation για rotations, scales, translations, και άλλα shared dimensions
 */

// TRANSFORM TYPES - CSS transform values
export interface DimensionTransforms {
  rotate: {
    zero: string;
    quarter: string;
    half: string;
    full: string;
  };
  scale: {
    zero: string;
    quarter: string;
    half: string;
    normal: string;
    double: string;
  };
  translate: {
    zero: string;
    quarter: string;
    half: string;
    full: string;
  };
}

// PERCENTAGE TYPES - Percentage-based dimensions
export interface DimensionPercentages {
  zero: string;
  quarter: string;
  half: string;
  threeQuarter: string;
  full: string;
}

// VIEWPORT TYPES - Viewport-relative dimensions
export interface DimensionViewport {
  width: {
    quarter: string;
    half: string;
    threeQuarter: string;
    full: string;
  };
  height: {
    quarter: string;
    half: string;
    threeQuarter: string;
    full: string;
  };
}

// SHARED VALUES - Common shared dimension values
export interface DimensionShared {
  transparent: string;
  inherit: string;
  auto: string;
  none: string;
  initial: string;
  unset: string;
}

// CONSOLIDATED DIMENSIONS CLASS - Complete dimension system
export interface DimensionsTokensClass {
  transforms: DimensionTransforms;
  percentages: DimensionPercentages;
  viewport: DimensionViewport;
  shared: DimensionShared;

  // System properties
  namespace: string;
  version: string;
  accessibility: boolean;
}

// Helper types για type safety
export type TransformRotation = keyof DimensionTransforms['rotate'];
export type TransformScale = keyof DimensionTransforms['scale'];
export type TransformTranslate = keyof DimensionTransforms['translate'];
export type PercentageValue = keyof DimensionPercentages;
export type ViewportWidth = keyof DimensionViewport['width'];
export type ViewportHeight = keyof DimensionViewport['height'];
export type SharedValue = keyof DimensionShared;