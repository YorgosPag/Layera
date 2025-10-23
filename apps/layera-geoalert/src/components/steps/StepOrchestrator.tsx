/**
 * StepOrchestrator.tsx - Enterprise Step Flow Orchestrator
 *
 * Κεντρικός orchestrator που διαχειρίζεται τη ροή των steps
 * με dynamic reordering και context-aware rendering
 */

import React, { useMemo, useCallback } from 'react';
import { stepRegistry } from './StepRegistry';
import {
  StepContext,
  StepDefinition,
  StepId,
  StepFlowConfig,
  CategoryType,
  IntentType,
  LocationType
} from './types';

export interface StepOrchestratorProps {
  /** Current step context */
  currentStepId: StepId;
  selectedCategory: CategoryType;
  selectedIntent: IntentType;
  selectedLocation?: LocationType;
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
    selectedLocation: selectedLocation || null,
    completedSteps,
    featureFlags,
    customData: {}
  }), [currentStepId, selectedCategory, selectedIntent, selectedLocation, completedSteps, featureFlags]);

  // 📋 Get available steps για current context
  const availableSteps = useMemo(() => {
    return stepRegistry.getAvailableSteps(stepContext);
  }, [stepContext]);

  // 🎯 Find current step definition
  const currentStep = useMemo(() => {
    return availableSteps.find(step => step.id === currentStepId);
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
    onStepComplete?.(stepId, data);

    // Auto-advance to next step αν δεν είναι το τελευταίο
    const currentIndex = availableSteps.findIndex(step => step.id === stepId);
    const nextStep = availableSteps[currentIndex + 1];

    if (nextStep) {
      setTimeout(() => {
        onStepChange?.(nextStep.id);
      }, 500); // Small delay για UX
    }
  }, [availableSteps, onStepChange, onStepComplete]);

  // 🎨 Render step cards
  const renderStepCards = useCallback((step: StepDefinition) => {
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
    console.warn(`⚠️ Step '${currentStepId}' not found or not available`);
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Step '{currentStepId}' δεν είναι διαθέσιμο αυτή τη στιγμή.</p>
      </div>
    );
  }

  // 🎯 Render current step
  const StepComponent = currentStep.component;
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
      <div className="step-orchestrator">
        {renderStepContainer(currentStep, (
          <>
            {stepElement}
            {cardsElement}
          </>
        ))}
      </div>
    );
  }

  // 🎨 Default rendering
  return (
    <div className="step-orchestrator">
      <div className="step-content">
        {stepElement}
      </div>
      <div className="step-cards">
        {cardsElement}
      </div>
    </div>
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