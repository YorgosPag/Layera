/**
 * GeoMapNew.tsx - Enterprise Refactored Map Component
 *
 * Αντικαθιστά το monolithic GeoMap.tsx με modular architecture.
 * Χρησιμοποιεί @layera/map-core και @layera/map-drawing packages.
 */

import React, { useState } from 'react';
import { useViewportWithOverride } from '@layera/viewport';
import { useNavigation } from '../services/navigation/hooks/useNavigation';
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

  // 🚀 ENTERPRISE NAVIGATION: Rock-solid service που δεν σπάει ποτέ
  const navigation = useNavigation();
  const [showCategoryElements, setShowCategoryElements] = useState(false);

  // FAB Draggable State
  const [fabPosition, setFabPosition] = useState({ right: 15, bottom: 15 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  console.log('🚀 Enterprise Navigation State:', {
    currentStep: navigation.currentStep,
    stepIndex: navigation.stepIndex,
    selectedCategory: navigation.selectedCategory,
    canGoBack: navigation.canGoBack,
    canGoNext: navigation.canGoNext,
    totalSteps: navigation.totalSteps
  });

  // 🚀 ENTERPRISE NAVIGATION HANDLERS: Rock-solid, never fail
  const handleStepNext = async () => {
    try {
      await navigation.goNext();
      console.log('✅ Enterprise navigation: next step successful');
    } catch (error) {
      console.error('❌ Navigation next failed (but app won\'t crash):', error);
    }
  };

  const handleStepPrevious = async () => {
    try {
      await navigation.goBack();
      console.log('✅ Enterprise navigation: back step successful');
    } catch (error) {
      console.error('❌ Navigation back failed (but app won\'t crash):', error);
    }
  };

  const handleStepReset = () => {
    navigation.reset();
    setShowCategoryElements(false);
    onCategoryElementsChange?.(false);
    console.log('✅ Enterprise navigation: reset successful');
  };

  // Handler για το FAB button
  const handleNewEntryClick = () => {
    if (isDragging) return; // Δεν κάνουμε click αν κάνουμε drag

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

  // FAB Draggable Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(false);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) { // Αν πατημένο το αριστερό κουμπί
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
        setIsDragging(true);

        const containerRect = e.currentTarget.parentElement?.getBoundingClientRect();
        if (containerRect) {
          const newRight = Math.max(10, Math.min(containerRect.width - 66, fabPosition.right - deltaX));
          const newBottom = Math.max(10, Math.min(containerRect.height - 66, fabPosition.bottom - deltaY));

          setFabPosition({ right: newRight, bottom: newBottom });
          setDragStart({ x: e.clientX, y: e.clientY });
        }
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(false);
      setDragStart({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const deltaX = touch.clientX - dragStart.x;
      const deltaY = touch.clientY - dragStart.y;

      if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
        setIsDragging(true);
        e.preventDefault(); // Prevent scrolling

        const containerRect = e.currentTarget.parentElement?.getBoundingClientRect();
        if (containerRect) {
          const newRight = Math.max(10, Math.min(containerRect.width - 66, fabPosition.right - deltaX));
          const newBottom = Math.max(10, Math.min(containerRect.height - 66, fabPosition.bottom - deltaY));

          setFabPosition({ right: newRight, bottom: newBottom });
          setDragStart({ x: touch.clientX, y: touch.clientY });
        }
      }
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
        {showCategoryElements && (() => {
          console.log('🎯 GeoMapNew: Rendering FloatingStepper with ENTERPRISE navigation state:', {
            currentStep: navigation.currentStep,
            totalSteps: navigation.totalSteps,
            stepIndex: navigation.stepIndex,
            selectedCategory: navigation.selectedCategory,
            canGoNext: navigation.canGoNext,
            canGoPrevious: navigation.canGoBack
          });
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
            console.log('🚀 ENTERPRISE: Category selected via NavigationService:', category);
            try {
              await navigation.selectCategory(category);
              console.log('✅ Enterprise category selection successful');
            } catch (error) {
              console.error('❌ Category selection failed (but app won\'t crash):', error);
            }
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
              background: 'rgb(16, 185, 129)',
              border: '4px solid #FFFFFF',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
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
              background: 'rgb(16, 185, 129)',
              border: '4px solid #FFFFFF',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
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
              background: 'rgb(16, 185, 129)',
              border: '4px solid #FFFFFF',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
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

      {/* FAB για Mobile - Draggable */}
      {(onNewEntryClick || isIPhone14ProMaxDevice) && !showCategoryElements && (
        <div
          onClick={handleNewEntryClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          style={{
            position: 'absolute',
            right: fabPosition.right,
            bottom: fabPosition.bottom,
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'rgb(16, 185, 129)',
            border: '2px solid #fff',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: isDragging ? 'grabbing' : 'grab',
            zIndex: 2000,
            transition: isDragging ? 'none' : 'all 0.2s ease',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            WebkitTouchCallout: 'none'
          }}
        >
          <PlusIcon size="md" theme="neutral" />
        </div>
      )}
    </div>
  );
};