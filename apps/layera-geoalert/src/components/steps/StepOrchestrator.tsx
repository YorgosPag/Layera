/**
 * StepOrchestrator.tsx - Enterprise Step Flow Orchestrator
 *
 * Κεντρικός orchestrator που διαχειρίζεται τη ροή των steps
 * με dynamic reordering και context-aware rendering
 */

import React, { useMemo, useCallback } from 'react';
import { SPACING_SCALE } from '@layera/constants';
import { Box, Flex } from '@layera/layout';
import { stepRegistry } from './StepRegistry';
import {
  StepContext,
  StepDefinition,
  StepId,
  StepFlowConfig,
  CategoryType,
  IntentType,
  TransactionType,
  EmploymentType,
  ESCOOccupation,
  LocationType,
  DetailsType,
  PricingType,
  ReviewType
} from './types';

export interface StepOrchestratorProps {
  /** Current step context */
  currentStepId: StepId;
  selectedCategory: CategoryType;
  selectedIntent: IntentType;
  selectedTransactionType?: TransactionType;
  selectedEmploymentType?: EmploymentType;
  selectedOccupation?: ESCOOccupation;
  selectedLocation?: LocationType;
  selectedDetails?: DetailsType;
  selectedPricing?: PricingType;
  selectedReview?: ReviewType;
  completedSteps?: Set<StepId>;
  featureFlags?: Record<string, boolean>;

  /** Navigation handlers */
  onStepChange?: (stepId: StepId) => void;
  onStepComplete?: (stepId: StepId, data?: unknown) => void;
  onNext?: () => void;
  onPrevious?: () => void;

  /** Flow configuration */
  flowConfig?: StepFlowConfig;

  /** Device-specific props */
  deviceProps?: {
    isIPhone14ProMaxDevice?: boolean;
    isMobile?: boolean;
    isTablet?: boolean;
    isDesktop?: boolean;
  };

  /** Render customization */
  renderStepContainer?: (step: StepDefinition, children: React.ReactNode) => React.ReactNode;
  renderCardsContainer?: (cards: React.ReactNode[]) => React.ReactNode;
}

