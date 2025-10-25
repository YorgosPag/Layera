# 📋 LEGACY WHITE CARDS PIPELINE - COMPLETE GUIDE
**Συντάκτης**: Γιώργος Παγώνης (Enterprise Architecture Supervisor)
**Ημερομηνία**: 25 Οκτωβρίου 2025
**Σκοπός**: Πλήρης τεκμηρίωση του legacy device-specific pipeline πριν την αφαίρεση

---

## 🎯 EXECUTIVE SUMMARY

Αυτό το έγγραφο περιγράφει **λεπτομερώς** το legacy White Cards Pipeline που λειτουργεί ΜΟΝΟ σε iPhone 14 Pro Max μέσω των device-specific components. Το σύστημα αυτό θα **αφαιρεθεί** μόλις ολοκληρωθεί η migration στο νέο modular StepOrchestrator system.

### 🏗️ **ΑΡΧΙΤΕΚΤΟΝΙΚΗ ΕΠΙΣΚΟΠΗΣΗ**
- **Τύπος**: Device-specific άσπρες κάρτες πάνω από χάρτη
- **Στόχος**: iPhone 14 Pro Max (430x932 screen)
- **Χαρακτηριστικά**: Floating stepper + διαφανές overlay system
- **Status**: ⚠️ **LEGACY - ΠΡΟΣ ΑΦΑΙΡΕΣΗ**

---

## 🌳 PIPELINE FLOW CHART (ΔΕΝΔΡΟΕΙΔΗΣ ΔΟΜΗ)

```
📱 LEGACY WHITE CARDS PIPELINE
│
├── 🎯 **STEP 1: CATEGORY SELECTION**
│   ├── 🏠 Ακίνητα (property)
│   │   └── ➡️ Goes to Property Intent
│   └── 💼 Εργασία (job)
│       └── ➡️ Goes to Job Intent
│
├── 🎯 **STEP 2A: PROPERTY INTENT** (if category = property)
│   ├── 🏪 Θέλω να προσφέρω (offer)
│   │   └── ➡️ Goes to Transaction Type
│   └── 🏡 Θέλω να αναζητήσω (search)
│       └── ➡️ Goes to Transaction Type
│
├── 🎯 **STEP 2B: JOB INTENT** (if category = job)
│   ├── 💼 Θέλω να προσφέρω (offer)
│   │   └── ➡️ Goes to Job Details
│   └── 🔧 Αναζητώ εργασία (search)
│       └── ➡️ Goes to Job Details
│
├── 🎯 **STEP 3: TRANSACTION TYPE** (property path only)
│   ├── 💰 Πώληση (sale)
│   │   └── ➡️ Goes to Availability
│   └── 🏢 Ενοικίαση (rent)
│       └── ➡️ Goes to Availability
│
├── 🎯 **STEP 4: AVAILABILITY** (after transaction)
│   ├── ✅ Τώρα (now)
│   │   └── ➡️ Goes to Upload
│   └── 🔄 Στο Μέλλον (future)
│       └── ➡️ Skips to Property Type
│
├── 🎯 **STEP 5: UPLOAD** (if availability = now)
│   └── 📤 Ανέβασμα Αρχείων (upload)
│       └── ➡️ Goes to Layout
│
├── 🎯 **STEP 6: LAYOUT** (after upload)
│   └── 🗺️ Τοποθέτηση & Κλίμακα (layout)
│       ├── 📍 GPS Location (Find My Location)
│       ├── 🔍 Address Search
│       ├── 🔄 Rotation (-90°/+90°)
│       └── 📏 Scale (cm→m, mm→m, m→m)
│       └── ➡️ Goes to Property Type
│
├── 🎯 **STEP 7: PROPERTY TYPE** (after layout or future)
│   ├── 🏠 Διαμέρισμα (apartment)
│   ├── 🏢 Γραφείο (office)
│   ├── 🏭 Εργοστάσιο (factory)
│   ├── 🌳 Οικόπεδο (land)
│   ├── 🏗️ Κτίριο (building)
│   └── 🏪 Κατάστημα (store)
│       └── ➡️ Goes to Property Details
│
├── 🎯 **STEP 8: PROPERTY DETAILS** (after property type)
│   └── ✏️ Στοιχεία Ακινήτου (property-details)
│       └── ➡️ Goes to Area Method
│
└── 🎯 **STEP 9: AREA METHOD** (final step)
    ├── ✏️ Χειροκίνητη Εισαγωγή (manual-input)
    ├── 🗺️ Σχεδίαση στον Χάρτη (map-drawing)
    ├── 📤 Από Κάτοψη (floor-plan-upload)
    └── ⚙️ Αυτόματος Υπολογισμός (auto-calculate)
        └── ✅ COMPLETION
```

