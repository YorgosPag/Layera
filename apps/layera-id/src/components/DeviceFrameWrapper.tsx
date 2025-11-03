import React, { useState } from 'react';
import { useViewportWithOverride } from '@layera/viewport';
import { DeviceModelSelector, getDeviceSpecs } from '@layera/viewport';
import { BOX_SHADOW_SCALE } from '@layera/box-shadows';
import { SPACING_SCALE, BORDER_RADIUS_SCALE } from '@layera/constants';
import { Box, Flex } from '@layera/layout';

interface DeviceFrameWrapperProps {
  children: React.ReactNode;
  enabled?: boolean;
}

export const DeviceFrameWrapper: React.FC<DeviceFrameWrapperProps> = ({
  children,
  enabled = true
}) => {
  useViewportWithOverride();
  const [selectedModel, setSelectedModel] = useState(null);

  if (!enabled) {
    return <>{children}</>;
  }

  // If no specific model selected, show children without frame
  if (!selectedModel) {
    return (
      <>
        <DeviceModelSelector
          currentModel={selectedModel}
          onModelSelect={setSelectedModel}
        />
        {children}
      </>
    );
  }

  const specs = getDeviceSpecs(selectedModel);

  const getFrameStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      position: 'relative',
      margin: '0 auto',
      backgroundColor: specs.frameColor,
      borderRadius: `${specs.borderRadius}px`,
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
      backgroundColor: 'var(--la-bg-primary)',
      borderRadius: `${specs.borderRadius - 8}px`,
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
      width: 'var(--la-device-notch-width, 209px)',
      height: 'var(--la-device-notch-height, 30px)',
      backgroundColor: 'var(--la-device-notch-color, var(--la-color-black))',
      borderBottomLeftRadius: `${BORDER_RADIUS_SCALE.LAYOUT_SM}px`,
      borderBottomRightRadius: `${BORDER_RADIUS_SCALE.LAYOUT_SM}px`,
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
      width: 'var(--la-device-home-width, 134px)',
      height: 'var(--la-device-home-height, 5px)',
      backgroundColor: 'var(--la-device-notch-color, var(--la-color-black))',
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
        style={{
          justifyContent: 'center',
          alignItems: 'flex-start',
          minHeight: '100vh',
          backgroundColor: 'var(--la-bg-surface)',
          paddingTop: `${SPACING_SCALE.LG}px`,
          paddingBottom: `${SPACING_SCALE.LG}px`,
          overflow: 'auto',
        }}
        className="device-frame-container"
      >
        <Box
          className="device-frame"
          style={getFrameStyles()}
        >
          <Box
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