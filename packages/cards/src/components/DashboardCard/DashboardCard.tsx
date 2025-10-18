import React from 'react';
import { DashboardCardProps } from '../../types';
import { BaseCard } from '../BaseCard';

/**
 * DashboardCard - Specialized card για dashboard widgets με metrics και status
 */
export const DashboardCard: React.FC<DashboardCardProps> = ({
  children,
  variant = 'info',
  loading = false,
  error = null,
  metric,
  ...baseProps
}) => {
  const renderContent = () => {
    if (loading) {
      return (
        <div className="layera-dashboard-card__loading">
          <div className="layera-dashboard-card__skeleton">
            <div className="layera-skeleton layera-skeleton--text"></div>
            <div className="layera-skeleton layera-skeleton--text layera-skeleton--sm"></div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="layera-dashboard-card__error">
          <div className="layera-dashboard-card__error-icon">⚠️</div>
          <p className="layera-dashboard-card__error-message">{error}</p>
        </div>
      );
    }

    if (metric) {
      return (
        <div className="layera-dashboard-card__metric">
          <div className="layera-dashboard-card__metric-value">
            {metric.value}
          </div>
          <div className="layera-dashboard-card__metric-label">
            {metric.label}
          </div>
          {metric.change && (
            <div className={`layera-dashboard-card__metric-change layera-dashboard-card__metric-change--${metric.change.direction}`}>
              <span className="layera-dashboard-card__metric-change-icon">
                {metric.change.direction === 'up' ? '↗️' : metric.change.direction === 'down' ? '↘️' : '→'}
              </span>
              <span className="layera-dashboard-card__metric-change-value">
                {metric.change.value > 0 ? '+' : ''}{metric.change.value}%
              </span>
              {metric.change.period && (
                <span className="layera-dashboard-card__metric-change-period">
                  {metric.change.period}
                </span>
              )}
            </div>
          )}
        </div>
      );
    }

    return children;
  };

  const cardClasses = [
    'layera-dashboard-card',
    `layera-dashboard-card--${variant}`,
    loading ? 'layera-dashboard-card--loading' : '',
    error ? 'layera-dashboard-card--error' : ''
  ].filter(Boolean).join(' ');

  return (
    <BaseCard
      {...baseProps}
      className={`${cardClasses} ${baseProps.className || ''}`}
    >
      {renderContent()}
    </BaseCard>
  );
};