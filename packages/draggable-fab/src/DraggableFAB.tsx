/**
 * DraggableFAB.tsx - Enterprise Draggable Floating Action Button
 *
 * Single source of truth για draggable functionality σε όλο το Layera ecosystem.
 * Εξαχθέν από GeoMapNew.tsx για reusability και modularity.
 */

import React, { useState, useRef, useEffect } from 'react';

export interface DraggableFABProps {
  children: React.ReactNode;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  position?: 'fixed' | 'viewport-relative';
  initialPosition?: { x?: number; y?: number; right?: number; bottom?: number };
  constrainToViewport?: boolean;
  viewportSelector?: string;
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
  'aria-label'?: string;
  title?: string;
}

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

/**
 * Enterprise DraggableFAB - Single Source of Truth
 * Υποστηρίζει viewport constraints, cross-device dragging, και responsive sizing
 */
export const DraggableFAB: React.FC<DraggableFABProps> = ({
  children,
  onClick,
  size = 'md',
  position = 'fixed',
  initialPosition = { x: 15, y: 15 },
  constrainToViewport = true,
  viewportSelector = '[data-viewport-frame], #geo-viewport',
  className = '',
  style = {},
  'data-testid': testId,
  'aria-label': ariaLabel = 'Floating Action Button',
  title
}) => {
  // 🎯 STATE MANAGEMENT από GeoMapNew.tsx
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [fabPos, setFabPos] = useState<FabPosition>(() => {
    // Initialize position από props
    if (initialPosition.right !== undefined || initialPosition.bottom !== undefined) {
      // Convert right/bottom to x/y if provided
      const x = initialPosition.right !== undefined ?
        (typeof window !== 'undefined' ? window.innerWidth - initialPosition.right - getSizePixels(size) : 15) :
        initialPosition.x ?? 15;
      const y = initialPosition.bottom !== undefined ?
        (typeof window !== 'undefined' ? window.innerHeight - initialPosition.bottom - getSizePixels(size) : 15) :
        initialPosition.y ?? 15;
      return { x, y };
    }
    return { x: initialPosition.x ?? 15, y: initialPosition.y ?? 15 };
  });
  const startRef = useRef<DragStart | null>(null);

  // 🎯 SIZE CONFIGURATION
  const getSizePixels = (sizeStr: 'sm' | 'md' | 'lg'): number => {
    switch (sizeStr) {
      case 'sm': return 48;
      case 'md': return 56;
      case 'lg': return 64;
      default: return 56;
    }
  };

  const BTN_SIZE = getSizePixels(size);
  const MARGIN = 15;

  // 🎯 VIEWPORT CONSTRAINT LOGIC από GeoMapNew.tsx
  useEffect(() => {
    if (!constrainToViewport || position === 'fixed') return;

    const clamp = () => {
      const frame = document.querySelector(viewportSelector);
      if (!frame) return;

      const rect = frame.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      // Σιγουρεύουμε ότι τα όρια είναι σωστά
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
  }, [fabPos.x, fabPos.y, constrainToViewport, position, viewportSelector, BTN_SIZE]);

  // 🎯 DRAG HANDLER από GeoMapNew.tsx
  const handleFabPointerDown = (e: React.PointerEvent) => {
    if (position === 'fixed') return; // Fixed position δεν είναι draggable

    // Αναζήτηση του ViewportFrame
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

      // Σιγουρεύουμε ότι τα όρια είναι σωστά
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

  // 🎯 STYLE COMPUTATION
  const computedStyle: React.CSSProperties = {
    position: position === 'fixed' ? 'absolute' : 'absolute',
    ...(position === 'fixed' ? {
      right: typeof initialPosition.right === 'number' ? `${initialPosition.right}px` : undefined,
      bottom: typeof initialPosition.bottom === 'number' ? `${initialPosition.bottom}px` : undefined,
    } : {
      left: `${fabPos.x}px`,
      top: `${fabPos.y}px`,
    }),
    width: BTN_SIZE,
    height: BTN_SIZE,
    borderRadius: '50%',
    background: 'var(--layera-bg-success, #22C55E)',
    border: '2px solid white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: position === 'fixed' ? 'pointer' : 'grab',
    zIndex: 9999,
    userSelect: 'none',
    touchAction: 'none',
    transition: position === 'fixed' ? 'all 0.2s ease' : 'none',
    ...style
  };

  return (
    <div
      onPointerDown={handleFabPointerDown}
      onClick={onClick}
      aria-label={ariaLabel}
      title={title}
      data-testid={testId}
      className={className}
      style={computedStyle}
    >
      {children}
    </div>
  );
};