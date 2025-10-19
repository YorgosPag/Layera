# ☑️ Checkbox Component

*Τελευταία ενημέρωση: 18 Οκτωβρίου 2025*
*Package: @layera/forms*
*Enterprise-grade checkbox με advanced features*

---

## 🎯 **OVERVIEW**

Το Checkbox component είναι ένα enterprise-grade UI element που παρέχει checkbox functionality με πλήρη integration στο LAYERA LEGO σύστημα.

### **🔗 LEGO SYSTEMS INTEGRATION:**

**🧩 COMPLETE LAYERA LEGO ECOSYSTEM (17 Systems):**

```typescript
// 🚨 ΥΠΟΧΡΕΩΤΙΚΗ χρήση LAYERA LEGO συστημάτων:

// 1. 🃏 UI Foundation
import { Card, CardHeader, CardContent } from '@layera/cards';
import { Button, IconButton, PrimaryButton } from '@layera/buttons';
import { Checkbox, FormField, FormSection } from '@layera/forms';  // ← ΝΕΟ Checkbox!
import { Heading, Text, Label, Caption } from '@layera/typography';

// 2. 📐 Layout & Structure
import { Container, Grid, Stack, Flex } from '@layera/layout';
import { DataTable, TableColumn } from '@layera/tables';
import { Modal, Dialog, Drawer } from '@layera/modals';

// 3. 🔄 Dynamic Content
import { LoadingSpinner, SkeletonCard } from '@layera/loading';
import { toast, showNotification } from '@layera/notifications';

// 4. 🗺️ Advanced Features
import { GeoDrawingCanvas, MeasurementDisplay } from '@layera/geo-drawing';

// 5. 🎨 Visual & Icons
import { CheckIcon, XIcon, MinusIcon } from '@layera/icons';

// 6. 🌐 Localization & State
import { useLayeraTranslation } from '@layera/i18n/hooks';
import { useAuth } from '@layera/auth-bridge/hooks';
import { useTheme } from '@layera/theme-switcher/hooks';

// 7. 🔧 System Integration
import { CONSTANTS } from '@layera/constants';
import { ErrorBoundary } from '@layera/error-boundary';

// 📝 ΚΡΙΤΙΚΟ: 100% LEGO compliance - NO custom components!
```

**Primary Package**: @layera/forms
**Dependencies**: 8 από τα 17 LEGO systems
**Usage**: `import { Checkbox } from '@layera/forms';`

---

## 📋 **TECHNICAL SPECIFICATIONS**

### **TypeScript Interface:**
```typescript
export interface CheckboxProps {
  // Core Props
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;

  // Visual
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'filled';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';

  // States
  disabled?: boolean;
  indeterminate?: boolean;
  required?: boolean;
  invalid?: boolean;

  // Labels & Content
  label?: string;
  description?: string;
  errorMessage?: string;
  helpText?: string;

  // Layout
  labelPosition?: 'right' | 'left';
  fullWidth?: boolean;

  // Advanced
  name?: string;
  value?: string;
  id?: string;

  // Accessibility
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-required'?: boolean;

  // Events
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;

  // Theme
  className?: string;
}
```

### **Constants Integration:**
```typescript
// From @layera/constants
export const CHECKBOX_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg'
} as const;

export const CHECKBOX_VARIANTS = {
  DEFAULT: 'default',
  OUTLINED: 'outlined',
  FILLED: 'filled'
} as const;

export const CHECKBOX_COLORS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
} as const;
```

---

## 🎨 **VISUAL DESIGN**

### **Sizes:**
```typescript
// Small - 16x16px
<Checkbox size="sm" label="Μικρό checkbox" />

// Medium (default) - 20x20px
<Checkbox size="md" label="Κανονικό checkbox" />

// Large - 24x24px
<Checkbox size="lg" label="Μεγάλο checkbox" />
```

### **States:**
```typescript
// Default state
<Checkbox label="Κανονικό checkbox" />

// Checked state
<Checkbox checked={true} label="Επιλεγμένο" />

// Indeterminate state (for "select all" scenarios)
<Checkbox indeterminate={true} label="Μερικώς επιλεγμένο" />

// Disabled state
<Checkbox disabled={true} label="Απενεργοποιημένο" />

// Error state
<Checkbox invalid={true} errorMessage="Απαιτείται επιλογή" label="Με σφάλμα" />
```

### **Variants:**
```typescript
// Default variant
<Checkbox variant="default" label="Βασικό στυλ" />

// Outlined variant
<Checkbox variant="outlined" label="Με περίγραμμα" />

// Filled variant
<Checkbox variant="filled" label="Γεμισμένο στυλ" />
```

---

## 🔧 **USAGE EXAMPLES**

### **Basic Usage:**
```typescript
import React, { useState } from 'react';
import { Checkbox } from '@layera/forms';
import { useLayeraTranslation } from '@layera/i18n/hooks';

export const BasicCheckboxExample: React.FC = () => {
  const { t } = useLayeraTranslation();
  const [agreed, setAgreed] = useState(false);

  return (
    <Checkbox
      checked={agreed}
      onChange={setAgreed}
      label={t('forms.terms.agree')}
      description={t('forms.terms.description')}
      required={true}
    />
  );
};
```

