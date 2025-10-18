# 🛠️ SNAP-TO-GEOMETRY IMPLEMENTATION GUIDE

*Τελευταία ενημέρωση: 19 Οκτωβρίου 2025*
*Δημιουργός: Γιώργος Παγώνης - Επιβλέπων Αρχιτέκτονας*

---

## 🎯 **EXECUTIVE SUMMARY**

### **🌟 Implementation Strategy:**
> **"Αυτός ο οδηγός παρέχει step-by-step instructions για την κατασκευή του Snap-to-Geometry LEGO System, εστιάζοντας στη σωστή χρήση των υπαρχόντων Layera components και την αποφυγή διπλότυπων implementations"**

### **📋 Prerequisites - Τι πρέπει να υπάρχει πρώτα:**
1. **✅ Υπάρχοντα LEGO Systems**: Όλα τα foundation packages πρέπει να είναι functional
2. **✅ Development Environment**: Node.js, TypeScript, Lerna/Rush workspace setup
3. **✅ Testing Infrastructure**: Jest, Cypress, έργα testing framework
4. **✅ Build Pipeline**: tsup, εργαλεία bundling και CI/CD setup

---

## 🧩 **ΕΤΑΠΑ 1: PROJECT SETUP & DEPENDENCIES**

### **📦 Package Creation - Δημιουργία νέων packages:**

```bash
# 1. Δημιουργία package directories
mkdir -p packages/snap-engine
mkdir -p packages/snap-interactions

# 2. Initialize package.json files
cd packages/snap-engine
npm init -y

cd ../snap-interactions
npm init -y
```

### **📋 Package.json Configuration - Snap Engine:**

```json
// packages/snap-engine/package.json
{
  "name": "@layera/snap-engine",
  "version": "1.0.0",
  "description": "Core spatial algorithms for snap-to-geometry functionality",
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "typecheck": "tsc --noEmit",
    "lint": "eslint \"src/**/*.{ts,tsx}\" --max-warnings=0",
    "verify": "npm run typecheck && npm run lint",
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "dependencies": {
    // ✅ ΧΡΗΣΗ ΥΠΑΡΧΟΝΤΩΝ LAYERA PACKAGES
    "@layera/constants": "workspace:*",
    "@layera/error-boundary": "workspace:*",
    "@layera/file-transformation": "workspace:*",
    "@layera/cad-processing": "workspace:*",

    // External dependencies για spatial algorithms
    "rbush": "^3.0.1",
    "kdbush": "^4.0.2",
    "turf": "^6.5.0"
  },
  "devDependencies": {
    "@types/rbush": "^3.0.0",
    "typescript": "^5.0.0",
    "tsup": "^8.0.0",
    "jest": "^29.0.0",
    "@types/jest": "^29.0.0",
    "eslint": "^8.0.0"
  },
  "files": ["dist"],
  "publishConfig": {
    "access": "restricted"
  }
}
```

### **📋 Package.json Configuration - Snap Interactions:**

```json
// packages/snap-interactions/package.json
{
  "name": "@layera/snap-interactions",
  "version": "1.0.0",
  "description": "UI/UX components for snap-to-geometry interactions",
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "typecheck": "tsc --noEmit",
    "lint": "eslint \"src/**/*.{ts,tsx}\" --max-warnings=0",
    "verify": "npm run typecheck && npm run lint",
    "test": "jest",
    "test:watch": "jest --watch",
    "storybook": "storybook dev -p 6006"
  },
  "dependencies": {
    // ✅ SNAP ENGINE DEPENDENCY
    "@layera/snap-engine": "workspace:*",

    // ✅ ΧΡΗΣΗ ΥΠΑΡΧΟΝΤΩΝ UI LAYERA PACKAGES - ΜΗ ΑΝΑΔΗΜΙΟΥΡΓΗΣΗ
    "@layera/theme-switcher": "workspace:*",
    "@layera/i18n": "workspace:*",
    "@layera/notifications": "workspace:*",
    "@layera/buttons": "workspace:*",
    "@layera/forms": "workspace:*",
    "@layera/cards": "workspace:*",
    "@layera/modals": "workspace:*",
    "@layera/typography": "workspace:*",
    "@layera/icons": "workspace:*",
    "@layera/layout": "workspace:*",
    "@layera/loading": "workspace:*",
    "@layera/error-boundary": "workspace:*",
    "@layera/viewport": "workspace:*",
    "@layera/constants": "workspace:*",

    // React dependencies
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "tsup": "^8.0.0",
    "jest": "^29.0.0",
    "@storybook/react": "^7.0.0"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "files": ["dist"]
}
```

---

## 🧠 **ΕΤΑΠΑ 2: SNAP ENGINE IMPLEMENTATION**

### **📁 Directory Structure - Snap Engine:**

