import { Feature, Polygon, MultiPolygon, FeatureCollection } from 'geojson';

/**
 * @layera/osm - SSR-Safe Geographic Types
 *
 * Αυτόνομοι γεωγραφικοί τύποι που δεν εξαρτώνται από browser-specific libraries όπως Leaflet.
 * Κατάλληλοι για Server-Side Rendering (SSR) και cross-platform compatibility.
 *
 * Εμπνευσμένο από GeoJSON spec και enterprise GIS standards.
 */
/**
 * SSR-safe geographic point
 * Αντικαθιστά το L.LatLng από Leaflet
 */
interface Point {
    readonly lat: number;
    readonly lng: number;
}
/**
 * SSR-safe bounding box
 * Αντικαθιστά το L.LatLngBounds από Leaflet
 */
interface BBox {
    readonly south: number;
    readonly west: number;
    readonly north: number;
    readonly east: number;
}
/**
 * Geographic coordinate pair [longitude, latitude]
 * Ακολουθεί το GeoJSON standard
 */
type Coordinate = readonly [number, number];
/**
 * Array of coordinates που σχηματίζει γραμμή ή ring
 */
type CoordinateArray = readonly Coordinate[];
/**
 * Polygon ring (outer ή inner)
 */
type Ring = CoordinateArray;
/**
 * Polygon με outer ring και optional holes
 */
interface PolygonCoordinates {
    readonly outer: Ring;
    readonly holes?: readonly Ring[];
}
/**
 * Utility functions για γεωγραφικούς υπολογισμούς
 */
declare namespace GeoUtils {
    /**
     * Δημιουργεί Point από lat/lng
     */
    const point: (lat: number, lng: number) => Point;
    /**
     * Δημιουργεί BBox από coordinates
     */
    const bbox: (south: number, west: number, north: number, east: number) => BBox;
    /**
     * Μετατρέπει Point σε GeoJSON coordinate
     */
    const pointToCoordinate: (point: Point) => Coordinate;
    /**
     * Μετατρέπει GeoJSON coordinate σε Point
     */
    const coordinateToPoint: (coord: Coordinate) => Point;
    /**
     * Ελέγχει αν ένα Point είναι εντός BBox
     */
    const pointInBBox: (point: Point, bbox: BBox) => boolean;
    /**
     * Υπολογίζει το κέντρο ενός BBox
     */
    const bboxCenter: (bbox: BBox) => Point;
    /**
     * Υπολογίζει το εμβαδόν ενός BBox σε τετραγωνικές μοίρες
     */
    const bboxArea: (bbox: BBox) => number;
    /**
     * Ελέγχει αν δύο BBox τέμνονται
     */
    const bboxIntersects: (bbox1: BBox, bbox2: BBox) => boolean;
    /**
     * Δημιουργεί το union δύο BBox
     */
    const bboxUnion: (bbox1: BBox, bbox2: BBox) => BBox;
    /**
     * Ελέγχει αν ένα BBox είναι έγκυρο
     */
    const isValidBBox: (bbox: BBox) => boolean;
    /**
     * Normalizes longitude σε [-180, 180] range
     */
    const normalizeLongitude: (lng: number) => number;
    /**
     * Normalizes latitude σε [-90, 90] range
     */
    const normalizeLatitude: (lat: number) => number;
    /**
     * Υπολογίζει απόσταση μεταξύ δύο points σε μέτρα (Haversine formula)
     */
    const distanceInMeters: (point1: Point, point2: Point) => number;
    /**
     * Converts degrees σε radians
     */
    const toRadians: (degrees: number) => number;
    /**
     * Converts radians σε degrees
     */
    const toDegrees: (radians: number) => number;
    /**
     * Υπολογίζει bearing μεταξύ δύο points σε degrees
     */
    const bearing: (point1: Point, point2: Point) => number;
    /**
     * Δημιουργεί buffer γύρω από Point (απλό τετράγωνο)
     */
    const pointBuffer: (point: Point, radiusMeters: number) => BBox;
    /**
     * Formats coordinates για display
     */
    const formatPoint: (point: Point, precision?: number) => string;
    /**
     * Formats BBox για display
     */
    const formatBBox: (bbox: BBox, precision?: number) => string;
}
/**
 * Conversion utilities για compatibility με existing Leaflet code
 */
declare namespace LeafletCompat {
    /**
     * Converts Leaflet LatLng σε Point
     */
    const fromLatLng: (latlng: {
        lat: number;
        lng: number;
    }) => Point;
    /**
     * Converts Leaflet LatLngBounds σε BBox
     */
    const fromLatLngBounds: (bounds: {
        getSouth(): number;
        getWest(): number;
        getNorth(): number;
        getEast(): number;
    }) => BBox;
    /**
     * Converts Point σε Leaflet-compatible object
     */
    const toLatLng: (point: Point) => {
        lat: number;
        lng: number;
    };
    /**
     * Converts BBox σε Leaflet-compatible bounds
     */
    const toLatLngBounds: (bbox: BBox) => [[number, number], [number, number]];
}
/**
 * Constants για geographic operations
 */
declare const GeoConstants: {
    /** Earth radius σε μέτρα */
    readonly EARTH_RADIUS_METERS: 6371000;
    /** Earth circumference σε μέτρα */
    readonly EARTH_CIRCUMFERENCE_METERS: 40075000;
    /** Approximate meters per degree στον ισημερινό */
    readonly METERS_PER_DEGREE: 111000;
    /** WGS84 coordinate system limits */
    readonly WGS84_BOUNDS: {
        readonly south: -90;
        readonly west: -180;
        readonly north: 90;
        readonly east: 180;
    };
    /** Typical zoom levels για mapping */
    readonly ZOOM_LEVELS: {
        readonly WORLD: 1;
        readonly CONTINENT: 3;
        readonly COUNTRY: 6;
        readonly REGION: 8;
        readonly CITY: 10;
        readonly DISTRICT: 13;
        readonly STREET: 16;
        readonly BUILDING: 18;
    };
};

