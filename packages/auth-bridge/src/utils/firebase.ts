import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import type { AuthConfig } from '../types/auth.js';

/**
 * Καθολική αναφορά στο Firebase app
 */
let firebaseApp: FirebaseApp | null = null;
let firebaseAuth: Auth | null = null;

/**
 * Αρχικοποιεί το Firebase app με τις παρεχόμενες παραμέτρους
 *
 * @param config - Παράμετροι Firebase
 * @returns Αρχικοποιημένο Firebase app
 *
 * @example
 * ```typescript
 * const app = initializeFirebaseApp({
 *   projectId: 'my-project',
 *   apiKey: 'api-key',
 *   authDomain: 'my-project.firebaseapp.com'
 * });
 * ```
 */
export function initializeFirebaseApp(config: AuthConfig): FirebaseApp {
  // Έλεγχος αν υπάρχει ήδη αρχικοποιημένο app
  if (firebaseApp) {
    return firebaseApp;
  }

  // Έλεγχος αν υπάρχει ήδη default app
  const existingApps = getApps();
  if (existingApps.length > 0) {
    const existingApp = existingApps[0];
    if (existingApp) {
      firebaseApp = existingApp;
      firebaseAuth = getAuth(existingApp);
      return existingApp;
    }
  }

  const firebaseConfig = {
    projectId: config.projectId,
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    storageBucket: `${config.projectId}.appspot.com`,
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
  };

  firebaseApp = initializeApp(firebaseConfig);
  firebaseAuth = getAuth(firebaseApp);

  return firebaseApp;
}

/**
 * Επιστρέφει το αρχικοποιημένο Firebase Auth instance
 *
 * @returns Firebase Auth instance
 * @throws Error εάν το Firebase δεν έχει αρχικοποιηθεί
 */
export function getFirebaseAuth(): Auth {
  if (!firebaseAuth) {
    throw new Error('Firebase app not initialized. Call initializeFirebaseApp() first.');
  }
  return firebaseAuth;
}

/**
 * Επιστρέφει το αρχικοποιημένο Firebase app
 *
 * @returns Firebase app instance
 * @throws Error εάν το Firebase δεν έχει αρχικοποιηθεί
 */
export function getFirebaseApp(): FirebaseApp {
  if (!firebaseApp) {
    throw new Error('Firebase app not initialized. Call initializeFirebaseApp() first.');
  }
  return firebaseApp;
}