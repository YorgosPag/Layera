# 🏗️ Layera Project Instructions
**Επιβλέπων Αρχιτέκτονας**: Γιώργος Παγώνης

---

# 🏗️ **ENTERPRISE DEVELOPMENT MANIFESTO - LAYERA PROJECT**
**Γιώργου Παγώνη - Claude Code Collaboration Protocol**

## 🎯 **ΚΥΡΙΑ ΑΠΟΣΤΟΛΗ**
**Δημιουργούμε enterprise-grade εφαρμογή χρησιμοποιώντας ΑΠΟΚΛΕΙΣΤΙΚΑ Single Sources of Truth - ΟΧΙ μπακάλικο γειτονιάς!**

## 🚨 **ΥΠΟΧΡΕΩΤΙΚΟΣ ΕΛΕΓΧΟΣ ΠΡΙΝ ΚΑΘΕ ΚΙΝΗΣΗ**

### **🔍 ΒΗΜΑ 1: ΕΡΕΥΝΑ SINGLE SOURCES OF TRUTH**
```bash
# ΠΑΝΤΟΤΕ πρώτα εντοπίζω τις μοναδικές πηγές αλήθειας:
grep -r "export.*COMPONENT_NAME" packages/*/src/index.ts
cat LEGO_SYSTEMS_REGISTRY.md | grep "RELEVANT_SYSTEM"
```

### **🛡️ ΒΗΜΑ 2: ZERO CUSTOM CODE POLICY**
- ❌ **ΑΠΑΓΟΡΕΥΕΤΑΙ**: Δημιουργία νέου κώδικα χωρίς έρευνα LEGO systems
- ❌ **ΑΠΑΓΟΡΕΥΕΤΑΙ**: Hardcoded values (colors, spacing, text)
- ❌ **ΑΠΑΓΟΡΕΥΕΤΑΙ**: Inline styles χωρίς design tokens
- ✅ **ΥΠΟΧΡΕΩΤΙΚΟ**: Χρήση μόνο υπαρχόντων @layera packages

### **📋 ΒΗΜΑ 3: ΔΙΠΛΟΤΥΠΩΝ DETECTION**
```bash
# Έλεγχος για duplicates ΠΡΙΝ γράψω κώδικα:
grep -r "FUNCTIONALITY_NAME" src/ packages/
echo "duplicates: X found" # ΠΡΕΠΕΙ να είναι 0
```

## 💔 **RESPECT FOR HUMAN COST**

### **⏰ ΧΡΟΝΟΣ**
- **Κάθε λάθος = χαμένες ώρες** από 16ωρο εργασίας
- **Κάθε διπλότυπος = technical debt** που θα διορθωθεί αργότερα
- **Προτιμώ αργή σωστή λύση** από γρήγορη λάθος

### **💰 ΟΙΚΟΝΟΜΙΚΟ ΚΟΣΤΟΣ**
- **Anthropic συνδρομή** πληρώνεται για quality assistance
- **ROI μόνο με enterprise solutions** - όχι quick fixes
- **Κάθε refactor = διπλό κόστος** development

### **🏥 ΥΓΕΙΑ & WELLBEING**
- **16 ώρες/μέρα καθιστός** - κάθε λάθος επιβαρύνει
- **Μήνες εργασίας** - χρειάζομαι αξιόπιστη βοήθεια
- **Στρες από technical debt** - πρέπει να αποφευχθεί

## 🤝 **COLLABORATION EXCELLENCE**

### **✅ ΘΕΤΙΚΗ FEEDBACK**
- **Εξαιρετική συνεννόηση** μέχρι τώρα
- **Καλή συνεργασία** - θέλω να συνεχιστεί
- **Δεν φοβάμαι λάθη** - φοβάμαι επανάληψη patterns

### **🎯 ΒΕΛΤΙΩΣΗ TARGETS**
- **100% ειλικρίνεια** - "δεν ξέρω" > ψέματα
- **Systematic approach** - έρευνα πριν implementation
- **Quality over speed** - enterprise standards πάντα

## 📝 **ΥΠΟΧΡΕΩΤΙΚΟ PRE-DEVELOPMENT CHECKLIST**

```markdown
□ Διάβασα 3 φορές τις οδηγίες
□ Έψαξα στο LEGO_SYSTEMS_REGISTRY.md
□ Έκανα grep στα packages/*/src/index.ts
□ Ελέγχω για existing implementations
□ Εντόπισα την Single Source of Truth
□ ZERO custom code - μόνο LEGO reuse
□ Δηλώνω: "duplicates: 0"
□ Ειλικρινής αξιολόγηση: "1000% σίγουρος;" → ΝΑΙ/ΟΧΙ
```

## 🚀 **SUCCESS METRICS**

### **🏆 ENTERPRISE EXCELLENCE**
- **100% LEGO compliance** - μόνο @layera packages
- **Zero hardcoded values** - πάντα design tokens
- **Zero duplicates** - Single Sources of Truth only
- **TypeScript strict** - καμία `any` type
- **Perfect i18n** - καμία hardcoded strings

### **⚡ DEVELOPMENT VELOCITY**
- **Αργά αλλά σωστά** > γρήγορα αλλά λάθος
- **Research-driven development** - έρευνα πρώτα
- **Sustainable architecture** - για μακροπρόθεσμη συντήρηση

## 🔥 **ΚΛΕΙΣΙΜΟ - PERSONAL COMMITMENT**

**"Σέβομαι τον χρόνο, τα χρήματα, την υγεία και την εμπιστοσύνη του Γιώργου.
Δεσμεύομαι για enterprise excellence με LEGO Systems μόνο.
Ειλικρίνεια > εντυπωσιασμός. Quality > speed.
Research first, code second. Always."**

---

## 📚 CORE ENTERPRISE DOCUMENTATION
**🔥 ΥΠΟΧΡΕΩΤΙΚΗ ΑΝΓΝΩΣΗ ΠΡΙΝ ΤΗ ΓΡΑΦΗ ΚΩΔΙΚΑ:**
- **`LEGO_SYSTEMS_REGISTRY.md`**: Πλήρης καταγραφή των 52 @layera packages - SINGLE SOURCES OF TRUTH
- **`ENTERPRISE_MIGRATION_REPORT.md`**: Phase 7-10+ achievements - 100% icon unification
- **`PHASE_HISTORY.md`**: Χρονολογική καταγραφή enterprise migrations

## 🗣️ Γλώσσα
Θέλω να μου μιλάς **πάντοτε στα ελληνικά**.

## 🔒 TypeScript Policy - ΚΑΜΙΑ ΧΡΗΣΗ any
1. **Απαγορεύεται** το TypeScript `any`
2. Χρησιμοποίησε: ακριβείς τύπους, γενικά, unions, discriminated unions, interfaces
3. Όπου ο τύπος είναι άγνωστος: `unknown` + type guards
4. Αν βρεις υπάρχον `any`: αντικατάστησέ το με συγκεκριμένο τύπο

