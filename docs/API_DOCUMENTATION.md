# Layera API Documentation

## Περιεχόμενα

- [Auth Bridge Package](#auth-bridge-package)
- [Authentication Hooks](#authentication-hooks)
- [Role Management](#role-management)
- [MFA System](#mfa-system)
- [Cloud Functions](#cloud-functions)
- [Environment Configuration](#environment-configuration)

## Auth Bridge Package

Το `@layera/auth-bridge` είναι ένα enterprise-grade authentication package που παρέχει:

### Βασικές Λειτουργίες

```typescript
import { AuthProvider, useAuthContext, RoleGuard } from '@layera/auth-bridge'

// Provider Configuration
<AuthProvider config={{
  projectId: 'your-project-id',
  apiKey: 'your-api-key',
  authDomain: 'your-domain.firebaseapp.com',
  storageBucket: 'your-bucket.appspot.com',
  messagingSenderId: 'your-sender-id',
  appId: 'your-app-id'
}}>
  <App />
</AuthProvider>
```

### useAuthContext Hook

```typescript
const {
  user,           // LayeraUser | null
  loading,        // boolean
  error,          // string | null
  signIn,         // (email: string, password: string) => Promise<AuthResult>
  signUp,         // (email: string, password: string) => Promise<AuthResult>
  signInWithGoogle, // () => Promise<AuthResult>
  signOut,        // () => Promise<void>
  sendEmailVerification, // () => Promise<AuthResult>
  enrollMfa,      // (totpSecret: string, verificationCode: string) => Promise<AuthResult>
  verifyMfa       // (verificationCode: string) => Promise<AuthResult>
} = useAuthContext()
```

### LayeraUser Interface

```typescript
interface LayeraUser {
  uid: string
  email: string | null
  emailVerified: boolean
  layeraClaims: LayeraCustomClaims | null
  mfaEnabled: boolean
  createdAt: string
  lastSignIn: string
}

interface LayeraCustomClaims {
  role: 'private' | 'broker' | 'builder' | 'admin'
  email_verified: boolean
  mfa_verified: boolean
  created_at: number
  last_verified: number
}
```

## Authentication Hooks

### Βασική Χρήση

```typescript
// Sign In
const handleSignIn = async () => {
  const result = await signIn(email, password)
  if (result.success) {
    console.log('Επιτυχής σύνδεση:', result.data)
  } else {
    console.error('Σφάλμα:', result.error)
  }
}

// Google Sign In
const handleGoogleSignIn = async () => {
  const result = await signInWithGoogle()
  if (result.success) {
    console.log('Google σύνδεση επιτυχής:', result.data)
  }
}

// Sign Up
const handleSignUp = async () => {
  const result = await signUp(email, password)
  if (result.success) {
    // Automatic email verification sent
    console.log('Λογαριασμός δημιουργήθηκε:', result.data)
  }
}
```

### Error Handling

```typescript
// Τύποι σφαλμάτων
interface AuthResult<T = any> {
  success: boolean
  data?: T
  error?: string
}

// Συνηθισμένα σφάλματα
const errorMessages = {
  'auth/user-not-found': 'Ο χρήστης δεν βρέθηκε',
  'auth/wrong-password': 'Λάθος κωδικός',
  'auth/email-already-in-use': 'Το email χρησιμοποιείται ήδη',
  'auth/weak-password': 'Αδύναμος κωδικός',
  'auth/invalid-email': 'Μη έγκυρο email'
}
```

## Role Management

### RBAC System

Το Layera χρησιμοποιεί 4-επίπεδο Role-Based Access Control:

```typescript
// Ιεραρχία ρόλων (χαμηλότερος προς υψηλότερος)
type LayeraRole = 'private' | 'broker' | 'builder' | 'admin'

// Δικαιώματα ρόλων
const rolePermissions = {
  private: ['read:profile'],
  broker: ['read:profile', 'read:properties', 'create:listings'],
  builder: ['read:profile', 'read:properties', 'create:listings', 'manage:projects'],
  admin: ['*'] // Όλα τα δικαιώματα
}
```

### RoleGuard Component

```typescript
// Προστασία με συγκεκριμένο ρόλο
<RoleGuard
  requiredRole="admin"
  fallback={<Navigate to="/login" />}
  emailVerificationRequired={<Navigate to="/verify" />}
  mfaRequired={<Navigate to="/mfa-enroll" />}
>
  <AdminPanel />
</RoleGuard>

// Προστασία με λίστα επιτρεπτών ρόλων
<RoleGuard
  allowedRoles={['broker', 'builder', 'admin']}
  fallback={<Navigate to="/unauthorized" />}
>
  <ProfessionalFeatures />
</RoleGuard>
```

## MFA System

### TOTP-Based MFA

```typescript
// MFA Enrollment
const handleMfaEnroll = async (totpSecret: string, code: string) => {
  const result = await enrollMfa(totpSecret, code)
  if (result.success) {
    console.log('MFA ενεργοποιήθηκε επιτυχώς')
  }
}

// MFA Verification
const handleMfaVerify = async (code: string) => {
  const result = await verifyMfa(code)
  if (result.success) {
    console.log('MFA επαληθεύτηκε')
  }
}

// TOTP Secret Generation
import { generateTotpSecret } from '@layera/auth-bridge'

const secret = generateTotpSecret()
const qrCodeUrl = `otpauth://totp/Layera:${user.email}?secret=${secret}&issuer=Layera`
```

### MFA Enforcement

```typescript
// Αυτόματη επιβολή MFA για professional roles
const mfaRequiredRoles = ['broker', 'builder', 'admin']

const checkMfaRequirement = (user: LayeraUser) => {
  const role = user.layeraClaims?.role
  if (role && mfaRequiredRoles.includes(role)) {
    return !user.layeraClaims?.mfa_verified
  }
  return false
}
```

## Cloud Functions

### Admin Functions

```typescript
// Set Role Function
const setUserRole = async (targetUid: string, newRole: LayeraRole) => {
  const setRole = httpsCallable(functions, 'setRole')
  const result = await setRole({ targetUid, newRole })
  return result.data
}

// Refresh MFA Claim
const refreshMfaClaim = async () => {
  const refresh = httpsCallable(functions, 'refreshMfaClaim')
  const result = await refresh()
  return result.data
}
```

### Function Deployment

```bash
# Build και deploy
cd functions
npm run build
npm run deploy

# Deploy συγκεκριμένης function
firebase deploy --only functions:setRole
```

## Environment Configuration

### Required Variables

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id

# Support Configuration
VITE_SUPPORT_EMAIL=support@layera.gr
```

### Environment Setup

```bash
# 1. Copy example file
cp .env.example .env.local

# 2. Configure Firebase project
firebase projects:list
firebase use your-project-id

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
```

### Security Considerations

- Μη αποθηκεύεις ποτέ API keys στο version control
- Χρησιμοποίησε διαφορετικά projects για dev/prod
- Ενεργοποίησε Firebase App Check για production
- Περιόρισε τα API keys σε συγκεκριμένα domains

## Testing

### Unit Tests

```typescript
// Example test
import { render, screen } from '@testing-library/react'
import { AuthProvider } from '@layera/auth-bridge'
import { ProtectedRoute } from './ProtectedRoute'

test('redirects to login when user not authenticated', () => {
  render(
    <AuthProvider config={mockConfig}>
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    </AuthProvider>
  )

  expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
})
```

### E2E Testing

```bash
# Run all tests
npm run test

# Run with coverage
npm run test:coverage

# Run specific test
npm run test -- Login.test.tsx
```

---

*Τελευταία ενημέρωση: 17 Οκτωβρίου 2025*