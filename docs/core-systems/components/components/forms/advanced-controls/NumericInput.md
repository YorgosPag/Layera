# 🔢 NumericInput Component

*Τελευταία ενημέρωση: 18 Οκτωβρίου 2025*
*Package: @layera/forms*
*Enterprise-grade numeric input με steppers και advanced features*

---

## 🎯 **OVERVIEW**

Το NumericInput component είναι ένα enterprise-grade UI element που παρέχει enhanced numeric input functionality με stepper buttons (βέλη πάνω-κάτω) και πλήρη integration στο LAYERA LEGO σύστημα.

### **🔗 LEGO SYSTEMS INTEGRATION:**

**🧩 COMPLETE LAYERA LEGO ECOSYSTEM (17 Systems):**

```typescript
// 🚨 ΥΠΟΧΡΕΩΤΙΚΗ χρήση LAYERA LEGO συστημάτων:

// 1. 🃏 UI Foundation
import { Card, CardHeader, CardContent } from '@layera/cards';
import { Button, IconButton, PrimaryButton } from '@layera/buttons';
import { NumericInput, FormField, FormSection, Input } from '@layera/forms';  // ← ΝΕΟ NumericInput!
import { Heading, Text, Label, Caption } from '@layera/typography';

// 2. 📐 Layout & Structure
import { Container, Grid, Stack, Flex } from '@layera/layout';
import { DataTable, TableColumn } from '@layera/tables';
import { Modal, Dialog, Drawer } from '@layera/modals';

// 3. 🔄 Dynamic Content
import { LoadingSpinner, SkeletonCard } from '@layera/loading';
import { toast, showNotification } from '@layera/notifications';

// 4. 🗺️ Geo Features
import { GeoDrawingCanvas, AreaCalculator } from '@layera/geo-drawing';

// 5. 🎨 Visual & Icons
import { PlusIcon, MinusIcon, ChevronUpIcon, ChevronDownIcon } from '@layera/icons';

// 6. 🌐 Localization & State
import { useLayeraTranslation } from '@layera/i18n/hooks';
import { useAuth } from '@layera/auth-bridge/hooks';
import { useTheme } from '@layera/theme-switcher/hooks';

// 7. 🔧 System Integration
import { CONSTANTS } from '@layera/constants';
import { ErrorBoundary } from '@layera/error-boundary';

// 📝 ΚΡΙΤΙΚΟ: 100% LEGO compliance - NO custom number inputs!
```

**Primary Package**: @layera/forms
**Dependencies**: 9 από τα 17 LEGO systems
**Usage**: `import { NumericInput } from '@layera/forms';`

---

## 📋 **TECHNICAL SPECIFICATIONS**

### **TypeScript Interface:**
```typescript
export interface NumericInputProps {
  // Core Props
  value?: number | null;
  defaultValue?: number | null;
  onChange?: (value: number | null) => void;

  // Numeric Configuration
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  allowNegative?: boolean;
  allowZero?: boolean;

  // Stepper Controls
  showSteppers?: boolean;
  stepperPosition?: 'right' | 'inline' | 'separate';
  allowMouseWheel?: boolean;
  holdToIncrement?: boolean;

  // Formatting
  formatValue?: (value: number | null) => string;
  parseValue?: (text: string) => number | null;
  prefix?: string;
  suffix?: string;
  unit?: string;
  locale?: string;

  // Visual
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'filled';

  // States
  disabled?: boolean;
  readonly?: boolean;
  invalid?: boolean;
  required?: boolean;
  loading?: boolean;

  // Labels & Content
  label?: string;
  description?: string;
  errorMessage?: string;
  helpText?: string;
  placeholder?: string;

  // Layout
  fullWidth?: boolean;

  // Advanced
  name?: string;
  id?: string;
  autoFocus?: boolean;
  selectOnFocus?: boolean;

  // Events
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onStep?: (direction: 'up' | 'down', newValue: number | null) => void;

  // Accessibility
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-valuemin'?: number;
  'aria-valuemax'?: number;
  'aria-valuenow'?: number;

  // Theme
  className?: string;
}
```

