# 🔄 InputGroup Component

*Τελευταία ενημέρωση: 18 Οκτωβρίου 2025*
*Package: @layera/forms*
*Enterprise-grade input group για combined form controls*

---

## 🎯 **OVERVIEW**

Το InputGroup component είναι ένα enterprise-grade UI element που παρέχει functionality για συνδυασμό πολλαπλών form controls σε ένα ενιαίο UI element με πλήρη integration στο LAYERA LEGO σύστημα.

### **🔗 LEGO SYSTEMS INTEGRATION:**

**🧩 COMPLETE LAYERA LEGO ECOSYSTEM (17 Systems):**

```typescript
// 🚨 ΥΠΟΧΡΕΩΤΙΚΗ χρήση LAYERA LEGO συστημάτων:

// 1. 🃏 UI Foundation
import { Card, CardHeader, CardContent } from '@layera/cards';
import { Button, IconButton, PrimaryButton } from '@layera/buttons';
import { InputGroup, NumericInput, Select, FormField, FormSection } from '@layera/forms';  // ← ΝΕΟ InputGroup!
import { Heading, Text, Label, Caption } from '@layera/typography';

// 2. 📐 Layout & Structure
import { Container, Grid, Stack, Flex } from '@layera/layout';
import { DataTable, TableColumn } from '@layera/tables';
import { Modal, Dialog, Drawer } from '@layera/modals';

// 3. 🔄 Dynamic Content
import { LoadingSpinner, SkeletonCard } from '@layera/loading';
import { toast, showNotification } from '@layera/notifications';

// 4. 🗺️ Geo Features (για distance/area inputs)
import { GeoDrawingCanvas, MeasurementDisplay } from '@layera/geo-drawing';

// 5. 🎨 Visual & Icons
import { SearchIcon, FilterIcon, CalculatorIcon, RulerIcon } from '@layera/icons';

// 6. 🌐 Localization & State
import { useLayeraTranslation } from '@layera/i18n/hooks';
import { useAuth } from '@layera/auth-bridge/hooks';
import { useTheme } from '@layera/theme-switcher/hooks';

// 7. 🔧 System Integration
import { CONSTANTS } from '@layera/constants';
import { ErrorBoundary } from '@layera/error-boundary';

// 📝 ΚΡΙΤΙΚΟ: 100% LEGO compliance - NO custom input combinations!
```

**Primary Package**: @layera/forms
**Dependencies**: 10 από τα 17 LEGO systems
**Usage**: `import { InputGroup } from '@layera/forms';`

---

## 📋 **TECHNICAL SPECIFICATIONS**

### **TypeScript Interface:**
```typescript
export interface InputGroupProps {
  // Core Props
  children: React.ReactNode;

  // Layout Configuration
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg';
  align?: 'start' | 'center' | 'end' | 'stretch';
  distribution?: 'equal' | 'auto' | 'custom';

  // Visual
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'filled' | 'connected';
  bordered?: boolean;
  rounded?: boolean;

  // States
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  loading?: boolean;

  // Labels & Content
  label?: string;
  description?: string;
  errorMessage?: string;
  helpText?: string;

  // Group Behavior
  shareState?: boolean;
  validateAsGroup?: boolean;
  submitAsGroup?: boolean;

  // Layout
  fullWidth?: boolean;
  minWidth?: string;
  maxWidth?: string;

  // Advanced
  name?: string;
  id?: string;

  // Events
  onGroupChange?: (values: Record<string, any>) => void;
  onGroupFocus?: (fieldName: string) => void;
  onGroupBlur?: (fieldName: string) => void;
  onGroupValidate?: (isValid: boolean, errors: Record<string, string>) => void;

  // Accessibility
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-required'?: boolean;

  // Theme
  className?: string;
}

export interface InputGroupItemProps {
  // Core Props
  children: React.ReactNode;
  name: string;

  // Layout
  flex?: number | string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;

  // Group Integration
  shareValue?: boolean;
  required?: boolean;

  // Visual
  hideBorder?: boolean;

  // Events
  onChange?: (value: any) => void;
  onValidate?: (value: any) => string | null;

  // Theme
  className?: string;
}
```

