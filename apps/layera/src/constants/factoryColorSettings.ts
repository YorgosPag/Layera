/**
 * Factory Color Settings - Εργοστασιακές Ρυθμίσεις Χρωμάτων
 *
 * Βασισμένες στα χρώματα των μεγαλύτερων παγκόσμιων Enterprise εταιρειών:
 * - Microsoft, Google, Apple, Amazon, Facebook
 * - Bootstrap 5 & PatternFly Enterprise Standards
 * - WCAG 2.1 AA Accessibility Compliant
 */

export interface ColorVariant {
  name: string;
  hex: string;
  description: string;
  source: string;
}

export interface FactoryColorSettings {
  primary: ColorVariant;
  secondary: ColorVariant;
  success: ColorVariant;
  warning: ColorVariant;
  danger: ColorVariant;
  info: ColorVariant;
  outline: ColorVariant;
}

/**
 * Εργοστασιακές Ρυθμίσεις Χρωμάτων - Enterprise Standard
 * Συνδυάζει τα καλύτερα χρώματα από Microsoft, Google, Bootstrap 5
 */
export const FACTORY_COLOR_SETTINGS: FactoryColorSettings = {
  primary: {
    name: 'Microsoft Blue',
    hex: 'var(--layera-color-semantic-info-primary)', // Microsoft's primary blue - accessible and professional
    description: 'Επαγγελματικό μπλε της Microsoft - κύρια ενέργεια',
    source: 'Microsoft Design System'
  },

  secondary: {
    name: 'Apple Gray',
    hex: 'var(--layera-color-semantic-neutral-dark)', // Bootstrap 5 secondary + Apple's neutral
    description: 'Ουδέτερο γκρι για δευτερεύουσες ενέργειες',
    source: 'Bootstrap 5 + Apple Design'
  },

  success: {
    name: 'Google Green',
    hex: 'var(--layera-color-semantic-success-primary)', // Google's green - universally recognized for success
    description: 'Πράσινο επιτυχίας - επιβεβαίωση ενεργειών',
    source: 'Google Material Design'
  },

  warning: {
    name: 'Amazon Orange',
    hex: 'var(--layera-color-semantic-warning-primary)', // Amazon's signature orange - attention-grabbing
    description: 'Πορτοκαλί προσοχής - προειδοποιήσεις',
    source: 'Amazon Brand Guidelines'
  },

  danger: {
    name: 'Bootstrap Red',
    hex: 'var(--layera-color-semantic-error-primary)', // Bootstrap 5 danger - WCAG compliant red
    description: 'Κόκκινο κινδύνου - σφάλματα και διαγραφές',
    source: 'Bootstrap 5 Design System'
  },

  info: {
    name: 'Facebook Blue',
    hex: 'var(--layera-color-semantic-info-primary)', // Facebook's current blue - informational
    description: 'Ανοικτό μπλε για πληροφορίες',
    source: 'Facebook Brand Guidelines'
  },

  outline: {
    name: 'Enterprise Gray',
    hex: 'var(--layera-color-semantic-neutral-light)', // Light gray for outlines - subtle and accessible
    description: 'Ανοικτό γκρι για περιγράμματα',
    source: 'Bootstrap 5 + Enterprise Standards'
  }
};

/**
 * Alternative Enterprise Color Palette - Microsoft-focused
 */
