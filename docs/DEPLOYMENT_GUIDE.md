# Layera Deployment Guide

## Περιεχόμενα

- [Προαπαιτούμενα](#προαπαιτούμενα)
- [Firebase Setup](#firebase-setup)
- [Environment Configuration](#environment-configuration)
- [Build Process](#build-process)
- [Deployment Strategies](#deployment-strategies)
- [Security Configuration](#security-configuration)
- [Monitoring & Troubleshooting](#monitoring--troubleshooting)

## Προαπαιτούμενα

### Λογισμικό

```bash
# Node.js (LTS version)
node --version  # >= 20.0.0
npm --version   # >= 10.0.0

# Firebase CLI
npm install -g firebase-tools
firebase --version

# Git
git --version
```

### Λογαριασμοί

- [Firebase Console](https://console.firebase.google.com/) account
- [GitHub](https://github.com/) account για CI/CD
- Domain name (προαιρετικό για custom domain)

## Firebase Setup

### 1. Δημιουργία Project

```bash
# Login στο Firebase
firebase login

# Δημιουργία νέου project
firebase projects:create layera-prod --display-name "Layera Production"

# List available projects
firebase projects:list

# Set active project
firebase use layera-prod
```

### 2. Enable Services

Στο [Firebase Console](https://console.firebase.google.com/):

**Authentication:**
- Enable Email/Password provider
- Enable Google provider
- Configure OAuth consent screen
- Set authorized domains

**Firestore Database:**
- Create database in production mode
- Choose region: `europe-west3` (Frankfurt - GDPR compliant)

**Storage:**
- Initialize Firebase Storage
- Same region: `europe-west3`

**Functions:**
- Enable Cloud Functions
- Set billing account (Blaze plan required)

### 3. Configure OAuth

**Google Cloud Console:**
```bash
# Navigate to: https://console.cloud.google.com/
# APIs & Services > Credentials
# Create OAuth 2.0 Client ID
# Type: Web application
# Authorized origins: https://layera-prod.firebaseapp.com
# Authorized redirect URIs: https://layera-prod.firebaseapp.com/__/auth/handler
```

## Environment Configuration

### 1. Production Environment

```env
# apps/layera-id/.env.production
VITE_FIREBASE_API_KEY=AIzaSyExample...
VITE_FIREBASE_AUTH_DOMAIN=layera-prod.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=layera-prod
VITE_FIREBASE_STORAGE_BUCKET=layera-prod.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
VITE_SUPPORT_EMAIL=support@layera.gr
```

### 2. Staging Environment

```env
# apps/layera-id/.env.staging
VITE_FIREBASE_API_KEY=AIzaSyStaging...
VITE_FIREBASE_AUTH_DOMAIN=layera-staging.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=layera-staging
VITE_FIREBASE_STORAGE_BUCKET=layera-staging.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=987654321
VITE_FIREBASE_APP_ID=1:987654321:web:fedcba654321
VITE_SUPPORT_EMAIL=staging@layera.gr
```

### 3. GitHub Secrets

Repository Settings > Secrets and variables > Actions:

```
FIREBASE_SERVICE_ACCOUNT_LAYERA_PROD
FIREBASE_SERVICE_ACCOUNT_LAYERA_STAGING
```

## Build Process

### 1. Local Build

```bash
# Clean install
npm ci

# Type checking
npm run typecheck

# Linting
npm run lint

# Tests
npm run test

# Build all workspaces
npm run build

# Build specific workspace
npm run build --workspace=@layera/layera-id
npm run build --workspace=@layera/auth-bridge
```

### 2. Verify Build

```bash
# Check build artifacts
ls -la apps/layera-id/dist/
ls -la packages/auth-bridge/dist/

# Local preview
cd apps/layera-id
npm run preview
```

## Deployment Strategies

### 1. Manual Deployment

```bash
# Build project
npm run build --workspace=@layera/layera-id

# Deploy to Firebase Hosting
cd apps/layera-id
firebase deploy --only hosting

# Deploy Cloud Functions
cd ../../functions
npm run deploy
```

### 2. CI/CD Pipeline

**GitHub Actions Workflow** (`.github/workflows/deploy.yml`):

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

env:
  NODE_VERSION: '20'

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test

      - name: Build project
        run: npm run build

      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT_LAYERA_PROD }}'
          projectId: layera-prod
```

### 3. Staging Deployment

```bash
# Deploy to staging
firebase use layera-staging
firebase deploy --only hosting

# Preview URL
# https://layera-staging.firebaseapp.com
```

## Security Configuration

### 1. Firestore Rules

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null
        && request.auth.uid == userId
        && request.auth.token.email_verified == true;
    }

    // Admin-only collections
    match /admin/{document=**} {
      allow read, write: if request.auth != null
        && request.auth.token.email_verified == true
        && request.auth.token.mfa_verified == true
        && request.auth.token.role == 'admin';
    }

    // Professional collections
    match /properties/{propertyId} {
      allow read: if request.auth != null
        && request.auth.token.email_verified == true;
      allow write: if request.auth != null
        && request.auth.token.email_verified == true
        && request.auth.token.role in ['broker', 'builder', 'admin'];
    }
  }
}
```

### 2. Storage Rules

```javascript
// storage.rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // User profile images
    match /profiles/{userId}/{fileName} {
      allow read, write: if request.auth != null
        && request.auth.uid == userId
        && request.auth.token.email_verified == true
        && resource.size < 5 * 1024 * 1024; // 5MB limit
    }

    // Property images
    match /properties/{propertyId}/{fileName} {
      allow read: if request.auth != null
        && request.auth.token.email_verified == true;
      allow write: if request.auth != null
        && request.auth.token.email_verified == true
        && request.auth.token.role in ['broker', 'builder', 'admin']
        && resource.size < 10 * 1024 * 1024; // 10MB limit
    }
  }
}
```

### 3. Security Headers

**firebase.json:**
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**",
        "headers": [
          {
            "key": "X-Content-Type-Options",
            "value": "nosniff"
          },
          {
            "key": "X-Frame-Options",
            "value": "DENY"
          },
          {
            "key": "X-XSS-Protection",
            "value": "1; mode=block"
          },
          {
            "key": "Strict-Transport-Security",
            "value": "max-age=31536000; includeSubDomains"
          }
        ]
      }
    ]
  }
}
```

## Monitoring & Troubleshooting

### 1. Firebase Console Monitoring

**Authentication:**
- Monitor sign-in methods usage
- Check failed authentication attempts
- Review user growth metrics

**Hosting:**
- Monitor bandwidth usage
- Check error rates
- Review page load times

**Functions:**
- Monitor execution time
- Check error rates
- Review invocation counts

### 2. Error Tracking

```typescript
// Error reporting setup
import { getAnalytics, logEvent } from 'firebase/analytics'

const analytics = getAnalytics()

const logError = (error: Error, context: string) => {
  console.error(`[${context}]`, error)

  logEvent(analytics, 'exception', {
    description: error.message,
    fatal: false,
    context
  })
}

// Usage
try {
  await signIn(email, password)
} catch (error) {
  logError(error as Error, 'auth/sign_in')
}
```

### 3. Performance Monitoring

```typescript
// Performance monitoring
import { getPerformance, trace } from 'firebase/performance'

const perf = getPerformance()

const measureAuthFlow = () => {
  const authTrace = trace(perf, 'auth_flow')
  authTrace.start()

  // ... authentication logic

  authTrace.stop()
}
```

### 4. Common Issues

**Build Failures:**
```bash
# Clear cache
npm run clean
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run typecheck

# Check for missing dependencies
npm audit
```

**Authentication Issues:**
```bash
# Check Firebase configuration
firebase projects:list
firebase use --clear
firebase use your-project-id

# Verify environment variables
cat .env.production
```

**Deployment Failures:**
```bash
# Check Firebase CLI version
firebase --version
npm install -g firebase-tools@latest

# Check service account permissions
firebase projects:list
```

### 5. Rollback Strategy

```bash
# List recent hosting releases
firebase hosting:releases:list

# Rollback to previous version
firebase hosting:releases:rollback --site layera-prod

# Emergency rollback
firebase hosting:disable --site layera-prod
```

### 6. Health Checks

```typescript
// Health check endpoint
export const healthCheck = functions.https.onRequest((req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: Date.now(),
    version: process.env.npm_package_version
  })
})
```

**Monitoring Script:**
```bash
#!/bin/bash
# health-check.sh

HEALTH_URL="https://layera-prod.web.app/api/health"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" $HEALTH_URL)

if [ $RESPONSE -eq 200 ]; then
  echo "✅ Service is healthy"
else
  echo "❌ Service is down (HTTP $RESPONSE)"
  # Send alert notification
fi
```

## Cost Optimization

### Free Tier Limits

**Hosting:**
- 10 GB storage
- 125,000/month traffic

**Functions:**
- 2,000,000 invocations/month
- 400,000 GB-seconds/month

**Firestore:**
- 50,000 reads/day
- 20,000 writes/day
- 1 GB storage

### Optimization Strategies

```typescript
// Efficient Firestore queries
const getUserData = async (uid: string) => {
  // Use specific field paths
  const userRef = doc(db, 'users', uid)
  const userSnap = await getDoc(userRef)

  if (userSnap.exists()) {
    // Return only needed fields
    const { email, role, lastLogin } = userSnap.data()
    return { email, role, lastLogin }
  }
}

// Batch operations
const batchUpdate = async (updates: any[]) => {
  const batch = writeBatch(db)

  updates.forEach(update => {
    const docRef = doc(db, update.collection, update.id)
    batch.update(docRef, update.data)
  })

  await batch.commit()
}
```

---

*Τελευταία ενημέρωση: 17 Οκτωβρίου 2025*
*Περιβάλλον: Production-ready deployment guide*