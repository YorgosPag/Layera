# Layera Enterprise Authentication Platform

🔐 **Enterprise-grade monorepo** για διαχείριση ταυτότητας και πρόσβασης με προηγμένες τεχνολογίες ασφάλειας.

## 🎯 Επισκόπηση

Το Layera είναι ένα ολοκληρωμένο σύστημα **Identity & Access Management (IAM)** που παρέχει:

- ✅ **Role-Based Access Control (RBAC)** με 4 επίπεδα πρόσβασης
- ✅ **TOTP Multi-Factor Authentication** με Google Authenticator/Authy
- ✅ **Επαναχρησιμοποιήσιμα packages** για εύκολη ενσωμάτωση
- ✅ **Enterprise documentation** με πλήρη traceability
- ✅ **Firebase backend** με secure Cloud Functions
- ✅ **TypeScript-first** development experience

## 🏗️ Monorepo Structure

```
layera/
├── 📦 packages/
│   └── auth-bridge/          # Core authentication package
├── 🚀 apps/
│   └── layera-id/           # Main React application
├── ⚡ functions/            # Firebase Cloud Functions
├── 🛠️ tools/               # Admin CLI utilities
└── 📚 docs/                # Enterprise documentation
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0.0+
- npm 9.0.0+
- Firebase CLI

### Installation

```bash
# Clone repository
git clone https://github.com/layera/layera.git
cd layera

# Install all dependencies
npm install

# Build auth-bridge package
npm run build --workspace=@layera/auth-bridge

# Start development server
npm run dev
```

### Αρχικοποίηση Firebase

```bash
# Login to Firebase
firebase login

# Initialize project
firebase init

# Deploy functions (optional)
npm run deploy:functions
```

## 📦 Packages

### @layera/auth-bridge

Το **κύριο authentication package** που παρέχει:

```typescript
import {
  AuthProvider,
  useAuthContext,
  RoleGuard,
  TotpSetup,
  useTotp
} from '@layera/auth-bridge';

// Wrap την εφαρμογή
<AuthProvider>
  <App />
</AuthProvider>

// Προστασία routes
<RoleGuard requiredRole="admin">
  <AdminPanel />
</RoleGuard>

// TOTP setup
<TotpSetup onComplete={() => setMfaEnabled(true)} />
```

**[📖 Δείτε πλήρη documentation](packages/auth-bridge/README.md)**

## 🔑 User Roles

| Ρόλος | Περιγραφή | MFA Απαιτήσεις |
|-------|-----------|----------------|
| `private` | Βασικός χρήστης (default) | Όχι |
| `broker` | Μεσίτης με ειδικά δικαιώματα | ✅ TOTP |
| `builder` | Κατασκευαστής με εκτεταμένα δικαιώματα | ✅ TOTP |
| `admin` | Διαχειριστής με πλήρη δικαιώματα | ✅ TOTP |

## 🛡️ Security Features

- 🔐 **Email verification** υποχρεωτικό για όλους
- 🛡️ **TOTP-based MFA** για privileged roles
- 🔑 **Backup codes** για recovery access
- 🚫 **Firestore Security Rules** με RBAC enforcement
- ⚡ **Secure Cloud Functions** για admin operations

## 🧪 Development

### Τοπική Ανάπτυξη

```bash
# Start all services
npm run dev                    # Ξεκινά το layera-id app

# Build packages
npm run build                  # Build όλα τα workspaces
npm run build:auth-bridge      # Build μόνο το auth-bridge

# Testing
npm run test                   # Τρέχει tests σε όλα τα packages
npm run typecheck              # Type checking
npm run lint                   # Linting

# Cleanup
npm run clean                  # Καθαρίζει dist directories
```

### Project Scripts

| Script | Περιγραφή |
|--------|-----------|
| `npm run dev` | Ξεκινά development server |
| `npm run build` | Build όλα τα packages |
| `npm run test` | Τρέχει unit tests |
| `npm run verify` | Typecheck + lint |
| `npm run clean` | Καθαρισμός build artifacts |

## 📚 Documentation

- **[🏗️ Architecture](docs/ARCHITECTURE.md)** - System design και structure
- **[🔧 API Reference](docs/API.md)** - Complete API documentation
- **[🛡️ Security Guide](docs/SECURITY.md)** - Security implementation
- **[🚀 Deployment](docs/DEPLOYMENT.md)** - Production deployment guide
- **[🔄 Migration Plan](docs/MONOREPO_MIGRATION_PLAN.md)** - Monorepo setup guide

## 🛠️ Admin Tools

```bash
# Role management
node tools/admin/set-role.mjs user@example.com admin
node tools/admin/check-user.mjs user@example.com

# Backup generation
powershell -ExecutionPolicy Bypass -File create-backup.ps1
```

## 🔄 Integration Examples

### React App Integration

```typescript
import { initializeFirebaseApp, AuthProvider } from '@layera/auth-bridge';

// Initialize
initializeFirebaseApp({
  projectId: 'your-project',
  apiKey: 'your-api-key',
  authDomain: 'your-project.firebaseapp.com'
});

// Wrap app
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/admin" element={
            <RoleGuard requiredRole="admin">
              <AdminPanel />
            </RoleGuard>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
```

### TOTP Setup Integration

```typescript
function SetupMFA() {
  const { user } = useAuthContext();
  const { startSetup, verifySetup } = useTotp(user);

  return (
    <TotpSetup
      config={{ appName: 'MyApp' }}
      onComplete={() => console.log('MFA enabled!')}
    />
  );
}
```

## 🤝 Contributing

1. Fork το repository
2. Δημιούργησε feature branch (`git checkout -b feature/amazing-feature`)
3. Commit τις αλλαγές (`git commit -m 'Add amazing feature'`)
4. Push στο branch (`git push origin feature/amazing-feature`)
5. Άνοιξε Pull Request

## 📄 License

ISC License - Layera Team

## 🔗 Links

- **[Firebase Console](https://console.firebase.google.com)**
- **[Documentation Site](https://layera.dev/docs)**
- **[Package Registry](https://npm.layera.dev)**

---

**Built with ❤️ by Layera Team**