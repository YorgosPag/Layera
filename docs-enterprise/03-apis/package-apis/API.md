# 🔌 Layera ID - API Documentation

## 📋 Επισκόπηση API

Το Layera ID παρέχει ένα ολοκληρωμένο API για διαχείριση χρηστών, ρόλων και ασφάλειας μέσω Firebase Cloud Functions και client-side SDK.

## 🔐 Authentication APIs

### Firebase Authentication SDK

#### 1. User Registration
```javascript
// Εγγραφή νέου χρήστη
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

const signup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Αυτόματη αποστολή email verification
    await sendEmailVerification(userCredential.user);
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};
```

**Παράμετροι:**
- `email`: string - Valid email address
- `password`: string - Minimum 6 characters

**Response:**
- `User` object with uid, email, emailVerified properties
- Automatic email verification sent

#### 2. User Login
```javascript
// Σύνδεση χρήστη
import { signInWithEmailAndPassword } from 'firebase/auth';

const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};
```

**Παράμετροι:**
- `email`: string - Registered email
- `password`: string - User password

**Response:**
- `User` object με authentication token

#### 3. Get User Claims
```javascript
// Ανάκτηση custom claims (role, mfa)
import { getIdTokenResult } from 'firebase/auth';

const getUserClaims = async (user) => {
  try {
    const tokenResult = await getIdTokenResult(user, true);
    return {
      role: tokenResult.claims.role || 'private',
      mfa: tokenResult.claims.mfa === true
    };
  } catch (error) {
    throw new Error('Failed to get user claims');
  }
};
```

**Response:**
```typescript
{
  role: 'private' | 'broker' | 'builder' | 'admin',
  mfa: boolean
}
```

#### 4. Password Reset
```javascript
// Επαναφορά κωδικού πρόσβασης
import { sendPasswordResetEmail } from 'firebase/auth';

const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, message: 'Reset email sent' };
  } catch (error) {
    throw new Error(error.message);
  }
};
```

## 🔧 Cloud Functions APIs

### Base URL
```
https://europe-west1-[PROJECT-ID].cloudfunctions.net/
```

### 1. Set User Role
**Endpoint:** `setRole`
**Method:** HTTPS Callable Function
**Access:** Admin only

```javascript
import { httpsCallable } from 'firebase/functions';
import { functions } from './firebase';

const setRole = httpsCallable(functions, 'setRole');

// Ορισμός ρόλου χρήστη
const assignRole = async (userIdentifier, role) => {
  try {
    const result = await setRole({
      email: 'user@example.com',  // OR uid: 'user-uid'
      role: 'broker'              // 'private' | 'broker' | 'builder' | 'admin'
    });
    return result.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
```

**Request Body:**
```typescript
{
  email?: string,           // User email (alternative to uid)
  uid?: string,            // User UID (alternative to email)
  role: 'private' | 'broker' | 'builder' | 'admin'
}
```

**Response:**
```typescript
{
  uid: string,             // User UID
  role: string            // Assigned role
}
```

**Error Responses:**
- `permission-denied`: Μόνο admin users μπορούν να καλέσουν αυτή τη function
- `invalid-argument`: Λάθος παράμετροι (missing email/uid ή role)
- `not-found`: User δεν βρέθηκε

### 2. Refresh MFA Claim
**Endpoint:** `refreshMfaClaim`
**Method:** HTTPS Callable Function
**Access:** Admin only

```javascript
const refreshMfaClaim = httpsCallable(functions, 'refreshMfaClaim');

// Ανανέωση MFA claim για χρήστη
const updateMfaStatus = async (userIdentifier) => {
  try {
    const result = await refreshMfaClaim({
      email: 'user@example.com'  // OR uid: 'user-uid'
    });
    return result.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
```

**Request Body:**
```typescript
{
  email?: string,          // User email
  uid?: string            // User UID
}
```

**Response:**
```typescript
{
  uid: string,            // User UID
  mfaEnabled: boolean,    // Current MFA status
  enrolledFactors: number // Number of enrolled MFA factors
}
```

### 3. List Users (Admin)
**Endpoint:** `listUsers`
**Method:** HTTPS Callable Function
**Access:** Admin only

```javascript
const listUsers = httpsCallable(functions, 'listUsers');

// Λίστα όλων των χρηστών
const getAllUsers = async (options = {}) => {
  try {
    const result = await listUsers({
      maxResults: options.limit || 100,
      pageToken: options.nextPageToken || null
    });
    return result.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
```

**Request Body:**
```typescript
{
  maxResults?: number,     // Default: 100, Max: 1000
  pageToken?: string      // For pagination
}
```

**Response:**
```typescript
{
  users: Array<{
    uid: string,
    email: string,
    emailVerified: boolean,
    displayName?: string,
    disabled: boolean,
    customClaims?: {
      role: string,
      mfa: boolean
    },
    metadata: {
      creationTime: string,
      lastSignInTime: string
    }
  }>,
  pageToken?: string      // For next page
}
```

## 🔒 Multi-Factor Authentication APIs