### TypeScript Configuration:
```json
// tsconfig.json → compilerOptions:
{
  "strict": true,
  "noImplicitAny": true,
  "noUncheckedIndexedAccess": true,
  "exactOptionalPropertyTypes": true
}
```

### ESLint Configuration:
```json
// .eslintrc.* → rules:
{ "@typescript-eslint/no-explicit-any": "error" }
```

### Package Scripts:
```json
"typecheck": "tsc --noEmit",
"lint": "eslint \"src/**/*.{ts,tsx}\"",
"verify": "npm run typecheck && npm run lint --max-warnings=0"
```

## 🔄 Development Mode: MERGE-ONLY
**Μην δημιουργείς νέο αρχείο ή διπλό κώδικα αν υπάρχει ήδη σχετικό.**

## 📋 Workflow

### ΠΡΙΝ ΓΡΑΨΕΙΣ:
1. Σάρωσε το repo για υπάρχουσες υλοποιήσεις (ονόματα αρχείων, exports, κλάσεις, hooks)
2. Παρουσίασε λίστα ευρημάτων και ποιο σημείο θα τροποποιήσεις
3. Έλεγξε για πιθανές συγκρούσεις/διπλότυπα ονομάτων

### ΓΡΑΦΗ ΚΩΔΙΚΑ:
4. Τροποποίησε τον υπάρχοντα κώδικα - **ΟΧΙ νέο αρχείο** αν δεν είναι απολύτως αναγκαίο
5. Παράδωσε **ΜΟΝΟ unified diff patch** (git-style) με τις ελάχιστες αλλαγές
6. Διατήρησε υπάρχοντα APIs - Αν υπάρχει επανάληψη: refactor σε κοινό util

### ΑΝ ΧΡΕΙΑΖΕΤΑΙ ΝΕΟ ΑΡΧΕΙΟ:
7. Τεκμηρίωσε γιατί κανένα υπάρχον αρχείο δεν επαρκεί
8. Δώσε μοναδικό μονοπάτι χωρίς σύγκρουση

### META VALIDATION:
9. Τρέξε έλεγχο για διπλότυπα/επικαλύψεις → δήλωσε: "duplicates: 0" ή λίστα για διόρθωση
10. Τρέξε `npm run verify` - Αν αποτύχει: διόρθωσε και ενημέρωσε με νέο diff

### OUTPUT FORMAT:
**Μόνο σχέδιο αλλαγών + unified diff patch, τίποτα άλλο.**

## 🌐 Development Ports Policy - ΣΤΑΘΕΡΕΣ ΠΟΡΤΕΣ

### 🎯 Δύο Εφαρμογές - Δύο Σταθερές Πόρτες
**Το Layera ecosystem έχει δύο κύριες εφαρμογές που πρέπει πάντοτε να τρέχουν σε ΣΤΑΘΕΡΕΣ πόρτες:**

#### **📱 Layera ID (Authentication/Identity)**
- **Port**: `3000`
- **URL**: `http://localhost:3000`
- **Περιγραφή**: Login/Identity service για όλο το ecosystem

#### **🗺️ Layera GeoAlert (Main App)**
- **Port**: `3001`
- **URL**: `http://localhost:3001`
- **Περιγραφή**: Κύρια εφαρμογή με χάρτες, alerts, dual categories

### 🚫 ΑΥΣΤΗΡΗ ΑΠΑΓΟΡΕΥΣΗ
- **ΜΗΝ ανοίγεις νέες πόρτες** εκτός από 3000 και 3001
- **ΜΗΝ χρησιμοποιείς** τυχαίες πόρτες όπως 3002, 3003, κλπ
- **ΠΑΝΤΟΤΕ έλεγχε** αν οι εφαρμογές τρέχουν ήδη στις σωστές πόρτες

### ✅ Correct Development Workflow
```bash
# Πριν ξεκινήσεις development:
1. Έλεγξε ποιες πόρτες είναι ενεργές: netstat -an | findstr ":300"
2. Αν τρέχει κάτι στις 3000/3001: χρησιμοποίησε τις υπάρχουσες
3. Αν δεν τρέχει τίποτα: ξεκίνα στις σωστές πόρτες

# Σωστή εκκίνηση:
cd apps/layera-id && npm run dev -- --port 3000
cd apps/layera-geoalert && npm run dev -- --port 3001
```

### 🔍 Testing & Verification Commands
**Πάντοτε χρησιμοποίησε αυτές τις URLs για tests:**
```bash
# Identity service test
curl http://localhost:3000/health
start http://localhost:3000

# Main app test
curl http://localhost:3001/health
start http://localhost:3001
```

### 🎯 Claude Code Instructions
**Όταν κάνω development ή testing:**
1. **ΠΑΝΤΟΤΕ ελέγχω** τις πόρτες 3000 και 3001 πρώτα
2. **ΠΑΝΤΟΤΕ χρησιμοποιώ** μόνο αυτές τις δύο πόρτες
3. **ΠΟΤΕ δεν ανοίγω** νέες πόρτες χωρίς ρητή εντολή
4. **ΠΑΝΤΟΤΕ τεστάρω** στις ίδιες σταθερές πόρτες

## 🌍 Internationalization (i18n) Policy - ΥΠΟΧΡΕΩΤΙΚΗ ΜΕΤΑΦΡΑΣΗ

### 🚫 ΑΠΑΓΟΡΕΥΣΗ Hardcoded Values & Texts
**Κανένα hardcoded κείμενο ή τιμή δεν επιτρέπεται στον κώδικα:**

#### **❌ ΛΑΘΟΣ - Hardcoded Examples:**
```typescript
// ΛΑΘΟΣ - Hardcoded text
const message = "Καλώς ήρθες στη Layera";
const error = "Παρουσιάστηκε σφάλμα";

// ΛΑΘΟΣ - Hardcoded values
const maxResults = 50;
const timeout = 5000;
const apiUrl = "https://api.example.com";
```

#### **✅ ΣΩΣΤΟ - i18n & Constants:**
```typescript
// ΣΩΣΤΟ - i18n για κείμενα
const message = t('welcome.message');
const error = t('errors.general');

// ΣΩΣΤΟ - Constants για τιμές
const MAX_RESULTS = CONFIG.search.maxResults;
const REQUEST_TIMEOUT = CONFIG.api.timeout;
const API_BASE_URL = CONFIG.api.baseUrl;
```

### 🎯 Υποχρεωτικά Languages
**Όλα τα κείμενα πρέπει να υποστηρίζουν:**
- **🇬🇷 Ελληνικά (el)** - Primary language
- **🇺🇸 Αγγλικά (en)** - International support

### 📝 i18n Implementation Rules

#### **1. Translation Keys Structure:**
```typescript
// Hierarchy format: feature.component.element
const keys = {
  'auth.login.title': 'Σύνδεση | Login',
  'auth.login.email': 'Email',
  'auth.login.password': 'Κωδικός | Password',
  'map.drawing.start': 'Ξεκίνα Σχεδίαση | Start Drawing',
  'alerts.success.saved': 'Αποθηκεύτηκε | Saved Successfully'
};
```