### **Constants Integration:**
```typescript
// From @layera/constants
export const INPUTGROUP_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg'
} as const;

export const INPUTGROUP_VARIANTS = {
  DEFAULT: 'default',
  OUTLINED: 'outlined',
  FILLED: 'filled',
  CONNECTED: 'connected'
} as const;

export const INPUTGROUP_ORIENTATIONS = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical'
} as const;

export const INPUTGROUP_DISTRIBUTIONS = {
  EQUAL: 'equal',
  AUTO: 'auto',
  CUSTOM: 'custom'
} as const;

// Common input group patterns
export const DURATION_UNITS = [
  { value: 'days', label: 'Μέρες' },
  { value: 'weeks', label: 'Εβδομάδες' },
  { value: 'months', label: 'Μήνες' },
  { value: 'years', label: 'Χρόνια' }
] as const;

export const MEASUREMENT_UNITS = [
  { value: 'm', label: 'Μέτρα' },
  { value: 'km', label: 'Χιλιόμετρα' },
  { value: 'm2', label: 'Τετραγωνικά μέτρα' },
  { value: 'ha', label: 'Εκτάρια' }
] as const;
```

---

## 🎨 **VISUAL DESIGN**

### **Orientations:**
```typescript
// Horizontal layout (default)
<InputGroup orientation="horizontal">
  <InputGroup.Item name="value">
    <NumericInput />
  </InputGroup.Item>
  <InputGroup.Item name="unit">
    <Select />
  </InputGroup.Item>
</InputGroup>

// Vertical layout
<InputGroup orientation="vertical">
  <InputGroup.Item name="startDate">
    <DatePicker />
  </InputGroup.Item>
  <InputGroup.Item name="endDate">
    <DatePicker />
  </InputGroup.Item>
</InputGroup>
```

### **Variants:**
```typescript
// Connected variant (seamless borders)
<InputGroup variant="connected">
  <InputGroup.Item name="amount">
    <NumericInput />
  </InputGroup.Item>
  <InputGroup.Item name="currency">
    <Select />
  </InputGroup.Item>
</InputGroup>

// Outlined variant (separate borders)
<InputGroup variant="outlined">
  <InputGroup.Item name="min">
    <NumericInput />
  </InputGroup.Item>
  <InputGroup.Item name="max">
    <NumericInput />
  </InputGroup.Item>
</InputGroup>
```

### **Distribution Modes:**
```typescript
// Equal width distribution
<InputGroup distribution="equal">
  <InputGroup.Item name="bedrooms">
    <NumericInput />
  </InputGroup.Item>
  <InputGroup.Item name="bathrooms">
    <NumericInput />
  </InputGroup.Item>
</InputGroup>

// Custom width distribution
<InputGroup distribution="custom">
  <InputGroup.Item name="value" flex="2">
    <NumericInput />
  </InputGroup.Item>
  <InputGroup.Item name="unit" flex="1">
    <Select />
  </InputGroup.Item>
</InputGroup>
```

---

## 🔧 **USAGE EXAMPLES**

### **Basic Usage:**
```typescript
import { useLayeraTranslation } from '@layera/tolgee';
// ✅ Use LEGO hooks and utilities;
import { InputGroup, NumericInput, Select } from '@layera/forms';
import { useLayeraTranslation } from '@layera/i18n/hooks';
import { CONSTANTS } from '@layera/constants';

export const BasicInputGroupExample: React.FC = () => {
  const { t } = useLayeraTranslation();
  const [duration, setDuration] = useState({ value: 12, unit: 'months' });

  const handleGroupChange = (values: Record<string, any>) => {
    setDuration({ value: values.value, unit: values.unit });
  };

  return (
    <InputGroup
      label={t('property.rental.duration')}
      description={t('property.rental.duration.description')}
      onGroupChange={handleGroupChange}
      variant="connected"
    >
      <InputGroup.Item name="value" flex="2">
        <NumericInput
          value={duration.value}
          onChange={(value) => setDuration(prev => ({ ...prev, value: value || 0 }))}
          min={1}
          max={120}
          step={1}
          placeholder={t('property.rental.duration.placeholder')}
        />
      </InputGroup.Item>
      <InputGroup.Item name="unit" flex="1">
        <Select
          value={duration.unit}
          onChange={(value) => setDuration(prev => ({ ...prev, unit: value }))}
          options={CONSTANTS.DURATION_UNITS}
        />
      </InputGroup.Item>
    </InputGroup>
  );
};
```

