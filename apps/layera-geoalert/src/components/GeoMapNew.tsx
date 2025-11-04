/**
 * GeoMapNew.tsx - Enterprise Refactored Map Component
 *
 * Αντικαθιστά το monolithic GeoMap.tsx με modular architecture.
 * Χρησιμοποιεί @layera/map-core και @layera/geo-drawing packages.
 */

import React, { useState, useMemo } from 'react';
import { useViewportWithOverride } from '@layera/viewport';
// 🚀 ENTERPRISE: Single Source of Truth - Enhanced @layera/viewport
import { useIPhone14ProMaxDetection } from '@layera/viewport';
// 🚀 ENTERPRISE: StepOrchestrator - ΜΟΝΑΔΙΚΗ Single Source of Truth
import type { StepId, CategoryType, IntentType, StepContext } from './steps/types';
import { stepRegistry } from './steps/StepRegistry';
import { useStepNavigation } from './steps/StepOrchestrator';
// REMOVED: device-layouts package - simplified to pure responsive
import { MapContainer } from './map/MapContainer';
import { PlusIcon } from '@layera/icons';
import { Box } from '@layera/layout';
import { UnifiedFAB } from '@layera/floating-action-buttons';
// REMOVED: DraggableFAB - simplified to UnifiedFAB only
import { CONFIG, SPACING_SCALE, PIPELINE_STEP } from '@layera/constants';
import { COLORS } from '../constants';
import { useLayeraTranslation } from '@layera/tolgee';
import {
  GeoMap as iPhone14ProMaxGeoMap,
  FloatingStepper as iPhone14ProMaxFloatingStepper
} from './device-specific/mobile/iphone-14-pro-max';
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
import './steps/details';
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

interface GeoMapProps {
  onAreaCreated?: (area: DrawnArea) => void;
  onNewEntryClick?: () => void;
  // REMOVED: Legacy unified pipeline props
  isIPhone14ProMaxDevice?: boolean;
  onCategoryElementsChange?: (show: boolean) => void;
  showCategoryElements?: boolean;
  // REMOVED: isResponsiveMode - always responsive now
}