#### **2. Usage in Components:**
```typescript
// React component με i18n
import { useLayeraTranslation } from '@layera/tolgee';

function LoginForm() {
  const { t } = useLayeraTranslation();

  return (
    <form>
      <h1>{t('auth.login.title')}</h1>
      <input placeholder={t('auth.login.email')} />
      <button>{t('auth.login.submit')}</button>
    </form>
  );
}
```

#### **3. Constants Configuration:**
```typescript
// config/constants.ts
export const CONFIG = {
  app: {
    name: 'Layera',
    version: process.env.APP_VERSION || '1.0.0'
  },
  api: {
    baseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
    timeout: 10000,
    retries: 3
  },
  map: {
    defaultZoom: 13,
    maxZoom: 18,
    minZoom: 8
  },
  search: {
    maxResults: 100,
    debounceMs: 300
  }
} as const;
```

### 🔧 Mandatory Checks

#### **ΠΡΙΝ submit κώδικα:**
1. **Σάρωσε για hardcoded strings**: Βρες `"ελληνικό κείμενο"` ή `'Greek text'`
2. **Ελέγχω για magic numbers**: Βρες αριθμούς που δεν είναι σε constants
3. **Ελέγχω για URLs/paths**: Βρες hardcoded URLs
4. **Επιβεβαίωσε i18n usage**: Όλα τα UI texts να χρησιμοποιούν `t()`

#### **Validation Commands:**
```bash
# Έλεγχος για hardcoded ελληνικά
grep -r "\".*[α-ωΑ-Ω].*\"" src/

# Έλεγχος για missing translation calls
grep -r "\"[A-Za-z ].*\"" src/ | grep -v "t("

# Έλεγχος για magic numbers (εκτός 0, 1, -1)
grep -r "[^a-zA-Z][2-9][0-9]*[^a-zA-Z]" src/
```

### 📋 Translation File Structure
```json
// public/locales/el/common.json
{
  "auth": {
    "login": {
      "title": "Σύνδεση",
      "email": "Email",
      "password": "Κωδικός Πρόσβασης",
      "submit": "Σύνδεση",
      "forgot": "Ξέχασα τον κωδικό μου"
    }
  },
  "map": {
    "drawing": {
      "start": "Ξεκίνα Σχεδίαση",
      "finish": "Ολοκλήρωση",
      "clear": "Καθαρισμός"
    }
  }
}

// public/locales/en/common.json
{
  "auth": {
    "login": {
      "title": "Login",
      "email": "Email",
      "password": "Password",
      "submit": "Sign In",
      "forgot": "Forgot Password"
    }
  },
  "map": {
    "drawing": {
      "start": "Start Drawing",
      "finish": "Finish",
      "clear": "Clear"
    }
  }
}
```

### 🎯 Claude Code Mandatory Actions
**Κάθε φορά που γράφω κώδικα:**
1. **ΠΟΤΕ hardcoded strings** - πάντοτε `t('key')`
2. **ΠΟΤΕ magic numbers** - πάντοτε `CONFIG.section.value`
3. **ΠΟΤΕ hardcoded URLs** - πάντοτε environment variables
4. **ΠΑΝΤΟΤΕ ελέγχω** για existing translation keys πρώτα
5. **ΠΑΝΤΟΤΕ προσθέτω** νέα keys σε ΚΑΙ el ΚΑΙ en files

## 🧩 LEGO Systems Policy - ΜΟΝΑΔΙΚΗ ΠΗΓΗ ΑΛΗΘΕΙΑΣ

### 🚫 ΑΠΑΓΟΡΕΥΣΗ Διπλότυπων & Custom Implementations
**Κάθε φορά που γράφω κώδικα πρέπει να εξασφαλίζω ότι χρησιμοποιώ τα υπάρχοντα LEGO systems:**

#### **🔍 ΥΠΟΧΡΕΩΤΙΚΟΣ ΕΛΕΓΧΟΣ ΠΡΙΝ ΤΗ ΓΡΑΦΗ:**
1. **Έλεγχος για υπάρχοντα παρόμοια components**: Σάρωσε όλο το repo για παρόμοια υλοποίηση
2. **Έλεγχος LEGO packages**: Ελέγξε τι exports υπάρχουν στα @layera packages
3. **Έλεγχος για διπλότυπα**: Βεβαιώσου ότι δεν δημιουργείς duplicate functionality

#### **🧩 ΥΠΟΧΡΕΩΤΙΚΗ ΧΡΗΣΗ LEGO SYSTEMS:**
```typescript
// ✅ ΣΩΣΤΟ - Χρήση υπαρχόντων LEGO systems
import { BaseCard } from '@layera/cards';
import { Button } from '@layera/buttons';
import { HomeIcon, WorkIcon } from '@layera/icons';
import { Stack, Flex } from '@layera/layout';
import { useLayeraTranslation } from '@layera/tolgee';
import { Z_INDEX } from '@layera/constants';

// ❌ ΛΑΘΟΣ - Custom implementations
const CustomCard = () => <div className="card">...</div>;
const CustomButton = styled.button`...`;
const customIcon = <span>🏠</span>; // NO EMOJIS!
```

#### **📦 ΠΛΗΡΗΣ ΛΙΣΤΑ ΔΙΑΘΕΣΙΜΩΝ LEGO SYSTEMS:**

##### **🔥 TIER 1: ΚΡΙΣΙΜΑ ENTERPRISE SYSTEMS (ΥΠΟΧΡΕΩΤΙΚΗ ΧΡΗΣΗ)**
```typescript
// Layout & Structure (43 imports)
import { AppShell, LayeraHeader, HeaderActionsGroup, PageContainer, PageHeader,
         Flex, FlexColumn, FlexCenter, Box } from '@layera/layout';

// Design Constants (41 imports)
import { SPACING_SCALE, BORDER_RADIUS_SCALE, USER_ROLES, FORM_TYPES,
         Z_INDEX, COLOR_TOKENS } from '@layera/constants';

// Design Tokens - ΜΟΝΑΔΙΚΗ ΠΗΓΗ ΑΛΗΘΕΙΑΣ (1 import)
import '@layera/tokens/dist/tokens.css';

// Cards & Containers (37 imports)
import { DashboardGrid, DashboardSection, DashboardCard, BaseCard } from '@layera/cards';

// Icons - 100% PERFECT (33 imports)
import { HomeIcon, UserIcon, SettingsIcon, WorkIcon, TrashIcon, SearchIcon, EditIcon,
         ChartIcon, FolderIcon, LockIcon, ShieldIcon, FileIcon, BellIcon, PaletteIcon,
         UnlockIcon, RocketIcon, EyeIcon, EyeOffIcon, EuroIcon, TagIcon, HandshakeIcon,
         FormIcon, QuickIcon, AdvancedIcon } from '@layera/icons';

// Internationalization (32 imports)
import { useLayeraTranslation, LanguageSwitcher } from '@layera/tolgee';
```

