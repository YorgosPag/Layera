/**
 * @layera/constants - Design System & XML Configuration
 *
 * XML NAMESPACES, DEVICE FRAME COLORS & SVG DIMENSIONS
 * Extracted from config.ts for better maintainability
 */

/**
 * Standard XML Namespaces
 */
export const XML_NAMESPACES = {
  SVG: 'http://www.w3.org/2000/svg',
  XLINK: 'http://www.w3.org/1999/xlink',
} as const;

/**
 * EU ESCO Data Namespaces
 */
export const ESCO_NAMESPACES = {
  OCCUPATION: 'http://data.europa.eu/esco/occupation',
  SKILL: 'http://data.europa.eu/esco/skill',
  REGULATED_PROFESSIONS: 'http://data.europa.eu/esco/regulated-professions',
} as const;

/**
 * Device Frame Colors - Design System
 */
export const DEVICE_FRAME_COLORS = {
  SPACE_GRAY: 'var(--layera-bg-dark)',
  SILVER: 'var(--layera-color-surface-secondary)',
  BLACK: 'var(--layera-bg-dark)',
  WHITE: 'var(--layera-color-surface)',
  GOLD: 'var(--layera-color-surface-tertiary)',
  GOOGLE_CHARCOAL: 'var(--layera-bg-dark)',
  GRAPHITE: 'var(--layera-bg-dark)',
} as const;

/**
 * Standard SVG Icon Dimensions
 */
export const SVG_DIMENSIONS = {
  ICON_SMALL: { width: 16, height: 16 },
  ICON_MEDIUM: { width: 24, height: 24 },
  ICON_LARGE: { width: 32, height: 32 },
  ICON_XL: { width: 48, height: 48 },
  ICON_XXL: { width: 64, height: 64 },
} as const;

/**
 * Icon Sizes - Unified Icon Size System
 * Single Source of Truth για icon dimensions across components
 */
export const ICON_SIZES = {
  SMALL: 24,
  MEDIUM: 32,
  LARGE: 48,
  XL: 64
} as const;

/**
 * Leaflet Marker Dimensions
 */
export const LEAFLET_MARKER_DIMENSIONS = {
  DEFAULT: { width: 25, height: 41 },
  RETINA: { width: 50, height: 82 },
  SHADOW: { width: 41, height: 41 },
} as const;