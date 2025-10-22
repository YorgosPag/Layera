import React, { ReactNode, CSSProperties } from 'react';

/**
 * @layera/draggable - Enterprise Draggable Types
 *
 * Αυστηρά TypeScript interfaces για draggable functionality
 * Ακολουθεί enterprise patterns και αρχές type safety
 */

/**
 * Position coordinates for draggable elements
 */
interface DraggablePosition {
    readonly x: number;
    readonly y: number;
}
/**
 * Alternative position using CSS right/bottom properties
 * Useful for fixed positioned elements anchored to viewport edges
 */
interface DraggablePositionRightBottom {
    readonly right: number;
    readonly bottom: number;
}
/**
 * Boundary constraints for draggable movement
 */
interface DraggableBounds {
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
interface DraggableConfig {
    readonly disabled?: boolean;
    readonly axis?: 'x' | 'y' | 'both';
    readonly constrainEl?: HTMLElement | null;
    readonly bounds?: DraggableBounds;
    readonly dragThreshold?: number;
    readonly enableTransition?: boolean;
    readonly constrainToParent?: boolean;
}
/**
 * Drag event data passed to event handlers
 */
interface DragEventData {
    readonly startPosition: DraggablePosition;
    readonly currentPosition: DraggablePosition;
    readonly deltaX: number;
    readonly deltaY: number;
    readonly isDragging: boolean;
}
/**
 * Event handlers for drag lifecycle
 */
interface DragEventHandlers {
    readonly onDragStart?: (data: DragEventData) => void;
    readonly onDrag?: (data: DragEventData) => void;
    readonly onDragEnd?: (data: DragEventData) => void;
}
/**
 * Return type for useDraggable hook
 */
interface UseDraggableReturn {
    readonly position: DraggablePosition;
    readonly isDragging: boolean;
    readonly dragHandlers: {
        readonly onMouseDown: (e: React.MouseEvent) => void;
        readonly onMouseMove: (e: React.MouseEvent) => void;
        readonly onMouseUp: (e: React.MouseEvent) => void;
        readonly onTouchStart: (e: React.TouchEvent) => void;
        readonly onTouchMove: (e: React.TouchEvent) => void;
        readonly onTouchEnd: (e: React.TouchEvent) => void;
    };
    readonly setPosition: (position: DraggablePosition) => void;
    readonly resetPosition: () => void;
}
/**
 * Return type for useDraggableRightBottom hook (for fixed positioned elements)
 */
interface UseDraggableRightBottomReturn {
    readonly position: DraggablePositionRightBottom;
    readonly isDragging: boolean;
    readonly dragHandlers: {
        readonly onPointerDown: (e: React.PointerEvent) => void;
        readonly onPointerMove: (e: React.PointerEvent) => void;
        readonly onPointerUp: (e: React.PointerEvent) => void;
    };
    readonly setPosition: (position: DraggablePositionRightBottom) => void;
    readonly resetPosition: () => void;
}
/**
 * Base props for draggable wrapper components
 */
interface DraggableWrapperProps {
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
interface DraggableFABProps {
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
/**
 * Theme configuration for draggable components
 */
interface DraggableTheme {
    readonly backgroundColor: string;
    readonly borderColor: string;
    readonly boxShadow: string;
    readonly borderRadius: string;
    readonly transition: string;
}
/**
 * Size configuration for different component sizes
 */
interface DraggableSizeConfig {
    readonly width: number;
    readonly height: number;
    readonly fontSize: string;
    readonly padding: string;
}
/**
 * Complete theme system for draggable components
 */
interface DraggableThemeSystem {
    readonly variants: Record<'primary' | 'secondary' | 'success' | 'warning' | 'error', DraggableTheme>;
    readonly sizes: Record<'sm' | 'md' | 'lg', DraggableSizeConfig>;
    readonly cursors: {
        readonly default: string;
        readonly grabbing: string;
        readonly disabled: string;
    };
}
/**
 * Error types that can occur during dragging
 */
type DraggableError = 'INVALID_POSITION' | 'BOUNDS_EXCEEDED' | 'TOUCH_NOT_SUPPORTED' | 'DRAG_DISABLED' | 'UNKNOWN_ERROR';
/**
 * Result type for operations that can fail
 */
interface DraggableResult<T> {
    readonly success: boolean;
    readonly data?: T;
    readonly error?: DraggableError;
    readonly message?: string;
}
/**
 * Performance optimization options
 */
interface DraggablePerformanceConfig {
    readonly throttleMs?: number;
    readonly useRAF?: boolean;
    readonly enableHardwareAcceleration?: boolean;
}
/**
 * Accessibility options for draggable components
 */
interface DraggableA11yConfig {
    readonly ariaLabel?: string;
    readonly ariaDescription?: string;
    readonly keyboardSupport?: boolean;
    readonly announcePosition?: boolean;
}
/**
 * Complete advanced configuration
 */
interface AdvancedDraggableConfig extends DraggableConfig {
    readonly performance?: DraggablePerformanceConfig;
    readonly accessibility?: DraggableA11yConfig;
    readonly debug?: boolean;
}

/**
 * @layera/draggable - Enterprise Draggable Hook
 *
 * Reusable hook για draggable functionality με TypeScript type safety
 * Εξάγει όλη τη draggable λογική από components για clean separation of concerns
 */

/**
 * Hook για draggable functionality με standard x/y positioning
 * Ιδανικό για absolute positioned elements
 */
declare function useDraggable(initialPosition?: DraggablePosition, config?: DraggableConfig, eventHandlers?: DragEventHandlers): UseDraggableReturn;
/**
 * Hook για draggable functionality με right/bottom positioning
 * Ιδανικό για fixed positioned elements (FAB buttons, floating panels)
 * Νέα υλοποίηση με Pointer Events και setPointerCapture για ομαλό drag
 */
declare function useDraggableRightBottom(initialPosition?: DraggablePositionRightBottom, config?: DraggableConfig, eventHandlers?: DragEventHandlers): UseDraggableRightBottomReturn;

/**
 * @layera/draggable - Enterprise Draggable FAB Component
 *
 * Reusable Floating Action Button με built-in draggable functionality
 * Ακολουθεί LEGO design principles και enterprise architecture patterns
 */

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
declare const DraggableFAB: React.FC<DraggableFABProps>;

/**
 * @layera/draggable - Enterprise Draggable System
 *
 * Συνολικό export για όλα τα draggable functionality του Layera ecosystem
 * Ακολουθεί LEGO design principles για maximum reusability
 */

/**
 * Utility function για δημιουργία default DraggableConfig
 */
declare const createDraggableConfig: (overrides?: Partial<DraggableConfig>) => DraggableConfig;
/**
 * Utility function για δημιουργία boundary constraints
 */
declare const createBounds: (minX?: number, maxX?: number, minY?: number, maxY?: number) => DraggableBounds;
/**
 * Utility function για δημιουργία right/bottom bounds
 */
declare const createRightBottomBounds: (minRight?: number, maxRight?: number, minBottom?: number, maxBottom?: number) => DraggableBounds;
/**
 * Default configurations για common use cases
 */
declare const DRAGGABLE_DEFAULTS: {
    readonly STANDARD: DraggableConfig;
    readonly HORIZONTAL_ONLY: DraggableConfig;
    readonly VERTICAL_ONLY: DraggableConfig;
    readonly HIGH_PRECISION: DraggableConfig;
    readonly MOBILE_OPTIMIZED: DraggableConfig;
    readonly PERFORMANCE_MODE: DraggableConfig;
};
/**
 * Default FAB positions για different layouts
 */
declare const FAB_POSITIONS: {
    readonly BOTTOM_RIGHT: {
        readonly right: 15;
        readonly bottom: 15;
    };
    readonly BOTTOM_LEFT: {
        readonly right: 15;
        readonly bottom: 15;
    };
    readonly BOTTOM_CENTER: {
        readonly right: number;
        readonly bottom: 15;
    };
    readonly TOP_RIGHT: {
        readonly right: 15;
        readonly bottom: number;
    };
    readonly CENTER: {
        readonly right: number;
        readonly bottom: number;
    };
};
declare const PACKAGE_VERSION = "1.0.0";
declare const PACKAGE_NAME = "@layera/draggable";

export { type AdvancedDraggableConfig, DRAGGABLE_DEFAULTS, type DragEventData, type DragEventHandlers, type DraggableA11yConfig, type DraggableBounds, type DraggableConfig, type DraggableError, DraggableFAB, DraggableFAB as DraggableFABDefault, type DraggableFABProps, type DraggablePerformanceConfig, type DraggablePosition, type DraggablePositionRightBottom, type DraggableResult, type DraggableSizeConfig, type DraggableTheme, type DraggableThemeSystem, type DraggableWrapperProps, FAB_POSITIONS, PACKAGE_NAME, PACKAGE_VERSION, type UseDraggableReturn, type UseDraggableRightBottomReturn, createBounds, createDraggableConfig, createRightBottomBounds, useDraggable, useDraggableRightBottom };
