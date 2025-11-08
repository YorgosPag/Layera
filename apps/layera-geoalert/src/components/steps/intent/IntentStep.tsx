/**
 * IntentStep.tsx - Intent Selection Step
 *
 * Semantic Step: "intent" - folder name never changes
 * Second step in the flow - handles offer/search selection
 */

import React, { useState, useCallback } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
//χρησιμοποιούμε StepOrchestrator μόνο
import { BaseCard } from '@layera/cards';
import { Box } from '@layera/layout';
import { InfoPanel } from '@layera/info-panels';
import {
  GEOALERT_INFO_CONTENT,
  StaticContentProvider
} from '@layera/info-panels';
import { useGeoAlertLayout } from '@layera/layout';
import type { StepProps, IntentType } from '../types';

// Local types
type CardId = string;
type CardConfig = {
  id: string;
  titleKey: string;
  icon: React.ComponentType;
};

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

  //χρησιμοποιούμε StepOrchestrator μόνο

  // Handle intent card click
  const handleIntentClick = useCallback((cardConfig: CardConfig) => {
    const intent = cardConfig.id as IntentType;

    setSelectedIntent(intent);

    // ✅ ΟΛΟΚΛΗΡΩΘΗΚΕ: Μετάβαση σε StepOrchestrator - χρήση μόνο Single Sources of Truth
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

  }, [context.selectedCategory, onNext, onStepComplete, onIntentSelected]);

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

  // Simplified intent cards - removed device-specific logic
  const getIntentCards = (): readonly CardConfig[] => {
    // Basic intent options for all categories
    return [
      { id: 'offer', titleKey: 'intent.offer', icon: React.Fragment },
      { id: 'search', titleKey: 'intent.search', icon: React.Fragment }
    ];
  };

  const intentCards = getIntentCards();

  // ✅ SINGLE SOURCE OF TRUTH: Χρήση μόνο του LEGO Layout hook
  const containerStyles = utils.getCardStyles('horizontal');
  const containerClass = utils.getCardContainerClass('horizontal');

  // Early return αν δεν είναι visible ή δεν έχει category
  if (!isVisible || !context.selectedCategory) {
    return null;
  }

  return (
    <>
      <Box className={containerClass}>
        {intentCards.map((cardConfig: CardConfig) => (
          <BaseCard
            key={cardConfig.id}
            variant={context.selectedCategory || 'property'}
            title={t(cardConfig.titleKey)}
            className="layera-card-uniform"
            icon={React.createElement(cardConfig.icon, { size: 'sm', theme: 'neutral' })}
            onClick={(): void => handleIntentClick(cardConfig)}
            onInfoClick={() => handleInfoClick(cardConfig.id)}
            data-testid={`intent-card-${cardConfig.id}`}
            flex="1"
            minWidth="0"
            maxWidth="none"
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