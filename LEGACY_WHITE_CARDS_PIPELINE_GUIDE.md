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

## 🌳 COMPLETE PIPELINE FLOW CHART (ΠΛΗΡΗΣ ΔΕΝΔΡΟΕΙΔΗΣ ΔΟΜΗ)

⚠️ **ΣΗΜΑΝΤΙΚΟ**: Αυτό το pipeline ΔΕΝ είναι απλό linear flow - είναι **πολύπλοκο state machine** με **8-12 βήματα** ανάλογα με τις επιλογές!

### 🎯 **ROOT: CATEGORY SELECTION**
```
📱 LEGACY WHITE CARDS PIPELINE (iPhone 14 Pro Max Only)
│
├── 🏠 **ΑΚΙΝΗΤΑ (Property)** ─────────────────────────────────────┐
└── 💼 **ΕΡΓΑΣΙΑ (Job)** ─────────────────────────────────────────┘
```

### 🏠 **PROPERTY PATH TREE** (ΕΠΑΛΗΘΕΥΜΕΝΟ: 9 βήματα ακριβώς)

```
🏠 PROPERTY PATH
│
├── 🎯 **STEP 2: PROPERTY INTENT**
│   ├── 🏪 **ΠΡΟΣΦΟΡΑ (Offer)** ──────────────────────────────┐
│   │   │                                                    │
│   │   ├── 🎯 **STEP 3: TRANSACTION TYPE** (CONDITIONAL)    │
│   │   │   ├── 💰 **ΠΩΛΗΣΗ (Sale)**                         │
│   │   │   └── 🏢 **ΕΝΟΙΚΙΑΣΗ (Rent)**                      │
│   │   │                                                    │
│   │   ├── 🎯 **STEP 4: AVAILABILITY**                      │
│   │   │   ├── ✅ **ΤΩΡΑ (Now)** ──────────────────────┐    │
│   │   │   │   │                                       │    │
│   │   │   │   ├── 🎯 **STEP 5: UPLOAD** (CONDITIONAL) │    │
│   │   │   │   │   └── 📤 **Ανέβασμα Αρχείων**         │    │
│   │   │   │   │                                       │    │
│   │   │   │   └── 🎯 **STEP 6: LAYOUT**               │    │
│   │   │   │       └── 🗺️ **Τοποθέτηση & Κλίμακα** ──┘    │
│   │   │   │                                               │
│   │   │   └── 🔄 **ΣΤΟ ΜΕΛΛΟΝ (Future)** ──────────────┐  │
│   │   │       └── ⏭️ **SKIP Upload & Layout** ─────────┘  │
│   │   │                                                   │
│   │   └── ⬇️ **CONTINUES TO PROPERTY TYPE...**            │
│   │                                                       │
│   └── 🏡 **ΑΝΑΖΗΤΗΣΗ (Search)** ─────────────────────────┘
│       │
│       ├── 🎯 **STEP 3: AVAILABILITY** (NO Transaction)
│       │   ├── ✅ **ΤΩΡΑ (Now)** ──────────────────────┐
│       │   │   └── 🎯 **STEP 4: LAYOUT**               │
│       │   │       └── 🗺️ **Τοποθέτηση & Κλίμακα** ──┘
│       │   │
│       │   └── 🔄 **ΣΤΟ ΜΕΛΛΟΝ (Future)**
│       │       └── ⏭️ **SKIP Layout**
│       │
│       └── ⬇️ **CONTINUES TO PROPERTY TYPE...**
│
├── 🎯 **STEP 7: PROPERTY TYPE** (All Property Paths Converge)
│   ├── 🏠 **ΔΙΑΜΕΡΙΣΜΑ (Apartment)**
│   │   └── 📝 **Fields**: Rooms + Floor + Standard
│   ├── 🏢 **ΓΡΑΦΕΙΟ (Office)**
│   │   └── 📝 **Fields**: Floor + Standard (NO Rooms)
│   ├── 🏭 **ΕΡΓΟΣΤΑΣΙΟ (Factory)**
│   │   └── 📝 **Fields**: Standard only
│   ├── 🌳 **ΟΙΚΟΠΕΔΟ (Land)**
│   │   └── 📝 **Fields**: Standard only
│   ├── 🏗️ **ΚΤΙΡΙΟ (Building)**
│   │   └── 📝 **Fields**: Standard only
│   └── 🏪 **ΚΑΤΑΣΤΗΜΑ (Store)**
│       └── 📝 **Fields**: Standard only
│
├── 🎯 **STEP 8: PROPERTY DETAILS**
│   └── ✏️ **ΣΤΟΙΧΕΙΑ ΑΚΙΝΗΤΟΥ (Property Details Form)**
│       ├── 📋 **Conditional Fields**:
│       │   ├── 🏠 **Rooms** (Apartments ONLY)
│       │   ├── 🏢 **Floor** (Apartments + Offices ONLY)
│       │   ├── 📐 **Area** (ALL types)
│       │   ├── 💰 **Price** (ALL types)
│       │   └── 📝 **Description** (ALL types)
│       │
│       └── ⬇️ **CONTINUES TO AREA METHOD...**
│
└── 🎯 **STEP 9: AREA MEASUREMENT METHOD** (FINAL)
    ├── ✏️ **ΧΕΙΡΟΚΙΝΗΤΗ ΕΙΣΑΓΩΓΗ (Manual Input)**
    │   └── 🔢 **Direct number entry**
    ├── 🗺️ **ΣΧΕΔΙΑΣΗ ΣΤΟΝ ΧΑΡΤΗ (Map Drawing)**
    │   └── 🖊️ **Interactive map drawing tools**
    ├── 📤 **ΑΠΟ ΚΑΤΟΨΗ (Floor Plan Upload)**
    │   └── 📸 **Image upload + scaling**
    └── ⚙️ **ΑΥΤΟΜΑΤΟΣ ΥΠΟΛΟΓΙΣΜΟΣ (Auto Calculate)**
        └── 🤖 **AI-powered calculation**
        └── ✅ **COMPLETION**
```

