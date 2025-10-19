import React, { type ReactNode } from 'react';
import type { AuthState, AuthCallbacks, SignInParams, SignUpParams, AuthResult, LayeraUser } from '../types/auth.js';
/**
 * Authentication context interface
 */
interface AuthContextValue extends AuthState {
    signIn: (params: SignInParams) => Promise<AuthResult<LayeraUser>>;
    signUp: (params: SignUpParams) => Promise<AuthResult<LayeraUser>>;
    signOut: () => Promise<AuthResult>;
    sendVerificationEmail: () => Promise<AuthResult>;
    refreshUser: () => Promise<AuthResult<LayeraUser>>;
}
/**
 * Props για AuthProvider
 */
interface AuthProviderProps {
    /** Child components */
    children: ReactNode;
    /** Authentication callbacks */
    callbacks?: AuthCallbacks;
    /** Loading component */
    LoadingComponent?: React.ComponentType;
    /** Error component */
    ErrorComponent?: React.ComponentType<{
        error: string;
        retry: () => void;
    }>;
}
/**
 * Provider component για authentication context
 *
 * @example
 * ```typescript
 * function App() {
 *   return (
 *     <AuthProvider
 *       callbacks={{
 *         onSignIn: (user) => console.log('Welcome', user.email),
 *         onSignOut: () => console.log('Goodbye')
 *       }}
 *       LoadingComponent={Spinner}
 *     >
 *       <MyApp />
 *     </AuthProvider>
 *   );
 * }
 * ```
 */
export declare function AuthProvider({ children, callbacks, LoadingComponent, ErrorComponent }: AuthProviderProps): import("react/jsx-runtime.js").JSX.Element;
/**
 * Hook για χρήση του authentication context
 *
 * @returns Authentication context value
 * @throws Error εάν χρησιμοποιηθεί εκτός AuthProvider
 *
 * @example
 * ```typescript
 * function LoginButton() {
 *   const { signIn, loading } = useAuthContext();
 *
 *   const handleLogin = async () => {
 *     const result = await signIn({
 *       email: 'user@example.com',
 *       password: 'password'
 *     });
 *
 *     if (result.success) {
 *       console.log('Logged in successfully');
 *     }
 *   };
 *
 *   return (
 *     <button onClick={handleLogin} disabled={loading}>
 *       {loading ? 'Signing in...' : 'Sign In'}
 *     </button>
 *   );
 * }
 * ```
 */
export declare function useAuthContext(): AuthContextValue;
export {};
//# sourceMappingURL=AuthProvider.d.ts.map