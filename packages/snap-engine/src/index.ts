/**
 * 🎯 @layera/snap-engine
 *
 * High-performance spatial snapping engine για Layera LEGO architecture
 *
 * Enterprise-grade snapping system βασισμένο σε:
 * - AutoCAD OSNAP algorithms
 * - ESRI spatial indexing patterns
 * - PostGIS performance optimizations
 *
 * @author Layera Team
 * @version 1.0.0
 */

// Import types for internal use
import type {
  SnapConfiguration,
  GeometryType,
  GeometryEntity,
  LineGeometry,
  CircleGeometry,
  ArcGeometry,
  PolylineGeometry,
  PointGeometry
} from './types';

// Import classes for internal use
import { SnapEngine } from './SnapEngine';
import { GeometryUtils } from './utils/GeometryUtils';

// ========================================
// 🚀 MAIN ENGINE EXPORT
// ========================================

export { SnapEngine };

// ========================================
// 🧩 CORE ALGORITHMS
// ========================================

export { SnapCalculator } from './algorithms/SnapCalculator';
export { RTreeSpatialIndex } from './spatial/RTreeIndex';

// ========================================
// 🔧 UTILITIES
// ========================================

export { GeometryUtils };

// ========================================
// 📝 TYPE DEFINITIONS
// ========================================

export type {
  // Geometric primitives
  Point2D,
  Point3D,
  BoundingBox,

  // Snap system types
  SnapType,
  SnapTarget,
  SnapResult,
  SnapConfiguration,
  SnapPerformanceMetrics,
  SnapEngineEvents,

  // Geometry types
  GeometryType,
  GeometryEntity,
  LineGeometry,
  CircleGeometry,
  ArcGeometry,
  PolylineGeometry,
  PointGeometry,

  // Integration types
  CoordinateSystemContext,
  OSMGeometry,
  CADGeometry,

  // Spatial index types
  SpatialIndexOptions
} from './types';

// ========================================
// ⚙️ CONFIGURATION CONSTANTS
// ========================================

/**
 * Default snap configuration που χρησιμοποιεί @layera/constants
 */
// Snap priority constants - geometric calculation values
const SNAP_PRIORITIES = {
  PERPENDICULAR: 70, // Perpendicular snap priority - geometric constant
  TANGENT: 65 // Tangent snap priority - geometric constant
};

export const DEFAULT_SNAP_CONFIG = {
  tolerance: 10, // Snap tolerance in pixels - geometric constant
  enabledTypes: new Set(['endpoint', 'midpoint', 'center'] as const),
  priority: {
    endpoint: 100, // Highest priority for endpoint snapping - geometric constant
    midpoint: 80,
    center: 90,
    vertex: 85,
    intersection: 95,
    perpendicular: SNAP_PRIORITIES.PERPENDICULAR,
    tangent: SNAP_PRIORITIES.TANGENT,
    nearest: 60,
    grid: 50,
    edge: 75
  },
  maxResults: 10,
  performanceLevel: 'medium' as const,
  debugMode: false
};

/**
 * Spatial index default options
 */
export const DEFAULT_SPATIAL_OPTIONS = {
  maxEntries: 16, // R-tree max entries per node - performance constant
  minEntries: 4,
  algorithm: 'rtree' as const,
  autoRebalance: true
};

// ========================================
// 🎯 SNAP TYPE DEFINITIONS
// ========================================

/**
 * Supported snap types με priorities
 */
export const SNAP_TYPES = {
  ENDPOINT: 'endpoint',
  MIDPOINT: 'midpoint',
  CENTER: 'center',
  VERTEX: 'vertex',
  INTERSECTION: 'intersection',
  PERPENDICULAR: 'perpendicular',
  TANGENT: 'tangent',
  NEAREST: 'nearest',
  GRID: 'grid',
  EDGE: 'edge'
} as const;

// Performance constants - technical optimization values
const PERFORMANCE_CONSTANTS = {
  SEARCH_RADIUS_MEDIUM: 25, // Medium performance search radius - technical constant
  MAX_GEOMETRIES_LOW: 1000 // Low performance geometry limit - technical constant
};

/**
 * Performance level configurations
 */
