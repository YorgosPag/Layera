/**
 * useGeoAlertLayout Hook
 * Enterprise hook για GeoAlert layout management
 */
import { useCallback, useMemo } from 'react';
import { GEOALERT_LAYOUT_CONFIG, calculateGeoAlertPositions, createGeoAlertCardStyles, createGeoAlertInfoPanelStyles, updateGeoAlertLayoutVariables } from '../utils/geoalert-layout';
/**
 * Enterprise LEGO Hook για GeoAlert Layout Management
 *
 * Παρέχει ολοκληρωμένη λύση για το positioning των καρτών και info panels
 * στο GeoAlert system με responsive support και dynamic configuration.
 */
export function useGeoAlertLayout(customConfig) {
    // Merge default με custom configuration
    const config = useMemo(() => ({ ...GEOALERT_LAYOUT_CONFIG, ...customConfig }), [customConfig]);
    // Υπολογισμός positions
    const positions = useMemo(() => calculateGeoAlertPositions(config), [config]);
    // Simple mobile detection
    const isMobile = useMemo(() => {
        if (typeof window === 'undefined')
            return false;
        return window.innerWidth <= 768;
    }, []);
    // Utility functions
    const getCardStyles = useCallback((variant = 'horizontal') => createGeoAlertCardStyles(variant, positions), [positions]);
    const getInfoPanelStyles = useCallback(() => createGeoAlertInfoPanelStyles(isMobile, positions), [isMobile, positions]);
    const updateConfig = useCallback((newConfig) => {
        updateGeoAlertLayoutVariables(newConfig);
    }, []);
    const getCardContainerClass = useCallback((variant = 'horizontal') => {
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
    }, []);
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
//# sourceMappingURL=useGeoAlertLayout.js.map