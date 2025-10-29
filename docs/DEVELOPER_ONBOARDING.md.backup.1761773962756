# Layera Developer Onboarding Guide

## Καλώς ήρθατε στο Layera! 🎉

Αυτός ο οδηγός θα σας βοηθήσει να ξεκινήσετε την ανάπτυξη στο Layera monorepo σε λιγότερο από μία ώρα.

## Περιεχόμενα

- [Quick Start (5 λεπτά)](#quick-start-5-λεπτά)
- [Αρχιτεκτονική Overview](#αρχιτεκτονική-overview)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

## Quick Start (5 λεπτά)

### 1. Prerequisites

```bash
# Απαιτούμενες εκδόσεις
node --version  # >= 20.0.0
npm --version   # >= 10.0.0
git --version   # >= 2.0.0

# Εγκατάσταση Firebase CLI (προαιρετικό)
npm install -g firebase-tools
```

### 2. Clone & Setup

```bash
# Clone repository
git clone https://github.com/your-org/layera.git
cd layera

# Install dependencies (όλα τα workspaces)
npm install

# Setup environment
cp apps/layera-id/.env.example apps/layera-id/.env.local
```

### 3. Configure Environment

**Επεξεργαστείτε το `apps/layera-id/.env.local`:**

```env
# Development Firebase Project
VITE_FIREBASE_API_KEY=your_dev_api_key
VITE_FIREBASE_AUTH_DOMAIN=layera-dev.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=layera-dev
VITE_FIREBASE_STORAGE_BUCKET=layera-dev.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your_dev_app_id
VITE_SUPPORT_EMAIL=dev-support@layera.gr
```

### 4. Start Development

```bash
# Start development server
npm run dev

# Η εφαρμογή θα είναι διαθέσιμη στο:
# http://localhost:5174
```

### 5. Verify Setup

```bash
# Run tests
npm run test

# Type checking
npm run typecheck

# Linting
npm run lint

# Build (για verification)
npm run build
```

**✅ Αν όλα πέτυχαν, είστε έτοιμοι να ξεκινήσετε!**

## Αρχιτεκτονική Overview

### Monorepo Structure

```
layera/
├── apps/                    # Applications
│   └── layera-id/          # Main Identity App
│       ├── src/
│       ├── public/
│       ├── package.json
│       └── vite.config.ts
├── packages/               # Reusable Packages
│   └── auth-bridge/        # Authentication Library
│       ├── src/
│       ├── dist/
│       └── package.json
├── functions/              # Cloud Functions
│   ├── src/
│   ├── lib/
│   └── package.json
├── docs/                   # Documentation
└── .github/workflows/      # CI/CD
```

### Key Concepts

**"Τουβλάκια" (Building Blocks):**
- Κάθε package είναι ένα ανεξάρτητο τουβλάκι
- Μπορεί να χρησιμοποιηθεί σε πολλαπλές εφαρμογές
- Τηρεί strict interface contracts

**Authentication Flow:**
```
Login → Email Verification → MFA (για professional roles) → Access
```

**Role Hierarchy:**
```
private → broker → builder → admin
```

## Development Workflow

### 1. Feature Development

```bash
# Δημιουργία feature branch
git checkout -b feature/user-profile-management

# Development cycle
npm run dev          # Start dev server
npm run test:watch   # Run tests in watch mode

# Commit changes
git add .
git commit -m "feat: add user profile management"

# Push και create PR
git push origin feature/user-profile-management
```

### 2. Working with Workspaces

```bash
# Install package in specific workspace
npm install lodash --workspace=@layera/auth-bridge

# Run scripts in specific workspace
npm run build --workspace=@layera/auth-bridge
npm run test --workspace=@layera/layera-id

# Run scripts in all workspaces
npm run build    # Builds all workspaces
npm run test     # Tests all workspaces
```

### 3. Package Development

**Όταν εργάζεστε στο auth-bridge:**

```bash
# Navigate to package
cd packages/auth-bridge

# Make changes in src/
# ...

# Build package
npm run build

# Test in layera-id app
cd ../../apps/layera-id
npm run dev  # Will use updated package
```

### 4. Adding New Features

**Βήματα για νέο feature:**

1. **Planning**: Ενημερώστε το `docs/COMPLETION_ROADMAP.md`
2. **Design**: Δημιουργήστε interface/type definitions
3. **Implementation**: Γράψτε το code με TDD approach
4. **Testing**: Unit tests + integration tests
5. **Documentation**: Update API docs
6. **Review**: Create PR με detailed description

## Coding Standards

### 1. TypeScript Guidelines

```typescript
// ✅ Good: Explicit types
interface UserProfile {
  readonly id: string;
  readonly email: string;
  readonly role: LayeraRole;
  readonly createdAt: Date;
}

// ✅ Good: Proper error handling
const fetchUser = async (id: string): Promise<AuthResult<UserProfile>> => {
  try {
    const user = await userService.getById(id);
    return { success: true, data: user };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// ❌ Bad: Any types
const fetchUser = async (id: any): Promise<any> => {
  // ...
};
```

### 2. React Guidelines

```typescript
// ✅ Good: Functional components με proper typing
interface LoginFormProps {
  readonly onSubmit: (credentials: LoginCredentials) => void;
  readonly loading?: boolean;
  readonly error?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading, error }) => {
  // Component logic
};

// ✅ Good: Custom hooks
const useLoginForm = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  });

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    // Validation logic
  }, [credentials]);

  return { credentials, setCredentials, handleSubmit };
};
```

### 3. File Naming

```
// Components
LoginForm.tsx
UserProfile.tsx

// Hooks
useAuth.ts
useUserProfile.ts

// Types
auth.types.ts
user.types.ts

// Utils
firebase.utils.ts
validation.utils.ts

// Tests
LoginForm.test.tsx
useAuth.test.ts
```

### 4. Import Organization

```typescript
// 1. External libraries
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Internal packages
import { useAuthContext, type LayeraUser } from '@layera/auth-bridge';

// 3. Relative imports
import { validateEmail } from '../utils/validation';
import { LoginForm } from './LoginForm';

// 4. Styles (last)
import './Login.css';
```

## Testing Guidelines

### 1. Unit Tests

**Παράδειγμα για React Component:**

```typescript
// LoginForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('should validate email format', async () => {
    const mockSubmit = jest.fn();

    render(<LoginForm onSubmit={mockSubmit} />);

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
    });

    expect(mockSubmit).not.toHaveBeenCalled();
  });
});
```

**Παράδειγμα για Custom Hook:**

```typescript
// useAuth.test.ts
import { renderHook, act } from '@testing-library/react';
import { useAuth } from './useAuth';

describe('useAuth', () => {
  it('should handle sign in flow', async () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBeFalsy();

    await act(async () => {
      const response = await result.current.signIn('test@example.com', 'password');
      expect(response.success).toBeTruthy();
    });

    expect(result.current.user).toBeDefined();
  });
});
```

### 2. Integration Tests

```typescript
// AuthFlow.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider } from '@layera/auth-bridge';
import { App } from './App';

describe('Authentication Flow', () => {
  it('should complete full sign-in flow', async () => {
    const user = userEvent.setup();

    render(
      <AuthProvider config={mockFirebaseConfig}>
        <App />
      </AuthProvider>
    );

    // User sees login form
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();

    // User enters credentials
    await user.type(screen.getByLabelText(/email/i), 'user@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    // User is redirected to dashboard
    await waitFor(() => {
      expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    });
  });
});
```

### 3. Testing Commands

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm run test -- LoginForm.test.tsx

# Run tests with coverage
npm run test:coverage

# Run tests for specific workspace
npm run test --workspace=@layera/auth-bridge
```

## Troubleshooting

### Common Issues

**1. Environment Variables Not Loading**
```bash
# Verify file exists
ls -la apps/layera-id/.env.local

# Check file format (no spaces around =)
cat apps/layera-id/.env.local
```

**2. Package Not Found Errors**
```bash
# Rebuild package links
npm install

# Check workspace configuration
npm ls --workspaces
```

**3. TypeScript Errors**
```bash
# Clear TypeScript cache
npx tsc --build --clean

# Rebuild
npm run build
```

**4. Firebase Connection Issues**
```bash
# Verify Firebase configuration
firebase projects:list
firebase use layera-dev

# Check network/firewall
curl -I https://firebase.googleapis.com
```

**5. Port Already in Use**
```bash
# Kill process on port 5174
npx kill-port 5174

# Use different port
npm run dev -- --port 3000
```

### Debug Mode

```bash
# Enable debug logging
DEBUG=layera:* npm run dev

# Firebase debug mode
export FIREBASE_DEBUG=true
npm run dev
```

## Best Practices

### 1. Git Workflow

```bash
# Descriptive commit messages
git commit -m "feat(auth): add TOTP MFA enrollment flow

- Add generateTotpSecret utility function
- Create MfaEnroll component with QR code
- Add MFA verification to auth flow
- Update RoleGuard to check MFA status

Closes #123"

# Keep commits atomic
git add src/components/MfaEnroll.tsx
git commit -m "feat(auth): add MFA enrollment component"

git add src/utils/totp.ts
git commit -m "feat(auth): add TOTP utilities"
```

### 2. Error Handling

```typescript
// ✅ Good: Proper error boundaries
class AuthErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Auth error:', error);
    // Log to monitoring service
  }

  render() {
    if (this.state.hasError) {
      return <AuthErrorFallback />;
    }

    return this.props.children;
  }
}

