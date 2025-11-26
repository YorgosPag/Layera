/**
 * 📏 LAYERA SPACING VARIANTS - Semantic spacing meanings
 *
 * Maps spacing scale to meaningful contexts.
 * These variants provide semantic naming for common spacing patterns.
 *
 * Enterprise Standards:
 * - Semantic naming over numeric values
 * - Consistent patterns across components
 * - Easy to understand and maintain
 */

import type { SpacingVariants, SpacingSize, SpacingDirection } from './spacing.class';

// Semantic spacing variants for different contexts
export const SPACING_VARIANTS: SpacingVariants = {
  micro: '4px',     // Fine details: icon gaps, border spacing
  small: '8px',     // Component internals: button padding, input spacing
  medium: '16px',   // Standard spacing: card padding, section gaps
  large: '32px',    // Layout spacing: between sections, major components
  macro: '64px',    // Page layout: hero sections, major divisions
} as const;

// Context-specific spacing for different use cases
export const SPACING_CONTEXTS = {
  // Component-level spacing
  component: {
    tight: '4px',      // Tightly packed elements
    comfortable: '8px', // Standard component spacing
    relaxed: '16px',   // Spacious component layout
    loose: '24px',     // Very spacious layout
  },

  // Layout-level spacing
  layout: {
    section: '32px',   // Between major sections
    container: '48px', // Container padding
    hero: '64px',      // Hero section spacing
    page: '96px',      // Page-level margins
  },

  // Interactive element spacing
  interactive: {
    touch: '44px',     // Minimum touch target size
    button: '12px',    // Internal button spacing
    input: '8px',      // Input field internal padding
    form: '16px',      // Between form elements
  },

  // Content spacing
  content: {
    text: '4px',       // Between text elements
    paragraph: '16px', // Between paragraphs
    heading: '24px',   // Around headings
    media: '32px',     // Around images/media
  },
} as const;

// Responsive spacing modifiers
export const SPACING_RESPONSIVE = {
  mobile: {
    micro: '2px',
    small: '6px',
    medium: '12px',
    large: '24px',
    macro: '48px',
  },
  tablet: {
    micro: '3px',
    small: '7px',
    medium: '14px',
    large: '28px',
    macro: '56px',
  },
  desktop: {
    micro: '4px',
    small: '8px',
    medium: '16px',
    large: '32px',
    macro: '64px',
  },
} as const;

// Component-specific spacing patterns
export const COMPONENT_SPACING = {
  card: {
    padding: 'medium',    // 16px internal padding
    margin: 'small',      // 8px between cards
    gap: 'large',         // 32px between card groups
  },
  button: {
    padding: 'small',     // 8px internal padding
    margin: 'micro',      // 4px between buttons
    gap: 'medium',        // 16px between button groups
  },
  modal: {
    padding: 'large',     // 32px internal padding
    margin: 'medium',     // 16px from edges
    backdrop: 'macro',    // 64px overlay spacing
  },
} as const;

// Export types for TypeScript usage
export type SpacingContext = keyof typeof SPACING_CONTEXTS;
export type SpacingResponsive = keyof typeof SPACING_RESPONSIVE;
export type ComponentSpacing = keyof typeof COMPONENT_SPACING;