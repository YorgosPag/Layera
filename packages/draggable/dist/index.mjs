// src/hooks/useDraggable.ts
import { useState, useCallback, useRef, useEffect } from "react";
function useDraggable(initialPosition = { x: 0, y: 0 }, config = {}, eventHandlers = {}) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const {
    disabled = false,
    axis = "both",
    bounds,
    dragThreshold = 5
  } = config;
  const { onDragStart, onDrag, onDragEnd } = eventHandlers;
  const constrainPosition = useCallback((newPosition) => {
    let { x, y } = newPosition;
    if (bounds) {
      if (bounds.minX !== void 0) x = Math.max(x, bounds.minX);
      if (bounds.maxX !== void 0) x = Math.min(x, bounds.maxX);
      if (bounds.minY !== void 0) y = Math.max(y, bounds.minY);
      if (bounds.maxY !== void 0) y = Math.min(y, bounds.maxY);
    }
    if (axis === "x") y = position.y;
    if (axis === "y") x = position.x;
    return { x, y };
  }, [bounds, axis, position]);
  const createEventData = useCallback((currentPos) => ({
    startPosition: dragStartRef.current,
    currentPosition: currentPos,
    deltaX: currentPos.x - dragStartRef.current.x,
    deltaY: currentPos.y - dragStartRef.current.y,
    isDragging
  }), [isDragging]);
  const handleMouseDown = useCallback((e) => {
    if (disabled) return;
    const startPos = { x: e.clientX, y: e.clientY };
    dragStartRef.current = position;
    dragOffsetRef.current = startPos;
    setIsDragging(false);
    const eventData = createEventData(position);
    onDragStart?.(eventData);
  }, [disabled, position, createEventData, onDragStart]);
  const handleMouseMove = useCallback((e) => {
    if (disabled || e.buttons !== 1) return;
    const currentPos = { x: e.clientX, y: e.clientY };
    const deltaX = currentPos.x - dragOffsetRef.current.x;
    const deltaY = currentPos.y - dragOffsetRef.current.y;
    if (!isDragging && (Math.abs(deltaX) > dragThreshold || Math.abs(deltaY) > dragThreshold)) {
      setIsDragging(true);
    }
    if (isDragging) {
      const newPosition = constrainPosition({
        x: dragStartRef.current.x + deltaX,
        y: dragStartRef.current.y + deltaY
      });
      setPosition(newPosition);
      const eventData = createEventData(newPosition);
      onDrag?.(eventData);
    }
  }, [disabled, isDragging, dragThreshold, constrainPosition, createEventData, onDrag]);
  const handleMouseUp = useCallback((e) => {
    if (isDragging) {
      const eventData = createEventData(position);
      onDragEnd?.(eventData);
    }
    setIsDragging(false);
  }, [isDragging, position, createEventData, onDragEnd]);
  const handleTouchStart = useCallback((e) => {
    if (disabled || e.touches.length !== 1) return;
    const touch = e.touches[0];
    if (!touch) return;
    const startPos = { x: touch.clientX, y: touch.clientY };
    dragStartRef.current = position;
    dragOffsetRef.current = startPos;
    setIsDragging(false);
    const eventData = createEventData(position);
    onDragStart?.(eventData);
  }, [disabled, position, createEventData, onDragStart]);
  const handleTouchMove = useCallback((e) => {
    if (disabled || e.touches.length !== 1) return;
    const touch = e.touches[0];
    if (!touch) return;
    const currentPos = { x: touch.clientX, y: touch.clientY };
    const deltaX = currentPos.x - dragOffsetRef.current.x;
    const deltaY = currentPos.y - dragOffsetRef.current.y;
    if (!isDragging && (Math.abs(deltaX) > dragThreshold || Math.abs(deltaY) > dragThreshold)) {
      setIsDragging(true);
      e.preventDefault();
    }
    if (isDragging) {
      e.preventDefault();
      const newPosition = constrainPosition({
        x: dragStartRef.current.x + deltaX,
        y: dragStartRef.current.y + deltaY
      });
      setPosition(newPosition);
      const eventData = createEventData(newPosition);
      onDrag?.(eventData);
    }
  }, [disabled, isDragging, dragThreshold, constrainPosition, createEventData, onDrag]);
  const handleTouchEnd = useCallback((_e) => {
    if (isDragging) {
      const eventData = createEventData(position);
      onDragEnd?.(eventData);
    }
    setIsDragging(false);
  }, [isDragging, position, createEventData, onDragEnd]);
  const resetPosition = useCallback(() => {
    setPosition(initialPosition);
    setIsDragging(false);
  }, [initialPosition]);
  const setConstrainedPosition = useCallback((newPosition) => {
    setPosition(constrainPosition(newPosition));
  }, [constrainPosition]);
  return {
    position,
    isDragging,
    dragHandlers: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd
    },
    setPosition: setConstrainedPosition,
    resetPosition
  };
}
function useDraggableRightBottom(initialPosition = { right: 15, bottom: 15 }, config = {}, eventHandlers = {}) {
  const { constrainEl, dragThreshold = 2 } = config;
  const [position, setPosition] = useState(initialPosition);
  const startPosRef = useRef(initialPosition);
  const startPtRef = useRef(null);
  const draggingRef = useRef(false);
  const rafRef = useRef(null);
  const { onDragStart, onDrag, onDragEnd } = eventHandlers;
  const clamp = useCallback((right, bottom) => {
    const rect = constrainEl?.getBoundingClientRect();
    const btn = 64;
    const m = 10;
    if (!rect) return { right, bottom };
    const maxRight = rect.width - btn - m;
    const maxBottom = rect.height - btn - m;
    return {
      right: Math.min(Math.max(m, right), maxRight),
      bottom: Math.min(Math.max(m, bottom), maxBottom)
    };
  }, [constrainEl]);
  const onPointerDown = useCallback((e) => {
    if (config.disabled) return;
    const target = e.currentTarget;
    target.setPointerCapture(e.pointerId);
    startPtRef.current = { x: e.clientX, y: e.clientY };
    startPosRef.current = position;
    draggingRef.current = false;
    onDragStart?.(e);
  }, [position, config.disabled, onDragStart]);
  const onPointerMove = useCallback((e) => {
    if (!draggingRef.current || !startPtRef.current) return;
    const dx = e.clientX - startPtRef.current.x;
    const dy = e.clientY - startPtRef.current.y;
    if (Math.abs(dx) < dragThreshold && Math.abs(dy) < dragThreshold) return;
    const nextRight = startPosRef.current.right - dx;
    const nextBottom = startPosRef.current.bottom - dy;
    const next = clamp(nextRight, nextBottom);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => setPosition(next));
    onDrag?.(e);
  }, [dragThreshold, clamp, onDrag]);
  const onPointerUp = useCallback((e) => {
    draggingRef.current = false;
    startPtRef.current = null;
    onDragEnd?.(e);
  }, [onDragEnd]);
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);
  const resetPosition = useCallback(() => {
    setPosition(initialPosition);
    draggingRef.current = false;
    startPtRef.current = null;
  }, [initialPosition]);
  return {
    position,
    isDragging: draggingRef.current,
    dragHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp
    },
    setPosition,
    resetPosition
  };
}

