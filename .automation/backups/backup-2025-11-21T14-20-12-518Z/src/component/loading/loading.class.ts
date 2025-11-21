/**
 * ⚡ LAYERA LOADING CLASS - Loading system structure & CSS generation
 *
 * Enterprise class που ορίζει τη δομή και τους κανόνες για το loading system
 * Χρησιμοποιείται για validation, CSS generation και type safety σε components
 */

import { LOADING_VARIABLES } from './loading.variables';
import {
  SPINNER_VARIANTS,
  LOADING_CONTEXT_VARIANTS,
  LOADING_SIZE_VARIANTS,
  SKELETON_VARIANTS,
  PROGRESS_VARIANTS,
  SHIMMER_VARIANTS
} from './loading.variants';

// LOADING SYSTEM CLASS - Enterprise structure
export class LoadingSystem {
  // Loading tokens
  static readonly variables = LOADING_VARIABLES;
  static readonly spinnerVariants = SPINNER_VARIANTS;
  static readonly contextVariants = LOADING_CONTEXT_VARIANTS;
  static readonly sizeVariants = LOADING_SIZE_VARIANTS;
  static readonly skeletonVariants = SKELETON_VARIANTS;
  static readonly progressVariants = PROGRESS_VARIANTS;
  static readonly shimmerVariants = SHIMMER_VARIANTS;

  // Utility methods για validation
  static isValidSpinnerVariant(variant: string): boolean {
    return Object.keys(this.spinnerVariants).includes(variant);
  }

  static isValidContextVariant(variant: string): boolean {
    return Object.keys(this.contextVariants).includes(variant);
  }

  static isValidSize(size: string): boolean {
    return Object.keys(this.sizeVariants).includes(size);
  }

  // Helper για spinner CSS generation
  static getSpinnerCSS(
    variant: keyof typeof SPINNER_VARIANTS,
    size: keyof typeof LOADING_SIZE_VARIANTS = 'md',
    context: keyof typeof LOADING_CONTEXT_VARIANTS = 'inline'
  ) {
    const variantProps = this.spinnerVariants[variant];
    const sizeProps = this.sizeVariants[size];
    const contextProps = this.contextVariants[context];

    return {
      width: sizeProps.spinnerSize,
      height: sizeProps.spinnerSize,
      border: `${sizeProps.borderWidth} solid ${variantProps.color || contextProps.textColor}`,
      borderRadius: variantProps.borderRadius || '50%',
      background: contextProps.background,
      animation: `spin ${variantProps.animationDuration} linear infinite`,
    };
  }

  // Helper για skeleton CSS generation
  static getSkeletonCSS(variant: keyof typeof SKELETON_VARIANTS) {
    const variantProps = this.skeletonVariants[variant];

    return {
      background: variantProps.background,
      borderRadius: variantProps.borderRadius,
      height: variantProps.height || variantProps.size,
      width: variantProps.size || '100%',
      animation: `pulse ${variantProps.animationDuration || '2s'} ease-in-out infinite`,
    };
  }

  // Helper για progress CSS generation
  static getProgressCSS(variant: keyof typeof PROGRESS_VARIANTS) {
    const variantProps = this.progressVariants[variant];

    if (variant === 'linear') {
      return {
        height: variantProps.height,
        background: variantProps.background,
        borderRadius: variantProps.borderRadius,
        '--progress-color': variantProps.fillColor,
      };
    }

    if (variant === 'circular') {
      return {
        width: variantProps.size,
        height: variantProps.size,
        '--stroke-width': variantProps.strokeWidth,
        '--stroke-color': variantProps.color,
        '--stroke-background': variantProps.backgroundColor,
      };
    }

    return {};
  }

  // Helper για context-based loading CSS
  static getLoadingContextCSS(context: keyof typeof LOADING_CONTEXT_VARIANTS) {
    const contextProps = this.contextVariants[context];

    return {
      background: contextProps.background,
      color: contextProps.textColor,
      position: contextProps.position || 'relative',
      zIndex: contextProps.zIndex || 'auto',
      padding: contextProps.padding || '0',
      boxShadow: contextProps.shadow || 'none',
      borderRadius: contextProps.borderRadius || '0',
      backdropFilter: contextProps.backdropFilter || 'none',
    };
  }
}

