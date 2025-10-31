/**
 * DeviceLayoutRenderer.tsx - Enterprise Device Layout Orchestrator
 *
 * Single source of truth για device-specific rendering στο Layera ecosystem.
 * Αντικαθιστά duplicate device rendering logic με unified API.
 */

import React from 'react';
import { Box } from '@layera/layout';
// 🚀 ENTERPRISE: Single Source of Truth - Enhanced @layera/viewport
import { useIPhone14ProMaxDetection } from '@layera/viewport';
// 🚀 ENTERPRISE: Single Source of Truth - Device specs from @layera/constants
import { IPHONE_14_PRO_MAX_SPECS, DEVICE_BREAKPOINTS } from '@layera/constants';
import { DeviceLayoutRendererProps, ResponsiveLayoutConfig, DeviceType } from './types';

const DEFAULT_LAYOUT_CONFIG: ResponsiveLayoutConfig = {
  iphone: {
    width: IPHONE_14_PRO_MAX_SPECS.VIEWPORT_WIDTH,
    height: IPHONE_14_PRO_MAX_SPECS.VIEWPORT_HEIGHT,
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
  // 🚀 ENTERPRISE SINGLE SOURCE OF TRUTH: Enhanced @layera/viewport
  const isIPhone14ProMax = useIPhone14ProMaxDetection({
    frameSelector: '.device-frame-wrapper',
    enableWindowFallback: true,
    enableUserAgentFallback: true
  });

  // Auto-detect device type αν δεν δίνεται - ENTERPRISE EDITION
  const detectedDeviceType = React.useMemo((): DeviceType => {
    if (forceDeviceType) {
      return forceDeviceType;
    }

    if (propDeviceType) {
      return propDeviceType;
    }

    // 🏆 ENTERPRISE: Χρήση της επίσημης Single Source of Truth
    if (isIPhone14ProMax) {
      return 'iphone';
    }

    // Fallback για άλλες συσκευές
    if (typeof window === 'undefined') {
      return 'desktop';
    }

    const width = window.innerWidth;
    if (width <= DEVICE_BREAKPOINTS.MOBILE) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  }, [propDeviceType, forceDeviceType, isIPhone14ProMax]);

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
              // ΔΙΟΡΘΩΣΗ: Intelligent step navigation για occupation step
              const currentStep = navigation?.currentStep;

              if (stepId === 'occupation' && currentStep === 'employmentType') {
                // Ειδικό handling για occupation step - θα χρησιμοποιήσουμε goNext()
                // αλλά με debug info για να δούμε αν φτάνει στο σωστό step
                if (navigationHandlers?.onNext) {
                  navigationHandlers.onNext();
                }
              } else {
                // Για όλα τα άλλα steps, κανονικό goNext()
                if (navigationHandlers?.onNext) {
                  navigationHandlers.onNext();
                }
              }
            },
            onStepComplete: async (stepId, data) => {
              // Ειδική λογική για category step - χρειάζεται selectCategory πρώτα
              if (stepId === 'category' && data && typeof data === 'object' && 'selectedCategory' in data) {
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