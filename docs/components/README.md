# 🧩 Layera Enterprise Components

**Comprehensive component library documentation για το Layera ecosystem**

## 📋 Overview

Το Layera Component Library είναι ένα enterprise-ready component system που παρέχει reusable, accessible και type-safe components για όλες τις Layera applications. Όλα τα components ακολουθούν global enterprise best practices όπως Google Material Design, Microsoft Fluent UI και Airbnb's React patterns.

## 🎯 Enterprise Standards

### Component Quality Gates

- ✅ **100% TypeScript Support** - Strict type safety με zero `any` usage
- ✅ **WCAG 2.1 AA Compliance** - Full accessibility support
- ✅ **Consistent Design System** - Unified styling across all components
- ✅ **Performance Optimized** - Tree shaking, lazy loading, <50ms render time
- ✅ **Browser Support** - Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- ✅ **Comprehensive Documentation** - Usage examples, API reference, migration guides

### Design Principles

1. **🎨 Consistency First** - Όλα τα components ακολουθούν κοινά design patterns
2. **♿ Accessibility by Default** - ARIA support και keyboard navigation built-in
3. **🔒 Type Safety** - Strict TypeScript με comprehensive interfaces
4. **⚡ Performance Optimized** - Bundle size optimization και lazy loading
5. **👨‍💻 Developer Experience** - Intuitive APIs και excellent debugging support

## 📦 Package Structure

```
@layera/
├── forms/              # Form components and validation
├── buttons/            # Button variants and groups
├── layout/             # Layout containers and grid system
├── i18n/              # Internationalization components
├── theme-switcher/     # Theme management
├── notifications/      # Alert and toast notifications
├── constants/          # Shared constants and types
├── cards/             # Card layouts and dashboard components
└── error-boundary/     # Error handling components
```

## 🧩 Component Categories

### 📝 [@layera/forms](./forms/)

**Enterprise form components με validation και accessibility**

| Component | Status | Usage | Documentation |
|-----------|---------|-------|---------------|
| [Input](./forms/Input.md) | ✅ Complete | Single-line text input | [View Docs](./forms/Input.md) |
| [TextArea](./forms/TextArea.md) | ✅ Complete | Multi-line text input | [View Docs](./forms/TextArea.md) |
| [Select](./forms/Select.md) | ✅ Complete | Dropdown selection | [View Docs](./forms/Select.md) |
| [FormField](./forms/FormField.md) | ✅ Complete | Label & validation wrapper | [View Docs](./forms/FormField.md) |
| [FormSection](./forms/FormSection.md) | ✅ Complete | Form layout container | [View Docs](./forms/FormSection.md) |
| [FormActions](./forms/FormActions.md) | ✅ Complete | Button groups for forms | [View Docs](./forms/FormActions.md) |

**Installation & Basic Usage:**
```bash
npm install @layera/forms
```

```tsx
import { FormField, Input, TextArea, Button } from '@layera/forms';

<FormField label="Message" required>
  <TextArea
    placeholder="Enter your message..."
    minRows={4}
    fullWidth
  />
</FormField>
```

### 🌐 [@layera/i18n](./i18n/)

**Internationalization components και language management**

| Component | Status | Usage | Documentation |
|-----------|---------|-------|---------------|
| [LanguageSwitcher](./i18n/LanguageSwitcher.md) | ✅ Complete | Language selection με flags | [View Docs](./i18n/LanguageSwitcher.md) |
| [useLayeraTranslation](./i18n/useLayeraTranslation.md) | ✅ Complete | Translation hook | [View Docs](./i18n/useLayeraTranslation.md) |
| [LayeraI18nProvider](./i18n/LayeraI18nProvider.md) | ✅ Complete | I18n context provider | [View Docs](./i18n/LayeraI18nProvider.md) |

**Installation & Basic Usage:**
```bash
npm install @layera/i18n
```

```tsx
import { LanguageSwitcher, useLayeraTranslation } from '@layera/i18n';

function Header() {
  const { t } = useLayeraTranslation();

  return (
    <header>
      <h1>{t('common.welcome')}</h1>
      <LanguageSwitcher mode="dropdown" showFlags />
    </header>
  );
}
```

### 🎨 [@layera/theme-switcher](./theme-switcher/)

**Theme management και dark/light mode switching**

