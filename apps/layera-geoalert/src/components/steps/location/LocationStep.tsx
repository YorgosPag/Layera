/**
 * LocationStep.tsx - Location Selection Step
 *
 * Semantic Step: "location" - folder name never changes
 * Third step in the flow - handles location/area selection
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
import type { StepProps, LocationType } from '../types';

export interface LocationStepProps extends StepProps {
  /** Legacy compatibility */
  onLocationSelected?: (location: LocationType) => void;
}

/**
 * Enterprise Location Step - Third step in the flow
 * Handles location/area selection based on selected category and intent
 */
export const LocationStep: React.FC<LocationStepProps> = ({
  context,
  onNext,
  onStepComplete,
  onLocationSelected,
  isVisible = true,
  deviceProps = {}
}) => {
  const { t } = useLayeraTranslation();

  // Local state για location selection
  const [selectedLocation, setSelectedLocation] = useState<LocationType>(
    context.selectedLocation
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

  // Handle location card click
  const handleLocationClick = useCallback((cardConfig: CardConfig) => {
    const location = cardConfig.id as LocationType;

    setSelectedLocation(location);

    // Update pipeline
    pipelineDiscovery.syncWithCategoryStep({
      selectedCategory: context.selectedCategory,
      selectedIntent: context.selectedIntent,
      selectedLocation: location,
      showTransactionStep: context.selectedCategory === 'property' && context.selectedIntent === 'offer',
      currentStep: 'location'
    });

    // Complete this step
    onStepComplete?.('location', {
      selectedLocation: location,
      selectedCategory: context.selectedCategory,
      selectedIntent: context.selectedIntent
    });

    // Legacy callback για backwards compatibility
    onLocationSelected?.(location);

    // Auto-advance to next step
    onNext?.();

    console.log(`✅ Location selected: ${location} for ${context.selectedCategory}/${context.selectedIntent}`);
  }, [context.selectedCategory, context.selectedIntent, onNext, onStepComplete, onLocationSelected, pipelineDiscovery]);

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
      // For location cards, content key depends on selected category and intent
      let contentKey: CardId = cardId;
      if (context.selectedCategory && context.selectedIntent) {
        contentKey = `${context.selectedCategory}-${context.selectedIntent}-${cardId}` as CardId;
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
  }, [infoContentProvider, t, context.selectedCategory, context.selectedIntent]);

  // Get location cards based on selected category and intent
  const getLocationCards = (): readonly CardConfig[] => {
    // Property-specific locations
    if (context.selectedCategory === 'property') {
      if (context.selectedIntent === 'offer') {
        return getCardsForStep('property-offer-location');
      }
      if (context.selectedIntent === 'search') {
        return getCardsForStep('property-search-location');
      }
    }

    // Job-specific locations
    if (context.selectedCategory === 'job') {
      if (context.selectedIntent === 'offer') {
        return getCardsForStep('job-offer-location');
      }
      if (context.selectedIntent === 'search') {
        return getCardsForStep('job-search-location');
      }
    }

    // Default to generic location cards
    return getCardsForStep('location');
  };

  const locationCards = getLocationCards();

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

  // Early return αν δεν είναι visible ή δεν έχει category/intent
  if (!isVisible || !context.selectedCategory || !context.selectedIntent) {
    return null;
  }

  return (
    <>
      <div style={containerStyles}>
        <div style={cardsContainerStyles}>
          {locationCards.map((cardConfig) => (
            <BaseCard
              key={cardConfig.id}
              variant={context.selectedCategory || 'property'}
              title={cardConfig.title}
              icon={cardConfig.icon}
              onClick={() => handleLocationClick(cardConfig)}
              onInfoClick={() => handleInfoClick(cardConfig.id)}
              data-testid={`location-card-${cardConfig.id}`}
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