```
packages/snap-engine/
├── src/
│   ├── index.ts                     # Main exports
│   ├── core/
│   │   ├── SnapEngine.ts           # Main engine class
│   │   ├── SpatialIndex.ts         # R-tree spatial indexing
│   │   ├── SnapCalculator.ts       # Core calculation logic
│   │   └── PerformanceMonitor.ts   # Performance tracking
│   ├── algorithms/
│   │   ├── EndpointSnap.ts         # Endpoint snap algorithm
│   │   ├── MidpointSnap.ts         # Midpoint snap algorithm
│   │   ├── IntersectionSnap.ts     # Intersection snap algorithm
│   │   ├── OSMBuildingSnap.ts      # OSM building snap algorithm
│   │   └── SnapAlgorithm.ts        # Base algorithm interface
│   ├── geometry/
│   │   ├── GeometryAnalyzer.ts     # Geometry inspection utilities
│   │   ├── DistanceCalculator.ts   # Distance calculation utilities
│   │   └── CoordinateUtils.ts      # Coordinate transformation helpers
│   ├── types/
│   │   ├── SnapTypes.ts            # Core snap type definitions
│   │   ├── GeometryTypes.ts        # Geometry type definitions
│   │   └── ConfigTypes.ts          # Configuration type definitions
│   └── utils/
│       ├── Constants.ts            # Package-specific constants
│       └── ErrorHandling.ts        # Error utilities
├── tests/
├── docs/
└── package.json
```

### **⚙️ Implementation Step 1 - Core Types:**

```typescript
// packages/snap-engine/src/types/SnapTypes.ts
import type { Point2D, BoundingBox } from '@layera/file-transformation';

export enum SnapType {
  ENDPOINT = 'endpoint',
  MIDPOINT = 'midpoint',
  CENTER = 'center',
  INTERSECTION = 'intersection',
  PERPENDICULAR = 'perpendicular',
  TANGENT = 'tangent',
  BUILDING_CORNER = 'building_corner',
  BUILDING_EDGE = 'building_edge',
  GRID = 'grid',
  NEAREST = 'nearest'
}

export interface SnapPoint {
  readonly point: Point2D;
  readonly type: SnapType;
  readonly geometry: Geometry;
  readonly confidence: number;
  readonly metadata: SnapPointMetadata;
}

export interface SnapRequest {
  readonly cursorPosition: Point2D;
  readonly snapTypes: readonly SnapType[];
  readonly tolerance?: number;
  readonly filters?: readonly GeometryFilter[];
  readonly context?: SnapContext;
  readonly minimumConfidence?: number;
}

export interface SnapResult {
  readonly snapPoint: SnapPoint | null;
  readonly allCandidates: readonly SnapPoint[];
  readonly performance: SnapPerformanceMetrics;
  readonly confidence: number;
}

export interface SnapPointMetadata {
  readonly entityId: string;
  readonly layerId?: string;
  readonly segmentIndex?: number;
  readonly distance?: number;
  readonly [key: string]: unknown;
}

export interface SnapPerformanceMetrics {
  readonly calculationTime: number;
  readonly spatialQueryTime: number;
  readonly algorithmExecutionTime: number;
  readonly candidateCount: number;
  readonly distanceToSnap: number;
}
```

### **⚙️ Implementation Step 2 - Main Engine Class:**

