import React from 'react';
import { HeaderActionsGroupProps } from '../../types';
import { Box } from '../Box';

/**
 * HeaderActionsGroup - Container για header actions με proper spacing
 */
export const HeaderActionsGroup: React.FC<HeaderActionsGroupProps> = ({
  children,
  className = ''
}) => {
  const classes = [
    'layera-header-actions-group',
    className
  ].filter(Boolean).join(' ');

  return (
    <Box className={classes}>
      {children}
    </Box>
  );
};