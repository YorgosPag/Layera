import { getFirebaseApp, getFirebaseAuth } from '@layera/auth-bridge';
import { getFirestore } from 'firebase/firestore';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

// Lazy initialization functions για να αποφύγουμε errors κατά τη φόρτωση
export const getApp = () => {
  try {
    return getFirebaseApp();
  } catch (error) {
    // Firebase app not available
    return null;
  }
};

export const getAuth = () => {
  try {
    return getFirebaseAuth();
  } catch (error) {
    // Firebase auth not available
    return null;
  }
};

export const getAuthCurrentUser = () => {
  try {
    const auth = getFirebaseAuth();
    return auth?.currentUser || null;
  } catch (error) {
    // Firebase auth current user not available
    return null;
  }
};

export const getDb = () => {
  try {
    const app = getApp();
    return app ? getFirestore(app) : null;
  } catch (error) {
    // Firebase firestore not available
    return null;
  }
};

// Legacy exports για backward compatibility (DEPRECATED - use functions above)
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

// Δεν αρχικοποιούμε κατά τη φόρτωση - περιμένουμε την εντολή από App.tsx
export { app, auth, db };