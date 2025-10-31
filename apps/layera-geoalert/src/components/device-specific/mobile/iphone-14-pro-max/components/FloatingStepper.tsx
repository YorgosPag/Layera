/**
 * FloatingStepper.tsx - ΑΠΟΚΛΕΙΣΤΙΚΑ για iPhone 14 Pro Max
 * Ειδικό floating stepper component που εμφανίζεται ΜΟΝΟ στο iPhone 14 Pro Max
 *
 * Χαρακτηριστικά:
 * - Minimal 40px ύψος floating bar
 * - 95% χάρτης visibility preserved
 * - Enterprise UX patterns (Apple/Google-style)
 * - Touch-optimized για 430x932 screen
 * - Σύνδεση με modular StepOrchestrator system
 */

import React, { useEffect } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { BOX_SHADOW_SCALE } from '@layera/box-shadows';
import { Flex, Box } from '@layera/layout';
// ✅ PipelineDiscovery ΔΙΑΓΡΑΦΗΚΕ - χρησιμοποιούμε StepOrchestrator μόνο
import { SPACING_SCALE, BORDER_RADIUS_SCALE, useDesignTokens } from '@layera/constants';
import { Text } from '@layera/typography';
import { getCursorVar } from '@layera/cursors';
import { UI_CONFIG, COLORS, STEP_CONFIG } from '../../../../../constants';

