/**
 * StepOrchestrator.tsx - Enterprise Step Flow Orchestrator
 *
 * Κεντρικός orchestrator που διαχειρίζεται τη ροή των steps
 * με dynamic reordering και context-aware rendering
 */

import React, { useMemo, useCallback, useState } from 'react';
import {
  SPACING_SCALE,
  BORDER_RADIUS_SCALE,
  CSS_DESIGN_TOKENS,
  BRAND_COLORS,
  UI_COLORS,
  FONT_SIZES,
  FONT_WEIGHTS,
  ANIMATION_DURATIONS,
  ANIMATION_DISTANCES,
  EASING_FUNCTIONS,
  MENU_POSITIONS,
  GEO_DRAWING_STYLES,
  BUTTON_STATES,
  BUTTON_SIZES,
  CSS_DIMENSIONS,
  getWorkflowCardContainerStyle,
  getWorkflowCardModalStyle,
  getWorkflowCardStepStyle,
  getWorkflowCardStepContainerStyle,
  getCardPrimaryColor
} from '@layera/constants';
import { Box, Flex, FlexCenter } from '@layera/layout';
import { Button } from '@layera/buttons';
import { Text, Heading } from '@layera/typography';
import { BaseCard } from '@layera/cards';
import { SST_DATA_CONFIG } from '@layera/cards';
import { BOX_SHADOW_SCALE } from '@layera/box-shadows';
import { CloseIcon, ShieldIcon, LockIcon, QuickIcon } from '@layera/icons';
import { useLayeraTranslation } from '@layera/tolgee';
import { stepRegistry } from './StepRegistry';
import { WorkflowPlaceholder } from './WorkflowPlaceholder';
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
  ReviewType,
  QuickSearchState,
  QuickSearchIntent,
  QuickSearchKind,
  QuickSearchPurpose,
  QuickSearchTimeframe,
  QUICK_SEARCH_DEFAULTS,
  CardOption
} from './types';

export interface StepOrchestratorProps {
  /** Current step context */
  currentStepId: StepId;
  selectedCategory: CategoryType;
  selectedIntent: IntentType;

  /** ✅ QUICK SEARCH MODE - Show all relevant steps in single screen */
  quickSearchMode?: boolean;
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
    isMobile?: boolean;
    isTablet?: boolean;
    isDesktop?: boolean;
  };

  /** Render customization */
  renderStepContainer?: (step: StepDefinition, children: React.ReactNode) => React.ReactNode;
  renderCardsContainer?: (cards: React.ReactNode[]) => React.ReactNode;
}

// ✅ INLINE QUICK SEARCH COMPONENT - Ενσωματωμένο στο StepOrchestrator για SST compliance
interface InlineQuickSearchPanelProps {
  onSearch?: (state: QuickSearchState) => void;
  onClose?: () => void;
  initialState?: Partial<QuickSearchState>;
}

interface ChipRadioGroupProps<T extends string> {
  name: string;
  value: T;
  onChange: (value: T) => void;
  options: (CardOption<T> & { description?: string })[];
  disabled?: boolean;
  label: string;
  description?: string;
}

// 🎯 NEW CARD-BASED SELECTION COMPONENT
function CardRadioGroup<T extends string>({
  name,
  value,
  onChange,
  options,
  disabled = false,
  label,
  description
}: ChipRadioGroupProps<T>) {
  return (
    <Box>
      <Text
      >
        {label}
      </Text>
      {description && (
        <Text
          >
          {description}
        </Text>
      )}

      {/* 🎨 LEGO BaseCard με category-selection variant - Single Source of Truth */}
      <Flex>
        {options.map((option) => {
          const isSelected = value === option.value;
          return (
            <BaseCard
              key={option.value}
              variant={SST_DATA_CONFIG.componentVariants.categoryCard}
              title={option.label}
              description={option.description}
              clickable
              onClick={() => !disabled && !option.disabled && onChange(option.value)}
            />
          );
        })}
      </Flex>
    </Box>
  );
}

