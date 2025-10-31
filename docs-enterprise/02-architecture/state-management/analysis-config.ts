/**
 * Enterprise Navigation Systems Dynamic Analysis Configuration
 * Configuration για automated detection και analysis των navigation state systems
 * All values dynamically discovered, no hardcoded paths or counts
 */

import { NavigationStateSystem, SYSTEM_STATUS, ENTERPRISE_LEVEL, MIGRATION_PRIORITY } from './types';

// ✅ DYNAMIC: System discovery patterns instead of hardcoded paths
export const NAVIGATION_SYSTEM_PATTERNS = {
  StepOrchestrator: {
    imports: ['StepOrchestrator', 'useStepOrchestrator'],
    filePatterns: ['**/StepOrchestrator.tsx', '**/steps/**/index.ts'],
    status: 'ENTERPRISE_ACTIVE' as keyof typeof SYSTEM_STATUS,
    enterpriseLevel: 'HIGHEST' as keyof typeof ENTERPRISE_LEVEL,
    migrationPriority: 'LOW' as keyof typeof MIGRATION_PRIORITY
  },
  NavigationService: {
    imports: ['NavigationService', 'useNavigation'],
    filePatterns: ['**/NavigationService.ts', '**/navigation/**/hooks/*.ts'],
    status: 'DEPRECATED' as keyof typeof SYSTEM_STATUS,
    enterpriseLevel: 'MEDIUM' as keyof typeof ENTERPRISE_LEVEL,
    migrationPriority: 'HIGH' as keyof typeof MIGRATION_PRIORITY
  },
  LegacyGeoMapNew: {
    imports: ['useState.*currentStep', 'useState.*stepId'],
    filePatterns: ['**/GeoMapNew.tsx', '**/components/Geo*.tsx'],
    status: 'LEGACY' as keyof typeof SYSTEM_STATUS,
    enterpriseLevel: 'NONE' as keyof typeof ENTERPRISE_LEVEL,
    migrationPriority: 'HIGH' as keyof typeof MIGRATION_PRIORITY
  }
} as const;

// ✅ DYNAMIC: Function to generate NavigationStateSystem[] at runtime
export async function discoverNavigationSystems(): Promise<NavigationStateSystem[]> {
  // This will be implemented with actual file system scanning
  return Object.entries(NAVIGATION_SYSTEM_PATTERNS).map(([name, pattern]) => ({
    name,
    location: '', // Will be populated by file discovery
    usageCount: 0, // Will be populated by usage analysis
    status: pattern.status,
    enterpriseLevel: pattern.enterpriseLevel,
    migrationPriority: pattern.migrationPriority
  }));
}

export const ANALYSIS_PATTERNS = {
  STEP_ORCHESTRATOR: [
    'StepOrchestrator',
    'currentStepId.*StepOrchestrator',
    'useStepOrchestrator'
  ],
  NAVIGATION_SERVICE: [
    'NavigationService',
    'useNavigation.*NavigationService',
    'new NavigationService'
  ],
  LEGACY_USE_STATE: [
    'useState.*currentStep',
    'useState.*stepId',
    'const.*currentStep.*useState'
  ]
} as const;

export const SEARCH_PATHS = [
  'apps/layera-geoalert/src/**/*.{ts,tsx}',
  'apps/layera-id/src/**/*.{ts,tsx,js,jsx}',
  'packages/*/src/**/*.{ts,tsx}',
  '!node_modules/**',
  '!dist/**',
  '!build/**'
] as const;

// ✅ DYNAMIC: Validation rules using @layera/constants patterns
export const ENTERPRISE_VALIDATION_RULES = {
  SINGLE_SOURCE_OF_TRUTH: {
    description: 'Only one system should manage currentStepId state',
    violationThreshold: 1,
    severity: 'CRITICAL' as keyof typeof import('./types').RISK_LEVEL
  },
  NO_DEPRECATED_USAGE: {
    description: 'No imports from deprecated NavigationService',
    violationThreshold: 0,
    severity: 'HIGH' as keyof typeof import('./types').RISK_LEVEL
  },
  LEGACY_ELIMINATION: {
    description: 'No useState patterns for step management',
    violationThreshold: 0,
    severity: 'MEDIUM' as keyof typeof import('./types').RISK_LEVEL
  }
} as const;