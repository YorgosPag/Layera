import React from 'react';
import { SPACING_SCALE } from '@layera/constants';
import { Box } from '../Box';

export interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * PageContainer - Enterprise container για page content
 * Παρέχει consistent layout με responsive breakpoints
 */
export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className = '',
  maxWidth = 'lg',
  padding = 'md'
}) => {
  const containerClasses = [
    'layera-page-container',
    `layera-page-container--${maxWidth}`,
    `layera-page-container--padding-${padding}`,
    className
  ].filter(Boolean).join(' ');

  const styles: React.CSSProperties = {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    ...(maxWidth === 'sm' && { maxWidth: '640px' }),
    ...(maxWidth === 'md' && { maxWidth: '768px' }),
    ...(maxWidth === 'lg' && { maxWidth: '1024px' }),
    ...(maxWidth === 'xl' && { maxWidth: '1280px' }),
    ...(maxWidth === 'full' && { maxWidth: '100%' }),
    ...(padding === 'none' && { padding: '0' }),
    ...(padding === 'sm' && { padding: `${SPACING_SCALE.SM}px` }),
    ...(padding === 'md' && { padding: `${SPACING_SCALE.MD}px` }),
    ...(padding === 'lg' && { padding: 'var(--la-space-6)' }) // 🎯 SST: LG padding (24px)
  };

  return (
    <Box className={containerClasses} style={styles}>
      {children}
    </Box>
  );
};