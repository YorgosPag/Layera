/**
 * CategoryStep.tsx - Enterprise Category Step με Transparent Card System
 *
 * Αντικατάσταση με το αρχικό transparent card system που χρησιμοποιούσε το iPhone 14 Pro Max.
 * Χρησιμοποιεί BaseCard, cardData, PipelineDiscovery και UI_CONFIG από το device-specific folder.
 */

import React, { useState, useCallback } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { UI_CONFIG } from '../../../constants';
import { PipelineDiscovery } from '@layera/pipelines';
import { BaseCard } from '../../device-specific/mobile/iphone-14-pro-max/components/BaseCard';
import { LayoutStepCard } from '../../device-specific/mobile/iphone-14-pro-max/components/LayoutStepCard';
import { InfoPanel } from '../../device-specific/mobile/iphone-14-pro-max/components/InfoPanel';
import { cardData, getCardsForStep, type CardConfig, type CardId } from '../../device-specific/mobile/iphone-14-pro-max/components/cardData';
import type { StepProps, CategoryType } from '../types';

export type Category = 'property' | 'job';

export interface CategoryStepProps extends Partial<StepProps> {
  /** Legacy compatibility */
  onNext?: (category: CategoryType) => void;
  /** Legacy compatibility props */
  isVisible?: boolean;
  currentStepId?: string;
}

/**
 * Enterprise Category Step - Χρησιμοποιεί το αρχικό transparent card system με step progression
 */
