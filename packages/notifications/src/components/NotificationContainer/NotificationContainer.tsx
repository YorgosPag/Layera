import React from 'react';
import { createPortal } from 'react-dom';
import { Box } from '@layera/layout';
import { Toast } from '../toast';
import type { Notification, NotificationPosition } from '../../types';
import './NotificationContainer.css';

interface NotificationContainerProps {
  notifications: Notification[];
  onDismiss: (id: string) => React.ReactNode;
  position: NotificationPosition;
  maxNotifications: number;
  className?: string;
}

/**
 * NotificationContainer - Container για όλα τα active notifications
 */
export const NotificationContainer: React.FC<NotificationContainerProps> = ({
  notifications,
  onDismiss,
  position,
  maxNotifications,
  className = ''
}) => {
  const visibleNotifications = notifications.slice(0, maxNotifications);

  const containerClasses = [
    'layera-notification-container',
    `layera-notification-container--${position}`,
    className
  ].filter(Boolean).join(' ');

  if (visibleNotifications.length === 0) {
    return null;
  }

  const containerContent = (
    <Box className={containerClasses} role="region" aria-label="Notifications">
      {visibleNotifications.map((notification: unknown) => (
        <Toast
          key={notification.id}
          notification={notification}
          onDismiss={onDismiss}
          position={position}
        />
      ))}
    </Box>
  );

  return createPortal(containerContent, document.body);
};