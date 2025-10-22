/**
 * FloatingStepper.tsx - ΑΠΟΚΛΕΙΣΤΙΚΑ για iPhone 14 Pro Max
 * Ειδικό floating stepper component που εμφανίζεται ΜΟΝΟ στο iPhone 14 Pro Max
 *
 * Χαρακτηριστικά:
 * - Minimal 40px ύψος floating bar
 * - 95% χάρτης visibility preserved
 * - Enterprise UX patterns (Apple/Google-style)
 * - Touch-optimized για 430x932 screen
 * - Σύνδεση με υπάρχουσα UnifiedPipeline state machine
 */

import React, { useEffect } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { UI_CONFIG, COLORS, ANIMATION_CONFIG, STEP_CONFIG } from '../../../../../constants';

export interface FloatingStepperProps {
  // Props που θα συνδεθούν με την υπάρχουσα UnifiedPipeline
  currentStep?: string;
  totalSteps?: number;
  stepIndex?: number;
  selectedCategory?: 'property' | 'job' | null; // Νέο prop για την επιλεγμένη κατηγορία
  onNext?: () => void;
  onPrevious?: () => void;
  onReset?: () => void; // Νέο prop για reset functionality
  onStepClick?: (stepIndex: number) => void;
  stepTitle?: string;
  canGoNext?: boolean;
  canGoPrevious?: boolean;
}

/**
 * Floating Stepper που εμφανίζεται ΜΟΝΟ στο iPhone 14 Pro Max
 * Μinimi design που καταναλώνει ελάχιστο χώρο οθόνης
 */
