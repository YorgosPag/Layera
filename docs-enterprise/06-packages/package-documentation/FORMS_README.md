# @layera/forms

Enterprise form components with validation, accessibility, and TypeScript support.

---

## 📚 **RELATED DOCUMENTATION**

### **🎯 Component Documentation:**
- **[📝 Form Systems Guide](../../docs/core-systems/components/forms/advanced-controls/README.md)** - Advanced Form Controls
- **[☑️ Checkbox Component](../../docs/core-systems/components/forms/advanced-controls/Checkbox.md)** - Checkbox Implementation
- **[📅 DatePicker Component](../../docs/core-systems/components/forms/advanced-controls/DatePicker.md)** - Date Selection Component
- **[🔢 NumericInput Component](../../docs/core-systems/components/forms/advanced-controls/NumericInput.md)** - Numeric Input Fields

### **🏗️ Core Architecture:**
- **[🧩 LEGO Systems Analysis](../../docs/core-systems/LEGO_SYSTEMS_ANALYSIS.md)** - Component Architecture
- **[📚 Documentation Index](../../docs/meta/DOCUMENTATION_INDEX.md)** - Complete Documentation Navigation (84 files)

### **📦 Related Packages:**
- **[🎨 Icons Package](../icons/README.md)** - Icon Component Library
- **[📐 Layout Package](../layout/README.md)** - Layout Components
- **[🌍 i18n Package](../i18n/README.md)** - Internationalization System

---

## 🚀 Installation

```bash
npm install @layera/forms @layera/constants @layera/tolgee
```

## 📦 Components

### FormField
Wrapper component that provides consistent layout, validation, and accessibility.

```tsx
import React from 'react';
import { FormField, Input } from '@layera/forms';
import { FORM_TYPES } from '@layera/constants';
import { useLayeraTranslation } from '@layera/tolgee';

function FormExample() {
  const { t } = useLayeraTranslation();
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [email, setEmail] = React.useState('');

  return (
    <FormField
      label={t('forms.labels.email')}
      required
      error={errors.email}
      hint={t('forms.hints.emailPrivacy')}
    >
      <Input
        type={FORM_TYPES.EMAIL}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t('forms.placeholders.email')}
      />
    </FormField>
  );
}
```

### Input
Text input component with multiple variants and states.

```tsx
import React from 'react';
import { Input } from '@layera/forms';
import { FORM_SIZES, FORM_STATES } from '@layera/constants';
import { useLayeraTranslation } from '@layera/tolgee';

function InputExample() {
  const { t } = useLayeraTranslation();
  const [value, setValue] = React.useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  return (
    <div>
      {/* Basic input */}
      <Input value={value} onChange={onChange} />

      {/* With validation state */}
      <Input
        value={value}
        onChange={onChange}
        state={FORM_STATES.ERROR}
        placeholder={t('forms.placeholders.enterValue')}
      />

      {/* Different sizes */}
      <Input size={FORM_SIZES.SMALL} />
      <Input size={FORM_SIZES.MEDIUM} />
      <Input size={FORM_SIZES.LARGE} />
    </div>
  );
}
```

### Select
Dropdown selection component with search and multi-select support.

```tsx
import React from 'react';
import { Select } from '@layera/forms';
import { USER_ROLES } from '@layera/constants';
import { useLayeraTranslation } from '@layera/tolgee';

function SelectExample() {
  const { t } = useLayeraTranslation();
  const [selectedRole, setSelectedRole] = React.useState('');

  const options = Object.values(USER_ROLES).map(role => ({
    value: role,
    label: t(`roles.${role}`)
  }));

  return (
    <Select
      options={options}
      value={selectedRole}
      onChange={setSelectedRole}
      placeholder={t('forms.placeholders.selectRole')}
      searchable
    />
  );
}
```

### Checkbox & Radio
Selection components with consistent styling.

```tsx
import React from 'react';
import { Checkbox, Radio, RadioGroup } from '@layera/forms';

function CheckboxExample() {
  const [agreed, setAgreed] = React.useState(false);
  const [theme, setTheme] = React.useState('light');

  return (
    <div>
      {/* Checkbox */}
      <Checkbox
        checked={agreed}
        onChange={setAgreed}
        label="I agree to the terms"
      />

      {/* Radio group */}
      <RadioGroup
        value={theme}
        onChange={setTheme}
        options={[
          { value: 'light', label: 'Light Theme' },
          { value: 'dark', label: 'Dark Theme' },
          { value: 'auto', label: 'Auto' }
        ]}
      />
    </div>
  );
}
```

### TextArea
Multi-line text input with auto-resize capability.

```tsx
import React from 'react';
import { TextArea } from '@layera/forms';

function TextAreaExample() {
  const [description, setDescription] = React.useState('');

  return (
    <TextArea
      value={description}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
      rows={4}
      placeholder="Enter description..."
      autoResize
    />
  );
}
```

## 🎨 Validation

### Built-in Validation
```tsx
import React from 'react';
import { useFormValidation } from '@layera/forms';
import { FORM_VALIDATION } from '@layera/constants';

function ValidationExample() {
  const { validate, errors, isValid } = useFormValidation({
    email: {
      required: true,
      type: 'email'
    },
    password: {
      required: true,
      minLength: FORM_VALIDATION.PASSWORD_MIN,
      pattern: /^(?=.*[A-Za-z])(?=.*\d).*$/
    }
  });

  return <div>Validation logic here</div>;
}
```

### Custom Validation
```tsx
import React from 'react';
import { FormField, Input } from '@layera/forms';

function CustomValidationExample() {
  const [value, setValue] = React.useState('');

  const customValidator = (value: string) => {
    if (!value.includes('@company.com')) {
      return 'Must be a company email';
    }
    return null;
  };

  return (
    <FormField validator={customValidator}>
      <Input
        type="email"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      />
    </FormField>
  );
}
```

## ♿ Accessibility

All form components include:
- **ARIA labels** and descriptions
- **Keyboard navigation** support
- **Screen reader** compatibility
- **Focus management** and visual indicators
- **Error announcements** for validation

## 🎯 Props Reference

### FormField Props
```typescript
interface FormFieldProps {
  label?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}
```

### Input Props
```typescript
interface InputProps {
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
  state?: 'default' | 'error' | 'success';
  className?: string;
}
```

## 🎨 Theming

Components support the Layera design system:

```css
/* CSS custom properties */
:root {
  --layera-form-border: var(--la-color-primary);
  --layera-form-focus: var(--la-color-primary);
  --layera-form-error: var(--la-color-primary);
  --layera-form-success: var(--la-color-primary);
}
```

## 📱 Responsive Design

All form components are mobile-first and responsive:
- Touch-friendly sizing on mobile devices
- Appropriate spacing and layout
- Keyboard-friendly on desktop

---

**Status**: 🚧 Planned (Not implemented yet)
**Priority**: High
**Dependencies**: @layera/layout, @layera/theme-switcher