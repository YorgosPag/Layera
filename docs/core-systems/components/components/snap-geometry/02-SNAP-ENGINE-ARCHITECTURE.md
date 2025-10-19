# 🧠 SNAP-ENGINE CORE ALGORITHMS ARCHITECTURE

*Τελευταία ενημέρωση: 19 Οκτωβρίου 2025*
*Δημιουργός: Γιώργος Παγώνης - Επιβλέπων Αρχιτέκτονας*

---

## 🎯 **EXECUTIVE SUMMARY**

### **🌟 Vision Statement:**
> **"Το @layera/snap-engine είναι ο υπολογιστικός εγκέφαλος του snap-to-geometry system - παρέχει AutoCAD-grade spatial algorithms με web-optimized performance για real-time γεωμετρικό snapping"**

### **🏗️ Core Architecture Principles:**
1. **⚡ Performance First**: R-tree spatial indexing με <16ms response time
2. **🎯 Precision**: Enterprise-grade geometric calculations με configurable tolerance
3. **🔧 Modularity**: Plugin-based snap algorithm system
4. **🌐 Web-Optimized**: Browser-compatible με Web Workers support
5. **📊 Observable**: Comprehensive performance monitoring και debugging

---

## 🧩 **EXISTING LAYERA LEGO ECOSYSTEM**

### **⚠️ CRITICAL: Existing Systems Integration**

```typescript
// 🚨 ΥΠΟΧΡΕΩΤΙΚΗ ΑΝΑΦΟΡΑ: Existing LEGO Systems που ΠΡΕΠΕΙ να χρησιμοποιηθούν
// ΜΗΝ ΔΗΜΙΟΥΡΓΗΣΕΙΣ νέα functionality που υπάρχει ήδη

interface MandatoryLayeraLEGOIntegration {
  // ✅ ΧΡΗΣΗ ΥΠΑΡΧΟΝΤΩΝ PACKAGES - ΜΗ ΑΝΑΔΗΜΙΟΥΡΓΗΣΗ
  existingInfrastructure: {
    '@layera/error-boundary': {
      purpose: 'Error handling για snap engine crashes',
      usage: 'Wrap SnapEngine με ErrorBoundary component',
      api: 'ErrorBoundary, useErrorBoundary hook',
      avoidReimplementing: 'Custom error handling, try-catch wrappers'
    };

    '@layera/constants': {
      purpose: 'Shared constants για snap configuration',
      usage: 'Import DEFAULT_SNAP_TOLERANCE, MAX_GEOMETRIES, etc.',
      api: 'SNAP_CONSTANTS, PERFORMANCE_LIMITS, COORDINATE_SYSTEMS',
      avoidReimplementing: 'Magic numbers, configuration defaults'
    };

    '@layera/file-transformation': {
      purpose: 'Coordinate system transformations',
      usage: 'CoordinateTransformer για CRS-aware snap calculations',
      api: 'transformCoordinates(), getSupportedCRS(), validateCRS()',
      avoidReimplementing: 'Projection math, coordinate conversion'
    };

    '@layera/cad-processing': {
      purpose: 'CAD geometry parsing και entity extraction',
      usage: 'CADGeometry types για snap target recognition',
      api: 'CADEntity, CADGeometry, LayeraDXFParser',
      avoidReimplementing: 'DXF parsing, CAD entity types, geometry extraction'
    };
  };

  // 🎯 SNAP ENGINE DEPENDENCIES MATRIX
  snapEngineDependencies: {
    core: ['@layera/constants', '@layera/error-boundary'],
    coordinateSystem: ['@layera/file-transformation'],
    cadSupport: ['@layera/cad-processing'],

    // Αποφυγή διπλότυπων implementations
    doNotReimplement: [
      'Error handling mechanisms',
      'Configuration constants',
      'Coordinate transformations',
      'CAD file parsing',
      'Geometric entity types'
    ];
  };
}
```

### **🔧 Integration Strategy Examples:**

