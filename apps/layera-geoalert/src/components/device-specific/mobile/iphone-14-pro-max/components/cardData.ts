/**
 * cardData.ts - Enterprise Card Data Configuration
 *
 * Data-driven approach για όλες τις κάρτες του CategoryStep.
 * Αντί για hardcoded JSX, χρησιμοποιούμε configuration objects.
 */

import { VillaIcon, BriefcaseIcon, CommercialIcon, HomeIcon, WorkIcon, ToolIcon } from '@layera/icons';
import type { CardVariant } from './BaseCard';

export type CardId =
  | 'property' | 'job'           // Category level
  | 'sale' | 'rent'              // Property level
  | 'fulltime' | 'parttime';     // Job level

export interface CardConfig {
  id: CardId;
  title: string;
  icon: React.ComponentType<any>;
  variant: CardVariant;
  category?: 'property' | 'job';
  step?: string;
}

// Card configurations by step
export const cardData = {
  // Step 1: Category selection
  category: [
    {
      id: 'property' as CardId,
      title: 'Ακίνητα',
      icon: VillaIcon,
      variant: 'property' as CardVariant,
      step: 'category'
    },
    {
      id: 'job' as CardId,
      title: 'Εργασία',
      icon: BriefcaseIcon,
      variant: 'job' as CardVariant,
      step: 'category'
    }
  ],

  // Step 2: Property transaction types
  property: [
    {
      id: 'sale' as CardId,
      title: 'Πώληση',
      icon: CommercialIcon,
      variant: 'property' as CardVariant,
      category: 'property' as const,
      step: 'transactionType'
    },
    {
      id: 'rent' as CardId,
      title: 'Ενοικίαση',
      icon: HomeIcon,
      variant: 'property' as CardVariant,
      category: 'property' as const,
      step: 'transactionType'
    }
  ],

  // Step 2: Job employment types
  job: [
    {
      id: 'fulltime' as CardId,
      title: 'Πλήρης Απασχόληση',
      icon: WorkIcon,
      variant: 'job' as CardVariant,
      category: 'job' as const,
      step: 'transactionType'
    },
    {
      id: 'parttime' as CardId,
      title: 'Μερική Απασχόληση',
      icon: ToolIcon,
      variant: 'job' as CardVariant,
      category: 'job' as const,
      step: 'transactionType'
    }
  ]
} as const;

// Helper functions για type-safe data access
export const getCardsForStep = (step: 'category' | 'property' | 'job'): readonly CardConfig[] => {
  return cardData[step];
};

export const getCardById = (id: CardId): CardConfig | undefined => {
  for (const stepCards of Object.values(cardData)) {
    const card = stepCards.find(card => card.id === id);
    if (card) return card;
  }
  return undefined;
};

// Type exports για άλλα components
// Already exported above - avoiding duplicate exports