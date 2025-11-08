import React, { useEffect, useState } from 'react';
import { Box } from '@layera/layout';
import { NOTIFICATION_ICON_SIZES, NOTIFICATION_STROKE_WIDTH } from '../../constants';
import type { ToastProps } from '../../types';
import './Toast.css';

/**
 * Toast - Individual notification component
 */
export const Toast: React.FC<ToastProps> = ({
  notification,
  onDismiss,
  position = 'top-right'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    const timer = setTimeout((): void => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!notification.persistent && notification.duration > 0) {
      const timer = setTimeout((): void => {
        handleDismiss();
      }, notification.duration);

      return () => clearTimeout(timer);
    }
  }, [notification.duration, notification.persistent]);

  const handleDismiss = (): void => {
    setIsExiting(true);
    setTimeout((): void => {
      onDismiss(notification.id);
    }, 300);
  };

  const handleActionClick = (): void => {
    if (notification.action) {
      notification.action.onClick();
      handleDismiss();
    }
  };

  const getTypeIcon = (): JSX.Element | null => {
    if (notification.icon) return notification.icon;

    switch (notification.type) {
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

  const toastClasses = [
    'layera-toast',
    `layera-toast--${notification.type}`,
    `layera-toast--${position}`,
    isVisible && 'layera-toast--visible',
    isExiting && 'layera-toast--exiting',
    notification.className
  ].filter(Boolean).join(' ');

  return (
    <Box className={toastClasses} role="alert" aria-live="polite">
      <Box className="layera-toast__icon">
        {getTypeIcon()}
      </Box>

      <Box className="layera-toast__content">
        {notification.title && (
          <Box className="layera-toast__title">
            {notification.title}
          </Box>
        )}
        <Box className="layera-toast__message">
          {notification.message}
        </Box>
      </Box>

      {notification.action && (
        <button
          type="button"
          className="layera-toast__action"
          onClick={handleActionClick}
        >
          {notification.action.label}
        </button>
      )}

      {notification.dismissible && (
        <button
          type="button"
          className="layera-toast__dismiss"
          onClick={handleDismiss}
          aria-label="Dismiss notification"
        >
          <svg width={NOTIFICATION_ICON_SIZES.small} height={NOTIFICATION_ICON_SIZES.small} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={NOTIFICATION_STROKE_WIDTH.normal}>
            <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {!notification.persistent && notification.duration > 0 && (
        <Box
          className="layera-toast__progress"
          animationDuration={`${notification.duration}ms`}
        />
      )}
    </Box>
  );
};