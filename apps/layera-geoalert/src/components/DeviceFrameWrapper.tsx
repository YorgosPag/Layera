import React, { useState, useEffect } from 'react';
import { useViewportWithOverride } from '@layera/viewport';
import { DeviceModelSelector, DeviceModel, getDeviceSpecs } from '@layera/viewport';
import { SPACING_SCALE, BORDER_RADIUS_SCALE } from '@layera/constants';
import { Flex, Box } from '@layera/layout';
import { BOX_SHADOW_SCALE } from '@layera/box-shadows';

interface DeviceFrameWrapperProps {
  children: React.ReactNode;
  enabled?: boolean;
  onResponsiveModeChange?: (isResponsive: boolean) => void;
}

export const DeviceFrameWrapper: React.FC<DeviceFrameWrapperProps> = ({
  children,
  enabled = true,
  onResponsiveModeChange
}) => {
  const { deviceType, isMobile, isTablet, isDesktop } = useViewportWithOverride();
  const [selectedModel, setSelectedModel] = useState<DeviceModel | null>(null);

  // Notify parent component when responsive mode changes
  useEffect(() => {
    const isResponsive = selectedModel === null;
    onResponsiveModeChange?.(isResponsive);
  }, [selectedModel, onResponsiveModeChange]);

  // Also notify on mount
  useEffect(() => {
    const isResponsive = selectedModel === null;
    onResponsiveModeChange?.(isResponsive);
  }, [onResponsiveModeChange]);

  if (!enabled) {
    return <>{children}</>;
  }

  // If no specific model selected, show children without frame in full-screen responsive layout
  if (!selectedModel) {
    return (
      <>
        <DeviceModelSelector
          currentModel={selectedModel}
          onModelSelect={setSelectedModel}
        />
        <div className="layera-layout-container">
          {children}
        </div>
      </>
    );
  }

  const specs = getDeviceSpecs(selectedModel);

  const getFrameStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      position: 'relative',
      margin: `0 auto`,
      backgroundColor: specs.frameColor,
      borderRadius: `${BORDER_RADIUS_SCALE.LG}px`,
      padding: `${SPACING_SCALE.SM}px`,
      boxShadow: BOX_SHADOW_SCALE.elevation6,
      width: `${specs.width}px`,
      height: `${specs.height}px`,
      transform: `scale(${specs.scale})`,
      transformOrigin: 'top center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    };

    return baseStyles;
  };

  const getScreenStyles = (): React.CSSProperties => {
    return {
      width: '100%',
      height: '100%',
      backgroundColor: 'var(--color-bg-canvas)',
      borderRadius: `${BORDER_RADIUS_SCALE.SM}px`,
      overflow: 'hidden',
      position: 'relative'
    };
  };

  const getNotchStyles = (): React.CSSProperties => {
    if (!specs.hasNotch) return { display: 'none' };

    return {
      position: 'absolute',
      top: '0',
      left: '50%',
      transform: 'translateX(-50%)',
      width: `${SPACING_SCALE.XXXL}px`,
      height: `${SPACING_SCALE.XXL}px`,
      backgroundColor: 'var(--color-text-primary)',
      borderBottomLeftRadius: `${SPACING_SCALE.LG}px`,
      borderBottomRightRadius: `${SPACING_SCALE.LG}px`,
      zIndex: 10
    };
  };

  const getHomeIndicatorStyles = (): React.CSSProperties => {
    if (!specs.hasHomeBar) return { display: 'none' };

    return {
      position: 'absolute',
      bottom: `${SPACING_SCALE.SM}px`,
      left: '50%',
      transform: 'translateX(-50%)',
      width: `${SPACING_SCALE.XL}px`,
      height: `${SPACING_SCALE.XS}px`,
      backgroundColor: 'var(--color-text-primary)',
      borderRadius: `${BORDER_RADIUS_SCALE.PILL}px`,
      zIndex: 10
    };
  };

  return (
    <>
      <DeviceModelSelector
        currentModel={selectedModel}
        onModelSelect={setSelectedModel}
      />
      <Flex
        justify="center"
        align="flex-start"
        minHeight="full"
        backgroundColor="surface"
        padding="custom"
        overflow="auto"
        className="device-frame-container">
        <Box
          className="device-frame"
          data-device={selectedModel?.id}
          style={getFrameStyles()}
        >
          <Box
            id="layera-device-simulator-viewport"
            className="device-screen"
            style={getScreenStyles()}
          >
            <Box className="device-notch" style={getNotchStyles()} />
            {children}
            <Box className="device-home-indicator" style={getHomeIndicatorStyles()} />
          </Box>
        </Box>
      </Flex>
    </>
  );
};