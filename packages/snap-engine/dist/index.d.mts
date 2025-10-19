/**
 * 🎯 SNAP ENGINE CORE TYPES
 * Τύποι δεδομένων για το spatial snapping system
 */
interface Point2D {
    x: number;
    y: number;
}
interface Point3D extends Point2D {
    z: number;
}
interface BoundingBox {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
}
type SnapType = 'endpoint' | 'midpoint' | 'center' | 'intersection' | 'perpendicular' | 'tangent' | 'nearest' | 'grid' | 'vertex' | 'edge';
interface SnapTarget {
    id: string;
    type: SnapType;
    point: Point2D;
    geometry: GeometryEntity;
    priority: number;
    tolerance?: number;
    metadata?: Record<string, unknown>;
}
interface SnapResult {
    target: SnapTarget | null;
    snapped: boolean;
    distance: number;
    cursor: Point2D;
    snapPoint: Point2D;
    snapType: SnapType | null;
}
type GeometryType = 'line' | 'circle' | 'arc' | 'polyline' | 'polygon' | 'point' | 'spline' | 'ellipse' | 'rectangle';
interface GeometryEntity {
    id: string;
    type: GeometryType;
    bounds: BoundingBox;
    layer?: string;
    visible: boolean;
    selectable: boolean;
    data: LineGeometry | CircleGeometry | ArcGeometry | PolylineGeometry | PointGeometry;
}
interface LineGeometry {
    start: Point2D;
    end: Point2D;
}
interface CircleGeometry {
    center: Point2D;
    radius: number;
}
interface ArcGeometry {
    center: Point2D;
    radius: number;
    startAngle: number;
    endAngle: number;
}
interface PolylineGeometry {
    vertices: Point2D[];
    closed: boolean;
}
interface PointGeometry {
    position: Point2D;
}
interface SnapConfiguration {
    tolerance: number;
    enabledTypes: Set<SnapType>;
    priority: Record<SnapType, number>;
    maxResults: number;
    performanceLevel: 'high' | 'medium' | 'low';
    debugMode: boolean;
}
interface SpatialIndexOptions {
    maxEntries: number;
    minEntries: number;
    algorithm: 'rtree' | 'kdtree' | 'quadtree';
    autoRebalance: boolean;
}
interface SnapPerformanceMetrics {
    searchTime: number;
    indexTime: number;
    totalTime: number;
    geometryCount: number;
    resultsCount: number;
    memoryUsage: number;
}
interface SnapEngineEvents {
    'snap:start': {
        cursor: Point2D;
    };
    'snap:found': {
        result: SnapResult;
    };
    'snap:lost': {
        lastResult: SnapResult | null;
    };
    'snap:error': {
        error: Error;
        context: string;
    };
    'index:rebuilt': {
        geometryCount: number;
        indexTime: number;
    };
}
interface CoordinateSystemContext {
    sourceCRS: string;
    targetCRS: string;
    transformer?: (point: Point2D) => Point2D;
    precision: number;
}
interface OSMGeometry extends GeometryEntity {
    osmId: string;
    osmType: 'node' | 'way' | 'relation';
    tags: Record<string, string>;
}
interface CADGeometry extends GeometryEntity {
    cadType: 'DXF' | 'DWG' | 'SVG';
    layerName: string;
    handle?: string;
    blockReference?: string;
}

/**
 * 🌳 R-TREE SPATIAL INDEX
 * High-performance spatial indexing με rbush library
 * Βασισμένο σε enterprise patterns από ESRI & PostGIS
 */

declare class RTreeSpatialIndex {
    private tree;
    private options;
    private geometries;
    private lastRebuildTime;
    private indexedCount;
    constructor(options?: Partial<SpatialIndexOptions>);
    insertGeometry(geometry: GeometryEntity): void;
    insertBatch(geometries: GeometryEntity[]): SnapPerformanceMetrics;
    removeGeometry(geometryId: string): boolean;
    clear(): void;
    searchInBounds(bounds: BoundingBox): GeometryEntity[];
    searchNearPoint(point: Point2D, tolerance: number, maxResults?: number): {
        geometry: GeometryEntity;
        distance: number;
    }[];
    findKNearest(point: Point2D, k?: number): GeometryEntity[];
    rebuild(): SnapPerformanceMetrics;
    private shouldRebalance;
    private calculateDistance;
    private estimateMemoryUsage;
    getMetrics(): {
        indexedCount: number;
        lastRebuildTime: number;
        memoryUsage: number;
        treeDepth: number;
    };
    private estimateTreeDepth;
    validateIndex(): {
        valid: boolean;
        errors: string[];
    };
}

