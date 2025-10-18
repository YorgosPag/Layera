import React from 'react';
import type { ModalContentProps } from '../../types';
import './ModalContent.css';

/**
 * ModalContent - Content container για modals
 */
export const ModalContent: React.FC<ModalContentProps> = ({
  children,
  padding = 'md',
  scrollable = false,
  className = ''
}) => {
  const contentClasses = [
    'layera-modal-content',
    `layera-modal-content--${padding}`,
    scrollable && 'layera-modal-content--scrollable',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={contentClasses} id="modal-content">
      {children}
    </div>
  );
};