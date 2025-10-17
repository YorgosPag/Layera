import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from 'react';
import { useAuth } from '../hooks/useAuth.js';
/**
 * Authentication context
 */
const AuthContext = createContext(null);
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
export function AuthProvider({ children, callbacks, LoadingComponent, ErrorComponent }) {
    const auth = useAuth(callbacks);
    // Εμφάνιση loading component αν δεν έχει αρχικοποιηθεί
    if (!auth.initialized && LoadingComponent) {
        return _jsx(LoadingComponent, {});
    }
    // Εμφάνιση error component εάν υπάρχει σφάλμα
    if (auth.error && ErrorComponent) {
        return (_jsx(ErrorComponent, { error: auth.error, retry: () => window.location.reload() }));
    }
    return (_jsx(AuthContext.Provider, { value: auth, children: children }));
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
export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
}
