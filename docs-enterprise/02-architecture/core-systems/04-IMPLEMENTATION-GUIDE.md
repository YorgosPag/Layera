# 🛠️ LAYERA GEO-DRAWING - IMPLEMENTATION GUIDE

*Τελευταία ενημέρωση: 18 Οκτωβρίου 2025*
*Step-by-Step Implementation Instructions με Complete LEGO Integration*

---

## 📚 **COMPLETE DOCUMENTATION NAVIGATION**

### **🗺️ Geo-Drawing Architecture Series:**
1. **[🗺️ GEO-DRAWING CURRENT STATE](./01-CURRENT-STATE-ANALYSIS.md)** - Geo-spatial Systems Analysis
2. **[🎯 GEO-DRAWING TARGET](./02-TARGET-ARCHITECTURE.md)** - Drawing Canvas Vision
3. **[🔄 GEO-DRAWING MIGRATION](./03-MIGRATION-STRATEGY.md)** - Drawing System Migration
4. **[🛠️ GEO-DRAWING IMPLEMENTATION](./04-IMPLEMENTATION-GUIDE.md)** ← *You are here*

### **🧩 Related Pipeline Architecture:**
5. **[📊 PIPELINE CURRENT STATE](../pipeline-architecture/01-CURRENT-STATE-ANALYSIS.md)** - System Analysis & Readiness
6. **[🏗️ PIPELINE TARGET](../pipeline-architecture/02-TARGET-ARCHITECTURE.md)** - LEGO-Style Pipeline Vision
7. **[🔄 PIPELINE MIGRATION](../pipeline-architecture/03-MIGRATION-STRATEGY.md)** - Step-by-step Transition Plan
8. **[🛠️ PIPELINE IMPLEMENTATION](../pipeline-architecture/04-IMPLEMENTATION-GUIDE.md)** - Detailed Developer Instructions
9. **[📁 FILE PROCESSING SYSTEMS](../pipeline-architecture/05-FILE-PROCESSING-LEGO-SYSTEMS.md)** - Advanced LEGO Components

### **📋 Strategic Documents:**
10. **[🎯 CORE STRATEGY](../../strategy/LAYERA_CORE_STRATEGY.md)** - Business Architecture & Dual Categories
11. **[🏠 REAL ESTATE ANALYSIS](../../strategy/REAL_ESTATE_ANALYSIS.md)** - Property Market Strategy
12. **[💼 JOBS ANALYSIS](../../strategy/JOBS_ANALYSIS.md)** - Employment Market Strategy

### **🧩 LEGO Systems & Quality Assurance:**
13. **[🧩 LEGO COMPLIANCE AUDIT](../core-systems/LEGO_COMPLIANCE_AUDIT_REPORT.md)** - 100% LEGO Implementation Audit
14. **[🏗️ LAYOUT SYSTEM IMPLEMENTATION](../core-systems/LAYERA_LAYOUT_SYSTEM_IMPLEMENTATION.md)** - Layout Components
15. **[🧩 GEO-DRAWING COMPLETE](../core-systems/GEO_DRAWING_IMPLEMENTATION_COMPLETE.md)** - Geo-Drawing Systems
16. **[🏗️ MAIN ARCHITECTURE](../ARCHITECTURE.md)** - Core System Architecture

---

## 🚨 **ΑΥΣΤΗΡΗ ΠΟΛΙΤΙΚΗ - COMPLETE LEGO SYSTEMS INTEGRATION!**

### **🧩 ΥΠΟΧΡΕΩΤΙΚΗ χρήση ΌΛΩΝ των 17 LAYERA LEGO συστημάτων:**

```typescript
// ✅ COMPLETE LEGO SYSTEMS INTEGRATION - ΚΑΜΙΑ εξαίρεση!

// Core UI Components
import { Card, CardHeader, CardContent } from '@layera/cards';
import { Button, IconButton, PrimaryButton, SecondaryButton } from '@layera/buttons';
import { Input, Dropdown, FormField, Select, Textarea } from '@layera/forms';
import { Heading, Text, Caption, Label, Paragraph } from '@layera/typography';
import { Container, Grid, Stack, Flex, Spacer } from '@layera/layout';

// Advanced UI Components
import { DataTable, TableColumn, TablePagination } from '@layera/tables';
import { Modal, Dialog, Drawer, DialogContent } from '@layera/modals';
import { LoadingSpinner, SkeletonCard, ProgressBar } from '@layera/loading';
import { toast, showNotification, NotificationProvider } from '@layera/notifications';

// Visual & Interactive Elements
import {
  MapIcon, PolygonIcon, CircleIcon, MarkerIcon, RulerIcon,
  EditIcon, SaveIcon, TrashIcon, ExportIcon, ImportIcon,
  ArrowLeftIcon, ArrowRightIcon, CheckIcon, CancelIcon,
  SettingsIcon, InfoIcon, WarningIcon, SuccessIcon
} from '@layera/icons';

// Logic & State Management
import { useLayeraTranslation } from '@layera/i18n/hooks';
import { useAuth } from '@layera/auth-bridge/hooks';
import { useTheme } from '@layera/theme-switcher/hooks';

// Infrastructure & Utilities
import { ErrorBoundary } from '@layera/error-boundary';
import { CONSTANTS } from '@layera/constants';

// 🚨 ΑΠΑΓΟΡΕΥΕΤΑΙ:
// ❌ Custom UI components: <div className="la-component">
// ❌ Hardcoded strings: "Draw Polygon", "Μέτρηση Εμβαδού"
// ❌ Magic numbers: radius: 100, precision: 2
// ❌ Any types: geoData: any
// ❌ Custom icons: <svg>...</svg>
// ❌ Theme-unaware styling: backgroundColor: "var(--la-color-primary)"
// ❌ Non-i18n text: alert("Drawing completed")
```

