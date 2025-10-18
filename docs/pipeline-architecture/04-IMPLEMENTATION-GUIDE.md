# 🛠️ LAYERA PIPELINE - IMPLEMENTATION GUIDE

*Τελευταία ενημέρωση: 18 Οκτωβρίου 2025*
*Step-by-Step Implementation Instructions*

---

## 🚨 **ΑΥΣΤΗΡΗ ΠΟΛΙΤΙΚΗ - LEGO SYSTEMS ΜΟΝΟ!**

### **🧩 ΥΠΟΧΡΕΩΤΙΚΗ χρήση LAYERA LEGO συστημάτων:**

```typescript
// ✅ ΜΟΝΑΔΙΚΕΣ ΠΗΓΕΣ ΑΛΗΘΕΙΑΣ - ΚΑΜΙΑ άλλη εισαγωγή UI components!
import { Card, CardHeader, CardContent } from '@layera/cards';
import { Button, IconButton, PrimaryButton, SecondaryButton } from '@layera/buttons';
import { Input, Dropdown, FormField, Select, Textarea, Checkbox, NumericInput, Slider, DatePicker, InputGroup } from '@layera/forms';
import { Heading, Text, Caption, Label, Paragraph } from '@layera/typography';
import { Container, Grid, Stack, Flex, Spacer } from '@layera/layout';
import { DataTable, TableColumn, TablePagination } from '@layera/tables';
import { Modal, Dialog, Drawer, DialogContent } from '@layera/modals';
import { LoadingSpinner, SkeletonCard, ProgressBar } from '@layera/loading';
import { toast, showNotification, NotificationProvider } from '@layera/notifications';
import {
  HomeIcon, PlusIcon, SearchIcon, MapIcon, CheckIcon,
  ArrowLeftIcon, ArrowRightIcon, EditIcon, DeleteIcon,
  UploadIcon, DownloadIcon, SettingsIcon, UserIcon
} from '@layera/icons';
import { useLayeraTranslation } from '@layera/i18n/hooks';
import { useAuth } from '@layera/auth-bridge/hooks';
import { useTheme } from '@layera/theme-switcher/hooks';
import { ErrorBoundary } from '@layera/error-boundary';
import { CONSTANTS } from '@layera/constants';

// 🗺️ CRITICAL: GEO-DRAWING LEGO SYSTEM για pipeline location features
import {
  GeoDrawingCanvas, DrawingToolbar, MeasurementDisplay,
  PolygonDrawer, CircleDrawer, MarkerPlacer, CoordinateInput,
  AreaCalculator, DistanceCalculator, DrawingControls,
  GeoBoundary, LayerSelector, MapThemeSelector,
  useGeoDrawing, useMapInteraction
} from '@layera/geo-drawing';

// 🚨 ΑΠΑΓΟΡΕΥΕΤΑΙ:
// ❌ Custom UI components: <div className="card">
// ❌ Custom layout CSS: display: flex, grid, etc.
// ❌ Hardcoded strings: "Select Category"
// ❌ Magic numbers: timeout: 5000
// ❌ Any types: data: any
// ❌ Custom icons: <svg>...</svg>
// ❌ Σύνδεση με OLD_geo-canvas κώδικα
// ❌ Direct Leaflet.js integration (χρήση ΜΟΝΟ @layera/geo-drawing)
// ❌ Custom map implementations (χρήση ΜΟΝΟ GeoDrawingCanvas)
```

### **🎯 LEGO-FIRST DEVELOPMENT:**
- **Πριν γράψεις κώδικα**: Έλεγξε ποια LEGO components υπάρχουν
- **Αν χρειάζεσαι UI**: Χρησιμοποίησε ΜΟΝΟ @layera packages
- **Αν χρειάζεσαι layout**: @layera/layout (όχι custom CSS!)
- **Αν χρειάζεσαι εικονίδιο**: @layera/icons (όχι custom SVG!)
- **Αν χρειάζεσαι κείμενο**: @layera/i18n + translation keys
- **Αν χρειάζεσαι τιμές**: @layera/constants
- **Αν χρειάζεσαι geo features**: @layera/geo-drawing (όχι direct Leaflet!)
- **Αν χρειάζεσαι polygon/circle drawing**: GeoDrawingCanvas component
- **Αν χρειάζεσαι measurements**: MeasurementDisplay component
- **OLD_geo-canvas**: ΜΟΝΟ για αναφορά - ΟΧΙ σύνδεση κώδικα!

---

## 🎯 **IMPLEMENTATION ROADMAP**

### **📋 Implementation Checklist:**
```
Week 1-2: Core Architecture    ✅ Foundation Setup
Week 3-4: Component Library    🧩 LEGO Blocks Creation
Week 5-6: Pipeline Engine      🔄 Orchestration Logic
Week 7-8: Testing & Migration  🚀 Production Ready
```

---

## 🏗️ **WEEK 1-2: CORE ARCHITECTURE SETUP**

### **🎯 Goal**: Establish robust foundation για pipeline system

#### **Day 1-2: Project Structure & Dependencies**

**Step 1.1: Create Pipeline Package Structure**
```bash
# Create new pipeline directories
mkdir -p apps/layera-geoalert/src/pipeline/{engine,components,runtime,types,utils}
mkdir -p apps/layera-geoalert/src/pipeline/components/{universal,property,job,enterprise}
mkdir -p apps/layera-geoalert/src/pipeline/definitions
mkdir -p apps/layera-geoalert/src/pipeline/__tests__
```

