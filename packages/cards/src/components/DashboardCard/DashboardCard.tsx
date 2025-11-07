import React from 'react';
import { DashboardCardProps } from '../../types';
import { BaseCard } from '../BaseCard';
import { Box } from '@layera/layout';
import { getCardInfoColor, getCardInfoBorder } from '@layera/constants';

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
  const renderContent = (): React.ReactNode => {
    if (loading) {
      return (
        <Box className="layera-dashboard-card__loading">
          <Box className="layera-dashboard-card__skeleton">
            <Box className="layera-skeleton layera-skeleton--text"></Box>
            <Box className="layera-skeleton layera-skeleton--text layera-skeleton--sm"></Box>
          </Box>
        </Box>
      );
    }

    if (error) {
      return (
        <Box className="layera-dashboard-card__error">
          <Box className="layera-dashboard-card__error-icon">⚠️</Box>
          <p className="layera-dashboard-card__error-message">{error}</p>
        </Box>
      );
    }

    if (metric) {
      return (
        <Box className="layera-dashboard-card__metric">
          <Box className="layera-dashboard-card__metric-value">
            {metric.value}
          </Box>
          <Box className="layera-dashboard-card__metric-label">
            {metric.label}
          </Box>
          {metric.change && (
            <Box className={`layera-dashboard-card__metric-change layera-dashboard-card__metric-change--${metric.change.direction}`}>
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
            </Box>
          )}
        </Box>
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
      style={{
        ...baseProps.style,
        backgroundColor: baseProps.style?.backgroundColor || getCardInfoColor(), // 🔴 SST: Χρώμα από μοναδική πηγή αλήθειας
        border: `3px solid ${getCardInfoBorder()}` // 🔲 SST: Περίγραμμα από μοναδική πηγή αλήθειας #b929c6
      }}
    >
      {renderContent()}
    </BaseCard>
  );
};