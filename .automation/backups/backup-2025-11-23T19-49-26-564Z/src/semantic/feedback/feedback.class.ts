/**
 * 🔔 LAYERA FEEDBACK CLASS - Feedback semantic system structure & rules
 *
 * Enterprise class που ορίζει τη δομή και τους κανόνες για το feedback semantic system
 * Χρησιμοποιείται για validation και type safety σε components
 */

import { FEEDBACK_SEMANTIC, FEEDBACK_VARIABLES } from './feedback.variables';
import { FEEDBACK_VARIANTS } from './feedback.variants';

// FEEDBACK SEMANTIC SYSTEM CLASS - Enterprise structure
export class FeedbackSemanticSystem {
  // Semantic tokens
  static readonly semantics = FEEDBACK_SEMANTIC;
  static readonly variables = FEEDBACK_VARIABLES;

  // Semantic variants
  static readonly variants = FEEDBACK_VARIANTS;

  // Utility methods για validation
  static isValidSemantic(semantic: string): boolean {
    return Object.keys(this.semantics).includes(semantic);
  }

  static isValidVariable(variable: string): boolean {
    return Object.keys(this.variables).includes(variable);
  }

  // Helper για CSS generation
  static getCSSRule(semantic: keyof typeof FEEDBACK_SEMANTIC) {
    return {
      color: this.semantics[semantic],
    };
  }

  // Helper για creating feedback styles
  static createFeedbackStyle(
    type: 'success' | 'warning' | 'error' | 'info' | 'neutral'
  ) {
    return {
      color: this.semantics[`${type}Text` as keyof typeof FEEDBACK_SEMANTIC],
      backgroundColor: this.semantics[`${type}Background` as keyof typeof FEEDBACK_SEMANTIC],
      borderColor: this.semantics[`${type}Border` as keyof typeof FEEDBACK_SEMANTIC],
    };
  }

  // Helper για icon colors
  static getIconColor(type: 'success' | 'warning' | 'error' | 'info' | 'neutral') {
    return this.semantics[`${type}Icon` as keyof typeof FEEDBACK_SEMANTIC];
  }

  // Helper για accessibility
  static getAriaAttributes(type: 'success' | 'warning' | 'error' | 'info' | 'neutral') {
    const roleMap = {
      success: 'status',
      warning: 'alert',
      error: 'alert',
      info: 'status',
      neutral: 'status',
    };

    const ariaLiveMap = {
      success: 'polite',
      warning: 'assertive',
      error: 'assertive',
      info: 'polite',
      neutral: 'polite',
    };

    return {
      role: roleMap[type],
      'aria-live': ariaLiveMap[type],
    };
  }
}

// FEEDBACK SEMANTIC RULES - Enterprise specifications
export const FEEDBACK_SEMANTIC_RULES = {
  // Usage guidelines
  usage: {
    success: 'Completion confirmations, successful actions',
    warning: 'Cautionary information, potential issues',
    error: 'Critical errors, validation failures',
    info: 'Helpful information, system messages',
    neutral: 'General messages, neutral information',
  },

  // Accessibility guidelines
  accessibility: {
    contrast: 'Ensure sufficient contrast for all feedback colors',
    semanticMeaning: 'Use consistent color meanings across components',
    ariaAttributes: 'Include appropriate ARIA attributes for screen readers',
    colorBlind: 'Do not rely solely on color to convey feedback meaning',
    announcements: 'Use aria-live for dynamic feedback messages',
  },

  // UX guidelines
  ux: {
    consistency: 'Maintain consistent feedback patterns across the application',
    timing: 'Show feedback immediately after user actions',
    placement: 'Position feedback near relevant content or actions',
    persistence: 'Error messages should persist until resolved',
    clarity: 'Use clear, actionable language in feedback messages',
  },

  // Component mapping suggestions
  componentMapping: {
    alerts: ['alert.success', 'alert.warning', 'alert.error', 'alert.info'],
    badges: ['badge.success', 'badge.warning', 'badge.error', 'badge.info'],
    inputs: ['validation.success', 'validation.error', 'validation.warning'],
    toasts: ['toast.success', 'toast.warning', 'toast.error', 'toast.info'],
    banners: ['alert.warning', 'alert.info', 'alert.error'],
    statusIndicators: ['badge.success', 'badge.error', 'badge.warning'],
  },
} as const;