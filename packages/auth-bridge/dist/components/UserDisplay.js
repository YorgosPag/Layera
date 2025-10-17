import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Mapping ρόλων σε εμφανίσιμα labels
 */
const ROLE_LABELS = {
    private: 'Ιδιώτης',
    broker: 'Μεσίτης',
    builder: 'Κατασκευαστής',
    admin: 'Διαχειριστής'
};
/**
 * Mapping ρόλων σε χρώματα
 */
const ROLE_COLORS = {
    private: 'bg-gray-100 text-gray-800',
    broker: 'bg-blue-100 text-blue-800',
    builder: 'bg-green-100 text-green-800',
    admin: 'bg-red-100 text-red-800'
};
/**
 * Component για εμφάνιση πληροφοριών χρήστη
 *
 * @example
 * ```typescript
 * // Βασική εμφάνιση
 * <UserDisplay user={currentUser} />
 *
 * // Με όλες τις πληροφορίες
 * <UserDisplay
 *   user={currentUser}
 *   showEmail
 *   showRole
 *   showMfaStatus
 *   showEmailVerification
 *   roleFormat="badge"
 *   size="large"
 * />
 *
 * // Compact εμφάνιση
 * <UserDisplay
 *   user={currentUser}
 *   showRole
 *   roleFormat="icon"
 *   size="small"
 * />
 * ```
 */
export function UserDisplay({ user, showEmail = false, showRole = true, showMfaStatus = false, showEmailVerification = false, className = '', roleFormat = 'badge', size = 'medium' }) {
    const sizeClasses = {
        small: 'text-sm space-y-1',
        medium: 'text-base space-y-2',
        large: 'text-lg space-y-3'
    };
    const badgeClasses = {
        small: 'px-2 py-1 text-xs',
        medium: 'px-3 py-1 text-sm',
        large: 'px-4 py-2 text-base'
    };
    /**
     * Renders ρόλο βάσει format
     */
    const renderRole = () => {
        const role = user.layeraClaims.role;
        const label = ROLE_LABELS[role];
        switch (roleFormat) {
            case 'badge':
                return (_jsx("span", { className: `inline-flex items-center rounded-full font-medium ${ROLE_COLORS[role]} ${badgeClasses[size]}`, children: label }));
            case 'text':
                return _jsx("span", { className: "font-medium", children: label });
            case 'icon':
                return (_jsx("span", { className: `inline-flex items-center justify-center w-6 h-6 rounded-full ${ROLE_COLORS[role]} text-xs font-bold`, title: label, children: label.charAt(0).toUpperCase() }));
            default:
                return null;
        }
    };
    /**
     * Renders status badge
     */
    const renderStatusBadge = (status, trueLabel, falseLabel, trueColor = 'bg-green-100 text-green-800', falseColor = 'bg-red-100 text-red-800') => (_jsx("span", { className: `inline-flex items-center rounded-full font-medium ${status ? trueColor : falseColor} ${badgeClasses[size]}`, children: status ? trueLabel : falseLabel }));
    return (_jsxs("div", { className: `user-display ${sizeClasses[size]} ${className}`, children: [_jsxs("div", { className: "flex items-center space-x-2", children: [user.displayName && (_jsx("span", { className: "font-semibold", children: user.displayName })), showEmail && (_jsx("span", { className: user.displayName ? 'text-gray-600' : 'font-semibold', children: user.email }))] }), showRole && (_jsxs("div", { className: "flex items-center", children: [_jsx("span", { className: "text-gray-600 mr-2", children: "\u03A1\u03CC\u03BB\u03BF\u03C2:" }), renderRole()] })), showEmailVerification && (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-gray-600", children: "Email:" }), renderStatusBadge(user.emailVerified, 'Επαληθευμένο', 'Μη επαληθευμένο')] })), showMfaStatus && (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-gray-600", children: "MFA:" }), user.mfaStatus.required ? (renderStatusBadge(user.mfaStatus.verified, 'Ενεργοποιημένο', 'Απαιτείται')) : (renderStatusBadge(user.mfaStatus.enabled, 'Ενεργοποιημένο', 'Προαιρετικό', 'bg-blue-100 text-blue-800', 'bg-gray-100 text-gray-800'))] }))] }));
}
/**
 * Compact version του UserDisplay για χρήση σε headers/navigation
 */
export function UserAvatar({ user, size = 'medium', onClick }) {
    const sizeClasses = {
        small: 'w-8 h-8 text-xs',
        medium: 'w-10 h-10 text-sm',
        large: 'w-12 h-12 text-base'
    };
    const initials = user.displayName
        ? user.displayName
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
        : user.email?.charAt(0).toUpperCase() || '?';
    const roleColor = ROLE_COLORS[user.layeraClaims.role];
    return (_jsx("button", { onClick: onClick, className: `inline-flex items-center justify-center rounded-full font-medium ${roleColor} ${sizeClasses[size]} hover:opacity-80 transition-opacity`, title: `${user.displayName || user.email} (${ROLE_LABELS[user.layeraClaims.role]})`, children: initials }));
}
