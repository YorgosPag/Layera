import React, { ReactNode } from 'react';
import * as _tolgee_react from '@tolgee/react';
export { T, useTranslate } from '@tolgee/react';

/**
 * @layera/tolgee - Minimal Provider Component
 * Minimal provider που χρησιμοποιεί απευθείας τις μεταφράσεις χωρίς Tolgee initialization
 */

interface MinimalTolgeeProviderProps {
    children: ReactNode;
    language?: string;
}
/**
 * Minimal Tolgee Provider - Χωρίς Tolgee instance, μόνο local translations
 */
declare const MinimalTolgeeProvider: React.FC<MinimalTolgeeProviderProps>;

/**
 * @layera/tolgee - Configuration
 * Centralized Tolgee configuration for Layera ecosystem
 */
declare const TOLGEE_CONFIG: {
    readonly apiUrl: string;
    readonly apiKey: string;
    readonly projectId: string;
    readonly defaultLanguage: "el";
    readonly fallbackLanguage: "en";
    readonly supportedLanguages: readonly ["el", "en"];
    readonly isDevelopment: boolean;
    readonly inContextEditing: boolean;
    readonly cacheEnabled: true;
    readonly cacheExpirationMs: number;
    readonly features: {
        readonly autoTranslate: true;
        readonly machineTranslation: true;
        readonly inContextEditing: true;
        readonly screenshots: true;
        readonly comments: true;
    };
};
type SupportedLanguage = typeof TOLGEE_CONFIG.supportedLanguages[number];

/**
 * @layera/tolgee - Language Switcher Component
 * Dropdown component για αλλαγή γλώσσας
 */

interface LanguageSwitcherProps {
    className?: string;
}
declare const LanguageSwitcher: React.FC<LanguageSwitcherProps>;

/**
 * @layera/tolgee - Minimal Hooks
 * Hooks που χρησιμοποιούν το minimal context
 */
/**
 * Enhanced translation hook with Layera-specific features
 * ΑΝΤΙΚΑΘΙΣΤΑ το παλιό useLayeraTranslation
 */
declare function useLayeraTranslation$1(): {
    t: (key: string, params?: Record<string, unknown>) => string;
    i18n: {
        language: string;
        changeLanguage: (newLang: string) => void;
        languages: {
            el: string;
            en: string;
        };
    };
};
/**
 * Hook για language detection
 */
declare function useDetectedLanguage(): string;
/**
 * Hook για dynamic translations με parameters
 */
declare function useDynamicTranslation(): (key: string, params?: Record<string, unknown>) => string;
/**
 * Hook για pluralization
 */
declare function usePluralTranslation(): (key: string, count: number) => string;
/**
 * Hook για formatted dates/numbers με locale
 */
declare function useFormattedTranslation(): {
    formatDate: (date: Date) => string;
    formatNumber: (num: number) => string;
    formatCurrency: (amount: number) => string;
};

/**
 * @layera/tolgee - React Hooks
 * Custom hooks for Tolgee integration
 */
/**
 * Enhanced translation hook with Layera-specific features
 * ΑΝΤΙΚΑΘΙΣΤΑ το παλιό useLayeraTranslation
 */
declare function useLayeraTranslation(): {
    t: _tolgee_react.TFnType<_tolgee_react.DefaultParamType, string, _tolgee_react.TranslationKey>;
    i18n: {
        language: string;
        changeLanguage: (newLang: string) => Promise<void>;
        languages: {
            el: string;
            en: string;
        };
    };
};

/**
 * @layera/tolgee - Main Export
 * Enterprise Translation Management with Tolgee
 *
 * ΑΝΤΙΚΑΘΙΣΤΑ ΠΛΗΡΩΣ το @layera/i18n
 */

declare const LANGUAGES: {
    readonly el: "Ελληνικά";
    readonly en: "English";
};

declare const _default: {
    useLayeraTranslation: typeof useLayeraTranslation;
};

export { LANGUAGES, LanguageSwitcher, MinimalTolgeeProvider as LayeraI18nProvider, MinimalTolgeeProvider as SimpleTolgeeProvider, type SupportedLanguage, TOLGEE_CONFIG, MinimalTolgeeProvider as TolgeeProvider, _default as default, useDetectedLanguage, useDynamicTranslation, useFormattedTranslation, useLayeraTranslation$1 as useLayeraTranslation, usePluralTranslation };
