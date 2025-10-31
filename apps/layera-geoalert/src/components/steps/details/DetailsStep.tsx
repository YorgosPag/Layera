/**
 * DetailsStep.tsx - Details Collection Step
 *
 * Semantic Step: "details" - folder name never changes
 * Fourth step in the flow - handles detail collection based on context
 */

import React, { useState, useCallback } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { Flex } from '@layera/layout';
import { SPACING_SCALE } from '@layera/constants';
// ✅ χρησιμοποιούμε StepOrchestrator μόνο
import { BaseCard } from '@layera/cards';
import { cardData, getCardsForStep, type CardConfig, type CardId } from '../../device-specific/mobile/iphone-14-pro-max/components/cardData';
import { InfoPanel } from '@layera/info-panels';
import {
  GEOALERT_INFO_CONTENT,
  StaticContentProvider
} from '@layera/info-panels';
import type { StepProps, DetailsType } from '../types';

export interface DetailsStepProps extends StepProps {
  /** Legacy compatibility */
  onDetailsSelected?: (details: DetailsType) => void;
}

/**
 * Enterprise Details Step - Fourth step in the flow
 * Handles detail collection based on selected category, intent, and location
 */
export const DetailsStep: React.FC<DetailsStepProps> = ({
  context,
  onNext,
  onStepComplete,
  onDetailsSelected,
  isVisible = true,
  deviceProps = {}
}) => {
  const { t } = useLayeraTranslation();

  // Local state για details selection
  const [selectedDetails, setSelectedDetails] = useState<DetailsType>(
    context.selectedDetails
  );
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [currentInfoCard, setCurrentInfoCard] = useState<CardId | null>(null);

  // Info content provider
  const infoContentProvider = React.useMemo(() =>
    new StaticContentProvider(GEOALERT_INFO_CONTENT),
    []
  );

  // - χρησιμοποιούμε StepOrchestrator μόνο

  // Handle details card click
  const handleDetailsClick = useCallback((cardConfig: CardConfig) => {
    const details = cardConfig.id as DetailsType;

    setSelectedDetails(details);

    // ✅ ΟΛΟΚΛΗΡΩΘΗΚΕ: Μετάβαση σε StepOrchestrator - χρήση μόνο Single Sources of Truth
    console.log('Details selected:', details);

    // Complete this step
    onStepComplete?.('details', {
      selectedDetails: details,
      selectedCategory: context.selectedCategory,
      selectedIntent: context.selectedIntent,
      selectedLocation: context.selectedLocation
    });

    // Legacy callback για backwards compatibility
    onDetailsSelected?.(details);

    // Auto-advance to next step
    onNext?.();


  }, [context.selectedCategory, context.selectedIntent, context.selectedLocation, onNext, onStepComplete, onDetailsSelected]);

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
      // For details cards, content key depends on full context
      let contentKey: CardId = cardId;
      if (context.selectedCategory && context.selectedIntent && context.selectedLocation) {
        contentKey = `${context.selectedCategory}-${context.selectedIntent}-${context.selectedLocation}-${cardId}` as CardId;
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
  }, [infoContentProvider, t, context.selectedCategory, context.selectedIntent, context.selectedLocation]);

  // Get details cards based on complete context
  const getDetailsCards = (): readonly CardConfig[] => {
    // Property-specific details
    if (context.selectedCategory === 'property') {
      if (context.selectedIntent === 'offer') {
        if (context.selectedLocation === 'map') {
          return getCardsForStep('property-offer-map-details');
        }
        if (context.selectedLocation === 'area') {
          return getCardsForStep('property-offer-area-details');
        }
        if (context.selectedLocation === 'address') {
          return getCardsForStep('property-offer-address-details');
        }
        return getCardsForStep('property-offer-details');
      }
      if (context.selectedIntent === 'search') {
        if (context.selectedLocation === 'map') {
          return getCardsForStep('property-search-map-details');
        }
        if (context.selectedLocation === 'area') {
          return getCardsForStep('property-search-area-details');
        }
        if (context.selectedLocation === 'address') {
          return getCardsForStep('property-search-address-details');
        }
        return getCardsForStep('property-search-details');
      }
    }

    // Job-specific details
    if (context.selectedCategory === 'job') {
      if (context.selectedIntent === 'offer') {
        return getCardsForStep('job-offer-details');
      }
      if (context.selectedIntent === 'search') {
        return getCardsForStep('job-search-details');
      }
    }

    // Default to generic details cards
    return getCardsForStep('details');
  };

  const detailsCards = getDetailsCards();



  // Early return αν δεν είναι visible ή δεν έχει τα απαραίτητα context
  if (!isVisible || !context.selectedCategory || !context.selectedIntent || !context.selectedLocation) {
    return null;
  }

  return (
    <>
      <Flex
        direction="column"
        position="fixed"
        top="var(--la-cards-top)"
        left="50%"
        transform="translateX(-50%)"
        width={`${SPACING_SCALE.LAYOUT_XXXL}px`}
        gap="md"
        zIndex={1000}
        padding={`0 ${SPACING_SCALE.LG}px`}
        boxSizing="border-box"
      >
        <Flex
          direction="column"
          gap="sm"
        >
          {detailsCards.map((cardConfig: CardConfig) => (
            <BaseCard
              key={cardConfig.id}
              variant={context.selectedCategory || 'property'}
              title={cardConfig.titleKey}
              icon={cardConfig.icon}
              onClick={(): void => handleDetailsClick(cardConfig)}
              onInfoClick={() => handleInfoClick(cardConfig.id)}
              data-testid={`details-card-${cardConfig.id}`}
            />
          ))}
        </Flex>
      </Flex>

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