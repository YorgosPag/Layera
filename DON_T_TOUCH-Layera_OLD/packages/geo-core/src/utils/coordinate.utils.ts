import type { LatLng } from 'leaflet';
import type { Point2D, GeoPoint, GeoBounds } from '../types';

/**
 * Μετατρέπει LatLng σε Point2D για υπολογισμούς
 */
export function latLngToPoint2D(latlng: LatLng): Point2D {
  return {
    x: latlng.lng,
    y: latlng.lat
  };
}

/**
 * Μετατρέπει Point2D σε GeoPoint
 */
export function point2DToGeoPoint(point: Point2D, elevation?: number): GeoPoint {
  const result: GeoPoint = {
    lat: point.y,
    lng: point.x
  };

  if (elevation !== undefined) {
    result.elevation = elevation;
  }

  return result;
}

/**
 * Μετατρέπει GeoPoint σε LatLng (χρησιμοποιείται με Leaflet)
 */
export function geoPointToLatLng(point: GeoPoint): LatLng {
  // Note: Αυτό επιστρέφει ένα plain object που είναι compatible με LatLng
  // Για πλήρη Leaflet LatLng object, θα χρειαστείς: L.latLng(point.lat, point.lng)
  return {
    lat: point.lat,
    lng: point.lng
  } as LatLng;
}

/**
 * Υπολογίζει το center point από array of coordinates
 */
export function calculateCenter(points: LatLng[]): LatLng | null {
  if (points.length === 0) return null;

  let totalLat = 0;
  let totalLng = 0;

  for (const point of points) {
    totalLat += point.lat;
    totalLng += point.lng;
  }

  return {
    lat: totalLat / points.length,
    lng: totalLng / points.length
  } as LatLng;
}

/**
 * Υπολογίζει bounds από array of coordinates
 */
export function calculateBounds(points: LatLng[]): GeoBounds | null {
  if (points.length === 0) return null;

  const firstPoint = points[0];
  if (!firstPoint) return null;

  let minLat = firstPoint.lat;
  let maxLat = firstPoint.lat;
  let minLng = firstPoint.lng;
  let maxLng = firstPoint.lng;

  for (const point of points) {
    if (point) {
      minLat = Math.min(minLat, point.lat);
      maxLat = Math.max(maxLat, point.lat);
      minLng = Math.min(minLng, point.lng);
      maxLng = Math.max(maxLng, point.lng);
    }
  }

  return {
    south: minLat,
    north: maxLat,
    west: minLng,
    east: maxLng
  };
}

/**
 * Ελέγχει αν ένα point είναι μέσα σε bounds
 */
export function isPointInBounds(point: LatLng, bounds: GeoBounds): boolean {
  return (
    point.lat >= bounds.south &&
    point.lat <= bounds.north &&
    point.lng >= bounds.west &&
    point.lng <= bounds.east
  );
}

/**
 * Υπολογίζει distance μεταξύ δύο points σε meters (Haversine formula)
 */
export function calculateDistance(point1: LatLng, point2: LatLng): number {
  const R = 6371000; // Earth's radius in meters
  const φ1 = (point1.lat * Math.PI) / 180;
  const φ2 = (point2.lat * Math.PI) / 180;
  const Δφ = ((point2.lat - point1.lat) * Math.PI) / 180;
  const Δλ = ((point2.lng - point1.lng) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/**
 * Υπολογίζει area ενός polygon σε square meters
 */
export function calculatePolygonArea(points: LatLng[]): number {
  if (points.length < 3) return 0;

  // Close the polygon if needed
  const closedPoints = [...points];
  const firstPoint = closedPoints[0];
  const lastPoint = closedPoints[closedPoints.length - 1];

  if (
    firstPoint && lastPoint &&
    (firstPoint.lat !== lastPoint.lat || firstPoint.lng !== lastPoint.lng)
  ) {
    closedPoints.push(firstPoint);
  }

  // Use shoelace formula adapted for lat/lng
  let area = 0;
  for (let i = 0; i < closedPoints.length - 1; i++) {
    const p1 = closedPoints[i];
    const p2 = closedPoints[i + 1];
    if (p1 && p2) {
      area += (p2.lng - p1.lng) * (p2.lat + p1.lat);
    }
  }

  // Convert to square meters (approximate)
  const earthRadius = 6371000;
  const areaInSqMeters = Math.abs(area) * (Math.PI / 180) * (Math.PI / 180) * earthRadius * earthRadius / 2;

  return areaInSqMeters;
}