### 💼 **JOB PATH TREE** ⚠️ **ΑΝΟΛΟΚΛΗΡΩΤΟ - ΜΟΝΟ 2 ΒΗΜΑΤΑ ΣΤΟΤΟ LEGACY SYSTEM**

```
💼 JOB PATH - LEGACY DEVICE-SPECIFIC SYSTEM
│
├── 🎯 **STEP 1: CATEGORY SELECTION** ✅ ΥΠΑΡΧΕΙ
│   └── 💼 **"Εργασία"** (BriefcaseIcon) → επιλέγω "job"
│
├── 🎯 **STEP 2: JOB INTENT** ✅ ΥΠΑΡΧΕΙ
│   ├── 💼 **ΠΡΟΣΦΟΡΑ ΘΕΣΗΣ** → "Θέλω να προσφέρω" (WorkIcon)
│   └── 🔧 **ΑΝΑΖΗΤΗΣΗ ΕΡΓΑΣΙΑΣ** → "Αναζητώ εργασία" (ToolIcon)
│
└── ❌ **STEP 3+: ΔΕΝ ΥΠΑΡΧΟΥΝ ΣΤΟ LEGACY SYSTEM**
    │
    ⚠️ **ΤΑ ΠΑΡΑΚΑΤΩ ΥΠΑΡΧΟΥΝ ΜΟΝΟ ΣΤΟ ΝΕΟ MODULAR SYSTEM:**
    │
    ├── 🚫 **STEP 3: EMPLOYMENT TYPE** (ΔΕΝ ΥΠΑΡΧΕΙ στο cardData.ts)
    │   ├── ⏰ **ΠΛΗΡΗΣ ΑΠΑΣΧΟΛΗΣΗ (Full-time)**
    │   ├── ⏱️ **ΜΕΡΙΚΗ ΑΠΑΣΧΟΛΗΣΗ (Part-time)**
    │   ├── 📋 **ΣΥΜΒΑΣΗ ΕΡΓΟΥ (Contract)**
    │   ├── 🏠 **ΤΗΛΕΕΡΓΑΣΙΑ (Remote)**
    │   └── 🎓 **ΠΡΑΚΤΙΚΗ ΑΣΚΗΣΗ (Internship)**
    │
    ├── 🚫 **STEP 4-8: ΥΠΟΛΟΙΠΑ ΒΗΜΑΤΑ** (ΔΕΝ ΥΠΑΡΧΟΥΝ στο legacy)
    │   ├── availability, availabilityDetails, location, details, complete
    │   └── **ΣΥΝΟΛΟ**: 6 βήματα που ΛΕΙΠΟΥΝ από το legacy system
    │
    └── ⚠️ **ΑΠΟΤΕΛΕΣΜΑ**: Το job pipeline ΣΤΑΜΑΤΑ στο βήμα 2!
        └── ❌ **ΔΕΝ ΜΠΟΡΕΙ ΝΑ ΟΛΟΚΛΗΡΩΣΕΙ** τη διαδικασία εργασίας
```

