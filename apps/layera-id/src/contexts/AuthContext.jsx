import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  updateEmail,
  updatePassword
} from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
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