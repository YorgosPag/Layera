// Layera GeoAlert V1 - CoordinateUtils Micro-Module
// Single Responsibility: Coordinate transformations and utilities
// Enterprise pattern: Pure functions για coordinate operations

import L from 'leaflet';
import { EARTH_CONFIG } from '../../constants';

/**
 * Coordinate utility functions
 * Pure functions - no side effects
 */

export interface Coordinate {
  lat: number;
  lng: number;
}

export interface BoundingBox {
  north: number;
  south: number;
  east: number;
  west: number;
}

/**
 * Convert Leaflet LatLng to our Coordinate interface
 */
export const latLngToCoordinate = (latLng: L.LatLng): Coordinate => ({
  lat: latLng.lat,
  lng: latLng.lng
});

/**
 * Convert Coordinate to Leaflet LatLng
 */
export const coordinateToLatLng = (coord: Coordinate): L.LatLng =>
  new L.LatLng(coord.lat, coord.lng);

/**
 * Calculate distance between two coordinates (Haversine formula)
 * Returns distance in meters
 */
export const calculateDistance = (coord1: Coordinate, coord2: Coordinate): number => {
  const R = EARTH_CONFIG.radiusMeters;
  const dLat = toRadians(coord2.lat - coord1.lat);
  const dLng = toRadians(coord2.lng - coord1.lng);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(coord1.lat)) * Math.cos(toRadians(coord2.lat)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Calculate polygon area in square meters
 */
export const calculatePolygonArea = (coordinates: Coordinate[]): number => {
  if (coordinates.length < 3) return 0;

  // Use Shoelace formula for polygon area
  let area = 0;
  const n = coordinates.length;

  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    area += coordinates[i].lng * coordinates[j].lat;
    area -= coordinates[j].lng * coordinates[i].lat;
  }

  area = Math.abs(area) / 2;

  // Convert to square meters (approximate)
  return area * EARTH_CONFIG.metersPerDegree * EARTH_CONFIG.metersPerDegree;
};

/**
 * Calculate circle area in square meters
 */
export const calculateCircleArea = (radius: number): number => {
  return Math.PI * radius * radius;
};

/**
 * Get bounding box for array of coordinates
 */
export const getBoundingBox = (coordinates: Coordinate[]): BoundingBox | null => {
  if (coordinates.length === 0) return null;

  let north = coordinates[0].lat;
  let south = coordinates[0].lat;
  let east = coordinates[0].lng;
  let west = coordinates[0].lng;

  coordinates.forEach(coord => {
    north = Math.max(north, coord.lat);
    south = Math.min(south, coord.lat);
    east = Math.max(east, coord.lng);
    west = Math.min(west, coord.lng);
  });

  return { north, south, east, west };
};

/**
 * Check if coordinate is within bounding box
 */
export const isCoordinateInBounds = (coord: Coordinate, bounds: BoundingBox): boolean => {
  return coord.lat >= bounds.south &&
         coord.lat <= bounds.north &&
         coord.lng >= bounds.west &&
         coord.lng <= bounds.east;
};

/**
 * Validate coordinate values
 */
export const isValidCoordinate = (coord: Coordinate): boolean => {
  return coord.lat >= EARTH_CONFIG.minLatitude && coord.lat <= EARTH_CONFIG.maxLatitude &&
         coord.lng >= EARTH_CONFIG.minLongitude && coord.lng <= EARTH_CONFIG.maxLongitude &&
         !isNaN(coord.lat) && !isNaN(coord.lng);
};

/**
 * Helper: Convert degrees to radians
 */
const toRadians = (degrees: number): number => degrees * (Math.PI / 180);