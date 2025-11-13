/**
 * Card Configuration Factory - Helper functions για εύκολη δημιουργία card configs
 *
 * Παρέχει convenient factory functions για τους 4 τύπους καρτών
 * με sensible defaults και type safety.
 */

import type { ReactNode } from 'react';
import type {
  SelectionCardConfig,
  ToolCardConfig,
  DataCardConfig,
  ActionCardConfig,
  CardConfigFactory
} from '../types/unified-card.types';
// import type { CardVariant } from '../types/card.types'; // unused

// ============= FACTORY FUNCTIONS =============

/**
 * Creates a selection card configuration
 */
export function createSelectionCard(
  data: Partial<SelectionCardConfig> & {
    id: string;
    title: string;
    selectionValue: unknown;
  }
): SelectionCardConfig {
  return {
    type: 'selection',
    theme: 'auto',
    selectable: true,
    selected: false,
    disabled: false,
    ...data
  };
}

/**
 * Creates a tool card configuration
 */
export function createToolCard(
  data: Partial<ToolCardConfig> & {
    id: string;
    title: string;
    toolValue: unknown;
  }
): ToolCardConfig {
  return {
    type: 'tool',
    theme: 'neutral',
    isSelected: false,
    disabled: false,
    toolCategory: 'layout',
    ...data
  };
}

/**
 * Creates a data card configuration
 */
export function createDataCard(
  data: Partial<DataCardConfig> & {
    id: string;
    title: string;
    content: ReactNode;
  }
): DataCardConfig {
  return {
    type: 'data',
    theme: 'auto',
    disabled: false,
    dataType: 'summary',
    ...data
  };
}

/**
 * Creates an action card configuration
 */
export function createActionCard(
  data: Partial<ActionCardConfig> & {
    id: string;
    title: string;
    actionValue: unknown;
  }
): ActionCardConfig {
  return {
    type: 'action',
    theme: 'neutral',
    priority: 'secondary',
    disabled: false,
    actionCategory: 'navigation',
    ...data
  };
}

// ============= FACTORY OBJECT =============

export const cardFactory: CardConfigFactory = {
  selection: createSelectionCard,
  tool: createToolCard,
  data: createDataCard,
  action: createActionCard
};

// ============= SPECIALIZED FACTORIES =============

/**
 * Category selection card (property/job)
 */
export function createCategoryCard(data: {
  categoryType: 'property' | 'job';
  title: string;
  icon: ReactNode;
  onCategorySelect: (category: 'property' | 'job') => void;
  onInfoClick?: () => void;
}): SelectionCardConfig {
  const baseConfig = {
    id: `category-${data.categoryType}`,
    title: data.title,
    icon: data.icon,
    selectionValue: data.categoryType,
    category: data.categoryType,
    theme: data.categoryType,
    onClick: () => data.onCategorySelect(data.categoryType),
    testId: `category-${data.categoryType}-card`
  } as const;

  return createSelectionCard(
    data.onInfoClick
      ? { ...baseConfig, onInfoClick: data.onInfoClick }
      : baseConfig
  );
}

/**
 * Intent selection card (offer/search)
 */
export function createIntentCard(data: {
  intentType: 'offer' | 'search';
  title: string;
  icon: ReactNode;
  category: 'property' | 'job';
  onIntentSelect: (intent: 'offer' | 'search') => void;
  onInfoClick?: () => void;
}): SelectionCardConfig {
  const baseConfig = {
    id: `intent-${data.intentType}`,
    title: data.title,
    icon: data.icon,
    selectionValue: data.intentType,
    category: data.category,
    theme: data.category,
    onClick: () => data.onIntentSelect(data.intentType),
    testId: `intent-${data.intentType}-card`
  } as const;

  return createSelectionCard(
    data.onInfoClick
      ? { ...baseConfig, onInfoClick: data.onInfoClick }
      : baseConfig
  );
}

/**
 * Availability selection card
 */
export function createAvailabilityCard(data: {
  availability: string;
  title: string;
  description?: string;
  icon: ReactNode;
  onAvailabilitySelect: (availability: string) => void;
}): SelectionCardConfig {
  const baseConfig = {
    id: `availability-${data.availability}`,
    title: data.title,
    icon: data.icon,
    selectionValue: data.availability,
    onClick: () => data.onAvailabilitySelect(data.availability),
    testId: `availability-${data.availability}-card`
  } as const;

  return createSelectionCard(
    data.description
      ? { ...baseConfig, description: data.description }
      : baseConfig
  );
}

/**
 * Layout tool card
 */
export function createLayoutToolCard(data: {
  toolType: string;
  title: string;
  description?: string;
  icon: ReactNode;
  isSelected?: boolean;
  onToolSelect: (tool: string) => void;
}): ToolCardConfig {
  return createToolCard({
    id: `layout-tool-${data.toolType}`,
    title: data.title,
    description: data.description,
    icon: data.icon,
    toolValue: data.toolType,
    isSelected: data.isSelected || false,
    toolCategory: 'layout',
    onClick: () => data.onToolSelect(data.toolType),
    testId: `layout-tool-${data.toolType}-card`
  });
}

