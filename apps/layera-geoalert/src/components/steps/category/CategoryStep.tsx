/**
 * CategoryStep.tsx - Enterprise Modular Category Step
 *
 * Καθαρό modular category step που δείχνει τις 2 κάρτες (Ακίνητα/Εργασία)
 *
 * ⚠️  TEMPORARY BRIDGE: Προς το παρόν ενημερώνει ΚΑΙ το NavigationService (deprecated)
 * ΚΑΙ το StepOrchestrator (νέο system) για compatibility με FloatingStepper/UnifiedPipeline.
 * Μόλις ολοκληρωθεί η migration, θα αφαιρεθεί το NavigationService dependency.
 */

import React, { useCallback } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { BaseCard } from '../../device-specific/mobile/iphone-14-pro-max/components/BaseCard';
import { VillaIcon, BriefcaseIcon } from '@layera/icons';
import { useNavigation } from '../../../services/navigation/hooks/useNavigation';
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
  const navigation = useNavigation(); // TEMPORARY bridge until NavigationService removal

  // TEMPORARY bridge handler - ενημερώνει ΚΑΙ StepOrchestrator ΚΑΙ NavigationService
  const handleCategorySelection = useCallback(async (category: CategoryType) => {
    console.log(`🎯 CATEGORY UI: Selected category: ${category}`);

    try {
      // 1. TEMPORARY: Ενημερώνουμε το deprecated NavigationService για compatibility
      await navigation.selectCategory(category);

      // 2. Ενημερώνουμε το StepOrchestrator (το νέο system)
      if (onStepComplete) {
        onStepComplete('category', {
          selectedCategory: category
        });
      }

      // 3. Legacy callback
      onCategorySelected?.(category);

      // 4. TEMPORARY: Auto-advance μέσω NavigationService
      setTimeout(async () => {
        try {
          await navigation.goNext();
        } catch (error) {
          console.error('Navigation failed, StepOrchestrator will handle:', error);
        }
      }, 300);

    } catch (error) {
      console.error('Category selection failed:', error);
    }
  }, [navigation, onStepComplete, onCategorySelected]);

  if (!isVisible) {
    return null;
  }

  const containerStyles: React.CSSProperties = {
    position: 'fixed',
    top: '161px',
    left: '8px',
    right: '8px',
    zIndex: 10002,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '0'
  };

  return (
    <div style={containerStyles}>
      {/* Ακίνητα Card */}
      <BaseCard
        variant="property"
        title="Ακίνητα"
        icon={<VillaIcon size="sm" theme="neutral" />}
        onClick={() => handleCategorySelection('property')}
        data-testid="category-card-property"
      />

      {/* Εργασία Card */}
      <BaseCard
        variant="job"
        title="Εργασία"
        icon={<BriefcaseIcon size="sm" theme="neutral" />}
        onClick={() => handleCategorySelection('job')}
        data-testid="category-card-job"
      />
    </div>
  );
};