### **🎯 LEGO-FIRST DEVELOPMENT:**
- **Πριν γράψεις κώδικα**: Έλεγξε ποια από τα 17 LEGO systems χρειάζεσαι
- **Για UI**: @layera/cards + @layera/layout + @layera/typography + @layera/icons
- **Για κείμενο**: @layera/i18n ΜΟΝΟ - ΚΑΜΙΑ hardcoded string
- **Για values**: @layera/constants ΜΟΝΟ - ΚΑΜΙΑ magic number
- **Για actions**: @layera/buttons + @layera/notifications
- **Για data**: @layera/tables + @layera/loading
- **Για διάλογους**: @layera/modals
- **Για authentication**: @layera/auth-bridge
- **Για themes**: @layera/theme-switcher
- **OLD_geo-canvas**: ΜΟΝΟ για αναφορά - ΟΧΙ copy-paste κώδικα!

---

## 🎯 **IMPLEMENTATION ROADMAP**

### **📋 Implementation Checklist:**
```
Week 1-2: Package Setup & LEGO Integration    ✅ Foundation με όλα τα 17 systems
Week 3-4: Component Development               🧩 LEGO-compliant geo components
Week 5-6: Advanced Features & Testing        🔄 Enterprise functionality
Week 7-8: Pipeline Integration & Deployment  🚀 Production ready
```

---

## 🏗️ **WEEK 1-2: PACKAGE SETUP & COMPLETE LEGO INTEGRATION**

### **🎯 Goal**: Create @layera/geo-drawing με ΠΛΗΡΗ integration όλων των LEGO systems

#### **Day 1-2: Package Structure με LEGO Dependencies**

**Step 1.1: Create Package Structure**
```bash
# Create comprehensive package structure
mkdir -p packages/geo-drawing/src/{components,hooks,utils,types,constants,locales,styles,tests}
mkdir -p packages/geo-drawing/src/components/{canvas,measurements,controls,dialogs,forms}
mkdir -p packages/geo-drawing/src/hooks/{drawing,measurements,validation,export,context}
mkdir -p packages/geo-drawing/src/utils/{calculations,projections,formatters,validators}
mkdir -p packages/geo-drawing/src/types/{drawing,measurements,shapes,export}
mkdir -p packages/geo-drawing/tests/{components,hooks,utils,integration}
mkdir -p packages/geo-drawing/docs/{api,examples,guides}
```

**Step 1.2: Package.json με ALL 16 LEGO Dependencies**
```json
{
  "name": "@layera/geo-drawing",
  "version": "1.0.0",
  "description": "Enterprise geo-drawing system με complete LEGO integration",
  "type": "module",
  "main": "dist/index.cjs",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./hooks": {
      "import": "./dist/hooks/index.js",
      "types": "./dist/hooks/index.d.ts"
    },
    "./utils": {
      "import": "./dist/utils/index.js",
      "types": "./dist/utils/index.d.ts"
    }
  },
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts",
    "dev": "tsup src/index.ts --format cjs,esm --dts --watch",
    "typecheck": "tsc --noEmit",
    "lint": "eslint \"src/**/*.{ts,tsx}\" --max-warnings 0",
    "test": "vitest",
    "test:coverage": "vitest --coverage"
  },
  "dependencies": {
    // Core Geo Libraries
    "leaflet": "^1.9.4",
    "@turf/turf": "^6.5.0",
    "proj4": "^2.9.2",
    "leaflet-draw": "^1.0.4",
    "leaflet-measure": "^3.1.0",

    // ALL 16 LAYERA LEGO SYSTEMS - ΥΠΟΧΡΕΩΤΙΚΑ!
    "@layera/cards": "workspace:*",              // ✅ 1. UI Cards
    "@layera/buttons": "workspace:*",            // ✅ 2. Action Buttons
    "@layera/forms": "workspace:*",              // ✅ 3. Input Forms
    "@layera/typography": "workspace:*",         // ✅ 4. Text Display
    "@layera/layout": "workspace:*",             // ✅ 5. Layout System
    "@layera/icons": "workspace:*",              // ✅ 6. Icon System
    "@layera/tables": "workspace:*",             // ✅ 7. Data Tables
    "@layera/loading": "workspace:*",            // ✅ 8. Loading States
    "@layera/modals": "workspace:*",             // ✅ 9. Dialog System
    "@layera/notifications": "workspace:*",      // ✅ 10. Notifications
    "@layera/i18n": "workspace:*",               // ✅ 11. Internationalization
    "@layera/auth-bridge": "workspace:*",        // ✅ 12. Authentication
    "@layera/theme-switcher": "workspace:*",     // ✅ 13. Theme System
    "@layera/constants": "workspace:*",          // ✅ 14. Constants
    "@layera/error-boundary": "workspace:*",     // ✅ 15. Error Handling
    "@layera/viewport": "workspace:*"            // ✅ 16. Viewport Control
  },
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  },
  "devDependencies": {
    "@types/leaflet": "^1.9.0",
    "@types/react": "^18.2.0",
    "typescript": "^5.0.0",
    "tsup": "^7.2.0",
    "vitest": "^1.0.0",
    "eslint": "^8.0.0"
  }
}
```

#### **Day 3-4: Complete i18n Setup με @layera/i18n**