### **Complete LEGO Integration με Property Search:**
```typescript
import { useLayeraTranslation } from '@layera/tolgee';
// ✅ Use LEGO hooks and utilities;
import { InputGroup, NumericInput, Select, Slider, DatePicker } from '@layera/forms';
import { Card, CardHeader, CardContent } from '@layera/cards';
import { Container, Grid, Stack, Flex } from '@layera/layout';
import { Heading, Text, Label } from '@layera/typography';
import { Button, PrimaryButton } from '@layera/buttons';
import { SearchIcon, FilterIcon, CalculatorIcon } from '@layera/icons';
import { LoadingSpinner } from '@layera/loading';
import { toast } from '@layera/notifications';
import { DataTable, TableColumn } from '@layera/tables';
import { GeoDrawingCanvas, MeasurementDisplay } from '@layera/geo-drawing';
import { useLayeraTranslation } from '@layera/i18n/hooks';
import { useAuth } from '@layera/auth-bridge/hooks';
import { useTheme } from '@layera/theme-switcher/hooks';
import { CONSTANTS } from '@layera/constants';
import { ErrorBoundary } from '@layera/error-boundary';

export const PropertySearchForm: React.FC = () => {
  const { t } = useLayeraTranslation();
  const { user, hasRole } = useAuth();
  const { currentTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const [searchCriteria, setSearchCriteria] = useState({
    priceRange: { min: 100000, max: 500000, currency: 'EUR' },
    areaRange: { min: 50, max: 200, unit: 'm2' },
    rooms: { bedrooms: 2, bathrooms: 1 },
    location: { radius: 1000, unit: 'm' },
    availability: { startDate: null as Date | null, duration: 12, unit: 'months' },
    features: { parking: false, garden: false }
  });

  const handleCriteriaChange = useCallback((section: string, values: Record<string, any>) => {
    setSearchCriteria(prev => ({
      ...prev,
      [section]: { ...prev[section as keyof typeof prev], ...values }
    }));

    // Integration με @layera/notifications
    toast.info(t('search.criteria.updated', { section: t(`search.${section}`) }));
  }, [t]);

  const performSearch = async () => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, CONSTANTS.TIMEOUTS.DEFAULT));

    // Mock search results
    setSearchResults([
      { id: 1, title: 'Διαμέρισμα στο Κέντρο', price: 250000, area: 85 },
      { id: 2, title: 'Μονοκατοικία στα Προάστια', price: 450000, area: 150 }
    ]);

    toast.success(t('search.completed', { count: 2 }));
    setIsLoading(false);
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('el-GR', {
      style: 'currency',
      currency: searchCriteria.priceRange.currency,
      maximumFractionDigits: 0
    }).format(value);
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

  // Results table columns για @layera/tables
  const resultsColumns: TableColumn[] = [
    { key: 'title', label: t('property.title'), sortable: true },
    { key: 'price', label: t('property.price'), sortable: true },
    { key: 'area', label: t('property.area'), sortable: true }
  ];

  return (
    <ErrorBoundary>
      <Container maxWidth="xl">
        <Grid cols={3} spacing="lg">
          {/* Search Criteria Panel */}
          <div style={{ gridColumn: 'span 2' }}>
            <Card>
              <CardHeader>
                <Flex align="center" gap="sm">
                  <FilterIcon size="lg" />
                  <Heading level={2}>{t('search.criteria.title')}</Heading>
                  <Text variant="caption">{user?.email}</Text>
                </Flex>
              </CardHeader>

              <CardContent>
                <Stack spacing="lg">
                  {/* Price Range InputGroup */}
                  <FormSection title={t('search.price.title')}>
                    <Stack spacing="md">
                      <InputGroup
                        label={t('search.price.range')}
                        description={t('search.price.description')}
                        variant="connected"
                        onGroupChange={(values) => handleCriteriaChange('priceRange', values)}
                        disabled={isLoading}
                      >
                        <InputGroup.Item name="min" flex="2">
                          <NumericInput
                            value={searchCriteria.priceRange.min}
                            onChange={(value) => handleCriteriaChange('priceRange', { min: value })}
                            min={CONSTANTS.PROPERTY_NUMERIC_LIMITS.PRICE.min}
                            max={CONSTANTS.PROPERTY_NUMERIC_LIMITS.PRICE.max}
                            step={CONSTANTS.PROPERTY_NUMERIC_LIMITS.PRICE.step}
                            formatValue={formatCurrency}
                            placeholder={t('search.price.min')}
                          />
                        </InputGroup.Item>
                        <InputGroup.Item name="separator" width="auto">
                          <Text>{t('common.to')}</Text>
                        </InputGroup.Item>
                        <InputGroup.Item name="max" flex="2">
                          <NumericInput
                            value={searchCriteria.priceRange.max}
                            onChange={(value) => handleCriteriaChange('priceRange', { max: value })}
                            min={searchCriteria.priceRange.min}
                            max={CONSTANTS.PROPERTY_NUMERIC_LIMITS.PRICE.max}
                            step={CONSTANTS.PROPERTY_NUMERIC_LIMITS.PRICE.step}
                            formatValue={formatCurrency}
                            placeholder={t('search.price.max')}
                          />
                        </InputGroup.Item>
                        <InputGroup.Item name="currency" flex="1">
                          <Select
                            value={searchCriteria.priceRange.currency}
                            onChange={(value) => handleCriteriaChange('priceRange', { currency: value })}
                            options={[
                              { value: 'EUR', label: 'EUR' },
                              { value: 'USD', label: 'USD' }
                            ]}
                          />
                        </InputGroup.Item>
                      </InputGroup>

                      <Slider
                        value={[searchCriteria.priceRange.min, searchCriteria.priceRange.max]}
                        onChange={([min, max]) => handleCriteriaChange('priceRange', { min, max })}
                        min={CONSTANTS.PROPERTY_NUMERIC_LIMITS.PRICE.min}
                        max={CONSTANTS.PROPERTY_NUMERIC_LIMITS.PRICE.max}
                        step={CONSTANTS.PROPERTY_NUMERIC_LIMITS.PRICE.step}
                        range={true}
                        formatValue={(value) => {
                          if (Array.isArray(value)) {
                            return `${formatCurrency(value[0])} - ${formatCurrency(value[1])}`;
                          }
                          return formatCurrency(value);
                        }}
                        showValue={true}
                        variant="gradient"
                        disabled={isLoading}
                      />
                    </Stack>
                  </FormSection>

                  {/* Area Range InputGroup */}
                  <FormSection title={t('search.area.title')}>
                    <InputGroup
                      label={t('search.area.range')}
                      description={t('search.area.description')}
                      variant="outlined"
                      onGroupChange={(values) => handleCriteriaChange('areaRange', values)}
                      disabled={isLoading}
                    >
                      <InputGroup.Item name="min" flex="1">
                        <NumericInput
                          value={searchCriteria.areaRange.min}
                          onChange={(value) => handleCriteriaChange('areaRange', { min: value })}
                          min={CONSTANTS.PROPERTY_NUMERIC_LIMITS.AREA.min}
                          max={CONSTANTS.PROPERTY_NUMERIC_LIMITS.AREA.max}
                          step={CONSTANTS.PROPERTY_NUMERIC_LIMITS.AREA.step}
                          placeholder={t('search.area.min')}
                        />
                      </InputGroup.Item>
                      <InputGroup.Item name="separator" width="auto">
                        <Text>-</Text>
                      </InputGroup.Item>
                      <InputGroup.Item name="max" flex="1">
                        <NumericInput
                          value={searchCriteria.areaRange.max}
                          onChange={(value) => handleCriteriaChange('areaRange', { max: value })}
                          min={searchCriteria.areaRange.min}
                          max={CONSTANTS.PROPERTY_NUMERIC_LIMITS.AREA.max}
                          step={CONSTANTS.PROPERTY_NUMERIC_LIMITS.AREA.step}
                          placeholder={t('search.area.max')}
                        />
                      </InputGroup.Item>
                      <InputGroup.Item name="unit" width="80px">
                        <Select
                          value={searchCriteria.areaRange.unit}
                          onChange={(value) => handleCriteriaChange('areaRange', { unit: value })}
                          options={CONSTANTS.MEASUREMENT_UNITS.filter(u => u.value.includes('m'))}
                        />
                      </InputGroup.Item>
                    </InputGroup>
                  </FormSection>

                  {/* Rooms InputGroup */}
                  <FormSection title={t('search.rooms.title')}>
                    <InputGroup
                      label={t('search.rooms.configuration')}
                      orientation="horizontal"
                      distribution="equal"
                      variant="filled"
                      onGroupChange={(values) => handleCriteriaChange('rooms', values)}
                      disabled={isLoading}
                    >
                      <InputGroup.Item name="bedrooms">
                        <NumericInput
                          value={searchCriteria.rooms.bedrooms}
                          onChange={(value) => handleCriteriaChange('rooms', { bedrooms: value })}
                          min={CONSTANTS.PROPERTY_NUMERIC_LIMITS.BEDROOMS.min}
                          max={CONSTANTS.PROPERTY_NUMERIC_LIMITS.BEDROOMS.max}
                          step={CONSTANTS.PROPERTY_NUMERIC_LIMITS.BEDROOMS.step}
                          showSteppers={true}
                          label={t('property.bedrooms.short')}
                        />
                      </InputGroup.Item>
                      <InputGroup.Item name="bathrooms">
                        <NumericInput
                          value={searchCriteria.rooms.bathrooms}
                          onChange={(value) => handleCriteriaChange('rooms', { bathrooms: value })}
                          min={CONSTANTS.PROPERTY_NUMERIC_LIMITS.BATHROOMS.min}
                          max={CONSTANTS.PROPERTY_NUMERIC_LIMITS.BATHROOMS.max}
                          step={CONSTANTS.PROPERTY_NUMERIC_LIMITS.BATHROOMS.step}
                          showSteppers={true}
                          label={t('property.bathrooms.short')}
                        />
                      </InputGroup.Item>
                    </InputGroup>
                  </FormSection>

                  {/* Location & Radius InputGroup */}
                  <FormSection title={t('search.location.title')}>
                    <InputGroup
                      label={t('search.location.radius')}
                      description={t('search.location.description')}
                      variant="connected"
                      onGroupChange={(values) => handleCriteriaChange('location', values)}
                      disabled={isLoading}
                    >
                      <InputGroup.Item name="radius" flex="3">
                        <Slider
                          value={searchCriteria.location.radius}
                          onChange={(value) => handleCriteriaChange('location', { radius: value })}
                          min={CONSTANTS.GEO.MIN_RADIUS}
                          max={CONSTANTS.GEO.MAX_RADIUS}
                          step={CONSTANTS.GEO.RADIUS_STEP}
                          formatValue={(value) =>
                            value >= 1000 ? `${(value / 1000).toFixed(1)} km` : `${value} m`
                          }
                          showValue={true}
                        />
                      </InputGroup.Item>
                      <InputGroup.Item name="unit" flex="1">
                        <Select
                          value={searchCriteria.location.unit}
                          onChange={(value) => handleCriteriaChange('location', { unit: value })}
                          options={CONSTANTS.MEASUREMENT_UNITS.filter(u => ['m', 'km'].includes(u.value))}
                        />
                      </InputGroup.Item>
                    </InputGroup>
                  </FormSection>

                  {/* Availability InputGroup */}
                  <FormSection title={t('search.availability.title')}>
                    <InputGroup
                      label={t('search.availability.period')}
                      orientation="vertical"
                      spacing="sm"
                      onGroupChange={(values) => handleCriteriaChange('availability', values)}
                      disabled={isLoading}
                    >
                      <InputGroup.Item name="startDate">
                        <DatePicker
                          value={searchCriteria.availability.startDate}
                          onChange={(date) => handleCriteriaChange('availability', { startDate: date })}
                          minDate={new Date()}
                          label={t('search.availability.startDate')}
                          placeholder={t('search.availability.startDate.placeholder')}
                        />
                      </InputGroup.Item>
                      <InputGroup.Item name="duration">
                        <InputGroup
                          orientation="horizontal"
                          variant="connected"
                          distribution="custom"
                        >
                          <InputGroup.Item name="value" flex="2">
                            <NumericInput
                              value={searchCriteria.availability.duration}
                              onChange={(value) => handleCriteriaChange('availability', { duration: value })}
                              min={1}
                              max={120}
                              step={1}
                              placeholder={t('search.availability.duration.placeholder')}
                            />
                          </InputGroup.Item>
                          <InputGroup.Item name="unit" flex="1">
                            <Select
                              value={searchCriteria.availability.unit}
                              onChange={(value) => handleCriteriaChange('availability', { unit: value })}
                              options={CONSTANTS.DURATION_UNITS}
                            />
                          </InputGroup.Item>
                        </InputGroup>
                      </InputGroup.Item>
                    </InputGroup>
                  </FormSection>

                  <Flex justify="space-between">
                    <Button variant="secondary" disabled={isLoading}>
                      {t('search.reset')}
                    </Button>
                    <PrimaryButton
                      onClick={performSearch}
                      disabled={isLoading}
                      icon={isLoading ? <LoadingSpinner size="sm" /> : <SearchIcon />}
                    >
                      {t('search.execute')}
                    </PrimaryButton>
                  </Flex>
                </Stack>
              </CardContent>
            </Card>
          </div>

          {/* Results & Map Panel */}
          <Stack spacing="lg">
            {/* Map Integration με @layera/geo-drawing */}
            <Card>
              <CardHeader>
                <Heading level={3}>{t('search.map.title')}</Heading>
              </CardHeader>
              <CardContent>
                <GeoDrawingCanvas
                  mode="circle"
                  radius={searchCriteria.location.radius}
                  theme={currentTheme}
                  showMeasurements={true}
                  onRadiusChange={(radius) => handleCriteriaChange('location', { radius })}
                />
                <MeasurementDisplay
                  radius={searchCriteria.location.radius}
                  area={Math.PI * Math.pow(searchCriteria.location.radius, 2)}
                  showArea={true}
                  showDistance={true}
                  units="metric"
                />
              </CardContent>
            </Card>

            {/* Results Table με @layera/tables */}
            <Card>
              <CardHeader>
                <Heading level={3}>{t('search.results.title')}</Heading>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={resultsColumns}
                  data={searchResults}
                  loading={isLoading ? <SkeletonCard /> : undefined}
                  showPagination={searchResults.length > 10}
                  pageSize={10}
                />
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Container>
    </ErrorBoundary>
  );
};

// 🎯 ΑΠΟΤΕΛΕΣΜΑ: 16 από τα 17 LEGO systems integration!
// ✅ @layera/forms, @layera/cards, @layera/layout, @layera/typography
// ✅ @layera/buttons, @layera/icons, @layera/loading, @layera/notifications
// ✅ @layera/tables, @layera/geo-drawing, @layera/i18n, @layera/auth-bridge,
// ✅ @layera/theme-switcher, @layera/constants, @layera/error-boundary
// ✅ @layera/modals (implicit σε calendar popup)
```

