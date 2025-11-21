/**
 * 🎯 LAYERA ICONS CLASS - Icon system structure & rules
 *
 * Δομή και κανόνες για το icon system
 * Διασφαλίζει consistent sizes, colors, και behavior
 */

import type { IconSize, IconColor } from './icons.variables';

// ICON SYSTEM STRUCTURE
export interface IconSystemProps {
  size?: IconSize;
  color?: IconColor;
  interactive?: boolean;
  disabled?: boolean;
}

// ICON SIZE MAPPING - Χαρτογραφεί sizes σε actual values
export const ICON_SIZE_MAP: Record<IconSize, string> = {
  xs: '1rem',      // 16px - Mobile size
  md: '1.25rem',   // 20px - Default desktop
  lg: '2rem',      // 32px - Large interactive
} as const;

// ICON RULES & BEHAVIORS
export const ICON_RULES = {
  // Default properties
  defaults: {
    size: 'md' as IconSize,
    color: 'neutral' as IconColor,
    interactive: false,
    disabled: false,
  },

  // Size constraints
  sizeConstraints: {
    minimum: 'xs' as IconSize,
    maximum: 'lg' as IconSize,
    responsive: true,
  },

  // Interactive states
  interactiveStates: {
    default: 1.0,    // Full opacity
    hover: 0.8,      // Slight transparency on hover
    active: 0.6,     // More transparency when pressed
    disabled: 0.4,   // Low opacity when disabled
  },

  // Accessibility
  accessibility: {
    minSize: '16px',           // Minimum touch target
    focusRing: '2px solid',    // Focus indicator
    contrastRatio: 4.5,        // WCAG AA compliance
  },
} as const;

// ICON SEMANTIC VARIANTS - Νοηματικές παραλλαγές
export const ICON_SEMANTIC_VARIANTS = {
  // Status icons
  status: {
    success: { color: 'success' as IconColor, size: 'md' as IconSize },
    warning: { color: 'warning' as IconColor, size: 'md' as IconSize },
    error: { color: 'danger' as IconColor, size: 'md' as IconSize },
    info: { color: 'info' as IconColor, size: 'md' as IconColor },
  },

  // Action icons
  action: {
    primary: { color: 'primary' as IconColor, size: 'md' as IconSize, interactive: true },
    secondary: { color: 'secondary' as IconColor, size: 'md' as IconSize, interactive: true },
    neutral: { color: 'neutral' as IconColor, size: 'md' as IconSize, interactive: true },
  },

} as const;

// Type exports
export type IconSystemStructure = typeof ICON_RULES;
export type IconSemanticVariant = keyof typeof ICON_SEMANTIC_VARIANTS;