export const GeoMap: React.FC<GeoMapProps> = ({
  onAreaCreated,
  onNewEntryClick,
  // REMOVED: Legacy unified pipeline destructuring
  isIPhone14ProMaxDevice = false,
  onCategoryElementsChange,
  showCategoryElements: showCatEls = false
  // REMOVED: isResponsiveMode parameter
}) => {
  const { isDesktop, isTablet, isMobile } = useViewportWithOverride();
  const { t } = useLayeraTranslation();

  // 🚀 ENTERPRISE DEVICE DETECTION: @layera/viewport LEGO package - Single Source of Truth
  const isDetectedIPhone14ProMax = useIPhone14ProMaxDetection({
    frameSelector: '.device-frame-wrapper',
    enableWindowFallback: true,
    enableUserAgentFallback: true
  });

  // Hybrid approach: χρησιμοποιώ το prop από App.tsx αλλά με fallback το LEGO detection
  const finalIPhone14ProMaxDecision = isIPhone14ProMaxDevice || isDetectedIPhone14ProMax;

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
      setStepContext(prev => ({
        ...prev,
        selectedCategory: data.selectedCategory as CategoryType,
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
    onPrevious: () => {
      // ✅ StepOrchestrator navigation logic - ΜΟΝΑΔΙΚΗ ΠΗΓΗ ΑΛΗΘΕΙΑΣ
      const previousStep = navigationState.previousStep;
      if (previousStep) {
        setStepContext(prev => ({
          ...prev,
          currentStepId: previousStep.id
        }));
      }
    },
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

  const handleNewEntryClick = (): void => { onNewEntryClick?.(); };

  // REMOVED: handleFabClick - button moved to header

  // 🚀 ΦΑΣΗ 6: Enterprise Device Layout LEGO Package - ΜΟΝΑΔΙΚΗ ΠΗΓΗ ΑΛΗΘΕΙΑΣ
  // CRITICAL FIX: Removing all useMemo to stop infinite loops
  // 🔧 TEMPORARY: Force iPhone mode για testing IntentStep migration
  const deviceType = 'iphone'; // finalIPhone14ProMaxDecision ? 'iphone' : (isDesktop ? 'desktop' : (isTablet ? 'tablet' : 'mobile'));

  const mapProps = {
    onAreaCreated,
    onNewEntryClick,
    isIPhone14ProMaxDevice: finalIPhone14ProMaxDecision,
    hideDrawingControls: finalIPhone14ProMaxDecision
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
    iPhone: iPhone14ProMaxGeoMap,
    desktop: DesktopMapComponent,
    tablet: TabletMapComponent,
    mobile: MobileMapComponent
  };

  const iPhoneComponents = {
    stepper: iPhone14ProMaxFloatingStepper,
    category: CategoryStep, // ENABLED: Καθαρό enterprise CategoryStep
    orchestrator: StepOrchestrator
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
        <StepOrchestrator
          currentStepId={stepContext.currentStepId}
          selectedCategory={stepContext.selectedCategory}
          selectedIntent={stepContext.selectedIntent}
          selectedTransactionType={stepContext.selectedTransactionType}
          selectedEmploymentType={stepContext.selectedEmploymentType}
          selectedOccupation={stepContext.selectedOccupation}
          selectedLocation={stepContext.selectedLocation}
          selectedDetails={stepContext.selectedDetails}
          selectedPricing={stepContext.selectedPricing}
          selectedReview={stepContext.selectedReview}
          completedSteps={stepContext.completedSteps}
          onStepChange={navigationHandlersProps.onStepChange}
          onStepComplete={navigationHandlersProps.onStepComplete}
        />
      )}

      {/*
        ΚΡΙΣΙΜΗ ΛΥΣΗ ΓΙΑ FAB VISIBILITY & POSITIONING - ΜΗΝ ΠΕΙΡΑΞΕΙΣ:

        1. FAB VISIBILITY ISSUE FIX:
           Το FAB renderάρεται ΕΞΩ από το ResponsiveMapLayout για αποφυγή
           infinite re-rendering cycles που προκαλούσαν εξαφάνιση του FAB
           στο iPhone 14 Pro Max. Αυτή η αρχιτεκτονική λύνει το πρόβλημα
           με τη χωριστή απόδοση ευθυνών:
           - ResponsiveMapLayout: Device layout orchestration
           - Parent component: FAB rendering και positioning

        2. FAB POSITIONING LOGIC - ΤΕΛΙΚΗ ΛΥΣΗ:
           RESPONSIVE MODE (isResponsiveMode=true):
           - Χρησιμοποιεί spacing prop: { right: SPACING_SCALE.LG, bottom: SPACING_SCALE.XXXL }
           - FAB κεντραρισμένο στο κάτω μέρος της οθόνης
           - draggable=false, positionType='fixed' (σταθερή θέση)

           DEVICE FRAME MODE (isResponsiveMode=false):
           - Χρησιμοποιεί initialPosition: { x: 24, y: 24 }
           - FAB στην ΠΑΝΩ ΑΡΙΣΤΕΡΗ ΓΩΝΙΑ της οθόνης του κινητού
           - draggable=true, positionType='viewport-relative' (συρόμενο)
           - Το style prop ως fallback για την αρχική θέση

        3. 🔥 ENTERPRISE DRAGGABLE FUNCTIONALITY - ΤΕΛΙΚΗ WORKING SOLUTION:
           ⭐ RESPONSIVE MODE: UnifiedFAB από @layera/floating-action-buttons
           ⭐ DEVICE FRAME MODE: DraggableFAB από @layera/draggable-fab με:
              - position="viewport-relative" (ΚΡΙΣΙΜΟ!)
              - initialPosition={{ x: 24, y: 24 }}
              - viewportSelector=".device-screen"
              - constrainToViewport={true}
           ⭐ Viewport constraints: το DraggableFAB παραμένει μέσα στα όρια
           ⭐ Conditional rendering: διαφορετικό component ανά mode
           ⭐ Single Sources of Truth: δύο ειδικά LEGO components

        🚨🚨🚨 ΑΥΣΤΗΡΗ ΑΠΑΓΟΡΕΥΣΗ - ΜΗΝ ΑΓΓΙΞΕΙΣ ΠΟΤΕ ΞΑΝΑ! 🚨🚨🚨
        ❌ ΜΗΝ αντικαταστήσεις DraggableFAB με UnifiedFAB στο device mode
        ❌ ΜΗΝ αφαιρέσεις το position="viewport-relative" prop
        ❌ ΜΗΝ αλλάξεις το viewportSelector=".device-screen"
        ❌ ΜΗΝ προσθέσεις style={{ position: 'absolute' }} που σπάει το dragging
        ❌ ΜΗΝ αφαιρέσεις το constrainToViewport={true}

        ✅ ΤΕΛΙΚΗ ΛΕΙΤΟΥΡΓΟΥΣΑ ΚΑΤΑΣΤΑΣΗ - TESTED & WORKING:
        📱 Device Frame Mode → DraggableFAB (DRAGGABLE + VISIBLE)
        🖥️ Responsive Mode → UnifiedFAB (FIXED POSITIONING)

        🏆 ΕΠΙΤΕΥΓΜΑΤΑ: FAB εμφανίζεται στην πάνω αριστερή γωνία ΚΑΙ είναι draggable!

        🔥🔥🔥 ΤΕΛΙΚΗ WORKING SOLUTION - TESTED & WORKING (28 Oct 2025) 🔥🔥🔥

        ✅ ΚΡΙΣΙΜΑ REQUIREMENTS ΓΙΑ WORKING DRAG FUNCTIONALITY:

        1. 🎯 VITE ALIASES - ΑΠΑΡΑΙΤΗΤΑ ΓΙΑ HMR:
           vite.config.ts ΠΡΕΠΕΙ να περιέχει:
           '@layera/floating-action-buttons': resolve(__dirname, '../../packages/floating-action-buttons/src'),
           '@layera/draggable-fab': resolve(__dirname, '../../packages/draggable-fab/src'),
           ΧΩΡΙΣ αυτά το Vite διαβάζει old built versions!

        2. 🎯 MODE CONFIGURATION - ΚΡΙΣΙΜΟ:
           isResponsiveMode = false  // ← ΑΥΤΟ ΕΝΕΡΓΟΠΟΙΕΙ ΤΟ DraggableFAB
           isResponsiveMode = true   // ← ΑΥΤΟ ΕΝΕΡΓΟΠΟΙΕΙ ΤΟ UnifiedFAB (fixed positioning)

        3. 🎯 VIEWPORT SELECTOR - ΛΥΣΗ ΤΟΥ NULL FRAMEREF:
           viewportSelector="body"  // ← WORKING! Υπάρχει πάντα
           viewportSelector=".device-screen"  // ← BROKEN! Δεν υπάρχει στη σελίδα

        4. 🎯 DRAGGABLE FAB CONFIGURATION:
           <DraggableFAB
             position="viewport-relative"        // ← ΚΡΙΣΙΜΟ για movement
             viewportSelector="body"             // ← ΚΡΙΣΙΜΟ selector που υπάρχει
             constrainToViewport={true}          // ← Περιορίζει στα όρια
             initialPosition={{ x: 24, y: 24 }} // ← Αρχική θέση
           />

        🚨🚨🚨 ΑΠΟΛΥΤΗ ΑΠΑΓΟΡΕΥΣΗ - ΜΗΝ ΑΛΛΑΞΕΙΣ ΠΟΤΕ! 🚨🚨🚨
        ❌ ΜΗΝ αφαιρέσεις τα vite aliases για @layera/draggable-fab
        ❌ ΜΗΝ αλλάξεις isResponsiveMode = false σε true
        ❌ ΜΗΝ αλλάξεις viewportSelector="body" σε άλλο selector
        ❌ ΜΗΝ αλλάξεις position="viewport-relative"
        ❌ ΜΗΝ αφαιρέσεις constrainToViewport={true}

        ✅ ΤΕΛΙΚΗ WORKING STATE - PROVEN WORKING:
        📍 FAB Drag: Πορτοκαλί χρώμα + μετακίνηση + NO click
        📍 FAB Click: Πράσινο χρώμα + navigation + NO drag
        📍 Event Separation: 100% σωστό με capture phase + synthetic click suppression

        🏅 SUCCESS EVIDENCE: localhost.log με 76 "FrameRef is null" → ΛΥΘΗΚΕ με body selector
      */}
      {/* REMOVED: FAB button - moved to header */}
    </Box>
  );
};