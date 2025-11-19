/**
 * Legacy aliases για backward compatibility
 * Αυτό το αρχείο παρέχει aliases για constants που μετονομάστηκαν ή μετακινήθηκαν
 */

import { ICON_DIMENSIONS } from './config';

// Map-related legacy aliases
export const MAP_DEFAULTS = {
  CENTER: [37.9755, 23.7348] as [number, number], // Athens
  ZOOM: 13,
  MAX_ZOOM: 18,
  DEFAULT_RADIUS: 1000
};

// Drawing-related legacy aliases
export const DRAWING_LIMITS = {
  MAX_POINTS: 1000,
  MIN_AREA: 1, // square meters
  MAX_AREA: 10000000 // square meters
};

// UI dimensions legacy alias - maps to ICON_DIMENSIONS
export const UI_DIMENSIONS = ICON_DIMENSIONS;

// Legacy layout aliases - NOW USING CSS VARIABLES FROM STYLE DICTIONARY
export const LEGACY_LAYOUT_ALIASES = {
  CONTAINER_SM: 'var(--layera-spacing-container-sm)',
  CONTAINER_MD: 'var(--layera-spacing-container-md)',
  CONTAINER_LG: 'var(--layera-spacing-container-lg)',
  CONTAINER_XL: 'var(--layera-spacing-container-xl)'
};

// Legacy container aliases
export const LEGACY_CONTAINER_ALIASES = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
  EXTRA_LARGE: 'xl'
};

// Legacy viewport aliases
export const LEGACY_VIEWPORT_ALIASES = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  DESKTOP: 'desktop'
};

// Cryptographic constants
export const CRYPTOGRAPHIC_CONSTANTS = {
  SALT_ROUNDS: 12,
  TOKEN_LENGTH: 32,
  SESSION_TIMEOUT: 3600000,
  REFRESH_TOKEN_TIMEOUT: 2592000000
};

// ESLint limits for configuration
export const ESLINT_LIMITS = {
  ECMA_VERSION: 2020,
  MAX_LINES_PER_FILE: 500,
  MAX_LINES_PER_FUNCTION: 50,
  MAX_COMPLEXITY: 10,
  MAX_DEPTH: 4,
  MAX_PARAMS: 5,
  MAX_STATEMENTS: 20
};