### 🔢 **STEP COUNT ANALYSIS**

#### **Property Paths**:
- **Property + Offer + Now**: `Category → Intent → Transaction → Availability → Upload → Layout → Property Type → Details → Area Method` = **9 βήματα**
- **Property + Offer + Future**: `Category → Intent → Transaction → Availability → Property Type → Details → Area Method` = **7 βήματα**
- **Property + Search + Now**: `Category → Intent → Availability → Layout → Property Type → Details → Area Method` = **7 βήματα**
- **Property + Search + Future**: `Category → Intent → Availability → Property Type → Details → Area Method` = **6 βήματα**

#### **Job Path** ⚠️ **ΑΝΟΛΟΚΛΗΡΩΤΟ**:
- **Job (Legacy System)**: `Category → Intent` = **ΜΟΝΟ 2 βήματα** (ΣΤΑΜΑΤΑ εδώ!)
- **Job (Νέο System)**: `Category → Intent → Employment → Availability → Availability Details → Location → Details → Complete` = **8 βήματα** (ΔΕΝ ΥΠΑΡΧΕΙ στο legacy)

### 🎛️ **CONDITIONAL LOGIC MATRIX**

| Condition | Property Offer | Property Search | Job (Legacy) |
|-----------|---------------|-----------------|--------------|
| **Transaction Step** | ✅ SHOW | ❌ SKIP | ❌ **N/A** |
| **Upload Step** | ✅ IF Now | ✅ IF Now | ❌ **N/A** |
| **Layout Step** | ✅ SHOW | ✅ SHOW | ❌ **N/A** |
| **Employment Step** | ❌ SKIP | ❌ SKIP | ⚠️ **MISSING** |
| **Συνολικά Βήματα** | **6-9 βήματα** | **6-7 βήματα** | **2 βήματα ΜΟΝΟ** |
| **Status** | ✅ ΠΛΗΡΕΣ | ✅ ΠΛΗΡΕΣ | ❌ **ΚΟΜΜΕΝΟ** |

### 🚨 **ΠΟΛΥΠΛΟΚΟΤΗΤΑ HIGHLIGHTS**

1. **Variable Step Count**: 6-9 βήματα ανάλογα με path
2. **Conditional Steps**: 3 steps που εμφανίζονται conditional
3. **Dynamic Forms**: Property details αλλάζουν fields ανάλογα με property type
4. **State Dependencies**: Κάθε step επηρεάζει τα επόμενα
5. **Multiple UI Modes**: FloatingStepper πρέπει να δείχνει διαφορετικό progress
6. **Complex Navigation**: Back button πρέπει να ξέρει τι να skip

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

