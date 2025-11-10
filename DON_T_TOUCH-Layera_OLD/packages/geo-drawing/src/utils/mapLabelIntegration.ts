/**
 * @layera/geo-drawing - Map Labels Integration
 *
 * Enterprise integration με @layera/map-labels για unified annotations.
 * Converts measurement results σε map label configurations.
 */

import * as L from 'leaflet';
import {
  calculateDistance
} from './calculations';
import type {
  MeasurementResult,
  MeasurementPoint,
  CircleMeasurement
} from '../types';
import type { DetectedGeometry } from './geometryDetection';

/**
 * Map label configuration για @layera/map-labels integration
 */
export interface MapLabelConfig {
  /** Position για το label */
  position: L.LatLng;
  /** Text content */
  text: string;
  /** Label variant type */
  variant: 'title' | 'subtitle' | 'area' | 'distance' | 'info' | 'warning' | 'success';
  /** Background type */
  background: 'transparent' | 'semi-transparent' | 'solid';
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Whether label is clickable */
  clickable?: boolean;
  /** Custom CSS classes */
  customClasses?: string[];
  /** Z-index priority */
  priority?: 'normal' | 'high' | 'critical';
}

/**
 * Μεταφέρει measurement result σε map label configuration
 */
export const measurementToMapLabel = (
  measurement: MeasurementResult,
  options: {
    showUnits?: boolean;
    locale?: string;
    precision?: number;
    customPosition?: L.LatLng;
  } = {}
): MapLabelConfig => {
  const {
    showUnits = true,
    locale = 'el-GR',
    precision,
    customPosition
  } = options;

  // Calculate optimal position
  const position = customPosition || calculateOptimalLabelPosition(measurement.points);

  // Determine variant based on measurement type
  const variant = getVariantForMeasurementType(measurement.type);

  // Format display text
  const text = formatMeasurementForLabel(measurement, {
    showUnits,
    locale,
    precision: precision ?? undefined
  });

  return {
    position,
    text,
    variant,
    background: 'semi-transparent',
    align: 'center',
    clickable: true,
    priority: 'normal'
  };
};

/**
 * Μεταφέρει detected geometry σε multiple map labels
 */
export const geometryToMapLabels = (
  geometry: DetectedGeometry,
  points: MeasurementPoint[],
  options: {
    showDetails?: boolean;
    locale?: string;
    showCoordinates?: boolean;
  } = {}
): MapLabelConfig[] => {
  const { showCoordinates = false } = options;
  const labels: MapLabelConfig[] = [];

  switch (geometry.type) {
    case 'circle':
      labels.push(...createCircleLabels(geometry.properties, options));
      break;

    case 'rectangle':
      labels.push(...createRectangleLabels(geometry.properties, options));
      break;

    case 'triangle':
      labels.push(...createTriangleLabels(geometry.properties, options));
      break;

    case 'line':
      labels.push(createLineLabel(geometry.properties, options));
      break;

    case 'polygon':
      labels.push(...createPolygonLabels(geometry.properties, options));
      break;

    default:
      // Create basic point labels
      if (showCoordinates) {
        labels.push(...createPointLabels(points, options));
      }
  }

  return labels;
};

/**
 * Creates circle-specific labels
 */
const createCircleLabels = (
  circle: CircleMeasurement,
  options: { showDetails?: boolean; locale?: string }
): MapLabelConfig[] => {
  const labels: MapLabelConfig[] = [];
  const { showDetails = true, locale = 'el-GR' } = options;

  // Main area label at center
  labels.push({
    position: circle.center,
    text: formatArea(circle.area, locale),
    variant: 'area',
    background: 'semi-transparent',
    align: 'center',
    clickable: true,
    priority: 'high'
  });

  if (showDetails) {
    // Radius label
    const radiusPosition = calculateRadiusLabelPosition(circle.center, circle.radius);
    labels.push({
      position: radiusPosition,
      text: `R: ${formatDistance(circle.radius, locale)}`,
      variant: 'distance',
      background: 'semi-transparent',
      align: 'center',
      clickable: false,
      priority: 'normal'
    });

    // Circumference label
    const circumferencePosition = calculateCircumferenceLabelPosition(circle.center, circle.radius);
    labels.push({
      position: circumferencePosition,
      text: `C: ${formatDistance(circle.circumference, locale)}`,
      variant: 'info',
      background: 'semi-transparent',
      align: 'center',
      clickable: false,
      priority: 'normal'
    });
  }

  return labels;
};

/**
 * Creates rectangle-specific labels
 */
