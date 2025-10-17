import { useState, useEffect, useCallback } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendEmailVerification, onAuthStateChanged } from 'firebase/auth';
import { getFirebaseAuth } from '../utils/firebase.js';
import { createLayeraUser } from '../utils/claims.js';
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
export function useAuth(callbacks) {
    const [state, setState] = useState({
        user: null,
        loading: true,
        error: null,
        isAuthenticated: false,
        initialized: false
    });
    /**
     * Ενημερώνει το authentication state
     */
    const updateState = useCallback((updates) => {
        setState(prev => ({ ...prev, ...updates }));
    }, []);
    /**
     * Διαχειρίζεται αλλαγές στην κατάσταση authentication
     */
    const handleAuthStateChange = useCallback(async (firebaseUser) => {
        try {
            if (firebaseUser) {
                const layeraUser = await createLayeraUser(firebaseUser);
                updateState({
                    user: layeraUser,
                    loading: false,
                    error: null,
                    isAuthenticated: true,
                    initialized: true
                });
                callbacks?.onSignIn?.(layeraUser);
            }
            else {
                updateState({
                    user: null,
                    loading: false,
                    error: null,
                    isAuthenticated: false,
                    initialized: true
                });
                callbacks?.onSignOut?.();
            }
        }
        catch (error) {
            updateState({
                user: null,
                loading: false,
                error: error instanceof Error ? error.message : 'Unknown authentication error',
                isAuthenticated: false,
                initialized: true
            });
        }
    }, [updateState, callbacks]);
    /**
     * Συνδέει χρήστη με email/password
     */
    const signIn = useCallback(async (params) => {
        try {
            updateState({ loading: true, error: null });
            const auth = getFirebaseAuth();
            const userCredential = await signInWithEmailAndPassword(auth, params.email, params.password);
            const layeraUser = await createLayeraUser(userCredential.user);
            return {
                success: true,
                data: layeraUser
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Sign in failed';
            updateState({ loading: false, error: errorMessage });
            return {
                success: false,
                error: errorMessage
            };
        }
    }, [updateState]);
    /**
     * Δημιουργεί νέο λογαριασμό
     */
    const signUp = useCallback(async (params) => {
        try {
            updateState({ loading: true, error: null });
            const auth = getFirebaseAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, params.email, params.password);
            await sendEmailVerification(userCredential.user);
            const layeraUser = await createLayeraUser(userCredential.user);
            return {
                success: true,
                data: layeraUser
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Sign up failed';
            updateState({ loading: false, error: errorMessage });
            return {
                success: false,
                error: errorMessage
            };
        }
    }, [updateState]);
    /**
     * Αποσυνδέει τον χρήστη
     */
    const signOutUser = useCallback(async () => {
        try {
            updateState({ loading: true, error: null });
            const auth = getFirebaseAuth();
            await signOut(auth);
            return { success: true };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Sign out failed';
            updateState({ loading: false, error: errorMessage });
            return {
                success: false,
                error: errorMessage
            };
        }
    }, [updateState]);
    /**
     * Στέλνει νέο email επαλήθευσης
     */
    const sendVerificationEmail = useCallback(async () => {
        try {
            if (!state.user) {
                return {
                    success: false,
                    error: 'No user is currently signed in'
                };
            }
            await sendEmailVerification(state.user);
            return { success: true };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to send verification email';
            return {
                success: false,
                error: errorMessage
            };
        }
    }, [state.user]);
    /**
     * Επαναφορτώνει τα user claims
     */
    const refreshUser = useCallback(async () => {
        try {
            if (!state.user) {
                return {
                    success: false,
                    error: 'No user is currently signed in'
                };
            }
            await state.user.reload();
            const refreshedUser = await createLayeraUser(state.user);
            updateState({ user: refreshedUser });
            return {
                success: true,
                data: refreshedUser
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to refresh user';
            return {
                success: false,
                error: errorMessage
            };
        }
    }, [state.user, updateState]);
    /**
     * Εγκαθιστά listener για αλλαγές authentication state
     */
    useEffect(() => {
        try {
            const auth = getFirebaseAuth();
            const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);
            return () => unsubscribe();
        }
        catch (error) {
            updateState({
                loading: false,
                error: error instanceof Error ? error.message : 'Failed to initialize authentication',
                initialized: true
            });
        }
    }, [handleAuthStateChange, updateState]);
    return {
        ...state,
        signIn,
        signUp,
        signOut: signOutUser,
        sendVerificationEmail,
        refreshUser
    };
}