## 📋 ΛΕΠΤΟΜΕΡΕΙΣ ΚΑΡΤΕΣ - ΚΕΙΜΕΝΑ & ΣΧΟΛΙΑ

**🔄 Αμφίδρομη σύνδεση με**: `C:\layera\voithitika_docs\legacy-pipeline-exploration.html`
**📊 Σκοπός**: Καταγραφή ακριβών κειμένων και σχολίων κάθε κάρτας
**🌳 Δενδροειδής οπτικοποίηση**: Βλέπε HTML αρχείο

### 🏁 **ΒΗΜΑ 1: ΚΑΤΗΓΟΡΙΕΣ** (CategoryStep.tsx)

#### **🏠 Κάρτα Ακινήτων**
- **Τίτλος**: `{t('pipeline.category.property.title')}` → "Ακίνητα"
- **Περιγραφή**: `{t('pipeline.category.property.description')}` → "Διαχείριση ακινήτων και γεωγραφικών ειδοποιήσεων"
- **Εικονίδιο**: `VillaIcon` (🏠) - size="xl", theme="primary"
- **Στυλ**: `variant="elevated"`, λευκό φόντο `var(--layera-bg-primary)`
- **Props**: `clickable`, `hoverable`, `size="lg"`, `padding="lg"`
- **Σχόλια**: Enterprise LEGO Component, LEGACY/DEPRECATED για αναφορά μόνο

#### **💼 Κάρτα Εργασίας**
- **Τίτλος**: `{t('pipeline.category.job.title')}` → "Εργασία"
- **Περιγραφή**: `{t('pipeline.category.job.description')}` → "Αναζήτηση και προσφορά θέσεων εργασίας"
- **Εικονίδιο**: `BriefcaseIcon` (💼) - size="xl", theme="success"
- **Στυλ**: `variant="elevated"`, λευκό φόντο `var(--layera-bg-primary)`
- **Props**: `clickable`, `hoverable`, `size="lg"`, `padding="lg"`
- **Σχόλια**: ΠΡΟΣΟΧΗ - Job pipeline είναι ΑΝΟΛΟΚΛΗΡΩΤΟ στο legacy system

### 🏠 **ΒΗΜΑ 2A: ΑΚΙΝΗΤΑ - ΠΡΟΘΕΣΕΙΣ** (IntentStep.tsx)

#### **🏭 Κάρτα Προσφοράς**
- **Τίτλος**: `{t('pipeline.intent.offer.property.title')}` → "Θέλω να προσφέρω ακίνητο"
- **Περιγραφή**: `{t('pipeline.intent.offer.property.description')}` → "Καταχώρηση ακινήτου για πώληση ή ενοικίαση"
- **Εικονίδιο**: `IndustrialIcon` (🏭) - size="xl", theme="info"
- **Στυλ**: `variant="outlined"`, `className="layera-unified-card"`
- **Props**: `clickable`, `hoverable`, `size="lg"`, `padding="lg"`
- **Σχόλια**: Οδηγεί στο TransactionTypeStep (πώληση/ενοικίαση)

#### **🍴 Κάρτα Αναζήτησης**
- **Τίτλος**: `{t('pipeline.intent.search.property.title')}` → "Θέλω να αναζητήσω ακίνητο"
- **Περιγραφή**: `{t('pipeline.intent.search.property.description')}` → "Δημιουργία Geo-Alert για ειδοποιήσεις"
- **Εικονίδιο**: `RestaurantIcon` (🍴) - size="xl", theme="warning"
- **Στυλ**: `variant="outlined"`, `className="layera-unified-card"`
- **Props**: `clickable`, `hoverable`, `size="lg"`, `padding="lg"`
- **Σχόλια**: Παρακάμπτει το TransactionTypeStep, πηγαίνει στο AvailabilityStep

