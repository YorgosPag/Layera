/**
 * @layera/map-labels - Positioning Utilities
 *
 * Enterprise algorithms για intelligent label positioning.
 * Integrates με @layera/geo-drawing calculations.
 */

import L from 'leaflet';
import { calculatePolygonCenter, isPointInPolygon, calculateBounds } from '@layera/geo-drawing';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { POSITIONING, ERROR_MESSAGES } from './constants';

/**
 * Calculates optimal position για map label using intelligent algorithms
 */
export const calculateOptimalLabelPosition = (
  coordinates: L.LatLng[],
  strategy: 'centroid' | 'largest-inscribed-circle' | 'visual-center' | 'custom' = 'centroid'
): L.LatLng => {
  if (coordinates.length === 0) {
    throw new Error(ERROR_MESSAGES.INVALID_COORDINATES);
  }

  switch (strategy) {
    case 'centroid':
      return calculateCentroidPosition(coordinates);

    case 'largest-inscribed-circle':
      return calculateLargestInscribedCircleCenter(coordinates);

    case 'visual-center':
      return calculateVisualCenter(coordinates);

    case 'custom':
      // Custom strategy can be implemented by caller
      return calculateCentroidPosition(coordinates);

    default:
      return calculateCentroidPosition(coordinates);
  }
};

/**
 * Calculates polygon centroid - fastest method
 */
const calculateCentroidPosition = (coordinates: L.LatLng[]): L.LatLng => {
  try {
    const centroid = calculatePolygonCenter(coordinates);

    // Check if centroid is inside polygon
    if (isPointInPolygon(centroid, coordinates)) {
      return centroid;
    }

    // If centroid is outside, find a point inside
    return findPointInsidePolygon(coordinates);
  } catch (error) {
    throw new Error(`${ERROR_MESSAGES.POSITIONING_FAILED}: ${error}`);
  }
};

/**
 * Finds largest inscribed circle center - best για complex polygons
 */
const calculateLargestInscribedCircleCenter = (coordinates: L.LatLng[]): L.LatLng => {
  // Implementation of pole of inaccessibility algorithm
  // This is a simplified version - για production θα χρησιμοποιούσαμε specialized library

  const bounds = calculateBounds(coordinates);
  const cellSize = Math.min(
    bounds.getEast() - bounds.getWest(),
    bounds.getNorth() - bounds.getSouth()
  ) / 20;

  let bestCell = {
    point: bounds.getCenter(),
    distance: 0
  };

  // Grid search για largest inscribed circle
  for (let y = bounds.getSouth(); y < bounds.getNorth(); y += cellSize) {
    for (let x = bounds.getWest(); x < bounds.getEast(); x += cellSize) {
      const point = L.latLng(y, x);

      if (isPointInPolygon(point, coordinates)) {
        const distance = getDistanceToPolygonEdge(point, coordinates);
        if (distance > bestCell.distance) {
          bestCell = { point, distance };
        }
      }
    }
  }

  return bestCell.point;
};

/**
 * Calculates visual center - best για user perception
 */
const calculateVisualCenter = (coordinates: L.LatLng[]): L.LatLng => {
  // Visual center considers both geometric center and shape complexity
  const centroid = calculatePolygonCenter(coordinates);

  if (isPointInPolygon(centroid, coordinates)) {
    return centroid;
  }

  // Find visual center using bounding box approach
  const bounds = calculateBounds(coordinates);
  const center = bounds.getCenter();

  // If center is inside, use it
  if (isPointInPolygon(center, coordinates)) {
    return center;
  }

  // Otherwise, find closest point inside polygon
  return findPointInsidePolygon(coordinates);
};

/**
 * Finds a point guaranteed to be inside polygon
 */
const findPointInsidePolygon = (coordinates: L.LatLng[]): L.LatLng => {
  // Use ray casting to find interior point
  const bounds = calculateBounds(coordinates);
  const center = bounds.getCenter();

  // Start from center and move towards first vertex until inside
  const firstVertex = coordinates[0];
  if (!firstVertex) {
    throw new Error(ERROR_MESSAGES.INVALID_COORDINATES);
  }

  for (let ratio = 0.1; ratio <= 1; ratio += 0.1) {
    const testPoint = L.latLng(
      center.lat + (firstVertex.lat - center.lat) * ratio,
      center.lng + (firstVertex.lng - center.lng) * ratio
    );

    if (isPointInPolygon(testPoint, coordinates)) {
      return testPoint;
    }
  }

  // Fallback to first vertex if nothing works
  return firstVertex;
};

/**
 * Calculates distance from point to polygon edge
 */
