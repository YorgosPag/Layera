/**
 * @layera/draggable - Enterprise Draggable FAB Component
 *
 * Reusable Floating Action Button με built-in draggable functionality
 * Ακολουθεί LEGO design principles και enterprise architecture patterns
 */

import React from 'react';
import type { DraggableFABProps, DraggableThemeSystem } from '../types';
import { useDraggableRightBottom } from '../hooks/useDraggable';

// ===============================
// Theme System Definition
// ===============================

const DRAGGABLE_FAB_THEME: DraggableThemeSystem = {
  variants: {
    primary: {
      backgroundColor: 'rgb(16, 185, 129)', // Layera emerald
      borderColor: '#FFFFFF',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
      borderRadius: '50%',
      transition: 'all 0.2s ease'
    },
    secondary: {
      backgroundColor: 'rgb(107, 114, 128)',
      borderColor: '#FFFFFF',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
      borderRadius: '50%',
      transition: 'all 0.2s ease'
    },
    success: {
      backgroundColor: 'rgb(16, 185, 129)',
      borderColor: '#FFFFFF',
      boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)',
      borderRadius: '50%',
      transition: 'all 0.2s ease'
    },
    warning: {
      backgroundColor: 'rgb(245, 158, 11)',
      borderColor: '#FFFFFF',
      boxShadow: '0 8px 24px rgba(245, 158, 11, 0.4)',
      borderRadius: '50%',
      transition: 'all 0.2s ease'
    },
    error: {
      backgroundColor: 'rgb(239, 68, 68)',
      borderColor: '#FFFFFF',
      boxShadow: '0 8px 24px rgba(239, 68, 68, 0.4)',
      borderRadius: '50%',
      transition: 'all 0.2s ease'
    }
  },
  sizes: {
    sm: {
      width: 48,
      height: 48,
      fontSize: '16px',
      padding: '12px'
    },
    md: {
      width: 56,
      height: 56,
      fontSize: '18px',
      padding: '14px'
    },
    lg: {
      width: 64,
      height: 64,
      fontSize: '20px',
      padding: '16px'
    }
  },
  cursors: {
    default: 'grab',
    grabbing: 'grabbing',
    disabled: 'not-allowed'
  }
} as const;

// ===============================
// DraggableFAB Component
// ===============================

/**
 * Enterprise Draggable Floating Action Button
 *
 * Features:
 * - Fully draggable με mouse και touch support
 * - Multiple size variants (sm, md, lg)
 * - Multiple theme variants (primary, secondary, success, warning, error)
 * - TypeScript type safety
 * - Boundary constraints
 * - Click protection κατά τη διάρκεια drag
 * - Performance optimized
 */
export const DraggableFAB: React.FC<DraggableFABProps> = ({
  icon,
  onClick,
  initialPosition = { right: 15, bottom: 15 },
  config = {},
  eventHandlers = {},
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  style = {},
  constrainRef,
  'data-testid': testId
}) => {
  // Theme configuration
  const themeVariant = DRAGGABLE_FAB_THEME.variants[variant];
  const sizeConfig = DRAGGABLE_FAB_THEME.sizes[size];
  const cursors = DRAGGABLE_FAB_THEME.cursors;

  // Draggable functionality
  const {
    position,
    isDragging,
    dragHandlers,
    setPosition,
    resetPosition
  } = useDraggableRightBottom(
    initialPosition,
    {
      disabled,
      dragThreshold: 2,
      constrainToParent: true,
      constrainEl: constrainRef?.current || null,
      ...config
    },
    eventHandlers
  );

  // Click handler με drag protection
  const handleClick = (e: React.MouseEvent) => {
    // Δεν ενεργοποιούμε click αν έγινε drag
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    // Haptic feedback για mobile devices
    if ('vibrate' in navigator) {
      navigator.vibrate(30);
    }

    onClick?.();
  };

  // Dynamic styles
  const fabStyles: React.CSSProperties = {
    // Position and layout - use absolute for container constraint
    position: 'absolute',
    right: position.right,
    bottom: position.bottom,
    width: sizeConfig.width,
    height: sizeConfig.height,

    // Visual styling
    borderRadius: themeVariant.borderRadius,
    backgroundColor: themeVariant.backgroundColor,
    border: `4px solid ${themeVariant.borderColor}`,
    boxShadow: themeVariant.boxShadow,

    // Flexbox centering
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    // Typography
    fontSize: sizeConfig.fontSize,
    color: 'white',
    fontWeight: '600',

    // Interaction
    cursor: disabled ? cursors.disabled : (isDragging ? cursors.grabbing : cursors.default),
    transition: isDragging ? 'none' : themeVariant.transition,

    // User selection prevention
    userSelect: 'none',
    WebkitUserSelect: 'none',
    WebkitTouchCallout: 'none',
    WebkitTapHighlightColor: 'transparent',

    // High z-index for floating behavior
    zIndex: 10000,

    // Force visibility
    visibility: 'visible',
    opacity: disabled ? 0.6 : 1,
    touchAction: 'none', // αποτρέπει scroll κατά το drag

    // Accessibility
    outline: 'none',

    // Disable text selection
    MozUserSelect: 'none',
    msUserSelect: 'none',

    // Apply custom styles
    ...style,

    // Disabled state overrides
    ...(disabled && {
      pointerEvents: 'none'
    })
  };

  return (
    <div
      onClick={handleClick}
      onPointerDown={dragHandlers.onPointerDown}
      onPointerMove={dragHandlers.onPointerMove}
      onPointerUp={dragHandlers.onPointerUp}
      style={fabStyles}
      className={className}
      data-testid={testId || `draggable-fab-${variant}-${size}`}
      aria-label="Draggable floating action button"
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        // Keyboard accessibility
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (!disabled && !isDragging) {
            onClick?.();
          }
        }
      }}
    >
      {icon}
    </div>
  );
};

// ===============================
// Default Export
// ===============================

export default DraggableFAB;