**Step 1.2: Update Package Dependencies**
```json
// apps/layera-geoalert/package.json
{
  "dependencies": {
    // Existing dependencies...
    "@reduxjs/toolkit": "^2.0.1",
    "@tanstack/react-query": "^5.0.0",
    "immer": "^10.0.3",
    "rxjs": "^7.8.1",
    "uuid": "^9.0.1",
    "zod": "^3.22.4",

    // 🗺️ CRITICAL: GEO-DRAWING LEGO SYSTEM
    "@layera/geo-drawing": "workspace:*",

    // 🧩 ALL REQUIRED LAYERA LEGO SYSTEMS (17 total):
    "@layera/cards": "workspace:*",
    "@layera/buttons": "workspace:*",
    "@layera/forms": "workspace:*",
    "@layera/typography": "workspace:*",
    "@layera/layout": "workspace:*",
    "@layera/tables": "workspace:*",
    "@layera/modals": "workspace:*",
    "@layera/loading": "workspace:*",
    "@layera/notifications": "workspace:*",
    "@layera/icons": "workspace:*",
    "@layera/i18n": "workspace:*",
    "@layera/auth-bridge": "workspace:*",
    "@layera/theme-switcher": "workspace:*",
    "@layera/constants": "workspace:*",
    "@layera/error-boundary": "workspace:*",
    "@layera/viewport": "workspace:*"
  },
  "devDependencies": {
    // Existing dev dependencies...
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.1.4",
    "msw": "^2.0.0"
  }
}
```

**Step 1.3: Core Type Definitions**
```typescript
// apps/layera-geoalert/src/pipeline/types/Core.ts
export interface PipelineComponent {
  // Identity
  id: string;
  name: string;
  version: string;
  category: 'universal' | 'property' | 'job' | 'enterprise';

  // Lifecycle
  mount(context: ComponentContext): Promise<void>;
  unmount(): Promise<void>;

  // Execution
  execute(input: ComponentInput): Promise<ComponentOutput>;
  validate(input: ComponentInput): ValidationResult;

  // UI
  render(props: ComponentProps): ReactNode;

  // Dependencies
  dependencies: ComponentDependency[];
  provides: ComponentCapability[];
}

export interface Pipeline {
  id: string;
  name: string;
  version: string;
  category: 'property' | 'job' | 'universal';
  components: PipelineStep[];
  metadata: PipelineMetadata;
}

export interface PipelineStep {
  id: string;
  componentId: string;
  config: Record<string, unknown>;
  dependsOn: string[];
  condition?: string;
  parallel?: boolean;
}

export interface PipelineState {
  pipelineId: string;
  currentStep: string;
  completedSteps: string[];
  stepData: Record<string, unknown>;
  componentStates: Record<string, ComponentState>;
  metadata: StateMetadata;
}
```

#### **Day 3-4: Pipeline Engine Foundation**

**Step 1.4: Core Pipeline Engine**
```typescript
// apps/layera-geoalert/src/pipeline/engine/PipelineEngine.ts
import { PipelineComponent, Pipeline, PipelineState } from '../types/Core';

export class LayeraPipelineEngine {
  private components = new Map<string, PipelineComponent>();
  private pipelines = new Map<string, Pipeline>();
  private executionStates = new Map<string, PipelineState>();

  // Component Management
  registerComponent(component: PipelineComponent): void {
    this.validateComponent(component);
    this.components.set(component.id, component);
  }

  getComponent(componentId: string): PipelineComponent | undefined {
    return this.components.get(componentId);
  }

  listComponents(category?: ComponentCategory): PipelineComponent[] {
    const components = Array.from(this.components.values());
    return category
      ? components.filter(c => c.category === category)
      : components;
  }

  // Pipeline Management
  registerPipeline(pipeline: Pipeline): void {
    this.validatePipeline(pipeline);
    this.pipelines.set(pipeline.id, pipeline);
  }

  getPipeline(pipelineId: string): Pipeline | undefined {
    return this.pipelines.get(pipelineId);
  }

  // Execution
  async executePipeline(
    pipelineId: string,
    context: ExecutionContext
  ): Promise<PipelineResult> {
    const pipeline = this.getPipeline(pipelineId);
    if (!pipeline) {
      throw new Error(`Pipeline ${pipelineId} not found`);
    }

    const state = this.initializePipelineState(pipelineId, context);
    const executor = new PipelineExecutor(this, state);

    return executor.execute(pipeline);
  }

  // State Management
  getState(pipelineId: string): PipelineState | undefined {
    return this.executionStates.get(pipelineId);
  }

  setState(pipelineId: string, state: PipelineState): void {
    this.executionStates.set(pipelineId, state);
  }

  // Validation
  private validateComponent(component: PipelineComponent): void {
    if (!component.id || !component.name || !component.version) {
      throw new Error('Component must have id, name, and version');
    }
  }

  private validatePipeline(pipeline: Pipeline): void {
    // Validate pipeline structure
    // Check component dependencies
    // Verify no circular dependencies
  }
}
```

**Step 1.5: Pipeline Executor**
```typescript
// apps/layera-geoalert/src/pipeline/engine/PipelineExecutor.ts
export class PipelineExecutor {
  constructor(
    private engine: LayeraPipelineEngine,
    private state: PipelineState
  ) {}

  async execute(pipeline: Pipeline): Promise<PipelineResult> {
    try {
      await this.validateExecution(pipeline);

      const executionOrder = this.calculateExecutionOrder(pipeline.components);

      for (const stepId of executionOrder) {
        const step = pipeline.components.find(c => c.id === stepId);
        if (!step) continue;

        await this.executeStep(step);
        await this.saveCheckpoint();
      }

      return this.generateResult();
    } catch (error) {
      await this.handleError(error);
      throw error;
    }
  }

  private async executeStep(step: PipelineStep): Promise<void> {
    // Check dependencies
    if (!this.dependenciesMet(step)) {
      this.skipStep(step.id, 'Dependencies not met');
      return;
    }

    // Check conditions
    if (!this.conditionMet(step)) {
      this.skipStep(step.id, 'Condition not met');
      return;
    }

    // Get component
    const component = this.engine.getComponent(step.componentId);
    if (!component) {
      throw new Error(`Component ${step.componentId} not found`);
    }

    // Prepare input
    const input = this.prepareComponentInput(step);

    // Execute component
    const output = await component.execute(input);

    // Update state
    this.updateState(step.id, output);
  }

  private calculateExecutionOrder(steps: PipelineStep[]): string[] {
    // Topological sort for dependency resolution
    const graph = this.buildDependencyGraph(steps);
    return this.topologicalSort(graph);
  }
}
```

