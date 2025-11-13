import React from 'react';

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

  return (
    <header className={headerClasses}>
      <section className="layera-page-header__content">
        <h1 className="layera-page-header__title">
          {title}
        </h1>
        {subtitle && (
          <p className="layera-page-header__subtitle">
            {subtitle}
          </p>
        )}
        {children}
      </section>
      {actions && (
        <nav className="layera-page-header__actions">
          {actions}
        </nav>
      )}
    </header>
  );
};