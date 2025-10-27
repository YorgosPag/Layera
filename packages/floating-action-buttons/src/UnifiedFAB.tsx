/**
 * UnifiedFAB.tsx - Enterprise Floating Action Button
 *
 * Single source of truth για FAB components στο Layera ecosystem.
 * Αντικαθιστά όλα τα duplicate FAB implementations με unified API.
 *
 * ENTERPRISE FEATURES:
 * - Simulation-aware positioning για device frames
 * - Draggable functionality με viewport constraints
 * - Responsive sizing per device type
 * - Unified API για όλες τις FAB χρήσεις
 */

import React, { useState, useRef, useEffect } from 'react';
import { Box } from '@layera/layout';
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

// Enterprise draggable state interfaces
interface FabPosition {
  x: number;
  y: number;
}

interface DragStart {
  x: number;
  y: number;
  px: number;
  py: number;
}

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
  zIndex = 9999,
  // ENTERPRISE: Draggable props
  draggable = false,
  initialPosition = { bottom: 20, right: 20 },
  constrainToViewport = true,
  viewportSelector = '[data-viewport-frame], #geo-viewport',
  positionType = 'fixed'
}) => {
  // Get responsive configuration first
  const config = DEFAULT_CONFIG[deviceType];
  const finalSpacing = spacing || config.spacing;
  const BTN_SIZE = config.size;
  const MARGIN = 15;

  // 🚀 ENTERPRISE: Draggable state management
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [fabPos, setFabPos] = useState<FabPosition>(() => {
    // Initialize position from props
    if (initialPosition.right !== undefined || initialPosition.bottom !== undefined) {
      // Convert right/bottom to x/y if provided
      const x = initialPosition.right !== undefined ?
        (typeof window !== 'undefined' ? window.innerWidth - initialPosition.right - BTN_SIZE : 20) :
        initialPosition.x ?? 20;
      const y = initialPosition.bottom !== undefined ?
        (typeof window !== 'undefined' ? window.innerHeight - initialPosition.bottom - BTN_SIZE : 20) :
        initialPosition.y ?? 20;
      return { x, y };
    }
    return { x: initialPosition.x ?? 20, y: initialPosition.y ?? 20 };
  });
  const startRef = useRef<DragStart | null>(null);

  if (hidden) {
    return null;
  }

  // 🚀 ENTERPRISE: Viewport constraint logic for simulation systems
  useEffect(() => {
    if (!draggable || !constrainToViewport || positionType === 'fixed') return;

    const clamp = () => {
      const frame = document.querySelector(viewportSelector);
      if (!frame) return;

      const rect = frame.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      // Ensure FAB stays within simulation frame bounds
      const maxX = Math.max(0, rect.width - BTN_SIZE - MARGIN);
      const maxY = Math.max(0, rect.height - BTN_SIZE - MARGIN);

      const x = Math.max(MARGIN, Math.min(maxX, fabPos.x));
      const y = Math.max(MARGIN, Math.min(maxY, fabPos.y));

      if (x !== fabPos.x || y !== fabPos.y) {
        setFabPos({ x, y });
      }
    };

    clamp();
    window.addEventListener('resize', clamp);
    const visualViewport = window.visualViewport;
    visualViewport?.addEventListener('resize', clamp);
    visualViewport?.addEventListener('scroll', clamp);

    return () => {
      window.removeEventListener('resize', clamp);
      visualViewport?.removeEventListener('resize', clamp);
      visualViewport?.removeEventListener('scroll', clamp);
    };
  }, [fabPos.x, fabPos.y, draggable, constrainToViewport, positionType, viewportSelector, BTN_SIZE]);

  // 🚀 ENTERPRISE: Drag handler for simulation systems
  const handleFabPointerDown = (e: React.PointerEvent) => {
    if (!draggable || positionType === 'fixed') return;

    // Find the viewport frame for simulation systems
    const frame = document.querySelector(viewportSelector);
    if (!frame) return;

    frameRef.current = frame as HTMLDivElement;
    const rect = frame.getBoundingClientRect();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    startRef.current = { x: e.clientX, y: e.clientY, px: fabPos.x, py: fabPos.y };

    const onMove = (ev: PointerEvent) => {
      if (!startRef.current || !rect) return;
      const dx = ev.clientX - startRef.current.x;
      const dy = ev.clientY - startRef.current.y;

      // Constrain to simulation frame bounds
      const maxX = Math.max(0, rect.width - BTN_SIZE - MARGIN);
      const maxY = Math.max(0, rect.height - BTN_SIZE - MARGIN);

      const nx = Math.max(MARGIN, Math.min(maxX, startRef.current.px + dx));
      const ny = Math.max(MARGIN, Math.min(maxY, startRef.current.py + dy));

      setFabPos({ x: nx, y: ny });
    };

    const onUp = () => {
      startRef.current = null;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  // 🎯 ENTERPRISE: Smart style computation για simulation compatibility
  const baseStyles: React.CSSProperties = {
    position: 'absolute',
    ...(positionType === 'fixed' || !draggable ? {
      // Static positioning για non-draggable FABs
      right: finalSpacing.right,
      bottom: finalSpacing.bottom,
    } : {
      // Dynamic positioning για draggable FABs
      left: `${fabPos.x}px`,
      top: `${fabPos.y}px`,
    }),
    width: BTN_SIZE,
    height: BTN_SIZE,
    borderRadius: BORDER_RADIUS_SCALE.CIRCLE,
    background: VARIANT_COLORS[variant],
    border: '2px solid var(--color-bg-canvas)',
    boxShadow: 'var(--elevation-md)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: draggable && positionType !== 'fixed' ? 'grab' : 'pointer',
    zIndex,
    userSelect: 'none',
    touchAction: draggable ? 'none' : 'auto',
    transition: positionType === 'fixed' ? 'all 0.2s ease' : 'none',
    // Merge custom styles
    ...style
  };

  return (
    <Box
      onPointerDown={handleFabPointerDown}
      onClick={onClick}
      aria-label={ariaLabel}
      title={title}
      data-testid={testId}
      style={baseStyles}
    >
      {icon}
    </Box>
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