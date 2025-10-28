/**
 * @layera/tolgee - Provider Component
 * Main Tolgee provider for Layera applications
 */

import React from 'react';
import { Tolgee, DevTools, TolgeeProvider as BaseTolgeeProvider, FormatSimple } from '@tolgee/react';
import { FormatIcu } from '@tolgee/format-icu';
import { Box } from '@layera/layout';
import { TOLGEE_CONFIG } from './config';

// Import existing translations (migrated to TypeScript)
import { elTranslations } from './locales/el/common';
import { enTranslations } from './locales/en/common';

// Initialize Tolgee instance
const tolgee = Tolgee()
  .use(DevTools())
  .use(FormatSimple())
  .use(FormatIcu())
  .init({
    // Language configuration
    language: TOLGEE_CONFIG.defaultLanguage,
    fallbackLanguage: TOLGEE_CONFIG.fallbackLanguage,
    availableLanguages: [...TOLGEE_CONFIG.supportedLanguages],

    // API Configuration (for production)
    apiUrl: TOLGEE_CONFIG.apiUrl,
    apiKey: TOLGEE_CONFIG.apiKey,

    // Static translations (migrated from old system)
    staticData: {
      el: elTranslations,
      en: enTranslations
    },


    // Namespace support
    ns: ['common'],
    defaultNs: 'common'
  });

interface TolgeeProviderProps {
  children: React.ReactNode;
  language?: string;
}

/**
 * Layera Tolgee Provider
 * Wraps the application with Tolgee translation context
 */
export const TolgeeProvider: React.FC<TolgeeProviderProps> = ({
  children,
  language
}) => {
  // Handle language changes
  React.useEffect(() => {
    if (language && TOLGEE_CONFIG.supportedLanguages.includes(language as any)) {
      tolgee.changeLanguage(language);
      // Store in localStorage for persistence
      localStorage.setItem('i18nextLng', language); // Keep compatibility
      localStorage.setItem('tolgee_language', language);
    }
  }, [language]);

  // Listen for language changes from other tabs
  React.useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'tolgee_language' || e.key === 'i18nextLng') {
        const newLang = e.newValue;
        if (newLang && TOLGEE_CONFIG.supportedLanguages.includes(newLang as any)) {
          tolgee.changeLanguage(newLang);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <BaseTolgeeProvider
      tolgee={tolgee}
      fallback={<Box>Φόρτωση μεταφράσεων...</Box>}
    >
      {children}
    </BaseTolgeeProvider>
  );
};