// src/components/DraggableFAB.tsx
import { jsx } from "react/jsx-runtime";
var DRAGGABLE_FAB_THEME = {
  variants: {
    primary: {
      backgroundColor: "rgb(16, 185, 129)",
      // Layera emerald
      borderColor: "#FFFFFF",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
      borderRadius: "50%",
      transition: "all 0.2s ease"
    },
    secondary: {
      backgroundColor: "rgb(107, 114, 128)",
      borderColor: "#FFFFFF",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
      borderRadius: "50%",
      transition: "all 0.2s ease"
    },
    success: {
      backgroundColor: "rgb(16, 185, 129)",
      borderColor: "#FFFFFF",
      boxShadow: "0 8px 24px rgba(16, 185, 129, 0.4)",
      borderRadius: "50%",
      transition: "all 0.2s ease"
    },
    warning: {
      backgroundColor: "rgb(245, 158, 11)",
      borderColor: "#FFFFFF",
      boxShadow: "0 8px 24px rgba(245, 158, 11, 0.4)",
      borderRadius: "50%",
      transition: "all 0.2s ease"
    },
    error: {
      backgroundColor: "rgb(239, 68, 68)",
      borderColor: "#FFFFFF",
      boxShadow: "0 8px 24px rgba(239, 68, 68, 0.4)",
      borderRadius: "50%",
      transition: "all 0.2s ease"
    }
  },
  sizes: {
    sm: {
      width: 48,
      height: 48,
      fontSize: "16px",
      padding: "12px"
    },
    md: {
      width: 56,
      height: 56,
      fontSize: "18px",
      padding: "14px"
    },
    lg: {
      width: 64,
      height: 64,
      fontSize: "20px",
      padding: "16px"
    }
  },
  cursors: {
    default: "grab",
    grabbing: "grabbing",
    disabled: "not-allowed"
  }
};
var DraggableFAB = ({
  icon,
  onClick,
  initialPosition = { right: 15, bottom: 15 },
  config = {},
  eventHandlers = {},
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  style = {},
  constrainRef,
  "data-testid": testId
}) => {
  const themeVariant = DRAGGABLE_FAB_THEME.variants[variant];
  const sizeConfig = DRAGGABLE_FAB_THEME.sizes[size];
  const cursors = DRAGGABLE_FAB_THEME.cursors;
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
  const handleClick = (e) => {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if ("vibrate" in navigator) {
      navigator.vibrate(30);
    }
    onClick?.();
  };
  const fabStyles = {
    // Position and layout - use absolute for container constraint
    position: "absolute",
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // Typography
    fontSize: sizeConfig.fontSize,
    color: "white",
    fontWeight: "600",
    // Interaction
    cursor: disabled ? cursors.disabled : isDragging ? cursors.grabbing : cursors.default,
    transition: isDragging ? "none" : themeVariant.transition,
    // User selection prevention
    userSelect: "none",
    WebkitUserSelect: "none",
    WebkitTouchCallout: "none",
    WebkitTapHighlightColor: "transparent",
    // High z-index for floating behavior
    zIndex: 1e4,
    // Force visibility
    visibility: "visible",
    opacity: disabled ? 0.6 : 1,
    touchAction: "none",
    // αποτρέπει scroll κατά το drag
    // Accessibility
    outline: "none",
    // Disable text selection
    MozUserSelect: "none",
    msUserSelect: "none",
    // Apply custom styles
    ...style,
    // Disabled state overrides
    ...disabled && {
      pointerEvents: "none"
    }
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      onClick: handleClick,
      onPointerDown: dragHandlers.onPointerDown,
      onPointerMove: dragHandlers.onPointerMove,
      onPointerUp: dragHandlers.onPointerUp,
      style: fabStyles,
      className,
      "data-testid": testId || `draggable-fab-${variant}-${size}`,
      "aria-label": "Draggable floating action button",
      role: "button",
      tabIndex: disabled ? -1 : 0,
      onKeyDown: (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (!disabled && !isDragging) {
            onClick?.();
          }
        }
      },
      children: icon
    }
  );
};
var DraggableFAB_default = DraggableFAB;

