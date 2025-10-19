/**
 * @layera/canvas-transforms
 * Enterprise-grade canvas transformation utilities για Layera ecosystem
 *
 * Features:
 * - Matrix transformation operations (2D & 3D)
 * - Coordinate system mapping (screen ↔ world)
 * - Viewport management με zoom/pan support
 * - Transform animations με easing functions
 * - Canvas utilities για rendering με transformations
 * - Geographic coordinate support (lat/lng ↔ Web Mercator)
 * - Grid and ruler rendering utilities
 * - High DPI canvas support
 * - Enterprise-grade TypeScript typing
 */

// Core Types
export type {
  Point2D,
  Point3D,
  BoundingBox,
  Viewport,
  TransformationMatrix,
  CanvasTransform,
  CoordinateSystem,
  CoordinateMapping,
  ZoomPanState,
  InteractionState,
  TransformAnimation,
  CanvasConstraints,
  GeometryTransform,
  TransformContext
} from './types';

// Matrix Operations
export {
  createIdentityMatrix,
  createTranslationMatrix,
  createScaleMatrix,
  createRotationMatrix,
  createRotationAroundPointMatrix,
  multiplyMatrices,
  getMatrixDeterminant,
  invertMatrix,
  transformPoint,
  transformPoints,
  transformBoundingBox,
  decompose,
  compose,
  isIdentity,
  interpolateMatrix,
  matrixToCSSTransform,
  matrixToSVGTransform
} from './utils/matrixOperations';

// Coordinate Mapping
export {
  createCoordinateMapping,
  createCanvasCoordinateMapping,
  getCanvasCoordinates,
  geoCoordinates,
  gridCoordinates,
  convertCoordinates
} from './utils/coordinateMapping';

// Viewport Management
export { ViewportManager } from './utils/viewportManager';

// Transform Animations
export {
  TransformAnimator,
  easingFunctions,
  globalAnimator,
  animations,
  animationUtils
} from './utils/transformAnimations';

// Canvas Utilities
export {
  createTransformContext,
  applyMatrixToContext,
  drawGrid,
  drawAxes,
  drawRuler,
  drawCrosshair,
  measureText,
  setupHighDPICanvas
} from './utils/canvasUtils';

// Default configurations
export const DEFAULT_VIEWPORT = {
  x: 0,
  y: 0,
  width: 800,
  height: 600,
  scale: 1,
  rotation: 0
};

export const DEFAULT_CONSTRAINTS = {
  minScale: 0.1,
  maxScale: 10,
  lockAspectRatio: false,
  snapToGrid: false,
  gridSize: 10
};

export const DEFAULT_COORDINATE_SYSTEM = {
  origin: { x: 0, y: 0 },
  scaleX: 1,
  scaleY: 1,
  rotation: 0,
  flipX: false,
  flipY: false
};