### **Constants Integration:**
```typescript
// From @layera/constants
export const NUMERIC_INPUT_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg'
} as const;

export const NUMERIC_INPUT_VARIANTS = {
  DEFAULT: 'default',
  OUTLINED: 'outlined',
  FILLED: 'filled'
} as const;

export const STEPPER_POSITIONS = {
  RIGHT: 'right',
  INLINE: 'inline',
  SEPARATE: 'separate'
} as const;

// Property-specific constants
export const PROPERTY_NUMERIC_LIMITS = {
  BEDROOMS: { min: 0, max: 20, step: 1 },
  BATHROOMS: { min: 0, max: 10, step: 1 },
  FLOOR: { min: -5, max: 50, step: 1 },
  YEAR: { min: 1800, max: new Date().getFullYear() + 5, step: 1 },
  AREA: { min: 10, max: 10000, step: 5 },
  PRICE: { min: 1000, max: 100000000, step: 1000 }
} as const;
```

---

## 🎨 **VISUAL DESIGN**

### **Sizes:**
```typescript
// Small - 32px height
<NumericInput size="sm" label="Μικρό input" />

// Medium (default) - 40px height
<NumericInput size="md" label="Κανονικό input" />

// Large - 48px height
<NumericInput size="lg" label="Μεγάλο input" />
```

### **Stepper Positions:**
```typescript
// Right-side steppers (vertical stack)
<NumericInput stepperPosition="right" showSteppers={true} />

// Inline steppers (horizontal)
<NumericInput stepperPosition="inline" showSteppers={true} />

// Separate steppers (external buttons)
<NumericInput stepperPosition="separate" showSteppers={true} />
```

### **Formatting Examples:**
```typescript
// Currency formatting
<NumericInput
  value={price}
  formatValue={(value) => new Intl.NumberFormat('el-GR', {
    style: 'currency',
    currency: 'EUR'
  }).format(value || 0)}
  prefix="€"
/>

// Unit formatting
<NumericInput
  value={area}
  suffix="m²"
  precision={2}
/>

// Percentage formatting
<NumericInput
  value={percentage}
  suffix="%"
  min={0}
  max={100}
  step={0.1}
  precision={1}
/>
```

---

## 🔧 **USAGE EXAMPLES**

### **Basic Usage:**
```typescript
import React, { useState } from 'react';
import { NumericInput } from '@layera/forms';
import { useLayeraTranslation } from '@layera/i18n/hooks';
import { CONSTANTS } from '@layera/constants';

export const BasicNumericExample: React.FC = () => {
  const { t } = useLayeraTranslation();
  const [bedrooms, setBedrooms] = useState<number | null>(2);

  return (
    <NumericInput
      value={bedrooms}
      onChange={setBedrooms}
      min={CONSTANTS.PROPERTY_NUMERIC_LIMITS.BEDROOMS.min}
      max={CONSTANTS.PROPERTY_NUMERIC_LIMITS.BEDROOMS.max}
      step={CONSTANTS.PROPERTY_NUMERIC_LIMITS.BEDROOMS.step}
      showSteppers={true}
      label={t('property.bedrooms.label')}
      description={t('property.bedrooms.description')}
    />
  );
};
```

