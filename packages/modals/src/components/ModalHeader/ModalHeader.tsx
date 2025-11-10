import React from 'react';
import { Box } from '@layera/layout';
import { CloseIcon } from '@layera/icons';
import type { ModalHeaderProps } from '../../types';
// Enterprise: Using @layera/tokens CSS system instead of manual .css imports
// import './ModalHeader.css';

/**
 * ModalHeader - Header component για modals
 */
export const ModalHeader: React.FC<ModalHeaderProps> = ({
  children,
  title,
  subtitle,
  onClose,
  showCloseButton = true,
  className = ''
}) => {
  const headerClasses = [
    'layera-modal-header',
    className
  ].filter(Boolean).join(' ');

  return (
    <header className={headerClasses}>
      <Box as="div" className="layera-modal-header__content">
        {title && (
          <h2 className="layera-modal-header__title" id="modal-title">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="layera-modal-header__subtitle">
            {subtitle}
          </p>
        )}
        {children}
      </Box>

      {showCloseButton && onClose && (
        <button
          type="button"
          className="layera-modal-header__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <CloseIcon size="sm" theme="neutral" />
        </button>
      )}
    </header>
  );
};