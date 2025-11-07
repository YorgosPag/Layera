/**
 * DraggableFAB.tsx - Enterprise Draggable Floating Action Button
 *
 * Single source of truth για draggable functionality σε όλο το Layera ecosystem.
 * Εξαχθέν από GeoMapNew.tsx για reusability και modularity.
 *
 * 🔥🔥🔥 WORKING DRAG SOLUTION - TESTED 28 Oct 2025 🔥🔥🔥
 *
 * ✅ ΚΡΙΣΙΜΑ REQUIREMENTS ΓΙΑ WORKING FUNCTIONALITY:
 * 1. position="viewport-relative" - ΑΠΑΡΑΙΤΗΤΟ για movement
 * 2. viewportSelector="body" - ΠΡΕΠΕΙ να είναι selector που υπάρχει πάντα
 * 3. constrainToViewport={true} - Περιορίζει movement στα όρια
 * 4. frameRef.current - ΠΡΕΠΕΙ να βρίσκει valid DOM element
 * 5. setFabPos() - Ενημερώνει το position state που χρησιμοποιείται στο style
 *
 * 🎯 WORKING FLOW:
 * 1. useEffect → βρίσκει frameRef με document.querySelector(viewportSelector)
 * 2. onMove → υπολογίζει νέα θέση με getBoundingClientRect()
 * 3. setFabPos({ x, y }) → ενημερώνει state
 * 4. style={{ left: fabPos.x, top: fabPos.y }} → εφαρμόζει positioning
 *
 * ❌ COMMON FAILURES:
 * - frameRef is null → viewportSelector δεν βρίσκει element
 * - No movement → position="fixed" ή frameRef issue
 * - setFabPos not called → early return στο onMove
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { BORDER_RADIUS_SCALE, SPACING_SCALE } from '@layera/constants';
import { Box } from '@layera/layout';
import { VARIANT_COLORS } from '@layera/floating-action-buttons';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { killNextClick, swallowNextWindowClick, stopAll, useDraggable } from '@layera/draggable';

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
  // 🎯 ENTERPRISE: Ελάχιστος σωστός χειρισμός με suppressClick
  const THRESH = 6;
  const start = useRef<{x:number;y:number;px:number;py:number}|null>(null);
  const dragging = useRef(false);
  const suppressClick = useRef(false);
  // 🚨🚨🚨 ΑΥΣΤΗΡΟΤΑΤΗ ΠΡΟΕΙΔΟΠΟΙΗΣΗ - ΜΗΝ ΠΕΙΡΑΞΕΙΣ ΑΥΤΟΝ ΤΟΝ ΚΩΔΙΚΑ 🚨🚨🚨
  //
  // ❌ ΑΠΑΓΟΡΕΥΕΤΑΙ ΑΠΟΛΥΤΑ να αλλάξεις αυτό το useState
  // ❌ ΑΠΑΓΟΡΕΥΕΤΑΙ ΑΠΟΛΥΤΑ να το αντικαταστήσεις με hook
  // ❌ ΑΠΑΓΟΡΕΥΕΤΑΙ ΑΠΟΛΥΤΑ να αφαιρέσεις τις setIsDragging κλήσεις
  //
  // ✅ ΑΥΤΟΣ Ο ΚΩΔΙΚΑΣ ΔΟΥΛΕΥΕΙ ΤΕΛΕΙΑ ΓΙΑ ΤΟ ΠΟΡΤΟΚΑΛΙ ΧΡΩΜΑ DRAGGING
  // ✅ ΕΙΝΑΙ Η ΜΟΝΑΔΙΚΗ ΠΗΓΗ ΑΛΗΘΕΙΑΣ ΠΟΥ ΛΕΙΤΟΥΡΓΕΙ ΣΩΣΤΑ
  // ✅ 28 ΟΚΤΩΒΡΙΟΥ 2025 - ΕΠΙΒΕΒΑΙΩΜΕΝΟ ΟΤΙ ΔΟΥΛΕΥΕΙ
  //
  // 🔥 ΑΝ ΑΛΛΑΞΕΙΣ ΚΑΤΙ, Ο ΓΙΩΡΓΟΣ ΠΑΓΩΝΗΣ ΘΑ ΧΑΣΕΙ 16 ΩΡΕΣ ΔΟΥΛΕΙΑΣ!
  // 🔥 ΑΥΤΟ ΤΟ COMMENT ΕΙΝΑΙ ΠΙΟ ΣΗΜΑΝΤΙΚΟ ΑΠΟ ΟΠΟΙΟΔΗΠΟΤΕ "REFACTOR"!
  //
  const [isDragging, setIsDragging] = useState(false);
  // 🎯 SIZE CONFIGURATION - moved before useState
  const getSizePixels = (sizeStr: 'sm' | 'md' | 'lg'): number => {
    switch (sizeStr) {
      case 'sm': return 48;
      case 'md': return 56;
      case 'lg': return 64;
      default: return 56;
    }
  };

  // 🎯 ΕΞΑΛΕΙΨΗ ΔΙΠΛΟΤΥΠΩΝ - Click Suppression από @layera/draggable LEGO system
  // Utilities εισαχθέντα από @layera/draggable - Single Source of Truth

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const startRef = useRef<DragStart | null>(null);

  const BTN_SIZE = getSizePixels(size);
  const MARGIN = 15;

  // 🎯 VIEWPORT CONSTRAINT LOGIC από GeoMapNew.tsx
  useEffect(() => {
    // Βρες το viewport frame element
    frameRef.current = document.querySelector(viewportSelector) as HTMLDivElement;

    // Fallback: αν δεν υπάρχει το selector, χρησιμοποίησε το body
    if (!frameRef.current) {
      frameRef.current = document.querySelector('body') as HTMLDivElement;
    }

    if (!constrainToViewport || position === 'fixed') return;

    const clamp = (): void => {
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

  const onDown = (e: React.PointerEvent) => {
    if (position === 'fixed') return;
    stopAll(e);
    dragging.current = false;
    setIsDragging(false);
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    start.current = { x: e.clientX, y: e.clientY, px: fabPos.x, py: fabPos.y };
  };

  const onMove = (e: React.PointerEvent) => {
    if (position === 'fixed' || !start.current) return;
    stopAll(e); // μπλοκάρει map gestures + synthetic events
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    if (!dragging.current && Math.hypot(dx,dy) > THRESH) {
      dragging.current = true;
      setIsDragging(true);
      // Drag detection successful
    }

    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const maxX = Math.max(0, rect.width - BTN_SIZE - MARGIN);
    const maxY = Math.max(0, rect.height - BTN_SIZE - MARGIN);
    const nx = Math.max(MARGIN, Math.min(maxX, start.current.px + dx));
    const ny = Math.max(MARGIN, Math.min(maxY, start.current.py + dy));
    setFabPos({ x: nx, y: ny });
  };

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

  const onClickCapture = (e: React.MouseEvent) => {
    if (suppressClick.current) {
      stopAll(e);
    }
  };

  const onPointerCancel = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    dragging.current = false;
    start.current = null;
    suppressClick.current = false;
  };

  // 🚨🚨🚨 ΑΥΣΤΗΡΟΤΑΤΗ ΠΡΟΕΙΔΟΠΟΙΗΣΗ - ΜΗΝ ΠΕΙΡΑΞΕΙΣ ΤΟ COLOR LOGIC 🚨🚨🚨
  //
  // ❌ ΑΠΑΓΟΡΕΥΕΤΑΙ ΑΠΟΛΥΤΑ να αλλάξεις το VARIANT_COLORS.warning
  // ❌ ΑΠΑΓΟΡΕΥΕΤΑΙ ΑΠΟΛΥΤΑ να αλλάξεις το VARIANT_COLORS.success
  // ❌ ΑΠΑΓΟΡΕΥΕΤΑΙ ΑΠΟΛΥΤΑ να αλλάξεις τη λογική isDragging
  //
  // ✅ ΠΟΡΤΟΚΑΛΙ ΧΡΩΜΑ ΕΜΦΑΝΙΖΕΤΑΙ ΤΕΛΕΙΑ ΟΤΑΝ ΚΙΝΕΙΣ ΤΟ ΠΛΗΚΤΡΟ
  // ✅ 28 ΟΚΤΩΒΡΙΟΥ 2025 - ΕΠΙΒΕΒΑΙΩΜΕΝΟ ΟΤΙ ΔΟΥΛΕΥΕΙ
  //
  // 🔥 ΜΗΝ ΤΟ ΠΕΙΡΑΞΕΙΣ! WORKING SOLUTION!
  //
  const bg = isDragging ? VARIANT_COLORS.warning : VARIANT_COLORS.success;

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
    borderRadius: BORDER_RADIUS_SCALE.CIRCLE,
    border: `var(--la-border-width-xxs) solid var(--color-bg-canvas)`, // 🎯 SST: Border width token
    boxShadow: 'var(--elevation-md)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: position === 'fixed' ? 'pointer' : 'grab',
    zIndex: 9999,
    userSelect: 'none',
    touchAction: 'none',
    transition: position === 'fixed' ? 'all 0.2s ease' : 'none',
    background: bg,
    ...style
  };

  return (
    <Box
      style={{...computedStyle, background: bg, touchAction: 'none', userSelect: 'none'}}
      draggable={false}
      onDragStart={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
      onPointerDownCapture={onDown}
      onPointerMoveCapture={onMove}
      onPointerUpCapture={onUp}
      onPointerCancel={onPointerCancel}
      onClickCapture={onClickCapture}
      aria-label={ariaLabel}
      title={title}
      data-testid={testId}
      className={className}
    >
      {children}
    </Box>
  );
};