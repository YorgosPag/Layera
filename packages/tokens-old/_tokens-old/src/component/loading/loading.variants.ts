/**
 * ⚡ LAYERA LOADING VARIANTS - Loading component combinations
 *
 * Προκαθορισμένες συνδυασμοί loading tokens για συγκεκριμένες χρήσεις
 * Component-ready loading variants που χαρτογραφούν σε semantic tokens
 */

import { LOADING_VARIABLES } from './loading.variables';

// SPINNER VARIANTS - Different spinner configurations
export const SPINNER_VARIANTS = {
  // Default circular spinner
  default: {
    color: LOADING_VARIABLES['spinner-color'],
    backgroundColor: LOADING_VARIABLES['spinner-background'],
    borderWidth: LOADING_VARIABLES['spinner-border-width'],
    borderRadius: LOADING_VARIABLES['spinner-border-radius'],
    animationDuration: LOADING_VARIABLES['spinner-animation-duration'],
    usage: 'Standard circular spinner',
  },

  // Pulsing dot spinner
  pulse: {
    backgroundColor: LOADING_VARIABLES['spinner-color'],
    animationDuration: LOADING_VARIABLES['pulse-animation-duration'],
    animationEasing: LOADING_VARIABLES['pulse-animation-easing'],
    usage: 'Pulsing dot animation',
  },

  // Three dots spinner
  dots: {
    dotColor: LOADING_VARIABLES['dots-color'],
    dotSize: LOADING_VARIABLES['dots-size'],
    dotGap: LOADING_VARIABLES['dots-gap'],
    animationDuration: LOADING_VARIABLES['dots-animation-duration'],
    usage: 'Three bouncing dots',
  },

  // Wave bars spinner
  wave: {
    barColor: LOADING_VARIABLES['wave-bar-color'],
    barWidth: LOADING_VARIABLES['wave-bar-width'],
    barHeight: LOADING_VARIABLES['wave-bar-height'],
    barGap: LOADING_VARIABLES['wave-bar-gap'],
    animationDuration: LOADING_VARIABLES['wave-animation-duration'],
    usage: 'Wave-like bar animation',
  },

} as const;

// LOADING CONTEXT VARIANTS - Different loading contexts
export const LOADING_CONTEXT_VARIANTS = {
  // Page-level loading
  page: {
    background: LOADING_VARIABLES['loading-overlay-background'],
    textColor: LOADING_VARIABLES['loading-text-color'],
    position: 'fixed',
    zIndex: LOADING_VARIABLES['loading-overlay-z-index'],
    usage: 'Full page loading overlay',
  },

  // Inline loading (within content)
  inline: {
    background: 'transparent',
    textColor: LOADING_VARIABLES['loading-text-color'],
    padding: LOADING_VARIABLES['loading-inline-padding'],
    usage: 'Inline loading within content',
  },

  // Button loading
  button: {
    background: 'transparent',
    textColor: 'currentColor',
    spinnerSize: LOADING_VARIABLES['spinner-sm-size'],
    usage: 'Loading state for buttons',
  },

  // Card loading
  card: {
    background: LOADING_VARIABLES['loading-card-background'],
    shadow: LOADING_VARIABLES['loading-card-shadow'],
    borderRadius: LOADING_VARIABLES['loading-card-border-radius'],
    padding: LOADING_VARIABLES['loading-card-padding'],
    usage: 'Loading state for cards',
  },

  // Overlay loading
  overlay: {
    background: LOADING_VARIABLES['loading-overlay-background'],
    backdropFilter: 'blur(2px)',
    position: 'absolute',
    zIndex: LOADING_VARIABLES['loading-overlay-z-index'],
    usage: 'Loading overlay over content',
  },

} as const;

// SIZE VARIANTS - Different loading sizes
export const LOADING_SIZE_VARIANTS = {
  xs: {
    spinnerSize: LOADING_VARIABLES['spinner-xs-size'],
    borderWidth: LOADING_VARIABLES['spinner-xs-border-width'],
    textSize: LOADING_VARIABLES['loading-xs-text-size'],
    gap: LOADING_VARIABLES['loading-xs-gap'],
    usage: 'Extra small loading indicators',
  },

  sm: {
    spinnerSize: LOADING_VARIABLES['spinner-sm-size'],
    borderWidth: LOADING_VARIABLES['spinner-sm-border-width'],
    textSize: LOADING_VARIABLES['loading-sm-text-size'],
    gap: LOADING_VARIABLES['loading-sm-gap'],
    usage: 'Small loading indicators',
  },

  md: {
    spinnerSize: LOADING_VARIABLES['spinner-md-size'],
    borderWidth: LOADING_VARIABLES['spinner-md-border-width'],
    textSize: LOADING_VARIABLES['loading-md-text-size'],
    gap: LOADING_VARIABLES['loading-md-gap'],
    usage: 'Medium loading indicators',
  },

  lg: {
    spinnerSize: LOADING_VARIABLES['spinner-lg-size'],
    borderWidth: LOADING_VARIABLES['spinner-lg-border-width'],
    textSize: LOADING_VARIABLES['loading-lg-text-size'],
    gap: LOADING_VARIABLES['loading-lg-gap'],
    usage: 'Large loading indicators',
  },

  xl: {
    spinnerSize: LOADING_VARIABLES['spinner-xl-size'],
    borderWidth: LOADING_VARIABLES['spinner-xl-border-width'],
    textSize: LOADING_VARIABLES['loading-xl-text-size'],
    gap: LOADING_VARIABLES['loading-xl-gap'],
    usage: 'Extra large loading indicators',
  },

} as const;

