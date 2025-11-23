/**
 * 🌫️ LAYERA SHADOWS CLASS - Shadow system structure & rules
 *
 * Enterprise class που ορίζει τη δομή και τους κανόνες για το shadow system
 * Χρησιμοποιείται για validation και type safety σε components
 */

import { SHADOW_SCALE } from './shadows.variables';
import { SHADOW_VARIANTS } from './shadows.variants';

// SHADOW SYSTEM CLASS - Enterprise structure
export class ShadowSystem {
  // Core scale
  static readonly shadows = SHADOW_SCALE;

  // Semantic variants
  static readonly variants = SHADOW_VARIANTS;

  // Utility methods για validation
  static isValidShadow(shadow: string): boolean {
    return Object.values(this.shadows).includes(shadow as any);
  }

  // Helper για CSS generation
  static getCSSRule(variant: keyof typeof SHADOW_VARIANTS) {
    const shadowVariant = this.variants[variant];
    return {
      boxShadow: shadowVariant.elevation,
    };
  }

  // Helper για elevation levels
  static getElevationLevel(shadow: string): number {
    const levels = {
      [this.shadows.none]: 0,
      [this.shadows.sm]: 1,
      [this.shadows.md]: 2,
      [this.shadows.lg]: 3,
      [this.shadows.xl]: 4,
      [this.shadows.xxl]: 5,
    };
    return levels[shadow as keyof typeof levels] ?? 0;
  }
}

// SHADOW RULES - Enterprise specifications
export const SHADOW_RULES = {
  // Usage guidelines
  usage: {
    flat: 'Elements flush with surface - no elevation needed',
    raised: 'Slight elevation for interactive elements',
    floating: 'Clear separation from background content',
    overlay: 'Content that sits above main interface',
    modal: 'Full attention-grabbing overlays',
    popup: 'Temporary contextual content',
  },

  // Accessibility guidelines
  accessibility: {
    contrast: 'Shadows should not interfere with text contrast',
    motion: 'Avoid animated shadows for motion-sensitive users',
    visibility: 'Ensure shadows work in both light and dark themes',
  },

  // Component mapping suggestions
  componentMapping: {
    buttons: ['flat', 'raised'],
    cards: ['raised', 'floating'],
    dropdowns: ['floating', 'overlay'],
    modals: ['overlay', 'modal'],
    tooltips: ['floating'],
    menus: ['overlay', 'popup'],
  },
} as const;