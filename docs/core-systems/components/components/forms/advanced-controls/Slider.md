# 🎚️ Slider Component

*Τελευταία ενημέρωση: 18 Οκτωβρίου 2025*
*Package: @layera/forms*
*Enterprise-grade range slider με advanced features*

---

## 🎯 **OVERVIEW**

Το Slider component είναι ένα enterprise-grade UI element που παρέχει range slider functionality για αριθμητικές τιμές με πλήρη integration στο LAYERA LEGO σύστημα.

### **🔗 LEGO SYSTEMS INTEGRATION:**

**🧩 COMPLETE LAYERA LEGO ECOSYSTEM (17 Systems):**

```typescript
// 🚨 ΥΠΟΧΡΕΩΤΙΚΗ χρήση LAYERA LEGO συστημάτων:

// 1. 🃏 UI Foundation
import { Card, CardHeader, CardContent } from '@layera/cards';
import { Button, IconButton, PrimaryButton } from '@layera/buttons';
import { Slider, FormField, FormSection, Input } from '@layera/forms';  // ← ΝΕΟ Slider!
import { Heading, Text, Label, Caption } from '@layera/typography';

// 2. 📐 Layout & Structure
import { Container, Grid, Stack, Flex } from '@layera/layout';
import { DataTable, TableColumn } from '@layera/tables';
import { Modal, Dialog, Drawer } from '@layera/modals';

// 3. 🔄 Dynamic Content
import { LoadingSpinner, SkeletonCard } from '@layera/loading';
import { toast, showNotification } from '@layera/notifications';

// 4. 🗺️ Geo Features
import { GeoDrawingCanvas, MeasurementDisplay } from '@layera/geo-drawing';

// 5. 🎨 Visual & Icons
import { MinusIcon, PlusIcon, SettingsIcon } from '@layera/icons';

// 6. 🌐 Localization & State
import { useLayeraTranslation } from '@layera/i18n/hooks';
import { useAuth } from '@layera/auth-bridge/hooks';
import { useTheme } from '@layera/theme-switcher/hooks';

// 7. 🔧 System Integration
import { CONSTANTS } from '@layera/constants';
import { ErrorBoundary } from '@layera/error-boundary';

// 📝 ΚΡΙΤΙΚΟ: 100% LEGO compliance - NO custom range inputs!
```

**Primary Package**: @layera/forms
**Dependencies**: 9 από τα 17 LEGO systems
**Usage**: `import { Slider } from '@layera/forms';`

---

## 📋 **TECHNICAL SPECIFICATIONS**

### **TypeScript Interface:**
```typescript
export interface SliderProps {
  // Core Props
  value?: number | [number, number];
  defaultValue?: number | [number, number];
  onChange?: (value: number | [number, number]) => void;

  // Range Configuration
  min?: number;
  max?: number;
  step?: number;
  range?: boolean;

  // Visual
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'gradient' | 'stepped';
  orientation?: 'horizontal' | 'vertical';

  // Display
  showValue?: boolean;
  showTicks?: boolean;
  showTooltip?: boolean;
  formatValue?: (value: number) => string;
  formatTooltip?: (value: number) => string;

  // Marks & Labels
  marks?: SliderMark[];
  tickStep?: number;

  // States
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;

  // Labels & Content
  label?: string;
  description?: string;
  errorMessage?: string;
  helpText?: string;
  unit?: string;

  // Layout
  fullWidth?: boolean;

  // Advanced
  name?: string;
  id?: string;

  // Events
  onStart?: (value: number | [number, number]) => void;
  onEnd?: (value: number | [number, number]) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;

  // Accessibility
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-valuetext'?: string;

  // Theme
  className?: string;
}

export interface SliderMark {
  value: number;
  label?: string;
  style?: React.CSSProperties;
}
```

### **Constants Integration:**
```typescript
// From @layera/constants
export const SLIDER_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg'
} as const;

export const SLIDER_VARIANTS = {
  DEFAULT: 'default',
  GRADIENT: 'gradient',
  STEPPED: 'stepped'
} as const;

export const SLIDER_ORIENTATIONS = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical'
} as const;
```

---

## 🎨 **VISUAL DESIGN**

### **Sizes:**
```typescript
// Small - 4px track height
<Slider size="sm" label="Μικρό slider" />

// Medium (default) - 6px track height
<Slider size="md" label="Κανονικό slider" />

// Large - 8px track height
<Slider size="lg" label="Μεγάλο slider" />
```

