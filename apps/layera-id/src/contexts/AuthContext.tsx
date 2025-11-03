/**
 * @fileoverview Authentication Context Provider
 *
 * Provides global authentication state management για το Layera ID system.
 * Implements RBAC με custom claims και MFA support.
 *
 * @see {@link ../../../../docs/ARCHITECTURE.md#authcontext-provider} - Architecture Documentation
 * @see {@link ../../../../docs/API.md#authentication-apis} - API Documentation
 * @see {@link ../../../../docs/SECURITY.md#authentication-security} - Security Guidelines
 *
 * @author Layera Development Team
 * @version 1.0
 */

import { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  updateEmail,
  updatePassword,
  getIdTokenResult
} from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

/**
 * Authentication Provider Component
 *
 * Provides authentication context to all child components.
 * Manages user state, custom claims, και MFA status.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Provider component
 *
 * @see {@link ../../../../docs/SECURITY.md#rbac} - Role-based access control
 */
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [claims, setClaims] = useState({ role: 'private', mfa: false });

  // Εγγραφή νέου χρήστη
  const signup = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Σύνδεση χρήστη
  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Αποσύνδεση
  const logout = async () => {
    return signOut(auth);
  };

  // Επαναφορά κωδικού
  const resetPassword = async (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Ενημέρωση προφίλ
  const updateUserProfile = async (displayName, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: displayName,
      photoURL: photoURL
    });
  };

  // Ενημέρωση email
  const updateUserEmail = async (email) => {
    return updateEmail(auth.currentUser, email);
  };

  // Ενημέρωση κωδικού
  const updateUserPassword = async (password) => {
    return updatePassword(auth.currentUser, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setCurrentUser(null);
        setClaims({ role: 'private', mfa: false });
        setLoading(false);
        return;
      }

      try {
        const token = await getIdTokenResult(user, true);
        setCurrentUser(user);
        setClaims({
          role: token.claims.role || 'private',
          mfa: token.claims.mfa === true,
        });
      } catch (error) {
        console.error('Error getting token claims:', error);
        setCurrentUser(user);
        setClaims({ role: 'private', mfa: false });
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    claims,
    loading,
    signup,
    login,
    logout,
    resetPassword,
    updateUserProfile,
    updateUserEmail,
    updateUserPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};