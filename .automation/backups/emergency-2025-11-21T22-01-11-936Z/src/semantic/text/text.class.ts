/**
 * ✏️ LAYERA TEXT CLASS - Text semantic system structure & rules
 *
 * Enterprise class που ορίζει τη δομή και τους κανόνες για το text semantic system
 * Χρησιμοποιείται για validation και type safety σε components
 */

import { TEXT_VARIABLES } from './text.variables';
import { TEXT_VARIANTS } from './text.variants';

// TEXT SEMANTIC SYSTEM CLASS - Enterprise structure
export class TextSemanticSystem {
  // Semantic tokens
  static readonly semantics = TEXT_VARIABLES;
  static readonly variables = TEXT_VARIABLES;

  // Semantic variants
  static readonly variants = TEXT_VARIANTS;

  // Utility methods για validation
  static isValidSemantic(semantic: string): boolean {
    return Object.keys(this.semantics).includes(semantic);
  }

  static isValidVariable(variable: string): boolean {
    return Object.keys(this.variables).includes(variable);
  }

  // Helper για CSS generation
  static getCSSRule(semantic: keyof typeof TEXT_SEMANTIC) {
    return {
      color: this.semantics[semantic],
    };
  }

  // Helper για creating semantic text colors
  static createTextColor(
    semantic: keyof typeof TEXT_SEMANTIC,
    opacity?: number
  ) {
    const color = this.semantics[semantic];
    return opacity ? `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}` : color;
  }

  // Helper για contrast validation
  static validateContrast(
    textSemantic: keyof typeof TEXT_SEMANTIC,
    backgroundSemantic: string
  ) {
    const darkTexts = ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'brand'];
    const lightBackgrounds = ['default', 'subtle', 'primaryLight', 'success', 'warning', 'info'];

    const isDarkText = darkTexts.includes(textSemantic);
    const isLightBackground = lightBackgrounds.some(bg => backgroundSemantic.includes(bg));

    return (isDarkText && isLightBackground) || (!isDarkText && !isLightBackground);
  }
}

// TEXT SEMANTIC RULES - Enterprise specifications
export const TEXT_SEMANTIC_RULES = {
  // Usage guidelines
  usage: {
    primary: 'Main content, headings, important text',
    secondary: 'Supporting content, descriptions',
    tertiary: 'Subtle content, captions',
    disabled: 'Inactive text, disabled states',
    link: 'Hyperlinks, interactive text',
    brand: 'Brand content, CTAs, emphasis',
    status: 'Feedback messages, alerts, notifications',
    inverted: 'Text on dark or colored backgrounds',
  },

  // Accessibility guidelines
  accessibility: {
    contrast: 'Ensure WCAG AA minimum contrast ratio 4.5:1',
    hierarchy: 'Use semantic hierarchy consistently across components',
    colorBlind: 'Do not rely solely on color for information hierarchy',
    readability: 'Test text colors against actual backgrounds',
    focus: 'Ensure sufficient contrast for focus states',
  },

  // Typography guidelines
  typography: {
    hierarchy: 'Primary > Secondary > Tertiary for content hierarchy',
    consistency: 'Use consistent semantic meanings across components',
    emphasis: 'Use brand colors sparingly for emphasis',
    legibility: 'Maintain sufficient contrast in all lighting conditions',
  },

  // Component mapping suggestions
  componentMapping: {
    headings: ['heading.primary', 'heading.brand'],
    body: ['body.primary', 'body.secondary'],
    links: ['interactive.link', 'interactive.linkHover'],
    buttons: ['interactive.link', 'inverted.onPrimary'],
    labels: ['supporting.label'],
    helpers: ['supporting.helper'],
    placeholders: ['supporting.placeholder'],
    alerts: ['status.success', 'status.warning', 'status.error', 'status.info'],
  },
} as const;