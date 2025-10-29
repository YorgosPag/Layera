/**
 * ResponsiveMapLayout.tsx - High-Level Responsive Map Layout Component
 *
 * Simplified API για common map layout patterns.
 * Wrapper γύρω από το DeviceLayoutRenderer για εύκολη χρήση.
 */

import React from 'react';
import { BOX_SHADOW_SCALE } from '@layera/box-shadows';
import { BORDER_RADIUS_SCALE } from '@layera/constants';
import { Box } from '@layera/layout';
import { DeviceLayoutRenderer } from './DeviceLayoutRenderer';
import { DeviceType, MapComponentProps, StepperComponentProps, CategoryComponentProps } from './types';

export interface ResponsiveMapLayoutProps {
  /** Auto-detected ή forced device type */
  deviceType?: DeviceType;

  /** Override auto-detection */
  forceDeviceType?: DeviceType;

  /** Map-related props */
  map?: MapComponentProps;

  /** Device-specific map components */
  mapComponents?: {
    iPhone?: React.ComponentType<MapComponentProps>;
    tablet?: React.ComponentType<MapComponentProps>;
    desktop?: React.ComponentType<MapComponentProps>;
    mobile?: React.ComponentType<MapComponentProps>;
  };

  /** iPhone-specific components (stepper, category, orchestrator) */
  iPhoneComponents?: {
    stepper?: React.ComponentType<StepperComponentProps>;
    category?: React.ComponentType<CategoryComponentProps>;
    orchestrator?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  };

  /** Navigation state */
  navigation?: {
    currentStep?: string;
    totalSteps?: number;
    stepIndex?: number;
    selectedCategory?: string;
    canGoNext?: boolean;
    canGoBack?: boolean;
  };

  /** Navigation handlers */
  navigationHandlers?: {
    onNext?: () => void;
    onPrevious?: () => void;
    onReset?: () => void;
    onStepClick?: (stepIndex: number) => void;
    onNewEntryClick?: () => void;
  };

  /** Show category elements (για iPhone stepper) */
  showCategoryElements?: boolean;

  /** FAB configuration */
  fab?: {
    onClick?: () => void;
    icon?: React.ReactNode;
    hidden?: boolean;
    deviceType?: DeviceType;
  };

}

export const ResponsiveMapLayout: React.FC<ResponsiveMapLayoutProps> = ({
  deviceType,
  forceDeviceType,
  map = {},
  mapComponents = {},
  iPhoneComponents = {},
  navigation,
  navigationHandlers,
  showCategoryElements = false,
  fab
}) => {

  // Prepare FAB component αν υπάρχει
  const fabComponent = fab && !fab.hidden ? (
    <Box
      onClick={fab.onClick}
      position="absolute"
      right={`${SPACING_SCALE.LG}px`}
      bottom={`${SPACING_SCALE.LG}px`}
      width="var(--la-size-fab, 56px)"
      height="var(--la-size-fab, 56px)"
      borderRadius={BORDER_RADIUS_SCALE.CIRCLE}
      background="var(--la-bg-success, #22C55E)"
      border="var(--la-border-fab, 2px solid white)"
      boxShadow={BOX_SHADOW_SCALE.cardDefault}
      display="var(--la-display-flex, flex)"
      alignItems="var(--la-align-center, center)"
      justifyContent="var(--la-justify-center, center)"
      cursor="var(--la-cursor-pointer, pointer)"
      zIndex="var(--la-z-index-fab, 9999)"
      userSelect="var(--la-user-select-none, none)"
    >
      {fab.icon}
    </Box>
  ) : null;

  return (
    <DeviceLayoutRenderer
      deviceType={deviceType}
      forceDeviceType={forceDeviceType}
      commonProps={map}
      components={{
        iphone: {
          map: mapComponents.iPhone,
          stepper: iPhoneComponents.stepper,
          category: iPhoneComponents.category,
          orchestrator: iPhoneComponents.orchestrator
        },
        tablet: {
          map: mapComponents.tablet
        },
        desktop: {
          map: mapComponents.desktop
        },
        mobile: {
          map: mapComponents.mobile
        }
      }}
      navigation={navigation}
      navigationHandlers={navigationHandlers}
      showCategoryElements={showCategoryElements}
      fab={fab ? {
        component: fabComponent,
        onClick: fab.onClick,
        icon: fab.icon,
        hidden: fab.hidden
      } : undefined}
    />
  );
};