/**
 * @layera/constants - Geometric & UI Constants
 *
 * GEOMETRIC & UI CONSTANTS - SSOT για geometric limits
 * Extracted from config.ts for better maintainability
 */

/**
 * Geometric Validation Limits - Single Source of Truth
 */
export const GEOMETRIC_LIMITS = {
  MAX_AREA_SQM: 1000000, // 1 km² - geometric validation limit
  MIN_AREA_SQM: 100,
  MAX_TICK_VALUE: 100000, // Maximum normalized tick value for rulers
  AREA_CONVERSION_FACTOR: 111319.9, // Meters per degree approximation
  MIN_POLYGON_POINTS: 3   // Minimum points for valid polygon
} as const;

/**
 * Icon Dimensions από tokens.json - SSOT για icon positioning
 */
export const ICON_DIMENSIONS = {
  MAP: {
    ALERT: {
      width: 30,
      height: 48,
      anchor: {
        x: 15,
        y: 48
      },
      shadow: {
        size: 48
      },
      popup: {
        offsetY: -42
      },
      tooltip: {
        offsetY: -28
      }
    },
    TOOLTIP: {
      anchorX: 16
    },
    POPUP: {
      anchorX: 1
    }
  }
} as const;

/**
 * UI Component Dimensions - SSOT για component sizing
 */
export const UI_DIMENSIONS = {
  SIDEBAR: {
    AREAS_PANEL_WIDTH: 80,  // Areas panel width percentage
    MIN_WIDTH: 0,           // Collapsed width
    COLLAPSED_WIDTH: 0      // Fully collapsed state
  },
  PANEL: {
    Z_INDEX_MODAL: 10002    // Modal panel z-index
  }
} as const;