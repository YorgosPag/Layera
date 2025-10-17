import { useMemo } from 'react';
import { hasAccess, requiresMfaVerification, isFullyAuthenticated } from '../utils/claims.js';
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
export function useRoleGuard(
  user: LayeraUser | null,
  requiredRole?: UserRole
): RoleGuardResult {
  return useMemo(() => {
    // Έλεγχος εάν υπάρχει χρήστης
    if (!user) {
      return {
        hasAccess: false,
        needsMfa: false,
        needsEmailVerification: false,
        isFullyAuthenticated: false,
        denialReason: 'no-user'
      };
    }

    // Έλεγχος email verification
    if (!user.emailVerified) {
      return {
        hasAccess: false,
        needsMfa: false,
        needsEmailVerification: true,
        isFullyAuthenticated: false,
        denialReason: 'email-not-verified'
      };
    }

    // Έλεγχος ρόλου
    const roleAccess = hasAccess(user, requiredRole);
    if (!roleAccess) {
      return {
        hasAccess: false,
        needsMfa: false,
        needsEmailVerification: false,
        isFullyAuthenticated: false,
        denialReason: 'insufficient-role'
      };
    }

    // Έλεγχος MFA
    const mfaRequired = requiresMfaVerification(user);
    if (mfaRequired) {
      return {
        hasAccess: false,
        needsMfa: true,
        needsEmailVerification: false,
        isFullyAuthenticated: false,
        denialReason: 'mfa-required'
      };
    }

    // Όλοι οι έλεγχοι πέρασαν
    return {
      hasAccess: true,
      needsMfa: false,
      needsEmailVerification: false,
      isFullyAuthenticated: isFullyAuthenticated(user)
    };
  }, [user, requiredRole]);
}

/**
 * Hook για έλεγχο εάν ο χρήστης έχει οποιονδήποτε από τους καθορισμένους ρόλους
 *
 * @param user - Τρέχων χρήστης
 * @param allowedRoles - Επιτρεπόμενοι ρόλοι
 * @returns Εάν έχει πρόσβαση
 */
export function useHasAnyRole(
  user: LayeraUser | null,
  allowedRoles: UserRole[]
): boolean {
  return useMemo(() => {
    if (!user) return false;

    return allowedRoles.some(role => hasAccess(user, role));
  }, [user, allowedRoles]);
}

/**
 * Hook για έλεγχο εάν ο χρήστης έχει όλους τους καθορισμένους ρόλους
 *
 * @param user - Τρέχων χρήστης
 * @param requiredRoles - Απαιτούμενοι ρόλοι
 * @returns Εάν έχει όλους τους ρόλους
 */
export function useHasAllRoles(
  user: LayeraUser | null,
  requiredRoles: UserRole[]
): boolean {
  return useMemo(() => {
    if (!user) return false;

    return requiredRoles.every(role => hasAccess(user, role));
  }, [user, requiredRoles]);
}