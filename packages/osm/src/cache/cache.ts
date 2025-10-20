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

import type { OSMCacheConfig } from '../types/osm';

/**
 * Cache entry με metadata
 */
export interface CacheEntry<T> {
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
export interface CacheStats {
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
export type CacheEvent =
  | { type: 'hit'; key: string; size: number }
  | { type: 'miss'; key: string }
  | { type: 'set'; key: string; size: number; ttl: number }
  | { type: 'evicted'; key: string; reason: 'expired' | 'lru' | 'manual'; size: number }
  | { type: 'cleanup'; removedCount: number; freedSize: number };

/**
 * Cache event listener
 */
export type CacheEventListener = (event: CacheEvent) => void;

/**
 * Enterprise cache implementation
 */
export class LayeraCache<T> {
  private readonly entries = new Map<string, CacheEntry<T>>();
  private readonly accessOrder = new Map<string, number>(); // για LRU tracking
  private readonly listeners = new Set<CacheEventListener>();

  private hitCount = 0;
  private missCount = 0;
  private evictionCount = 0;
  private accessCounter = 0;
  private cleanupTimer: NodeJS.Timeout | undefined;

  constructor(private readonly config: OSMCacheConfig) {
    this.startCleanupTimer();
  }

  /**
   * Stores value στο cache με TTL
   */
  set(key: string, value: T, ttlMs?: number): void {
    const now = Date.now();
    const effectiveTtl = ttlMs ?? this.config.ttlMs;
    const size = this.estimateSize(value);

    // Check if we need to make space
    this.ensureCapacity(size);

    const entry: CacheEntry<T> = {
      value,
      key,
      createdAt: now,
      expiresAt: now + effectiveTtl,
      size,
      accessCount: 0,
      lastAccessAt: now
    };

    this.entries.set(key, entry);
    this.accessOrder.set(key, ++this.accessCounter);

    this.emit({
      type: 'set',
      key,
      size,
      ttl: effectiveTtl
    });
  }

  /**
   * Retrieves value από το cache
   */
  get(key: string): T | undefined {
    const entry = this.entries.get(key);

    if (!entry) {
      this.missCount++;
      this.emit({ type: 'miss', key });
      return undefined;
    }

    // Check expiration
    if (Date.now() > entry.expiresAt) {
      this.delete(key, 'expired');
      this.missCount++;
      this.emit({ type: 'miss', key });
      return undefined;
    }

    // Update access metadata
    const updatedEntry: CacheEntry<T> = {
      ...entry,
      accessCount: entry.accessCount + 1,
      lastAccessAt: Date.now()
    };

    this.entries.set(key, updatedEntry);
    this.accessOrder.set(key, ++this.accessCounter);

    this.hitCount++;
    this.emit({
      type: 'hit',
      key,
      size: entry.size
    });

    return entry.value;
  }

  /**
   * Checks if key exists στο cache (without accessing)
   */
  has(key: string): boolean {
    const entry = this.entries.get(key);
    if (!entry) return false;

    if (Date.now() > entry.expiresAt) {
      this.delete(key, 'expired');
      return false;
    }

    return true;
  }

  /**
   * Deletes entry από το cache
   */
  delete(key: string, reason: 'expired' | 'lru' | 'manual' = 'manual'): boolean {
    const entry = this.entries.get(key);
    if (!entry) return false;

    this.entries.delete(key);
    this.accessOrder.delete(key);

    if (reason !== 'manual') {
      this.evictionCount++;
    }

    this.emit({
      type: 'evicted',
      key,
      reason,
      size: entry.size
    });

    return true;
  }

  /**
   * Clears όλο το cache
   */
  clear(): void {
    const entries = Array.from(this.entries.keys());
    this.entries.clear();
    this.accessOrder.clear();

    for (const key of entries) {
      this.emit({
        type: 'evicted',
        key,
        reason: 'manual',
        size: 0
      });
    }
  }

  /**
   * Gets cache statistics
   */
  getStats(): CacheStats {
    const entries = Array.from(this.entries.values());
    const totalSize = entries.reduce((sum, entry) => sum + entry.size, 0);
    const total = this.hitCount + this.missCount;

    return {
      totalEntries: this.entries.size,
      totalSize,
      hitCount: this.hitCount,
      missCount: this.missCount,
      evictionCount: this.evictionCount,
      hitRate: total > 0 ? this.hitCount / total : 0,
      memoryUsage: totalSize / this.config.maxSize,
      oldestEntry: entries.length > 0 ? Math.min(...entries.map(e => e.createdAt)) : undefined,
      newestEntry: entries.length > 0 ? Math.max(...entries.map(e => e.createdAt)) : undefined
    };
  }

  /**
   * Gets all cache keys
   */
  keys(): string[] {
    return Array.from(this.entries.keys());
  }

  /**
   * Gets cache size in bytes
   */
  size(): number {
    return Array.from(this.entries.values()).reduce((sum, entry) => sum + entry.size, 0);
  }

  /**
   * Adds event listener για cache monitoring
   */
  addEventListener(listener: CacheEventListener): void {
    this.listeners.add(listener);
  }

  /**
   * Removes event listener
   */
  removeEventListener(listener: CacheEventListener): void {
    this.listeners.delete(listener);
  }

  /**
   * Manual cleanup του cache
   */
  cleanup(): { removedCount: number; freedSize: number } {
    const now = Date.now();
    let removedCount = 0;
    let freedSize = 0;

    // Remove expired entries
    for (const [key, entry] of this.entries) {
      if (now > entry.expiresAt) {
        freedSize += entry.size;
        this.delete(key, 'expired');
        removedCount++;
      }
    }

    this.emit({
      type: 'cleanup',
      removedCount,
      freedSize
    });

    return { removedCount, freedSize };
  }

