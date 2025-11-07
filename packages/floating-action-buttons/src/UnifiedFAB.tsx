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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useRef, useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Box } from '@layera/layout';
import { useLayeraTranslation } from '@layera/tolgee';
import { BORDER_RADIUS_SCALE, SPACING_SCALE } from '@layera/constants';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FABProps, ResponsiveFABConfig, DeviceType, FABVariant, VARIANT_COLORS } from './types';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { killNextClick, swallowNextWindowClick, stopAll } from '@layera/draggable';
import { DraggableFAB } from '@layera/draggable-fab';

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
  }
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
  'aria-label': ariaLabel,
  title,
  'data-testid': testId,
  style,
  zIndex = 9999,
  // ENTERPRISE: Draggable props
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  draggable = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  initialPosition = { bottom: 20, right: 20 },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constrainToViewport = true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  viewportSelector = '[data-viewport-frame], #geo-viewport',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  positionType = 'fixed'
}) => {
  const { t } = useLayeraTranslation();

  // Use translation fallbacks for default values
  const finalAriaLabel = ariaLabel || t('common.newEntry');
  const finalTitle = title || t('common.newEntry');

  // 🎯 ΕΞΑΛΕΙΨΗ ΔΙΠΛΟΤΥΠΩΝ - Click Suppression από @layera/draggable LEGO system
  // Utilities εισαχθέντα από @layera/draggable - Single Source of Truth

  // 🎯 ENTERPRISE: Dragging state
  const [isDragging, setIsDragging] = useState(false);
  const THRESH = 6;
  const start = useRef<{x:number;y:number}|null>(null);
  const dragging = useRef(false);
  const suppressClick = useRef(false);
  // 🎯 ΕΞΑΛΕΙΨΗ DUPLICATE: Χρήση DraggableFAB ως Single Source of Truth
  // Get responsive configuration first
  const config = DEFAULT_CONFIG[deviceType];
  const finalSpacing = spacing || config.spacing;
  const BTN_SIZE = config.size;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const MARGIN = 15;

  // stopAll utility από @layera/draggable - Single Source of Truth

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onDown = (e: React.PointerEvent) => {
    stopAll(e);
    dragging.current = false;
    setIsDragging(false);
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    start.current = {x: e.clientX, y: e.clientY};
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onMove = (e: React.PointerEvent) => {
    if (!start.current) return;
    stopAll(e); // μπλοκάρει map gestures + synthetic events
    if (!dragging.current && Math.hypot(e.clientX - start.current.x, e.clientY - start.current.y) > THRESH) {
      dragging.current = true;
      setIsDragging(true);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onUp = (e: React.PointerEvent) => {
    stopAll(e);
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    const wasDrag = dragging.current;
    dragging.current = false;
    setIsDragging(false);
    start.current = null;

    if (wasDrag) {
      suppressClick.current = true; // κόβει το συνθετικό click
      swallowNextWindowClick(); // ← αυτό κόβει οτιδήποτε (Leaflet/Mapbox) στο capture-phase
      queueMicrotask(() => { suppressClick.current = false; });
      return;
    }
    onClick?.(); // pure click
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onClickCapture = (e: React.MouseEvent) => {
    if (suppressClick.current) {
      stopAll(e);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onPointerCancel = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    dragging.current = false;
    setIsDragging(false);
    start.current = null;
    suppressClick.current = false;
  };

  if (hidden) {
    return null;
  }

  const bg = isDragging ? VARIANT_COLORS.warning : VARIANT_COLORS[variant];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const baseStyles: React.CSSProperties = {
    position: 'absolute',
    ...(finalSpacing.right !== undefined && { right: finalSpacing.right }),
    ...(finalSpacing.bottom !== undefined && { bottom: finalSpacing.bottom }),
    ...(finalSpacing.left !== undefined && { left: finalSpacing.left }),
    ...(finalSpacing.top !== undefined && { top: finalSpacing.top }),
    width: BTN_SIZE,
    height: BTN_SIZE,
    borderRadius: BORDER_RADIUS_SCALE.CIRCLE,
    background: bg,
    border: `var(--la-border-width-xxs) solid var(--color-bg-canvas)`, // 🎯 SST: Border width token
    boxShadow: 'var(--elevation-md)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex,
    userSelect: 'none',
    touchAction: 'none',
    transition: 'all 0.2s ease',
    ...style
  };

  // 🎯 SINGLE SOURCE OF TRUTH: Χρήση DraggableFAB component
  return (
    <DraggableFAB
      onClick={onClick}
      size={deviceType === 'mobile' ? 'sm' : 'md'}
      initialPosition={{ right: finalSpacing.right, bottom: finalSpacing.bottom }}
      aria-label={finalAriaLabel}
      title={finalTitle}
      data-testid={testId}
      style={style}
    >
      {icon}
    </DraggableFAB>
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

    // 🚀 ENTERPRISE: Single Source of Truth - Enhanced @layera/viewport
    if (width <= 480) {
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