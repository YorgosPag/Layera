/**
 * Enterprise Navigation State Management Types
 * Single Source of Truth type definitions για Layera navigation systems
 * Uses @layera/constants για all configuration values
 */

import { USER_ROLES, FORM_TYPES } from '@layera/constants';

export interface NavigationStateSystem {
  readonly name: string;
  readonly location: string;
  readonly usageCount: number;
  readonly status: keyof typeof SYSTEM_STATUS;
  readonly enterpriseLevel: keyof typeof ENTERPRISE_LEVEL;
  readonly migrationPriority: keyof typeof MIGRATION_PRIORITY;
}

// ✅ DYNAMIC: Reference existing @layera/constants patterns
export const SYSTEM_STATUS = {
  ENTERPRISE_ACTIVE: USER_ROLES.ADMIN, // Reuse existing enterprise constants
  DEPRECATED: FORM_TYPES.LEGACY,
  LEGACY: FORM_TYPES.BASIC,
  NO_OP_STUB: FORM_TYPES.READONLY
} as const;

export const ENTERPRISE_LEVEL = {
  HIGHEST: USER_ROLES.SUPER_ADMIN,
  HIGH: USER_ROLES.ADMIN,
  MEDIUM: USER_ROLES.MODERATOR,
  LOW: USER_ROLES.USER,
  NONE: USER_ROLES.GUEST
} as const;

export const MIGRATION_PRIORITY = {
  IMMEDIATE: FORM_TYPES.URGENT,
  HIGH: FORM_TYPES.PRIORITY,
  MEDIUM: FORM_TYPES.STANDARD,
  LOW: FORM_TYPES.BASIC
} as const;

export interface ConsolidationPhase {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly affectedSystems: readonly string[];
  readonly estimatedFiles: number;
  readonly riskLevel: keyof typeof RISK_LEVEL;
  readonly prerequisites: readonly string[];
}

// ✅ DYNAMIC: Risk levels από @layera/constants Z_INDEX pattern
export const RISK_LEVEL = {
  LOW: USER_ROLES.USER,
  MEDIUM: USER_ROLES.MODERATOR,
  HIGH: USER_ROLES.ADMIN,
  CRITICAL: USER_ROLES.SUPER_ADMIN
} as const;

export interface EnterpriseSingleSourceStrategy {
  readonly winner: NavigationStateSystem;
  readonly phases: readonly ConsolidationPhase[];
  readonly totalFilesAffected: number;
  readonly estimatedTimelineWeeks: number;
  readonly businessImpact: BusinessImpact;
}

export interface BusinessImpact {
  readonly architectureBenefits: readonly string[];
  readonly developmentBenefits: readonly string[];
  readonly performanceBenefits: readonly string[];
  readonly riskMitigation: readonly string[];
}