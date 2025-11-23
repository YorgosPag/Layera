/**
 * 🔲 LAYERA BORDERS CLASS - Border system structure & rules
 *
 * Enterprise class που ορίζει τη δομή και τους κανόνες για το border system
 * Χρησιμοποιείται για validation και type safety σε components
 */

import { BORDER_WIDTH_SCALE, BORDER_RADIUS_SCALE, BORDER_STYLE_SCALE } from './borders.variables';
import { BORDER_VARIANTS } from './borders.variants';

// BORDER SYSTEM CLASS - Enterprise structure
export class BorderSystem {
  // Core scales
  static readonly widths = BORDER_WIDTH_SCALE;
  static readonly radii = BORDER_RADIUS_SCALE;
  static readonly styles = BORDER_STYLE_SCALE;

  // Semantic variants
  static readonly variants = BORDER_VARIANTS;

  // Utility methods για validation
  static isValidWidth(width: string): boolean {
    return Object.values(this.widths).includes(width as any);
  }

  static isValidRadius(radius: string): boolean {
    return Object.values(this.radii).includes(radius as any);
  }

  static isValidStyle(style: string): boolean {
    return Object.values(this.styles).includes(style as any);
  }

  // Helper για CSS generation
  static getCSSRule(variant: keyof typeof BORDER_VARIANTS) {
    const borderVariant = this.variants[variant];
    return {
      borderWidth: borderVariant.width,
      borderStyle: borderVariant.style,
      borderRadius: borderVariant.radius,
    };
  }
}

// BORDER RULES - Enterprise specifications
export const BORDER_RULES = {
  // Usage guidelines
  usage: {
    subtle: 'For cards, containers with minimal emphasis',
    default: 'Standard borders for inputs, buttons',
    emphasized: 'For highlighted elements, active states',
    strong: 'For error states, critical boundaries',
    focus: 'For focus indicators, accessibility',
    pill: 'For pills, tags, rounded buttons',
  },

  // Accessibility guidelines
  accessibility: {
    minContrastRatio: '3:1', // για border colors
    focusIndicator: 'Πρέπει να έχει visible focus border',
    colorBlindness: 'Δεν βασίζομαι μόνο σε χρώμα για νόημα',
  },

  // Component mapping suggestions
  componentMapping: {
    buttons: ['default', 'focus', 'pill'],
    inputs: ['default', 'focus', 'emphasized'],
    cards: ['subtle', 'default'],
    modals: ['default', 'emphasized'],
    tooltips: ['subtle'],
  },
} as const;