const createRectangleLabels = (
  rectangle: { corners: L.LatLng[]; area: number; perimeter: number },
  options: { showDetails?: boolean; locale?: string }
): MapLabelConfig[] => {
  const labels: MapLabelConfig[] = [];
  const { showDetails = true, locale = 'el-GR' } = options;

  // Center area label
  const center = calculatePolygonCenter(rectangle.corners);
  labels.push({
    position: center,
    text: formatArea(rectangle.area, locale),
    variant: 'area',
    background: 'semi-transparent',
    align: 'center',
    clickable: true,
    priority: 'high'
  });

  if (showDetails) {
    // Perimeter label
    labels.push({
      position: calculatePerimeterLabelPosition(rectangle.corners),
      text: `P: ${formatDistance(rectangle.perimeter, locale)}`,
      variant: 'distance',
      background: 'semi-transparent',
      align: 'center',
      clickable: false,
      priority: 'normal'
    });

    // Side length labels
    const sideLabels = calculateSideLengthLabels(rectangle.corners, locale);
    labels.push(...sideLabels);
  }

  return labels;
};

/**
 * Creates triangle-specific labels
 */
const createTriangleLabels = (
  triangle: { vertices: L.LatLng[]; area: number; angles: number[] },
  options: { showDetails?: boolean; locale?: string }
): MapLabelConfig[] => {
  const labels: MapLabelConfig[] = [];
  const { showDetails = true, locale = 'el-GR' } = options;

  // Center area label
  const center = calculatePolygonCenter(triangle.vertices);
  labels.push({
    position: center,
    text: formatArea(triangle.area, locale),
    variant: 'area',
    background: 'semi-transparent',
    align: 'center',
    clickable: true,
    priority: 'high'
  });

  if (showDetails) {
    // Angle labels at each vertex
    triangle.vertices.forEach((vertex, index) => {
      const angleDegrees = (triangle.angles[index]! * 180) / Math.PI;
      labels.push({
        position: vertex,
        text: `${angleDegrees.toFixed(1)}°`,
        variant: 'info',
        background: 'semi-transparent',
        align: 'center',
        clickable: false,
        priority: 'normal'
      });
    });
  }

  return labels;
};

/**
 * Creates line label
 */
const createLineLabel = (
  line: { start: L.LatLng; end: L.LatLng; length: number },
  options: { locale?: string }
): MapLabelConfig => {
  const { locale = 'el-GR' } = options;

  // Mid-point label
  const midPoint = L.latLng(
    (line.start.lat + line.end.lat) / 2,
    (line.start.lng + line.end.lng) / 2
  );

  return {
    position: midPoint,
    text: formatDistance(line.length, locale),
    variant: 'distance',
    background: 'semi-transparent',
    align: 'center',
    clickable: true,
    priority: 'normal'
  };
};

/**
 * Creates polygon labels
 */
const createPolygonLabels = (
  polygon: { vertices: L.LatLng[]; area: number; perimeter: number },
  options: { showDetails?: boolean; locale?: string }
): MapLabelConfig[] => {
  const labels: MapLabelConfig[] = [];
  const { showDetails = true, locale = 'el-GR' } = options;

  // Center area label
  const center = calculatePolygonCenter(polygon.vertices);
  labels.push({
    position: center,
    text: formatArea(polygon.area, locale),
    variant: 'area',
    background: 'semi-transparent',
    align: 'center',
    clickable: true,
    priority: 'high'
  });

  if (showDetails) {
    // Perimeter label
    labels.push({
      position: calculatePerimeterLabelPosition(polygon.vertices),
      text: `P: ${formatDistance(polygon.perimeter, locale)}`,
      variant: 'distance',
      background: 'semi-transparent',
      align: 'center',
      clickable: false,
      priority: 'normal'
    });
  }

  return labels;
};

/**
 * Creates point coordinate labels
 */
const createPointLabels = (
  points: MeasurementPoint[],
  options: { locale?: string }
): MapLabelConfig[] => {
  const { locale: _locale = 'el-GR' } = options;

  return points.map((point, index) => ({
    position: point.latlng,
    text: point.label || `P${index + 1}`,
    variant: 'info' as const,
    background: 'transparent' as const,
    align: 'center' as const,
    clickable: true,
    priority: 'normal' as const
  }));
};

// Helper functions

const calculateOptimalLabelPosition = (points: MeasurementPoint[]): L.LatLng => {
  if (points.length === 0) {
    return L.latLng(0, 0);
  }

  const latlngs = points.map(p => p.latlng);
  return calculatePolygonCenter(latlngs);
};

const calculatePolygonCenter = (points: L.LatLng[]): L.LatLng => {
  let latSum = 0;
  let lngSum = 0;

  for (const point of points) {
    latSum += point.lat;
    lngSum += point.lng;
  }

  return L.latLng(latSum / points.length, lngSum / points.length);
};

