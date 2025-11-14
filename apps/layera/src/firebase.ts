import { getFirebaseApp, getFirebaseAuth } from '@layera/auth-bridge';
import { getFirestore } from 'firebase/firestore';

// Lazy initialization functions για να αποφύγουμε errors κατά τη φόρτωση
export const getApp = () => {
  try {
    return getFirebaseApp();
  } catch (error) {
    console.warn('Firebase app not available:', error);
    return null;
  }
};

export const getAuth = () => {
  try {
    return getFirebaseAuth();
  } catch (error) {
    console.warn('Firebase auth not available:', error);
    return null;
  }
};

export const getDb = () => {
  try {
    const app = getApp();
    return app ? getFirestore(app) : null;
  } catch (error) {
    console.warn('Firebase firestore not available:', error);
    return null;
  }
};

// Legacy exports για backward compatibility (DEPRECATED - use functions above)
let app: any = null;
let auth: any = null;
let db: any = null;

try {
  app = getFirebaseApp();
  auth = getFirebaseAuth();
  db = getFirestore(app);
} catch (error) {
  console.warn('⚠️ Firebase initialization skipped (demo mode)');
}

export { app, auth, db };