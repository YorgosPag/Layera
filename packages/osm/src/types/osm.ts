/**
 * @layera/osm - OpenStreetMap Types
 *
 * Type definitions για OpenStreetMap data structures και Overpass API responses.
 * Enterprise-grade types με strict validation και type safety.
 */

import type { FeatureCollection, Feature, Polygon, MultiPolygon } from 'geojson';

/**
 * Core OSM element types
 */
export interface OSMNode {
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

export interface OSMWay {
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

export interface OSMRelationMember {
  readonly type: 'node' | 'way' | 'relation';
  readonly ref: number;
  readonly role: string;
}

export interface OSMRelation {
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
export type OSMElement = OSMNode | OSMWay | OSMRelation;

/**
 * Overpass API response structure
 */
export interface OverpassResponse {
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
export interface OSMBuildingFeature extends Feature<Polygon | MultiPolygon> {
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
export interface OSMBoundaryFeature extends Feature<Polygon | MultiPolygon> {
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
export interface OSMBuildingCollection extends FeatureCollection<Polygon | MultiPolygon> {
  features: OSMBuildingFeature[];
}

export interface OSMBoundaryCollection extends FeatureCollection<Polygon | MultiPolygon> {
  features: OSMBoundaryFeature[];
}

/**
 * Administrative levels used in Greece
 */
export const ADMIN_LEVELS = {
  /** Χώρα (Greece) */
  COUNTRY: 2,
  /** Περιφέρεια (e.g., Κεντρική Μακεδονία) */
  REGION: 4,
  /** Περιφερειακή Ενότητα (e.g., Θεσσαλονίκης) */
  REGIONAL_UNIT: 6,
  /** Δήμος (e.g., Δήμος Θεσσαλονίκης) */
  MUNICIPALITY: 8,
  /** Δημοτική/Τοπική Κοινότητα */
  COMMUNITY: 9,
  /** Οικισμός */
  SETTLEMENT: 10
} as const;

export type AdminLevel = typeof ADMIN_LEVELS[keyof typeof ADMIN_LEVELS];

/**
 * Overpass query builder types
 */
export interface OverpassQuery {
  readonly format: 'json' | 'xml';
  readonly timeout: number;
  readonly elements: readonly string[];
  readonly filters: readonly OverpassFilter[];
  readonly output: 'out' | 'out geom' | 'out center' | 'out ids';
}

export interface OverpassFilter {
  readonly key: string;
  readonly value?: string;
  readonly operator?: '=' | '!=' | '~' | '!~' | 'exists' | '!exists';
  readonly caseSensitive?: boolean;
}

/**
 * Cache configuration types
 */
export interface OSMCacheConfig {
  readonly maxSize: number;
  readonly ttlMs: number;
  readonly cleanupIntervalMs: number;
}

/**
 * Client configuration types
 */
export interface OverpassClientConfig {
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
export interface QueryMetrics {
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
export interface RingSegment {
  readonly wayId: number;
  readonly nodes: readonly number[];
  readonly role: 'outer' | 'inner' | '';
}

export interface AssembledRing {
  readonly role: 'outer' | 'inner';
  readonly coordinates: readonly [number, number][];
  readonly closed: boolean;
  readonly clockwise: boolean;
}

export interface PolygonGeometry {
  readonly outer: readonly AssembledRing[];
  readonly inner: readonly AssembledRing[];
}

/**
 * Validation types
 */
export interface ValidationIssue {
  readonly severity: 'error' | 'warning' | 'info';
  readonly code: string;
  readonly message: string;
  readonly element?: OSMElement;
  readonly location?: [number, number];
}

export interface ValidationResult {
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
export interface BoundarySearchConfig {
  readonly adminLevels: readonly AdminLevel[];
  readonly searchVariants: boolean;
  readonly exactMatch: boolean;
  readonly fallbackToPartial: boolean;
  readonly maxResults: number;
}

export interface BuildingSearchConfig {
  readonly includeBuildingTypes: readonly string[];
  readonly excludeBuildingTypes: readonly string[];
  readonly minArea: number;
  readonly maxArea: number;
  readonly includeAddresses: boolean;
}

/**
 * Error types για OSM operations
 */
export interface OSMErrorContext {
  readonly operation: string;
  readonly query?: string;
  readonly server?: string;
  readonly elementId?: number;
  readonly coordinates?: [number, number];
}

/**
 * Utility type guards
 */
export namespace OSMTypeGuards {
  export const isNode = (element: OSMElement): element is OSMNode =>
    element.type === 'node';

  export const isWay = (element: OSMElement): element is OSMWay =>
    element.type === 'way';

  export const isRelation = (element: OSMElement): element is OSMRelation =>
    element.type === 'relation';

  export const isBuildingFeature = (feature: Feature): feature is OSMBuildingFeature =>
    feature.properties?.building !== undefined;

  export const isBoundaryFeature = (feature: Feature): feature is OSMBoundaryFeature =>
    feature.properties?.boundary === 'administrative';

  export const isValidAdminLevel = (level: number): level is AdminLevel =>
    Object.values(ADMIN_LEVELS).includes(level as AdminLevel);

  export const hasGeometry = (element: OSMElement): boolean => {
    if (isNode(element)) {
      return typeof element.lat === 'number' && typeof element.lon === 'number';
    }
    if (isWay(element)) {
      return Array.isArray(element.nodes) && element.nodes.length >= 2;
    }
    if (isRelation(element)) {
      return Array.isArray(element.members) && element.members.length > 0;
    }
    return false;
  };
}

/**
 * Constants για OSM operations
 */
export const OSMConstants = {
  /** Default Overpass API servers */
  DEFAULT_SERVERS: [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
    'https://overpass.openstreetmap.ru/api/interpreter'
  ] as const,

  /** Common building types */
  BUILDING_TYPES: [
    'yes',
    'house',
    'residential',
    'apartments',
    'commercial',
    'office',
    'industrial',
    'retail',
    'hotel',
    'school',
    'hospital',
    'church',
    'public'
  ] as const,

  /** Greece-specific name tag priorities */
  NAME_TAG_PRIORITY: ['name:el', 'name', 'name:en', 'official_name'] as const,

  /** Default query limits */
  QUERY_LIMITS: {
    MAX_TIMEOUT_SECONDS: 30,
    MAX_ELEMENTS: 10000,
    MAX_BBOX_AREA: 0.2, // degrees²
    DEFAULT_BUILDINGS_LIMIT: 1000,
    DEFAULT_BOUNDARIES_LIMIT: 100
  } as const,

  /** Cache settings */
  CACHE_DEFAULTS: {
    BUILDINGS_TTL_MS: 10 * 60 * 1000, // 10 minutes
    BOUNDARIES_TTL_MS: 60 * 60 * 1000, // 1 hour
    MAX_CACHE_SIZE: 500,
    CLEANUP_INTERVAL_MS: 5 * 60 * 1000 // 5 minutes
  } as const
} as const;