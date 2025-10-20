# @layera/geo-core

Core types, interfaces και utilities για όλο το Layera geo ecosystem.

## 📦 Enterprise Architecture

Αυτό το package αποτελεί το **Foundation Layer** της Layera geo architecture:

```
Layer 3: Feature Modules
├── @layera/map-module
├── @layera/search-module
└── @layera/admin-module

Layer 2: Business Domain Packages
├── @layera/geo-mapping      ← depends on geo-core
├── @layera/geo-drawing      ← depends on geo-core
├── @layera/geo-analytics    ← depends on geo-core
└── @layera/auth-core

Layer 1: Foundation (THIS PACKAGE)
└── @layera/geo-core         ← Base types & utilities
```

## 🎯 Στόχος

- **Zero διπλότυπα**: Κάθε type/interface υπάρχει μόνο εδώ
- **Type safety**: Αυστηρά TypeScript types χωρίς `any`
- **Interoperability**: Συμβατότητα με Leaflet και GeoJSON standards
- **Enterprise ready**: Scalable architecture για μεγάλες εφαρμογές

## 📚 Exports

### Types
```typescript
import {
  GeometryType,
  GeoPoint,
  GeoBounds,
  MeasurementMode,
  DrawingState,
  AdminLevel,
  GeoJSONFeature,
  GeoJSONFeatureCollection,
  OSMBuildingProperties,
  OSMAdminProperties
} from '@layera/geo-core';
```

### Interfaces
```typescript
import {
  MeasurementPoint,
  MeasurementResult,
  DrawingConfig,
  CanvasInteractionEvent,
  SnapResult
} from '@layera/geo-core';
```

### Utilities
```typescript
import {
  calculateDistance,
  calculatePolygonArea,
  calculateCenter,
  calculateBounds,
  isPointInBounds
} from '@layera/geo-core';
```

## 🔧 Χρήση

```typescript
import type { GeoPoint, GeoBounds } from '@layera/geo-core';
import { calculateDistance, calculateCenter } from '@layera/geo-core';

// Type-safe geo operations
const point1: GeoPoint = { lat: 40.6401, lng: 22.9444 };
const point2: GeoPoint = { lat: 37.9755, lng: 23.7348 };

const distance = calculateDistance(
  { lat: point1.lat, lng: point1.lng } as LatLng,
  { lat: point2.lat, lng: point2.lng } as LatLng
);
```

## 🌍 Leaflet Integration

Το package είναι designed να λειτουργεί seamlessly με Leaflet:

```typescript
import L from 'leaflet';
import type { MeasurementPoint } from '@layera/geo-core';

const measurementPoint: MeasurementPoint = {
  id: 'point-1',
  latlng: L.latLng(40.6401, 22.9444),
  label: 'Thessaloniki',
  index: 0
};
```

## 📋 TypeScript Configuration

Το package requires strict TypeScript settings:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

## 🔄 Dependencies

- **@layera/constants**: Workspace constants
- **leaflet**: Peer dependency για map types
- **Μόνο types**: Δεν περιέχει runtime dependencies για performance

## 🚀 Development

```bash
# Build the package
npm run build

# Type checking
npm run typecheck

# Development με watch mode
npm run dev
```

## 📖 Related Packages

- **@layera/geo-mapping**: OSM services, administrative boundaries
- **@layera/geo-drawing**: Drawing tools, geometry rendering
- **@layera/geo-analytics**: Measurements, calculations
- **@layera/geocoding**: Address search και geocoding

---

*Part of the Layera Enterprise Geo Architecture*