export interface FloatingStepperProps {
  // Props για το modular step system
  currentStep?: string;
  totalSteps?: number;
  stepIndex?: number;
  selectedCategory?: 'property' | 'job' | null; // Νέο prop για την επιλεγμένη κατηγορία
  selectedIntent?: 'offer' | 'search' | null; // Νέο prop για intent tracking
  showTransactionStep?: boolean; // Νέο prop για transaction step visibility
  onNext?: () => void;
  onPrevious?: () => void;
  onReset?: () => void; // Νέο prop για reset functionality
  onStepClick?: (stepIndex: number) => void;
  stepTitle?: string;
  canGoNext?: boolean;
  canGoPrevious?: boolean;
  onCardsOpacityToggle?: (isOpaque: boolean) => void; // Νέο prop για opacity toggle
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
  selectedIntent = null,
  showTransactionStep = false,
  onNext: _onNext,
  onPrevious,
  onReset,
  onStepClick,
  canGoNext: _canGoNext = true,
  canGoPrevious = false,
  onCardsOpacityToggle
}) => {
  // Opacity modes - τρεις καταστάσεις
  type OpacityMode = 'transparent' | 'semi-transparent' | 'opaque';
  const [opacityMode, setOpacityMode] = React.useState<OpacityMode>('transparent');
  const { t } = useLayeraTranslation();

  // ✅ ΔΙΑΓΡΑΦΗΚΕ: PipelineDiscovery - χρησιμοποιούμε StepOrchestrator μόνο
  const pipelineDiscovery = null;

  // 🚀 ENTERPRISE AUTO-DISCOVERY: Χρήση του PipelineDiscovery για αυτόματη ανακάλυψη steps
  React.useEffect(() => {
    if (!pipelineDiscovery || typeof pipelineDiscovery.syncWithCategoryStep !== 'function') {
      return;
    }
    try {
      pipelineDiscovery.syncWithCategoryStep({
        selectedCategory,
        selectedIntent,
        showTransactionStep,
        currentStep
      });
    } catch (error) {
      // Silent error handling
    }
  }, [selectedCategory, selectedIntent, showTransactionStep, currentStep, pipelineDiscovery]);

  // Χρήση του auto-discovered steps από το PipelineDiscovery με null checks
  const discoveredSteps = React.useMemo(() => {
    if (!pipelineDiscovery || typeof pipelineDiscovery.getAvailableStepsForUI !== 'function') {
      return [];
    }
    try {
      return pipelineDiscovery.getAvailableStepsForUI();
    } catch (error) {
      return [];
    }
  }, [pipelineDiscovery]);

  // Mapping των discovered steps σε UI format με @layera/tolgee
  const steps = discoveredSteps.map(step => ({
    id: step.id,
    title: t(`pipeline.steps.${step.id}.title`, step.title),
    shortTitle: t(`pipeline.steps.${step.id}.short`, step.shortTitle)
  }));

  // 🚀 ENTERPRISE AUTO-DISCOVERY: Χρήση του PipelineDiscovery για step index με null check
  const pipelineState = React.useMemo(() => {
    if (!pipelineDiscovery || typeof pipelineDiscovery.getCurrentState !== 'function') {
      return { currentStepIndex: 0, totalSteps: 0 };
    }
    try {
      return pipelineDiscovery.getCurrentState();
    } catch (error) {
      return { currentStepIndex: 0, totalSteps: 0 };
    }
  }, [pipelineDiscovery]);
  const effectiveStepIndex = pipelineState.currentStepIndex;
  const currentStepData = steps[effectiveStepIndex] || steps[0];

  // Function για να επιστρέφει τα σωστά χρώματα ανάλογα με την κατηγορία
  const getStepperColors = (): void => {
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
  const getStepTitle = (): void => {
    const baseTitle = currentStepData?.shortTitle || t('pipeline.step.unknown');

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
    position: 'var(--la-position-fixed, fixed)',
    top: `${UI_CONFIG.floatingStepper.position.top}px`,
    left: `${UI_CONFIG.floatingStepper.position.left}px`,
    right: `${UI_CONFIG.floatingStepper.position.right}px`,
    height: `${UI_CONFIG.floatingStepper.dimensions.height}px`,
    backgroundColor: stepperColors.backgroundColor,
    backdropFilter: `blur(${BORDER_RADIUS_SCALE.MD}px)`,
    borderRadius: `${BORDER_RADIUS_SCALE.MD}px`,
    border: `1px solid ${stepperColors.borderColor}`,
    boxShadow: BOX_SHADOW_SCALE.cardDefault,
    zIndex: UI_CONFIG.floatingStepper.zIndex,
    // Layout handled by Flex wrapper
    padding: `0 ${UI_CONFIG.floatingStepper.padding}px`,
    gap: `${UI_CONFIG.floatingStepper.gap}px`,
    transition: 'var(--la-transition-normal)',
    transform: 'var(--la-transform-translate-y-0, translateY(0))',
    userSelect: 'var(--la-user-select-none, none)',
    WebkitTapHighlightColor: 'var(--la-webkit-tap-highlight-color, transparent)'
  };

  // Progress dots styles
  const progressDotsContainer: React.CSSProperties = {
    // Layout handled by Flex wrapper
    gap: `${SPACING_SCALE.XS}px`
  };

  const getProgressDotStyle = (index: number): React.CSSProperties => {
    // 🚀 ENTERPRISE: Χρήση του PipelineDiscovery για step completion status
    const stepId = steps[index]?.id;
    const isCompleted = stepId && pipelineDiscovery && typeof pipelineDiscovery.isStepCompleted === 'function'
      ? pipelineDiscovery.isStepCompleted(stepId) : false;
    const isActive = index === effectiveStepIndex;
    const isVisited = index <= effectiveStepIndex;

    return {
      width: isActive ? `${SPACING_SCALE.XS}px` : (isCompleted || isVisited ? `${SPACING_SCALE.XS - 1}px` : `${SPACING_SCALE.XS - 2}px`),
      height: isActive ? `${SPACING_SCALE.XS}px` : (isCompleted || isVisited ? `${SPACING_SCALE.XS - 1}px` : `${SPACING_SCALE.XS - 2}px`),
      borderRadius: BORDER_RADIUS_SCALE.CIRCLE,
      backgroundColor: isCompleted
        ? 'var(--color-semantic-success-border)' // Πράσινο για completed
        : isActive
          ? 'var(--la-color-white, white)' // Λευκό για active
          : isVisited
            ? 'var(--color-text-primary-overlay-medium)' // Ημι-διαφανές για visited
            : 'var(--color-text-primary-overlay-light)', // Ακόμα πιο διαφανές για unvisited
      transition: 'var(--la-transition-fast)',
      cursor: isVisited ? getCursorVar('pointer') : getCursorVar('default'), // Conditional cursor από cursor system
      border: isActive ? '1px solid var(--color-border-primary-overlay)' : 'var(--la-border-none, none)'
    };
  };

  // Step title styles
  const stepTitleStyles: React.CSSProperties = {
    // fontSize handled by Text component
    fontWeight: 'var(--la-font-semibold)', // Typography system token για 600
    color: COLORS.common.white,
    flex: 1,
    textAlign: 'left',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };

  // Button styles - compact για mobile
  const buttonStyles: React.CSSProperties = {
    padding: `${SPACING_SCALE.XS + 2}px ${SPACING_SCALE.SM}px`,
    fontWeight: 'var(--la-font-semibold)', // Typography system token για 600
    borderRadius: `${SPACING_SCALE.XS + 2}px`,
    border: 'none',
    cursor: getCursorVar('pointer'), // Cursor system token για interactive elements
    transition: 'var(--la-transition-fast)',
    userSelect: 'var(--la-user-select-none, none)',
    WebkitTapHighlightColor: 'var(--la-webkit-tap-highlight-color, transparent)'
  };

  // 🚀 ENTERPRISE: Χρήση του PipelineDiscovery για button states
  const canActuallyGoPrevious = (pipelineDiscovery && typeof pipelineDiscovery.canGoToPrevious === 'function'
    ? pipelineDiscovery.canGoToPrevious()
    : false) || canGoPrevious;

  const previousButtonStyles: React.CSSProperties = {
    ...buttonStyles,
    backgroundColor: canActuallyGoPrevious ? 'var(--color-bg-surface-overlay)' : 'var(--color-bg-surface)',
    color: canActuallyGoPrevious ? COLORS.common.white : 'var(--color-text-primary-overlay-light)',
    opacity: canActuallyGoPrevious ? 1 : 0.5,
    pointerEvents: 'auto' // Εξασφαλίζω ότι το button δέχεται clicks
  };

  const resetButtonStyles: React.CSSProperties = {
    ...buttonStyles,
    backgroundColor: onReset ? 'var(--color-semantic-error-bg)' : 'var(--color-border-default)', // Κόκκινο χρώμα για reset
    color: onReset ? 'var(--la-color-white, white)' : 'var(--la-text-secondary, var(--color-text-secondary))',
    opacity: onReset ? 1 : 0.5
  };

  // Toggle button styles για opacity control με 3 modes
  const getToggleButtonStyles = (): React.CSSProperties => {
    const baseStyles = {
      ...buttonStyles,
      padding: `${SPACING_SCALE.XS}px ${SPACING_SCALE.XS + 2}px`,
      minWidth: `${SPACING_SCALE.LG}px`
    };

    switch (opacityMode) {
      case 'transparent':
        return {
          ...baseStyles,
          backgroundColor: 'var(--color-bg-surface-overlay)',
          color: 'white'
        };
      case 'semi-transparent':
        return {
          ...baseStyles,
          backgroundColor: 'var(--color-semantic-warning-border)', // Κίτρινο για ημιδιαφανές
          color: 'var(--la-text-primary, var(--color-text-primary))'
        };
      case 'opaque':
        return {
          ...baseStyles,
          backgroundColor: 'var(--color-semantic-error-border)', // Κόκκινο για συμπαγές
          color: 'white'
        };
    }
  };

  // Handle step dot click - Enterprise Auto-Navigation
  const handleStepDotClick = (index: number) => {
    const isVisited = index <= effectiveStepIndex;
    if (isVisited && steps[index]) {
      if ('vibrate' in navigator) {
        navigator.vibrate(30); // Subtle haptic feedback
      }
      // 🚀 ENTERPRISE: Χρήση του PipelineDiscovery για έξυπνη πλοήγηση
      const targetStepId = steps[index].id;
      if (pipelineDiscovery && typeof pipelineDiscovery.navigateToStep === 'function') {
        pipelineDiscovery.navigateToStep(targetStepId);
      }

      // Fallback στο παλιό API αν υπάρχει
      if (onStepClick) {
        onStepClick(index);
      }
    }
  };

  // Handle previous button - Enterprise Auto-Navigation
  const handlePrevious = (): void => {
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }

    // 🚀 ENTERPRISE: Χρήση του PipelineDiscovery για σωστή πλοήγηση ένα βήμα πίσω
    let success = false;
    if (pipelineDiscovery && typeof pipelineDiscovery.goToPreviousStep === 'function') {
      success = pipelineDiscovery.goToPreviousStep();

      // 🚀 ENTERPRISE: Ειδοποίηση του parent component για την αλλαγή βήματος
      if (success && onStepClick && typeof pipelineDiscovery.getCurrentState === 'function') {
        const newState = pipelineDiscovery.getCurrentState();
        onStepClick(newState.currentStepIndex);
      }
    }

    // Fallback στο παλιό API αν το PipelineDiscovery αποτύχει
    if (!success && onPrevious && canGoPrevious) {
      onPrevious();
    }
  };


  // Handle reset button - Enterprise Reset
  const handleReset = (): void => {
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }

    // 🚀 ENTERPRISE: Χρήση του PipelineDiscovery για reset
    if (pipelineDiscovery && typeof pipelineDiscovery.reset === 'function') {
      pipelineDiscovery.reset();
    }

    // Fallback στο παλιό API
    if (onReset) {
      onReset();
    }
  };

  // Handle opacity toggle - Cards transparency control με 3 modes
  const handleOpacityToggle = (): void => {
    if ('vibrate' in navigator) {
      navigator.vibrate(30);
    }

    // Cycle through τις 3 καταστάσεις: transparent -> semi-transparent -> opaque -> transparent
    const nextMode: OpacityMode = opacityMode === 'transparent'
      ? 'semi-transparent'
      : opacityMode === 'semi-transparent'
        ? 'opaque'
        : 'transparent';

    setOpacityMode(nextMode);

    // Στείλε event για αλλαγή opacity σε όλες τις κάρτες
    const opacityEvent = new CustomEvent('toggleCardsOpacity', {
      detail: { opacityMode: nextMode }
    });
    window.dispatchEvent(opacityEvent);

    // Callback στο parent component αν υπάρχει (legacy compatibility)
    if (onCardsOpacityToggle) {
      onCardsOpacityToggle(nextMode !== 'transparent');
    }
  };

  return (
    <>

      {/* Main Floating Stepper Bar */}
      <Flex align="center" style={floatingBarStyles}>
        {/* Progress Dots */}
        <Flex align="center" gap="xs" style={progressDotsContainer}>
          {steps.map((step, index) => (
            <Box
              key={step.id}
              style={getProgressDotStyle(index)}
              onClick={(): void => handleStepDotClick(index)}
              title={step.title}
            />
          ))}
        </Flex>

        {/* Current Step Title */}
        <Box style={stepTitleStyles}>
          {getStepTitle()}
        </Box>

        {/* Navigation Buttons */}
        <button
          style={previousButtonStyles}
          onClick={handlePrevious}
          onTouchStart={(e: React.FormEvent<HTMLFormElement>) => {
            if (canActuallyGoPrevious) {
              e.currentTarget.style.transform = 'scale(0.95)';
            }
          }}
          onTouchEnd={(e: React.FormEvent<HTMLFormElement>) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ←
        </button>

        <button
          style={getToggleButtonStyles()}
          onClick={handleOpacityToggle}
          onTouchStart={(e: React.FormEvent<HTMLFormElement>) => {
            e.currentTarget.style.transform = 'scale(0.95)';
          }}
          onTouchEnd={(e: React.FormEvent<HTMLFormElement>) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
          title={
            opacityMode === 'transparent'
              ? 'Κάνε τις κάρτες ημιδιαφανείς'
              : opacityMode === 'semi-transparent'
                ? 'Κάνε τις κάρτες συμπαγείς'
                : 'Κάνε τις κάρτες διαφανείς (καθρέφτης)'
          }
        >
          {opacityMode === 'transparent' ? '○' : opacityMode === 'semi-transparent' ? '◐' : '●'}
        </button>

        <button
          style={resetButtonStyles}
          onClick={handleReset}
          disabled={!onReset}
          onTouchStart={(e: React.FormEvent<HTMLFormElement>) => {
            if (onReset) {
              e.currentTarget.style.transform = 'scale(0.95)';
            }
          }}
          onTouchEnd={(e: React.FormEvent<HTMLFormElement>) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
          title={t('actions.reset-show-add-button')}
        >
          ×
        </button>
      </Flex>

      {/* Bottom Sheet για Forms - θα προστεθεί αργότερα αν χρειαστεί */}
      {currentStep === 'details' && (
        <Box
          position="fixed"
          bottom="0"
          left="0"
          right="0"
          backgroundColor="var(--color-bg-canvas)"
          borderTopLeftRadius={`${BORDER_RADIUS_SCALE.LG}px`}
          borderTopRightRadius={`${BORDER_RADIUS_SCALE.LG}px`}
          boxShadow={BOX_SHADOW_SCALE.elevation5}
          zIndex={1500}
          padding="md"
          maxHeight="40vh"
          overflow="auto"
        >
          <Box
            width={`${SPACING_SCALE.XXL}px`}
            height={`${SPACING_SCALE.XS}px`}
            backgroundColor="var(--color-border-default)"
            borderRadius={`${BORDER_RADIUS_SCALE.XXS}px`}
            margin={`0 auto ${SPACING_SCALE.MD}px`}
            cursor={getCursorVar('grab')}
          />
          <Text
            size="base"
            weight="bold"
            textAlign="center"
            color="var(--la-text-primary, var(--color-text-primary))"
            display="block"
          >
            Φόρμα Λεπτομερειών
          </Text>
          <Text
            size="sm"
            marginTop={`${SPACING_SCALE.SM + SPACING_SCALE.XS}px`}
            color="var(--la-text-secondary, var(--color-text-secondary))"
            textAlign="center"
            display="block"
          >
            Θα προστεθεί το form περιεχόμενο εδώ...
          </Text>
        </Box>
      )}
    </>
  );
};