### **Variants:**
```typescript
// Default variant
<Slider variant="default" label="Βασικό στυλ" />

// Gradient variant
<Slider variant="gradient" label="Με gradient" />

// Stepped variant με visible steps
<Slider variant="stepped" step={10} showTicks={true} label="Με βήματα" />
```

### **Range Types:**
```typescript
// Single value slider
<Slider
  min={0}
  max={100}
  defaultValue={50}
  label="Μονή τιμή"
/>

// Range slider (δύο handles)
<Slider
  min={0}
  max={100}
  defaultValue={[20, 80]}
  range={true}
  label="Εύρος τιμών"
/>
```

---

## 🔧 **USAGE EXAMPLES**

### **Basic Usage:**
```typescript
import { useLayeraTranslation } from '@layera/tolgee';
// ✅ Use LEGO hooks and utilities;
import { Slider } from '@layera/forms';
import { useLayeraTranslation } from '@layera/i18n/hooks';
import { CONSTANTS } from '@layera/constants';

export const BasicSliderExample: React.FC = () => {
  const { t } = useLayeraTranslation();
  const [radius, setRadius] = useState(CONSTANTS.GEO.DEFAULT_RADIUS);

  return (
    <Slider
      value={radius}
      onChange={setRadius}
      min={CONSTANTS.GEO.MIN_RADIUS}
      max={CONSTANTS.GEO.MAX_RADIUS}
      step={CONSTANTS.GEO.RADIUS_STEP}
      label={t('geo.radius.label')}
      formatValue={(value) => `${value} m`}
      showValue={true}
    />
  );
};
```

