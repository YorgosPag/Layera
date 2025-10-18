/**
 * 🌳 R-TREE SPATIAL INDEX
 * High-performance spatial indexing με rbush library
 * Βασισμένο σε enterprise patterns από ESRI & PostGIS
 */

import RBush from 'rbush';
import knn from 'rbush-knn';
import type {
  Point2D,
  BoundingBox,
  GeometryEntity,
  SpatialIndexOptions,
  SnapPerformanceMetrics
} from '../types';

// ========================================
// 📋 R-TREE ITEM INTERFACE
// ========================================

interface RTreeItem {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  geometry: GeometryEntity;
}

// ========================================
// 🌳 R-TREE SPATIAL INDEX CLASS
// ========================================

export class RTreeSpatialIndex {
  private tree: RBush<RTreeItem>;
  private options: SpatialIndexOptions;
  private geometries: Map<string, GeometryEntity>;
  private lastRebuildTime: number;
  private indexedCount: number;

  constructor(options: Partial<SpatialIndexOptions> = {}) {
    this.options = {
      maxEntries: options.maxEntries ?? 16,
      minEntries: options.minEntries ?? 4,
      algorithm: 'rtree', // Always rtree για αυτή την implementation
      autoRebalance: options.autoRebalance ?? true,
      ...options
    };

    this.tree = new RBush<RTreeItem>(this.options.maxEntries);
    this.geometries = new Map();
    this.lastRebuildTime = 0;
    this.indexedCount = 0;
  }

  // ========================================
  // 📥 GEOMETRY INSERTION
  // ========================================

  public insertGeometry(geometry: GeometryEntity): void {
    try {
      // Remove existing if present
      if (this.geometries.has(geometry.id)) {
        this.removeGeometry(geometry.id);
      }

      // Create R-tree item
      const item: RTreeItem = {
        ...geometry.bounds,
        geometry
      };

      // Insert to tree
      this.tree.insert(item);
      this.geometries.set(geometry.id, geometry);
      this.indexedCount++;

      // Auto-rebalance check
      if (this.options.autoRebalance && this.shouldRebalance()) {
        this.rebuild();
      }
    } catch (error) {
      console.error(`Failed to insert geometry ${geometry.id}:`, error);
      throw new Error(`Spatial index insertion failed: ${error}`);
    }
  }

  public insertBatch(geometries: GeometryEntity[]): SnapPerformanceMetrics {
    const startTime = performance.now();

    try {
      const items: RTreeItem[] = geometries.map(geometry => ({
        ...geometry.bounds,
        geometry
      }));

      // Bulk insert για performance
      this.tree.load(items);

      // Update internal maps
      geometries.forEach(geometry => {
        this.geometries.set(geometry.id, geometry);
      });

      this.indexedCount += geometries.length;
      const indexTime = performance.now() - startTime;
      this.lastRebuildTime = indexTime;

      return {
        searchTime: 0,
        indexTime,
        totalTime: indexTime,
        geometryCount: geometries.length,
        resultsCount: 0,
        memoryUsage: this.estimateMemoryUsage()
      };
    } catch (error) {
      console.error('Batch insertion failed:', error);
      throw new Error(`Spatial index batch insertion failed: ${error}`);
    }
  }

  // ========================================
  // 🗑️ GEOMETRY REMOVAL
  // ========================================

  public removeGeometry(geometryId: string): boolean {
    const geometry = this.geometries.get(geometryId);
    if (!geometry) return false;

    try {
      const item: RTreeItem = {
        ...geometry.bounds,
        geometry
      };

      this.tree.remove(item, (a, b) => a.geometry.id === b.geometry.id);
      this.geometries.delete(geometryId);
      this.indexedCount--;

      return true;
    } catch (error) {
      console.error(`Failed to remove geometry ${geometryId}:`, error);
      return false;
    }
  }

  public clear(): void {
    this.tree.clear();
    this.geometries.clear();
    this.indexedCount = 0;
    this.lastRebuildTime = 0;
  }

  // ========================================
  // 🔍 SPATIAL QUERIES
  // ========================================

  public searchInBounds(bounds: BoundingBox): GeometryEntity[] {
    try {
      const results = this.tree.search(bounds);
      return results.map(item => item.geometry);
    } catch (error) {
      console.error('Bounds search failed:', error);
      return [];
    }
  }