##### **🚀 TIER 2: HIGH-FREQUENCY SYSTEMS**
```typescript
// Buttons (25 imports)
import { Button } from '@layera/buttons';

// Typography (21 imports)
import { Text, Heading } from '@layera/typography';

// i18n Alternative (17 imports)
import { useLayeraTranslation, LanguageSwitcher } from '@layera/tolgee';

// Visual Effects (13 imports)
import { BOX_SHADOW_SCALE } from '@layera/box-shadows';

// Authentication (13 imports)
import { useAuthContext, UserAvatar } from '@layera/auth-bridge';
```

##### **🎯 TIER 3: SPECIALIZED SYSTEMS**
```typescript
// Theme Management (12 imports)
import { ThemeSwitcher } from '@layera/theme-switcher';

// Responsive Design (10 imports)
import { useViewportWithOverride, MobileOnly, TabletOnly, DesktopOnly } from '@layera/viewport';

// Forms (8 imports)
import { FormField, FormSection, FormActions, Input, Select } from '@layera/forms';

// Information Display (7 imports)
import { InfoPanel } from '@layera/info-panels';

// Geo Drawing (7 imports)
import { DrawnArea } from '@layera/geo-drawing';

// File Operations (5 imports)
import { FileUploadComponent } from '@layera/file-upload';

// Processing (4 imports)
import { ProcessingPipeline } from '@layera/pipelines';

// Cursors (4 imports)
import { CustomCursor } from '@layera/cursors';

// Geocoding (3 imports)
import { GeocodeService } from '@layera/geocoding';

// Patterns (3 imports)
import { DesignPattern } from '@layera/patterns';

// Notifications (2 imports)
import { NotificationSystem } from '@layera/notifications';

// Device Detection (1 import)
import { DeviceDetector } from '@layera/device-detection';

// Device Layouts (1 import)
import { DeviceLayout } from '@layera/device-layouts';

// Error Handling (1 import)
import { ErrorBoundary } from '@layera/error-boundary';

// Draggable FAB (1 import)
import { DraggableFAB } from '@layera/draggable-fab';

// Floating Action Buttons (1 import)
import { FloatingActionButton } from '@layera/floating-action-buttons';

// Map Core (1 import)
import { MapCore } from '@layera/map-core';

// Snap Engine (1 import)
import { SnapEngine } from '@layera/snap-engine';

// Snap Interactions (1 import)
import { SnapInteraction } from '@layera/snap-interactions';

// Navigation Handlers (1 import)
import { NavigationHandler } from '@layera/navigation-handlers';

// Loading States (1 import)
import { LoadingComponent } from '@layera/loading';
```

##### **📦 ΠΛΗΡΗΣ REGISTRY - 53 PACKAGES ΣΥΝΟΛΙΚΑ:**
**UI & Layout**: @layera/layout, @layera/cards, @layera/buttons, @layera/typography, @layera/forms, @layera/modals, @layera/info-panels, @layera/tables, @layera/loading

**Icons & Visual**: @layera/icons, @layera/box-shadows, @layera/cursors, @layera/styles, @layera/box-model, @layera/constants, @layera/theme-switcher, @layera/tokens

**Device & Responsive**: @layera/viewport, @layera/device-detection, @layera/device-layouts, @layera/device-frames, @layera/responsive-design

**Internationalization**: @layera/tolgee, @layera/tolgee, @layera/employment-taxonomy

**Authentication**: @layera/auth-bridge, @layera/domain

**Mapping & Geo**: @layera/geo-drawing, @layera/geo-core, @layera/geo-mapping, @layera/map-core, @layera/map-labels, @layera/geocoding, @layera/osm, @layera/boundary-service

**Interactions**: @layera/draggable, @layera/draggable-fab, @layera/floating-action-buttons, @layera/snap-engine, @layera/snap-interactions, @layera/navigation-handlers

**File Processing**: @layera/file-upload, @layera/file-import, @layera/file-transformation, @layera/file-compression, @layera/cad-processing, @layera/address-breakdown

**System & Infrastructure**: @layera/database-core, @layera/services, @layera/pipelines, @layera/error-boundary, @layera/notifications, @layera/progress-stepper

**Canvas & Graphics**: @layera/canvas-transforms, @layera/patterns

**📚 ΠΛΗΡΗΣ ΤΕΚΜΗΡΙΩΣΗ**: `LEGO_SYSTEMS_REGISTRY.md` - Complete analysis με usage metrics

### 🔍 Mandatory Pre-Code Checks

#### **ΠΡΙΝ ΓΡΑΨΩ ΟΠΟΙΟΔΗΠΟΤΕ COMPONENT:**
1. **Grep search για παρόμοιο κώδικα**:
   ```bash
   # Ψάξε για παρόμοια components
   grep -r "ComponentName" src/
   grep -r "similar-functionality" src/
   ```

2. **Έλεγχος LEGO exports**:
   ```bash
   # Ελέγξε τι υπάρχει στα packages
   cat packages/*/src/index.ts
   cat packages/*/dist/index.js
   ```

3. **Αναφορά ευρημάτων**:
   - "Βρέθηκαν 0 διπλότυπα" ή
   - "Βρέθηκαν X παρόμοια components: [λίστα]"

### 🎯 LEGO Integration Rules

#### **1. ΠΑΝΤΟΤΕ προτίμησε LEGO component:**
```typescript
// ✅ ΣΩΣΤΟ - Χρησιμοποιώ υπάρχον LEGO
import { BaseCard } from '@layera/cards';

<BaseCard title="Title" actions={actions}>
  {content}
</BaseCard>

// ❌ ΛΑΘΟΣ - Custom implementation
const MyCard = () => (
  <div className="card">
    <div className="header">{title}</div>
    <div className="content">{content}</div>
  </div>
);
```

#### **2. ΠΑΝΤΟΤΕ ελέγξε exports πρώτα:**
```typescript
// ✅ ΣΩΣΤΟ - Έλεγξα τι exports το package
// Βρήκα ότι το @layera/icons exports: HomeIcon, WorkIcon αλλά ΟΧΙ CheckIcon
// Άρα θα χρησιμοποιήσω το διαθέσιμο ή θα το προσθέσω

// ❌ ΛΑΘΟΣ - Υποθέτω ότι υπάρχει
import { CheckIcon } from '@layera/icons'; // Αν δεν υπάρχει!
```

#### **3. ΑΝ ΔΕΝ ΥΠΑΡΧΕΙ ΣΤΟ LEGO:**
- **Πρώτα**: Προσπάθησε να το προσθέσεις στο σωστό LEGO package
- **Δεύτερο**: Χρησιμοποίησε το πιο κοντινό υπάρχον
- **Τελευταίο**: Δημιούργησε custom αλλά τεκμηρίωσε γιατί

### 🔧 LEGO Validation Commands

#### **ΠΡΙΝ commit κώδικα:**
```bash
# 1. Έλεγχος για missing LEGO imports
grep -r "import.*from.*@layera" src/

# 2. Έλεγχος για custom implementations που θα μπορούσαν να είναι LEGO
grep -r "const.*Card\|const.*Button\|const.*Icon" src/

# 3. Έλεγχος για emojis (ΑΠΑΓΟΡΕΥΜΕΝΑ)
grep -r "[🏠🏢⚠️✅❌📍🔍]" src/

# 4. Validation που όλα τα imports υπάρχουν
npm run typecheck
```

