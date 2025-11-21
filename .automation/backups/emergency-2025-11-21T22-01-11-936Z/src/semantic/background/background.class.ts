/**
 * 🎨 LAYERA BACKGROUND CLASS - Background semantic system structure & rules
 *
 * Enterprise class που ορίζει τη δομή και τους κανόνες για το background semantic system
 * Χρησιμοποιείται για validation και type safety σε components
 */

import { BACKGROUND_VARIABLES } from './background.variables';
import { BACKGROUND_VARIANTS } from './background.variants';

// BACKGROUND SEMANTIC SYSTEM CLASS - Enterprise structure
export class BackgroundSemanticSystem {
  // Semantic tokens
  static readonly semantics = BACKGROUND_VARIABLES;
  static readonly variables = BACKGROUND_VARIABLES;

  // Semantic variants
  static readonly variants = BACKGROUND_VARIANTS;

  // Utility methods για validation
  static isValidSemantic(semantic: string): boolean {
    return Object.keys(this.semantics).includes(semantic);
  }

  static isValidVariable(variable: string): boolean {
    return Object.keys(this.variables).includes(variable);
  }

  // Helper για CSS generation
  static getCSSRule(semantic: keyof typeof BACKGROUND_SEMANTIC) {
    return {
      backgroundColor: this.semantics[semantic],
    };
  }

  // Helper για creating semantic backgrounds
  static createBackground(
    semantic: keyof typeof BACKGROUND_SEMANTIC,
    opacity?: number
  ) {
    const color = this.semantics[semantic];
    return opacity ? `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}` : color;
  }

  // Helper για contrast checking
  static getContrastColor(semantic: keyof typeof BACKGROUND_SEMANTIC) {
    const lightBackgrounds = ['default', 'subtle', 'primaryLight', 'secondaryLight', 'success', 'warning', 'info'];
    return lightBackgrounds.includes(semantic) ? 'var(--layera-color-neutral-dark)' : 'var(--layera-color-neutral-white)';
  }
}

// BACKGROUND SEMANTIC RULES - Enterprise specifications
export const BACKGROUND_SEMANTIC_RULES = {
  // Usage guidelines
  usage: {
    primary: 'Hero sections, branded content areas',
    secondary: 'Supporting content, sidebars',
    default: 'Main content backgrounds, cards',
    subtle: 'Subtle emphasis, hover states',
    muted: 'Disabled states, inactive areas',
    interactive: 'Clickable surfaces, interactive elements',
    feedback: 'Status backgrounds, alerts, notifications',
  },

  // Accessibility guidelines
  accessibility: {
    contrast: 'Always ensure sufficient contrast with text colors',
    semanticMeaning: 'Use semantic colors to convey meaning consistently',
    colorBlind: 'Do not rely solely on color to convey information',
    readability: 'Test backgrounds with actual content for readability',
  },

  // Performance guidelines
  performance: {
    cssVariables: 'Use CSS custom properties for dynamic theming',
    caching: 'Background colors are cacheable across components',
    consistency: 'Maintain consistent background usage patterns',
  },

  // Component mapping suggestions
  componentMapping: {
    pages: ['page.primary', 'page.secondary'],
    cards: ['card.default', 'card.elevated'],
    buttons: ['interactive.default', 'interactive.hover'],
    modals: ['overlay.light', 'overlay.medium'],
    alerts: ['feedback.success', 'feedback.warning', 'feedback.error', 'feedback.info'],
  },
} as const;