```typescript
// ✅ ΣΩΣΤΗ ΧΡΗΣΗ - Leverage existing systems
import { SNAP_CONSTANTS } from '@layera/constants';
import { ErrorBoundary } from '@layera/error-boundary';
import { CoordinateTransformer } from '@layera/file-transformation';
import { CADGeometry, CADEntity } from '@layera/cad-processing';

// ❌ ΛΑΘΟΣ - Reimplementing existing functionality
// const SNAP_TOLERANCE = 10; // ΜΗ το κάνεις - υπάρχει στο @layera/constants
// class CustomErrorHandler {} // ΜΗ το κάνεις - υπάρχει το @layera/error-boundary
```

---

## 🧩 **PACKAGE ARCHITECTURE OVERVIEW**

### **📦 Core Module Structure:**

```typescript
// @layera/snap-engine Architecture
interface SnapEngineArchitecture {
  // 🏗️ Core Engine - Primary snap processing system
  core: {
    spatialIndex: SpatialIndexManager;      // R-tree + secondary indexes
    snapCalculator: SnapCalculator;         // Main calculation engine
    geometryAnalyzer: GeometryAnalyzer;     // Geometry inspection
    performanceMonitor: PerformanceMonitor; // Real-time performance tracking
  };

  // 🎯 Snap Algorithms - Pluggable snap type implementations
  algorithms: {
    endpointSnap: EndpointSnapAlgorithm;
    midpointSnap: MidpointSnapAlgorithm;
    intersectionSnap: IntersectionSnapAlgorithm;
    perpendicularSnap: PerpendicularSnapAlgorithm;
    tangentSnap: TangentSnapAlgorithm;
    nearestSnap: NearestSnapAlgorithm;
    gridSnap: GridSnapAlgorithm;
    osmBuildingSnap: OSMBuildingSnapAlgorithm;
  };

  // 📐 Geometry Processing - Coordinate and shape utilities
  geometry: {
    coordinateTransformer: CoordinateTransformer;
    geometryValidator: GeometryValidator;
    boundingBoxCalculator: BoundingBoxCalculator;
    distanceCalculator: DistanceCalculator;
  };

  // ⚙️ Configuration - Runtime configuration management
  config: {
    snapSettings: SnapConfigurationManager;
    performanceSettings: PerformanceConfigManager;
    algorithmRegistry: AlgorithmRegistry;
  };
}
```

---

## 🗂️ **SPATIAL INDEXING ARCHITECTURE**

### **⚡ Primary R-tree Implementation:**

```typescript
interface SpatialIndexManager {
  // Primary spatial index - RBush R-tree optimized για browser
  primaryIndex: {
    implementation: 'RBush';               // Browser-optimized R-tree
    configuration: {
      maxEntries: 16;                      // Balanced node capacity
      minEntries: 4;                       // Minimum για node splits
      splitAlgorithm: 'linear';            // Fast split strategy
      updateStrategy: 'bulk-loading';      // Optimized bulk inserts
    };

    // Core operations
    operations: {
      insert(geometry: IndexedGeometry): void;
      remove(geometry: IndexedGeometry): boolean;
      search(bbox: BoundingBox): IndexedGeometry[];
      knn(point: Point2D, k: number): KNNResult[];
      clear(): void;
      bulk(geometries: IndexedGeometry[]): void;
    };
  };

  // Secondary specialized indexes
  secondaryIndexes: {
    // KD-Tree για nearest neighbor queries
    pointIndex: {
      type: 'KDTree';
      purpose: 'Fast nearest-point lookups';
      implementation: KDTreeIndex;
      maxPoints: 10000;                    // Memory management
    };

    // Hash index για type-based filtering
    typeIndex: {
      type: 'HashIndex';
      purpose: 'Geometry type filtering';
      implementation: TypeHashIndex;
      buckets: GeometryTypeBuckets;
    };

    // Layer-based partitioning
    layerIndex: {
      type: 'PartitionedIndex';
      purpose: 'Layer visibility filtering';
      implementation: LayerPartitionIndex;
      partitions: LayerPartitions;
    };
  };
}
```

### **🎯 Indexing Performance Optimization:**

