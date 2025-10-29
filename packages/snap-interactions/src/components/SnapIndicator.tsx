/**
 * 🎯 SnapIndicator Component
 * Visual indicator για snap points - χρησιμοποιεί existing LEGO systems
 */

import React from 'react';

// Import από existing LEGO systems - ΜΗΝ αναδημιουργήσεις
import { useTheme } from '@layera/theme-switcher';
import { useLayeraTranslation } from '@layera/tolgee';
import { SPACING_SCALE, BORDER_RADIUS_SCALE, SNAP_VISUAL } from '@layera/constants';
import { Icon } from '@layera/icons';
import { Box } from '@layera/layout';

// Import από snap engine
import type { SnapResult, SnapType } from '@layera/snap-engine';

// ========================================
// 🎯 COMPONENT INTERFACES
// ========================================

export interface SnapIndicatorProps {
  snapResult: SnapResult;
  visible: boolean;
  size?: number;
  animated?: boolean;
  showTooltip?: boolean;
  className?: string;
}

// ========================================
// 🎨 SNAP TYPE VISUAL MAPPING
// ========================================

const SNAP_ICONS: Record<SnapType, string> = {
  endpoint: 'square',
  midpoint: 'triangle',
  center: 'circle',
  vertex: 'diamond',
  intersection: 'cross',
  perpendicular: 'perpendicular',
  tangent: 'tangent',
  nearest: 'target',
  grid: 'grid',
  edge: 'line'
};

// Use existing SNAP_VISUAL from @layera/constants - Single Source of Truth
const SNAP_COLORS = SNAP_VISUAL.COLORS;

// ========================================
// 🎯 SNAP INDICATOR COMPONENT
// ========================================