---

## 📁 CORE FILES BREAKDOWN

### 🎯 **1. FloatingStepper.tsx** (467 lines)
**Path**: `device-specific/mobile/iphone-14-pro-max/components/FloatingStepper.tsx`

**Περιγραφή**: Το κεντρικό floating UI component που εμφανίζεται στο top του χάρτη

#### **Βασικά Χαρακτηριστικά**:
- **Position**: Fixed top (68px από πάνω)
- **Dimensions**: 40px height × 95% width
- **Design**: Minimal floating bar με transparency modes
- **Navigation**: Progress dots + Previous/Reset/Opacity buttons

#### **Props Interface**:
```typescript
interface FloatingStepperProps {
  currentStep?: string;
  totalSteps?: number;
  stepIndex?: number;
  selectedCategory?: 'property' | 'job' | null;
  selectedIntent?: 'offer' | 'search' | null;
  showTransactionStep?: boolean;
  onNext?: () => void;
  onPrevious?: () => void;
  onReset?: () => void;
  onStepClick?: (stepIndex: number) => void;
  stepTitle?: string;
  canGoNext?: boolean;
  canGoPrevious?: boolean;
  onCardsOpacityToggle?: (isOpaque: boolean) => void;
}
```

#### **Βασικές Λειτουργίες**:
1. **Progress Tracking**: Dots που δείχνουν τρέχον + completed steps
2. **Step Navigation**: Click στα dots για μετακίνηση
3. **Opacity Control**: 3 modes - transparent/semi-transparent/opaque
4. **Integration**: PipelineDiscovery για enterprise auto-navigation

#### **Transparency Modes**:
- **Transparent**: `rgba(..., 0.01)` - καθρέφτης mode
- **Semi-transparent**: `rgba(..., 0.65)` - μερική ορατότητα
- **Opaque**: `rgba(..., 0.95)` - συμπαγές

#### **Button Controls**:
- **← (Previous)**: Πίσω ένα βήμα
- **○◐● (Opacity)**: Cycle opacity modes
- **× (Reset)**: Επαναφορά pipeline

---

### 🎯 **2. cardData.ts** (270 lines)
**Path**: `device-specific/mobile/iphone-14-pro-max/components/cardData.ts`

**Περιγραφή**: Configuration-driven data structure για όλες τις κάρτες

#### **Card Configuration Structure**:
```typescript
interface CardConfig {
  id: CardId;
  title: string;
  icon: React.ComponentType<any>;
  variant: CardVariant;
  category?: 'property' | 'job';
  step?: string;
}
```

#### **Διαθέσιμα Steps Data**:

**Category Level**:
- **property**: "Ακίνητα" (VillaIcon)
- **job**: "Εργασία" (BriefcaseIcon)

**Intent Level (Property)**:
- **offer**: "Θέλω να προσφέρω" (CommercialIcon)
- **search**: "Θέλω να αναζητήσω" (HomeIcon)

**Intent Level (Job)**:
- **offer**: "Θέλω να προσφέρω" (WorkIcon)
- **search**: "Αναζητώ εργασία" (ToolIcon)

**Transaction Level**:
- **sale**: "Πώληση" (CommercialIcon)
- **rent**: "Ενοικίαση" (BuildingIcon)

**Availability Level**:
- **now**: "Τώρα" (CheckIcon)
- **future**: "Στο Μέλλον" (RefreshIcon)

**Upload Level**:
- **upload**: "Ανέβασμα Αρχείων" (UploadIcon)

**Layout Level**:
- **layout**: "Τοποθέτηση & Κλίμακα" (MapIcon)

