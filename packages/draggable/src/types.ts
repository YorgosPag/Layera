/**
 * @layera/draggable - Enterprise Draggable Types
 *
 * Αυστηρά TypeScript interfaces για draggable functionality
 * Ακολουθεί enterprise patterns και αρχές type safety
 */

import React, { ReactNode, CSSProperties } from 'react';

// ===============================
// Core Draggable Types
// ===============================

/**
 * Position coordinates for draggable elements
 */
export interface DraggablePosition {
  readonly x: number;
  readonly y: number;
}

/**
 * Alternative position using CSS right/bottom properties
 * Useful for fixed positioned elements anchored to viewport edges
 */
export interface DraggablePositionRightBottom {
  readonly right: number;
  readonly bottom: number;
}

/**
 * Boundary constraints for draggable movement
 */
export interface DraggableBounds {
  readonly minX?: number;
  readonly maxX?: number;
  readonly minY?: number;
  readonly maxY?: number;
  readonly minRight?: number;
  readonly maxRight?: number;
  readonly minBottom?: number;
  readonly maxBottom?: number;
}

/**
 * Configuration options for draggable behavior
 */
export interface DraggableConfig {
  readonly disabled?: boolean;
  readonly axis?: 'x' | 'y' | 'both';
  readonly constrainEl?: HTMLElement | null;
  readonly bounds?: DraggableBounds;
  readonly dragThreshold?: number; // Minimum pixels to move before drag starts
  readonly enableTransition?: boolean;
  readonly constrainToParent?: boolean;
}

/**
 * Drag event data passed to event handlers
 */
export interface DragEventData {
  readonly startPosition: DraggablePosition;
  readonly currentPosition: DraggablePosition;
  readonly deltaX: number;
  readonly deltaY: number;
  readonly isDragging: boolean;
}

/**
 * Event handlers for drag lifecycle
 */
export interface DragEventHandlers {
  readonly onDragStart?: (data: DragEventData) => void;
  readonly onDrag?: (data: DragEventData) => void;
  readonly onDragEnd?: (data: DragEventData) => void;
}

// ===============================
// Hook Return Types
// ===============================

/**
 * Return type for useDraggable hook
 */
export interface UseDraggableReturn {
  readonly position: DraggablePosition;
  readonly isDragging: boolean;
  readonly dragHandlers: {
    readonly onMouseDown: (e: React.MouseEvent) => React.ReactNode;
    readonly onMouseMove: (e: React.MouseEvent) => React.ReactNode;
    readonly onMouseUp: (e: React.MouseEvent) => React.ReactNode;
    readonly onTouchStart: (e: React.TouchEvent) => React.ReactNode;
    readonly onTouchMove: (e: React.TouchEvent) => React.ReactNode;
    readonly onTouchEnd: (e: React.TouchEvent) => React.ReactNode;
  };
  readonly setPosition: (position: DraggablePosition) => React.ReactNode;
  readonly resetPosition: () => React.ReactNode;
}

/**
 * Return type for useDraggableRightBottom hook (for fixed positioned elements)
 */
export interface UseDraggableRightBottomReturn {
  readonly position: DraggablePositionRightBottom;
  readonly isDragging: boolean;
  readonly dragHandlers: {
    readonly onPointerDown: (e: React.PointerEvent) => React.ReactNode;
    readonly onPointerMove: (e: React.PointerEvent) => React.ReactNode;
    readonly onPointerUp: (e: React.PointerEvent) => React.ReactNode;
  };
  readonly setPosition: (position: DraggablePositionRightBottom) => React.ReactNode;
  readonly resetPosition: () => React.ReactNode;
}

// ===============================
// Component Props Types
// ===============================

/**
 * Base props for draggable wrapper components
 */
export interface DraggableWrapperProps {
  readonly children: ReactNode;
  readonly initialPosition?: DraggablePosition;
  readonly config?: DraggableConfig;
  readonly eventHandlers?: DragEventHandlers;
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly 'data-testid'?: string;
}

/**
 * Props for FAB (Floating Action Button) specific draggable component
 */
export interface DraggableFABProps {
  readonly icon: ReactNode;
  readonly onClick?: () => void;
  readonly initialPosition?: DraggablePositionRightBottom;
  readonly config?: DraggableConfig;
  readonly eventHandlers?: DragEventHandlers;
  readonly variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  readonly size?: 'sm' | 'md' | 'lg';
  readonly disabled?: boolean;
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly constrainRef?: React.RefObject<HTMLElement>;
  readonly 'data-testid'?: string;
}

// ===============================
// Utility Types
// ===============================

/**
 * Theme configuration for draggable components
 */
export interface DraggableTheme {
  readonly backgroundColor: string;
  readonly borderColor: string;
  readonly boxShadow: string;
  readonly borderRadius: string;
  readonly transition: string;
}

/**
 * Size configuration for different component sizes
 */
export interface DraggableSizeConfig {
  readonly width: number;
  readonly height: number;
  readonly fontSize: string;
  readonly padding: string;
}

/**
 * Complete theme system for draggable components
 */
export interface DraggableThemeSystem {
  readonly variants: Record<'primary' | 'secondary' | 'success' | 'warning' | 'error', DraggableTheme>;
  readonly sizes: Record<'sm' | 'md' | 'lg', DraggableSizeConfig>;
  readonly cursors: {
    readonly default: string;
    readonly grabbing: string;
    readonly disabled: string;
  };
}

// ===============================
// Validation & Error Types
// ===============================

/**
 * Error types that can occur during dragging
 */
export type DraggableError =
  | 'INVALID_POSITION'
  | 'BOUNDS_EXCEEDED'
  | 'TOUCH_NOT_SUPPORTED'
  | 'DRAG_DISABLED'
  | 'UNKNOWN_ERROR';

/**
 * Result type for operations that can fail
 */
export interface DraggableResult<T> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: DraggableError;
  readonly message?: string;
}

// ===============================
// Advanced Configuration Types
// ===============================

/**
 * Performance optimization options
 */
export interface DraggablePerformanceConfig {
  readonly throttleMs?: number;
  readonly useRAF?: boolean; // Use requestAnimationFrame
  readonly enableHardwareAcceleration?: boolean;
}

/**
 * Accessibility options for draggable components
 */
export interface DraggableA11yConfig {
  readonly ariaLabel?: string;
  readonly ariaDescription?: string;
  readonly keyboardSupport?: boolean;
  readonly announcePosition?: boolean;
}

/**
 * Complete advanced configuration
 */
export interface AdvancedDraggableConfig extends DraggableConfig {
  readonly performance?: DraggablePerformanceConfig;
  readonly accessibility?: DraggableA11yConfig;
  readonly debug?: boolean;
}