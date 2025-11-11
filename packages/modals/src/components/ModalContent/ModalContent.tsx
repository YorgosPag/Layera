import React from 'react';
import { Box } from '@layera/layout';
import type { ModalContentProps } from '../../types';
// Enterprise: Using @layera/tokens CSS system instead of manual .css imports
// import './ModalContent.css';

/**
 * ModalContent - Content container για modals
 */
export const ModalContent: React.FC<ModalContentProps> = ({
  children,
  padding: _padding = 'md',  // Enterprise: Prefixed with _ to mark as intentionally unused
  scrollable: _scrollable = false,  // Enterprise: Prefixed with _ to mark as intentionally unused
  className: _className = ''  // Enterprise: Prefixed with _ to mark as intentionally unused
}) => {
  return (
    <Box id="modal-content">
      {children}
    </Box>
  );
};