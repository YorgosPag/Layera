import { useTranslation, UseTranslationOptions } from 'react-i18next';
import { defaultNS, SupportedLanguage, namespaces } from '../config';

type Namespace = typeof namespaces[number];

/**
 * Custom hook for Layera-specific translations
 * Provides type-safe translation with automatic namespace handling
 */
export function useLayeraTranslation(
  ns: Namespace = defaultNS,
  options?: UseTranslationOptions<any>
) {
  const { t, i18n, ready } = useTranslation(ns, {
    useSuspense: false,
    ...options,
  });

  /**
   * Change language with type safety
   */
  const changeLanguage = (lng: SupportedLanguage) => {
    return i18n.changeLanguage(lng);
  };

  /**
   * Get current language
   */
  const currentLanguage = i18n.language as SupportedLanguage;

  /**
   * Check if translation is ready
   */
  const isReady = ready;

  /**
   * Get all available languages
   */
  const availableLanguages: SupportedLanguage[] = ['el', 'en'];

  /**
   * Format functions for common patterns
   */
  const formatters = {
    /**
     * Format role name
     */
    role: (role: string) => t(`roles.${role}`, { defaultValue: role }),

    /**
     * Format status
     */
    status: (status: string) => t(`status.${status}`, { defaultValue: status }),

    /**
     * Format action
     */
    action: (action: string) => t(`actions.${action}`, { defaultValue: action }),

    /**
     * Format error message
     */
    error: (error: string) => t(`errors.${error}`, { defaultValue: error }),
  };

  return {
    t,
    i18n,
    ready: isReady,
    changeLanguage,
    currentLanguage,
    availableLanguages,
    formatters,
  };
}

export default useLayeraTranslation;