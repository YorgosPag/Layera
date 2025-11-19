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
  ICON_SMALL: { width: 'var(--layera-size-4)', height: 'var(--layera-size-4)' },
  ICON_MEDIUM: { width: 'var(--layera-size-6)', height: 'var(--layera-size-6)' },
  ICON_LARGE: { width: 'var(--layera-size-8)', height: 'var(--layera-size-8)' },
  ICON_XL: { width: 'var(--layera-size-12)', height: 'var(--layera-size-12)' },
  ICON_XXL: { width: 'var(--layera-size-16)', height: 'var(--layera-size-16)' },
} as const;

/**
 * Icon Sizes - Unified Icon Size System
 * Single Source of Truth για icon dimensions across components
 */
export const ICON_SIZES = {
  SMALL: 'var(--layera-size-6)',
  MEDIUM: 'var(--layera-size-8)',
  LARGE: 'var(--layera-size-12)',
  XL: 'var(--layera-size-16)'
} as const;

/**
 * Leaflet Marker Dimensions
 */
export const LEAFLET_MARKER_DIMENSIONS = {
  DEFAULT: { width: 'var(--layera-size-6)', height: 'var(--layera-size-10)' },
  RETINA: { width: 'var(--layera-size-12)', height: 'var(--layera-size-20)' },
  SHADOW: { width: 'var(--layera-size-10)', height: 'var(--layera-size-10)' },
} as const;