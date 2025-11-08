/**
 * GeoAlert Layout Utilities
 * Enterprise utilities για positioning και styling
 */
import type { GeoAlertLayoutConfig, GeoAlertCalculatedPositions, GeoAlertCardLayoutVariant } from '../types/geoalert-layout.types';
/** Default GeoAlert Layout Configuration */
export declare const GEOALERT_LAYOUT_CONFIG: GeoAlertLayoutConfig;
/**
 * Υπολογίζει τις θέσεις των στοιχείων βάσει configuration
 */
export declare function calculateGeoAlertPositions(config?: GeoAlertLayoutConfig): GeoAlertCalculatedPositions;
/**
 * Δημιουργεί CSS styles για GeoAlert card container
 */
export declare function createGeoAlertCardStyles(variant?: GeoAlertCardLayoutVariant, positions?: GeoAlertCalculatedPositions): React.CSSProperties;
/**
 * Δημιουργεί CSS styles για GeoAlert InfoPanel
 */
export declare function createGeoAlertInfoPanelStyles(isMobile?: boolean, positions?: GeoAlertCalculatedPositions): React.CSSProperties;
/**
 * Hook για αυτόματο responsive detection
 */
export declare function useGeoAlertResponsive(): {
    isMobile: boolean;
};
/**
 * CSS Variables Updater - Enterprise approach
 * Ενημερώνει CSS variables δυναμικά
 */
export declare function updateGeoAlertLayoutVariables(config: Partial<GeoAlertLayoutConfig>): void;
