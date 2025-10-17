import { useState, useEffect, useCallback } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  type User,
  type Unsubscribe
} from 'firebase/auth';
import { getFirebaseAuth } from '../utils/firebase.js';
import { createLayeraUser } from '../utils/claims.js';
import type {
  AuthState,
  AuthResult,
  SignInParams,
  SignUpParams,
  LayeraUser,
  AuthCallbacks
} from '../types/auth.js';

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
export function useAuth(callbacks?: AuthCallbacks) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
    isAuthenticated: false,
    initialized: false
  });

  /**
   * Ενημερώνει το authentication state
   */
  const updateState = useCallback((updates: Partial<AuthState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  /**
   * Διαχειρίζεται αλλαγές στην κατάσταση authentication
   */
  const handleAuthStateChange = useCallback(async (firebaseUser: User | null) => {
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
      } else {
        updateState({
          user: null,
          loading: false,
          error: null,
          isAuthenticated: false,
          initialized: true
        });

        callbacks?.onSignOut?.();
      }
    } catch (error) {
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
  const signIn = useCallback(async (params: SignInParams): Promise<AuthResult<LayeraUser>> => {
    try {
      updateState({ loading: true, error: null });

      const auth = getFirebaseAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        params.email,
        params.password
      );

      const layeraUser = await createLayeraUser(userCredential.user);

      return {
        success: true,
        data: layeraUser
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sign in failed';
      updateState({ loading: false, error: errorMessage });

      return {
        success: false,
        error: errorMessage
      };
    }
  }, [updateState]);

  /**
   * Συνδέει χρήστη με Google
   */
  const signInWithGoogle = useCallback(async (): Promise<AuthResult<LayeraUser>> => {
    try {
      updateState({ loading: true, error: null });

      const auth = getFirebaseAuth();
      const provider = new GoogleAuthProvider();

      // Request access to email and profile
      provider.addScope('email');
      provider.addScope('profile');

      const userCredential = await signInWithPopup(auth, provider);
      const layeraUser = await createLayeraUser(userCredential.user);

      return {
        success: true,
        data: layeraUser
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Google sign in failed';
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
  const signUp = useCallback(async (params: SignUpParams): Promise<AuthResult<LayeraUser>> => {
    try {
      updateState({ loading: true, error: null });

      const auth = getFirebaseAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        params.email,
        params.password
      );

      await sendEmailVerification(userCredential.user);

      const layeraUser = await createLayeraUser(userCredential.user);

      return {
        success: true,
        data: layeraUser
      };
    } catch (error) {
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
  const signOutUser = useCallback(async (): Promise<AuthResult> => {
    try {
      updateState({ loading: true, error: null });

      const auth = getFirebaseAuth();
      await signOut(auth);

      return { success: true };
    } catch (error) {
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
  const sendVerificationEmail = useCallback(async (): Promise<AuthResult> => {
    try {
      if (!state.user) {
        return {
          success: false,
          error: 'No user is currently signed in'
        };
      }

      await sendEmailVerification(state.user);

      return { success: true };
    } catch (error) {
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
  const refreshUser = useCallback(async (): Promise<AuthResult<LayeraUser>> => {
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
    } catch (error) {
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
      const unsubscribe: Unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);

      return () => unsubscribe();
    } catch (error) {
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
    signInWithGoogle,
    signOut: signOutUser,
    sendVerificationEmail,
    refreshUser
  };
}