/**
 * 🚀 SNAP ENGINE MAIN CLASS
 * Κύρια κλάση που συνδυάζει spatial indexing με snap calculations
 * Enterprise-grade snapping system για Layera LEGO architecture
 */

interface CADEntity$1 {
    id: string;
    type: string;
    data: unknown;
    layer?: string;
}
interface CoordinateTransformer {
    transform: (point: Point2D) => Point2D;
    inverse: (point: Point2D) => Point2D;
}
declare class SnapEngine {
    private spatialIndex;
    private snapCalculator;
    private configuration;
    private coordinateContext?;
    private eventListeners;
    private isEnabled;
    private performanceMetrics;
    constructor(config?: Partial<SnapConfiguration>);
    snapToPoint(cursor: Point2D): Promise<SnapResult>;
    addGeometry(geometry: GeometryEntity): boolean;
    addGeometries(geometries: GeometryEntity[]): SnapPerformanceMetrics;
    removeGeometry(geometryId: string): boolean;
    clearGeometries(): void;
    addCADGeometries(cadEntities: CADEntity$1[]): SnapPerformanceMetrics;
    addOSMBuildings(osmData: Array<{
        id: string;
        type: 'node' | 'way' | 'relation';
        lat?: number;
        lon?: number;
        nodes?: Array<{
            lat: number;
            lon: number;
        }>;
        tags: Record<string, string>;
    }>): SnapPerformanceMetrics;
    setCoordinateSystemContext(context: CoordinateSystemContext, transformer?: CoordinateTransformer): void;
    updateConfiguration(config: Partial<SnapConfiguration>): void;
    setSnapTypeEnabled(type: SnapType, enabled: boolean): void;
    setTolerance(tolerance: number): void;
    setEnabled(enabled: boolean): void;
    getPerformanceMetrics(): SnapPerformanceMetrics & {
        indexMetrics: ReturnType<RTreeSpatialIndex['getMetrics']>;
    };
    validateIndex(): {
        valid: boolean;
        errors: string[];
    };
    rebuildIndex(): SnapPerformanceMetrics;
    addEventListener<K extends keyof SnapEngineEvents>(event: K, listener: (data: SnapEngineEvents[K]) => void): void;
    removeEventListener<K extends keyof SnapEngineEvents>(event: K, listener: (data: SnapEngineEvents[K]) => void): void;
    private emitEvent;
    private createNoSnapResult;
    private transformSnapResult;
    private updatePerformanceMetrics;
    private initializeEventListeners;
    dispose(): void;
}

/**
 * 🔧 GEOMETRY UTILITIES
 * Helper functions για geometric calculations και conversions
 */

interface CADEntity {
    id: string;
    type: string;
    data: unknown;
    layer?: string;
    handle?: string;
    cadType?: string;
    layerName?: string;
    bounds?: BoundingBox;
}
declare class GeometryUtils {
    static calculateBounds(geometry: GeometryEntity): BoundingBox;
    private static calculateLineBounds;
    private static calculateCircleBounds;
    private static calculateArcBounds;
    private static calculatePolylineBounds;
    private static calculatePointBounds;
    static convertCADToGeometry(cadEntity: CADEntity): GeometryEntity;
    private static calculateBoundsFromCAD;
    private static mapCADTypeToGeometry;
    private static extractGeometryData;
    static convertOSMToGeometry(osmData: {
        id: string;
        type: 'node' | 'way' | 'relation';
        lat?: number;
        lon?: number;
        nodes?: Array<{
            lat: number;
            lon: number;
        }>;
        tags: Record<string, string>;
    }): OSMGeometry | null;
    static pointToGeometryDistance(point: Point2D, geometry: GeometryEntity): number;
    private static pointToLineDistance;
    private static pointToCircleDistance;
    private static pointToPointDistance;
    private static getBoundsCenter;
    static validateGeometry(geometry: GeometryEntity): {
        valid: boolean;
        errors: string[];
    };
    private static validateGeometryData;
    static getSnapPriority(geometry: GeometryEntity): number;
    static shouldSnapToGeometry(geometry: GeometryEntity, cursor: Point2D, tolerance: number): boolean;
}

/**
 * 🎯 SNAP CALCULATION ENGINE
 * Υπολογισμοί snapping βασισμένοι σε AutoCAD/ESRI algorithms
 * Precision-optimized για real-time performance
 */

