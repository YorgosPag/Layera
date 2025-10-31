/**
 * AreaMethodStep.tsx - Μέθοδος Εμβαδού (Area Method) - Enterprise Modular Step
 *
 * Καθαρό modular step που διαχειρίζεται τις μεθόδους υπολογισμού εμβαδού.
 *
 * 🔮 ΜΕΛΛΟΝΤΙΚΗ ΕΝΣΩΜΑΤΩΣΗ LEGO GEO ΣΥΣΤΗΜΑΤΩΝ:
 * Όταν φτάσει η ώρα, αυτό το step θα ενσωματώσει πλήρως τα @layera LEGO συστήματα:
 * - @layera/geo-drawing για calculations (calculateProjectedArea, formatArea)
 * - @layera/snap-engine για professional snapping
 * - @layera/snap-interactions για interactive measurement UI
 *
 * ΠΡΟΣ ΤΟ ΠΑΡΟΝ: Working functionality με βασικές κάρτες επιλογής μεθόδου.
 * ΜΕΛΛΟΝ: Professional measurement interface με πλήρη LEGO integration.
 */

import React, { useCallback, useState } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { Box } from '@layera/layout';
import { SPACING_SCALE } from '@layera/constants';
import { AreaMethodCard } from './AreaMethodCard';
import { InteractiveAreaMeasurement } from './InteractiveAreaMeasurement';
import type { StepProps } from '../types';
import type { AreaMethodType, AreaMethodStepData, AreaMethodOption } from './types';

export interface AreaMethodStepProps extends StepProps {
  /** Area method selection callback */
  onAreaMethodSelected?: (method: AreaMethodType) => void;
}

/**
 * Enterprise Area Method Step - Καθαρό modular component για Area Method επιλογή
 */
export const AreaMethodStep: React.FC<AreaMethodStepProps> = ({
  context,
  onNext,
  onStepComplete,
  onAreaMethodSelected,
  isVisible = true,
  deviceProps = {}
}) => {
  const { t } = useLayeraTranslation();
  const [selectedMethod, setSelectedMethod] = useState<AreaMethodType | null>(null);
  const [showInteractiveMeasurement, setShowInteractiveMeasurement] = useState(false);

  const areaMethods: AreaMethodOption[] = [
    {
      id: 'manual',
      title: 'Χειροκίνητα',
      description: 'Εισάγετε το εμβαδόν μόνοι σας',
      isRecommended: false
    },
    {
      id: 'map',
      title: 'Από Χάρτη',
      description: 'Υπολογισμός με σχεδίαση πολυγώνου',
      isRecommended: true
    },
    {
      id: 'floorplan',
      title: 'Από Κάτοψη',
      description: 'Ανέβασμα κάτοψης και υπολογισμός',
      isRecommended: false
    },
    {
      id: 'auto',
      title: 'Αυτόματος',
      description: 'Αυτόματος υπολογισμός από OSM δεδομένα',
      isRecommended: false
    }
  ];

  const handleAreaMethodSelection = useCallback(async (method: AreaMethodType) => {
    setSelectedMethod(method);

    try {
      // Για map method, δείχνουμε το interactive measurement
      if (method === 'map') {
        setShowInteractiveMeasurement(true);
        return; // Δεν προχωράμε ακόμα - περιμένουμε το measurement
      }

      // Για άλλες μεθόδους, προχωράμε αμέσως
      await completeStep(method, null);

    } catch (error) {
      console.error('Area method selection failed:', error);
    }
  }, []);

  const completeStep = useCallback(async (method: AreaMethodType, measuredArea: number | null) => {
    try {
      console.log('🚀 AreaMethodStep: Completing step with method:', method, 'area:', measuredArea);

      // Ενημερώνουμε το StepOrchestrator
      if (onStepComplete) {
        const stepData: AreaMethodStepData = {
          selectedMethod: method,
          calculatedArea: measuredArea || undefined
        };
        console.log('🚀 AreaMethodStep: Calling onStepComplete with data:', stepData);
        onStepComplete('areaMethod', stepData);
      }

      // Legacy callback
      onAreaMethodSelected?.(method);

      // Auto-advance
      console.log('🚀 AreaMethodStep: Auto-advancing to next step in 300ms...');
      setTimeout((): void => {
        console.log('🚀 AreaMethodStep: Calling onNext()');
        onNext?.();
      }, 300);

    } catch (error) {
      console.error('Area method completion failed:', error);
    }
  }, [onStepComplete, onAreaMethodSelected, onNext]);

  const handleMeasurementComplete = useCallback((area: number) => {
    setShowInteractiveMeasurement(false);
    completeStep('map', area);
  }, [completeStep]);

  const handleMeasurementCancel = useCallback(() => {
    setShowInteractiveMeasurement(false);
    setSelectedMethod(null);
  }, []);

  if (!isVisible) {
    return null;
  }

  const containerStyles: React.CSSProperties = {
    position: 'fixed',
    top: `${SPACING_SCALE.LAYOUT_XXL}px`, // Equivalent to 120px
    left: `${SPACING_SCALE.LG}px`,        // Equivalent to 20px
    right: `${SPACING_SCALE.LG}px`,       // Equivalent to 20px
    zIndex: 10002,
    display: 'flex',
    flexDirection: 'column',
    gap: `${SPACING_SCALE.MD}px`,         // Equivalent to 16px
    padding: '0'
  };

  // Αν δείχνουμε interactive measurement, δείχνουμε μόνο αυτό
  if (showInteractiveMeasurement) {
    return (
      <InteractiveAreaMeasurement
        onComplete={handleMeasurementComplete}
        onCancel={handleMeasurementCancel}
        style={containerStyles}
      />
    );
  }

  return (
    <Box style={containerStyles}>
      {areaMethods.map((method: AreaMethodOption) => (
        <AreaMethodCard
          key={method.id}
          method={method.id}
          title={method.title}
          description={method.description}
          isRecommended={method.isRecommended}
          variant={context.selectedCategory || 'property'}
          onClick={(): void => handleAreaMethodSelection(method.id)}
          data-testid={`area-method-card-${method.id}`}
        />
      ))}
    </Box>
  );
};