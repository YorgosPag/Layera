import React from "react";
import { ReactNode } from 'react';

/**
 * Notification Types για το Layera Notification System
 */

export type NotificationType = 'info' | 'success' | 'warning' | 'error';
export type NotificationPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface NotificationOptions {
  id?: string;
  type?: NotificationType;
  title?: string;
  message: string;
  duration?: number;
  persistent?: boolean;
  dismissible?: boolean;
  action?: {
    label: string;
    onClick: () => React.ReactNode;
  };
  icon?: ReactNode;
  className?: string;
}

export interface Notification extends Required<Omit<NotificationOptions, 'icon' | 'action' | 'className'>> {
  id: string;
  timestamp: number;
  icon?: ReactNode;
  action?: NotificationOptions['action'];
  className?: string;
}

export interface ToastProps {
  notification: Notification;
  onDismiss: (id: string) => React.ReactNode;
  position?: NotificationPosition;
}

export interface NotificationProviderProps {
  children: ReactNode;
  position?: NotificationPosition;
  maxNotifications?: number;
  defaultDuration?: number;
  className?: string;
}

export interface NotificationContextState {
  notifications: Notification[];
  addNotification: (options: NotificationOptions) => string;
  removeNotification: (id: string) => React.ReactNode;
  clearAllNotifications: () => React.ReactNode;
  updateNotification: (id: string, updates: Partial<NotificationOptions>) => React.ReactNode;
}

export interface AlertProps {
  type?: NotificationType;
  title?: string;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  action?: {
    label: string;
    onClick: () => React.ReactNode;
  };
  icon?: ReactNode;
  className?: string;
}