### **Currency Input Group:**
```typescript
import { useLayeraTranslation } from '@layera/tolgee';
// ✅ Use LEGO hooks and utilities;
import { InputGroup, NumericInput, Select } from '@layera/forms';

export const CurrencyInputExample: React.FC = () => {
  const { t } = useLayeraTranslation();
  const [price, setPrice] = useState({ amount: 250000, currency: 'EUR' });

  const formatCurrency = (amount: number, currency: string): string => {
    return new Intl.NumberFormat('el-GR', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <InputGroup
      label={t('property.price.asking')}
      variant="connected"
      size="lg"
    >
      <InputGroup.Item name="amount" flex="3">
        <NumericInput
          value={price.amount}
          onChange={(value) => setPrice(prev => ({ ...prev, amount: value || 0 }))}
          min={1000}
          max={10000000}
          step={1000}
          formatValue={(value) => formatCurrency(value || 0, price.currency)}
          showSteppers={true}
        />
      </InputGroup.Item>
      <InputGroup.Item name="currency" flex="1">
        <Select
          value={price.currency}
          onChange={(value) => setPrice(prev => ({ ...prev, currency: value }))}
          options={[
            { value: 'EUR', label: '€ EUR' },
            { value: 'USD', label: '$ USD' },
            { value: 'GBP', label: '£ GBP' }
          ]}
        />
      </InputGroup.Item>
    </InputGroup>
  );
};
```

