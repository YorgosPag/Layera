import type { AuthResult, SignInParams, SignUpParams, LayeraUser, AuthCallbacks } from '../types/auth.js';
/**
 * Hook για διαχείριση authentication state και λειτουργιών
 *
 * @param callbacks - Optional callbacks για authentication events
 * @returns Authentication state και λειτουργίες
 *
 * @example
 * ```typescript
 * const { user, signIn, signUp, signOut, loading } = useAuth({
 *   onSignIn: (user) => console.log('User signed in:', user.email),
 *   onSignOut: () => console.log('User signed out')
 * });
 * ```
 */
export declare function useAuth(callbacks?: AuthCallbacks): {
    signIn: (params: SignInParams) => Promise<AuthResult<LayeraUser>>;
    signUp: (params: SignUpParams) => Promise<AuthResult<LayeraUser>>;
    signInWithGoogle: () => Promise<AuthResult<LayeraUser>>;
    signOut: () => Promise<AuthResult>;
    sendVerificationEmail: () => Promise<AuthResult>;
    refreshUser: () => Promise<AuthResult<LayeraUser>>;
    user: LayeraUser | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    initialized: boolean;
};
//# sourceMappingURL=useAuth.d.ts.map