const calculateRadiusLabelPosition = (center: L.LatLng, radius: number): L.LatLng => {
  // Position label at 45 degrees από center
  const bearing = Math.PI / 4; // 45 degrees
  const distance = radius * 0.7; // 70% of radius

  const lat = center.lat + (distance / 111320) * Math.cos(bearing);
  const lng = center.lng + (distance / (111320 * Math.cos(center.lat * Math.PI / 180))) * Math.sin(bearing);

  return L.latLng(lat, lng);
};

const calculateCircumferenceLabelPosition = (center: L.LatLng, radius: number): L.LatLng => {
  // Position label at 135 degrees από center
  const bearing = (3 * Math.PI) / 4; // 135 degrees
  const distance = radius * 1.1; // Slightly outside circle

  const lat = center.lat + (distance / 111320) * Math.cos(bearing);
  const lng = center.lng + (distance / (111320 * Math.cos(center.lat * Math.PI / 180))) * Math.sin(bearing);

  return L.latLng(lat, lng);
};

const calculatePerimeterLabelPosition = (vertices: L.LatLng[]): L.LatLng => {
  // Find the longest edge και place label at its midpoint
  let longestEdge = { start: vertices[0]!, end: vertices[1]!, length: 0 };

  for (let i = 0; i < vertices.length; i++) {
    const start = vertices[i]!;
    const end = vertices[(i + 1) % vertices.length]!;
    const length = calculateDistance([start, end]);

    if (length > longestEdge.length) {
      longestEdge = { start, end, length };
    }
  }

  return L.latLng(
    (longestEdge.start.lat + longestEdge.end.lat) / 2,
    (longestEdge.start.lng + longestEdge.end.lng) / 2
  );
};

const calculateSideLengthLabels = (corners: L.LatLng[], locale: string): MapLabelConfig[] => {
  const labels: MapLabelConfig[] = [];

  for (let i = 0; i < corners.length; i++) {
    const start = corners[i]!;
    const end = corners[(i + 1) % corners.length]!;
    const length = calculateDistance([start, end]);

    const midPoint = L.latLng(
      (start.lat + end.lat) / 2,
      (start.lng + end.lng) / 2
    );

    labels.push({
      position: midPoint,
      text: formatDistance(length, locale),
      variant: 'distance',
      background: 'transparent',
      align: 'center',
      clickable: false,
      priority: 'normal'
    });
  }

  return labels;
};

const getVariantForMeasurementType = (type: string): MapLabelConfig['variant'] => {
  switch (type) {
    case 'area':
    case 'circle-area':
      return 'area';
    case 'distance':
    case 'circle-radius':
    case 'circle-diameter':
    case 'circle-circumference':
    case 'arc-length':
      return 'distance';
    case 'angle':
      return 'info';
    case 'perimeter':
      return 'distance';
    default:
      return 'info';
  }
};

const formatMeasurementForLabel = (
  measurement: MeasurementResult,
  options: { showUnits?: boolean; locale?: string; precision?: number | undefined }
): string => {
  const { showUnits = true, locale = 'el-GR', precision } = options;

  // Use existing displayValue if available
  if (measurement.displayValue && showUnits) {
    return measurement.displayValue;
  }

  // Format based on measurement type
  switch (measurement.type) {
    case 'area':
    case 'circle-area':
      return formatArea(measurement.area || 0, locale, precision);

    case 'distance':
      return formatDistance(measurement.distance || 0, locale, precision);

    case 'circle-radius':
      return formatDistance(measurement.radius || 0, locale, precision);

    case 'circle-circumference':
      return formatDistance(measurement.circumference || 0, locale, precision);

    case 'circle-diameter':
      return formatDistance(measurement.diameter || 0, locale, precision);

    case 'arc-length':
      return formatDistance(measurement.arcLength || 0, locale, precision);

    case 'angle':
      const degrees = ((measurement.angle || 0) * 180) / Math.PI;
      return `${degrees.toFixed(precision || 1)}°`;

    case 'perimeter':
      return formatDistance(measurement.perimeter || 0, locale, precision);

    default:
      return measurement.displayValue || '';
  }
};

const formatArea = (area: number, _locale: string, precision?: number): string => {
  // Simplified formatting - in production would use @layera/tolgee
  if (area >= 1000000) {
    return `${(area / 1000000).toFixed(precision || 2)} km²`;
  } else if (area >= 10000) {
    return `${(area / 10000).toFixed(precision || 1)} ha`;
  } else {
    return `${area.toFixed(precision || 0)} m²`;
  }
};

const formatDistance = (distance: number, _locale: string, precision?: number): string => {
  // Simplified formatting - in production would use @layera/tolgee
  if (distance >= 1000) {
    return `${(distance / 1000).toFixed(precision || 2)} km`;
  } else {
    return `${distance.toFixed(precision || 0)} m`;
  }
};