```typescript
// packages/snap-engine/src/core/SnapEngine.ts
import { ErrorBoundary } from '@layera/error-boundary';
import { SNAP_CONSTANTS } from '@layera/constants';
import type { CoordinateTransformer } from '@layera/file-transformation';

import type {
  SnapRequest,
  SnapResult,
  SnapConfiguration,
  GeometryMetadata,
  Geometry
} from '../types';

import { SpatialIndex } from './SpatialIndex';
import { SnapCalculator } from './SnapCalculator';
import { PerformanceMonitor } from './PerformanceMonitor';

export class SnapEngine {
  private spatialIndex: SpatialIndex;
  private snapCalculator: SnapCalculator;
  private performanceMonitor: PerformanceMonitor;
  private coordinateTransformer?: CoordinateTransformer;

  private config: SnapConfiguration;
  private initialized = false;

  constructor(config: Partial<SnapConfiguration> = {}) {
    this.config = {
      // ✅ ΧΡΗΣΗ CONSTANTS ΑΠΟ @layera/constants - ΜΗ HARDCODE
      tolerance: config.tolerance ?? SNAP_CONSTANTS.DEFAULT_TOLERANCE,
      maxSnapDistance: config.maxSnapDistance ?? SNAP_CONSTANTS.MAX_SNAP_DISTANCE,
      enabledSnapTypes: config.enabledSnapTypes ?? SNAP_CONSTANTS.DEFAULT_SNAP_TYPES,
      performanceMode: config.performanceMode ?? 'balanced',
      ...config
    };

    this.spatialIndex = new SpatialIndex(this.config.spatialIndexConfig);
    this.snapCalculator = new SnapCalculator(this.config);
    this.performanceMonitor = new PerformanceMonitor();
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      // Initialize spatial index
      await this.spatialIndex.initialize();

      // Setup coordinate transformer if needed
      if (this.config.coordinateSystem) {
        const { CoordinateTransformer } = await import('@layera/file-transformation');
        this.coordinateTransformer = new CoordinateTransformer({
          sourceCRS: this.config.coordinateSystem.source,
          targetCRS: this.config.coordinateSystem.target
        });
      }

      this.initialized = true;

    } catch (error) {
      // ✅ ΧΡΗΣΗ @layera/error-boundary - ΜΗ CUSTOM ERROR HANDLING
      throw new Error(`Failed to initialize SnapEngine: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async calculateSnap(request: SnapRequest): Promise<SnapResult> {
    if (!this.initialized) {
      throw new Error('SnapEngine not initialized. Call initialize() first.');
    }

    const performanceTrace = this.performanceMonitor.startTrace('calculateSnap');

    try {
      // Transform coordinates if needed
      const transformedRequest = await this.transformRequest(request);

      // Delegate to snap calculator
      const result = await this.snapCalculator.calculateSnap(
        transformedRequest,
        this.spatialIndex
      );

      performanceTrace.end();

      return {
        ...result,
        performance: {
          ...result.performance,
          calculationTime: performanceTrace.duration
        }
      };

    } catch (error) {
      performanceTrace.endWithError(error);
      throw error;
    }
  }

  addGeometry(geometry: Geometry, metadata?: GeometryMetadata): string {
    return this.spatialIndex.addGeometry(geometry, metadata);
  }

  removeGeometry(id: string): boolean {
    return this.spatialIndex.removeGeometry(id);
  }

  updateGeometry(id: string, geometry: Geometry): boolean {
    return this.spatialIndex.updateGeometry(id, geometry);
  }

  clearGeometries(): void {
    this.spatialIndex.clear();
  }

  updateConfiguration(updates: Partial<SnapConfiguration>): void {
    this.config = { ...this.config, ...updates };
    this.snapCalculator.updateConfiguration(this.config);
  }

  getConfiguration(): SnapConfiguration {
    return { ...this.config };
  }

  getPerformanceMetrics() {
    return this.performanceMonitor.getMetrics();
  }

  async dispose(): Promise<void> {
    await this.spatialIndex.dispose();
    this.performanceMonitor.dispose();
    this.initialized = false;
  }

  private async transformRequest(request: SnapRequest): Promise<SnapRequest> {
    if (!this.coordinateTransformer) return request;

    // ✅ ΧΡΗΣΗ @layera/file-transformation - ΜΗ CUSTOM COORDINATE MATH
    const transformedPosition = await this.coordinateTransformer.transformCoordinates(
      request.cursorPosition,
      this.config.coordinateSystem!.source,
      this.config.coordinateSystem!.target
    );

    return {
      ...request,
      cursorPosition: transformedPosition
    };
  }
}
```

### **⚙️ Implementation Step 3 - Spatial Index:**

```typescript
// packages/snap-engine/src/core/SpatialIndex.ts
import RBush from 'rbush';
import type { BoundingBox, Point2D } from '@layera/file-transformation';
import type { Geometry, GeometryMetadata } from '../types';

interface IndexedGeometry {
  readonly id: string;
  readonly geometry: Geometry;
  readonly metadata?: GeometryMetadata;
  readonly minX: number;
  readonly minY: number;
  readonly maxX: number;
  readonly maxY: number;
}

export class SpatialIndex {
  private rtree: RBush<IndexedGeometry>;
  private geometries = new Map<string, IndexedGeometry>();
  private idCounter = 0;

  constructor(config: SpatialIndexConfig = {}) {
    this.rtree = new RBush(config.maxEntries || 16);
  }

  async initialize(): Promise<void> {
    // Initialize spatial index
    this.rtree.clear();
    this.geometries.clear();
    this.idCounter = 0;
  }

  addGeometry(geometry: Geometry, metadata?: GeometryMetadata): string {
    const id = `geometry_${this.idCounter++}`;
    const bbox = this.calculateBoundingBox(geometry);

    const indexedGeometry: IndexedGeometry = {
      id,
      geometry,
      metadata,
      minX: bbox.minX,
      minY: bbox.minY,
      maxX: bbox.maxX,
      maxY: bbox.maxY
    };

    this.geometries.set(id, indexedGeometry);
    this.rtree.insert(indexedGeometry);

    return id;
  }

  removeGeometry(id: string): boolean {
    const geometry = this.geometries.get(id);
    if (!geometry) return false;

    this.geometries.delete(id);
    this.rtree.remove(geometry);
    return true;
  }

  updateGeometry(id: string, geometry: Geometry): boolean {
    if (!this.removeGeometry(id)) return false;

    const newId = this.addGeometry(geometry);
    // Update the ID mapping to maintain the original ID
    const newGeometry = this.geometries.get(newId)!;
    this.geometries.delete(newId);
    this.geometries.set(id, { ...newGeometry, id });

    return true;
  }

