// Layera GeoAlert V1 - AreaFormatter Micro-Module
// Single Responsibility: Format areas, distances, and measurements για UI display
// Enterprise pattern: Centralized formatting rules

/**
 * Area and distance formatting utilities
 * Localized και user-friendly displays
 */

export interface FormattedMeasurement {
  value: string;
  unit: string;
  full: string;
}

/**
 * Format area in square meters to human-readable format
 */
export const formatArea = (areaInSquareMeters: number, hectaresLabel: string = 'hectares'): FormattedMeasurement => {
  if (areaInSquareMeters < 1) {
    return {
      value: '< 1',
      unit: 'm²',
      full: '< 1 m²'
    };
  }

  if (areaInSquareMeters < 10000) { // Less than 1 hectare
    return {
      value: Math.round(areaInSquareMeters).toString(),
      unit: 'm²',
      full: `${Math.round(areaInSquareMeters)} m²`
    };
  }

  if (areaInSquareMeters < 1000000) { // Less than 1 km²
    const hectares = areaInSquareMeters / 10000;
    return {
      value: hectares.toFixed(2),
      unit: hectaresLabel,
      full: `${hectares.toFixed(2)} ${hectaresLabel}`
    };
  }

  // 1 km² or more
  const kmSquared = areaInSquareMeters / 1000000;
  return {
    value: kmSquared.toFixed(2),
    unit: 'km²',
    full: `${kmSquared.toFixed(2)} km²`
  };
};

/**
 * Format distance in meters to human-readable format
 */
export const formatDistance = (distanceInMeters: number, precision: number = 0): FormattedMeasurement => {
  if (distanceInMeters < 1) {
    return {
      value: '< 1',
      unit: 'm',
      full: '< 1 m'
    };
  }

  if (distanceInMeters < 1000) {
    const rounded = precision > 0 ? distanceInMeters.toFixed(precision) : Math.round(distanceInMeters).toString();
    return {
      value: rounded,
      unit: 'm',
      full: `${rounded} m`
    };
  }

  // 1 km or more
  const kilometers = distanceInMeters / 1000;
  const rounded = kilometers.toFixed(precision > 0 ? precision : 1);
  return {
    value: rounded,
    unit: 'km',
    full: `${rounded} km`
  };
};

/**
 * Format radius with appropriate unit and precision
 */
export const formatRadius = (radiusInMeters: number): FormattedMeasurement => {
  return formatDistance(radiusInMeters, 0);
};

/**
 * Format coordinate to human-readable string
 */
export const formatCoordinate = (lat: number, lng: number, precision: number = 6): string => {
  const latFormatted = lat.toFixed(precision);
  const lngFormatted = lng.toFixed(precision);
  return `${latFormatted}, ${lngFormatted}`;
};

/**
 * Format coordinate with direction indicators
 */
export const formatCoordinateWithDirection = (lat: number, lng: number, precision: number = 4): string => {
  const latDir = lat >= 0 ? 'N' : 'S';
  const lngDir = lng >= 0 ? 'E' : 'W';

  const latFormatted = Math.abs(lat).toFixed(precision);
  const lngFormatted = Math.abs(lng).toFixed(precision);

  return `${latFormatted}°${latDir}, ${lngFormatted}°${lngDir}`;
};

/**
 * Format area description for alerts
 */
export const formatAreaDescription = (
  type: 'polygon' | 'marker',
  areaInSquareMeters: number,
  radiusInMeters?: number,
  labels?: {
    circularArea?: string;
    polygonArea?: string;
    area?: string;
    hectares?: string;
  }
): string => {
  const areaFormatted = formatArea(areaInSquareMeters, labels?.hectares);

  if (type === 'marker' && radiusInMeters) {
    const radiusFormatted = formatRadius(radiusInMeters);
    return `${labels?.circularArea || 'Circular area'} ${radiusFormatted.full} (${areaFormatted.full})`;
  }

  if (type === 'polygon') {
    return `${labels?.polygonArea || 'Polygon area'} ${areaFormatted.full}`;
  }

  return `${labels?.area || 'Area'} ${areaFormatted.full}`;
};

/**
 * Format measurement για compact display (μικρά UI elements)
 */
export const formatCompactMeasurement = (areaInSquareMeters: number, hectaresLabel: string = 'hectares'): string => {
  const formatted = formatArea(areaInSquareMeters, hectaresLabel);
  return formatted.full;
};

/**
 * Validate and format numeric input για area/distance inputs
 */
export const formatNumericInput = (value: string, unit: 'area' | 'distance', hectaresLabel: string = 'hectares'): {
  isValid: boolean;
  formatted: string;
  numericValue: number;
} => {
  const numericValue = parseFloat(value);

  if (isNaN(numericValue) || numericValue < 0) {
    return {
      isValid: false,
      formatted: '',
      numericValue: 0
    };
  }

  let maxValue: number;
  let formatted: string;

  if (unit === 'distance') {
    maxValue = 5000; // 5km max radius
    formatted = formatDistance(numericValue).full;
  } else {
    maxValue = 25000000; // 25 km² max area
    formatted = formatArea(numericValue, hectaresLabel).full;
  }

  return {
    isValid: numericValue <= maxValue,
    formatted,
    numericValue
  };
};