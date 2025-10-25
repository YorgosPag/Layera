import React from 'react';
import { SPACING_SCALE } from '@layera/constants';

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
    borderBottom: '1px solid #e5e7eb'
  };

  const titleStyles: React.CSSProperties = {
    margin: 0,
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: '#111827'
  };

  const subtitleStyles: React.CSSProperties = {
    margin: `${SPACING_SCALE.XS}px 0 0 0`,
    fontSize: '1rem',
    color: '#6b7280'
  };

  return (
    <header className={headerClasses} style={styles}>
      <div>
        <h1 style={titleStyles}>{title}</h1>
        {subtitle && <p style={subtitleStyles}>{subtitle}</p>}
        {children}
      </div>
      {actions && (
        <div style={{ display: 'flex', gap: `${SPACING_SCALE.SM}px`, alignItems: 'center' }}>
          {actions}
        </div>
      )}
    </header>
  );
};