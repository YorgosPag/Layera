# @layera/canvas-transforms

Enterprise-grade canvas transformation utilities για το Layera ecosystem με προηγμένες δυνατότητες matrix operations, coordinate mapping, και viewport management.

## 🚀 Features

### Core Functionality
- **Matrix Operations**: Complete 2D transformation matrix math
- **Coordinate Mapping**: Screen ↔ World coordinate conversions
- **Viewport Management**: Professional zoom/pan με constraints
- **Transform Animations**: Smooth transitions με easing functions
- **Canvas Utilities**: Ready-to-use rendering helpers

### Enterprise Features
- **Geographic Support**: Lat/Lng ↔ Web Mercator projections
- **Grid Systems**: Automatic grid και ruler rendering
- **High DPI Support**: Pixel-perfect rendering on all displays
- **Performance Optimized**: Efficient matrix caching και batching
- **TypeScript**: Complete type safety με enterprise-grade definitions
- **Memory Efficient**: Smart caching και cleanup patterns

## 📦 Installation

```bash
npm install @layera/canvas-transforms
```

## 🎯 Quick Start

### Basic Matrix Operations

```tsx
import {
  createTranslationMatrix,
  createScaleMatrix,
  createRotationMatrix,
  multiplyMatrices,
  transformPoint
} from '@layera/canvas-transforms';

// Create transformation matrices
const translation = createTranslationMatrix(100, 50);
const scale = createScaleMatrix(2, 2);
const rotation = createRotationMatrix(Math.PI / 4); // 45 degrees

// Combine transformations
const combined = multiplyMatrices(scale, rotation);
const final = multiplyMatrices(translation, combined);

// Transform points
const point = { x: 10, y: 20 };
const transformed = transformPoint(point, final);
```

### Viewport Management

```tsx
import { ViewportManager, DEFAULT_VIEWPORT, DEFAULT_CONSTRAINTS } from '@layera/canvas-transforms';

const viewport = new ViewportManager(
  { ...DEFAULT_VIEWPORT, width: 800, height: 600 },
  { ...DEFAULT_CONSTRAINTS, minScale: 0.5, maxScale: 5 }
);

// Handle zoom/pan
viewport.onViewportChange((newViewport) => {
  console.log('Viewport updated:', newViewport);
});

// Zoom to specific scale
viewport.zoom(2.0, { x: 400, y: 300 });

// Pan by offset
viewport.pan(50, -30);

// Fit content to viewport
const contentBounds = { minX: 0, minY: 0, maxX: 1000, maxY: 800, width: 1000, height: 800 };
viewport.fitToContent(contentBounds, 0.1); // 10% padding
```

### Coordinate Mapping

```tsx
import {
  createCoordinateMapping,
  createCanvasCoordinateMapping,
  DEFAULT_COORDINATE_SYSTEM
} from '@layera/canvas-transforms';

// Create coordinate mapping
const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
const mapping = createCanvasCoordinateMapping(canvas, DEFAULT_COORDINATE_SYSTEM);

// Convert coordinates
const screenPoint = { x: 100, y: 150 };
const worldPoint = mapping.screenToWorld(screenPoint);
const backToScreen = mapping.worldToScreen(worldPoint);

// Handle mouse events
canvas.addEventListener('mousemove', (event) => {
  const canvasCoords = getCanvasCoordinates(event, canvas);
  const worldCoords = mapping.screenToWorld(canvasCoords);
  console.log('World coordinates:', worldCoords);
});
```

## 🔧 Advanced Usage

### Geographic Coordinates

```tsx
import { geoCoordinates } from '@layera/canvas-transforms';

// Convert lat/lng to Web Mercator
const mercator = geoCoordinates.latLngToWebMercator(37.7749, -122.4194); // San Francisco

// Convert back to lat/lng
const latLng = geoCoordinates.webMercatorToLatLng(mercator.x, mercator.y);

// Create geographic coordinate system
const bounds = { north: 38, south: 37, east: -122, west: -123 };
const canvasSize = { width: 800, height: 600 };
const geoSystem = geoCoordinates.createGeoCoordinateSystem(bounds, canvasSize);
```

### Transform Animations

```tsx
import { animations, globalAnimator, easingFunctions } from '@layera/canvas-transforms';

// Animate zoom
await animations.zoomTo(2.0, { x: 400, y: 300 }, 500, 'easeOut');

// Animate pan
await animations.panTo({ x: 100, y: 50 }, 300, 'easeInOut');

// Custom animation
globalAnimator.animate('custom', {
  duration: 1000,
  easing: 'easeInOut',
  from: { scale: 1, translation: { x: 0, y: 0 } },
  to: { scale: 2, translation: { x: 100, y: 100 } },
  onUpdate: (transform) => {
    // Apply transform to your canvas
    applyTransform(transform);
  },
  onComplete: () => {
    console.log('Animation completed');
  }
});
```

### Canvas Rendering Utilities