### 💼 **ΒΗΜΑ 2B: ΕΡΓΑΣΙΑ - ΠΡΟΘΕΣΕΙΣ** (IntentStep.tsx)

#### **💼 Κάρτα Προσφοράς Θέσης**
- **Τίτλος**: `{t('pipeline.intent.offer.job.title')}` → "Θέλω να προσφέρω θέση εργασίας"
- **Περιγραφή**: `{t('pipeline.intent.offer.job.description')}` → "Δημοσίευση αγγελίας εργασίας"
- **Εικονίδιο**: `WorkIcon` (💼) - size="xl", theme="info"
- **Στυλ**: `variant="outlined"`, `className="layera-unified-card"`
- **Props**: `clickable`, `hoverable`, `size="lg"`, `padding="lg"`
- **Σχόλια**: ⚠️ ΣΤΟΠ - Legacy system δεν έχει περισσότερα βήματα

#### **🔧 Κάρτα Αναζήτησης Εργασίας**
- **Τίτλος**: `{t('pipeline.intent.search.job.title')}` → "Αναζητώ εργασία"
- **Περιγραφή**: `{t('pipeline.intent.search.job.description')}` → "Αναζήτηση και αίτηση για θέσεις εργασίας"
- **Εικονίδιο**: `ToolIcon` (🔧) - size="xl", theme="warning"
- **Στυλ**: `variant="outlined"`, `className="layera-unified-card"`
- **Props**: `clickable`, `hoverable`, `size="lg"`, `padding="lg"`
- **Σχόλια**: ⚠️ ΣΤΟΠ - Legacy system δεν έχει περισσότερα βήματα

### 🏭 **ΒΗΜΑ 3: ΤΥΠΟΣ ΣΥΝΑΛΛΑΓΗΣ** (TransactionTypeStep.tsx)

#### **🏪 Κάρτα Πώλησης**
- **Τίτλος**: `{t('pipelines.steps.transaction.sale.title')}` → "Πώληση"
- **Περιγραφή**: `{t('pipelines.steps.transaction.sale.description')}` → "Πώληση ακινήτου με μεταβίβαση κυριότητας"
- **Εικονίδιο**: `CommercialIcon` (🏪) - size="xl", theme="success"
- **Στυλ**: `variant="outlined"`, `className="layera-unified-card"`
- **Props**: `clickable`, `hoverable`, `size="lg"`, `padding="lg"`
- **Σχόλια**: Μόνο για Property + Offer path

#### **🏢 Κάρτα Ενοικίασης**
- **Τίτλος**: `{t('pipelines.steps.transaction.rent.title')}` → "Ενοικίαση"
- **Περιγραφή**: `{t('pipelines.steps.transaction.rent.description')}` → "Μίσθωση ακινήτου με συμβόλαιο ενοικίασης"
- **Εικονίδιο**: `BuildingIcon` (🏢) - size="xl", theme="neutral"
- **Στυλ**: `variant="outlined"`, `className="layera-unified-card"`
- **Props**: `clickable`, `hoverable`, `size="lg"`, `padding="lg"`
- **Σχόλια**: Μόνο για Property + Offer path

### ⏱️ **ΒΗΜΑ 4: ΔΙΑΘΕΣΙΜΟΤΗΤΑ** (AvailabilityStep.tsx)

#### **✅ Κάρτα Τώρα**
- **Τίτλος**: `{t('pipelines.steps.availability.options.now.title')}` → "Τώρα"
- **Περιγραφή**: `{t('pipelines.steps.availability.options.now.description')}` → "Το ακίνητο είναι άμεσα διαθέσιμο"
- **Εικονίδιο**: `CheckIcon` (✅) - size="xl", theme="primary"
- **Στυλ**: `variant="outlined"`, `className="layera-unified-card"`
- **Props**: `clickable`, `hoverable`, `size="lg"`, `padding="lg"`
- **Σχόλια**: Οδηγεί σε Upload ή Drawing ανάλογα με το path

