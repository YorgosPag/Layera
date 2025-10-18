// Layera GeoAlert V1 - MapIcons Micro-Module
// Single Responsibility: Create and manage Leaflet icons
// Enterprise pattern: Factory pattern για icon creation

import L from 'leaflet';

/**
 * Icon factory για consistent Leaflet icons
 * Centralized icon management
 */

// Icon configurations - centralized config
const ICON_CONFIG = {
  default: {
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41] as [number, number],
    iconAnchor: [12, 41] as [number, number],
    popupAnchor: [1, -34] as [number, number],
    tooltipAnchor: [16, -28] as [number, number],
    shadowSize: [41, 41] as [number, number]
  },
  alert: {
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [30, 48] as [number, number],
    iconAnchor: [15, 48] as [number, number],
    popupAnchor: [1, -42] as [number, number],
    tooltipAnchor: [16, -28] as [number, number],
    shadowSize: [48, 48] as [number, number]
  }
} as const;

type IconType = keyof typeof ICON_CONFIG;

/**
 * Create a Leaflet icon with specified type
 */
export const createIcon = (type: IconType = 'default'): L.Icon => {
  const config = ICON_CONFIG[type];
  return L.icon(config);
};

/**
 * Get default icon (for global Leaflet marker setup)
 */
export const getDefaultIcon = (): L.Icon => createIcon('default');

/**
 * Get alert-specific icon (larger για property alerts)
 */
export const getAlertIcon = (): L.Icon => createIcon('alert');

/**
 * Configure global Leaflet default icon
 * Call once στο app initialization
 */
export const configureGlobalIcons = (): void => {
  L.Marker.prototype.options.icon = getDefaultIcon();
};

/**
 * Create colored icon (future feature)
 */
export const createColoredIcon = (color: string): L.Icon => {
  // Future: Generate colored icons dynamically
  return createIcon('default');
};