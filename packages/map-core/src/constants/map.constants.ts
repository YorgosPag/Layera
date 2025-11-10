/**
 * map.constants.ts - Enterprise Map Configuration Constants
 *
 * KADOS Compliant configuration - όλες οι τιμές σε named constants
 */

import type { ControlPosition } from 'leaflet';

export const DEFAULT_MAP_CONFIG = {
  // Geographic coordinates
  ATHENS: {
    LAT: 37.9755,
    LNG: 23.7348,
  },

  // Zoom levels
  ZOOM: {
    MIN: 1,
    DEFAULT: 13,
    MAX: 18,
    CITY: 13,
    STREET: 16,
  },

  // Zoom control configuration
  ZOOM_CONTROL: {
    POSITION: 'bottomright' as ControlPosition,
  },

  // Tile layer configuration με fallback servers
  TILE_LAYER: {
    PRIMARY: {
      URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      ATTRIBUTION: '© OpenStreetMap contributors',
      SUBDOMAINS: ['a', 'b', 'c'] as string[],
    },
    FALLBACK: {
      URL: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      ATTRIBUTION: '© OpenStreetMap contributors',
    },
    OPTIONS: {
      maxZoom: 19,
      minZoom: 1,
      tileSize: 256,
      detectRetina: true,
      crossOrigin: true,
    },
  },

  // CSS classes
  CONTAINER_CLASS: 'layera-map--fullscreen',
} as const;

export const MAP_EVENTS = {
  CLICK: 'click',
  ZOOM_START: 'zoomstart',
  ZOOM_END: 'zoomend',
  MOVE_START: 'movestart',
  MOVE_END: 'moveend',
} as const;