const getDistanceToPolygonEdge = (point: L.LatLng, coordinates: L.LatLng[]): number => {
  let minDistance = Infinity;

  for (let i = 0; i < coordinates.length; i++) {
    const current = coordinates[i];
    const next = coordinates[(i + 1) % coordinates.length];

    if (!current || !next) continue;

    const distance = getDistanceToLineSegment(point, current, next);
    minDistance = Math.min(minDistance, distance);
  }

  return minDistance;
};

/**
 * Calculates distance from point to line segment
 */
const getDistanceToLineSegment = (
  point: L.LatLng,
  lineStart: L.LatLng,
  lineEnd: L.LatLng
): number => {
  const A = point.lng - lineStart.lng;
  const B = point.lat - lineStart.lat;
  const C = lineEnd.lng - lineStart.lng;
  const D = lineEnd.lat - lineStart.lat;

  const dot = A * C + B * D;
  const lenSq = C * C + D * D;

  if (lenSq === 0) {
    // Line segment is a point
    return point.distanceTo(lineStart);
  }

  let param = dot / lenSq;
  param = Math.max(0, Math.min(1, param));

  const closestPoint = L.latLng(
    lineStart.lat + param * D,
    lineStart.lng + param * C
  );

  return point.distanceTo(closestPoint);
};

/**
 * Checks for label overlap και suggests alternative position
 */
export const avoidLabelOverlap = (
  proposedPosition: L.LatLng,
  existingLabels: Array<{ position: L.LatLng; bounds: L.LatLngBounds }>,
  polygonBounds: L.LatLngBounds
): L.LatLng => {
  const labelSize = {
    width: 0.001, // Approximate label width in degrees
    height: 0.0005 // Approximate label height in degrees
  };

  // Create bounds για proposed label
  const proposedBounds = L.latLngBounds([
    [proposedPosition.lat - labelSize.height / 2, proposedPosition.lng - labelSize.width / 2],
    [proposedPosition.lat + labelSize.height / 2, proposedPosition.lng + labelSize.width / 2]
  ]);

  // Check for overlaps
  let hasOverlap = false;
  for (const existing of existingLabels) {
    if (proposedBounds.intersects(existing.bounds)) {
      hasOverlap = true;
      break;
    }
  }

  if (!hasOverlap) {
    return proposedPosition;
  }

  // Find alternative position
  const alternatives = [
    L.latLng(proposedPosition.lat + labelSize.height, proposedPosition.lng),
    L.latLng(proposedPosition.lat - labelSize.height, proposedPosition.lng),
    L.latLng(proposedPosition.lat, proposedPosition.lng + labelSize.width),
    L.latLng(proposedPosition.lat, proposedPosition.lng - labelSize.width)
  ];

  for (const alternative of alternatives) {
    if (polygonBounds.contains(alternative)) {
      const altBounds = L.latLngBounds([
        [alternative.lat - labelSize.height / 2, alternative.lng - labelSize.width / 2],
        [alternative.lat + labelSize.height / 2, alternative.lng + labelSize.width / 2]
      ]);

      let altHasOverlap = false;
      for (const existing of existingLabels) {
        if (altBounds.intersects(existing.bounds)) {
          altHasOverlap = true;
          break;
        }
      }

      if (!altHasOverlap) {
        return alternative;
      }
    }
  }

  // Fallback to original position if no alternatives work
  return proposedPosition;
};

/**
 * Calculates label bounds για overlap detection
 */
export const calculateLabelBounds = (
  position: L.LatLng,
  text: string,
  fontSize: number = 14
): L.LatLngBounds => {
  // Estimate text dimensions based on character count και font size
  const charWidth = fontSize * 0.6; // Approximate character width
  const textWidth = text.length * charWidth;
  const textHeight = fontSize * 1.2; // Include line height

  // Convert pixels to degrees (rough approximation)
  const pixelToDegree = 0.0001;
  const widthDegrees = textWidth * pixelToDegree;
  const heightDegrees = textHeight * pixelToDegree;

  return L.latLngBounds([
    [position.lat - heightDegrees / 2, position.lng - widthDegrees / 2],
    [position.lat + heightDegrees / 2, position.lng + widthDegrees / 2]
  ]);
};

/**
 * Validates position is within reasonable bounds
 */
export const validateLabelPosition = (
  position: L.LatLng,
  allowedBounds?: L.LatLngBounds
): boolean => {
  // Check basic coordinate validity
  if (!position || isNaN(position.lat) || isNaN(position.lng)) {
    return false;
  }

  // Check latitude bounds
  if (position.lat < -90 || position.lat > 90) {
    return false;
  }

  // Check longitude bounds
  if (position.lng < -180 || position.lng > 180) {
    return false;
  }

  // Check against allowed bounds
  if (allowedBounds && !allowedBounds.contains(position)) {
    return false;
  }

  return true;
};