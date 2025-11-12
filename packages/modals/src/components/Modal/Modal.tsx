import React, { useEffect, useRef } from 'react';
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
        background: 'var(--layera-global-colors-theme-light-header-background, #ffffff)'
      }}
    >
      <Box
        as="section"
        role="document"
        style={noOverlay ? { pointerEvents: 'auto' } : undefined}
      >
        {showCloseButton && (
          <button
            type="button"
            onClick={handleCloseClick}
            aria-label="Close modal"
          >
            <CloseIcon size="md" theme="neutral" />
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