const InlineQuickSearchPanel: React.FC<InlineQuickSearchPanelProps> = ({
  onSearch,
  onClose,
  initialState = {}
}) => {
  const { t } = useLayeraTranslation();

  // Removed theme dependency due to provider issue - using static colors

  // ✅ State με προεπιλογές από το έγγραφο
  const [state, setState] = useState<QuickSearchState>({
    ...QUICK_SEARCH_DEFAULTS,
    ...initialState
  });

  // 🎯 Progressive Disclosure State - Research-backed UX enhancement
  const [visibleSteps, setVisibleSteps] = useState<number>(1); // Start με step 1 μόνο


  // ✅ SIMPLIFIED Validation - Intent is enough
  const isValid = state.intent !== null;

  // ✅ Research-backed next-step hints για uncertainty reduction
  const getNextStepHint = (): string => {
    if (state.intent && state.kind && state.timeframe && isValid) {
      return '';
    }
    if (false) {
      return '';
    }
    if (state.intent && state.kind) {
      if (false) {
        return '';
      } else {
        return '';
      }
    }
    if (state.intent) {
      return '';
    }
    return '';
  };

  // Handler
  const handleKindChange = (kind: QuickSearchKind) => {
    setState(prev => ({
      ...prev,
      kind,
      purpose: null
    }));

    // 🎯 Progressive Disclosure: Show step 3 after kind selection
    if (visibleSteps < 3) {
      setTimeout(() => setVisibleSteps(3), ANIMATION_DURATIONS.FAST);
    }
  };

  // 🎯 Progressive Disclosure: Auto-reveal handlers με SST animations
  React.useEffect(() => {
    // Step 2 appears after Intent selection
    if (state.intent && visibleSteps < 2) {
      setTimeout(() => setVisibleSteps(2), ANIMATION_DURATIONS.FAST);
    }
    // Step 4 appears after Purpose/Kind completion
    if (false) {
      setTimeout(() => setVisibleSteps(4), ANIMATION_DURATIONS.FAST);
    }
  }, [state.intent, state.kind, state.purpose, visibleSteps]);

  // 🎯 AUTO-NAVIGATION: Όταν όλα τα πεδία είναι συμπληρωμένα, πήγαινε στο WorkflowPlaceholder
  const [hasAutoNavigated, setHasAutoNavigated] = React.useState(false);
  const onSearchRef = React.useRef(onSearch);
  onSearchRef.current = onSearch; // Κρατάμε το latest onSearch reference

  // 🚀 SIMPLIFIED - Only intent required for immediate workflow start
  const allFieldsCompleted = Boolean(state.intent);

  // 🎯 FIXED AUTO-NAVIGATION: Correct timing without re-render conflicts
  const autoNavigateTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const stateRef = React.useRef(state);
  React.useEffect(() => { stateRef.current = state; }, [state]);

  React.useEffect(() => {
    const ready = allFieldsCompleted && isValid && visibleSteps >= 4 && !hasAutoNavigated;
    if (!ready) return;

    autoNavigateTimerRef.current = setTimeout(() => {
      if (onSearchRef.current) {
        onSearchRef.current(stateRef.current);
      }
      setHasAutoNavigated(true);
      autoNavigateTimerRef.current = null;
    }, 1500);

    return () => {
      if (autoNavigateTimerRef.current) {
        clearTimeout(autoNavigateTimerRef.current);
        autoNavigateTimerRef.current = null;
      }
    };
  }, [allFieldsCompleted, isValid, visibleSteps, hasAutoNavigated]);

  // 🏠 Category options - Ακίνητα vs Εργασία
  const categoryOptions: CardOption<QuickSearchIntent>[] = SST_DATA_CONFIG.categoryOptions;

  const kindOptions: CardOption<QuickSearchKind>[] = [];

  const purposeOptions: CardOption<QuickSearchPurpose>[] = [];

  const timeframeOptions: CardOption<QuickSearchTimeframe>[] = [];

  return (
    <div
      style={{
        ...getWorkflowCardContainerStyle()
      }}
    >
      {/* Close Button - Research-backed anxiety reduction με SST */}
      <Button
        size={BUTTON_SIZES.LG}
        onClick={() => {
          // Reset form state and provide clear exit
          setState({ intent: null, kind: null, purpose: null, timeframe: null });
          setVisibleSteps(1);
          onClose?.();
        }}
      >
        <CloseIcon />
      </Button>

      <Flex>
        <Box>
          <Heading>
            {SST_DATA_CONFIG.labels.categoryTitle}
          </Heading>
        </Box>

        {/* 🎯 DIRECT CARD SELECTION - No Container */}
        <CardRadioGroup
          value={state.intent}
          onChange={(intent) => {
            setState(prev => ({
              ...prev,
              intent,
              // 🚀 AUTO-COMPLETE other fields for immediate workflow start
              kind: null,
              purpose: null,
              timeframe: null
            }));
          }}
          options={categoryOptions}
        />

        {/* Action Section */}

        <Box>
          <Button
                size={BUTTON_SIZES.XL}
                onClick={() => onSearch?.(state)}
          >
            {SST_DATA_CONFIG.labels.startButton}
          </Button>

          {false && (
            <Text
            >
              {''}
            </Text>
          )}

          {/* Security Indicators - Research-backed trust building */}
          <Flex
          >
            <Flex>
              <ShieldIcon />
              <Text>
                {SST_DATA_CONFIG.labels.securityDataProtection}
              </Text>
            </Flex>
            <Flex>
              <LockIcon />
              <Text>
                {SST_DATA_CONFIG.labels.securityNoSpam}
              </Text>
            </Flex>
          </Flex>

          {/* Next-Step Preview - Research-backed uncertainty reduction */}
          {getNextStepHint() && (
            <Button
                    size={BUTTON_SIZES.LG}
              >
              <QuickIcon />
              {SST_DATA_CONFIG.labels.readyMessage}
            </Button>
          )}

          <Text
          >
            {SST_DATA_CONFIG.labels.helpText}
          </Text>
        </Box>
      </Flex>
    </div>
  );
};

