/**
 * 🔲 LAYERA BORDER CLASS - Border semantic system structure & rules
 *
 * Enterprise class που ορίζει τη δομή και τους κανόνες για το border semantic system
 * Χρησιμοποιείται για validation και type safety σε components
 */

import { BORDER_COLOR_SEMANTIC, BORDER_SEMANTIC, BORDER_SEMANTIC_VARIABLES } from './border.variables';
import { BORDER_VARIANTS } from './border.variants';

// BORDER SEMANTIC SYSTEM CLASS - Enterprise structure
export class BorderSemanticSystem {
  // Semantic tokens
  static readonly colorSemantics = BORDER_COLOR_SEMANTIC;
  static readonly semantics = BORDER_SEMANTIC;
  static readonly variables = BORDER_SEMANTIC_VARIABLES;

  // Semantic variants
  static readonly variants = BORDER_VARIANTS;

  // Utility methods για validation
  static isValidColorSemantic(semantic: string): boolean {
    return Object.keys(this.colorSemantics).includes(semantic);
  }

  static isValidSemantic(semantic: string): boolean {
    return Object.keys(this.semantics).includes(semantic);
  }

  static isValidVariable(variable: string): boolean {
    return Object.keys(this.variables).includes(variable);
  }

  // Helper για CSS generation
  static getCSSRule(semantic: keyof typeof BORDER_SEMANTIC) {
    return {
      border: this.semantics[semantic],
    };
  }

  // Helper για creating custom borders
  static createBorder(
    width: '1px' | '2px' | '3px' | '4px',
    style: 'solid' | 'dashed' | 'dotted',
    colorSemantic: keyof typeof BORDER_COLOR_SEMANTIC
  ) {
    return `${width} ${style} ${this.colorSemantics[colorSemantic]}`;
  }

  // Helper για focus ring generation
  static getFocusRing(colorSemantic: keyof typeof BORDER_COLOR_SEMANTIC = 'interactiveFocus') {
    return {
      outline: `2px solid ${this.colorSemantics[colorSemantic]}`,
      outlineOffset: '2px',
    };
  }
}

// BORDER SEMANTIC RULES - Enterprise specifications
export const BORDER_SEMANTIC_RULES = {
  // Usage guidelines
  usage: {
    default: 'Standard borders for containers, dividers',
    subtle: 'Light borders for subtle separation',
    strong: 'Prominent borders for emphasis',
    interactive: 'Borders for clickable elements',
    focus: 'Focus indicators, accessibility borders',
    status: 'Borders for alerts, feedback, validation',
    disabled: 'Borders for inactive elements',
  },

  // Accessibility guidelines
  accessibility: {
    contrast: 'Ensure sufficient contrast with adjacent colors',
    focus: 'Always provide visible focus indicators',
    status: 'Use consistent border patterns for status indication',
    colorBlind: 'Do not rely solely on border color for meaning',
  },

  // Design guidelines
  design: {
    consistency: 'Use consistent border weights across similar components',
    hierarchy: 'Subtle < Default < Strong for visual hierarchy',
    interaction: 'Provide clear visual feedback for interactive states',
    grouping: 'Use borders to create logical content groupings',
  },

  // Component mapping suggestions
  componentMapping: {
    inputs: ['input.default', 'input.focus', 'input.error'],
    buttons: ['button.default', 'button.hover', 'button.active'],
    cards: ['card.default', 'card.elevated'],
    modals: ['modal.default', 'modal.elevated'],
    alerts: ['status.success', 'status.warning', 'status.error', 'status.info'],
    navigation: ['navigation.default', 'navigation.active'],
    dividers: ['divider.subtle', 'divider.default'],
  },
} as const;