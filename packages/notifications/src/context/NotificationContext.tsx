import React, { createContext, useContext, useReducer, useCallback } from 'react';
import type { Notification, NotificationOptions, NotificationContextState } from '../types';

interface NotificationAction {
  type: 'ADD_NOTIFICATION' | 'REMOVE_NOTIFICATION' | 'CLEAR_ALL' | 'UPDATE_NOTIFICATION';
  payload?: unknown;
}

interface NotificationState {
  notifications: Notification[];
}

const initialState: NotificationState = {
  notifications: []
};

function notificationReducer(state: NotificationState, action: NotificationAction): NotificationState {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload as Notification]
      };

    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload as string)
      };

    case 'CLEAR_ALL':
      return {
        ...state,
        notifications: []
      };

    case 'UPDATE_NOTIFICATION':
      const { id, updates } = action.payload as { id: string; updates: Partial<NotificationOptions> };
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === id
            ? { ...notification, ...updates }
            : notification
        )
      };

    default:
      return state;
  }
}

const NotificationContext = createContext<NotificationContextState | null>(null);

/**
 * useNotifications - Hook για πρόσβαση στο notification system
 */
export const useNotifications = (): NotificationContextState => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: React.ReactNode;
}

/**
 * NotificationProvider - Context provider για το notification system
 */
export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  const addNotification = useCallback((options: NotificationOptions): string => {
    const notification: Notification = {
      id: options.id || `notification-${Date.now()}-${Math.random()}`,
      type: options.type || 'info',
      title: options.title || '',
      message: options.message,
      duration: options.duration ?? 5000,
      persistent: options.persistent ?? false,
      dismissible: options.dismissible ?? true,
      timestamp: Date.now(),
      icon: options.icon,
      action: options.action,
      className: options.className
    };

    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: notification
    });

    return notification.id;
  }, []);

  const removeNotification = useCallback((id: string) => {
    dispatch({
      type: 'REMOVE_NOTIFICATION',
      payload: id
    });
  }, []);

  const clearAllNotifications = useCallback(() => {
    dispatch({
      type: 'CLEAR_ALL'
    });
  }, []);

  const updateNotification = useCallback((id: string, updates: Partial<NotificationOptions>) => {
    dispatch({
      type: 'UPDATE_NOTIFICATION',
      payload: { id, updates }
    });
  }, []);

  const contextValue: NotificationContextState = {
    notifications: state.notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    updateNotification
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};