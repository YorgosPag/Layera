import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Import translations directly for better bundling
import elCommon from './locales/el/common.json';
import enCommon from './locales/en/common.json';
import elDashboard from './locales/el/dashboard.json';
import enDashboard from './locales/en/dashboard.json';

export const defaultNS = 'common';
export const namespaces = ['common', 'dashboard'] as const;

export const resources = {
  el: {
    common: elCommon,
    dashboard: elDashboard,
  },
  en: {
    common: enCommon,
    dashboard: enDashboard,
  },
} as const;

export const supportedLngs = ['el', 'en'] as const;
export type SupportedLanguage = typeof supportedLngs[number];

export const i18nConfig = {
  debug: process.env.NODE_ENV === 'development',

  // Default language
  lng: 'el',
  fallbackLng: 'el',

  // Supported languages
  supportedLngs,

  // Namespaces
  ns: namespaces,
  defaultNS,

  // Resources
  resources,

  // Interpolation options
  interpolation: {
    escapeValue: false, // React already escapes
  },

  // React specific options
  react: {
    useSuspense: false, // Disable suspense for SSR compatibility
    bindI18n: 'languageChanged',
    bindI18nStore: '',
    transEmptyNodeValue: '',
    transSupportBasicHtmlNodes: true,
    transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p', 'span'],
  },

  // Language detection options
  detection: {
    order: ['localStorage', 'navigator', 'htmlTag'],
    lookupLocalStorage: 'layera-language',
    caches: ['localStorage'],
  },
};

// Initialize i18next
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(i18nConfig);

export default i18n;