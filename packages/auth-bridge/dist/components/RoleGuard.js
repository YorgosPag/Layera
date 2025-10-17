import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useAuthContext } from './AuthProvider.js';
import { useRoleGuard } from '../hooks/useRoleGuard.js';
/**
 * Default fallback components
 */
const DefaultFallbacks = {
    SignInRequired: () => (_jsxs("div", { className: "auth-guard-fallback", children: [_jsx("h3", { children: "\u03A3\u03CD\u03BD\u03B4\u03B5\u03C3\u03B7 \u0391\u03C0\u03B1\u03B9\u03C4\u03B5\u03AF\u03C4\u03B1\u03B9" }), _jsx("p", { children: "\u03A7\u03C1\u03B5\u03B9\u03AC\u03B6\u03B5\u03C4\u03B1\u03B9 \u03BD\u03B1 \u03C3\u03C5\u03BD\u03B4\u03B5\u03B8\u03B5\u03AF\u03C4\u03B5 \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03B4\u03B5\u03AF\u03C4\u03B5 \u03B1\u03C5\u03C4\u03CC \u03C4\u03BF \u03C0\u03B5\u03C1\u03B9\u03B5\u03C7\u03CC\u03BC\u03B5\u03BD\u03BF." })] })),
    AccessDenied: () => (_jsxs("div", { className: "auth-guard-fallback", children: [_jsx("h3", { children: "\u0394\u03B5\u03BD \u0388\u03C7\u03B5\u03C4\u03B5 \u0394\u03B9\u03BA\u03B1\u03AF\u03C9\u03BC\u03B1 \u03A0\u03C1\u03CC\u03C3\u03B2\u03B1\u03C3\u03B7\u03C2" }), _jsx("p", { children: "\u0394\u03B5\u03BD \u03AD\u03C7\u03B5\u03C4\u03B5 \u03C4\u03B1 \u03B1\u03C0\u03B1\u03C1\u03B1\u03AF\u03C4\u03B7\u03C4\u03B1 \u03B4\u03B9\u03BA\u03B1\u03B9\u03CE\u03BC\u03B1\u03C4\u03B1 \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03B4\u03B5\u03AF\u03C4\u03B5 \u03B1\u03C5\u03C4\u03CC \u03C4\u03BF \u03C0\u03B5\u03C1\u03B9\u03B5\u03C7\u03CC\u03BC\u03B5\u03BD\u03BF." })] })),
    EmailVerificationRequired: () => (_jsxs("div", { className: "auth-guard-fallback", children: [_jsx("h3", { children: "\u0395\u03C0\u03B1\u03BB\u03AE\u03B8\u03B5\u03C5\u03C3\u03B7 Email \u0391\u03C0\u03B1\u03B9\u03C4\u03B5\u03AF\u03C4\u03B1\u03B9" }), _jsx("p", { children: "\u03A0\u03B1\u03C1\u03B1\u03BA\u03B1\u03BB\u03CE \u03B5\u03C0\u03B1\u03BB\u03B7\u03B8\u03B5\u03CD\u03C3\u03C4\u03B5 \u03C4\u03BF email \u03C3\u03B1\u03C2 \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03C3\u03C5\u03BD\u03B5\u03C7\u03AF\u03C3\u03B5\u03C4\u03B5." })] })),
    MfaRequired: () => (_jsxs("div", { className: "auth-guard-fallback", children: [_jsx("h3", { children: "\u0394\u03B5\u03CD\u03C4\u03B5\u03C1\u03BF\u03C2 \u03A0\u03B1\u03C1\u03AC\u03B3\u03BF\u03BD\u03C4\u03B1\u03C2 \u0391\u03C0\u03B1\u03B9\u03C4\u03B5\u03AF\u03C4\u03B1\u03B9" }), _jsx("p", { children: "\u03A0\u03B1\u03C1\u03B1\u03BA\u03B1\u03BB\u03CE \u03BF\u03BB\u03BF\u03BA\u03BB\u03B7\u03C1\u03CE\u03C3\u03C4\u03B5 \u03C4\u03B7\u03BD \u03B5\u03C0\u03B1\u03BB\u03AE\u03B8\u03B5\u03C5\u03C3\u03B7 MFA \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03C3\u03C5\u03BD\u03B5\u03C7\u03AF\u03C3\u03B5\u03C4\u03B5." })] })),
    Loading: () => (_jsx("div", { className: "auth-guard-loading", children: _jsx("p", { children: "\u03A6\u03CC\u03C1\u03C4\u03C9\u03C3\u03B7..." }) }))
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
export function RoleGuard({ requiredRole, allowedRoles, children, fallback, accessDenied, emailVerificationRequired, mfaRequired, showLoadingFallback = true }) {
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
            return _jsx(DefaultFallbacks.Loading, {});
        }
        return null;
    }
    // Δεν έχει συνδεθεί
    if (!user) {
        return _jsx(_Fragment, { children: fallback || _jsx(DefaultFallbacks.SignInRequired, {}) });
    }
    // Χρειάζεται email verification
    if (guardResult.needsEmailVerification) {
        return _jsx(_Fragment, { children: emailVerificationRequired || _jsx(DefaultFallbacks.EmailVerificationRequired, {}) });
    }
    // Χρειάζεται MFA
    if (guardResult.needsMfa) {
        return _jsx(_Fragment, { children: mfaRequired || _jsx(DefaultFallbacks.MfaRequired, {}) });
    }
    // Δεν έχει τα κατάλληλα δικαιώματα
    if (!hasAnyAllowedRole) {
        return _jsx(_Fragment, { children: accessDenied || _jsx(DefaultFallbacks.AccessDenied, {}) });
    }
    // Έχει πρόσβαση
    return _jsx(_Fragment, { children: children });
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
export function withRoleGuard(Component, guardProps) {
    const WrappedComponent = (props) => (_jsx(RoleGuard, { ...guardProps, children: _jsx(Component, { ...props }) }));
    WrappedComponent.displayName = `withRoleGuard(${Component.displayName || Component.name})`;
    return WrappedComponent;
}