export const StepOrchestrator: React.FC<StepOrchestratorProps> = ({
  currentStepId,
  selectedCategory,
  selectedIntent,
  selectedTransactionType,
  selectedEmploymentType,
  selectedOccupation,
  selectedLocation,
  selectedDetails,
  selectedPricing,
  selectedReview,
  completedSteps = new Set(),
  featureFlags = {},
  onStepChange,
  onStepComplete,
  onNext,
  onPrevious,
  flowConfig,
  deviceProps = {},
  renderStepContainer,
  renderCardsContainer
}) => {
  // Debug log για occupation step tracking
  React.useEffect(() => {
    if (currentStepId === 'occupation') {
      console.log('🎯 ORCHESTRATOR: currentStepId changed to OCCUPATION');
      console.log('🎯 ORCHESTRATOR: Props at occupation render:', {
        currentStepId,
        selectedCategory,
        selectedEmploymentType,
        selectedOccupation
      });
    }
  }, [currentStepId]);
  // 🎯 ONE-TIME LOG: StepOrchestrator mounted για συγκεκριμένο step
  React.useEffect(() => {
    if (currentStepId === 'intent') {
      console.log('🎯 ORCHESTRATOR: Intent Step mounted με category:', selectedCategory);
    }
  }, [currentStepId]); // Τρέχει μόνο όταν αλλάζει το step, όχι το category

  // 🎮 Apply flow configuration if provided
  React.useEffect(() => {
    if (flowConfig) {
      stepRegistry.setFlow(flowConfig);
    }
  }, [flowConfig]);

  // 🎯 Build step context
  const stepContext: StepContext = useMemo(() => ({
    currentStepId,
    selectedCategory,
    selectedIntent,
    selectedTransactionType: selectedTransactionType || null,
    selectedEmploymentType: selectedEmploymentType || null,
    selectedOccupation: selectedOccupation || { id: '', title: '' },
    selectedLocation: selectedLocation || null,
    selectedDetails: selectedDetails || null,
    selectedPricing: selectedPricing || null,
    selectedReview: selectedReview || null,
    completedSteps,
    featureFlags,
    customData: {}
  }), [currentStepId, selectedCategory, selectedIntent, selectedTransactionType, selectedEmploymentType, selectedOccupation, selectedLocation, selectedDetails, selectedPricing, selectedReview, completedSteps, featureFlags]);

  // 📋 Get available steps για current context
  const availableSteps = useMemo(() => {
    return stepRegistry.getAvailableSteps(stepContext);
  }, [stepContext]);

  // 🎯 Find current step definition
  const currentStep = useMemo(() => {
    const found = availableSteps.find(step => step.id === currentStepId);
    // Αφαίρεσα το επαναλαμβανόμενο log για μείωση θορύβου
    return found;
  }, [availableSteps, currentStepId]);

  // 🎮 Navigation helpers
  const handleNext = useCallback(() => {
    const currentIndex = availableSteps.findIndex(step => step.id === currentStepId);
    const nextStep = availableSteps[currentIndex + 1];

    if (nextStep) {
      onStepChange?.(nextStep.id);
    }

    onNext?.();
  }, [availableSteps, currentStepId, onStepChange, onNext]);

  const handlePrevious = useCallback(() => {
    const currentIndex = availableSteps.findIndex(step => step.id === currentStepId);
    const previousStep = availableSteps[currentIndex - 1];

    if (previousStep) {
      onStepChange?.(previousStep.id);
    }

    onPrevious?.();
  }, [availableSteps, currentStepId, onStepChange, onPrevious]);

  const handleStepComplete = useCallback((stepId: StepId, data?: unknown) => {
    console.log(`🎼 ORCHESTRATOR: Step ${stepId} completed with data:`, data);

    onStepComplete?.(stepId, data);

    // Auto-advance to next step αν δεν είναι το τελευταίο
    const currentIndex = availableSteps.findIndex(step => step.id === stepId);
    const nextStep = availableSteps[currentIndex + 1];

    console.log(`🔍 ORCHESTRATOR DEBUG: currentIndex=${currentIndex}, nextStep=${nextStep?.id}, allSteps=[${availableSteps.map(s => s.id).join(', ')}]`);

    if (nextStep) {
      console.log(`🎼 ORCHESTRATOR: Auto-advancing to ${nextStep.id}`);

      // Special debug για occupation step
      if (nextStep.id === 'occupation') {
        console.log('🔍 ORCHESTRATOR: Next step is OCCUPATION - this should render the component');
      }

      setTimeout(() => {
        console.log(`🎼 ORCHESTRATOR: Executing onStepChange to ${nextStep.id}`);
        console.log(`🎼 ORCHESTRATOR: onStepChange function:`, typeof onStepChange, onStepChange?.toString().substring(0, 100));
        if (onStepChange) {
          console.log(`🎼 ORCHESTRATOR: Calling onStepChange('${nextStep.id}')`);
          onStepChange(nextStep.id);
          console.log(`🎼 ORCHESTRATOR: onStepChange('${nextStep.id}') completed`);
        } else {
          console.warn(`🎼 ORCHESTRATOR: onStepChange is not defined!`);
        }
      }, 500); // Small delay για UX
    } else {
      console.log(`🎼 ORCHESTRATOR: No next step, flow completed`);
    }
  }, [availableSteps, onStepChange, onStepComplete]);

  // 🎨 Render step cards
  const renderStepCards = useCallback((step: StepDefinition) => {
    // Safety check: εάν δεν υπάρχουν cards, επιστρέφουμε άδειο array
    if (!step.cards || !Array.isArray(step.cards)) {
      return null;
    }

    const visibleCards = step.cards
      .filter(card => {
        // Evaluate card conditions
        if (card.conditions) {
          return card.conditions.every(condition => {
            // Simplified condition evaluation για cards
            switch (condition.type) {
              case 'category':
                return selectedCategory === condition.value;
              case 'intent':
                return selectedIntent === condition.value;
              default:
                return true;
            }
          });
        }
        return true;
      })
      .sort((a, b) => a.order - b.order);

    const cardElements = visibleCards.map(card => {
      const CardComponent = card.component;
      return (
        <CardComponent
          key={card.id}
          context={stepContext}
          variant={selectedCategory || 'property'}
          onChange={(data) => {
            // Card data changes μπορούν να trigger step updates
            console.log(`🔄 Card ${card.id} data changed:`, data);
          }}
          onValidationChange={(isValid) => {
            console.log(`✅ Card ${card.id} validation:`, isValid);
          }}
        />
      );
    });

    return renderCardsContainer ? renderCardsContainer(cardElements) : cardElements;
  }, [stepContext, selectedCategory, selectedIntent, renderCardsContainer]);

  // 🚫 Early return αν δεν υπάρχει current step
  if (!currentStep) {
    // Σιωπηλό fallback χωρίς console logs για αποφυγή loops
    return (
      <Box padding={`${SPACING_SCALE.LG}px`} textAlign="center">
        <p>Step '{currentStepId}' δεν είναι διαθέσιμο αυτή τη στιγμή.</p>
      </Box>
    );
  }

  // 🎯 Render current step
  const StepComponent = currentStep.component;

  // Debug log για occupation step specifically
  if (currentStepId === 'occupation') {
    console.log('🔍 ORCHESTRATOR: About to render OCCUPATION step');
    console.log('🔍 ORCHESTRATOR: StepComponent:', StepComponent);
    console.log('🔍 ORCHESTRATOR: stepContext:', stepContext);
  }

  const stepElement = (
    <StepComponent
      context={stepContext}
      onNext={handleNext}
      onPrevious={handlePrevious}
      onStepComplete={handleStepComplete}
      isVisible={true}
      deviceProps={deviceProps}
    />
  );

  const cardsElement = renderStepCards(currentStep);

  // 🎨 Render με custom container αν υπάρχει
  if (renderStepContainer) {
    return (
      <Box className="step-orchestrator">
        {renderStepContainer(currentStep, (
          <>
            {stepElement}
            {cardsElement}
          </>
        ))}
      </Box>
    );
  }

  // 🎨 Default rendering
  return (
    <Box className="step-orchestrator">
      <Box className="step-content">
        {stepElement}
      </Box>
      <Box className="step-cards">
        {cardsElement}
      </Box>
    </Box>
  );
};

// 🚀 UTILITY HOOKS για easy integration

/**
 * Hook για step navigation state
 */
export const useStepNavigation = (
  availableSteps: StepDefinition[],
  currentStepId: StepId
) => {
  const currentIndex = useMemo(() => {
    return availableSteps.findIndex(step => step.id === currentStepId);
  }, [availableSteps, currentStepId]);

  const canGoNext = currentIndex < availableSteps.length - 1;
  const canGoPrevious = currentIndex > 0;
  const totalSteps = availableSteps.length;
  const stepIndex = currentIndex;

  return {
    canGoNext,
    canGoPrevious,
    totalSteps,
    stepIndex,
    currentStep: availableSteps[currentIndex],
    nextStep: availableSteps[currentIndex + 1],
    previousStep: availableSteps[currentIndex - 1]
  };
};

/**
 * Hook για step registry status
 */
export const useStepRegistry = () => {
  return {
    registry: stepRegistry,
    status: stepRegistry.getRegistryStatus(),
    reorderSteps: stepRegistry.reorderSteps.bind(stepRegistry),
    setFlow: stepRegistry.setFlow.bind(stepRegistry)
  };
};