### **Complete LEGO Integration με Geo-Drawing:**
```typescript
import { useLayeraTranslation } from '@layera/tolgee';
// ✅ Use LEGO hooks and utilities;
import { Slider, FormSection, FormField } from '@layera/forms';
import { Card, CardHeader, CardContent } from '@layera/cards';
import { Container, Grid, Stack, Flex } from '@layera/layout';
import { Heading, Text, Label } from '@layera/typography';
import { Button, PrimaryButton } from '@layera/buttons';
import { SettingsIcon, MapIcon } from '@layera/icons';
import { LoadingSpinner } from '@layera/loading';
import { toast } from '@layera/notifications';
import { GeoDrawingCanvas, MeasurementDisplay } from '@layera/geo-drawing';
import { useLayeraTranslation } from '@layera/i18n/hooks';
import { useAuth } from '@layera/auth-bridge/hooks';
import { useTheme } from '@layera/theme-switcher/hooks';
import { CONSTANTS } from '@layera/constants';
import { ErrorBoundary } from '@layera/error-boundary';

export const GeoRadiusSelector: React.FC = () => {
  const { t } = useLayeraTranslation();
  const { user, hasRole } = useAuth();
  const { currentTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const [geoSettings, setGeoSettings] = useState({
    radius: CONSTANTS.GEO.DEFAULT_RADIUS,
    proximityRadius: CONSTANTS.GEO.DEFAULT_PROXIMITY,
    searchDistance: CONSTANTS.GEO.DEFAULT_SEARCH_DISTANCE
  });

  const handleRadiusChange = useCallback((value: number) => {
    setGeoSettings(prev => ({ ...prev, radius: value }));

    // Integration με @layera/notifications
    toast.info(t('geo.radius.updated', {
      radius: formatDistance(value)
    }));
  }, [t]);

  const formatDistance = (meters: number): string => {
    return meters >= 1000
      ? `${(meters / 1000).toFixed(1)} km`
      : `${meters} m`;
  };

  const calculateArea = (radius: number): string => {
    const area = Math.PI * Math.pow(radius, 2);
    return area >= 1000000
      ? `${(area / 1000000).toFixed(2)} km²`
      : `${(area / 10000).toFixed(2)} ha`;
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

  return (
    <ErrorBoundary>
      <Container maxWidth="lg">
        <Grid cols={2} spacing="lg">
          {/* Settings Panel */}
          <Card>
            <CardHeader>
              <Flex align="center" gap="sm">
                <SettingsIcon size="lg" />
                <Heading level={2}>{t('geo.settings.title')}</Heading>
              </Flex>
            </CardHeader>

            <CardContent>
              <Stack spacing="lg">
                <FormSection title={t('geo.radius.section')}>
                  <FormField>
                    <Slider
                      value={geoSettings.radius}
                      onChange={handleRadiusChange}
                      min={CONSTANTS.GEO.MIN_RADIUS}
                      max={CONSTANTS.GEO.MAX_RADIUS}
                      step={CONSTANTS.GEO.RADIUS_STEP}
                      label={t('geo.radius.main')}
                      description={t('geo.radius.description')}
                      formatValue={formatDistance}
                      formatTooltip={(value) => `${formatDistance(value)} • ${calculateArea(value)}`}
                      showValue={true}
                      showTooltip={true}
                      marks={[
                        { value: 50, label: '50m' },
                        { value: 500, label: '500m' },
                        { value: 1000, label: '1km' },
                        { value: 5000, label: '5km' }
                      ]}
                      disabled={isLoading}
                    />
                  </FormField>

                  <FormField>
                    <Slider
                      value={geoSettings.proximityRadius}
                      onChange={(value) => setGeoSettings(prev => ({
                        ...prev, proximityRadius: value
                      }))}
                      min={1}
                      max={30}
                      step={1}
                      label={t('geo.proximity.label')}
                      description={t('geo.proximity.description')}
                      formatValue={(value) => `${value} km`}
                      showValue={true}
                      size="sm"
                      disabled={isLoading}
                    />
                  </FormField>

                  <FormField>
                    <Slider
                      value={[100, geoSettings.searchDistance]}
                      onChange={([min, max]) => setGeoSettings(prev => ({
                        ...prev, searchDistance: max
                      }))}
                      min={100}
                      max={10000}
                      step={100}
                      range={true}
                      label={t('geo.search.range')}
                      description={t('geo.search.description')}
                      formatValue={(value) => formatDistance(Array.isArray(value) ? value[1] : value)}
                      showValue={true}
                      variant="gradient"
                      disabled={isLoading}
                    />
                  </FormField>
                </FormSection>

                <Flex justify="space-between">
                  <Button variant="secondary" disabled={isLoading}>
                    {t('common.reset')}
                  </Button>
                  <PrimaryButton
                    disabled={isLoading}
                    icon={isLoading ? <LoadingSpinner size="sm" /> : <MapIcon />}
                  >
                    {t('geo.apply')}
                  </PrimaryButton>
                </Flex>
              </Stack>
            </CardContent>
          </Card>

          {/* Map Preview */}
          <Card>
            <CardHeader>
              <Flex align="center" gap="sm">
                <MapIcon size="lg" />
                <Heading level={2}>{t('geo.preview.title')}</Heading>
              </Flex>
            </CardHeader>

            <CardContent>
              <GeoDrawingCanvas
                mode="circle"
                radius={geoSettings.radius}
                theme={currentTheme}
                showMeasurements={true}
                onRadiusChange={handleRadiusChange}
              />

              <MeasurementDisplay
                radius={geoSettings.radius}
                area={Math.PI * Math.pow(geoSettings.radius, 2)}
                showArea={true}
                showDistance={true}
                units="metric"
              />
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </ErrorBoundary>
  );
};

// 🎯 ΑΠΟΤΕΛΕΣΜΑ: 13 από τα 17 LEGO systems integration!
// ✅ @layera/forms, @layera/cards, @layera/layout, @layera/typography
// ✅ @layera/buttons, @layera/icons, @layera/loading, @layera/notifications
// ✅ @layera/geo-drawing, @layera/i18n, @layera/auth-bridge,
// ✅ @layera/theme-switcher, @layera/constants, @layera/error-boundary
```

### **Advanced Range Slider:**
```typescript
import { useLayeraTranslation } from '@layera/tolgee';
// ✅ Use LEGO hooks and utilities;
import { Slider } from '@layera/forms';
import { Card, CardContent } from '@layera/cards';
import { Stack } from '@layera/layout';
import { Text } from '@layera/typography';

export const PriceRangeSelector: React.FC = () => {
  const { t } = useLayeraTranslation();
  const [priceRange, setPriceRange] = useState<[number, number]>([100000, 500000]);

  const formatPrice = (value: number): string => {
    return new Intl.NumberFormat('el-GR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing="md">
          <Slider
            value={priceRange}
            onChange={setPriceRange}
            min={50000}
            max={2000000}
            step={10000}
            range={true}
            label={t('property.price.range')}
            description={t('property.price.description')}
            formatValue={(value) => {
              if (Array.isArray(value)) {
                return `${formatPrice(value[0])} - ${formatPrice(value[1])}`;
              }
              return formatPrice(value);
            }}
            formatTooltip={formatPrice}
            showValue={true}
            showTooltip={true}
            variant="gradient"
            marks={[
              { value: 100000, label: '100K' },
              { value: 250000, label: '250K' },
              { value: 500000, label: '500K' },
              { value: 1000000, label: '1M' }
            ]}
          />

          <Text variant="caption" color="secondary">
            {t('property.price.results', {
              count: 127,
              min: formatPrice(priceRange[0]),
              max: formatPrice(priceRange[1])
            })}
          </Text>
        </Stack>
      </CardContent>
    </Card>
  );
};
```