/**
 * @layera/osm - Foundation Types
 *
 * Generic Result<T, E> type για enterprise-grade error handling.
 * Εμπνευσμένο από Rust Result<T, E> και functional programming patterns.
 *
 * Χρησιμοποιείται σε όλο το Layera ecosystem για consistent error handling.
 */
/**
 * Generic Result type που εγκλωβίζει επιτυχημένα αποτελέσματα ή errors
 * Εναλλακτική στο throwing exceptions που επιτρέπει explicit error handling
 *
 * @template T - Ο τύπος του επιτυχημένου αποτελέσματος
 * @template E - Ο τύπος του error (default: Error)
 *
 * @example
 * ```typescript
 * async function fetchData(): Promise<Result<string, NetworkError>> {
 *   try {
 *     const data = await api.get('/data');
 *     return { ok: true, data };
 *   } catch (error) {
 *     return { ok: false, error: new NetworkError(error.message) };
 *   }
 * }
 *
 * const result = await fetchData();
 * if (result.ok) {
 *   console.log(result.data); // Type-safe access
 * } else {
 *   console.error(result.error.message);
 * }
 * ```
 */
type Result<T, E = Error> = {
    readonly ok: true;
    readonly data: T;
} | {
    readonly ok: false;
    readonly error: E;
    readonly status?: number;
};
/**
 * HTTP-specific Result που περιλαμβάνει status codes
 * Χρησιμοποιείται για API calls που χρειάζονται HTTP semantics
 */
type HttpResult<T, E = Error> = Result<T, E> & {
    readonly status?: number;
    readonly headers?: Record<string, string>;
};
/**
 * Async Result για Promise-based operations
 */
type AsyncResult<T, E = Error> = Promise<Result<T, E>>;
/**
 * Utility type για εξαγωγή του data type από ένα Result
 *
 * @example
 * ```typescript
 * type UserResult = Result<User, ValidationError>;
 * type UserData = ResultData<UserResult>; // User
 * ```
 */
type ResultData<R> = R extends Result<infer T, any> ? T : never;
/**
 * Utility type για εξαγωγή του error type από ένα Result
 */
type ResultError<R> = R extends Result<any, infer E> ? E : never;
/**
 * Utility functions για Result operations
 */
declare namespace ResultUtils {
    /**
     * Δημιουργεί επιτυχημένο Result
     */
    const ok: <T>(data: T) => Result<T, never>;
    /**
     * Δημιουργεί αποτυχημένο Result
     */
    const error: <E>(error: E, status?: number) => Result<never, E>;
    /**
     * Δημιουργεί αποτυχημένο Result με Error instance
     */
    const fail: (message: string, status?: number) => Result<never, Error>;
    /**
     * Maps το data ενός επιτυχημένου Result
     */
    const map: <T, U, E>(result: Result<T, E>, fn: (data: T) => U) => Result<U, E>;
    /**
     * Maps το error ενός αποτυχημένου Result
     */
    const mapError: <T, E, F>(result: Result<T, E>, fn: (error: E) => F) => Result<T, F>;
    /**
     * Chains Results μαζί (flatMap)
     */
    const chain: <T, U, E>(result: Result<T, E>, fn: (data: T) => Result<U, E>) => Result<U, E>;
    /**
     * Unwraps Result ή επιστρέφει default value
     */
    const unwrapOr: <T, E>(result: Result<T, E>, defaultValue: T) => T;
    /**
     * Unwraps Result ή throws error
     */
    const unwrap: <T, E>(result: Result<T, E>) => T;
    /**
     * Συνδυάζει multiple Results σε ένα
     * Αποτυγχάνει αν οποιοδήποτε Result είναι error
     */
    const combine: <T extends readonly unknown[], E>(results: { [K in keyof T]: Result<T[K], E>; }) => Result<T, E>;
    /**
     * Converts Promise<T> σε AsyncResult<T>
     */
    const fromPromise: <T>(promise: Promise<T>) => AsyncResult<T, Error>;
    /**
     * Converts AsyncResult<T> σε Promise<T> (throws on error)
     */
    const toPromise: <T, E>(asyncResult: AsyncResult<T, E>) => Promise<T>;
}
/**
 * Common error types για OSM operations
 */
declare class OSMError extends Error {
    readonly code: string;
    readonly details?: Record<string, unknown> | undefined;
    constructor(message: string, code: string, details?: Record<string, unknown> | undefined);
}
declare class NetworkError$1 extends OSMError {
    readonly status?: number | undefined;
    constructor(message: string, status?: number | undefined);
}
declare class ValidationError$1 extends OSMError {
    readonly field?: string | undefined;
    constructor(message: string, field?: string | undefined);
}
declare class TimeoutError$1 extends OSMError {
    readonly timeoutMs?: number | undefined;
    constructor(message: string, timeoutMs?: number | undefined);
}
declare class ParseError extends OSMError {
    readonly data?: unknown | undefined;
    constructor(message: string, data?: unknown | undefined);
}

/**
 * @layera/osm - OpenStreetMap Types
 *
 * Type definitions για OpenStreetMap data structures και Overpass API responses.
 * Enterprise-grade types με strict validation και type safety.
 */

/**
 * Core OSM element types
 */
interface OSMNode {
    readonly type: 'node';
    readonly id: number;
    readonly lat: number;
    readonly lon: number;
    readonly tags?: Record<string, string>;
    readonly timestamp?: string;
    readonly version?: number;
    readonly changeset?: number;
    readonly user?: string;
    readonly uid?: number;
}
interface OSMWay {
    readonly type: 'way';
    readonly id: number;
    readonly nodes: readonly number[];
    readonly tags?: Record<string, string>;
    readonly timestamp?: string;
    readonly version?: number;
    readonly changeset?: number;
    readonly user?: string;
    readonly uid?: number;
}
interface OSMRelationMember {
    readonly type: 'node' | 'way' | 'relation';
    readonly ref: number;
    readonly role: string;
}
interface OSMRelation {
    readonly type: 'relation';
    readonly id: number;
    readonly members: readonly OSMRelationMember[];
    readonly tags?: Record<string, string>;
    readonly timestamp?: string;
    readonly version?: number;
    readonly changeset?: number;
    readonly user?: string;
    readonly uid?: number;
}
/**
 * Union type για όλα τα OSM elements
 */