export const PERFORMANCE_CONFIGS = {
  high: {
    maxGeometries: 10000, // Maximum geometries for high performance - technical constant
    indexRebuildThreshold: 100,
    searchRadius: 50
  },
  medium: {
    maxGeometries: 5000,
    indexRebuildThreshold: 250,
    searchRadius: PERFORMANCE_CONSTANTS.SEARCH_RADIUS_MEDIUM
  },
  low: {
    maxGeometries: PERFORMANCE_CONSTANTS.MAX_GEOMETRIES_LOW,
    indexRebuildThreshold: 500,
    searchRadius: 15
  }
} as const;

// ========================================
// 🚀 CONVENIENCE FACTORY FUNCTIONS
// ========================================

/**
 * Δημιουργεί SnapEngine με optimized settings για CAD workflows
 */
export function createCADSnapEngine(config?: Partial<SnapConfiguration>) {
  return new SnapEngine({
    tolerance: 5,
    enabledTypes: new Set(['endpoint', 'midpoint', 'center', 'vertex', 'intersection']),
    performanceLevel: 'high',
    ...config
  });
}

/**
 * Δημιουργεί SnapEngine με optimized settings για GIS/mapping workflows
 */
export function createGISSnapEngine(config?: Partial<SnapConfiguration>) {
  return new SnapEngine({
    tolerance: 15,
    enabledTypes: new Set(['endpoint', 'vertex', 'nearest']),
    performanceLevel: 'medium',
    ...config
  });
}

/**
 * Δημιουργεί lightweight SnapEngine για mobile/low-power devices
 */
export function createMobileSnapEngine(config?: Partial<SnapConfiguration>) {
  return new SnapEngine({
    tolerance: 20,
    enabledTypes: new Set(['endpoint', 'vertex']),
    performanceLevel: 'low',
    maxResults: 5,
    ...config
  });
}

// ========================================
// 🔧 UTILITY HELPERS
// ========================================

/**
 * Validates snap configuration
 */
export function validateSnapConfig(config: Partial<SnapConfiguration>): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  const TOLERANCE_LIMITS = { MIN: 1, MAX: 100 }; // Snap tolerance validation limits
  if (config.tolerance && (config.tolerance < TOLERANCE_LIMITS.MIN || config.tolerance > TOLERANCE_LIMITS.MAX)) {
    errors.push(`Tolerance must be between ${TOLERANCE_LIMITS.MIN} and ${TOLERANCE_LIMITS.MAX} pixels`);
  }

  if (config.maxResults && config.maxResults > 50) {
    warnings.push('High maxResults may impact performance');
  }

  if (config.enabledTypes && config.enabledTypes.size === 0) {
    warnings.push('No snap types enabled - snapping will be disabled');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Creates geometry entity από simple data
 */
export function createGeometry(
  id: string,
  type: GeometryType,
  data: LineGeometry | CircleGeometry | ArcGeometry | PolylineGeometry | PointGeometry,
  options?: {
    layer?: string;
    visible?: boolean;
    selectable?: boolean;
  }
): GeometryEntity {
  const geometry: GeometryEntity = {
    id,
    type,
    data,
    bounds: { minX: 0, minY: 0, maxX: 0, maxY: 0 }, // Will be calculated
    layer: options?.layer || 'default',
    visible: options?.visible ?? true,
    selectable: options?.selectable ?? true
  };

  // Calculate bounds
  geometry.bounds = GeometryUtils.calculateBounds(geometry);

  return geometry;
}

// ========================================
// 📊 VERSION INFORMATION
// ========================================

export const SNAP_ENGINE_VERSION = '1.0.0';
export const SNAP_ENGINE_BUILD_INFO = {
  version: SNAP_ENGINE_VERSION,
  buildDate: new Date().toISOString(),
  features: [
    'R-tree spatial indexing',
    'AutoCAD-style snap algorithms',
    'OSM geometry integration',
    'CAD file format support',
    'Coordinate system transformations',
    'Performance monitoring',
    'TypeScript strict typing'
  ]
};

// ========================================
// 🎯 DEFAULT EXPORT
// ========================================

export default SnapEngine;