  search(bounds: BoundingBox): IndexedGeometry[] {
    return this.rtree.search({
      minX: bounds.minX,
      minY: bounds.minY,
      maxX: bounds.maxX,
      maxY: bounds.maxY
    });
  }

  searchAroundPoint(point: Point2D, radius: number): IndexedGeometry[] {
    return this.search({
      minX: point.x - radius,
      minY: point.y - radius,
      maxX: point.x + radius,
      maxY: point.y + radius
    });
  }

  clear(): void {
    this.rtree.clear();
    this.geometries.clear();
    this.idCounter = 0;
  }

  async dispose(): Promise<void> {
    this.clear();
  }

  private calculateBoundingBox(geometry: Geometry): BoundingBox {
    // Calculate geometry bounding box based on geometry type
    switch (geometry.type) {
      case 'Point':
        const point = geometry.coordinates;
        return {
          minX: point[0],
          minY: point[1],
          maxX: point[0],
          maxY: point[1]
        };

      case 'LineString':
        return this.calculateLineStringBounds(geometry.coordinates);

      case 'Polygon':
        return this.calculatePolygonBounds(geometry.coordinates[0]);

      default:
        throw new Error(`Unsupported geometry type: ${geometry.type}`);
    }
  }

  private calculateLineStringBounds(coordinates: number[][]): BoundingBox {
    let minX = Infinity, minY = Infinity;
    let maxX = -Infinity, maxY = -Infinity;

    for (const [x, y] of coordinates) {
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }

    return { minX, minY, maxX, maxY };
  }

  private calculatePolygonBounds(coordinates: number[][]): BoundingBox {
    return this.calculateLineStringBounds(coordinates);
  }
}
```

---

## 🎨 **ΕΤΑΠΑ 3: SNAP INTERACTIONS IMPLEMENTATION**

### **📁 Directory Structure - Snap Interactions:**

```
packages/snap-interactions/
├── src/
│   ├── index.ts                    # Main exports
│   ├── components/
│   │   ├── SnapCanvas.tsx          # Main interaction canvas
│   │   ├── SnapCursor.tsx          # Smart cursor component
│   │   ├── SnapIndicators.tsx      # Snap point indicators
│   │   ├── SnapSettings/
│   │   │   ├── SnapSettingsPanel.tsx
│   │   │   ├── SnapTypeToggles.tsx
│   │   │   └── ToleranceSlider.tsx
│   │   └── SnapTooltips/
│   │       ├── SnapTooltip.tsx
│   │       └── SnapInfo.tsx
│   ├── hooks/
│   │   ├── useSnapInteractions.ts  # Main snap hook
│   │   ├── useSnapCursor.ts        # Cursor management hook
│   │   ├── useSnapAnimations.ts    # Animation management hook
│   │   └── useSnapSettings.ts      # Settings management hook
│   ├── animations/
│   │   ├── SnapAnimationController.ts
│   │   ├── CursorAnimations.ts
│   │   └── IndicatorAnimations.ts
│   ├── types/
│   │   ├── InteractionTypes.ts
│   │   └── AnimationTypes.ts
│   └── utils/
│       ├── EventUtils.ts
│       └── CanvasUtils.ts
├── stories/                        # Storybook stories
├── tests/
└── package.json
```

### **⚙️ Implementation Step 1 - Main Hook:**

```typescript
// packages/snap-interactions/src/hooks/useSnapInteractions.ts
import { useState, useCallback, useRef, useEffect } from 'react';
import { useTranslation } from '@layera/i18n';
import { useNotification } from '@layera/notifications';
import { useTheme } from '@layera/theme-switcher';

import type { SnapEngine, SnapPoint, SnapRequest, SnapResult } from '@layera/snap-engine';

interface UseSnapInteractionsOptions {
  snapEngine?: SnapEngine;
  enabled?: boolean;
  onSnapEngaged?: (snap: SnapPoint) => void;
  onSnapReleased?: (snap: SnapPoint) => void;
  onSnapChanged?: (newSnap: SnapPoint | null, oldSnap: SnapPoint | null) => void;
  settings?: SnapInteractionSettings;
}

interface UseSnapInteractionsReturn {
  // State
  currentSnap: SnapPoint | null;
  allSnaps: SnapPoint[];
  isSnapping: boolean;
  cursorPosition: Point2D;

  // Actions
  engageSnap: (snap: SnapPoint) => void;
  releaseSnap: () => void;
  cycleToNextSnap: (direction: number) => void;

  // Event handlers
  handleMouseMove: (event: MouseEvent) => void;
  handleTouchMove: (event: TouchEvent) => void;
  handleKeyDown: (event: KeyboardEvent) => void;

