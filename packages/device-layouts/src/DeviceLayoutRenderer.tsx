/**
 * DeviceLayoutRenderer.tsx - Enterprise Device Layout Orchestrator
 *
 * Single source of truth για device-specific rendering στο Layera ecosystem.
 * Αντικαθιστά duplicate device rendering logic με unified API.
 */

import React from 'react';
import { DeviceLayoutRendererProps, ResponsiveLayoutConfig, DeviceType } from './types';

const DEFAULT_LAYOUT_CONFIG: ResponsiveLayoutConfig = {
  iphone: {
    width: 430,
    height: 932,
    containerStyle: {
      position: 'relative',
      overflow: 'hidden'
    }
  },
  tablet: {
    containerStyle: {
      width: '100%',
      height: '100vh',
      position: 'relative'
    },
    containerClassName: 'tablet-map-container'
  },
  desktop: {
    containerStyle: {
      width: '100%',
      height: '100vh',
      position: 'relative'
    }
  },
  mobile: {
    containerStyle: {
      width: '100%',
      height: '100vh',
      position: 'relative'
    },
    containerClassName: 'mobile-map-container'
  }
};

export const DeviceLayoutRenderer: React.FC<DeviceLayoutRendererProps> = ({
  deviceType: propDeviceType,
  forceDeviceType,
  layoutConfig = {},
  commonProps = {},
  components = {} as DeviceLayoutRendererProps['components'],
  navigation,
  navigationHandlers,
  showCategoryElements = false,
  fab
}) => {
  // Auto-detect device type αν δεν δίνεται - STABILIZED
  const detectedDeviceType = React.useMemo((): DeviceType => {
    if (forceDeviceType) {
      return forceDeviceType;
    }

    if (propDeviceType) {
      return propDeviceType;
    }

    // Fallback auto-detection (θα μπορούσε να χρησιμοποιήσει @layera/device-detection)
    if (typeof window === 'undefined') {
      return 'desktop';
    }

    // Χρησιμοποιώ σταθερή τιμή για να αποφύγω infinite re-renders
    const width = window.innerWidth;
    if (width <= 430) {
      return 'mobile';
    } else if (width <= 768) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  }, [propDeviceType, forceDeviceType]);

  // Merge configuration
  const finalConfig = {
    ...DEFAULT_LAYOUT_CONFIG,
    ...layoutConfig
  };

  // iPhone rendering
  // ΣΗΜΑΝΤΙΚΟ: Αφαιρέθηκαν τα console.log για αποφυγή infinite render loops
  // που προκαλούσαν εξαφάνιση του FAB στο iPhone 14 Pro Max

  if (detectedDeviceType === 'iphone') {
    const config = finalConfig.iphone;
    const iPhoneComponents = components?.iphone || {};


    return (
      <div
        style={{
          width: config.width,
          height: config.height,
          ...config.containerStyle
        }}
      >
        {/* Main device component */}
        {iPhoneComponents.map && React.createElement(iPhoneComponents.map, {
          ...commonProps,
          isIPhone14ProMaxDevice: true
        })}

        {/* Conditional stepper rendering */}
        {showCategoryElements && iPhoneComponents.stepper && navigation && (
          React.createElement(iPhoneComponents.stepper, {
            currentStep: navigation.currentStep,
            totalSteps: navigation.totalSteps,
            stepIndex: navigation.stepIndex,
            selectedCategory: navigation.selectedCategory,
            onNext: navigationHandlers?.onNext,
            onPrevious: navigationHandlers?.onPrevious,
            onReset: navigationHandlers?.onReset,
            onStepClick: navigationHandlers?.onStepClick,
            canGoNext: navigation.canGoNext,
            canGoPrevious: navigation.canGoBack
          })
        )}

        {/* Conditional category rendering */}
        {showCategoryElements && iPhoneComponents.category && navigation && (
          React.createElement(iPhoneComponents.category, {
            isVisible: true,
            currentStepId: navigation.currentStep,
            onNext: async (_category: unknown) => {
              try {
                if (navigationHandlers?.onNext) {
                  navigationHandlers.onNext();
                }
              } catch (error) {
                // Error handling
              }
            }
          })
        )}

      </div>
    );
  }

  // Desktop rendering
  if (detectedDeviceType === 'desktop') {
    const config = finalConfig.desktop;
    const desktopComponents = components?.desktop || {};

    return (
      <div style={config.containerStyle}>
        {/* Desktop-specific component */}
        {desktopComponents.map && React.createElement(desktopComponents.map, commonProps)}

        {/* Common MapContainer component */}
        {commonProps && (
          <div>
            {/* MapContainer θα rendered εδώ */}
          </div>
        )}

      </div>
    );
  }

  // Tablet rendering
  if (detectedDeviceType === 'tablet') {
    const config = finalConfig.tablet;
    const tabletComponents = components?.tablet || {};

    return (
      <div
        className={config.containerClassName}
        style={config.containerStyle}
      >
        {/* Tablet-specific component */}
        {tabletComponents.map && React.createElement(tabletComponents.map, commonProps)}

        {/* Common MapContainer component */}
        {commonProps && (
          <div>
            {/* MapContainer θα rendered εδώ */}
          </div>
        )}

      </div>
    );
  }

  // Mobile fallback rendering
  const config = finalConfig.mobile;
  return (
    <div
      className={config.containerClassName}
      style={config.containerStyle}
    >
      {/* Common MapContainer component */}
      {commonProps && (
        <div>
          {/* MapContainer θα rendered εδώ */}
        </div>
      )}

      {/* FAB rendering */}
      {fab && !fab.hidden && fab.component}
    </div>
  );
};