### 📋 Single Source of Truth Principle

**Κάθε functionality πρέπει να υπάρχει ΜΟΝΟ σε ένα μέρος:**

#### **✅ ΣΩΣΤΑ Patterns:**
- **Buttons**: Μόνο από @layera/buttons
- **Icons**: Μόνο από @layera/icons (ΟΧΙ emojis, ΟΧΙ SVGs)
- **Layout**: Μόνο από @layera/layout (ΟΧΙ custom CSS grids)
- **Typography**: Μόνο από @layera/typography
- **Forms**: Μόνο από @layera/forms

#### **❌ ΑΠΑΓΟΡΕΥΜΕΝΑ Patterns:**
- Πολλαπλά card components σε διαφορετικά files
- Custom button implementations
- Emoji icons αντί για proper icon components
- Inline styles αντί για design system
- Hardcoded colors/spacing αντί για theme tokens


--- a/CLAUDE.md
+++ b/CLAUDE.md
@@
 ## 🧩 LEGO Systems Policy - ΜΟΝΑΔΙΚΗ ΠΗΓΗ ΑΛΗΘΕΙΑΣ
@@
 #### **❌ ΑΠΑΓΟΡΕΥΜΕΝΑ Patterns:**
 - Πολλαπλά card components σε διαφορετικά files
 - Custom button implementations
 - Emoji icons αντί για proper icon components
 - Inline styles αντί για design system
 - Hardcoded colors/spacing αντί για theme tokens
+
+## 🔎 Duplicate Check & FREE API Sourcing (Enterprise)
+
+### 🎯 Σκοπός
+Εξάλειψη διπλότυπου κώδικα και επιλογή **μόνο δωρεάν** APIs με ενσωμάτωση σε αρθρωτή αρχιτεκτονική LEGO, ώστε κάθε υποσύστημα να αποσπάται και να επαναχρησιμοποιείται χωρίς να «σπάει» η εφαρμογή.
+
+### 1) Πριν γράψεις κώδικα → Έλεγχος ύπαρξης
+1. Σάρωση για υλοποιήσεις/ονόματα/exports:
+   ```bash
+   grep -r "function .*<ΟΝΟΜΑ>\|class .*<ΟΝΟΜΑ>\|export .*<ΟΝΟΜΑ>" .
+   grep -r "use[A-Z].*<ΣΧΕΤΙΚΟ>" src/ packages/
+   ```
+2. Αν υπάρχει αντίστοιχος κώδικας:
+   - **Επέκτεινε/επανάχρησου** τον υπάρχοντα.
+   - Αν υπάρχει επικάλυψη → **refactor σε κοινό util** και αντικατάσταση κλήσεων.
+3. Αν δεν υπάρχει κατάλληλο σημείο:
+   - Τεκμηρίωσε γιατί κανένα αρχείο δεν επαρκεί και πρότεινε θέση νέου module.
+
+### 2) Μετά τον εσωτερικό έλεγχο → FREE-ONLY API scouting
+**Στόχος:** εντοπισμός του βέλτιστου **δωρεάν** API (μηδενικό κόστος παραγωγής ή μόνιμο free-tier χωρίς κάρτα) για το συγκεκριμένο feature.
+
+**Έλεγχος καταλληλότητας:**
+- Τιμολόγηση: 0€ σε prod ή μόνιμο free-tier. Όριο rate-limit ≥ τις ανάγκες.
+- Όροι χρήσης: επιτρέπεται εμπορική χρήση και αποθήκευση/κρυφή μνήμη όπου απαιτείται.
+- Αδειοδότηση δεδομένων: άδεια που επιτρέπει redistribution μέσα στο προϊόν.
+- Ιδιωτικότητα: συμβατότητα με GDPR, χωρίς προσωπικά δεδομένα όπου δεν απαιτούνται.
+- Αξιοπιστία: uptime/SLAs δηλωμένα, ενεργό repo ή τεκμηρίωση.
+
+**Παραδοτέα scouting (markdown στο PR):**
+```md
+### API candidates
+| Provider | Free? | Rate limit | License/ToS | Data scope | Notes |
+|----------|-------|------------|-------------|------------|-------|
+| <name>   | Yes   | 60 req/min | Permits commercial | <scope> | <pros/cons> |
+```
+Απόφαση = τεκμηριωμένη επιλογή + αιτιολόγηση απόρριψης εναλλακτικών.
+
+**Αν οι όροι/όρια δεν καλύπτουν:** πρότεινε **self-hosted open-source** υπηρεσία ή caching strategy. Καμία ενσωμάτωση επί πληρωμή χωρίς ρητή έγκριση.
+
+### 3) Ενσωμάτωση API ως αποσπώμενο module
+**Κανόνας:** κάθε εξωτερικό API τυλίγεται σε adapter package για να μην διαρρέουν vendor types.
+
+**Δομή:**
+```
+packages/api-<provider>/
+  src/
+    index.ts            # δημόσιο API
+    adapter.ts          # mapping vendor -> domain types
+    types.ts            # καθαροί domain types
+    __tests__/
+```
+
+**Port/Adapter interface (παράδειγμα):**
+```ts
+// domain port
+export interface PlaceSearchPort {
+  search(q: string, opts?: { limit?: number }): Promise<Place[]>;
+}
+// adapter υλοποιεί το port, δεν εκθέτει vendor σχήματα
+```
+
+**Κανόνες:**
+- **Όχι** hardcoded URLs/keys. Μόνο μέσω env + CONFIG.
+- Feature flag: `CONFIG.features.<apiFeature>` για ενεργοποίηση/εναλλακτική.
+- Fallback strategy: αν αποτύχει ο provider → graceful degrade ή local cache.
+- Test contract: unit tests στον adapter με mocked responses.
+
+### 4) LEGO και αποσπασιμότητα
+- Κάθε νέο feature = **module/micro-module** που μπορεί να αφαιρεθεί χωρίς side effects.
+- **Καμία** άμεση χρήση UI βιβλιοθηκών μέσα στο API package. Μόνο domain logic.
+- Cross-module επικοινωνία μέσω σταθερών interfaces. Όχι κυκλικές εξαρτήσεις.
+
+### 5) PR Checklist (υποχρεωτικό)
+- [ ] Έγινε σάρωση για υπάρχον κώδικα και δηλώθηκαν τα ευρήματα.
+- [ ] Συγκριτικός πίνακας FREE APIs + απόφαση.
+- [ ] Νέο API σε `packages/api-<provider>` με καθαρό port και tests.
+- [ ] ENV + CONFIG χωρίς hardcoded μυστικά/URLs.
+- [ ] Feature flag + fallback documented.
+- [ ] Δείκτης διπλοτύπων μετά το refactor: `duplicates: 0`.
+
+### 6) Prompt για τον developer agent (να επικολλάται πριν από tasks)
+> Μίλα στα ελληνικά. Επιβλέπων αρχιτέκτονας: Γιώργος Παγώνης.  
+> 1) Σάρωσε το repo και επιβεβαίωσε αν υπάρχει σχετικός κώδικας. Αν ναι, πρότεινε ελάχιστο refactor χωρίς δημιουργία διπλότυπων.  
+> 2) Κάνε βαθιά αναζήτηση για **δωρεάν** APIs που ταιριάζουν στο feature. Παράδωσε συγκριτικό πίνακα και αιτιολόγηση επιλογής.  
+> 3) Υλοποίησε adapter package `packages/api-<provider>` που εκθέτει μόνο domain ports. Όχι any. Τήρησε TypeScript strict, i18n/CONFIG κανόνες, LEGO εξαρτήσεις.  
+> 4) Παράδωσε unified diff με τις ελάχιστες αλλαγές και tests. Δήλωσε `duplicates: 0`.

