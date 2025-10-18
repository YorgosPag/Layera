import L from 'leaflet';
import type { GeometryType, OSMBuildingFeature } from '../types';

/**
 * Geometry utility functions για το geo-drawing system
 */

/**
 * Converts GeoJSON coordinates to Leaflet LatLng array
 * @param coordinates GeoJSON coordinates array
 * @param geometryType Type of geometry
 * @returns Array of LatLng points
 */
export const geoJsonToLatLng = (
  coordinates: number[][] | number[][][],
  geometryType: GeometryType
): L.LatLng[] => {
  if (geometryType === 'Polygon' && Array.isArray(coordinates[0]) && Array.isArray(coordinates[0][0])) {
    // Polygon: coordinates[0] is the exterior ring
    const ring = coordinates as number[][][];
    return ring[0].map(coord => L.latLng(coord[1], coord[0]));
  }

  if (geometryType === 'LineString' && Array.isArray(coordinates[0]) && typeof coordinates[0][0] === 'number') {
    // LineString: coordinates is array of [lng, lat] pairs
    const line = coordinates as number[][];
    return line.map(coord => L.latLng(coord[1], coord[0]));
  }

  if (geometryType === 'Point' && typeof coordinates[0] === 'number') {
    // Point: coordinates is [lng, lat]
    const point = coordinates as number[];
    return [L.latLng(point[1], point[0])];
  }

  return [];
};

/**
 * Converts Leaflet LatLng array to GeoJSON coordinates
 * @param latlngs Array of LatLng points
 * @param geometryType Target geometry type
 * @returns GeoJSON coordinates array
 */
export const latLngToGeoJson = (
  latlngs: L.LatLng[],
  geometryType: GeometryType
): number[][] | number[][][] => {
  const coords = latlngs.map(latlng => [latlng.lng, latlng.lat]);

  if (geometryType === 'Polygon') {
    // Polygon needs to be closed (first point = last point) and wrapped in array
    const closedCoords = [...coords];
    if (coords.length > 0 &&
        (coords[0][0] !== coords[coords.length - 1][0] ||
         coords[0][1] !== coords[coords.length - 1][1])) {
      closedCoords.push(coords[0]);
    }
    return [closedCoords];
  }

  return coords;
};

/**
 * Calculates the closest point on a line segment to a given point
 * @param point Target point
 * @param segmentStart Start of line segment
 * @param segmentEnd End of line segment
 * @returns Closest point on segment and distance
 */
export const closestPointOnSegment = (
  point: L.LatLng,
  segmentStart: L.LatLng,
  segmentEnd: L.LatLng
): { point: L.LatLng; distance: number } => {
  // Convert to projected coordinates for accurate calculations
  const map = L.CRS.EPSG3857;
  const p = map.project(point);
  const a = map.project(segmentStart);
  const b = map.project(segmentEnd);

  const dx = b.x - a.x;
  const dy = b.y - a.y;

  if (dx === 0 && dy === 0) {
    // Segment is a point
    const closestPoint = segmentStart;
    return {
      point: closestPoint,
      distance: point.distanceTo(closestPoint)
    };
  }

  const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy)));
  const closestProjected = L.point(a.x + t * dx, a.y + t * dy);
  const closestPoint = map.unproject(closestProjected);

  return {
    point: closestPoint,
    distance: point.distanceTo(closestPoint)
  };
};

/**
 * Checks if two LatLng points are approximately equal within tolerance
 * @param point1 First point
 * @param point2 Second point
 * @param tolerance Tolerance in meters
 * @returns True if points are within tolerance
 */
export const arePointsEqual = (point1: L.LatLng, point2: L.LatLng, tolerance: number = 0.1): boolean => {
  return point1.distanceTo(point2) <= tolerance;
};

/**
 * Simplifies a polygon using Douglas-Peucker algorithm
 * @param latlngs Array of polygon vertices
 * @param tolerance Simplification tolerance in meters
 * @returns Simplified polygon vertices
 */
export const simplifyPolygon = (latlngs: L.LatLng[], tolerance: number = 1.0): L.LatLng[] => {
  if (latlngs.length <= 2) return latlngs;

  const douglasPeucker = (points: L.LatLng[], epsilon: number): L.LatLng[] => {
    if (points.length <= 2) return points;

    let maxDistance = 0;
    let maxIndex = 0;

    for (let i = 1; i < points.length - 1; i++) {
      const { distance } = closestPointOnSegment(points[i], points[0], points[points.length - 1]);
      if (distance > maxDistance) {
        maxDistance = distance;
        maxIndex = i;
      }
    }

    if (maxDistance > epsilon) {
      const leftPart = douglasPeucker(points.slice(0, maxIndex + 1), epsilon);
      const rightPart = douglasPeucker(points.slice(maxIndex), epsilon);
      return [...leftPart.slice(0, -1), ...rightPart];
    }

    return [points[0], points[points.length - 1]];
  };

  return douglasPeucker(latlngs, tolerance);
};

/**
 * Calculates the bearing between two points
 * @param point1 Start point
 * @param point2 End point
 * @returns Bearing in degrees (0-360)
 */
export const calculateBearing = (point1: L.LatLng, point2: L.LatLng): number => {
  const lat1 = point1.lat * Math.PI / 180;
  const lat2 = point2.lat * Math.PI / 180;
  const deltaLng = (point2.lng - point1.lng) * Math.PI / 180;

  const y = Math.sin(deltaLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLng);

  let bearing = Math.atan2(y, x) * 180 / Math.PI;
  return (bearing + 360) % 360;
};

/**
 * Extracts geometry from OSM Building Feature
 * @param feature OSM building feature
 * @returns Array of LatLng polygons
 */
export const extractOSMGeometry = (feature: OSMBuildingFeature): L.LatLng[][] => {
  const { geometry } = feature;
  const results: L.LatLng[][] = [];

  if (geometry.type === 'Polygon') {
    const coords = geometry.coordinates as number[][][];
    coords.forEach(ring => {
      const latlngs = ring.map(coord => L.latLng(coord[1], coord[0]));
      results.push(latlngs);
    });
  } else if (geometry.type === 'MultiPolygon') {
    const coords = geometry.coordinates as number[][][][];
    coords.forEach(polygon => {
      polygon.forEach(ring => {
        const latlngs = ring.map(coord => L.latLng(coord[1], coord[0]));
        results.push(latlngs);
      });
    });
  }

  return results;
};