type OSMElement = OSMNode | OSMWay | OSMRelation;
/**
 * Overpass API response structure
 */
interface OverpassResponse {
    readonly version: number;
    readonly generator: string;
    readonly osm3s?: {
        readonly timestamp_osm_base: string;
        readonly copyright: string;
    };
    readonly elements: readonly OSMElement[];
}
/**
 * Specialized GeoJSON types για OSM features
 */
/**
 * Building feature από OSM data
 */
interface OSMBuildingFeature extends Feature<Polygon | MultiPolygon> {
    readonly properties: {
        readonly id: number;
        readonly type: 'way' | 'relation';
        readonly building: string;
        readonly name?: string;
        readonly height?: string;
        readonly levels?: string;
        readonly addr_housenumber?: string;
        readonly addr_street?: string;
        readonly addr_city?: string;
        readonly addr_postcode?: string;
        readonly [key: string]: unknown;
    };
}
/**
 * Administrative boundary feature από OSM data
 */
interface OSMBoundaryFeature extends Feature<Polygon | MultiPolygon> {
    readonly properties: {
        readonly id: number;
        readonly type: 'relation';
        readonly admin_level: string;
        readonly name?: string;
        readonly name_el?: string;
        readonly name_en?: string;
        readonly boundary: string;
        readonly place?: string;
        readonly population?: string;
        readonly wikidata?: string;
        readonly wikipedia?: string;
        readonly [key: string]: unknown;
    };
}
/**
 * GeoJSON collections για OSM features
 */
interface OSMBuildingCollection extends FeatureCollection<Polygon | MultiPolygon> {
    features: OSMBuildingFeature[];
}
interface OSMBoundaryCollection extends FeatureCollection<Polygon | MultiPolygon> {
    features: OSMBoundaryFeature[];
}
/**
 * Administrative levels used in Greece
 */
declare const ADMIN_LEVELS: {
    /** Χώρα (Greece) */
    readonly COUNTRY: 2;
    /** Περιφέρεια (e.g., Κεντρική Μακεδονία) */
    readonly REGION: 4;
    /** Περιφερειακή Ενότητα (e.g., Θεσσαλονίκης) */
    readonly REGIONAL_UNIT: 6;
    /** Δήμος (e.g., Δήμος Θεσσαλονίκης) */
    readonly MUNICIPALITY: 8;
    /** Δημοτική/Τοπική Κοινότητα */
    readonly COMMUNITY: 9;
    /** Οικισμός */
    readonly SETTLEMENT: 10;
};
type AdminLevel = typeof ADMIN_LEVELS[keyof typeof ADMIN_LEVELS];
/**
 * Overpass query builder types
 */
interface OverpassQuery {
    readonly format: 'json' | 'xml';
    readonly timeout: number;
    readonly elements: readonly string[];
    readonly filters: readonly OverpassFilter[];
    readonly output: 'out' | 'out geom' | 'out center' | 'out ids';
}
interface OverpassFilter {
    readonly key: string;
    readonly value?: string;
    readonly operator?: '=' | '!=' | '~' | '!~' | 'exists' | '!exists';
    readonly caseSensitive?: boolean;
}
/**
 * Cache configuration types
 */
interface OSMCacheConfig {
    readonly maxSize: number;
    readonly ttlMs: number;
    readonly cleanupIntervalMs: number;
}
/**
 * Client configuration types
 */
interface OverpassClientConfig {
    readonly servers: readonly string[];
    readonly timeout: number;
    readonly userAgent: string;
    readonly rateLimitRps: number;
    readonly retryAttempts: number;
    readonly retryDelayMs: number;
}
/**
 * Query performance metrics
 */
interface QueryMetrics {
    readonly queryHash: string;
    readonly server: string;
    readonly startTime: number;
    readonly endTime: number;
    readonly duration: number;
    readonly elementCount: number;
    readonly cacheHit: boolean;
    readonly success: boolean;
    readonly error?: string;
}
/**
 * Ring assembly types για complex polygons
 */
interface RingSegment {
    readonly wayId: number;
    readonly nodes: readonly number[];
    readonly role: 'outer' | 'inner' | '';
}
interface AssembledRing {
    readonly role: 'outer' | 'inner';
    readonly coordinates: readonly [number, number][];
    readonly closed: boolean;
    readonly clockwise: boolean;
}
interface PolygonGeometry {
    readonly outer: readonly AssembledRing[];
    readonly inner: readonly AssembledRing[];
}
/**
 * Validation types
 */
interface ValidationIssue {
    readonly severity: 'error' | 'warning' | 'info';
    readonly code: string;
    readonly message: string;
    readonly element?: OSMElement;
    readonly location?: [number, number];
}
interface ValidationResult$1 {
    readonly valid: boolean;
    readonly issues: readonly ValidationIssue[];
    readonly statistics: {
        readonly nodeCount: number;
        readonly wayCount: number;
        readonly relationCount: number;
        readonly featureCount: number;
    };
}
/**
 * Search configuration types
 */
interface BoundarySearchConfig {
    readonly adminLevels: readonly AdminLevel[];
    readonly searchVariants: boolean;
    readonly exactMatch: boolean;
    readonly fallbackToPartial: boolean;
    readonly maxResults: number;
}
interface BuildingSearchConfig {
    readonly includeBuildingTypes: readonly string[];
    readonly excludeBuildingTypes: readonly string[];
    readonly minArea: number;
    readonly maxArea: number;
    readonly includeAddresses: boolean;
}
/**
 * Error types για OSM operations
 */
interface OSMErrorContext {
    readonly operation: string;
    readonly query?: string;
    readonly server?: string;
    readonly elementId?: number;
    readonly coordinates?: [number, number];
}
/**
 * Utility type guards
 */
