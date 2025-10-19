# LanguageSwitcher Component

**Enterprise language switching component με dropdown και flag support.**

## Overview

Το LanguageSwitcher component είναι μέρος του @layera/i18n package και παρέχει μια ολοκληρωμένη λύση για language switching σε Layera applications. Υποστηρίζει multiple display modes και automatic flag detection.

## Features

- ✅ **Multiple Display Modes** - Icon, button, dropdown variants
- ✅ **Flag Support** - Automatic flag display για κάθε γλώσσα
- ✅ **TypeScript Support** - Πλήρη type safety
- ✅ **Accessibility** - WCAG 2.1 AA compliant keyboard navigation
- ✅ **Enterprise Integration** - Integration με @layera/forms για consistency
- ✅ **RTL Support** - Right-to-left language support
- ✅ **Theme Adaptation** - Dark/light mode automatic styling

## Installation

```bash
npm install @layera/i18n
```

## Basic Usage

```tsx
import React from 'react';
import { LanguageSwitcher, LayeraI18nProvider } from '@layera/i18n';

function App() {
  return (
    <LayeraI18nProvider defaultLanguage="el">
      <div className="app-header">
        <LanguageSwitcher mode="dropdown" />
      </div>
    </LayeraI18nProvider>
  );
}
```

## Props

### LanguageSwitcherProps

```tsx
interface LanguageSwitcherProps {
  mode?: 'icon' | 'button' | 'dropdown';     // Display mode (default: 'dropdown')
  size?: 'sm' | 'md' | 'lg';                 // Component size
  showFlags?: boolean;                        // Show country flags (default: true)
  showLabels?: boolean;                       // Show language labels (default: true)
  availableLanguages?: string[];              // Restrict available languages
  className?: string;                         // Additional CSS classes
  disabled?: boolean;                         // Disable interaction
  placement?: 'bottom' | 'top' | 'left' | 'right'; // Dropdown placement
}
```

## Examples

### Display Modes

```tsx
import { LanguageSwitcher } from '@layera/i18n';

// Icon mode - μόνο flag icon
<LanguageSwitcher mode="icon" />

// Button mode - flag + label σαν button
<LanguageSwitcher mode="button" />

// Dropdown mode - collapsible dropdown με όλες τις γλώσσες
<LanguageSwitcher mode="dropdown" />
```

## Related Components

- **[useLayeraTranslation](../i18n/useLayeraTranslation.md)** - Translation hook
- **[LayeraI18nProvider](../i18n/LayeraI18nProvider.md)** - I18n context provider
- **[ThemeSwitcher](../theme-switcher/ThemeSwitcher.md)** - Theme switching
- **[Select](../forms/Select.md)** - Generic dropdown selection