// Layera GeoAlert V1 - MapIcons Micro-Module
// Single Responsibility: Create and manage Leaflet icons
// Enterprise pattern: Factory pattern για icon creation

import L from 'leaflet';
import { LEAFLET_INFRASTRUCTURE, LEAFLET_MARKER_DIMENSIONS } from '@layera/constants';
import { MAP_CONFIG } from '@/constants';

/**
 * Icon factory για consistent Leaflet icons
 * Centralized icon management
 */

// Icon configurations - centralized config using SSOT from MAP_CONFIG
const ICON_CONFIG = {
  default: {
    iconUrl: LEAFLET_INFRASTRUCTURE.MARKER_ICON,
    shadowUrl: LEAFLET_INFRASTRUCTURE.MARKER_SHADOW,
    iconSize: [LEAFLET_MARKER_DIMENSIONS.DEFAULT.width, LEAFLET_MARKER_DIMENSIONS.DEFAULT.height] as [number, number],
    iconAnchor: [LEAFLET_MARKER_DIMENSIONS.DEFAULT.width / 2, LEAFLET_MARKER_DIMENSIONS.DEFAULT.height] as [number, number],
    popupAnchor: MAP_CONFIG.icons.default.popupAnchor as [number, number],
    tooltipAnchor: MAP_CONFIG.icons.default.tooltipAnchor as [number, number],
    shadowSize: [LEAFLET_MARKER_DIMENSIONS.SHADOW.width, LEAFLET_MARKER_DIMENSIONS.SHADOW.height] as [number, number]
  },
  alert: {
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: MAP_CONFIG.icons.alert.iconSize as [number, number],
    iconAnchor: MAP_CONFIG.icons.alert.iconAnchor as [number, number],
    popupAnchor: MAP_CONFIG.icons.alert.popupAnchor as [number, number],
    tooltipAnchor: MAP_CONFIG.icons.alert.tooltipAnchor as [number, number],
    shadowSize: MAP_CONFIG.icons.alert.shadowSize as [number, number]
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