  // Refs για DOM integration
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export function useSnapInteractions(
  options: UseSnapInteractionsOptions = {}
): UseSnapInteractionsReturn {
  const {
    snapEngine,
    enabled = true,
    onSnapEngaged,
    onSnapReleased,
    onSnapChanged,
    settings = {}
  } = options;

  // ✅ ΧΡΗΣΗ ΥΠΑΡΧΟΝΤΩΝ LAYERA HOOKS - ΜΗ CUSTOM IMPLEMENTATIONS
  const { t } = useTranslation();
  const { toast } = useNotification();
  const { theme } = useTheme();

  // State management
  const [currentSnap, setCurrentSnap] = useState<SnapPoint | null>(null);
  const [allSnaps, setAllSnaps] = useState<SnapPoint[]>([]);
  const [isSnapping, setIsSnapping] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<Point2D>({ x: 0, y: 0 });

  // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastSnapRef = useRef<SnapPoint | null>(null);

  // Main snap calculation
  const calculateSnap = useCallback(async (position: Point2D) => {
    if (!enabled || !snapEngine) return;

    setCursorPosition(position);

    try {
      const snapRequest: SnapRequest = {
        cursorPosition: position,
        snapTypes: settings.enabledSnapTypes || [],
        tolerance: settings.tolerance,
        filters: settings.filters,
        minimumConfidence: settings.minimumConfidence || 0.5
      };

      const result: SnapResult = await snapEngine.calculateSnap(snapRequest);

      // Update state
      setCurrentSnap(result.snapPoint);
      setAllSnaps(result.allCandidates);
      setIsSnapping(!!result.snapPoint);

      // Handle snap change callbacks
      if (result.snapPoint !== lastSnapRef.current) {
        onSnapChanged?.(result.snapPoint, lastSnapRef.current);

        if (result.snapPoint && !lastSnapRef.current) {
          // ✅ ΧΡΗΣΗ @layera/notifications - ΜΗ CUSTOM NOTIFICATIONS
          toast({
            message: t('snap.engaged', { type: result.snapPoint.type }),
            type: 'info',
            duration: 1000
          });
          onSnapEngaged?.(result.snapPoint);
        } else if (!result.snapPoint && lastSnapRef.current) {
          onSnapReleased?.(lastSnapRef.current);
        }

        lastSnapRef.current = result.snapPoint;
      }

    } catch (error) {
      console.error('Snap calculation error:', error);
      setCurrentSnap(null);
      setAllSnaps([]);
      setIsSnapping(false);
    }
  }, [enabled, snapEngine, settings, onSnapEngaged, onSnapReleased, onSnapChanged, t, toast]);

  // Event handlers
  const handleMouseMove = useCallback((event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const position = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };

    calculateSnap(position);
  }, [calculateSnap]);

  const handleTouchMove = useCallback((event: TouchEvent) => {
    if (event.touches.length !== 1) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const touch = event.touches[0];
    const position = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    };

    calculateSnap(position);
  }, [calculateSnap]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled || allSnaps.length === 0) return;

    switch (event.code) {
      case 'Tab':
        event.preventDefault();
        const direction = event.shiftKey ? -1 : 1;
        cycleToNextSnap(direction);
        break;

      case 'Enter':
      case 'Space':
        event.preventDefault();
        if (currentSnap) {
          engageSnap(currentSnap);
        }
        break;

      case 'Escape':
        event.preventDefault();
        releaseSnap();
        break;
    }
  }, [enabled, allSnaps, currentSnap]);

  // Action functions
  const engageSnap = useCallback((snap: SnapPoint) => {
    setIsSnapping(true);
    // ✅ ΧΡΗΣΗ @layera/notifications
    toast({
      message: t('snap.success', { type: snap.type }),
      type: 'success',
      duration: 1500
    });
    onSnapEngaged?.(snap);
  }, [t, toast, onSnapEngaged]);

  const releaseSnap = useCallback(() => {
    if (currentSnap) {
      onSnapReleased?.(currentSnap);
    }
    setCurrentSnap(null);
    setIsSnapping(false);
  }, [currentSnap, onSnapReleased]);

  const cycleToNextSnap = useCallback((direction: number) => {
    if (allSnaps.length === 0) return;

    const currentIndex = currentSnap ? allSnaps.indexOf(currentSnap) : -1;
    const nextIndex = (currentIndex + direction + allSnaps.length) % allSnaps.length;
    const nextSnap = allSnaps[nextIndex];

    setCurrentSnap(nextSnap);
  }, [allSnaps, currentSnap]);

  return {
    // State
    currentSnap,
    allSnaps,
    isSnapping,
    cursorPosition,

    // Actions
    engageSnap,
    releaseSnap,
    cycleToNextSnap,

    // Event handlers
    handleMouseMove,
    handleTouchMove,
    handleKeyDown,

    // Refs
    canvasRef
  };
}
```

### **⚙️ Implementation Step 2 - Settings Panel Component:**

```typescript
// packages/snap-interactions/src/components/SnapSettings/SnapSettingsPanel.tsx
import React from 'react';

