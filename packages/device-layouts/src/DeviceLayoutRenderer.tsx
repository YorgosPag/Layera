/**
 * DeviceLayoutRenderer.tsx - Enterprise Device Layout Orchestrator
 *
 * Single source of truth για device-specific rendering στο Layera ecosystem.
 * Αντικαθιστά duplicate device rendering logic με unified API.
 */

import React from 'react';
import { Box } from '@layera/layout';
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
      <Box
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

        {/* 🚀 UNIFIED STEP ORCHESTRATOR: Handles ALL steps including category */}
        {showCategoryElements && iPhoneComponents.orchestrator && navigation && (
          React.createElement(iPhoneComponents.orchestrator, {
            currentStepId: navigation.currentStep!,
            selectedCategory: navigation.selectedCategory ?? 'property',
            // selectedIntent: TO DO: Add to navigation service
            // Removed unsupported props that cause TypeScript errors
            // πέρασε μόνο όσα handlers υπάρχουν
            ...(navigationHandlers?.onNext ? { onNext: navigationHandlers.onNext } : {}),
            ...(navigationHandlers?.onPrevious ? { onPrevious: navigationHandlers.onPrevious } : {}),
            onStepChange: (stepId) => {
              console.log(`🎯 DEVICE LAYOUT: Step change to ${stepId}`);
              console.log(`🎯 DEVICE LAYOUT: Current step is ${navigation?.currentStep}`);

              // ΔΙΟΡΘΩΣΗ: Intelligent step navigation για occupation step
              const currentStep = navigation?.currentStep;

              if (stepId === 'occupation' && currentStep === 'employmentType') {
                console.log(`🎯 DEVICE LAYOUT: SPECIAL CASE - Forcing navigation to occupation step`);
                // Ειδικό handling για occupation step - θα χρησιμοποιήσουμε goNext()
                // αλλά με debug info για να δούμε αν φτάνει στο σωστό step
                if (navigationHandlers?.onNext) {
                  navigationHandlers.onNext();
                }
              } else {
                console.log(`🎯 DEVICE LAYOUT: Default navigation using goNext() for ${stepId}`);
                // Για όλα τα άλλα steps, κανονικό goNext()
                if (navigationHandlers?.onNext) {
                  navigationHandlers.onNext();
                }
              }
            },
            onStepComplete: async (stepId, data) => {
              console.log(`🎯 DEVICE LAYOUT: Step ${stepId} completed`, data);

              // Ειδική λογική για category step - χρειάζεται selectCategory πρώτα
              if (stepId === 'category' && data && typeof data === 'object' && 'selectedCategory' in data) {
                console.log(`🎯 DEVICE LAYOUT: Category selected: ${data.selectedCategory}`);
                // Εδώ θα χρειαστούμε access στο navigation service
                // Προς το παρόν, η auto-advance θα γίνει από το StepOrchestrator
              }
            },
            deviceProps: { isIPhone14ProMaxDevice: true, isMobile: true },
          })
        )}

      </Box>
    );
  }

  // Desktop rendering
  if (detectedDeviceType === 'desktop') {
    const config = finalConfig.desktop;
    const desktopComponents = components?.desktop || {};

    return (
      <Box style={config.containerStyle}>
        {/* Desktop-specific component */}
        {desktopComponents.map && React.createElement(desktopComponents.map, commonProps)}

        {/* Common MapContainer component */}
        {commonProps && (
          <Box>
            {/* MapContainer θα rendered εδώ */}
          </Box>
        )}

      </Box>
    );
  }

  // Tablet rendering
  if (detectedDeviceType === 'tablet') {
    const config = finalConfig.tablet;
    const tabletComponents = components?.tablet || {};

    return (
      <Box
        className={config.containerClassName}
        style={config.containerStyle}
      >
        {/* Tablet-specific component */}
        {tabletComponents.map && React.createElement(tabletComponents.map, commonProps)}

        {/* Common MapContainer component */}
        {commonProps && (
          <Box>
            {/* MapContainer θα rendered εδώ */}
          </Box>
        )}

      </Box>
    );
  }

  // Mobile fallback rendering
  const config = finalConfig.mobile;
  return (
    <Box
      className={config.containerClassName}
      style={config.containerStyle}
    >
      {/* Common MapContainer component */}
      {commonProps && (
        <Box>
          {/* MapContainer θα rendered εδώ */}
        </Box>
      )}

      {/* FAB rendering */}
      {fab && !fab.hidden && fab.component}
    </Box>
  );
};