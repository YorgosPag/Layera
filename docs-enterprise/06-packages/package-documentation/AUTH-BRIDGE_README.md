# @layera/auth-bridge

Επαναχρησιμοποιήσιμο authentication package για Layera applications με πλήρη RBAC + MFA υποστήριξη.

## Χαρακτηριστικά

- **Role-Based Access Control (RBAC)** με 4 ρόλους: private, broker, builder, admin
- **Multi-Factor Authentication (MFA)** με TOTP support (Google Authenticator, Authy)
- **Email Verification** υποχρεωτικό για όλους τους χρήστες
- **Firebase Integration** με custom claims
- **React Components** ready-to-use
- **TypeScript** πλήρως typed
- **Testing-friendly** με comprehensive mocks
- **Backup Codes** για recovery access
- **QR Code Generation** για εύκολο setup

## Εγκατάσταση

```bash
npm install @layera/auth-bridge
```

## Peer Dependencies

```bash
npm install react react-dom firebase
```

## Βασική Χρήση

### 1. Αρχικοποίηση

```typescript
import { initializeFirebaseApp } from '@layera/auth-bridge';

// Αρχικοποίηση Firebase
initializeFirebaseApp({
  projectId: 'your-project-id',
  apiKey: 'your-api-key',
  authDomain: 'your-project.firebaseapp.com'
});
```

### 2. Wrap την εφαρμογή με AuthProvider

```typescript
import { AuthProvider } from '@layera/auth-bridge';

function App() {
  return (
    <AuthProvider
      callbacks={{
        onSignIn: (user) => console.log('Welcome', user.email),
        onSignOut: () => console.log('Goodbye')
      }}
    >
      <MyApp />
    </AuthProvider>
  );
}
```

### 3. Χρήση Authentication

```typescript
import { useAuthContext } from '@layera/auth-bridge';

function LoginForm() {
  const { signIn, loading, error } = useAuthContext();

  const handleSubmit = async (email: string, password: string) => {
    const result = await signIn({ email, password });

    if (result.success) {
      console.log('Επιτυχής σύνδεση!');
    } else {
      console.error('Σφάλμα:', result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

### 4. Προστασία Routes με Role Guards

```typescript
import { RoleGuard } from '@layera/auth-bridge';

function AdminPanel() {
  return (
    <RoleGuard requiredRole="admin">
      <h1>Admin Panel</h1>
      {/* Admin-only content */}
    </RoleGuard>
  );
}

// Ή για πολλαπλούς ρόλους
function ProfessionalFeatures() {
  return (
    <RoleGuard allowedRoles={['broker', 'builder', 'admin']}>
      <h1>Professional Features</h1>
      {/* Professional content */}
    </RoleGuard>
  );
}
```

### 5. Εμφάνιση User Information

```typescript
import { UserDisplay, UserAvatar } from '@layera/auth-bridge';

function UserProfile() {
  const { user } = useAuthContext();

  if (!user) return null;

  return (
    <div>
      {/* Πλήρες user display */}
      <UserDisplay
        user={user}
        showEmail
        showRole
        showMfaStatus
        showEmailVerification
        size="large"
      />

      {/* Compact avatar */}
      <UserAvatar
        user={user}
        size="medium"
        onClick={() => console.log('Profile clicked')}
      />
    </div>
  );
}
```

### 6. TOTP Setup και Verification

```typescript
import { TotpSetup, TotpVerification, useTotp } from '@layera/auth-bridge';

function MfaSetupPage() {
  const { user } = useAuthContext();
  const { isEnabled } = useTotp(user);

  if (isEnabled) {
    return <div>TOTP ήδη ενεργοποιημένο</div>;
  }

  return (
    <TotpSetup
      config={{ appName: 'MyApp' }}
      onComplete={() => console.log('TOTP activated!')}
      onCancel={() => console.log('Setup cancelled')}
    />
  );
}

function LoginMfaStep() {
  const handleVerifyTotp = async (code: string) => {
    // Επαλήθευση TOTP code
    const result = await verifyTotpWithServer(code);
    if (result.success) {
      console.log('MFA verified!');
    }
  };

  const handleBackupCode = async (code: string) => {
    // Επαλήθευση backup code
    const result = await verifyBackupCodeWithServer(code);
    if (result.success) {
      console.log('Backup code verified!');
    }
  };

  return (
    <TotpVerification
      onVerify={handleVerifyTotp}
      onUseBackup={handleBackupCode}
    />
  );
}
```

## Hooks

### useAuth

Βασικό hook για authentication operations:

```typescript
const {
  user,           // LayeraUser | null
  loading,        // boolean
  error,          // string | null
  isAuthenticated,// boolean
  signIn,         // (params) => Promise<AuthResult>
  signUp,         // (params) => Promise<AuthResult>
  signOut,        // () => Promise<AuthResult>
  refreshUser     // () => Promise<AuthResult>
} = useAuth();
```

### useRoleGuard

Hook για έλεγχο δικαιωμάτων:

```typescript
const {
  hasAccess,                // boolean
  needsMfa,                 // boolean
  needsEmailVerification,   // boolean
  isFullyAuthenticated,     // boolean
  denialReason             // string | undefined
} = useRoleGuard(user, 'admin');
```

### useHasAnyRole / useHasAllRoles

```typescript
const canAccess = useHasAnyRole(user, ['broker', 'admin']);
const isFullAdmin = useHasAllRoles(user, ['admin']);
```

### useTotp

Hook για διαχείριση TOTP functionality:

```typescript
const {
  setupData,        // TotpSetupResult | null
  isEnabled,        // boolean
  loading,          // boolean
  error,           // string | null
  startSetup,      // () => Promise<AuthResult<TotpSetupResult>>
  verifySetup,     // (code: string) => Promise<AuthResult>
  verifyToken,     // (token: string, secret: string) => Promise<AuthResult>
  verifyBackup,    // (code: string, codes: string[]) => Promise<AuthResult<string[]>>
  disable,         // () => Promise<AuthResult>
  regenerateBackupCodes // () => Promise<AuthResult<string[]>>
} = useTotp(user, config);