#### **Day 5-7: State Management System**

**Step 1.6: Redux Store Setup**
```typescript
// apps/layera-geoalert/src/pipeline/store/PipelineStore.ts
import { configureStore, createSlice } from '@reduxjs/toolkit';

interface PipelineStoreState {
  activePipelines: Record<string, PipelineState>;
  componentRegistry: Record<string, PipelineComponent>;
  executionHistory: ExecutionHistoryEntry[];
  currentExecution: string | null;
}

const pipelineSlice = createSlice({
  name: 'pipeline',
  initialState: {
    activePipelines: {},
    componentRegistry: {},
    executionHistory: [],
    currentExecution: null,
  } as PipelineStoreState,
  reducers: {
    startPipeline: (state, action) => {
      const { pipelineId, initialState } = action.payload;
      state.activePipelines[pipelineId] = initialState;
      state.currentExecution = pipelineId;
    },
    updatePipelineState: (state, action) => {
      const { pipelineId, updates } = action.payload;
      if (state.activePipelines[pipelineId]) {
        Object.assign(state.activePipelines[pipelineId], updates);
      }
    },
    completePipeline: (state, action) => {
      const { pipelineId, result } = action.payload;
      state.executionHistory.push({
        pipelineId,
        completedAt: new Date().toISOString(),
        result,
      });
      delete state.activePipelines[pipelineId];
      if (state.currentExecution === pipelineId) {
        state.currentExecution = null;
      }
    },
    registerComponent: (state, action) => {
      const component = action.payload;
      state.componentRegistry[component.id] = component;
    },
  },
});

export const pipelineStore = configureStore({
  reducer: {
    pipeline: pipelineSlice.reducer,
  },
});
```

**Step 1.7: React Context Integration**
```typescript
// apps/layera-geoalert/src/pipeline/context/PipelineContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { LayeraPipelineEngine } from '../engine/PipelineEngine';
import { pipelineStore } from '../store/PipelineStore';

interface PipelineContextValue {
  engine: LayeraPipelineEngine;
  store: typeof pipelineStore;
}

const PipelineContext = createContext<PipelineContextValue | null>(null);

export const PipelineProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const engine = new LayeraPipelineEngine();

  return (
    <Provider store={pipelineStore}>
      <PipelineContext.Provider value={{ engine, store: pipelineStore }}>
        {children}
      </PipelineContext.Provider>
    </Provider>
  );
};

export const usePipeline = () => {
  const context = useContext(PipelineContext);
  if (!context) {
    throw new Error('usePipeline must be used within PipelineProvider');
  }
  return context;
};
```

#### **📊 Week 1-2 Success Criteria:**
- ✅ Core types defined και validated
- ✅ Pipeline engine instantiates without errors
- ✅ State management system functional
- ✅ Basic execution flow works (empty pipeline)
- ✅ React context integration complete

---

## 🧩 **WEEK 3-4: COMPONENT LIBRARY CREATION**

### **🎯 Goal**: Extract existing wizard steps into reusable components

#### **Day 8-10: Universal Components**

**Step 2.1: Category Selector Component**
```typescript
// apps/layera-geoalert/src/pipeline/components/universal/CategorySelectorComponent.ts
import { PipelineComponent, ComponentInput, ComponentOutput } from '../../types/Core';
import { CategorySelectorUI } from './ui/CategorySelectorUI';

export class CategorySelectorComponent implements PipelineComponent {
  id = 'category-selector';
  name = 'Category Selector';
  version = '1.0.0';
  category = 'universal' as const;
  dependencies = [];
  provides = ['selectedCategory'];

  async mount(context: ComponentContext): Promise<void> {
    // Initialize component
  }

  async unmount(): Promise<void> {
    // Cleanup
  }

  async execute(input: ComponentInput): Promise<ComponentOutput> {
    return new Promise((resolve) => {
      // Business logic extracted from legacy StepCategory
      const availableCategories = this.getAvailableCategories(input);

      resolve({
        availableCategories,
        defaultSelection: input.preselected || null,
      });
    });
  }

  validate(input: ComponentInput): ValidationResult {
    if (!input.allowedCategories || !Array.isArray(input.allowedCategories)) {
      return { valid: false, errors: ['allowedCategories must be an array'] };
    }
    return { valid: true, errors: [] };
  }

  render(props: ComponentProps): ReactNode {
    return (
      <CategorySelectorUI
        categories={props.data.availableCategories}
        selected={props.data.selectedCategory}
        onSelect={(category) => props.onComplete({ selectedCategory: category })}
        {...props}
      />
    );
  }

  private getAvailableCategories(input: ComponentInput): CategoryOption[] {
    // Extract from legacy logic
    return [
      { id: 'property', name: 'Real Estate', icon: 'home' },
      { id: 'job', name: 'Jobs', icon: 'briefcase' },
    ];
  }
}
```

