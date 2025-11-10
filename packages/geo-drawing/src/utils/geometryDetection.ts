/**
 * @layera/geo-drawing - Advanced Geometric Detection Algorithms
 *
 * Enterprise algorithms για intelligent shape recognition και measurement.
 * Integrates με existing calculation utilities.
 */

import * as L from 'leaflet';
import {
  calculateDistance,
  calculateCircleRadius,
  calculateAngle,
  detectCircleFromThreePoints
} from './calculations';
import type {
  MeasurementPoint,
  CircleMeasurement,
  ArcMeasurement,
  MeasurementMode
} from '../types';

/**
 * Geometric shape detection thresholds
 */
const DETECTION_THRESHOLDS = {
  /** Tolerance για circle detection (percentage deviation from perfect circle) */
  CIRCLE_TOLERANCE: 0.05, // 5%

  /** Minimum points required για reliable circle detection */
  MIN_CIRCLE_POINTS: 3,

  /** Maximum points to consider για circle detection (performance) */
  MAX_CIRCLE_POINTS: 8,

  /** Tolerance για line detection (max deviation from straight line) */
  LINE_TOLERANCE: 5, // meters

  /** Tolerance για right angle detection */
  RIGHT_ANGLE_TOLERANCE: Math.PI / 36, // 5 degrees in radians

  /** Minimum distance between points to be considered significant */
  MIN_SIGNIFICANT_DISTANCE: 1 // meters
} as const;

/**
 * Detected geometry types
 */
export type DetectedGeometry =
  | { type: 'circle'; properties: CircleMeasurement }
  | { type: 'arc'; properties: ArcMeasurement }
  | { type: 'line'; properties: { start: L.LatLng; end: L.LatLng; length: number } }
  | { type: 'rectangle'; properties: { corners: L.LatLng[]; area: number; perimeter: number } }
  | { type: 'triangle'; properties: { vertices: L.LatLng[]; area: number; angles: number[] } }
  | { type: 'polygon'; properties: { vertices: L.LatLng[]; area: number; perimeter: number } }
  | { type: 'unknown'; properties: Record<string, never> };

/**
 * Analyzes a set of points και detects the most likely geometric shape
 */
export const detectGeometry = (points: MeasurementPoint[]): DetectedGeometry => {
  if (points.length < 2) {
    return { type: 'unknown', properties: {} };
  }

  const latlngs = points.map(p => p.latlng);

  // Try circle detection first (most specific)
  if (points.length >= DETECTION_THRESHOLDS.MIN_CIRCLE_POINTS) {
    const circleResult = detectCircle(latlngs);
    if (circleResult) {
      return { type: 'circle', properties: circleResult };
    }
  }

  // Try line detection
  if (points.length === 2) {
    return {
      type: 'line',
      properties: {
        start: latlngs[0]!,
        end: latlngs[1]!,
        length: calculateDistance(latlngs)
      }
    };
  }

  // Try rectangle detection
  if (points.length === 4 || points.length === 5) {
    const rectangleResult = detectRectangle(latlngs);
    if (rectangleResult) {
      return { type: 'rectangle', properties: rectangleResult };
    }
  }

  // Try triangle detection
  if (points.length === 3 || points.length === 4) {
    const triangleResult = detectTriangle(latlngs.slice(0, 3));
    if (triangleResult) {
      return { type: 'triangle', properties: triangleResult };
    }
  }

  // Default to polygon
  return detectPolygon(latlngs);
};

/**
 * Detects if points form a circle
 */
