"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  BOUNDARY_SERVICE_VERSION: () => BOUNDARY_SERVICE_VERSION,
  BoundaryService: () => BoundaryService,
  createBoundaryService: () => createBoundaryService
});
module.exports = __toCommonJS(index_exports);

// src/service.ts
var import_database_core = require("@layera/database-core");

// src/types/index.ts
var BoundaryServiceError = class extends Error {
  constructor(message, code, provider) {
    super(message);
    this.code = code;
    this.provider = provider;
    this.name = "BoundaryServiceError";
  }
};

// src/service.ts
var BoundaryService = class {
  constructor(config, namespace) {
    __publicField(this, "providers", []);
    __publicField(this, "cache");
    __publicField(this, "_namespace");
    __publicField(this, "config");
    this.config = config;
    this._namespace = namespace;
    this.cache = new import_database_core.FirestoreCache(
      this._namespace,
      "boundaries_cache",
      config.cache?.ttl || 30 * 24 * 60 * 60 * 1e3
      // 30 days default
    );
    console.log("\u{1F5FA}\uFE0F BoundaryService initialized");
  }
  /**
   * Get boundary για search query με fallback chain
   */
  async getBoundary(query, options = {}) {
    const startTime = Date.now();
    try {
      console.log(`\u{1F50D} Boundary search: "${query}"`);
      if (!options.forceFresh) {
        const cached = await this.getCachedBoundary(query, options);
        if (cached) {
          console.log(`\u26A1 Cache hit \u03B3\u03B9\u03B1: ${query}`);
          return {
            boundary: cached,
            metadata: {
              source: "cache",
              query,
              responseTime: Date.now() - startTime,
              fromCache: true,
              confidence: 1,
              isApproximate: false
            }
          };
        }
      }
      for (const provider of this.getSortedProviders()) {
        try {
          if (!await provider.isAvailable()) {
            console.warn(`\u26A0\uFE0F Provider ${provider.name} not available`);
            continue;
          }
          const result = await Promise.race([
            provider.fetchBoundary(query, options),
            this.createTimeout(options.timeout || 5e3)
          ]);
          if (result && result.boundary.features.length > 0) {
            console.log(`\u2705 Found boundary via ${provider.name}`);
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
          console.warn(`\u26A0\uFE0F Provider ${provider.name} failed:`, error instanceof Error ? error.message : "Unknown error");
          continue;
        }
      }
      if (options.includeApproximate !== false) {
        console.log(`\u{1F3AF} Generating approximate boundary \u03B3\u03B9\u03B1: ${query}`);
        const approximateBoundary = await this.generateApproximateBoundary(query);
        return {
          boundary: approximateBoundary,
          metadata: {
            source: "approximate",
            query,
            responseTime: Date.now() - startTime,
            fromCache: false,
            confidence: 0.3,
            isApproximate: true
          }
        };
      }
      throw new BoundaryServiceError(
        `No boundary found \u03B3\u03B9\u03B1: ${query}`,
        "NOT_FOUND"
      );
    } catch (error) {
      console.error(`\u{1F6AB} Boundary search failed \u03B3\u03B9\u03B1: ${query}`, error);
      if (error instanceof BoundaryServiceError) {
        throw error;
      }
      throw new BoundaryServiceError(
        `Boundary search failed: ${error instanceof Error ? error.message : "Unknown error"}`,
        "SEARCH_FAILED"
      );
    }
  }
  /**
   * Subscribe to boundary updates για query
   */
  subscribeToBoundary(query, callback, options = {}) {
    this.getCachedBoundary(query, options).then((boundary) => {
      if (boundary) {
        callback({
          boundary,
          metadata: {
            source: "cache",
            query,
            responseTime: 0,
            fromCache: true,
            confidence: 1,
            isApproximate: false
          }
        });
      } else {
        callback(null);
      }
    }).catch(() => callback(null));
    this.queueBackgroundFetch(query, options, callback);
    return () => {
      console.log(`\u{1F504} Unsubscribed \u03B1\u03C0\u03CC boundary updates \u03B3\u03B9\u03B1: ${query}`);
    };
  }
  /**
   * Get service health status
   */
  async getHealth() {
    const providerHealthPromises = this.providers.map((p) => p.getHealth());
    const providerHealthResults = await Promise.allSettled(providerHealthPromises);
    const providers = providerHealthResults.map((result, index) => {
      if (result.status === "fulfilled") {
        return result.value;
      } else {
        return {
          provider: this.providers[index]?.name || "unknown",
          status: "down",
          responseTime: -1,
          successRate: 0,
          errorCount: 1,
          lastSuccess: null,
          lastError: result.reason instanceof Error ? result.reason.message : "Unknown error"
        };
      }
    });
    const cacheStats = await this.cache.stats();
    const healthyProviders = providers.filter((p) => p.status === "healthy").length;
    return {
      status: healthyProviders > 0 ? "healthy" : "down",
      providers,
      cache: {
        status: cacheStats.keys > 0 ? "healthy" : "degraded",
        hitRate: cacheStats.hitRate,
        size: cacheStats.keys
      },
      queue: {
        status: "healthy",
        // TODO: Implement queue stats
        size: 0,
        processingRate: 0
      },
      lastCheck: /* @__PURE__ */ new Date()
    };
  }
  /**
   * Clear service cache
   */
  async clearCache() {
    await this.cache.clear();
    console.log("\u{1F9F9} Boundary service cache cleared");
  }
  // Private methods
  async getCachedBoundary(query, options) {
    const cacheKey = this.createCacheKey(query, options);
    return await this.cache.get(cacheKey);
  }
  async cacheBoundary(query, boundary, options) {
    const cacheKey = this.createCacheKey(query, options);
    const ttl = this.config.cache?.ttl || 30 * 24 * 60 * 60 * 1e3;
    await this.cache.set(cacheKey, boundary, ttl);
  }
  createCacheKey(query, options) {
    const normalizedQuery = query.toLowerCase().trim();
    const optionsHash = JSON.stringify({
      adminLevels: options.adminLevels?.sort(),
      language: options.language,
      countryCode: options.countryCode
    });
    return `boundary:${normalizedQuery}:${Buffer.from(optionsHash).toString("base64")}`;
  }
  getSortedProviders() {
    return [...this.providers].sort((a, b) => a.priority - b.priority);
  }
  async generateApproximateBoundary(query) {
    try {
      const geocodingResult = await this.geocodeLocation(query);
      if (geocodingResult) {
        const { latitude, longitude } = geocodingResult.coordinates;
        const radius = 0.01;
        const coordinates = [
          [longitude - radius, latitude - radius],
          [longitude + radius, latitude - radius],
          [longitude + radius, latitude + radius],
          [longitude - radius, latitude + radius],
          [longitude - radius, latitude - radius]
          // Close polygon
        ];
        return {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            properties: {
              name: geocodingResult.name,
              approximate: true,
              confidence: geocodingResult.confidence
            },
            geometry: {
              type: "Polygon",
              coordinates: [coordinates]
            }
          }]
        };
      }
    } catch (error) {
      console.warn(`\u26A0\uFE0F Geocoding failed \u03B3\u03B9\u03B1: ${query}`, error);
    }
    return {
      type: "FeatureCollection",
      features: [{
        type: "Feature",
        properties: {
          name: query,
          approximate: true,
          confidence: 0.1,
          fallback: true
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [-180, -90],
            [180, -90],
            [180, 90],
            [-180, 90],
            [-180, -90]
          ]]
        }
      }]
    };
  }
  async geocodeLocation(_query) {
    return null;
  }
  async queueBackgroundFetch(query, options, callback) {
    setTimeout(async () => {
      try {
        const result = await this.getBoundary(query, { ...options, forceFresh: true });
        callback(result);
      } catch (error) {
        console.warn(`\u26A0\uFE0F Background fetch failed \u03B3\u03B9\u03B1: ${query}`, error);
        callback(null);
      }
    }, 100);
  }
  createTimeout(ms) {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Timeout")), ms);
    });
  }
  // Provider management
  /**
   * Add provider to service
   */
  addProvider(provider) {
    this.providers.push(provider);
    this.providers.sort((a, b) => a.priority - b.priority);
    console.log(`\u2795 Added boundary provider: ${provider.name} (priority: ${provider.priority})`);
  }
  /**
   * Remove provider από service
   */
  removeProvider(providerName) {
    const index = this.providers.findIndex((p) => p.name === providerName);
    if (index >= 0) {
      this.providers.splice(index, 1);
      console.log(`\u2796 Removed boundary provider: ${providerName}`);
    }
  }
  /**
   * Get provider statistics
   */
  async getProviderStats() {
    const stats = await Promise.allSettled(
      this.providers.map(async (provider) => ({
        name: provider.name,
        health: await provider.getHealth()
      }))
    );
    return stats.filter(
      (result) => result.status === "fulfilled"
    ).map((result) => result.value);
  }
};

