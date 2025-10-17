import React from 'react';
import type { LayeraUser } from '../types/auth.js';
export interface GoogleSignInButtonProps {
    /** Text που εμφανίζεται στο button */
    children?: React.ReactNode;
    /** CSS class για styling */
    className?: string;
    /** Style object */
    style?: React.CSSProperties;
    /** Callback όταν η σύνδεση είναι επιτυχής */
    onSuccess?: (user: LayeraUser) => void;
    /** Callback όταν η σύνδεση αποτυγχάνει */
    onError?: (error: string) => void;
    /** Εάν το button είναι disabled */
    disabled?: boolean;
}
/**
 * Button component για Google Sign-In
 *
 * @example
 * ```tsx
 * <GoogleSignInButton
 *   onSuccess={(user) => navigate('/dashboard')}
 *   onError={(error) => setError(error)}
 * >
 *   Σύνδεση με Google
 * </GoogleSignInButton>
 * ```
 */
export declare function GoogleSignInButton({ children, className, style, onSuccess, onError, disabled: externalDisabled }: GoogleSignInButtonProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=GoogleSignInButton.d.ts.map