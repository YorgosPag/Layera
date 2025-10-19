# 🏗️ Διάσπαση UnifiedPipeline - LEGO Architecture Compliance

## 📋 Κρίσιμο Πρόβλημα
Το `UnifiedPipeline.tsx` είναι 1600+ γραμμές monolithic component που παραβιάζει όλες τις αρχές του enterprise development:

- ❌ Inline CSS chaos
- ❌ State management anti-patterns
- ❌ No separation of concerns
- ❌ Missing validation
- ❌ No reusability
- ❌ Unmaintainable codebase

## 🎯 Στόχος: Enterprise LEGO Architecture

### 🚫 ΑΠΑΓΟΡΕΥΣΗ Custom Implementations
**Όλα τα components ΜΟΝΟ από υπάρχοντα @layera LEGO systems:**

```typescript
// ✅ ΣΩΣΤΟ - LEGO Systems Only
import { BaseCard } from '@layera/cards';
import { Button } from '@layera/buttons';
import { Text, Heading } from '@layera/typography';
import { Stack, Flex } from '@layera/layout';
import { FormField, Input, FormActions } from '@layera/forms';
import { LocationIcon, SaveIcon } from '@layera/icons';

// ❌ ΑΠΑΓΟΡΕΥΜΕΝΟ - Custom Code
const CustomCard = () => <div className="card">...</div>;
const customIcon = <span>🏠</span>;
```

### 📦 Διαθέσιμα LEGO Systems
```typescript
// Αυτά ΜΟΝΟ χρησιμοποιούμε:
import { BaseCard, DashboardCard } from '@layera/cards';
import { Button } from '@layera/buttons';
import { Text, Heading } from '@layera/typography';
import { Stack, Flex, Grid } from '@layera/layout';
import { FormField, Input, TextArea, FormSection, FormActions } from '@layera/forms';
import { AllIcons } from '@layera/icons'; // ΟΧΙ emojis!
import { useLayeraTranslation } from '@layera/i18n';
import { Z_INDEX, COMPONENT_VARIANTS, COLOR_SCHEMES } from '@layera/constants';
```

## 🏗️ Αρχιτεκτονική Διάσπασης

### 1️⃣ State & Logic Layer
```
packages/pipelines/unified/
├── state/
│   ├── machine.ts          // XState state machine
│   ├── types.ts           // Discriminated unions
│   ├── selectors.ts       // State selectors
│   ├── guards.ts          // Navigation guards
│   └── actions.ts         // State actions
├── hooks/
│   ├── useUnifiedPipeline.ts  // Main orchestration
│   ├── useGeo.ts             // Geolocation/search
│   └── useUpload.ts          // File handling
```

### 2️⃣ Domain Layer
```
packages/domain/unified/
├── schemas.ts      // Zod validation schemas
├── mappers.ts      // UI ↔ API DTO mappers
├── constants.ts    // Enums, labels, units
└── types.ts        // Business types
```

### 3️⃣ Pure UI Steps (LEGO Components Only)
```
packages/pipelines/unified/steps/
├── CategoryStep.tsx         // ONLY @layera/cards + @layera/icons
├── IntentStep.tsx          // ONLY @layera/buttons + @layera/typography
├── TransactionTypeStep.tsx // ONLY LEGO systems
├── EmploymentTypeStep.tsx  // ONLY LEGO systems
├── AvailabilityStep.tsx    // ONLY LEGO systems
├── AvailabilityDetailsStep.tsx // ONLY @layera/forms
├── LocationStep.tsx        // ONLY LEGO systems
├── LayoutStep.tsx          // ONLY LEGO systems + NO inline CSS
├── DetailsStep.tsx         // ONLY @layera/forms
└── CompleteStep.tsx        // ONLY LEGO systems
```

### 4️⃣ Shared LEGO Components
```
packages/pipelines/unified/components/
├── StepScaffold.tsx    // ONLY @layera/layout + @layera/typography
├── UploadCard.tsx      // ONLY @layera/cards + @layera/icons
├── DrawingLauncher.tsx // ONLY @layera/cards + @layera/icons
├── ScaleControls.tsx   // ONLY @layera/forms + @layera/buttons
└── RotateControls.tsx  // ONLY @layera/buttons + @layera/layout
```

### 5️⃣ Design System Integration
```
packages/styles/pipeline/
├── tokens.css          // Design tokens ONLY
├── components.css      // Component-specific styles
└── responsive.css      // Mobile optimization
```

### 6️⃣ i18n Layer
```
packages/i18n/unified/
├── el.json            // Greek translations
└── en.json            // English translations
```

## 🔧 Κρίσιμες Διορθώσεις

### 1. handleBack Bug Fix
```typescript
// ❌ Τωρινό πρόβλημα:
const handleBack = () => { /* no params */ };
// Αλλά καλείται: handleBack('transactionType')

// ✅ Διόρθωση:
const handleBack = (from?: PipelineStep) => {
  // Proper navigation logic
};
```