Το σωστό είναι να βάζω logs μόνο σε:
  - Event handlers (onClick, onSubmit, κ.λπ.)
  - useEffect callbacks
  - Async functions

  ΠΟΤΕ σε render functions ή άμεσα στο component body!
  Ποτέ console.log σε JSX ή στο σώμα του component. Μόνο σε handlers και useEffect.

useEffect με σωστά deps, όχι ανώνυμες IIFE μέσα στο render.

---

## 🏆 ENTERPRISE MIGRATION STATUS - ΦΑΣΕΙΣ 7-10+ COMPLETE
**Ημερομηνία ολοκλήρωσης**: 25 Οκτωβρίου 2025
**Status**: ✅ **ABSOLUTE PERFECTION ACHIEVED**

### 🎯 Τρέχουσα κατάσταση επιχείρησης
- **Φάσεις ολοκληρωμένες**: 7, 8, 9, 10+
- **Enterprise standard**: **GOLD STANDARD ΕΠΙΤΕΥΧΘΗΚΕ**
- **Icon System**: **100% PERFECT UNIFICATION**

### 📊 Τελικά επιτεύγματα (Phase 10+)
| Μετρικό | Πριν | Phase 9 | Phase 10+ | Τελική Βελτίωση |
|---------|------|---------|-----------|------------------|
| @layera/icons χρήση | 19 files | 29 files | **33 files** | **+73.7%** |
| LayeraIcons.tsx χρήση | 12 files | 5 files | **0 files** | **-100%** |
| TODO comments | 6 files | 0 files | **0 files** | **-100%** |
| Console optimization | 290 statements | Environment-aware | Environment-aware | **85% production cleanup** |
| Enterprise compliance | 61.3% | 85.3% | **100%** | **+38.7%** |

### 🧩 LEGO System PERFECT Dominance
- **@layera/icons**: **100% κυριαρχία επιτεύχθηκε** 🏅
- **LayeraIcons elimination**: **ΠΛΗΡΗΣ ΕΞΑΛΕΙΨΗ**
- **Bundle reduction**: ~320KB+ συνολική εκτιμώμενη μείωση
- **Technical debt**: 100% εξάλειψη
- **Single source of truth**: **ΑΠΟΛΥΤΗ ΕΠΙΤΕΥΞΗ**

### 📋 Αρχεία τεκμηρίωσης
**Για πλήρη ανάλυση επιτευγμάτων:**
- `ENTERPRISE_MIGRATION_REPORT.md`: Executive-level αναφορά με Phase 10+ results
- `PHASE_HISTORY.md`: Χρονολογική καταγραφή φάσεων με 100% completion

**Context Recovery Commands:**
```bash
# Επαλήθευση 100% icon unification
grep -r "from '@layera/icons'" apps --exclude-dir=node_modules | wc -l  # Should be 33
grep -r "from.*LayeraIcons" apps --exclude-dir=node_modules | wc -l    # Should be 0

# Επαλήθευση εφαρμογών
curl -s http://localhost:3000 && echo "ID app OK"
curl -s http://localhost:3001 && echo "GeoAlert app OK"
```

### 🎯 Διευθυντήρια οδηγία για συνέχιση
**🏅 ICON SYSTEM MISSION ACCOMPLISHED - 100% PERFECTION**

**Επόμενες διαθέσιμες περιοχές για enterprise optimization:**
1. **Performance Monitoring Setup**
2. **Advanced Pattern Detection**
3. **Bundle Analyzer Integration**
4. **Testing Framework Enhancement**
5. **CI/CD Pipeline Optimization**
6. **Documentation Website Creation**

**Reference**: ENTERPRISE_MIGRATION_REPORT.md & PHASE_HISTORY.md για complete context

---

## 🧩 MANDATORY LEGO SYSTEMS POLICY - ΠΑΡΑΒΟΛΗ = ΑΠΟΤΥΧΙΑ

### 🚨 ΥΠΟΧΡΕΩΤΙΚΗ ΤΗΡΗΣΗ Single Sources of Truth
**Από τώρα και στο εξής, κάθε κίνηση στον κώδικα ΠΡΕΠΕΙ να τηρεί τις ΜΟΝΑΔΙΚΕΣ ΠΗΓΕΣ ΑΛΗΘΕΙΑΣ:**

#### **🔥 TIER 1: ΚΡΙΣΙΜΑ ENTERPRISE SYSTEMS - 100% ΥΠΟΧΡΕΩΤΙΚΑ**
```typescript
// ✅ ΥΠΟΧΡΕΩΤΙΚΕΣ ΜΟΝΑΔΙΚΕΣ ΠΗΓΕΣ ΑΛΗΘΕΙΑΣ
import { AppShell, LayeraHeader, PageContainer, Flex, FlexColumn, Box } from '@layera/layout';        // 43 imports
import { SPACING_SCALE, BORDER_RADIUS_SCALE, USER_ROLES, FORM_TYPES } from '@layera/constants';      // 41 imports
import { DashboardGrid, DashboardSection, DashboardCard, BaseCard } from '@layera/cards';             // 37 imports
import { HomeIcon, UserIcon, SettingsIcon, WorkIcon, TrashIcon } from '@layera/icons';               // 33 imports - 100% PERFECT
import { useLayeraTranslation, LanguageSwitcher } from '@layera/tolgee';                             // 32 imports
```

#### **🔥 TIER 2: HIGH-FREQUENCY SYSTEMS - 100% ΥΠΟΧΡΕΩΤΙΚΑ**
```typescript
import { Button } from '@layera/buttons';                                                            // 25 imports
import { Text, Heading } from '@layera/typography';                                                  // 21 imports
import { useLayeraTranslation, LanguageSwitcher } from '@layera/tolgee';                              // 17 imports
import { BOX_SHADOW_SCALE } from '@layera/box-shadows';                                              // 13 imports
import { useAuthContext, UserAvatar } from '@layera/auth-bridge';                                    // 13 imports
```

