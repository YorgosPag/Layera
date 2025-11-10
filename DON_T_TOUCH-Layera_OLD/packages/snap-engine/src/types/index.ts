/**
 * 🎯 SNAP ENGINE CORE TYPES
 * Τύποι δεδομένων για το spatial snapping system
 */

// ========================================
// 📍 GEOMETRIC PRIMITIVES
// ========================================

export interface Point2D {
  x: number;
  y: number;
}

export interface Point3D extends Point2D {
  z: number;
}

export interface BoundingBox {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

// ========================================
// 🎯 SNAP TARGET TYPES
// ========================================

export type SnapType =
  | 'endpoint'
  | 'midpoint'
  | 'center'
  | 'intersection'
  | 'perpendicular'
  | 'tangent'
  | 'nearest'
  | 'grid'
  | 'vertex'
  | 'edge';

export interface SnapTarget {
  id: string;
  type: SnapType;
  point: Point2D;
  geometry: GeometryEntity;
  priority: number;
  tolerance?: number;
  metadata?: Record<string, unknown>;
}

export interface SnapResult {
  target: SnapTarget | null;
  snapped: boolean;
  distance: number;
  cursor: Point2D;
  snapPoint: Point2D;
  snapType: SnapType | null;
}

// ========================================
// 🏗️ GEOMETRY ENTITIES
// ========================================

export type GeometryType =
  | 'line'
  | 'circle'
  | 'arc'
  | 'polyline'
  | 'polygon'
  | 'point'
  | 'spline'
  | 'ellipse'
  | 'rectangle';

export interface GeometryEntity {
  id: string;
  type: GeometryType;
  bounds: BoundingBox;
  layer?: string;
  visible: boolean;
  selectable: boolean;
  data: LineGeometry | CircleGeometry | ArcGeometry | PolylineGeometry | PointGeometry;
}

export interface LineGeometry {
  start: Point2D;
  end: Point2D;
}

export interface CircleGeometry {
  center: Point2D;
  radius: number;
}

export interface ArcGeometry {
  center: Point2D;
  radius: number;
  startAngle: number;
  endAngle: number;
}

export interface PolylineGeometry {
  vertices: Point2D[];
  closed: boolean;
}

export interface PointGeometry {
  position: Point2D;
}

// ========================================
// ⚙️ CONFIGURATION TYPES
// ========================================

export interface SnapConfiguration {
  tolerance: number;
  enabledTypes: Set<SnapType>;
  priority: Record<SnapType, number>;
  maxResults: number;
  performanceLevel: 'high' | 'medium' | 'low';
  debugMode: boolean;
}

export interface SpatialIndexOptions {
  maxEntries: number;
  minEntries: number;
  algorithm: 'rtree' | 'kdtree' | 'quadtree';
  autoRebalance: boolean;
}

// ========================================
// 📊 PERFORMANCE METRICS
// ========================================

export interface SnapPerformanceMetrics {
  searchTime: number;
  indexTime: number;
  totalTime: number;
  geometryCount: number;
  resultsCount: number;
  memoryUsage: number;
}

// ========================================
// 🔄 EVENT TYPES
// ========================================

export interface SnapEngineEvents {
  'snap:start': { cursor: Point2D };
  'snap:found': { result: SnapResult };
  'snap:lost': { lastResult: SnapResult | null };
  'snap:error': { error: Error; context: string };
  'index:rebuilt': { geometryCount: number; indexTime: number };
}

// ========================================
// 🌍 COORDINATE SYSTEM INTEGRATION
// ========================================

export interface CoordinateSystemContext {
  sourceCRS: string;
  targetCRS: string;
  transformer?: (point: Point2D) => Point2D;
  precision: number;
}

// ========================================
// 📁 OSM & CAD INTEGRATION
// ========================================

export interface OSMGeometry extends GeometryEntity {
  osmId: string;
  osmType: 'node' | 'way' | 'relation';
  tags: Record<string, string>;
}

export interface CADGeometry extends GeometryEntity {
  cadType: 'DXF' | 'DWG' | 'SVG';
  layerName: string;
  handle?: string;
  blockReference?: string;
}