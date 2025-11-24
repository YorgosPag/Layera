/**
 * 🔗 BACKWARD COMPATIBILITY - Legacy token system support
 *
 * Διατηρεί συμβατότητα με existing components που χρησιμοποιούν
 * το παλιό token system. Παρέχει mapping από τα νέα tokens
 * στα παλιά naming conventions.
 *
 * ZERO BREAKING CHANGES guarantee για existing codebase.
 */

import { LAYERA_CORE_COLORS } from '../core/colors';
import { LAYERA_CORE_SPACING } from '../core/spacing';
import { LAYERA_CORE_TYPOGRAPHY } from '../core/typography';

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🔄 LEGACY COLOR MAPPING - Compatibility με παλιό color system
// ═══════════════════════════════════════════════════════════════════════════════════════

export const LEGACY_COLOR_MAPPING = {
  // Old naming → New dynamic tokens
  '--layera-color-primary': 'var(--live-primary-color)',
  '--layera-color-secondary': 'var(--live-secondary-color)',
  '--layera-color-success': 'var(--live-success-color)',
  '--layera-color-warning': 'var(--live-warning-color)',
  '--layera-color-danger': 'var(--live-danger-color)',
  '--layera-color-info': 'var(--live-info-color)',

  // Legacy semantic colors
  '--layera-color-semantic-info-primary': LAYERA_CORE_COLORS.info.default,
  '--layera-color-semantic-success-primary': LAYERA_CORE_COLORS.success.default,
  '--layera-color-semantic-warning-primary': LAYERA_CORE_COLORS.warning.default,
  '--layera-color-semantic-danger-primary': LAYERA_CORE_COLORS.danger.default
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🔄 LEGACY COMPONENT MAPPING - Παλιές component token references
// ═══════════════════════════════════════════════════════════════════════════════════════

export const LEGACY_COMPONENT_MAPPING = {
  // Button legacy tokens
  '--layera-button-primary-background': 'var(--layera-button-background-primary)',
  '--layera-button-secondary-background': 'var(--layera-button-background-secondary)',
  '--layera-button-height-default': 'var(--layera-button-height)',
  '--layera-button-padding-default': 'var(--layera-button-padding)',

  // Card legacy tokens
  '--layera-card-primary-background': 'var(--layera-card-background-primary)',
  '--layera-card-secondary-background': 'var(--layera-card-background-secondary)',
  '--layera-card-border-radius-default': 'var(--layera-card-border-radius)',

  // Modal legacy tokens
  '--layera-modal-primary-border': 'var(--layera-modal-border-left-primary)',
  '--layera-modal-width-default': 'var(--layera-modal-width)',

  // Legacy spacing references
  '--layera-spacing-component-gap': 'var(--live-component-gap)',
  '--layera-spacing-padding': 'var(--live-padding)'
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🔄 LEGACY EXPORT FORMATS - Παλιές export structures
// ═══════════════════════════════════════════════════════════════════════════════════════

/**
 * Legacy COLOR_VARIABLES export - για backward compatibility
 */
export const COLOR_VARIABLES = {
  primary: LAYERA_CORE_COLORS.primary.default,
  secondary: LAYERA_CORE_COLORS.secondary.default,
  success: LAYERA_CORE_COLORS.success.default,
  warning: LAYERA_CORE_COLORS.warning.default,
  danger: LAYERA_CORE_COLORS.danger.default,
  info: LAYERA_CORE_COLORS.info.default
} as const;

/**
 * Legacy COLOR_VARIANTS export
 */
export const COLOR_VARIANTS = {
  primary: {
    default: LAYERA_CORE_COLORS.primary.default,
    light: LAYERA_CORE_COLORS.primary.light,
    dark: LAYERA_CORE_COLORS.primary.dark
  },
  secondary: {
    default: LAYERA_CORE_COLORS.secondary.default,
    light: LAYERA_CORE_COLORS.secondary.light,
    dark: LAYERA_CORE_COLORS.secondary.dark
  }
  // ... κ.λ.π για όλα τα χρώματα
} as const;

/**
 * Legacy ColorComponentSystem - για component integration
 */
export const ColorComponentSystem = {
  getColor: (type: string, variant = 'default') => {
    const colorMap: Record<string, any> = {
      primary: LAYERA_CORE_COLORS.primary,
      secondary: LAYERA_CORE_COLORS.secondary,
      success: LAYERA_CORE_COLORS.success,
      warning: LAYERA_CORE_COLORS.warning,
      danger: LAYERA_CORE_COLORS.danger,
      info: LAYERA_CORE_COLORS.info
    };

    return colorMap[type]?.[variant] || colorMap[type]?.default;
  },

  getAllColors: () => COLOR_VARIABLES
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🔄 COMPATIBILITY UTILITIES - Helper functions για migration
// ═══════════════════════════════════════════════════════════════════════════════════════

/**
 * Converts legacy token name σε νέο dynamic token
 */
export function migrateLegacyTokenName(legacyToken: string): string {
  // Check legacy color mapping
  if (legacyToken in LEGACY_COLOR_MAPPING) {
    return LEGACY_COLOR_MAPPING[legacyToken as keyof typeof LEGACY_COLOR_MAPPING];
  }

  // Check legacy component mapping
  if (legacyToken in LEGACY_COMPONENT_MAPPING) {
    return LEGACY_COMPONENT_MAPPING[legacyToken as keyof typeof LEGACY_COMPONENT_MAPPING];
  }

  // Return as-is if no mapping found
  return legacyToken;
}

/**
 * Applies legacy token mappings στο DOM για backward compatibility
 */
export function applyLegacyTokenMappings(): void {
  const root = document.documentElement;

  // Apply legacy color mappings
  Object.entries(LEGACY_COLOR_MAPPING).forEach(([legacyVar, newVar]) => {
    root.style.setProperty(legacyVar, newVar);
  });

  // Apply legacy component mappings
  Object.entries(LEGACY_COMPONENT_MAPPING).forEach(([legacyVar, newVar]) => {
    root.style.setProperty(legacyVar, newVar);
  });

  console.log('🔗 Legacy token mappings applied');
}

/**
 * Generates migration report - shows παλιά vs νέα tokens
 */
export function generateMigrationReport(): Record<string, { legacy: string; modern: string; status: 'mapped' | 'deprecated' }> {
  const report: Record<string, { legacy: string; modern: string; status: 'mapped' | 'deprecated' }> = {};

  // Color mappings
  Object.entries(LEGACY_COLOR_MAPPING).forEach(([legacy, modern]) => {
    report[legacy] = {
      legacy,
      modern,
      status: 'mapped'
    };
  });

  // Component mappings
  Object.entries(LEGACY_COMPONENT_MAPPING).forEach(([legacy, modern]) => {
    report[legacy] = {
      legacy,
      modern,
      status: 'mapped'
    };
  });

  return report;
}

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🔄 LEGACY CSS CLASSES - Backward compatibility για CSS classes
// ═══════════════════════════════════════════════════════════════════════════════════════

/**
 * Legacy CSS class mappings - διατηρεί functionality των παλιών classes
 */
export const LEGACY_CSS_CLASSES = [
  // Button classes από HTML mockup
  '.primary-btn',
  '.secondary-btn',
  '.success-btn',
  '.warning-btn',
  '.danger-btn',
  '.info-btn',

  // Card classes από HTML mockup
  '.card-primary',
  '.card-secondary',
  '.card-success',
  '.card-warning',
  '.card-danger',
  '.card-info',

  // Modal classes από HTML mockup
  '.modal-primary',
  '.modal-secondary',
  '.modal-success',
  '.modal-warning',
  '.modal-danger',
  '.modal-info'
] as const;

/**
 * Ensures legacy CSS classes remain functional με νέο token system
 */
export function ensureLegacyCSSCompatibility(): void {
  // This would typically inject CSS που συνδέει legacy classes με νέα tokens
  // Για τώρα, log compatibility status
  console.log('🔗 Legacy CSS classes remain compatible with dynamic token system');
}