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

import type { BBox, Point } from '../types/geo';
import type {
  OSMBuildingCollection,
  OSMBoundaryCollection,
  OverpassFilter,
  BuildingSearchConfig,
  BoundarySearchConfig,
  AdminLevel
} from '../types/osm';
import type { AsyncResult } from '../types/result';
import { ResultUtils } from '../types/result';
import { OverpassHTTPClient, createHTTPClient } from '../http/client';
import { OSMCacheManager, createCacheManager } from '../cache/cache';
import { BuildingsParser } from '../parsers/buildings';
import { BoundariesParser } from '../parsers/boundaries';
import { CoordinateValidation } from '../utils/validation';
import { validateQueryString, createCacheKey, createSafeTagValue } from '../utils/strings';

/**
 * Query builder για Overpass QL
 */
export class OverpassQueryBuilder {
  private elements: string[] = [];
  private filters: OverpassFilter[] = [];
  private bbox?: BBox;
  private timeout = 30;
  private format: 'json' | 'xml' = 'json';
  private output: 'out' | 'out geom' | 'out center' | 'out ids' = 'out geom';

  /**
   * Sets query timeout
   */
  setTimeout(seconds: number): this {
    this.timeout = Math.max(1, Math.min(60, seconds));
    return this;
  }

  /**
   * Sets output format
   */
  setFormat(format: 'json' | 'xml'): this {
    this.format = format;
    return this;
  }

  /**
   * Sets output verbosity
   */
  setOutput(output: 'out' | 'out geom' | 'out center' | 'out ids'): this {
    this.output = output;
    return this;
  }

  /**
   * Sets bounding box για query
   */
  setBBox(bbox: BBox): this {
    this.bbox = bbox;
    return this;
  }

  /**
   * Adds element type για query
   */
  addElement(element: 'node' | 'way' | 'relation'): this {
    if (!this.elements.includes(element)) {
      this.elements.push(element);
    }
    return this;
  }

  /**
   * Adds filter για tags
   */
  addFilter(filter: OverpassFilter): this {
    this.filters.push(filter);
    return this;
  }

  /**
   * Adds tag equals filter
   */
  addTagEquals(key: string, value: string): this {
    return this.addFilter({
      key,
      value,
      operator: '='
    });
  }

  /**
   * Adds tag exists filter
   */
  addTagExists(key: string): this {
    return this.addFilter({
      key,
      operator: 'exists'
    });
  }

  /**
   * Adds tag regex filter
   */
  addTagRegex(key: string, pattern: string, caseSensitive = false): this {
    return this.addFilter({
      key,
      value: pattern,
      operator: '~',
      caseSensitive
    });
  }

  /**
   * Builds final Overpass QL query
   */
  build(): string {
    const parts: string[] = [];

    // Header
    parts.push(`[out:${this.format}][timeout:${this.timeout}];`);

    // Union query start
    parts.push('(');

    // Generate queries για each element type
    for (const element of this.elements) {
      const elementQuery = this.buildElementQuery(element as 'node' | 'way' | 'relation');
      if (elementQuery) {
        parts.push(`  ${elementQuery}`);
      }
    }

    // Union query end
    parts.push(');');

    // Output
    parts.push(`${this.output};`);

    return parts.join('\n');
  }

  private buildElementQuery(element: 'node' | 'way' | 'relation'): string {
    const parts: string[] = [element];

    // Add filters
    for (const filter of this.filters) {
      parts.push(this.buildFilterString(filter));
    }

    // Add bounding box
    if (this.bbox) {
      const bboxStr = `(${this.bbox.south},${this.bbox.west},${this.bbox.north},${this.bbox.east})`;
      parts.push(bboxStr);
    }

    return parts.join('') + ';';
  }

  private buildFilterString(filter: OverpassFilter): string {
    const key = createSafeTagValue(filter.key);

    switch (filter.operator) {
      case '=':
        return `["${key}"="${createSafeTagValue(filter.value || '')}"]`;
      case '!=':
        return `["${key}"!="${createSafeTagValue(filter.value || '')}"]`;
      case '~':
        const regexFlag = filter.caseSensitive === false ? ', i' : '';
        return `["${key}"~"${createSafeTagValue(filter.value || '')}"${regexFlag}]`;
      case '!~':
        const negRegexFlag = filter.caseSensitive === false ? ', i' : '';
        return `["${key}"!~"${createSafeTagValue(filter.value || '')}"${negRegexFlag}]`;
      case 'exists':
        return `["${key}"]`;
      case '!exists':
        return `[!"${key}"]`;
      default:
        return `["${key}"]`;
    }
  }
}

