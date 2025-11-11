/**
 * @layera/tolgee - Main Export
 * Enterprise Translation Management with Tolgee
 * ARXES Compliant - No inline styles, enterprise architecture
 *
 * Complete Translation Management for Layera Platform
 */

// Provider & Configuration - MINIMAL IMPLEMENTATION
export { MinimalTolgeeProvider as TolgeeProvider } from './provider-minimal';
export { MinimalTolgeeProvider as SimpleTolgeeProvider } from './provider-minimal';
export { MinimalTolgeeProvider as LayeraI18nProvider } from './provider-minimal'; // LEGACY: backward compatibility alias
export { TOLGEE_CONFIG } from './config';
export type { SupportedLanguage } from './config';

// Components - ARXES Compliant (no inline styles)
export { LanguageSwitcher } from './components/LanguageSwitcher';

// Hooks - Same API for easy migration
export {
  useLayeraTranslation,
  useDetectedLanguage,
  useDynamicTranslation,
  usePluralTranslation,
  useFormattedTranslation
} from './hooks-minimal';

// Re-export Tolgee components για direct usage
export { T, useTranslate } from '@tolgee/react';

// Language constants
export const LANGUAGES = {
  el: 'Ελληνικά',
  en: 'English'
} as const;

// Translation files exports
export { elTranslations } from './locales/el/common';
export { enTranslations } from './locales/en/common';

// Main translation hook export για backward compatibility
export { useLayeraTranslation as useTranslation } from './hooks-minimal';