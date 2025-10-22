/**
 * @layera/pipelines - Enterprise Pipeline Discovery & Management System
 *
 * Αυτόματη ανακάλυψη και συγχρονισμός pipeline steps χωρίς manual configuration.
 * Enterprise-grade pipeline state management για scalable εφαρμογές.
 */

// Enterprise Auto-Discovery Pipeline System
export { PipelineDiscovery } from './context/PipelineDiscovery';
export type {
  CategoryType,
  IntentType,
  PipelineStepId,
  PipelineStep,
  PipelineState
} from './context/PipelineDiscovery';

// Version
export const LAYERA_PIPELINES_VERSION = '1.0.0';