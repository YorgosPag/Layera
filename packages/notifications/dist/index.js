import React, { useState, useEffect, createContext, useContext, useReducer, useCallback } from 'react';
import { createPortal } from 'react-dom';

/**
 * Notification Constants για το Notification System
 */
const NOTIFICATION_ICON_SIZES = {
    small: 16,
    medium: 20};
const NOTIFICATION_STROKE_WIDTH = {
    normal: 2};

/**
 * Toast - Individual notification component
 */
const Toast = ({ notification, onDismiss, position = 'top-right' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    useEffect(() => {
        // Trigger enter animation
        const timer = setTimeout(() => setIsVisible(true), 10);
        return () => clearTimeout(timer);
    }, []);
    useEffect(() => {
        if (!notification.persistent && notification.duration > 0) {
            const timer = setTimeout(() => {
                handleDismiss();
            }, notification.duration);
            return () => clearTimeout(timer);
        }
    }, [notification.duration, notification.persistent]);
    const handleDismiss = () => {
        setIsExiting(true);
        setTimeout(() => {
            onDismiss(notification.id);
        }, 300);
    };
    const handleActionClick = () => {
        if (notification.action) {
            notification.action.onClick();
            handleDismiss();
        }
    };
    const getTypeIcon = () => {
        if (notification.icon)
            return notification.icon;
        switch (notification.type) {
            case 'success':
                return (React.createElement("svg", { width: NOTIFICATION_ICON_SIZES.medium, height: NOTIFICATION_ICON_SIZES.medium, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: NOTIFICATION_STROKE_WIDTH.normal },
                    React.createElement("path", { d: "M9 12l2 2 4-4", strokeLinecap: "round", strokeLinejoin: "round" }),
                    React.createElement("circle", { cx: "12", cy: "12", r: "9", strokeLinecap: "round", strokeLinejoin: "round" })));
            case 'warning':
                return (React.createElement("svg", { width: NOTIFICATION_ICON_SIZES.medium, height: NOTIFICATION_ICON_SIZES.medium, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: NOTIFICATION_STROKE_WIDTH.normal },
                    React.createElement("path", { d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z", strokeLinecap: "round", strokeLinejoin: "round" })));
            case 'error':
                return (React.createElement("svg", { width: NOTIFICATION_ICON_SIZES.medium, height: NOTIFICATION_ICON_SIZES.medium, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: NOTIFICATION_STROKE_WIDTH.normal },
                    React.createElement("circle", { cx: "12", cy: "12", r: "9", strokeLinecap: "round", strokeLinejoin: "round" }),
                    React.createElement("path", { d: "M12 8v4m0 4h.01", strokeLinecap: "round", strokeLinejoin: "round" })));
            default:
                return (React.createElement("svg", { width: NOTIFICATION_ICON_SIZES.medium, height: NOTIFICATION_ICON_SIZES.medium, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: NOTIFICATION_STROKE_WIDTH.normal },
                    React.createElement("circle", { cx: "12", cy: "12", r: "9", strokeLinecap: "round", strokeLinejoin: "round" }),
                    React.createElement("path", { d: "M12 8h.01M11 12h1v4h1", strokeLinecap: "round", strokeLinejoin: "round" })));
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
    return (React.createElement("div", { className: toastClasses, role: "alert", "aria-live": "polite" },
        React.createElement("div", { className: "layera-toast__icon" }, getTypeIcon()),
        React.createElement("div", { className: "layera-toast__content" },
            notification.title && (React.createElement("div", { className: "layera-toast__title" }, notification.title)),
            React.createElement("div", { className: "layera-toast__message" }, notification.message)),
        notification.action && (React.createElement("button", { type: "button", className: "layera-toast__action", onClick: handleActionClick }, notification.action.label)),
        notification.dismissible && (React.createElement("button", { type: "button", className: "layera-toast__dismiss", onClick: handleDismiss, "aria-label": "Dismiss notification" },
            React.createElement("svg", { width: NOTIFICATION_ICON_SIZES.small, height: NOTIFICATION_ICON_SIZES.small, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: NOTIFICATION_STROKE_WIDTH.normal },
                React.createElement("line", { x1: "18", y1: "6", x2: "6", y2: "18", strokeLinecap: "round", strokeLinejoin: "round" }),
                React.createElement("line", { x1: "6", y1: "6", x2: "18", y2: "18", strokeLinecap: "round", strokeLinejoin: "round" })))),
        !notification.persistent && notification.duration > 0 && (React.createElement("div", { className: "layera-toast__progress", style: {
                animationDuration: `${notification.duration}ms`
            } }))));
};

/**
 * NotificationContainer - Container για όλα τα active notifications
 */
const NotificationContainer = ({ notifications, onDismiss, position, maxNotifications, className = '' }) => {
    const visibleNotifications = notifications.slice(0, maxNotifications);
    const containerClasses = [
        'layera-notification-container',
        `layera-notification-container--${position}`,
        className
    ].filter(Boolean).join(' ');
    if (visibleNotifications.length === 0) {
        return null;
    }
    const containerContent = (React.createElement("div", { className: containerClasses, role: "region", "aria-label": "Notifications" }, visibleNotifications.map((notification) => (React.createElement(Toast, { key: notification.id, notification: notification, onDismiss: onDismiss, position: position })))));
    return createPortal(containerContent, document.body);
};

const initialState = {
    notifications: []
};
function notificationReducer(state, action) {
    switch (action.type) {
        case 'ADD_NOTIFICATION':
            return {
                ...state,
                notifications: [...state.notifications, action.payload]
            };
        case 'REMOVE_NOTIFICATION':
            return {
                ...state,
                notifications: state.notifications.filter(n => n.id !== action.payload)
            };
        case 'CLEAR_ALL':
            return {
                ...state,
                notifications: []
            };
        case 'UPDATE_NOTIFICATION':
            const { id, updates } = action.payload;
            return {
                ...state,
                notifications: state.notifications.map(notification => notification.id === id
                    ? { ...notification, ...updates }
                    : notification)
            };
        default:
            return state;
    }
}
const NotificationContext = createContext(null);
/**
 * useNotifications - Hook για πρόσβαση στο notification system
 */
const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
};
/**
 * NotificationProvider - Context provider για το notification system
 */
const NotificationProvider$1 = ({ children }) => {
    const [state, dispatch] = useReducer(notificationReducer, initialState);
    const addNotification = useCallback((options) => {
        const notification = {
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
    const removeNotification = useCallback((id) => {
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
    const updateNotification = useCallback((id, updates) => {
        dispatch({
            type: 'UPDATE_NOTIFICATION',
            payload: { id, updates }
        });
    }, []);
    const contextValue = {
        notifications: state.notifications,
        addNotification,
        removeNotification,
        clearAllNotifications,
        updateNotification
    };
    return (React.createElement(NotificationContext.Provider, { value: contextValue }, children));
};

/**
 * NotificationProvider - Complete provider με UI container
 */
const NotificationProvider = ({ children, position = 'top-right', maxNotifications = 5, defaultDuration = 5000, className = '' }) => {
    return (React.createElement(NotificationProvider$1, null,
        React.createElement(NotificationProviderInner, { position: position, maxNotifications: maxNotifications, defaultDuration: defaultDuration, className: className }, children)));
};
const NotificationProviderInner = ({ children, position = 'top-right', maxNotifications, className }) => {
    const { notifications, removeNotification } = useNotifications();
    return (React.createElement(React.Fragment, null,
        children,
        React.createElement(NotificationContainer, { notifications: notifications, onDismiss: removeNotification, position: position, maxNotifications: maxNotifications, className: className })));
};

/**
 * Alert - Static alert component για inline notifications
 */
const Alert = ({ type = 'info', title, message, dismissible = false, onDismiss, action, icon, className = '' }) => {
    const getTypeIcon = () => {
        if (icon)
            return icon;
        switch (type) {
            case 'success':
                return (React.createElement("svg", { width: NOTIFICATION_ICON_SIZES.medium, height: NOTIFICATION_ICON_SIZES.medium, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: NOTIFICATION_STROKE_WIDTH.normal },
                    React.createElement("path", { d: "M9 12l2 2 4-4", strokeLinecap: "round", strokeLinejoin: "round" }),
                    React.createElement("circle", { cx: "12", cy: "12", r: "9", strokeLinecap: "round", strokeLinejoin: "round" })));
            case 'warning':
                return (React.createElement("svg", { width: NOTIFICATION_ICON_SIZES.medium, height: NOTIFICATION_ICON_SIZES.medium, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: NOTIFICATION_STROKE_WIDTH.normal },
                    React.createElement("path", { d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z", strokeLinecap: "round", strokeLinejoin: "round" })));
            case 'error':
                return (React.createElement("svg", { width: NOTIFICATION_ICON_SIZES.medium, height: NOTIFICATION_ICON_SIZES.medium, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: NOTIFICATION_STROKE_WIDTH.normal },
                    React.createElement("circle", { cx: "12", cy: "12", r: "9", strokeLinecap: "round", strokeLinejoin: "round" }),
                    React.createElement("path", { d: "M12 8v4m0 4h.01", strokeLinecap: "round", strokeLinejoin: "round" })));
            default:
                return (React.createElement("svg", { width: NOTIFICATION_ICON_SIZES.medium, height: NOTIFICATION_ICON_SIZES.medium, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: NOTIFICATION_STROKE_WIDTH.normal },
                    React.createElement("circle", { cx: "12", cy: "12", r: "9", strokeLinecap: "round", strokeLinejoin: "round" }),
                    React.createElement("path", { d: "M12 8h.01M11 12h1v4h1", strokeLinecap: "round", strokeLinejoin: "round" })));
        }
    };
    const alertClasses = [
        'layera-alert',
        `layera-alert--${type}`,
        className
    ].filter(Boolean).join(' ');
    return (React.createElement("div", { className: alertClasses, role: "alert" },
        React.createElement("div", { className: "layera-alert__icon" }, getTypeIcon()),
        React.createElement("div", { className: "layera-alert__content" },
            title && (React.createElement("div", { className: "layera-alert__title" }, title)),
            React.createElement("div", { className: "layera-alert__message" }, message)),
        action && (React.createElement("button", { type: "button", className: "layera-alert__action", onClick: action.onClick }, action.label)),
        dismissible && onDismiss && (React.createElement("button", { type: "button", className: "layera-alert__dismiss", onClick: onDismiss, "aria-label": "Dismiss alert" },
            React.createElement("svg", { width: NOTIFICATION_ICON_SIZES.small, height: NOTIFICATION_ICON_SIZES.small, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: NOTIFICATION_STROKE_WIDTH.normal },
                React.createElement("line", { x1: "18", y1: "6", x2: "6", y2: "18", strokeLinecap: "round", strokeLinejoin: "round" }),
                React.createElement("line", { x1: "6", y1: "6", x2: "18", y2: "18", strokeLinecap: "round", strokeLinejoin: "round" }))))));
};

export { Alert, NotificationContainer, NotificationProvider, Toast, useNotifications };
//# sourceMappingURL=index.js.map