export const FloatingStepper: React.FC<FloatingStepperProps> = ({
  currentStep = STEP_CONFIG.stepIds.category,
  totalSteps = STEP_CONFIG.totalSteps.property,
  stepIndex = 0,
  selectedCategory = null,
  onNext,
  onPrevious,
  onReset,
  onStepClick,
  canGoNext = true,
  canGoPrevious = false
}) => {
  const { t } = useLayeraTranslation();
  // Πλήρως stateless component - δεν χρειάζονται state variables

  // Step definitions από την enterprise pipeline configuration
  const getSteps = () => {
    // Αν δεν έχει επιλεγεί κατηγορία, μόνο το category step
    if (!selectedCategory) {
      return [
        {
          id: 'category',
          title: t('progress.stepper.labels.category', 'Κατηγορία'),
          shortTitle: t('progress.stepper.descriptions.category', 'Τύπος')
        }
      ];
    }

    if (selectedCategory === 'property') {
      return [
        {
          id: 'category',
          title: t('progress.stepper.labels.category', 'Κατηγορία'),
          shortTitle: t('progress.stepper.descriptions.category', 'Τύπος')
        },
        {
          id: 'intent',
          title: t('progress.stepper.labels.intent', 'Σκοπός'),
          shortTitle: t('progress.stepper.descriptions.intent', 'Δράση')
        },
        {
          id: 'transactionType',
          title: t('pipeline.steps.transactionType.title', 'Συναλλαγή'),
          shortTitle: t('pipeline.steps.transactionType.short', 'Τύπος')
        },
        {
          id: 'location',
          title: t('pipeline.steps.location.title', 'Τοποθεσία'),
          shortTitle: t('pipeline.steps.location.short', 'Χάρτης')
        },
        {
          id: 'layout',
          title: t('pipeline.steps.layout.title', 'Κάτοψη'),
          shortTitle: t('pipeline.steps.layout.short', 'Διάταξη')
        },
        {
          id: 'details',
          title: t('pipeline.steps.details.title', 'Στοιχεία'),
          shortTitle: t('pipeline.steps.details.short', 'Περιγραφή')
        },
        {
          id: 'complete',
          title: t('pipeline.steps.complete.title', 'Τέλος'),
          shortTitle: t('pipeline.steps.complete.short', 'Επιβεβαίωση')
        }
      ];
    }

    if (selectedCategory === 'job') {
      return [
        {
          id: 'category',
          title: t('progress.stepper.labels.category', 'Κατηγορία'),
          shortTitle: t('progress.stepper.descriptions.category', 'Τύπος')
        },
        {
          id: 'intent',
          title: t('progress.stepper.labels.intent', 'Σκοπός'),
          shortTitle: t('progress.stepper.descriptions.intent', 'Δράση')
        },
        {
          id: 'employmentType',
          title: t('pipeline.steps.employmentType.title', 'Εργασία'),
          shortTitle: t('pipeline.steps.employmentType.short', 'Τύπος')
        },
        {
          id: 'availability',
          title: t('pipeline.steps.availability.title', 'Διαθεσιμότητα'),
          shortTitle: t('pipeline.steps.availability.short', 'Πότε')
        },
        {
          id: 'availabilityDetails',
          title: t('pipeline.steps.availabilityDetails.title', 'Λεπτομέρειες'),
          shortTitle: t('pipeline.steps.availabilityDetails.short', 'Ημερομηνίες')
        },
        {
          id: 'location',
          title: t('pipeline.steps.location.title', 'Τοποθεσία'),
          shortTitle: t('pipeline.steps.location.job.short', 'Περιοχή')
        },
        {
          id: 'details',
          title: t('pipeline.steps.details.title', 'Στοιχεία'),
          shortTitle: t('pipeline.steps.details.short', 'Περιγραφή')
        },
        {
          id: 'complete',
          title: t('pipeline.steps.complete.title', 'Τέλος'),
          shortTitle: t('pipeline.steps.complete.short', 'Επιβεβαίωση')
        }
      ];
    }

    return [{
      id: 'category',
      title: t('pipeline.steps.category.title', 'Κατηγορία'),
      shortTitle: t('pipeline.steps.category.short', 'Κατηγορία')
    }];
  };

  const steps = getSteps();

  const currentStepData = steps[stepIndex] || steps[0];

  // Function για να επιστρέφει τα σωστά χρώματα ανάλογα με την κατηγορία
  const getStepperColors = () => {
    if (selectedCategory === 'property') {
      return {
        backgroundColor: COLORS.categories.property.primary,
        borderColor: COLORS.categories.property.border
      };
    } else if (selectedCategory === 'job') {
      return {
        backgroundColor: COLORS.categories.job.primary,
        borderColor: COLORS.categories.job.border
      };
    } else {
      return {
        backgroundColor: COLORS.categories.initial.primary,
        borderColor: COLORS.categories.initial.border
      };
    }
  };

  // Component initialization
  useEffect(() => {
    // Component setup logic can go here if needed
  }, [currentStep, stepIndex, totalSteps, selectedCategory, canGoPrevious]);

  const stepperColors = getStepperColors();

  // Function για να επιστρέφει τον τίτλο με prefix κατηγορίας
  const getStepTitle = () => {
    const baseTitle = currentStepData.shortTitle;

    // Αν είμαστε στο category step, δεν χρειάζεται prefix
    if (currentStep === 'category') {
      return baseTitle;
    }

    // Αν έχει επιλεγεί κατηγορία, προσθέτω prefix
    if (selectedCategory === 'property') {
      return `${t('pipeline.categories.property.title', 'Ακίνητα')} : ${baseTitle}`;
    } else if (selectedCategory === 'job') {
      return `${t('pipeline.categories.job.title', 'Εργασία')} : ${baseTitle}`;
    }

    // Fallback χωρίς prefix
    return baseTitle;
  };

  // Floating bar styles - optimized για iPhone 14 Pro Max (430px width)
  const floatingBarStyles: React.CSSProperties = {
    position: 'fixed',
    top: `${UI_CONFIG.floatingStepper.position.top}px`,
    left: `${UI_CONFIG.floatingStepper.position.left}px`,
    right: `${UI_CONFIG.floatingStepper.position.right}px`,
    height: `${UI_CONFIG.floatingStepper.dimensions.height}px`,
    backgroundColor: stepperColors.backgroundColor,
    backdropFilter: 'blur(12px)',
    borderRadius: `${UI_CONFIG.floatingStepper.dimensions.borderRadius}px`,
    border: `1px solid ${stepperColors.borderColor}`,
    boxShadow: `0 2px 12px ${COLORS.common.backdrop}`,
    zIndex: UI_CONFIG.floatingStepper.zIndex,
    display: 'flex',
    alignItems: 'center',
    padding: `0 ${UI_CONFIG.floatingStepper.padding}px`,
    gap: `${UI_CONFIG.floatingStepper.gap}px`,
    transition: ANIMATION_CONFIG.transitions.ease,
    transform: 'translateY(0)',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent'
  };

  // Progress dots styles
  const progressDotsContainer: React.CSSProperties = {
    display: 'flex',
    gap: '4px',
    alignItems: 'center'
  };

  const getProgressDotStyle = (index: number): React.CSSProperties => ({
    width: index <= stepIndex ? '8px' : '6px',
    height: index <= stepIndex ? '8px' : '6px',
    borderRadius: '50%',
    backgroundColor: index <= stepIndex ? COLORS.common.white : 'rgba(255, 255, 255, 0.4)',
    transition: ANIMATION_CONFIG.transitions.easeOut,
    cursor: onStepClick ? 'pointer' : 'default'
  });

  // Step title styles
  const stepTitleStyles: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '600',
    color: COLORS.common.white,
    flex: 1,
    textAlign: 'left',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };

  // Button styles - compact για mobile
  const buttonStyles: React.CSSProperties = {
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: '600',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent'
  };

  const previousButtonStyles: React.CSSProperties = {
    ...buttonStyles,
    backgroundColor: canGoPrevious ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
    color: canGoPrevious ? COLORS.common.white : 'rgba(255, 255, 255, 0.5)',
    opacity: canGoPrevious ? 1 : 0.5,
    pointerEvents: 'auto' // Εξασφαλίζω ότι το button δέχεται clicks
  };

  const resetButtonStyles: React.CSSProperties = {
    ...buttonStyles,
    backgroundColor: onReset ? '#ef4444' : '#d1d5db', // Κόκκινο χρώμα για reset
    color: onReset ? 'white' : '#6b7280',
    opacity: onReset ? 1 : 0.5
  };

  // Handle step dot click
  const handleStepDotClick = (index: number) => {
    if (onStepClick && index <= stepIndex) {
      if ('vibrate' in navigator) {
        navigator.vibrate(30); // Subtle haptic feedback
      }
      onStepClick(index);
    }
  };

  // Handle previous button
  const handlePrevious = () => {
    console.log('🔙 Previous button clicked! canGoPrevious:', canGoPrevious, 'onPrevious:', !!onPrevious);
    console.log('🔙 stepIndex:', stepIndex, 'steps.length:', steps.length);
    console.log('🔙 Current steps:', steps.map(s => s.id));

    // Έλεγχος εναλλακτικός για navigation
    const canActuallyGoPrevious = stepIndex > 0 && stepIndex < steps.length;
    console.log('🔙 canActuallyGoPrevious (internal check):', canActuallyGoPrevious);

    if ((canGoPrevious || canActuallyGoPrevious) && onPrevious) {
      console.log('🔙 Calling onPrevious...');
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
      onPrevious();
    } else {
      console.log('🔙 Previous button disabled or no onPrevious function');
    }
  };


  // Handle reset button - επαναφορά στην αρχική κατάσταση
  const handleReset = () => {
    if (onReset) {
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
      onReset();
    }
  };

  return (
    <>

      {/* Main Floating Stepper Bar */}
      <div style={floatingBarStyles}>
        {/* Progress Dots */}
        <div style={progressDotsContainer}>
          {steps.map((step, index) => (
            <div
              key={step.id}
              style={getProgressDotStyle(index)}
              onClick={() => handleStepDotClick(index)}
              title={step.title}
            />
          ))}
        </div>

        {/* Current Step Title */}
        <div style={stepTitleStyles}>
          {getStepTitle()}
        </div>

        {/* Navigation Buttons */}
        <button
          style={previousButtonStyles}
          onClick={handlePrevious}
          onTouchStart={(e) => {
            console.log('🔙 Touch start on previous button');
            if (canGoPrevious) {
              e.currentTarget.style.transform = 'scale(0.95)';
            }
          }}
          onTouchEnd={(e) => {
            console.log('🔙 Touch end on previous button');
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ←
        </button>

        <button
          style={resetButtonStyles}
          onClick={handleReset}
          disabled={!onReset}
          onTouchStart={(e) => {
            if (onReset) {
              e.currentTarget.style.transform = 'scale(0.95)';
            }
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
          title={t('pipeline.actions.reset.tooltip', 'Επαναφορά - Εμφάνιση πλήκτρου προσθήκης')}
        >
          ×
        </button>
      </div>

      {/* Bottom Sheet για Forms - θα προστεθεί αργότερα αν χρειαστεί */}
      {currentStep === 'details' && (
        <div style={{
          position: 'fixed',
          bottom: '0',
          left: '0',
          right: '0',
          backgroundColor: 'white',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.15)',
          zIndex: 1500,
          padding: '16px',
          maxHeight: '40vh',
          overflow: 'auto'
        }}>
          <div style={{
            width: '40px',
            height: '4px',
            backgroundColor: '#d1d5db',
            borderRadius: '2px',
            margin: '0 auto 16px',
            cursor: 'grab'
          }} />
          <div style={{
            fontSize: '16px',
            fontWeight: '600',
            textAlign: 'center',
            color: '#1f2937'
          }}>
            {t('pipeline.forms.details.title', 'Φόρμα Λεπτομερειών')}
          </div>
          <div style={{
            marginTop: '12px',
            fontSize: '14px',
            color: '#6b7280',
            textAlign: 'center'
          }}>
            {t('pipeline.forms.details.placeholder', 'Θα προστεθεί το form περιεχόμενο εδώ...')}
          </div>
        </div>
      )}
    </>
  );
};