// Setup process
const handleMfaSetup = async () => {
  const result = await startSetup();
  if (result.success && result.data) {
    console.log('QR Code:', result.data.qrCodeUrl);
    console.log('Backup Codes:', result.data.backupCodes);
  }
};

// Verification
const handleVerification = async (userCode: string) => {
  const result = await verifySetup(userCode);
  if (result.success) {
    console.log('TOTP enabled successfully!');
  }
};
```

## Components

### AuthProvider

Provider component που wrap την εφαρμογή:

```typescript
<AuthProvider
  callbacks={{
    onSignIn: (user) => {},
    onSignOut: () => {},
    onRoleChange: (newRole, oldRole) => {},
    onMfaChange: (status) => {}
  }}
  LoadingComponent={MySpinner}
  ErrorComponent={MyErrorDisplay}
>
  <App />
</AuthProvider>
```

### RoleGuard

Component για προστασία περιεχομένου:

```typescript
<RoleGuard
  requiredRole="admin"
  fallback={<SignInPrompt />}
  accessDenied={<AccessDeniedMessage />}
  emailVerificationRequired={<VerifyEmailPrompt />}
  mfaRequired={<MfaPrompt />}
>
  <ProtectedContent />
</RoleGuard>
```

### TotpSetup

Component για TOTP setup process:

```typescript
<TotpSetup
  config={{
    appName: 'MyApp',
    period: 30,
    digits: 6
  }}
  onComplete={() => {
    console.log('TOTP setup completed!');
    setMfaEnabled(true);
  }}
  onCancel={() => {
    console.log('Setup cancelled');
    setShowSetup(false);
  }}
  className="la-component"
/>
```

### TotpVerification

Component για TOTP verification κατά την είσοδο:

```typescript
<TotpVerification
  onVerify={async (code) => {
    const result = await authenticateWithTotp(code);
    if (result.success) {
      redirectToDashboard();
    }
  }}
  onUseBackup={async (backupCode) => {
    const result = await authenticateWithBackup(backupCode);
    if (result.success) {
      redirectToDashboard();
    }
  }}
  loading={isAuthenticating}
  error={authError}
/>
```

## Utilities

### Έλεγχος Δικαιωμάτων

```typescript
import { hasAccess, isFullyAuthenticated } from '@layera/auth-bridge';

// Έλεγχος ρόλου
const canAccess = hasAccess(user, 'broker');

// Έλεγχος πλήρους authentication
const isReady = isFullyAuthenticated(user);
```

### Firebase Management

```typescript
import {
  getFirebaseAuth,
  getFirebaseApp,
  createLayeraUser
} from '@layera/auth-bridge';

const auth = getFirebaseAuth();
const app = getFirebaseApp();
const layeraUser = await createLayeraUser(firebaseUser);
```

### TOTP Utilities

```typescript
import {
  generateTotpSecret,
  generateQrCodeUrl,
  generateBackupCodes,
  initiateTotpSetup,
  verifyTotpCode,
  verifyBackupCode
} from '@layera/auth-bridge';

// Γέννηση TOTP secret
const secret = generateTotpSecret();

// Δημιουργία QR code URL
const qrCodeUrl = generateQrCodeUrl(user, secret, {
  appName: 'MyApp',
  period: 30,
  digits: 6
});

// Γέννηση backup codes
const backupCodes = generateBackupCodes(10);

// Πλήρης TOTP setup
const setupResult = initiateTotpSetup(user, { appName: 'MyApp' });
console.log('QR Code:', setupResult.qrCodeUrl);
console.log('Manual Key:', setupResult.manualEntryKey);
console.log('Backup Codes:', setupResult.backupCodes);

// Επαλήθευση TOTP code
const isValidTotp = verifyTotpCode(secret, '123456');

// Επαλήθευση backup code
const isValidBackup = verifyBackupCode(backupCodes, 'ABCD1234');
```

## TypeScript Types

```typescript
import type {
  UserRole,           // 'private' | 'broker' | 'builder' | 'admin'
  LayeraUser,         // Extended Firebase User
  AuthState,          // Authentication state
  AuthResult,         // Operation result
  MfaStatus,          // MFA information
  TotpConfig,         // TOTP configuration
  TotpSetupResult     // TOTP setup data
} from '@layera/auth-bridge';
```

## Testing

Το package παρέχει mocks για testing:

```typescript
// Jest setup
import '@layera/auth-bridge/mocks';

// Test με mock user
const mockUser = createMockLayeraUser({
  email: 'test@example.com',
  role: 'admin',
  emailVerified: true,
  mfaVerified: true
});
```

## Συμβατότητα

- **React**: 19.x+
- **Firebase**: 12.x+
- **TypeScript**: 5.x+
- **Node.js**: 18.x+

## Documentation

Για πλήρη documentation και examples:
- [API Reference](https://layera.dev/docs/auth-bridge/api)
- [Integration Guide](https://layera.dev/docs/auth-bridge/integration)
- [Examples](https://layera.dev/docs/auth-bridge/examples)

## License

ISC - Layera Team