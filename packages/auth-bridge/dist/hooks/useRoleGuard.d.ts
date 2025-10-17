import type { LayeraUser, UserRole } from '../types/auth.js';
/**
 * Αποτέλεσμα role guard check
 */
export interface RoleGuardResult {
    /** Εάν ο χρήστης έχει πρόσβαση */
    readonly hasAccess: boolean;
    /** Εάν χρειάζεται MFA verification */
    readonly needsMfa: boolean;
    /** Εάν χρειάζεται email verification */
    readonly needsEmailVerification: boolean;
    /** Εάν είναι πλήρως authenticated */
    readonly isFullyAuthenticated: boolean;
    /** Λόγος άρνησης πρόσβασης */
    readonly denialReason?: 'no-user' | 'insufficient-role' | 'email-not-verified' | 'mfa-required';
}
/**
 * Hook για έλεγχο δικαιωμάτων πρόσβασης βάσει ρόλου
 *
 * @param user - Τρέχων χρήστης
 * @param requiredRole - Απαιτούμενος ρόλος για πρόσβαση
 * @returns Role guard αποτέλεσμα
 *
 * @example
 * ```typescript
 * const { hasAccess, needsMfa, denialReason } = useRoleGuard(user, 'admin');
 *
 * if (!hasAccess) {
 *   return <AccessDenied reason={denialReason} />;
 * }
 *
 * if (needsMfa) {
 *   return <MfaPrompt />;
 * }
 *
 * return <AdminPanel />;
 * ```
 */
export declare function useRoleGuard(user: LayeraUser | null, requiredRole?: UserRole): RoleGuardResult;
/**
 * Hook για έλεγχο εάν ο χρήστης έχει οποιονδήποτε από τους καθορισμένους ρόλους
 *
 * @param user - Τρέχων χρήστης
 * @param allowedRoles - Επιτρεπόμενοι ρόλοι
 * @returns Εάν έχει πρόσβαση
 */
export declare function useHasAnyRole(user: LayeraUser | null, allowedRoles: UserRole[]): boolean;
/**
 * Hook για έλεγχο εάν ο χρήστης έχει όλους τους καθορισμένους ρόλους
 *
 * @param user - Τρέχων χρήστης
 * @param requiredRoles - Απαιτούμενοι ρόλοι
 * @returns Εάν έχει όλους τους ρόλους
 */
export declare function useHasAllRoles(user: LayeraUser | null, requiredRoles: UserRole[]): boolean;
//# sourceMappingURL=useRoleGuard.d.ts.map