```tsx
import {
  createTransformContext,
  drawGrid,
  drawAxes,
  drawRuler,
  setupHighDPICanvas
} from '@layera/canvas-transforms';

// Setup high DPI canvas
const { ctx, ratio } = setupHighDPICanvas(canvas);

// Create transform context
const transformCtx = createTransformContext(canvas);

// Draw grid
const bounds = { minX: -100, minY: -100, maxX: 500, maxY: 400, width: 600, height: 500 };
drawGrid(ctx, 20, bounds, {
  majorGridColor: 'var(--la-color-primary)',
  minorGridColor: 'var(--la-color-primary)',
  majorGridInterval: 5
});

// Draw coordinate axes
drawAxes(ctx, bounds, {
  showLabels: true,
  labelFont: '12px Arial'
});

// Draw rulers
drawRuler(ctx, 'top', bounds, transformCtx.transform.scale, {
  unit: 'px',
  backgroundColor: 'rgba(255, 255, 255, 0.9)'
});
```

## 🎨 Matrix Composition Examples

### Transform Order Matters

```tsx
import { compose, createTranslationMatrix, createScaleMatrix, createRotationMatrix } from '@layera/canvas-transforms';

// Method 1: Manual composition (right-to-left)
const t1 = createTranslationMatrix(100, 100);
const s1 = createScaleMatrix(2, 2);
const r1 = createRotationMatrix(Math.PI / 4);

// Apply in reverse order: translate -> scale -> rotate
const matrix1 = multiplyMatrices(r1, multiplyMatrices(s1, t1));

// Method 2: Helper function (left-to-right)
const matrix2 = compose(
  { x: 100, y: 100 }, // translation
  { x: 2, y: 2 },     // scale
  Math.PI / 4,        // rotation
  { x: 0, y: 0 }      // origin
);
```

### Complex Transformations

```tsx
// Rotate around specific point
const centerX = 200, centerY = 150;
const angle = Math.PI / 3; // 60 degrees

const rotateAroundPoint = createRotationAroundPointMatrix(angle, centerX, centerY);

// Transform with custom origin
const customOrigin = { x: 100, y: 100 };
const transform = compose(
  { x: 50, y: 30 },    // translation
  { x: 1.5, y: 1.5 },  // scale
  Math.PI / 6,         // rotation (30 degrees)
  customOrigin         // rotate/scale around this point
);
```

## 🌐 Coordinate System Examples

### Grid-Based Coordinates

```tsx
import { gridCoordinates } from '@layera/canvas-transforms';

// Snap points to grid
const point = { x: 23.7, y: 45.3 };
const snapped = gridCoordinates.snapToGrid(point, 10); // { x: 20, y: 50 }

// Get grid points in area
const area = { minX: 0, minY: 0, maxX: 100, maxY: 100 };
const gridPoints = gridCoordinates.getGridPoints(area, 20);

// Create grid coordinate system
const gridSystem = gridCoordinates.createGridCoordinateSystem(10, { x: 0, y: 0 });
```

### Converting Between Systems

```tsx
import { convertCoordinates } from '@layera/canvas-transforms';

// Create two coordinate systems
const system1 = createCoordinateMapping(viewport1, coordSys1);
const system2 = createCoordinateMapping(viewport2, coordSys2);

// Convert point from system1 to system2
const pointInSystem1 = { x: 100, y: 50 };
const pointInSystem2 = convertCoordinates(pointInSystem1, system1, system2);
```

## 🎯 Interactive Canvas Example

```tsx
import {
  ViewportManager,
  createCanvasCoordinateMapping,
  getCanvasCoordinates,
  drawGrid,
  drawCrosshair
} from '@layera/canvas-transforms';

class InteractiveCanvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private viewport: ViewportManager;
  private mapping: CoordinateMapping;
  private mousePosition: Point2D | null = null;

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;

    // Setup viewport
    this.viewport = new ViewportManager(
      { x: 0, y: 0, width: this.canvas.width, height: this.canvas.height, scale: 1, rotation: 0 },
      { minScale: 0.1, maxScale: 10, snapToGrid: true, gridSize: 20 }
    );

    // Setup coordinate mapping
    this.mapping = createCanvasCoordinateMapping(this.canvas, DEFAULT_COORDINATE_SYSTEM);

    // Setup event listeners
    this.setupEventListeners();

    // Start render loop
    this.render();
  }

  private setupEventListeners() {
    // Mouse wheel zoom
    this.canvas.addEventListener('wheel', (e) => {
      this.viewport.handleWheel(e, this.canvas);
      this.render();
    });

    // Mouse pan
    let isPanning = false;

    this.canvas.addEventListener('mousedown', (e) => {
      if (e.button === 0) { // Left button
        const coords = getCanvasCoordinates(e, this.canvas);
        this.viewport.startPan(coords);
        isPanning = true;
      }
    });

    this.canvas.addEventListener('mousemove', (e) => {
      const coords = getCanvasCoordinates(e, this.canvas);
      this.mousePosition = this.mapping.screenToWorld(coords);

      if (isPanning) {
        this.viewport.updatePan(coords);
      }

      this.render();
    });

    this.canvas.addEventListener('mouseup', () => {
      if (isPanning) {
        this.viewport.endPan();
        isPanning = false;
      }
    });
  }

  private render() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Apply viewport transform
    const transform = this.viewport.getTransform();
    this.ctx.setTransform(
      transform.matrix.a, transform.matrix.b, transform.matrix.c,
      transform.matrix.d, transform.matrix.e, transform.matrix.f
    );

    // Draw grid
    const bounds = this.viewport.getVisibleBounds();
    drawGrid(this.ctx, 20, bounds);

    // Draw crosshair at mouse position
    if (this.mousePosition) {
      drawCrosshair(this.ctx, this.mousePosition, bounds);
    }

    // Reset transform για UI elements
    this.ctx.resetTransform();

    // Draw UI info
    this.ctx.fillStyle = 'var(--la-color-primary)';
    this.ctx.font = '12px Arial';
    this.ctx.fillText(`Scale: ${transform.scale.toFixed(2)}`, 10, 20);
    if (this.mousePosition) {
      this.ctx.fillText(
        `Mouse: (${this.mousePosition.x.toFixed(1)}, ${this.mousePosition.y.toFixed(1)})`,
        10, 40
      );
    }
  }
}

// Initialize
const interactiveCanvas = new InteractiveCanvas('myCanvas');
```