**Step 1.3: Comprehensive Translation Files**
```json
// packages/geo-drawing/src/locales/el.json
{
  "geo": {
    "drawing": {
      "title": "Σχεδίαση Γεωγραφικής Περιοχής",
      "subtitle": "Σχεδιάστε πολύγωνα, κύκλους και σημεία στον χάρτη",
      "modes": {
        "polygon": "Σχεδίαση Πολυγώνου",
        "circle": "Σχεδίαση Κύκλου",
        "marker": "Τοποθέτηση Σημείου",
        "edit": "Επεξεργασία Σχήματος",
        "delete": "Διαγραφή Σχήματος"
      },
      "instructions": {
        "polygon": {
          "start": "Κάντε κλικ για να ξεκινήσετε το πολύγωνο",
          "continue": "Κάντε κλικ για προσθήκη σημείου",
          "finish": "Διπλό κλικ για ολοκλήρωση"
        },
        "circle": {
          "center": "Κάντε κλικ για το κέντρο του κύκλου",
          "radius": "Σύρετε για ρύθμιση της ακτίνας"
        },
        "marker": {
          "place": "Κάντε κλικ για τοποθέτηση σημείου"
        },
        "general": {
          "esc_cancel": "Πατήστε ESC για ακύρωση",
          "right_click_menu": "Δεξί κλικ για μενού επιλογών"
        }
      },
      "actions": {
        "save": "Αποθήκευση",
        "cancel": "Ακύρωση",
        "clear": "Καθαρισμός",
        "export": "Εξαγωγή",
        "import": "Εισαγωγή",
        "undo": "Αναίρεση",
        "redo": "Επανάληψη",
        "edit": "Επεξεργασία",
        "delete": "Διαγραφή",
        "duplicate": "Αντιγραφή"
      }
    },
    "measurements": {
      "title": "Μετρήσεις",
      "subtitle": "Ακριβείς υπολογισμοί εμβαδού και απόστασης",
      "properties": {
        "area": "Εμβαδόν",
        "perimeter": "Περίμετρος",
        "distance": "Απόσταση",
        "radius": "Ακτίνα",
        "diameter": "Διάμετρος",
        "circumference": "Περιφέρεια",
        "center": "Κέντρο",
        "coordinates": "Συντεταγμένες"
      },
      "statistics": {
        "total_shapes": "Σύνολο Σχημάτων",
        "total_area": "Συνολικό Εμβαδόν",
        "total_length": "Συνολικό Μήκος",
        "average_area": "Μέσο Εμβαδόν"
      }
    },
    "units": {
      "distance": {
        "meters": "μέτρα",
        "kilometers": "χιλιόμετρα",
        "feet": "πόδια",
        "miles": "μίλια"
      },
      "area": {
        "square_meters": "τετραγωνικά μέτρα",
        "hectares": "εκτάρια",
        "square_kilometers": "τετραγωνικά χιλιόμετρα",
        "acres": "acres",
        "square_feet": "τετραγωνικά πόδια"
      },
      "coordinates": {
        "degrees": "μοίρες",
        "decimal_degrees": "δεκαδικές μοίρες",
        "dms": "μοίρες, λεπτά, δευτερόλεπτα"
      }
    },
    "validation": {
      "errors": {
        "minimum_points": "Απαιτούνται τουλάχιστον {{count}} σημεία",
        "invalid_shape": "Μη έγκυρο σχήμα",
        "self_intersecting": "Το πολύγωνο δεν μπορεί να τέμνει τον εαυτό του",
        "area_too_large": "Το εμβαδόν είναι πολύ μεγάλο (μέγιστο: {{max}})",
        "area_too_small": "Το εμβαδόν είναι πολύ μικρό (ελάχιστο: {{min}})",
        "radius_too_large": "Η ακτίνα είναι πολύ μεγάλη (μέγιστο: {{max}})",
        "radius_too_small": "Η ακτίνα είναι πολύ μικρή (ελάχιστο: {{min}})"
      },
      "warnings": {
        "complex_shape": "Σύνθετο σχήμα - οι υπολογισμοί μπορεί να αργούν",
        "precision_loss": "Πιθανή απώλεια ακρίβειας σε αυτό το επίπεδο zoom"
      }
    },
    "export": {
      "title": "Εξαγωγή Γεωγραφικών Δεδομένων",
      "subtitle": "Εξάγετε τα σχήματά σας σε διάφορες μορφές",
      "formats": {
        "geojson": {
          "name": "GeoJSON",
          "description": "Πρότυπη μορφή για γεωγραφικά δεδομένα"
        },
        "kml": {
          "name": "KML",
          "description": "Μορφή Google Earth"
        },
        "shapefile": {
          "name": "Shapefile",
          "description": "Μορφή ESRI GIS"
        },
        "csv": {
          "name": "CSV",
          "description": "Πίνακας συντεταγμένων"
        },
        "gpx": {
          "name": "GPX",
          "description": "Μορφή GPS"
        }
      },
      "options": {
        "include_measurements": "Συμπερίληψη μετρήσεων",
        "coordinate_system": "Σύστημα συντεταγμένων",
        "precision": "Ακρίβεια δεκαδικών"
      }
    },
    "context": {
      "property": {
        "offer": {
          "title": "Οριοθέτηση Ακινήτου",
          "description": "Σχεδιάστε το ακριβές περίγραμμα του ακινήτου"
        },
        "search": {
          "title": "Περιοχή Αναζήτησης",
          "description": "Ορίστε την περιοχή που σας ενδιαφέρει"
        }
      },
      "job": {
        "offer": {
          "title": "Τοποθεσία Εργασίας",
          "description": "Ορίστε την τοποθεσία της θέσης εργασίας"
        },
        "search": {
          "title": "Περιοχή Αναζήτησης Εργασίας",
          "description": "Ορίστε την περιοχή που ψάχνετε για εργασία"
        }
      }
    }
  }
}

// packages/geo-drawing/src/locales/en.json
{
  "geo": {
    "drawing": {
      "title": "Geographic Area Drawing",
      "subtitle": "Draw polygons, circles and markers on the map",
      // ... complete English translations
    }
  }
}
```

