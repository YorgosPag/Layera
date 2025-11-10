/**
 * @layera/employment-taxonomy
 * Enterprise employment and occupation taxonomy system based on ESCO EU standard
 *
 * 🏗️ ENTERPRISE LEGO SYSTEM:
 * - ESCO API integration για 2,942 occupations + 13,890 skills
 * - Professional search με debouncing και caching
 * - Multilingual support (Greek/English)
 * - International standards (ISCO-08 compatibility)
 * - Structured skills mapping
 * - Reusable across applications
 */

// Types
export type * from './types/esco';
export type * from './types/occupation';

// Components
export { OccupationSearch } from './components/OccupationSearch';
export { OccupationCard } from './components/OccupationCard';

// Hooks
export { useOccupationSearch } from './hooks/useOccupationSearch';

// Providers
export { ESCOProvider, escoProvider } from './providers/esco';

// Version
export const LAYERA_EMPLOYMENT_TAXONOMY_VERSION = '1.0.0';

// Default configurations
export const DEFAULT_ESCO_CONFIG = {
  baseUrl: 'https://esco.ec.europa.eu/api',
  timeout: 10000,
  enableCache: true,
  cacheTtl: 300000, // 5 minutes
  defaultLanguage: 'el'
} as const;

export const SUPPORTED_LANGUAGES = ['el', 'en', 'de', 'fr', 'es', 'it'] as const;

export const EMPLOYMENT_TYPES = [
  'full_time',
  'part_time',
  'contract',
  'freelance',
  'temporary',
  'seasonal',
  'internship',
  'volunteer',
  'remote',
  'hybrid'
] as const;

export const EXPERIENCE_LEVELS = [
  'entry',
  'junior',
  'mid',
  'senior',
  'expert',
  'executive'
] as const;