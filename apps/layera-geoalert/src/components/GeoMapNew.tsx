/**
 * GeoMapNew.tsx - Enterprise Refactored Map Component
 *
 * Αντικαθιστά το monolithic GeoMap.tsx με modular architecture.
 * Χρησιμοποιεί @layera/map-core και @layera/geo-drawing packages.
 */

import React, { useState } from 'react';
import { useViewportWithOverride } from '@layera/viewport';
import { useNavigation } from '../services/navigation/hooks/useNavigation';
import { useIPhone14ProMaxDetection } from '@layera/device-detection';
import { useNavigationHandlers } from '@layera/navigation-handlers';
import { ResponsiveMapLayout, MapComponentProps } from '@layera/device-layouts';
import { MapContainer } from './map/MapContainer';
import { PlusIcon } from './icons/LayeraIcons';
import { DraggableFAB } from '@layera/draggable-fab';
import { UnifiedFAB } from '@layera/floating-action-buttons';
import {
  GeoMap as iPhone14ProMaxGeoMap,
  FloatingStepper as iPhone14ProMaxFloatingStepper,
  CategoryStep as iPhone14ProMaxCategoryStep
} from './device-specific/mobile/iphone-14-pro-max';
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
  showUnifiedPipeline?: boolean;
  onCloseUnifiedPipeline?: () => void;
  onSubmitUnifiedPipeline?: (data: any) => void;
  isIPhone14ProMaxDevice?: boolean;
  onCategoryElementsChange?: (show: boolean) => void;
}

export const GeoMap: React.FC<GeoMapProps> = ({
  onAreaCreated,
  onNewEntryClick,
  showUnifiedPipeline,
  onCloseUnifiedPipeline,
  onSubmitUnifiedPipeline,
  isIPhone14ProMaxDevice = false,
  onCategoryElementsChange
}) => {
  const { isDesktop, isTablet, isMobile } = useViewportWithOverride();

  // 🚀 ENTERPRISE DEVICE DETECTION: @layera/device-detection LEGO package
  const isDetectedIPhone14ProMax = useIPhone14ProMaxDetection({
    frameSelector: '.device-frame-wrapper',
    enableWindowFallback: true,
    enableUserAgentFallback: true
  });

  // Hybrid approach: χρησιμοποιώ το prop από App.tsx αλλά με fallback το LEGO detection
  const finalIPhone14ProMaxDecision = isIPhone14ProMaxDevice || isDetectedIPhone14ProMax;

  // 🚀 ENTERPRISE NAVIGATION: Rock-solid service που δεν σπάει ποτέ
  const navigation = useNavigation();

  // 🚀 ENTERPRISE NAVIGATION HANDLERS: @layera/navigation-handlers LEGO package
  const {
    handleStepNext,
    handleStepPrevious,
    handleStepReset,
    handleNewEntryClick,
    state: navigationState
  } = useNavigationHandlers({
    navigation,
    isSpecialDevice: finalIPhone14ProMaxDecision,
    onCategoryElementsChange,
    onNewEntryClick
  });

  // Enterprise state από LEGO package
  const showCategoryElements = navigationState.showCategoryElements;

  // 🚀 ΦΑΣΗ 6: Enterprise Device Layout LEGO Package - ΜΟΝΑΔΙΚΗ ΠΗΓΗ ΑΛΗΘΕΙΑΣ
  // CRITICAL FIX: Removing all useMemo to stop infinite loops
  const deviceType = finalIPhone14ProMaxDecision ? 'iphone' : (isDesktop ? 'desktop' : (isTablet ? 'tablet' : 'mobile'));

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
    category: iPhone14ProMaxCategoryStep
  };

  const navigationProps = {
    currentStep: navigation.currentStep,
    totalSteps: navigation.totalSteps,
    stepIndex: navigation.stepIndex,
    selectedCategory: navigation.selectedCategory,
    canGoNext: navigation.canGoNext,
    canGoBack: navigation.canGoBack
  };

  // 🚀 ENTERPRISE STEP CLICK HANDLER: Back button synchronization με κάρτες
  const handleStepClick = (stepIndex: number) => {
    console.log('🔄 Step click navigation:', { stepIndex, currentStep: navigation.currentStep });

    // Το PipelineDiscovery έχει ήδη ενημερωθεί από το FloatingStepper
    // Εδώ μπορούμε να προσθέσουμε επιπλέον logic αν χρειάζεται

    // TODO: Μελλοντικά μπορεί να χρειαστεί συγχρονισμός με cards state
    // Για τώρα το PipelineDiscovery αναλαμβάνει τον συγχρονισμό
  };

  const navigationHandlersProps = {
    onNext: handleStepNext,
    onPrevious: handleStepPrevious,
    onReset: handleStepReset,
    onStepClick: handleStepClick,
    onNewEntryClick: handleNewEntryClick
  };


  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <ResponsiveMapLayout
        deviceType={deviceType}
        map={mapProps}
        mapComponents={mapComponents}
        iPhoneComponents={iPhoneComponents}
        navigation={navigationProps}
        navigationHandlers={navigationHandlersProps}
        showCategoryElements={showCategoryElements}
      />

      {/*
        ΚΡΙΣΙΜΗ ΛΥΣΗ ΓΙΑ FAB VISIBILITY ISSUE:
        Το FAB renderάρεται ΕΞΩ από το ResponsiveMapLayout για αποφυγή
        infinite re-rendering cycles που προκαλούσαν εξαφάνιση του FAB
        στο iPhone 14 Pro Max. Αυτή η αρχιτεκτονική λύνει το πρόβλημα
        με τη χωριστή απόδοση ευθυνών:
        - ResponsiveMapLayout: Device layout orchestration
        - Parent component: FAB rendering και positioning
      */}
      {!showCategoryElements && (
        deviceType === 'iphone' ? (
          <DraggableFAB
            onClick={handleNewEntryClick}
            size="lg"
            position="viewport-relative"
            constrainToViewport={true}
            viewportSelector="#geo-viewport, [data-viewport-frame]"
            data-testid="iphone-draggable-fab"
            aria-label="Νέα Καταχώρηση"
            title="Νέα Καταχώρηση"
          >
            <PlusIcon size="md" theme="neutral" />
          </DraggableFAB>
        ) : (
          <UnifiedFAB
            onClick={handleNewEntryClick}
            icon={<PlusIcon size="md" theme="neutral" />}
            deviceType={deviceType}
            variant="success"
            hidden={false}
            aria-label="Νέα Καταχώρηση"
            title="Νέα Καταχώρηση"
            data-testid={`${deviceType}-unified-fab`}
          />
        )
      )}
    </div>
  );
};