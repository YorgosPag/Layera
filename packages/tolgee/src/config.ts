/**
 * @layera/tolgee - Configuration
 * Centralized Tolgee configuration for Layera ecosystem
 */

// Browser-safe environment variable access
const getEnvVar = (name: string): string => {
  if (typeof window !== 'undefined') {
    // Browser environment - check window object
    return ((window as any)?.__ENV__?.[name]) || '';
  }
  // Use globalThis for universal environment access
  try {
    const processEnv = (globalThis as any)?.process?.env;
    if (processEnv) {
      return processEnv[name] || '';
    }
  } catch {
    // Silently handle environments where process is not available
  }
  return '';
};

const isDevelopment = (): boolean => {
  if (typeof window !== 'undefined') {
    return ((window as any)?.__ENV__?.NODE_ENV) === 'development';
  }
  // Use globalThis for universal environment access
  try {
    const processEnv = (globalThis as any)?.process?.env;
    if (processEnv) {
      return processEnv.NODE_ENV === 'development';
    }
  } catch {
    // Silently handle environments where process is not available
  }
  return false;
};

export const TOLGEE_CONFIG = {
  // API Configuration
  apiUrl: getEnvVar('TOLGEE_API_URL') || 'https://app.tolgee.io',
  apiKey: getEnvVar('TOLGEE_API_KEY'),

  // Project Settings
  projectId: getEnvVar('TOLGEE_PROJECT_ID'),

  // Language Settings
  defaultLanguage: 'el', // Greek as default
  fallbackLanguage: 'en',
  supportedLanguages: ['el', 'en'] as const,

  // Development Settings
  isDevelopment: isDevelopment(),
  inContextEditing: isDevelopment(),

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