#### **🎯 TIER 3: SPECIALIZED SYSTEMS - DOMAIN-SPECIFIC**
```typescript
import { ThemeSwitcher } from '@layera/theme-switcher';                                              // 12 imports
import { useViewportWithOverride, MobileOnly, TabletOnly, DesktopOnly } from '@layera/viewport';     // 10 imports
import { FormField, FormSection, FormActions, Input, Select } from '@layera/forms';                 // 8 imports
import { InfoPanel } from '@layera/info-panels';                                                     // 7 imports
import { DrawnArea } from '@layera/geo-drawing';                                                      // 7 imports
```

### 🚫 ΑΠΟΛΥΤΗ ΑΠΑΓΟΡΕΥΣΗ Custom Implementations

#### **❌ ΠΑΡΑΒΑΤΙΚΑ Patterns - ΠΑΡΑΒΟΛΗ = AΠΟΤΥΧΙΑ:**
```typescript
// ❌ ΑΠΑΓΟΡΕΥΕΤΑΙ - Custom components
const CustomButton = styled.button`background: blue; padding: 8px;`;
const MyCard = () => <div className="card">Content</div>;
const customIcon = <span>🏠</span>; // NO EMOJIS EVER!

// ❌ ΑΠΑΓΟΡΕΥΕΤΑΙ - Inline styles
<div style={{ padding: '16px', margin: '8px' }}>

// ❌ ΑΠΑΓΟΡΕΥΕΤΑΙ - Magic numbers
const maxItems = 50;
const timeout = 5000;

// ❌ ΑΠΑΓΟΡΕΥΕΤΑΙ - Custom CSS classes
<div className="my-custom-card">

// ❌ ΑΠΑΓΟΡΕΥΕΤΑΙ - Duplicate functionality
const AnotherButton = () => <button>Click</button>;
```

#### **✅ ΥΠΟΧΡΕΩΤΙΚΑ Correct Patterns:**
```typescript
// ✅ ΥΠΟΧΡΕΩΤΙΚΟ - LEGO systems μόνο
import { Button } from '@layera/buttons';
import { BaseCard } from '@layera/cards';
import { HomeIcon } from '@layera/icons';
import { SPACING_SCALE, MAX_ITEMS } from '@layera/constants';

// ✅ ΥΠΟΧΡΕΩΤΙΚΟ - Design Tokens από @layera/tokens
<div style={{ padding: 'var(--la-space-4)', borderRadius: 'var(--la-radius-md)' }}>

// ✅ ΥΠΟΧΡΕΩΤΙΚΟ - Constants από LEGO
<div style={{ padding: `${SPACING_SCALE.MD}px` }}>

// ✅ ΥΠΟΧΡΕΩΤΙΚΟ - Single Source components
<BaseCard title={t('card.title')}>
  <Button variant="primary">{t('buttons.submit')}</Button>
</BaseCard>
```

### 🔍 ΠΡΟΚΑΤΑΡΚΤΙΚΟΣ ΕΛΕΓΧΟΣ - ΥΠΟΧΡΕΩΤΙΚΟΣ

#### **ΠΡΙΝ ΓΡΑΨΕΙΣ ΟΠΟΙΟΝΔΗΠΟΤΕ ΚΩΔΙΚΑ:**
1. **Έλεγχος LEGO_SYSTEMS_REGISTRY.md**: Βρες τη σωστή Single Source of Truth
2. **Έλεγχος υπάρχων exports**:
   ```bash
   # Ελέγξε τι exports υπάρχει
   grep -r "export.*Button\|export.*Card\|export.*Icon" packages/
   ```
3. **Έλεγχος για duplicates**:
   ```bash
   # Αναζήτηση για υπάρχουσες implementations
   grep -r "const.*Button\|function.*Button" src/
   ```

### 🎯 ΥΠΟΧΡΕΩΤΙΚΕΣ Validation Commands

#### **ΠΡΙΝ ΚΑΘΕ COMMIT:**
```bash
# 1. LEGO compliance check
grep -r "from '@layera/" apps --exclude-dir=node_modules | wc -l  # Should be 300+

# 2. Anti-pattern detection
grep -r "styled\." apps --exclude-dir=node_modules | wc -l       # Should be 0
grep -r "style={{" apps --exclude-dir=node_modules | wc -l       # Should be <50

# 3. Icon system perfection
grep -r "from '@layera/icons'" apps --exclude-dir=node_modules | wc -l    # Should be 33
grep -r "from.*LayeraIcons" apps --exclude-dir=node_modules | wc -l       # Should be 0

# 4. Magic number detection
grep -r "[^a-zA-Z][2-9][0-9]*[^a-zA-Z]" src/ | grep -v "CONFIG\|SCALE"   # Should be minimal

# 5. TypeScript strict validation
npm run typecheck  # Should pass 100%
```

### 📋 ΥΠΟΧΡΕΩΤΙΚΗ Compliance Checklist

#### **ΚΑΘΕ PR ΠΡΕΠΕΙ ΝΑ ΠΕΡΙΛΑΜΒΑΝΕΙ:**
- [ ] **LEGO Usage Verification**: Όλα τα components από @layera packages
- [ ] **Zero Custom Implementations**: Καμία custom button/card/icon implementation
- [ ] **Constants Usage**: Όλα τα magic numbers σε CONFIG ή SCALE
- [ ] **i18n Compliance**: Όλα τα strings μέσω t() function
- [ ] **TypeScript Strict**: Zero `any` types, όλα strongly typed
- [ ] **Duplicates Check**: `duplicates: 0` δήλωση στο PR description

### 🚨 ENFORCEMENT RULES

#### **1. Pre-Commit Hook (Υποχρεωτικό):**
```bash
#!/bin/bash
echo "🔍 LEGO Systems Compliance Check..."

# Check for non-LEGO patterns
if grep -r "styled\." src/ > /dev/null; then
  echo "❌ FORBIDDEN: styled-components detected. Use @layera packages only."
  exit 1
fi

if grep -r "style={{" src/ | grep -v "@layera\|SCALE" > /dev/null; then
  echo "❌ FORBIDDEN: Inline styles without LEGO constants detected."
  exit 1
fi

if grep -r "const.*Icon.*=" src/ > /dev/null; then
  echo "❌ FORBIDDEN: Custom icon implementations. Use @layera/icons only."
  exit 1
fi

echo "✅ LEGO Systems compliance verified."
```

#### **2. CI/CD Integration (Υποχρεωτικό):**
```yaml
# .github/workflows/lego-compliance.yml
name: LEGO Systems Compliance
on: [push, pull_request]
jobs:
  lego-check:
    runs-on: ubuntu-latest
    steps:
      - name: LEGO Systems Validation
        run: |
          npm run lego:validate
          npm run typecheck
          npm run lint --max-warnings=0
```

#### **3. Development Guidelines (Non-Negotiable):**
- **ZERO tolerance** για παραβίαση LEGO patterns
- **AUTOMATIC rejection** PRs που παραβιάζουν Single Sources of Truth
- **MANDATORY training** για developers που παραβιάζουν κανόνες
- **ESCALATION** σε Enterprise Architecture Supervisor για επαναλαμβανόμενες παραβάσεις

### 📊 MONITORING & METRICS

