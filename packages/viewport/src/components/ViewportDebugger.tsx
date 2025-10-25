// Layera Shared - Viewport Debugger Component
// Enterprise pattern: Development tool για viewport testing
// Usage: Προσθήκη στην επικεφαλίδα για debugging

import React, { useState } from 'react';
import { useViewport } from '../hooks/useViewport';
import { MobileIcon, TabletIcon, DesktopIcon, TabletLandscapeIcon } from './icons/ViewportIcons';
import { Z_INDEX, SPACING_SCALE, BORDER_RADIUS_SCALE } from '@layera/constants';

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
      zIndex: Z_INDEX.modal,
      backgroundColor: 'color-mix(in srgb, var(--layera-bg-secondary) 90%, transparent 10%)',
      color: 'var(--layera-text-primary)',
      padding: compact ? `${SPACING_SCALE.SM}px` : `${SPACING_SCALE.MD}px`,
      borderRadius: `${BORDER_RADIUS_SCALE.INPUT}px`,
      fontSize: compact ? '0.75rem' : '0.875rem',
      fontFamily: 'monospace',
      border: '1px solid var(--color-border-subtle)',
      backdropFilter: 'blur(4px)'
    };

    switch (position) {
      case 'top-left':
        return { ...baseStyles, top: `${SPACING_SCALE.MD}px`, left: `${SPACING_SCALE.MD}px` };
      case 'top-right':
        return { ...baseStyles, top: `${SPACING_SCALE.MD}px`, right: `${SPACING_SCALE.MD}px` };
      case 'bottom-left':
        return { ...baseStyles, bottom: `${SPACING_SCALE.MD}px`, left: `${SPACING_SCALE.MD}px` };
      case 'bottom-right':
        return { ...baseStyles, bottom: `${SPACING_SCALE.MD}px`, right: `${SPACING_SCALE.MD}px` };
      default:
        return { ...baseStyles, top: `${SPACING_SCALE.MD}px`, right: `${SPACING_SCALE.MD}px` };
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
          padding: `${SPACING_SCALE.SM}px`,
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
            top: `${SPACING_SCALE.XS}px`,
            right: `${SPACING_SCALE.XS}px`,
            background: 'none',
            border: 'none',
            color: 'var(--layera-text-primary)',
            cursor: 'pointer',
            fontSize: '0.75rem'
          }}
          title="Hide Debugger"
        >
          ✕
        </button>
      )}

      <div style={{ marginTop: !showAlways ? `${SPACING_SCALE.MD}px` : '0' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: `${SPACING_SCALE.SM}px`,
          marginBottom: compact ? `${SPACING_SCALE.XS}px` : `${SPACING_SCALE.SM}px`
        }}>
          <span>{getDeviceIcon()}</span>
          <strong>{viewport.deviceType.toUpperCase()}</strong>
          <span>{getOrientationIcon()}</span>
          <span>{viewport.orientation}</span>
        </div>

        {!compact && (
          <>
            <div>📐 {viewport.width} × {viewport.height}px</div>
            <div style={{ marginTop: `${SPACING_SCALE.SM}px`, fontSize: '0.75rem', opacity: 0.8 }}>
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