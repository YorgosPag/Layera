import React, { useState } from 'react';
import { useViewportWithOverride } from '@layera/viewport';
import { DeviceModelSelector, DeviceModel, getDeviceSpecs } from '@layera/viewport';
import { SPACING_SCALE, BORDER_RADIUS_SCALE } from '@layera/constants';
import { Flex } from '@layera/layout';
import { BOX_SHADOW_SCALE } from '@layera/box-shadows';

interface DeviceFrameWrapperProps {
  children: React.ReactNode;
  enabled?: boolean;
}

export const DeviceFrameWrapper: React.FC<DeviceFrameWrapperProps> = ({
  children,
  enabled = true
}) => {
  const { deviceType, isMobile, isTablet, isDesktop } = useViewportWithOverride();
  const [selectedModel, setSelectedModel] = useState<DeviceModel | null>(null);

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
        style={{
          minHeight: '100vh',
          backgroundColor: 'var(--color-bg-surface)',
          padding: `${SPACING_SCALE.XL + SPACING_SCALE.LG}px ${SPACING_SCALE.LG + SPACING_SCALE.XS}px ${SPACING_SCALE.LG + SPACING_SCALE.XS}px ${SPACING_SCALE.LG + SPACING_SCALE.XS}px`,
          overflow: 'auto'
        }}>
        <div style={getFrameStyles()}>
          <div id="layera-device-simulator-viewport" style={getScreenStyles()}>
            <div style={getNotchStyles()} />
            {children}
            <div style={getHomeIndicatorStyles()} />
          </div>
        </div>
      </Flex>
    </>
  );
};