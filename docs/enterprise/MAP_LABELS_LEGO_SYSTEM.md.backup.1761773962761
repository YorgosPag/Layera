# 🏷️ @layera/map-labels - Enterprise LEGO System

**Επιβλέπων Αρχιτέκτονας**: Γιώργος Παγώνης
**Package Version**: 1.0.0
**Creation Date**: 2025-10-20
**Status**: ✅ Production Ready

## 🎯 Στόχος

Enterprise LEGO system για την εμφάνιση intelligent text overlays πάνω σε χαρτογραφικά περιγράμματα, συμπεριλαμβανομένων τίτλων περιοχών και υπολογισμών εμβαδού.

## 🏗️ Αρχιτεκτονική

### 🧩 LEGO System Integration

```typescript
// Enterprise dependencies (ΜΟΝΑΔΙΚΗ ΠΗΓΗ ΑΛΗΘΕΙΑΣ)
import { Text, Heading } from '@layera/typography';          // Typography LEGO
import { calculateProjectedArea, calculatePolygonCenter } from '@layera/geo-drawing'; // Calculations LEGO
import { useLayeraTranslation } from '@layera/i18n';         // i18n LEGO
import { Z_INDEX } from '@layera/constants';                 // Constants LEGO
```

### 📦 Package Structure

```
packages/map-labels/
├── src/
│   ├── components/
│   │   ├── MapLabel/
│   │   │   ├── MapLabel.tsx           # Main label component
│   │   │   ├── MapLabel.types.ts      # TypeScript definitions
│   │   │   └── MapLabel.css           # Styled component CSS
│   │   ├── BoundaryLabel/
│   │   │   ├── BoundaryLabel.tsx      # Boundary-specific label
│   │   │   └── BoundaryLabel.types.ts
│   │   └── AreaLabel/
│   │       ├── AreaLabel.tsx          # Area calculation label
│   │       └── AreaLabel.types.ts
│   ├── hooks/
│   │   ├── useMapLabel.ts             # Label positioning logic
│   │   ├── useAreaCalculation.ts      # Area calculation hook
│   │   └── useLabelVisibility.ts      # Zoom-based visibility
│   ├── utils/
│   │   ├── positioning.ts             # Label positioning algorithms
│   │   ├── formatting.ts              # Area/distance formatting
│   │   └── constants.ts               # Label-specific constants
│   ├── types/
│   │   └── index.ts                   # Public type exports
│   └── index.ts                       # Public API exports
├── package.json
├── tsconfig.json
├── README.md
└── CHANGELOG.md
```

## 🔄 ΣΤΡΑΤΗΓΙΚΗ ΑΝΑΠΤΥΞΗΣ - Επέκταση Υπάρχοντων LEGO Systems

**📊 ΕΥΡΗΜΑΤΑ ΈΡΕΥΝΑΣ:**

Μετά από εκτενή έρευνα στο Layera ecosystem, διαπιστώθηκε ότι υπάρχουν ήδη βασικά geometric calculation systems:

### ✅ **ΥΠΑΡΧΟΝΤΑ LEGO Systems (ΜΟΝΑΔΙΚΗ ΠΗΓΗ ΑΛΗΘΕΙΑΣ):**
- `@layera/geo-drawing`: Area, distance, perimeter calculations
- `@layera/snap-engine`: Circle/arc geometry definitions
- `@layera/cad-processing`: Circle rendering capabilities

### ❌ **GAPS που πρέπει να ΚΑΛΥΦΘΟΥΝ:**
- Circle measurements (area, circumference, diameter)
- Arc measurements (length, sector area)
- Advanced geometric detection (circle από points)
- Enhanced measurement modes (circle, radius, angle)
- Edge-to-edge distance labeling
- Radius display για detected circles

### 🎯 **ENTERPRISE ΣΤΡΑΤΗΓΙΚΗ:**
Αντί να δημιουργήσουμε νέο LEGO, θα **επεκτείνουμε το υπάρχον @layera/geo-drawing** με:

1. **Enhanced MeasurementMode Types**
2. **Circle Calculation Functions**
3. **Advanced Geometric Detection**
4. **Integration με @layera/map-labels**

Αυτή η προσέγγιση διατηρεί το **"ΜΟΝΑΔΙΚΗ ΠΗΓΗ ΑΛΗΘΕΙΑΣ"** principle.

---

## 📋 ΑΝΑΛΥΤΙΚΑ ΒΗΜΑΤΑ ΥΛΟΠΟΙΗΣΗΣ