#### **🔄 Κάρτα Μελλοντικά**
- **Τίτλος**: `{t('pipelines.steps.availability.options.future.title')}` → "Στο Μέλλον"
- **Περιγραφή**: `{t('pipelines.steps.availability.options.future.description')}` → "Το ακίνητο θα είναι διαθέσιμο σε μελλοντική ημερομηνία"
- **Εικονίδιο**: `RefreshIcon` (🔄) - size="xl", theme="secondary"
- **Στυλ**: `variant="outlined"`, `className="layera-unified-card"`
- **Props**: `clickable`, `hoverable`, `size="lg"`, `padding="lg"`
- **Σχόλια**: Παρακάμπτει το Upload, πηγαίνει στο Drawing

### 📍 **ΒΗΜΑ 5: LOCATION** (LocationStep.tsx) **[CONDITIONAL LOGIC]**

#### **📤 Κάρτα Upload** (ΜΟΝΟ ΑΝ Property + Offer + Now)
- **Τίτλος**: `{t('location.uploadFloorplan')}` → "Ανέβασμα Κάτοψης"
- **Περιγραφή**: "Επιλέξτε αρχείο κάτοψης (JPG, PNG, PDF, DXF, DWG)"
- **Εικονίδιο**: `UploadIcon` (📤) - size="xl", theme="info"
- **Στυλ**: `variant="outlined"`, `className="layera-unified-card"`
- **Props**: `clickable`, `hoverable`, `size="lg"`, `padding="lg"`
- **Σχόλια**: Ανοίγει file picker, στέλνει event στον χάρτη, auto-advance

#### **🗺️ Κάρτα Drawing** (ΣΕ ΟΛΕΣ ΤΙΣ ΑΛΛΕΣ ΠΕΡΙΠΤΩΣΕΙΣ)
- **Τίτλος**: `{t('location.drawOnMap')}` → "Σχεδίαση στον Χάρτη"
- **Περιγραφή**: "Χρησιμοποιήστε τα εργαλεία σχεδίασης για να ορίσετε την περιοχή"
- **Εικονίδιο**: `MapIcon` (🗺️) - size="xl", theme="primary"
- **Στυλ**: `variant="outlined"`, `className="layera-unified-card"`
- **Props**: `clickable`, `hoverable`, `size="lg"`, `padding="lg"`
- **Σχόλια**: Ενεργοποιεί εργαλεία σχεδίασης χάρτη

### ⚙️ **ΒΗΜΑ 6: LAYOUT** (LayoutStep.tsx) **[ΠΟΛΥΠΛΟΚΗ ΦΟΡΜΑ]**

#### **🔧 Layout Controls** (ΌΧΙ απλή κάρτα - πολύπλοκη φόρμα)
- **Τίτλος**: `{t('pipelines.steps.layout.title')}` → "Τοποθέτηση & Κλίμακα"
- **Στοιχεία**:
  - **Location Search**: Input field για αναζήτηση διεύθυνσης
  - **Rotation Controls**: -90°/+90° buttons για περιστροφή
  - **Scale Controls**: Width/Height/Depth inputs για κλιμάκωση
- **Εικονίδια**: `LocationIcon`, `RotateIcon`, `RulerIcon`
- **Σχόλια**: Πολύπλοκο form με real-time map updates, address breakdown

### 📝 **ΒΗΜΑ 7: DETAILS** (DetailsStep.tsx) **[ΦΟΡΜΑ ΣΤΟΙΧΕΙΩΝ]**

#### **📋 Details Form** (Φόρμα με πολλαπλά πεδία)
- **Τίτλος**: `{t('pipelines.steps.details.title')}` → "Στοιχεία {type}"
- **Στοιχεία**:
  - **Title**: Input για τίτλο καταχώρησης
  - **Description**: TextArea για περιγραφή
  - **Price/Salary**: Number input (conditional ανάλογα με category)
  - **Contact Info**: Input για στοιχεία επικοινωνίας
