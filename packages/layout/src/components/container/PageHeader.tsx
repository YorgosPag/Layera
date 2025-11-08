import React from 'react';
import { SPACING_SCALE } from '@layera/constants';
import { Box } from '../Box';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

/**
 * PageHeader - Enterprise header για pages
 * Παρέχει consistent styling για page titles και actions
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  children,
  className = '',
  actions
}) => {
  const headerClasses = [
    'layera-page-header',
    className
  ].filter(Boolean).join(' ');

  const styles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: `${SPACING_SCALE.XL}px`,
    paddingBottom: `${SPACING_SCALE.MD}px`,
    borderBottom: '1px solid var(--color-border-default)'
  };

  const titleStyles: React.CSSProperties = {
    margin: 0,
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: 'var(--la-text-primary)'
  };

  const subtitleStyles: React.CSSProperties = {
    margin: 'var(--la-space-margin-xs-0)', // 🎯 SST: XS 0 0 0 margin
    fontSize: '1rem',
    color: 'var(--la-text-secondary)'
  };

  return (
    <header className={headerClasses} style={styles}>
      <Box>
        <h1 style={titleStyles}>{title}</h1>
        {subtitle && <p style={subtitleStyles}>{subtitle}</p>}
        {children}
      </Box>
      {actions && (
        <Box display="flex" gap={`${SPACING_SCALE.SM}px`} alignItems="center">
          {actions}
        </Box>
      )}
    </header>
  );
};