import type {
  Point2D,
  CoordinateSystem,
  CoordinateMapping,
  TransformationMatrix,
  Viewport
} from '../types';
import {
  createIdentityMatrix,
  createScaleMatrix,
  createTranslationMatrix,
  createRotationMatrix,
  multiplyMatrices,
  invertMatrix,
  transformPoint
} from './matrixOperations';

/**
 * Coordinate mapping utilities για screen to world conversions
 * Enterprise-grade coordinate system transformations
 */

/**
 * Creates coordinate mapping between screen and world coordinates
 */
export const createCoordinateMapping = (
  viewport: Viewport,
  coordinateSystem: CoordinateSystem
): CoordinateMapping => {
  let currentSystem = { ...coordinateSystem };
  let cachedMatrix: TransformationMatrix | null = null;
  let cachedInverseMatrix: TransformationMatrix | null = null;

  const updateMatrices = (): void => {
    // Create transformation matrix: screen -> world
    let matrix = createIdentityMatrix();

    // 1. Translate viewport offset
    matrix = multiplyMatrices(
      createTranslationMatrix(-viewport.x, -viewport.y),
      matrix
    );

    // 2. Apply viewport inverse scale
    matrix = multiplyMatrices(
      createScaleMatrix(1 / viewport.scale),
      matrix
    );

    // 3. Apply coordinate system transformations
    // Origin translation
    matrix = multiplyMatrices(
      createTranslationMatrix(currentSystem.origin.x, currentSystem.origin.y),
      matrix
    );

    // Rotation
    if (currentSystem.rotation !== 0) {
      matrix = multiplyMatrices(
        createRotationMatrix(-currentSystem.rotation), // Inverse rotation για screen to world
        matrix
      );
    }

    // Scaling
    matrix = multiplyMatrices(
      createScaleMatrix(
        currentSystem.flipX ? -currentSystem.scaleX : currentSystem.scaleX,
        currentSystem.flipY ? -currentSystem.scaleY : currentSystem.scaleY
      ),
      matrix
    );

    cachedMatrix = matrix;
    cachedInverseMatrix = invertMatrix(matrix);
  };

  // Initialize matrices
  updateMatrices();

  return {
    screenToWorld: (screenPoint: Point2D): Point2D => {
      if (!cachedMatrix) updateMatrices();
      return transformPoint(screenPoint, cachedMatrix!);
    },

    worldToScreen: (worldPoint: Point2D): Point2D => {
      if (!cachedInverseMatrix) updateMatrices();
      return transformPoint(worldPoint, cachedInverseMatrix!);
    },

    getMatrix: (): TransformationMatrix => {
      if (!cachedMatrix) updateMatrices();
      return { ...cachedMatrix! };
    },

    updateSystem: (system: Partial<CoordinateSystem>): void => {
      currentSystem = { ...currentSystem, ...system };
      cachedMatrix = null;
      cachedInverseMatrix = null;
    }
  };
};

/**
 * Creates coordinate mapping for specific canvas element
 */
export const createCanvasCoordinateMapping = (
  canvas: HTMLCanvasElement,
  coordinateSystem: CoordinateSystem
): CoordinateMapping => {
  const rect = canvas.getBoundingClientRect();

  const viewport: Viewport = {
    x: 0,
    y: 0,
    width: rect.width,
    height: rect.height,
    scale: 1,
    rotation: 0
  };

  return createCoordinateMapping(viewport, coordinateSystem);
};

/**
 * Converts mouse/touch event coordinates to canvas coordinates
 */
export const getCanvasCoordinates = (
  event: MouseEvent | TouchEvent,
  canvas: HTMLCanvasElement
): Point2D => {
  const rect = canvas.getBoundingClientRect();

  let clientX: number;
  let clientY: number;

  if (event instanceof MouseEvent) {
    clientX = event.clientX;
    clientY = event.clientY;
  } else {
    // TouchEvent - use first touch
    const touch = event.touches[0] || event.changedTouches[0];
    if (!touch) {
      throw new Error('No touch point found in touch event');
    }
    clientX = touch.clientX;
    clientY = touch.clientY;
  }

  return {
    x: clientX - rect.left,
    y: clientY - rect.top
  };
};