#### **Day 5-7: Constants Integration με @layera/constants**

**Step 1.4: Comprehensive Constants Setup**
```typescript
// packages/geo-drawing/src/constants/index.ts
import { CONSTANTS as LAYERA_CONSTANTS } from '@layera/constants';

export const GEO_DRAWING_CONSTANTS = {
  // Inherit από main constants
  ...LAYERA_CONSTANTS,

  // Geo-specific constants
  GEO_DRAWING: {
    // Default Values
    DEFAULTS: {
      DRAWING_MODE: 'polygon' as const,
      MEASUREMENT_UNITS: 'metric' as const,
      COORDINATE_PRECISION: 6,
      MEASUREMENT_PRECISION: 2,
      CIRCLE_RADIUS: 100, // meters
      POLYGON_MIN_POINTS: 3,
      MAX_POLYGON_POINTS: 1000,
      SIMPLIFICATION_TOLERANCE: 1, // meters
    },

    // Measurement Units
    UNITS: {
      DISTANCE: {
        METRIC: ['meters', 'kilometers'] as const,
        IMPERIAL: ['feet', 'miles'] as const,
        NAUTICAL: ['nautical_miles'] as const,
      },
      AREA: {
        METRIC: ['square_meters', 'hectares', 'square_kilometers'] as const,
        IMPERIAL: ['square_feet', 'acres', 'square_miles'] as const,
      },
      COORDINATES: {
        FORMATS: ['decimal_degrees', 'degrees_minutes_seconds', 'utm'] as const,
      },
    },

    // Drawing Modes Configuration
    MODES: [
      {
        value: 'polygon',
        labelKey: 'geo.drawing.modes.polygon',
        icon: 'PolygonIcon',
        description: 'geo.drawing.modes.polygon_description',
        minPoints: 3,
        maxPoints: 1000,
      },
      {
        value: 'circle',
        labelKey: 'geo.drawing.modes.circle',
        icon: 'CircleIcon',
        description: 'geo.drawing.modes.circle_description',
        minRadius: 1,
        maxRadius: 50000,
      },
      {
        value: 'marker',
        labelKey: 'geo.drawing.modes.marker',
        icon: 'MarkerIcon',
        description: 'geo.drawing.modes.marker_description',
        allowRadius: true,
        defaultRadius: 50,
      },
    ] as const,

    // Coordinate Systems
    PROJECTIONS: {
      WGS84: {
        code: 'EPSG:4326',
        name: 'WGS 84',
        description: 'World Geodetic System 1984',
      },
      WEB_MERCATOR: {
        code: 'EPSG:3857',
        name: 'Web Mercator',
        description: 'Web Mercator Projection',
      },
      GREEK_GRID: {
        code: 'EPSG:2100',
        name: 'GGRS87 / Greek Grid',
        description: 'Greek Geodetic Reference System 1987',
      },
    },

    // Export Formats
    EXPORT_FORMATS: [
      {
        value: 'geojson',
        extension: '.geojson',
        mimeType: 'application/geo+json',
        labelKey: 'geo.export.formats.geojson.name',
        descriptionKey: 'geo.export.formats.geojson.description',
      },
      {
        value: 'kml',
        extension: '.kml',
        mimeType: 'application/vnd.google-earth.kml+xml',
        labelKey: 'geo.export.formats.kml.name',
        descriptionKey: 'geo.export.formats.kml.description',
      },
      {
        value: 'shapefile',
        extension: '.zip',
        mimeType: 'application/zip',
        labelKey: 'geo.export.formats.shapefile.name',
        descriptionKey: 'geo.export.formats.shapefile.description',
      },
    ] as const,

    // Validation Rules
    VALIDATION: {
      AREA: {
        MIN: 1, // square meters
        MAX: 1000000000, // square meters (1000 km²)
        WARNING_THRESHOLD: 100000000, // 100 km²
      },
      DISTANCE: {
        MIN: 0.1, // meters
        MAX: 100000, // meters (100 km)
        WARNING_THRESHOLD: 50000, // 50 km
      },
      COORDINATES: {
        LATITUDE: { MIN: -90, MAX: 90 },
        LONGITUDE: { MIN: -180, MAX: 180 },
      },
    },

    // Performance Limits
    PERFORMANCE: {
      MAX_VERTICES_BEFORE_SIMPLIFICATION: 500,
      MAX_SHAPES_BEFORE_VIRTUALIZATION: 100,
      RENDER_THROTTLE_MS: 16, // 60fps
      CALCULATION_DEBOUNCE_MS: 100,
    },

    // Theme Colors (integrated με @layera/theme-switcher)
    COLORS: {
      DRAWING: {
        ACTIVE_STROKE: 'var(--layera-color-primary)',
        ACTIVE_FILL: 'var(--layera-color-primary-alpha-20)',
        HOVER_STROKE: 'var(--layera-color-primary-light)',
        COMPLETED_STROKE: 'var(--layera-color-success)',
        COMPLETED_FILL: 'var(--layera-color-success-alpha-10)',
        ERROR_STROKE: 'var(--layera-color-error)',
        MEASUREMENT_TEXT: 'var(--layera-color-text-primary)',
      },
    },

    // Context-Aware Defaults
    CONTEXT_DEFAULTS: {
      property: {
        offer: {
          mode: 'polygon',
          precision: 2,
          units: 'metric',
          description: 'geo.context.property.offer.description',
        },
        search: {
          mode: 'circle',
          radius: 1000,
          units: 'metric',
          description: 'geo.context.property.search.description',
        },
      },
      job: {
        offer: {
          mode: 'marker',
          radius: 50,
          units: 'metric',
          description: 'geo.context.job.offer.description',
        },
        search: {
          mode: 'circle',
          radius: 5000,
          units: 'metric',
          description: 'geo.context.job.search.description',
        },
      },
    },
  },
} as const;

// Type-safe constant access
export type DrawingMode = typeof GEO_DRAWING_CONSTANTS.GEO_DRAWING.MODES[number]['value'];
export type ExportFormat = typeof GEO_DRAWING_CONSTANTS.GEO_DRAWING.EXPORT_FORMATS[number]['value'];
export type MeasurementUnit =
  | typeof GEO_DRAWING_CONSTANTS.GEO_DRAWING.UNITS.DISTANCE.METRIC[number]
  | typeof GEO_DRAWING_CONSTANTS.GEO_DRAWING.UNITS.AREA.METRIC[number];
```

