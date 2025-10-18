# @layera/forms

Enterprise form components with validation, accessibility, and TypeScript support.

## 🚀 Installation

```bash
npm install @layera/forms @layera/constants @layera/i18n
```

## 📦 Components

### FormField
Wrapper component that provides consistent layout, validation, and accessibility.

```tsx
import { FormField, Input } from '@layera/forms';
import { FORM_TYPES } from '@layera/constants';
import { useLayeraTranslation } from '@layera/i18n';

const { t } = useLayeraTranslation();

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
```

### Input
Text input component with multiple variants and states.

```tsx
import { Input } from '@layera/forms';
import { FORM_SIZES, FORM_STATES } from '@layera/constants';
import { useLayeraTranslation } from '@layera/i18n';

const { t } = useLayeraTranslation();

// Basic input
<Input value={value} onChange={onChange} />

// With validation state
<Input
  value={value}
  onChange={onChange}
  state={FORM_STATES.ERROR}
  placeholder={t('forms.placeholders.enterValue')}
/>

// Different sizes
<Input size={FORM_SIZES.SMALL} />
<Input size={FORM_SIZES.MEDIUM} /> // default
<Input size={FORM_SIZES.LARGE} />
```

### Select
Dropdown selection component with search and multi-select support.

```tsx
import { Select } from '@layera/forms';
import { USER_ROLES } from '@layera/constants';
import { useLayeraTranslation } from '@layera/i18n';

const { t } = useLayeraTranslation();

const options = Object.values(USER_ROLES).map(role => ({
  value: role,
  label: t(`roles.${role}`)
}));

<Select
  options={options}
  value={selectedRole}
  onChange={setSelectedRole}
  placeholder={t('forms.placeholders.selectRole')}
  searchable
/>
```

### Checkbox & Radio
Selection components with consistent styling.

```tsx
import { Checkbox, Radio, RadioGroup } from '@layera/forms';

// Checkbox
<Checkbox
  checked={agreed}
  onChange={setAgreed}
  label="I agree to the terms"
/>

// Radio group
<RadioGroup
  value={theme}
  onChange={setTheme}
  options={[
    { value: 'light', label: 'Light Theme' },
    { value: 'dark', label: 'Dark Theme' },
    { value: 'auto', label: 'Auto' }
  ]}
/>
```

### TextArea
Multi-line text input with auto-resize capability.

```tsx
import { TextArea } from '@layera/forms';

<TextArea
  value={description}
  onChange={setDescription}
  rows={4}
  placeholder="Enter description..."
  autoResize
/>
```

## 🎨 Validation

### Built-in Validation
```tsx
import { useFormValidation } from '@layera/forms';

const { validate, errors, isValid } = useFormValidation({
  email: {
    required: true,
    type: 'email'
  },
  password: {
    required: true,
    minLength: 8,
    pattern: /^(?=.*[A-Za-z])(?=.*\d)/
  }
});
```

### Custom Validation
```tsx
const customValidator = (value) => {
  if (!value.includes('@company.com')) {
    return 'Must be a company email';
  }
  return null;
};

<FormField validator={customValidator}>
  <Input type="email" />
</FormField>
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
  --layera-form-border: #e2e8f0;
  --layera-form-focus: #3b82f6;
  --layera-form-error: #ef4444;
  --layera-form-success: #10b981;
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