const detectCircle = (points: L.LatLng[]): CircleMeasurement | null => {
  if (points.length < DETECTION_THRESHOLDS.MIN_CIRCLE_POINTS) {
    return null;
  }

  // Take subset of points για performance
  const samplePoints = points.length > DETECTION_THRESHOLDS.MAX_CIRCLE_POINTS
    ? samplePointsEvenly(points, DETECTION_THRESHOLDS.MAX_CIRCLE_POINTS)
    : points;

  // Try to find circle από first 3 points
  const circleFromThree = detectCircleFromThreePoints(
    samplePoints[0]!,
    samplePoints[1]!,
    samplePoints[2]!
  );

  if (!circleFromThree) {
    return null;
  }

  const { center, radius } = circleFromThree;

  // Verify all other points fit the circle within tolerance
  let totalDeviation = 0;
  let validPoints = 0;

  for (const point of samplePoints) {
    const distanceToCenter = calculateCircleRadius(center, point);
    const deviation = Math.abs(distanceToCenter - radius) / radius;

    if (deviation <= DETECTION_THRESHOLDS.CIRCLE_TOLERANCE) {
      validPoints++;
    }
    totalDeviation += deviation;
  }

  // Require at least 80% of points to fit circle
  const validRatio = validPoints / samplePoints.length;
  if (validRatio < 0.8) {
    return null;
  }

  // Calculate circle properties
  const area = Math.PI * radius * radius;
  const circumference = 2 * Math.PI * radius;
  const diameter = 2 * radius;

  return {
    center,
    radius,
    area,
    circumference,
    diameter
  };
};

/**
 * Detects if points form a rectangle
 */
const detectRectangle = (points: L.LatLng[]): { corners: L.LatLng[]; area: number; perimeter: number } | null => {
  if (points.length !== 4 && points.length !== 5) {
    return null;
  }

  // If 5 points, assume last point closes the rectangle
  const corners = points.length === 5 ? points.slice(0, 4) : points;

  // Check if we have 4 right angles
  const angles: number[] = [];
  for (let i = 0; i < 4; i++) {
    const prev = corners[(i + 3) % 4]!;
    const current = corners[i]!;
    const next = corners[(i + 1) % 4]!;

    const angle = calculateAngle(prev, current, next);
    angles.push(angle);
  }

  // Check if all angles are approximately 90 degrees
  const rightAngle = Math.PI / 2;
  const rightAngleCount = angles.filter(angle =>
    Math.abs(angle - rightAngle) <= DETECTION_THRESHOLDS.RIGHT_ANGLE_TOLERANCE
  ).length;

  if (rightAngleCount < 3) { // Allow one angle to be slightly off
    return null;
  }

  // Calculate area using shoelace formula
  let area = 0;
  for (let i = 0; i < 4; i++) {
    const current = corners[i]!;
    const next = corners[(i + 1) % 4]!;
    area += (current.lng * next.lat - next.lng * current.lat);
  }
  area = Math.abs(area) / 2;

  // Calculate perimeter
  let perimeter = 0;
  for (let i = 0; i < 4; i++) {
    const current = corners[i]!;
    const next = corners[(i + 1) % 4]!;
    perimeter += calculateDistance([current, next]);
  }

  return {
    corners,
    area,
    perimeter
  };
};

/**
 * Detects triangle properties
 */
const detectTriangle = (points: L.LatLng[]): { vertices: L.LatLng[]; area: number; angles: number[] } | null => {
  if (points.length < 3) {
    return null;
  }

  const vertices = points.slice(0, 3);

  // Calculate angles
  const angles = [
    calculateAngle(vertices[2]!, vertices[0]!, vertices[1]!),
    calculateAngle(vertices[0]!, vertices[1]!, vertices[2]!),
    calculateAngle(vertices[1]!, vertices[2]!, vertices[0]!)
  ];

  // Calculate area using cross product
  const a = vertices[0]!;
  const b = vertices[1]!;
  const c = vertices[2]!;

  const area = Math.abs(
    (b.lat - a.lat) * (c.lng - a.lng) - (c.lat - a.lat) * (b.lng - a.lng)
  ) / 2;

  return {
    vertices,
    area,
    angles
  };
};

/**
 * Default polygon detection
 */
