// Layera Shared - Device Simulator Component
// Enterprise pattern: Visual device simulation με πραγματικές διαστάσεις
// Usage: Εμφανίζει την εφαρμογή σε iPhone, iPad, Desktop frames

import React, { useState, useContext, ReactNode } from 'react';
import { DeviceOverrideContext } from './DeviceSwitcher';
import { DeviceType } from '../types';
import { RotateIcon } from './icons/ViewportIcons';

// Πραγματικές διαστάσεις συσκευών (σε pixels)
const DEVICE_SPECS = {
  mobile: {
    name: 'iPhone 13 Pro',
    width: 390,
    height: 844,
    scale: 0.7, // Scale για να χωράει στην οθόνη
    borderRadius: '25px',
    bezelColor: 'var(--layera-bg-secondary)'
  },
  tablet: {
    name: 'iPad Pro 11"',
    width: 834,
    height: 1194,
    scale: 0.5,
    borderRadius: '20px',
    bezelColor: 'var(--layera-text-secondary)'
  },
  desktop: {
    name: 'Desktop 1920x1080',
    width: 1920,
    height: 1080,
    scale: 0.4,
    borderRadius: '10px',
    bezelColor: 'var(--layera-text-tertiary)'
  }
};

interface DeviceSimulatorProps {
  children: ReactNode;
  showDeviceFrame?: boolean;
}

/**
 * Visual Device Simulator
 * Εμφανίζει την εφαρμογή σε πραγματικές διαστάσεις συσκευών
 */
export const DeviceSimulator: React.FC<DeviceSimulatorProps> = ({
  children,
  showDeviceFrame = true
}) => {
  const { overrideDevice } = useContext(DeviceOverrideContext) as { overrideDevice: DeviceType | null };
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');

  // Αν δεν υπάρχει override, εμφανίζει κανονικά το content
  if (!overrideDevice) {
    return <>{children}</>;
  }

  const spec = DEVICE_SPECS[overrideDevice as keyof typeof DEVICE_SPECS];
  const isLandscape = orientation === 'landscape';

  // Υπολογισμός τελικών διαστάσεων
  const finalWidth = isLandscape ? spec.height : spec.width;
  const finalHeight = isLandscape ? spec.width : spec.height;
  const scaledWidth = finalWidth * spec.scale;
  const scaledHeight = finalHeight * spec.scale;

  if (!showDeviceFrame) {
    // Χωρίς frame - μόνο resize του content
    return (
      <div style={{
        width: `${scaledWidth}px`,
        height: `${scaledHeight}px`,
        margin: '0 auto',
        border: '2px solid var(--layera-border-primary)',
        borderRadius: '8px',
        overflow: 'hidden',
        transform: `scale(${spec.scale})`,
        transformOrigin: 'top center'
      }}>
        <div style={{
          width: `${finalWidth}px`,
          height: `${finalHeight}px`,
          transform: `scale(${1 / spec.scale})`
        }}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem',
      backgroundColor: 'var(--layera-bg-tertiary)',
      minHeight: '100vh'
    }}>
      {/* Device Header με Controls */}
      <div style={{
        marginBottom: '1rem',
        padding: '1rem',
        backgroundColor: 'var(--layera-bg-primary)',
        borderRadius: '8px',
        boxShadow: '0 2px 4px color-mix(in srgb, var(--layera-bg-secondary) 10%, transparent 90%)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div>
          <h3 style={{ margin: 0, color: 'var(--layera-text-primary)' }}>
            {spec.name} Simulator
          </h3>
          <p style={{ margin: 0, color: 'var(--layera-text-secondary)', fontSize: '0.875rem' }}>
            {finalWidth} × {finalHeight}px ({Math.round(spec.scale * 100)}% scale)
          </p>
        </div>

        {overrideDevice !== 'desktop' && (
          <button
            onClick={() => setOrientation(prev => prev === 'portrait' ? 'landscape' : 'portrait')}
            style={{
              backgroundColor: 'var(--layera-bg-info)',
              color: 'var(--layera-text-on-info)',
              border: 'none',
              borderRadius: '6px',
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <RotateIcon size="sm" theme="neutral" />
            {isLandscape ? 'Portrait' : 'Landscape'}
          </button>
        )}
      </div>

      {/* Device Frame */}
      <div style={{
        padding: '20px',
        backgroundColor: spec.bezelColor,
        borderRadius: `calc(${spec.borderRadius} + 20px)`,
        boxShadow: '0 8px 32px color-mix(in srgb, var(--layera-bg-secondary) 30%, transparent 70%)',
        position: 'relative'
      }}>
        {/* Screen */}
        <div style={{
          width: `${scaledWidth}px`,
          height: `${scaledHeight}px`,
          backgroundColor: 'var(--layera-bg-primary)',
          borderRadius: spec.borderRadius,
          overflow: 'hidden',
          position: 'relative',
          boxShadow: 'inset 0 0 0 1px color-mix(in srgb, var(--layera-border-primary) 10%, transparent 90%)'
        }}>
          {/* Viewport Content */}
          <div
            id="layera-device-simulator-viewport"
            style={{
              width: `${finalWidth}px`,
              height: `${finalHeight}px`,
              transform: `scale(${spec.scale})`,
              transformOrigin: 'top left',
              overflow: 'hidden'
            }}>
            {children}
          </div>

          {/* Device UI Elements */}
          {overrideDevice === 'mobile' && (
            <>
              {/* Home indicator για iPhone */}
              <div style={{
                position: 'absolute',
                bottom: '8px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '134px',
                height: '5px',
                backgroundColor: 'color-mix(in srgb, var(--layera-bg-secondary) 30%, transparent 70%)',
                borderRadius: '2.5px'
              }} />
            </>
          )}
        </div>

        {/* Device Buttons/Ports */}
        {overrideDevice === 'mobile' && (
          <>
            {/* Power button */}
            <div style={{
              position: 'absolute',
              right: '-3px',
              top: isLandscape ? '20%' : '25%',
              width: '3px',
              height: '60px',
              backgroundColor: spec.bezelColor,
              borderRadius: '0 2px 2px 0'
            }} />

            {/* Volume buttons */}
            <div style={{
              position: 'absolute',
              left: '-3px',
              top: isLandscape ? '15%' : '20%',
              width: '3px',
              height: '40px',
              backgroundColor: spec.bezelColor,
              borderRadius: '2px 0 0 2px'
            }} />
            <div style={{
              position: 'absolute',
              left: '-3px',
              top: isLandscape ? '25%' : '30%',
              width: '3px',
              height: '40px',
              backgroundColor: spec.bezelColor,
              borderRadius: '2px 0 0 2px',
              marginTop: '10px'
            }} />
          </>
        )}
      </div>

      {/* Info Panel */}
      <div style={{
        marginTop: '1rem',
        padding: '1rem',
        backgroundColor: 'var(--layera-bg-primary)',
        borderRadius: '8px',
        boxShadow: '0 2px 4px color-mix(in srgb, var(--layera-bg-secondary) 10%, transparent 90%)',
        maxWidth: '600px',
        textAlign: 'center'
      }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--layera-text-primary)' }}>
          Device Simulation Active
        </h4>
        <p style={{ margin: 0, color: 'var(--layera-text-secondary)', fontSize: '0.875rem' }}>
          Η εφαρμογή εμφανίζεται όπως θα φαίνεται σε πραγματική {spec.name} συσκευή.
          Χρησιμοποίησε τα Device Switcher buttons για εναλλαγή συσκευών.
        </p>
      </div>
    </div>
  );
};

export default DeviceSimulator;