// Main configuration
export { default as i18n, i18nConfig, supportedLngs, defaultNS, namespaces } from './config';
export type { SupportedLanguage } from './config';

// Hooks
export { useLayeraTranslation } from './hooks/useLayeraTranslation';

// Components
export { LanguageSwitcher } from './components/LanguageSwitcher';
export {
  LayeraI18nProvider,
  useLayeraI18nContext,
  withLayeraI18n
} from './components/LayeraI18nProvider';

// Re-export react-i18next for convenience
export { useTranslation, Trans, I18nextProvider } from 'react-i18next';

// Types
export type {
  UseTranslationOptions,
  TFunction,
  i18n as I18n,
} from 'react-i18next';