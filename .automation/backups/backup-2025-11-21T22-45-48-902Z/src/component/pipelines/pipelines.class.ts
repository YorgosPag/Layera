/**
 * 🔧 LAYERA PIPELINES CLASS - Pipeline component types and structure
 *
 * Defines the type structure για pipeline component tokens
 * Enterprise component layer - specialized για pipeline UI components
 */

// PIPELINE MODAL INTERFACE - For unified pipeline modal styling
export interface PipelineModal {
  overlay: string;
  container: string;
  card: string;
  cardHover: string;
  cardTitle: string;
  cardText: string;
  icon: string;
}

// PIPELINE LAYOUT INTERFACE - For pipeline-specific layout patterns
export interface PipelineLayout {
  floatingPanel: string;
  responsiveGrid: string;
  cardGrid: string;
  iconAlignment: string;
}

// CONSOLIDATED PIPELINE TOKENS CLASS - Complete pipeline component system
export interface PipelineTokensClass {
  modal: PipelineModal;
  layout: PipelineLayout;

  // System properties
  namespace: string;
  version: string;
  target: string;
}

// Helper types για type safety
export type PipelineModalVariant = keyof PipelineModal;
export type PipelineLayoutVariant = keyof PipelineLayout;