**Step 2.2: Category Selector UI Component**
```typescript
// apps/layera-geoalert/src/pipeline/components/universal/ui/CategorySelectorUI.tsx
import React from 'react';
import { CategoryOption } from '../../../types/Core';

interface CategorySelectorUIProps {
  categories: CategoryOption[];
  selected?: string;
  onSelect: (categoryId: string) => void;
  disabled?: boolean;
}

export const CategorySelectorUI: React.FC<CategorySelectorUIProps> = ({
  categories,
  selected,
  onSelect,
  disabled = false,
}) => {
  return (
    <div className="category-selector">
      <h2>Choose Category</h2>
      <div className="category-grid">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-button ${selected === category.id ? 'selected' : ''}`}
            onClick={() => onSelect(category.id)}
            disabled={disabled}
          >
            <div className="category-icon">{category.icon}</div>
            <div className="category-name">{category.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
```

**Step 2.3: Intent Selector Component**
```typescript
// apps/layera-geoalert/src/pipeline/components/universal/IntentSelectorComponent.ts
export class IntentSelectorComponent implements PipelineComponent {
  id = 'intent-selector';
  name = 'Intent Selector';
  version = '1.0.0';
  category = 'universal' as const;
  dependencies = ['selectedCategory'];
  provides = ['selectedIntent'];

  async execute(input: ComponentInput): Promise<ComponentOutput> {
    const category = input.selectedCategory;
    const intents = this.getIntentsForCategory(category);

    return {
      availableIntents: intents,
      category,
    };
  }

  render(props: ComponentProps): ReactNode {
    return (
      <IntentSelectorUI
        intents={props.data.availableIntents}
        category={props.data.category}
        onSelect={(intent) => props.onComplete({ selectedIntent: intent })}
        {...props}
      />
    );
  }

  private getIntentsForCategory(category: string): IntentOption[] {
    // Common intents for all categories
    return [
      { id: 'offer', name: 'I want to offer', description: 'Create a listing' },
      { id: 'search', name: 'I want to find', description: 'Search for listings' },
    ];
  }
}
```

#### **Day 11-12: Drawing Tool Component**

**Step 2.4: Drawing Tool Component**
```typescript
// apps/layera-geoalert/src/pipeline/components/universal/DrawingToolComponent.ts
export class DrawingToolComponent implements PipelineComponent {
  id = 'drawing-tool';
  name = 'Area Drawing Tool';
  version = '1.0.0';
  category = 'universal' as const;
  dependencies = ['mapContext'];
  provides = ['drawnArea', 'areaGeometry'];

  private mapInstance: L.Map | null = null;
  private drawingLayer: L.LayerGroup | null = null;

  async mount(context: ComponentContext): Promise<void> {
    // Initialize map if not provided
    if (context.mapInstance) {
      this.mapInstance = context.mapInstance;
    } else {
      this.mapInstance = await this.initializeMap(context.mapContainer);
    }

    this.drawingLayer = new L.LayerGroup();
    this.mapInstance.addLayer(this.drawingLayer);
  }

  async unmount(): Promise<void> {
    if (this.drawingLayer && this.mapInstance) {
      this.mapInstance.removeLayer(this.drawingLayer);
    }
  }

  async execute(input: ComponentInput): Promise<ComponentOutput> {
    const drawingMode = input.drawingMode || 'polygon';
    const defaultRadius = input.defaultRadius || 250;

    return {
      drawingMode,
      defaultRadius,
      mapReady: !!this.mapInstance,
    };
  }

  render(props: ComponentProps): ReactNode {
    return (
      <DrawingToolUI
        map={this.mapInstance}
        drawingMode={props.data.drawingMode}
        defaultRadius={props.data.defaultRadius}
        onAreaDrawn={(geometry) => props.onComplete({
          drawnArea: geometry,
          areaGeometry: this.convertToGeoJSON(geometry)
        })}
        {...props}
      />
    );
  }

  private async initializeMap(container: HTMLElement): Promise<L.Map> {
    // Extract map initialization logic from legacy components
    const map = L.map(container).setView([37.9838, 23.7275], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    return map;
  }
}
```

#### **Day 13-14: Property-Specific Components**

**Step 2.5: Property File Upload Component**
```typescript
// apps/layera-geoalert/src/pipeline/components/property/PropertyFileUploadComponent.ts
export class PropertyFileUploadComponent implements PipelineComponent {
  id = 'property-file-upload';
  name = 'Property File Upload';
  version = '1.0.0';
  category = 'property' as const;
  dependencies = ['selectedCategory', 'selectedIntent'];
  provides = ['uploadedFile', 'fileMetadata', 'layerId'];

  async execute(input: ComponentInput): Promise<ComponentOutput> {
    const acceptedFileTypes = ['.dxf', '.png', '.jpg', '.jpeg', '.pdf'];
    const maxFileSize = 50 * 1024 * 1024; // 50MB

    return {
      acceptedFileTypes,
      maxFileSize,
      uploadEndpoint: '/api/files/upload',
    };
  }

  render(props: ComponentProps): ReactNode {
    return (
      <PropertyFileUploadUI
        acceptedTypes={props.data.acceptedFileTypes}
        maxSize={props.data.maxFileSize}
        onFileUpload={async (file) => {
          const metadata = await this.extractFileMetadata(file);
          const layerId = await this.createLayer(file, metadata);

          props.onComplete({
            uploadedFile: file,
            fileMetadata: metadata,
            layerId,
          });
        }}
        {...props}
      />
    );
  }

  private async extractFileMetadata(file: File): Promise<FileMetadata> {
    // Extract from legacy file processing logic
    const fileType = file.name.split('.').pop()?.toLowerCase();

    if (fileType === 'dxf') {
      return this.extractDXFMetadata(file);
    } else {
      return this.extractImageMetadata(file);
    }
  }

  private async createLayer(file: File, metadata: FileMetadata): Promise<string> {
    // Use existing layer creation logic
    const layerId = `layer-${Date.now()}`;
    // ... layer creation logic
    return layerId;
  }
}
```

#### **📊 Week 3-4 Success Criteria:**
- ✅ 5+ universal components implemented
- ✅ 3+ property-specific components implemented
- ✅ All components follow interface standard
- ✅ UI components separated from business logic
- ✅ Component registration working
- ✅ Basic component execution functional

---

## 🔄 **WEEK 5-6: PIPELINE ENGINE IMPLEMENTATION**

### **🎯 Goal**: Build complete pipeline orchestration system

#### **Day 15-17: Pipeline Definition System**

**Step 3.1: Pipeline Definition Schema**
```typescript
// apps/layera-geoalert/src/pipeline/types/PipelineDefinition.ts
import { z } from 'zod';

const PipelineStepSchema = z.object({
  id: z.string(),
  componentId: z.string(),
  config: z.record(z.unknown()).optional(),
  dependsOn: z.array(z.string()).default([]),
  condition: z.string().optional(),
  parallel: z.boolean().default(false),
  timeout: z.number().optional(),
  retries: z.number().default(0),
});

const PipelineDefinitionSchema = z.object({
  id: z.string(),
  name: z.string(),
  version: z.string(),
  category: z.enum(['property', 'job', 'universal']),
  description: z.string().optional(),
  steps: z.array(PipelineStepSchema),
  metadata: z.object({
    author: z.string().optional(),
    tags: z.array(z.string()).default([]),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

export type PipelineDefinition = z.infer<typeof PipelineDefinitionSchema>;
export type PipelineStep = z.infer<typeof PipelineStepSchema>;
```

**Step 3.2: Pipeline Definition Files**
```yaml
# apps/layera-geoalert/src/pipeline/definitions/property-offer.yaml
id: "property-offer"
name: "Property Offer Pipeline"
version: "1.0.0"
category: "property"
description: "Complete workflow for creating property offer listings"

steps:
  - id: "category"
    componentId: "category-selector"
    config:
      preselected: "property"
      allowedCategories: ["property"]

  - id: "intent"
    componentId: "intent-selector"
    dependsOn: ["category"]

  - id: "transaction-type"
    componentId: "property-transaction-type"
    dependsOn: ["intent"]
    condition: "data.selectedCategory === 'property'"

  - id: "availability"
    componentId: "availability-selector"
    dependsOn: ["transaction-type"]

  - id: "availability-details"
    componentId: "availability-details"
    dependsOn: ["availability"]
    condition: "data.selectedAvailability === 'future' && data.selectedIntent === 'offer'"

  - id: "location-file"
    componentId: "property-file-upload"
    dependsOn: ["availability", "availability-details"]
    condition: "data.selectedAvailability === 'now'"

  - id: "location-drawing"
    componentId: "drawing-tool"
    dependsOn: ["availability", "availability-details"]
    condition: "data.selectedAvailability === 'future'"
    config:
      drawingMode: "polygon"
      defaultRadius: 50

  - id: "positioning"
    componentId: "property-positioning"
    dependsOn: ["location-file"]
    condition: "data.uploadedFile"

  - id: "details"
    componentId: "property-details-form"
    dependsOn: ["positioning", "location-drawing"]

  - id: "completion"
    componentId: "completion-flow"
    dependsOn: ["details"]

metadata:
  author: "Layera Team"
  tags: ["property", "offer", "real-estate"]
  createdAt: "2025-10-18T00:00:00Z"
  updatedAt: "2025-10-18T00:00:00Z"
```

**Step 3.3: Pipeline Loader**
```typescript
// apps/layera-geoalert/src/pipeline/loader/PipelineLoader.ts
import { PipelineDefinition, PipelineDefinitionSchema } from '../types/PipelineDefinition';

export class PipelineLoader {
  private definitions = new Map<string, PipelineDefinition>();

  async loadPipeline(pipelineId: string): Promise<PipelineDefinition> {
    // Check cache first
    if (this.definitions.has(pipelineId)) {
      return this.definitions.get(pipelineId)!;
    }

    // Load from file
    const definition = await this.loadFromFile(pipelineId);

    // Validate
    const validated = PipelineDefinitionSchema.parse(definition);

    // Cache
    this.definitions.set(pipelineId, validated);

    return validated;
  }

  async loadFromFile(pipelineId: string): Promise<unknown> {
    try {
      // Try YAML first
      const yamlResponse = await fetch(`/pipelines/${pipelineId}.yaml`);
      if (yamlResponse.ok) {
        const yamlText = await yamlResponse.text();
        return this.parseYAML(yamlText);
      }

      // Try JSON fallback
      const jsonResponse = await fetch(`/pipelines/${pipelineId}.json`);
      if (jsonResponse.ok) {
        return jsonResponse.json();
      }

      throw new Error(`Pipeline definition not found: ${pipelineId}`);
    } catch (error) {
      throw new Error(`Failed to load pipeline ${pipelineId}: ${error.message}`);
    }
  }

  private parseYAML(yamlText: string): unknown {
    // Use js-yaml or similar library
    // For now, simple JSON parsing
    return JSON.parse(yamlText);
  }

  listAvailablePipelines(): string[] {
    return Array.from(this.definitions.keys());
  }

  clearCache(): void {
    this.definitions.clear();
  }
}
```

#### **Day 18-19: Advanced Execution Engine**

**Step 3.4: Enhanced Pipeline Executor**
```typescript
// apps/layera-geoalert/src/pipeline/engine/EnhancedPipelineExecutor.ts
export class EnhancedPipelineExecutor extends PipelineExecutor {
  private abortController = new AbortController();
  private checkpointManager: CheckpointManager;
  private errorHandler: ErrorHandler;

  constructor(
    engine: LayeraPipelineEngine,
    state: PipelineState,
    options: ExecutorOptions = {}
  ) {
    super(engine, state);
    this.checkpointManager = new CheckpointManager(state.pipelineId);
    this.errorHandler = new ErrorHandler(options.errorStrategy || 'fail-fast');
  }

  async execute(pipeline: PipelineDefinition): Promise<PipelineResult> {
    try {
      await this.preExecutionChecks(pipeline);

      // Create execution plan
      const executionPlan = await this.createExecutionPlan(pipeline);

      // Execute phases
      for (const phase of executionPlan.phases) {
        await this.executePhase(phase);
        await this.saveCheckpoint(`phase-${phase.id}`);
      }

      return this.generateSuccessResult();
    } catch (error) {
      return this.handleExecutionError(error);
    }
  }

  private async createExecutionPlan(pipeline: PipelineDefinition): Promise<ExecutionPlan> {
    const dependencyGraph = this.buildDependencyGraph(pipeline.steps);
    const phases = this.groupIntoPhases(dependencyGraph);

    return {
      pipelineId: pipeline.id,
      phases,
      estimatedDuration: this.estimateExecutionTime(phases),
      parallelizationOpportunities: this.identifyParallelSteps(phases),
    };
  }

  private async executePhase(phase: ExecutionPhase): Promise<void> {
    // Execute parallel steps concurrently
    const parallelPromises = phase.parallelSteps.map(stepId =>
      this.executeStepWithRetry(stepId)
    );

    await Promise.all(parallelPromises);

    // Execute sequential steps
    for (const stepId of phase.sequentialSteps) {
      await this.executeStepWithRetry(stepId);
    }
  }

  private async executeStepWithRetry(stepId: string): Promise<void> {
    const step = this.getStep(stepId);
    const maxRetries = step.retries || 0;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        await this.executeStep(step);
        return; // Success
      } catch (error) {
        if (attempt === maxRetries) {
          throw error; // Final attempt failed
        }

        await this.handleRetry(stepId, attempt + 1, error);
      }
    }
  }

  // Pause/Resume functionality
  pause(): void {
    this.abortController.abort();
    this.state.status = 'paused';
    this.saveCheckpoint('manual-pause');
  }

  async resume(): Promise<void> {
    this.abortController = new AbortController();
    this.state.status = 'running';

    // Continue from last checkpoint
    const lastCheckpoint = await this.checkpointManager.getLatest();
    if (lastCheckpoint) {
      this.state = lastCheckpoint.state;
    }
  }

  // Error handling
  private async handleExecutionError(error: Error): Promise<PipelineResult> {
    await this.errorHandler.handle(error, this.state);

    return {
      status: 'failed',
      error: error.message,
      state: this.state,
      checkpoints: await this.checkpointManager.list(),
    };
  }
}
```

#### **Day 20-21: State Persistence System**

**Step 3.5: Checkpoint Manager**
```typescript
// apps/layera-geoalert/src/pipeline/state/CheckpointManager.ts
export class CheckpointManager {
  constructor(private pipelineId: string) {}

  async saveCheckpoint(name: string, state?: PipelineState): Promise<string> {
    const checkpoint: Checkpoint = {
      id: this.generateCheckpointId(),
      name,
      pipelineId: this.pipelineId,
      state: state || this.getCurrentState(),
      timestamp: new Date().toISOString(),
      metadata: {
        userAgent: navigator.userAgent,
        url: window.location.href,
      },
    };

    // Save to multiple storage layers
    await Promise.all([
      this.saveToLocalStorage(checkpoint),
      this.saveToIndexedDB(checkpoint),
      this.saveToServer(checkpoint),
    ]);

    return checkpoint.id;
  }

  async restoreCheckpoint(checkpointId: string): Promise<PipelineState> {
    // Try multiple storage layers
    const checkpoint =
      await this.loadFromLocalStorage(checkpointId) ||
      await this.loadFromIndexedDB(checkpointId) ||
      await this.loadFromServer(checkpointId);

    if (!checkpoint) {
      throw new Error(`Checkpoint ${checkpointId} not found`);
    }

    return checkpoint.state;
  }

  async listCheckpoints(): Promise<Checkpoint[]> {
    const checkpoints = await this.loadAllFromIndexedDB();
    return checkpoints
      .filter(cp => cp.pipelineId === this.pipelineId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  async getLatest(): Promise<Checkpoint | null> {
    const checkpoints = await this.listCheckpoints();
    return checkpoints[0] || null;
  }

  // Storage implementations
  private async saveToLocalStorage(checkpoint: Checkpoint): Promise<void> {
    try {
      const key = `pipeline_checkpoint_${checkpoint.id}`;
      localStorage.setItem(key, JSON.stringify(checkpoint));
    } catch (error) {
      console.warn('Failed to save checkpoint to localStorage:', error);
    }
  }

  private async saveToIndexedDB(checkpoint: Checkpoint): Promise<void> {
    // IndexedDB implementation for larger state objects
    const db = await this.openIndexedDB();
    const transaction = db.transaction(['checkpoints'], 'readwrite');
    const store = transaction.objectStore('checkpoints');

    await store.put(checkpoint);
  }

  private async saveToServer(checkpoint: Checkpoint): Promise<void> {
    try {
      await fetch('/api/pipelines/checkpoints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(checkpoint),
      });
    } catch (error) {
      console.warn('Failed to save checkpoint to server:', error);
    }
  }
}
```

#### **📊 Week 5-6 Success Criteria:**
- ✅ Pipeline definitions load από YAML/JSON
- ✅ Complex execution plans with parallel steps
- ✅ Retry logic και error handling
- ✅ Pause/Resume functionality
- ✅ Multi-layer state persistence
- ✅ Performance optimization features

---

## 🧪 **WEEK 7-8: TESTING & INTEGRATION**

### **🎯 Goal**: Comprehensive testing και production readiness

#### **Day 22-24: Component Testing**

**Step 4.1: Component Unit Tests**
```typescript
// apps/layera-geoalert/src/pipeline/components/__tests__/CategorySelector.test.tsx
describe('CategorySelectorComponent', () => {
  let component: CategorySelectorComponent;
  let mockContext: ComponentContext;

  beforeEach(() => {
    component = new CategorySelectorComponent();
    mockContext = {
      pipelineId: 'test-pipeline',
      stepId: 'category',
      userId: 'test-user',
    };
  });

  describe('Component Lifecycle', () => {
    it('should mount without errors', async () => {
      await expect(component.mount(mockContext)).resolves.not.toThrow();
    });

    it('should unmount cleanly', async () => {
      await component.mount(mockContext);
      await expect(component.unmount()).resolves.not.toThrow();
    });
  });

  describe('Execution Logic', () => {
    it('should return available categories', async () => {
      const input = {
        allowedCategories: ['property', 'job'],
      };

      const result = await component.execute(input);

      expect(result.availableCategories).toHaveLength(2);
      expect(result.availableCategories[0]).toMatchObject({
        id: 'property',
        name: 'Real Estate',
        icon: 'home',
      });
    });

    it('should respect preselected category', async () => {
      const input = {
        allowedCategories: ['property', 'job'],
        preselected: 'job',
      };

      const result = await component.execute(input);

      expect(result.defaultSelection).toBe('job');
    });
  });

  describe('Validation', () => {
    it('should validate correct input', () => {
      const input = {
        allowedCategories: ['property', 'job'],
      };

      const result = component.validate(input);

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject invalid input', () => {
      const input = {
        allowedCategories: 'invalid',
      };

      const result = component.validate(input);

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('allowedCategories must be an array');
    });
  });

  describe('UI Rendering', () => {
    it('should render category options', () => {
      const props = {
        data: {
          availableCategories: [
            { id: 'property', name: 'Real Estate', icon: 'home' },
            { id: 'job', name: 'Jobs', icon: 'briefcase' },
          ],
        },
        onComplete: jest.fn(),
      };

      const { getByText, getAllByRole } = render(component.render(props));

      expect(getByText('Real Estate')).toBeInTheDocument();
      expect(getByText('Jobs')).toBeInTheDocument();
      expect(getAllByRole('button')).toHaveLength(2);
    });

    it('should call onComplete when category selected', () => {
      const mockOnComplete = jest.fn();
      const props = {
        data: {
          availableCategories: [
            { id: 'property', name: 'Real Estate', icon: 'home' },
          ],
        },
        onComplete: mockOnComplete,
      };

      const { getByText } = render(component.render(props));
      fireEvent.click(getByText('Real Estate'));

      expect(mockOnComplete).toHaveBeenCalledWith({
        selectedCategory: 'property',
      });
    });
  });

  describe('Performance', () => {
    it('should execute within performance budget', async () => {
      const input = { allowedCategories: ['property', 'job'] };

      const startTime = performance.now();
      await component.execute(input);
      const duration = performance.now() - startTime;

      expect(duration).toBeLessThan(50); // 50ms budget
    });
  });
});
```

#### **Day 25-26: Pipeline Integration Tests**

**Step 4.2: End-to-End Pipeline Tests**
```typescript
// apps/layera-geoalert/src/pipeline/__tests__/PipelineIntegration.test.tsx
describe('Pipeline Integration Tests', () => {
  let engine: LayeraPipelineEngine;
  let mockComponents: Map<string, PipelineComponent>;

  beforeEach(async () => {
    engine = new LayeraPipelineEngine();
    mockComponents = new Map();

    // Register mock components
    await setupMockComponents(engine, mockComponents);
  });

  describe('Property Offer Pipeline', () => {
    it('should complete full property offer workflow', async () => {
      const input = {
        category: 'property',
        intent: 'offer',
        transactionType: 'sale',
        availability: 'now',
        fileUpload: mockPropertyFile,
        propertyDetails: mockPropertyDetails,
      };

      const result = await engine.executePipeline('property-offer', {
        userId: 'test-user',
        input,
      });

      expect(result.status).toBe('completed');
      expect(result.data).toMatchObject({
        selectedCategory: 'property',
        selectedIntent: 'offer',
        associatedLayerId: expect.any(String),
        finalizedListing: expect.any(Object),
      });
    });

    it('should handle user cancellation gracefully', async () => {
      const execution = engine.startPipeline('property-offer', {
        userId: 'test-user',
      });

      // Simulate user cancellation after category step
      await execution.completeStep('category', { selectedCategory: 'property' });
      execution.cancel();

      const result = await execution.getResult();

      expect(result.status).toBe('cancelled');
      expect(result.data.currentStep).toBe('intent');
      expect(result.checkpoints).toHaveLength(1);
    });

    it('should recover from failure with retry', async () => {
      // Mock component failure
      mockComponents.get('property-details-form')!.execute = jest
        .fn()
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce({ details: mockPropertyDetails });

      const result = await engine.executePipeline('property-offer', {
        userId: 'test-user',
        input: mockCompleteInput,
        retryOptions: { maxRetries: 2 },
      });

      expect(result.status).toBe('completed');
      expect(mockComponents.get('property-details-form')!.execute).toHaveBeenCalledTimes(2);
    });
  });

  describe('Job Search Pipeline', () => {
    it('should complete fast-track job search', async () => {
      const input = {
        category: 'job',
        intent: 'search',
        employmentType: 'full_time',
        availability: 'now',
        searchArea: mockSearchArea,
      };

      const result = await engine.executePipeline('job-search', {
        userId: 'test-user',
        input,
      });

      expect(result.status).toBe('completed');
      expect(result.data.detailsFormSkipped).toBe(true);
      expect(result.executionTime).toBeLessThan(2000); // Fast track should be quick
    });
  });

  describe('Cross-Category Integration', () => {
    it('should support category switching', async () => {
      const execution = engine.startPipeline('universal-wizard', {
        userId: 'test-user',
      });

      // Start with property, then switch to job
      await execution.completeStep('category', { selectedCategory: 'property' });
      await execution.completeStep('intent', { selectedIntent: 'search' });

      // User goes back and changes category
      execution.goToStep('category');
      await execution.completeStep('category', { selectedCategory: 'job' });

      const result = await execution.getResult();

      expect(result.data.selectedCategory).toBe('job');
      expect(result.data.categoryChanges).toBe(1);
    });
  });
});
```

#### **Day 27-28: Performance & Load Testing**

**Step 4.3: Performance Testing**
```typescript
// apps/layera-geoalert/src/pipeline/__tests__/Performance.test.tsx
describe('Pipeline Performance Tests', () => {
  const performanceThresholds = {
    componentLoad: 100,     // ms
    stepTransition: 200,    // ms
    pipelineCompletion: 5000, // ms
    memoryUsage: 50,        // MB
    bundleSize: 500,        // KB
  };

  describe('Component Performance', () => {
    it('should load components within budget', async () => {
      const componentIds = [
        'category-selector',
        'intent-selector',
        'drawing-tool',
        'property-details-form',
      ];

      for (const componentId of componentIds) {
        const startTime = performance.now();
        const component = await loadComponent(componentId);
        const loadTime = performance.now() - startTime;

        expect(loadTime).toBeLessThan(performanceThresholds.componentLoad);
        expect(component).toBeDefined();
      }
    });

    it('should execute components within budget', async () => {
      const component = await loadComponent('category-selector');
      const input = { allowedCategories: ['property', 'job'] };

      const startTime = performance.now();
      await component.execute(input);
      const executionTime = performance.now() - startTime;

      expect(executionTime).toBeLessThan(50); // Individual component budget
    });
  });

  describe('Pipeline Performance', () => {
    it('should complete pipeline within budget', async () => {
      const startTime = performance.now();

      const result = await engine.executePipeline('property-offer', {
        userId: 'test-user',
        input: mockCompleteInput,
      });

      const completionTime = performance.now() - startTime;

      expect(result.status).toBe('completed');
      expect(completionTime).toBeLessThan(performanceThresholds.pipelineCompletion);
    });

    it('should handle concurrent pipeline executions', async () => {
      const concurrentExecutions = 10;
      const promises = Array.from({ length: concurrentExecutions }, (_, i) =>
        engine.executePipeline('property-offer', {
          userId: `test-user-${i}`,
          input: mockCompleteInput,
        })
      );

      const startTime = performance.now();
      const results = await Promise.all(promises);
      const totalTime = performance.now() - startTime;

      expect(results.every(r => r.status === 'completed')).toBe(true);
      expect(totalTime).toBeLessThan(performanceThresholds.pipelineCompletion * 2);
    });
  });

  describe('Memory Management', () => {
    it('should not leak memory during execution', async () => {
      const getMemoryUsage = () => {
        if (performance.memory) {
          return performance.memory.usedJSHeapSize / 1024 / 1024; // MB
        }
        return 0;
      };

      const initialMemory = getMemoryUsage();

      // Execute pipeline multiple times
      for (let i = 0; i < 5; i++) {
        await engine.executePipeline('property-offer', {
          userId: `test-user-${i}`,
          input: mockCompleteInput,
        });

        // Force garbage collection if available
        if (global.gc) {
          global.gc();
        }
      }

      const finalMemory = getMemoryUsage();
      const memoryIncrease = finalMemory - initialMemory;

      expect(memoryIncrease).toBeLessThan(performanceThresholds.memoryUsage);
    });
  });

  describe('Bundle Size', () => {
    it('should meet bundle size requirements', () => {
      // This would be run as part of build process
      const bundleStats = getBundleStats('@layera/pipeline-core');

      expect(bundleStats.size).toBeLessThan(performanceThresholds.bundleSize * 1024);
      expect(bundleStats.gzippedSize).toBeLessThan(performanceThresholds.bundleSize * 0.3 * 1024);
    });
  });
});
```

#### **📊 Week 7-8 Success Criteria:**
- ✅ >95% test coverage for all components
- ✅ All integration tests passing
- ✅ Performance benchmarks met
- ✅ Memory leak tests passed
- ✅ Load testing successful
- ✅ Production deployment ready

---

## 🚀 **PRODUCTION DEPLOYMENT GUIDE**

### **🎯 Final Deployment Steps:**

#### **Step 5.1: Feature Flag Configuration**
```typescript
// apps/layera-geoalert/src/shared/FeatureFlags.ts
export const PIPELINE_FEATURE_FLAGS = {
  ENABLE_NEW_PIPELINE: process.env.REACT_APP_NEW_PIPELINE === 'true',
  PIPELINE_ROLLOUT_PERCENTAGE: parseInt(process.env.REACT_APP_PIPELINE_ROLLOUT || '0'),
  ENABLE_PIPELINE_ANALYTICS: process.env.REACT_APP_PIPELINE_ANALYTICS === 'true',
  PIPELINE_DEBUG_MODE: process.env.NODE_ENV === 'development',
};
```

#### **Step 5.2: Monitoring Setup**
```typescript
// apps/layera-geoalert/src/pipeline/monitoring/PipelineMonitoring.ts
export class PipelineMonitoring {
  static trackPipelineExecution(pipelineId: string, metrics: ExecutionMetrics): void {
    // Send to analytics service
    analytics.track('pipeline_execution', {
      pipelineId,
      duration: metrics.duration,
      status: metrics.status,
      stepCount: metrics.stepCount,
      userId: metrics.userId,
    });
  }

  static trackComponentPerformance(componentId: string, metrics: ComponentMetrics): void {
    analytics.track('component_performance', {
      componentId,
      executionTime: metrics.executionTime,
      memoryUsage: metrics.memoryUsage,
      renderTime: metrics.renderTime,
    });
  }

  static trackError(error: PipelineError): void {
    console.error('Pipeline Error:', error);

    // Send to error tracking service
    errorTracking.captureException(error, {
      tags: {
        pipeline: error.pipelineId,
        component: error.componentId,
        step: error.stepId,
      },
    });
  }
}
```

#### **Step 5.3: Rollout Configuration**
```typescript
// apps/layera-geoalert/src/pipeline/rollout/RolloutManager.ts
export class RolloutManager {
  static shouldUsePipeline(userId: string): boolean {
    const rolloutPercentage = PIPELINE_FEATURE_FLAGS.PIPELINE_ROLLOUT_PERCENTAGE;

    if (rolloutPercentage === 0) return false;
    if (rolloutPercentage === 100) return true;

    // Consistent hashing for user-based rollout
    const hash = this.hashUserId(userId);
    return (hash % 100) < rolloutPercentage;
  }

  private static hashUserId(userId: string): number {
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      const char = userId.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }
}
```

---

## 📊 **IMPLEMENTATION SUCCESS METRICS**

### **🎯 Final Success Criteria:**

#### **Technical Metrics:**
- ✅ Bundle size <500KB για core pipeline
- ✅ Component load time <100ms
- ✅ Pipeline completion <5s
- ✅ Memory usage <50MB
- ✅ Test coverage >95%
- ✅ Zero memory leaks

#### **User Experience Metrics:**
- ✅ Completion rate >95%
- ✅ Average completion time <3 minutes
- ✅ User satisfaction >4.5/5
- ✅ Error rate <1%
- ✅ Support tickets <5% increase

#### **Business Metrics:**
- ✅ Development speed >50% faster
- ✅ Feature delivery >30% faster
- ✅ Maintenance cost >40% reduction
- ✅ System reliability >99.9%

---

*📝 Final Document: [ROLLOUT-PLAN.md](./05-ROLLOUT-PLAN.md)*