/**
 * @layera/constants - UI Layer Management & Workflow
 *
 * UI LAYER MANAGEMENT, WORKFLOW & GEOSPATIAL - Configuration
 * Extracted from config.ts for better maintainability
 */

/**
 * Z-Index Layer Management για UI Stacking
 */
export const Z_INDEX_LAYERS = {
  // Base layers (0-99)
  BASE: 1,
  CONTENT: 10,

  // UI Components (100-999)
  SIDEBAR: 100,
  NAVIGATION: 200,
  FORM_ELEMENTS: 300,

  // Interactive Elements (1000-9999)
  STEPS_OVERLAY: 1000, // LayoutStep overlay z-index
  DROPDOWN: 1500,
  TOOLTIP: 2000,

  // Critical UI (10000+)
  MODAL_BACKDROP: 10000,
  MODAL_CONTENT: 10001,
  COMPLETION_OVERLAY: 10002, // CompleteStep & AvailabilityStep final overlay
  NOTIFICATION: 10003,
  LOADING_OVERLAY: 10004,
} as const;

/**
 * Workflow Step Order Constants
 */
export const WORKFLOW_ORDER = {
  // Step sequence numbers
  AVAILABILITY_DETAILS: 12,
  LAYOUT: 13,
  LOCATION: 14,
  PROPERTY_DETAILS: 15,
  UPLOAD: 17,

  // Special steps
  COMPLETION: 100, // Always last step
} as const;

/**
 * OpenStreetMap & Geospatial Services
 */
export const GEOSPATIAL_SERVICES = {
  OSM_TILE_SERVER: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  NOMINATIM_GEOCODING: 'https://nominatim.openstreetmap.org',

  // Overpass API Endpoints (load-balanced)
  OVERPASS_PRIMARY: 'https://overpass.kumi.systems/api/interpreter',
  OVERPASS_SECONDARY: 'https://overpass-api.de/api/interpreter',
  OVERPASS_TERTIARY: 'https://lz4.overpass-api.de/api/interpreter',
  OVERPASS_FALLBACK: 'https://overpass.openstreetmap.ru/api/interpreter',
} as const;