// SKELETON VARIANTS - Skeleton loading states
export const SKELETON_VARIANTS = {
  // Text skeleton
  text: {
    height: LOADING_VARIABLES['skeleton-text-height'],
    borderRadius: LOADING_VARIABLES['skeleton-border-radius'],
    background: LOADING_VARIABLES['skeleton-background'],
    animationDuration: LOADING_VARIABLES['skeleton-animation-duration'],
    usage: 'Text content placeholders',
  },

  // Avatar skeleton
  avatar: {
    size: LOADING_VARIABLES['skeleton-avatar-size'],
    borderRadius: LOADING_VARIABLES['skeleton-avatar-border-radius'],
    background: LOADING_VARIABLES['skeleton-background'],
    usage: 'Avatar placeholders',
  },

  // Card skeleton
  card: {
    height: LOADING_VARIABLES['skeleton-card-height'],
    borderRadius: LOADING_VARIABLES['skeleton-card-border-radius'],
    background: LOADING_VARIABLES['skeleton-background'],
    padding: LOADING_VARIABLES['skeleton-card-padding'],
    usage: 'Card content placeholders',
  },

  // Button skeleton
  button: {
    height: LOADING_VARIABLES['skeleton-button-height'],
    borderRadius: LOADING_VARIABLES['skeleton-button-border-radius'],
    background: LOADING_VARIABLES['skeleton-background'],
    usage: 'Button placeholders',
  },

  // Image skeleton
  image: {
    aspectRatio: LOADING_VARIABLES['skeleton-image-aspect-ratio'],
    borderRadius: LOADING_VARIABLES['skeleton-image-border-radius'],
    background: LOADING_VARIABLES['skeleton-background'],
    usage: 'Image placeholders',
  },

} as const;

// PROGRESS VARIANTS - Progress indicator variants
export const PROGRESS_VARIANTS = {
  // Linear progress
  linear: {
    height: LOADING_VARIABLES['progress-bar-height'],
    background: LOADING_VARIABLES['progress-bar-background'],
    borderRadius: LOADING_VARIABLES['progress-bar-border-radius'],
    fillColor: LOADING_VARIABLES['progress-bar-color'],
    usage: 'Linear progress bars',
  },

  // Circular progress
  circular: {
    strokeWidth: LOADING_VARIABLES['progress-circle-stroke-width'],
    color: LOADING_VARIABLES['progress-circle-color'],
    backgroundColor: LOADING_VARIABLES['progress-circle-background'],
    size: LOADING_VARIABLES['progress-circle-size'],
    usage: 'Circular progress indicators',
  },

  // Indeterminate progress
  indeterminate: {
    background: LOADING_VARIABLES['indeterminate-background'],
    animationDuration: LOADING_VARIABLES['indeterminate-animation-duration'],
    animationEasing: LOADING_VARIABLES['indeterminate-animation-easing'],
    usage: 'Indeterminate progress animation',
  },

} as const;

// SHIMMER VARIANTS - Shimmer effect configurations
export const SHIMMER_VARIANTS = {
  // Default shimmer
  default: {
    background: LOADING_VARIABLES['shimmer-background'],
    animationDuration: LOADING_VARIABLES['shimmer-animation-duration'],
    animationTiming: LOADING_VARIABLES['shimmer-animation-timing'],
    animationIteration: LOADING_VARIABLES['shimmer-animation-iteration'],
    usage: 'Standard shimmer effect',
  },

  // Fast shimmer
  fast: {
    background: LOADING_VARIABLES['shimmer-background'],
    animationDuration: '1s',
    animationTiming: LOADING_VARIABLES['shimmer-animation-timing'],
    animationIteration: LOADING_VARIABLES['shimmer-animation-iteration'],
    usage: 'Fast shimmer animation',
  },

  // Slow shimmer
  slow: {
    background: LOADING_VARIABLES['shimmer-background'],
    animationDuration: '2.5s',
    animationTiming: LOADING_VARIABLES['shimmer-animation-timing'],
    animationIteration: LOADING_VARIABLES['shimmer-animation-iteration'],
    usage: 'Slow shimmer animation',
  },

} as const;

// Helper types
export type SpinnerVariantType = keyof typeof SPINNER_VARIANTS;
export type LoadingContextVariantType = keyof typeof LOADING_CONTEXT_VARIANTS;
export type LoadingSizeVariantType = keyof typeof LOADING_SIZE_VARIANTS;
export type SkeletonVariantType = keyof typeof SKELETON_VARIANTS;
export type ProgressVariantType = keyof typeof PROGRESS_VARIANTS;
export type ShimmerVariantType = keyof typeof SHIMMER_VARIANTS;