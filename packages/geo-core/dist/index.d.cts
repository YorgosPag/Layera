import { LatLng } from 'leaflet';

/**
 * Βασικοί τύποι γεωμετρίας που υποστηρίζονται σε όλο το Layera ecosystem
 */
type GeometryType = 'Polygon' | 'LineString' | 'Point' | 'MultiPolygon';
/**
 * 2D Point interface για γενικούς υπολογισμούς
 */
interface Point2D {
    x: number;
    y: number;
}
/**
 * Βασικό Geographic Point interface
 */
interface GeoPoint {
    /** Latitude σε decimal degrees */
    lat: number;
    /** Longitude σε decimal degrees */
    lng: number;
    /** Optional elevation σε meters */
    elevation?: number;
}
/**
 * Geographic bounds για map viewport και queries
 */
interface GeoBounds {
    /** South boundary (minimum latitude) */
    south: number;
    /** West boundary (minimum longitude) */
    west: number;
    /** North boundary (maximum latitude) */
    north: number;
    /** East boundary (maximum longitude) */
    east: number;
}
/**
 * Measurement modes για το geo-drawing system
 */
type MeasurementMode = 'distance' | 'area' | 'point';
/**
 * Drawing states για UI components
 */
type DrawingState = 'idle' | 'drawing' | 'finished' | 'cancelled';
/**
 * Snap types για geometry snapping
 */
type SnapType = 'vertex' | 'edge' | 'center' | 'perpendicular';
/**
 * Administrative levels για OSM boundaries
 */
type AdminLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
/**
 * Map projection types
 */
type ProjectionType = 'EPSG:4326' | 'EPSG:3857' | 'EPSG:2100';
/**
 * Coordinate system interface
 */
interface CoordinateSystem {
    /** EPSG code */
    epsg: string;
    /** Human readable name */
    name: string;
    /** Units (degrees, meters, etc.) */
    units: string;
}

/**
 * Standard GeoJSON Geometry interface
 */
interface GeoJSONGeometry {
    type: GeometryType;
    coordinates: number[] | number[][] | number[][][] | number[][][][];
}
/**
 * Generic GeoJSON Feature properties
 */
interface GeoJSONProperties {
    [key: string]: unknown;
}
/**
 * Standard GeoJSON Feature interface
 */
interface GeoJSONFeature<T extends GeoJSONProperties = GeoJSONProperties> {
    type: 'Feature';
    geometry: GeoJSONGeometry;
    properties: T;
    id?: string | number;
}
/**
 * Standard GeoJSON FeatureCollection interface
 */
interface GeoJSONFeatureCollection<T extends GeoJSONProperties = GeoJSONProperties> {
    type: 'FeatureCollection';
    features: GeoJSONFeature<T>[];
}
/**
 * OSM Building specific properties
 */
interface OSMBuildingProperties extends GeoJSONProperties {
    /** OSM building type */
    building?: string;
    /** Building name αν υπάρχει */
    name?: string;
    /** Building height σε meters */
    height?: number;
    /** Building levels */
    'building:levels'?: number;
    /** Address information */
    'addr:street'?: string;
    'addr:housenumber'?: string;
    'addr:city'?: string;
    'addr:postcode'?: string;
}
/**
 * OSM Administrative boundary properties
 */
interface OSMAdminProperties extends GeoJSONProperties {
    /** Administrative level (1-10) */
    admin_level?: string;
    /** Name in Greek */
    'name:el'?: string;
    /** Name in English */
    'name:en'?: string;
    /** Default name */
    name?: string;
    /** Boundary type */
    boundary?: string;
    /** Place type */
    place?: string;
    /** ISO code for countries/regions */
    'ISO3166-1'?: string;
    'ISO3166-2'?: string;
}
/**
 * Typed GeoJSON Feature για buildings
 */
type OSMBuildingFeature = GeoJSONFeature<OSMBuildingProperties>;
/**
 * Typed GeoJSON Feature για administrative boundaries
 */
type OSMAdminFeature = GeoJSONFeature<OSMAdminProperties>;
/**
 * Typed FeatureCollection για buildings
 */
type OSMBuildingCollection = GeoJSONFeatureCollection<OSMBuildingProperties>;
/**
 * Typed FeatureCollection για administrative boundaries
 */
type OSMAdminCollection = GeoJSONFeatureCollection<OSMAdminProperties>;

/**
 * Point interface για measurements με Leaflet integration
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
    /** Unique identifier για το measurement */
    id: string;
    /** Τύπος measurement */
    type: MeasurementMode;
    /** Τα points που χρησιμοποιήθηκαν */
    points: MeasurementPoint[];
    /** Distance σε meters (για distance mode) */
    distance?: number;
    /** Area σε square meters (για area mode) */
    area?: number;
    /** Perimeter σε meters (για area mode) */
    perimeter?: number;
    /** Formatted display value */
    displayValue: string;
    /** Units για το display value */
    units: string;
    /** Timestamp δημιουργίας */
    timestamp: number;
    /** Optional metadata */
    metadata?: {
        [key: string]: unknown;
    };
}
/**
 * Configuration για measurement calculations
 */
interface MeasurementConfig {
    /** Preferred units για distance (meters, kilometers, etc.) */
    distanceUnits: 'meters' | 'kilometers' | 'feet' | 'miles';
    /** Preferred units για area (square meters, hectares, etc.) */
    areaUnits: 'square_meters' | 'hectares' | 'square_kilometers' | 'square_feet' | 'acres';
    /** Precision για decimal places */
    precision: number;
    /** Use geodesic calculations για accuracy */
    geodesic: boolean;
}
/**
 * Snap result interface για measurement snapping
 */
