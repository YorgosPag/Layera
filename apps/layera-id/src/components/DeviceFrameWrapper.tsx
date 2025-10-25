import React, { useState } from 'react';
import { useViewportWithOverride } from '@layera/viewport';
import { DeviceModelSelector, DeviceModel, getDeviceSpecs } from '@layera/viewport';
import { BOX_SHADOW_SCALE } from '@layera/box-shadows';
import { SPACING_SCALE, BORDER_RADIUS_SCALE } from '@layera/constants';

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
      backgroundColor: '#fff',
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
      width: '209px',
      height: '30px',
      backgroundColor: '#000',
      borderBottomLeftRadius: '20px',
      borderBottomRightRadius: '20px',
      zIndex: 10
    };
  };

  const getHomeIndicatorStyles = (): React.CSSProperties => {
    if (!specs.hasHomeBar) return { display: 'none' };

    return {
      position: 'absolute',
      bottom: '8px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '134px',
      height: '5px',
      backgroundColor: '#000',
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
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '100vh',
        backgroundColor: '#f0f0f0',
        padding: `100px ${SPACING_SCALE.LG}px ${SPACING_SCALE.LG}px ${SPACING_SCALE.LG}px`,
        overflow: 'auto'
      }}>
        <div style={getFrameStyles()}>
          <div id="layera-device-simulator-viewport" style={getScreenStyles()}>
            <div style={getNotchStyles()} />
            {children}
            <div style={getHomeIndicatorStyles()} />
          </div>
        </div>
      </div>
    </>
  );
};