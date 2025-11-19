/**
 * Colors Variables - Actual Color Values & CSS Variables
 *
 * 🎨 Ορίζει τις πραγματικές χρωματικές τιμές
 * - CSS custom properties references
 * - Συνδέει τα abstract tokens με concrete values
 * - Εξασφαλίζει consistency σε όλο το design system
 *
 * Enterprise Standards:
 * - TypeScript strict mode
 * - React 19.1.1 compatible
 * - ΧΩΡΙΣ σκληρές τιμές - μόνο CSS variable references
 * - Single source of truth για όλες τις χρωματικές τιμές
 */

import type { ColorTokensClass } from './colors.class';

// Foundation Color Values - Σκληρές τιμές επιτρέπονται στα tokens
// Primary Colors - Blue Scale (Material Design inspired)
export const PRIMARY_COLORS = {
  50: '#e3f2fd',
  100: '#bbdefb',
  200: '#90caf9',
  300: '#64b5f6',
  400: '#42a5f5',
  500: '#1976d2',
  600: '#1565c0',
  700: '#0d47a1',
  800: '#0a3d91',
  900: '#063581',
  950: '#042671',
} as const;

// Secondary Colors - Gray Scale
export const SECONDARY_COLORS = {
  50: '#f8fafc',
  100: '#f1f5f9',
  200: '#e2e8f0',
  300: '#cbd5e1',
  400: '#94a3b8',
  500: '#64748b',
  600: '#475569',
  700: '#334155',
  800: '#1e293b',
  900: '#0f172a',
  950: '#020617',
} as const;

// Semantic Colors
export const SEMANTIC_COLORS = {
  success: {
    light: '#81c784',
    main: '#4caf50',
    dark: '#388e3c',
    contrastText: '#ffffff',
  },
  warning: {
    light: '#ffb74d',
    main: '#ff9800',
    dark: '#f57c00',
    contrastText: '#000000',
  },
  error: {
    light: '#e57373',
    main: '#f44336',
    dark: '#d32f2f',
    contrastText: '#ffffff',
  },
  info: {
    light: '#64b5f6',
    main: '#2196f3',
    dark: '#1976d2',
    contrastText: '#ffffff',
  },
} as const;

// Neutral Colors
export const NEUTRAL_COLORS = {
  white: '#ffffff',
  light: '#f8fafc',
  medium: '#64748b',
  dark: '#1e293b',
  black: '#000000',
} as const;

// Surface Colors
export const SURFACE_COLORS = {
  primary: '#ffffff',
  secondary: '#f8fafc',
  tertiary: '#f1f5f9',
  overlay: 'rgba(0, 0, 0, 0.5)',
} as const;

// Text Colors
export const TEXT_COLORS = {
  primary: '#1e293b',
  secondary: '#475569',
  muted: '#64748b',
  inverse: '#ffffff',
} as const;

// Border Colors
export const BORDER_COLORS = {
  light: '#e2e8f0',
  medium: '#cbd5e1',
  dark: '#94a3b8',
  focus: '#1976d2',
} as const;

// Complete Color Tokens Implementation
export const COLOR_VARIABLES: ColorTokensClass = {
  primary: PRIMARY_COLORS,
  secondary: SECONDARY_COLORS,
  success: SEMANTIC_COLORS.success,
  warning: SEMANTIC_COLORS.warning,
  error: SEMANTIC_COLORS.error,
  info: SEMANTIC_COLORS.info,
  neutral: NEUTRAL_COLORS,
  surface: SURFACE_COLORS,
  text: TEXT_COLORS,
  border: BORDER_COLORS,
} as const;

// CSS Variable Names για εύκολη αναφορά
export const CSS_VARIABLE_NAMES = {
  PRIMARY: 'layera-color-primary',
  SECONDARY: 'layera-color-secondary',
  SUCCESS: 'layera-color-success',
  WARNING: 'layera-color-warning',
  ERROR: 'layera-color-error',
  INFO: 'layera-color-info',
  NEUTRAL: 'layera-color-neutral',
  SURFACE: 'layera-color-surface',
  TEXT: 'layera-color-text',
  BORDER: 'layera-color-border',
} as const;