declare class SnapCalculator {
    private config;
    constructor(config: SnapConfiguration);
    calculateSnap(cursor: Point2D, geometries: GeometryEntity[]): SnapResult;
    private generateSnapTargets;
    private generateLineSnapTargets;
    private generateCircleSnapTargets;
    private generateArcSnapTargets;
    private generatePolylineSnapTargets;
    private generatePointSnapTargets;
    private createSnapTarget;
    private findClosestTarget;
    private calculateDistance;
    updateConfiguration(newConfig: Partial<SnapConfiguration>): void;
    isSnapTypeEnabled(type: SnapType): boolean;
    setSnapTypeEnabled(type: SnapType, enabled: boolean): void;
    calculateNearestPoint(cursor: Point2D, geometry: GeometryEntity): Point2D | null;
    private nearestPointOnLine;
    private nearestPointOnCircle;
}

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

/**
 * Default snap configuration που χρησιμοποιεί @layera/constants
 */
declare const DEFAULT_SNAP_CONFIG: {
    tolerance: number;
    enabledTypes: Set<"endpoint" | "midpoint" | "center">;
    priority: {
        endpoint: number;
        midpoint: number;
        center: number;
        vertex: number;
        intersection: number;
        perpendicular: number;
        tangent: number;
        nearest: number;
        grid: number;
        edge: number;
    };
    maxResults: number;
    performanceLevel: "medium";
    debugMode: boolean;
};
/**
 * Spatial index default options
 */
declare const DEFAULT_SPATIAL_OPTIONS: {
    maxEntries: number;
    minEntries: number;
    algorithm: "rtree";
    autoRebalance: boolean;
};
/**
 * Supported snap types με priorities
 */
declare const SNAP_TYPES: {
    readonly ENDPOINT: "endpoint";
    readonly MIDPOINT: "midpoint";
    readonly CENTER: "center";
    readonly VERTEX: "vertex";
    readonly INTERSECTION: "intersection";
    readonly PERPENDICULAR: "perpendicular";
    readonly TANGENT: "tangent";
    readonly NEAREST: "nearest";
    readonly GRID: "grid";
    readonly EDGE: "edge";
};
/**
 * Performance level configurations
 */
declare const PERFORMANCE_CONFIGS: {
    readonly high: {
        readonly maxGeometries: 10000;
        readonly indexRebuildThreshold: 100;
        readonly searchRadius: 50;
    };
    readonly medium: {
        readonly maxGeometries: 5000;
        readonly indexRebuildThreshold: 250;
        readonly searchRadius: 25;
    };
    readonly low: {
        readonly maxGeometries: 1000;
        readonly indexRebuildThreshold: 500;
        readonly searchRadius: 15;
    };
};
/**
 * Δημιουργεί SnapEngine με optimized settings για CAD workflows
 */
declare function createCADSnapEngine(config?: Partial<SnapConfiguration>): SnapEngine;
/**
 * Δημιουργεί SnapEngine με optimized settings για GIS/mapping workflows
 */
declare function createGISSnapEngine(config?: Partial<SnapConfiguration>): SnapEngine;
/**
 * Δημιουργεί lightweight SnapEngine για mobile/low-power devices
 */
declare function createMobileSnapEngine(config?: Partial<SnapConfiguration>): SnapEngine;
/**
 * Validates snap configuration
 */
declare function validateSnapConfig(config: Partial<SnapConfiguration>): {
    valid: boolean;
    errors: string[];
    warnings: string[];
};
/**
 * Creates geometry entity από simple data
 */
declare function createGeometry(id: string, type: GeometryType, data: LineGeometry | CircleGeometry | ArcGeometry | PolylineGeometry | PointGeometry, options?: {
    layer?: string;
    visible?: boolean;
    selectable?: boolean;
}): GeometryEntity;
declare const VERSION = "1.0.0";
declare const BUILD_INFO: {
    version: string;
    buildDate: string;
    features: string[];
};

export { type ArcGeometry, BUILD_INFO, type BoundingBox, type CADGeometry, type CircleGeometry, type CoordinateSystemContext, DEFAULT_SNAP_CONFIG, DEFAULT_SPATIAL_OPTIONS, type GeometryEntity, type GeometryType, GeometryUtils, type LineGeometry, type OSMGeometry, PERFORMANCE_CONFIGS, type Point2D, type Point3D, type PointGeometry, type PolylineGeometry, RTreeSpatialIndex, SNAP_TYPES, SnapCalculator, type SnapConfiguration, SnapEngine, type SnapEngineEvents, type SnapPerformanceMetrics, type SnapResult, type SnapTarget, type SnapType, type SpatialIndexOptions, VERSION, createCADSnapEngine, createGISSnapEngine, createGeometry, createMobileSnapEngine, SnapEngine as default, validateSnapConfig };
