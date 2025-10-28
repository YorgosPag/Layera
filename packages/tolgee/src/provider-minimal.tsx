/**
 * @layera/tolgee - Minimal Provider Component
 * Minimal provider που χρησιμοποιεί απευθείας τις μεταφράσεις χωρίς Tolgee initialization
 */

import React, { createContext, useContext, ReactNode } from 'react';

// Import existing translations
import { elTranslations } from './locales/el/common';
import { enTranslations } from './locales/en/common';

interface MinimalTolgeeContextType {
  t: (key: string, params?: Record<string, unknown>) => string;
  language: string;
  changeLanguage: (newLang: string) => void;
}

const MinimalTolgeeContext = createContext<MinimalTolgeeContextType | null>(null);

interface MinimalTolgeeProviderProps {
  children: ReactNode;
  language?: string;
}

const translations = {
  el: elTranslations,
  en: enTranslations
};

/**
 * Minimal Tolgee Provider - Χωρίς Tolgee instance, μόνο local translations
 */
export const MinimalTolgeeProvider: React.FC<MinimalTolgeeProviderProps> = ({
  children,
  language
}) => {
  const [currentLang, setCurrentLang] = React.useState(
    language || localStorage.getItem('i18nextLng') || 'el'
  );

  const t = React.useCallback((key: string, params?: Record<string, unknown>) => {
    const lang = currentLang as keyof typeof translations;
    const translation = translations[lang];

    // Navigate through nested keys
    const keys = key.split('.');
    let value: unknown = translation;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    if (typeof value === 'string') {
      // Simple parameter substitution
      if (params) {
        return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
          return params[paramKey]?.toString() || match;
        });
      }
      return value;
    }

    return key; // Return key if not a string
  }, [currentLang]);

  const changeLanguage = React.useCallback((newLang: string) => {
    localStorage.setItem('i18nextLng', newLang);
    localStorage.setItem('tolgee_language', newLang);
    setCurrentLang(newLang);

    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('languagechange', {
      detail: { language: newLang }
    }));
  }, []);

  const contextValue = React.useMemo(() => ({
    t,
    language: currentLang,
    changeLanguage
  }), [t, currentLang, changeLanguage]);

  return (
    <MinimalTolgeeContext.Provider value={contextValue}>
      {children}
    </MinimalTolgeeContext.Provider>
  );
};

export const useMinimalTolgee = () => {
  const context = useContext(MinimalTolgeeContext);
  if (!context) {
    throw new Error('useMinimalTolgee must be used within MinimalTolgeeProvider');
  }
  return context;
};