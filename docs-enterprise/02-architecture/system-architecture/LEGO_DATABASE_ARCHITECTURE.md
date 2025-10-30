# 🏗️ Layera LEGO Database Architecture
**Enterprise Modular Database System**

> Πλήρης αρθρωτή αρχιτεκτονική database που επιτρέπει την ανεξάρτητη λειτουργία κάθε LEGO system

## 📊 Ανάλυση Υπάρχουσας Κατάστασης

### Τρέχοντα LEGO Packages (37 total)
```
✅ Frontend LEGOs (UI Components)
├── @layera/buttons
├── @layera/cards
├── @layera/forms
├── @layera/icons
├── @layera/layout
├── @layera/loading
├── @layera/modals
├── @layera/notifications
├── @layera/tables
├── @layera/typography
└── @layera/theme-switcher

✅ Geo/Map LEGOs (Spatial Systems)
├── @layera/geo-core
├── @layera/geo-drawing
├── @layera/geo-mapping
├── @layera/geocoding
├── @layera/map-labels
├── @layera/osm
└── @layera/snap-interactions

✅ Business Logic LEGOs
├── @layera/address-breakdown
├── @layera/auth-bridge
├── @layera/domain
├── @layera/pipelines
└── @layera/services

✅ Utility LEGOs
├── @layera/canvas-transforms
├── @layera/cad-processing
├── @layera/constants
├── @layera/error-boundary
├── @layera/file-compression
├── @layera/file-import
├── @layera/file-transformation
├── @layera/file-upload
├── @layera/i18n
├── @layera/responsive-design
├── @layera/snap-engine
├── @layera/styles
└── @layera/viewport
```

### Database Usage Analysis
```
❌ ΔΕΝ υπάρχει κεντρικό database layer
❌ ΔΕΝ υπάρχει isolated namespace per LEGO
❌ Firebase functions μόνο για auth (functions/src/index.ts)
❌ ΔΕΝ υπάρχει Firestore integration στα packages
❌ Hardcoded fallbacks αντί για database caching
```

## 🎯 Προτεινόμενη Αρχιτεκτονική

### 1. Database Namespace Structure
```
firestore/
├── lego_boundary_service/       # @layera/boundary-service (NEW)
│   ├── boundaries_cache/
│   ├── request_queue/
│   └── usage_analytics/
│
├── lego_geocoding/              # @layera/geocoding
│   ├── geocode_cache/
│   ├── reverse_geocode_cache/
│   └── search_history/
│
├── lego_geo_drawing/            # @layera/geo-drawing
│   ├── saved_drawings/
│   ├── measurement_history/
│   └── user_preferences/
│
├── lego_map_labels/             # @layera/map-labels
│   ├── label_templates/
│   ├── custom_styles/
│   └── label_cache/
│
├── lego_auth/                   # @layera/auth-bridge
│   ├── user_profiles/
│   ├── sessions/
│   └── permissions/
│
├── lego_file_upload/            # @layera/file-upload
│   ├── upload_history/
│   ├── file_metadata/
│   └── processing_queue/
│
├── lego_notifications/          # @layera/notifications
│   ├── notification_queue/
│   ├── user_preferences/
│   └── delivery_history/
│
└── lego_events/                 # Event Bus System (NEW)
    ├── event_stream/
    ├── event_subscriptions/
    └── event_history/
```

### 2. Core Database Package
```typescript
// packages/database-core/src/index.ts
export interface DatabaseConfig {
  namespace: string;
  version: string;
  collections: CollectionSchema[];
  indexes: IndexDefinition[];
  migrations: MigrationStrategy[];
}

export class LegoDatabase {
  constructor(config: DatabaseConfig);
  collection(name: string): FirestoreCollection;
  transaction(fn: TransactionFn): Promise<void>;
  migrate(toVersion: string): Promise<void>;
  backup(): Promise<BackupResult>;
  uninstall(): Promise<void>;
}
```

## 🚀 Implementation Roadmap

### Phase 1: Database Core Infrastructure (Week 1)
1. **Create @layera/database-core package**
   - Isolated namespace management
   - Transaction support
   - Migration framework
   - Backup/restore utilities

2. **Create @layera/event-bus package**
   - Inter-LEGO communication
   - Event persistence
   - Subscription management

3. **Setup Firestore structure**
   - Create namespace conventions
   - Define security rules template
   - Setup composite indexes

