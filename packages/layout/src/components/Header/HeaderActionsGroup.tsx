import React from 'react';
import { HeaderActionsGroupProps } from '../../types';
import { Box } from '../Box';

/**
 * HeaderActionsGroup - KADOS Compliant Actions Container
 * Χρησιμοποιεί μόνο προκαθορισμένες layout κλάσεις
 */
export const HeaderActionsGroup: React.FC<HeaderActionsGroupProps> = ({
  children,
  className = ''
}) => {
  // KADOS Compliant: μόνο προκαθορισμένες κλάσεις με design tokens
  const classes = [
    'layera-flex',
    'layera-flex--align-center',
    'layera-flex--gap-sm',
    className
  ].filter(Boolean).join(' ');

  return (
    <Box className={classes}>
      {children}
    </Box>
  );
};