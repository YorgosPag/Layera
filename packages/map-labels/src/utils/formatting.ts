/**
 * @layera/map-labels - Formatting Utilities
 *
 * Enterprise formatting για area, distance, και text display.
 * Integrates με @layera/tolgee για multi-language support.
 */

import type { AreaUnit, DistanceUnit } from '../types';
import { AREA_THRESHOLDS, DISTANCE_THRESHOLDS, FORMATTING } from './constants';

/**
 * Formats area value with appropriate unit και precision
 */
export const formatArea = (
  areaInSquareMeters: number,
  preferredUnit: AreaUnit | 'auto' = 'auto',
  precision?: number,
  locale: string = 'el-GR'
): string => {
  if (areaInSquareMeters < 0) {
    return '0 m²';
  }

  let value: number;
  let unit: AreaUnit;
  let finalPrecision: number;

  // Auto-select best unit if requested
  if (preferredUnit === 'auto') {
    if (areaInSquareMeters >= AREA_THRESHOLDS.KM_THRESHOLD) {
      unit = 'km²';
      value = areaInSquareMeters / 1_000_000;
      finalPrecision = precision ?? FORMATTING.AREA_PRECISION['km²'];
    } else if (areaInSquareMeters >= AREA_THRESHOLDS.HECTARE_THRESHOLD) {
      unit = 'hectares';
      value = areaInSquareMeters / 10_000;
      finalPrecision = precision ?? FORMATTING.AREA_PRECISION['hectares'];
    } else {
      unit = 'm²';
      value = areaInSquareMeters;
      finalPrecision = precision ?? FORMATTING.AREA_PRECISION['m²'];
    }
  } else {
    // Use specified unit
    unit = preferredUnit;
    finalPrecision = precision ?? FORMATTING.AREA_PRECISION[unit];

    switch (unit) {
      case 'km²':
        value = areaInSquareMeters / 1_000_000;
        break;
      case 'hectares':
        value = areaInSquareMeters / 10_000;
        break;
      case 'm²':
        value = areaInSquareMeters;
        break;
    }
  }

  // Format number με locale
  const formattedNumber = new Intl.NumberFormat(locale, {
    minimumFractionDigits: finalPrecision,
    maximumFractionDigits: finalPrecision
  }).format(value);

  return `${formattedNumber} ${unit}`;
};

/**
 * Formats distance value with appropriate unit και precision
 */
export const formatDistance = (
  distanceInMeters: number,
  preferredUnit: DistanceUnit | 'auto' = 'auto',
  precision?: number,
  locale: string = 'el-GR'
): string => {
  if (distanceInMeters < 0) {
    return '0 m';
  }

  let value: number;
  let unit: DistanceUnit;
  let finalPrecision: number;

  // Auto-select best unit if requested
  if (preferredUnit === 'auto') {
    if (distanceInMeters >= DISTANCE_THRESHOLDS.KM_THRESHOLD) {
      unit = 'km';
      value = distanceInMeters / 1000;
      finalPrecision = precision ?? FORMATTING.DISTANCE_PRECISION['km'];
    } else {
      unit = 'm';
      value = distanceInMeters;
      finalPrecision = precision ?? FORMATTING.DISTANCE_PRECISION['m'];
    }
  } else {
    // Use specified unit
    unit = preferredUnit;
    finalPrecision = precision ?? FORMATTING.DISTANCE_PRECISION[unit];

    switch (unit) {
      case 'km':
        value = distanceInMeters / 1000;
        break;
      case 'm':
        value = distanceInMeters;
        break;
      case 'miles':
        value = distanceInMeters / 1609.344;
        break;
      case 'feet':
        value = distanceInMeters * 3.28084;
        break;
    }
  }

  // Format number με locale
  const formattedNumber = new Intl.NumberFormat(locale, {
    minimumFractionDigits: finalPrecision,
    maximumFractionDigits: finalPrecision
  }).format(value);

  return `${formattedNumber} ${unit}`;
};

/**
 * Formats population number με locale-specific formatting
 */
export const formatPopulation = (
  population: number,
  locale: string = 'el-GR',
  style: 'short' | 'long' = 'short'
): string => {
  if (population < 0) {
    return '0';
  }

  if (style === 'short') {
    // Use compact notation για large numbers
    return new Intl.NumberFormat(locale, {
      notation: 'compact',
      compactDisplay: 'short'
    }).format(population);
  } else {
    // Use full number με thousands separators
    return new Intl.NumberFormat(locale).format(population);
  }
};

/**
 * Truncates text to fit within specified pixel width
 */
