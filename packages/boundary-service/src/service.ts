/**
 * @layera/boundary-service - Main Service
 *
 * Enterprise boundary service με καθολική υποστήριξη περιοχών
 * Multi-provider fallback και intelligent caching
 */

import React from "react";
import { DatabaseNamespace, FirestoreCache } from '@layera/database-core';
import type { GeoJSONFeatureCollection } from '@layera/geo-core';
import type {
  BoundaryServiceConfig,
  BoundaryProvider,
  BoundaryOptions,
  BoundaryResult,
  ServiceHealth,
  GeocodingResult
} from './types';
import { BoundaryServiceError } from './types';

/**
 * Main boundary service class
 */
export class BoundaryService {
  private providers: BoundaryProvider[] = [];
  private cache: FirestoreCache;
  private _namespace: DatabaseNamespace;
  private config: BoundaryServiceConfig;

  constructor(config: BoundaryServiceConfig, namespace: DatabaseNamespace) {
    this.config = config;
    this._namespace = namespace;
    this.cache = new FirestoreCache(
      this._namespace,
      'boundaries_cache',
      config.cache?.ttl || 30 * 24 * 60 * 60 * 1000 // 30 days default
    );
  }

  /**
   * Get boundary για search query με fallback chain
   */
  async getBoundary(
    query: string,
    options: BoundaryOptions = {}
  ): Promise<BoundaryResult> {
    const startTime = Date.now();

    try {
      // 1. Check cache first (unless force fresh)
      if (!options.forceFresh) {
        const cached = await this.getCachedBoundary(query, options);
        if (cached) {
          return {
            boundary: cached,
            metadata: {
              source: 'cache',
              query,
              responseTime: Date.now() - startTime,
              fromCache: true,
              confidence: 1.0,
              isApproximate: false
            }
          };
        }
      }

      // 2. Try providers in priority order
      for (const provider of this.getSortedProviders()) {
        try {
          if (!(await provider.isAvailable())) {
            console.warn(`⚠️ Provider ${provider.name} not available`);
            continue;
          }

          const result = await Promise.race([
            provider.fetchBoundary(query, options),
            this.createTimeout(options.timeout || 5000)
          ]);

          if (result && result.boundary.features.length > 0) {
            // Cache successful result
            await this.cacheBoundary(query, result.boundary, options);

            return {
              boundary: result.boundary,
              metadata: {
                ...result.metadata,
                responseTime: Date.now() - startTime,
                fromCache: false
              }
            };
          }

        } catch (error) {
          console.warn(`⚠️ Provider ${provider.name} failed:`, error instanceof Error ? error.message : 'Unknown error');
          continue;
        }
      }

      // 3. Generate approximate boundary as fallback
      if (options.includeApproximate !== false) {
        const approximateBoundary = await this.generateApproximateBoundary(query);

        return {
          boundary: approximateBoundary,
          metadata: {
            source: 'approximate',
            query,
            responseTime: Date.now() - startTime,
            fromCache: false,
            confidence: 0.3,
            isApproximate: true
          }
        };
      }

      // 4. No results found
      throw new BoundaryServiceError(
        `No boundary found για: ${query}`,
        'NOT_FOUND'
      );

    } catch (error) {
      console.error(`🚫 Boundary search failed για: ${query}`, error);

      if (error instanceof BoundaryServiceError) {
        throw error;
      }

      throw new BoundaryServiceError(
        `Boundary search failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'SEARCH_FAILED'
      );
    }
  }

  /**
   * Subscribe to boundary updates για query
   */
  subscribeToBoundary(
    query: string,
    callback: (result: BoundaryResult | null) => React.ReactNode,
    options: BoundaryOptions = {}
  ): () => void {
    // Immediate result από cache ή null
    this.getCachedBoundary(query, options)
      .then(boundary => {
        if (boundary) {
          callback({
            boundary,
            metadata: {
              source: 'cache',
              query,
              responseTime: 0,
              fromCache: true,
              confidence: 1.0,
              isApproximate: false
            }
          });
        } else {
          callback(null);
        }
      })
      .catch(() => callback(null));

    // Queue background fetch if not cached
    this.queueBackgroundFetch(query, options, callback);

    // Return unsubscribe function
    return () => {
      // Cleanup subscription
    };
  }

  /**
   * Get service health status
   */
  async getHealth(): Promise<ServiceHealth> {
    const providerHealthPromises = this.providers.map(p => p.getHealth());
    const providerHealthResults = await Promise.allSettled(providerHealthPromises);

    const providers = providerHealthResults.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        return {
          provider: this.providers[index]?.name || 'unknown',
          status: 'down' as const,
          responseTime: -1,
          successRate: 0,
          errorCount: 1,
          lastSuccess: null,
          lastError: result.reason instanceof Error ? result.reason.message : 'Unknown error'
        };
      }
    });

    const cacheStats = await this.cache.stats();
    const healthyProviders = providers.filter(p => p.status === 'healthy').length;

    return {
      status: healthyProviders > 0 ? 'healthy' : 'down',
      providers,
      cache: {
        status: cacheStats.keys > 0 ? 'healthy' : 'degraded',
        hitRate: cacheStats.hitRate,
        size: cacheStats.keys
      },
      queue: {
        status: 'healthy', // NOTE: Implement queue stats
        size: 0,
        processingRate: 0
      },
      lastCheck: new Date()
    };
  }

  /**
   * Clear service cache
   */
  async clearCache(): Promise<void> {
    await this.cache.clear();
  }

  // Private methods

  private async getCachedBoundary(
    query: string,
    options: BoundaryOptions
  ): Promise<GeoJSONFeatureCollection | null> {
    const cacheKey = this.createCacheKey(query, options);
    return await this.cache.get<GeoJSONFeatureCollection>(cacheKey);
  }

  private async cacheBoundary(
    query: string,
    boundary: GeoJSONFeatureCollection,
    options: BoundaryOptions
  ): Promise<void> {
    const cacheKey = this.createCacheKey(query, options);
    const ttl = this.config.cache?.ttl || 30 * 24 * 60 * 60 * 1000;
    await this.cache.set(cacheKey, boundary, ttl);
  }

  private createCacheKey(query: string, options: BoundaryOptions): string {
    const normalizedQuery = query.toLowerCase().trim();
    const optionsHash = JSON.stringify({
      adminLevels: options.adminLevels?.sort(),
      language: options.language,
      countryCode: options.countryCode
    });

    return `boundary:${normalizedQuery}:${Buffer.from(optionsHash).toString('base64')}`;
  }

  private getSortedProviders(): BoundaryProvider[] {
    return [...this.providers].sort((a, b) => a.priority - b.priority);
  }

  private async generateApproximateBoundary(query: string): Promise<GeoJSONFeatureCollection> {
    try {
      // Simplified geocoding - στην πράξη θα χρησιμοποιούσε @layera/geocoding
      const geocodingResult = await this.geocodeLocation(query);

      if (geocodingResult) {
        // Create bounding box around coordinates
        const { latitude, longitude } = geocodingResult.coordinates;
        const radius = 0.01; // ~1km radius

        const coordinates = [
          [longitude - radius, latitude - radius],
          [longitude + radius, latitude - radius],
          [longitude + radius, latitude + radius],
          [longitude - radius, latitude + radius],
          [longitude - radius, latitude - radius] // Close polygon
        ];

        return {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {
              name: geocodingResult.name,
              approximate: true,
              confidence: geocodingResult.confidence
            },
            geometry: {
              type: 'Polygon',
              coordinates: [coordinates]
            }
          }]
        };
      }
    } catch (error) {
      console.warn(`⚠️ Geocoding failed για: ${query}`, error);
    }

    // Ultimate fallback - global bounding box
    return {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        properties: {
          name: query,
          approximate: true,
          confidence: 0.1,
          fallback: true
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [-180, -90], [180, -90], [180, 90], [-180, 90], [-180, -90]
          ]]
        }
      }]
    };
  }

  private async geocodeLocation(_query: string): Promise<GeocodingResult | null> {
    // Simplified implementation - στην πράξη θα χρησιμοποιούσε proper geocoding service
    // FIXME: Integrate με @layera/geocoding
    return null;
  }

  private async queueBackgroundFetch(
    query: string,
    options: BoundaryOptions,
    callback: (result: BoundaryResult | null) => React.ReactNode
  ): Promise<void> {
    // Background fetch implementation
    setTimeout(async () => {
      try {
        const result = await this.getBoundary(query, { ...options, forceFresh: true });
        callback(result);
      } catch (error) {
        console.warn(`⚠️ Background fetch failed για: ${query}`, error);
        callback(null);
      }
    }, 100);
  }

  private createTimeout(ms: number): Promise<never> {
    return new Promise((_, reject) => {
      setTimeout((): void => reject(new Error('Timeout')), ms);
    });
  }

  // Provider management

  /**
   * Add provider to service
   */
  addProvider(provider: BoundaryProvider): void {
    this.providers.push(provider);
    this.providers.sort((a, b) => a.priority - b.priority);
  }

  /**
   * Remove provider από service
   */
  removeProvider(providerName: string): void {
    const index = this.providers.findIndex(p => p.name === providerName);
    if (index >= 0) {
      this.providers.splice(index, 1);
    }
  }

  /**
   * Get provider statistics
   */
  async getProviderStats(): Promise<Array<{ name: string; health: unknown }>> {
    const stats = await Promise.allSettled(
      this.providers.map(async provider => ({
        name: provider.name,
        health: await provider.getHealth()
      }))
    );

    return stats
      .filter((result): result is PromiseFulfilledResult<{ name: string; health: unknown }> =>
        result.status === 'fulfilled'
      )
      .map(result => result.value);
  }
}