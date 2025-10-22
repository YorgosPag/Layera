/**
 * ResponsiveMapLayout.tsx - High-Level Responsive Map Layout Component
 *
 * Simplified API για common map layout patterns.
 * Wrapper γύρω από το DeviceLayoutRenderer για εύκολη χρήση.
 */

import React from 'react';
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

  /** iPhone-specific components (stepper, category) */
  iPhoneComponents?: {
    stepper?: React.ComponentType<StepperComponentProps>;
    category?: React.ComponentType<CategoryComponentProps>;
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
    <div
      onClick={fab.onClick}
      style={{
        position: 'absolute',
        right: '20px',
        bottom: '20px',
        width: 56,
        height: 56,
        borderRadius: '50%',
        background: 'var(--layera-bg-success, #22C55E)',
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
      {fab.icon}
    </div>
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
          category: iPhoneComponents.category
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