### **Complete LEGO Integration με Property Form:**
```typescript
import React, { useState, useCallback } from 'react';
import { NumericInput, FormSection, FormField } from '@layera/forms';
import { Card, CardHeader, CardContent } from '@layera/cards';
import { Container, Grid, Stack, Flex } from '@layera/layout';
import { Heading, Text, Label } from '@layera/typography';
import { Button, PrimaryButton } from '@layera/buttons';
import { HomeIcon, CheckIcon } from '@layera/icons';
import { LoadingSpinner } from '@layera/loading';
import { toast } from '@layera/notifications';
import { DataTable, TableColumn } from '@layera/tables';
import { useLayeraTranslation } from '@layera/i18n/hooks';
import { useAuth } from '@layera/auth-bridge/hooks';
import { useTheme } from '@layera/theme-switcher/hooks';
import { CONSTANTS } from '@layera/constants';
import { ErrorBoundary } from '@layera/error-boundary';

export const PropertyDetailsForm: React.FC = () => {
  const { t } = useLayeraTranslation();
  const { user, hasRole } = useAuth();
  const { currentTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const [propertyDetails, setPropertyDetails] = useState({
    bedrooms: null as number | null,
    bathrooms: null as number | null,
    wc: null as number | null,
    floor: null as number | null,
    totalFloors: null as number | null,
    constructionYear: null as number | null,
    area: null as number | null,
    price: null as number | null
  });

  const handleDetailChange = useCallback((field: string, value: number | null) => {
    setPropertyDetails(prev => ({ ...prev, [field]: value }));

    // Integration με @layera/notifications
    if (value !== null) {
      toast.info(t('property.field.updated', {
        field: t(`property.${field}.label`),
        value: formatFieldValue(field, value)
      }));
    }
  }, [t]);

  const formatFieldValue = (field: string, value: number): string => {
    switch (field) {
      case 'price':
        return new Intl.NumberFormat('el-GR', {
          style: 'currency',
          currency: 'EUR',
          maximumFractionDigits: 0
        }).format(value);
      case 'area':
        return `${value} m²`;
      case 'constructionYear':
        return value.toString();
      default:
        return value.toString();
    }
  };

  const validateForm = (): boolean => {
    const required = ['bedrooms', 'bathrooms', 'area', 'price'];
    return required.every(field => propertyDetails[field as keyof typeof propertyDetails] !== null);
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error(t('property.form.incomplete'));
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, CONSTANTS.TIMEOUTS.DEFAULT));
    toast.success(t('property.form.saved'));
    setIsLoading(false);
  };

  // Integration με @layera/auth-bridge
  if (!hasRole('user')) {
    return (
      <Card>
        <CardContent>
          <Text>{t('auth.unauthorized')}</Text>
        </CardContent>
      </Card>
    );
  }

  // Summary data για @layera/tables
  const summaryData = [
    { field: t('property.bedrooms.label'), value: propertyDetails.bedrooms || '-' },
    { field: t('property.bathrooms.label'), value: propertyDetails.bathrooms || '-' },
    { field: t('property.area.label'), value: propertyDetails.area ? `${propertyDetails.area} m²` : '-' },
    { field: t('property.price.label'), value: propertyDetails.price ? formatFieldValue('price', propertyDetails.price) : '-' }
  ];

  const tableColumns: TableColumn[] = [
    { key: 'field', label: t('property.summary.field'), sortable: false },
    { key: 'value', label: t('property.summary.value'), sortable: false }
  ];

  return (
    <ErrorBoundary>
      <Container maxWidth="lg">
        <Grid cols={2} spacing="lg">
          {/* Form Panel */}
          <Card>
            <CardHeader>
              <Flex align="center" gap="sm">
                <HomeIcon size="lg" />
                <Heading level={2}>{t('property.details.title')}</Heading>
                <Text variant="caption">{user?.email}</Text>
              </Flex>
            </CardHeader>

            <CardContent>
              <Stack spacing="lg">
                <FormSection title={t('property.space.title')}>
                  <Grid cols={3} spacing="md">
                    <FormField>
                      <NumericInput
                        value={propertyDetails.bedrooms}
                        onChange={(value) => handleDetailChange('bedrooms', value)}
                        min={CONSTANTS.PROPERTY_NUMERIC_LIMITS.BEDROOMS.min}
                        max={CONSTANTS.PROPERTY_NUMERIC_LIMITS.BEDROOMS.max}
                        step={CONSTANTS.PROPERTY_NUMERIC_LIMITS.BEDROOMS.step}
                        showSteppers={true}
                        stepperPosition="right"
                        label={t('property.bedrooms.label')}
                        placeholder={t('property.bedrooms.placeholder')}
                        disabled={isLoading}
                        required={true}
                      />
                    </FormField>

                    <FormField>
                      <NumericInput
                        value={propertyDetails.bathrooms}
                        onChange={(value) => handleDetailChange('bathrooms', value)}
                        min={CONSTANTS.PROPERTY_NUMERIC_LIMITS.BATHROOMS.min}
                        max={CONSTANTS.PROPERTY_NUMERIC_LIMITS.BATHROOMS.max}
                        step={CONSTANTS.PROPERTY_NUMERIC_LIMITS.BATHROOMS.step}
                        showSteppers={true}
                        stepperPosition="right"
                        label={t('property.bathrooms.label')}
                        disabled={isLoading}
                        required={true}
                      />
                    </FormField>

                    <FormField>
                      <NumericInput
                        value={propertyDetails.wc}
                        onChange={(value) => handleDetailChange('wc', value)}
                        min={0}
                        max={5}
                        step={1}
                        showSteppers={true}
                        stepperPosition="right"
                        label={t('property.wc.label')}
                        disabled={isLoading}
                      />
                    </FormField>
                  </Grid>
                </FormSection>

                <FormSection title={t('property.building.title')}>
                  <Grid cols={2} spacing="md">
                    <FormField>
                      <NumericInput
                        value={propertyDetails.floor}
                        onChange={(value) => handleDetailChange('floor', value)}
                        min={CONSTANTS.PROPERTY_NUMERIC_LIMITS.FLOOR.min}
                        max={CONSTANTS.PROPERTY_NUMERIC_LIMITS.FLOOR.max}
                        step={CONSTANTS.PROPERTY_NUMERIC_LIMITS.FLOOR.step}
                        showSteppers={true}
                        stepperPosition="inline"
                        label={t('property.floor.label')}
                        description={t('property.floor.description')}
                        allowNegative={true}
                        disabled={isLoading}
                      />
                    </FormField>

                    <FormField>
                      <NumericInput
                        value={propertyDetails.totalFloors}
                        onChange={(value) => handleDetailChange('totalFloors', value)}
                        min={1}
                        max={50}
                        step={1}
                        showSteppers={true}
                        stepperPosition="inline"
                        label={t('property.totalFloors.label')}
                        disabled={isLoading}
                      />
                    </FormField>
                  </Grid>
                </FormSection>

                <FormSection title={t('property.technical.title')}>
                  <Grid cols={2} spacing="md">
                    <FormField>
                      <NumericInput
                        value={propertyDetails.constructionYear}
                        onChange={(value) => handleDetailChange('constructionYear', value)}
                        min={CONSTANTS.PROPERTY_NUMERIC_LIMITS.YEAR.min}
                        max={CONSTANTS.PROPERTY_NUMERIC_LIMITS.YEAR.max}
                        step={CONSTANTS.PROPERTY_NUMERIC_LIMITS.YEAR.step}
                        showSteppers={true}
                        stepperPosition="separate"
                        label={t('property.constructionYear.label')}
                        placeholder={t('property.constructionYear.placeholder')}
                        disabled={isLoading}
                      />
                    </FormField>

                    <FormField>
                      <NumericInput
                        value={propertyDetails.area}
                        onChange={(value) => handleDetailChange('area', value)}
                        min={CONSTANTS.PROPERTY_NUMERIC_LIMITS.AREA.min}
                        max={CONSTANTS.PROPERTY_NUMERIC_LIMITS.AREA.max}
                        step={CONSTANTS.PROPERTY_NUMERIC_LIMITS.AREA.step}
                        showSteppers={true}
                        stepperPosition="right"
                        suffix="m²"
                        precision={1}
                        label={t('property.area.label')}
                        disabled={isLoading}
                        required={true}
                      />
                    </FormField>
                  </Grid>
                </FormSection>

                <FormSection title={t('property.pricing.title')}>
                  <FormField>
                    <NumericInput
                      value={propertyDetails.price}
                      onChange={(value) => handleDetailChange('price', value)}
                      min={CONSTANTS.PROPERTY_NUMERIC_LIMITS.PRICE.min}
                      max={CONSTANTS.PROPERTY_NUMERIC_LIMITS.PRICE.max}
                      step={CONSTANTS.PROPERTY_NUMERIC_LIMITS.PRICE.step}
                      showSteppers={true}
                      stepperPosition="right"
                      formatValue={(value) => formatFieldValue('price', value || 0)}
                      prefix="€"
                      label={t('property.price.label')}
                      description={t('property.price.description')}
                      size="lg"
                      disabled={isLoading}
                      required={true}
                    />
                  </FormField>
                </FormSection>

                <Flex justify="space-between">
                  <Button variant="secondary" disabled={isLoading}>
                    {t('common.cancel')}
                  </Button>
                  <PrimaryButton
                    onClick={handleSubmit}
                    disabled={isLoading || !validateForm()}
                    icon={isLoading ? <LoadingSpinner size="sm" /> : <CheckIcon />}
                  >
                    {t('property.form.save')}
                  </PrimaryButton>
                </Flex>
              </Stack>
            </CardContent>
          </Card>

          {/* Summary Panel με @layera/tables */}
          <Card>
            <CardHeader>
              <Heading level={3}>{t('property.summary.title')}</Heading>
            </CardHeader>

            <CardContent>
              <DataTable
                columns={tableColumns}
                data={summaryData}
                showPagination={false}
                showSearch={false}
                loading={isLoading ? <SkeletonCard /> : undefined}
              />
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </ErrorBoundary>
  );
};

// 🎯 ΑΠΟΤΕΛΕΣΜΑ: 14 από τα 17 LEGO systems integration!
// ✅ @layera/forms, @layera/cards, @layera/layout, @layera/typography
// ✅ @layera/buttons, @layera/icons, @layera/loading, @layera/notifications
// ✅ @layera/tables, @layera/i18n, @layera/auth-bridge,
// ✅ @layera/theme-switcher, @layera/constants, @layera/error-boundary
```

