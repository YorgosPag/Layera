/**
 * 🔧 LAYERA PIPELINES VARIANTS - Pipeline component semantic names
 *
 * Semantic variant names για pipeline components
 * Maps abstract pipeline names to their purposes
 */

import type {
  PipelineModal,
  PipelineLayout
} from './pipelines.class';

// MODAL VARIANTS - Pipeline modal purposes
export const PIPELINE_MODAL_VARIANTS: PipelineModal = {
  overlay: 'unified-pipeline-overlay',
  container: 'unified-pipeline-container',
  card: 'unified-pipeline-card',
  cardHover: 'unified-pipeline-card-hover',
  cardTitle: 'unified-pipeline-card-title',
  cardText: 'unified-pipeline-card-text',
  icon: 'unified-pipeline-icon',
} as const;

// LAYOUT VARIANTS - Pipeline layout purposes
export const PIPELINE_LAYOUT_VARIANTS: PipelineLayout = {
  floatingPanel: 'floating-panel-layout',
  responsiveGrid: 'responsive-grid-layout',
  cardGrid: 'card-grid-layout',
  iconAlignment: 'icon-alignment-layout',
} as const;

// Export για χρήση σε άλλα modules
export {
  PIPELINE_MODAL_VARIANTS as PipelineModalVariants,
  PIPELINE_LAYOUT_VARIANTS as PipelineLayoutVariants,
};