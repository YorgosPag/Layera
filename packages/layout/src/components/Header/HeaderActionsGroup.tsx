import React from 'react';
import { HeaderActionsGroupProps } from '../../types';

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
    <div className={classes}>
      {children}
    </div>
  );
};