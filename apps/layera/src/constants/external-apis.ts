/**
 * @layera/constants - External APIs Configuration
 *
 * EXTERNAL APIs & SERVICES - Tier 1 Critical Infrastructure
 * Extracted from config.ts for better maintainability
 */

/**
 * External Service URLs - Production Grade APIs
 */
export const EXTERNAL_APIS = {
  // Development Tools & Documentation
  VITEJS_CONFIG: 'https://vitejs.dev/config/',
  VITE_CONFIG: 'https://vite.dev/config/',
  ESLINT_VERSION_SUPPORT: 'https://eslint.org/version-support',
  MDN_ARRAY_SORT: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#browser_compatibility',

  // Cloud & Infrastructure
  FIREBASE_CONSOLE: 'https://console.firebase.google.com',
  GOOGLE_CLOUD_CONSOLE: 'https://console.cloud.google.com',

  // Third-party Services
  QR_CODE_GENERATOR: 'https://api.qrserver.com/v1/create-qr-code',
  TOLGEE_API: 'https://app.tolgee.io',

  // Documentation
  LAYERA_DOCS_RBAC: 'https://layera.dev/docs/rbac',
  LAYERA_DOCS_AUTH: 'https://layera.dev/docs/auth-bridge',

  // EU ESCO Services
  ESCO_API_BASE: 'https://esco.ec.europa.eu/api',
} as const;

/**
 * Leaflet Map Infrastructure URLs
 */
export const LEAFLET_INFRASTRUCTURE = {
  CSS: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  MARKER_ICON: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  MARKER_ICON_2X: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  MARKER_SHADOW: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
} as const;