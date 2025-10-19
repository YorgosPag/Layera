import type { LayeraUser } from '../types/auth.js';
/**
 * Props για UserDisplay component
 */
interface UserDisplayProps {
    /** Χρήστης προς εμφάνιση */
    user: LayeraUser;
    /** Εάν θα εμφανίζει το email */
    showEmail?: boolean;
    /** Εάν θα εμφανίζει τον ρόλο */
    showRole?: boolean;
    /** Εάν θα εμφανίζει την κατάσταση MFA */
    showMfaStatus?: boolean;
    /** Εάν θα εμφανίζει την κατάσταση email verification */
    showEmailVerification?: boolean;
    /** Custom className */
    className?: string;
    /** Format του ρόλου */
    roleFormat?: 'badge' | 'text' | 'icon';
    /** Size του component */
    size?: 'small' | 'medium' | 'large';
}
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
export declare function UserDisplay({ user, showEmail, showRole, showMfaStatus, showEmailVerification, className, roleFormat, size }: UserDisplayProps): import("react/jsx-runtime.js").JSX.Element;
/**
 * Compact version του UserDisplay για χρήση σε headers/navigation
 */
export declare function UserAvatar({ user, size, onClick }: {
    user: LayeraUser;
    size?: 'small' | 'medium' | 'large';
    onClick?: () => void;
}): import("react/jsx-runtime.js").JSX.Element;
export {};
//# sourceMappingURL=UserDisplay.d.ts.map