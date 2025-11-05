/**
 * @layera/tolgee - Minimal Provider Component
 * Minimal provider που χρησιμοποιεί απευθείας τις μεταφράσεις χωρίς Tolgee initialization
 * Updated: Include new theme translations from JSON files
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
  const [currentLang, setCurrentLang] = React.useState(() => {
    // EXTREME CACHE BUSTING: Check for translation updates
    const currentVersion = '2025-11-05-v8-MFA-CARDS'; // Update this when translations change
    const lastVersion = localStorage.getItem('layera_translation_version');

    if (lastVersion !== currentVersion) {
      console.log('🔥 TRANSLATION VERSION MISMATCH - CLEARING ALL CACHE');
      console.log('🔥 Last version:', lastVersion, '| Current version:', currentVersion);
      localStorage.clear();
      localStorage.setItem('layera_translation_version', currentVersion);
      localStorage.setItem('i18nextLng', 'en');
      localStorage.setItem('tolgee_language', 'en');
      localStorage.setItem('layera_lang_initialized', 'true');
    }

    // FORCE RESET: Always start with English to break the cache cycle
    const forceReset = !localStorage.getItem('layera_lang_initialized');
    if (forceReset) {
      console.log('🔧 FORCE RESET: First time initialization, setting to English');
      localStorage.clear(); // Clear all localStorage
      localStorage.setItem('layera_translation_version', currentVersion);
      localStorage.setItem('i18nextLng', 'en');
      localStorage.setItem('tolgee_language', 'en');
      localStorage.setItem('layera_lang_initialized', 'true');
    }

    const savedLang = localStorage.getItem('i18nextLng') || localStorage.getItem('tolgee_language');
    const initialLang = language || savedLang || 'en';

    // DEBUGGING: Add window function to manually reset language
    if (typeof window !== 'undefined') {
      (window as any).resetLanguage = (newLang: string = 'en') => {
        console.log('🔧 Manually resetting language to:', newLang);
        localStorage.setItem('i18nextLng', newLang);
        localStorage.setItem('tolgee_language', newLang);
        window.location.reload();
      };

      (window as any).forceLanguageReset = () => {
        console.log('🔥 FORCE RESETTING ALL LANGUAGE DATA');
        localStorage.removeItem('layera_lang_initialized');
        localStorage.removeItem('i18nextLng');
        localStorage.removeItem('tolgee_language');
        localStorage.removeItem('layera_translation_version');
        window.location.reload();
      };

      (window as any).forceTranslationReload = () => {
        console.log('🔄 FORCING TRANSLATION RELOAD');
        localStorage.setItem('layera_translation_version', 'force-reload-' + Date.now());
        window.location.reload();
      };
    }

    return initialLang;
  });

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
    console.log('🔄 Changing language from', currentLang, 'to', newLang);
    localStorage.setItem('i18nextLng', newLang); // LEGACY: backward compatibility
    localStorage.setItem('tolgee_language', newLang);
    setCurrentLang(newLang);

    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('languagechange', {
      detail: { language: newLang }
    }));
    console.log('✅ Language changed successfully to', newLang);
  }, [currentLang]);

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

export const useMinimalTolgee = (): MinimalTolgeeContextType => {
  const context = useContext(MinimalTolgeeContext);
  if (!context) {
    throw new Error('useMinimalTolgee must be used within MinimalTolgeeProvider');
  }
  return context;
};