  public searchNearPoint(
    point: Point2D,
    tolerance: number,
    maxResults: number = 10
  ): { geometry: GeometryEntity; distance: number }[] {
    try {
      const searchBounds: BoundingBox = {
        minX: point.x - tolerance,
        minY: point.y - tolerance,
        maxX: point.x + tolerance,
        maxY: point.y + tolerance
      };

      const candidates = this.tree.search(searchBounds);

      // Calculate actual distances και sort
      const results = candidates
        .map(item => ({
          geometry: item.geometry,
          distance: this.calculateDistance(point, item.geometry)
        }))
        .filter(result => result.distance <= tolerance)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, maxResults);

      return results;
    } catch (error) {
      console.error('Near point search failed:', error);
      return [];
    }
  }

  public findKNearest(point: Point2D, k: number = 5): GeometryEntity[] {
    try {
      const results = knn(this.tree, point.x, point.y, k);
      return results.map(item => item.geometry);
    } catch (error) {
      console.error('KNN search failed:', error);
      return [];
    }
  }

  // ========================================
  // 🔄 INDEX MAINTENANCE
  // ========================================

  public rebuild(): SnapPerformanceMetrics {
    const startTime = performance.now();

    try {
      const allGeometries = Array.from(this.geometries.values());
      this.clear();

      if (allGeometries.length > 0) {
        return this.insertBatch(allGeometries);
      }

      const rebuildTime = performance.now() - startTime;
      this.lastRebuildTime = rebuildTime;

      return {
        searchTime: 0,
        indexTime: rebuildTime,
        totalTime: rebuildTime,
        geometryCount: 0,
        resultsCount: 0,
        memoryUsage: this.estimateMemoryUsage()
      };
    } catch (error) {
      console.error('Index rebuild failed:', error);
      throw new Error(`Spatial index rebuild failed: ${error}`);
    }
  }

  private shouldRebalance(): boolean {
    // Rebalance αν η tree έχει γίνει unbalanced
    const threshold = Math.max(1000, this.indexedCount * 0.1);
    return this.indexedCount > threshold &&
           this.lastRebuildTime > 100; // More than 100ms to rebuild
  }

  // ========================================
  // 📊 PERFORMANCE UTILITIES
  // ========================================

  private calculateDistance(point: Point2D, geometry: GeometryEntity): number {
    // Simple bounding box distance για performance
    // Real implementations θα χρησιμοποιούν actual geometry distance
    const bounds = geometry.bounds;
    const centerX = (bounds.minX + bounds.maxX) / 2;
    const centerY = (bounds.minY + bounds.maxY) / 2;

    const dx = point.x - centerX;
    const dy = point.y - centerY;

    return Math.sqrt(dx * dx + dy * dy);
  }

  private estimateMemoryUsage(): number {
    // Rough estimation για monitoring
    const itemSize = 64; // bytes per R-tree item
    const geometrySize = 256; // bytes per geometry object

    return this.indexedCount * (itemSize + geometrySize);
  }

  // ========================================
  // 📈 METRICS & DEBUGGING
  // ========================================

  public getMetrics(): {
    indexedCount: number;
    lastRebuildTime: number;
    memoryUsage: number;
    treeDepth: number;
  } {
    return {
      indexedCount: this.indexedCount,
      lastRebuildTime: this.lastRebuildTime,
      memoryUsage: this.estimateMemoryUsage(),
      treeDepth: this.estimateTreeDepth()
    };
  }

  private estimateTreeDepth(): number {
    // R-tree depth estimation
    if (this.indexedCount === 0) return 0;
    return Math.ceil(Math.log(this.indexedCount) / Math.log(this.options.maxEntries));
  }

  public validateIndex(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    try {
      // Check tree consistency
      const allItems = this.tree.all();

      if (allItems.length !== this.indexedCount) {
        errors.push(`Tree item count mismatch: ${allItems.length} vs ${this.indexedCount}`);
      }

      if (allItems.length !== this.geometries.size) {
        errors.push(`Geometry map size mismatch: ${this.geometries.size} vs ${allItems.length}`);
      }

      // Check bounds validity
      allItems.forEach((item, index) => {
        if (item.minX > item.maxX || item.minY > item.maxY) {
          errors.push(`Invalid bounds at index ${index}: ${JSON.stringify(item)}`);
        }
      });

      return {
        valid: errors.length === 0,
        errors
      };
    } catch (error) {
      return {
        valid: false,
        errors: [`Validation failed: ${error}`]
      };
    }
  }
}