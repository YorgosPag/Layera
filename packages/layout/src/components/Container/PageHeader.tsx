import React from 'react';
import { PageHeaderProps } from '../../types';

/**
 * PageHeader - Standardized header για individual pages
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  actions,
  breadcrumbs,
  className = ''
}) => {
  const headerClasses = [
    'layera-page-header',
    className
  ].filter(Boolean).join(' ');

  return (
    <header className={headerClasses}>
      {breadcrumbs && (
        <div className="layera-page-header__breadcrumbs">
          {breadcrumbs}
        </div>
      )}

      <div className="layera-page-header__main">
        <div className="layera-page-header__content">
          <h1 className="layera-page-header__title">{title}</h1>
          {subtitle && (
            <p className="layera-page-header__subtitle">{subtitle}</p>
          )}
        </div>

        {actions && (
          <div className="layera-page-header__actions">
            {actions}
          </div>
        )}
      </div>
    </header>
  );
};