---

## 🎨 **THEME INTEGRATION**

### **CSS Variables:**
```css
.layera-slider {
  --slider-track-height: var(--layera-form-element-height-sm);
  --slider-track-color: var(--layera-color-background-secondary);
  --slider-track-active-color: var(--layera-color-primary);
  --slider-thumb-size: var(--layera-size-md);
  --slider-thumb-color: var(--layera-color-primary);
  --slider-thumb-border: var(--layera-border-width-default);
  --slider-focus-ring: var(--layera-color-focus-ring);
  --slider-disabled-opacity: var(--layera-opacity-disabled);
}

/* Size variants */
.layera-slider--sm {
  --slider-track-height: 4px;
  --slider-thumb-size: 16px;
}

.layera-slider--md {
  --slider-track-height: 6px;
  --slider-thumb-size: 20px;
}

.layera-slider--lg {
  --slider-track-height: 8px;
  --slider-thumb-size: 24px;
}

/* Dark mode support */
[data-theme="dark"] .layera-slider {
  --slider-track-color: var(--layera-color-background-dark);
  --slider-thumb-color: var(--layera-color-primary-dark);
}

/* Gradient variant */
.layera-slider--gradient .layera-slider__track--active {
  background: linear-gradient(
    90deg,
    var(--layera-color-primary-light),
    var(--layera-color-primary)
  );
}
```

---

## ♿ **ACCESSIBILITY**

### **ARIA Support:**
```typescript
<Slider
  label="Ακτίνα αναζήτησης"
  aria-describedby="radius-description"
  aria-valuemin={50}
  aria-valuemax={5000}
  aria-valuenow={radius}
  aria-valuetext={`${radius} μέτρα`}
/>
```

### **Keyboard Navigation:**
- **Arrow Keys**: Μικρά βήματα (±step)
- **Page Up/Down**: Μεγάλα βήματα (±10*step)
- **Home/End**: Min/Max values
- **Tab**: Navigate between handles (range slider)

---

## 🧪 **TESTING GUIDELINES**

### **Unit Tests:**
```typescript
import { render, fireEvent, screen } from '@testing-library/react';
import { Slider } from '@layera/forms';

describe('Slider Component', () => {
  it('should change value when dragged', () => {
    const handleChange = jest.fn();
    render(<Slider value={50} onChange={handleChange} min={0} max={100} />);

    const thumb = screen.getByRole('slider');
    fireEvent.keyDown(thumb, { key: 'ArrowRight' });

    expect(handleChange).toHaveBeenCalledWith(51);
  });

  it('should format value correctly', () => {
    render(
      <Slider
        value={1500}
        formatValue={(v) => `${v}m`}
        showValue={true}
      />
    );
    expect(screen.getByText('1500m')).toBeInTheDocument();
  });
});
```

---

## 📦 **IMPLEMENTATION CHECKLIST**

### **✅ Component Features:**
- [ ] Single value slider
- [ ] Range slider (δύο handles)
- [ ] Vertical orientation support
- [ ] Custom marks και labels
- [ ] Value formatting
- [ ] Tooltip support
- [ ] Size variants (sm, md, lg)
- [ ] Visual variants (default, gradient, stepped)

### **✅ Integration:**
- [ ] @layera/constants integration
- [ ] @layera/theme-switcher support
- [ ] @layera/i18n compatibility
- [ ] @layera/geo-drawing integration για radius selection
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
// ❌ Custom implementation
<label htmlFor="radius-slider" className="block text-sm font-medium text-gray-700">
  Ακτίνα: {formatDistance(currentRadius, 0)}
</label>
<input
  id="radius-slider"
  type="range"
  min="50"
  max={maxRadius}
  step="50"
  value={currentRadius}
  onChange={handleRadiusChange}
  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
/>
```

### **After (@layera/forms):**
```typescript
// ✅ LEGO component
<Slider
  value={currentRadius}
  onChange={handleRadiusChange}
  min={CONSTANTS.GEO.MIN_RADIUS}
  max={CONSTANTS.GEO.MAX_RADIUS}
  step={CONSTANTS.GEO.RADIUS_STEP}
  label={t('geo.radius.label')}
  formatValue={(value) => formatDistance(value)}
  showValue={true}
  showTooltip={true}
  size="md"
/>
```

---

*📝 Next Component: [NumericInput.md](./NumericInput.md)*