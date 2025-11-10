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

// Core Types
export type {
  // Geographic types
  Point,
  BBox,
  Coordinate,
  CoordinateArray,
  Ring,
  PolygonCoordinates
} from './types/geo';

export type {
  // Result types
  Result,
  AsyncResult,
  HttpResult,
  ResultData,
  ResultError
} from './types/result';

export type {
  // OSM types
  OSMNode,
  OSMWay,
  OSMRelation,
  OSMElement,
  OSMRelationMember,
  OverpassResponse,
  OSMBuildingFeature,
  OSMBoundaryFeature,
  OSMBuildingCollection,
  OSMBoundaryCollection,
  AdminLevel,
  OverpassQuery,
  OverpassFilter,
  OSMCacheConfig,
  OverpassClientConfig,
  QueryMetrics,
  RingSegment,
  AssembledRing,
  PolygonGeometry,
  ValidationIssue,
  ValidationResult,
  BoundarySearchConfig,
  BuildingSearchConfig,
  OSMErrorContext
} from './types/osm';

// Utilities
export { GeoUtils, LeafletCompat, GeoConstants } from './types/geo';
export { ResultUtils } from './types/result';
export { OSMTypeGuards, OSMConstants, ADMIN_LEVELS } from './types/osm';

// Internal imports for OSMClient implementation
import { BoundariesRepository, BuildingsRepository } from './repositories/overpass-repository';
import { OverpassHTTPClient } from './http/client';
import { OSMCacheManager } from './cache/cache';

// Validation
export {
  CoordinateValidation,
  OSMValidation,
  QueryValidation,
  ValidationConstants
} from './utils/validation';

export type {
  ValidationError
} from './utils/validation';

// String utilities
export {
  escapeRegex,
  normalizeAreaName,
  generateSearchVariants,
  validateQueryString,
  sanitizeInput,
  formatCoordinateForDisplay,
  createSafeTagValue,
  validateOSMId,
  createCacheKey,
  validateURL,
  StringConstants
} from './utils/strings';

// HTTP Client
export {
  OverpassHTTPClient,
  HTTPError,
  TimeoutError,
  NetworkError,
  createDefaultClientConfig,
  createHTTPClient
} from './http/client';

export type {
  RetryConfig
} from './http/client';

// Cache
export {
  LayeraCache,
  OSMCacheManager,
  createDefaultCacheConfig,
  createCacheManager
} from './cache/cache';

export type {
  CacheEntry,
  CacheStats,
  CacheEvent,
  CacheEventListener
} from './cache/cache';

// Parsers
export {
  BuildingsParser,
  BuildingClassifier,
  AddressProcessor,
  HeightProcessor
} from './parsers/buildings';

export {
  BoundariesParser,
  GreekAdminHierarchy,
  BoundaryNameProcessor,
  BoundaryStatsProcessor,
  RingAssembler
} from './parsers/boundaries';

// Repositories
export {
  OverpassQueryBuilder,
  BuildingsRepository,
  BoundariesRepository,
  OSMRepositoryManager,
  createRepositoryManager
} from './repositories/overpass-repository';

// Error classes
export {
  OSMError,
  NetworkError as OSMNetworkError,
  ValidationError as OSMValidationError,
  TimeoutError as OSMTimeoutError,
  ParseError
} from './types/result';

/**
 * Main OSM client interface
 */
export interface OSMClient {
  readonly buildings: any; // BuildingsRepository
  readonly boundaries: any; // BoundariesRepository

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
export interface OSMClientConfig {
  /**
   * HTTP client configuration
   */
  readonly http?: any; // Partial<OverpassClientConfig>

  /**
   * Cache configuration
   */
  readonly cache?: any; // Partial<OSMCacheConfig>

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
 * Internal OSM client implementation
 */
class OSMClientImpl implements OSMClient {
  private readonly startTime = Date.now();
  private readonly cache: OSMCacheManager;
  private readonly httpClient: OverpassHTTPClient;
  private readonly _boundaries: BoundariesRepository;
  private readonly _buildings: BuildingsRepository;

  constructor(config: OSMClientConfig = {}) {
    // Initialize cache
    this.cache = new OSMCacheManager({
      maxSize: config.cache?.maxSize || 500,
      ttlMs: config.cache?.ttlMs || 10 * 60 * 1000,
      cleanupIntervalMs: config.cache?.cleanupIntervalMs || 5 * 60 * 1000
    });

    // Initialize HTTP client
    this.httpClient = new OverpassHTTPClient({
      servers: config.http?.servers || [
        'https://overpass.kumi.systems/api/interpreter', // Primary - most reliable
        'https://overpass-api.de/api/interpreter', // Secondary - German server
        'https://lz4.overpass-api.de/api/interpreter', // Tertiary - Alternative German
      ],
      timeout: config.http?.timeout || 45000, // Increased timeout
      userAgent: config.http?.userAgent || 'Layera-Enterprise-OSM/1.0',
      rateLimitRps: config.http?.rateLimitRps || 0.5, // Slower rate (1 request per 2 seconds)
      retryAttempts: config.http?.retryAttempts || 5, // More retries
      retryDelayMs: config.http?.retryDelayMs || 3000 // Longer delay between retries
    });

    // Initialize repositories
    this._boundaries = new BoundariesRepository(this.httpClient, this.cache);
    this._buildings = new BuildingsRepository(this.httpClient, this.cache);

    if (config.debug) {
      console.log('OSM Client initialized with config:', config);
    }
  }

  get buildings(): BuildingsRepository {
    return this._buildings;
  }

  get boundaries(): BoundariesRepository {
    return this._boundaries;
  }

  getHealth() {
    return {
      http: { status: 'ok' },
      cache: { status: 'ok', entries: 0 },
      uptime: Date.now() - this.startTime
    };
  }

  clearCaches(): void {
    this.cache.clearAll();
  }

  cleanup(): void {
    this.cache.cleanupAll();
  }

  destroy(): void {
    this.cache.destroy();
  }
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
export const createOSMClient = (config: OSMClientConfig = {}): OSMClient => {
  return new OSMClientImpl(config);
};

/**
 * Default OSM client instance
 * Convenient για applications που χρειάζονται μόνο ένα client
 */
export const defaultOSMClient = createOSMClient();

/**
 * Convenience functions που χρησιμοποιούν το default client
 */
export const OSMService = {
  /**
   * Searches για buildings σε bounding box
   */
  findBuildings: defaultOSMClient.buildings.findInBBox.bind(defaultOSMClient.buildings),

  /**
   * Searches για buildings near point
   */
  findBuildingsNearPoint: defaultOSMClient.buildings.findNearPoint.bind(defaultOSMClient.buildings),

  /**
   * Searches για boundaries by name
   */
  searchBoundaries: defaultOSMClient.boundaries.searchByName.bind(defaultOSMClient.boundaries),

  /**
   * Gets boundaries containing point
   */
  findBoundariesContainingPoint: defaultOSMClient.boundaries.findContainingPoint.bind(defaultOSMClient.boundaries),

  /**
   * Gets client health
   */
  getHealth: defaultOSMClient.getHealth.bind(defaultOSMClient),

  /**
   * Clears all caches
   */
  clearCaches: defaultOSMClient.clearCaches.bind(defaultOSMClient)
};

/**
 * Version information
 */
export const version = '1.0.0';

/**
 * Package metadata
 */
export const packageInfo = {
  name: '@layera/osm',
  version,
  description: 'Enterprise-grade OpenStreetMap services για Layera ecosystem',
  author: 'Layera Development Team',
  license: 'MIT'
} as const;