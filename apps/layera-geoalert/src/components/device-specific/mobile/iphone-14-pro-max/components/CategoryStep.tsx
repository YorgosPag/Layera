/**
 * CategoryStep.tsx - Enterprise Card System με LEGO Info Panels
 *
 * Refactored με BaseCard component και LEGO Info Panels system.
 * Ακολουθεί Design System patterns από μεγάλες εταιρείες.
 */

import React, { useState } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import {
  GEOALERT_INFO_CONTENT,
  StaticContentProvider,
  INFO_PANEL_THEMES,
  DEFAULT_INFO_PANEL_STYLES
} from '@layera/info-panels';
import { BaseCard } from './BaseCard';
import { cardData, getCardsForStep, type CardConfig, type CardId } from './cardData';

export type Category = 'property' | 'job';

export interface CategoryStepProps {
  onNext: (category: Category) => void;
  isVisible?: boolean;
  currentStepId?: string;
}

/**
 * Enterprise CategoryStep με data-driven approach
 */
export const CategoryStep: React.FC<CategoryStepProps> = ({
  onNext,
  isVisible = true,
  currentStepId = 'category'
}) => {
  const { t } = useLayeraTranslation();

  // Enterprise state management
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showNextSteps, setShowNextSteps] = useState(false);
  const [infoStates, setInfoStates] = useState<Record<CardId, boolean>>({
    property: false,
    job: false,
    sale: false,
    rent: false,
    fulltime: false,
    parttime: false
  });

  // LEGO Info Panels setup
  const infoContentProvider = React.useMemo(() =>
    new StaticContentProvider(GEOALERT_INFO_CONTENT),
    []
  );

  // Reset state όταν επιστρέφουμε στο "category" step
  React.useEffect(() => {
    if (currentStepId === 'category') {
      setShowNextSteps(false);
      setSelectedCategory(null);
      console.log('🔄 Reset to category step - showing initial cards');
    }
  }, [currentStepId]);

  // Container styles - Unified για όλες τις κάρτες
  const containerStyles: React.CSSProperties = {
    position: 'fixed',
    top: '93px',
    left: '8px',
    right: '8px',
    display: (isVisible && !showNextSteps) ? 'flex' : 'none',
    flexDirection: 'row',
    gap: '8px',
    padding: '0',
    zIndex: 9998,
    overflowX: 'hidden',
    WebkitOverflowScrolling: 'touch'
  };

  // Next step container styles
  const nextStepContainerStyles: React.CSSProperties = {
    position: 'fixed',
    top: '93px',
    left: '8px',
    right: '8px',
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
    padding: '0',
    zIndex: 9998,
    overflowX: 'hidden',
    WebkitOverflowScrolling: 'touch'
  };

  // Enterprise event handlers
  const handleCardClick = (cardConfig: CardConfig) => {
    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(30);
    }

    console.log('📋 Card clicked:', cardConfig);

    if (cardConfig.step === 'category') {
      // Category selection logic
      setSelectedCategory(cardConfig.id as Category);
      setShowNextSteps(true);

      // Call onNext with slight delay for smooth transition
      setTimeout(() => {
        onNext(cardConfig.id as Category);
      }, 100);
    } else {
      // Next step card clicked
      console.log('🎯 Next step card clicked:', cardConfig.id);
      // Here we would handle the next step logic
    }
  };

  const handleInfoClick = (cardId: CardId) => {
    setInfoStates(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
    console.log('ℹ️ Info clicked for:', cardId);
  };

  // Enterprise LEGO Info Content - Data-driven approach
  const getInfoContent = async (cardId: CardId): Promise<{ title: string; content: string }> => {
    try {
      const content = await infoContentProvider.getContent(cardId);
      return {
        title: content.title,
        content: content.content
      };
    } catch (error) {
      console.warn(`Info content not found for ${cardId}:`, error);
      return {
        title: 'Πληροφορίες',
        content: 'Περισσότερες πληροφορίες για αυτή την κατηγορία.'
      };
    }
  };

  // Get current cards to display
  const getCurrentCards = (): readonly CardConfig[] => {
    if (!showNextSteps) {
      return getCardsForStep('category');
    }

    if (selectedCategory === 'property') {
      return getCardsForStep('property');
    }

    if (selectedCategory === 'job') {
      return getCardsForStep('job');
    }

    return getCardsForStep('category');
  };

  const currentCards = getCurrentCards();

  // Render current cards with BaseCard components
  const renderCards = (cards: readonly CardConfig[]) => {
    return cards.map((cardConfig) => {
      const IconComponent = cardConfig.icon;

      return (
        <BaseCard
          key={cardConfig.id}
          variant={cardConfig.variant}
          title={cardConfig.title}
          icon={<IconComponent size="sm" theme="neutral" />}
          onClick={() => handleCardClick(cardConfig)}
          onInfoClick={() => handleInfoClick(cardConfig.id)}
          data-testid={`card-${cardConfig.id}`}
        />
      );
    });
  };

  // Enterprise Info Panel Component με LEGO system
  const InfoPanelComponent: React.FC<{
    cardId: CardId;
    onClose: () => void;
    getInfoContent: (cardId: CardId) => Promise<{ title: string; content: string }>;
  }> = ({ cardId, onClose, getInfoContent }) => {
    const [infoData, setInfoData] = React.useState<{ title: string; content: string } | null>(null);

    React.useEffect(() => {
      getInfoContent(cardId).then(setInfoData);
    }, [cardId, getInfoContent]);

    if (!infoData) return null;

    // Determine theme based on card category
    const cardConfig = cardData.category.find(c => c.id === cardId) ||
                      cardData.property.find(c => c.id === cardId) ||
                      cardData.job.find(c => c.id === cardId);

    const isPropertyCard = cardConfig?.category === 'property' || cardId === 'property' || cardId === 'sale' || cardId === 'rent';
    const theme = isPropertyCard ? INFO_PANEL_THEMES.property : INFO_PANEL_THEMES.job;
    const mobileStyles = DEFAULT_INFO_PANEL_STYLES.mobile;

    return (
      <div
        style={{
          position: 'fixed',
          ...mobileStyles.position,
          ...theme,
          minHeight: 'auto',
          maxHeight: mobileStyles.maxHeight,
          overflow: mobileStyles.overflow,
          zIndex: mobileStyles.zIndex,
          border: `1px solid ${theme.borderColor}`,
          boxShadow: theme.boxShadow
        }}
        onClick={onClose}
      >
        <strong style={{ fontSize: '14px', color: '#fff' }}>
          {infoData.title}
        </strong>
        <br/><br/>
        <div
          style={{ fontSize: '12px', lineHeight: '1.4' }}
          dangerouslySetInnerHTML={{ __html: infoData.content }}
        />
      </div>
    );
  };

  return (
    <>
      {/* Initial Cards */}
      <div style={containerStyles}>
        {renderCards(currentCards)}
      </div>

      {/* Next Step Cards */}
      {showNextSteps && selectedCategory && (
        <div style={nextStepContainerStyles}>
          {renderCards(currentCards)}
        </div>
      )}

      {/* Info Panels - Enterprise LEGO System */}
      {Object.entries(infoStates).map(([cardId, isVisible]) => {
        if (!isVisible) return null;

        return (
          <InfoPanelComponent
            key={`info-${cardId}`}
            cardId={cardId as CardId}
            onClose={() => handleInfoClick(cardId as CardId)}
            getInfoContent={getInfoContent}
          />
        );
      })}
    </>
  );
};