import * as L from 'leaflet';
import L__default, { LatLng } from 'leaflet';
import { OSMBuildingCollection } from '@layera/geo-core';
export { GeoJSONFeatureCollection, OSMBuildingFeature, OSMBuildingProperties } from '@layera/geo-core';
export { clearOSMCache, fetchAdministrativeBoundary, fetchBoundaryByAddressComponent, fetchBuildingOutlines, getCacheSize, isBoundsCached, prefetchBuildingOutlines } from '@layera/geo-mapping';

/**
 * Measurement modes για το geo-drawing system
 */
type MeasurementMode = 'distance' | 'area' | 'point' | 'circle-radius' | 'circle-area' | 'circle-circumference' | 'circle-diameter' | 'arc-length' | 'angle' | 'perimeter';
/**
 * Drawing states
 */
type DrawingState = 'idle' | 'drawing' | 'finished' | 'cancelled';
/**
 * Geometry types που υποστηρίζονται
 */
type GeometryType = 'Polygon' | 'LineString' | 'Point' | 'MultiPolygon';
/**
 * Point interface για measurements
 */
interface MeasurementPoint {
    /** Unique identifier για το point */
    id: string;
    /** Leaflet LatLng coordinates */
    latlng: LatLng;
    /** Optional label για display */
    label?: string;
    /** Index στη σειρά που προστέθηκε */
    index: number;
}
/**
 * Measurement result interface
 */
interface MeasurementResult {
    /** Τύπος measurement */
    type: MeasurementMode;
    /** Τα points που χρησιμοποιήθηκαν */
    points: MeasurementPoint[];
    /** Distance σε meters (για distance mode) */
    distance?: number;
    /** Area σε square meters (για area mode) */
    area?: number;
    /** Radius σε meters (για circle modes) */
    radius?: number;
    /** Circumference σε meters (για circle circumference) */
    circumference?: number;
    /** Diameter σε meters (για circle diameter) */
    diameter?: number;
    /** Arc length σε meters (για arc length) */
    arcLength?: number;
    /** Angle σε radians (για angle measurements) */
    angle?: number;
    /** Perimeter σε meters (για perimeter mode) */
    perimeter?: number;
    /** Formatted display value */
    displayValue: string;
    /** Timestamp δημιουργίας */
    timestamp: number;
}
/**
 * Circle measurement properties
 */
interface CircleMeasurement {
    /** Center point of the circle */
    center: LatLng;
    /** Radius σε meters */
    radius: number;
    /** Area σε square meters */
    area: number;
    /** Circumference σε meters */
    circumference: number;
    /** Diameter σε meters */
    diameter: number;
}
/**
 * Arc measurement properties
 */
interface ArcMeasurement {
    /** Center point of the arc */
    center: LatLng;
    /** Start point of the arc */
    startPoint: LatLng;
    /** End point of the arc */
    endPoint: LatLng;
    /** Radius σε meters */
    radius: number;
    /** Angle σε radians */
    angle: number;
    /** Arc length σε meters */
    arcLength: number;
}
/**
 * Angle measurement properties
 */
interface AngleMeasurement {
    /** First point */
    point1: LatLng;
    /** Vertex point (where the angle is measured) */
    vertex: LatLng;
    /** Third point */
    point2: LatLng;
    /** Angle σε radians */
    angleRadians: number;
    /** Angle σε degrees */
    angleDegrees: number;
}
/**
 * Drawing configuration options
 */
interface DrawingConfig {
    /** Enable snap-to-geometry functionality */
    enableSnapping: boolean;
    /** Snap tolerance σε pixels */
    snapTolerance: number;
    /** Minimum zoom level για OSM data fetching */
    minSnapZoom: number;
    /** Default line color */
    lineColor: string;
    /** Default fill color */
    fillColor: string;
    /** Default line weight */
    lineWeight: number;
    /** Default fill opacity */
    fillOpacity: number;
}
/**
 * Canvas interaction event types
 */
interface CanvasInteractionEvent {
    /** Event type */
    type: 'click' | 'move' | 'doubleclick' | 'keydown';
    /** Cursor position */
    latlng: LatLng;
    /** Original DOM event */
    originalEvent: Event;
    /** Whether snapping occurred */
    snapped: boolean;
    /** Snap result αν υπάρχει */
    snapResult?: {
        snapPoint: LatLng;
        snapType: 'vertex' | 'edge';
    };
}

/**
 * Core measurement hook για το geo-drawing system
 * Μεταφέρθηκε και βελτιώθηκε από OLD_geo-canvas
 */
declare const useMeasurement: () => {
    mode: MeasurementMode;
    state: DrawingState;
    points: MeasurementPoint[];
    currentResult: MeasurementResult | null;
    results: MeasurementResult[];
    addPoint: (latlng: L__default.LatLng) => void;
    finishMeasurement: () => void;
    cancelMeasurement: () => void;
    resetAll: () => void;
    changeMeasurementMode: (newMode: MeasurementMode) => void;
    removeLastPoint: () => void;
    removeResult: (timestamp: number) => void;
    getCurrentDistance: () => number;
    getCurrentArea: () => number;
    isDrawing: boolean;
    isFinished: boolean;
    canFinish: boolean;
};

