// Layera GeoAlert V1 - GeometryValidator Micro-Module
// Single Responsibility: Validate geometric shapes and constraints
// Enterprise pattern: Validation rules centralized

import { Coordinate, isValidCoordinate } from './coordinate-utils';
import { DRAWING_LIMITS } from '../../types';

/**
 * Validation results interface
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Polygon validation rules
 */
export const validatePolygon = (coordinates: Coordinate[]): ValidationResult => {
  const result: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: []
  };

  // Minimum points check
  if (coordinates.length < 3) {
    result.isValid = false;
    result.errors.push('Polygon must have at least 3 points');
    return result;
  }

  // Maximum points check
  if (coordinates.length > DRAWING_LIMITS.MAX_POLYGON_POINTS) {
    result.isValid = false;
    result.errors.push(`Polygon cannot have more than ${DRAWING_LIMITS.MAX_POLYGON_POINTS} points`);
  }

  // Validate each coordinate
  coordinates.forEach((coord, index) => {
    if (!isValidCoordinate(coord)) {
      result.isValid = false;
      result.errors.push(`Invalid coordinate at point ${index + 1}`);
    }
  });

  // Check for self-intersection (basic check)
  if (hasBasicSelfIntersection(coordinates)) {
    result.warnings.push('Polygon may have self-intersections');
  }

  // Check polygon area (minimum size)
  const area = calculateSimplePolygonArea(coordinates);
  if (area < 100) { // 100 square meters minimum
    result.warnings.push('Polygon area is very small (< 100 m²)');
  }

  return result;
};

/**
 * Marker validation rules
 */
export const validateMarker = (coordinate: Coordinate, radius?: number): ValidationResult => {
  const result: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: []
  };

  // Coordinate validation
  if (!isValidCoordinate(coordinate)) {
    result.isValid = false;
    result.errors.push('Invalid marker coordinate');
  }

  // Radius validation
  if (radius !== undefined) {
    if (radius < DRAWING_LIMITS.MIN_RADIUS) {
      result.isValid = false;
      result.errors.push(`Radius must be at least ${DRAWING_LIMITS.MIN_RADIUS} meters`);
    }

    if (radius > DRAWING_LIMITS.MAX_RADIUS) {
      result.isValid = false;
      result.errors.push(`Radius cannot exceed ${DRAWING_LIMITS.MAX_RADIUS} meters`);
    }

    // Warning για very large areas
    const area = Math.PI * radius * radius;
    if (area > 1000000) { // 1 km²
      result.warnings.push('Alert area is very large (> 1 km²)');
    }
  }

  return result;
};

/**
 * Validate complete GeoAlert area
 */
export const validateGeoAlertArea = (
  type: 'polygon' | 'marker',
  coordinates: number[],
  radius?: number
): ValidationResult => {
  if (type === 'marker') {
    if (coordinates.length !== 2) {
      return {
        isValid: false,
        errors: ['Marker must have exactly 2 coordinates (lat, lng)'],
        warnings: []
      };
    }

    const coord: Coordinate = { lat: coordinates[0], lng: coordinates[1] };
    return validateMarker(coord, radius);
  }

  if (type === 'polygon') {
    if (coordinates.length < 6 || coordinates.length % 2 !== 0) {
      return {
        isValid: false,
        errors: ['Polygon coordinates must be pairs of [lat, lng]'],
        warnings: []
      };
    }

    const coords: Coordinate[] = [];
    for (let i = 0; i < coordinates.length; i += 2) {
      coords.push({ lat: coordinates[i], lng: coordinates[i + 1] });
    }

    return validatePolygon(coords);
  }

  return {
    isValid: false,
    errors: ['Unknown geometry type'],
    warnings: []
  };
};

/**
 * Check for basic self-intersection in polygon
 * Simple algorithm - checks if any two non-adjacent edges intersect
 */
const hasBasicSelfIntersection = (coordinates: Coordinate[]): boolean => {
  const n = coordinates.length;
  if (n < 4) return false;

  for (let i = 0; i < n; i++) {
    for (let j = i + 2; j < n; j++) {
      // Skip adjacent edges and last-first edge
      if ((i === 0 && j === n - 1) || Math.abs(i - j) === 1) continue;

      const edge1Start = coordinates[i];
      const edge1End = coordinates[(i + 1) % n];
      const edge2Start = coordinates[j];
      const edge2End = coordinates[(j + 1) % n];

      if (doLinesIntersect(edge1Start, edge1End, edge2Start, edge2End)) {
        return true;
      }
    }
  }

  return false;
};

/**
 * Check if two line segments intersect
 */
const doLinesIntersect = (
  p1: Coordinate, p2: Coordinate,
  p3: Coordinate, p4: Coordinate
): boolean => {
  const d1 = direction(p3, p4, p1);
  const d2 = direction(p3, p4, p2);
  const d3 = direction(p1, p2, p3);
  const d4 = direction(p1, p2, p4);

  return (d1 * d2 < 0) && (d3 * d4 < 0);
};

/**
 * Calculate direction of three points
 */
const direction = (a: Coordinate, b: Coordinate, c: Coordinate): number => {
  return (c.lng - a.lng) * (b.lat - a.lat) - (b.lng - a.lng) * (c.lat - a.lat);
};

/**
 * Simple polygon area calculation (for validation purposes)
 */
const calculateSimplePolygonArea = (coordinates: Coordinate[]): number => {
  if (coordinates.length < 3) return 0;

  let area = 0;
  const n = coordinates.length;

  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    area += coordinates[i].lng * coordinates[j].lat;
    area -= coordinates[j].lng * coordinates[i].lat;
  }

  return Math.abs(area) / 2 * 111319.9 * 111319.9; // Approximate m²
};