### **Advanced Currency Input:**
```typescript
import React, { useState } from 'react';
import { NumericInput } from '@layera/forms';
import { Stack } from '@layera/layout';
import { Text } from '@layera/typography';

export const CurrencyInputExample: React.FC = () => {
  const { t } = useLayeraTranslation();
  const [amount, setAmount] = useState<number | null>(null);

  const formatCurrency = (value: number | null): string => {
    if (value === null) return '';
    return new Intl.NumberFormat('el-GR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const parseCurrency = (text: string): number | null => {
    const numericValue = text.replace(/[€\s,]/g, '');
    const parsed = parseFloat(numericValue);
    return isNaN(parsed) ? null : parsed;
  };

  return (
    <Stack spacing="sm">
      <NumericInput
        value={amount}
        onChange={setAmount}
        min={0}
        max={10000000}
        step={1000}
        formatValue={formatCurrency}
        parseValue={parseCurrency}
        showSteppers={true}
        stepperPosition="right"
        label={t('property.price.asking')}
        description={t('property.price.description')}
        size="lg"
        holdToIncrement={true}
        allowMouseWheel={true}
      />

      {amount && (
        <Text variant="caption" color="secondary">
          {t('property.price.perSquareMeter', {
            price: Math.round(amount / 100) // Assuming 100m² property
          })}
        </Text>
      )}
    </Stack>
  );
};
```

