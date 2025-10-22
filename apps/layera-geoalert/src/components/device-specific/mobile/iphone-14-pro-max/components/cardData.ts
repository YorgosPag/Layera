/**
 * cardData.ts - Enterprise Card Data Configuration
 *
 * Data-driven approach για όλες τις κάρτες του CategoryStep.
 * Αντί για hardcoded JSX, χρησιμοποιούμε configuration objects.
 */

import { VillaIcon, BriefcaseIcon, CommercialIcon, HomeIcon, WorkIcon, ToolIcon, BuildingIcon, CheckIcon, RefreshIcon, UploadIcon, MapIcon, EditIcon, RulerIcon, SettingsIcon } from '@layera/icons';
import type { CardVariant } from './BaseCard';

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

  // Step 2: Property intent (προσφορά vs αναζήτηση)
  property: [
    {
      id: 'offer' as CardId,
      title: 'Θέλω να προσφέρω',
      icon: CommercialIcon,
      variant: 'property' as CardVariant,
      category: 'property' as const,
      step: 'intent'
    },
    {
      id: 'search' as CardId,
      title: 'Θέλω να αναζητήσω',
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
      title: 'Θέλω να προσφέρω',
      icon: WorkIcon,
      variant: 'job' as CardVariant,
      category: 'job' as const,
      step: 'intent'
    },
    {
      id: 'search' as CardId,
      title: 'Αναζητώ εργασία',
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
      title: 'Πώληση',
      icon: CommercialIcon,
      variant: 'property' as CardVariant,
      category: 'property' as const,
      step: 'transaction'
    },
    {
      id: 'rent' as CardId,
      title: 'Ενοικίαση',
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
      title: 'Τώρα',
      icon: CheckIcon,
      variant: 'property' as CardVariant,
      category: 'property' as const,
      step: 'availability'
    },
    {
      id: 'future' as CardId,
      title: 'Στο Μέλλον',
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
      title: 'Ανέβασμα Αρχείων',
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
      title: 'Τοποθέτηση & Κλίμακα',
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
      title: 'Διαμέρισμα',
      icon: HomeIcon,
      variant: 'property' as CardVariant,
      category: 'property' as const,
      step: 'property-type'
    },
    {
      id: 'office' as CardId,
      title: 'Γραφείο',
      icon: BriefcaseIcon,
      variant: 'property' as CardVariant,
      category: 'property' as const,
      step: 'property-type'
    },
    {
      id: 'factory' as CardId,
      title: 'Εργοστάσιο',
      icon: ToolIcon,
      variant: 'property' as CardVariant,
      category: 'property' as const,
      step: 'property-type'
    },
    {
      id: 'land' as CardId,
      title: 'Οικόπεδο',
      icon: VillaIcon,
      variant: 'property' as CardVariant,
      category: 'property' as const,
      step: 'property-type'
    },
    {
      id: 'building' as CardId,
      title: 'Κτίριο',
      icon: BuildingIcon,
      variant: 'property' as CardVariant,
      category: 'property' as const,
      step: 'property-type'
    },
    {
      id: 'store' as CardId,
      title: 'Κατάστημα',
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
      title: 'Στοιχεία Ακινήτου',
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
      title: 'Χειροκίνητη Εισαγωγή',
      icon: EditIcon,
      variant: 'property' as CardVariant,
      category: 'property' as const,
      step: 'area-method'
    },
    {
      id: 'map-drawing' as CardId,
      title: 'Σχεδίαση στον Χάρτη',
      icon: MapIcon,
      variant: 'property' as CardVariant,
      category: 'property' as const,
      step: 'area-method'
    },
    {
      id: 'floor-plan-upload' as CardId,
      title: 'Από Κάτοψη',
      icon: UploadIcon,
      variant: 'property' as CardVariant,
      category: 'property' as const,
      step: 'area-method'
    },
    {
      id: 'auto-calculate' as CardId,
      title: 'Αυτόματος Υπολογισμός',
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