import React from 'react';
import { Box } from '@layera/layout';
import type { ModalFooterProps } from '../../types';
import './ModalFooter.css';

/**
 * ModalFooter - Footer component για modals
 */
export const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  actions,
  align = 'right',
  className = ''
}) => {
  const footerClasses = [
    'layera-modal-footer',
    `layera-modal-footer--${align}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <footer className={footerClasses}>
      <Box className="layera-modal-footer__content">
        {children}
      </Box>
      {actions && (
        <Box className="layera-modal-footer__actions">
          {actions}
        </Box>
      )}
    </footer>
  );
};