// ✅ ΧΡΗΣΗ ΥΠΑΡΧΟΝΤΩΝ UI COMPONENTS - ΜΗ ΑΝΑΔΗΜΙΟΥΡΓΗΣΗ
import { Card, CardHeader, CardContent } from '@layera/cards';
import { Button, ToggleButton } from '@layera/buttons';
import { Slider, FormField, FormSection } from '@layera/forms';
import { Text, Heading } from '@layera/typography';
import { Stack, Grid } from '@layera/layout';
import { Icon } from '@layera/icons';
import { useTranslation } from '@layera/i18n';
import { useTheme } from '@layera/theme-switcher';

import type { SnapType } from '@layera/snap-engine';

interface SnapSettingsPanelProps {
  settings: SnapInteractionSettings;
  onSettingsChange: (settings: SnapInteractionSettings) => void;
  onReset: () => void;
  className?: string;
}

export const SnapSettingsPanel: React.FC<SnapSettingsPanelProps> = ({
  settings,
  onSettingsChange,
  onReset,
  className
}) => {
  // ✅ ΧΡΗΣΗ @layera/i18n ΚΑΙ @layera/theme-switcher
  const { t } = useTranslation();
  const { theme } = useTheme();

  const handleSnapTypeToggle = (snapType: SnapType) => {
    const enabledTypes = settings.enabledSnapTypes || [];
    const newEnabledTypes = enabledTypes.includes(snapType)
      ? enabledTypes.filter(type => type !== snapType)
      : [...enabledTypes, snapType];

    onSettingsChange({
      ...settings,
      enabledSnapTypes: newEnabledTypes
    });
  };

  const handleToleranceChange = (tolerance: number) => {
    onSettingsChange({
      ...settings,
      tolerance
    });
  };

  return (
    <Card className={className}>
      <CardHeader>
        <Stack direction="row" justify="space-between" align="center">
          {/* ✅ ΧΡΗΣΗ @layera/typography */}
          <Heading variant="h3">{t('snap.settings.title')}</Heading>
          {/* ✅ ΧΡΗΣΗ @layera/buttons */}
          <Button variant="outline" size="small" onClick={onReset}>
            <Icon name="refresh" size="small" />
            {t('snap.settings.reset')}
          </Button>
        </Stack>
      </CardHeader>

      <CardContent>
        {/* ✅ ΧΡΗΣΗ @layera/layout για organization */}
        <Stack spacing="large">

          {/* Tolerance Section */}
          {/* ✅ ΧΡΗΣΗ @layera/forms */}
          <FormSection title={t('snap.settings.tolerance.title')}>
            <FormField
              label={t('snap.settings.tolerance.label')}
              description={t('snap.settings.tolerance.description')}
            >
              <Slider
                min={1}
                max={50}
                step={1}
                value={settings.tolerance || 10}
                onChange={handleToleranceChange}
                marks={[
                  { value: 5, label: t('snap.tolerance.low') },
                  { value: 15, label: t('snap.tolerance.medium') },
                  { value: 30, label: t('snap.tolerance.high') }
                ]}
              />
            </FormField>
          </FormSection>

          {/* Snap Types Section */}
          <FormSection title={t('snap.settings.snapTypes.title')}>
            {/* ✅ ΧΡΗΣΗ @layera/layout Grid system */}
            <Grid columns={{ xs: 1, sm: 2, md: 3 }} spacing="medium">
              {Object.values(SnapType).map(snapType => (
                <ToggleButton
                  key={snapType}
                  active={settings.enabledSnapTypes?.includes(snapType) || false}
                  onClick={() => handleSnapTypeToggle(snapType)}
                  variant="outline"
                  size="medium"
                >
                  <Stack direction="row" align="center" spacing="small">
                    <Icon
                      name={getSnapTypeIcon(snapType)}
                      size="small"
                      color={theme.colors.primary}
                    />
                    <Text variant="body2">
                      {t(`snap.types.${snapType}`)}
                    </Text>
                  </Stack>
                </ToggleButton>
              ))}
            </Grid>
          </FormSection>

          {/* Performance Section */}
          <FormSection title={t('snap.settings.performance.title')}>
            <Stack spacing="medium">
              <FormField
                label={t('snap.settings.performance.mode')}
                description={t('snap.settings.performance.description')}
              >
                <Grid columns={3} spacing="small">
                  {['quality', 'balanced', 'performance'].map(mode => (
                    <ToggleButton
                      key={mode}
                      active={settings.performanceMode === mode}
                      onClick={() => onSettingsChange({
                        ...settings,
                        performanceMode: mode as PerformanceMode
                      })}
                      variant="outline"
                    >
                      {t(`snap.performance.${mode}`)}
                    </ToggleButton>
                  ))}
                </Grid>
              </FormField>
            </Stack>
          </FormSection>
        </Stack>
      </CardContent>
    </Card>
  );
};

