/**
 * 🔲 LAYERA BORDER VARIANTS - Semantic border combinations
 *
 * Προκαθορισμένες συνδυασμοί border tokens για συγκεκριμένες χρήσεις
 * Component-ready border variants που χαρτογραφούν σε semantic tokens
 */

import { BORDER_SEMANTIC_VARIABLES as BORDER_SEMANTIC } from './border.variables';

// SEMANTIC BORDER VARIANTS - Context-based border combinations
export const BORDER_VARIANTS = {
  // Input field contexts
  input: {
    default: BORDER_SEMANTIC.default,
    hover: BORDER_SEMANTIC.interactiveHover,
    focus: BORDER_SEMANTIC.focus,
    error: BORDER_SEMANTIC.error,
    disabled: BORDER_SEMANTIC.disabled,
    usage: 'Input fields, form controls',
  },

  // Card contexts
  card: {
    default: BORDER_SEMANTIC.subtle,
    elevated: BORDER_SEMANTIC.default,
    interactive: BORDER_SEMANTIC.interactive,
    usage: 'Card components, content containers',
  },

  // Button contexts
  button: {
    default: BORDER_SEMANTIC.interactive,
    hover: BORDER_SEMANTIC.interactiveHover,
    active: BORDER_SEMANTIC.interactiveActive,
    focus: BORDER_SEMANTIC.focus,
    disabled: BORDER_SEMANTIC.disabled,
    usage: 'Button components, clickable elements',
  },

  // Divider contexts
  divider: {
    subtle: BORDER_SEMANTIC.subtle,
    default: BORDER_SEMANTIC.default,
    strong: BORDER_SEMANTIC.strong,
    usage: 'Separators, section dividers',
  },

  // Status contexts
  status: {
    success: BORDER_SEMANTIC.success,
    warning: BORDER_SEMANTIC.warning,
    error: BORDER_SEMANTIC.error,
    info: BORDER_SEMANTIC.info,
    usage: 'Alert borders, status indicators',
  },

  // Modal contexts
  modal: {
    default: BORDER_SEMANTIC.default,
    elevated: BORDER_SEMANTIC.strong,
    usage: 'Modal borders, overlay containers',
  },

} as const;
n// Alias export για backward compatibility
export const BORDER_SEMANTIC_VARIANTS = BORDER_VARIANTS;

// Helper types
export type BorderVariant = keyof typeof BORDER_VARIANTS;