export const truncateText = (
  text: string,
  maxWidth: number,
  fontSize: number = 14,
  ellipsis: string = '...'
): string => {
  // Estimate character width based on font size
  const charWidth = fontSize * 0.6;
  const maxChars = Math.floor(maxWidth / charWidth);

  if (text.length <= maxChars) {
    return text;
  }

  // Reserve space για ellipsis
  const ellipsisChars = ellipsis.length;
  const availableChars = maxChars - ellipsisChars;

  if (availableChars <= 0) {
    return ellipsis;
  }

  return text.substring(0, availableChars) + ellipsis;
};

/**
 * Capitalizes first letter of each word
 */
export const titleCase = (text: string): string => {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Removes common prefixes από administrative names
 */
export const cleanAdministrativeName = (name: string): string => {
  // Common prefixes to remove
  const prefixes = [
    'Δήμος ',
    'Δημοτική Ενότητα ',
    'Περιφέρεια ',
    'Περιφερειακή Ενότητα ',
    'Κοινότητα ',
    'Municipality of ',
    'City of ',
    'County of ',
    'Region of '
  ];

  let cleaned = name;

  for (const prefix of prefixes) {
    if (cleaned.startsWith(prefix)) {
      cleaned = cleaned.substring(prefix.length);
      break; // Only remove first matching prefix
    }
  }

  // Remove common suffixes
  const suffixes = [
    ' Municipality',
    ' County',
    ' Region',
    ' Δήμος',
    ' Περιφέρεια'
  ];

  for (const suffix of suffixes) {
    if (cleaned.endsWith(suffix)) {
      cleaned = cleaned.substring(0, cleaned.length - suffix.length);
      break;
    }
  }

  return cleaned.trim();
};

/**
 * Formats coordinates για display
 */
export const formatCoordinates = (
  lat: number,
  lng: number,
  format: 'decimal' | 'dms' = 'decimal',
  precision: number = 6
): string => {
  if (format === 'decimal') {
    const formattedLat = lat.toFixed(precision);
    const formattedLng = lng.toFixed(precision);
    return `${formattedLat}, ${formattedLng}`;
  }

  // DMS format (Degrees, Minutes, Seconds)
  const formatDMS = (coord: number, isLatitude: boolean): string => {
    const abs = Math.abs(coord);
    const degrees = Math.floor(abs);
    const minutes = Math.floor((abs - degrees) * 60);
    const seconds = ((abs - degrees) * 60 - minutes) * 60;

    const direction = isLatitude
      ? (coord >= 0 ? 'N' : 'S')
      : (coord >= 0 ? 'E' : 'W');

    return `${degrees}°${minutes}'${seconds.toFixed(1)}"${direction}`;
  };

  return `${formatDMS(lat, true)} ${formatDMS(lng, false)}`;
};

/**
 * Creates compound label text με multiple values
 */
export const createCompoundLabel = (
  components: Array<{
    label: string;
    value: string;
    priority: number;
  }>,
  maxLength?: number,
  separator: string = ' • '
): string => {
  // Sort by priority (higher = more important)
  const sorted = components
    .filter(comp => comp.value.trim() !== '')
    .sort((a, b) => b.priority - a.priority);

  if (sorted.length === 0) {
    return '';
  }

  let result = '';

  for (const component of sorted) {
    const entry = `${component.label}: ${component.value}`;
    const potential = result
      ? `${result}${separator}${entry}`
      : entry;

    // Check length constraint
    if (maxLength && potential.length > maxLength) {
      break;
    }

    result = potential;
  }

  return result || sorted[0]?.value || '';
};

/**
 * Validates formatted text για display
 */
export const validateFormattedText = (
  text: string,
  maxLength?: number,
  allowEmpty: boolean = false
): { isValid: boolean; error?: string } => {
  if (!allowEmpty && (!text || text.trim().length === 0)) {
    return { isValid: false, error: 'Text cannot be empty' };
  }

  if (maxLength && text.length > maxLength) {
    return {
      isValid: false,
      error: `Text exceeds maximum length of ${maxLength} characters`
    };
  }

  // Check για problematic characters
  const problematicChars = /[<>'"&]/;
  if (problematicChars.test(text)) {
    return {
      isValid: false,
      error: 'Text contains potentially unsafe characters'
    };
  }

  return { isValid: true };
};

/**
 * Gets appropriate decimal precision based on value magnitude
 */
export const getOptimalPrecision = (
  value: number,
  type: 'area' | 'distance' | 'coordinate' = 'area'
): number => {
  const abs = Math.abs(value);

  switch (type) {
    case 'area':
      if (abs >= 1000) return 0;
      if (abs >= 100) return 1;
      if (abs >= 10) return 2;
      return 3;

    case 'distance':
      if (abs >= 1000) return 0;
      if (abs >= 100) return 1;
      if (abs >= 10) return 2;
      return 3;

    case 'coordinate':
      return 6; // Standard για GPS coordinates

    default:
      return 2;
  }
};