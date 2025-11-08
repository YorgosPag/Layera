/**
 * 🚀 SNAP ENGINE MAIN CLASS
 * Κύρια κλάση που συνδυάζει spatial indexing με snap calculations
 * Enterprise-grade snapping system για Layera LEGO architecture
 */

import React from "react";
import { RTreeSpatialIndex } from './spatial/RTreeIndex';
import { SnapCalculator } from './algorithms/SnapCalculator';
import { GeometryUtils } from './utils/GeometryUtils';

// Import types
import type {
  Point2D,
  GeometryEntity,
  SnapConfiguration,
  SnapResult,
  SnapType,
  SnapEngineEvents,
  SnapPerformanceMetrics,
  CoordinateSystemContext,
  OSMGeometry,
  CADGeometry
} from './types';

// ΟΛΟΚΛΗΡΩΜΕΝΗ ENTERPRISE ΛΥΣΗ - Self-contained implementation
// Θα συνδεθεί με τα άλλα LEGO systems όταν είναι functional

// Local constants από το @layera/constants/src/snap.ts (πλήρης implementation)
const SNAP_CONSTANTS = {
  DEFAULT_TOLERANCE: 10,
  PERFORMANCE: {
    MAX_RESULTS: 50, // Maximum snap candidates - performance constant
    MIDPOINT_PRIORITY: 80 // Midpoint snap priority - geometric constant
  },
  DEFAULT_PRIORITIES: {
    endpoint: 100, // Highest priority for endpoint snapping - geometric constant
    midpoint: SNAP_CONSTANTS.PERFORMANCE.MIDPOINT_PRIORITY,
    center: 90,
    vertex: 85,
    intersection: 95,
    perpendicular: 70,
    tangent: 65,
    nearest: 60,
    grid: 50, // Grid snap priority - geometric constant
    edge: 75 // Edge snap priority - geometric constant
  },
  SPATIAL_INDEX: {
    MAX_ENTRIES: 16,
    MIN_ENTRIES: 4,
    AUTO_REBALANCE_THRESHOLD: 1000
  },
  PERFORMANCE: {
    HIGH_GEOMETRY_COUNT: 10000,
    MEDIUM_GEOMETRY_COUNT: 5000,
    LOW_GEOMETRY_COUNT: 1000,
    MAX_SEARCH_TIME_MS: 16, // ~60fps
    INDEX_REBUILD_WARNING_MS: 100
  }
} as const;

// Local types που θα γίνουν import όταν τα άλλα packages είναι ready
interface CADEntity {
  id: string;
  type: string;
  data: unknown;
  layer?: string;
}

interface CoordinateTransformer {
  transform: (point: Point2D) => Point2D;
  inverse: (point: Point2D) => Point2D;
}

// ========================================
// 🚀 SNAP ENGINE MAIN CLASS
// ========================================

export class SnapEngine {
  private spatialIndex: RTreeSpatialIndex;
  private snapCalculator: SnapCalculator;
  private configuration: SnapConfiguration;
  private coordinateContext?: CoordinateSystemContext;
  private eventListeners: Map<keyof SnapEngineEvents, Set<Function>>;
  private isEnabled: boolean;
  private performanceMetrics: SnapPerformanceMetrics;

  constructor(config?: Partial<SnapConfiguration>) {
    // Initialize με default configuration από @layera/constants
    this.configuration = {
      tolerance: config?.tolerance ?? SNAP_CONSTANTS.DEFAULT_TOLERANCE,
      enabledTypes: config?.enabledTypes ?? new Set<SnapType>([
        'endpoint', 'midpoint', 'center', 'vertex', 'nearest'
      ]),
      priority: config?.priority ?? SNAP_CONSTANTS.DEFAULT_PRIORITIES,
      maxResults: config?.maxResults ?? SNAP_CONSTANTS.PERFORMANCE.MAX_RESULTS,
      performanceLevel: config?.performanceLevel ?? 'medium',
      debugMode: config?.debugMode ?? false
    };

    // Initialize components
    this.spatialIndex = new RTreeSpatialIndex({
      maxEntries: SNAP_CONSTANTS.SPATIAL_INDEX.MAX_ENTRIES,
      autoRebalance: true
    });

    this.snapCalculator = new SnapCalculator(this.configuration);
    this.eventListeners = new Map();
    this.isEnabled = true;

    // Initialize performance metrics
    this.performanceMetrics = {
      searchTime: 0,
      indexTime: 0,
      totalTime: 0,
      geometryCount: 0,
      resultsCount: 0,
      memoryUsage: 0
    };

    this.initializeEventListeners();
  }

