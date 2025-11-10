/**
 * @layera/tolgee - Configuration
 * Centralized Tolgee configuration for Layera ecosystem
 */

export const TOLGEE_CONFIG = {
  // API Configuration
  apiUrl: (typeof process !== 'undefined' && process.env?.TOLGEE_API_URL) || 'https://app.tolgee.io',
  apiKey: (typeof process !== 'undefined' && process.env?.TOLGEE_API_KEY) || '',

  // Project Settings
  projectId: (typeof process !== 'undefined' && process.env?.TOLGEE_PROJECT_ID) || '',

  // Language Settings
  defaultLanguage: 'el', // Greek as default
  fallbackLanguage: 'en',
  supportedLanguages: ['el', 'en'] as const,

  // Development Settings
  isDevelopment: typeof process !== 'undefined' && process.env?.NODE_ENV === 'development',
  inContextEditing: typeof process !== 'undefined' && process.env?.NODE_ENV === 'development',

  // Cache Settings
  cacheEnabled: true,
  cacheExpirationMs: 24 * 60 * 60 * 1000, // 24 hours

  // Features
  features: {
    autoTranslate: true,
    machineTranslation: true,
    inContextEditing: true,
    screenshots: true,
    comments: true
  }
} as const;

export type SupportedLanguage = typeof TOLGEE_CONFIG.supportedLanguages[number];