// ✅ Good: Async error handling
const useAsyncError = () => {
  const [error, setError] = useState<Error | null>(null);

  const executeAsync = useCallback(async (asyncFn: () => Promise<any>) => {
    try {
      setError(null);
      return await asyncFn();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      throw err;
    }
  }, []);

  return { error, executeAsync };
};
```

### 3. Performance

```typescript
// ✅ Good: Memoization
const UserList = React.memo<UserListProps>(({ users, onUserSelect }) => {
  const sortedUsers = useMemo(
    () => users.sort((a, b) => a.name.localeCompare(b.name)),
    [users]
  );

  return (
    <div>
      {sortedUsers.map(user => (
        <UserItem
          key={user.id}
          user={user}
          onSelect={onUserSelect}
        />
      ))}
    </div>
  );
});

// ✅ Good: Lazy loading
const AdminPanel = React.lazy(() => import('./AdminPanel'));

const App = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <Routes>
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  </Suspense>
);
```

### 4. Security

```typescript
// ✅ Good: Input validation
const validateUserInput = (input: unknown): string => {
  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
  }

  if (input.length > 1000) {
    throw new Error('Input too long');
  }

  // Sanitize HTML
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};

// ✅ Good: Secure environment checks
if (import.meta.env.PROD && !import.meta.env.VITE_FIREBASE_API_KEY) {
  throw new Error('Firebase API key is required in production');
}
```

## Next Steps

### 1. Essential Reading

- [API Documentation](./API_DOCUMENTATION.md)
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [Project Rules](./PROJECT-RULES.md)
- [Completion Roadmap](./COMPLETION_ROADMAP.md)

### 2. Development Tasks

1. **First PR**: Fix a small bug ή improve documentation
2. **Feature Work**: Pick up a task από το roadmap
3. **Testing**: Add tests για untested code
4. **Documentation**: Improve ή expand documentation

### 3. Community

- **Code Reviews**: Participate in PR reviews
- **Architecture Discussions**: Join design meetings
- **Knowledge Sharing**: Share learnings με το team

## Support

**Αν χρειάζεστε βοήθεια:**

- 📧 Email: dev-support@layera.gr
- 🐛 Issues: [GitHub Issues](https://github.com/your-org/layera/issues)
- 📖 Docs: [Documentation Portal](./README.md)

---

**Καλό κωδικό! 🚀**

*Τελευταία ενημέρωση: 17 Οκτωβρίου 2025*