---

## 🧩 **WEEK 3-4: LEGO-COMPLIANT COMPONENT DEVELOPMENT**

### **🎯 Goal**: Create all geo-drawing components με complete LEGO integration

#### **Day 1-3: Main Drawing Canvas Component**

**Step 2.1: DrawingCanvas με Full LEGO Integration**
```typescript
// packages/geo-drawing/src/components/canvas/DrawingCanvas.tsx
import { useLayeraTranslation } from '@layera/tolgee';
// ✅ Use LEGO hooks and utilities;
import L from 'leaflet';

// COMPLETE LEGO SYSTEMS INTEGRATION
import { Card, CardHeader, CardContent } from '@layera/cards';
import { Container, Grid, Stack, Flex } from '@layera/layout';
import { Heading, Text, Caption } from '@layera/typography';
import { LoadingSpinner, SkeletonCard } from '@layera/loading';
import { MapIcon, InfoIcon } from '@layera/icons';
import { useLayeraTranslation } from '@layera/i18n/hooks';
import { useAuth } from '@layera/auth-bridge/hooks';
import { useTheme } from '@layera/theme-switcher/hooks';
import { ErrorBoundary } from '@layera/error-boundary';
import { toast } from '@layera/notifications';

import { GEO_DRAWING_CONSTANTS } from '../../constants';
import { useGeoDrawing } from '../../hooks/drawing/useGeoDrawing';
import { DrawingControls } from '../controls/DrawingControls';
import { MeasurementDisplay } from '../measurements/MeasurementDisplay';

import type { DrawingCanvasProps, DrawnShape } from '../../types';

export const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  mode = GEO_DRAWING_CONSTANTS.GEO_DRAWING.DEFAULTS.DRAWING_MODE,
  onComplete,
  onError,
  context,
  disabled = false,
  className,
  ...props
}) => {
  const { t } = useLayeraTranslation('geo-drawing');
  const { user, hasRole } = useAuth();
  const { currentTheme, isDarkMode } = useTheme();

  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    drawing,
    measurements,
    isDrawing,
    isValid,
    startDrawing,
    finishDrawing,
    cancelDrawing,
    clearAll,
  } = useGeoDrawing({
    mode,
    context,
    onComplete: (shape: DrawnShape) => {
      toast.success(t('geo.drawing.completed'));
      onComplete?.(shape);
    },
    onError: (err: Error) => {
      const errorMessage = t('geo.drawing.error', { error: err.message });
      toast.error(errorMessage);
      setError(errorMessage);
      onError?.(err);
    },
  });

  // Initialize Leaflet map με theme integration
  useEffect(() => {
    if (!mapRef.current) return;

    const initializeMap = async () => {
      try {
        setIsLoading(true);

        // Theme-aware map initialization
        const mapOptions: L.MapOptions = {
          center: [37.9755, 23.7348], // Athens default
          zoom: 10,
          preferCanvas: true,
          // Theme-aware styling
          ...(isDarkMode && {
            className: 'leaflet-dark-theme',
          }),
        };

        const map = L.map(mapRef.current, mapOptions);

        // Theme-aware tile layer
        const tileLayer = isDarkMode
          ? L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
              attribution: '© Stadia Maps',
            })
          : L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '© OpenStreetMap contributors',
            });

        tileLayer.addTo(map);

        setIsLoading(false);
      } catch (err) {
        setError(t('geo.drawing.initialization_error'));
        setIsLoading(false);
      }
    };

    initializeMap();
  }, [isDarkMode, t]);

  // Role-based access control
  if (!hasRole('user')) {
    return (
      <ErrorBoundary>
        <Card>
          <CardContent>
            <Stack spacing="md" align="center">
              <InfoIcon size="lg" color="warning" />
              <Text>{t('auth.unauthorized')}</Text>
            </Stack>
          </CardContent>
        </Card>
      </ErrorBoundary>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Flex align="center" gap="md">
            <MapIcon size="lg" />
            <Heading level={2}>{t('geo.drawing.title')}</Heading>
          </Flex>
        </CardHeader>
        <CardContent>
          <Stack spacing="lg" align="center">
            <LoadingSpinner size="lg" />
            <Text>{t('geo.drawing.loading')}</Text>
            <SkeletonCard height="var(--la-height-xl)" />
          </Stack>
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <ErrorBoundary>
        <Card>
          <CardContent>
            <Stack spacing="md" align="center">
              <InfoIcon size="lg" color="error" />
              <Text color="error">{error}</Text>
            </Stack>
          </CardContent>
        </Card>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <Container maxWidth="full" className={className} {...props}>
        <Grid spacing="lg">
          {/* Main Drawing Interface */}
          <Card>
            <CardHeader>
              <Flex align="center" justify="space-between">
                <Flex align="center" gap="md">
                  <MapIcon size="lg" />
                  <Stack spacing="xs">
                    <Heading level={2}>{t('geo.drawing.title')}</Heading>
                    <Caption>{t('geo.drawing.subtitle')}</Caption>
                  </Stack>
                </Flex>

                {user && (
                  <Text variant="caption" color="muted">
                    {user.email}
                  </Text>
                )}
              </Flex>
            </CardHeader>

            <CardContent>
              <Stack spacing="lg">
                {/* Drawing Controls */}
                <DrawingControls
                  mode={mode}
                  isDrawing={isDrawing}
                  isValid={isValid}
                  onStart={startDrawing}
                  onFinish={finishDrawing}
                  onCancel={cancelDrawing}
                  onClear={clearAll}
                  disabled={disabled}
                />

                {/* Map Canvas */}
                <Card variant="outlined">
                  <CardContent padding="none">
                    <div
                      ref={mapRef}
                      style={{ padding: 'var(--la-space-md)' }}
                      data-testid="geo-drawing-canvas"
                    />
                  </CardContent>
                </Card>

                {/* Instructions */}
                <Card variant="subtle">
                  <CardContent>
                    <Stack spacing="sm">
                      <Text variant="small" weight="medium">
                        {t('geo.drawing.instructions.title')}
                      </Text>
                      <Text variant="small" color="muted">
                        {t(`geo.drawing.instructions.${mode}.start`)}
                      </Text>
                      <Text variant="small" color="muted">
                        {t('geo.drawing.instructions.general.esc_cancel')}
                      </Text>
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </CardContent>
          </Card>

          {/* Measurements Panel */}
          {drawing && (
            <MeasurementDisplay
              shape={drawing}
              measurements={measurements}
              units={GEO_DRAWING_CONSTANTS.GEO_DRAWING.DEFAULTS.MEASUREMENT_UNITS}
            />
          )}
        </Grid>
      </Container>
    </ErrorBoundary>
  );
};

// Default export με proper typing
export default DrawingCanvas;
```

