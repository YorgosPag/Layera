/**
 * @layera/database-core - Factory Utilities
 *
 * Factory functions για εύκολη δημιουργία database instances
 */

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore, connectFirestoreEmulator } from 'firebase/firestore';
import { DatabaseNamespace } from '../namespaces/namespace';

/**
 * Firebase configuration interface
 */
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

/**
 * Initialize Firestore με proper configuration
 */
export function initializeFirestore(config?: FirebaseConfig): Firestore {
  let app: FirebaseApp;

  // Use existing app if available
  const existingApps = getApps();
  if (existingApps.length > 0) {
    app = existingApps[0]!;
  } else {
    // Create new app
    const firebaseConfig = config || getDefaultConfig();
    app = initializeApp(firebaseConfig);
  }

  const firestore = getFirestore(app);

  // Connect to emulator in development
  if (process.env.NODE_ENV === 'development' && !isEmulatorConnected(firestore)) {
    try {
      connectFirestoreEmulator(firestore, 'localhost', 8080);
    } catch (error) {
      // Emulator might not be running - that's ok
    }
  }

  return firestore;
}

/**
 * Create database namespace για LEGO
 */
export function createDatabaseNamespace(
  legoName: string,
  firestore?: Firestore
): DatabaseNamespace {
  const db = firestore || initializeFirestore();
  return new DatabaseNamespace(legoName, db);
}

/**
 * Get default Firebase configuration από environment
 */
function getDefaultConfig(): FirebaseConfig {
  const config = {
    apiKey: process.env.FIREBASE_API_KEY || process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID || process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID || process.env.REACT_APP_FIREBASE_APP_ID
  };

  // Validate required fields
  const requiredFields = ['projectId', 'apiKey', 'authDomain'] as const;
  const missingFields = requiredFields.filter(field => !config[field]);

  if (missingFields.length > 0) {
    throw new Error(`Missing Firebase configuration: ${missingFields.join(', ')}`);
  }

  return config as FirebaseConfig;
}

/**
 * Check if Firestore emulator is already connected
 */
function isEmulatorConnected(firestore: Firestore): boolean {
  // This is a workaround - Firestore doesn't expose emulator connection status
  // We check if _delegate._settings contains emulator config
  try {
    const settings = (firestore as unknown as { _delegate?: { _settings?: { host?: string } } })._delegate?._settings;
    return settings?.host?.includes('localhost') || false;
  } catch {
    return false;
  }
}