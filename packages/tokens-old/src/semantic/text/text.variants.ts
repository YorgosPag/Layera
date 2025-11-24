/**
 * ✏️ LAYERA TEXT VARIANTS - Semantic text combinations
 *
 * Προκαθορισμένες συνδυασμοί text tokens για συγκεκριμένες χρήσεις
 * Component-ready text variants που χαρτογραφούν σε semantic tokens
 */

import { TEXT_SEMANTIC } from './text.variables';

// SEMANTIC TEXT VARIANTS - Context-based text combinations
export const TEXT_VARIANTS = {
  // Content hierarchy
  heading: {
    primary: TEXT_SEMANTIC.primary,
    secondary: TEXT_SEMANTIC.secondary,
    brand: TEXT_SEMANTIC.brand,
    usage: 'Headings, titles, important content',
  },

  // Body content
  body: {
    primary: TEXT_SEMANTIC.primary,
    secondary: TEXT_SEMANTIC.secondary,
    tertiary: TEXT_SEMANTIC.tertiary,
    usage: 'Body text, descriptions, content',
  },

  // Interactive text
  interactive: {
    link: TEXT_SEMANTIC.link,
    linkHover: TEXT_SEMANTIC.linkHover,
    linkVisited: TEXT_SEMANTIC.linkVisited,
    disabled: TEXT_SEMANTIC.disabled,
    usage: 'Links, buttons, interactive elements',
  },

  // Inverted content (for dark backgrounds)
  inverted: {
    onPrimary: TEXT_SEMANTIC.onPrimary,
    onDark: TEXT_SEMANTIC.onDark,
    usage: 'Text on dark or colored backgrounds',
  },

  // Status content
  status: {
    success: TEXT_SEMANTIC.success,
    warning: TEXT_SEMANTIC.warning,
    error: TEXT_SEMANTIC.error,
    info: TEXT_SEMANTIC.info,
    usage: 'Status messages, alerts, feedback',
  },

  // Brand content
  brand: {
    primary: TEXT_SEMANTIC.brand,
    light: TEXT_SEMANTIC.brandLight,
    dark: TEXT_SEMANTIC.brandDark,
    usage: 'Brand content, hero sections, CTAs',
  },

  // Supporting content
  supporting: {
    label: TEXT_SEMANTIC.secondary,
    helper: TEXT_SEMANTIC.tertiary,
    placeholder: TEXT_SEMANTIC.disabled,
    usage: 'Labels, helper text, placeholders',
  },
} as const;

// Helper types
export type TextVariant = keyof typeof TEXT_VARIANTS;