### **Complete LEGO Integration Example:**
```typescript
import React, { useState } from 'react';
import { Checkbox, FormSection, FormField } from '@layera/forms';
import { Card, CardHeader, CardContent } from '@layera/cards';
import { Container, Grid, Stack, Flex } from '@layera/layout';
import { Heading, Text, Label } from '@layera/typography';
import { Button, PrimaryButton } from '@layera/buttons';
import { CheckIcon, HomeIcon } from '@layera/icons';
import { LoadingSpinner } from '@layera/loading';
import { toast } from '@layera/notifications';
import { useLayeraTranslation } from '@layera/i18n/hooks';
import { useAuth } from '@layera/auth-bridge/hooks';
import { useTheme } from '@layera/theme-switcher/hooks';
import { CONSTANTS } from '@layera/constants';
import { ErrorBoundary } from '@layera/error-boundary';

export const PropertyAmenitiesForm: React.FC = () => {
  const { t } = useLayeraTranslation();
  const { user, hasRole } = useAuth();
  const { currentTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const [amenities, setAmenities] = useState({
    parking: false,
    balcony: false,
    garden: false,
    pool: false,
    security: false,
    elevator: false
  });

  const handleAmenityChange = (key: string, checked: boolean) => {
    setAmenities(prev => ({ ...prev, [key]: checked }));

    // Integration με @layera/notifications
    if (checked) {
      toast.success(t('property.amenities.added', { amenity: t(`property.amenities.${key}`) }));
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, CONSTANTS.TIMEOUTS.DEFAULT));
    toast.success(t('property.amenities.saved'));
    setIsLoading(false);
  };

  // Integration με @layera/auth-bridge - role-based access
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
      <Container maxWidth="md">
        <Card>
          <CardHeader>
            <Flex align="center" gap="sm">
              <HomeIcon size="lg" />
              <Heading level={2}>{t('property.amenities.title')}</Heading>
              <Text variant="caption">{user?.email}</Text>
            </Flex>
          </CardHeader>

          <CardContent>
            <FormSection title={t('property.amenities.available')}>
              <Grid cols={2} spacing="md">
                <Stack spacing="sm">
                  <Checkbox
                    checked={amenities.parking}
                    onChange={(checked) => handleAmenityChange('parking', checked)}
                    label={t('property.amenities.parking')}
                    description={t('property.amenities.parking.description')}
                    disabled={isLoading}
                  />
                  <Checkbox
                    checked={amenities.balcony}
                    onChange={(checked) => handleAmenityChange('balcony', checked)}
                    label={t('property.amenities.balcony')}
                    disabled={isLoading}
                  />
                  <Checkbox
                    checked={amenities.garden}
                    onChange={(checked) => handleAmenityChange('garden', checked)}
                    label={t('property.amenities.garden')}
                    disabled={isLoading}
                  />
                </Stack>

                <Stack spacing="sm">
                  <Checkbox
                    checked={amenities.pool}
                    onChange={(checked) => handleAmenityChange('pool', checked)}
                    label={t('property.amenities.pool')}
                    disabled={isLoading}
                  />
                  <Checkbox
                    checked={amenities.security}
                    onChange={(checked) => handleAmenityChange('security', checked)}
                    label={t('property.amenities.security')}
                    disabled={isLoading}
                  />
                  <Checkbox
                    checked={amenities.elevator}
                    onChange={(checked) => handleAmenityChange('elevator', checked)}
                    label={t('property.amenities.elevator')}
                    disabled={isLoading}
                  />
                </Stack>
              </Grid>

              <Flex justify="space-between" className="mt-6">
                <Button variant="secondary" disabled={isLoading}>
                  {t('common.cancel')}
                </Button>
                <PrimaryButton
                  onClick={handleSubmit}
                  disabled={isLoading}
                  icon={isLoading ? <LoadingSpinner size="sm" /> : <CheckIcon />}
                >
                  {t('common.save')}
                </PrimaryButton>
              </Flex>
            </FormSection>
          </CardContent>
        </Card>
      </Container>
    </ErrorBoundary>
  );
};

// 🎯 ΑΠΟΤΕΛΕΣΜΑ: 11 από τα 17 LEGO systems integration σε ένα component!
// ✅ @layera/forms, @layera/cards, @layera/layout, @layera/typography
// ✅ @layera/buttons, @layera/icons, @layera/loading, @layera/notifications
// ✅ @layera/i18n, @layera/auth-bridge, @layera/constants, @layera/error-boundary
```