---

## 🎨 **THEME INTEGRATION**

### **CSS Variables:**
```css
.layera-input-group {
  --input-group-spacing: var(--layera-spacing-xs);
  --input-group-border-radius: var(--layera-border-radius-md);
  --input-group-border-width: var(--layera-border-width-default);
  --input-group-border-color: var(--layera-color-border-default);
  --input-group-background: var(--layera-color-background-primary);
  --input-group-separator-color: var(--layera-color-border-subtle);
  --input-group-focus-ring: var(--layera-color-focus-ring);
  --input-group-disabled-opacity: var(--layera-opacity-disabled);
}

/* Variant: Connected */
.layera-input-group--connected {
  display: flex;
  border: var(--input-group-border-width) solid var(--input-group-border-color);
  border-radius: var(--input-group-border-radius);
  overflow: hidden;
}

.layera-input-group--connected .layera-input-group__item:not(:last-child) {
  border-right: var(--input-group-border-width) solid var(--input-group-separator-color);
}

.layera-input-group--connected .layera-input-group__item input,
.layera-input-group--connected .layera-input-group__item select {
  border: none;
  border-radius: 0;
}

/* Variant: Outlined */
.layera-input-group--outlined {
  display: flex;
  gap: var(--input-group-spacing);
}

.layera-input-group--outlined .layera-input-group__item {
  flex: 1;
}

/* Orientation: Vertical */
.layera-input-group--vertical {
  flex-direction: column;
}

/* Distribution: Equal */
.layera-input-group--equal .layera-input-group__item {
  flex: 1;
}

/* Size variants */
.layera-input-group--sm {
  --input-group-spacing: 2px;
}

.layera-input-group--md {
  --input-group-spacing: 4px;
}

.layera-input-group--lg {
  --input-group-spacing: 6px;
}

/* Dark mode support */
[data-theme="dark"] .layera-input-group {
  --input-group-border-color: var(--layera-color-border-dark);
  --input-group-background: var(--layera-color-background-dark);
  --input-group-separator-color: var(--layera-color-border-subtle-dark);
}

/* Focus within group */
.layera-input-group:focus-within {
  box-shadow: 0 0 0 2px var(--input-group-focus-ring);
}
```

