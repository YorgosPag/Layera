# @layera/geo-mapping

OSM services, administrative boundaries, και external mapping APIs για το Layera ecosystem.

## 📦 Enterprise Architecture

Αυτό το package αποτελεί το **Business Domain Layer** της Layera geo architecture:

```
Layer 3: Feature Modules
├── @layera/map-module       ← uses geo-mapping
├── @layera/search-module    ← uses geo-mapping
└── @layera/admin-module

Layer 2: Business Domain Packages (THIS PACKAGE)
├── @layera/geo-mapping      ← OSM services & boundaries
├── @layera/geo-drawing      ← depends on geo-mapping
├── @layera/geo-analytics    ← may use geo-mapping
└── @layera/auth-core

Layer 1: Foundation
└── @layera/geo-core         ← provides types for geo-mapping
```

## Σκοπός

- **OSM Integration**: Seamless integration με OpenStreetMap Overpass API
- **Administrative Boundaries**: Fetching και caching για Ελληνικές διοικητικές ενότητες
- **Building Outlines**: Fetching building geometry για snapping functionality
- **Enterprise Caching**: In-memory caching για performance
- **Type Safety**: Αυστηρά TypeScript types από @layera/geo-core

## Μεταφορά από geo-drawing

Αυτό το package περιέχει τις OSM services που προηγουμένως ήταν στο `@layera/geo-drawing/services/osmService.ts`.

**Enterprise Benefits:**
- ✅ Separation of concerns: Drawing ≠ Data fetching
- ✅ Reusability: Άλλα packages μπορούν να χρησιμοποιήσουν OSM services
- ✅ Independent deployment: OSM services μπορούν να ενημερώνονται ανεξάρτητα
- ✅ Better testing: Isolated testing για mapping functionality

## 📚 API

### OSM Building Services
```typescript
import { fetchBuildingOutlines } from '@layera/geo-mapping';
import L from 'leaflet';

const bounds = L.latLngBounds([40.6, 22.9], [40.7, 23.0]);
const buildings = await fetchBuildingOutlines(bounds);
```

### Administrative Boundaries
```typescript
import {
  fetchAdministrativeBoundary,
  fetchBoundaryByAddressComponent
} from '@layera/geo-mapping';

// Fetch specific administrative level
const boundary = await fetchAdministrativeBoundary('Θεσσαλονίκη', 8);

// Smart search across admin levels
const smartBoundary = await fetchBoundaryByAddressComponent('Μητροπολιτική Ενότητα Θεσσαλονίκης');
```

### Cache Management
```typescript
import {
  getCacheSize,
  clearOSMCache,
  isBoundsCached,
  prefetchBuildingOutlines
} from '@layera/geo-mapping';

// Cache management
console.log(`Cache size: ${getCacheSize()} entries`);
clearOSMCache();

// Performance optimization
const isCached = isBoundsCached(bounds);
if (!isCached) {
  await prefetchBuildingOutlines(bounds);
}
```

## 🗂️ Coordinate Processing

Το package περιέχει τη βελτιωμένη λογική για coordinate ordering που λύνει το πρόβλημα των μπερδεμένων polygons:

```typescript
// Automatic way segment connection
// Handles forward/reverse segment ordering
// Removes duplicates με tolerance
// Closes polygons properly
```

**Λύση για OSM Coordinate Ordering:**
- Συνδέει way segments με τη σωστή σειρά
- Αντιστρέφει segments όταν χρειάζεται
- Αφαιρεί duplicate coordinates
- Κλείνει polygons σωστά

## 🔧 Configuration

```typescript
// Uses @layera/constants for configuration
import { CONFIG } from '@layera/constants';

// OSM service settings
CONFIG.osm.overpassApiUrl
CONFIG.osm.requestTimeout
```

## 📋 Types

Χρησιμοποιεί τα επίσημα types από `@layera/geo-core`:

```typescript
import type {
  OSMBuildingCollection,
  OSMAdminCollection,
  OSMBuildingFeature,
  OSMAdminFeature
} from '@layera/geo-core';
```

## 🔄 Migration Guide

### Από geo-drawing σε geo-mapping

**Παλιό import:**
```typescript
import { fetchBuildingOutlines } from '@layera/geo-drawing';
```

**Νέο import:**
```typescript
import { fetchBuildingOutlines } from '@layera/geo-mapping';
```

**Backward compatibility:** Το `@layera/geo-drawing` θα re-export τα OSM services μέχρι να ολοκληρωθεί η migration.

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

- **@layera/geo-core**: Provides types και utilities
- **@layera/geo-drawing**: Uses OSM services για snapping
- **@layera/address-breakdown**: Uses boundary fetching
- **@layera/constants**: Configuration settings

---

*Part of the Layera Enterprise Geo Architecture - Business Domain Layer*