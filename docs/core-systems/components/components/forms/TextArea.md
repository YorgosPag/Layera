# TextArea Component

**Enterprise-ready textarea component with consistent styling, accessibility, and TypeScript support.**

## Overview

Το TextArea component είναι μέρος του @layera/forms package και παρέχει μια enterprise-ready λύση για multi-line text input. Ακολουθεί τα ίδια design patterns με όλα τα @layera/forms components για consistency σε όλο το Layera ecosystem.

## Features

- ✅ **TypeScript Support** - Πλήρη type safety με ακριβείς τύπους
- ✅ **Responsive Design** - Automatic sizing με minRows/maxRows support
- ✅ **Accessibility** - WCAG 2.1 AA compliant
- ✅ **Theme Support** - Dark/light mode automatic adaptation
- ✅ **Consistent Styling** - Matching design με όλα τα @layera components
- ✅ **Resize Control** - Configurable resize behavior (none, vertical, horizontal, both)
- ✅ **Enterprise Validation** - Integration με form validation systems

## Installation

```bash
npm install @layera/forms
```

## Basic Usage

```tsx
import { useLayeraTranslation } from '@layera/tolgee';
// ✅ Use LEGO hooks and utilities;
import { TextArea } from '@layera/forms';

function MyComponent() {
  const [message, setMessage] = useState('');

  return (
    <TextArea
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Γράψτε το μήνυμά σας..."
      minRows={3}
      fullWidth
    />
  );
}
```

## Props

### TextAreaProps

```tsx
interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  size?: FormSize;           // 'sm' | 'md' | 'lg'
  variant?: InputVariant;    // 'default' | 'outline' | 'filled' | 'ghost' | 'underline'
  state?: FormState;         // 'default' | 'error' | 'success' | 'warning'
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  minRows?: number;          // Minimum number of rows (default: 3)
  maxRows?: number;          // Maximum number of rows (optional)
  fullWidth?: boolean;       // Take full container width (default: false)
}
```

## Examples

### Size Variants

```tsx
import { TextArea, FORM_SIZES } from '@layera/forms';

// Small textarea
<TextArea
  size={FORM_SIZES.SMALL}
  placeholder="Small textarea..."
/>

// Medium textarea (default)
<TextArea
  size={FORM_SIZES.MEDIUM}
  placeholder="Medium textarea..."
/>

// Large textarea
<TextArea
  size={FORM_SIZES.LARGE}
  placeholder="Large textarea..."
/>
```

## Related Components

- **[FormField](../forms/FormField.md)** - Wrapper για labels και validation
- **[Input](../forms/Input.md)** - Single-line text input
- **[Select](../forms/Select.md)** - Dropdown selection
- **[FormSection](../forms/FormSection.md)** - Form layout container
- **[FormActions](../forms/FormActions.md)** - Button groups για forms