declare namespace OSMTypeGuards {
    const isNode: (element: OSMElement) => element is OSMNode;
    const isWay: (element: OSMElement) => element is OSMWay;
    const isRelation: (element: OSMElement) => element is OSMRelation;
    const isBuildingFeature: (feature: Feature) => feature is OSMBuildingFeature;
    const isBoundaryFeature: (feature: Feature) => feature is OSMBoundaryFeature;
    const isValidAdminLevel: (level: number) => level is AdminLevel;
    const hasGeometry: (element: OSMElement) => boolean;
}
/**
 * Constants για OSM operations
 */
declare const OSMConstants: {
    /** Default Overpass API servers */
    readonly DEFAULT_SERVERS: readonly ["https://overpass-api.de/api/interpreter", "https://overpass.kumi.systems/api/interpreter", "https://overpass.openstreetmap.ru/api/interpreter"];
    /** Common building types */
    readonly BUILDING_TYPES: readonly ["yes", "house", "residential", "apartments", "commercial", "office", "industrial", "retail", "hotel", "school", "hospital", "church", "public"];
    /** Greece-specific name tag priorities */
    readonly NAME_TAG_PRIORITY: readonly ["name:el", "name", "name:en", "official_name"];
    /** Default query limits */
    readonly QUERY_LIMITS: {
        readonly MAX_TIMEOUT_SECONDS: 30;
        readonly MAX_ELEMENTS: 10000;
        readonly MAX_BBOX_AREA: 0.2;
        readonly DEFAULT_BUILDINGS_LIMIT: 1000;
        readonly DEFAULT_BOUNDARIES_LIMIT: 100;
    };
    /** Cache settings */
    readonly CACHE_DEFAULTS: {
        readonly BUILDINGS_TTL_MS: number;
        readonly BOUNDARIES_TTL_MS: number;
        readonly MAX_CACHE_SIZE: 500;
        readonly CLEANUP_INTERVAL_MS: number;
    };
};

/**
 * @layera/osm - Geographic & Data Validation
 *
 * Enterprise-grade validation utilities για geographic data.
 * Comprehensive validation με detailed error reporting.
 */

/**
 * Validation error με context information
 */
interface ValidationError {
    readonly code: string;
    readonly message: string;
    readonly field?: string;
    readonly value?: unknown;
    readonly severity: 'error' | 'warning' | 'info';
    readonly location?: [number, number];
}
/**
 * Validation result με multiple issues
 */
interface ValidationResult {
    readonly valid: boolean;
    readonly errors: readonly ValidationError[];
    readonly warnings: readonly ValidationError[];
}
/**
 * Geographic coordinate validation
 */
declare namespace CoordinateValidation {
    /**
     * Validates latitude value
     */
    const validateLatitude: (lat: number) => Result<number, ValidationError>;
    /**
     * Validates longitude value
     */
    const validateLongitude: (lng: number) => Result<number, ValidationError>;
    /**
     * Validates Point object
     */
    const validatePoint: (point: Point) => ValidationResult;
    /**
     * Validates BBox object
     */
    const validateBBox: (bbox: BBox) => ValidationResult;
}
/**
 * OSM data validation
 */
declare namespace OSMValidation {
    /**
     * Validates OSM Node
     */
    const validateNode: (node: OSMNode) => ValidationResult;
    /**
     * Validates OSM Way
     */
    const validateWay: (way: OSMWay) => ValidationResult;
    /**
     * Validates OSM Relation
     */
    const validateRelation: (relation: OSMRelation) => ValidationResult;
    /**
     * Validates complete OSM element
     */
    const validateElement: (element: OSMElement) => ValidationResult;
    /**
     * Validates Overpass API response
     */
    const validateOverpassResponse: (response: OverpassResponse) => ValidationResult;
}
/**
 * Query parameter validation
 */
declare namespace QueryValidation {
    /**
     * Validates search timeout
     */
    const validateTimeout: (timeout: number) => Result<number, ValidationError>;
    /**
     * Validates admin level
     */
    const validateAdminLevel: (level: number) => Result<number, ValidationError>;
    /**
     * Validates search limit
     */
    const validateLimit: (limit: number) => Result<number, ValidationError>;
}
/**
 * Validation constants
 */
declare const ValidationConstants: {
    /** Maximum allowed timeout για queries (seconds) */
    readonly MAX_TIMEOUT_SECONDS: 60;
    /** Maximum allowed search limit */
    readonly MAX_SEARCH_LIMIT: 1000;
    /** Maximum reasonable BBox area (square degrees) */
    readonly MAX_BBOX_AREA: 100;
    /** Minimum meaningful BBox area (square degrees) */
    readonly MIN_BBOX_AREA: 0.0001;
    /** Maximum elements in response before warning */
    readonly MAX_RESPONSE_ELEMENTS: 10000;
    /** Valid admin levels για Greece */
    readonly VALID_ADMIN_LEVELS: readonly [2, 4, 6, 8, 9, 10];
    /** Coordinate precision για validation */
    readonly COORDINATE_PRECISION: 1e-8;
};

/**
 * @layera/osm - String Security & Utilities
 *
 * Enterprise-grade string processing με security hardening.
 * Προστασία από injection attacks και proper Unicode handling.
 */
/**
 * Escapes special regex characters για safe pattern matching
 * Προστασία από ReDoS (Regular Expression Denial of Service) attacks
 */
declare const escapeRegex: (input: string) => string;
/**
 * Normalizes area names για consistent searching
 * Handles Greek diacritics, case variations, και common abbreviations
 */
declare const normalizeAreaName: (name: string) => string;
/**
 * Generates search variants για area names
 * Περιλαμβάνει common variations που χρησιμοποιούν οι χρήστες
 */
declare const generateSearchVariants: (name: string) => readonly string[];
/**
 * Validates string input για OSM queries
 * Prevents injection attacks και validates length constraints
 */
declare const validateQueryString: (input: string) => {
    valid: boolean;
    reason?: string;
};
/**
 * Sanitizes user input για safe processing
 * Removes potentially dangerous characters while preserving Greek text
 */
