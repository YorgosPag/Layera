/**
 * 🎨 CORE COLOR TOKENS - 6-Color System
 *
 * Αντίστοιχα με τα χρώματα από το FullAppPreview_Mockup.html:
 * - Primary: #4A90E2 (Ocean Blue)
 * - Secondary: #9013FE (Purple)
 * - Success: #4CAF50 (Green)
 * - Warning: #FF9800 (Orange)
 * - Danger: #F44336 (Red)
 * - Info: #2196F3 (Blue)
 *
 * Υποστηρίζει live theming μέσω CSS Variables
 */

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎯 CORE COLOR DEFINITIONS - Από HTML Mockup
// ═══════════════════════════════════════════════════════════════════════════════════════

export const LAYERA_CORE_COLORS = {
  // Primary color system
  primary: {
    default: '#4A90E2',
    light: '#E3F2FD',
    dark: '#1565C0',
    contrast: '#FFFFFF'
  },

  // Secondary color system
  secondary: {
    default: '#9013FE',
    light: '#F3E5F5',
    dark: '#4A148C',
    contrast: '#FFFFFF'
  },

  // Success color system
  success: {
    default: '#4CAF50',
    light: '#E8F5E8',
    dark: '#2E7D32',
    contrast: '#FFFFFF'
  },

  // Warning color system
  warning: {
    default: '#FF9800',
    light: '#FFF3E0',
    dark: '#E65100',
    contrast: '#000000'
  },

  // Danger color system
  danger: {
    default: '#F44336',
    light: '#FFEBEE',
    dark: '#C62828',
    contrast: '#FFFFFF'
  },

  // Info color system
  info: {
    default: '#2196F3',
    light: '#E1F5FE',
    dark: '#0D47A1',
    contrast: '#FFFFFF'
  }
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🔄 LIVE COLOR VARIABLES - CSS Custom Properties για real-time updates
// ═══════════════════════════════════════════════════════════════════════════════════════

export const LAYERA_LIVE_COLOR_VARS = {
  // Live color variables που χρησιμοποιεί το updateAdvancedColor()
  liveColors: {
    '--live-primary-color': 'var(--layera-color-primary)',
    '--live-secondary-color': 'var(--layera-color-secondary)',
    '--live-success-color': 'var(--layera-color-success)',
    '--live-warning-color': 'var(--layera-color-warning)',
    '--live-danger-color': 'var(--layera-color-danger)',
    '--live-info-color': 'var(--layera-color-info)'
  },

  // Base color tokens
  baseColors: {
    '--layera-color-primary': LAYERA_CORE_COLORS.primary.default,
    '--layera-color-secondary': LAYERA_CORE_COLORS.secondary.default,
    '--layera-color-success': LAYERA_CORE_COLORS.success.default,
    '--layera-color-warning': LAYERA_CORE_COLORS.warning.default,
    '--layera-color-danger': LAYERA_CORE_COLORS.danger.default,
    '--layera-color-info': LAYERA_CORE_COLORS.info.default
  }
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎯 COLOR UTILITIES - Helper functions για component theming
// ═══════════════════════════════════════════════════════════════════════════════════════

export type LayeraColorType = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
export type LayeraColorVariant = 'default' | 'light' | 'dark' | 'contrast';

/**
 * Παίρνει χρώμα από το color system
 */
export function getLayeraColor(type: LayeraColorType, variant: LayeraColorVariant = 'default'): string {
  return LAYERA_CORE_COLORS[type][variant];
}

/**
 * Δημιουργεί live CSS variable name
 */
export function getLiveColorVar(type: LayeraColorType): string {
  return `--live-${type}-color`;
}

/**
 * Παίρνει όλους τους διαθέσιμους τύπους χρωμάτων
 */
export function getColorTypes(): LayeraColorType[] {
  return ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];
}