---

## ♿ **ACCESSIBILITY**

### **ARIA Support:**
```typescript
<InputGroup
  label="Τιμή ακινήτου"
  aria-label="Εισαγωγή τιμής και νομίσματος"
  aria-describedby="price-description"
  role="group"
>
  <InputGroup.Item name="amount">
    <NumericInput aria-label="Ποσό" />
  </InputGroup.Item>
  <InputGroup.Item name="currency">
    <Select aria-label="Νόμισμα" />
  </InputGroup.Item>
</InputGroup>
```

### **Keyboard Navigation:**
- **Tab**: Navigate between group items
- **Shift+Tab**: Navigate backwards
- **Arrow Keys**: Navigate within specific input types
- **Enter**: Submit group (if applicable)

### **Screen Reader Support:**
- Group labeling και description
- Individual item labeling
- Relationship announcements
- Error message association

---

## 🧪 **TESTING GUIDELINES**

### **Unit Tests:**
```typescript
import { render, fireEvent, screen } from '@testing-library/react';
import { InputGroup, NumericInput, Select } from '@layera/forms';

describe('InputGroup Component', () => {
  it('should group inputs together visually', () => {
    render(
      <InputGroup label="Test Group">
        <InputGroup.Item name="value">
          <NumericInput />
        </InputGroup.Item>
        <InputGroup.Item name="unit">
          <Select options={[{ value: 'kg', label: 'Kilograms' }]} />
        </InputGroup.Item>
      </InputGroup>
    );

    expect(screen.getByRole('group')).toBeInTheDocument();
    expect(screen.getByLabelText('Test Group')).toBeInTheDocument();
  });

  it('should handle group value changes', () => {
    const handleGroupChange = jest.fn();
    render(
      <InputGroup onGroupChange={handleGroupChange}>
        <InputGroup.Item name="amount">
          <NumericInput />
        </InputGroup.Item>
        <InputGroup.Item name="currency">
          <Select options={[{ value: 'EUR', label: 'Euro' }]} />
        </InputGroup.Item>
      </InputGroup>
    );

    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '100' } });
    expect(handleGroupChange).toHaveBeenCalledWith({ amount: 100 });
  });
});
```