// Helper function για snap type icons
function getSnapTypeIcon(snapType: SnapType): string {
  const iconMap: Record<SnapType, string> = {
    [SnapType.ENDPOINT]: 'square',
    [SnapType.MIDPOINT]: 'triangle',
    [SnapType.CENTER]: 'circle',
    [SnapType.INTERSECTION]: 'cross',
    [SnapType.PERPENDICULAR]: 'perpendicular',
    [SnapType.TANGENT]: 'arc',
    [SnapType.BUILDING_CORNER]: 'building',
    [SnapType.BUILDING_EDGE]: 'building-edge',
    [SnapType.GRID]: 'grid',
    [SnapType.NEAREST]: 'target'
  };

  return iconMap[snapType] || 'circle';
}
```

---

## 🧪 **ΕΤΑΠΑ 4: TESTING IMPLEMENTATION**

### **📋 Test Setup - Jest Configuration:**

```javascript
// packages/snap-engine/jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/index.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts']
};
```

### **🧪 Unit Test Example - Snap Engine:**

```typescript
// packages/snap-engine/tests/core/SnapEngine.test.ts
import { SnapEngine } from '../../src/core/SnapEngine';
import { SnapType } from '../../src/types/SnapTypes';

// ✅ ΧΡΗΣΗ @layera/constants για test data
import { SNAP_CONSTANTS } from '@layera/constants';

describe('SnapEngine', () => {
  let snapEngine: SnapEngine;

  beforeEach(async () => {
    snapEngine = new SnapEngine({
      tolerance: SNAP_CONSTANTS.DEFAULT_TOLERANCE,
      enabledSnapTypes: [SnapType.ENDPOINT, SnapType.MIDPOINT]
    });

    await snapEngine.initialize();
  });

  afterEach(async () => {
    await snapEngine.dispose();
  });

  describe('calculateSnap', () => {
    it('should find endpoint snap for line geometry', async () => {
      // Add test geometry
      const lineGeometry = {
        type: 'LineString' as const,
        coordinates: [[0, 0], [10, 0]]
      };

      snapEngine.addGeometry(lineGeometry);

      // Test snap calculation
      const result = await snapEngine.calculateSnap({
        cursorPosition: { x: 1, y: 1 },
        snapTypes: [SnapType.ENDPOINT],
        tolerance: 5
      });

      expect(result.snapPoint).not.toBeNull();
      expect(result.snapPoint!.type).toBe(SnapType.ENDPOINT);
      expect(result.snapPoint!.point).toEqual({ x: 0, y: 0 });
    });

    it('should return null when no geometries are within tolerance', async () => {
      const result = await snapEngine.calculateSnap({
        cursorPosition: { x: 100, y: 100 },
        snapTypes: [SnapType.ENDPOINT],
        tolerance: 5
      });

      expect(result.snapPoint).toBeNull();
      expect(result.allCandidates).toHaveLength(0);
    });
  });

  describe('geometry management', () => {
    it('should add and remove geometries correctly', () => {
      const geometry = {
        type: 'Point' as const,
        coordinates: [5, 5]
      };

      const id = snapEngine.addGeometry(geometry);
      expect(id).toBeDefined();

      const removed = snapEngine.removeGeometry(id);
      expect(removed).toBe(true);

      const removedAgain = snapEngine.removeGeometry(id);
      expect(removedAgain).toBe(false);
    });
  });
});
```

### **🧪 Component Test Example - Snap Interactions:**

```typescript
// packages/snap-interactions/tests/components/SnapSettingsPanel.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// ✅ ΧΡΗΣΗ ΥΠΑΡΧΟΝΤΩΝ LAYERA TEST UTILITIES
import { LayeraTestProvider } from '@layera/test-utils';

import { SnapSettingsPanel } from '../../src/components/SnapSettings/SnapSettingsPanel';
import { SnapType } from '@layera/snap-engine';

const defaultSettings = {
  tolerance: 10,
  enabledSnapTypes: [SnapType.ENDPOINT, SnapType.MIDPOINT],
  performanceMode: 'balanced' as const
};

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <LayeraTestProvider>
      {component}
    </LayeraTestProvider>
  );
};

