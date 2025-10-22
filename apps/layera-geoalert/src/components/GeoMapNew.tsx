/**
 * GeoMapNew.tsx - Enterprise Refactored Map Component
 *
 * Αντικαθιστά το monolithic GeoMap.tsx με modular architecture.
 * Χρησιμοποιεί @layera/map-core και @layera/map-drawing packages.
 */

import React, { useState } from 'react';
import { useViewportWithOverride } from '@layera/viewport';
import { MapContainer } from './map/MapContainer';
import { PlusIcon } from './icons/LayeraIcons';
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

export const GeoMap: React.FC<GeoMapProps> = (props) => {
  const {
    onAreaCreated,
    onNewEntryClick,
    showUnifiedPipeline,
    onCloseUnifiedPipeline,
    onSubmitUnifiedPipeline,
    isIPhone14ProMaxDevice = false,
    onCategoryElementsChange
  } = props;
  const { isDesktop, isTablet, isMobile } = useViewportWithOverride();

  // Debug viewport detection
  console.log('🔧 Viewport Detection:', { isDesktop, isTablet, isMobile });
  console.log('🎯 iPhone 14 Pro Max prop from App.tsx:', isIPhone14ProMaxDevice);
  console.log('🔍 Render Decision:', {
    isIPhone14ProMaxDevice,
    isDesktop,
    isTablet,
    isMobile,
    willRenderIPhoneMode: isIPhone14ProMaxDevice,
    willRenderDesktopMode: isDesktop && !isIPhone14ProMaxDevice,
    willRenderTabletMode: isTablet && !isIPhone14ProMaxDevice,
    willRenderMobileMode: !isDesktop && !isTablet && !isIPhone14ProMaxDevice
  });

  // Device detection για iPhone 14 Pro Max - SYNC με App.tsx διαστάσεις
  const detectiPhone14ProMax = (): boolean => {
    // Έλεγχος για device frame (κύριος τρόπος)
    const deviceFrameElement = document.querySelector('.device-frame-wrapper');
    const isInDeviceFrame = !!deviceFrameElement;

    let frameWidth = 0;
    let frameHeight = 0;

    if (isInDeviceFrame && deviceFrameElement) {
      const rect = deviceFrameElement.getBoundingClientRect();
      frameWidth = rect.width;
      frameHeight = rect.height;
    }

    // Εναλλακτικός έλεγχος με window dimensions
    const width = window.innerWidth;
    const height = window.innerHeight;

    console.log('🔍 Device Detection Debug:', {
      width,
      height,
      frameWidth,
      frameHeight,
      isInDeviceFrame,
      userAgent: navigator.userAgent,
      isFrameMatch: (frameWidth === 414 && frameHeight === 916) || (frameWidth >= 412 && frameWidth <= 416 && frameHeight >= 914 && frameHeight <= 920),
      isWindowMatch: (width === 430 && height === 932) || (width === 932 && height === 430),
      isUserAgent: /iPhone.*14.*Pro.*Max/i.test(navigator.userAgent)
    });

    // Χρησιμοποιώ την ίδια λογική με το App.tsx
    const isFrameBasedDetection = isInDeviceFrame &&
      ((frameWidth === 414 && frameHeight === 916) ||
       (frameWidth >= 412 && frameWidth <= 416 && frameHeight >= 914 && frameHeight <= 920));

    // Fallback για περιπτώσεις χωρίς device frame
    const isWindowBasedDetection = (width === 430 && height === 932) ||
           (width === 932 && height === 430) ||
           /iPhone.*14.*Pro.*Max/i.test(navigator.userAgent);

    return isFrameBasedDetection || (!isInDeviceFrame && isWindowBasedDetection);
  };

  // Χρησιμοποιώ το prop από App.tsx αντί για το δικό μου detection
  // const isIPhone14ProMaxDetected = detectiPhone14ProMax();
  console.log('📱 iPhone 14 Pro Max Detection Result (from App.tsx prop):', isIPhone14ProMaxDevice);

  // iPhone 14 Pro Max pipeline step management
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentStepId, setCurrentStepId] = useState('category');
  const [showCategoryElements, setShowCategoryElements] = useState(false);

  // Steps definition
  const steps = [
    { id: 'category', title: 'Κατηγορία' },
    { id: 'transactionType', title: 'Τύπος Συναλλαγής' },
    { id: 'location', title: 'Τοποθεσία' },
    { id: 'details', title: 'Λεπτομέρειες' },
    { id: 'availability', title: 'Διαθεσιμότητα' },
    { id: 'layout', title: 'Κάτοψη' },
    { id: 'complete', title: 'Ολοκλήρωση' }
  ];

  // Navigation handlers
  const handleStepNext = () => {
    if (currentStepIndex < steps.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      setCurrentStepId(steps[nextIndex].id);
      console.log('🔄 Step next:', steps[nextIndex]);
    }
  };

  const handleStepPrevious = () => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      setCurrentStepId(steps[prevIndex].id);
      console.log('🔄 Step previous:', steps[prevIndex]);
    }
  };

  const handleStepReset = () => {
    setCurrentStepIndex(0);
    setCurrentStepId('category');
    setShowCategoryElements(false); // Κρύψε τις κάρτες κατηγορίας
    onCategoryElementsChange?.(false); // Ενημέρωσε το parent component
    console.log('🔄 Step reset to beginning - FAB should reappear');
  };

  // Handler για το FAB button
  const handleNewEntryClick = () => {
    if (isIPhone14ProMaxDevice) {
      // Για iPhone: εμφάνιση των category elements
      const newState = !showCategoryElements;
      setShowCategoryElements(newState);
      onCategoryElementsChange?.(newState);
    } else {
      // Για άλλες συσκευές: κανονική συμπεριφορά
      onNewEntryClick?.();
    }
  };

  // iPhone 14 Pro Max specific rendering (χρησιμοποιώ το prop από App.tsx)
  if (isIPhone14ProMaxDevice) {
    console.log('🎯 Rendering iPhone 14 Pro Max with hidden drawing controls (via App.tsx prop)');
    return (
      <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
        {React.createElement(iPhone14ProMaxGeoMap, {
          onAreaCreated,
          onNewEntryClick,
          isIPhone14ProMaxDevice
        })}
        {/* FloatingStepper - εμφανίζεται μόνο όταν showCategoryElements = true */}
        {showCategoryElements && React.createElement(iPhone14ProMaxFloatingStepper, {
          currentStep: currentStepId,
          totalSteps: steps.length,
          stepIndex: currentStepIndex,
          onNext: handleStepNext,
          onPrevious: handleStepPrevious,
          onReset: handleStepReset,
          canGoNext: currentStepIndex < steps.length - 1,
          canGoPrevious: currentStepIndex > 0
        })}

        {/* CategoryStep - εμφανίζεται μόνο όταν showCategoryElements = true */}
        {showCategoryElements && React.createElement(iPhone14ProMaxCategoryStep, {
          isVisible: showCategoryElements,
          currentStepId: currentStepId, // Περνάω το current step ID
          onNext: (category: any) => {
            console.log('Category selected:', category);
            handleStepNext(); // Πάμε στο επόμενο step όταν επιλεγεί κατηγορία
          }
        })}

        {/* FAB για iPhone 14 Pro Max */}
        {(() => {
          const shouldShowFAB = (onNewEntryClick || isIPhone14ProMaxDevice) && !showCategoryElements;
          console.log('🎯 iPhone Mode FAB Debug:', {
            onNewEntryClick: !!onNewEntryClick,
            isIPhone14ProMaxDevice,
            showCategoryElements,
            shouldShowFAB
          });
          return shouldShowFAB;
        })() && (
          <div
            onClick={handleNewEntryClick}
            style={{
              position: 'fixed',
              right: '20px',
              bottom: '20px',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: '#22C55E',
              border: '4px solid #FFFF00',
              boxShadow: '0 8px 24px rgba(255,0,0,.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 99999,
              fontSize: '24px',
              color: 'white',
              fontWeight: 'bold'
            }}
          >
            <PlusIcon size="md" theme="neutral" />
          </div>
        )}
      </div>
    );
  }

  // Desktop specific rendering
  if (isDesktop) {
    return (
      <div style={{ width: '100%', height: '600px', position: 'relative' }}>
        <DesktopGeoMap />
        <MapContainer
          onAreaCreated={onAreaCreated}
          onNewEntryClick={onNewEntryClick}
          isIPhone14ProMaxDevice={isIPhone14ProMaxDevice}
          hideDrawingControls={isIPhone14ProMaxDevice}
        />

        {/* FAB για Desktop */}
        {(() => {
          const shouldShowFAB = (onNewEntryClick || isIPhone14ProMaxDevice) && !showCategoryElements;
          console.log('🖥️ Desktop Mode FAB Debug:', {
            onNewEntryClick: !!onNewEntryClick,
            isIPhone14ProMaxDevice,
            showCategoryElements,
            shouldShowFAB
          });
          return shouldShowFAB;
        })() && (
          <div
            onClick={handleNewEntryClick}
            style={{
              position: 'fixed',
              right: '20px',
              bottom: '20px',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: '#22C55E',
              border: '4px solid #FFFF00',
              boxShadow: '0 8px 24px rgba(255,0,0,.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 99999,
              fontSize: '24px',
              color: 'white',
              fontWeight: 'bold'
            }}
          >
            <PlusIcon size="md" theme="neutral" />
          </div>
        )}
      </div>
    );
  }

  // Tablet specific rendering
  if (isTablet) {
    return (
      <div style={{ width: '100%', height: '500px', position: 'relative' }}>
        <TabletGeoMap />
        <MapContainer
          onAreaCreated={onAreaCreated}
          onNewEntryClick={onNewEntryClick}
          isIPhone14ProMaxDevice={isIPhone14ProMaxDevice}
          hideDrawingControls={isIPhone14ProMaxDevice}
        />

        {/* FAB για Tablet */}
        {(onNewEntryClick || isIPhone14ProMaxDevice) && !showCategoryElements && (
          <div
            onClick={handleNewEntryClick}
            style={{
              position: 'fixed',
              right: '20px',
              bottom: '20px',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: '#22C55E',
              border: '4px solid #FFFF00',
              boxShadow: '0 8px 24px rgba(255,0,0,.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 99999,
              fontSize: '24px',
              color: 'white',
              fontWeight: 'bold'
            }}
          >
            <PlusIcon size="md" theme="neutral" />
          </div>
        )}
      </div>
    );
  }

  // Default mobile rendering
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <MapContainer
        onAreaCreated={onAreaCreated}
        onNewEntryClick={onNewEntryClick}
        isIPhone14ProMaxDevice={isIPhone14ProMaxDevice}
        hideDrawingControls={isIPhone14ProMaxDevice}
      />

      {/* FAB για Mobile */}
      {(onNewEntryClick || isIPhone14ProMaxDevice) && !showCategoryElements && (
        <div
          onClick={handleNewEntryClick}
          style={{
            position: 'absolute',
            right: 15,
            bottom: 15,
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: '#22C55E',
            border: '2px solid #fff',
            boxShadow: '0 8px 24px rgba(0,0,0,.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 2000
          }}
        >
          <PlusIcon size="md" theme="neutral" />
        </div>
      )}
    </div>
  );
};