/**
 * Repository για OSM building data
 */
export class BuildingsRepository {
  constructor(
    private readonly httpClient: OverpassHTTPClient,
    private readonly cache: OSMCacheManager
  ) {}

  /**
   * Searches για buildings σε bounding box
   */
  async findInBBox(
    bbox: BBox,
    config: Partial<BuildingSearchConfig> = {}
  ): AsyncResult<OSMBuildingCollection, Error> {
    // Validate bounding box
    const bboxValidation = CoordinateValidation.validateBBox(bbox);
    if (!bboxValidation.valid) {
      return ResultUtils.error(
        new Error(`Invalid bounding box: ${bboxValidation.errors.map(e => e.message).join(', ')}`)
      );
    }

    const fullConfig: BuildingSearchConfig = {
      includeBuildingTypes: ['yes', 'house', 'residential', 'apartments', 'commercial', 'office'],
      excludeBuildingTypes: [],
      minArea: 0,
      maxArea: Infinity,
      includeAddresses: true,
      ...config
    };

    // Generate cache key
    const cacheKey = createCacheKey('buildings', { bbox, config: fullConfig });

    // Check cache first
    const cached = this.cache.buildings.get(cacheKey);
    if (cached) {
      return ResultUtils.ok(cached);
    }

    // Build query
    const query = new OverpassQueryBuilder()
      .setTimeout(30)
      .setBBox(bbox)
      .addElement('way')
      .addElement('relation')
      .addTagExists('building');

    // Add building type filters
    if (fullConfig.includeBuildingTypes.length > 0) {
      const typePattern = fullConfig.includeBuildingTypes.join('|');
      query.addTagRegex('building', `^(${typePattern})$`);
    }

    const queryString = query.build();

    // Execute query
    const response = await this.httpClient.executeQuery(queryString);
    if (!response.ok) {
      return ResultUtils.error(response.error);
    }

    // Parse response
    let overpassData;
    try {
      overpassData = JSON.parse(response.data);
    } catch (error) {
      return ResultUtils.error(new Error('Failed to parse Overpass response'));
    }

    const parseResult = BuildingsParser.parseOverpassResponse(overpassData);
    if (!parseResult.ok) {
      return ResultUtils.error(
        new Error(`Parse error: ${parseResult.error.map(e => e.message).join(', ')}`)
      );
    }

    // Apply post-processing filters
    let features = parseResult.data.features;

    if (fullConfig.excludeBuildingTypes.length > 0) {
      features = features.filter(f =>
        !fullConfig.excludeBuildingTypes.includes(f.properties.building)
      );
    }

    const result: OSMBuildingCollection = {
      type: 'FeatureCollection',
      features
    };

    // Cache result
    this.cache.buildings.set(cacheKey, result);

    return ResultUtils.ok(result);
  }

  /**
   * Finds buildings near a point
   */
  async findNearPoint(
    point: Point,
    radiusMeters: number,
    config: Partial<BuildingSearchConfig> = {}
  ): AsyncResult<OSMBuildingCollection, Error> {
    // Convert radius to approximate degrees
    const degreeRadius = radiusMeters / 111000;

    const bbox: BBox = {
      south: point.lat - degreeRadius,
      west: point.lng - degreeRadius,
      north: point.lat + degreeRadius,
      east: point.lng + degreeRadius
    };

    return this.findInBBox(bbox, config);
  }

