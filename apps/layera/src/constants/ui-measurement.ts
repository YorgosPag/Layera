/**
 * @layera/constants - UI & Measurement Configuration
 *
 * LEAFLET UI, RULER TICKS, COMPRESSION & PROPERTY VALIDATION
 * Extracted from config.ts for better maintainability
 */

/**
 * Leaflet Map Offsets - UI Positioning Constants
 * Single Source of Truth για popup and tooltip positioning
 */
export const LEAFLET_UI_OFFSETS = {
  POPUP_OFFSET_Y: -34,    // Popup anchor Y offset - Leaflet API constant
  TOOLTIP_OFFSET_Y: -28,  // Tooltip anchor Y offset - Leaflet API constant
  DEFAULT_POPUP_X: 0,     // Default popup X offset
  DEFAULT_TOOLTIP_X: 0    // Default tooltip X offset
} as const;

/**
 * Ruler & Measurement Scale Constants - Geometric Tick Values
 * Single Source of Truth για ruler tick intervals and scale measurements
 */
export const RULER_TICK_VALUES = {
  SMALL_TICK: 50,           // Small scale tick value - geometric constant
  MEDIUM_TICK: 200,         // Medium scale tick value - geometric constant
  LARGE_TICK: 500,          // Large scale tick value - geometric constant
  LARGE_TICK_2: 1000,       // Large scale tick value 2 - geometric constant
  INTERMEDIATE_TICK_1: 2000, // Intermediate tick value 1 - geometric constant
  INTERMEDIATE_TICK_2: 5000, // Intermediate tick value 2 - geometric constant
  INTERMEDIATE_TICK_3: 10000, // Intermediate tick value 3 - geometric constant
  XL_TICK: 20000,           // Extra large tick value - geometric constant
  XXL_TICK: 50000,          // Extra extra large tick value - geometric constant
  MAX_TICK: 100000          // Maximum normalized tick value
} as const;

/**
 * Image Compression Constants - Optimization Settings
 * Single Source of Truth για image compression parameters
 */
export const COMPRESSION_SETTINGS = {
  WEBP_SAVINGS_PERCENT: 25,     // WebP average savings over JPEG (25-30%)
  WEBP_MAX_SAVINGS_PERCENT: 30, // WebP maximum savings percentage
  JPEG_HIGH_QUALITY: 85,        // High quality JPEG setting
  JPEG_MEDIUM_QUALITY: 80,      // Medium quality JPEG setting
  WEBP_HIGH_QUALITY: 85,        // High quality WebP setting
  WEBP_MEDIUM_QUALITY: 80,      // Medium quality WebP setting
  PNG_HIGH_QUALITY: 90,         // High quality PNG setting
  PNG_LOSSLESS_QUALITY: 100,    // PNG lossless compression
  // Size-based quality adjustments
  LARGE_FILE_QUALITY: 70,       // Quality for files > 5MB
  MEDIUM_FILE_QUALITY: 75,      // Quality for files > 2MB
  // Dimension limits for large files
  MAX_LARGE_WIDTH: 2000,        // Max width for large files
  MAX_LARGE_HEIGHT: 2000,       // Max height for large files
  MAX_MEDIUM_WIDTH: 2500,       // Max width for medium files
  MAX_MEDIUM_HEIGHT: 2500,      // Max height for medium files
  // Dimension thresholds for compression recommendations
  LARGE_DIMENSION_THRESHOLD: 3000, // Threshold for large dimension warning
  RECOMMENDED_MAX_WIDTH: 2500,     // Recommended maximum width
  RECOMMENDED_MAX_HEIGHT: 2500,    // Recommended maximum height
  // Quality ranges for lossy formats
  MIN_QUALITY: 0,               // Minimum quality value
  MAX_QUALITY: 100              // Maximum quality value
} as const;

/**
 * PROPERTY VALIDATION CONSTANTS
 * Validation constraints για property data input
 */
export const PROPERTY_VALIDATION = {
  // Building construction year constraints
  MIN_BUILDING_YEAR: 1800,         // Earliest reasonable building year for property validation
  MAX_BUILDING_YEAR: new Date().getFullYear() + 5, // Maximum future building year (current + 5 years)

  // Property area constraints (square meters)
  MIN_PROPERTY_AREA: 10,           // Minimum property area validation (10 sq.m)
  MAX_PROPERTY_AREA: 100000,       // Maximum property area validation (10 hectares)

  // Property value constraints (EUR)
  MIN_PROPERTY_VALUE: 1000,        // Minimum property value for validation
  MAX_PROPERTY_VALUE: 50000000     // Maximum property value for validation (50M EUR)
} as const;

/**
 * LEAFLET MAP ICON CONSTANTS
 * Icon sizing constraints για Leaflet map markers - LEAFLET API requirements
 */
export const LEAFLET_ICON_SIZES = {
  // Standard icon sizes για Leaflet markers
  SMALL: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--layera-icon-leafletMedium')) || 16, // Small marker icon size (16px)
  MEDIUM: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--layera-icon-leafletLarge')) || 24, // Medium marker icon size (24px)
  STANDARD: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--layera-icon-leafletXl')) || 32, // Standard marker icon size (32px) - Leaflet default
  LARGE: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--layera-size-12')) || 48,     // Large marker icon size from tokens
  XL: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--layera-size-16')) || 64,        // Extra large marker icon size from tokens

  // Shadow offsets για marker shadows
  SHADOW_ANCHOR_X: 12,             // Shadow horizontal anchor point
  SHADOW_ANCHOR_Y: 41,             // Shadow vertical anchor point

  // Popup anchor offsets
  POPUP_ANCHOR_Y: -34              // Popup vertical anchor offset from icon center
} as const;