### 1. MFA Enrollment
```javascript
import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  multiFactor
} from 'firebase/auth';

// Εγγραφή σε MFA με τηλέφωνο
const enrollMFA = async (user, phoneNumber) => {
  try {
    // 1. Setup reCAPTCHA
    const recaptcha = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'normal',
      callback: () => console.log('reCAPTCHA solved')
    });

    // 2. Get MFA session
    const session = await multiFactor(user).getSession();

    // 3. Send SMS verification
    const provider = new PhoneAuthProvider(auth);
    const verificationId = await provider.verifyPhoneNumber({
      phoneNumber: phoneNumber,
      session: session
    }, recaptcha);

    return verificationId;
  } catch (error) {
    throw new Error('MFA enrollment failed: ' + error.message);
  }
};

// Επιβεβαίωση MFA enrollment
const confirmMFAEnrollment = async (user, verificationId, verificationCode) => {
  try {
    const cred = PhoneAuthProvider.credential(verificationId, verificationCode);
    const multiFactorAssertion = PhoneAuthProvider.assertionForEnrollment(cred);

    await multiFactor(user).enroll(multiFactorAssertion, 'Primary Phone');
    return { success: true };
  } catch (error) {
    throw new Error('MFA confirmation failed: ' + error.message);
  }
};
```

### 2. MFA Challenge Resolution
```javascript
// Επίλυση MFA challenge κατά το login
const resolveMFAChallenge = async (resolver, verificationCode) => {
  try {
    const cred = PhoneAuthProvider.credential(
      resolver.hints[0].uid,
      verificationCode
    );
    const multiFactorAssertion = PhoneAuthProvider.assertionForSignIn(cred);

    const userCredential = await resolver.resolveSignIn(multiFactorAssertion);
    return userCredential.user;
  } catch (error) {
    throw new Error('MFA resolution failed: ' + error.message);
  }
};
```

## 📊 Firestore APIs

### Security Rules Overview
```javascript
// Τα Firestore Security Rules επιτρέπουν πρόσβαση βάσει:
// 1. Email verification (υποχρεωτικό)
// 2. User role
// 3. MFA status για privileged operations
```

### 1. User Document Access
```javascript
// Πρόσβαση στο user document
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

// Read user profile
const getUserProfile = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    throw new Error('User not found');
  } catch (error) {
    throw new Error('Failed to get user profile');
  }
};

// Update user profile
const updateUserProfile = async (uid, profileData) => {
  try {
    await updateDoc(doc(db, 'users', uid), {
      ...profileData,
      updatedAt: new Date()
    });
    return { success: true };
  } catch (error) {
    throw new Error('Failed to update profile');
  }
};
```

**User Document Schema:**
```typescript
{
  email: string,
  displayName: string,
  role: 'private' | 'broker' | 'builder' | 'admin',
  mfaEnabled: boolean,
  emailVerified: boolean,
  createdAt: Timestamp,
  updatedAt: Timestamp,
  profile: {
    firstName?: string,
    lastName?: string,
    phone?: string,
    company?: string
  }
}
```

### 2. Projects Collection Access
```javascript
// Πρόσβαση σε projects (απαιτεί MFA για broker/builder/admin)
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

// List user projects
const getUserProjects = async (userId) => {
  try {
    const q = query(
      collection(db, 'projects'),
      where('ownerId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    throw new Error('Failed to get projects');
  }
};

// Create new project (απαιτεί MFA)
const createProject = async (projectData) => {
  try {
    const docRef = await addDoc(collection(db, 'projects'), {
      ...projectData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return { id: docRef.id, ...projectData };
  } catch (error) {
    throw new Error('Failed to create project');
  }
};
```

## 📈 Rate Limiting & Quotas

### Cloud Functions Limits
- **setRole**: 100 calls/minute per user
- **refreshMfaClaim**: 50 calls/minute per user
- **listUsers**: 10 calls/minute per admin user

### Firebase Auth Limits
- **Email Verification**: 5 emails/hour per user
- **Password Reset**: 5 emails/hour per user
- **MFA SMS**: 10 SMS/hour per phone number

### Firestore Limits
- **Read Operations**: 50,000/day (free tier)
- **Write Operations**: 20,000/day (free tier)
- **Document Size**: Max 1MB per document

## 🚨 Error Handling

### Common Error Codes
```typescript
// Authentication Errors
'auth/user-not-found'         // User δεν υπάρχει
'auth/wrong-password'         // Λάθος κωδικός
'auth/email-already-in-use'   // Email ήδη εγγεγραμμένο
'auth/weak-password'          // Αδύναμος κωδικός
'auth/invalid-email'          // Μη έγκυρο email
'auth/user-disabled'          // Χρήστης απενεργοποιημένος
'auth/too-many-requests'      // Πολλές αιτήσεις

// Custom Function Errors
'permission-denied'           // Ανεπαρκή δικαιώματα
'invalid-argument'           // Λάθος παράμετροι
'not-found'                  // Πόρος δεν βρέθηκε
'already-exists'             // Πόρος ήδη υπάρχει
'resource-exhausted'         // Όριο αιτήσεων ξεπεράστηκε

// Firestore Errors
'permission-denied'          // Security rules violation
'unavailable'               // Προσωρινό πρόβλημα
'deadline-exceeded'         // Timeout
```

### Error Response Format
```typescript
{
  code: string,              // Error code
  message: string,           // Error description
  details?: any             // Additional error details
}
```

## 🔧 SDK Configuration

### Firebase Configuration
```javascript
// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app, 'europe-west1');

// Development emulators
if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectFunctionsEmulator(functions, 'localhost', 5001);
}
```

---

**Τελευταία ενημέρωση**: 17/10/2025
**Έκδοση**: 1.0
**Συντηρητής**: Layera Development Team