  /**
   * Gets building by OSM ID
   */
  async findById(id: number, type: 'way' | 'relation'): AsyncResult<OSMBuildingCollection, Error> {
    const cacheKey = createCacheKey('building-by-id', { id, type });

    // Check cache
    const cached = this.cache.buildings.get(cacheKey);
    if (cached) {
      return ResultUtils.ok(cached);
    }

    // Manual query για specific ID
    const queryString = `
      [out:json][timeout:10];
      (
        ${type}(${id});
      );
      out geom;
    `;

    const response = await this.httpClient.executeQuery(queryString);
    if (!response.ok) {
      return ResultUtils.error(response.error);
    }

    let overpassData;
    try {
      overpassData = JSON.parse(response.data);
    } catch (error) {
      return ResultUtils.error(new Error('Failed to parse Overpass response'));
    }

    const parseResult = BuildingsParser.parseOverpassResponse(overpassData);
    if (!parseResult.ok) {
      return ResultUtils.error(
        new Error(`Parse error: ${parseResult.error.map(e => e.message).join(', ')}`)
      );
    }

    // Cache result
    this.cache.buildings.set(cacheKey, parseResult.data, 60 * 60 * 1000); // 1 hour cache για specific buildings

    return ResultUtils.ok(parseResult.data);
  }
}

/**
 * Repository για OSM boundary data
 */
export class BoundariesRepository {
  constructor(
    private readonly httpClient: OverpassHTTPClient,
    private readonly cache: OSMCacheManager
  ) {}

  /**
   * Searches για administrative boundaries by name
   */
  async searchByName(
    name: string,
    config: Partial<BoundarySearchConfig> = {}
  ): AsyncResult<OSMBoundaryCollection, Error> {
    // Validate input
    const validation = validateQueryString(name);
    if (!validation.valid) {
      return ResultUtils.error(new Error(validation.reason));
    }

    const fullConfig: BoundarySearchConfig = {
      adminLevels: [4, 6, 8], // Region, Regional Unit, Municipality
      searchVariants: true,
      exactMatch: false,
      fallbackToPartial: true,
      maxResults: 10,
      ...config
    };

    const cacheKey = createCacheKey('boundaries-by-name', { name, config: fullConfig });

    // Check cache
    const cached = this.cache.boundaries.get(cacheKey);
    if (cached) {
      return ResultUtils.ok(cached);
    }

    // Build query
    const query = new OverpassQueryBuilder()
      .setTimeout(30)
      .addElement('relation')
      .addTagEquals('boundary', 'administrative');

    // Add admin level filters
    if (fullConfig.adminLevels.length > 0) {
      const levelPattern = fullConfig.adminLevels.join('|');
      query.addTagRegex('admin_level', `^(${levelPattern})$`);
    }

    // Add name search
    if (fullConfig.exactMatch) {
      query.addTagEquals('name', name);
    } else {
      // Case-insensitive partial match
      query.addTagRegex('name', name, false);
    }

    const queryString = query.build();
    const response = await this.httpClient.executeQuery(queryString);
    if (!response.ok) {
      return ResultUtils.error(response.error);
    }

    let overpassData;
    try {
      overpassData = JSON.parse(response.data);
    } catch (error) {
      return ResultUtils.error(new Error('Failed to parse Overpass response'));
    }

    const parseResult = BoundariesParser.parseOverpassResponse(overpassData);
    if (!parseResult.ok) {
      return ResultUtils.error(
        new Error(`Parse error: ${parseResult.error.map(e => e.message).join(', ')}`)
      );
    }

    // Limit results
    let features = parseResult.data.features;
    if (fullConfig.maxResults > 0) {
      features = features.slice(0, fullConfig.maxResults);
    }

    const result: OSMBoundaryCollection = {
      type: 'FeatureCollection',
      features
    };

    // Cache result για longer time (boundaries change rarely)
    this.cache.boundaries.set(cacheKey, result, 2 * 60 * 60 * 1000); // 2 hours

    return ResultUtils.ok(result);
  }

