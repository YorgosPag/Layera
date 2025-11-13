import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Box } from '@layera/layout';
import { CloseIcon } from '@layera/icons';
import type { DrawerProps } from '../../types';

/**
 * Drawer - Πλευρικό panel component για το Layera Modal System
 * Βασισμένο στο Modal component αλλά ανοίγει από τα πλάγια
 */
export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  children,
  position = 'right',
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  preventBodyScroll = true,
  overlayClassName,
  container,
  // Enterprise: Future enhancement - width/height customization through CSS classes only
  // width,
  // height,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy
}) => {

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

    const drawerElement = document.querySelector('.layera-drawer');
    const focusableElements = drawerElement?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements && focusableElements.length > 0) {
      (focusableElements[0] as HTMLElement).focus();
    }
  }, [open]);

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (closeOnOverlayClick && event.target instanceof Element &&
        event.target.classList.contains('layera-drawer-overlay')) {
      onClose();
    }
  };

  const handleCloseClick = () => {
    onClose();
  };

  if (!open) return null;

  const overlayClasses = [
    'layera-drawer-overlay',
    overlayClassName
  ].filter(Boolean).join(' ');

  const drawerContent = (
    <Box
      className={overlayClasses}
      data-position={position}
      data-size={size}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal={true}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
    >
      <Box
        as="section"
        className="layera-drawer"
        role="document"
      >
        {showCloseButton && (
          <button
            type="button"
            onClick={handleCloseClick}
            aria-label="Close drawer"
            className="layera-modal-close-button"
          >
            <CloseIcon size="lg" theme="neutral" />
          </button>
        )}
        <Box as="section">
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

  return createPortal(drawerContent, portalContainer);
};