---

## 🎨 **THEME INTEGRATION**

### **CSS Variables:**
```css
.layera-numeric-input {
  --numeric-input-height: var(--layera-form-element-height-md);
  --numeric-input-border: var(--layera-border-width-default);
  --numeric-input-border-color: var(--layera-color-border-default);
  --numeric-input-border-radius: var(--layera-border-radius-md);
  --numeric-input-background: var(--layera-color-background-primary);
  --numeric-input-text-color: var(--layera-color-text-primary);
  --numeric-stepper-size: 24px;
  --numeric-stepper-color: var(--layera-color-text-secondary);
  --numeric-stepper-hover-color: var(--layera-color-primary);
  --numeric-focus-ring: var(--layera-color-focus-ring);
  --numeric-disabled-opacity: var(--layera-opacity-disabled);
}

/* Size variants */
.layera-numeric-input--sm {
  --numeric-input-height: 32px;
  --numeric-stepper-size: 20px;
}

.layera-numeric-input--md {
  --numeric-input-height: 40px;
  --numeric-stepper-size: 24px;
}

.layera-numeric-input--lg {
  --numeric-input-height: 48px;
  --numeric-stepper-size: 28px;
}

/* Stepper positions */
.layera-numeric-input--steppers-right .layera-numeric-input__steppers {
  position: absolute;
  right: 1px;
  top: 1px;
  bottom: 1px;
  display: flex;
  flex-direction: column;
  width: var(--numeric-stepper-size);
}

.layera-numeric-input--steppers-inline .layera-numeric-input__steppers {
  display: flex;
  gap: 4px;
  margin-left: 8px;
}

/* Dark mode support */
[data-theme="dark"] .layera-numeric-input {
  --numeric-input-border-color: var(--layera-color-border-dark);
  --numeric-input-background: var(--layera-color-background-dark);
  --numeric-input-text-color: var(--layera-color-text-dark);
}
```