declare const sanitizeInput: (input: string) => string;
/**
 * Formats coordinates για safe display
 * Prevents scientific notation και limits precision
 */
declare const formatCoordinateForDisplay: (coord: number, precision?: number) => string;
/**
 * Creates safe OSM tag values για queries
 * Ensures proper escaping για Overpass QL syntax
 */
declare const createSafeTagValue: (value: string) => string;
/**
 * Validates OSM element IDs
 * Ensures IDs are positive integers within valid range
 */
declare const validateOSMId: (id: unknown) => id is number;
/**
 * Creates hash για caching keys
 * Generates consistent cache keys από query parameters
 */
declare const createCacheKey: (prefix: string, params: Record<string, unknown>) => string;
/**
 * Validates URL safety για external requests
 * Prevents SSRF attacks και validates allowed domains
 */
declare const validateURL: (url: string, allowedDomains: readonly string[]) => boolean;
/**
 * Constants για string validation
 */
declare const StringConstants: {
    /** Maximum length για area name queries */
    readonly MAX_QUERY_LENGTH: 200;
    /** Minimum length για meaningful searches */
    readonly MIN_QUERY_LENGTH: 2;
    /** Maximum number of search variants */
    readonly MAX_SEARCH_VARIANTS: 20;
    /** Coordinate display precision */
    readonly COORDINATE_PRECISION: 6;
    /** Cache key prefix separator */
    readonly CACHE_SEPARATOR: ":";
    /** Greek alphabet range για validation */
    readonly GREEK_ALPHABET_REGEX: RegExp;
    /** Latin alphabet range για validation */
    readonly LATIN_ALPHABET_REGEX: RegExp;
};

/**
 * @layera/osm - Enterprise HTTP Client
 *
 * Production-ready HTTP client με comprehensive error handling, retry logic,
 * circuit breaker pattern, και performance monitoring.
 *
 * Features:
 * - Exponential backoff retry strategy
 * - Circuit breaker για failing servers
 * - Request/response interceptors
 * - Performance metrics collection
 * - Timeout management με progressive timeouts
 * - Rate limiting compliance
 */

/**
 * HTTP client error types
 */
declare class HTTPError extends Error {
    readonly status: number;
    readonly response?: Response | undefined;
    readonly url?: string | undefined;
    constructor(message: string, status: number, response?: Response | undefined, url?: string | undefined);
}
declare class TimeoutError extends Error {
    readonly timeoutMs: number;
    readonly url?: string | undefined;
    constructor(message: string, timeoutMs: number, url?: string | undefined);
}
declare class NetworkError extends Error {
    readonly cause?: Error | undefined;
    readonly url?: string | undefined;
    constructor(message: string, cause?: Error | undefined, url?: string | undefined);
}
/**
 * Request retry configuration
 */
interface RetryConfig {
    readonly maxAttempts: number;
    readonly baseDelayMs: number;
    readonly maxDelayMs: number;
    readonly backoffMultiplier: number;
    readonly retryableStatusCodes: readonly number[];
}
/**
 * Enterprise HTTP client
 */
declare class OverpassHTTPClient {
    private readonly config;
    private readonly circuitBreakers;
    private readonly rateLimiters;
    private readonly metrics;
    private readonly allowedDomains;
    constructor(config: OverpassClientConfig);
    /**
     * Makes HTTP request με comprehensive error handling
     */
    request(url: string, options?: RequestInit, retryConfig?: Partial<RetryConfig>): AsyncResult<Response, HTTPError | TimeoutError | NetworkError>;
    /**
     * Executes Overpass query με automatic server fallback
     */
    executeQuery(query: string): AsyncResult<string, HTTPError | TimeoutError | NetworkError>;
    /**
     * Gets client health status
     */
    getHealthStatus(): {
        servers: Array<{
            url: string;
            circuitBreakerState: string;
            failureCount: number;
            currentRps: number;
        }>;
        totalRequests: number;
        successRate: number;
    };
    /**
     * Gets performance metrics
     */
    getMetrics(): readonly QueryMetrics[];
    /**
     * Clears old metrics για memory management
     */
    clearOldMetrics(maxAge?: number): void;
    private sleep;
    private createQueryHash;
    private recordMetrics;
}
/**
 * Default client configuration
 */
declare const createDefaultClientConfig: () => OverpassClientConfig;
/**
 * Creates configured HTTP client instance
 */
declare const createHTTPClient: (config?: Partial<OverpassClientConfig>) => OverpassHTTPClient;

/**
 * @layera/osm - Enterprise Caching Layer
 *
 * Multi-level caching system με TTL support, automatic cleanup,
 * memory management, και cache statistics.
 *
 * Features:
 * - Time-To-Live (TTL) expiration
 * - LRU eviction policy
 * - Memory usage monitoring
 * - Cache hit/miss statistics
 * - Automatic background cleanup
 * - Cache warming capabilities
 * - Serializable cache entries
 */

/**
 * Cache entry με metadata
 */
interface CacheEntry<T> {
    readonly value: T;
    readonly key: string;
    readonly createdAt: number;
    readonly expiresAt: number;
    readonly size: number;
    readonly accessCount: number;
    readonly lastAccessAt: number;
}
/**
 * Cache statistics
 */
interface CacheStats {
    readonly totalEntries: number;
    readonly totalSize: number;
    readonly hitCount: number;
    readonly missCount: number;
    readonly evictionCount: number;
    readonly hitRate: number;
    readonly memoryUsage: number;
    readonly oldestEntry: number | undefined;
    readonly newestEntry: number | undefined;
}
/**
 * Cache event types για monitoring
 */
type CacheEvent = {
    type: 'hit';
    key: string;
    size: number;
} | {
    type: 'miss';
    key: string;
} | {
    type: 'set';
    key: string;
    size: number;
    ttl: number;
} | {
    type: 'evicted';
    key: string;
    reason: 'expired' | 'lru' | 'manual';
    size: number;
} | {
    type: 'cleanup';
    removedCount: number;
    freedSize: number;
};
/**
 * Cache event listener
 */
