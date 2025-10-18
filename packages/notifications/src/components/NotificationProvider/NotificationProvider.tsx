import React from 'react';
import { NotificationProvider as ContextProvider, useNotifications } from '../../context';
import { NotificationContainer } from '../NotificationContainer';
import type { NotificationProviderProps } from '../../types';

/**
 * NotificationProvider - Complete provider με UI container
 */
export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
  position = 'top-right',
  maxNotifications = 5,
  defaultDuration = 5000,
  className = ''
}) => {
  return (
    <ContextProvider>
      <NotificationProviderInner
        position={position}
        maxNotifications={maxNotifications}
        defaultDuration={defaultDuration}
        className={className}
      >
        {children}
      </NotificationProviderInner>
    </ContextProvider>
  );
};

interface NotificationProviderInnerProps {
  children: React.ReactNode;
  position: NotificationProviderProps['position'];
  maxNotifications: number;
  defaultDuration: number;
  className: string;
}

const NotificationProviderInner: React.FC<NotificationProviderInnerProps> = ({
  children,
  position = 'top-right',
  maxNotifications,
  className
}) => {
  const { notifications, removeNotification } = useNotifications();

  return (
    <>
      {children}
      <NotificationContainer
        notifications={notifications}
        onDismiss={removeNotification}
        position={position}
        maxNotifications={maxNotifications}
        className={className}
      />
    </>
  );
};