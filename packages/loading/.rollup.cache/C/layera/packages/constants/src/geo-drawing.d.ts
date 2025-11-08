/**
 * Geo-Drawing constants for @layera/geo-drawing LEGO system
 * Αντικαθιστά τα hardcoded values από OLD_geo-canvas
 */
/**
 * 🌍 EPSG Coordinate Reference System Codes - SINGLE SOURCE OF TRUTH
 * Για χρήση σε coordinate transformations, map projections
 */
export declare const EPSG_CODES: {
    /** WGS84 - World Geodetic System 1984 (GPS coordinates) */
    readonly WGS84: 4326;
    /** ΕΓΣΑ87 - Ελληνικό Γεωδαιτικό Σύστημα Αναφοράς 1987 */
    readonly EGSA87: 2100;
    /** Web Mercator - Google Maps, OpenStreetMap standard */
    readonly WEB_MERCATOR: 3857;
    /** UTM Zone 34 North - Universal Transverse Mercator for Greece */
    readonly UTM_ZONE_34N: 32634;
};
/**
 * Snap-to-geometry configuration
 */
export declare const GEO_DRAWING_SNAP: {
    /** Default snap tolerance σε pixels */
    readonly DEFAULT_TOLERANCE: 15;
    /** Minimum zoom level για OSM data fetching */
    readonly MIN_SNAP_ZOOM: 16;
    /** Maximum zoom για OSM API calls */
    readonly MAX_SNAP_ZOOM: 20;
    /** Debounce time για map movement events (ms) */
    readonly DEBOUNCE_MS: 500;
    /** Priority order για snap types */
    readonly SNAP_PRIORITY: readonly ["vertex", "center", "midpoint", "edge", "nearest"];
};
/**
 * Measurement configuration
 */
export declare const GEO_DRAWING_MEASUREMENT: {
    /** Default decimal places για distance display */
    readonly DISTANCE_DECIMALS: 2;
    /** Default decimal places για area display */
    readonly AREA_DECIMALS: 2;
    /** Default decimal places για coordinates */
    readonly COORDINATE_DECIMALS: 6;
    /** Threshold για switching από meters σε kilometers */
    readonly DISTANCE_KM_THRESHOLD: 1000;
    /** Threshold για switching από m² σε hectares */
    readonly AREA_HECTARE_THRESHOLD: 10000;
    /** Threshold για switching από hectares σε km² */
    readonly AREA_KM_THRESHOLD: 1000000;
};
/**
 * OSM service configuration
 */
export declare const GEO_DRAWING_OSM: {
    /** Overpass API URL */
    readonly OVERPASS_API_URL: "https://overpass-api.de/api/interpreter";
    /** Request timeout σε milliseconds */
    readonly REQUEST_TIMEOUT: 30000;
    /** Maximum cache entries */
    readonly MAX_CACHE_ENTRIES: 100;
    /** Cache TTL σε milliseconds (5 minutes) */
    readonly CACHE_TTL: number;
    /** Coordinate precision για cache keys */
    readonly CACHE_PRECISION: 4;
};
/**
 * Drawing interaction configuration
 */
export declare const GEO_DRAWING_INTERACTION: {
    /** Double-click timeout σε milliseconds */
    readonly DOUBLE_CLICK_TIMEOUT: 300;
    /** Key codes για shortcuts */
    readonly KEY_CODES: {
        readonly ESCAPE: "Escape";
        readonly ENTER: "Enter";
        readonly SPACE: " ";
        readonly DELETE: "Delete";
        readonly BACKSPACE: "Backspace";
    };
    /** Mouse button codes */
    readonly MOUSE_BUTTONS: {
        readonly LEFT: 0;
        readonly MIDDLE: 1;
        readonly RIGHT: 2;
    };
    /** Accessibility constants */
    readonly ACCESSIBILITY: {
        readonly TAB_INDEX_FOCUSABLE: 0;
        readonly TAB_INDEX_SKIP: -1;
    };
};
/**
 * Visual styling configuration
 */
export declare const GEO_DRAWING_STYLES: {
    /** Default line weights */
    readonly LINE_WEIGHTS: {
        readonly THIN: 1;
        readonly NORMAL: 2;
        readonly THICK: 3;
        readonly MEASUREMENT: 3;
        readonly OSM_BUILDING: 1;
    };
    /** Point marker sizes */
    readonly POINT_SIZES: {
        readonly SMALL: 4;
        readonly NORMAL: 6;
        readonly LARGE: 8;
    };
    /** Opacity values */
    readonly OPACITY: {
        readonly DRAWING: 0.8;
        readonly FINISHED: 1;
        readonly BUILDING_FILL: 0.1;
        readonly BUILDING_HOVER: 0.3;
        readonly MEASUREMENT_FILL: 0.3;
        readonly DISABLED: 0.5;
    };
};
/**
 * Error messages keys για @layera/tolgee
 */
export declare const GEO_DRAWING_ERRORS: {
    readonly MINIMUM_POINTS_DISTANCE: "geo-drawing.errors.minimum-points-distance";
    readonly MINIMUM_POINTS_AREA: "geo-drawing.errors.minimum-points-area";
    readonly OSM_FETCH_FAILED: "geo-drawing.errors.osm-fetch-failed";
    readonly SNAP_ENGINE_ERROR: "geo-drawing.errors.snap-engine-error";
    readonly CALCULATION_ERROR: "geo-drawing.errors.calculation-error";
};
/**
 * Success messages keys για @layera/tolgee
 */
export declare const GEO_DRAWING_SUCCESS: {
    readonly MEASUREMENT_COMPLETED: "geo-drawing.success.measurement-completed";
    readonly MEASUREMENT_SAVED: "geo-drawing.success.measurement-saved";
    readonly MEASUREMENT_CLEARED: "geo-drawing.success.measurement-cleared";
};
/**
 * Coordinate System Information Mapping
 * Σύνδεση EPSG codes με metadata
 */
export declare const COORDINATE_SYSTEMS: {
    readonly 4326: {
        readonly name: "WGS84";
        readonly description: "World Geodetic System 1984 - GPS coordinates";
        readonly type: "geographic";
        readonly units: "degrees";
    };
    readonly 2100: {
        readonly name: "ΕΓΣΑ87";
        readonly description: "Ελληνικό Γεωδαιτικό Σύστημα Αναφοράς 1987";
        readonly type: "projected";
        readonly units: "meters";
    };
    readonly 3857: {
        readonly name: "Web Mercator";
        readonly description: "Web Mercator - Google Maps, OpenStreetMap";
        readonly type: "projected";
        readonly units: "meters";
    };
    readonly 32634: {
        readonly name: "UTM Zone 34N";
        readonly description: "Universal Transverse Mercator Zone 34 North";
        readonly type: "projected";
        readonly units: "meters";
    };
};
