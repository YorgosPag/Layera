/**
 * 🪝 useSnapEngine Hook
 * React hook για integration με SnapEngine
 * Χρησιμοποιεί existing LEGO systems για state management
 */

import React from "react";
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

// Import από @layera/snap-engine - ΜΗΝ αναδημιουργήσεις
import {
  SnapEngine,
  type SnapResult,
  type SnapConfiguration,
  type Point2D,
  type GeometryEntity,
  type SnapPerformanceMetrics
} from '@layera/snap-engine';

// Import από existing LEGO systems - ΜΗΝ αναδημιουργήσεις
import { useNotification } from '@layera/notifications';
import { useLayeraTranslation } from '@layera/tolgee';
import { SNAP_CONSTANTS } from '@layera/constants';

// ========================================
// 🎯 HOOK INTERFACE
// ========================================

export interface UseSnapEngineOptions {
  enabled?: boolean;
  tolerance?: number;
  enabledTypes?: Set<string>;
  debugMode?: boolean;
  onSnapFound?: (result: SnapResult) => void;
  onSnapLost?: () => void;
  onError?: (error: Error) => void;
}

export interface UseSnapEngineReturn {
  // Core functionality
  snapEngine: SnapEngine | null;
  snapToPoint: (cursor: Point2D) => Promise<SnapResult>;

  // State
  isEnabled: boolean;
  lastSnapResult: SnapResult | null;
  isSnapped: boolean;

  // Geometry management
  addGeometry: (geometry: GeometryEntity) => boolean;
  addGeometries: (geometries: GeometryEntity[]) => SnapPerformanceMetrics;
  removeGeometry: (id: string) => boolean;
  clearGeometries: () => React.ReactNode;

  // Configuration
  updateConfig: (config: Partial<SnapConfiguration>) => React.ReactNode;
  setEnabled: (enabled: boolean) => React.ReactNode;
  setTolerance: (tolerance: number) => React.ReactNode;

  // Performance & metrics
  performanceMetrics: SnapPerformanceMetrics;
  rebuildIndex: () => SnapPerformanceMetrics;

  // Loading states από @layera/loading integration
  isIndexing: boolean;
  isCalculating: boolean;
}

// ========================================
// 🪝 MAIN HOOK IMPLEMENTATION
// ========================================