// src/factory.ts
var import_database_core2 = require("@layera/database-core");
function createBoundaryService(config) {
  const defaultConfig = {
    providers: [
      {
        type: "osm",
        priority: 1,
        config: {
          endpoint: "https://overpass-api.de/api/interpreter",
          timeout: 5e3
        }
      },
      {
        type: "nominatim",
        priority: 2,
        config: {
          endpoint: "https://nominatim.openstreetmap.org",
          timeout: 3e3
        }
      }
    ],
    cache: {
      ttl: 30 * 24 * 60 * 60 * 1e3,
      // 30 days
      cleanupInterval: 60 * 60 * 1e3
      // 1 hour
    },
    queue: {
      maxSize: 1e3,
      processingInterval: 5 * 60 * 1e3,
      // 5 minutes
      retry: {
        maxAttempts: 3,
        baseDelay: 1e3,
        backoffMultiplier: 2,
        maxDelay: 3e4
      }
    },
    defaults: {
      adminLevels: [4, 6, 8],
      timeout: 5e3,
      includeApproximate: true
    }
  };
  const finalConfig = {
    ...defaultConfig,
    ...config,
    providers: config?.providers || defaultConfig.providers,
    cache: { ...defaultConfig.cache, ...config?.cache },
    queue: { ...defaultConfig.queue, ...config?.queue },
    defaults: { ...defaultConfig.defaults, ...config?.defaults }
  };
  const namespace = (0, import_database_core2.createDatabaseNamespace)("boundary_service");
  return new BoundaryService(finalConfig, namespace);
}

// src/index.ts
var BOUNDARY_SERVICE_VERSION = "1.0.0";
//# sourceMappingURL=index.js.map