type CacheEventListener = (event: CacheEvent) => void;
/**
 * Enterprise cache implementation
 */
declare class LayeraCache<T> {
    private readonly config;
    private readonly entries;
    private readonly accessOrder;
    private readonly listeners;
    private hitCount;
    private missCount;
    private evictionCount;
    private accessCounter;
    private cleanupTimer;
    constructor(config: OSMCacheConfig);
    /**
     * Stores value στο cache με TTL
     */
    set(key: string, value: T, ttlMs?: number): void;
    /**
     * Retrieves value από το cache
     */
    get(key: string): T | undefined;
    /**
     * Checks if key exists στο cache (without accessing)
     */
    has(key: string): boolean;
    /**
     * Deletes entry από το cache
     */
    delete(key: string, reason?: 'expired' | 'lru' | 'manual'): boolean;
    /**
     * Clears όλο το cache
     */
    clear(): void;
    /**
     * Gets cache statistics
     */
    getStats(): CacheStats;
    /**
     * Gets all cache keys
     */
    keys(): string[];
    /**
     * Gets cache size in bytes
     */
    size(): number;
    /**
     * Adds event listener για cache monitoring
     */
    addEventListener(listener: CacheEventListener): void;
    /**
     * Removes event listener
     */
    removeEventListener(listener: CacheEventListener): void;
    /**
     * Manual cleanup του cache
     */
    cleanup(): {
        removedCount: number;
        freedSize: number;
    };
    /**
     * Warms up cache με batch data
     */
    warmUp(entries: Array<{
        key: string;
        value: T;
        ttlMs?: number;
    }>): void;
    /**
     * Destroys cache και cleanup resources
     */
    destroy(): void;
    private ensureCapacity;
    private estimateSize;
    private startCleanupTimer;
    private emit;
}
/**
 * Multi-level cache manager για different data types
 */
declare class OSMCacheManager {
    private readonly buildingsCache;
    private readonly boundariesCache;
    private readonly queryCache;
    constructor(config: OSMCacheConfig);
    /**
     * Gets/sets buildings cache
     */
    get buildings(): LayeraCache<any>;
    /**
     * Gets/sets boundaries cache
     */
    get boundaries(): LayeraCache<any>;
    /**
     * Gets/sets query cache
     */
    get queries(): LayeraCache<string>;
    /**
     * Gets combined statistics
     */
    getAllStats(): {
        buildings: CacheStats;
        boundaries: CacheStats;
        queries: CacheStats;
        total: {
            entries: number;
            size: number;
            hitRate: number;
        };
    };
    /**
     * Clears all caches
     */
    clearAll(): void;
    /**
     * Cleanup all caches
     */
    cleanupAll(): void;
    /**
     * Destroys all caches
     */
    destroy(): void;
}
/**
 * Creates default cache configuration
 */
declare const createDefaultCacheConfig: () => OSMCacheConfig;
/**
 * Creates configured cache manager
 */
declare const createCacheManager: (config?: Partial<OSMCacheConfig>) => OSMCacheManager;

/**
 * @layera/osm - Buildings Parser
 *
 * Specialized parser για OSM building data με comprehensive validation,
 * geometry processing, και enterprise-grade error handling.
 *
 * Features:
 * - Multi-geometry support (ways και relations)
 * - Complex polygon assembly για relations
 * - Building type classification
 * - Address normalization
 * - Height/level processing
 * - Comprehensive validation
 */

/**
 * Building classification helper
 */
declare namespace BuildingClassifier {
    /**
     * Normalizes building type
     */
    const normalizeBuildingType: (building: string) => string;
    /**
     * Validates building type
     */
    const isValidBuildingType: (building: string) => boolean;
    /**
     * Extracts building category
     */
    const getBuildingCategory: (building: string) => "residential" | "commercial" | "industrial" | "public" | "religious" | "other";
}
/**
 * Address processing utilities
 */
declare namespace AddressProcessor {
    /**
     * Normalizes address components
     */
    const normalizeAddress: (tags: Record<string, string>) => {
        housenumber?: string;
        street?: string;
        city?: string;
        postcode?: string;
        country?: string;
    };
    /**
     * Formats complete address string
     */
    const formatAddress: (tags: Record<string, string>) => string | undefined;
    /**
     * Validates address completeness
     */
    const validateAddress: (tags: Record<string, string>) => ValidationIssue[];
}
/**
 * Height and level processing
 */
declare namespace HeightProcessor {
    /**
     * Parses height value σε meters
     */
    const parseHeight: (height: string) => number | undefined;
    /**
     * Parses building levels
     */
    const parseLevels: (levels: string) => number | undefined;
    /**
     * Estimates height από levels
     */
    const estimateHeightFromLevels: (levels: number) => number;
    /**
     * Estimates levels από height
     */
    const estimateLevelsFromHeight: (height: number) => number;
}
/**
 * Main buildings parser
 */
declare class BuildingsParser {
    /**
     * Parses Overpass response σε building features
     */
    static parseOverpassResponse(response: OverpassResponse): Result<OSMBuildingCollection, ValidationIssue[]>;
    /**
     * Parses way-based building
     */
    private static parseWayBuilding;
    /**
     * Parses relation-based building (multipolygon)
     */
    private static parseRelationBuilding;
    /**
     * Processes OSM tags σε feature properties
     */
    private static processProperties;
}

/**
 * @layera/osm - Administrative Boundaries Parser
 *
 * Specialized parser για OSM administrative boundary data με complex
 * multipolygon assembly, Greek administrative hierarchy support,
 * και enterprise-grade validation.
 *
 * Features:
 * - Greek administrative level support (2-10)
 * - Complex multipolygon geometry assembly
 * - Name variant processing (Greek, English, official)
 * - Population and area calculations
 * - Wikidata integration support
 * - Comprehensive boundary validation
 */

/**
 * Greek administrative hierarchy helper
 */
