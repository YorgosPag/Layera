// Layera Shared - Viewport Debugger Component
// Enterprise pattern: Development tool για viewport testing
// Usage: Προσθήκη στην επικεφαλίδα για debugging

import React, { useState } from 'react';
import { useViewport } from '../hooks/useViewport';
import { MobileIcon, TabletIcon, DesktopIcon, TabletLandscapeIcon } from './icons/ViewportIcons';

interface ViewportDebuggerProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  showAlways?: boolean;
  compact?: boolean;
}

/**
 * Enterprise Viewport Debugger
 * Shows current device type, dimensions, and orientation
 * Χρήσιμο για development και testing responsive behavior
 */
export const ViewportDebugger: React.FC<ViewportDebuggerProps> = ({
  position = 'top-right',
  showAlways = false,
  compact = false
}) => {
  const viewport = useViewport();
  const [isVisible, setIsVisible] = useState(showAlways);

  // Don't show in production unless explicitly requested
  if (process.env.NODE_ENV === 'production' && !showAlways) {
    return null;
  }

  const getPositionStyles = () => {
    const baseStyles: React.CSSProperties = {
      position: 'fixed',
      zIndex: 9999,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: compact ? '0.5rem' : '1rem',
      borderRadius: '6px',
      fontSize: compact ? '0.75rem' : '0.875rem',
      fontFamily: 'monospace',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(4px)'
    };

    switch (position) {
      case 'top-left':
        return { ...baseStyles, top: '1rem', left: '1rem' };
      case 'top-right':
        return { ...baseStyles, top: '1rem', right: '1rem' };
      case 'bottom-left':
        return { ...baseStyles, bottom: '1rem', left: '1rem' };
      case 'bottom-right':
        return { ...baseStyles, bottom: '1rem', right: '1rem' };
      default:
        return { ...baseStyles, top: '1rem', right: '1rem' };
    }
  };

  const getDeviceIcon = () => {
    switch (viewport.deviceType) {
      case 'mobile':
        return <MobileIcon size="xs" theme="neutral" />;
      case 'tablet':
        return <TabletIcon size="xs" theme="neutral" />;
      case 'desktop':
        return <DesktopIcon size="xs" theme="neutral" />;
      default:
        return <MobileIcon size="xs" theme="neutral" />;
    }
  };

  const getOrientationIcon = () => {
    return viewport.orientation === 'portrait' ? <MobileIcon size="xs" theme="neutral" /> : <TabletLandscapeIcon size="xs" theme="neutral" />;
  };

  if (!isVisible && !showAlways) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        style={{
          ...getPositionStyles(),
          padding: '0.5rem',
          cursor: 'pointer',
          border: 'none',
          backgroundColor: 'rgba(0, 0, 0, 0.6)'
        }}
        title="Show Viewport Debugger"
      >
        🔍
      </button>
    );
  }

  return (
    <div style={getPositionStyles()}>
      {!showAlways && (
        <button
          onClick={() => setIsVisible(false)}
          style={{
            position: 'absolute',
            top: '0.25rem',
            right: '0.25rem',
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '0.75rem'
          }}
          title="Hide Debugger"
        >
          ✕
        </button>
      )}

      <div style={{ marginTop: !showAlways ? '1rem' : '0' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: compact ? '0.25rem' : '0.5rem'
        }}>
          <span>{getDeviceIcon()}</span>
          <strong>{viewport.deviceType.toUpperCase()}</strong>
          <span>{getOrientationIcon()}</span>
          <span>{viewport.orientation}</span>
        </div>

        {!compact && (
          <>
            <div>📐 {viewport.width} × {viewport.height}px</div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', opacity: 0.8 }}>
              Mobile: {viewport.isMobile ? '✅' : '❌'} |
              Tablet: {viewport.isTablet ? '✅' : '❌'} |
              Desktop: {viewport.isDesktop ? '✅' : '❌'}
            </div>
          </>
        )}

        {compact && (
          <div>{viewport.width}×{viewport.height}</div>
        )}
      </div>
    </div>
  );
};

export default ViewportDebugger;