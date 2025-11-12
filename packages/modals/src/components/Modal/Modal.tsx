import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Box } from '@layera/layout';
import { CloseIcon } from '@layera/icons';
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
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);

  // Draggable state
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  // Check if device supports touch and is mobile
  const isTouchDevice = useCallback(() => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }, []);

  const isMobile = useCallback(() => {
    return window.innerWidth < 768; // Mobile breakpoint
  }, []);

  // Draggable logic
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!draggable || isMobile() || !modalRef.current) return;

    setIsDragging(true);
    const rect = modalRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    e.preventDefault();
  }, [draggable, isMobile]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !draggable || isMobile()) return;

    setModalPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    });
  }, [isDragging, draggable, dragOffset, isMobile]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Handle dragging events
  useEffect(() => {
    if (!draggable || isTouchDevice() || isMobile()) return;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp, draggable, isTouchDevice, isMobile]);

  // Reset position when modal opens
  useEffect(() => {
    if (open) {
      setModalPosition({ x: 0, y: 0 });
      setIsDragging(false);
    }
  }, [open]);

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
    if (!open) return;

    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements && focusableElements.length > 0) {
      (focusableElements[0] as HTMLElement).focus();
    }
  }, [open]);

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (!noOverlay && closeOnOverlayClick && event.target === overlayRef.current) {
      onClose();
    }
  };

  const handleCloseClick = () => {
    onClose();
  };

  if (!open) return null;

  const modalContent = (
    <Box
      ref={overlayRef}
      className={`layera-modal ${noOverlay ? 'layera-modal--no-overlay' : ''}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal={true}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      style={noOverlay ? {
        background: 'var(--layera-global-components-drawer-pinnedOverlay-background, transparent)',
        pointerEvents: 'var(--layera-global-components-drawer-pinnedOverlay-pointerEvents, none)'
      } : {
        background: 'var(--layera-color-surface-primary, #ffffff)'
      }}
    >
      <Box
        ref={modalRef}
        as="section"
        role="document"
        onMouseDown={draggable && !isMobile() ? handleMouseDown : undefined}
        style={{
          ...(noOverlay ? {
            pointerEvents: 'auto',
            background: 'var(--layera-color-surface-primary, #ffffff)'
          } : {
            background: 'var(--layera-color-surface-primary, #ffffff)'
          }),
          ...(draggable && !isMobile() && !isTouchDevice() ? {
            position: 'fixed',
            left: modalPosition.x,
            top: modalPosition.y,
            cursor: isDragging ? 'grabbing' : 'grab',
            userSelect: 'none',
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