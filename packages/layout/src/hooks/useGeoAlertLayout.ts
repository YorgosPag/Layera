/**
 * useGeoAlertLayout Hook
 * Enterprise hook για GeoAlert layout management
 */

import { useCallback, useMemo } from 'react';
import type {
  GeoAlertLayoutConfig,
  GeoAlertCardLayoutVariant
} from '../types/geoalert-layout.types';
import {
  GEOALERT_LAYOUT_CONFIG,
  calculateGeoAlertPositions,
  createGeoAlertCardStyles,
  createGeoAlertInfoPanelStyles,
  updateGeoAlertLayoutVariables
} from '../utils/geoalert-layout';

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
    getCardStyles: (variant?: GeoAlertCardLayoutVariant) => Record<string, string | number>;

    /** Get styles for info panel */
    getInfoPanelStyles: () => Record<string, string | number>;

    /** Update layout configuration dynamically */
    updateConfig: (newConfig: Partial<GeoAlertLayoutConfig>) => void;

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
export function useGeoAlertLayout(
  customConfig?: Partial<GeoAlertLayoutConfig>
): UseGeoAlertLayoutReturn {
  // Merge default με custom configuration
  const config = useMemo(
    () => ({ ...GEOALERT_LAYOUT_CONFIG, ...customConfig }),
    [customConfig]
  );

  // Υπολογισμός positions
  const positions = useMemo(
    () => calculateGeoAlertPositions(config),
    [config]
  );

  // Simple mobile detection
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 768;
  }, []);

  // Utility functions
  const getCardStyles = useCallback(
    (variant: GeoAlertCardLayoutVariant = 'horizontal') =>
      createGeoAlertCardStyles(variant, positions),
    [positions]
  );

  const getInfoPanelStyles = useCallback(
    () => createGeoAlertInfoPanelStyles(isMobile, positions),
    [isMobile, positions]
  );

  const updateConfig = useCallback(
    (newConfig: Partial<GeoAlertLayoutConfig>) => {
      updateGeoAlertLayoutVariables(newConfig);
    },
    []
  );

  const getCardContainerClass = useCallback(
    (variant: GeoAlertCardLayoutVariant = 'horizontal') => {
      const baseClass = 'layera-geoalert-card-container';

      switch (variant) {
        case 'horizontal':
          return `${baseClass} ${baseClass}--horizontal`;
        case 'vertical':
          return `${baseClass} ${baseClass}--vertical`;
        case 'smart-triple':
          return `${baseClass} ${baseClass}--smart-triple`;
        default:
          return `${baseClass} ${baseClass}--horizontal`;
      }
    },
    []
  );

  return {
    config,
    positions,
    utils: {
      getCardStyles,
      getInfoPanelStyles,
      updateConfig,
      getCardContainerClass
    }
  };
}