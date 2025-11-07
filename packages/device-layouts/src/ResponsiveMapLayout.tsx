/**
 * ResponsiveMapLayout.tsx - Enterprise Responsive Map Layout Component
 *
 * ✅ LEGO SYSTEMS COMPLIANT - χρησιμοποιεί μόνο @layera packages
 * Simplified responsive design χωρίς device simulation complexity
 */

import React from 'react';
import { BOX_SHADOW_SCALE } from '@layera/box-shadows';
import { BORDER_RADIUS_SCALE, SPACING_SCALE } from '@layera/constants';
import { Box, Flex, useResponsiveFlex } from '@layera/layout';
import { MobileOnly, TabletOnly, DesktopOnly, useViewport } from '@layera/viewport';

export interface ResponsiveMapLayoutProps {
  /** Map component για responsive rendering */
  mapComponent?: React.ComponentType<unknown>;

  /** Device-specific map components */
  mapComponents?: {
    mobile?: React.ComponentType<unknown>;
    tablet?: React.ComponentType<unknown>;
    desktop?: React.ComponentType<unknown>;
  };

  /** Child components για complex layouts */
  children?: React.ReactNode;

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

  /** FAB configuration */
  fab?: {
    onClick?: () => void;
    icon?: React.ReactNode;
    hidden?: boolean;
  };

}

export const ResponsiveMapLayout: React.FC<ResponsiveMapLayoutProps> = ({
  mapComponent: MapComponent,
  mapComponents = {},
  children,
  navigation,
  navigationHandlers,
  fab
}) => {
  // 🎯 Enterprise Responsive Detection
  const { isMobile, isTablet, isDesktop } = useViewport();
  const responsiveFlex = useResponsiveFlex();

  // 🎨 Enterprise FAB με LEGO Design Tokens
  const fabComponent = fab && !fab.hidden ? (
    <Box
      onClick={fab.onClick}
      position="fixed"
      right="var(--la-space-6)" // 🎯 SST: LG spacing (24px)
      bottom="var(--la-space-6)" // 🎯 SST: LG spacing (24px)
      width="56px"
      height="56px"
      borderRadius={BORDER_RADIUS_SCALE.CIRCLE}
      background="var(--la-color-primary)"
      border="2px solid var(--la-color-surface)"
      boxShadow={BOX_SHADOW_SCALE.cardDefault}
      display="flex"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      zIndex="9999"
      userSelect="none"
    >
      {fab.icon}
    </Box>
  ) : null;

  return (
    <Box position="relative" width="100%" height="100%">
      {/* 📱 Mobile Layout */}
      <MobileOnly>
        <Flex direction="column" height="100%">
          {mapComponents.mobile ? (
            React.createElement(mapComponents.mobile)
          ) : MapComponent ? (
            React.createElement(MapComponent)
          ) : null}
          {children}
        </Flex>
      </MobileOnly>

      {/* 📟 Tablet Layout */}
      <TabletOnly>
        <Flex direction="row" height="100%">
          {mapComponents.tablet ? (
            React.createElement(mapComponents.tablet)
          ) : MapComponent ? (
            React.createElement(MapComponent)
          ) : null}
          {children}
        </Flex>
      </TabletOnly>

      {/* 🖥️ Desktop Layout */}
      <DesktopOnly>
        <Flex direction="row" height="100%" gap={`${SPACING_SCALE.MD}px`}>
          {mapComponents.desktop ? (
            React.createElement(mapComponents.desktop)
          ) : MapComponent ? (
            React.createElement(MapComponent)
          ) : null}
          {children}
        </Flex>
      </DesktopOnly>

      {/* 🎯 FAB Overlay */}
      {fabComponent}
    </Box>
  );
};