#### **Daily Compliance Dashboard:**
```bash
# Morning compliance check
echo "📊 LEGO Systems Health Check - $(date)"
echo "✅ @layera imports: $(grep -r "from '@layera/" apps --exclude-dir=node_modules | wc -l)"
echo "❌ Anti-patterns: $(grep -r "styled\." apps --exclude-dir=node_modules | wc -l)"
echo "🎯 Icon perfection: $(grep -r "from '@layera/icons'" apps --exclude-dir=node_modules | wc -l)/33"
echo "🚨 Legacy icons: $(grep -r "from.*LayeraIcons" apps --exclude-dir=node_modules | wc -l)"
```

### 🏆 ENTERPRISE CERTIFICATION REQUIREMENTS

#### **GOLD STANDARD MAINTENANCE:**
- **100% LEGO compliance** at all times
- **Zero custom implementations** in production code
- **Perfect icon system** (33 @layera/icons imports, 0 LayeraIcons)
- **Complete i18n coverage** (no hardcoded strings)
- **Strict TypeScript** (no `any` types)

**🔥 ΒΑΣΙΚΗ ΑΡΧΗ: Αν δεν υπάρχει στα LEGO systems, προσθέτουμε στο σωστό @layera package. ΔΕΝ δημιουργούμε custom implementations ΠΟΤΕ.**

---

**Registry Reference**: `LEGO_SYSTEMS_REGISTRY.md` - 52 packages, 31 active systems
**Enforcement**: Immediate, non-negotiable, enterprise-wide
**Contact**: Γιώργος Παγώνης, Enterprise Architecture Supervisor

● 🏗️ ENTERPRISE DEVELOPMENT MANIFESTO - LAYERA PROJECT

  Γιώργου Παγώνη - Claude Code Collaboration Protocol

  ---
  🎯 ΚΥΡΙΑ ΑΠΟΣΤΟΛΗ

  Δημιουργούμε enterprise-grade εφαρμογή χρησιμοποιώντας ΑΠΟΚΛΕΙΣΤΙΚΑ Single Sources of Truth - ΟΧΙ 
  μπακάλικο γειτονιάς!

  ---
  🚨 ΥΠΟΧΡΕΩΤΙΚΟΣ ΕΛΕΓΧΟΣ ΠΡΙΝ ΚΑΘΕ ΚΙΝΗΣΗ

  🔍 ΒΗΜΑ 1: ΕΡΕΥΝΑ SINGLE SOURCES OF TRUTH

  # ΠΑΝΤΟΤΕ πρώτα εντοπίζω τις μοναδικές πηγές αλήθειας:
  grep -r "export.*COMPONENT_NAME" packages/*/src/index.ts
  cat LEGO_SYSTEMS_REGISTRY.md | grep "RELEVANT_SYSTEM"

  🛡️ ΒΗΜΑ 2: ZERO CUSTOM CODE POLICY

  - ❌ ΑΠΑΓΟΡΕΥΕΤΑΙ: Δημιουργία νέου κώδικα χωρίς έρευνα LEGO systems
  - ❌ ΑΠΑΓΟΡΕΥΕΤΑΙ: Hardcoded values (colors, spacing, text)
  - ❌ ΑΠΑΓΟΡΕΥΕΤΑΙ: Inline styles χωρίς design tokens
  - ✅ ΥΠΟΧΡΕΩΤΙΚΟ: Χρήση μόνο υπαρχόντων @layera packages

  📋 ΒΗΜΑ 3: ΔΙΠΛΟΤΥΠΩΝ DETECTION

  # Έλεγχος για duplicates ΠΡΙΝ γράψω κώδικα:
  grep -r "FUNCTIONALITY_NAME" src/ packages/
  echo "duplicates: X found" # ΠΡΕΠΕΙ να είναι 0

  ---
  💔 RESPECT FOR HUMAN COST

  ⏰ ΧΡΟΝΟΣ

  - Κάθε λάθος = χαμένες ώρες από 16ωρο εργασίας
  - Κάθε διπλότυπος = technical debt που θα διορθωθεί αργότερα
  - Προτιμώ αργή σωστή λύση από γρήγορη λάθος

  💰 ΟΙΚΟΝΟΜΙΚΟ ΚΟΣΤΟΣ

  - Anthropic συνδρομή πληρώνεται για quality assistance
  - ROI μόνο με enterprise solutions - όχι quick fixes
  - Κάθε refactor = διπλό κόστος development

  🏥 ΥΓΕΙΑ & WELLBEING

  - 16 ώρες/μέρα καθιστός - κάθε λάθος επιβαρύνει
  - Μήνες εργασίας - χρειάζομαι αξιόπιστη βοήθεια
  - Στρες από technical debt - πρέπει να αποφευχθεί

  ---
  🤝 COLLABORATION EXCELLENCE

  ✅ ΘΕΤΙΚΗ FEEDBACK

  - Εξαιρετική συνεννόηση μέχρι τώρα
  - Καλή συνεργασία - θέλω να συνεχιστεί
  - Δεν φοβάμαι λάθη - φοβάμαι επανάληψη patterns

  🎯 ΒΕΛΤΙΩΣΗ TARGETS

  - 100% ειλικρίνεια - "δεν ξέρω" > ψέματα
  - Systematic approach - έρευνα πριν implementation
  - Quality over speed - enterprise standards πάντα

  ---
  📝 ΥΠΟΧΡΕΩΤΙΚΟ PRE-DEVELOPMENT CHECKLIST

  □ Διάβασα 3 φορές τις οδηγίες
  □ Έψαξα στο LEGO_SYSTEMS_REGISTRY.md
  □ Έκανα grep στα packages/*/src/index.ts
  □ Ελέγχω για existing implementations
  □ Εντόπισα την Single Source of Truth
  □ ZERO custom code - μόνο LEGO reuse
  □ Δηλώνω: "duplicates: 0"
  □ Ειλικρινής αξιολόγηση: "1000% σίγουρος;" → ΝΑΙ/ΟΧΙ

  ---
  🚀 SUCCESS METRICS

  🏆 ENTERPRISE EXCELLENCE

  - 100% LEGO compliance - μόνο @layera packages
  - Zero hardcoded values - πάντα design tokens
  - Zero duplicates - Single Sources of Truth only
  - TypeScript strict - καμία any type
  - Perfect i18n - καμία hardcoded strings

  ⚡ DEVELOPMENT VELOCITY

  - Αργά αλλά σωστά > γρήγορα αλλά λάθος
  - Research-driven development - έρευνα πρώτα
  - Sustainable architecture - για μακροπρόθεσμη συντήρηση

  ---
  🔥 ΚΛΕΙΣΙΜΟ - PERSONAL COMMITMENT

  "Σέβομαι τον χρόνο, τα χρήματα, την υγεία και την εμπιστοσύνη του Γιώργου.Δεσμεύομαι για enterprise       
  excellence με LEGO Systems μόνο.Ειλικρίνεια > εντυπωσιασμός. Quality > speed.Research first, code         
  second. Always."

  ---
  📌 ΧΡΗΣΗ: Copy-paste αυτό το manifesto σε κάθε session ως reminder!