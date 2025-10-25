/**
 * CategoryStep.tsx - Enterprise Modular Category Step
 *
 * Καθαρό modular category step που δείχνει τις 2 κάρτες (Ακίνητα/Εργασία)
 *
 * ⚠️  TEMPORARY BRIDGE: Προς το παρόν ενημερώνει ΚΑΙ το NavigationService (deprecated)
 * ΚΑΙ το StepOrchestrator (νέο system) για compatibility με FloatingStepper/UnifiedPipeline.
 * Μόλις ολοκληρωθεί η migration, θα αφαιρεθεί το NavigationService dependency.
 */

import React, { useCallback, useState } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { BaseCard } from '@layera/cards';
import { VillaIcon, BriefcaseIcon } from '@layera/icons';
// REMOVED: useNavigation - Replaced με StepOrchestrator για clean enterprise architecture
import { InfoPanel } from '@layera/info-panels';
import {
  GEOALERT_INFO_CONTENT,
  StaticContentProvider
} from '@layera/info-panels';
import { useGeoAlertLayout } from '@layera/layout';
import type { StepProps, CategoryType } from '../types';

export interface CategoryStepProps extends StepProps {
  /** Category selection callback */
  onCategorySelected?: (category: CategoryType) => void;
}

/**
 * Enterprise Category Step - Καθαρό modular component για Category επιλογή
 */
export const CategoryStep: React.FC<CategoryStepProps> = ({
  context,
  onNext,
  onStepComplete,
  onCategorySelected,
  isVisible = true,
  deviceProps = {}
}) => {
  const { t } = useLayeraTranslation();
  // REMOVED: useNavigation hook - Clean enterprise architecture με μόνο StepOrchestrator

  // Enterprise LEGO Layout System
  const { utils } = useGeoAlertLayout();

  // Info Panel state
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [currentInfoCard, setCurrentInfoCard] = useState<'property' | 'job' | null>(null);

  // Info content provider
  const infoContentProvider = React.useMemo(() =>
    new StaticContentProvider(GEOALERT_INFO_CONTENT),
    []
  );

  // Handle info button clicks
  const handleInfoClick = useCallback((categoryId: 'property' | 'job') => {
    console.log(`🔍 CategoryStep: Info clicked for ${categoryId}`);
    setCurrentInfoCard(categoryId);
    setShowInfoPanel(true);

    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
  }, []);

  // Get info content για specific card
  const getInfoContent = useCallback((cardId: 'property' | 'job') => {
    console.log(`🔍 CategoryStep: Getting content for ${cardId}`);
    try {
      const content = infoContentProvider.getContent(cardId);
      console.log(`✅ CategoryStep: Content found for ${cardId}:`, content);
      return content;
    } catch (error) {
      console.warn(`❌ CategoryStep: Info content not found for card: ${cardId}`, error);
      return {
        title: 'Πληροφορίες',
        content: 'Δεν υπάρχουν διαθέσιμες πληροφορίες για αυτή την επιλογή.',
        type: 'info' as const
      };
    }
  }, [infoContentProvider]);

  // TEMPORARY bridge handler - ενημερώνει ΚΑΙ StepOrchestrator ΚΑΙ NavigationService
  const handleCategorySelection = useCallback(async (category: CategoryType) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🎯 CATEGORY UI: Selected category: ${category}`);
    }

    try {
      // 1. ENTERPRISE CLEAN: Μόνο StepOrchestrator για clean architecture
      if (onStepComplete) {
        onStepComplete('category', {
          selectedCategory: category
        });
      }

      // 2. Legacy callback
      onCategorySelected?.(category);

      // 3. CLEAN ENTERPRISE NAVIGATION: Μόνο StepOrchestrator
      onNext?.();

    } catch (error) {
      console.error('Category selection failed:', error);
    }
  }, [navigation, onStepComplete, onCategorySelected]);

  if (!isVisible) {
    return null;
  }

  // Enterprise LEGO Layout με CSS variables
  const containerStyles = utils.getCardStyles('horizontal');
  const containerClass = utils.getCardContainerClass('horizontal');

  return (
    <>
    <div style={containerStyles} className={containerClass}>
      {/* Ακίνητα Card */}
      <BaseCard
        variant="property"
        title="Ακίνητα"
        icon={<VillaIcon size="sm" theme="neutral" />}
        onClick={() => handleCategorySelection('property')}
        onInfoClick={() => handleInfoClick('property')}
        data-testid="category-card-property"
      />

      {/* Εργασία Card */}
      <BaseCard
        variant="job"
        title="Εργασία"
        icon={<BriefcaseIcon size="sm" theme="neutral" />}
        onClick={() => handleCategorySelection('job')}
        onInfoClick={() => handleInfoClick('job')}
        data-testid="category-card-job"
      />
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
        selectedCategory={currentInfoCard}
      />
    )}
  </>
  );
};