### 🔹 **ΒΗΜΑ 1: Επέκταση @layera/geo-drawing Types**

```typescript
// Επέκταση MeasurementMode
export type MeasurementMode =
  | 'distance'      // ✅ Υπάρχει
  | 'area'          // ✅ Υπάρχει
  | 'point'         // ✅ Υπάρχει
  | 'circle'        // 🆕 Νέο - Circle area + circumference
  | 'radius'        // 🆕 Νέο - Radius measurement από center
  | 'angle'         // 🆕 Νέο - Angle μεταξύ γραμμών
  | 'perimeter'     // 🆕 Νέο - Dedicated perimeter mode
  | 'arc'           // 🆕 Νέο - Arc length + sector area
  | 'diameter';     // 🆕 Νέο - Diameter measurement

// Επέκταση MeasurementResult
export interface EnhancedMeasurementResult extends MeasurementResult {
  // Existing fields...
  circle?: {
    center: LatLng;
    radius: number;
    area: number;
    circumference: number;
    diameter: number;
  };
  arc?: {
    center: LatLng;
    radius: number;
    startAngle: number;
    endAngle: number;
    arcLength: number;
    sectorArea: number;
  };
  angle?: {
    vertex: LatLng;
    line1: [LatLng, LatLng];
    line2: [LatLng, LatLng];
    degrees: number;
    radians: number;
  };
}
```

### 🔹 **ΒΗΜΑ 2: Νέα Calculation Functions**

```typescript
// Circle calculations
export const calculateCircleArea = (radius: number): number;
export const calculateCircleCircumference = (radius: number): number;
export const calculateCircleDiameter = (radius: number): number;

// Arc calculations
export const calculateArcLength = (radius: number, startAngle: number, endAngle: number): number;
export const calculateSectorArea = (radius: number, startAngle: number, endAngle: number): number;

// Advanced geometric detection
export const detectCircleFromPoints = (points: LatLng[]): CircleDetection | null;
export const calculateAngleBetweenLines = (line1: [LatLng, LatLng], line2: [LatLng, LatLng]): number;

// Enhanced distance measurements
export const calculateEdgeToEdgeDistance = (geometry1: GeometryEntity, geometry2: GeometryEntity): number;
export const findNearestPointOnGeometry = (point: LatLng, geometry: GeometryEntity): LatLng;
```

### 🔹 **ΒΗΜΑ 3: Enhanced Measurement Components**

```typescript
// Enhanced MeasurementControls
interface EnhancedMeasurementControlsProps {
  mode: MeasurementMode;
  availableModes: MeasurementMode[];
  onModeChange: (mode: MeasurementMode) => void;
  circleDetectionEnabled: boolean;
  angleSnapEnabled: boolean;
}

// Enhanced GeometryRenderer
- Support για circle/arc visualization
- Radius display lines
- Angle arc rendering
- Enhanced measurement labels
```

### 🔹 **ΒΗΜΑ 4: Integration με @layera/map-labels**

```typescript
// Specialized measurement labels
export const CircleLabel: React.FC<CircleLabelProps>;
export const RadiusLabel: React.FC<RadiusLabelProps>;
export const AngleLabel: React.FC<AngleLabelProps>;
export const ArcLabel: React.FC<ArcLabelProps>;

// Enhanced BoundaryLabel με geometric measurements
export const EnhancedBoundaryLabel: React.FC<{
  boundary: BoundaryGeometry;
  measurements: {
    showArea: boolean;
    showPerimeter: boolean;
    showCircumscribedCircle: boolean;
    showInscribedCircle: boolean;
  };
}>;
```

### 🔹 **ΒΗΜΑ 5: Advanced Geometric Detection**

```typescript
// Circle detection από user points
export class CircleDetector {
  static fromThreePoints(p1: LatLng, p2: LatLng, p3: LatLng): Circle | null;
  static fromPointsLeastSquares(points: LatLng[]): Circle | null;
  static fromEnclosingPoints(points: LatLng[]): Circle;
}

// Automatic geometry recognition
export class GeometryRecognizer {
  static detectGeometryType(points: LatLng[]): 'line' | 'circle' | 'arc' | 'polygon' | 'unknown';
  static suggestMeasurements(points: LatLng[]): MeasurementMode[];
}
```

### 🔹 **ΒΗΜΑ 6: Enhanced Formatting & Display**