/**
 * Pricing data card for displaying pricing information
 */
export function createPricingDataCard(data: {
  pricingType: string;
  title: string;
  content: ReactNode;
  category: 'property' | 'job';
  onPricingSelect?: (pricing: string) => void;
}): DataCardConfig {
  return createDataCard({
    id: `pricing-data-${data.pricingType}`,
    title: data.title,
    content: data.content,
    theme: data.category,
    dataType: 'pricing',
    onClick: data.onPricingSelect ? () => data.onPricingSelect!(data.pricingType) : undefined,
    testId: `pricing-data-${data.pricingType}-card`
  });
}

/**
 * Pricing selection card για pricing plans
 */
export function createPricingCard(data: {
  pricingType: 'free' | 'budget' | 'premium' | 'negotiable';
  title: string;
  icon: ReactNode;
  category: 'property' | 'job';
  onPricingSelect: (pricing: 'free' | 'budget' | 'premium' | 'negotiable') => void;
  isSelected?: boolean;
}): SelectionCardConfig {
  const baseConfig = {
    id: `pricing-${data.pricingType}`,
    title: data.title,
    icon: data.icon,
    selectionValue: data.pricingType,
    category: data.category,
    theme: data.category,
    onClick: () => data.onPricingSelect(data.pricingType),
    testId: `pricing-card-${data.pricingType}`,
    selected: data.isSelected
  } as const;

  return createSelectionCard(baseConfig);
}

/**
 * Review card με complex state management
 * Enterprise approach: Configuration-driven extension
 */
export function createReviewCard(data: {
  reviewType: 'preview' | 'edit' | 'confirm';
  reviewData: {
    stepId: string;
    stepName: string;
    selectedValue: string;
    isValid: boolean;
  };
  category?: 'property' | 'job';
  title?: string;
  icon?: ReactNode;
  onReviewAction?: (action: 'preview' | 'edit' | 'confirm', stepId: string) => void;
  onEdit?: (stepId: string) => void;
  reviewMode?: 'preview' | 'edit' | 'confirm';
}): DataCardConfig {
  // Smart title generation
  const cardTitle = data.title || (() => {
    switch (data.reviewType) {
      case 'preview': return `👁️ Προεπισκόπηση ${data.reviewData.stepName}`;
      case 'edit': return `✏️ Επεξεργασία ${data.reviewData.stepName}`;
      case 'confirm': return `✅ Επιβεβαίωση ${data.reviewData.stepName}`;
      default: return `Review ${data.reviewData.stepName}`;
    }
  })();

  // Smart content based on review state
  const reviewContent = (() => {
    if (!data.reviewData.isValid) {
      return `⚠️ Απαιτείται διόρθωση στο βήμα "${data.reviewData.stepId}"`;
    }

    switch (data.reviewType) {
      case 'preview': return `Επιλεγμένο: ${data.reviewData.selectedValue}`;
      case 'edit': return `Κάντε κλικ για επεξεργασία του "${data.reviewData.selectedValue}"`;
      case 'confirm': return `Επιβεβαιωμένο: ${data.reviewData.selectedValue}`;
      default: return data.reviewData.selectedValue;
    }
  })();

  return createDataCard({
    id: `review-${data.reviewData.stepId}-${data.reviewType}`,
    title: cardTitle,
    content: reviewContent,
    icon: data.icon,
    theme: data.category || 'property',
    dataType: 'review',
    onClick: () => {
      if (data.reviewType === 'edit') {
        data.onEdit?.(data.reviewData.stepId);
      } else {
        data.onReviewAction?.(data.reviewType, data.reviewData.stepId);
      }
    },
    testId: `review-card-${data.reviewData.stepId}-${data.reviewType}`,
  });
}

/**
 * Upload action card
 */
export function createUploadCard(data: {
  actionType: string;
  title: string;
  description?: string;
  icon: ReactNode;
  priority?: 'primary' | 'secondary';
  onUploadAction: (action: string) => void;
}): ActionCardConfig {
  return createActionCard({
    id: `upload-${data.actionType}`,
    title: data.title,
    description: data.description,
    icon: data.icon,
    actionValue: data.actionType,
    priority: data.priority || 'secondary',
    actionCategory: 'upload',
    onClick: () => data.onUploadAction(data.actionType),
    testId: `upload-${data.actionType}-card`
  });
}

// ============= BATCH CREATION HELPERS =============

/**
 * Creates multiple selection cards από array data
 */
export function createSelectionCards<T>(
  items: T[],
  mapper: (item: T, index: number) => Partial<SelectionCardConfig> & {
    id: string;
    title: string;
    selectionValue: unknown;
  }
): SelectionCardConfig[] {
  return items.map((item, index) => createSelectionCard(mapper(item, index)));
}

/**
 * Creates multiple tool cards από array data
 */
export function createToolCards<T>(
  items: T[],
  mapper: (item: T, index: number) => Partial<ToolCardConfig> & {
    id: string;
    title: string;
    toolValue: unknown;
  }
): ToolCardConfig[] {
  return items.map((item, index) => createToolCard(mapper(item, index)));
}