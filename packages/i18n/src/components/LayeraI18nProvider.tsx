import React, { createContext, useContext, useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n, { SupportedLanguage, supportedLngs } from '../config';

interface I18nContextValue {
  language: SupportedLanguage;
  changeLanguage: (lng: SupportedLanguage) => Promise<void>;
  isLoading: boolean;
  error: Error | null;
  supportedLanguages: readonly SupportedLanguage[];
}

const I18nContext = createContext<I18nContextValue | null>(null);

interface LayeraI18nProviderProps {
  children: React.ReactNode;
  fallbackLanguage?: SupportedLanguage;
  onLanguageChange?: (language: SupportedLanguage) => void;
  onError?: (error: Error) => void;
}

/**
 * Enterprise-grade i18n provider for Layera applications
 *
 * Features:
 * - Type-safe language management
 * - Error handling and fallback mechanisms
 * - Loading states for async operations
 * - Event callbacks for language changes
 * - Persistent language storage
 * - Modular namespace support
 */
export function LayeraI18nProvider({
  children,
  fallbackLanguage = 'el',
  onLanguageChange,
  onError,
}: LayeraI18nProviderProps) {
  const [language, setLanguage] = useState<SupportedLanguage>(
    () => (i18n.language as SupportedLanguage) || fallbackLanguage
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Set fallback language if current language is not supported
    if (!supportedLngs.includes(i18n.language as SupportedLanguage)) {
      i18n.changeLanguage(fallbackLanguage);
    }

    // Subscribe to language changes
    const handleLanguageChanged = (lng: string) => {
      const supportedLng = lng as SupportedLanguage;
      setLanguage(supportedLng);
      onLanguageChange?.(supportedLng);
    };

    i18n.on('languageChanged', handleLanguageChanged);

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [fallbackLanguage, onLanguageChange]);

  const changeLanguage = async (lng: SupportedLanguage): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      await i18n.changeLanguage(lng);

      // Language state will be updated via the event listener

    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to change language');
      setError(error);
      onError?.(error);

      // Revert to previous language on error
      await i18n.changeLanguage(language);

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue: I18nContextValue = {
    language,
    changeLanguage,
    isLoading,
    error,
    supportedLanguages: supportedLngs,
  };

  return (
    <I18nextProvider i18n={i18n}>
      <I18nContext.Provider value={contextValue}>
        {children}
      </I18nContext.Provider>
    </I18nextProvider>
  );
}

/**
 * Hook to access i18n context value
 * Must be used within LayeraI18nProvider
 */
export function useLayeraI18nContext(): I18nContextValue {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error(
      'useLayeraI18nContext must be used within LayeraI18nProvider'
    );
  }

  return context;
}

/**
 * Higher-order component for easy i18n integration
 */
export function withLayeraI18n<P extends object>(
  Component: React.ComponentType<P>,
  options?: Omit<LayeraI18nProviderProps, 'children'>
) {
  return function WrappedComponent(props: P) {
    return (
      <LayeraI18nProvider {...options}>
        <Component {...props} />
      </LayeraI18nProvider>
    );
  };
}

export default LayeraI18nProvider;