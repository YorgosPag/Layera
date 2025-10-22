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

import React, { useState, useEffect } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';

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
  currentStep = 'category',
  totalSteps = 7,
  stepIndex = 0,
  selectedCategory = null,
  onNext,
  onPrevious,
  onReset,
  onStepClick,
  canGoNext = true,
  canGoPrevious = false
}) => {
  const [isVisible] = useState(true);

  // Step definitions από την enterprise pipeline configuration
  const getSteps = () => {
    // Αν δεν έχει επιλεγεί κατηγορία, μόνο το category step
    if (!selectedCategory) {
      return [
        { id: 'category', title: 'Κατηγορία', shortTitle: 'Κατηγορία' }
      ];
    }

    if (selectedCategory === 'property') {
      return [
        { id: 'category', title: 'Κατηγορία', shortTitle: 'Κατηγορία' },
        { id: 'intent', title: 'Σκοπός', shortTitle: 'Σκοπός' },
        { id: 'transactionType', title: 'Συναλλαγή', shortTitle: 'Τύπος' },
        { id: 'location', title: 'Τοποθεσία', shortTitle: 'Χάρτης' },
        { id: 'layout', title: 'Κάτοψη', shortTitle: 'Διάταξη' },
        { id: 'details', title: 'Στοιχεία', shortTitle: 'Περιγραφή' },
        { id: 'complete', title: 'Τέλος', shortTitle: 'Επιβεβαίωση' }
      ];
    }

    if (selectedCategory === 'job') {
      return [
        { id: 'category', title: 'Κατηγορία', shortTitle: 'Κατηγορία' },
        { id: 'intent', title: 'Σκοπός', shortTitle: 'Σκοπός' },
        { id: 'employmentType', title: 'Εργασία', shortTitle: 'Τύπος' },
        { id: 'availability', title: 'Διαθεσιμότητα', shortTitle: 'Πότε' },
        { id: 'availabilityDetails', title: 'Λεπτομέρειες', shortTitle: 'Ημερομηνίες' },
        { id: 'location', title: 'Τοποθεσία', shortTitle: 'Περιοχή' },
        { id: 'details', title: 'Στοιχεία', shortTitle: 'Περιγραφή' },
        { id: 'complete', title: 'Τέλος', shortTitle: 'Επιβεβαίωση' }
      ];
    }

    return [{ id: 'category', title: 'Κατηγορία', shortTitle: 'Κατηγορία' }];
  };

  const steps = getSteps();

  const currentStepData = steps[stepIndex] || steps[0];

  // Function για να επιστρέφει τα σωστά χρώματα ανάλογα με την κατηγορία
  const getStepperColors = () => {
    if (selectedCategory === 'property') {
      // Πράσινο για ακίνητα (όπως στο info panel)
      return {
        backgroundColor: 'rgba(34, 197, 94, 0.95)', // green-500
        borderColor: 'rgba(34, 197, 94, 0.3)'
      };
    } else if (selectedCategory === 'job') {
      // Γαλάζιο για εργασία (όπως στο info panel)
      return {
        backgroundColor: 'rgba(59, 130, 246, 0.95)', // blue-500
        borderColor: 'rgba(59, 130, 246, 0.3)'
      };
    } else {
      // Πορτοκαλί για αρχική κατάσταση (category step)
      return {
        backgroundColor: 'rgba(249, 115, 22, 0.95)', // orange-500
        borderColor: 'rgba(249, 115, 22, 0.3)'
      };
    }
  };

  // Debug info για iPhone 14 Pro Max detection
  useEffect(() => {
    console.log('🎯 FloatingStepper: Component mounted!');
    console.log('🎯 Current step:', currentStep, 'Index:', stepIndex, 'Total:', totalSteps);
    console.log('🎨 Selected category:', selectedCategory, 'Color:', getStepperColors());
    console.log('🔙 canGoPrevious:', canGoPrevious, 'stepIndex > 0:', stepIndex > 0);
    console.log('🎯 Screen dimensions:', {
      width: window.innerWidth,
      height: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio
    });
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
      return `Ακίνητα : ${baseTitle}`;
    } else if (selectedCategory === 'job') {
      return `Εργασία : ${baseTitle}`;
    }

    // Fallback χωρίς prefix
    return baseTitle;
  };

  // Floating bar styles - optimized για iPhone 14 Pro Max (430px width)
  const floatingBarStyles: React.CSSProperties = {
    position: 'fixed',
    top: '45px', // Πιο κοντά στο Dynamic Island (ήταν 65px)
    left: '8px',
    right: '8px',
    height: '40px',
    backgroundColor: stepperColors.backgroundColor, // Dynamic χρώμα ανάλογα με κατηγορία
    backdropFilter: 'blur(12px)',
    borderRadius: '20px',
    border: `1px solid ${stepperColors.borderColor}`, // Dynamic border ανάλογα με κατηγορία
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.12)',
    zIndex: 9999, // Πάνω από όλα
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',
    gap: '12px',
    transition: 'all 0.3s ease',
    transform: isVisible ? 'translateY(0)' : 'translateY(-60px)',
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
    backgroundColor: index <= stepIndex ? '#ffffff' : 'rgba(255, 255, 255, 0.4)', // Λευκό για completed, ημιδιαφανές για pending
    transition: 'all 0.2s ease',
    cursor: onStepClick ? 'pointer' : 'default'
  });

  // Step title styles
  const stepTitleStyles: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#ffffff', // Λευκό κείμενο για καλή αντίθεση με γαλάζιο φόντο
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
    color: canGoPrevious ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
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
          title="Επαναφορά - Εμφάνιση πλήκτρου προσθήκης"
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
            Φόρμα Λεπτομερειών
          </div>
          <div style={{
            marginTop: '12px',
            fontSize: '14px',
            color: '#6b7280',
            textAlign: 'center'
          }}>
            Θα προστεθεί το form περιεχόμενο εδώ...
          </div>
        </div>
      )}
    </>
  );
};