export const StepOrchestrator: React.FC<StepOrchestratorProps> = ({
  currentStepId,
  selectedCategory,
  selectedIntent,
  quickSearchMode = false,
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
  // 🎯 State για workflow management
  const [showWorkflowPlaceholder, setShowWorkflowPlaceholder] = React.useState(false);
  const [completedQuickSearch, setCompletedQuickSearch] = React.useState<QuickSearchState | null>(null);

  // 🎮 Apply flow configuration if provided
  React.useEffect(() => {
    if (flowConfig) {
      stepRegistry.setFlow(flowConfig);
    }
  }, [flowConfig]);

  // 🎯 Build step context
  const stepContext: StepContext = useMemo(() => {
    const context = {
      currentStepId,
      selectedCategory,
      selectedIntent,
      selectedTransactionType: selectedTransactionType || null,
      selectedEmploymentType: selectedEmploymentType || null,
      selectedOccupation: selectedOccupation || {},
      selectedLocation: selectedLocation || null,
      selectedDetails: selectedDetails || null,
      selectedPricing: selectedPricing || null,
      selectedReview: selectedReview || null,
      completedSteps,
      featureFlags,
      customData: {}
    };


    return context;
  }, [currentStepId, selectedCategory, selectedIntent, selectedTransactionType, selectedEmploymentType, selectedOccupation, selectedLocation, selectedDetails, selectedPricing, selectedReview, completedSteps, featureFlags]);

  // 📋 Get available steps για current context
  const availableSteps = useMemo(() => {
    return stepRegistry.getAvailableSteps(stepContext);
  }, [stepContext]);

  // ✅ Auto-navigation όταν το context ενημερωθεί
  const [pendingNavigation, setPendingNavigation] = React.useState<string | null>(null);

  React.useEffect(() => {
    // 🚫 DISABLE AUTO-NAVIGATION σε quickSearchMode
    if (quickSearchMode) {
      return;
    }

    if (pendingNavigation) {
      const currentIndex = availableSteps.findIndex(step => step.id === pendingNavigation);
      const nextStep = availableSteps[currentIndex + 1];


      if (nextStep && onStepChange) {
        onStepChange(nextStep.id);
      }

      setPendingNavigation(null);
    }
  }, [availableSteps, pendingNavigation, onStepChange, quickSearchMode]);

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
    // ✅ ΚΑΘΑΡΗ ΛΥΣΗ: Ενημέρωση context + pending navigation
    onStepComplete?.(stepId, data);

    // 🚫 DISABLE AUTO-NAVIGATION σε quickSearchMode
    if (!quickSearchMode) {
      setPendingNavigation(stepId); // Trigger navigation μετά το context update
    }
  }, [onStepComplete, quickSearchMode]);

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
              case SST_DATA_CONFIG.logicValues.stepCategory:
                return selectedCategory === condition.value;
              case SST_DATA_CONFIG.logicValues.stepIntent:
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
          onChange={(data) => {
            // Card data changes μπορούν να trigger step updates
          }}
          onValidationChange={(isValid) => {
            // Validation state updated
          }}
        />
      );
    });

    return renderCardsContainer ? renderCardsContainer(cardElements) : cardElements;
  }, [stepContext, selectedCategory, selectedIntent, renderCardsContainer]);


  // ✅ WORKFLOW PLACEHOLDER MODE - ΠΡΩΤΑ PRIORITY!
  if (showWorkflowPlaceholder && completedQuickSearch) {
    return (
      <WorkflowPlaceholder
        quickSearchState={completedQuickSearch}
        onStartWorkflow={() => {
          // Navigate to actual workflow
          setShowWorkflowPlaceholder(false);

          if (onStepComplete && completedQuickSearch.kind) {
            onStepComplete(SST_DATA_CONFIG.logicValues.stepCategory, {
              selectedCategory: null
            });
          }
        }}
        onBackToQuickSearch={() => {
          // Go back to QuickSearch
          setShowWorkflowPlaceholder(false);
          setCompletedQuickSearch(null);
        }}
      />
    );
  }

  // ✅ QUICK SEARCH MODE - Μόνο αν ΔΕΝ δείχνουμε το placeholder
  if (quickSearchMode && !showWorkflowPlaceholder) {
    return (
      <InlineQuickSearchPanel
        onSearch={(quickSearchState) => {
          // 🎯 Auto-advance to WorkflowPlaceholder
          setCompletedQuickSearch(quickSearchState);
          setShowWorkflowPlaceholder(true);
        }}
      />
    );
  }

  // 📝 DUPLICATE REMOVED - χρησιμοποιούμε το πρώτο block

  // 🚫 Early return αν δεν υπάρχει current step
  if (!currentStep) {
    // Σιωπηλό fallback χωρίς console logs για αποφυγή loops
    return (
      <Box>
        <p>Step '{currentStepId}' δεν είναι διαθέσιμο αυτή τη στιγμή.</p>
      </Box>
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
      <Box>
        {renderStepContainer(currentStep, (
          <>
            {stepElement}
            {cardsElement}
          </>
        ))}
      </Box>
    );
  }


  // 🎨 Default sequential rendering
  return (
    <Box>
      <Box>
        {stepElement}
      </Box>
      <Box>
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
export const useStepRegistry = (): void => {
  return {
    registry: stepRegistry,
    status: stepRegistry.getRegistryStatus(),
    reorderSteps: stepRegistry.reorderSteps.bind(stepRegistry),
    setFlow: stepRegistry.setFlow.bind(stepRegistry)
  };
};