### 2. State Management Fix
```typescript
// ❌ Stale closure trap:
setPipelineState({ ...pipelineState, newField: value });

// ✅ Functional update:
setPipelineState(current => ({ ...current, newField: value }));

// 🎯 Καλύτερα: XState machine
const [state, send] = useMachine(pipelineMachine);
```

### 3. CSS Architecture Fix
```typescript
// ❌ Runtime CSS injection:
React.useEffect(() => {
  const style = document.createElement('style');
  style.textContent = `...`;
  document.head.appendChild(style);
}, []);

// ✅ Design system classes:
className="layera-pipeline-card layera-hover-effect"
```

### 4. Validation Integration
```typescript
// ✅ Zod + react-hook-form per step:
const CategoryStepSchema = z.discriminatedUnion('category', [
  z.object({ category: z.literal('property') }),
  z.object({ category: z.literal('job') })
]);

const { formState: { isValid } } = useForm({
  resolver: zodResolver(CategoryStepSchema)
});
```

## 📋 Step Props Interface
```typescript
// Κάθε Step component:
type StepProps<TValues> = {
  values: TValues;
  onBack: () => void;
  onNext: (partial: Partial<TValues>) => void;
  isLoading?: boolean;
  errors?: Record<string, string>;
};

// Παράδειγμα CategoryStep:
export const CategoryStep: React.FC<StepProps<CategoryStepValues>> = ({
  values,
  onNext,
  onBack
}) => {
  return (
    <Stack spacing="md"> {/* @layera/layout */}
      <Heading as="h3" size="lg" color="primary"> {/* @layera/typography */}
        {t('pipeline.category.title')}
      </Heading>

      <BaseCard clickable onClick={() => onNext({ category: 'property' })}> {/* @layera/cards */}
        <Flex align="center" gap="lg"> {/* @layera/layout */}
          <VillaIcon size="xl" theme="primary" /> {/* @layera/icons */}
          <Text size="xl" weight="bold"> {/* @layera/typography */}
            {t('pipeline.category.property')}
          </Text>
        </Flex>
      </BaseCard>
    </Stack>
  );
};
```

## 🎯 Discriminated Unions για Type Safety
```typescript
type PipelineBase = {
  step: PipelineStep;
  availability: Availability | null;
};

type PropertyOffer = PipelineBase & {
  category: 'property';
  intent: 'offer';
  transactionType: TransactionType;
  layoutData?: LayoutData; // Μόνο για Property + Offer + Now
};

type JobSearch = PipelineBase & {
  category: 'job';
  intent: 'search';
  employmentType: EmploymentType;
};

type Pipeline = PropertyOffer | JobSearch | PropertySearch | JobOffer;
```

## 🚀 XState Machine Example
```typescript
const pipelineMachine = createMachine({
  id: 'unifiedPipeline',
  initial: 'category',
  context: {
    category: null,
    intent: null,
    // ... other fields
  },
  states: {
    category: {
      on: {
        SET_CATEGORY: {
          target: 'intent',
          actions: assign({ category: (_, event) => event.category })
        }
      }
    },
    intent: {
      on: {
        SET_INTENT: [
          {
            target: 'transactionType',
            guard: 'isProperty',
            actions: assign({ intent: (_, event) => event.intent })
          },
          {
            target: 'employmentType',
            guard: 'isJob',
            actions: assign({ intent: (_, event) => event.intent })
          }
        ],
        BACK: 'category'
      }
    }
    // ... άλλα states
  }
});
```

## 📁 Final Package Structure
```
packages/
├── pipelines/unified/           // Main pipeline package
├── domain/unified/              // Business logic
├── services/geo/               // Geolocation services
├── services/storage/           // File upload
├── services/telemetry/         // Analytics
├── i18n/unified/               // Translations
└── styles/pipeline/            // Design tokens

apps/layera-geoalert/
└── src/components/
    └── UnifiedPipelineModal.tsx  // Simple integration wrapper
```

## ⚠️ ΚΡΙΣΙΜΟΙ ΚΑΝΟΝΕΣ

1. **ΜΟΝΟ @layera LEGO systems** - ΟΧΙ custom components
2. **ΟΧΙ inline CSS** - Μόνο design system classes
3. **ΟΧΙ emojis** - Μόνο @layera/icons
4. **ΟΧΙ magic numbers** - Μόνο @layera/constants
5. **ΟΧΙ hardcoded strings** - Μόνο i18n keys
6. **XState ή useReducer** - ΟΧΙ useState chaos
7. **Zod validation** - ΟΧΙ manual validation
8. **Pure functions** - ΟΧΙ side effects σε components

## 🎯 Success Metrics
- ✅ <200 γραμμές per component
- ✅ 100% LEGO system usage
- ✅ 0 inline styles
- ✅ 0 custom implementations
- ✅ Type-safe state machine
- ✅ Full i18n coverage
- ✅ Complete test coverage

**Η διάσπαση είναι ΥΠΟΧΡΕΩΤΙΚΗ για enterprise-grade codebase!**