  /**
   * Gets boundary by admin level and name
   */
  async findByAdminLevel(
    adminLevel: AdminLevel,
    name?: string
  ): AsyncResult<OSMBoundaryCollection, Error> {
    const cacheKey = createCacheKey('boundaries-by-admin-level', { adminLevel, name });

    // Check cache
    const cached = this.cache.boundaries.get(cacheKey);
    if (cached) {
      return ResultUtils.ok(cached);
    }

    const query = new OverpassQueryBuilder()
      .setTimeout(30)
      .addElement('relation')
      .addTagEquals('boundary', 'administrative')
      .addTagEquals('admin_level', adminLevel.toString());

    if (name) {
      const validation = validateQueryString(name);
      if (!validation.valid) {
        return ResultUtils.error(new Error(validation.reason));
      }
      query.addTagRegex('name', name, false);
    }

    const queryString = query.build();

    const response = await this.httpClient.executeQuery(queryString);
    if (!response.ok) {
      return ResultUtils.error(response.error);
    }

    let overpassData;
    try {
      overpassData = JSON.parse(response.data);
    } catch (error) {
      return ResultUtils.error(new Error('Failed to parse Overpass response'));
    }

    const parseResult = BoundariesParser.parseOverpassResponse(overpassData);
    if (!parseResult.ok) {
      return ResultUtils.error(
        new Error(`Parse error: ${parseResult.error.map(e => e.message).join(', ')}`)
      );
    }

    // Cache result
    this.cache.boundaries.set(cacheKey, parseResult.data, 2 * 60 * 60 * 1000);

    return ResultUtils.ok(parseResult.data);
  }

  /**
   * Gets boundary containing a point
   */
  async findContainingPoint(
    point: Point,
    adminLevel?: AdminLevel
  ): AsyncResult<OSMBoundaryCollection, Error> {
    // Validate point
    const pointValidation = CoordinateValidation.validatePoint(point);
    if (!pointValidation.valid) {
      return ResultUtils.error(
        new Error(`Invalid point: ${pointValidation.errors.map(e => e.message).join(', ')}`)
      );
    }

    const cacheKey = createCacheKey('boundaries-containing-point', { point, adminLevel });

    // Check cache
    const cached = this.cache.boundaries.get(cacheKey);
    if (cached) {
      return ResultUtils.ok(cached);
    }

    const query = new OverpassQueryBuilder()
      .setTimeout(30)
      .addElement('relation')
      .addTagEquals('boundary', 'administrative');

    if (adminLevel) {
      query.addTagEquals('admin_level', adminLevel.toString());
    }

    // Use point-in-polygon query - this is a simplified approach
    // Full implementation would require more sophisticated geometry operations
    const buffer = 0.01; // Small buffer για point search
    const bbox: BBox = {
      south: point.lat - buffer,
      west: point.lng - buffer,
      north: point.lat + buffer,
      east: point.lng + buffer
    };
    query.setBBox(bbox);

    const queryString = query.build();

    const response = await this.httpClient.executeQuery(queryString);
    if (!response.ok) {
      return ResultUtils.error(response.error);
    }

    let overpassData;
    try {
      overpassData = JSON.parse(response.data);
    } catch (error) {
      return ResultUtils.error(new Error('Failed to parse Overpass response'));
    }

    const parseResult = BoundariesParser.parseOverpassResponse(overpassData);
    if (!parseResult.ok) {
      return ResultUtils.error(
        new Error(`Parse error: ${parseResult.error.map(e => e.message).join(', ')}`)
      );
    }

    // Cache result για moderate time
    this.cache.boundaries.set(cacheKey, parseResult.data, 30 * 60 * 1000); // 30 minutes

    return ResultUtils.ok(parseResult.data);
  }
}

/**
 * Main repository manager
 */
export class OSMRepositoryManager {
  public readonly buildings: BuildingsRepository;
  public readonly boundaries: BoundariesRepository;

  constructor(
    private readonly httpClient: OverpassHTTPClient,
    private readonly cache: OSMCacheManager
  ) {
    this.buildings = new BuildingsRepository(httpClient, cache);
    this.boundaries = new BoundariesRepository(httpClient, cache);
  }

  /**
   * Gets performance metrics από all repositories
   */
  getMetrics(): {
    http: unknown;
    cache: unknown;
  } {
    return {
      http: this.httpClient.getHealthStatus(),
      cache: this.cache.getAllStats()
    };
  }

  /**
   * Clears all caches
   */
  clearCaches(): void {
    this.cache.clearAll();
  }

  /**
   * Performs cleanup operations
   */
  cleanup(): void {
    this.cache.cleanupAll();
    this.httpClient.clearOldMetrics();
  }
}

/**
 * Creates default repository manager
 */
export const createRepositoryManager = (): OSMRepositoryManager => {
  const httpClient = createHTTPClient();
  const cache = createCacheManager();

  return new OSMRepositoryManager(httpClient, cache);
};