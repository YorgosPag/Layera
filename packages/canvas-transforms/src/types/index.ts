import React from "react";
/**
 * Canvas transformation types για @layera/canvas-transforms
 * Enterprise-grade transformation και coordinate system types
 */

/**
 * 2D Point representation
 */
export interface Point2D {
  x: number;
  y: number;
}

/**
 * 3D Point representation (με support για homogeneous coordinates)
 */
export interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Bounding box representation
 */
export interface BoundingBox {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  width: number;
  height: number;
}

/**
 * Viewport configuration
 */
export interface Viewport {
  x: number;
  y: number;
  width: number;
  height: number;
  scale: number;
  rotation: number;
}

/**
 * Transformation matrix (3x3 για 2D transformations)
 */
export interface TransformationMatrix {
  a: number; // scale x
  b: number; // skew y
  c: number; // skew x
  d: number; // scale y
  e: number; // translate x
  f: number; // translate y
}

/**
 * Canvas transformation state
 */
export interface CanvasTransform {
  matrix: TransformationMatrix;
  viewport: Viewport;
  scale: number;
  translation: Point2D;
  rotation: number;
  origin: Point2D;
}

/**
 * Coordinate system configuration
 */
export interface CoordinateSystem {
  /** Origin point (0,0) location */
  origin: Point2D;
  /** Scale factor για x-axis */
  scaleX: number;
  /** Scale factor για y-axis */
  scaleY: number;
  /** Rotation σε radians */
  rotation: number;
  /** Flip x-axis */
  flipX: boolean;
  /** Flip y-axis */
  flipY: boolean;
}

/**
 * Screen to world coordinate mapping
 */
export interface CoordinateMapping {
  /** Convert screen coordinates to world coordinates */
  screenToWorld: (screenPoint: Point2D) => Point2D;
  /** Convert world coordinates to screen coordinates */
  worldToScreen: (worldPoint: Point2D) => Point2D;
  /** Get current transformation matrix */
  getMatrix: () => TransformationMatrix;
  /** Update coordinate system */
  updateSystem: (system: Partial<CoordinateSystem>) => React.ReactNode;
}

/**
 * Canvas zoom/pan state
 */
export interface ZoomPanState {
  zoom: number;
  panX: number;
  panY: number;
  minZoom: number;
  maxZoom: number;
  bounds?: BoundingBox;
}

/**
 * Mouse/Touch interaction state
 */
export interface InteractionState {
  isDragging: boolean;
  isZooming: boolean;
  lastPointerPosition?: Point2D;
  startPosition?: Point2D;
  startTransform?: CanvasTransform;
}

/**
 * Transform animation configuration
 */
export interface TransformAnimation {
  duration: number;
  easing: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic' | 'easeInQuart' | 'easeOutQuart' | 'easeInOutQuart' | 'elastic' | 'bounce';
  from: Partial<CanvasTransform>;
  to: Partial<CanvasTransform>;
  onUpdate?: (transform: CanvasTransform) => void;
  onComplete?: () => void;
}

/**
 * Canvas constraints configuration
 */
export interface CanvasConstraints {
  minScale: number;
  maxScale: number;
  boundingBox?: BoundingBox;
  lockAspectRatio: boolean;
  snapToGrid: boolean;
  gridSize: number;
}

/**
 * Geometric transformation operations
 */
export interface GeometryTransform {
  /** Apply transformation to point */
  transformPoint: (point: Point2D, matrix: TransformationMatrix) => Point2D;
  /** Apply transformation to bounding box */
  transformBounds: (bounds: BoundingBox, matrix: TransformationMatrix) => BoundingBox;
  /** Calculate inverse transformation */
  inverse: (matrix: TransformationMatrix) => TransformationMatrix;
  /** Combine multiple transformations */
  compose: (matrices: TransformationMatrix[]) => TransformationMatrix;
}

/**
 * Canvas rendering context with transformations
 */
export interface TransformContext {
  /** Canvas 2D rendering context */
  ctx: CanvasRenderingContext2D;
  /** Current transformation state */
  transform: CanvasTransform;
  /** Apply transformation to context */
  applyTransform: () => React.ReactNode;
  /** Reset transformation */
  resetTransform: () => React.ReactNode;
  /** Save current state */
  save: () => React.ReactNode;
  /** Restore previous state */
  restore: () => React.ReactNode;
}