```typescript
interface IndexOptimizationStrategy {
  // Bulk loading για large datasets
  bulkLoading: {
    enabled: true;
    batchSize: 1000;                       // Geometries per batch
    sortingStrategy: 'hilbert-curve';      // Space-filling curve για optimal ordering
    rebuildThreshold: 0.3;                 // Rebuild when 30% fragmented
  };

  // Incremental updates για real-time modifications
  incrementalUpdates: {
    enabled: true;
    bufferSize: 100;                       // Updates before batch processing
    deferredRebuild: true;                 // Rebuild during idle time
    priorityQueue: UpdatePriorityQueue;    // High-priority updates first
  };

  // Memory management
  memoryManagement: {
    maxIndexSize: 50 * 1024 * 1024;       // 50MB memory limit
    garbageCollection: 'automatic';        // Auto GC on memory pressure
    compressionThreshold: 0.7;             // Compress when 70% full
    evictionPolicy: 'LRU';                 // Least Recently Used eviction
  };

  // Cache management
  cacheStrategy: {
    queryCache: LRUCache<BoundingBox, IndexedGeometry[]>;
    resultCache: LRUCache<SnapQuery, SnapResult>;
    geometryCache: WeakMap<Geometry, ProcessedGeometry>;
    ttl: 30000;                            // 30 second cache TTL
  };
}
```

---

## 🧮 **SNAP CALCULATION ENGINE**

### **⚙️ Core Calculation Pipeline:**

```typescript
interface SnapCalculator {
  // Main calculation entry point
  async calculateSnap(request: SnapRequest): Promise<SnapResult> {
    // 🔍 Phase 1: Spatial Query
    const candidates = await this.findSnapCandidates(request);

    // 🎯 Phase 2: Algorithm Execution
    const snapPoints = await this.executeSnapAlgorithms(candidates, request);

    // ⚖️ Phase 3: Scoring & Selection
    const bestSnap = await this.selectBestSnap(snapPoints, request);

    // 📊 Phase 4: Result Preparation
    return this.prepareSnapResult(bestSnap, request);
  }

  // Spatial candidate search
  private async findSnapCandidates(request: SnapRequest): Promise<GeometryCandidate[]> {
    const searchRadius = this.calculateSearchRadius(request);
    const searchBounds = this.calculateSearchBounds(request.cursorPosition, searchRadius);

    // Primary spatial query
    const spatialCandidates = this.spatialIndex.search(searchBounds);

    // Apply filters
    const filteredCandidates = this.applyFilters(spatialCandidates, request.filters);

    // Sort by distance για priority processing
    return this.sortByDistance(filteredCandidates, request.cursorPosition);
  }

  // Algorithm execution orchestration
  private async executeSnapAlgorithms(
    candidates: GeometryCandidate[],
    request: SnapRequest
  ): Promise<SnapPoint[]> {
    const enabledAlgorithms = this.getEnabledAlgorithms(request.snapTypes);
    const snapPoints: SnapPoint[] = [];

    // Execute algorithms in parallel για performance
    const algorithmPromises = enabledAlgorithms.map(async algorithm => {
      try {
        const points = await algorithm.findSnapPoints(candidates, request);
        return points.filter(point => this.validateSnapPoint(point, request));
      } catch (error) {
        this.performanceMonitor.recordError(algorithm.type, error);
        return [];
      }
    });

    const results = await Promise.all(algorithmPromises);
    return results.flat();
  }

  // Best snap selection με scoring system
  private async selectBestSnap(snapPoints: SnapPoint[], request: SnapRequest): Promise<SnapPoint | null> {
    if (snapPoints.length === 0) return null;

    // Calculate scores for each snap point
    const scoredSnaps = snapPoints.map(snap => ({
      snap,
      score: this.calculateSnapScore(snap, request)
    }));

    // Sort by score (higher is better)
    scoredSnaps.sort((a, b) => b.score - a.score);

    // Apply confidence threshold
    const bestSnap = scoredSnaps[0];
    if (bestSnap.score < request.minimumConfidence) {
      return null;
    }

    return bestSnap.snap;
  }
}
```

### **🎯 Snap Scoring Algorithm:**

