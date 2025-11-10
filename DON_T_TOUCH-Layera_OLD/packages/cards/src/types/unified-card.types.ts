/**
 * Unified Card Types - Configuration-driven Card System
 *
 * Ενιαίο type system που αντικαθιστά 13 διαφορετικά Card components
 * με configuration-driven approach για maximum reusability.
 */

import React from 'react';
import type { CardVariant } from './card.types';

// ============= CORE CARD TYPES =============

export type UnifiedCardType = 'selection' | 'tool' | 'data' | 'action';

export type CardTheme = 'property' | 'job' | 'neutral' | 'auto';

// ============= BASE CONFIGURATION =============

export interface UnifiedCardConfig {
  // Core identification
  id: string;
  type: UnifiedCardType;

  // Content
  title: string;
  description?: string;
  icon?: React.ReactNode;
  content?: React.ReactNode; // For complex data cards

  // Appearance
  variant?: CardVariant;
  theme?: CardTheme;

  // State
  selectable?: boolean;
  selected?: boolean;
  disabled?: boolean;

  // Interaction
  onClick?: () => void;
  onInfoClick?: () => void;

  // Metadata
  testId?: string;
  className?: string;
}

// ============= SPECIFIC CARD CONFIGURATIONS =============

export interface SelectionCardConfig extends UnifiedCardConfig {
  type: 'selection';
  selectionValue: unknown; // CategoryType, IntentType, AvailabilityType, etc.
  category?: 'property' | 'job'; // For category-aware styling
}

export interface ToolCardConfig extends UnifiedCardConfig {
  type: 'tool';
  toolValue: unknown; // ToolType, LayoutToolType, etc.
  isSelected?: boolean;
  toolCategory?: 'layout' | 'measurement' | 'drawing';
}

export interface DataCardConfig extends UnifiedCardConfig {
  type: 'data';
  content: React.ReactNode; // Complex forms, summaries, etc.
  dataType?: 'pricing' | 'review' | 'summary';
}

export interface ActionCardConfig extends UnifiedCardConfig {
  type: 'action';
  actionValue: unknown; // UploadAction, etc.
  priority?: 'primary' | 'secondary';
  actionCategory?: 'upload' | 'submit' | 'navigation';
}

// ============= CONTEXT TYPES =============

export interface CardContext {
  // Step context
  currentStep?: string;
  category?: 'property' | 'job';

  // Flow context
  intent?: 'offer' | 'search';

  // UI context
  viewMode?: 'mobile' | 'desktop';

  // Custom context
  [key: string]: unknown;
}

// ============= UNIFIED CARD PROPS =============

export interface UnifiedCardProps {
  config: UnifiedCardConfig;
  context?: CardContext;
}

// ============= VARIANT RESOLUTION =============

export type VariantResolver = (
  config: UnifiedCardConfig,
  context?: CardContext
) => CardVariant;

export type ThemeResolver = (
  config: UnifiedCardConfig,
  context?: CardContext
) => CardVariant;

// ============= FACTORY TYPES =============

export interface CardConfigFactory {
  selection: (data: Partial<SelectionCardConfig> & { id: string; title: string; selectionValue: unknown }) => SelectionCardConfig;
  tool: (data: Partial<ToolCardConfig> & { id: string; title: string; toolValue: unknown }) => ToolCardConfig;
  data: (data: Partial<DataCardConfig> & { id: string; title: string; content: React.ReactNode }) => DataCardConfig;
  action: (data: Partial<ActionCardConfig> & { id: string; title: string; actionValue: unknown }) => ActionCardConfig;
}

// ============= MIGRATION HELPERS =============

// Legacy Card Component Props για migration compatibility
export interface LegacyCardMigration {
  categoryCard: SelectionCardConfig;
  availabilityCard: SelectionCardConfig;
  intentCard: SelectionCardConfig;
  pricingCard: DataCardConfig;
  layoutToolCard: ToolCardConfig;
  uploadCard: ActionCardConfig;
}

// ============= VALIDATION TYPES =============

export interface CardValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export type CardValidator = (config: UnifiedCardConfig) => CardValidation;