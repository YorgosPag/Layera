import React from 'react';
import type { Notification, NotificationPosition } from '../../types';
import './NotificationContainer.css';
interface NotificationContainerProps {
    notifications: Notification[];
    onDismiss: (id: string) => void;
    position: NotificationPosition;
    maxNotifications: number;
    className?: string;
}
/**
 * NotificationContainer - Container για όλα τα active notifications
 */
export declare const NotificationContainer: React.FC<NotificationContainerProps>;
export {};
//# sourceMappingURL=NotificationContainer.d.ts.map