```typescript
interface SnapScoringSystem {
  calculateSnapScore(snap: SnapPoint, request: SnapRequest): number {
    const weights = this.getScoreWeights(request);

    // Distance score (closer = better)
    const distanceScore = this.calculateDistanceScore(snap, request.cursorPosition);

    // Type priority score (preferred types = better)
    const typeScore = this.calculateTypeScore(snap.type, request.snapTypes);

    // Geometry confidence score (cleaner geometry = better)
    const confidenceScore = this.calculateConfidenceScore(snap.geometry);

    // User preference score (previous selections = better)
    const preferenceScore = this.calculatePreferenceScore(snap, request.userHistory);

    // Context score (relevant geometry = better)
    const contextScore = this.calculateContextScore(snap, request.context);

    return (
      distanceScore * weights.distance +
      typeScore * weights.type +
      confidenceScore * weights.confidence +
      preferenceScore * weights.preference +
      contextScore * weights.context
    );
  }

  private calculateDistanceScore(snap: SnapPoint, cursorPosition: Point2D): number {
    const distance = this.distanceCalculator.calculate(snap.point, cursorPosition);
    const maxDistance = this.config.maxSnapDistance;

    // Exponential decay για natural feel
    return Math.exp(-distance / (maxDistance * 0.3));
  }

  private calculateTypeScore(snapType: SnapType, preferredTypes: SnapType[]): number {
    const typeIndex = preferredTypes.indexOf(snapType);
    if (typeIndex === -1) return 0.1; // Not preferred but allowed

    // Higher score for higher priority types
    return 1.0 - (typeIndex * 0.1);
  }
}
```

---

## 📐 **SNAP ALGORITHM IMPLEMENTATIONS**

### **🎯 Endpoint Snap Algorithm:**

```typescript
class EndpointSnapAlgorithm implements SnapAlgorithm {
  readonly type = SnapType.ENDPOINT;

  async findSnapPoints(candidates: GeometryCandidate[], request: SnapRequest): Promise<SnapPoint[]> {
    const snapPoints: SnapPoint[] = [];
    const tolerance = request.tolerance || this.config.defaultTolerance;

    for (const candidate of candidates) {
      const endpoints = this.extractEndpoints(candidate.geometry);

      for (const endpoint of endpoints) {
        const distance = this.distanceCalculator.calculate(endpoint, request.cursorPosition);

        if (distance <= tolerance) {
          snapPoints.push({
            point: endpoint,
            type: SnapType.ENDPOINT,
            geometry: candidate.geometry,
            confidence: this.calculateEndpointConfidence(endpoint, candidate),
            metadata: {
              entityId: candidate.id,
              layerId: candidate.layerId,
              segmentIndex: endpoint.segmentIndex
            }
          });
        }
      }
    }

    return snapPoints;
  }

  private extractEndpoints(geometry: Geometry): EndPoint[] {
    switch (geometry.type) {
      case 'LineString':
        return this.extractLineStringEndpoints(geometry as LineString);
      case 'Polygon':
        return this.extractPolygonEndpoints(geometry as Polygon);
      case 'MultiLineString':
        return this.extractMultiLineStringEndpoints(geometry as MultiLineString);
      default:
        return [];
    }
  }

  private extractLineStringEndpoints(line: LineString): EndPoint[] {
    const coordinates = line.coordinates;
    return [
      { point: coordinates[0], segmentIndex: 0 },
      { point: coordinates[coordinates.length - 1], segmentIndex: coordinates.length - 1 }
    ];
  }
}
```

### **📏 Midpoint Snap Algorithm:**

```typescript
class MidpointSnapAlgorithm implements SnapAlgorithm {
  readonly type = SnapType.MIDPOINT;

  async findSnapPoints(candidates: GeometryCandidate[], request: SnapRequest): Promise<SnapPoint[]> {
    const snapPoints: SnapPoint[] = [];
    const tolerance = request.tolerance || this.config.defaultTolerance;

    for (const candidate of candidates) {
      const segments = this.extractSegments(candidate.geometry);

      for (const segment of segments) {
        const midpoint = this.calculateMidpoint(segment.start, segment.end);
        const distance = this.distanceCalculator.calculate(midpoint, request.cursorPosition);

        if (distance <= tolerance) {
          snapPoints.push({
            point: midpoint,
            type: SnapType.MIDPOINT,
            geometry: candidate.geometry,
            confidence: this.calculateMidpointConfidence(segment, midpoint),
            metadata: {
              entityId: candidate.id,
              layerId: candidate.layerId,
              segmentIndex: segment.index,
              segmentLength: segment.length
            }
          });
        }
      }
    }

    return snapPoints;
  }

  private calculateMidpoint(start: Point2D, end: Point2D): Point2D {
    return {
      x: (start.x + end.x) / 2,
      y: (start.y + end.y) / 2
    };
  }
}
```

