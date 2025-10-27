import React from 'react';
import { Box } from '@layera/layout';
import { NOTIFICATION_ICON_SIZES, NOTIFICATION_STROKE_WIDTH } from '../../constants';
import type { AlertProps } from '../../types';
import './Alert.css';

/**
 * Alert - Static alert component για inline notifications
 */
export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  message,
  dismissible = false,
  onDismiss,
  action,
  icon,
  className = ''
}) => {
  const getTypeIcon = () => {
    if (icon) return icon;

    switch (type) {
      case 'success':
        return (
          <svg width={NOTIFICATION_ICON_SIZES.medium} height={NOTIFICATION_ICON_SIZES.medium} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={NOTIFICATION_STROKE_WIDTH.normal}>
            <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'warning':
        return (
          <svg width={NOTIFICATION_ICON_SIZES.medium} height={NOTIFICATION_ICON_SIZES.medium} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={NOTIFICATION_STROKE_WIDTH.normal}>
            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'error':
        return (
          <svg width={NOTIFICATION_ICON_SIZES.medium} height={NOTIFICATION_ICON_SIZES.medium} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={NOTIFICATION_STROKE_WIDTH.normal}>
            <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8v4m0 4h.01" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return (
          <svg width={NOTIFICATION_ICON_SIZES.medium} height={NOTIFICATION_ICON_SIZES.medium} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={NOTIFICATION_STROKE_WIDTH.normal}>
            <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8h.01M11 12h1v4h1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
    }
  };

  const alertClasses = [
    'layera-alert',
    `layera-alert--${type}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <Box className={alertClasses} role="alert">
      <Box className="layera-alert__icon">
        {getTypeIcon()}
      </Box>

      <Box className="layera-alert__content">
        {title && (
          <Box className="layera-alert__title">
            {title}
          </Box>
        )}
        <Box className="layera-alert__message">
          {message}
        </Box>
      </Box>

      {action && (
        <button
          type="button"
          className="layera-alert__action"
          onClick={action.onClick}
        >
          {action.label}
        </button>
      )}

      {dismissible && onDismiss && (
        <button
          type="button"
          className="layera-alert__dismiss"
          onClick={onDismiss}
          aria-label="Dismiss alert"
        >
          <svg width={NOTIFICATION_ICON_SIZES.small} height={NOTIFICATION_ICON_SIZES.small} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={NOTIFICATION_STROKE_WIDTH.normal}>
            <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </Box>
  );
};