- **Validation**: Όλα τα πεδία required για να προχωρήσει
- **Σχόλια**: Dynamic form ανάλογα με category (property vs job)

### 🎯 **ΒΗΜΑ 8: COMPLETE** (CompleteStep.tsx) **[ΤΕΛΙΚΟ ΒΗΜΑ]**

#### **✅ Success Confirmation**
- **Τίτλος**: Δυναμικό ανάλογα με path:
  - Property + Offer: "Η προσφορά ακινήτου σας καταχωρήθηκε επιτυχώς!"
  - Property + Search: "Το Geo-Alert σας δημιουργήθηκε επιτυχώς!"
  - Job + Offer: "Η αγγελία εργασίας σας καταχωρήθηκε επιτυχώς!"
  - Job + Search: "Η αίτηση εργασίας σας καταχωρήθηκε επιτυχώς!"
- **Εικονίδιο**: `CheckIcon` (✅) ή `AlertTriangleIcon` (⚠️)
- **Σχόλια**: Final success screen με completion button

---

## ✅ ΕΠΑΛΗΘΕΥΣΗ ΚΩΔΙΚΑ - ΡΟΗΣ ΑΚΙΝΗΤΩΝ

**Ημερομηνία**: 26 Οκτωβρίου 2025
**Μέθοδος**: Άμεση ανάλυση του cardData.ts αρχείου

### 🔍 **ΕΠΙΒΕΒΑΙΩΣΗ ΒΗΜΑΤΩΝ ΑΠΟ CARDDATA.TS**:

Μετά από λεπτομερή ανάλυση των πηγαίων αρχείων, η ροή των ακινήτων είναι **ακριβώς**:

#### **ΣΩΣΤΗ ΑΚΟΛΟΥΘΙΑ (9 βήματα)**:
1. **category** → `property` (Ακίνητα)
2. **property** → `offer` ή `search` (Intent)
3. **transaction** → `sale` ή `rent` (μόνο αν intent="offer")
4. **availability** → `now` ή `future` (χρονοδιάγραμμα)
5. **upload** → `upload` (ανέβασμα αρχείων)
6. **layout** → `layout` (τοποθέτηση & κλίμακα)
7. **property-type** → 6 επιλογές: apartment, office, factory, land, building, store
8. **property-details** → `property-details` (στοιχεία ακινήτου - φόρμα)
9. **area-method** → 4 επιλογές: manual-input, map-drawing, floor-plan-upload, auto-calculate

### 🎯 **CONDITIONAL LOGIC VERIFICATION**:
- **Transaction Step**: Εμφανίζεται ΜΟΝΟ όταν intent="offer" (προσφορά)
- **Upload/Layout Steps**: Εμφανίζονται ΠΑΝΤΟΤΕ στη ροή ακινήτων
- **Property-Type**: 6 διαθέσιμες κάρτες (apartment, office, factory, land, building, store)
- **Area-Method**: 4 διαθέσιμες μέθοδοι μέτρησης (ΤΕΛΙΚΟ ΒΗΜΑ)

### 📊 **CONFIGURATION VERIFICATION**:
```typescript
// Από constants/index.ts - STEP_CONFIG
totalSteps: {
  property: 7, // ⚠️ ΑΝΑΚΡΙΒΕΙΑ - στην πραγματικότητα είναι 9
  job: 8
}
```

### 🚨 **ΣΗΜΑΝΤΙΚΟ ΕΥΡΗΜΑ**:
Το STEP_CONFIG.totalSteps.property λέει "7" αλλά στην πραγματικότητα η ροή έχει **9 βήματα**. Αυτό εξηγεί γιατί ο χρήστης είδε ανακρίβειες στην αρχική μου τεκμηρίωση.

