import React, { type ReactNode } from 'react';
import type { UserRole } from '../types/auth.js';
/**
 * Props για RoleGuard component
 */
interface RoleGuardProps {
    /** Απαιτούμενος ρόλος για πρόσβαση */
    requiredRole?: UserRole;
    /** Επιτρεπόμενοι ρόλοι (εναλλακτικά του requiredRole) */
    allowedRoles?: UserRole[];
    /** Children που θα εμφανιστούν εάν έχει πρόσβαση */
    children: ReactNode;
    /** Component για εμφάνιση όταν δεν έχει συνδεθεί */
    fallback?: ReactNode;
    /** Component για εμφάνιση όταν δεν έχει δικαιώματα */
    accessDenied?: ReactNode;
    /** Component για εμφάνιση όταν χρειάζεται email verification */
    emailVerificationRequired?: ReactNode;
    /** Component για εμφάνιση όταν χρειάζεται MFA */
    mfaRequired?: ReactNode;
    /** Εάν θα εμφανίζει loading state */
    showLoadingFallback?: boolean;
}
/**
 * Guard component που ελέγχει δικαιώματα πρόσβασης βάσει ρόλου
 *
 * @example
 * ```typescript
 * // Πρόσβαση μόνο για admin
 * <RoleGuard requiredRole="admin">
 *   <AdminPanel />
 * </RoleGuard>
 *
 * // Πρόσβαση για πολλαπλούς ρόλους
 * <RoleGuard allowedRoles={['broker', 'builder', 'admin']}>
 *   <ProfessionalFeatures />
 * </RoleGuard>
 *
 * // Με custom fallback components
 * <RoleGuard
 *   requiredRole="admin"
 *   fallback={<CustomSignInPrompt />}
 *   accessDenied={<CustomAccessDenied />}
 * >
 *   <AdminSettings />
 * </RoleGuard>
 * ```
 */
export declare function RoleGuard({ requiredRole, allowedRoles, children, fallback, accessDenied, emailVerificationRequired, mfaRequired, showLoadingFallback }: RoleGuardProps): import("react/jsx-runtime").JSX.Element | null;
/**
 * HOC για wrap components με role guard
 *
 * @param Component - Component προς wrap
 * @param guardProps - Props για RoleGuard
 * @returns Wrapped component
 *
 * @example
 * ```typescript
 * const AdminOnlyComponent = withRoleGuard(MyComponent, {
 *   requiredRole: 'admin'
 * });
 * ```
 */
export declare function withRoleGuard<P extends object>(Component: React.ComponentType<P>, guardProps: Omit<RoleGuardProps, 'children'>): {
    (props: P): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export {};
//# sourceMappingURL=RoleGuard.d.ts.map