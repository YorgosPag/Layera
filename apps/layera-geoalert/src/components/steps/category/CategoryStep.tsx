/**
 * CategoryStep.tsx - Migrated Category Step με New Architecture
 *
 * Semantic Step: "category" - folder name never changes
 * Extracted από monolithic CategoryStep για better separation of concerns
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
import type { StepProps, CategoryType } from '../types';

export interface CategoryStepProps extends StepProps {
  /** Legacy compatibility */
  onNext?: (category: CategoryType) => void;
}

/**
 * Enterprise Category Step - First step in the flow
 * Handles category selection (property/job) only
 */
export const CategoryStep: React.FC<CategoryStepProps> = ({
  context,
  onNext,
  onStepComplete,
  isVisible = true,
  deviceProps = {}
}) => {
  const { t } = useLayeraTranslation();

  // Local state για category selection
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(
    context.selectedCategory
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

  // Handle category card click
  const handleCategoryClick = useCallback((cardConfig: CardConfig) => {
    const category = cardConfig.id as CategoryType;

    setSelectedCategory(category);

    // Update pipeline
    pipelineDiscovery.syncWithCategoryStep({
      selectedCategory: category,
      selectedIntent: null,
      showTransactionStep: false,
      currentStep: 'category'
    });

    // Complete this step
    onStepComplete?.('category', { selectedCategory: category });

    // Legacy callback για backwards compatibility
    if (onNext) {
      setTimeout(() => {
        onNext(category);
      }, 100);
    }

    console.log(`✅ Category selected: ${category}`);
  }, [onNext, onStepComplete, pipelineDiscovery]);

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
      return infoContentProvider.getContent(cardId);
    } catch (error) {
      console.warn(`Info content not found for card: ${cardId}`);
      return {
        title: t('info.defaultTitle', 'Πληροφορίες'),
        content: t('info.defaultContent', 'Δεν υπάρχουν διαθέσιμες πληροφορίες για αυτή την επιλογή.'),
        type: 'info' as const
      };
    }
  }, [infoContentProvider, t]);

  // Get category cards από cardData
  const categoryCards = getCardsForStep('category');

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

  // Early return αν δεν είναι visible
  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div style={containerStyles}>
        <div style={cardsContainerStyles}>
          {categoryCards.map((cardConfig) => (
            <BaseCard
              key={cardConfig.id}
              variant={cardConfig.id as 'property' | 'job'}
              title={cardConfig.title}
              icon={cardConfig.icon}
              onClick={() => handleCategoryClick(cardConfig)}
              onInfoClick={() => handleInfoClick(cardConfig.id)}
              data-testid={`category-card-${cardConfig.id}`}
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
          selectedCategory={selectedCategory}
        />
      )}
    </>
  );
};