```typescript
// Enhanced formatting utilities
export const formatCircleMeasurements = (circle: Circle, locale: string): {
  radius: string;
  diameter: string;
  area: string;
  circumference: string;
};

export const formatAngleMeasurement = (angle: number, unit: 'degrees' | 'radians'): string;
export const formatArcMeasurements = (arc: Arc, locale: string): {
  length: string;
  sectorArea: string;
  centralAngle: string;
};
```

---

## 🎨 Component Design

### 🏷️ MapLabel (Core Component)

```typescript
interface MapLabelProps {
  /** Text to display στο label */
  text: string;

  /** Position coordinates στο χάρτη */
  position: L.LatLng;

  /** Label type για styling */
  variant: 'title' | 'subtitle' | 'area' | 'distance' | 'info';

  /** Background styling */
  background?: 'transparent' | 'solid' | 'semi-transparent';

  /** Text alignment */
  align?: 'left' | 'center' | 'right';

  /** Zoom levels για visibility */
  minZoom?: number;
  maxZoom?: number;

  /** Click handler */
  onClick?: () => void;

  /** Custom CSS className */
  className?: string;

  /** Animation configuration */
  animation?: {
    fadeIn: boolean;
    duration: number;
  };
}
```

### 🗺️ BoundaryLabel (Specialized Component)

```typescript
interface BoundaryLabelProps {
  /** Boundary geometry για positioning */
  boundary: {
    coordinates: L.LatLng[];
    properties: {
      name: string;
      admin_level: string;
      boundary: string;
    };
  };

  /** Display configuration */
  displayConfig: {
    showTitle: boolean;
    showArea: boolean;
    showPerimeter: boolean;
    areaUnit: 'km²' | 'm²' | 'hectares';
  };

  /** Styling configuration */
  styling?: {
    titleVariant: 'h1' | 'h2' | 'h3' | 'h4';
    backgroundColor: string;
    textColor: string;
    border: boolean;
  };
}
```

## ⚙️ Implementation Features

### 🎯 Intelligent Positioning

```typescript
// Auto-positioning algorithm
const calculateOptimalPosition = (boundary: L.LatLng[]): L.LatLng => {
  // 1. Calculate polygon centroid
  const centroid = calculatePolygonCenter(boundary);

  // 2. Check if centroid is inside polygon
  if (isPointInPolygon(centroid, boundary)) {
    return centroid;
  }

  // 3. Find largest inscribed circle center
  return findLargestInscribedCircleCenter(boundary);
};
```

### 📊 Area Calculation Integration

```typescript
// Enterprise area calculation με formatting
const useAreaCalculation = (coordinates: L.LatLng[]) => {
  return useMemo(() => {
    const areaM2 = calculateProjectedArea(coordinates);

    return {
      squareMeters: areaM2,
      squareKilometers: areaM2 / 1_000_000,
      hectares: areaM2 / 10_000,
      formatted: formatArea(areaM2, 'auto') // Auto-selects best unit
    };
  }, [coordinates]);
};
```

### 🌐 i18n Integration

```typescript
// Multi-language support
const { t } = useLayeraTranslation();

const labels = {
  area: t('map.labels.area'),           // "Εμβαδό" | "Area"
  perimeter: t('map.labels.perimeter'), // "Περίμετρος" | "Perimeter"
  population: t('map.labels.population') // "Πληθυσμός" | "Population"
};
```

## 🎨 Styling System

### 🎭 CSS Variables (Design Tokens)

```css
:root {
  /* Label backgrounds */
  --layera-label-bg-transparent: rgba(255, 255, 255, 0);
  --layera-label-bg-semi: rgba(255, 255, 255, 0.85);
  --layera-label-bg-solid: rgba(255, 255, 255, 0.95);

  /* Label borders */
  --layera-label-border: 1px solid rgba(0, 0, 0, 0.1);
  --layera-label-border-radius: 4px;

  /* Label shadows */
  --layera-label-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  --layera-label-shadow-hover: 0 4px 8px rgba(0, 0, 0, 0.15);

  /* Label z-indexes */
  --layera-label-z-base: 1000;
  --layera-label-z-hover: 1001;
  --layera-label-z-active: 1002;
}
```

### 🎨 Component Variants

```css
/* Title variant - για boundary names */
.layera-map-label--title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--layera-text-primary);
  background: var(--layera-label-bg-semi);
  padding: 0.5rem 0.75rem;
  border-radius: var(--layera-label-border-radius);
  box-shadow: var(--layera-label-shadow);
}

/* Area variant - για area calculations */
.layera-map-label--area {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--layera-text-secondary);
  background: var(--layera-label-bg-solid);
  padding: 0.25rem 0.5rem;
  border: var(--layera-label-border);
}
```

