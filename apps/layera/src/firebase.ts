import { getFirebaseApp, getFirebaseAuth } from '@layera/auth-bridge';
import { getFirestore } from 'firebase/firestore';

// Χρησιμοποιούμε το Firebase instance από το auth-bridge για consistency
export const app = getFirebaseApp();
export const auth = getFirebaseAuth();
export const db = getFirestore(app);