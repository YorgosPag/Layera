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
  size = 'md',
  // variant = 'default',     // Enterprise: Unused - keeping for future
  // animation = 'fade',      // Enterprise: Unused - keeping for future
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  preventBodyScroll = true,
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
    if (closeOnOverlayClick && event.target === overlayRef.current) {
      onClose();
    }
  };

  const handleCloseClick = () => {
    onClose();
  };

  if (!open) return null;

  const modalContent = (
    <Box
      as="div"
      style={{
        position: 'fixed',
        inset: 'var(--la-global-spacing-0)',
        zIndex: 'var(--la-global-zIndex-modal)',
        backgroundColor: 'var(--la-global-colors-surface-overlay)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--la-global-spacing-4)',
      }}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal={true}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
    >
      <Box
        as="section"
        style={{
          position: 'relative',
          backgroundColor: 'var(--la-global-colors-surface-primary)',
          border: `var(--la-global-borderWidth-1) solid var(--la-global-colors-border-primary)`,
          borderRadius: 'var(--la-global-borderRadius-lg)',
          boxShadow: 'var(--la-global-boxShadow-2xl)',
          width: 'var(--la-global-spacing-full)',
          maxWidth: size === 'xs' ? 'var(--la-global-spacing-modal-xs)' :
                   size === 'sm' ? 'var(--la-global-spacing-modal-sm)' :
                   size === 'md' ? 'var(--la-global-spacing-modal-md)' :
                   size === 'lg' ? 'var(--la-global-spacing-modal-lg)' :
                   size === 'xl' ? 'var(--la-global-spacing-modal-xl)' : 'var(--la-global-spacing-modal-md)',
          maxHeight: 'calc(100vh - var(--la-global-spacing-8))',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column' as const,
          padding: 'var(--la-global-spacing-4)',
        }}
        role="document"
      >
        {showCloseButton && (
          <button
            type="button"
            style={{
              position: 'absolute',
              top: 'var(--la-global-spacing-3)',
              right: 'var(--la-global-spacing-3)',
              zIndex: 'var(--la-global-zIndex-dropdown)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 'var(--la-global-spacing-8)',
              height: 'var(--la-global-spacing-8)',
              border: 'none',
              borderRadius: 'var(--la-global-borderRadius-md)',
              backgroundColor: 'var(--la-global-colors-transparent)',
              color: 'var(--la-global-colors-text-secondary)',
              cursor: 'pointer',
              transition: 'all var(--la-global-duration-fast) ease',
            }}
            onClick={handleCloseClick}
            aria-label="Close modal"
          >
            <CloseIcon size="md" theme="neutral" />
          </button>
        )}
        <Box
          as="section"
          style={{
            flex: 1,
            minHeight: 'var(--la-global-spacing-0)',
            backgroundColor: 'var(--la-global-colors-surface-primary)',
            padding: 'var(--la-global-spacing-4)',
          }}
        >
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