declare namespace GreekAdminHierarchy {
    /**
     * Gets human-readable name για admin level
     */
    const getAdminLevelName: (level: AdminLevel) => string;
    /**
     * Validates admin level για Greece
     */
    const isValidGreekAdminLevel: (level: number) => level is AdminLevel;
    /**
     * Gets parent admin level
     */
    const getParentAdminLevel: (level: AdminLevel) => AdminLevel | undefined;
    /**
     * Gets child admin levels
     */
    const getChildAdminLevels: (level: AdminLevel) => AdminLevel[];
}
/**
 * Name processing utilities για boundaries
 */
declare namespace BoundaryNameProcessor {
    /**
     * Extracts all name variants από OSM tags
     */
    const extractNameVariants: (tags: Record<string, string>) => {
        primary: string | undefined;
        greek: string | undefined;
        english: string | undefined;
        official: string | undefined;
        variants: string[];
    };
    /**
     * Normalizes boundary name για searching
     */
    const normalizeBoundaryName: (name: string) => string;
    /**
     * Generates search variants για boundary
     */
    const generateBoundarySearchVariants: (tags: Record<string, string>) => string[];
    /**
     * Validates name completeness
     */
    const validateNames: (tags: Record<string, string>) => ValidationIssue[];
}
/**
 * Population and statistics processor
 */
declare namespace BoundaryStatsProcessor {
    /**
     * Parses population value
     */
    const parsePopulation: (population: string) => number | undefined;
    /**
     * Parses area value σε square kilometers
     */
    const parseArea: (area: string) => number | undefined;
    /**
     * Formats population για display
     */
    const formatPopulation: (population: number) => string;
    /**
     * Formats area για display
     */
    const formatArea: (area: number) => string;
}
/**
 * Ring assembly για complex multipolygons
 */
declare namespace RingAssembler {
    /**
     * Assembles way segments σε complete rings
     * This is a simplified implementation - full multipolygon assembly is complex
     */
    const assembleRings: (members: OSMRelation["members"], ways: Map<number, OSMWay>, nodes: Map<number, OSMNode>) => Result<{
        outer: [number, number][][];
        inner: [number, number][][];
    }, ValidationIssue[]>;
    const wayToCoordinates: (way: OSMWay, nodes: Map<number, OSMNode>) => [number, number][];
}
/**
 * Main boundaries parser
 */
declare class BoundariesParser {
    /**
     * Parses Overpass response σε boundary features
     */
    static parseOverpassResponse(response: OverpassResponse): Result<OSMBoundaryCollection, ValidationIssue[]>;
    /**
     * Parses relation-based administrative boundary
     */
    private static parseAdminBoundary;
    /**
     * Processes OSM tags σε feature properties
     */
    private static processProperties;
}

/**
 * @layera/osm - Overpass Repository Layer
 *
 * Enterprise repository pattern για OSM data με comprehensive query building,
 * caching integration, και robust error handling.
 *
 * Features:
 * - Type-safe query building
 * - Automatic caching με intelligent invalidation
 * - Multi-server failover
 * - Performance monitoring
 * - Batch query optimization
 * - Geographic indexing support
 */

/**
 * Query builder για Overpass QL
 */
declare class OverpassQueryBuilder {
    private elements;
    private filters;
    private bbox?;
    private timeout;
    private format;
    private output;
    /**
     * Sets query timeout
     */
    setTimeout(seconds: number): this;
    /**
     * Sets output format
     */
    setFormat(format: 'json' | 'xml'): this;
    /**
     * Sets output verbosity
     */
    setOutput(output: 'out' | 'out geom' | 'out center' | 'out ids'): this;
    /**
     * Sets bounding box για query
     */
    setBBox(bbox: BBox): this;
    /**
     * Adds element type για query
     */
    addElement(element: 'node' | 'way' | 'relation'): this;
    /**
     * Adds filter για tags
     */
    addFilter(filter: OverpassFilter): this;
    /**
     * Adds tag equals filter
     */
    addTagEquals(key: string, value: string): this;
    /**
     * Adds tag exists filter
     */
    addTagExists(key: string): this;
    /**
     * Adds tag regex filter
     */
    addTagRegex(key: string, pattern: string, caseSensitive?: boolean): this;
    /**
     * Builds final Overpass QL query
     */
    build(): string;
    private buildElementQuery;
    private buildFilterString;
}
/**
 * Repository για OSM building data
 */
declare class BuildingsRepository {
    private readonly httpClient;
    private readonly cache;
    constructor(httpClient: OverpassHTTPClient, cache: OSMCacheManager);
    /**
     * Searches για buildings σε bounding box
     */
    findInBBox(bbox: BBox, config?: Partial<BuildingSearchConfig>): AsyncResult<OSMBuildingCollection, Error>;
    /**
     * Finds buildings near a point
     */
    findNearPoint(point: Point, radiusMeters: number, config?: Partial<BuildingSearchConfig>): AsyncResult<OSMBuildingCollection, Error>;
    /**
     * Gets building by OSM ID
     */
    findById(id: number, type: 'way' | 'relation'): AsyncResult<OSMBuildingCollection, Error>;
}
/**
 * Repository για OSM boundary data
 */
declare class BoundariesRepository {
    private readonly httpClient;
    private readonly cache;
    constructor(httpClient: OverpassHTTPClient, cache: OSMCacheManager);
    /**
     * Searches για administrative boundaries by name
     */
    searchByName(name: string, config?: Partial<BoundarySearchConfig>): AsyncResult<OSMBoundaryCollection, Error>;
    /**
     * Gets boundary by admin level and name
     */
    findByAdminLevel(adminLevel: AdminLevel, name?: string): AsyncResult<OSMBoundaryCollection, Error>;
    /**
     * Gets boundary containing a point
     */
    findContainingPoint(point: Point, adminLevel?: AdminLevel): AsyncResult<OSMBoundaryCollection, Error>;
}
/**
 * Main repository manager
 */