  /**
   * Warms up cache με batch data
   */
  warmUp(entries: Array<{ key: string; value: T; ttlMs?: number }>): void {
    for (const entry of entries) {
      this.set(entry.key, entry.value, entry.ttlMs);
    }
  }

  /**
   * Destroys cache και cleanup resources
   */
  destroy(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = undefined;
    }

    this.clear();
    this.listeners.clear();
  }

  private ensureCapacity(newEntrySize: number): void {
    const currentSize = this.size();
    const requiredSpace = currentSize + newEntrySize - this.config.maxSize;

    if (requiredSpace <= 0) return;

    // Sort entries by LRU order
    const sortedEntries = Array.from(this.entries.entries())
      .sort(([keyA], [keyB]) => {
        const accessA = this.accessOrder.get(keyA) || 0;
        const accessB = this.accessOrder.get(keyB) || 0;
        return accessA - accessB;
      });

    let freedSpace = 0;
    for (const [key, entry] of sortedEntries) {
      if (freedSpace >= requiredSpace) break;

      freedSpace += entry.size;
      this.delete(key, 'lru');
    }
  }

  private estimateSize(value: T): number {
    try {
      // Rough estimation για memory usage
      const jsonString = JSON.stringify(value);
      return jsonString.length * 2; // Unicode characters can be 2 bytes
    } catch {
      // Fallback για non-serializable objects
      return 1000; // Default size estimate
    }
  }

  private startCleanupTimer(): void {
    this.cleanupTimer = setInterval(() => {
      this.cleanup();
    }, this.config.cleanupIntervalMs);
  }

  private emit(event: CacheEvent): void {
    for (const listener of this.listeners) {
      try {
        listener(event);
      } catch (error) {
        console.warn('Cache event listener error:', error);
      }
    }
  }
}

/**
 * Multi-level cache manager για different data types
 */
export class OSMCacheManager {
  private readonly buildingsCache: LayeraCache<any>;
  private readonly boundariesCache: LayeraCache<any>;
  private readonly queryCache: LayeraCache<string>;

  constructor(config: OSMCacheConfig) {
    // Different TTLs για different data types
    const buildingsConfig: OSMCacheConfig = {
      ...config,
      ttlMs: 10 * 60 * 1000 // 10 minutes για buildings
    };

    const boundariesConfig: OSMCacheConfig = {
      ...config,
      ttlMs: 60 * 60 * 1000 // 1 hour για boundaries
    };

    const queryConfig: OSMCacheConfig = {
      ...config,
      ttlMs: 5 * 60 * 1000, // 5 minutes για raw queries
      maxSize: config.maxSize / 3 // Smaller cache για queries
    };

    this.buildingsCache = new LayeraCache(buildingsConfig);
    this.boundariesCache = new LayeraCache(boundariesConfig);
    this.queryCache = new LayeraCache(queryConfig);
  }

  /**
   * Gets/sets buildings cache
   */
  get buildings(): LayeraCache<any> {
    return this.buildingsCache;
  }

  /**
   * Gets/sets boundaries cache
   */
  get boundaries(): LayeraCache<any> {
    return this.boundariesCache;
  }

  /**
   * Gets/sets query cache
   */
  get queries(): LayeraCache<string> {
    return this.queryCache;
  }

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
  } {
    const buildingsStats = this.buildingsCache.getStats();
    const boundariesStats = this.boundariesCache.getStats();
    const queriesStats = this.queryCache.getStats();

    const totalEntries = buildingsStats.totalEntries + boundariesStats.totalEntries + queriesStats.totalEntries;
    const totalSize = buildingsStats.totalSize + boundariesStats.totalSize + queriesStats.totalSize;
    const totalHits = buildingsStats.hitCount + boundariesStats.hitCount + queriesStats.hitCount;
    const totalRequests = totalHits + buildingsStats.missCount + boundariesStats.missCount + queriesStats.missCount;

    return {
      buildings: buildingsStats,
      boundaries: boundariesStats,
      queries: queriesStats,
      total: {
        entries: totalEntries,
        size: totalSize,
        hitRate: totalRequests > 0 ? totalHits / totalRequests : 0
      }
    };
  }

  /**
   * Clears all caches
   */
  clearAll(): void {
    this.buildingsCache.clear();
    this.boundariesCache.clear();
    this.queryCache.clear();
  }

  /**
   * Cleanup all caches
   */
  cleanupAll(): void {
    this.buildingsCache.cleanup();
    this.boundariesCache.cleanup();
    this.queryCache.cleanup();
  }

  /**
   * Destroys all caches
   */
  destroy(): void {
    this.buildingsCache.destroy();
    this.boundariesCache.destroy();
    this.queryCache.destroy();
  }
}

/**
 * Creates default cache configuration
 */
export const createDefaultCacheConfig = (): OSMCacheConfig => ({
  maxSize: 50 * 1024 * 1024, // 50MB
  ttlMs: 30 * 60 * 1000, // 30 minutes
  cleanupIntervalMs: 5 * 60 * 1000 // 5 minutes
});

/**
 * Creates configured cache manager
 */
export const createCacheManager = (config?: Partial<OSMCacheConfig>): OSMCacheManager => {
  const fullConfig = { ...createDefaultCacheConfig(), ...config };
  return new OSMCacheManager(fullConfig);
};