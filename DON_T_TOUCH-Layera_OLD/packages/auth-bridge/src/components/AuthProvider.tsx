import React, { createContext, useContext, type ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth.js';
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
 * Authentication context
 */
const AuthContext = createContext<AuthContextValue | null>(null);

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
  ErrorComponent?: React.ComponentType<{ error: string; retry: () => void }>;
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
export function AuthProvider({
  children,
  callbacks,
  LoadingComponent,
  ErrorComponent
}: AuthProviderProps) {
  const auth = useAuth(callbacks);

  // Εμφάνιση loading component αν δεν έχει αρχικοποιηθεί
  if (!auth.initialized && LoadingComponent) {
    return <LoadingComponent />;
  }

  // Εμφάνιση error component εάν υπάρχει σφάλμα
  if (auth.error && ErrorComponent) {
    return (
      <ErrorComponent
        error={auth.error}
        retry={() => window.location.reload()}
      />
    );
  }

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

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
export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return context;
}