#### **Day 4-5: Measurement Display με @layera/tables**

**Step 2.2: MeasurementDisplay Component**
```typescript
// packages/geo-drawing/src/components/measurements/MeasurementDisplay.tsx
import React from 'react';

// COMPLETE LEGO INTEGRATION
import { Card, CardHeader, CardContent } from '@layera/cards';
import { Stack, Flex } from '@layera/layout';
import { Heading, Text } from '@layera/typography';
import { DataTable, TableColumn } from '@layera/tables';
import { SkeletonCard } from '@layera/loading';
import { RulerIcon, InfoIcon } from '@layera/icons';
import { useLayeraTranslation } from '@layera/i18n/hooks';
import { ErrorBoundary } from '@layera/error-boundary';

import { GEO_DRAWING_CONSTANTS } from '../../constants';
import { formatMeasurement } from '../../utils/formatters';

import type { MeasurementDisplayProps, MeasurementRow } from '../../types';

export const MeasurementDisplay: React.FC<MeasurementDisplayProps> = ({
  shape,
  measurements,
  units = GEO_DRAWING_CONSTANTS.GEO_DRAWING.DEFAULTS.MEASUREMENT_UNITS,
  showStatistics = true,
  loading = false,
}) => {
  const { t } = useLayeraTranslation('geo-drawing');

  // Prepare table data
  const measurementRows: MeasurementRow[] = React.useMemo(() => {
    if (!measurements) return [];

    const rows: MeasurementRow[] = [];

    if (measurements.area) {
      rows.push({
        id: 'area',
        property: t('geo.measurements.properties.area'),
        value: measurements.area.value,
        unit: measurements.area.unit,
        formattedValue: formatMeasurement(measurements.area.value, measurements.area.unit, t),
        precision: measurements.area.precision,
      });
    }

    if (measurements.perimeter) {
      rows.push({
        id: 'perimeter',
        property: t('geo.measurements.properties.perimeter'),
        value: measurements.perimeter.value,
        unit: measurements.perimeter.unit,
        formattedValue: formatMeasurement(measurements.perimeter.value, measurements.perimeter.unit, t),
        precision: measurements.perimeter.precision,
      });
    }

    if (measurements.distance) {
      rows.push({
        id: 'distance',
        property: t('geo.measurements.properties.distance'),
        value: measurements.distance.value,
        unit: measurements.distance.unit,
        formattedValue: formatMeasurement(measurements.distance.value, measurements.distance.unit, t),
        precision: measurements.distance.precision,
      });
    }

    if (measurements.radius) {
      rows.push({
        id: 'radius',
        property: t('geo.measurements.properties.radius'),
        value: measurements.radius.value,
        unit: measurements.radius.unit,
        formattedValue: formatMeasurement(measurements.radius.value, measurements.radius.unit, t),
        precision: measurements.radius.precision,
      });
    }

    return rows;
  }, [measurements, t]);

  // Table columns configuration
  const columns: TableColumn<MeasurementRow>[] = [
    {
      key: 'property',
      label: t('geo.measurements.property'),
      sortable: false,
      width: '40%',
    },
    {
      key: 'formattedValue',
      label: t('geo.measurements.value'),
      sortable: true,
      width: '40%',
      render: (row) => (
        <Text weight="medium" font="mono">
          {row.formattedValue}
        </Text>
      ),
    },
    {
      key: 'precision',
      label: t('geo.measurements.precision'),
      sortable: false,
      width: '20%',
      render: (row) => (
        <Text variant="small" color="muted">
          ±{row.precision}%
        </Text>
      ),
    },
  ];

  // Loading state
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Flex align="center" gap="md">
            <RulerIcon size="md" />
            <Heading level={3}>{t('geo.measurements.title')}</Heading>
          </Flex>
        </CardHeader>
        <CardContent>
          <SkeletonCard count={3} height="var(--la-height-sm)" />
        </CardContent>
      </Card>
    );
  }

  // Empty state
  if (!measurements || measurementRows.length === 0) {
    return (
      <Card>
        <CardHeader>
          <Flex align="center" gap="md">
            <RulerIcon size="md" />
            <Heading level={3}>{t('geo.measurements.title')}</Heading>
          </Flex>
        </CardHeader>
        <CardContent>
          <Stack spacing="md" align="center">
            <InfoIcon size="lg" color="muted" />
            <Text color="muted">{t('geo.measurements.no_data')}</Text>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  return (
    <ErrorBoundary>
      <Card>
        <CardHeader>
          <Stack spacing="xs">
            <Flex align="center" gap="md">
              <RulerIcon size="md" />
              <Heading level={3}>{t('geo.measurements.title')}</Heading>
            </Flex>
            <Text variant="small" color="muted">
              {t('geo.measurements.subtitle')}
            </Text>
          </Stack>
        </CardHeader>

        <CardContent>
          <Stack spacing="lg">
            {/* Main Measurements Table */}
            <DataTable
              columns={columns}
              data={measurementRows}
              loading={loading ? <SkeletonCard count={3} /> : undefined}
              pagination={false}
              searchable={false}
              sortable={true}
              striped={true}
              size="sm"
            />

            {/* Statistics Summary */}
            {showStatistics && shape && (
              <Card variant="subtle">
                <CardContent>
                  <Stack spacing="sm">
                    <Text variant="small" weight="medium">
                      {t('geo.measurements.summary')}
                    </Text>
                    <Flex wrap gap="md">
                      <Text variant="small" color="muted">
                        {t('geo.measurements.shape_type')}: {t(`geo.drawing.modes.${shape.type}`)}
                      </Text>
                      <Text variant="small" color="muted">
                        {t('geo.measurements.points_count')}: {shape.coordinates.length}
                      </Text>
                      <Text variant="small" color="muted">
                        {t('geo.measurements.created')}: {new Date(shape.metadata.createdAt).toLocaleString()}
                      </Text>
                    </Flex>
                  </Stack>
                </CardContent>
              </Card>
            )}
          </Stack>
        </CardContent>
      </Card>
    </ErrorBoundary>
  );
};

export default MeasurementDisplay;
```