interface SnapResult {
    /** Το snapped point */
    snapPoint: LatLng;
    /** Τύπος snap που έγινε */
    snapType: 'vertex' | 'edge' | 'center';
    /** Distance from original point σε pixels */
    snapDistance: number;
    /** The original feature που έγινε snap */
    feature?: {
        id: string;
        type: string;
        properties?: {
            [key: string]: unknown;
        };
    };
}

/**
 * Drawing configuration options που μοιράζονται όλα τα drawing components
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
    /** Enable measurement display */
    showMeasurements: boolean;
    /** Enable coordinate display */
    showCoordinates: boolean;
}
/**
 * Canvas interaction event types για drawing
 */
interface CanvasInteractionEvent {
    /** Event type */
    type: 'click' | 'move' | 'doubleclick' | 'keydown' | 'keyup';
    /** Cursor position */
    latlng: LatLng;
    /** Original DOM event */
    originalEvent: Event;
    /** Whether snapping occurred */
    snapped: boolean;
    /** Snap result αν υπάρχει */
    snapResult?: SnapResult;
    /** Modifier keys state */
    modifiers: {
        ctrl: boolean;
        shift: boolean;
        alt: boolean;
    };
}
/**
 * Drawing state management interface
 */
interface DrawingStateManager {
    /** Current drawing state */
    state: DrawingState;
    /** Current geometry type being drawn */
    geometryType: GeometryType | null;
    /** Points collected during drawing */
    points: LatLng[];
    /** Configuration settings */
    config: DrawingConfig;
}
/**
 * Drawing event callbacks
 */
interface DrawingEventHandlers {
    /** Called when drawing starts */
    onDrawingStart?: (geometryType: GeometryType) => void;
    /** Called when a point is added */
    onPointAdd?: (point: LatLng, index: number) => void;
    /** Called when drawing is completed */
    onDrawingComplete?: (points: LatLng[], geometryType: GeometryType) => void;
    /** Called when drawing is cancelled */
    onDrawingCancel?: () => void;
    /** Called when state changes */
    onStateChange?: (state: DrawingState) => void;
}
/**
 * Geometry validation result
 */
interface GeometryValidation {
    /** Is the geometry valid */
    isValid: boolean;
    /** Validation errors αν υπάρχουν */
    errors: string[];
    /** Warnings που δεν εμποδίζουν το drawing */
    warnings: string[];
    /** Suggested fixes */
    suggestions: string[];
}

/**
 * Μετατρέπει LatLng σε Point2D για υπολογισμούς
 */
declare function latLngToPoint2D(latlng: LatLng): Point2D;
/**
 * Μετατρέπει Point2D σε GeoPoint
 */
declare function point2DToGeoPoint(point: Point2D, elevation?: number): GeoPoint;
/**
 * Μετατρέπει GeoPoint σε LatLng (χρησιμοποιείται με Leaflet)
 */
declare function geoPointToLatLng(point: GeoPoint): LatLng;
/**
 * Υπολογίζει το center point από array of coordinates
 */
declare function calculateCenter(points: LatLng[]): LatLng | null;
/**
 * Υπολογίζει bounds από array of coordinates
 */
declare function calculateBounds(points: LatLng[]): GeoBounds | null;
/**
 * Ελέγχει αν ένα point είναι μέσα σε bounds
 */
declare function isPointInBounds(point: LatLng, bounds: GeoBounds): boolean;
/**
 * Υπολογίζει distance μεταξύ δύο points σε meters (Haversine formula)
 */
declare function calculateDistance(point1: LatLng, point2: LatLng): number;
/**
 * Υπολογίζει area ενός polygon σε square meters
 */
declare function calculatePolygonArea(points: LatLng[]): number;

/**
 * @layera/geo-core
 *
 * Core types, interfaces και utilities για όλο το Layera geo ecosystem.
 * Αυτό το package είναι η foundation για όλα τα geo-related packages.
 *
 * Enterprise Architecture: Base Layer
 * Used by: @layera/geo-mapping, @layera/geo-drawing, @layera/geo-analytics
 */

declare const GEO_CORE_VERSION = "1.0.0";
declare const GEO_CORE_NAME = "@layera/geo-core";

export { type AdminLevel, type CanvasInteractionEvent, type CoordinateSystem, type DrawingConfig, type DrawingEventHandlers, type DrawingState, type DrawingStateManager, GEO_CORE_NAME, GEO_CORE_VERSION, type GeoBounds, type GeoJSONFeature, type GeoJSONFeatureCollection, type GeoJSONGeometry, type GeoJSONProperties, type GeoPoint, type GeometryType, type GeometryValidation, type MeasurementConfig, type MeasurementMode, type MeasurementPoint, type MeasurementResult, type OSMAdminCollection, type OSMAdminFeature, type OSMAdminProperties, type OSMBuildingCollection, type OSMBuildingFeature, type OSMBuildingProperties, type Point2D, type ProjectionType, type SnapResult, type SnapType, calculateBounds, calculateCenter, calculateDistance, calculatePolygonArea, geoPointToLatLng, isPointInBounds, latLngToPoint2D, point2DToGeoPoint };
