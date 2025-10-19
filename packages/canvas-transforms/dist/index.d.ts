/**
 * Canvas transformation types για @layera/canvas-transforms
 * Enterprise-grade transformation και coordinate system types
 */
/**
 * 2D Point representation
 */
interface Point2D {
    x: number;
    y: number;
}
/**
 * 3D Point representation (με support για homogeneous coordinates)
 */
interface Point3D {
    x: number;
    y: number;
    z: number;
}
/**
 * Bounding box representation
 */
interface BoundingBox {
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
interface Viewport {
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
interface TransformationMatrix {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
}
/**
 * Canvas transformation state
 */
interface CanvasTransform {
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
interface CoordinateSystem {
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
interface CoordinateMapping {
    /** Convert screen coordinates to world coordinates */
    screenToWorld: (screenPoint: Point2D) => Point2D;
    /** Convert world coordinates to screen coordinates */
    worldToScreen: (worldPoint: Point2D) => Point2D;
    /** Get current transformation matrix */
    getMatrix: () => TransformationMatrix;
    /** Update coordinate system */
    updateSystem: (system: Partial<CoordinateSystem>) => void;
}
/**
 * Canvas zoom/pan state
 */
interface ZoomPanState {
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
interface InteractionState {
    isDragging: boolean;
    isZooming: boolean;
    lastPointerPosition?: Point2D;
    startPosition?: Point2D;
    startTransform?: CanvasTransform;
}
/**
 * Transform animation configuration
 */
interface TransformAnimation {
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
interface CanvasConstraints {
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
interface GeometryTransform {
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
interface TransformContext {
    /** Canvas 2D rendering context */
    ctx: CanvasRenderingContext2D;
    /** Current transformation state */
    transform: CanvasTransform;
    /** Apply transformation to context */
    applyTransform: () => void;
    /** Reset transformation */
    resetTransform: () => void;
    /** Save current state */
    save: () => void;
    /** Restore previous state */
    restore: () => void;
}

/**
 * Matrix operations utilities για canvas transformations
 * Βασισμένο σε industry-standard matrix math operations
 */
/**
 * Creates identity transformation matrix
 */
declare const createIdentityMatrix: () => TransformationMatrix;
/**
 * Creates translation matrix
 */
declare const createTranslationMatrix: (x: number, y: number) => TransformationMatrix;
/**
 * Creates scaling matrix
 */
declare const createScaleMatrix: (scaleX: number, scaleY?: number) => TransformationMatrix;
/**
 * Creates rotation matrix
 */
declare const createRotationMatrix: (angle: number) => TransformationMatrix;
/**
 * Creates rotation matrix around specific point
 */
declare const createRotationAroundPointMatrix: (angle: number, centerX: number, centerY: number) => TransformationMatrix;
/**
 * Multiplies two transformation matrices
 */
declare const multiplyMatrices: (m1: TransformationMatrix, m2: TransformationMatrix) => TransformationMatrix;
/**
 * Calculates matrix determinant
 */
declare const getMatrixDeterminant: (matrix: TransformationMatrix) => number;
/**
 * Calculates inverse transformation matrix
 */
declare const invertMatrix: (matrix: TransformationMatrix) => TransformationMatrix;
/**
 * Transforms a point using transformation matrix
 */
declare const transformPoint: (point: Point2D, matrix: TransformationMatrix) => Point2D;
/**
 * Transforms multiple points efficiently
 */
declare const transformPoints: (points: Point2D[], matrix: TransformationMatrix) => Point2D[];
/**
 * Transforms bounding box using transformation matrix
 */
declare const transformBoundingBox: (bounds: BoundingBox, matrix: TransformationMatrix) => BoundingBox;
/**
 * Decomposes transformation matrix into components
 */
declare const decompose: (matrix: TransformationMatrix) => {
    translation: {
        x: number;
        y: number;
    };
    scale: {
        x: number;
        y: number;
    };
    rotation: number;
    skew: {
        x: number;
        y: number;
    };
};
/**
 * Composes transformation from individual components
 */
declare const compose: (translation?: Point2D, scale?: Point2D, rotation?: number, origin?: Point2D) => TransformationMatrix;
/**
 * Checks if matrix is identity matrix
 */
declare const isIdentity: (matrix: TransformationMatrix, tolerance?: number) => boolean;
/**
 * Interpolates between two matrices για animations
 */
declare const interpolateMatrix: (from: TransformationMatrix, to: TransformationMatrix, t: number) => TransformationMatrix;
/**
 * Converts matrix to CSS transform string
 */
declare const matrixToCSSTransform: (matrix: TransformationMatrix) => string;
/**
 * Converts matrix to SVG transform string
 */
declare const matrixToSVGTransform: (matrix: TransformationMatrix) => string;

/**
 * Coordinate mapping utilities για screen to world conversions
 * Enterprise-grade coordinate system transformations
 */
/**
 * Creates coordinate mapping between screen and world coordinates
 */
declare const createCoordinateMapping: (viewport: Viewport, coordinateSystem: CoordinateSystem) => CoordinateMapping;
/**
 * Creates coordinate mapping for specific canvas element
 */
declare const createCanvasCoordinateMapping: (canvas: HTMLCanvasElement, coordinateSystem: CoordinateSystem) => CoordinateMapping;
/**
 * Converts mouse/touch event coordinates to canvas coordinates
 */
declare const getCanvasCoordinates: (event: MouseEvent | TouchEvent, canvas: HTMLCanvasElement) => Point2D;
/**
 * Geographic coordinate system utilities
 */
declare const geoCoordinates: {
    /**
     * Converts latitude/longitude to Web Mercator (EPSG:3857)
     */
    latLngToWebMercator: (lat: number, lng: number) => Point2D;
    /**
     * Converts Web Mercator to latitude/longitude
     */
    webMercatorToLatLng: (x: number, y: number) => Point2D;
    /**
     * Creates coordinate system για geographic data
     */
    createGeoCoordinateSystem: (bounds: {
        north: number;
        south: number;
        east: number;
        west: number;
    }, canvasSize: {
        width: number;
        height: number;
    }) => CoordinateSystem;
};
/**
 * Grid coordinate utilities
 */
declare const gridCoordinates: {
    /**
     * Snaps point to grid
     */
    snapToGrid: (point: Point2D, gridSize: number) => Point2D;
    /**
     * Gets grid points within bounding area
     */
    getGridPoints: (bounds: {
        minX: number;
        minY: number;
        maxX: number;
        maxY: number;
    }, gridSize: number) => Point2D[];
    /**
     * Creates coordinate system για grid-based layouts
     */
    createGridCoordinateSystem: (_gridSize: number, origin?: Point2D) => CoordinateSystem;
};
/**
 * Utility για converting between different coordinate systems
 */
declare const convertCoordinates: (point: Point2D, fromSystem: CoordinateMapping, toSystem: CoordinateMapping) => Point2D;

/**
 * Viewport management utilities για canvas zoom/pan operations
 * Enterprise-grade viewport control με constraints και smooth interactions
 */
/**
 * Creates viewport manager για canvas zoom/pan operations
 */
declare class ViewportManager {
    private viewport;
    private constraints;
    private interaction;
    private callbacks;
    constructor(initialViewport: Viewport, constraints?: CanvasConstraints);
    /**
     * Gets current viewport state
     */
    getViewport(): Viewport;
    /**
     * Gets current transformation
     */
    getTransform(): CanvasTransform;
    /**
     * Sets viewport change callback
     */
    onViewportChange(callback: (viewport: Viewport) => void): void;
    /**
     * Sets transform change callback
     */
    onTransformChange(callback: (transform: CanvasTransform) => void): void;
    /**
     * Updates viewport and notifies callbacks
     */
    private updateViewport;
    /**
     * Applies constraints to current viewport
     */
    private applyConstraints;
    /**
     * Calculates transformation matrix για current viewport
     */
    private calculateTransformMatrix;
    /**
     * Zooms viewport by factor at specific point
     */
    zoom(factor: number, center?: Point2D): void;
    /**
     * Pans viewport by offset
     */
    pan(deltaX: number, deltaY: number): void;
    /**
     * Fits content to viewport
     */
    fitToContent(contentBounds: BoundingBox, padding?: number): void;
    /**
     * Centers viewport on specific point
     */
    centerOn(worldPoint: Point2D): void;
    /**
     * Starts pan interaction
     */
    startPan(startPoint: Point2D): void;
    /**
     * Updates pan interaction
     */
    updatePan(currentPoint: Point2D): void;
    /**
     * Ends pan interaction
     */
    endPan(): void;
    /**
     * Handles mouse wheel zoom
     */
    handleWheel(event: WheelEvent, canvas: HTMLCanvasElement): void;
    /**
     * Handles touch pinch zoom
     */
    handlePinchZoom(touch1: Point2D, touch2: Point2D, previousTouch1?: Point2D, previousTouch2?: Point2D): void;
    /**
     * Converts screen coordinates to world coordinates
     */
    screenToWorld(screenPoint: Point2D): Point2D;
    /**
     * Converts world coordinates to screen coordinates
     */
    worldToScreen(worldPoint: Point2D): Point2D;
    /**
     * Gets visible world bounds
     */
    getVisibleBounds(): BoundingBox;
    /**
     * Updates constraints
     */
    updateConstraints(newConstraints: Partial<CanvasConstraints>): void;
    /**
     * Resets viewport to initial state
     */
    reset(): void;
}

/**
 * Transform animation utilities για smooth transitions
 * Enterprise-grade animations με easing functions και callback support
 */
/**
 * Easing functions για animations
 */
declare const easingFunctions: {
    linear: (t: number) => number;
    easeIn: (t: number) => number;
    easeOut: (t: number) => number;
    easeInOut: (t: number) => number;
    easeInCubic: (t: number) => number;
    easeOutCubic: (t: number) => number;
    easeInOutCubic: (t: number) => number;
    easeInQuart: (t: number) => number;
    easeOutQuart: (t: number) => number;
    easeInOutQuart: (t: number) => number;
    elastic: (t: number) => number;
    bounce: (t: number) => number;
};
/**
 * Animation manager για transform animations
 */
declare class TransformAnimator {
    private activeAnimations;
    /**
     * Starts a transform animation
     */
    animate(id: string, animation: TransformAnimation): Promise<void>;
    /**
     * Cancels active animation
     */
    cancel(id: string): void;
    /**
     * Cancels all active animations
     */
    cancelAll(): void;
    /**
     * Checks if animation is active
     */
    isAnimating(id: string): boolean;
    /**
     * Gets list of active animation IDs
     */
    getActiveAnimations(): string[];
    /**
     * Interpolates between two transform states
     */
    private interpolateTransform;
}
/**
 * Global animator instance
 */
declare const globalAnimator: TransformAnimator;
/**
 * High-level animation functions
 */
declare const animations: {
    /**
     * Animates zoom to specific scale
     */
    zoomTo: (targetScale: number, _center: Point2D, duration?: number, easing?: keyof typeof easingFunctions) => Promise<void>;
    /**
     * Animates pan to specific position
     */
    panTo: (targetPosition: Point2D, duration?: number, easing?: keyof typeof easingFunctions) => Promise<void>;
    /**
     * Animates rotation to specific angle
     */
    rotateTo: (targetRotation: number, duration?: number, easing?: keyof typeof easingFunctions) => Promise<void>;
    /**
     * Smooth transition between two complete transform states
     */
    transitionTo: (fromTransform: CanvasTransform, toTransform: CanvasTransform, duration?: number, easing?: keyof typeof easingFunctions) => Promise<void>;
};
/**
 * Animation utilities
 */
declare const animationUtils: {
    /**
     * Creates spring animation parameters
     */
    createSpringAnimation: (stiffness?: number, damping?: number, mass?: number) => (t: number) => number;
    /**
     * Calculates optimal animation duration based on distance
     */
    calculateDuration: (startValue: number, endValue: number, baseSpeed?: number) => number;
    /**
     * Creates stepped animation για discrete values
     */
    createSteppedAnimation: (steps: number) => (t: number) => number;
};

/**
 * Canvas utilities για applying transformations to 2D context
 * Enterprise-grade canvas transformation helpers
 */
/**
 * Creates transform context wrapper για canvas
 */
declare const createTransformContext: (canvas: HTMLCanvasElement, initialTransform?: CanvasTransform) => TransformContext;
/**
 * Applies transformation matrix to canvas context
 */
declare const applyMatrixToContext: (ctx: CanvasRenderingContext2D, matrix: TransformationMatrix) => void;
/**
 * Draws grid on canvas με transformation support
 */
declare const drawGrid: (ctx: CanvasRenderingContext2D, gridSize: number, bounds: BoundingBox, options?: {
    majorGridColor?: string;
    minorGridColor?: string;
    majorGridInterval?: number;
    lineWidth?: number;
    alpha?: number;
}) => void;
/**
 * Draws coordinate axes
 */
declare const drawAxes: (ctx: CanvasRenderingContext2D, bounds: BoundingBox, options?: {
    xAxisColor?: string;
    yAxisColor?: string;
    lineWidth?: number;
    showLabels?: boolean;
    labelFont?: string;
    labelColor?: string;
}) => void;
/**
 * Draws scale ruler
 */
declare const drawRuler: (ctx: CanvasRenderingContext2D, position: "top" | "bottom" | "left" | "right", bounds: BoundingBox, scale: number, options?: {
    height?: number;
    backgroundColor?: string;
    textColor?: string;
    tickColor?: string;
    font?: string;
    unit?: string;
}) => void;
/**
 * Draws crosshair cursor
 */
declare const drawCrosshair: (ctx: CanvasRenderingContext2D, center: Point2D, bounds: BoundingBox, options?: {
    color?: string;
    lineWidth?: number;
    dashPattern?: number[];
    alpha?: number;
}) => void;
/**
 * Utility για measuring text dimensions
 */
declare const measureText: (ctx: CanvasRenderingContext2D, text: string, font?: string) => {
    width: number;
    height: number;
};
/**
 * High DPI canvas setup utility
 */
declare const setupHighDPICanvas: (canvas: HTMLCanvasElement) => {
    ctx: CanvasRenderingContext2D;
    ratio: number;
};

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

declare const DEFAULT_VIEWPORT: {
    x: number;
    y: number;
    width: number;
    height: number;
    scale: number;
    rotation: number;
};
declare const DEFAULT_CONSTRAINTS: {
    minScale: number;
    maxScale: number;
    lockAspectRatio: boolean;
    snapToGrid: boolean;
    gridSize: number;
};
declare const DEFAULT_COORDINATE_SYSTEM: {
    origin: {
        x: number;
        y: number;
    };
    scaleX: number;
    scaleY: number;
    rotation: number;
    flipX: boolean;
    flipY: boolean;
};

export { type BoundingBox, type CanvasConstraints, type CanvasTransform, type CoordinateMapping, type CoordinateSystem, DEFAULT_CONSTRAINTS, DEFAULT_COORDINATE_SYSTEM, DEFAULT_VIEWPORT, type GeometryTransform, type InteractionState, type Point2D, type Point3D, type TransformAnimation, TransformAnimator, type TransformContext, type TransformationMatrix, type Viewport, ViewportManager, type ZoomPanState, animationUtils, animations, applyMatrixToContext, compose, convertCoordinates, createCanvasCoordinateMapping, createCoordinateMapping, createIdentityMatrix, createRotationAroundPointMatrix, createRotationMatrix, createScaleMatrix, createTransformContext, createTranslationMatrix, decompose, drawAxes, drawCrosshair, drawGrid, drawRuler, easingFunctions, geoCoordinates, getCanvasCoordinates, getMatrixDeterminant, globalAnimator, gridCoordinates, interpolateMatrix, invertMatrix, isIdentity, matrixToCSSTransform, matrixToSVGTransform, measureText, multiplyMatrices, setupHighDPICanvas, transformBoundingBox, transformPoint, transformPoints };