## 🔄 Performance Tips

### Matrix Caching

```tsx
// Cache matrices για repeated operations
const matrixCache = new Map<string, TransformationMatrix>();

const getCachedMatrix = (key: string, factory: () => TransformationMatrix) => {
  if (!matrixCache.has(key)) {
    matrixCache.set(key, factory());
  }
  return matrixCache.get(key)!;
};

// Use για expensive operations
const expensiveMatrix = getCachedMatrix('complex-transform', () => {
  return multiplyMatrices(
    createRotationMatrix(angle),
    multiplyMatrices(
      createScaleMatrix(scaleX, scaleY),
      createTranslationMatrix(tx, ty)
    )
  );
});
```

### Batch Transformations

```tsx
// Transform multiple points efficiently
const points = [{ x: 10, y: 20 }, { x: 30, y: 40 }, /* ... */];
const transformedPoints = transformPoints(points, matrix);

// Instead of:
// const transformedPoints = points.map(p => transformPoint(p, matrix));
```

## 📚 API Reference

### Matrix Operations

- `createIdentityMatrix()` - Creates 3x3 identity matrix
- `createTranslationMatrix(x, y)` - Creates translation matrix
- `createScaleMatrix(scaleX, scaleY?)` - Creates scaling matrix
- `createRotationMatrix(angle)` - Creates rotation matrix
- `multiplyMatrices(m1, m2)` - Multiplies two matrices
- `invertMatrix(matrix)` - Calculates matrix inverse
- `transformPoint(point, matrix)` - Transforms single point
- `transformPoints(points, matrix)` - Transforms multiple points
- `decompose(matrix)` - Extracts translation, scale, rotation
- `compose(translation, scale, rotation, origin)` - Creates matrix from components

### Coordinate Mapping

- `createCoordinateMapping(viewport, system)` - Creates coordinate mapper
- `createCanvasCoordinateMapping(canvas, system)` - Canvas-specific mapper
- `getCanvasCoordinates(event, canvas)` - Gets canvas coordinates from event
- `geoCoordinates.*` - Geographic coordinate utilities
- `gridCoordinates.*` - Grid-based coordinate utilities

### Viewport Management

- `ViewportManager` - Complete viewport control class
- `zoom(factor, center?)` - Zoom viewport
- `pan(deltaX, deltaY)` - Pan viewport
- `fitToContent(bounds, padding?)` - Fit content to view
- `centerOn(worldPoint)` - Center on specific point

### Animations

- `TransformAnimator` - Animation manager class
- `animations.*` - High-level animation functions
- `easingFunctions.*` - Easing function library
- `animationUtils.*` - Animation helper utilities

### Canvas Utilities

- `createTransformContext(canvas)` - Creates transform context wrapper
- `drawGrid(ctx, gridSize, bounds, options?)` - Renders grid
- `drawAxes(ctx, bounds, options?)` - Renders coordinate axes
- `drawRuler(ctx, position, bounds, scale, options?)` - Renders scale ruler
- `setupHighDPICanvas(canvas)` - High DPI canvas setup

## 🐛 Troubleshooting

### Common Issues

**Matrix not invertible:**
```tsx
try {
  const inverse = invertMatrix(matrix);
} catch (error) {
  console.error('Matrix is singular (determinant is zero)');
  // Handle non-invertible matrix
}
```

**Performance issues με large datasets:**
```tsx
// Use batch operations
const transformedPoints = transformPoints(manyPoints, matrix);

// Cache expensive calculations
const cachedMatrix = useMemo(() =>
  compose(translation, scale, rotation, origin),
  [translation, scale, rotation, origin]
);
```

**Coordinate system confusion:**
```tsx
// Always verify coordinate system orientation
const mapping = createCoordinateMapping(viewport, {
  origin: { x: 0, y: 0 },
  scaleX: 1,
  scaleY: 1,
  rotation: 0,
  flipX: false,
  flipY: true // Common για screen coordinates (origin at top-left)
});
```

## 📄 License

Part of the Layera ecosystem. See main project license.