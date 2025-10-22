/**
 * @layera/tolgee - Main Export
 * Enterprise Translation Management with Tolgee
 *
 * ΑΝΤΙΚΑΘΙΣΤΑ ΠΛΗΡΩΣ το @layera/i18n
 */

// Provider & Configuration - MINIMAL IMPLEMENTATION
export { MinimalTolgeeProvider as TolgeeProvider } from './provider-minimal';
export { MinimalTolgeeProvider as SimpleTolgeeProvider } from './provider-minimal';
export { MinimalTolgeeProvider as LayeraI18nProvider } from './provider-minimal'; // Alias για compatibility
export { TOLGEE_CONFIG } from './config';
export type { SupportedLanguage } from './config';

// Components
export { LanguageSwitcher } from './components/LanguageSwitcher';

// Hooks - ΙΔΙΟ API με το παλιό για εύκολη μετάβαση
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

// Default export για backward compatibility
import { useLayeraTranslation as useTranslation } from './hooks-minimal';
export default {
  useLayeraTranslation: useTranslation
};