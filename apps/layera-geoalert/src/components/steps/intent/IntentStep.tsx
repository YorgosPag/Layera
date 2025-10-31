/**
 * IntentStep.tsx - Intent Selection Step
 *
 * Semantic Step: "intent" - folder name never changes
 * Second step in the flow - handles offer/search selection
 */

import React, { useState, useCallback } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
// ✅ PipelineDiscovery ΔΙΑΓΡΑΦΗΚΕ - χρησιμοποιούμε StepOrchestrator μόνο
import { BaseCard } from '@layera/cards';
import { Box } from '@layera/layout';
import { cardData, getCardsForStep, type CardConfig, type CardId } from '../../device-specific/mobile/iphone-14-pro-max/components/cardData';
import { InfoPanel } from '@layera/info-panels';
import {
  GEOALERT_INFO_CONTENT,
  StaticContentProvider
} from '@layera/info-panels';
import { useGeoAlertLayout } from '@layera/layout';
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

  // Enterprise LEGO Layout System
  const { utils } = useGeoAlertLayout();

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

  // ✅ ΔΙΑΓΡΑΦΗΚΕ: PipelineDiscovery - χρησιμοποιούμε StepOrchestrator μόνο

  // Handle intent card click
  const handleIntentClick = useCallback((cardConfig: CardConfig) => {
    const intent = cardConfig.id as IntentType;

    setSelectedIntent(intent);

    // ✅ TODO: Μετάβαση σε StepOrchestrator
    // pipelineDiscovery.syncWithCategoryStep αντικαταστάθηκε
    console.log('Intent selected:', intent, 'for category:', context.selectedCategory);

    // Complete this step
    onStepComplete?.('intent', {
      selectedIntent: intent,
      selectedCategory: context.selectedCategory
    });

    // Legacy callback για backwards compatibility
    onIntentSelected?.(intent);

    // ΔΙΟΡΘΩΣΗ: Επαναφέρω το auto-advance για navigation
    // Το StepOrchestrator χρειάζεται το onNext() για να προχωρήσει στο επόμενο step
    onNext?.();


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
        title: t('info.title'),
        content: t('info.content.notAvailable'),
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

  // Enterprise LEGO Layout - CSS Variables
  const containerStyles = utils.getCardStyles('vertical'); // Vertical για intent cards
  const containerClass = utils.getCardContainerClass('vertical');

  // Early return αν δεν είναι visible ή δεν έχει category
  if (!isVisible || !context.selectedCategory) {
    return null;
  }

  return (
    <>
      <Box style={containerStyles} className={containerClass}>
        {intentCards.map((cardConfig: unknown) => (
          <BaseCard
            key={cardConfig.id}
            variant={context.selectedCategory || 'property'}
            title={t(cardConfig.titleKey)}
            icon={React.createElement(cardConfig.icon, { size: 'sm', theme: 'neutral' })}
            onClick={(): void => handleIntentClick(cardConfig)}
            onInfoClick={() => handleInfoClick(cardConfig.id)}
            data-testid={`intent-card-${cardConfig.id}`}
          />
        ))}
      </Box>

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