**ΤΕΛΙΚΗ ΕΠΙΒΕΒΑΙΩΣΗ**: Η ροή των ακινήτων έχει **9 βήματα ακριβώς** και όχι 7 όπως δηλώνεται στα constants.

---

## ✅ ΒΗΜΑ-ΠΡΟΣ-ΒΗΜΑ ΕΠΑΛΗΘΕΥΣΗ - ΡΟΗΣ ΕΡΓΑΣΙΑΣ

**Μέθοδος**: Εξέταση κάθε βήματος ξεχωριστά και καταγραφή στο documentation

### 🔍 **ΒΗΜΑ 1 - CATEGORY SELECTION (ΕΠΑΛΗΘΕΥΜΕΝΟ)**:
**Τοποθεσία**: cardData.category[]
**Κάρτες**:
- `property` (id) → "Ακίνητα" (title) → VillaIcon
- `job` (id) → "Εργασία" (title) → BriefcaseIcon

**Επόμενο βήμα για ΕΡΓΑΣΙΑ**: Πάμε στο βήμα job (intent selection)

### 🔍 **ΒΗΜΑ 2 - JOB INTENT SELECTION (ΕΠΑΛΗΘΕΥΜΕΝΟ)**:
**Τοποθεσία**: cardData.job[]
**Κάρτες**:
- `offer` (id) → "Θέλω να προσφέρω" (title) → WorkIcon → category:'job'
- `search` (id) → "Αναζητώ εργασία" (title) → ToolIcon → category:'job'

**Επόμενο βήμα**: Αν επιλέξω οποιαδήποτε από τις δύο → ??? (ΧΡΕΙΑΖΕΤΑΙ ΕΡΕΥΝΑ)

### 🚨 **ΚΡΙΣΙΜΟ ΕΥΡΗΜΑ - ΑΝΟΛΟΚΛΗΡΩΤΟ JOB PIPELINE**:

**Πρόβλημα**: Στο cardData.ts υπάρχουν ΜΟΝΟ 2 job steps:
- `category` (κατηγορία)
- `job` (intent)

**Αλλά στα constants/index.ts STEP_CONFIG δηλώνεται**:
- `totalSteps.job: 8` (8 βήματα)
- `stepIds.employmentType: 'employmentType'` (ΔΕΝ ΥΠΑΡΧΕΙ στο cardData)
- `stepIds.availabilityDetails: 'availabilityDetails'` (ΔΕΝ ΥΠΑΡΧΕΙ στο cardData)

**Συμπέρασμα**: Το legacy job pipeline είναι **ΑΝΟΛΟΚΛΗΡΩΤΟ** - έχει μόνο 2 από τα 8 δηλωμένα βήματα!

### 🔍 **ΕΠΙΠΛΕΟΝ ΕΡΕΥΝΑ - ΕΝΤΟΠΙΣΜΟΣ ΥΠΟΛΟΙΠΩΝ STEPS**:

**Εντοπίστηκαν τα υπόλοιπα job steps στο ΝΕΟ MODULAR SYSTEM**:
- `/components/steps/availabilityDetails/AvailabilityDetailsStep.tsx` ✅ (ΝΕΟ SYSTEM)
- Αλλά ΔΕΝ υπάρχουν στο legacy device-specific pipeline!

**ΤΕΛΙΚΗ ΔΙΑΠΙΣΤΩΣΗ**:
Το **legacy device-specific system** για εργασία υλοποιεί **ΜΟΝΟ 2 βήματα**:
1. **category** → επιλογή "Εργασία"
2. **job** → επιλογή intent (offer/search)

**Μετά από αυτό το σύστημα ΣΤΑΜΑΤΑ - δεν έχει υπόλοιπα βήματα!**

Τα υπόλοιπα 6 βήματα (employmentType, availability, availabilityDetails, location, details, complete) υπάρχουν ΜΟΝΟ στο νέο modular system και ΟΧΙ στο legacy.

---

**END OF DOCUMENTATION**