// LOADING CSS CLASSES - Generated CSS classes για direct usage
export const LAYERA_LOADING_CSS = `
/* ⚡ LAYERA LOADING COMPONENT STYLES */

/* Base Loading Styles */
.layera-loading {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--layera-loading-md-gap);
  color: var(--layera-loading-text-color);
  font-size: var(--layera-loading-md-text-size);
}

.layera-loading__text {
  color: var(--layera-loading-text-color);
  font-size: inherit;
  line-height: 1.4;
}

.layera-loading__description {
  color: var(--layera-loading-text-description);
  font-size: 0.875em;
  margin-top: 0.5em;
}

/* Spinner Styles */
.layera-spinner {
  display: inline-block;
  width: var(--layera-spinner-md-size);
  height: var(--layera-spinner-md-size);
  border: var(--layera-spinner-border-width) solid var(--layera-spinner-color-secondary);
  border-top: var(--layera-spinner-border-width) solid var(--layera-spinner-color);
  border-radius: var(--layera-spinner-border-radius);
  animation: layera-spin var(--layera-spinner-animation-duration) linear infinite;
  will-change: var(--layera-loading-will-change);
}

/* Spinner Sizes */
.layera-spinner--xs {
  width: var(--layera-spinner-xs-size);
  height: var(--layera-spinner-xs-size);
  border-width: var(--layera-spinner-xs-border-width);
}

.layera-spinner--sm {
  width: var(--layera-spinner-sm-size);
  height: var(--layera-spinner-sm-size);
  border-width: var(--layera-spinner-sm-border-width);
}

.layera-spinner--lg {
  width: var(--layera-spinner-lg-size);
  height: var(--layera-spinner-lg-size);
  border-width: var(--layera-spinner-lg-border-width);
}

.layera-spinner--xl {
  width: var(--layera-spinner-xl-size);
  height: var(--layera-spinner-xl-size);
  border-width: var(--layera-spinner-xl-border-width);
}

/* Dots Spinner */
.layera-spinner--dots {
  display: flex;
  gap: var(--layera-dots-gap);
  align-items: center;
}

.layera-spinner--dots::before,
.layera-spinner--dots::after,
.layera-spinner--dots {
  content: "";
  width: var(--layera-dots-size);
  height: var(--layera-dots-size);
  background: var(--layera-dots-color);
  border-radius: 50%;
  animation: layera-bounce var(--layera-dots-animation-duration) ease-in-out infinite;
}

.layera-spinner--dots::before { animation-delay: -0.3s; }
.layera-spinner--dots::after { animation-delay: 0.1s; }

/* Wave Spinner */
.layera-spinner--wave {
  display: flex;
  gap: var(--layera-wave-bar-gap);
  align-items: center;
  height: var(--layera-wave-bar-height);
}

.layera-spinner--wave::before,
.layera-spinner--wave::after,
.layera-spinner--wave {
  content: "";
  width: var(--layera-wave-bar-width);
  height: 100%;
  background: var(--layera-wave-bar-color);
  animation: layera-wave var(--layera-wave-animation-duration) ease-in-out infinite;
}

.layera-spinner--wave::before { animation-delay: -0.4s; }
.layera-spinner--wave::after { animation-delay: 0.2s; }

/* Pulse Spinner */
.layera-spinner--pulse {
  background: var(--layera-spinner-color);
  border: none;
  border-radius: 50%;
  animation: layera-pulse var(--layera-pulse-animation-duration) var(--layera-pulse-animation-easing) infinite;
}

/* Loading Context Variants */
.layera-loading--page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--layera-loading-overlay-background);
  z-index: var(--layera-loading-overlay-z-index);
  flex-direction: column;
}

.layera-loading--overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--layera-loading-overlay-background);
  backdrop-filter: blur(2px);
  z-index: var(--layera-loading-overlay-z-index);
}

.layera-loading--card {
  background: var(--layera-loading-card-background);
  box-shadow: var(--layera-loading-card-shadow);
  border-radius: var(--layera-loading-card-border-radius);
  padding: var(--layera-loading-card-padding);
}

.layera-loading--button {
  color: currentColor;
  font-size: 0;
}

.layera-loading--inline {
  background: transparent;
  padding: var(--layera-loading-inline-padding);
}

/* Skeleton Styles */
.layera-skeleton {
  background: var(--layera-skeleton-background);
  border-radius: var(--layera-skeleton-border-radius);
  animation: layera-pulse var(--layera-skeleton-animation-duration) ease-in-out infinite;
  will-change: var(--layera-loading-will-change);
}

.layera-skeleton--text {
  height: var(--layera-skeleton-text-height);
  width: 100%;
}

.layera-skeleton--avatar {
  width: var(--layera-skeleton-avatar-size);
  height: var(--layera-skeleton-avatar-size);
  border-radius: var(--layera-skeleton-avatar-border-radius);
}

.layera-skeleton--button {
  height: var(--layera-skeleton-button-height);
  border-radius: var(--layera-skeleton-button-border-radius);
}

.layera-skeleton--card {
  height: var(--layera-skeleton-card-height);
  border-radius: var(--layera-skeleton-card-border-radius);
  padding: var(--layera-skeleton-card-padding);
}

.layera-skeleton--image {
  aspect-ratio: var(--layera-skeleton-image-aspect-ratio);
  border-radius: var(--layera-skeleton-image-border-radius);
  width: 100%;
}

/* Progress Styles */
.layera-progress {
  background: var(--layera-progress-bar-background);
  height: var(--layera-progress-bar-height);
  border-radius: var(--layera-progress-bar-border-radius);
  overflow: hidden;
  position: relative;
}

.layera-progress__fill {
  background: var(--layera-progress-bar-color);
  height: 100%;
  transition: width 0.3s ease;
  border-radius: inherit;
}

.layera-progress--indeterminate .layera-progress__fill {
  background: linear-gradient(90deg, transparent, var(--layera-progress-bar-color), transparent);
  background-size: var(--layera-indeterminate-background-size);
  background-position: var(--layera-indeterminate-background-position);
  animation: layera-indeterminate var(--layera-indeterminate-animation-duration) var(--layera-indeterminate-animation-easing) infinite;
  width: 100%;
}

.layera-progress--circular {
  width: var(--layera-progress-circle-size);
  height: var(--layera-progress-circle-size);
  border-radius: 50%;
  background: var(--layera-progress-circle-background);
  position: relative;
}

/* Shimmer Effect */
.layera-shimmer {
  background: var(--layera-skeleton-background);
  background-image: var(--layera-shimmer-background);
  background-size: 200% 100%;
  background-position: -200% 0;
  animation: layera-shimmer var(--layera-shimmer-animation-duration) var(--layera-shimmer-animation-timing) var(--layera-shimmer-animation-iteration);
  will-change: var(--layera-loading-will-change);
}

/* Loading Size Variants */
.layera-loading--xs { font-size: var(--layera-loading-xs-text-size); gap: var(--layera-loading-xs-gap); }
.layera-loading--sm { font-size: var(--layera-loading-sm-text-size); gap: var(--layera-loading-sm-gap); }
.layera-loading--lg { font-size: var(--layera-loading-lg-text-size); gap: var(--layera-loading-lg-gap); }
.layera-loading--xl { font-size: var(--layera-loading-xl-text-size); gap: var(--layera-loading-xl-gap); }

/* Accessibility */
.layera-loading[aria-busy="true"] {
  cursor: wait;
}

.layera-loading__sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Animations */
@keyframes layera-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes layera-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.95); }
}

@keyframes layera-bounce {
  0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
  40% { transform: scale(1); opacity: 1; }
}

@keyframes layera-wave {
  0%, 40%, 100% { transform: scaleY(0.4); }
  20% { transform: scaleY(1); }
}

@keyframes layera-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes layera-indeterminate {
  0% { background-position: var(--layera-indeterminate-background-position); }
  100% { background-position: var(--layera-indeterminate-background-position-end); }
}
`;

