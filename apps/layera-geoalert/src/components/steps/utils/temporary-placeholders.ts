/**
 * temporary-placeholders.ts - Temporary Placeholder Functions
 *
 * Προσωρινές συναρτήσεις για migration από PipelineDiscovery σε StepOrchestrator
 * Αυτό θα αφαιρεθεί αφού ολοκληρωθεί η migration
 */

// Temporary placeholder για getCardsForStep
export const getCardsForStep = (stepId: string): unknown[] => {
  console.warn(`⚠️ Temporary placeholder: getCardsForStep('${stepId}') - should be replaced with StepOrchestrator cards`);
  return [];
};

// Temporary placeholder για CardConfig type
export interface CardConfig {
  id: string;
  component: unknown;
  order: number;
  conditions?: unknown[];
}

// Temporary placeholder για CardId type
export type CardId = string;

// Temporary placeholder για PipelineDiscovery class
export class PipelineDiscovery {
  static getInstance() {
    return new PipelineDiscovery();
  }

  // Add any methods που χρησιμοποιούνται στα step components
  selectCategory(category: string) {
    console.warn(`⚠️ Temporary placeholder: PipelineDiscovery.selectCategory('${category}')`);
  }

  selectIntent(intent: string) {
    console.warn(`⚠️ Temporary placeholder: PipelineDiscovery.selectIntent('${intent}')`);
  }

  reset() {
    console.warn(`⚠️ Temporary placeholder: PipelineDiscovery.reset()`);
  }
}