/**
 * useGeoAlertLayout Hook
 * Enterprise hook για GeoAlert layout management
 */
import React from "react";
import type { GeoAlertLayoutConfig, GeoAlertCardLayoutVariant } from '../types/geoalert-layout.types';
export interface UseGeoAlertLayoutReturn {
    /** Current layout configuration */
    config: GeoAlertLayoutConfig;
    /** Calculated positions */
    positions: {
        cardsTop: string;
        infoPanelTop: string;
        left: string;
        right: string;
        gap: string;
    };
    /** Utility functions */
    utils: {
        /** Get styles for card container */
        getCardStyles: (variant?: GeoAlertCardLayoutVariant) => React.CSSProperties;
        /** Get styles for info panel */
        getInfoPanelStyles: () => React.CSSProperties;
        /** Update layout configuration dynamically */
        updateConfig: (newConfig: Partial<GeoAlertLayoutConfig>) => React.ReactNode;
        /** Get CSS class names for variants */
        getCardContainerClass: (variant?: GeoAlertCardLayoutVariant) => string;
    };
}
/**
 * Enterprise LEGO Hook για GeoAlert Layout Management
 *
 * Παρέχει ολοκληρωμένη λύση για το positioning των καρτών και info panels
 * στο GeoAlert system με responsive support και dynamic configuration.
 */
export declare function useGeoAlertLayout(customConfig?: Partial<GeoAlertLayoutConfig>): UseGeoAlertLayoutReturn;
