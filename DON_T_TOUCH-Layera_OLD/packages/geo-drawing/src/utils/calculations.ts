import * as L from 'leaflet';

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
    if (p1 && p2) {
      area += p1.x * p2.y - p2.x * p1.y;
    }
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
    const point1 = latlngs[i];
    const point2 = latlngs[i + 1];
    if (point1 && point2) {
      totalDistance += point1.distanceTo(point2);
    }
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
  const firstPoint = latlngs[0];
  if (!firstPoint) return 0;
  const closedPolygon = [...latlngs, firstPoint];
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
    const pointI = polygon[i];
    const pointJ = polygon[j];
    if (!pointI || !pointJ) continue;

    const xi = pointI.lng;
    const yi = pointI.lat;
    const xj = pointJ.lng;
    const yj = pointJ.lat;

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

/**
 * Calculates the radius of a circle from center to a point on circumference
 * @param center Center point of the circle
 * @param circumferencePoint Point on the circle's circumference
 * @returns Radius in meters
 */
export const calculateCircleRadius = (center: L.LatLng, circumferencePoint: L.LatLng): number => {
  return center.distanceTo(circumferencePoint);
};

/**
 * Calculates the area of a circle
 * @param radius Radius in meters
 * @returns Area in square meters
 */
export const calculateCircleArea = (radius: number): number => {
  if (radius <= 0) return 0;
  return Math.PI * radius * radius;
};

/**
 * Calculates the circumference of a circle
 * @param radius Radius in meters
 * @returns Circumference in meters
 */
export const calculateCircleCircumference = (radius: number): number => {
  if (radius <= 0) return 0;
  return 2 * Math.PI * radius;
};

/**
 * Calculates the diameter of a circle
 * @param radius Radius in meters
 * @returns Diameter in meters
 */
export const calculateCircleDiameter = (radius: number): number => {
  if (radius <= 0) return 0;
  return 2 * radius;
};

/**
 * Calculates arc length given radius and angle
 * @param radius Radius in meters
 * @param angleRadians Angle in radians
 * @returns Arc length in meters
 */
export const calculateArcLength = (radius: number, angleRadians: number): number => {
  if (radius <= 0 || angleRadians <= 0) return 0;
  return radius * angleRadians;
};

/**
 * Calculates the angle between three points (middle point is the vertex)
 * @param point1 First point
 * @param vertex Middle point (vertex of the angle)
 * @param point2 Third point
 * @returns Angle in radians
 */
export const calculateAngle = (point1: L.LatLng, vertex: L.LatLng, point2: L.LatLng): number => {
  // Convert to projected coordinates for accurate calculation
  const map = L.CRS.EPSG3857;
  const p1 = map.project(point1);
  const v = map.project(vertex);
  const p2 = map.project(point2);

  // Calculate vectors from vertex to each point
  const vector1 = { x: p1.x - v.x, y: p1.y - v.y };
  const vector2 = { x: p2.x - v.x, y: p2.y - v.y };

  // Calculate dot product and magnitudes
  const dotProduct = vector1.x * vector2.x + vector1.y * vector2.y;
  const magnitude1 = Math.sqrt(vector1.x * vector1.x + vector1.y * vector1.y);
  const magnitude2 = Math.sqrt(vector2.x * vector2.x + vector2.y * vector2.y);

  if (magnitude1 === 0 || magnitude2 === 0) return 0;

  // Calculate angle using inverse cosine
  const cosAngle = dotProduct / (magnitude1 * magnitude2);

  // Clamp to valid range for acos
  const clampedCos = Math.max(-1, Math.min(1, cosAngle));

  return Math.acos(clampedCos);
};

/**
 * Detects if three points form a circle and calculates its properties
 * @param point1 First point on circle
 * @param point2 Second point on circle
 * @param point3 Third point on circle
 * @returns Circle properties or null if points don't form a valid circle
 */
export const detectCircleFromThreePoints = (
  point1: L.LatLng,
  point2: L.LatLng,
  point3: L.LatLng
): { center: L.LatLng; radius: number } | null => {
  // Convert to projected coordinates for accurate calculation
  const map = L.CRS.EPSG3857;
  const p1 = map.project(point1);
  const p2 = map.project(point2);
  const p3 = map.project(point3);

  // Check if points are collinear
  const area = Math.abs((p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y)) / 2);
  if (area < 1e-10) {
    return null; // Points are collinear
  }

  // Calculate circumcenter using the perpendicular bisector method
  const d = 2 * (p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y));

  if (Math.abs(d) < 1e-10) {
    return null; // Points are too close to collinear
  }

  const ux = ((p1.x * p1.x + p1.y * p1.y) * (p2.y - p3.y) +
             (p2.x * p2.x + p2.y * p2.y) * (p3.y - p1.y) +
             (p3.x * p3.x + p3.y * p3.y) * (p1.y - p2.y)) / d;

  const uy = ((p1.x * p1.x + p1.y * p1.y) * (p3.x - p2.x) +
             (p2.x * p2.x + p2.y * p2.y) * (p1.x - p3.x) +
             (p3.x * p3.x + p3.y * p3.y) * (p2.x - p1.x)) / d;

  // Convert back to geographic coordinates
  const centerProjected = L.point(ux, uy);
  const center = map.unproject(centerProjected);

  // Calculate radius
  const radius = center.distanceTo(point1);

  return { center, radius };
};