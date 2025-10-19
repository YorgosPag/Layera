import React from 'react';
import { SupportedLanguage } from '../config';
interface I18nContextValue {
    language: SupportedLanguage;
    changeLanguage: (lng: SupportedLanguage) => Promise<void>;
    isLoading: boolean;
    error: Error | null;
    supportedLanguages: readonly SupportedLanguage[];
}
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
export declare function LayeraI18nProvider({ children, fallbackLanguage, onLanguageChange, onError, }: LayeraI18nProviderProps): import("react/jsx-runtime").JSX.Element;
/**
 * Hook to access i18n context value
 * Must be used within LayeraI18nProvider
 */
export declare function useLayeraI18nContext(): I18nContextValue;
/**
 * Higher-order component for easy i18n integration
 */
export declare function withLayeraI18n<P extends object>(Component: React.ComponentType<P>, options?: Omit<LayeraI18nProviderProps, 'children'>): (props: P) => import("react/jsx-runtime").JSX.Element;
export default LayeraI18nProvider;
//# sourceMappingURL=LayeraI18nProvider.d.ts.map