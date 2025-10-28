/**
 * @layera/tolgee - Simple Provider Component
 * Απλοποιημένος provider που χρησιμοποιεί μόνο static translations
 */

import React, { useState, useEffect } from 'react';
import { Tolgee, TolgeeProvider as BaseTolgeeProvider } from '@tolgee/react';
import type { TolgeeInstance } from '@tolgee/react';
import { Box } from '@layera/layout';

// Import existing translations
import { elTranslations } from './locales/el/common';
import { enTranslations } from './locales/en/common';

interface SimpleTolgeeProviderProps {
  children: React.ReactNode;
  language?: string;
}

/**
 * Simple Tolgee Provider - Μόνο με static translations
 */
export const SimpleTolgeeProvider: React.FC<SimpleTolgeeProviderProps> = ({
  children,
  language
}) => {
  // Create Tolgee instance with static data only
  const [tolgee] = useState<TolgeeInstance>(() =>
    Tolgee()
      .init({
        language: language || localStorage.getItem('i18nextLng') || 'el',
        fallbackLanguage: 'el',
        staticData: {
          el: elTranslations,
          en: enTranslations
        },
        ns: ['common'],
        defaultNs: 'common',
        fallbackNs: 'common'
      })
  );

  // Handle language changes
  useEffect(() => {
    const handleStorageChange = () => {
      const newLang = localStorage.getItem('i18nextLng') || 'el';
      tolgee.changeLanguage(newLang);
    };

    // Listen for custom event
    window.addEventListener('languagechange', handleStorageChange);

    // Listen for storage events
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('languagechange', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [tolgee]);

  return (
    <BaseTolgeeProvider
      tolgee={tolgee}
      fallback={<Box>Loading...</Box>}
    >
      {children}
    </BaseTolgeeProvider>
  );
};