export const CategoryStep: React.FC<CategoryStepProps> = ({
  context,
  onNext,
  onStepComplete,
  isVisible = true,
  currentStepId = 'category',
  deviceProps = {}
}) => {
  const { t } = useLayeraTranslation();

  // Local state για category selection με fallback για legacy compatibility
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    context?.selectedCategory || null
  );

  // State για τα επόμενα βήματα
  const [showNextSteps, setShowNextSteps] = useState(false);
  const [selectedIntent, setSelectedIntent] = useState<'offer' | 'search' | null>(null);
  const [showTransactionStep, setShowTransactionStep] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<'sale' | 'rent' | null>(null);
  const [showAvailabilityStep, setShowAvailabilityStep] = useState(false);
  const [selectedAvailability, setSelectedAvailability] = useState<'now' | 'future' | null>(null);
  const [showUploadStep, setShowUploadStep] = useState(false);
  const [showLayoutStep, setShowLayoutStep] = useState(false);
  const [showPropertyTypeStep, setShowPropertyTypeStep] = useState(false);
  const [selectedPropertyType, setSelectedPropertyType] = useState<'apartment' | 'office' | 'factory' | 'land' | 'building' | 'store' | null>(null);
  const [showPropertyDetailsStep, setShowPropertyDetailsStep] = useState(false);
  const [showAreaMethodStep, setShowAreaMethodStep] = useState(false);
  const [selectedAreaMethod, setSelectedAreaMethod] = useState<'manual-input' | 'map-drawing' | 'floor-plan-upload' | 'auto-calculate' | null>(null);
  const [propertyDetailsData, setPropertyDetailsData] = useState<any>(null);

  // Info Panel states - για κάθε κάρτα ξεχωριστά
  const [infoStates, setInfoStates] = useState<Record<CardId, boolean>>({
    property: false,
    job: false,
    offer: false,
    search: false,
    sale: false,
    rent: false,
    now: false,
    future: false,
    upload: false,
    layout: false,
    apartment: false,
    office: false,
    factory: false,
    land: false,
    building: false,
    store: false,
    'property-details': false,
    'manual-input': false,
    'map-drawing': false,
    'floor-plan-upload': false,
    'auto-calculate': false
  });

  // 🚀 ENTERPRISE: Helper function για έλεγχο αν υπάρχουν κάρτες για το επόμενο βήμα
  const hasCardsForNextStep = React.useCallback((currentStep: string, category: Category | null, intent: 'offer' | 'search' | null): boolean => {
    if (currentStep === 'category') {
      // Μετά το category, πάμε στο intent που έχει πάντα κάρτες
      return true;
    }

    if (currentStep === 'intent') {
      // Μετά το intent, μόνο το "property + offer" έχει transaction step
      return category === 'property' && intent === 'offer';
    }

    if (currentStep === 'transaction') {
      // Μετά το transaction, έχουμε availability step
      return true;
    }

    if (currentStep === 'availability') {
      // Μετά το availability, έχουμε upload step μόνο για "now"
      return intent === 'offer'; // Μόνο για offer έχουμε upload
    }

    if (currentStep === 'upload') {
      // Μετά το upload, έχουμε layout step
      return true;
    }

    if (currentStep === 'layout') {
      // Μετά το layout, έχουμε property-type step
      return true;
    }

    if (currentStep === 'property-type') {
      // Μετά το property-type, έχουμε property-details step
      return true;
    }

    if (currentStep === 'property-details') {
      // Μετά το property-details, έχουμε area-method step
      return true;
    }

    if (currentStep === 'area-method') {
      // Μετά το area-method, τελειώνει το pipeline
      return false;
    }

    // Για όλα τα άλλα steps, δεν έχουμε κάρτες ακόμα
    return false;
  }, []);

  // 🚀 ENTERPRISE AUTO-DISCOVERY PIPELINE: Ενεργοποιημένο!
  const pipelineDiscovery = React.useMemo(() => PipelineDiscovery.getInstance(), []);

  // Info Panel functionality
  const handleInfoClick = useCallback((cardId: CardId) => {
    setInfoStates(prev => {
      // Ελέγχω αν το τρέχον panel είναι ήδη ανοιχτό
      const isCurrentPanelOpen = prev[cardId];

      if (isCurrentPanelOpen) {
        // Αν είναι ανοιχτό, απλά το κλείνω
        return {
          ...prev,
          [cardId]: false
        };
      }

      // Κλείνω όλα τα άλλα panels και ανοίγω το τρέχον
      const newState = Object.keys(prev).reduce((acc, key) => {
        acc[key as CardId] = false;
        return acc;
      }, {} as Record<CardId, boolean>);

      return {
        ...newState,
        [cardId]: true
      };
    });
  }, []);

  // Helper function για να βρούμε την κατηγορία από το cardId
  const getCategoryFromCardId = useCallback((cardId: CardId): Category | null => {
    const propertyCards: CardId[] = ['property', 'offer', 'sale', 'rent', 'now', 'future', 'upload', 'layout', 'apartment', 'office', 'factory', 'land', 'building', 'store', 'property-details', 'manual-input', 'map-drawing', 'floor-plan-upload', 'auto-calculate'];
    const jobCards: CardId[] = ['job', 'search'];

    if (propertyCards.includes(cardId)) return 'property';
    if (jobCards.includes(cardId)) return 'job';

    // Fallback - αν έχουμε selectedCategory χρησιμοποιούμε αυτό
    return selectedCategory;
  }, [selectedCategory]);

  // Info content provider
  const getInfoContent = useCallback(async (cardId: CardId): Promise<{ title: string; content: string }> => {
    // Για τώρα επιστρέφω mock content - μπορεί να γίνει πιο σύνθετο αργότερα
    const infoContentMap: Partial<Record<CardId, { title: string; content: string }>> = {
      property: {
        title: 'Ακίνητα',
        content: 'Εδώ μπορείτε να δημιουργήσετε καταχωρήσεις για ακίνητα όπως σπίτια, διαμερίσματα, γραφεία και άλλα.'
      },
      job: {
        title: 'Εργασία',
        content: 'Εδώ μπορείτε να δημιουργήσετε καταχωρήσεις για θέσεις εργασίας και επαγγελματικές ευκαιρίες.'
      },
      offer: {
        title: 'Προσφορά',
        content: 'Επιλέξτε αυτή την επιλογή αν θέλετε να προσφέρετε κάτι (πώληση ή ενοικίαση).'
      },
      search: {
        title: 'Αναζήτηση',
        content: 'Επιλέξτε αυτή την επιλογή αν ψάχνετε για κάτι (αγορά ή ενοικίαση).'
      },
      upload: {
        title: 'Ανέβασμα Αρχείων',
        content: 'Ανεβάστε κάτοψη, φωτογραφίες ή άλλα αρχεία που σχετίζονται με την καταχώρησή σας.'
      }
      // Προσθήκη περισσότερων κατά ανάγκη...
    };

    return infoContentMap[cardId] || {
      title: 'Πληροφορίες',
      content: 'Περισσότερες πληροφορίες θα προστεθούν σύντομα.'
    };
  }, []);

  // Handle card click με το αρχικό σύστημα που περιλαμβάνει step progression
  const handleCardClick = useCallback((cardConfig: CardConfig) => {
    if (cardConfig.step === 'category') {
      // Category selection logic
      const category = cardConfig.id as Category;
      setSelectedCategory(category);
      setShowNextSteps(true);

      // 🚀 ENTERPRISE: Ενεργοποιημένο - pipeline integration
      pipelineDiscovery.markStepCompleted('category');

      // Προχωράει μόνο αν υπάρχουν κάρτες για το επόμενο βήμα
      if (hasCardsForNextStep('category', category, null)) {
        pipelineDiscovery.goToNextStep();
      }

      // Legacy onNext callback για backward compatibility
      if (onNext) {
        setTimeout(() => {
          onNext(category as CategoryType);
        }, 100);
      }

      // Also call step complete για new architecture
      if (onStepComplete) {
        onStepComplete({
          stepId: 'category',
          data: { selectedCategory: category },
          isComplete: true
        });
      }
    } else if (cardConfig.step === 'intent') {
      // Intent selection logic
      setSelectedIntent(cardConfig.id as 'offer' | 'search');

      // 🚀 ENTERPRISE: Ενεργοποιημένο - pipeline integration
      pipelineDiscovery.markStepCompleted('intent');

      // Αν επιλέχθηκε "offer" για property, δείξε transaction step
      if (cardConfig.id === 'offer' && selectedCategory === 'property') {
        setShowTransactionStep(true);
        setShowNextSteps(false);
      }

      // 🚀 ENTERPRISE: Προχωράει μόνο αν υπάρχουν κάρτες για το επόμενο βήμα
      if (hasCardsForNextStep('intent', selectedCategory, cardConfig.id as 'offer' | 'search')) {
        pipelineDiscovery.goToNextStep();
      } else {
        console.log('Intent completed. Next steps not yet implemented.');
      }
    } else if (cardConfig.step === 'transaction') {
      // Transaction selection logic
      setSelectedTransaction(cardConfig.id as 'sale' | 'rent');
      console.log('Transaction selected:', cardConfig.id);

      // 🚀 ENTERPRISE: Ενεργοποιημένο - pipeline integration
      pipelineDiscovery.markStepCompleted('transactionType');

      // Εμφάνιση availability step
      setShowAvailabilityStep(true);
      setShowTransactionStep(false);

      // 🚀 ENTERPRISE: Προχωράει μόνο αν υπάρχουν κάρτες για το επόμενο βήμα
      if (hasCardsForNextStep('transaction', selectedCategory, selectedIntent)) {
        pipelineDiscovery.goToNextStep();
      } else {
        console.log('Transaction completed. Moving to availability step.');
      }
    } else if (cardConfig.step === 'availability') {
      // Availability selection logic
      setSelectedAvailability(cardConfig.id as 'now' | 'future');
      console.log('Availability selected:', cardConfig.id);

      // 🚀 ENTERPRISE: Ενεργοποιημένο - pipeline integration
      pipelineDiscovery.markStepCompleted('availability');

      // Αν επιλέχθηκε "now" και είμαστε σε offer, δείξε upload step
      if (cardConfig.id === 'now' && selectedIntent === 'offer') {
        setShowUploadStep(true);
        setShowAvailabilityStep(false);
      }

      // 🚀 ENTERPRISE: Προχωράει μόνο αν υπάρχουν κάρτες για το επόμενο βήμα
      if (hasCardsForNextStep('availability', selectedCategory, selectedIntent)) {
        pipelineDiscovery.goToNextStep();
      } else {
        console.log('Availability completed. Next steps depend on selection.');
      }
    } else if (cardConfig.step === 'upload') {
      // Upload selection logic - κάνει trigger το file upload
      console.log('Upload card clicked - triggering file upload...');

      // Δημιουργία file input element
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/jpeg,image/png,image/gif,image/webp,application/pdf,.dxf,.dwg,application/acad,application/x-autocad';
      fileInput.style.display = 'none';

      fileInput.onchange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
          console.log('📁 File selected:', file.name, 'Type:', file.type, 'Size:', (file.size / 1024 / 1024).toFixed(2), 'MB');

          // 🚀 ENTERPRISE: Ενεργοποιημένο - pipeline integration
          pipelineDiscovery.markStepCompleted('upload');

          // TODO: Send file to map (integrate with GeoMap)
          console.log('🗺️ Sending file to map...');

          // Προχωράει στο επόμενο βήμα μετά από λίγο
          setTimeout(() => {
            if (hasCardsForNextStep('upload', selectedCategory, selectedIntent)) {
              // Μετάβαση στο layout step
              setShowLayoutStep(true);
              setShowUploadStep(false);
              pipelineDiscovery.goToNextStep();
            } else {
              console.log('Upload completed. No more steps implemented.');
            }
          }, 500);
        }
      };

      // Προσθήκη και click
      document.body.appendChild(fileInput);
      fileInput.click();
      document.body.removeChild(fileInput);
    } else if (cardConfig.step === 'layout') {
      // Layout selection logic - δεν κάνει κάτι ιδιαίτερο, απλά ενεργοποιεί το layout step
      console.log('Layout card clicked - showing layout controls...');

      // 🚀 ENTERPRISE: Ενεργοποιημένο - pipeline integration
      pipelineDiscovery.markStepCompleted('layout');

      // Μετάβαση στο Property Type step
      setTimeout(() => {
        if (hasCardsForNextStep('layout', selectedCategory, selectedIntent)) {
          setShowPropertyTypeStep(true);
          setShowLayoutStep(false);
          pipelineDiscovery.goToNextStep();
        } else {
          console.log('Layout completed. Property Type step not ready yet.');
        }
      }, 1000); // Δίνω χρόνο στον χρήστη να δει ότι το layout ολοκληρώθηκε

      console.log('Layout step activated. Controls visible.');
    } else if (cardConfig.step === 'property-type') {
      // Property Type selection logic
      setSelectedPropertyType(cardConfig.id as 'apartment' | 'office' | 'factory' | 'land' | 'building' | 'store');
      console.log('Property Type selected:', cardConfig.id);

      // 🚀 ENTERPRISE: Ενεργοποιημένο - pipeline integration
      pipelineDiscovery.markStepCompleted('propertyType');

      // Show Property Details step after Property Type selection
      setTimeout(() => {
        setShowPropertyDetailsStep(true);
        setShowPropertyTypeStep(false); // Hide property type step
        console.log('Property Details step activated');
      }, 1000);
    } else if (cardConfig.step === 'property-details') {
      // Property Details card clicked - this opens the form
      console.log('Property Details card clicked - form should be visible');

      // 🚀 ENTERPRISE: Ενεργοποιημένο - pipeline integration
      pipelineDiscovery.markStepCompleted('propertyDetails');

      // Navigate to Area Method Selection step
      setTimeout(() => {
        setShowPropertyDetailsStep(false);
        setShowAreaMethodStep(true);
        console.log('Area Method Selection step activated');
      }, 500);
    } else if (cardConfig.step === 'area-method') {
      // Area Method selection logic
      setSelectedAreaMethod(cardConfig.id as 'manual-input' | 'map-drawing' | 'floor-plan-upload' | 'auto-calculate');
      console.log('Area Method selected:', cardConfig.id);

      // 🚀 ENTERPRISE: Ενεργοποιημένο - pipeline integration
      pipelineDiscovery.markStepCompleted('areaMethod');

      // Show completion message and next steps based on selection
      setTimeout(() => {
        setShowAreaMethodStep(false);
        console.log(`Area Method "${cardConfig.id}" completed. Showing success confirmation.`);

        // For MVP, show a completion modal/message
        alert(`✅ Επιλέχθηκε: ${cardConfig.title}\n\nΤο Enterprise Auto-Discovery Pipeline ολοκληρώθηκε επιτυχώς!\n\nΕπόμενα βήματα:\n- Υπολογισμός εμβαδού\n- Αποθήκευση στη βάση δεδομένων\n- Έκδοση αναφοράς`);
      }, 1000);
    }
  }, [onNext, onStepComplete, hasCardsForNextStep, pipelineDiscovery, selectedCategory, selectedIntent]);

  // Early return αν δεν είναι visible
  if (!isVisible) {
    return null;
  }

  // 🚀 ENTERPRISE: Dynamic card determination based on current step state
  const getCurrentCards = (): readonly CardConfig[] => {
    if (showAreaMethodStep) {
      return getCardsForStep('area-method');
    }

    if (showPropertyDetailsStep) {
      return getCardsForStep('property-details');
    }

    if (showPropertyTypeStep) {
      return getCardsForStep('property-type');
    }

    if (showLayoutStep) {
      return getCardsForStep('layout');
    }

    if (showUploadStep) {
      return getCardsForStep('upload');
    }

    if (showAvailabilityStep) {
      return getCardsForStep('availability');
    }

    if (showTransactionStep) {
      return getCardsForStep('transaction');
    }

    if (!showNextSteps) {
      return getCardsForStep('category');
    }

    if (selectedCategory === 'property') {
      return getCardsForStep('property');
    }

    if (selectedCategory === 'job') {
      return getCardsForStep('job');
    }

    return getCardsForStep('category');
  };

  const currentCards = getCurrentCards();

  // Container styles - fixed positioning όπως στο αρχικό
  const containerStyles: React.CSSProperties = {
    position: 'fixed',
    top: `${UI_CONFIG.categoryStep.position.top}px`,
    left: `${UI_CONFIG.categoryStep.position.left}px`,
    right: `${UI_CONFIG.categoryStep.position.right}px`,
    display: (isVisible && !showNextSteps && !showTransactionStep && !showAvailabilityStep && !showUploadStep && !showLayoutStep && !showPropertyTypeStep && !showPropertyDetailsStep && !showAreaMethodStep) ? 'flex' : 'none',
    flexDirection: 'row',
    gap: `${UI_CONFIG.categoryStep.gap}px`,
    padding: '0',
    zIndex: UI_CONFIG.categoryStep.zIndex,
    overflowX: 'hidden',
    WebkitOverflowScrolling: 'touch'
  };

  // Next step container styles
  const nextStepContainerStyles: React.CSSProperties = {
    position: 'fixed',
    top: `${UI_CONFIG.categoryStepContainers.position.top}px`,
    left: '8px',
    right: '8px',
    display: (showNextSteps && !showTransactionStep && !showAvailabilityStep && !showUploadStep) ? 'flex' : 'none',
    flexDirection: 'row',
    gap: '8px',
    padding: '0',
    zIndex: 9998,
    overflowX: 'hidden',
    WebkitOverflowScrolling: 'touch'
  };

  // Transaction step container styles
  const transactionStepContainerStyles: React.CSSProperties = {
    position: 'fixed',
    top: `${UI_CONFIG.categoryStepContainers.position.top}px`,
    left: '8px',
    right: '8px',
    display: (showTransactionStep && !showAvailabilityStep && !showUploadStep) ? 'flex' : 'none',
    flexDirection: 'row',
    gap: '8px',
    padding: '0',
    zIndex: 9998,
    overflowX: 'hidden',
    WebkitOverflowScrolling: 'touch'
  };

  // Availability step container styles
  const availabilityStepContainerStyles: React.CSSProperties = {
    position: 'fixed',
    top: `${UI_CONFIG.categoryStepContainers.position.top}px`,
    left: '8px',
    right: '8px',
    display: (showAvailabilityStep && !showUploadStep) ? 'flex' : 'none',
    flexDirection: 'row',
    gap: '8px',
    padding: '0',
    zIndex: 9998,
    overflowX: 'hidden',
    WebkitOverflowScrolling: 'touch'
  };

  // Upload step container styles
  const uploadStepContainerStyles: React.CSSProperties = {
    position: 'fixed',
    top: `${UI_CONFIG.categoryStepContainers.position.top}px`,
    left: '8px',
    right: '8px',
    display: (showUploadStep && !showLayoutStep && !showPropertyTypeStep && !showPropertyDetailsStep && !showAreaMethodStep) ? 'flex' : 'none',
    flexDirection: 'row',
    gap: '8px',
    padding: '0',
    zIndex: 9998,
    overflowX: 'hidden',
    WebkitOverflowScrolling: 'touch'
  };

  // Layout step container styles - Εργαλεία τοποθέτησης και κλίμακας
  const layoutStepContainerStyles: React.CSSProperties = {
    position: 'fixed',
    top: `${UI_CONFIG.categoryStepContainers.position.top}px`,
    left: '8px',
    right: '8px',
    display: (showLayoutStep && !showPropertyTypeStep) ? 'flex' : 'none',
    flexDirection: 'column',
    gap: '8px',
    padding: '0',
    zIndex: 9998,
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 200px)',
    WebkitOverflowScrolling: 'touch'
  };

  // Property Type step container styles - Επιλογή τύπου ακινήτου
  const propertyTypeStepContainerStyles: React.CSSProperties = {
    position: 'fixed',
    top: `${UI_CONFIG.categoryStepContainers.position.top}px`,
    left: '8px',
    right: '8px',
    display: showPropertyTypeStep ? 'flex' : 'none',
    flexDirection: 'row',
    gap: '8px',
    padding: '0',
    zIndex: 9998,
    overflowX: 'hidden',
    WebkitOverflowScrolling: 'touch',
    flexWrap: 'wrap'
  };

  // Property Details step container styles
  const propertyDetailsStepContainerStyles: React.CSSProperties = {
    position: 'fixed',
    top: `${UI_CONFIG.categoryStepContainers.position.top}px`,
    left: '8px',
    right: '8px',
    display: (showPropertyDetailsStep && !showAreaMethodStep) ? 'flex' : 'none',
    flexDirection: 'row',
    gap: '8px',
    padding: '0',
    zIndex: 9998,
    overflowX: 'hidden',
    WebkitOverflowScrolling: 'touch'
  };

  // Area Method step container styles
  const areaMethodStepContainerStyles: React.CSSProperties = {
    position: 'fixed',
    top: `${UI_CONFIG.categoryStepContainers.position.top}px`,
    left: '8px',
    right: '8px',
    display: showAreaMethodStep ? 'flex' : 'none',
    flexDirection: 'row',
    gap: '8px',
    padding: '0',
    zIndex: 9998,
    overflowX: 'hidden',
    WebkitOverflowScrolling: 'touch'
  };

  // Render cards με BaseCard components
  const renderCards = (cards: readonly CardConfig[]) => {
    return cards.map((cardConfig) => {
      const IconComponent = cardConfig.icon;

      return (
        <BaseCard
          key={cardConfig.id}
          variant={cardConfig.variant}
          title={cardConfig.title}
          icon={<IconComponent size="sm" theme="neutral" />}
          onClick={() => handleCardClick(cardConfig)}
          onInfoClick={() => handleInfoClick(cardConfig.id)}
          data-testid={`card-${cardConfig.id}`}
        />
      );
    });
  };

  // Render upload card as large (double width) BaseCard - ΣΑΝ ΤΟ ΑΡΧΙΚΟ
  const renderUploadCard = (cards: readonly CardConfig[]) => {
    return cards.map((cardConfig) => {
      const IconComponent = cardConfig.icon;

      return (
        <div
          key={cardConfig.id}
          style={{
            width: '100%', // Καταλαμβάνει όλο το εύρος (σαν δύο κάρτες)
            minHeight: '80px' // Μεγαλύτερο ύψος από τις κανονικές κάρτες
          }}
        >
          <BaseCard
            variant={cardConfig.variant}
            title={cardConfig.title}
            icon={<IconComponent size="lg" theme="primary" />}
            onClick={() => handleCardClick(cardConfig)}
            onInfoClick={() => handleInfoClick(cardConfig.id)}
            data-testid={`card-${cardConfig.id}`}
          />
        </div>
      );
    });
  };

  return (
    <>
      {/* Initial Cards */}
      <div style={containerStyles}>
        {renderCards(currentCards)}
      </div>

      {/* Next Step Cards */}
      {showNextSteps && selectedCategory && !showTransactionStep && !showAvailabilityStep && (
        <div style={nextStepContainerStyles}>
          {renderCards(currentCards)}
        </div>
      )}

      {/* Transaction Step Cards */}
      {showTransactionStep && selectedCategory === 'property' && selectedIntent === 'offer' && !showAvailabilityStep && (
        <div style={transactionStepContainerStyles}>
          {renderCards(currentCards)}
        </div>
      )}

      {/* Availability Step Cards */}
      {showAvailabilityStep && selectedCategory === 'property' && selectedIntent === 'offer' && selectedTransaction && (
        <div style={availabilityStepContainerStyles}>
          {renderCards(currentCards)}
        </div>
      )}

      {/* Upload Step Cards - Large card covering full width */}
      {showUploadStep && selectedCategory === 'property' && selectedIntent === 'offer' && selectedAvailability === 'now' && (
        <div style={uploadStepContainerStyles}>
          {renderUploadCard(currentCards)}
        </div>
      )}

      {/* Layout Step - ΠΑΝΟΜΟΙΟΤΥΠΟ με το αρχικό LayoutStepCard */}
      {showLayoutStep && selectedCategory === 'property' && selectedIntent === 'offer' && selectedAvailability === 'now' && (
        <div style={{
          position: 'fixed',
          top: '161px',
          left: '8px',
          right: '8px',
          zIndex: 10002,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          padding: '0'
        }}>
          <LayoutStepCard
            onLocationFound={(lat, lon) => {
              console.log('🗺️ Layout: Location found:', { lat, lon });
            }}
            onLocationSearch={(query) => {
              console.log('🔍 Layout: Location search:', query);
            }}
            onRotationChange={(rotation) => {
              console.log('🔄 Layout: Rotation changed:', rotation);
            }}
            onScaleChange={(scale) => {
              console.log('📏 Layout: Scale changed:', scale);
            }}
            onComplete={() => {
              console.log('🏁 Layout: Step completed - moving to Property Type');

              // Mark layout step as completed
              const pipelineDiscovery = PipelineDiscovery.getInstance();
              pipelineDiscovery.markStepCompleted('layout');

              // Move to Property Type step
              setTimeout(() => {
                setShowLayoutStep(false);
                setShowPropertyTypeStep(true);
                pipelineDiscovery.goToNextStep();
              }, 500);
            }}
          />
        </div>
      )}

      {/* Property Type Step - renderCards(currentCards) με flexWrap */}
      {showPropertyTypeStep && selectedCategory === 'property' && selectedIntent === 'offer' && selectedAvailability === 'now' && (
        <div style={{
          position: 'fixed',
          top: '161px',
          left: '8px',
          right: '8px',
          zIndex: 10002,
          display: 'flex',
          flexDirection: 'row',
          gap: '8px',
          padding: '0',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
          flexWrap: 'wrap'
        }}>
          {renderCards(getCardsForStep('property-type'))}
        </div>
      )}

      {/* Property Details Step - PropertyDetailsForm με propertyType, onSubmit και onCancel */}
      {showPropertyDetailsStep && selectedPropertyType && selectedCategory === 'property' && selectedIntent === 'offer' && selectedAvailability === 'now' && (
        <div style={{
          position: 'fixed',
          top: '161px',
          left: '8px',
          right: '8px',
          zIndex: 10002,
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          maxHeight: 'calc(100vh - 180px)',
          overflowY: 'auto'
        }}>
          {/* PropertyDetailsForm με propertyType, onSubmit και onCancel */}
          <div style={{ padding: '16px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>Στοιχεία Ακινήτου</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              console.log('📋 Property Details: Form submitted');
              // Simulate property details completion
              setPropertyDetailsData({ price: 250000, rooms: 3, squareMeters: 120 });
              const pipelineDiscovery = PipelineDiscovery.getInstance();
              pipelineDiscovery.markStepCompleted('property-details');
              setTimeout(() => {
                setShowPropertyDetailsStep(false);
                setShowAreaMethodStep(true);
                pipelineDiscovery.goToNextStep();
              }, 500);
            }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
                  Τιμή (€)
                </label>
                <input
                  type="number"
                  placeholder="π.χ. 250000"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
                  Δωμάτια
                </label>
                <input
                  type="number"
                  placeholder="π.χ. 3"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
                  Τετραγωνικά Μέτρα
                </label>
                <input
                  type="number"
                  placeholder="π.χ. 120"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '10px',
                    backgroundColor: '#22C55E',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Αποθήκευση
                </button>
                <button
                  type="button"
                  onClick={() => {
                    console.log('❌ Property Details: Form cancelled');
                    setShowPropertyDetailsStep(false);
                    setShowPropertyTypeStep(true);
                  }}
                  style={{
                    flex: 1,
                    padding: '10px',
                    backgroundColor: '#6B7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Ακύρωση
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Area Method Selection Step - Choose how to input area */}
      {showAreaMethodStep && selectedPropertyType && selectedCategory === 'property' && selectedIntent === 'offer' && selectedAvailability === 'now' && (
        <div style={{
          position: 'fixed',
          top: '161px',
          left: '8px',
          right: '8px',
          zIndex: 10002,
          display: 'flex',
          flexDirection: 'row',
          gap: '8px',
          padding: '0',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
          flexWrap: 'wrap'
        }}>
          {renderCards(getCardsForStep('area-method'))}
        </div>
      )}

      {/* Info Panel - Expandable content for cards */}
      {Object.entries(infoStates).map(([cardId, isOpen]) => {
        if (!isOpen) return null;

        // Βρίσκουμε την κατηγορία για το συγκεκριμένο cardId
        const cardCategory = getCategoryFromCardId(cardId as CardId);

        return (
          <InfoPanel
            key={cardId}
            cardId={cardId as CardId}
            onClose={() => handleInfoClick(cardId as CardId)}
            getInfoContent={getInfoContent}
            selectedCategory={cardCategory}
          />
        );
      })}
    </>
  );
};