import L from 'leaflet';

/**
 * Calculates the area of a polygon using the Shoelace formula on projected coordinates.
 * Μεταφέρθηκε από OLD_geo-canvas/components/utils/measurementUtils.ts
 * @param latlngs An array of L.LatLng points for the polygon.
 * @returns The calculated area in square meters.
 */
export const calculateProjectedArea = (latlngs: L.LatLng[]): number => {
  if (latlngs.length < 3) return 0;

  // Project points to a cartesian plane (meters) using Web Mercator projection
  const map = L.CRS.EPSG3857;
  const points = latlngs.map(latlng => map.project(latlng));

  let area = 0;
  const n = points.length;
  for (let i = 0; i < n; i++) {
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    area += p1.x * p2.y - p2.x * p1.y;
  }

  return Math.abs(area / 2.0);
};

/**
 * Calculates the total path distance for a series of points.
 * Μεταφέρθηκε από OLD_geo-canvas/components/utils/measurementUtils.ts
 * @param latlngs An array of L.LatLng points.
 * @returns The total distance in meters.
 */
export const calculateDistance = (latlngs: L.LatLng[]): number => {
  if (latlngs.length < 2) {
    return 0;
  }

  let totalDistance = 0;
  for (let i = 0; i < latlngs.length - 1; i++) {
    totalDistance += latlngs[i].distanceTo(latlngs[i + 1]);
  }
  return totalDistance;
};

/**
 * Calculates the distance between two LatLng points using Haversine formula
 * @param point1 First point
 * @param point2 Second point
 * @returns Distance in meters
 */
export const calculatePointDistance = (point1: L.LatLng, point2: L.LatLng): number => {
  return point1.distanceTo(point2);
};

/**
 * Calculates the center point of a polygon
 * @param latlngs Array of polygon vertices
 * @returns Center point as LatLng
 */
export const calculatePolygonCenter = (latlngs: L.LatLng[]): L.LatLng => {
  if (latlngs.length === 0) {
    throw new Error('Cannot calculate center of empty polygon');
  }

  let latSum = 0;
  let lngSum = 0;

  for (const point of latlngs) {
    latSum += point.lat;
    lngSum += point.lng;
  }

  return L.latLng(latSum / latlngs.length, lngSum / latlngs.length);
};

/**
 * Calculates the perimeter of a polygon
 * @param latlngs Array of polygon vertices
 * @returns Perimeter in meters
 */
export const calculatePerimeter = (latlngs: L.LatLng[]): number => {
  if (latlngs.length < 2) return 0;

  // Close the polygon by adding the first point at the end
  const closedPolygon = [...latlngs, latlngs[0]];
  return calculateDistance(closedPolygon);
};

/**
 * Checks if a point is inside a polygon using ray casting algorithm
 * @param point Point to test
 * @param polygon Array of polygon vertices
 * @returns True if point is inside polygon
 */
export const isPointInPolygon = (point: L.LatLng, polygon: L.LatLng[]): boolean => {
  let inside = false;
  const x = point.lng;
  const y = point.lat;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].lng;
    const yi = polygon[i].lat;
    const xj = polygon[j].lng;
    const yj = polygon[j].lat;

    if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
      inside = !inside;
    }
  }

  return inside;
};

/**
 * Calculates the bounding box of a set of points
 * @param latlngs Array of points
 * @returns Leaflet LatLngBounds object
 */
export const calculateBounds = (latlngs: L.LatLng[]): L.LatLngBounds => {
  if (latlngs.length === 0) {
    throw new Error('Cannot calculate bounds of empty point array');
  }

  return L.latLngBounds(latlngs);
};