**Property Type Level**:
- **apartment**: "Διαμέρισμα" (HomeIcon)
- **office**: "Γραφείο" (BriefcaseIcon)
- **factory**: "Εργοστάσιο" (ToolIcon)
- **land**: "Οικόπεδο" (VillaIcon)
- **building**: "Κτίριο" (BuildingIcon)
- **store**: "Κατάστημα" (CommercialIcon)

**Property Details Level**:
- **property-details**: "Στοιχεία Ακινήτου" (EditIcon)

**Area Method Level**:
- **manual-input**: "Χειροκίνητη Εισαγωγή" (EditIcon)
- **map-drawing**: "Σχεδίαση στον Χάρτη" (MapIcon)
- **floor-plan-upload**: "Από Κάτοψη" (UploadIcon)
- **auto-calculate**: "Αυτόματος Υπολογισμός" (SettingsIcon)

#### **Helper Functions**:
```typescript
getCardsForStep(step): CardConfig[]
getCardById(id): CardConfig | undefined
```

---

### 🎯 **3. LayoutStepCard.tsx** (631 lines)
**Path**: `device-specific/mobile/iphone-14-pro-max/components/LayoutStepCard.tsx`

**Περιγραφή**: Ειδική κάρτα για το Layout step που συνδυάζει GPS, search, rotation, scale

#### **Βασικές Λειτουργίες**:

**A. GPS Location**:
```typescript
handleFindMyLocation()
```
- Geolocation API για εντοπισμό θέσης
- Event dispatch: `centerMapToLocation`
- Event dispatch: `moveFloorPlanToLocation`
- Event dispatch: `focusMapOnLocation`
- Haptic feedback (vibration)
- Error handling με user-friendly messages

**B. Address Search**:
- Input field για αναζήτηση διεύθυνσης
- onKeyPress Enter για search trigger
- Callback: `onLocationSearch(query)`

**C. Rotation Control**:
```typescript
handleRotationChange(newRotation)
```
- Buttons: -90° / +90°
- Event dispatch: `rotateFloorPlan`
- Current rotation display

**D. Scale Control**:
```typescript
handleScaleChange(field, value)
```
- Three inputs: Width (cm→m), Height (mm→m), Depth (m→m)
- Event dispatch: `scaleFloorPlan`
- Real-time scale adjustment

#### **Layout Structure**:
1. **Μεγάλη κάρτα τοποθεσίας** (GPS + Search)
2. **Δύο μικρές κάρτες δίπλα-δίπλα** (Rotation + Scale)
3. **Status indicator** ("✅ Κάτοψη έτοιμη για τοποθέτηση")
4. **Complete button** ("Συνέχεια στα Στοιχεία Ακινήτου →")

#### **Opacity Integration**:
- Listens to `toggleCardsOpacity` events
- 3 dynamic styling modes για transparency
- Auto-adjusts input/button styles

---

## 🔧 TECHNICAL ARCHITECTURE

### **Event-Driven Communication**:

**Map Events**:
- `centerMapToLocation` - Κεντράρισμα χάρτη
- `moveFloorPlanToLocation` - Μετακίνηση floor plan
- `focusMapOnLocation` - Focus στη θέση
- `rotateFloorPlan` - Περιστροφή κάτοψης
- `scaleFloorPlan` - Αλλαγή κλίμακας

**UI Events**:
- `toggleCardsOpacity` - Opacity mode changes

### **LEGO Dependencies**:
```typescript
// Layout System
import { Flex, SIZING_SCALE } from '@layera/layout';

// UI Components
import { Button } from '@layera/buttons';
import { Text } from '@layera/typography';
import { BaseCard } from '@layera/cards';

// Icons System
import {
  VillaIcon, BriefcaseIcon, CommercialIcon,
  HomeIcon, WorkIcon, ToolIcon, BuildingIcon,
  CheckIcon, RefreshIcon, UploadIcon, MapIcon,
  EditIcon, SettingsIcon, LocationIcon,
  RotateIcon, RulerIcon
} from '@layera/icons';

// Design Tokens
import { SPACING_SCALE, BORDER_RADIUS_SCALE } from '@layera/constants';
import { BOX_SHADOW_SCALE } from '@layera/box-shadows';
import { getCursorVar } from '@layera/cursors';

// i18n
import { useLayeraTranslation } from '@layera/tolgee';

// Enterprise Systems
import { PipelineDiscovery } from '@layera/pipelines';
```