### **⚔️ Intersection Snap Algorithm:**

```typescript
class IntersectionSnapAlgorithm implements SnapAlgorithm {
  readonly type = SnapType.INTERSECTION;

  async findSnapPoints(candidates: GeometryCandidate[], request: SnapRequest): Promise<SnapPoint[]> {
    const snapPoints: SnapPoint[] = [];
    const tolerance = request.tolerance || this.config.defaultTolerance;

    // Find intersections between all candidate pairs
    for (let i = 0; i < candidates.length; i++) {
      for (let j = i + 1; j < candidates.length; j++) {
        const intersections = this.calculateIntersections(
          candidates[i].geometry,
          candidates[j].geometry
        );

        for (const intersection of intersections) {
          const distance = this.distanceCalculator.calculate(intersection.point, request.cursorPosition);

          if (distance <= tolerance) {
            snapPoints.push({
              point: intersection.point,
              type: SnapType.INTERSECTION,
              geometry: candidates[i].geometry, // Primary geometry
              confidence: this.calculateIntersectionConfidence(intersection),
              metadata: {
                primaryEntityId: candidates[i].id,
                secondaryEntityId: candidates[j].id,
                intersectionType: intersection.type,
                angle: intersection.angle
              }
            });
          }
        }
      }
    }

    return snapPoints;
  }

  private calculateIntersections(geom1: Geometry, geom2: Geometry): IntersectionPoint[] {
    // Advanced geometric intersection calculation
    // Handles line-line, line-polygon, polygon-polygon intersections
    return this.geometryIntersector.findIntersections(geom1, geom2);
  }
}
```

### **🏗️ OSM Building Snap Algorithm:**

```typescript
class OSMBuildingSnapAlgorithm implements SnapAlgorithm {
  readonly type = SnapType.BUILDING_CORNER;

  async findSnapPoints(candidates: GeometryCandidate[], request: SnapRequest): Promise<SnapPoint[]> {
    const snapPoints: SnapPoint[] = [];
    const tolerance = request.tolerance || this.config.defaultTolerance;

    // Filter to OSM building geometries only
    const buildingCandidates = candidates.filter(c =>
      c.metadata?.source === 'osm' &&
      c.metadata?.featureType === 'building'
    );

    for (const building of buildingCandidates) {
      // Extract building corners με enhanced precision
      const corners = this.extractBuildingCorners(building.geometry);

      for (const corner of corners) {
        const distance = this.distanceCalculator.calculate(corner.point, request.cursorPosition);

        if (distance <= tolerance) {
          snapPoints.push({
            point: corner.point,
            type: corner.isRightAngle ? SnapType.BUILDING_CORNER : SnapType.BUILDING_EDGE,
            geometry: building.geometry,
            confidence: this.calculateBuildingSnapConfidence(corner, building),
            metadata: {
              entityId: building.id,
              osmId: building.metadata?.osmId,
              buildingType: building.metadata?.buildingType,
              cornerType: corner.type,
              adjacentAngles: corner.adjacentAngles
            }
          });
        }
      }
    }

    return snapPoints;
  }

  private extractBuildingCorners(geometry: Geometry): BuildingCorner[] {
    // Advanced building corner detection
    // Identifies right angles, wall intersections, και architectural features
    return this.buildingAnalyzer.findCorners(geometry);
  }
}
```

---

## 📊 **PERFORMANCE MONITORING SYSTEM**

### **⚡ Real-time Performance Tracking:**