declare class OSMRepositoryManager {
    private readonly httpClient;
    private readonly cache;
    readonly buildings: BuildingsRepository;
    readonly boundaries: BoundariesRepository;
    constructor(httpClient: OverpassHTTPClient, cache: OSMCacheManager);
    /**
     * Gets performance metrics από all repositories
     */
    getMetrics(): {
        http: any;
        cache: any;
    };
    /**
     * Clears all caches
     */
    clearCaches(): void;
    /**
     * Performs cleanup operations
     */
    cleanup(): void;
}
/**
 * Creates default repository manager
 */
declare const createRepositoryManager: () => OSMRepositoryManager;

/**
 * @layera/osm - Public API
 *
 * Enterprise-grade OpenStreetMap services για Layera ecosystem.
 * Clean, type-safe API με comprehensive error handling.
 *
 * @example Basic Usage
 * ```typescript
 * import { createOSMClient } from '@layera/osm';
 *
 * const client = createOSMClient();
 *
 * // Search για buildings
 * const buildings = await client.buildings.findInBBox({
 *   south: 40.5,
 *   west: 22.9,
 *   north: 40.6,
 *   east: 23.0
 * });
 *
 * // Search για administrative boundaries
 * const boundaries = await client.boundaries.searchByName('Θεσσαλονίκη');
 * ```
 */

/**
 * Main OSM client interface
 */
interface OSMClient {
    readonly buildings: any;
    readonly boundaries: any;
    /**
     * Gets client health and performance metrics
     */
    getHealth(): {
        http: any;
        cache: any;
        uptime: number;
    };
    /**
     * Clears all caches
     */
    clearCaches(): void;
    /**
     * Performs cleanup operations
     */
    cleanup(): void;
    /**
     * Destroys client and releases resources
     */
    destroy(): void;
}
/**
 * OSM client configuration
 */
interface OSMClientConfig {
    /**
     * HTTP client configuration
     */
    readonly http?: any;
    /**
     * Cache configuration
     */
    readonly cache?: any;
    /**
     * Enable debug logging
     */
    readonly debug?: boolean;
    /**
     * Custom user agent
     */
    readonly userAgent?: string;
}
/**
 * Creates new OSM client instance
 *
 * @param config Client configuration
 * @returns Configured OSM client
 *
 * @example
 * ```typescript
 * // Basic client
 * const client = createOSMClient();
 *
 * // Custom configuration
 * const client = createOSMClient({
 *   http: {
 *     timeout: 60000,
 *     retryAttempts: 5
 *   },
 *   cache: {
 *     maxSize: 100 * 1024 * 1024, // 100MB
 *     ttlMs: 60 * 60 * 1000 // 1 hour
 *   },
 *   debug: true
 * });
 * ```
 */
declare const createOSMClient: (config?: OSMClientConfig) => OSMClient;
/**
 * Default OSM client instance
 * Convenient για applications που χρειάζονται μόνο ένα client
 */
declare const defaultOSMClient: OSMClient;
/**
 * Convenience functions που χρησιμοποιούν το default client
 */
declare const OSMService: {
    /**
     * Searches για buildings σε bounding box
     */
    findBuildings: any;
    /**
     * Searches για buildings near point
     */
    findBuildingsNearPoint: any;
    /**
     * Searches για boundaries by name
     */
    searchBoundaries: any;
    /**
     * Gets boundaries containing point
     */
    findBoundariesContainingPoint: any;
    /**
     * Gets client health
     */
    getHealth: () => {
        http: any;
        cache: any;
        uptime: number;
    };
    /**
     * Clears all caches
     */
    clearCaches: () => void;
};
/**
 * Version information
 */
declare const version = "1.0.0";
/**
 * Package metadata
 */
declare const packageInfo: {
    readonly name: "@layera/osm";
    readonly version: "1.0.0";
    readonly description: "Enterprise-grade OpenStreetMap services για Layera ecosystem";
    readonly author: "Layera Development Team";
    readonly license: "MIT";
};

export { ADMIN_LEVELS, AddressProcessor, type AdminLevel, type AssembledRing, type AsyncResult, type BBox, BoundariesParser, BoundariesRepository, BoundaryNameProcessor, type BoundarySearchConfig, BoundaryStatsProcessor, BuildingClassifier, type BuildingSearchConfig, BuildingsParser, BuildingsRepository, type CacheEntry, type CacheEvent, type CacheEventListener, type CacheStats, type Coordinate, type CoordinateArray, CoordinateValidation, GeoConstants, GeoUtils, GreekAdminHierarchy, HTTPError, HeightProcessor, type HttpResult, LayeraCache, LeafletCompat, NetworkError, type OSMBoundaryCollection, type OSMBoundaryFeature, type OSMBuildingCollection, type OSMBuildingFeature, type OSMCacheConfig, OSMCacheManager, type OSMClient, type OSMClientConfig, OSMConstants, type OSMElement, OSMError, type OSMErrorContext, NetworkError$1 as OSMNetworkError, type OSMNode, type OSMRelation, type OSMRelationMember, OSMRepositoryManager, OSMService, TimeoutError$1 as OSMTimeoutError, OSMTypeGuards, OSMValidation, ValidationError$1 as OSMValidationError, type OSMWay, type OverpassClientConfig, type OverpassFilter, OverpassHTTPClient, type OverpassQuery, OverpassQueryBuilder, type OverpassResponse, ParseError, type Point, type PolygonCoordinates, type PolygonGeometry, type QueryMetrics, QueryValidation, type Result, type ResultData, type ResultError, ResultUtils, type RetryConfig, type Ring, RingAssembler, type RingSegment, StringConstants, TimeoutError, ValidationConstants, type ValidationError, type ValidationIssue, type ValidationResult$1 as ValidationResult, createCacheKey, createCacheManager, createDefaultCacheConfig, createDefaultClientConfig, createHTTPClient, createOSMClient, createRepositoryManager, createSafeTagValue, defaultOSMClient, escapeRegex, formatCoordinateForDisplay, generateSearchVariants, normalizeAreaName, packageInfo, sanitizeInput, validateOSMId, validateQueryString, validateURL, version };
