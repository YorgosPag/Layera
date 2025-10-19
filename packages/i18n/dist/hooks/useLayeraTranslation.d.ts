import { UseTranslationOptions } from 'react-i18next';
import { SupportedLanguage, namespaces } from '../config';
type Namespace = typeof namespaces[number];
/**
 * Custom hook for Layera-specific translations
 * Provides type-safe translation with automatic namespace handling
 */
export declare function useLayeraTranslation(ns?: Namespace, options?: UseTranslationOptions<Namespace>): {
    t: import("i18next").TFunction<"common" | "dashboard", "common" | "dashboard">;
    i18n: import("i18next").i18n;
    ready: boolean;
    changeLanguage: (lng: SupportedLanguage) => Promise<import("i18next").TFunction<"translation", undefined>>;
    currentLanguage: "el" | "en";
    availableLanguages: ("el" | "en")[];
    formatters: {
        /**
         * Format role name
         */
        role: (role: string) => string;
        /**
         * Format status
         */
        status: (status: string) => string;
        /**
         * Format action
         */
        action: (action: string) => string;
        /**
         * Format error message
         */
        error: (error: string) => string;
    };
};
export default useLayeraTranslation;
//# sourceMappingURL=useLayeraTranslation.d.ts.map