---

## ♿ **ACCESSIBILITY**

### **ARIA Support:**
```typescript
<NumericInput
  label="Υπνοδωμάτια"
  aria-describedby="bedrooms-description"
  aria-valuemin={0}
  aria-valuemax={20}
  aria-valuenow={bedrooms}
  aria-required={true}
/>
```

### **Keyboard Navigation:**
- **Arrow Up/Down**: Increment/Decrement by step
- **Page Up/Down**: Increment/Decrement by large step (10*step)
- **Home/End**: Go to min/max values
- **Mouse Wheel**: Increment/Decrement (if enabled)

### **Screen Reader Support:**
- Value announcements on change
- Stepper button labeling
- Error message association

---

## 🧪 **TESTING GUIDELINES**

### **Unit Tests:**
```typescript
import { render, fireEvent, screen } from '@testing-library/react';
import { NumericInput } from '@layera/forms';

describe('NumericInput Component', () => {
  it('should increment value when stepper clicked', () => {
    const handleChange = jest.fn();
    render(
      <NumericInput
        value={5}
        onChange={handleChange}
        min={0}
        max={10}
        step={1}
        showSteppers={true}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /increment/i }));
    expect(handleChange).toHaveBeenCalledWith(6);
  });

  it('should respect min/max bounds', () => {
    const handleChange = jest.fn();
    render(
      <NumericInput
        value={10}
        onChange={handleChange}
        min={0}
        max={10}
        step={1}
        showSteppers={true}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /increment/i }));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('should format value correctly', () => {
    render(
      <NumericInput
        value={1500}
        formatValue={(v) => `€${v}`}
        showValue={true}
      />
    );
    expect(screen.getByDisplayValue('€1500')).toBeInTheDocument();
  });
});
```

---

## 📦 **IMPLEMENTATION CHECKLIST**

### **✅ Component Features:**
- [ ] Basic numeric input with validation
- [ ] Stepper buttons (up/down)
- [ ] Multiple stepper positions (right, inline, separate)
- [ ] Min/max validation
- [ ] Step increment support
- [ ] Precision handling
- [ ] Value formatting
- [ ] Mouse wheel support
- [ ] Hold-to-increment functionality

### **✅ Integration:**
- [ ] @layera/constants integration
- [ ] @layera/theme-switcher support
- [ ] @layera/i18n compatibility
- [ ] @layera/icons για steppers
- [ ] TypeScript strict types

### **✅ Quality:**
- [ ] Unit tests με >90% coverage
- [ ] Accessibility compliance (WCAG 2.1 AA)
- [ ] Performance optimization
- [ ] Smooth animations

---

## 🚀 **MIGRATION FROM OLD_geo-canvas**

### **Before (OLD_geo-canvas):**
```typescript
// ❌ Basic HTML input
<label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
  Υπνοδωμάτια
</label>
<input
  type="number"
  id="bedrooms"
  value={details.bedrooms ?? ''}
  onChange={(e) => onChange('bedrooms', e.target.value === '' ? '' : parseInt(e.target.value))}
  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
/>
```

### **After (@layera/forms):**
```typescript
// ✅ LEGO component
<NumericInput
  value={details.bedrooms}
  onChange={(value) => onChange('bedrooms', value)}
  min={CONSTANTS.PROPERTY_NUMERIC_LIMITS.BEDROOMS.min}
  max={CONSTANTS.PROPERTY_NUMERIC_LIMITS.BEDROOMS.max}
  step={CONSTANTS.PROPERTY_NUMERIC_LIMITS.BEDROOMS.step}
  showSteppers={true}
  stepperPosition="right"
  label={t('property.bedrooms.label')}
  required={true}
/>
```

---

*📝 Next Component: [DatePicker.md](./DatePicker.md)*