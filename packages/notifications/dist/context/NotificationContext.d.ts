import React from 'react';
import type { NotificationContextState } from '../types';
/**
 * useNotifications - Hook για πρόσβαση στο notification system
 */
export declare const useNotifications: () => NotificationContextState;
interface NotificationProviderProps {
    children: React.ReactNode;
}
/**
 * NotificationProvider - Context provider για το notification system
 */
export declare const NotificationProvider: React.FC<NotificationProviderProps>;
export {};
//# sourceMappingURL=NotificationContext.d.ts.map