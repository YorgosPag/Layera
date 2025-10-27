import React from 'react';
import { Box } from '@layera/layout';

/**
 * DashboardGrid - Responsive grid layout για dashboard cards
 */
interface DashboardGridProps {
  children: React.ReactNode;
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const DashboardGrid: React.FC<DashboardGridProps> = ({
  children,
  columns = { xs: 1, md: 2, lg: 3 },
  gap = 'lg',
  className = ''
}) => {
  const gridClasses = [
    'layera-dashboard-grid',
    `layera-dashboard-grid--gap-${gap}`,
    className
  ].filter(Boolean).join(' ');

  const gridStyle = {
    '--grid-cols-xs': columns.xs || 1,
    '--grid-cols-sm': columns.sm || columns.xs || 1,
    '--grid-cols-md': columns.md || columns.sm || columns.xs || 2,
    '--grid-cols-lg': columns.lg || columns.md || columns.sm || 3,
    '--grid-cols-xl': columns.xl || columns.lg || columns.md || 4
  } as React.CSSProperties;

  return (
    <Box className={gridClasses} style={gridStyle}>
      {children}
    </Box>
  );
};

/**
 * DashboardSection - Wrapper για dashboard sections με title
 */
interface DashboardSectionProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

export const DashboardSection: React.FC<DashboardSectionProps> = ({
  children,
  title,
  subtitle,
  actions,
  className = ''
}) => {
  const sectionClasses = [
    'layera-dashboard-section',
    className
  ].filter(Boolean).join(' ');

  return (
    <section className={sectionClasses}>
      {(title || subtitle || actions) && (
        <Box className="layera-dashboard-section__header">
          <Box className="layera-dashboard-section__header-content">
            {title && <h2 className="layera-dashboard-section__title">{title}</h2>}
            {subtitle && <p className="layera-dashboard-section__subtitle">{subtitle}</p>}
          </Box>
          {actions && (
            <Box className="layera-dashboard-section__actions">
              {actions}
            </Box>
          )}
        </Box>
      )}
      <Box className="layera-dashboard-section__content">
        {children}
      </Box>
    </section>
  );
};