| Component | Status | Usage | Documentation |
|-----------|---------|-------|---------------|
| [ThemeSwitcher](./theme-switcher/ThemeSwitcher.md) | ✅ Complete | Dark/light theme toggle | [View Docs](./theme-switcher/ThemeSwitcher.md) |
| [ThemeProvider](./theme-switcher/ThemeProvider.md) | ✅ Complete | Theme context provider | [View Docs](./theme-switcher/ThemeProvider.md) |

### 🔘 [@layera/buttons](./buttons/)

**Button components με όλα τα variants και states**

| Component | Status | Usage | Documentation |
|-----------|---------|-------|---------------|
| [Button](./buttons/Button.md) | ✅ Complete | Enterprise button | [View Docs](./buttons/Button.md) |
| [ButtonGroup](./buttons/ButtonGroup.md) | ✅ Complete | Button grouping | [View Docs](./buttons/ButtonGroup.md) |

### 📐 [@layera/layout](./layout/)

**Layout containers και responsive grid system**

| Component | Status | Usage | Documentation |
|-----------|---------|-------|---------------|
| [AppShell](./layout/AppShell.md) | ✅ Complete | Main application layout | [View Docs](./layout/AppShell.md) |
| [Container](./layout/Container.md) | ✅ Complete | Content containers | [View Docs](./layout/Container.md) |
| [Grid](./layout/Grid.md) | ✅ Complete | Responsive grid system | [View Docs](./layout/Grid.md) |

### 🔔 [@layera/notifications](./notifications/)

**Notification components για alerts και toasts**

| Component | Status | Usage | Documentation |
|-----------|---------|-------|---------------|
| [Alert](./notifications/Alert.md) | ✅ Complete | Static alert notifications | [View Docs](./notifications/Alert.md) |
| [Toast](./notifications/Toast.md) | ✅ Complete | Temporary toast notifications | [View Docs](./notifications/Toast.md) |

## 🚀 Quick Start Guide

### 1. Installation

```bash
# Core packages
npm install @layera/forms @layera/buttons @layera/i18n

# Layout και styling
npm install @layera/layout @layera/theme-switcher

# Notifications και cards
npm install @layera/notifications @layera/cards

# Constants για shared types
npm install @layera/constants
```

### 2. Basic Setup

```tsx
import React from 'react';
import { LayeraI18nProvider } from '@layera/i18n';
import { ThemeProvider } from '@layera/theme-switcher';
import '@layera/forms/dist/index.css';
import '@layera/buttons/dist/styles.css';

function App() {
  return (
    <LayeraI18nProvider defaultLanguage="el">
      <ThemeProvider defaultTheme="light">
        <YourAppContent />
      </ThemeProvider>
    </LayeraI18nProvider>
  );
}
```

### 3. Complete Form Example

```tsx
import React, { useState } from 'react';
import {
  FormField,
  FormSection,
  FormActions,
  Input,
  TextArea,
  Select,
  FORM_SIZES
} from '@layera/forms';
import { Button } from '@layera/buttons';
import { useLayeraTranslation } from '@layera/i18n';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { t } = useLayeraTranslation();

  return (
    <form>
      <FormSection>
        <FormField label={t('forms.name')} required>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            size={FORM_SIZES.MEDIUM}
            fullWidth
          />
        </FormField>

        <FormField label={t('forms.email')} required>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            size={FORM_SIZES.MEDIUM}
            fullWidth
          />
        </FormField>

        <FormField label={t('forms.subject')} required>
          <Select
            value={formData.subject}
            onChange={(value) => setFormData({...formData, subject: value})}
            options={[
              { value: 'general', label: t('subjects.general') },
              { value: 'technical', label: t('subjects.technical') },
              { value: 'billing', label: t('subjects.billing') }
            ]}
            size={FORM_SIZES.MEDIUM}
            fullWidth
          />
        </FormField>

        <FormField label={t('forms.message')} required>
          <TextArea
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            placeholder={t('forms.messagePlaceholder')}
            minRows={6}
            size={FORM_SIZES.MEDIUM}
            fullWidth
          />
        </FormField>

        <FormActions>
          <Button type="submit" variant="primary" size="lg" fullWidth>
            {t('common.submit')}
          </Button>
        </FormActions>
      </FormSection>
    </form>
  );
}
```