const detectPolygon = (points: L.LatLng[]): DetectedGeometry => {
  if (points.length < 3) {
    return { type: 'unknown', properties: {} };
  }

  // Calculate area using shoelace formula
  let area = 0;
  const n = points.length;
  for (let i = 0; i < n; i++) {
    const current = points[i]!;
    const next = points[(i + 1) % n]!;
    area += (current.lng * next.lat - next.lng * current.lat);
  }
  area = Math.abs(area) / 2;

  // Calculate perimeter
  let perimeter = 0;
  for (let i = 0; i < n; i++) {
    const current = points[i]!;
    const next = points[(i + 1) % n]!;
    perimeter += calculateDistance([current, next]);
  }

  return {
    type: 'polygon',
    properties: {
      vertices: points,
      area,
      perimeter
    }
  };
};

/**
 * Samples points evenly από a larger set
 */
const samplePointsEvenly = (points: L.LatLng[], targetCount: number): L.LatLng[] => {
  if (points.length <= targetCount) {
    return points;
  }

  const result: L.LatLng[] = [];
  const step = points.length / targetCount;

  for (let i = 0; i < targetCount; i++) {
    const index = Math.floor(i * step);
    const point = points[index];
    if (point) {
      result.push(point);
    }
  }

  return result;
};

/**
 * Suggests the most appropriate measurement mode based on detected geometry
 */
export const suggestMeasurementMode = (detectedGeometry: DetectedGeometry): MeasurementMode => {
  switch (detectedGeometry.type) {
    case 'circle':
      return 'circle-area';
    case 'line':
      return 'distance';
    case 'rectangle':
    case 'triangle':
    case 'polygon':
      return 'area';
    case 'arc':
      return 'arc-length';
    default:
      return 'point';
  }
};

/**
 * Calculates confidence score για detected geometry (0-1)
 */
export const calculateDetectionConfidence = (
  points: MeasurementPoint[],
  detectedGeometry: DetectedGeometry
): number => {
  if (points.length < 2) {
    return 0;
  }

  switch (detectedGeometry.type) {
    case 'circle':
      return calculateCircleConfidence(points.map(p => p.latlng), detectedGeometry.properties);

    case 'line':
      return points.length === 2 ? 1.0 : 0.5;

    case 'rectangle':
      return calculateRectangleConfidence(points.map(p => p.latlng));

    case 'triangle':
      return points.length === 3 ? 0.9 : 0.6;

    case 'polygon':
      return 0.7; // Moderate confidence για general polygons

    default:
      return 0.1;
  }
};

/**
 * Calculates confidence για circle detection
 */
const calculateCircleConfidence = (points: L.LatLng[], circle: CircleMeasurement): number => {
  let totalDeviation = 0;

  for (const point of points) {
    const distanceToCenter = calculateCircleRadius(circle.center, point);
    const deviation = Math.abs(distanceToCenter - circle.radius) / circle.radius;
    totalDeviation += deviation;
  }

  const averageDeviation = totalDeviation / points.length;
  return Math.max(0, 1 - (averageDeviation / DETECTION_THRESHOLDS.CIRCLE_TOLERANCE));
};

/**
 * Calculates confidence για rectangle detection
 */
const calculateRectangleConfidence = (points: L.LatLng[]): number => {
  if (points.length !== 4 && points.length !== 5) {
    return 0;
  }

  const corners = points.length === 5 ? points.slice(0, 4) : points;
  const rightAngle = Math.PI / 2;
  let rightAngleCount = 0;

  for (let i = 0; i < 4; i++) {
    const prev = corners[(i + 3) % 4]!;
    const current = corners[i]!;
    const next = corners[(i + 1) % 4]!;

    const angle = calculateAngle(prev, current, next);
    if (Math.abs(angle - rightAngle) <= DETECTION_THRESHOLDS.RIGHT_ANGLE_TOLERANCE) {
      rightAngleCount++;
    }
  }

  return rightAngleCount / 4;
};