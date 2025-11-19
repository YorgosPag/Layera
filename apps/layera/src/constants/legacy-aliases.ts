/**
 * Legacy aliases για backward compatibility
 * Αυτό το αρχείο παρέχει aliases για constants που μετονομάστηκαν ή μετακινήθηκαν
 */

import { ICON_DIMENSIONS } from './config';

// Map-related legacy aliases - moved to dev-config.ts

// Drawing-related legacy aliases - moved to dev-config.ts

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

// Cryptographic constants - moved to ui-utilities.ts

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