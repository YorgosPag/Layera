/**
 * UnifiedFAB.tsx - Enterprise Floating Action Button
 *
 * Single source of truth για FAB components στο Layera ecosystem.
 * Αντικαθιστά όλα τα duplicate FAB implementations με unified API.
 */

import React from 'react';
import { BORDER_RADIUS_SCALE } from '@layera/constants';
import { FABProps, ResponsiveFABConfig, DeviceType, FABVariant } from './types';

const DEFAULT_CONFIG: ResponsiveFABConfig = {
  mobile: {
    size: 48,
    spacing: { right: 15, bottom: 15 }
  },
  tablet: {
    size: 56,
    spacing: { right: 20, bottom: 20 }
  },
  desktop: {
    size: 56,
    spacing: { right: 20, bottom: 20 }
  },
  iphone: {
    size: 56,
    spacing: { right: 20, bottom: 20 }
  }
};

const VARIANT_COLORS: Record<FABVariant, string> = {
  success: 'var(--layera-bg-success, #22C55E)',
  primary: 'var(--layera-bg-primary, #3B82F6)',
  secondary: 'var(--layera-bg-secondary, #6B7280)',
  danger: 'var(--layera-bg-danger, #EF4444)',
  warning: 'var(--layera-bg-warning, #F59E0B)'
};

export const UnifiedFAB: React.FC<FABProps> = ({
  onClick,
  icon,
  variant = 'success',
  deviceType = 'desktop',
  spacing,
  hidden = false,
  'aria-label': ariaLabel = 'Νέα Καταχώρηση',
  title = 'Νέα Καταχώρηση',
  'data-testid': testId,
  style,
  zIndex = 9999
}) => {
  if (hidden) {
    return null;
  }

  // Get responsive configuration
  const config = DEFAULT_CONFIG[deviceType];
  const finalSpacing = spacing || config.spacing;

  // Base styles που είναι κοινά σε όλα τα FAB
  const baseStyles: React.CSSProperties = {
    position: 'absolute',
    right: finalSpacing.right,
    bottom: finalSpacing.bottom,
    width: config.size,
    height: config.size,
    borderRadius: BORDER_RADIUS_SCALE.CIRCLE,
    background: VARIANT_COLORS[variant],
    border: '2px solid white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex,
    userSelect: 'none',
    // Merge custom styles
    ...style
  };

  return (
    <div
      onClick={onClick}
      aria-label={ariaLabel}
      title={title}
      data-testid={testId}
      style={baseStyles}
    >
      {icon}
    </div>
  );
};

// Convenience wrapper για όταν θέλουμε auto device detection
export interface ResponsiveFABProps extends Omit<FABProps, 'deviceType'> {
  /** Override auto-detection με συγκεκριμένο device type */
  forceDeviceType?: DeviceType;
}

export const ResponsiveFAB: React.FC<ResponsiveFABProps> = ({
  forceDeviceType,
  ...props
}) => {
  // Auto-detect device type από window size αν δεν είναι forced
  const detectedDeviceType = React.useMemo((): DeviceType => {
    if (forceDeviceType) {
      return forceDeviceType;
    }

    if (typeof window === 'undefined') {
      return 'desktop';
    }

    const width = window.innerWidth;

    // iPhone detection (θα μπορούσε να χρησιμοποιήσει @layera/device-detection)
    if (width <= 430) {
      return 'mobile';
    } else if (width <= 768) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  }, [forceDeviceType]);

  return (
    <UnifiedFAB
      {...props}
      deviceType={detectedDeviceType}
    />
  );
};