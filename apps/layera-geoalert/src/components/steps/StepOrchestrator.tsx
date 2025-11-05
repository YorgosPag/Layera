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
  EASING_FUNCTIONS,
  MENU_POSITIONS
} from '@layera/constants';
import { Box, Flex, FlexCenter } from '@layera/layout';
import { Button } from '@layera/buttons';
import { Text, Heading } from '@layera/typography';
import { BaseCard } from '@layera/cards';
import { BOX_SHADOW_SCALE } from '@layera/box-shadows';
import { useLayeraTranslation } from '@layera/tolgee';
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
  initialState?: Partial<QuickSearchState>;
}

interface ChipRadioGroupProps<T extends string> {
  name: string;
  value: T;
  onChange: (value: T) => void;
  options: CardOption<T>[];
  disabled?: boolean;
  label: string;
  description?: string;
}

function ChipRadioGroup<T extends string>({
  name,
  value,
  onChange,
  options,
  disabled = false,
  label,
  description
}: ChipRadioGroupProps<T>) {
  // Removed theme dependency due to provider issue

  return (
    <Box style={{ textAlign: MENU_POSITIONS.CENTER }}>
      <Text
        size="sm"
        weight="medium"
        marginBottom="sm"
        style={{
          color: 'var(--color-text-primary)',
          fontSize: `${FONT_SIZES.SM}px`,
          display: 'block',
          textAlign: MENU_POSITIONS.CENTER
        }}
      >
        {label}
      </Text>
      {description && (
        <Text
          size="xs"
          marginBottom="sm"
          style={{
            color: 'var(--color-text-secondary)',
            fontSize: `${FONT_SIZES.XS}px`,
            display: 'block',
            lineHeight: '1.4'
          }}
        >
          {description}
        </Text>
      )}
      <Flex gap="sm" wrap="wrap" role="radiogroup" aria-labelledby={`${name}-label`} style={{ justifyContent: 'center' }}>
        {options.map((option) => (
          <Box
            key={option.value}
            as="button"
            onClick={() => !disabled && !option.disabled && onChange(option.value)}
            disabled={disabled || option.disabled}
            style={{
              padding: `${SPACING_SCALE.SM + SPACING_SCALE.XS + SPACING_SCALE.XXS}px ${SPACING_SCALE.LG - SPACING_SCALE.XS}px`,
              borderRadius: `${BORDER_RADIUS_SCALE.CARD}px`,
              flex: '0 1 auto', // να μην τεντώνουν άνισα
              minWidth: `${SPACING_SCALE.LAYOUT_SM + SPACING_SCALE.XXL - SPACING_SCALE.XS}px`,
              maxWidth: `${SPACING_SCALE.LAYOUT_MD + SPACING_SCALE.XXL - SPACING_SCALE.XS}px`,
              minHeight: `${SPACING_SCALE.XXL + SPACING_SCALE.XS}px`,
              fontSize: `${FONT_SIZES.LG - SPACING_SCALE.XXS - 1}px`,
              fontWeight: `${FONT_WEIGHTS.SEMIBOLD}`,
              transition: `background-color ${ANIMATION_DURATIONS.INSTANT}ms ${EASING_FUNCTIONS.EASE_OUT}, border-color ${ANIMATION_DURATIONS.INSTANT}ms ${EASING_FUNCTIONS.EASE_OUT}, box-shadow ${ANIMATION_DURATIONS.INSTANT}ms ${EASING_FUNCTIONS.EASE_OUT}`,
              cursor: disabled || option.disabled ? 'not-allowed' : 'pointer',
              opacity: disabled || option.disabled ? 0.5 : 1,
              background: value === option.value
                ? 'var(--color-interactive-primary)'
                : 'var(--color-bg-elevated)',
              color: value === option.value
                ? 'var(--color-text-inverse)'
                : 'var(--color-text-primary)',
              border: value === option.value
                ? `${SPACING_SCALE.XXS}px solid var(--color-interactive-primary)`
                : `${SPACING_SCALE.XXS / 2}px solid var(--color-border-strong)`,
              boxShadow: value === option.value
                ? 'var(--elevation-lg)'
                : 'var(--elevation-md)',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {option.label}
          </Box>
        ))}
      </Flex>
    </Box>
  );
}

const InlineQuickSearchPanel: React.FC<InlineQuickSearchPanelProps> = ({
  onSearch,
  initialState = {}
}) => {
  const { t } = useLayeraTranslation();
  // Removed theme dependency due to provider issue - using static colors

  // ✅ State με προεπιλογές από το έγγραφο
  const [state, setState] = useState<QuickSearchState>({
    ...QUICK_SEARCH_DEFAULTS,
    ...initialState
  });

  // ✅ Validation logic από το έγγραφο
  const isValid = state.kind === 'job' || (state.kind === 'property' && state.purpose !== null);

  // ✅ Handler για αλλαγή kind - αν επιλέξει "job", purpose γίνεται null
  const handleKindChange = (kind: QuickSearchKind) => {
    setState(prev => ({
      ...prev,
      kind,
      purpose: kind === 'job' ? null : prev.purpose || 'rent'
    }));
  };

  // ✅ Options για κάθε ομάδα chips
  const intentOptions: CardOption<QuickSearchIntent>[] = [
    { value: 'offer', label: t('quickSearch.intent.offer') },
    { value: 'search', label: t('quickSearch.intent.search') }
  ];

  const kindOptions: CardOption<QuickSearchKind>[] = [
    { value: 'property', label: t('quickSearch.kind.property') },
    { value: 'job', label: t('quickSearch.kind.job') }
  ];

  const purposeOptions: CardOption<QuickSearchPurpose>[] = [
    { value: 'sell', label: t('quickSearch.purpose.sell') },
    { value: 'rent', label: t('quickSearch.purpose.rent') }
  ];

  const timeframeOptions: CardOption<QuickSearchTimeframe>[] = [
    { value: 'now', label: t('quickSearch.timeframe.now') },
    { value: 'future', label: t('quickSearch.timeframe.future') }
  ];

  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg-solid)',
        backdropFilter: 'none',
        border: `${SPACING_SCALE.XXS}px solid var(--color-border-solid)`,
        borderRadius: `${BORDER_RADIUS_SCALE.LG}px`,
        boxShadow: `var(--la-shadow-xl)`,
        padding: `${SPACING_SCALE.LG}px`,
        display: 'block',
        width: '100%',
        maxWidth: `${SPACING_SCALE.CONTAINER_MD}px`, // 520px equivalent από SST
        margin: '0 auto'
      }}
    >
      <Flex direction="column" gap="xl" style={{ minWidth: 'initial', alignItems: 'center' }}>
        <Box textAlign="center">
          <Heading size="lg" marginBottom="sm" style={{
            color: 'var(--color-text-primary)'
          }}>
            {t('quickSearch.title')}
          </Heading>
          <Text size="md" style={{
            color: 'var(--color-text-secondary)'
          }}>
            {t('quickSearch.subtitle')}
          </Text>
        </Box>

        {/* Main Selection Grid */}
        <Box
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderRadius: `${BORDER_RADIUS_SCALE.CARD}px`,
            padding: `${SPACING_SCALE.MD}px`,
            border: `${SPACING_SCALE.XXS}px solid var(--color-border-solid)`,
            alignSelf: 'center',
            width: '100%'
          }}
        >
          <Flex direction="column" gap="lg" style={{ alignItems: 'center' }}>
          {/* 1. Θέλω να: Προσφέρω | Αναζητώ */}
          <ChipRadioGroup
            name="intent"
            value={state.intent}
            onChange={(intent) => setState(prev => ({ ...prev, intent }))}
            options={intentOptions}
            label={t('quickSearch.labels.intentQuestion')}
            description={t('quickSearch.labels.intentDescription')}
          />

          {/* 2. Τι: Ακίνητο | Εργασία */}
          <ChipRadioGroup
            name="kind"
            value={state.kind}
            onChange={handleKindChange}
            options={kindOptions}
            label={t('quickSearch.labels.kindQuestion')}
            description={t('quickSearch.labels.kindDescription')}
          />

          {/* 3. Αν Ακίνητο: Πώληση | Ενοικίαση (disabled όταν kind=job) */}
          <ChipRadioGroup
            name="purpose"
            value={state.purpose || 'rent'}
            onChange={(purpose) => setState(prev => ({ ...prev, purpose }))}
            options={purposeOptions}
            disabled={state.kind === 'job'}
            label={t('quickSearch.labels.purposeQuestion')}
            description={t('quickSearch.labels.purposeDescription')}
          />

          {/* 4. Πότε: Άμεσα | Για το μέλλον */}
          <ChipRadioGroup
            name="timeframe"
            value={state.timeframe}
            onChange={(timeframe) => setState(prev => ({ ...prev, timeframe }))}
            options={timeframeOptions}
            label={t('quickSearch.labels.timeframeQuestion')}
            description={t('quickSearch.labels.timeframeDescription')}
          />
          </Flex>
        </Box>

        {/* Action Section */}
        <Box textAlign="center">
          <Button
            variant="primary"
            size="lg"
            disabled={!isValid}
            onClick={() => onSearch?.(state)}
            style={{
              minWidth: `${SPACING_SCALE.LAYOUT_MD + SPACING_SCALE.LAYOUT_SM}px`,
              padding: `${SPACING_SCALE.SM + SPACING_SCALE.XS}px ${SPACING_SCALE.LG}px`,
              background: 'var(--color-interactive-primary)',
              borderRadius: `${BORDER_RADIUS_SCALE.SM + SPACING_SCALE.XXS}px`,
              fontSize: `${FONT_SIZES.LG - SPACING_SCALE.XXS - 1}px`,
              fontWeight: `${FONT_WEIGHTS.MEDIUM}`,
              color: 'var(--color-text-inverse)',
              border: `${SPACING_SCALE.XXS / 2}px solid var(--color-interactive-primary)`,
              boxShadow: `var(--elevation-md)`,
              transition: `all ${ANIMATION_DURATIONS.FAST}ms ${EASING_FUNCTIONS.EASE_OUT}`
            }}
          >
            {t('quickSearch.cta')}
          </Button>

          {!isValid && state.kind === 'property' && (
            <Text
              size="sm"
              textAlign="center"
              style={{
                color: 'var(--color-semantic-error-text)',
                marginTop: `${SPACING_SCALE.XS}px`
              }}
            >
              {t('quickSearch.validation.propertyPurposeRequired')}
            </Text>
          )}

          <Text
            size="xs"
            textAlign="center"
            style={{
              color: 'var(--color-text-tertiary)',
              marginTop: `${SPACING_SCALE.SM + SPACING_SCALE.XS}px`
            }}
          >
{t('quickSearch.helpText')}
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
  // Debug log για occupation step tracking
  React.useEffect(() => {
    if (currentStepId === 'occupation') {}
  }, [currentStepId]);
  // 🎯 ONE-TIME LOG: StepOrchestrator mounted για συγκεκριμένο step
  React.useEffect(() => {
    if (currentStepId === 'intent') {
    }
  }, [currentStepId]); // Τρέχει μόνο όταν αλλάζει το step, όχι το category

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
      selectedOccupation: selectedOccupation || { id: '', title: '' },
      selectedLocation: selectedLocation || null,
      selectedDetails: selectedDetails || null,
      selectedPricing: selectedPricing || null,
      selectedReview: selectedReview || null,
      completedSteps,
      featureFlags,
      customData: {}
    };

    // 🔍 DEBUG LOGGING για context changes
    if (process.env.NODE_ENV === 'development') {
      console.log('🎯 StepOrchestrator.stepContext BUILT:', {
        currentStepId: context.currentStepId,
        selectedCategory: context.selectedCategory,
        selectedIntent: context.selectedIntent,
        completedSteps: Array.from(context.completedSteps),
        timestamp: new Date().toISOString()
      });
    }

    return context;
  }, [currentStepId, selectedCategory, selectedIntent, selectedTransactionType, selectedEmploymentType, selectedOccupation, selectedLocation, selectedDetails, selectedPricing, selectedReview, completedSteps, featureFlags]);

  // 📋 Get available steps για current context
  const availableSteps = useMemo(() => {
    return stepRegistry.getAvailableSteps(stepContext);
  }, [stepContext]);

  // ✅ Auto-navigation όταν το context ενημερωθεί
  const [pendingNavigation, setPendingNavigation] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (pendingNavigation) {
      const currentIndex = availableSteps.findIndex(step => step.id === pendingNavigation);
      const nextStep = availableSteps[currentIndex + 1];

      // 🔍 DEBUG LOGGING για auto-navigation
      if (process.env.NODE_ENV === 'development') {
        console.log('🚀 StepOrchestrator.AUTO-NAVIGATION:', {
          pendingNavigation,
          currentIndex,
          nextStepId: nextStep?.id,
          availableStepsIds: availableSteps.map(s => s.id),
          timestamp: new Date().toISOString()
        });
      }

      if (nextStep && onStepChange) {
        onStepChange(nextStep.id);
      }

      setPendingNavigation(null);
    }
  }, [availableSteps, pendingNavigation, onStepChange]);

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
    setPendingNavigation(stepId); // Trigger navigation μετά το context update
  }, [onStepComplete]);

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
          }}
          onValidationChange={(isValid) => {
            // Validation state updated
          }}
        />
      );
    });

    return renderCardsContainer ? renderCardsContainer(cardElements) : cardElements;
  }, [stepContext, selectedCategory, selectedIntent, renderCardsContainer]);

  // ✅ QUICK SEARCH MODE - Inline implementation χωρίς external component
  if (quickSearchMode) {
    return (
      <InlineQuickSearchPanel
        onSearch={(quickSearchState) => {
          // ✅ Convert QuickSearch state to StepContext
          console.log('🔍 QuickSearch completed:', quickSearchState);

          // TODO: Convert quickSearchState to proper step navigation
          // For now, just trigger onStepComplete with the data
          handleStepComplete('category', {
            selectedCategory: quickSearchState.kind === 'property' ? 'property' : 'job'
          });
        }}
      />
    );
  }

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


  // 🎨 Default sequential rendering
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
export const useStepRegistry = (): void => {
  return {
    registry: stepRegistry,
    status: stepRegistry.getRegistryStatus(),
    reorderSteps: stepRegistry.reorderSteps.bind(stepRegistry),
    setFlow: stepRegistry.setFlow.bind(stepRegistry)
  };
};