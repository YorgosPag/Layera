/**
 * CategoryStep.tsx - Enterprise Card System με LEGO Info Panels
 *
 * Refactored με BaseCard component και LEGO Info Panels system.
 * Ακολουθεί Design System patterns από μεγάλες εταιρείες.
 */

import React, { useState } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { UI_CONFIG } from '../../../../../constants';
import {
  GEOALERT_INFO_CONTENT,
  StaticContentProvider
} from '@layera/info-panels';
import { PipelineDiscovery } from '@layera/pipelines';
import { BaseCard } from './BaseCard';
import { cardData, getCardsForStep, type CardConfig, type CardId } from './cardData';
import { InfoPanel } from './InfoPanel';
import { LayoutStepCard } from './LayoutStepCard';
import { PropertyDetailsForm, type PropertyDetailsData } from './PropertyDetailsForm';

export type Category = 'property' | 'job';

export interface CategoryStepProps {
  onNext: (category: Category) => void;
  isVisible?: boolean;
  currentStepId?: string;
}

/**
 * Enterprise CategoryStep με data-driven approach
 */
export const CategoryStep: React.FC<CategoryStepProps> = ({
  onNext,
  isVisible = true,
  currentStepId = 'category'
}) => {
  // Translation hook - Available but not needed in current implementation
  // const { t } = useLayeraTranslation();

  // Enterprise state management
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedIntent, setSelectedIntent] = useState<'offer' | 'search' | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<'sale' | 'rent' | null>(null);
  const [selectedAvailability, setSelectedAvailability] = useState<'now' | 'future' | null>(null);
  const [selectedPropertyType, setSelectedPropertyType] = useState<'apartment' | 'office' | 'factory' | 'land' | 'building' | 'store' | null>(null);
  const [showNextSteps, setShowNextSteps] = useState(false);
  const [showTransactionStep, setShowTransactionStep] = useState(false);
  const [showAvailabilityStep, setShowAvailabilityStep] = useState(false);
  const [showUploadStep, setShowUploadStep] = useState(false);
  const [showLayoutStep, setShowLayoutStep] = useState(false);
  const [showPropertyTypeStep, setShowPropertyTypeStep] = useState(false);
  const [showPropertyDetailsStep, setShowPropertyDetailsStep] = useState(false);
  const [showAreaMethodStep, setShowAreaMethodStep] = useState(false);
  const [propertyDetailsData, setPropertyDetailsData] = useState<PropertyDetailsData | null>(null);
  const [selectedAreaMethod, setSelectedAreaMethod] = useState<'manual-input' | 'map-drawing' | 'floor-plan-upload' | 'auto-calculate' | null>(null);
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

  // LEGO Info Panels setup
  const infoContentProvider = React.useMemo(() =>
    new StaticContentProvider(GEOALERT_INFO_CONTENT),
    []
  );

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
      // Μετά το property-type, δεν έχουμε ακόμα άλλα steps (θα προστεθούν στις επόμενες φάσεις)
      return false;
    }

    // Για όλα τα άλλα steps, δεν έχουμε κάρτες ακόμα
    return false;
  }, []);

  // 🚀 ENTERPRISE AUTO-DISCOVERY PIPELINE: Ενεργοποιημένο!
  const pipelineDiscovery = React.useMemo(() => PipelineDiscovery.getInstance(), []);

  // 🚀 ENTERPRISE AUTO-SYNC: Ενεργοποιημένο!
  React.useEffect(() => {
    pipelineDiscovery.syncWithCategoryStep({
      selectedCategory,
      selectedIntent,
      showTransactionStep,
      currentStep: currentStepId
    });
  }, [pipelineDiscovery, selectedCategory, selectedIntent, showTransactionStep, showAvailabilityStep, currentStepId]);

  // Reset state όταν επιστρέφουμε στο "category" step
  React.useEffect(() => {
    if (currentStepId === 'category') {
      setShowNextSteps(false);
      setShowTransactionStep(false);
      setShowAvailabilityStep(false);
      setShowUploadStep(false);
      setShowLayoutStep(false);
      setShowPropertyTypeStep(false);
      setSelectedCategory(null);
      setSelectedIntent(null);
      setSelectedTransaction(null);
      setSelectedAvailability(null);
      setSelectedPropertyType(null);

      // Κλείνω όλα τα info panels όταν αλλάζει το step
      setInfoStates({
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
    }
  }, [currentStepId]);

  // Container styles - Unified για όλες τις κάρτες
  const containerStyles: React.CSSProperties = {
    position: 'fixed',
    top: `${UI_CONFIG.categoryStep.position.top}px`,
    left: `${UI_CONFIG.categoryStep.position.left}px`,
    right: `${UI_CONFIG.categoryStep.position.right}px`,
    display: (isVisible && !showNextSteps && !showTransactionStep && !showAvailabilityStep && !showUploadStep && !showLayoutStep && !showPropertyTypeStep) ? 'flex' : 'none',
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
    top: '93px',
    left: '8px',
    right: '8px',
    display: (showNextSteps && !showTransactionStep && !showAvailabilityStep && !showUploadStep && !showLayoutStep && !showPropertyTypeStep) ? 'flex' : 'none',
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
    top: '93px',
    left: '8px',
    right: '8px',
    display: (showTransactionStep && !showAvailabilityStep && !showUploadStep && !showLayoutStep && !showPropertyTypeStep) ? 'flex' : 'none',
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
    top: '93px',
    left: '8px',
    right: '8px',
    display: (showAvailabilityStep && !showUploadStep && !showLayoutStep && !showPropertyTypeStep) ? 'flex' : 'none',
    flexDirection: 'row',
    gap: '8px',
    padding: '0',
    zIndex: 9998,
    overflowX: 'hidden',
    WebkitOverflowScrolling: 'touch'
  };

  // Upload step container styles - Μεγάλη κάρτα στο μέγεθος δύο καρτών
  const uploadStepContainerStyles: React.CSSProperties = {
    position: 'fixed',
    top: '93px',
    left: '8px',
    right: '8px',
    display: (showUploadStep && !showLayoutStep && !showPropertyTypeStep) ? 'flex' : 'none',
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
    top: '93px',
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
    top: '93px',
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

  // 🚀 ENTERPRISE CARD HANDLER: Συνδεδεμένο με Pipeline Discovery
  const handleCardClick = (cardConfig: CardConfig) => {
    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(30);
    }

    if (cardConfig.step === 'category') {
      // Category selection logic
      setSelectedCategory(cardConfig.id as Category);
      setShowNextSteps(true);

      // 🚀 ENTERPRISE: Ενεργοποιημένο - pipeline integration
      pipelineDiscovery.markStepCompleted('category');

      // Προχωράει μόνο αν υπάρχουν κάρτες για το επόμενο βήμα
      if (hasCardsForNextStep('category', cardConfig.id as Category, null)) {
        pipelineDiscovery.goToNextStep();
      }

      // Call onNext with slight delay for smooth transition
      setTimeout(() => {
        onNext(cardConfig.id as Category);
      }, 100);
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
  };

  const handleInfoClick = (cardId: CardId) => {
    setInfoStates(prev => {
      // Ελέγχω αν το τρέχον panel είναι ήδη ανοιχτό
      const isCurrentPanelOpen = prev[cardId];

      if (isCurrentPanelOpen) {
        // Αν είναι ανοιχτό, απλά το κλείνω
        return {
          ...prev,
          [cardId]: false
        };
      } else {
        // Αν δεν είναι ανοιχτό, κλείνω όλα τα άλλα και ανοίγω μόνο αυτό
        const allClosed: Record<CardId, boolean> = {
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
        };

        return {
          ...allClosed,
          [cardId]: true
        };
      }
    });
  };

  // Property Details Form handlers
  const handlePropertyDetailsSubmit = (data: PropertyDetailsData) => {
    console.log('🏗️ PropertyDetailsForm: Data submitted:', data);
    setPropertyDetailsData(data);

    // Mark step as completed
    const pipelineDiscovery = PipelineDiscovery.getInstance();
    pipelineDiscovery.markStepCompleted('propertyDetails');

    console.log('Property Details step completed. Moving to Area Method Selection...');

    // Navigate to Area Method Selection step
    setTimeout(() => {
      setShowPropertyDetailsStep(false);
      setShowAreaMethodStep(true);
      console.log('Area Method Selection step activated');
    }, 500);
  };

  const handlePropertyDetailsCancel = () => {
    console.log('🏗️ PropertyDetailsForm: Cancelled');
    // Go back to property type selection
    setShowPropertyDetailsStep(false);
    setShowPropertyTypeStep(true);
    setSelectedPropertyType(null);
  };

  // Enterprise LEGO Info Content - Data-driven approach με memoization
  const getInfoContent = React.useCallback(async (cardId: CardId): Promise<{ title: string; content: string }> => {
    try {
      // Determine the correct content key based on card context
      let contentKey = cardId;

      // For offer/search cards, determine category based on selectedCategory
      if (cardId === 'offer' || cardId === 'search') {
        if (selectedCategory === 'property') {
          contentKey = `property-${cardId}` as CardId;
        } else if (selectedCategory === 'job') {
          contentKey = `job-${cardId}` as CardId;
        }
      }

      const content = await infoContentProvider.getContent(contentKey);
      return {
        title: content.title,
        content: content.content
      };
    } catch (error) {
      console.warn(`Info content not found for ${cardId}:`, error);
      return {
        title: 'Πληροφορίες',
        content: 'Περισσότερες πληροφορίες για αυτή την κατηγορία.'
      };
    }
  }, [selectedCategory, infoContentProvider]);

  // Get current cards to display
  const getCurrentCards = (): readonly CardConfig[] => {
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

  // Render current cards with BaseCard components
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

  // Render upload card as large (double width) card
  const renderUploadCard = (cards: readonly CardConfig[]) => {
    return cards.map((cardConfig) => {
      const IconComponent = cardConfig.icon;

      return (
        <BaseCard
          key={cardConfig.id}
          variant={cardConfig.variant}
          title={cardConfig.title}
          icon={<IconComponent size="lg" theme="primary" />}
          onClick={() => handleCardClick(cardConfig)}
          onInfoClick={() => handleInfoClick(cardConfig.id)}
          data-testid={`card-${cardConfig.id}`}
          style={{
            width: '100%', // Καταλαμβάνει όλο το εύρος (σαν δύο κάρτες)
            minHeight: '80px', // Μεγαλύτερο ύψος
            padding: '16px',
            border: '2px dashed #3b82f6',
            backgroundColor: '#f8fafc',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        />
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

      {/* Layout Step - Interactive controls for floor plan positioning */}
      {showLayoutStep && selectedCategory === 'property' && selectedIntent === 'offer' && selectedAvailability === 'now' && (
        <div style={layoutStepContainerStyles}>
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
                console.log('Property Type step activated');
              }, 500);
            }}
          />
        </div>
      )}

      {/* Property Type Step - Property type selection */}
      {showPropertyTypeStep && selectedCategory === 'property' && selectedIntent === 'offer' && selectedAvailability === 'now' && (
        <div style={propertyTypeStepContainerStyles}>
          {renderCards(currentCards)}
        </div>
      )}

      {/* Property Details Step - MVP Form with core fields */}
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
          <PropertyDetailsForm
            propertyType={selectedPropertyType}
            onSubmit={handlePropertyDetailsSubmit}
            onCancel={handlePropertyDetailsCancel}
          />
        </div>
      )}

      {/* Area Method Selection Step - Choose how to input area */}
      {showAreaMethodStep && selectedPropertyType && propertyDetailsData && selectedCategory === 'property' && selectedIntent === 'offer' && selectedAvailability === 'now' && (
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

      {/* Info Panels - Enterprise LEGO System */}
      {Object.entries(infoStates).map(([cardId, isVisible]) => {
        if (!isVisible) return null;

        return (
          <InfoPanel
            key={`info-${cardId}`}
            cardId={cardId as CardId}
            onClose={() => handleInfoClick(cardId as CardId)}
            getInfoContent={getInfoContent}
            selectedCategory={selectedCategory}
          />
        );
      })}
    </>
  );
};