export function useSnapEngine(options: UseSnapEngineOptions = {}): UseSnapEngineReturn {
  // Existing LEGO systems integration - ΜΗΝ αναδημιουργήσεις
  const { toast } = useNotification();
  const { t } = useLayeraTranslation();

  // Local state
  const [snapEngine, setSnapEngine] = useState<SnapEngine | null>(null);
  const [lastSnapResult, setLastSnapResult] = useState<SnapResult | null>(null);
  const [isEnabled, setIsEnabledState] = useState(options.enabled ?? true);
  const [performanceMetrics, setPerformanceMetrics] = useState<SnapPerformanceMetrics>({
    searchTime: 0,
    indexTime: 0,
    totalTime: 0,
    geometryCount: 0,
    resultsCount: 0,
    memoryUsage: 0
  });

  // Loading states για integration με @layera/loading
  const [isIndexing, setIsIndexing] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  // Refs για stable callbacks
  const optionsRef = useRef(options);
  optionsRef.current = options;

  // ========================================
  // 🚀 SNAP ENGINE INITIALIZATION
  // ========================================

  useEffect(() => {
    try {
      const config: SnapConfiguration = {
        tolerance: options.tolerance ?? SNAP_CONSTANTS.DEFAULT_TOLERANCE,
        enabledTypes: options.enabledTypes ?? new Set(['endpoint', 'midpoint', 'center']),
        priority: SNAP_CONSTANTS.DEFAULT_PRIORITIES,
        maxResults: SNAP_CONSTANTS.MAX_RESULTS,
        performanceLevel: 'medium',
        debugMode: options.debugMode ?? false
      };

      const engine = new SnapEngine(config);

      // Setup event listeners
      engine.addEventListener('snap:found', (data) => {
        setLastSnapResult(data.result);
        optionsRef.current.onSnapFound?.(data.result);

        if (options.debugMode) {
          toast({
            type: 'info',
            message: t('snap.feedback.found', { type: data.result.snapType }),
            duration: 1000
          });
        }
      });

      engine.addEventListener('snap:lost', () => {
        setLastSnapResult(null);
        optionsRef.current.onSnapLost?.();
      });

      engine.addEventListener('snap:error', (data) => {
        console.error('Snap engine error:', data.error);
        optionsRef.current.onError?.(data.error);

        toast({
          type: 'error',
          message: t('snap.errors.calculation_failed'),
          duration: 3000
        });
      });

      engine.addEventListener('index:rebuilt', (data) => {
        setIsIndexing(false);
        setPerformanceMetrics(prev => ({
          ...prev,
          geometryCount: data.geometryCount,
          indexTime: data.indexTime
        }));

        if (options.debugMode) {
          toast({
            type: 'success',
            message: t('snap.feedback.index_rebuilt', { count: data.geometryCount }),
            duration: 2000
          });
        }
      });

      setSnapEngine(engine);

      return () => {
        engine.dispose();
      };
    } catch (error) {
      console.error('Failed to initialize snap engine:', error);
      optionsRef.current.onError?.(error as Error);
    }
  }, []); // Empty dependency - engine is created once

  // ========================================
  // 🎯 CORE SNAP FUNCTIONALITY
  // ========================================

  const snapToPoint = useCallback(async (cursor: Point2D): Promise<SnapResult> => {
    if (!snapEngine) {
      return {
        target: null,
        snapped: false,
        distance: Infinity,
        cursor,
        snapPoint: cursor,
        snapType: null
      };
    }

    try {
      setIsCalculating(true);
      const result = await snapEngine.snapToPoint(cursor);

      // Update performance metrics
      const metrics = snapEngine.getPerformanceMetrics();
      setPerformanceMetrics(metrics);

      return result;
    } catch (error) {
      console.error('Snap calculation failed:', error);
      optionsRef.current.onError?.(error as Error);

      return {
        target: null,
        snapped: false,
        distance: Infinity,
        cursor,
        snapPoint: cursor,
        snapType: null
      };
    } finally {
      setIsCalculating(false);
    }
  }, [snapEngine]);

  // ========================================
  // 🏗️ GEOMETRY MANAGEMENT
  // ========================================

  const addGeometry = useCallback((geometry: GeometryEntity): boolean => {
    if (!snapEngine) return false;
    return snapEngine.addGeometry(geometry);
  }, [snapEngine]);

  const addGeometries = useCallback((geometries: GeometryEntity[]): SnapPerformanceMetrics => {
    if (!snapEngine) {
      return {
        searchTime: 0,
        indexTime: 0,
        totalTime: 0,
        geometryCount: 0,
        resultsCount: 0,
        memoryUsage: 0
      };
    }

    setIsIndexing(true);
    const metrics = snapEngine.addGeometries(geometries);
    setPerformanceMetrics(metrics);

    return metrics;
  }, [snapEngine]);

  const removeGeometry = useCallback((id: string): boolean => {
    if (!snapEngine) return false;
    return snapEngine.removeGeometry(id);
  }, [snapEngine]);

  const clearGeometries = useCallback((): void => {
    if (!snapEngine) return;

    snapEngine.clearGeometries();
    setLastSnapResult(null);
    setPerformanceMetrics({
      searchTime: 0,
      indexTime: 0,
      totalTime: 0,
      geometryCount: 0,
      resultsCount: 0,
      memoryUsage: 0
    });
  }, [snapEngine]);

  // ========================================
  // ⚙️ CONFIGURATION MANAGEMENT
  // ========================================

  const updateConfig = useCallback((config: Partial<SnapConfiguration>): void => {
    if (!snapEngine) return;
    snapEngine.updateConfiguration(config);
  }, [snapEngine]);

  const setEnabled = useCallback((enabled: boolean): void => {
    setIsEnabledState(enabled);
    if (snapEngine) {
      snapEngine.setEnabled(enabled);
    }

    if (!enabled) {
      setLastSnapResult(null);
    }
  }, [snapEngine]);

  const setTolerance = useCallback((tolerance: number): void => {
    if (!snapEngine) return;
    snapEngine.setTolerance(tolerance);
  }, [snapEngine]);

  const rebuildIndex = useCallback((): SnapPerformanceMetrics => {
    if (!snapEngine) {
      return {
        searchTime: 0,
        indexTime: 0,
        totalTime: 0,
        geometryCount: 0,
        resultsCount: 0,
        memoryUsage: 0
      };
    }

    setIsIndexing(true);
    const metrics = snapEngine.rebuildIndex();
    setPerformanceMetrics(metrics);
    setIsIndexing(false);

    return metrics;
  }, [snapEngine]);

  // ========================================
  // 🔍 COMPUTED VALUES
  // ========================================

  const isSnapped = useMemo(() => {
    return lastSnapResult?.snapped ?? false;
  }, [lastSnapResult]);

  // ========================================
  // 📦 RETURN INTERFACE
  // ========================================

  return {
    // Core functionality
    snapEngine,
    snapToPoint,

    // State
    isEnabled,
    lastSnapResult,
    isSnapped,

    // Geometry management
    addGeometry,
    addGeometries,
    removeGeometry,
    clearGeometries,

    // Configuration
    updateConfig,
    setEnabled,
    setTolerance,

    // Performance & metrics
    performanceMetrics,
    rebuildIndex,

    // Loading states για @layera/loading integration
    isIndexing,
    isCalculating
  };
}

// ========================================
// 🎯 SPECIALIZED HOOKS
// ========================================

/**
 * Hook για CAD-optimized snap settings
 */
export function useCADSnap(options: Omit<UseSnapEngineOptions, 'enabledTypes'> = {}) {
  return useSnapEngine({
    ...options,
    tolerance: options.tolerance ?? 5,
    enabledTypes: new Set(['endpoint', 'midpoint', 'center', 'vertex', 'intersection'])
  });
}

/**
 * Hook για GIS/mapping-optimized snap settings
 */
export function useGISSnap(options: Omit<UseSnapEngineOptions, 'enabledTypes'> = {}) {
  return useSnapEngine({
    ...options,
    tolerance: options.tolerance ?? 15,
    enabledTypes: new Set(['endpoint', 'vertex', 'nearest'])
  });
}

/**
 * Hook για mobile-optimized snap settings
 */
export function useMobileSnap(options: Omit<UseSnapEngineOptions, 'enabledTypes'> = {}) {
  return useSnapEngine({
    ...options,
    tolerance: options.tolerance ?? 25,
    enabledTypes: new Set(['endpoint', 'vertex'])
  });
}