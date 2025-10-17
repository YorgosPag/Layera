# @layera/i18n

Enterprise-grade internationalization package for Layera applications, following international i18n standards and best practices.

## 🏗️ Architecture

This package is designed as a **modular building block** that can be easily detached and reused across different applications and sub-applications within the Layera ecosystem.

### Key Features

- ✅ **Modular Design**: Standalone package with zero dependencies on other Layera packages
- ✅ **TypeScript First**: Full type safety for translations and configurations
- ✅ **Namespace Support**: Organized translations with automatic code splitting
- ✅ **Enterprise Provider**: Advanced error handling and loading states
- ✅ **Language Persistence**: Automatic storage and restoration of user preferences
- ✅ **Dynamic Language Switching**: Real-time language changes without app restart
- ✅ **Fallback System**: Graceful degradation for missing translations
- ✅ **Performance Optimized**: Tree-shaking friendly with minimal bundle impact

## Installation

```bash
npm install @layera/i18n
```

## Usage

### Basic Setup

```tsx
import { i18n } from '@layera/i18n';
import { I18nextProvider } from 'react-i18next';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <YourApp />
    </I18nextProvider>
  );
}
```

### Using the Hook

```tsx
import { useLayeraTranslation } from '@layera/i18n';

function MyComponent() {
  const { t, changeLanguage, currentLanguage } = useLayeraTranslation();

  return (
    <div>
      <h1>{t('app.welcome')}</h1>
      <button onClick={() => changeLanguage('en')}>
        English
      </button>
    </div>
  );
}
```

### Language Switcher Component

```tsx
import { LanguageSwitcher } from '@layera/i18n';

function Header() {
  return (
    <header>
      <LanguageSwitcher variant="dropdown" showFlags={true} />
    </header>
  );
}
```

## Supported Languages

- **Greek (el)** - Default language
- **English (en)** - Secondary language

## Translation Keys Structure

```json
{
  "app": {
    "name": "Layera",
    "welcome": "Welcome to Layera!"
  },
  "navigation": {
    "dashboard": "Dashboard",
    "account": "My Account"
  },
  "auth": {
    "login": "Login",
    "register": "Register"
  }
}
```

## Adding New Languages

1. Create a new locale folder: `src/locales/[lang]/`
2. Add translation files: `common.json`
3. Update the configuration in `src/config.ts`
4. Add the language to `supportedLngs` array

## Best Practices

- Use nested keys for better organization
- Keep translation keys descriptive
- Use formatters for common patterns (roles, status, etc.)
- Test with both languages during development

## API Reference

### useLayeraTranslation()

Returns an object with:

- `t(key, options?)` - Translation function
- `changeLanguage(lang)` - Change current language
- `currentLanguage` - Current active language
- `availableLanguages` - Array of supported languages
- `formatters` - Predefined formatters for common patterns

### LanguageSwitcher Props

- `variant` - 'dropdown' | 'toggle' | 'buttons'
- `showFlags` - Show flag emojis
- `className` - Custom CSS classes