### **State Management**:
```typescript
// FloatingStepper State
const [opacityMode, setOpacityMode] = useState<OpacityMode>('transparent');

// LayoutStepCard State
const [rotation, setRotation] = useState<number>(0);
const [scaleWidth, setScaleWidth] = useState<number>(1);
const [scaleHeight, setScaleHeight] = useState<number>(1);
const [scaleDepth, setScaleDepth] = useState<number>(1);
const [locationQuery, setLocationQuery] = useState<string>('');
const [opacityMode, setOpacityMode] = useState<OpacityMode>('transparent');
```

---

## 📋 SPECIFIC STEP DESCRIPTIONS

### **STEP 1: CATEGORY SELECTION**
**UI**: Δύο κάρτες δίπλα-δίπλα
**Content**:
- 🏠 **Ακίνητα** - Πράσινη κάρτα με VillaIcon
- 💼 **Εργασία** - Μπλε κάρτα με BriefcaseIcon

**Behavior**:
- Click → selectedCategory = 'property' | 'job'
- Triggers stepper step progression
- Updates floating stepper title

### **STEP 2A: PROPERTY INTENT**
**UI**: Δύο κάρτες δίπλα-δίπλα (property themed)
**Content**:
- 🏪 **Θέλω να προσφέρω** - CommercialIcon
- 🏡 **Θέλω να αναζητήσω** - HomeIcon

**Behavior**:
- Click → selectedIntent = 'offer' | 'search'
- Both paths lead to Transaction Type

### **STEP 2B: JOB INTENT**
**UI**: Δύο κάρτες δίπλα-δίπλα (job themed)
**Content**:
- 💼 **Θέλω να προσφέρω** - WorkIcon (job offering)
- 🔧 **Αναζητώ εργασία** - ToolIcon (job seeking)

**Behavior**:
- Click → selectedIntent = 'offer' | 'search'
- Leads to job-specific pipeline (not detailed here)

### **STEP 3: TRANSACTION TYPE**
**UI**: Δύο κάρτες δίπλα-δίπλα (property path only)
**Content**:
- 💰 **Πώληση** - CommercialIcon
- 🏢 **Ενοικίαση** - BuildingIcon

**Behavior**:
- Click → transactionType = 'sale' | 'rent'
- Both lead to Availability step

### **STEP 4: AVAILABILITY**
**UI**: Δύο κάρτες δίπλα-δίπλα
**Content**:
- ✅ **Τώρα** - CheckIcon (immediate availability)
- 🔄 **Στο Μέλλον** - RefreshIcon (future availability)

**Behavior**:
- **Τώρα** → Upload step (requires file upload)
- **Στο Μέλλον** → Skip to Property Type (no upload needed)

### **STEP 5: UPLOAD** (conditional)
**UI**: Μία κάρτα κεντραρισμένη
**Content**:
- 📤 **Ανέβασμα Αρχείων** - UploadIcon

**Behavior**:
- Click → file upload interface
- After upload → Layout step

### **STEP 6: LAYOUT** (conditional)
**UI**: Ειδική multi-function κάρτα (LayoutStepCard)
**Content**:
- 🗺️ **Τοποθέτηση & Κλίμακα** - Complex layout controls

**Sub-functions**:
1. **GPS Location**:
   - Button: "Βρες τη θέση μου"
   - Input: Address search
   - Events: Map centering, floor plan movement

2. **Rotation**:
   - Buttons: -90° / +90°
   - Display: Current rotation value
   - Event: Floor plan rotation

3. **Scale**:
   - 3 inputs: cm→m, mm→m, m→m
   - Grid layout για compact presentation
   - Event: Floor plan scaling

**Behavior**:
- Multi-step interactive configuration
- Real-time map updates
- Complete button → Property Type