export const MICROSOFT_PALETTE: FactoryColorSettings = {
  primary: {
    name: 'Microsoft Blue',
    hex: 'var(--layera-color-semantic-info-primary)',
    description: 'Κύριο μπλε Microsoft',
    source: 'Microsoft Fluent Design'
  },
  secondary: {
    name: 'Microsoft Gray',
    hex: 'var(--layera-color-semantic-neutral-dark)',
    description: 'Δευτερεύον γκρι Microsoft',
    source: 'Microsoft Fluent Design'
  },
  success: {
    name: 'Microsoft Green',
    hex: 'var(--layera-color-semantic-success-primary)',
    description: 'Πράσινο επιτυχίας Microsoft',
    source: 'Microsoft Fluent Design'
  },
  warning: {
    name: 'Microsoft Yellow',
    hex: 'var(--layera-color-semantic-warning-primary)',
    description: 'Κίτρινο προειδοποίησης Microsoft',
    source: 'Microsoft Fluent Design'
  },
  danger: {
    name: 'Microsoft Red',
    hex: 'var(--layera-color-semantic-error-primary)',
    description: 'Κόκκινο κινδύνου Microsoft',
    source: 'Microsoft Fluent Design'
  },
  info: {
    name: 'Microsoft Light Blue',
    hex: 'var(--layera-color-semantic-info-primary)',
    description: 'Ανοικτό μπλε πληροφοριών Microsoft',
    source: 'Microsoft Fluent Design'
  },
  outline: {
    name: 'Microsoft Border',
    hex: 'var(--layera-color-semantic-neutral-light)',
    description: 'Περίγραμμα Microsoft',
    source: 'Microsoft Fluent Design'
  }
};

/**
 * Google Material Design Palette
 */
export const GOOGLE_PALETTE: FactoryColorSettings = {
  primary: {
    name: 'Google Blue',
    hex: 'var(--layera-color-semantic-info-primary)',
    description: 'Κύριο μπλε Google',
    source: 'Google Material Design'
  },
  secondary: {
    name: 'Google Gray',
    hex: 'var(--layera-color-semantic-neutral-dark)',
    description: 'Δευτερεύον γκρι Google',
    source: 'Google Material Design'
  },
  success: {
    name: 'Google Green',
    hex: 'var(--layera-color-semantic-success-primary)',
    description: 'Πράσινο επιτυχίας Google',
    source: 'Google Material Design'
  },
  warning: {
    name: 'Google Yellow',
    hex: 'var(--layera-color-semantic-warning-primary)',
    description: 'Κίτρινο προειδοποίησης Google',
    source: 'Google Material Design'
  },
  danger: {
    name: 'Google Red',
    hex: 'var(--layera-color-semantic-error-primary)',
    description: 'Κόκκινο κινδύνου Google',
    source: 'Google Material Design'
  },
  info: {
    name: 'Google Cyan',
    hex: 'var(--layera-color-semantic-info-primary)',
    description: 'Cyan πληροφοριών Google',
    source: 'Google Material Design'
  },
  outline: {
    name: 'Google Border',
    hex: 'var(--layera-color-semantic-neutral-light)',
    description: 'Περίγραμμα Google',
    source: 'Google Material Design'
  }
};

/**
 * Available Color Palettes
 */
export const AVAILABLE_PALETTES = {
  enterprise: FACTORY_COLOR_SETTINGS,
  microsoft: MICROSOFT_PALETTE,
  google: GOOGLE_PALETTE
} as const;

export type PaletteType = keyof typeof AVAILABLE_PALETTES;

/**
 * Default palette για την εφαρμογή
 */
export const DEFAULT_PALETTE: PaletteType = 'enterprise';

/**
 * Μετατρέπει FactoryColorSettings σε format που περιμένει η εφαρμογή
 */
export const convertPaletteToAppFormat = (palette: FactoryColorSettings) => {
  return {
    primaryColor: palette.primary.hex,
    secondaryColor: palette.secondary.hex,
    successColor: palette.success.hex,
    warningColor: palette.warning.hex,
    dangerColor: palette.danger.hex,
    infoColor: palette.info.hex,
    outlineColor: palette.outline.hex
  };
};

/**
 * Φορτώνει τις εργοστασιακές ρυθμίσεις
 */
export const loadFactorySettings = (paletteType: PaletteType = DEFAULT_PALETTE) => {
  const palette = AVAILABLE_PALETTES[paletteType];
  return convertPaletteToAppFormat(palette);
};