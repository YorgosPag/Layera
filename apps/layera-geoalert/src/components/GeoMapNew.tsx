/**
 * GeoMapNew.tsx - Enterprise Refactored Map Component
 *
 * Αντικαθιστά το monolithic GeoMap.tsx με modular architecture.
 * Χρησιμοποιεί @layera/map-core και @layera/map-drawing packages.
 */

import React, { useState, useRef } from 'react';
import { useViewportWithOverride } from '@layera/viewport';
import { useNavigation } from '../services/navigation/hooks/useNavigation';
import { MapContainer } from './map/MapContainer';
import { PlusIcon } from './icons/LayeraIcons';
// import { DraggableFAB } from '@layera/draggable-fab'; // Temporarily disabled due to module resolution
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

  // Move useRef to top to avoid conditional hooks
  const screenRef = useRef<HTMLDivElement>(null);

  // Debug viewport detection - removed logs to prevent circular reference

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

    // Device detection debug removed

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

  // 🚀 ENTERPRISE NAVIGATION: Rock-solid service που δεν σπάει ποτέ
  const navigation = useNavigation();
  const [showCategoryElements, setShowCategoryElements] = useState(false);

  // Enterprise Navigation State debug removed

  // 🚀 ENTERPRISE NAVIGATION HANDLERS: Rock-solid, never fail
  const handleStepNext = async () => {
    try {
      await navigation.goNext();
    } catch (error) {
      // Navigation next failed but app continues
    }
  };

  const handleStepPrevious = async () => {
    try {
      await navigation.goBack();
    } catch (error) {
      // Navigation back failed but app continues
    }
  };

  const handleStepReset = () => {
    navigation.reset();
    setShowCategoryElements(false);
    onCategoryElementsChange?.(false);
  };


  // Handler για το FAB button - simplified without drag logic
  const handleNewEntryClick = () => {
    // FAB Click Handler debug removed
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
    // Rendering iPhone 14 Pro Max mode
    // screenRef already declared at top of component

    // Παίρνω τις διαστάσεις από το device frame
    const frameWidth = 430;  // iPhone 14 Pro Max width
    const frameHeight = 932; // iPhone 14 Pro Max height

    return (
      <div
        ref={screenRef}
        style={{
          width: frameWidth,
          height: frameHeight,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {React.createElement(iPhone14ProMaxGeoMap, {
          onAreaCreated,
          onNewEntryClick,
          isIPhone14ProMaxDevice
        })}
        {/* FloatingStepper - εμφανίζεται μόνο όταν showCategoryElements = true */}
        {showCategoryElements && (() => {
          // FloatingStepper rendering with enterprise navigation
          return React.createElement(iPhone14ProMaxFloatingStepper, {
            currentStep: navigation.currentStep,
            totalSteps: navigation.totalSteps,
            stepIndex: navigation.stepIndex,
            selectedCategory: navigation.selectedCategory,
            onNext: handleStepNext,
            onPrevious: handleStepPrevious,
            onReset: handleStepReset,
            canGoNext: navigation.canGoNext,
            canGoPrevious: navigation.canGoBack
          });
        })()}

        {/* CategoryStep - εμφανίζεται μόνο όταν showCategoryElements = true */}
        {showCategoryElements && React.createElement(iPhone14ProMaxCategoryStep, {
          isVisible: showCategoryElements,
          currentStepId: navigation.currentStep,
          onNext: async (category: any) => {
            // Category selected via NavigationService
            try {
              await navigation.selectCategory(category);
            } catch (error) {
              // Category selection failed but app continues
            }
          }
        })}

        {/* Temporary FAB until @layera/draggable-fab module resolution is fixed */}
        {!showCategoryElements && (
          <div
            onClick={handleNewEntryClick}
            aria-label="Νέα Καταχώρηση"
            title="Νέα Καταχώρηση"
            data-testid="iphone-draggable-fab"
            style={{
              position: 'absolute',
              right: '20px',
              bottom: '100px', // Αυξάνω το bottom για να φαίνεται καλύτερα
              width: 60, // Λίγο μεγαλύτερο για iPhone
              height: 60,
              borderRadius: '50%',
              background: '#22C55E', // Hardcoded χρώμα για επιβεβαίωση
              border: '3px solid white',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 99999, // Πολύ υψηλό z-index
              userSelect: 'none',
              transform: 'scale(1)', // Εξασφαλίζω ότι δεν έχει transform scaling
              opacity: 1 // Εξασφαλίζω ότι είναι ορατό
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
      <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
        <DesktopGeoMap />
        <MapContainer
          onAreaCreated={onAreaCreated}
          onNewEntryClick={onNewEntryClick}
          isIPhone14ProMaxDevice={isIPhone14ProMaxDevice}
          hideDrawingControls={isIPhone14ProMaxDevice}
        />

        {/* Enterprise Draggable FAB για Desktop - από OLD_GeoMap.tsx */}
        {!showCategoryElements && (
          <div
            onClick={handleNewEntryClick}
            aria-label="Νέα Καταχώρηση"
            title="Νέα Καταχώρηση"
            data-testid="desktop-draggable-fab"
            style={{
              position: 'absolute',
              right: '20px',
              bottom: '20px',
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'var(--layera-bg-success,#22C55E)',
              border: '2px solid white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 9999,
              userSelect: 'none'
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
      <div className="tablet-map-container" style={{ width: '100%', height: '100vh', position: 'relative' }}>
        <TabletGeoMap />
        <MapContainer
          onAreaCreated={onAreaCreated}
          onNewEntryClick={onNewEntryClick}
          isIPhone14ProMaxDevice={isIPhone14ProMaxDevice}
          hideDrawingControls={isIPhone14ProMaxDevice}
        />

        {/* Enterprise Draggable FAB για Tablet - από OLD_GeoMap.tsx */}
        {!showCategoryElements && (
          <div
            onClick={handleNewEntryClick}
            aria-label="Νέα Καταχώρηση"
            title="Νέα Καταχώρηση"
            data-testid="tablet-draggable-fab"
            style={{
              position: 'absolute',
              right: '20px',
              bottom: '20px',
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'var(--layera-bg-success,#22C55E)',
              border: '2px solid white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 9999,
              userSelect: 'none'
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
    <div className="mobile-map-container" style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <MapContainer
        onAreaCreated={onAreaCreated}
        onNewEntryClick={onNewEntryClick}
        isIPhone14ProMaxDevice={isIPhone14ProMaxDevice}
        hideDrawingControls={isIPhone14ProMaxDevice}
      />

      {/* Enterprise Draggable FAB για Mobile - από OLD_GeoMap.tsx */}
      {!showCategoryElements && (
        <div
          onClick={handleNewEntryClick}
          aria-label="Νέα Καταχώρηση"
          title="Νέα Καταχώρηση"
          data-testid="mobile-draggable-fab"
          style={{
            position: 'absolute',
            right: '15px',
            bottom: '15px',
            width: 48, // smaller for mobile
            height: 48,
            borderRadius: '50%',
            background: 'var(--layera-bg-success,#22C55E)',
            border: '2px solid white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 9999,
            userSelect: 'none'
          }}
        >
          <PlusIcon size="md" theme="neutral" />
        </div>
      )}
    </div>
  );
};