### **STEP 7: PROPERTY TYPE**
**UI**: Grid layout με 6 κάρτες (3×2)
**Content**:
- 🏠 **Διαμέρισμα** - HomeIcon
- 🏢 **Γραφείο** - BriefcaseIcon
- 🏭 **Εργοστάσιο** - ToolIcon
- 🌳 **Οικόπεδο** - VillaIcon
- 🏗️ **Κτίριο** - BuildingIcon
- 🏪 **Κατάστημα** - CommercialIcon

**Behavior**:
- Click → propertyType selection
- Advances to Property Details

### **STEP 8: PROPERTY DETAILS**
**UI**: Μία κάρτα με form interface
**Content**:
- ✏️ **Στοιχεία Ακινήτου** - EditIcon
- Form fields για property details

**Behavior**:
- Form completion
- Advances to Area Method

### **STEP 9: AREA METHOD** (final)
**UI**: Grid layout με 4 κάρτες (2×2)
**Content**:
- ✏️ **Χειροκίνητη Εισαγωγή** - EditIcon
- 🗺️ **Σχεδίαση στον Χάρτη** - MapIcon
- 📤 **Από Κάτοψη** - UploadIcon
- ⚙️ **Αυτόματος Υπολογισμός** - SettingsIcon

**Behavior**:
- Click → Activates respective area calculation method
- **COMPLETION** → Pipeline finished

---

## 🎨 DESIGN SYSTEM

### **Color Themes**:

**Property (Green)**:
```css
--color-semantic-success-rgb: 16, 185, 129
background: rgba(16, 185, 129, opacity)
border: var(--color-semantic-success-border)
```

**Job (Blue)**:
```css
background: rgba(59, 130, 246, opacity)
border: var(--color-primary-border)
```

### **Typography**:
- **Font Weight**: `var(--layera-font-semibold)` (600)
- **Font Bold**: `var(--layera-font-bold)` (700)
- **Sizes**: Text component με sm, xs, base sizes

### **Spacing & Layout**:
- **Border Radius**: `BORDER_RADIUS_SCALE.MD` (8px)
- **Padding**: `SPACING_SCALE.SM` (12px)
- **Gap**: `SPACING_SCALE.XS` (4px)
- **Margins**: Responsive spacing από SPACING_SCALE

### **Shadows & Effects**:
- **Card Shadow**: `BOX_SHADOW_SCALE.cardDefault`
- **Glow Effect**: `BOX_SHADOW_SCALE.glowDefault`
- **Backdrop Filter**: `blur(12px)` για floating elements

---

## ⚠️ DEPRECATION NOTICE

### **Γιατί Αφαιρείται**:
1. **Device-Specific**: Λειτουργεί ΜΟΝΟ σε iPhone 14 Pro Max
2. **Non-Scalable**: Δεν υποστηρίζει desktop/tablet
3. **Legacy Architecture**: Δεν ακολουθεί το νέο LEGO system
4. **Maintenance Overhead**: Πολύπλοκη structure για μία συσκευή

### **Replacement Strategy**:
- **StepOrchestrator**: Universal step management
- **@layera/info-panels**: Universal responsive design
- **Modular Steps**: CategoryStep, IntentStep, LocationStep, etc.
- **Enterprise Navigation**: Single source of truth

### **Migration Status**:
✅ **CategoryStep**: Migrated to universal design
✅ **IntentStep**: Migrated to universal design
✅ **LocationStep**: Migrated to universal design
✅ **DetailsStep**: Migrated to universal design
✅ **TransactionStep**: Migrated to universal design

⚠️ **Pending Removal**:
- FloatingStepper.tsx
- LayoutStepCard.tsx
- cardData.ts
- Related device-specific infrastructure

---

## 📞 SUPPORT & MAINTENANCE

**Contact**: Γιώργος Παγώνης - Enterprise Architecture Supervisor
**Last Updated**: October 25, 2025
**Status**: LEGACY - ΠΡΟΣ ΑΦΑΙΡΕΣΗ
**Priority**: ΥΨΗΛΗ (εμποδίζει το desktop compatibility)

**Next Action**: Αφαίρεση των legacy files μόλις επιβεβαιωθεί ότι το νέο system λειτουργεί πλήρως.

---

**END OF DOCUMENTATION**