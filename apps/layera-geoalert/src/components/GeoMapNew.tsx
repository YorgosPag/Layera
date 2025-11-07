/**
 * GeoMapNew.tsx - Enterprise Refactored Map Component
 *
 * Αντικαθιστά το monolithic GeoMap.tsx με modular architecture.
 * Χρησιμοποιεί @layera/map-core και @layera/geo-drawing packages.
 */

import React, { useState, useMemo } from 'react';
import { useViewportWithOverride } from '@layera/viewport';
// 🚀 ENTERPRISE: StepOrchestrator - ΜΟΝΑΔΙΚΗ Single Source of Truth
import type { StepId, CategoryType, IntentType, StepContext } from './steps/types';
import { stepRegistry } from './steps/StepRegistry';
import { useStepNavigation } from './steps/StepOrchestrator';
// REMOVED: device-layouts package - simplified to pure responsive
import { MapContainer } from './map/MapContainer';
import { PlusIcon } from '@layera/icons';
import { Box } from '@layera/layout';
// REMOVED: UnifiedFAB - FAB functionality moved to header button
import { CONFIG, SPACING_SCALE, PIPELINE_STEP, CSS_DESIGN_TOKENS, getCardInfoBorder } from '@layera/constants';
import { COLORS } from '../constants';
import { useLayeraTranslation } from '@layera/tolgee';
import { CategoryStep } from './steps/category/CategoryStep';
import { StepOrchestrator } from './steps/StepOrchestrator';
// Import για auto-registration των modular steps
import './steps/category';
import './steps/intent';
import './steps/transactionType';
import './steps/availability';
import './steps/upload';
import './steps/layout';
import './steps/propertyType';
import './steps/propertyDetails';
import './steps/areaMethod';
import './steps/location';
import './steps/employmentType';
import './steps/occupation';
import './steps/availabilityDetails';
import './steps/pricing';
import './steps/review';
import './steps/complete';
import { DesktopGeoMap } from './device-specific/DesktopGeoMap';
import { TabletGeoMap } from './device-specific/TabletGeoMap';

interface DrawnArea {
  id: string;
  type: 'polygon' | 'marker';
  coordinates: number[][];
  name: string;
  nameTemplate?: string;
  nameNumber?: number;
  area?: number;
  category: 'real_estate' | 'jobs';
  isVisible?: boolean;
  opacity?: number;
  metadata?: {
    price?: number;
    squareMeters?: number;
    rooms?: number;
    propertyType?: string;
    salary?: number;
    workingHours?: string;
    company?: string;
    jobType?: string;
  };
}

interface MapComponentProps {
  onAreaCreated?: (area: DrawnArea) => void;
  onNewEntryClick?: () => void;
  isMobileDevice: boolean;
  hideDrawingControls: boolean;
}

interface GeoMapProps {
  onAreaCreated?: (area: DrawnArea) => void;
  onNewEntryClick?: () => void;
  onStepNavigationReady?: (navProps: { onPrevious: () => void; canGoBack: boolean }) => void; // 🧡 ΠΡΟΣΩΡΙΝΟ: Εξαγωγή step navigation
  // REMOVED: Legacy unified pipeline props
  onCategoryElementsChange?: (show: boolean) => void;
  showCategoryElements?: boolean;
  // REMOVED: isResponsiveMode - always responsive now
}