/**
 * Hook που ενσωματώνει το snap-to-geometry με OSM building data
 * Temporary simplified version μέχρι να συμβατοποιηθούν τα snap packages
 */
declare const useGeometrySnap: (isEnabled?: boolean) => {
    isSnappingEffective: boolean;
    osmData: OSMBuildingCollection | null;
    isSnapped: boolean;
    lastSnapResult: null;
    snapToGeometry: (point: L__default.LatLng) => Promise<L__default.LatLng>;
    toggleSnapType: (type: string, enabled: boolean) => void;
    updateTolerance: (tolerance: number) => void;
    snapEngine: null;
    performanceMetrics: null;
};

/**
 * Calculates the area of a polygon using the Shoelace formula on projected coordinates.
 * Μεταφέρθηκε από OLD_geo-canvas/components/utils/measurementUtils.ts
 * @param latlngs An array of L.LatLng points for the polygon.
 * @returns The calculated area in square meters.
 */
declare const calculateProjectedArea: (latlngs: L.LatLng[]) => number;
/**
 * Calculates the total path distance for a series of points.
 * Μεταφέρθηκε από OLD_geo-canvas/components/utils/measurementUtils.ts
 * @param latlngs An array of L.LatLng points.
 * @returns The total distance in meters.
 */
declare const calculateDistance: (latlngs: L.LatLng[]) => number;
/**
 * Calculates the distance between two LatLng points using Haversine formula
 * @param point1 First point
 * @param point2 Second point
 * @returns Distance in meters
 */
declare const calculatePointDistance: (point1: L.LatLng, point2: L.LatLng) => number;
/**
 * Calculates the center point of a polygon
 * @param latlngs Array of polygon vertices
 * @returns Center point as LatLng
 */
declare const calculatePolygonCenter: (latlngs: L.LatLng[]) => L.LatLng;
/**
 * Calculates the perimeter of a polygon
 * @param latlngs Array of polygon vertices
 * @returns Perimeter in meters
 */
declare const calculatePerimeter: (latlngs: L.LatLng[]) => number;
/**
 * Checks if a point is inside a polygon using ray casting algorithm
 * @param point Point to test
 * @param polygon Array of polygon vertices
 * @returns True if point is inside polygon
 */
declare const isPointInPolygon: (point: L.LatLng, polygon: L.LatLng[]) => boolean;
/**
 * Calculates the bounding box of a set of points
 * @param latlngs Array of points
 * @returns Leaflet LatLngBounds object
 */
declare const calculateBounds: (latlngs: L.LatLng[]) => L.LatLngBounds;
/**
 * Calculates the radius of a circle from center to a point on circumference
 * @param center Center point of the circle
 * @param circumferencePoint Point on the circle's circumference
 * @returns Radius in meters
 */
declare const calculateCircleRadius: (center: L.LatLng, circumferencePoint: L.LatLng) => number;
/**
 * Calculates the area of a circle
 * @param radius Radius in meters
 * @returns Area in square meters
 */
declare const calculateCircleArea: (radius: number) => number;
/**
 * Calculates the circumference of a circle
 * @param radius Radius in meters
 * @returns Circumference in meters
 */
declare const calculateCircleCircumference: (radius: number) => number;
/**
 * Calculates the diameter of a circle
 * @param radius Radius in meters
 * @returns Diameter in meters
 */
declare const calculateCircleDiameter: (radius: number) => number;
/**
 * Calculates arc length given radius and angle
 * @param radius Radius in meters
 * @param angleRadians Angle in radians
 * @returns Arc length in meters
 */
declare const calculateArcLength: (radius: number, angleRadians: number) => number;
/**
 * Calculates the angle between three points (middle point is the vertex)
 * @param point1 First point
 * @param vertex Middle point (vertex of the angle)
 * @param point2 Third point
 * @returns Angle in radians
 */
declare const calculateAngle: (point1: L.LatLng, vertex: L.LatLng, point2: L.LatLng) => number;
/**
 * Detects if three points form a circle and calculates its properties
 * @param point1 First point on circle
 * @param point2 Second point on circle
 * @param point3 Third point on circle
 * @returns Circle properties or null if points don't form a valid circle
 */
declare const detectCircleFromThreePoints: (point1: L.LatLng, point2: L.LatLng, point3: L.LatLng) => {
    center: L.LatLng;
    radius: number;
} | null;

/**
 * Formats a distance in meters into a readable string, switching to kilometers for large distances.
 * Μεταφέρθηκε από OLD_geo-canvas/components/utils/measurementUtils.ts
 * @param meters The distance in meters.
 * @param decimals The number of decimal places to show.
 * @returns A formatted string like "500.00 m" or "1.20 km".
 */
declare const formatDistance: (meters: number, decimals?: number) => string;
/**
 * Formats an area in square meters into a readable string, switching to hectares or square kilometers.
 * Μεταφέρθηκε από OLD_geo-canvas/components/utils/measurementUtils.ts
 * @param sqMeters The area in square meters.
 * @returns A formatted string like "500.00 m²" or "1.20 ha".
 */
