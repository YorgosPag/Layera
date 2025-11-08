import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Box } from '@layera/layout';
import { CloseIcon } from '@layera/icons';
import type { BaseModalProps } from '../../types';
import './Modal.css';

/**
 * Modal - Βασικό modal component για το Layera Modal System
 */
export const Modal: React.FC<BaseModalProps> = ({
  open,
  onClose,
  children,
  size = 'md',
  variant = 'default',
  animation = 'fade',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  preventBodyScroll = true,
  className = '',
  overlayClassName = '',
  contentClassName = '',
  contentStyle,
  contentPadding,
  overlayPadding,
  panelPadding,
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

  const handleCloseClick = (): void => {
    onClose();
  };

  if (!open) return null;

  const modalClasses = [
    'layera-modal',
    `layera-modal--${size}`,
    `layera-modal--${variant}`,
    `layera-modal--${animation}`,
    className
  ].filter(Boolean).join(' ');

  const overlayClasses = [
    'layera-modal-overlay',
    `layera-modal-overlay--${animation}`,
    overlayClassName
  ].filter(Boolean).join(' ');

  const modalContent = (
    <Box
      ref={overlayRef}
      className={overlayClasses}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      {...(overlayPadding !== undefined && {
        style: {
          padding: typeof overlayPadding === 'number' ? `${overlayPadding}px` : overlayPadding
        } as React.CSSProperties
      })}
    >
      <Box
        ref={modalRef}
        className={`${modalClasses} ${
          contentPadding !== undefined ? 'la-modal-padding-custom' : ''
        } ${
          panelPadding !== undefined ? 'la-modal-panel-padding-custom' : ''
        }`.trim()}
        role="document"
        {...(contentPadding !== undefined && {
          style: {
            '--la-modal-content-padding': typeof contentPadding === 'number' ? `${contentPadding}px` : contentPadding
          } as React.CSSProperties
        })}
        {...(panelPadding !== undefined && {
          style: {
            '--la-modal-inner-padding': typeof panelPadding === 'number' ? `${panelPadding}px` : panelPadding
          } as React.CSSProperties
        })}
      >
        {showCloseButton && (
          <button
            type="button"
            className="layera-modal__close"
            onClick={handleCloseClick}
            aria-label="Close modal"
          >
            <CloseIcon size="md" theme="neutral" />
          </button>
        )}
        <Box
          className={`layera-modal-content ${contentClassName} ${
            contentStyle ? 'la-modal-content-styled' : ''
          }`.trim()}
          {...(contentStyle && { style: contentStyle })}
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