```typescript
interface PerformanceMonitor {
  // Real-time metrics collection
  metrics: {
    snapCalculationTime: MovingAverage;
    spatialQueryTime: MovingAverage;
    indexUpdateTime: MovingAverage;
    memoryUsage: MemoryTracker;
    algorithmPerformance: Map<SnapType, AlgorithmMetrics>;
  };

  // Performance thresholds
  thresholds: {
    maxSnapTime: 16;                       // ms - 60fps target
    maxMemoryUsage: 100 * 1024 * 1024;    // 100MB
    maxIndexSize: 50000;                   // geometries
    warningThreshold: 0.8;                 // 80% of limits
  };

  // Monitoring operations
  startPerformanceTrace(operation: string): PerformanceTrace;
  recordMetric(metric: string, value: number): void;
  checkPerformanceHealth(): PerformanceHealth;
  generatePerformanceReport(): PerformanceReport;

  // Performance optimization triggers
  onPerformanceWarning(callback: (warning: PerformanceWarning) => void): void;
  onPerformanceCritical(callback: (critical: PerformanceCritical) => void): void;
}

interface PerformanceOptimizationActions {
  // Automatic optimization triggers
  automaticOptimizations: {
    indexDefragmentation: {
      trigger: 'fragmentationRatio > 0.3';
      action: 'rebuildSpatialIndex';
      frequency: 'oncePerSession';
    };

    cacheEviction: {
      trigger: 'memoryUsage > 80%';
      action: 'evictLRUCacheEntries';
      frequency: 'asNeeded';
    };

    algorithmDisabling: {
      trigger: 'algorithmTime > 10ms';
      action: 'temporarilyDisableSlowAlgorithm';
      frequency: 'adaptive';
    };
  };

  // Manual optimization tools
  manualOptimizations: {
    fullIndexRebuild(): Promise<void>;
    clearAllCaches(): void;
    optimizeGeometryStorage(): Promise<void>;
    analyzePerformanceBottlenecks(): PerformanceAnalysis;
  };
}
```

---

## 🔧 **CONFIGURATION MANAGEMENT**

### **⚙️ Runtime Configuration System:**

```typescript
interface SnapConfigurationManager {
  // Global snap settings
  globalSettings: {
    enabled: boolean;
    defaultTolerance: number;               // pixels
    maxSnapDistance: number;                // pixels
    enabledSnapTypes: SnapType[];
    performanceMode: 'quality' | 'performance' | 'balanced';
  };

  // Algorithm-specific configurations
  algorithmSettings: Map<SnapType, AlgorithmConfig>;

  // Performance tuning
  performanceSettings: {
    maxCandidateGeometries: number;
    spatialIndexMaxEntries: number;
    useWebWorkers: boolean;
    enableGeometrySimplification: boolean;
    cacheSettings: CacheConfiguration;
  };

  // OSM-specific settings
  osmSettings: {
    enabledFeatureTypes: OSMFeatureType[];
    buildingSnapPrecision: number;
    roadSnapSettings: RoadSnapConfig;
    prioritizeMainBuildings: boolean;
  };

  // User preference integration
  userPreferences: {
    preferredSnapTypes: SnapType[];
    customTolerances: Map<SnapType, number>;
    visualFeedbackPreferences: VisualFeedbackConfig;
    accessibilitySettings: AccessibilityConfig;
  };

  // Configuration operations
  updateConfiguration(updates: Partial<SnapConfiguration>): void;
  resetToDefaults(): void;
  validateConfiguration(config: SnapConfiguration): ValidationResult;
  exportConfiguration(): string;
  importConfiguration(config: string): Promise<void>;
}
```

---

## 🌐 **WEB WORKERS INTEGRATION**

### **⚡ Background Processing Architecture:**