### Phase 2: LEGO Migration (Week 2-3)
1. **Priority 1 - Geo/Map LEGOs**
   - @layera/boundary-service (NEW)
   - @layera/geocoding → add caching
   - @layera/geo-drawing → add persistence
   - @layera/map-labels → add templates

2. **Priority 2 - Core Business LEGOs**
   - @layera/auth-bridge → user profiles
   - @layera/notifications → queue system
   - @layera/file-upload → metadata storage

3. **Priority 3 - Analytics LEGOs**
   - Usage tracking per LEGO
   - Performance metrics
   - Error logging

### Phase 3: Integration & Testing (Week 4)
1. **Integration patterns**
   - Hook-based data fetching
   - Real-time subscriptions
   - Offline-first strategy

2. **Testing infrastructure**
   - Unit tests per LEGO database
   - Integration tests for events
   - Performance benchmarks

3. **Documentation**
   - API documentation
   - Migration guides
   - Best practices

## 📝 Implementation Details

### Step 1: Create Database Core Package
```bash
# Create new package
mkdir -p packages/database-core/src
cd packages/database-core

# Initialize package
npm init -y

# Install dependencies
npm install firebase-admin @firebase/firestore-types

# Create structure
mkdir src/{namespaces,migrations,backup,utils}
```

### Step 2: Implement Namespace Isolation
```typescript
// packages/database-core/src/namespaces/namespace.ts
import { Firestore } from '@firebase/firestore-types';

export class DatabaseNamespace {
  private namespace: string;
  private db: Firestore;

  constructor(legoName: string, db: Firestore) {
    this.namespace = `lego_${legoName}`;
    this.db = db;
  }

  collection(name: string) {
    return this.db.collection(`${this.namespace}/${name}`);
  }

  async clear() {
    // Clear all collections in namespace
  }

  async exists(): Promise<boolean> {
    // Check if namespace has data
  }
}
```

### Step 3: Event Bus Implementation
```typescript
// packages/event-bus/src/index.ts
export interface LegoEvent {
  id: string;
  source: string;
  type: string;
  data: unknown;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

export class EventBus {
  async publish(event: Omit<LegoEvent, 'id' | 'timestamp'>): Promise<void>;
  subscribe(type: string, handler: EventHandler): Unsubscribe;
  async replay(from: Date, to: Date): Promise<LegoEvent[]>;
}
```

### Step 4: LEGO Database Integration Pattern
```typescript
// packages/geocoding/src/database.ts
import { LegoDatabase } from '@layera/database-core';

export class GeocodingDatabase extends LegoDatabase {
  constructor() {
    super({
      namespace: 'geocoding',
      version: '1.0.0',
      collections: [
        {
          name: 'geocode_cache',
          schema: GeocodeSchema,
          indexes: [{ fields: ['query', 'language'], unique: true }]
        }
      ]
    });
  }

  async getCachedGeocode(query: string, language: string) {
    return this.collection('geocode_cache')
      .where('query', '==', query)
      .where('language', '==', language)
      .get();
  }
}
```

## 🔒 Security Rules Template
```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Per-LEGO namespace rules
    match /lego_{lego}/{document=**} {
      allow read: if isAuthenticated();
      allow write: if isLegoOwner(lego) || isAdmin();
    }

    // Event bus - read-only for clients
    match /lego_events/{document=**} {
      allow read: if isAuthenticated();
      allow write: if false; // Server-only writes
    }
  }
}
```

## 🎯 Success Metrics
- ✅ Zero cross-LEGO database dependencies
- ✅ Clean uninstall per LEGO
- ✅ < 100ms cache retrieval
- ✅ Automatic migrations
- ✅ 100% type safety
- ✅ Offline-first capability

## 🚨 Critical Considerations
1. **Backup Strategy**: Automated daily backups per namespace
2. **Cost Management**: Monitor Firestore usage per LEGO
3. **Migration Safety**: Blue-green deployments
4. **GDPR Compliance**: Data isolation helps with user data deletion
5. **Performance**: Composite indexes for common queries

## 📈 Next Steps
1. ✅ Analyze existing codebase
2. ✅ Create architecture documentation
3. ⏳ Implement database-core package
4. ⏳ Create boundary-service with database
5. ⏳ Migrate existing LEGOs progressively
6. ⏳ Setup monitoring & analytics

---
**Document Version**: 1.0.0
**Last Updated**: ${new Date().toISOString()}
**Author**: Layera Architecture Team