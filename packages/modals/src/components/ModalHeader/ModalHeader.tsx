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
  className: _className = ''  // Enterprise: Prefixed with _ to mark as intentionally unused
}) => {
  return (
    <header>
      <Box>
        {title && (
          <h2 id="modal-title" className="layera-card__modalHeader">
            {title}
          </h2>
        )}
        {subtitle && (
          <p>
            {subtitle}
          </p>
        )}
        {children}
      </Box>

      {showCloseButton && onClose && (
        <button
          type="button"
          onClick={onClose}
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
    </header>
  );
};