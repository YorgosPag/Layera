// Layera Shared - Viewport Debugger Component
// Enterprise pattern: Development tool για viewport testing
// Usage: Προσθήκη στην επικεφαλίδα για debugging

import React, { useState } from 'react';
import { useViewport } from '../hooks/useViewport';
import { MobileIcon, TabletIcon, DesktopIcon, TabletLandscapeIcon } from './icons/ViewportIcons';
import { Box } from '@layera/layout';
import { Button } from '@layera/buttons';
import { SPACING_SCALE, BORDER_RADIUS_SCALE } from '@layera/constants';

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

  const getPositionStyles = (): React.ReactNode => {
    const baseStyles: React.CSSProperties = {
      position: 'fixed',
      zIndex: 'var(--la-z-modal)', // Enterprise CSS Custom Property - Single Source of Truth
      backgroundColor: 'color-mix(in srgb, var(--la-bg-secondary) 90%, transparent 10%)',
      color: 'var(--la-text-primary)',
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

  const getOrientationIcon = (): void => {
    return viewport.orientation === 'portrait' ? <MobileIcon size="xs" theme="neutral" /> : <TabletLandscapeIcon size="xs" theme="neutral" />;
  };

  if (!isVisible && !showAlways) {
    return (
      <Box style={getPositionStyles()}>
        <Button
          onClick={(): void => setIsVisible(true)}
          variant="ghost"
          size="sm"
          padding={`${SPACING_SCALE.SM}px`}
          title="Show Viewport Debugger"
        >
          🔍
        </Button>
      </Box>
    );
  }

  return (
    <Box style={getPositionStyles()}>
      {!showAlways && (
        <Button
          onClick={(): void => setIsVisible(false)}
          variant="ghost"
          size="xs"
          position="absolute"
          top="var(--la-space-1)" /* 🎯 SST: XS spacing */
          right="var(--la-space-1)" /* 🎯 SST: XS spacing */
          color="var(--la-text-primary)"
          fontSize="var(--la-font-size-xs)"
          title="Hide Debugger"
        >
          ✕
        </Button>
      )}

      <Box marginTop={!showAlways ? `${SPACING_SCALE.MD}px` : '0'}>
        <Box
          display="flex"
          alignItems="center"
          gap={`${SPACING_SCALE.SM}px`}
          marginBottom={compact ? 'var(--la-space-1)' : 'var(--la-space-2)'} /* 🎯 SST: XS/SM conditional spacing */
        >
          <span>{getDeviceIcon()}</span>
          <strong>{viewport.deviceType.toUpperCase()}</strong>
          <span>{getOrientationIcon()}</span>
          <span>{viewport.orientation}</span>
        </Box>

        {!compact && (
          <>
            <Box>📐 {viewport.width} × {viewport.height}px</Box>
            <Box marginTop={`${SPACING_SCALE.SM}px`} fontSize="var(--la-font-size-xs)" opacity={0.8}>
              Mobile: {viewport.isMobile ? '✅' : '❌'} |
              Tablet: {viewport.isTablet ? '✅' : '❌'} |
              Desktop: {viewport.isDesktop ? '✅' : '❌'}
            </Box>
          </>
        )}

        {compact && (
          <Box>{viewport.width}×{viewport.height}</Box>
        )}
      </Box>
    </Box>
  );
};

export default ViewportDebugger;