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

// Enterprise-grade LEGO i18n system - NO direct react-i18next exports
// Applications should use ONLY @layera/i18n exports for 100% LEGO compliance