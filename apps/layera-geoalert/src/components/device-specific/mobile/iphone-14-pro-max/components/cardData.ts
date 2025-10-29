/**
 * cardData.ts - Enterprise Card Data Configuration
 *
 * Data-driven approach για όλες τις κάρτες του CategoryStep.
 * Αντί για hardcoded JSX, χρησιμοποιούμε configuration objects.
 */

import { VillaIcon, BriefcaseIcon, CommercialIcon, HomeIcon, WorkIcon, ToolIcon, BuildingIcon, CheckIcon, RefreshIcon, UploadIcon, MapIcon, EditIcon, SettingsIcon } from '@layera/icons';
import type { CardVariant } from '@layera/cards';

export type CardId =
  | 'property' | 'job'           // Category level
  | 'offer' | 'search'           // Intent level (both property & job)
  | 'sale' | 'rent'              // Transaction level (property only)
  | 'now' | 'future'             // Availability level (after transaction)
  | 'upload'                     // Upload level (after availability)
  | 'layout'                     // Layout level (after upload)
  | 'apartment' | 'office' | 'factory' | 'land' | 'building' | 'store' // Property type level (after layout)
  | 'property-details'           // Property details level (after property type)
  | 'manual-input' | 'map-drawing' | 'floor-plan-upload' | 'auto-calculate'; // Area method level (after property details)

export interface CardConfig {
  id: CardId;
  titleKey: string; // Translation key instead of hardcoded title
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
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
      titleKey: 'category.property',
      icon: VillaIcon,
      variant: 'property' as CardVariant,
      step: 'category'
    },
    {
      id: 'job' as CardId,
      titleKey: 'category.job',
      icon: BriefcaseIcon,
      variant: 'job' as CardVariant,
      step: 'category'
    }
  ],

  // Step 2: Property intent (προσφορά vs αναζήτηση)
  property: [
    {
      id: 'offer' as CardId,
      titleKey: 'intent.property.offer',
      icon: CommercialIcon,
      variant: 'property' as CardVariant,
      category: 'property' as const,
      step: 'intent'
    },
    {
      id: 'search' as CardId,
      titleKey: 'intent.property.search',
      icon: HomeIcon,
      variant: 'property' as CardVariant,
      category: 'property' as const,
      step: 'intent'
    }
  ],

  // Step 2: Job intent (προσφορά θέσης vs αναζήτηση εργασίας)
  job: [
    {
      id: 'offer' as CardId,
      titleKey: 'intent.job.offer',
      icon: WorkIcon,
      variant: 'job' as CardVariant,
      category: 'job' as const,
      step: 'intent'
    },
    {
      id: 'search' as CardId,
      titleKey: 'intent.job.search',
      icon: ToolIcon,
      variant: 'job' as CardVariant,
      category: 'job' as const,
      step: 'intent'
    }
  ],

  // Step 3: Property transaction type (after "offer" intent)
  transaction: [
    {
      id: 'sale' as CardId,
      titleKey: 'transaction.sale',
      icon: CommercialIcon,
      variant: 'property' as CardVariant,
      category: 'property' as const,
      step: 'transaction'
    },
    {
      id: 'rent' as CardId,
      titleKey: 'transaction.rent',
      icon: BuildingIcon,
      variant: 'property' as CardVariant,
      category: 'property' as const,
      step: 'transaction'
    }
  ],

  // Step 4: Availability (after transaction step)
  availability: [
    {
      id: 'now' as CardId,
      titleKey: 'availability.now',
      icon: CheckIcon,
      variant: 'property' as CardVariant,
      category: 'property' as const,
      step: 'availability'
    },
    {
      id: 'future' as CardId,
      titleKey: 'availability.future',
      icon: RefreshIcon,
      variant: 'property' as CardVariant,
      category: 'property' as const,
      step: 'availability'
    }
  ],

  // Step 5: Upload (after availability = now)
  upload: [
    {
      id: 'upload' as CardId,
      titleKey: 'upload.files',
      icon: UploadIcon,
      variant: 'property' as CardVariant,
      category: 'property' as const,
      step: 'upload'
    }
  ],

  // Step 6: Layout (after upload)
  layout: [
    {
      id: 'layout' as CardId,
      titleKey: 'layout.positioning',
      icon: MapIcon,
      variant: 'property' as CardVariant,
      category: 'property' as const,
      step: 'layout'
    }
  ],

  // Step 7: Property Type (after layout) - ΠΡΟΣΩΡΙΝΑ εδώ, θα μετακινηθεί στη σωστή θέση αργότερα
  'property-type': [
    {
      id: 'apartment' as CardId,
      titleKey: 'propertyType.apartment',
      icon: HomeIcon,
      variant: 'property' as CardVariant,
      category: 'property' as const,
      step: 'property-type'
    },
    {
      id: 'office' as CardId,
      titleKey: 'propertyType.office',
      icon: BriefcaseIcon,
      variant: 'property' as CardVariant,
      category: 'property' as const,
      step: 'property-type'
    },
    {
      id: 'factory' as CardId,
      titleKey: 'propertyType.factory',
      icon: ToolIcon,
      variant: 'property' as CardVariant,
      category: 'property' as const,
      step: 'property-type'
    },
    {
      id: 'land' as CardId,
      titleKey: 'propertyType.land',
      icon: VillaIcon,
      variant: 'property' as CardVariant,
      category: 'property' as const,
      step: 'property-type'
    },
    {
      id: 'building' as CardId,
      titleKey: 'propertyType.building',
      icon: BuildingIcon,
      variant: 'property' as CardVariant,
      category: 'property' as const,
      step: 'property-type'
    },
    {
      id: 'store' as CardId,
      titleKey: 'propertyType.store',
      icon: CommercialIcon,
      variant: 'property' as CardVariant,
      category: 'property' as const,
      step: 'property-type'
    }
  ],

  // Step 8: Property Details (after property-type selection)
  'property-details': [
    {
      id: 'property-details' as CardId,
      titleKey: 'propertyDetails.title',
      icon: EditIcon,
      variant: 'property' as CardVariant,
      category: 'property' as const,
      step: 'property-details'
    }
  ],

  // Step 9: Area Method Selection (after property-details)
  'area-method': [
    {
      id: 'manual-input' as CardId,
      titleKey: 'areaMethod.manual',
      icon: EditIcon,
      variant: 'property' as CardVariant,
      category: 'property' as const,
      step: 'area-method'
    },
    {
      id: 'map-drawing' as CardId,
      titleKey: 'areaMethod.mapDrawing',
      icon: MapIcon,
      variant: 'property' as CardVariant,
      category: 'property' as const,
      step: 'area-method'
    },
    {
      id: 'floor-plan-upload' as CardId,
      titleKey: 'areaMethod.floorPlan',
      icon: UploadIcon,
      variant: 'property' as CardVariant,
      category: 'property' as const,
      step: 'area-method'
    },
    {
      id: 'auto-calculate' as CardId,
      titleKey: 'areaMethod.autoCalculate',
      icon: SettingsIcon,
      variant: 'property' as CardVariant,
      category: 'property' as const,
      step: 'area-method'
    }
  ]
} as const;

// Helper functions για type-safe data access
export const getCardsForStep = (step: 'category' | 'property' | 'job' | 'transaction' | 'availability' | 'upload' | 'layout' | 'property-type' | 'property-details' | 'area-method'): readonly CardConfig[] => {
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