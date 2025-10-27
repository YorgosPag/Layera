import React from 'react';
import { ButtonGroupProps } from '../types';
import { Box } from '@layera/layout';

/**
 * ButtonGroup Component - Ομαδοποιεί buttons για related actions
 *
 * Features:
 * - Horizontal ή vertical orientation
 * - Configurable spacing
 * - Uniform sizing option
 * - Proper border radius handling για connected look
 */
export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  orientation = 'horizontal',
  spacing = 'md',
  uniform = false,
  className = '',
  children
}) => {
  const classes = [
    'layera-btn-group',
    `layera-btn-group--${orientation}`,
    uniform && 'layera-btn-group--uniform',
    className
  ].filter(Boolean).join(' ');

  return (
    <Box
      className={classes}
      role="group"
      data-spacing={spacing}
    >
      {children}
    </Box>
  );
};

ButtonGroup.displayName = 'LayeraButtonGroup';