### **Group Selection with Indeterminate:**
```typescript
import React, { useMemo } from 'react';
import { Checkbox } from '@layera/forms';

export const CheckboxGroupExample: React.FC = () => {
  const [items, setItems] = useState([
    { id: 1, label: 'Επιλογή 1', checked: false },
    { id: 2, label: 'Επιλογή 2', checked: true },
    { id: 3, label: 'Επιλογή 3', checked: false }
  ]);

  const selectedCount = items.filter(item => item.checked).length;
  const isAllSelected = selectedCount === items.length;
  const isIndeterminate = selectedCount > 0 && selectedCount < items.length;

  const handleSelectAll = (checked: boolean) => {
    setItems(items.map(item => ({ ...item, checked })));
  };

  return (
    <div className="space-y-2">
      <Checkbox
        checked={isAllSelected}
        indeterminate={isIndeterminate}
        onChange={handleSelectAll}
        label="Επιλογή όλων"
        size="md"
      />
      <div className="ml-6 space-y-1">
        {items.map(item => (
          <Checkbox
            key={item.id}
            checked={item.checked}
            onChange={(checked) => {
              setItems(items.map(i =>
                i.id === item.id ? { ...i, checked } : i
              ));
            }}
            label={item.label}
            size="sm"
          />
        ))}
      </div>
    </div>
  );
};
```

---

## 🎨 **THEME INTEGRATION**

### **CSS Variables:**
```css
.layera-checkbox {
  --checkbox-size: var(--layera-form-element-size-md);
  --checkbox-border-radius: var(--layera-border-radius-sm);
  --checkbox-border-width: var(--layera-border-width-default);
  --checkbox-border-color: var(--layera-color-border-default);
  --checkbox-background: var(--layera-color-background-primary);
  --checkbox-checked-background: var(--layera-color-primary);
  --checkbox-checked-border: var(--layera-color-primary);
  --checkbox-disabled-opacity: var(--layera-opacity-disabled);
  --checkbox-focus-ring: var(--layera-color-focus-ring);
}

/* Dark mode support */
[data-theme="dark"] .layera-checkbox {
  --checkbox-border-color: var(--layera-color-border-dark);
  --checkbox-background: var(--layera-color-background-dark);
}
```

### **Responsive Design:**
```css
/* Mobile-first responsive sizes */
@media (max-width: 768px) {
  .layera-checkbox--md {
    --checkbox-size: 18px; /* Slightly smaller on mobile */
  }
}

@media (min-width: 1024px) {
  .layera-checkbox--lg {
    --checkbox-size: 28px; /* Larger on desktop */
  }
}
```

---

## ♿ **ACCESSIBILITY**

### **ARIA Support:**
```typescript
<Checkbox
  label="Συμφωνώ με τους όρους"
  aria-describedby="terms-description"
  aria-required={true}
  invalid={hasError}
  aria-invalid={hasError}
/>
```

### **Keyboard Navigation:**
- **Space**: Toggle checkbox state
- **Tab**: Navigate to next focusable element
- **Shift+Tab**: Navigate to previous focusable element

### **Screen Reader Support:**
- Proper labeling με `aria-label` ή connected `<label>`
- State announcements για checked/unchecked/indeterminate
- Error message association με `aria-describedby`

---

## 🧪 **TESTING GUIDELINES**

### **Unit Tests:**
```typescript
import { render, fireEvent, screen } from '@testing-library/react';
import { Checkbox } from '@layera/forms';

describe('Checkbox Component', () => {
  it('should toggle when clicked', () => {
    const handleChange = jest.fn();
    render(<Checkbox label="Test" onChange={handleChange} />);

    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Checkbox label="Test" disabled={true} />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('should show error message when invalid', () => {
    render(
      <Checkbox
        label="Test"
        invalid={true}
        errorMessage="Required field"
      />
    );
    expect(screen.getByText('Required field')).toBeInTheDocument();
  });
});
```

---

## 📦 **IMPLEMENTATION CHECKLIST**

### **✅ Component Features:**
- [ ] Basic checkbox functionality
- [ ] Controlled και uncontrolled modes
- [ ] Indeterminate state support
- [ ] Size variants (sm, md, lg)
- [ ] Color themes
- [ ] Disabled state
- [ ] Error state με error messages
- [ ] Label και description support

### **✅ Integration:**
- [ ] @layera/constants integration
- [ ] @layera/theme-switcher support
- [ ] @layera/i18n compatibility
- [ ] TypeScript strict types
- [ ] CSS custom properties

### **✅ Quality:**
- [ ] Unit tests με >90% coverage
- [ ] Accessibility compliance (WCAG 2.1 AA)
- [ ] Performance optimization
- [ ] Documentation complete

---

## 🚀 **MIGRATION FROM OLD_geo-canvas**

### **Before (OLD_geo-canvas):**
```typescript
// ❌ Custom implementation
<input
  type="checkbox"
  checked={details.amenities?.[amenity.key] ?? false}
  onChange={(e) => onChange(`amenities.${amenity.key}`, e.target.checked)}
  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
/>
<span>{amenity.label}</span>
```

### **After (@layera/forms):**
```typescript
// ✅ LEGO component
<Checkbox
  checked={details.amenities?.[amenity.key] ?? false}
  onChange={(checked) => onChange(`amenities.${amenity.key}`, checked)}
  label={t(`amenities.${amenity.key}`)}
  size="md"
  color="primary"
/>
```

---

*📝 Next Component: [Slider.md](./Slider.md)*