export const GeoMap: React.FC<GeoMapProps> = ({
  onAreaCreated,
  onNewEntryClick,
  onStepNavigationReady, // 🧡 ΠΡΟΣΩΡΙΝΟ: Step navigation callback
  // REMOVED: Legacy unified pipeline destructuring
  onCategoryElementsChange,
  showCategoryElements: showCatEls = false
  // REMOVED: isResponsiveMode parameter
}) => {
  const { isDesktop, isTablet, isMobile } = useViewportWithOverride();
  const { t } = useLayeraTranslation();




  // ✅ ENTERPRISE NAVIGATION: StepOrchestrator integration - SINGLE SOURCE OF TRUTH
  // 🎯 StepContext state - ΜΟΝΑΔΙΚΗ ΠΗΓΗ ΑΛΗΘΕΙΑΣ
  const [stepContext, setStepContext] = useState<StepContext>({
    currentStepId: 'category',
    selectedCategory: null,
    selectedIntent: null,
    selectedTransactionType: null,
    selectedEmploymentType: null,
    selectedOccupation: null,
    selectedLocation: null,
    selectedDetails: null,
    selectedPricing: null,
    selectedReview: null,
    completedSteps: new Set(),
    featureFlags: {},
    customData: {}
  });

  // 🎯 Get available steps από stepRegistry - ΜΟΝΑΔΙΚΗ ΠΗΓΗ ΑΛΗΘΕΙΑΣ
  const availableSteps = useMemo(() => {
    return stepRegistry.getAvailableSteps(stepContext);
  }, [stepContext]);

  // 🎮 Navigation state από useStepNavigation hook - ΜΟΝΑΔΙΚΗ ΠΗΓΗ ΑΛΗΘΕΙΑΣ
  const navigationState = useStepNavigation(availableSteps, stepContext.currentStepId);

  // Build navigation object βάσει DeviceLayoutRenderer requirements
  const navigation = {
    currentStep: stepContext.currentStepId,
    stepIndex: navigationState.stepIndex,
    totalSteps: navigationState.totalSteps,
    selectedCategory: stepContext.selectedCategory,
    canGoNext: navigationState.canGoNext,
    canGoBack: navigationState.canGoPrevious,
    reset: () => {
      setStepContext({
        currentStepId: 'category',
        selectedCategory: null,
        selectedIntent: null,
        selectedTransactionType: null,
        selectedEmploymentType: null,
        selectedOccupation: null,
        selectedLocation: null,
        selectedDetails: null,
        selectedPricing: null,
        selectedReview: null,
        completedSteps: new Set(),
        featureFlags: {},
        customData: {}
      });
    }
  };

  // 🎯 onStepComplete handler για StepOrchestrator - ΜΟΝΑΔΙΚΗ ΠΗΓΗ ΑΛΗΘΕΙΑΣ
  const handleStepComplete = (stepId: StepId, data?: unknown) => {

    // ✅ StepContext update pattern από CategoryStep
    if (stepId === 'category' && data && typeof data === 'object' && 'selectedCategory' in data) {
      const newCategory = data.selectedCategory as CategoryType;


      setStepContext(prev => ({
        ...prev,
        selectedCategory: newCategory,
        completedSteps: new Set([...prev.completedSteps, stepId])
      }));
    } else if (stepId === 'intent' && data && typeof data === 'object' && 'selectedIntent' in data) {

      setStepContext(prev => ({
        ...prev,
        selectedIntent: data.selectedIntent as IntentType,
        completedSteps: new Set([...prev.completedSteps, stepId])
      }));
    } else if (stepId === 'propertyType' && data && typeof data === 'object' && 'selectedPropertyType' in data) {

      setStepContext(prev => ({
        ...prev,
        customData: {
          ...prev.customData,
          selectedPropertyType: data.selectedPropertyType
        },
        completedSteps: new Set([...prev.completedSteps, stepId])
      }));
    } else {
      // Generic completion tracking - ΜΟΝΑΔΙΚΗ ΠΗΓΗ ΑΛΗΘΕΙΑΣ

      setStepContext(prev => ({
        ...prev,
        completedSteps: new Set([...prev.completedSteps, stepId])
      }));
    }
  };

  // 🧡 ΠΡΟΣΩΡΙΝΟ: Stable onPrevious callback για step navigation
  const onPreviousCallback = React.useCallback(() => {
    // ✅ StepOrchestrator navigation logic - ΜΟΝΑΔΙΚΗ ΠΗΓΗ ΑΛΗΘΕΙΑΣ
    const previousStep = navigationState.previousStep;
    if (previousStep) {
      setStepContext(prev => ({
        ...prev,
        currentStepId: previousStep.id
      }));
    }
  }, [navigationState.previousStep]);

  // 🎮 Navigation handlers που χρειάζονται από DeviceLayoutRenderer
  // ✅ ΜΟΝΑΔΙΚΕΣ ΠΗΓΕΣ ΑΛΗΘΕΙΑΣ: StepOrchestrator + DeviceLayoutRenderer pattern
  const navigationHandlersProps = {
    onNext: () => {
      // ✅ StepOrchestrator navigation logic - ΜΟΝΑΔΙΚΗ ΠΗΓΗ ΑΛΗΘΕΙΑΣ
      const nextStep = navigationState.nextStep;
      if (nextStep) {
        setStepContext(prev => ({
          ...prev,
          currentStepId: nextStep.id
        }));
      }
    },
    onPrevious: onPreviousCallback,
    onReset: navigation.reset,
    onStepClick: (stepId: StepId) => {
      // ✅ Direct step navigation - DeviceLayoutRenderer pattern
      setStepContext(prev => ({
        ...prev,
        currentStepId: stepId
      }));
    },
    onStepChange: (stepId: StepId) => {
      // ✅ ΚΡΙΣΙΜΗ ΠΡΟΣΘΗΚΗ: StepOrchestrator auto-advance navigation
      setStepContext(prev => ({
        ...prev,
        currentStepId: stepId
      }));
    },
    selectCategory: async (categoryId: string) => {

      // ✅ CategoryStep completion pattern - ΜΟΝΑΔΙΚΗ ΠΗΓΗ ΑΛΗΘΕΙΑΣ
      setStepContext(prev => ({
        ...prev,
        selectedCategory: categoryId as CategoryType,
        completedSteps: new Set([...prev.completedSteps, 'category'])
      }));
    },
    onStepComplete: handleStepComplete // ✅ StepOrchestrator integration - ΜΟΝΑΔΙΚΗ ΠΗΓΗ ΑΛΗΘΕΙΑΣ
  };

  // 🧡 ΠΡΟΣΩΡΙΝΟ: Update step navigation when it changes
  React.useEffect(() => {
    if (onStepNavigationReady) {
      onStepNavigationReady({
        onPrevious: onPreviousCallback,
        canGoBack: navigation.canGoBack
      });
    }
  }, [onStepNavigationReady, navigation.canGoBack]);


  const handleNewEntryClick = (): void => { onNewEntryClick?.(); };

  // REMOVED: handleFabClick - button moved to header

  // 🚀 ΦΑΣΗ 6: Enterprise Device Layout LEGO Package - ΜΟΝΑΔΙΚΗ ΠΗΓΗ ΑΛΗΘΕΙΑΣ
  // CRITICAL FIX: Removing all useMemo to stop infinite loops
  // Mobile device detection για responsive layout
  const deviceType = isDesktop ? 'desktop' : (isTablet ? 'tablet' : 'mobile');

  const mapProps = {
    onAreaCreated,
    onNewEntryClick,
    isMobileDevice: !isDesktop && !isTablet, // SST-based device detection
    hideDrawingControls: !CONFIG.features?.drawingControls ?? false
  };

  // ΣΤΑΘΕΡΑ Components για αποφυγή re-render loops
  const DesktopMapComponent = React.useCallback((props: MapComponentProps) => (
    <>
      <DesktopGeoMap />
      <MapContainer {...props} />
    </>
  ), []);

  const TabletMapComponent = React.useCallback((props: MapComponentProps) => (
    <>
      <TabletGeoMap />
      <MapContainer {...props} />
    </>
  ), []);

  const MobileMapComponent = React.useCallback((props: MapComponentProps) => (
    <MapContainer {...props} />
  ), []);

  const mapComponents = {
    desktop: DesktopMapComponent,
    tablet: TabletMapComponent,
    mobile: MobileMapComponent
  };


  // 🚫 Διαγραφή navigationProps - είναι duplicate του navigation object

  // 🚫 Διαγραφή handleStepClick - υλοποιείται στο navigationHandlersProps.onStepClick

  // 🚫 Διαγραφή παλιού navigationHandlersProps που αναφέρεται σε ανύπαρκτα handles
  // Χρησιμοποιούμε το νέο που βασίζεται στις υπάρχουσες μοναδικές πηγές αλήθειας

  return (
    <Box position="relative" width="full" height="full">
      {/* Simplified responsive layout - removed device-specific layouts */}
      <Box width="full" height="full">
        <MapContainer {...mapProps} />
      </Box>

      {/* StepOrchestrator - διαχειρίζεται όλα τα steps */}
      {showCatEls && (
        <Box
          position="fixed"
          style={{
            inset: 0, // σωστό πλήρες κάλυμμα
            backgroundColor: 'var(--la-overlay-background)', // 🎯 SST: CSS Token - Μοναδική πηγή αλήθειας
            backdropFilter: `blur(var(--la-blur-xs))`, // 🎯 SST: CSS Token - Μοναδική πηγή αλήθειας
            zIndex: 'var(--la-z-index-modal)', // 🎯 SST: CSS Token - Μοναδική πηγή αλήθειας
            padding: 'var(--la-space-lg)', // 🎯 SST: CSS Token - Μοναδική πηγή αλήθειας
            overflowY: 'auto',
            scrollbarGutter: 'stable both-edges', // αποφεύγει οπτικό drift
            display: 'flex',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
            border: 'var(--la-border-width-md) solid var(--la-card-border-color)' // 🎯 SST: CSS Token - Μοναδική πηγή αλήθειας
          }}
        >
          <StepOrchestrator
            currentStepId={stepContext.currentStepId}
            selectedCategory={stepContext.selectedCategory}
            selectedIntent={stepContext.selectedIntent}
            quickSearchMode={true}
            selectedTransactionType={stepContext.selectedTransactionType}
            selectedEmploymentType={stepContext.selectedEmploymentType}
            selectedOccupation={stepContext.selectedOccupation}
            selectedLocation={stepContext.selectedLocation}
            selectedDetails={stepContext.selectedDetails}
            selectedPricing={stepContext.selectedPricing}
            selectedReview={stepContext.selectedReview}
            completedSteps={stepContext.completedSteps}
            onStepChange={undefined} // 🚫 DISABLE onStepChange σε quickSearchMode
            onStepComplete={navigationHandlersProps.onStepComplete}
          />
        </Box>
      )}

      {/* FAB functionality moved to header button */}
    </Box>
  );
};