declare const formatArea: (sqMeters: number) => string;
/**
 * Hook for formatted measurement display with i18n support
 * Αντικαθιστά τα hardcoded strings με i18n keys
 */
declare const useMeasurementFormatter: () => {
    formatDistanceWithLabels: (meters: number, decimals?: number) => string;
    formatAreaWithLabels: (sqMeters: number) => string;
    formatCoordinates: (lat: number, lng: number, decimals?: number) => string;
    formatPointLabel: (index: number) => string;
    formatDistance: (meters: number, decimals?: number) => string;
    formatArea: (sqMeters: number) => string;
};
/**
 * Formats coordinates to different coordinate systems
 */
declare const formatCoordinatesBySystem: (lat: number, lng: number, system?: "WGS84" | "EGSA87" | "UTM", decimals?: number) => string;
/**
 * Formats bearing/azimuth between two points
 * @param bearing Bearing in degrees
 * @returns Formatted bearing string
 */
declare const formatBearing: (bearing: number) => string;

/**
 * @layera/geo-drawing - Advanced Geometric Detection Algorithms
 *
 * Enterprise algorithms για intelligent shape recognition και measurement.
 * Integrates με existing calculation utilities.
 */

/**
 * Detected geometry types
 */
type DetectedGeometry = {
    type: 'circle';
    properties: CircleMeasurement;
} | {
    type: 'arc';
    properties: ArcMeasurement;
} | {
    type: 'line';
    properties: {
        start: L.LatLng;
        end: L.LatLng;
        length: number;
    };
} | {
    type: 'rectangle';
    properties: {
        corners: L.LatLng[];
        area: number;
        perimeter: number;
    };
} | {
    type: 'triangle';
    properties: {
        vertices: L.LatLng[];
        area: number;
        angles: number[];
    };
} | {
    type: 'polygon';
    properties: {
        vertices: L.LatLng[];
        area: number;
        perimeter: number;
    };
} | {
    type: 'unknown';
    properties: Record<string, never>;
};
/**
 * Analyzes a set of points και detects the most likely geometric shape
 */
declare const detectGeometry: (points: MeasurementPoint[]) => DetectedGeometry;
/**
 * Suggests the most appropriate measurement mode based on detected geometry
 */
declare const suggestMeasurementMode: (detectedGeometry: DetectedGeometry) => MeasurementMode;
/**
 * Calculates confidence score για detected geometry (0-1)
 */
declare const calculateDetectionConfidence: (points: MeasurementPoint[], detectedGeometry: DetectedGeometry) => number;

/**
 * @layera/geo-drawing - Map Labels Integration
 *
 * Enterprise integration με @layera/map-labels για unified annotations.
 * Converts measurement results σε map label configurations.
 */

/**
 * Map label configuration για @layera/map-labels integration
 */
interface MapLabelConfig {
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
declare const measurementToMapLabel: (measurement: MeasurementResult, options?: {
    showUnits?: boolean;
    locale?: string;
    precision?: number;
    customPosition?: L.LatLng;
}) => MapLabelConfig;
/**
 * Μεταφέρει detected geometry σε multiple map labels
 */
declare const geometryToMapLabels: (geometry: DetectedGeometry, points: MeasurementPoint[], options?: {
    showDetails?: boolean;
    locale?: string;
    showCoordinates?: boolean;
}) => MapLabelConfig[];

/**
 * @layera/geo-drawing - LEGO System για geo-spatial drawing και measurement
 *
 * Ενσωματώνει functionality από OLD_geo-canvas με existing LEGO systems:
 * - @layera/snap-engine & @layera/snap-interactions για snapping
 * - @layera/i18n για internationalization
 * - @layera/theme-switcher για theme-aware colors
 * - @layera/buttons, @layera/cards, @layera/typography για UI
 * - @layera/constants για configuration
 * - @layera/notifications για user feedback
 */

declare const GEO_DRAWING_CONSTANTS: {
    readonly DEFAULT_SNAP_TOLERANCE: 15;
    readonly MIN_SNAP_ZOOM: 16;
    readonly DEBOUNCE_MS: 500;
    readonly REQUEST_TIMEOUT: 30000;
};

export { type AngleMeasurement, type ArcMeasurement, type CanvasInteractionEvent, type CircleMeasurement, type DetectedGeometry, type DrawingConfig, type DrawingState, GEO_DRAWING_CONSTANTS, type GeometryType, type MapLabelConfig, type MeasurementMode, type MeasurementPoint, type MeasurementResult, calculateAngle, calculateArcLength, calculateBounds, calculateCircleArea, calculateCircleCircumference, calculateCircleDiameter, calculateCircleRadius, calculateDetectionConfidence, calculateDistance, calculatePerimeter, calculatePointDistance, calculatePolygonCenter, calculateProjectedArea, detectCircleFromThreePoints, detectGeometry, formatArea, formatBearing, formatCoordinatesBySystem, formatDistance, geometryToMapLabels, isPointInPolygon, measurementToMapLabel, suggestMeasurementMode, useGeometrySnap, useMeasurement, useMeasurementFormatter };