// LOADING SEMANTIC RULES - Enterprise specifications
export const LOADING_SEMANTIC_RULES = {
  // Usage guidelines
  usage: {
    spinner: 'Short operations (< 5 seconds), indeterminate progress',
    skeleton: 'Content loading placeholders, preserve layout',
    progress: 'Long operations with determinite progress',
    shimmer: 'Content loading with smooth animation effect',
  },

  // Accessibility guidelines
  accessibility: {
    aria: 'Use aria-busy, aria-live, aria-label attributes',
    screenReader: 'Provide descriptive text for screen readers',
    focus: 'Maintain logical focus management during loading',
    timing: 'Respect user preferences for reduced motion',
  },

  // Performance guidelines
  performance: {
    animations: 'Use will-change and transform for smooth animations',
    gpu: 'Prefer transform and opacity for GPU acceleration',
    debounce: 'Debounce rapid loading state changes',
    cleanup: 'Clean up animations when components unmount',
  },

  // UX guidelines
  ux: {
    feedback: 'Show loading state immediately for operations > 200ms',
    context: 'Match loading style to surrounding content',
    progress: 'Show progress indicators for operations > 5 seconds',
    fallback: 'Provide meaningful fallbacks for failed loads',
  },

} as const;

// Helper types
export type LoadingSystemStructure = typeof LOADING_VARIABLES;
export type SpinnerVariant = keyof typeof SPINNER_VARIANTS;
export type LoadingContextVariant = keyof typeof LOADING_CONTEXT_VARIANTS;