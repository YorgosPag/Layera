/**
 * GeoAlert Layout Utilities
 * Enterprise utilities για positioning και styling
 */

import type {
  GeoAlertLayoutConfig,
  GeoAlertCalculatedPositions,
  GeoAlertCardLayoutVariant
} from '../types/geoalert-layout.types';

/** Default GeoAlert Layout Configuration */
export const GEOALERT_LAYOUT_CONFIG: GeoAlertLayoutConfig = {
  stepperHeight: 120,
  stepperToCardsGap: 8,
  cardsGap: 8,
  cardHeight: 60,
  sideMargins: 8
} as const;

/**
 * Υπολογίζει τις θέσεις των στοιχείων βάσει configuration
 */
export function calculateGeoAlertPositions(
  config: GeoAlertLayoutConfig = GEOALERT_LAYOUT_CONFIG
): GeoAlertCalculatedPositions {
  const cardsTopPx = config.stepperHeight + config.stepperToCardsGap;
  const infoPanelTopPx = cardsTopPx + config.cardHeight + config.cardsGap;

  return {
    cardsTop: `${cardsTopPx}px`,
    infoPanelTop: `${infoPanelTopPx}px`,
    left: `${config.sideMargins}px`,
    right: `${config.sideMargins}px`,
    gap: `${config.cardsGap}px`
  };
}

/**
 * Δημιουργεί CSS styles για GeoAlert card container
 */
export function createGeoAlertCardStyles(
  variant: GeoAlertCardLayoutVariant = 'horizontal',
  positions?: GeoAlertCalculatedPositions
): React.CSSProperties {
  const pos = positions ?? calculateGeoAlertPositions();

  const baseStyles: React.CSSProperties = {
    position: 'fixed',
    top: pos.cardsTop,
    left: pos.left,
    right: pos.right,
    zIndex: 10002,
    padding: '0',
    gap: pos.gap,
    display: 'flex',
    transition: 'all 250ms ease-in-out'
  };

  switch (variant) {
    case 'horizontal':
      return {
        ...baseStyles,
        flexDirection: 'row'
      };

    case 'vertical':
      return {
        ...baseStyles,
        flexDirection: 'column'
      };

    case 'smart-triple':
      return {
        ...baseStyles,
        flexDirection: 'column'
      };

    default:
      return {
        ...baseStyles,
        flexDirection: 'row'
      };
  }
}

/**
 * Δημιουργεί CSS styles για GeoAlert InfoPanel
 */
export function createGeoAlertInfoPanelStyles(
  isMobile: boolean = true,
  positions?: GeoAlertCalculatedPositions
): React.CSSProperties {
  const pos = positions ?? calculateGeoAlertPositions();

  if (isMobile) {
    // Mobile: full width, positioned under cards
    return {
      position: 'fixed',
      top: pos.infoPanelTop,
      left: pos.left,
      right: pos.right,
      zIndex: 10000,
      maxHeight: '60vh',
      overflow: 'auto',
      transition: 'all 250ms ease-in-out'
    };
  } else {
    // Desktop: fixed width, top-right corner
    return {
      position: 'fixed',
      top: '24px',
      right: '24px',
      width: '320px',
      zIndex: 10000,
      maxHeight: '400px',
      overflow: 'auto',
      transition: 'all 250ms ease-in-out'
    };
  }
}

/**
 * Hook για αυτόματο responsive detection
 */
export function useGeoAlertResponsive(): { isMobile: boolean } {
  // Βασικό responsive detection για το example
  // Στην πραγματικότητα θα χρησιμοποιήσουμε το useResponsive από το layout system
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return { isMobile };
}

/**
 * CSS Variables Updater - Enterprise approach
 * Ενημερώνει CSS variables δυναμικά
 */
export function updateGeoAlertLayoutVariables(
  config: Partial<GeoAlertLayoutConfig>
): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const fullConfig = { ...GEOALERT_LAYOUT_CONFIG, ...config };
  const positions = calculateGeoAlertPositions(fullConfig);

  // Update CSS custom properties
  root.style.setProperty('--la-stepper-height', `${fullConfig.stepperHeight}px`);
  root.style.setProperty('--la-stepper-to-cards-gap', `${fullConfig.stepperToCardsGap}px`);
  root.style.setProperty('--la-cards-gap', `${fullConfig.cardsGap}px`);
  root.style.setProperty('--la-cards-height', `${fullConfig.cardHeight}px`);
  root.style.setProperty('--la-side-margins', `${fullConfig.sideMargins}px`);

  // Update calculated positions
  root.style.setProperty('--la-cards-top', positions.cardsTop);
  root.style.setProperty('--la-info-panel-top', positions.infoPanelTop);
}