import React from 'react';
import type { ModalHeaderProps } from '../../types';
import './ModalHeader.css';

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
      <div className="layera-modal-header__content">
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
      </div>

      {showCloseButton && onClose && (
        <button
          type="button"
          className="layera-modal-header__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </header>
  );
};