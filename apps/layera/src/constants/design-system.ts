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
 * Unified Icon System - Complete Icon Size & Dimension Management
 * Single Source of Truth για όλες τις icon ανάγκες (UI, Leaflet, Map)
 */
export const UNIFIED_ICON_SYSTEM = {
  // Standard UI icon sizes
  UI_SIZES: {
    XS: 'var(--layera-size-4)',    // 16px
    SM: 'var(--layera-size-5)',    // 20px
    MD: 'var(--layera-size-6)',    // 24px - SMALL από το παλιό ICON_SIZES
    LG: 'var(--layera-size-8)',    // 32px - MEDIUM από το παλιό ICON_SIZES
    XL: 'var(--layera-size-12)',   // 48px - LARGE από το παλιό ICON_SIZES
    XXL: 'var(--layera-size-16)'   // 64px - XL από το παλιό ICON_SIZES
  },

  // Leaflet-specific sizes (numeric for Leaflet API)
  LEAFLET_SIZES: {
    SMALL: 16,    // από LEAFLET_ICON_SIZES.SMALL
    MEDIUM: 24,   // από LEAFLET_ICON_SIZES.MEDIUM
    STANDARD: 32, // από LEAFLET_ICON_SIZES.STANDARD
    LARGE: 48,    // από LEAFLET_ICON_SIZES.LARGE
    XL: 64        // από LEAFLET_ICON_SIZES.XL
  },

  // Map-specific dimensions (unified από ICON_DIMENSIONS)
  MAP_DIMENSIONS: {
    ALERT: {
      width: 'var(--layera-global-spacing-7-5)',
      height: 'var(--layera-global-spacing-12)',
      anchor: { x: 'var(--layera-global-spacing-3-75)', y: 'var(--layera-global-spacing-12)' }
    }
  }
} as const;

// Legacy compatibility exports
export const ICON_SIZES = UNIFIED_ICON_SYSTEM.UI_SIZES;

/**
 * Leaflet Marker Dimensions
 */
export const LEAFLET_MARKER_DIMENSIONS = {
  DEFAULT: { width: 'var(--layera-size-6)', height: 'var(--layera-size-10)' },
  RETINA: { width: 'var(--layera-size-12)', height: 'var(--layera-size-20)' },
  SHADOW: { width: 'var(--layera-size-10)', height: 'var(--layera-size-10)' },
} as const;