```typescript
interface WebWorkerManager {
  // Worker pool management
  workerPool: {
    heavyCalculations: WorkerThread[];      // Geometric calculations
    spatialIndexing: WorkerThread[];       // Index operations
    geometryProcessing: WorkerThread[];    // Geometry analysis
    poolSize: number;
    loadBalancing: 'round-robin' | 'least-loaded';
  };

  // Offloadable operations
  offloadableOperations: {
    intersectionCalculations: {
      enabled: true;
      threshold: 100;                      // geometries to trigger worker
      messageProtocol: IntersectionWorkerProtocol;
    };

    spatialIndexRebuild: {
      enabled: true;
      threshold: 1000;                     // geometries to trigger worker
      messageProtocol: IndexWorkerProtocol;
    };

    geometrySimplification: {
      enabled: true;
      threshold: 50;                       // vertices to trigger worker
      messageProtocol: SimplificationWorkerProtocol;
    };
  };

  // Worker communication
  async executeInWorker<T>(
    operation: WorkerOperation,
    data: unknown
  ): Promise<T>;

  scheduleBackgroundTask(task: BackgroundTask): Promise<void>;
  getWorkerStatus(): WorkerPoolStatus;
}
```

---

## 🧪 **TESTING ARCHITECTURE**

### **📋 Comprehensive Testing Strategy:**

```typescript
interface SnapEngineTestSuite {
  // Unit tests για individual algorithms
  unitTests: {
    endpointSnapTests: EndpointSnapTestSuite;
    midpointSnapTests: MidpointSnapTestSuite;
    intersectionSnapTests: IntersectionSnapTestSuite;
    osmBuildingSnapTests: OSMBuildingSnapTestSuite;
    spatialIndexTests: SpatialIndexTestSuite;
    performanceTests: PerformanceTestSuite;
  };

  // Integration tests για system interactions
  integrationTests: {
    multiAlgorithmTests: MultiAlgorithmTestSuite;
    coordinateSystemTests: CoordinateSystemTestSuite;
    largeDatasetTests: LargeDatasetTestSuite;
    webWorkerTests: WebWorkerTestSuite;
  };

  // Performance benchmarks
  performanceBenchmarks: {
    snapCalculationBenchmarks: SnapCalculationBenchmarks;
    spatialIndexBenchmarks: SpatialIndexBenchmarks;
    memoryUsageBenchmarks: MemoryUsageBenchmarks;
    concurrencyBenchmarks: ConcurrencyBenchmarks;
  };

  // Test data generators
  testDataGenerators: {
    generateRandomGeometry(count: number, complexity: GeometryComplexity): Geometry[];
    generateOSMBuildingData(area: BoundingBox): OSMGeometry[];
    generatePerformanceTestCases(): PerformanceTestCase[];
    generateRegressionTestCases(): RegressionTestCase[];
  };
}
```

---

## 📚 **API DOCUMENTATION**

### **🔌 Primary Engine API:**

```typescript
// Main engine interface
export interface SnapEngine {
  // Core operations
  calculateSnap(request: SnapRequest): Promise<SnapResult>;
  addGeometry(geometry: Geometry, metadata?: GeometryMetadata): string;
  removeGeometry(id: string): boolean;
  updateGeometry(id: string, geometry: Geometry): boolean;
  clearGeometries(): void;

  // Configuration
  updateConfiguration(config: Partial<SnapConfiguration>): void;
  getConfiguration(): SnapConfiguration;

  // Performance monitoring
  getPerformanceMetrics(): PerformanceMetrics;

  // Lifecycle
  initialize(config?: SnapConfiguration): Promise<void>;
  dispose(): Promise<void>;
}

// Request/Response interfaces
export interface SnapRequest {
  cursorPosition: Point2D;
  snapTypes: SnapType[];
  tolerance?: number;
  filters?: GeometryFilter[];
  context?: SnapContext;
  minimumConfidence?: number;
}

export interface SnapResult {
  snapPoint: SnapPoint | null;
  allCandidates: SnapPoint[];
  performance: SnapPerformanceMetrics;
  confidence: number;
}
```

---

*📝 **Final Note**: Αυτό το document παρέχει την πλήρη technical architecture για το @layera/snap-engine. Το επόμενο document (03-SNAP-INTERACTIONS-DESIGN.md) θα καλύψει το UI/UX layer που χτίζεται πάνω στον engine.*

*🏗️ **Επιβλέπων Αρχιτέκτονας**: Γιώργος Παγώνης*
*📅 **Τελευταία Ενημέρωση**: 19 Οκτωβρίου 2025 - Core Engine Architecture Phase*