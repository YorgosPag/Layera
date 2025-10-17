import React, { type ReactNode } from 'react';
import { useAuthContext } from './AuthProvider.js';
import { useRoleGuard } from '../hooks/useRoleGuard.js';
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
 * Default fallback components
 */
const DefaultFallbacks = {
  SignInRequired: () => (
    <div className="auth-guard-fallback">
      <h3>Σύνδεση Απαιτείται</h3>
      <p>Χρειάζεται να συνδεθείτε για να δείτε αυτό το περιεχόμενο.</p>
    </div>
  ),
  AccessDenied: () => (
    <div className="auth-guard-fallback">
      <h3>Δεν Έχετε Δικαίωμα Πρόσβασης</h3>
      <p>Δεν έχετε τα απαραίτητα δικαιώματα για να δείτε αυτό το περιεχόμενο.</p>
    </div>
  ),
  EmailVerificationRequired: () => (
    <div className="auth-guard-fallback">
      <h3>Επαλήθευση Email Απαιτείται</h3>
      <p>Παρακαλώ επαληθεύστε το email σας για να συνεχίσετε.</p>
    </div>
  ),
  MfaRequired: () => (
    <div className="auth-guard-fallback">
      <h3>Δεύτερος Παράγοντας Απαιτείται</h3>
      <p>Παρακαλώ ολοκληρώστε την επαλήθευση MFA για να συνεχίσετε.</p>
    </div>
  ),
  Loading: () => (
    <div className="auth-guard-loading">
      <p>Φόρτωση...</p>
    </div>
  )
};

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
export function RoleGuard({
  requiredRole,
  allowedRoles,
  children,
  fallback,
  accessDenied,
  emailVerificationRequired,
  mfaRequired,
  showLoadingFallback = true
}: RoleGuardProps) {
  const { user, loading, initialized } = useAuthContext();

  // Καθορισμός του ρόλου που απαιτείται
  const roleToCheck = requiredRole || (allowedRoles ? allowedRoles[0] : undefined);
  const guardResult = useRoleGuard(user, roleToCheck);

  // Έλεγχος πολλαπλών ρόλων εάν έχουν οριστεί
  const hasAnyAllowedRole = allowedRoles
    ? allowedRoles.some(role => useRoleGuard(user, role).hasAccess)
    : guardResult.hasAccess;

  // Loading state
  if (!initialized || loading) {
    if (showLoadingFallback) {
      return <DefaultFallbacks.Loading />;
    }
    return null;
  }

  // Δεν έχει συνδεθεί
  if (!user) {
    return <>{fallback || <DefaultFallbacks.SignInRequired />}</>;
  }

  // Χρειάζεται email verification
  if (guardResult.needsEmailVerification) {
    return <>{emailVerificationRequired || <DefaultFallbacks.EmailVerificationRequired />}</>;
  }

  // Χρειάζεται MFA
  if (guardResult.needsMfa) {
    return <>{mfaRequired || <DefaultFallbacks.MfaRequired />}</>;
  }

  // Δεν έχει τα κατάλληλα δικαιώματα
  if (!hasAnyAllowedRole) {
    return <>{accessDenied || <DefaultFallbacks.AccessDenied />}</>;
  }

  // Έχει πρόσβαση
  return <>{children}</>;
}

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
export function withRoleGuard<P extends object>(
  Component: React.ComponentType<P>,
  guardProps: Omit<RoleGuardProps, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <RoleGuard {...guardProps}>
      <Component {...props} />
    </RoleGuard>
  );

  WrappedComponent.displayName = `withRoleGuard(${Component.displayName || Component.name})`;

  return WrappedComponent;
}