---

## 📊 **WEEK 5-6: ADVANCED FEATURES & COMPLETE LEGO INTEGRATION**

### **🎯 Goal**: Implement advanced features με full enterprise capabilities

#### **Day 1-3: Export Dialog με @layera/modals**

**Step 3.1: Export Functionality**
```typescript
// packages/geo-drawing/src/components/dialogs/ExportDialog.tsx
import { useLayeraTranslation } from '@layera/tolgee';
// ✅ Use LEGO hooks and utilities;

// COMPLETE LEGO INTEGRATION
import { Modal, Dialog, DialogContent, DialogHeader, DialogFooter } from '@layera/modals';
import { Button, PrimaryButton, SecondaryButton } from '@layera/buttons';
import { FormField, Select, Dropdown, Input } from '@layera/forms';
import { Stack, Flex, Grid } from '@layera/layout';
import { Heading, Text, Label } from '@layera/typography';
import { LoadingSpinner } from '@layera/loading';
import { ExportIcon, DownloadIcon, CheckIcon } from '@layera/icons';
import { useLayeraTranslation } from '@layera/i18n/hooks';
import { toast } from '@layera/notifications';
import { ErrorBoundary } from '@layera/error-boundary';

import { GEO_DRAWING_CONSTANTS } from '../../constants';
import { useExport } from '../../hooks/export/useExport';

import type { ExportDialogProps, ExportOptions } from '../../types';

export const ExportDialog: React.FC<ExportDialogProps> = ({
  isOpen,
  onClose,
  shapes,
  defaultFormat = 'geojson',
}) => {
  const { t } = useLayeraTranslation('geo-drawing');
  const [options, setOptions] = useState<ExportOptions>({
    format: defaultFormat,
    includeMeasurements: true,
    coordinateSystem: 'EPSG:4326',
    precision: GEO_DRAWING_CONSTANTS.GEO_DRAWING.DEFAULTS.COORDINATE_PRECISION,
  });

  const {
    exportShapes,
    isExporting,
    progress,
    error,
  } = useExport();

  const handleExport = async () => {
    try {
      const exportData = await exportShapes(shapes, options);

      // Download file
      const blob = new Blob([exportData.content], { type: exportData.mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = exportData.filename;
      link.click();
      URL.revokeObjectURL(url);

      toast.success(t('geo.export.success', { format: options.format }));
      onClose();
    } catch (err) {
      toast.error(t('geo.export.error', { error: err.message }));
    }
  };

  const formatOptions = GEO_DRAWING_CONSTANTS.GEO_DRAWING.EXPORT_FORMATS.map(format => ({
    value: format.value,
    label: t(format.labelKey),
    description: t(format.descriptionKey),
  }));

  const coordinateSystemOptions = Object.entries(GEO_DRAWING_CONSTANTS.GEO_DRAWING.PROJECTIONS).map(
    ([key, projection]) => ({
      value: projection.code,
      label: projection.name,
      description: projection.description,
    })
  );

  return (
    <ErrorBoundary>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <Dialog>
          <DialogHeader>
            <Flex align="center" gap="md">
              <ExportIcon size="lg" />
              <Stack spacing="xs">
                <Heading level={2}>{t('geo.export.title')}</Heading>
                <Text variant="small" color="muted">
                  {t('geo.export.subtitle')}
                </Text>
              </Stack>
            </Flex>
          </DialogHeader>

          <DialogContent>
            <Stack spacing="lg">
              {/* Export Format Selection */}
              <FormField>
                <Label required>{t('geo.export.format')}</Label>
                <Select
                  value={options.format}
                  options={formatOptions}
                  onChange={(format) => setOptions(prev => ({ ...prev, format }))}
                  renderOption={(option) => (
                    <Stack spacing="xs">
                      <Text weight="medium">{option.label}</Text>
                      <Text variant="small" color="muted">{option.description}</Text>
                    </Stack>
                  )}
                />
              </FormField>

              {/* Export Options */}
              <Grid cols={GRID_COLUMNS.TWO} spacing="lg">
                <FormField>
                  <Label>{t('geo.export.coordinate_system')}</Label>
                  <Dropdown
                    value={options.coordinateSystem}
                    options={coordinateSystemOptions}
                    onChange={(coordinateSystem) =>
                      setOptions(prev => ({ ...prev, coordinateSystem }))
                    }
                  />
                </FormField>

                <FormField>
                  <Label>{t('geo.export.precision')}</Label>
                  <Input
                    type="number"
                    value={options.precision}
                    min={1}
                    max={15}
                    onChange={(e) =>
                      setOptions(prev => ({
                        ...prev,
                        precision: parseInt(e.target.value)
                      }))
                    }
                  />
                </FormField>
              </Grid>

              {/* Advanced Options */}
              <Card variant="subtle">
                <CardContent>
                  <Stack spacing="md">
                    <Text weight="medium">{t('geo.export.advanced_options')}</Text>

                    <FormField>
                      <Label>
                        <input
                          type="checkbox"
                          checked={options.includeMeasurements}
                          onChange={(e) =>
                            setOptions(prev => ({
                              ...prev,
                              includeMeasurements: e.target.checked
                            }))
                          }
                        />
                        {t('geo.export.include_measurements')}
                      </Label>
                    </FormField>
                  </Stack>
                </CardContent>
              </Card>

              {/* Progress Indicator */}
              {isExporting && (
                <Card variant="subtle">
                  <CardContent>
                    <Stack spacing="md" align="center">
                      <LoadingSpinner size="md" />
                      <Text>{t('geo.export.processing')}</Text>
                      {progress && (
                        <Text variant="small" color="muted">
                          {Math.round(progress)}%
                        </Text>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              )}

              {/* Error Display */}
              {error && (
                <Card variant="error">
                  <CardContent>
                    <Text color="error">{error}</Text>
                  </CardContent>
                </Card>
              )}
            </Stack>
          </DialogContent>

          <DialogFooter>
            <Flex justify="space-between" align="center">
              <Text variant="small" color="muted">
                {t('geo.export.shapes_count', { count: shapes.length })}
              </Text>

              <Flex gap="md">
                <SecondaryButton
                  onClick={onClose}
                  disabled={isExporting}
                >
                  {t('geo.export.cancel')}
                </SecondaryButton>

                <PrimaryButton
                  onClick={handleExport}
                  disabled={isExporting || shapes.length === 0}
                  icon={isExporting ? <LoadingSpinner size="sm" /> : <DownloadIcon />}
                >
                  {isExporting
                    ? t('geo.export.exporting')
                    : t('geo.export.download')
                  }
                </PrimaryButton>
              </Flex>
            </Flex>
          </DialogFooter>
        </Dialog>
      </Modal>
    </ErrorBoundary>
  );
};

export default ExportDialog;
```