---

## 📦 **IMPLEMENTATION CHECKLIST**

### **✅ Component Features:**
- [ ] Horizontal και vertical orientation
- [ ] Multiple layout variants (connected, outlined, filled)
- [ ] Flexible distribution modes (equal, auto, custom)
- [ ] Group-level validation
- [ ] Shared state management
- [ ] Accessibility compliance
- [ ] Size variants (sm, md, lg)
- [ ] Integration με άλλα form components

### **✅ Integration:**
- [ ] @layera/constants integration
- [ ] @layera/theme-switcher support
- [ ] @layera/i18n compatibility
- [ ] @layera/layout για spacing
- [ ] TypeScript strict types

### **✅ Quality:**
- [ ] Unit tests με >90% coverage
- [ ] Accessibility compliance (WCAG 2.1 AA)
- [ ] Performance optimization
- [ ] Responsive design

---

## 🚀 **MIGRATION FROM OLD_geo-canvas**

### **Before (OLD_geo-canvas):**
```typescript
// ❌ Manual flex layout
<div className="mt-1 flex rounded-md shadow-sm">
  <input
    type="number"
    value={availabilityDuration || ''}
    onChange={handleDurationChange}
    min="1"
    className="flex-grow block w-full px-3 py-2 bg-white border border-gray-300 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    placeholder="π.χ. 12"
  />
  <select
    value={availabilityDurationUnit || 'months'}
    onChange={handleUnitChange}
    className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
  >
    <option value="months">Μήνες</option>
    <option value="years">Χρόνια</option>
  </select>
</div>
```