export const SnapIndicator: React.FC<SnapIndicatorProps> = ({
  snapResult,
  visible,
  size = 16,
  animated = true,
  showTooltip = true,
  className = ''
}) => {
  // Existing LEGO systems integration - ΜΗΝ αναδημιουργήσεις
  const { theme } = useTheme();
  const { t } = useLayeraTranslation();

  // Early return αν δεν είναι snapped ή visible
  if (!visible || !snapResult.snapped || !snapResult.target) {
    return null;
  }

  const { target, snapPoint, snapType } = snapResult;
  const iconName = SNAP_ICONS[snapType!] || 'circle';
  const colors = SNAP_COLORS[theme] || SNAP_COLORS.light;
  const color = colors[snapType!] || colors.nearest;

  // ========================================
  // 🎨 STYLES - Χρησιμοποιεί theme από @layera/theme-switcher
  // ========================================

  const indicatorStyle: React.CSSProperties = {
    position: 'absolute',
    left: snapPoint.x - size / 2,
    top: snapPoint.y - size / 2,
    width: size,
    height: size,
    pointerEvents: 'none',
    zIndex: 10000,
    borderRadius: BORDER_RADIUS_SCALE.CIRCLE,
    backgroundColor: color,
    border: `2px solid ${theme === 'dark' ? 'var(--la-color-white, var(--la-color-surface))' : 'var(--la-color-black, #000000)'}`,
    boxShadow: `0 0 8px ${color}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: animated ? 'scale(1)' : 'scale(1)',
    transition: animated ? 'all 0.2s ease-in-out' : 'none',
    animation: animated ? 'snapPulse 0.6s ease-in-out' : 'none'
  };

  const tooltipStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    marginBottom: `${SPACING_SCALE.XS}px`,
    padding: `${SPACING_SCALE.XS - 4}px ${SPACING_SCALE.XS}px`,
    backgroundColor: theme === 'dark' ? 'var(--la-color-slate-700, #2c3e50)' : 'var(--la-color-gray-100, #ecf0f1)',
    color: theme === 'dark' ? 'var(--la-color-gray-100, #ecf0f1)' : 'var(--la-color-slate-700, #2c3e50)',
    border: `1px solid ${theme === 'dark' ? 'var(--la-color-slate-600, #34495e)' : 'var(--la-color-gray-300, #bdc3c7)'}`,
    borderRadius: `${SPACING_SCALE.XS - 4}px`,
    fontSize: 'var(--la-font-size-xs)',
    fontWeight: 500,
    whiteSpace: 'nowrap',
    boxShadow: 'var(--la-shadow-sm, 0 2px 4px var(--la-shadow-sm))',
    zIndex: 10001
  };

  // ========================================
  // 📝 TOOLTIP CONTENT - Χρησιμοποιεί @layera/tolgee
  // ========================================

  const tooltipContent = showTooltip ? (
    <Box style={tooltipStyle}>
      {t(`snap.types.${snapType}`, { defaultValue: snapType })}
      {target.metadata?.layer && (
        <Box fontSize="var(--la-font-size-xxs)" opacity={0.8}>
          {t('snap.layer')}: {target.metadata.layer}
        </Box>
      )}
    </Box>
  ) : null;

  // ========================================
  // 🎯 RENDER
  // ========================================

  return (
    <Box style={indicatorStyle} className={className}>
      {/* Icon από @layera/icons - ΜΗΝ δημιουργήσεις custom icons */}
      <Icon
        name={iconName}
        size={size * 0.6}
        color={theme === 'dark' ? 'var(--la-color-white, var(--la-color-surface))' : 'var(--la-color-black, #000000)'}
      />

      {/* Tooltip */}
      {tooltipContent}

      {/* CSS Animation για pulse effect */}
      <style>{`
        @keyframes snapPulse {
          0% {
            transform: scale(0.8);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </Box>
  );
};

// ========================================
// 🎯 SNAP CURSOR COMPONENT
// ========================================

export interface SnapCursorProps {
  snapResult: SnapResult;
  cursorPosition: { x: number; y: number };
  visible: boolean;
  size?: number;
}

export const SnapCursor: React.FC<SnapCursorProps> = ({
  snapResult,
  cursorPosition,
  visible,
  size = 24
}) => {
  const { theme } = useTheme();

  if (!visible) return null;

  const isSnapped = snapResult.snapped;
  const position = isSnapped ? snapResult.snapPoint : cursorPosition;

  const cursorStyle: React.CSSProperties = {
    position: 'absolute',
    left: position.x - size / 2,
    top: position.y - size / 2,
    width: size,
    height: size,
    pointerEvents: 'none',
    zIndex: 9999,
    border: `2px solid ${isSnapped ? 'var(--la-color-red-600, #e74c3c)' : theme === 'dark' ? 'var(--la-color-gray-100, #ecf0f1)' : 'var(--la-color-slate-700, #2c3e50)'}`,
    borderRadius: BORDER_RADIUS_SCALE.CIRCLE,
    backgroundColor: isSnapped ? 'var(--la-color-red-600-alpha-20, rgba(231, 76, 60, 0.2))' : 'transparent',
    transition: 'all 0.1s ease-out',
    transform: isSnapped ? 'scale(1.2)' : 'scale(1)'
  };

  return <Box style={cursorStyle} />;
};

// ========================================
// 🎯 SNAP GUIDELINES COMPONENT
// ========================================

export interface SnapGuidelinesProps {
  snapResult: SnapResult;
  cursorPosition: { x: number; y: number };
  visible: boolean;
  showDistance?: boolean;
}

export const SnapGuidelines: React.FC<SnapGuidelinesProps> = ({
  snapResult,
  cursorPosition,
  visible,
  showDistance = true
}) => {
  const { theme } = useTheme();
  const { t } = useLayeraTranslation();

  if (!visible || !snapResult.snapped || !snapResult.target) {
    return null;
  }

  const { snapPoint } = snapResult;
  const lineColor = theme === 'dark' ? 'var(--la-color-gray-100, #ecf0f1)' : 'var(--la-color-slate-700, #2c3e50)';

  // Calculate line από cursor σε snap point
  const lineStyle: React.CSSProperties = {
    position: 'absolute',
    left: Math.min(cursorPosition.x, snapPoint.x),
    top: Math.min(cursorPosition.y, snapPoint.y),
    width: Math.abs(snapPoint.x - cursorPosition.x),
    height: Math.abs(snapPoint.y - cursorPosition.y),
    pointerEvents: 'none',
    zIndex: 9998,
    borderTop: `1px dashed ${lineColor}`,
    opacity: 0.6,
    transform: `rotate(${Math.atan2(
      snapPoint.y - cursorPosition.y,
      snapPoint.x - cursorPosition.x
    )}rad)`,
    transformOrigin: 'left top'
  };

  // Distance label
  const distance = Math.round(snapResult.distance);
  const midPointX = (cursorPosition.x + snapPoint.x) / 2;
  const midPointY = (cursorPosition.y + snapPoint.y) / 2;

  const distanceLabelStyle: React.CSSProperties = {
    position: 'absolute',
    left: midPointX,
    top: midPointY - 20,
    transform: 'translateX(-50%)',
    padding: `${SPACING_SCALE.XS}px ${SPACING_SCALE.XS + SPACING_SCALE.XS}px`,
    backgroundColor: theme === 'dark' ? 'var(--la-color-slate-700, #2c3e50)' : 'var(--la-color-gray-100, #ecf0f1)',
    color: theme === 'dark' ? 'var(--la-color-gray-100, #ecf0f1)' : 'var(--la-color-slate-700, #2c3e50)',
    border: `1px solid ${theme === 'dark' ? 'var(--la-color-slate-600, #34495e)' : 'var(--la-color-gray-300, #bdc3c7)'}`,
    borderRadius: `${BORDER_RADIUS_SCALE.XXS}px`,
    fontSize: '11px',
    fontWeight: 500,
    pointerEvents: 'none',
    zIndex: 10000
  };

  return (
    <>
      {/* Guideline */}
      <Box style={lineStyle} />

      {/* Distance label */}
      {showDistance && distance > 5 && (
        <Box style={distanceLabelStyle}>
          {distance}px
        </Box>
      )}
    </>
  );
};