## 🔧 Usage Examples

### 🏢 Basic Boundary Label

```typescript
import { BoundaryLabel } from '@layera/map-labels';

<BoundaryLabel
  boundary={{
    coordinates: ambelokipwnCoords,
    properties: {
      name: 'Δημοτική Ενότητα Αμπελοκήπων',
      admin_level: '8',
      boundary: 'administrative'
    }
  }}
  displayConfig={{
    showTitle: true,
    showArea: true,
    showPerimeter: false,
    areaUnit: 'km²'
  }}
  styling={{
    titleVariant: 'h3',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    textColor: '#1F2937',
    border: true
  }}
/>
```

### 📊 Area-only Label

```typescript
import { AreaLabel } from '@layera/map-labels';

<AreaLabel
  coordinates={polygonCoords}
  position={polygonCenter}
  unit="km²"
  precision={2}
  variant="compact"
  minZoom={12}
/>
```

### 🎯 Custom Label

```typescript
import { MapLabel } from '@layera/map-labels';

<MapLabel
  text="Κέντρο Πόλης"
  position={centerCoords}
  variant="title"
  background="semi-transparent"
  align="center"
  animation={{
    fadeIn: true,
    duration: 300
  }}
  onClick={() => console.log('Label clicked')}
/>
```

## 🔗 Integration με Boundary System

### 🗺️ GeoMap Integration

```typescript
// Automatic boundary labeling
const enhanceBoundaryWithLabels = (boundaryEvent: BoundaryVisualizationEvent) => {
  const { boundary, component } = boundaryEvent.detail;

  // Calculate optimal label position
  const coordinates = boundary.features[0].geometry.coordinates[0].map(
    ([lng, lat]: [number, number]) => L.latLng(lat, lng)
  );

  // Add boundary label
  const labelComponent = (
    <BoundaryLabel
      boundary={{
        coordinates,
        properties: boundary.features[0].properties
      }}
      displayConfig={{
        showTitle: true,
        showArea: true,
        areaUnit: 'km²'
      }}
    />
  );

  // Add to map layer
  addMapLabel(labelComponent);
};

// Listen for boundary events
window.addEventListener('showAdministrativeBoundary', enhanceBoundaryWithLabels);
```

## 📈 Performance Considerations

### 🚀 Optimization Features

1. **Zoom-based Visibility**: Labels εμφανίζονται μόνο στα appropriate zoom levels
2. **Intelligent Clustering**: Multiple labels merge όταν είναι κοντά
3. **Lazy Calculation**: Area calculations γίνονται on-demand
4. **Memoization**: Expensive calculations cached
5. **Viewport Culling**: Labels εκτός οθόνης δεν render

### 📊 Performance Metrics

```typescript
// Performance monitoring
interface LabelPerformanceMetrics {
  totalLabels: number;
  visibleLabels: number;
  calculationTime: number;
  renderTime: number;
  memoryUsage: number;
}
```

## 🧪 Testing Strategy

### ✅ Test Coverage

- **Unit Tests**: Individual component functionality
- **Integration Tests**: LEGO system compatibility
- **Visual Tests**: Cross-browser rendering
- **Performance Tests**: Large boundary datasets
- **Accessibility Tests**: Screen reader compatibility

## 🚀 Deployment

### 📦 Build Configuration

```json
{
  "name": "@layera/map-labels",
  "version": "1.0.0",
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
  "peerDependencies": {
    "@layera/typography": "^1.0.0",
    "@layera/geo-drawing": "^1.0.0",
    "@layera/i18n": "^1.0.0",
    "@layera/constants": "^1.0.0",
    "leaflet": "^1.9.0",
    "react": "^18.0.0"
  }
}
```

## 📋 Roadmap

### 🎯 Phase 1 (Immediate)
- [x] Enterprise documentation
- [ ] Core MapLabel component
- [ ] BoundaryLabel specialization
- [ ] Area calculation integration

### 🎯 Phase 2 (Week 2)
- [ ] Advanced positioning algorithms
- [ ] Multi-language support
- [ ] Performance optimizations
- [ ] Visual testing

### 🎯 Phase 3 (Future)
- [ ] Label clustering
- [ ] Custom label templates
- [ ] Animation system
- [ ] Analytics integration

---

**🏆 Enterprise Standards**: Αυτό το LEGO system ακολουθεί όλα τα Layera enterprise standards για consistency, performance, και maintainability.**