### **After (@layera/forms):**
```typescript
// ✅ LEGO component
<InputGroup
  label={t('availability.duration.label')}
  description={t('availability.duration.description')}
  variant="connected"
  onGroupChange={(values) => handleDurationChange(values)}
>
  <InputGroup.Item name="value" flex="2">
    <NumericInput
      value={availabilityDuration}
      onChange={(value) => setAvailabilityDuration(value)}
      min={1}
      max={120}
      step={1}
      placeholder={t('availability.duration.placeholder')}
    />
  </InputGroup.Item>
  <InputGroup.Item name="unit" flex="1">
    <Select
      value={availabilityDurationUnit}
      onChange={setAvailabilityDurationUnit}
      options={CONSTANTS.DURATION_UNITS}
    />
  </InputGroup.Item>
</InputGroup>
```

---

## 🎯 **SUMMARY**

Το InputGroup component ολοκληρώνει το σετ των 5 missing form controls που εντοπίσαμε στο OLD_geo-canvas:

1. ✅ **Checkbox** - Enterprise checkbox με indeterminate state
2. ✅ **Slider** - Range slider με real-time values
3. ✅ **NumericInput** - Number input με steppers
4. ✅ **DatePicker** - Date picker με calendar popup
5. ✅ **InputGroup** - Combined form controls

**🔥 ΚΛΕΙΔΙ: Όλα τα 5 components έχουν πλήρη integration με τα 17 LEGO systems!**

*📝 Ready για implementation: Όλη η τεκμηρίωση είναι έτοιμη για υλοποίηση!*