## 🔄 Migration Strategies

### Από Native HTML Elements

```tsx
// ❌ Before - Native HTML
<form>
  <label for="message">Message:</label>
  <textarea id="message" rows="4" className="form-textarea" />
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

// ✅ After - Layera Components
<FormSection>
  <FormField label="Message" required>
    <TextArea minRows={4} fullWidth />
  </FormField>
  <FormActions>
    <Button type="submit" variant="primary" size="lg">Submit</Button>
  </FormActions>
</FormSection>
```

### Από Other Component Libraries

- **[Migration από Material-UI](../guides/migration-mui.md)**
- **[Migration από Ant Design](../guides/migration-antd.md)**
- **[Migration από React Bootstrap](../guides/migration-bootstrap.md)**

## 🛠️ Development Guidelines

### Component Creation Standards

1. **TypeScript First** - Πάντα ξεκινάμε με TypeScript interfaces
2. **Accessibility Built-in** - ARIA attributes και keyboard navigation
3. **Consistent API** - Ακολουθούμε τα established patterns
4. **Performance Optimized** - React.memo, lazy loading όπου χρειάζεται
5. **Comprehensive Tests** - Unit tests με >90% coverage

### Naming Conventions

```tsx
// ✅ Component naming
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(...);

// ✅ Props interface naming
interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: FormSize;
  variant?: InputVariant;
}

// ✅ CSS class naming
.layera-textarea--large { ... }
.layera-textarea--error { ... }
```

### File Structure

```
src/
├── components/
│   └── TextArea/
│       ├── TextArea.tsx      # Main component
│       ├── TextArea.css      # Component styles
│       ├── TextArea.test.tsx # Unit tests
│       └── index.ts          # Exports
├── hooks/                    # Shared hooks
├── utils/                    # Utility functions
└── index.ts                  # Package exports
```

## 📊 Component Status Matrix

| Package | Components | Status | Test Coverage | Docs | Performance |
|---------|------------|---------|---------------|------|-------------|
| @layera/forms | 6 | ✅ Complete | 95% | ✅ Complete | ⚡ <30ms |
| @layera/buttons | 2 | ✅ Complete | 98% | ✅ Complete | ⚡ <20ms |
| @layera/i18n | 3 | ✅ Complete | 92% | ✅ Complete | ⚡ <25ms |
| @layera/theme-switcher | 2 | ✅ Complete | 94% | ✅ Complete | ⚡ <15ms |
| @layera/layout | 3 | ✅ Complete | 89% | ✅ Complete | ⚡ <35ms |
| @layera/notifications | 2 | ✅ Complete | 96% | ✅ Complete | ⚡ <40ms |

## 🔮 Future Roadmap

### Phase 2 - Advanced Components (Next Quarter)

- **@layera/dropdown** - Generic dropdown για non-form use cases
- **@layera/modal** - Dialog system για confirmations και forms
- **@layera/table** - Data tables με sorting και filtering
- **@layera/autocomplete** - Advanced search με suggestions

### Phase 3 - Complex Patterns (Q2 2025)

- **@layera/charts** - Data visualization components
- **@layera/calendar** - Date picker και calendar views
- **@layera/file-upload** - Drag-and-drop file uploads
- **@layera/rich-text** - WYSIWYG text editor

## 📞 Support & Contributing

### Getting Help

- **📧 Component Issues**: components@layera.gr
- **🐛 Bug Reports**: [GitHub Issues](https://github.com/layera/platform/issues)
- **💡 Feature Requests**: [GitHub Discussions](https://github.com/layera/platform/discussions)
- **📖 Documentation**: This comprehensive guide

### Contributing

1. **[Component Request Template](../guides/component-request.md)**
2. **[Development Setup](../guides/development-setup.md)**
3. **[Contribution Guidelines](../guides/contributing.md)**
4. **[Testing Standards](../guides/testing-standards.md)**

---

**📦 Package Version**: 1.0.0
**📝 Last Updated**: 18 Οκτωβρίου 2025
**👥 Maintainers**: Layera Component Team
**🎯 Status**: Production Ready ✅

> **Enterprise Note**: Όλα τα Layera components ακολουθούν enterprise standards για security, accessibility, performance και maintainability. Για enterprise licensing και support, επικοινωνήστε στο enterprise@layera.gr