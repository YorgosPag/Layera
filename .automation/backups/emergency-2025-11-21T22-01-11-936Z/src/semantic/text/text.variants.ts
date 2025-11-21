/**
 * ✏️ LAYERA TEXT VARIANTS - Semantic text combinations
 *
 * Προκαθορισμένες συνδυασμοί text tokens για συγκεκριμένες χρήσεις
 * Component-ready text variants που χαρτογραφούν σε semantic tokens
 */

import { TEXT_VARIABLES as TEXT_SEMANTIC } from './text.variables';

// SEMANTIC TEXT VARIANTS - Context-based text combinations
export const TEXT_VARIANTS = {
  // Content hierarchy
  heading: {
    primary: TEXT_SEMANTIC['text-primary'],
    secondary: TEXT_SEMANTIC['text-secondary'],
    brand: TEXT_SEMANTIC['text-primary'],
    usage: 'Headings, titles, important content',
  },

  // Body content
  body: {
    primary: TEXT_SEMANTIC['text-primary'],
    secondary: TEXT_SEMANTIC['text-secondary'],
    tertiary: TEXT_SEMANTIC['text-tertiary'],
    usage: 'Body text, descriptions, content',
  },

  // Interactive text
  interactive: {
    link: TEXT_SEMANTIC['text-link'],
    linkHover: TEXT_SEMANTIC['text-link-hover'],
    linkVisited: TEXT_SEMANTIC['text-link-visited'],
    disabled: TEXT_SEMANTIC['text-disabled'],
    usage: 'Links, buttons, interactive elements',
  },

  // Inverted content (for dark backgrounds)
  inverted: {
    onPrimary: TEXT_SEMANTIC['text-on-primary'],
    onDark: TEXT_SEMANTIC['text-on-dark'],
    usage: 'Text on dark or colored backgrounds',
  },

  // Status content
  status: {
    success: TEXT_SEMANTIC['text-success'],
    warning: TEXT_SEMANTIC['text-warning'],
    error: TEXT_SEMANTIC['text-error'],
    info: TEXT_SEMANTIC['text-info'],
    usage: 'Status messages, alerts, feedback',
  },

  // Brand content
  brand: {
    primary: TEXT_SEMANTIC['text-primary'],
    light: TEXT_SEMANTIC['text-secondary'],
    dark: TEXT_SEMANTIC['text-primary'],
    usage: 'Brand content, hero sections, CTAs',
  },

  // Supporting content
  supporting: {
    label: TEXT_SEMANTIC['text-secondary'],
    helper: TEXT_SEMANTIC['text-tertiary'],
    placeholder: TEXT_SEMANTIC['text-disabled'],
    usage: 'Labels, helper text, placeholders',
  },
} as const;

// Helper types
export type TextVariant = keyof typeof TEXT_VARIANTS;