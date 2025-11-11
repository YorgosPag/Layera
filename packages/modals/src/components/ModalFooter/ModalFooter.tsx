import React from 'react';
import { Box } from '@layera/layout';
import type { ModalFooterProps } from '../../types';
// Enterprise: Using @layera/tokens CSS system instead of manual .css imports
// import './ModalFooter.css';

/**
 * ModalFooter - Footer component για modals
 */
export const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  actions,
  align: _align = 'right',  // Enterprise: Prefixed with _ to mark as intentionally unused
  className: _className = ''  // Enterprise: Prefixed with _ to mark as intentionally unused
}) => {
  return (
    <footer>
      <Box>
        {children}
      </Box>
      {actions && (
        <Box>
          {actions}
        </Box>
      )}
    </footer>
  );
};