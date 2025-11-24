/**
 * 📝 TYPOGRAPHY TOKENS - Font System
 *
 * Αντίστοιχα με τα typography controls από το FullAppPreview_Mockup.html:
 * - Font Family: Arial, Segoe UI, Roboto
 * - Font Size: 12-24px (default: 16px)
 * - Header Size: 18-36px (default: 24px)
 * - Font Weight: 300, 400, 500, 600, 700
 * - Line Height: 1-2 (default: 1.5)
 * - Button Font Size: 10-20px (default: 14px)
 *
 * Υποστηρίζει live updates μέσω CSS Variables
 */

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎯 TYPOGRAPHY DEFINITIONS - Από HTML mockup
// ═══════════════════════════════════════════════════════════════════════════════════════

export const LAYERA_CORE_TYPOGRAPHY = {
  // Font families από HTML mockup select options
  fontFamily: {
    arial: 'Arial, sans-serif',
    segoeui: "'Segoe UI', sans-serif",
    roboto: "'Roboto', sans-serif",
    inter: "'Inter', sans-serif",
    system: 'system-ui, -apple-system, sans-serif'
  },

  // Font sizes με controls από HTML mockup
  fontSize: {
    // General font size (data-control="font-size")
    general: {
      min: 12,
      max: 24,
      default: 16,
      unit: 'px'
    },

    // Header size (data-control="header-size")
    headers: {
      min: 18,
      max: 36,
      default: 24,
      unit: 'px'
    },

    // Button font size (data-control="button-font-size")
    buttons: {
      min: 10,
      max: 20,
      default: 14,
      unit: 'px'
    }
  },

  // Font weights από HTML mockup select options
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700'
  },

  // Line height control (data-control="line-height")
  lineHeight: {
    min: 1.0,
    max: 2.0,
    default: 1.5,
    step: 0.1
  }
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🔄 LIVE TYPOGRAPHY VARIABLES - CSS Custom Properties για real-time updates
// ═══════════════════════════════════════════════════════════════════════════════════════

export const LAYERA_LIVE_TYPOGRAPHY_VARS = {
  // Live typography variables που χρησιμοποιούν τα updateFont* functions
  liveTypography: {
    '--live-font-family': LAYERA_CORE_TYPOGRAPHY.fontFamily.system,
    '--live-font-size': `${LAYERA_CORE_TYPOGRAPHY.fontSize.general.default}px`,
    '--live-header-size': `${LAYERA_CORE_TYPOGRAPHY.fontSize.headers.default}px`,
    '--live-button-font-size': `${LAYERA_CORE_TYPOGRAPHY.fontSize.buttons.default}px`,
    '--live-font-weight': LAYERA_CORE_TYPOGRAPHY.fontWeight.normal,
    '--live-line-height': LAYERA_CORE_TYPOGRAPHY.lineHeight.default.toString(),
    '--live-text-color': '#2c3e50'  // Default από HTML mockup color picker
  },

  // Global typography variables που χρησιμοποιεί το updateFontSize()
  globalTypography: {
    '--global-font-size': `${LAYERA_CORE_TYPOGRAPHY.fontSize.general.default}px`,
    '--global-font-weight': LAYERA_CORE_TYPOGRAPHY.fontWeight.normal
  },

  // Base typography tokens
  baseTypography: {
    '--layera-font-family-sans': LAYERA_CORE_TYPOGRAPHY.fontFamily.system,
    '--layera-font-family-mono': 'Menlo, Monaco, monospace',
    '--layera-font-size-xs': '12px',
    '--layera-font-size-sm': '14px',
    '--layera-font-size-base': '16px',
    '--layera-font-size-lg': '18px',
    '--layera-font-size-xl': '20px',
    '--layera-font-size-2xl': '24px',
    '--layera-font-size-3xl': '30px',
    '--layera-line-height-tight': '1.25',
    '--layera-line-height-normal': '1.5',
    '--layera-line-height-loose': '1.75'
  }
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎯 TYPOGRAPHY UTILITIES - Helper functions
// ═══════════════════════════════════════════════════════════════════════════════════════

export type LayeraFontFamily = keyof typeof LAYERA_CORE_TYPOGRAPHY.fontFamily;
export type LayeraFontWeight = keyof typeof LAYERA_CORE_TYPOGRAPHY.fontWeight;
export type LayeraFontSizeType = 'general' | 'headers' | 'buttons';

/**
 * Παίρνει font family value
 */
export function getLayeraFontFamily(family: LayeraFontFamily): string {
  return LAYERA_CORE_TYPOGRAPHY.fontFamily[family];
}

/**
 * Παίρνει font weight value
 */
export function getLayeraFontWeight(weight: LayeraFontWeight): string {
  return LAYERA_CORE_TYPOGRAPHY.fontWeight[weight];
}

/**
 * Δημιουργεί live typography variable name
 */
export function getLiveTypographyVar(property: string): string {
  return `--live-${property}`;
}

/**
 * Validates font size value within constraints
 */
export function validateFontSize(type: LayeraFontSizeType, value: number): number {
  const constraints = LAYERA_CORE_TYPOGRAPHY.fontSize[type];
  return Math.max(constraints.min, Math.min(constraints.max, value));
}

/**
 * Validates line height value within constraints
 */
export function validateLineHeight(value: number): number {
  const constraints = LAYERA_CORE_TYPOGRAPHY.lineHeight;
  return Math.max(constraints.min, Math.min(constraints.max, value));
}