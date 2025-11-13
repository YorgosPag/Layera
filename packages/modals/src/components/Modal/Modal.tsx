import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Box } from '@layera/layout';
import { CloseIcon } from '@layera/icons';
import { useDraggable, createDraggableConfig } from '@layera/draggable';
import type { BaseModalProps } from '../../types';
// Enterprise: Using @layera/tokens CSS system instead of manual .css imports
// import './Modal.css';

/**
 * Modal - Βασικό modal component για το Layera Modal System
 */
export const Modal: React.FC<BaseModalProps> = ({
  open,
  onClose,
  children,
  size: _size = 'md',  // Enterprise: Prefixed with _ to mark as intentionally unused
  // variant = 'default',     // Enterprise: Unused - keeping for future
  // animation = 'fade',      // Enterprise: Unused - keeping for future
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  preventBodyScroll = true,
  noOverlay = false,
  draggable = false,
  initialPosition = 'center',
  // className = '',          // Enterprise: Unused - keeping for future
  // overlayClassName = '',   // Enterprise: Unused - keeping for future
  // contentClassName = '',   // Enterprise: Unused - keeping for future
  // Enterprise: Remove inline style props
  // contentStyle,
  // contentPadding,
  // overlayPadding,
  // panelPadding,
  container,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy
}) => {
  const [modalElement, setModalElement] = useState<HTMLElement | null>(null);
  const [overlayElement, setOverlayElement] = useState<HTMLElement | null>(null);
  const modalId = `modal-${Math.random().toString(36).substr(2, 9)}`;
  const overlayId = `overlay-${Math.random().toString(36).substr(2, 9)}`;

  // Get elements by ID after render
  useEffect(() => {
    if (open) {
      const modal = document.getElementById(modalId);
      const overlay = document.getElementById(overlayId);
      setModalElement(modal);
      setOverlayElement(overlay);
    }
  }, [open, modalId, overlayId]);

  // Mobile detection helpers
  const isTouchDevice = useCallback(() => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }, []);

  const isMobile = useCallback(() => {
    // Get breakpoint from CSS variable
    const rootStyles = getComputedStyle(document.documentElement);
    const mobileBreakpoint = rootStyles.getPropertyValue('--layera-modal-positioning-mobileBreakpoint').trim();
    const breakpointValue = parseInt(mobileBreakpoint) || 768;
    return window.innerWidth < breakpointValue;
  }, []);



  // Calculate initial position based on initialPosition prop
  const calculateInitialPosition = useCallback(() => {
    if (isMobile() || !modalElement) return { x: 0, y: 0 };

    const modalRect = modalElement.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Get values from CSS variables
    const rootStyles = getComputedStyle(document.documentElement);
    const headerHeight = parseInt(rootStyles.getPropertyValue('--layera-modal-positioning-headerOffset').trim()) || 52;
    const marginFromEdge = parseInt(rootStyles.getPropertyValue('--layera-modal-positioning-marginFromEdge').trim()) || 5;

    switch (initialPosition) {
      case 'top-right':
        return {
          x: windowWidth - modalRect.width - marginFromEdge,
          y: headerHeight + marginFromEdge
        };
      case 'top-left':
        return {
          x: marginFromEdge,
          y: headerHeight + marginFromEdge
        };
      case 'bottom-right':
        return {
          x: windowWidth - modalRect.width - marginFromEdge,
          y: windowHeight - modalRect.height - marginFromEdge
        };
      case 'bottom-left':
        return {
          x: marginFromEdge,
          y: windowHeight - modalRect.height - marginFromEdge
        };
      case 'center':
      default:
        return {
          x: (windowWidth - modalRect.width) / 2,
          y: (windowHeight - modalRect.height) / 2
        };
    }
  }, [initialPosition, isMobile, modalElement]);

  // Enterprise draggable hook configuration
  const dragConfig = createDraggableConfig({
    disabled: !draggable || isMobile() || isTouchDevice(),
    dragThreshold: 5,
    axis: 'both'
  });

  // Use enterprise draggable hook
  const { position: modalPosition, isDragging, dragHandlers, setPosition } = useDraggable(
    calculateInitialPosition(),
    dragConfig
  );

  // Set initial position when modal opens
  useEffect(() => {
    if (open && modalElement) {
      // Use setTimeout to ensure modal is rendered and has dimensions
      setTimeout(() => {
        const position = calculateInitialPosition();
        setPosition(position);
      }, 0);
    }
  }, [open, calculateInitialPosition, setPosition, modalElement]);

  // Add window event listeners for dragging
  useEffect(() => {
    if (!draggable || isMobile() || isTouchDevice() || !open) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (dragHandlers.onMouseMove) {
        dragHandlers.onMouseMove(e as any);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (dragHandlers.onMouseUp) {
        dragHandlers.onMouseUp(e as any);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggable, isMobile, isTouchDevice, open, dragHandlers]);

  // Handle ESC key
  useEffect(() => {
    if (!open || !closeOnEscape) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, closeOnEscape, onClose]);

  // Handle body scroll prevention
  useEffect(() => {
    if (!open || !preventBodyScroll) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [open, preventBodyScroll]);

  // Handle focus management
  useEffect(() => {
    if (!open || !modalElement) return;

    const focusableElements = modalElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements && focusableElements.length > 0) {
      (focusableElements[0] as HTMLElement).focus();
    }
  }, [open, modalElement]);

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (!noOverlay && closeOnOverlayClick && event.target === overlayElement) {
      onClose();
    }
  };

  const handleCloseClick = () => {
    onClose();
  };

  if (!open) return null;

  const modalContent = (
    <Box
      as="main"
      id={overlayId}
      className={`layera-modal ${noOverlay ? 'layera-modal--no-overlay' : ''}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal={true}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      style={noOverlay ? {
        background: 'var(--layera-global-components-drawer-pinnedOverlay-background, transparent)',
        pointerEvents: 'none' as const
      } : {
        background: 'var(--layera-color-surface-primary, #ffffff)'
      }}
    >
      <Box
        as="section"
        id={modalId}
        role="document"
        className="layera-modal-content"
        {...(draggable && !isMobile() && !isTouchDevice() ? {
          onMouseDown: dragHandlers.onMouseDown,
          onTouchStart: dragHandlers.onTouchStart
        } : {})}
        style={{
          ...(noOverlay ? {
            pointerEvents: 'auto' as const,
            background: 'var(--layera-color-surface-primary, #ffffff)'
          } : {
            background: 'var(--layera-color-surface-primary, #ffffff)'
          }),
          ...(draggable && !isMobile() && !isTouchDevice() ? {
            position: 'fixed' as const,
            left: modalPosition.x,
            top: modalPosition.y,
            cursor: isDragging ? ('grabbing' as const) : ('grab' as const),
            userSelect: 'none' as const,
            transform: 'none'
          } : {}),
          transition: isDragging ? 'none' : 'all 0.2s ease'
        }}
      >
        {showCloseButton && (
          <button
            type="button"
            onClick={handleCloseClick}
            aria-label="Close modal"
            style={{
              padding: 'var(--layera-global-components-drawer-closeButton-padding)',
              border: 'none',
              background: 'var(--layera-global-components-drawer-closeButton-background)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 'var(--layera-global-components-drawer-closeButton-size)',
              height: 'var(--layera-global-components-drawer-closeButton-size)',
              borderRadius: 'var(--layera-global-components-drawer-closeButton-borderRadius)'
            }}
          >
            <CloseIcon size="lg" theme="neutral" />
          </button>
        )}
        <Box>
          {children}
        </Box>
      </Box>
    </Box>
  );

  const portalContainer = (() => {
    if (container === null) return document.body;
    if (typeof container === 'function') return container();
    if (container) return container;
    return document.body;
  })();

  return createPortal(modalContent, portalContainer);
};