---

## 🚀 **WEEK 7-8: PIPELINE INTEGRATION & PRODUCTION DEPLOYMENT**

### **🎯 Goal**: Complete integration με pipeline system και production readiness

#### **Final Pipeline Integration:**

```typescript
// Usage σε pipeline step
import { GeoDrawingPipelineStep } from '@layera/geo-drawing';

const PropertyLocationStep: React.FC = () => {
  const { t } = useLayeraTranslation();

  return (
    <GeoDrawingPipelineStep
      mode="polygon"
      context={{
        category: 'property',
        intent: 'offer',
        description: t('pipeline.property.location.description')
      }}
      onComplete={(shape) => {
        // Continue pipeline
        proceedToNextStep({ location: shape });
      }}
    />
  );
};
```

### **📊 Production Readiness Checklist:**

- **✅ All 17 LEGO systems integrated** και tested
- **✅ Complete i18n coverage** με Greek και English
- **✅ Theme support** για light/dark modes
- **✅ Role-based access control** integration
- **✅ Comprehensive error handling** με notifications
- **✅ Performance optimization** με lazy loading
- **✅ Full TypeScript compliance** με strict mode
- **✅ 90%+ test coverage** με unit και integration tests
- **✅ Complete documentation** με API docs και examples

**Το @layera/geo-drawing είναι έτοιμο να γίνει το 17ο LEGO σύστημα!** 🎯

---

*📝 Next Steps: Pipeline Integration & Production Deployment*