/**
 * ⚡ LAYERA MOTION CLASS - Motion system structure & rules
 *
 * Enterprise class που ορίζει τη δομή και τους κανόνες για το motion system
 * Χρησιμοποιείται για validation και type safety σε components
 */

import { DURATION_SCALE, EASING_SCALE } from './motion.variables';
import { MOTION_VARIANTS } from './motion.variants';

// MOTION SYSTEM CLASS - Enterprise structure
export class MotionSystem {
  // Core scales
  static readonly durations = DURATION_SCALE;
  static readonly easings = EASING_SCALE;

  // Semantic variants
  static readonly variants = MOTION_VARIANTS;

  // Utility methods για validation
  static isValidDuration(duration: string): boolean {
    return Object.values(this.durations).includes(duration as any);
  }

  static isValidEasing(easing: string): boolean {
    return Object.values(this.easings).includes(easing as any);
  }

  // Helper για CSS generation
  static getCSSRule(variant: keyof typeof MOTION_VARIANTS) {
    const motionVariant = this.variants[variant];
    return {
      transitionDuration: motionVariant.duration,
      transitionTimingFunction: motionVariant.easing,
    };
  }

  // Helper για creating custom transitions
  static createTransition(
    duration: keyof typeof DURATION_SCALE,
    easing: keyof typeof EASING_SCALE = 'standard',
    properties: string[] = ['all']
  ) {
    return `${properties.join(', ')} ${this.durations[duration]} ${this.easings[easing]}`;
  }

  // Helper για reduced motion detection
  static getReducedMotionCSS() {
    return `
      @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `;
  }
}

// MOTION RULES - Enterprise specifications
export const MOTION_RULES = {
  // Usage guidelines
  usage: {
    microInteraction: 'Button hovers, toggles, small feedback',
    uiTransition: 'Standard interface changes, moderate importance',
    pageTransition: 'Route changes, major content shifts',
    fadeIn: 'Content appearing, showing tooltips',
    fadeOut: 'Content disappearing, hiding elements',
    bounce: 'Success confirmations, achievements',
    reducedMotion: 'Accessibility-friendly alternative',
  },

  // Accessibility guidelines
  accessibility: {
    respectPreferences: 'Always respect prefers-reduced-motion setting',
    essentialOnly: 'Never animate essential content without alternatives',
    duration: 'Keep animations under 500ms for accessibility',
    epilepsy: 'Avoid flashing or strobing effects',
  },

  // Performance guidelines
  performance: {
    gpuAccelerated: 'Prefer transforms and opacity for animations',
    avoidLayout: 'Avoid animating width, height, top, left',
    batchChanges: 'Use requestAnimationFrame for complex animations',
    cleanup: 'Always clean up animation listeners',
  },

  // Component mapping suggestions
  componentMapping: {
    buttons: ['microInteraction'],
    modals: ['uiTransition', 'fadeIn', 'fadeOut'],
    dropdowns: ['uiTransition', 'fadeIn'],
    notifications: ['fadeIn', 'fadeOut'],
    pageRoutes: ['pageTransition'],
    successStates: ['bounce'],
    loadingStates: ['uiTransition'],
  },
} as const;