  // ========================================
  // 🎯 MAIN SNAP FUNCTIONALITY
  // ========================================

  public async snapToPoint(cursor: Point2D): Promise<SnapResult> {
    if (!this.isEnabled) {
      return this.createNoSnapResult(cursor);
    }

    const startTime = performance.now();

    try {
      this.emitEvent('snap:start', { cursor });

      // Transform cursor if coordinate system is set
      const transformedCursor = this.coordinateContext?.transformer
        ? this.coordinateContext.transformer(cursor)
        : cursor;

      // Find candidate geometries από spatial index
      const tolerance = this.configuration.tolerance;
      const candidates = this.spatialIndex.searchNearPoint(
        transformedCursor,
        tolerance,
        this.configuration.maxResults
      );

      // Calculate snap result
      const geometries = candidates.map(c => c.geometry);
      const snapResult = this.snapCalculator.calculateSnap(transformedCursor, geometries);

      // Update performance metrics
      const totalTime = performance.now() - startTime;
      this.updatePerformanceMetrics({
        searchTime: totalTime * 0.7, // Estimate
        indexTime: 0,
        totalTime,
        geometryCount: candidates.length,
        resultsCount: snapResult.snapped ? 1 : 0,
        memoryUsage: this.spatialIndex.getMetrics().memoryUsage
      });

      // Transform result back if needed
      const finalResult = this.transformSnapResult(snapResult, cursor);

      // Emit events
      if (finalResult.snapped) {
        this.emitEvent('snap:found', { result: finalResult });
      } else {
        this.emitEvent('snap:lost', { lastResult: null });
      }

      return finalResult;

    } catch (error) {
      console.error('Snap calculation failed:', error);
      this.emitEvent('snap:error', { error: error as Error, context: 'snapToPoint' });
      return this.createNoSnapResult(cursor);
    }
  }

  // ========================================
  // 🏗️ GEOMETRY MANAGEMENT
  // ========================================

  public addGeometry(geometry: GeometryEntity): boolean {
    try {
      // Validate geometry πριν την προσθήκη
      const validation = GeometryUtils.validateGeometry(geometry);
      if (!validation.valid) {
        console.warn(`Invalid geometry ${geometry.id}:`, validation.errors);
        return false;
      }

      // Ensure bounds are calculated
      if (!geometry.bounds) {
        geometry.bounds = GeometryUtils.calculateBounds(geometry);
      }

      // Add to spatial index
      this.spatialIndex.insertGeometry(geometry);

      if (this.configuration.debugMode) {
      }

      return true;
    } catch (error) {
      console.error(`Failed to add geometry ${geometry.id}:`, error);
      return false;
    }
  }

  public addGeometries(geometries: GeometryEntity[]): SnapPerformanceMetrics {
    const startTime = performance.now();

    try {
      // Validate όλα τα geometries
      const validGeometries = geometries.filter(geometry => {
        const validation = GeometryUtils.validateGeometry(geometry);
        if (!validation.valid && this.configuration.debugMode) {
          console.warn(`Skipping invalid geometry ${geometry.id}:`, validation.errors);
        }
        return validation.valid;
      });

      // Ensure bounds are calculated
      validGeometries.forEach(geometry => {
        if (!geometry.bounds) {
          geometry.bounds = GeometryUtils.calculateBounds(geometry);
        }
      });

      // Batch insert για performance
      const indexMetrics = this.spatialIndex.insertBatch(validGeometries);

      this.emitEvent('index:rebuilt', {
        geometryCount: validGeometries.length,
        indexTime: indexMetrics.indexTime
      });

      return indexMetrics;

    } catch (error) {
      console.error('Batch geometry addition failed:', error);
      this.emitEvent('snap:error', { error: error as Error, context: 'addGeometries' });

      return {
        searchTime: 0,
        indexTime: performance.now() - startTime,
        totalTime: performance.now() - startTime,
        geometryCount: 0,
        resultsCount: 0,
        memoryUsage: 0
      };
    }
  }

  public removeGeometry(geometryId: string): boolean {
    return this.spatialIndex.removeGeometry(geometryId);
  }

  public clearGeometries(): void {
    this.spatialIndex.clear();
    this.performanceMetrics.geometryCount = 0;
  }

  // ========================================
  // 🌍 INTEGRATION με EXISTING LEGO SYSTEMS
  // ========================================

  public addCADGeometries(cadEntities: CADEntity[]): SnapPerformanceMetrics {
    // Integration με @layera/cad-processing
    const geometries = cadEntities
      .map(entity => GeometryUtils.convertCADToGeometry(entity))
      .filter(Boolean) as GeometryEntity[];

    return this.addGeometries(geometries);
  }

