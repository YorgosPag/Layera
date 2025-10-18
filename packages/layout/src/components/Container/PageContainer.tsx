import React from 'react';
import { PageContainerProps } from '../../types';

/**
 * PageContainer - Standardized container για page content με responsive behavior
 */
export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  maxWidth = 'xl',
  padding = 'lg',
  className = ''
}) => {
  const containerClasses = [
    'layera-page-container',
    `layera-page-container--max-${maxWidth}`,
    `layera-page-container--padding-${padding}`,
    className
  ].filter(Boolean).join(' ');

  const containerStyle = typeof maxWidth === 'number'
    ? { '--container-max-width': `${maxWidth}px` } as React.CSSProperties
    : {};

  return (
    <div className={containerClasses} style={containerStyle}>
      {children}
    </div>
  );
};