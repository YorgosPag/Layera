/**
 * IntentStep.tsx - Intent Selection Step
 *
 * Semantic Step: "intent" - folder name never changes
 * Second step in the flow - handles offer/search selection
 */

import React, { useState, useCallback } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { PipelineDiscovery } from '@layera/pipelines';
import { BaseCard } from '../../device-specific/mobile/iphone-14-pro-max/components/BaseCard';
import { cardData, getCardsForStep, type CardConfig, type CardId } from '../../device-specific/mobile/iphone-14-pro-max/components/cardData';
import { InfoPanel } from '../../device-specific/mobile/iphone-14-pro-max/components/InfoPanel';
import {
  GEOALERT_INFO_CONTENT,
  StaticContentProvider
} from '@layera/info-panels';
import type { StepProps, IntentType } from '../types';

export interface IntentStepProps extends StepProps {
  /** Legacy compatibility */
  onIntentSelected?: (intent: IntentType) => void;
}

/**
 * Enterprise Intent Step - Second step in the flow
 * Handles intent selection (offer/search) based on selected category
 */
export const IntentStep: React.FC<IntentStepProps> = ({
  context,
  onNext,
  onStepComplete,
  onIntentSelected,
  isVisible = true,
  deviceProps = {}
}) => {
  const { t } = useLayeraTranslation();

  // Local state για intent selection
  const [selectedIntent, setSelectedIntent] = useState<IntentType>(
    context.selectedIntent
  );
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [currentInfoCard, setCurrentInfoCard] = useState<CardId | null>(null);

  // Info content provider
  const infoContentProvider = React.useMemo(() =>
    new StaticContentProvider(GEOALERT_INFO_CONTENT),
    []
  );

  // PipelineDiscovery integration
  const pipelineDiscovery = React.useMemo(() => PipelineDiscovery.getInstance(), []);

  // Handle intent card click
  const handleIntentClick = useCallback((cardConfig: CardConfig) => {
    const intent = cardConfig.id as IntentType;

    setSelectedIntent(intent);

    // Update pipeline
    pipelineDiscovery.syncWithCategoryStep({
      selectedCategory: context.selectedCategory,
      selectedIntent: intent,
      showTransactionStep: context.selectedCategory === 'property' && intent === 'offer',
      currentStep: 'intent'
    });

    // Complete this step
    onStepComplete?.('intent', {
      selectedIntent: intent,
      selectedCategory: context.selectedCategory
    });

    // Legacy callback για backwards compatibility
    onIntentSelected?.(intent);

    // Auto-advance to next step
    onNext?.();

    console.log(`✅ Intent selected: ${intent} for category: ${context.selectedCategory}`);
  }, [context.selectedCategory, onNext, onStepComplete, onIntentSelected, pipelineDiscovery]);

  // Handle info button clicks
  const handleInfoClick = useCallback((cardId: CardId) => {
    setCurrentInfoCard(cardId);
    setShowInfoPanel(true);

    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
  }, []);

  // Get info content για specific card
  const getInfoContent = useCallback((cardId: CardId) => {
    try {
      // For intent cards, content key depends on selected category
      let contentKey: CardId = cardId;
      if ((cardId === 'offer' || cardId === 'search') && context.selectedCategory) {
        contentKey = `${context.selectedCategory}-${cardId}` as CardId;
      }

      return infoContentProvider.getContent(contentKey);
    } catch (error) {
      console.warn(`Info content not found for card: ${cardId}`);
      return {
        title: t('info.defaultTitle', 'Πληροφορίες'),
        content: t('info.defaultContent', 'Δεν υπάρχουν διαθέσιμες πληροφορίες για αυτή την επιλογή.'),
        type: 'info' as const
      };
    }
  }, [infoContentProvider, t, context.selectedCategory]);

  // Get intent cards based on selected category
  const getIntentCards = (): readonly CardConfig[] => {
    if (context.selectedCategory === 'property') {
      return getCardsForStep('property');
    }

    if (context.selectedCategory === 'job') {
      return getCardsForStep('job');
    }

    // Default to generic intent cards
    return getCardsForStep('intent');
  };

  const intentCards = getIntentCards();

  // Container styles
  const containerStyles: React.CSSProperties = {
    position: 'fixed',
    top: '161px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '350px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    zIndex: 1000,
    padding: '0 20px',
    boxSizing: 'border-box'
  };

  const cardsContainerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  };

  // Early return αν δεν είναι visible ή δεν έχει category
  if (!isVisible || !context.selectedCategory) {
    return null;
  }

  return (
    <>
      <div style={containerStyles}>
        <div style={cardsContainerStyles}>
          {intentCards.map((cardConfig) => (
            <BaseCard
              key={cardConfig.id}
              variant={context.selectedCategory || 'property'}
              title={cardConfig.title}
              icon={cardConfig.icon}
              onClick={() => handleIntentClick(cardConfig)}
              onInfoClick={() => handleInfoClick(cardConfig.id)}
              data-testid={`intent-card-${cardConfig.id}`}
            />
          ))}
        </div>
      </div>

      {/* Info Panel */}
      {showInfoPanel && currentInfoCard && (
        <InfoPanel
          isOpen={showInfoPanel}
          onClose={() => {
            setShowInfoPanel(false);
            setCurrentInfoCard(null);
          }}
          title={getInfoContent(currentInfoCard).title}
          content={getInfoContent(currentInfoCard).content}
          variant={getInfoContent(currentInfoCard).type}
          getInfoContent={getInfoContent}
          selectedCategory={context.selectedCategory}
        />
      )}
    </>
  );
};