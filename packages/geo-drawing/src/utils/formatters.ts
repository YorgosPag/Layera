import { useLayeraTranslation } from '@layera/tolgee';

/**
 * Formats a distance in meters into a readable string, switching to kilometers for large distances.
 * Μεταφέρθηκε από OLD_geo-canvas/components/utils/measurementUtils.ts
 * @param meters The distance in meters.
 * @param decimals The number of decimal places to show.
 * @returns A formatted string like "500.00 m" or "1.20 km".
 */
export const formatDistance = (meters: number, decimals: number = 2): string => {
  if (meters === 0) return '0 m';
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(decimals)} km`;
  }
  return `${meters.toFixed(decimals)} m`;
};

/**
 * Formats an area in square meters into a readable string, switching to hectares or square kilometers.
 * Μεταφέρθηκε από OLD_geo-canvas/components/utils/measurementUtils.ts
 * @param sqMeters The area in square meters.
 * @returns A formatted string like "500.00 m²" or "1.20 ha".
 */
export const formatArea = (sqMeters: number): string => {
  if (sqMeters === 0) return '0 m²';
  if (sqMeters >= 1000000) {
    return `${(sqMeters / 1000000).toFixed(2)} km²`;
  }
  if (sqMeters >= 10000) {
    return `${(sqMeters / 10000).toFixed(2)} ha`;
  }
  return `${sqMeters.toFixed(2)} m²`;
};

/**
 * Hook for formatted measurement display with @layera/tolgee support
 * Αντικαθιστά τα hardcoded strings με @layera/tolgee keys
 */
export const useMeasurementFormatter = () => {
  const { t } = useLayeraTranslation();

  const formatDistanceWithLabels = (meters: number, decimals: number = 2): string => {
    if (meters === 0) return `0 ${t('geo-drawing.units.meters')}`;
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(decimals)} ${t('geo-drawing.units.kilometers')}`;
    }
    return `${meters.toFixed(decimals)} ${t('geo-drawing.units.meters')}`;
  };

  const formatAreaWithLabels = (sqMeters: number): string => {
    if (sqMeters === 0) return `0 ${t('geo-drawing.units.square-meters')}`;
    if (sqMeters >= 1000000) {
      return `${(sqMeters / 1000000).toFixed(2)} ${t('geo-drawing.units.square-kilometers')}`;
    }
    if (sqMeters >= 10000) {
      return `${(sqMeters / 10000).toFixed(2)} ${t('geo-drawing.units.hectares')}`;
    }
    return `${sqMeters.toFixed(2)} ${t('geo-drawing.units.square-meters')}`;
  };

  const formatCoordinates = (lat: number, lng: number, decimals: number = 6): string => {
    return `${lat.toFixed(decimals)}, ${lng.toFixed(decimals)}`;
  };

  const formatPointLabel = (index: number): string => {
    return t('geo-drawing.point-label', { index: index + 1 });
  };

  return {
    formatDistanceWithLabels,
    formatAreaWithLabels,
    formatCoordinates,
    formatPointLabel,
    // Backward compatibility exports
    formatDistance,
    formatArea
  };
};

/**
 * Formats coordinates to different coordinate systems
 */
export const formatCoordinatesBySystem = (
  lat: number,
  lng: number,
  system: 'WGS84' | 'EGSA87' | 'UTM' = 'WGS84',
  decimals: number = 6
): string => {
  switch (system) {
    case 'WGS84':
      return `${lat.toFixed(decimals)}°N, ${lng.toFixed(decimals)}°E`;
    case 'EGSA87':
      // Basic conversion placeholder - would need proper transformation
      return `X: ${lng.toFixed(2)}, Y: ${lat.toFixed(2)} (ΕΓΣΑ87)`;
    case 'UTM':
      // Basic UTM formatting placeholder
      return `UTM: ${lng.toFixed(0)}E, ${lat.toFixed(0)}N`;
    default:
      return `${lat.toFixed(decimals)}, ${lng.toFixed(decimals)}`;
  }
};

/**
 * Formats bearing/azimuth between two points
 * @param bearing Bearing in degrees
 * @returns Formatted bearing string
 */
export const formatBearing = (bearing: number): string => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(bearing / 45) % 8;
  return `${bearing.toFixed(1)}° (${directions[index]})`;
};