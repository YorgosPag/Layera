/**
 * @layera/draggable - Enterprise Draggable Hook
 *
 * Reusable hook για draggable functionality με TypeScript type safety
 * Εξάγει όλη τη draggable λογική από components για clean separation of concerns
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import type {
  DraggablePosition,
  DraggablePositionRightBottom,
  DraggableConfig,
  DragEventHandlers,
  DragEventData,
  UseDraggableReturn,
  UseDraggableRightBottomReturn
} from '../types';

// ===============================
// Standard X/Y Position Hook
// ===============================

/**
 * Hook για draggable functionality με standard x/y positioning
 * Ιδανικό για absolute positioned elements
 */
export function useDraggable(
  initialPosition: DraggablePosition = { x: 0, y: 0 },
  config: DraggableConfig = {},
  eventHandlers: DragEventHandlers = {}
): UseDraggableReturn {
  const [position, setPosition] = useState<DraggablePosition>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef<DraggablePosition>({ x: 0, y: 0 });
  const dragOffsetRef = useRef<DraggablePosition>({ x: 0, y: 0 });

  const {
    disabled = false,
    axis = 'both',
    bounds,
    dragThreshold = 5
  } = config;

  const { onDragStart, onDrag, onDragEnd } = eventHandlers;

  // Utility για constraint checking
  const constrainPosition = useCallback((newPosition: DraggablePosition, currentPosition: DraggablePosition): DraggablePosition => {
    let { x, y } = newPosition;

    if (bounds) {
      if (bounds.minX !== undefined) x = Math.max(x, bounds.minX);
      if (bounds.maxX !== undefined) x = Math.min(x, bounds.maxX);
      if (bounds.minY !== undefined) y = Math.max(y, bounds.minY);
      if (bounds.maxY !== undefined) y = Math.min(y, bounds.maxY);
    }

    // Axis constraints - use passed currentPosition instead of state
    if (axis === 'x') y = currentPosition.y;
    if (axis === 'y') x = currentPosition.x;

    return { x, y };
  }, [bounds, axis]);

  // Helper για δημιουργία DragEventData
  const createEventData = useCallback((currentPos: DraggablePosition): DragEventData => ({
    startPosition: dragStartRef.current,
    currentPosition: currentPos,
    deltaX: currentPos.x - dragStartRef.current.x,
    deltaY: currentPos.y - dragStartRef.current.y,
    isDragging: isDraggingRef.current
  }), []);

  // Mouse Event Handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (disabled) return;

    const startPos = { x: e.clientX, y: e.clientY };
    dragStartRef.current = position;
    dragOffsetRef.current = startPos;
    setIsDragging(false);
    isDraggingRef.current = false; // Αρχικά δεν είμαστε σε drag mode

    const eventData = createEventData(position);
    onDragStart?.(eventData);
  }, [disabled, position, createEventData, onDragStart]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (disabled || e.buttons !== 1) return;

    const currentPos = { x: e.clientX, y: e.clientY };
    const deltaX = currentPos.x - dragOffsetRef.current.x;
    const deltaY = currentPos.y - dragOffsetRef.current.y;

    // Έλεγχος threshold πριν αρχίσει το dragging
    if (!isDraggingRef.current && (Math.abs(deltaX) > dragThreshold || Math.abs(deltaY) > dragThreshold)) {
      setIsDragging(true);
      isDraggingRef.current = true;
    }

    if (isDraggingRef.current) {
      const calculatedPosition = {
        x: dragStartRef.current.x + deltaX,
        y: dragStartRef.current.y + deltaY
      };

      setPosition(currentPos => {
        const newPosition = constrainPosition(calculatedPosition, currentPos);
        const eventData = createEventData(newPosition);
        onDrag?.(eventData);
        return newPosition;
      });
    }
  }, [disabled, dragThreshold, constrainPosition, createEventData, onDrag]);

  const handleMouseUp = useCallback((_e: React.MouseEvent) => {
    if (isDraggingRef.current) {
      const eventData = createEventData(position);
      onDragEnd?.(eventData);
    }
    setIsDragging(false);
    isDraggingRef.current = false;
  }, [isDragging, position, createEventData, onDragEnd]);

  // Touch Event Handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (disabled || e.touches.length !== 1) return;

    const touch = e.touches[0];
    if (!touch) return;
    const startPos = { x: touch.clientX, y: touch.clientY };
    dragStartRef.current = position;
    dragOffsetRef.current = startPos;
    setIsDragging(false);
    isDraggingRef.current = false;

    const eventData = createEventData(position);
    onDragStart?.(eventData);
  }, [disabled, position, createEventData, onDragStart]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (disabled || e.touches.length !== 1) return;

    const touch = e.touches[0];
    if (!touch) return;
    const currentPos = { x: touch.clientX, y: touch.clientY };
    const deltaX = currentPos.x - dragOffsetRef.current.x;
    const deltaY = currentPos.y - dragOffsetRef.current.y;

    if (!isDraggingRef.current && (Math.abs(deltaX) > dragThreshold || Math.abs(deltaY) > dragThreshold)) {
      setIsDragging(true);
      isDraggingRef.current = true;
      e.preventDefault(); // Prevent scrolling
    }

    if (isDraggingRef.current) {
      e.preventDefault();
      const calculatedPosition = {
        x: dragStartRef.current.x + deltaX,
        y: dragStartRef.current.y + deltaY
      };

      setPosition(currentPos => {
        const newPosition = constrainPosition(calculatedPosition, currentPos);
        const eventData = createEventData(newPosition);
        onDrag?.(eventData);
        return newPosition;
      });
    }
  }, [disabled, dragThreshold, constrainPosition, createEventData, onDrag]);

  const handleTouchEnd = useCallback((_e: React.TouchEvent) => {
    if (isDraggingRef.current) {
      const eventData = createEventData(position);
      onDragEnd?.(eventData);
    }
    setIsDragging(false);
    isDraggingRef.current = false;
  }, [isDragging, position, createEventData, onDragEnd]);

  // Reset function
  const resetPosition = useCallback(() => {
    setPosition(initialPosition);
    setIsDragging(false);
    isDraggingRef.current = false;
  }, [initialPosition]);

  // Manual position setter with constraints
  const setConstrainedPosition = useCallback((newPosition: DraggablePosition) => {
    setPosition(currentPos => {
      const constrained = constrainPosition(newPosition, currentPos);
      return constrained;
    });
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

// ===============================
// Right/Bottom Position Hook για Fixed Elements
// ===============================

/**
 * Hook για draggable functionality με right/bottom positioning
 * Ιδανικό για fixed positioned elements (FAB buttons, floating panels)
 * Νέα υλοποίηση με Pointer Events και setPointerCapture για ομαλό drag
 */
export function useDraggableRightBottom(
  initialPosition: DraggablePositionRightBottom = { right: 15, bottom: 15 },
  config: DraggableConfig = {},
  eventHandlers: DragEventHandlers = {}
): UseDraggableRightBottomReturn {
  const { constrainEl, dragThreshold = 2 } = config;
  const [position, setPosition] = useState(initialPosition);
  const startPosRef = useRef<{ right: number; bottom: number }>(initialPosition);
  const startPtRef = useRef<{ x: number; y: number } | null>(null);
  const draggingRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const { onDragStart, onDrag, onDragEnd } = eventHandlers;

  // Clamp function για περιορισμό εντός container bounds
  const clamp = useCallback((right: number, bottom: number) => {
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

  // Helper για δημιουργία DragEventData από right/bottom position
  const createRightBottomEventData = useCallback((currentPos: DraggablePositionRightBottom): DragEventData => ({
    startPosition: { x: startPosRef.current.right, y: startPosRef.current.bottom },
    currentPosition: { x: currentPos.right, y: currentPos.bottom },
    deltaX: startPosRef.current.right - currentPos.right,
    deltaY: startPosRef.current.bottom - currentPos.bottom,
    isDragging: draggingRef.current
  }), []);

  // Pointer Events για ομαλό dragging
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (config.disabled) return;
    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);
    startPtRef.current = { x: e.clientX, y: e.clientY };
    startPosRef.current = position;
    draggingRef.current = false;

    const eventData = createRightBottomEventData(position);
    onDragStart?.(eventData);
  }, [position, config.disabled, onDragStart, createRightBottomEventData]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!startPtRef.current) return;
    const dx = e.clientX - startPtRef.current.x;
    const dy = e.clientY - startPtRef.current.y;

    if (Math.abs(dx) < dragThreshold && Math.abs(dy) < dragThreshold) return;

    // ΣΩΣΤΟ για right/bottom: κινούμαι δεξιά => right μικραίνει
    const nextRight = startPosRef.current.right - dx;
    const nextBottom = startPosRef.current.bottom - dy;
    const next = clamp(nextRight, nextBottom);

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setPosition(next);
      const eventData = createRightBottomEventData(next);
      onDrag?.(eventData);
    });
  }, [dragThreshold, clamp, onDrag, createRightBottomEventData]);

  const onPointerUp = useCallback((_e: React.PointerEvent) => {
    const eventData = createRightBottomEventData(position);
    draggingRef.current = false;
    startPtRef.current = null;
    onDragEnd?.(eventData);
  }, [onDragEnd, position, createRightBottomEventData]);

  // Cleanup effect για requestAnimationFrame
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