/**
 * Geographic coordinate system utilities
 */
export const geoCoordinates = {
  /**
   * Converts latitude/longitude to Web Mercator (EPSG:3857)
   */
  latLngToWebMercator: (lat: number, lng: number): Point2D => {
    const x = lng * 20037508.34 / 180;
    let y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
    y = y * 20037508.34 / 180;

    return { x, y };
  },

  /**
   * Converts Web Mercator to latitude/longitude
   */
  webMercatorToLatLng: (x: number, y: number): Point2D => {
    const lng = x * 180 / 20037508.34;
    let lat = y * 180 / 20037508.34;
    lat = 180 / Math.PI * (2 * Math.atan(Math.exp(lat * Math.PI / 180)) - Math.PI / 2);

    return { x: lng, y: lat };
  },

  /**
   * Creates coordinate system για geographic data
   */
  createGeoCoordinateSystem: (
    bounds: { north: number; south: number; east: number; west: number },
    canvasSize: { width: number; height: number }
  ): CoordinateSystem => {
    // Convert geographic bounds to Web Mercator
    const nw = geoCoordinates.latLngToWebMercator(bounds.north, bounds.west);
    const se = geoCoordinates.latLngToWebMercator(bounds.south, bounds.east);

    const mercatorWidth = se.x - nw.x;
    const mercatorHeight = nw.y - se.y; // Note: y is flipped in Mercator

    const scaleX = canvasSize.width / mercatorWidth;
    const scaleY = canvasSize.height / mercatorHeight;

    return {
      origin: { x: -nw.x, y: -se.y },
      scaleX,
      scaleY,
      rotation: 0,
      flipX: false,
      flipY: true // Geographic coordinates have origin at bottom-left
    };
  }
};

/**
 * Grid coordinate utilities
 */
export const gridCoordinates = {
  /**
   * Snaps point to grid
   */
  snapToGrid: (point: Point2D, gridSize: number): Point2D => ({
    x: Math.round(point.x / gridSize) * gridSize,
    y: Math.round(point.y / gridSize) * gridSize
  }),

  /**
   * Gets grid points within bounding area
   */
  getGridPoints: (
    bounds: { minX: number; minY: number; maxX: number; maxY: number },
    gridSize: number
  ): Point2D[] => {
    const points: Point2D[] = [];

    const startX = Math.floor(bounds.minX / gridSize) * gridSize;
    const endX = Math.ceil(bounds.maxX / gridSize) * gridSize;
    const startY = Math.floor(bounds.minY / gridSize) * gridSize;
    const endY = Math.ceil(bounds.maxY / gridSize) * gridSize;

    for (let x = startX; x <= endX; x += gridSize) {
      for (let y = startY; y <= endY; y += gridSize) {
        points.push({ x, y });
      }
    }

    return points;
  },

  /**
   * Creates coordinate system για grid-based layouts
   */
  createGridCoordinateSystem: (
    _gridSize: number,
    origin: Point2D = { x: 0, y: 0 }
  ): CoordinateSystem => ({
    origin,
    scaleX: 1,
    scaleY: 1,
    rotation: 0,
    flipX: false,
    flipY: false
  })
};

/**
 * Utility για converting between different coordinate systems
 */
export const convertCoordinates = (
  point: Point2D,
  fromSystem: CoordinateMapping,
  toSystem: CoordinateMapping
): Point2D => {
  // Convert from source system to screen coordinates
  const screenPoint = fromSystem.worldToScreen(point);

  // Convert from screen coordinates to target system
  return toSystem.screenToWorld(screenPoint);
};