/**
 * Layera Notifications - Components Export
 */

export { Toast } from './toast';
export { NotificationContainer } from './NotificationContainer';
export { NotificationProvider } from './NotificationProvider';
export { Alert } from './alert';

// ============= ALIAS EXPORTS για App Compatibility =============
// Export aliases to maintain backward compatibility
export { Toast as ToastComponent } from './toast';
export { Toast as NotificationToast } from './toast';

export { NotificationContainer as NotificationsContainer } from './NotificationContainer';
export { NotificationContainer as ToastContainer } from './NotificationContainer';

export { NotificationProvider as NotificationsProvider } from './NotificationProvider';
export { NotificationProvider as ToastProvider } from './NotificationProvider';
export { NotificationProvider as NotificationSystem } from './NotificationProvider';

export { Alert as AlertComponent } from './alert';
export { Alert as NotificationAlert } from './alert';