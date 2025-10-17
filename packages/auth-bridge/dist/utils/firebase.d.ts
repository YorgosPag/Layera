import { type FirebaseApp } from 'firebase/app';
import { type Auth } from 'firebase/auth';
import type { AuthConfig } from '../types/auth.js';
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
export declare function initializeFirebaseApp(config: AuthConfig): FirebaseApp;
/**
 * Επιστρέφει το αρχικοποιημένο Firebase Auth instance
 *
 * @returns Firebase Auth instance
 * @throws Error εάν το Firebase δεν έχει αρχικοποιηθεί
 */
export declare function getFirebaseAuth(): Auth;
/**
 * Επιστρέφει το αρχικοποιημένο Firebase app
 *
 * @returns Firebase app instance
 * @throws Error εάν το Firebase δεν έχει αρχικοποιηθεί
 */
export declare function getFirebaseApp(): FirebaseApp;
//# sourceMappingURL=firebase.d.ts.map