  public addOSMBuildings(osmData: Array<{
    id: string;
    type: 'node' | 'way' | 'relation';
    lat?: number;
    lon?: number;
    nodes?: Array<{ lat: number; lon: number }>;
    tags: Record<string, string>;
  }>): SnapPerformanceMetrics {
    // Convert OSM data to geometries
    const geometries = osmData
      .map(data => GeometryUtils.convertOSMToGeometry(data))
      .filter(Boolean) as OSMGeometry[];

    return this.addGeometries(geometries);
  }

  public setCoordinateSystemContext(
    context: CoordinateSystemContext,
    transformer?: CoordinateTransformer
  ): void {
    const newContext: CoordinateSystemContext = {
      ...context
    };

    if (transformer?.transform) {
      newContext.transformer = transformer.transform;
    } else if (context.transformer) {
      newContext.transformer = context.transformer;
    }

    this.coordinateContext = newContext;
  }

  // ========================================
  // ⚙️ CONFIGURATION MANAGEMENT
  // ========================================

  public updateConfiguration(config: Partial<SnapConfiguration>): void {
    this.configuration = { ...this.configuration, ...config };
    this.snapCalculator.updateConfiguration(this.configuration);
  }

  public setSnapTypeEnabled(type: SnapType, enabled: boolean): void {
    if (enabled) {
      this.configuration.enabledTypes.add(type);
    } else {
      this.configuration.enabledTypes.delete(type);
    }
    this.snapCalculator.setSnapTypeEnabled(type, enabled);
  }

  public setTolerance(tolerance: number): void {
    this.configuration.tolerance = Math.max(1, Math.min(100, tolerance));
    this.snapCalculator.updateConfiguration({ tolerance: this.configuration.tolerance });
  }

  public setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }

  // ========================================
  // 📊 PERFORMANCE & METRICS
  // ========================================

  public getPerformanceMetrics(): SnapPerformanceMetrics & {
    indexMetrics: ReturnType<RTreeSpatialIndex['getMetrics']>;
  } {
    return {
      ...this.performanceMetrics,
      indexMetrics: this.spatialIndex.getMetrics()
    };
  }

  public validateIndex(): { valid: boolean; errors: string[] } {
    return this.spatialIndex.validateIndex();
  }

  public rebuildIndex(): SnapPerformanceMetrics {
    return this.spatialIndex.rebuild();
  }

  // ========================================
  // 🎧 EVENT SYSTEM
  // ========================================

  public addEventListener<K extends keyof SnapEngineEvents>(
    event: K,
    listener: (data: SnapEngineEvents[K]) => React.ReactNode
  ): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, new Set());
    }
    this.eventListeners.get(event)!.add(listener);
  }

  public removeEventListener<K extends keyof SnapEngineEvents>(
    event: K,
    listener: (data: SnapEngineEvents[K]) => React.ReactNode
  ): void {
    this.eventListeners.get(event)?.delete(listener);
  }

  private emitEvent<K extends keyof SnapEngineEvents>(
    event: K,
    data: SnapEngineEvents[K]
  ): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach(listener => {
        try {
          listener(data);
        } catch (error) {
          console.error(`Event listener error for ${event}:`, error);
        }
      });
    }
  }

  // ========================================
  // 🛠️ PRIVATE UTILITIES
  // ========================================

  private createNoSnapResult(cursor: Point2D): SnapResult {
    return {
      target: null,
      snapped: false,
      distance: Infinity,
      cursor,
      snapPoint: cursor,
      snapType: null
    };
  }

  private transformSnapResult(result: SnapResult, originalCursor: Point2D): SnapResult {
    // Transform result back to original coordinate system if needed
    if (this.coordinateContext?.transformer && result.snapped) {
      // Note: In real implementation, we'd need inverse transformer
      // For now, return as-is
      return result;
    }

    return {
      ...result,
      cursor: originalCursor
    };
  }

  private updatePerformanceMetrics(metrics: Partial<SnapPerformanceMetrics>): void {
    this.performanceMetrics = { ...this.performanceMetrics, ...metrics };
  }

  private initializeEventListeners(): void {
    // Setup internal event listeners for debugging
    if (this.configuration.debugMode) {
      this.addEventListener('snap:found', (data) => {
      });

      this.addEventListener('snap:error', (data) => {
        console.error('Snap engine error:', data.error.message);
      });
    }
  }

  // ========================================
  // 🧹 CLEANUP
  // ========================================

  public dispose(): void {
    this.clearGeometries();
    this.eventListeners.clear();
    this.isEnabled = false;
  }
}