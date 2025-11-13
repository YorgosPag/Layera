import React from 'react';

export interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}

/**
 * PageContainer - Enterprise container για page content
 * Παρέχει consistent layout με responsive breakpoints
 */
export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className = '',
  maxWidth = 'lg',
  padding = 'md',
  style
}) => {
  const classes = [
    'layera-page-container',
    `layera-page-container--${maxWidth}`,
    `layera-page-container--${padding}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <main className={classes} style={style}>
      {children}
    </main>
  );
};