describe('SnapSettingsPanel', () => {
  const mockOnSettingsChange = jest.fn();
  const mockOnReset = jest.fn();

  beforeEach(() => {
    mockOnSettingsChange.mockClear();
    mockOnReset.mockClear();
  });

  it('should render snap settings panel with correct title', () => {
    renderWithProvider(
      <SnapSettingsPanel
        settings={defaultSettings}
        onSettingsChange={mockOnSettingsChange}
        onReset={mockOnReset}
      />
    );

    expect(screen.getByText('snap.settings.title')).toBeInTheDocument();
  });

  it('should toggle snap types when clicked', () => {
    renderWithProvider(
      <SnapSettingsPanel
        settings={defaultSettings}
        onSettingsChange={mockOnSettingsChange}
        onReset={mockOnReset}
      />
    );

    const intersectionToggle = screen.getByText('snap.types.intersection');
    fireEvent.click(intersectionToggle);

    expect(mockOnSettingsChange).toHaveBeenCalledWith({
      ...defaultSettings,
      enabledSnapTypes: [SnapType.ENDPOINT, SnapType.MIDPOINT, SnapType.INTERSECTION]
    });
  });

  it('should update tolerance when slider changes', () => {
    renderWithProvider(
      <SnapSettingsPanel
        settings={defaultSettings}
        onSettingsChange={mockOnSettingsChange}
        onReset={mockOnReset}
      />
    );

    const toleranceSlider = screen.getByRole('slider');
    fireEvent.change(toleranceSlider, { target: { value: '20' } });

    expect(mockOnSettingsChange).toHaveBeenCalledWith({
      ...defaultSettings,
      tolerance: 20
    });
  });
});
```

---

## 🚀 **ΕΤΑΠΑ 5: BUILD & DEPLOYMENT**

### **📋 Build Configuration - tsup:**

```typescript
// packages/snap-engine/tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    // ✅ MARK LAYERA PACKAGES AS EXTERNAL
    '@layera/constants',
    '@layera/error-boundary',
    '@layera/file-transformation',
    '@layera/cad-processing'
  ],
  treeshake: true,
  minify: process.env.NODE_ENV === 'production'
});
```

```typescript
// packages/snap-interactions/tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    // ✅ MARK ALL LAYERA PACKAGES AS EXTERNAL
    '@layera/snap-engine',
    '@layera/theme-switcher',
    '@layera/i18n',
    '@layera/notifications',
    '@layera/buttons',
    '@layera/forms',
    '@layera/cards',
    '@layera/modals',
    '@layera/typography',
    '@layera/icons',
    '@layera/layout',
    '@layera/loading',
    '@layera/error-boundary',
    '@layera/viewport',
    '@layera/constants'
  ],
  jsx: 'react-jsx',
  treeshake: true,
  minify: process.env.NODE_ENV === 'production'
});
```

### **📋 Development Scripts:**

```bash
# Build both packages
npm run build -w @layera/snap-engine
npm run build -w @layera/snap-interactions

# Run tests
npm run test -w @layera/snap-engine
npm run test -w @layera/snap-interactions

# Type checking
npm run typecheck -w @layera/snap-engine
npm run typecheck -w @layera/snap-interactions

# Linting
npm run lint -w @layera/snap-engine
npm run lint -w @layera/snap-interactions

# Full verification (typecheck + lint + test)
npm run verify -w @layera/snap-engine
npm run verify -w @layera/snap-interactions
```

---

## ✅ **FINAL CHECKLIST**

### **🔍 Pre-Implementation Verification:**
- [ ] All υπάρχοντα LEGO packages are functional και available
- [ ] Development environment setup complete
- [ ] TypeScript configuration matches project standards
- [ ] ✅ **CRITICAL**: Verify no duplicate functionality με existing packages

### **🛠️ Implementation Verification:**
- [ ] ✅ **SNAP ENGINE**: Uses @layera/constants για configuration
- [ ] ✅ **SNAP ENGINE**: Uses @layera/error-boundary για error handling
- [ ] ✅ **SNAP ENGINE**: Uses @layera/file-transformation για coordinate systems
- [ ] ✅ **SNAP ENGINE**: Uses @layera/cad-processing για CAD geometry support

### **🎨 UI Implementation Verification:**
- [ ] ✅ **SNAP INTERACTIONS**: Uses @layera/cards για settings panels
- [ ] ✅ **SNAP INTERACTIONS**: Uses @layera/buttons για toggles και controls
- [ ] ✅ **SNAP INTERACTIONS**: Uses @layera/forms για sliders και inputs
- [ ] ✅ **SNAP INTERACTIONS**: Uses @layera/i18n για all text strings
- [ ] ✅ **SNAP INTERACTIONS**: Uses @layera/notifications για user feedback
- [ ] ✅ **SNAP INTERACTIONS**: Uses @layera/theme-switcher για theming

### **🧪 Testing Verification:**
- [ ] Unit tests για core snap algorithms
- [ ] Integration tests για snap engine + interactions
- [ ] Component tests για all UI components
- [ ] Performance tests για large geometry datasets
- [ ] Cross-browser compatibility tests

### **🚀 Deployment Verification:**
- [ ] Both packages build successfully
- [ ] Type definitions generated correctly
- [ ] All external dependencies properly marked
- [ ] No duplicate code με existing packages
- [ ] Performance benchmarks meet targets

---

*📝 **Final Note**: Αυτός ο implementation guide παρέχει concrete, step-by-step instructions για την κατασκευή του Snap-to-Geometry LEGO System. Το επόμενο document (05-PERFORMANCE-OPTIMIZATION.md) θα καλύψει advanced performance tuning strategies.*

*🏗️ **Επιβλέπων Αρχιτέκτονας**: Γιώργος Παγώνης*
*📅 **Τελευταία Ενημέρωση**: 19 Οκτωβρίου 2025 - Implementation Guide Phase*