// src/index.ts
var createDraggableConfig = (overrides = {}) => ({
  disabled: false,
  axis: "both",
  dragThreshold: 5,
  enableTransition: true,
  constrainToParent: true,
  ...overrides
});
var createBounds = (minX, maxX, minY, maxY) => {
  return {
    ...minX !== void 0 && { minX },
    ...maxX !== void 0 && { maxX },
    ...minY !== void 0 && { minY },
    ...maxY !== void 0 && { maxY }
  };
};
var createRightBottomBounds = (minRight, maxRight, minBottom, maxBottom) => {
  return {
    ...minRight !== void 0 && { minRight },
    ...maxRight !== void 0 && { maxRight },
    ...minBottom !== void 0 && { minBottom },
    ...maxBottom !== void 0 && { maxBottom }
  };
};
var DRAGGABLE_DEFAULTS = {
  // Standard draggable config
  STANDARD: createDraggableConfig(),
  // Horizontal only dragging
  HORIZONTAL_ONLY: createDraggableConfig({ axis: "x" }),
  // Vertical only dragging
  VERTICAL_ONLY: createDraggableConfig({ axis: "y" }),
  // High precision dragging (lower threshold)
  HIGH_PRECISION: createDraggableConfig({ dragThreshold: 2 }),
  // Mobile optimized (higher threshold)
  MOBILE_OPTIMIZED: createDraggableConfig({ dragThreshold: 10 }),
  // Disabled transitions για performance
  PERFORMANCE_MODE: createDraggableConfig({ enableTransition: false })
};
var FAB_POSITIONS = {
  BOTTOM_RIGHT: { right: 15, bottom: 15 },
  BOTTOM_LEFT: { right: 15, bottom: 15 },
  // Note: DraggableFAB uses right/bottom
  BOTTOM_CENTER: { right: window?.innerWidth ? window.innerWidth / 2 - 28 : 200, bottom: 15 },
  TOP_RIGHT: { right: 15, bottom: window?.innerHeight ? window.innerHeight - 71 : 600 },
  CENTER: {
    right: window?.innerWidth ? window.innerWidth / 2 - 28 : 200,
    bottom: window?.innerHeight ? window.innerHeight / 2 - 28 : 300
  }
};
var stopAll = (e) => {
  e.stopPropagation();
  if ('stopImmediatePropagation' in e && typeof e.stopImmediatePropagation === 'function') {
    e.stopImmediatePropagation();
  }
  e.preventDefault();
};
var swallowNextWindowClick = () => {
  const f = (e) => {
    stopAll(e);
    window.removeEventListener("click", f, true);
  };
  window.addEventListener("click", f, true);
};
var killNextClick = swallowNextWindowClick;
var PACKAGE_VERSION = "1.0.0";
var PACKAGE_NAME = "@layera/draggable";
export {
  DRAGGABLE_DEFAULTS,
  DraggableFAB,
  DraggableFAB_default as DraggableFABDefault,
  FAB_POSITIONS,
  PACKAGE_NAME,
  PACKAGE_VERSION,
  createBounds,
  createDraggableConfig,
  createRightBottomBounds,
  killNextClick,
  stopAll,
  swallowNextWindowClick,
  useDraggable,
  useDraggableRightBottom
};
//# sourceMappingURL=index.mjs.map