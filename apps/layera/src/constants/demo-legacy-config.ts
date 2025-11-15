/**
 * @layera/constants - Demo Data & Legacy Configuration
 *
 * DEMO ACCOUNT DATA & LEGACY CONFIG EXPORTS
 * Final remaining constants from config.ts
 */

// Import required constants for legacy config
import { FIXED_DIMENSIONS } from './device-specs';
import { LOCAL_URLS } from './dev-config';

/**
 * Sample Account Data - Used in i18n templates and demo environments
 * SINGLE SOURCE OF TRUTH για δεδομένα παραδείγματος
 */
export const DEMO_ACCOUNT_DATA = {
  ACCOUNT_CREATION: {
    YEAR: 2025,
    MONTH: 10, // Οκτώβριος
    DAY: 17,
    HOUR: 12,
    MINUTE: 4,
    SECOND: 9,
    PERIOD: 'μ.μ.' // Ελληνικό format
  },
  LAST_SIGNIN: {
    YEAR: 2025,
    MONTH: 11, // Νοέμβριος
    DAY: 5,
    HOUR: 12,
    MINUTE: 41,
    SECOND: 2,
    PERIOD: 'μ.μ.'
  },
  USER_INFO: {
    EMAIL: 'georgios.pagonis@gmail.com',
    DISPLAY_NAME: 'Georgios Pagonis',
    USER_ID: 'Z55xqJg38uRapVrvUlgwkf1',
    ROLE: 'Ιδιωτικός',
    EMAIL_VERIFIED: 'Επαληθευμένο',
    MFA_ENABLED: 'Απενεργοποιημένο'
  }
} as const;

/**
 * Legacy Exports - Για backwards compatibility
 */
export const CONFIG = {
  api: {
    baseUrl: process.env.API_BASE_URL || LOCAL_URLS.ID_SERVICE,
    timeout: 10000,
    retries: 3,
  },
  app: {
    name: 'Layera',
    version: process.env.APP_VERSION || '1.0.0',
  },
  map: {
    defaultZoom: FIXED_DIMENSIONS.MAP_ZOOM_DEFAULT,
    maxZoom: FIXED_DIMENSIONS.MAP_ZOOM_MAX,
    minZoom: FIXED_DIMENSIONS.MAP_ZOOM_MIN,
    fabBottomOffset: 80,
    fabHalfWidth: 28,
    defaultCenter: [37.9755, 23.7348] as const, // Athens
  },
  ui: {
    animationDuration: 300,
    debounceDelay: 300,
    tooltipDelay: 500,
  },
  geoDrawing: {
    snapTolerance: 10,
    minSnapZoom: 16,
    debounceMs: 500,
    measurementPrecision: 2,
    defaultStrokeColor: 'var(--layera-color-primary)',
    defaultFillColor: 'var(--layera-color-brand-light)',
    defaultStrokeWidth: 2,
  },
  osm: {
    overpassApiUrl: 'https://overpass-api.de/api/interpreter',
    requestTimeout: 10000,
    maxCacheEntries: 100,
    cacheTtl: 3600000, // 1 hour
  },
  search: {
    maxResults: 100,
    debounceMs: 300,
  },
  debug: {
    cursorThrottleMs: 120,
    maxElementStackSize: 6,
    maxHTMLSliceLength: 80,
    maxLiveStackSize: 5,
  },
} as const;