/**
 * @layera/constants - Development & Geo Configuration
 *
 * DEVELOPMENT PORTS, LOCAL URLS & GEO/MAPPING CONSTANTS
 * Extracted from config.ts for better maintainability
 */

/**
 * Development Server Ports - ΣΤΑΘΕΡΕΣ ΠΟΡΤΕΣ
 */
export const DEV_PORTS = {
  LAYERA_ID: 3000,
  LAYERA_GEOALERT_FALLBACK: 3002,
  LAYERA_GEOALERT: 3004,
  TEST_SERVER: 3008,
} as const;

/**
 * Local Development URLs
 */
export const LOCAL_URLS = {
  ID_SERVICE: `http://localhost:${DEV_PORTS.LAYERA_ID}`,
  GEOALERT_SERVICE: `http://localhost:${DEV_PORTS.LAYERA_GEOALERT}`,
  GEOALERT_FALLBACK: `http://localhost:${DEV_PORTS.LAYERA_GEOALERT_FALLBACK}`,
  TEST_SERVER: `http://localhost:${DEV_PORTS.TEST_SERVER}`,
} as const;

/**
 * Map Configuration Defaults
 */
export const MAP_DEFAULTS = {
  CENTER: [38.246639, 21.734573] as const, // Πάτρα coordinates
  ZOOM: 13,
  MAX_ZOOM: 25,
  DEFAULT_RADIUS: 250, // meters
} as const;

/**
 * Drawing Limits & Constraints
 */
export const DRAWING_LIMITS = {
  MIN_RADIUS: 50, // meters minimum radius
  MAX_RADIUS: 2000, // meters maximum radius
  MAX_POLYGON_POINTS: 20, // maximum points per polygon
} as const;

/**
 * Earth Geospatial Constants
 */
export const EARTH_CONSTANTS = {
  RADIUS_METERS: 6371000, // Earth's radius in meters
} as const;

/**
 * Geographic Bounds - Coordinate System Constraints
 */
export const GEOGRAPHIC_BOUNDS = {
  // WGS84 Global bounds
  WGS84_GLOBAL: {
    MIN_X: -180,
    MAX_X: 180,
    MIN_Y: -90,
    MAX_Y: 90
  },
  // Greece geographic bounds (WGS84)
  GREECE_WGS84: {
    MIN_X: 19,
    MAX_X: 30,
    MIN_Y: 34,
    MAX_Y: 42
  },
  // EGSA87 (Greek Grid) projection bounds
  EGSA87: {
    MIN_X: 100000,
    MAX_X: 900000,
    MIN_Y: 3800000,
    MAX_Y: 4700000
  },
  // Web Mercator bounds
  WEB_MERCATOR: {
    MIN_X: -20037508,
    MAX_X: 20037508,
    MIN_Y: -20037508,
    MAX_Y: 20037508
  }
} as const;