# 🚀 Layera ID - Deployment Guide

## 📋 Επισκόπηση Deployment

Αυτός ο οδηγός περιγράφει τη διαδικασία deployment του Layera ID σε production environment. Το σύστημα χρησιμοποιεί Firebase για hosting και backend services.

## 🔧 Προαπαιτούμενα

### 1. Development Environment
```bash
# Node.js (LTS version)
node --version  # >= 18.x.x
npm --version   # >= 9.x.x

# Firebase CLI
npm install -g firebase-tools
firebase --version  # >= 12.x.x

# Git
git --version  # >= 2.x.x
```

### 2. Firebase Project Setup
```bash
# Login στο Firebase
firebase login

# Initialize Firebase project
firebase init

# Select services:
# ✅ Firestore
# ✅ Functions
# ✅ Hosting
# ✅ Storage
# ✅ Emulators
```

### 3. Environment Variables
Δημιούργησε `.env.production` αρχείο:
```bash
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

# Application Settings
REACT_APP_ENVIRONMENT=production
REACT_APP_API_URL=https://your_project.web.app
REACT_APP_VERSION=1.0.0
```

## 🏗️ Build Process

### 1. Frontend Build
```bash
# Navigate to React app
cd apps/layera-id

# Install dependencies
npm ci --production

# Run tests
npm run test -- --run

# Build for production
npm run build

# Verify build
npm run preview
```

### 2. Functions Build
```bash
# Navigate to functions
cd functions

# Install dependencies
npm ci --production

# TypeScript compilation
npm run build

# Test functions locally
npm run serve
```

### 3. Pre-deployment Validation
```bash
# Lint code
npm run lint

# Security audit
npm audit --audit-level high

# Bundle size analysis
npm run build:analyze

# Performance testing
npm run lighthouse
```

## 🔐 Firebase Configuration

### 1. Authentication Setup
```bash
# Enable authentication providers στο Firebase Console
# 1. Email/Password
# 2. Phone (για MFA)
# 3. Configure authorized domains
```

**Console Steps:**
1. Go to **Firebase Console** → **Authentication** → **Sign-in method**
2. Enable **Email/Password**
3. Enable **Phone** για MFA
4. Add production domain στα **Authorized domains**
5. Configure **Email templates** (verification, password reset)

### 2. Firestore Database Setup
```bash
# Deploy security rules
firebase deploy --only firestore:rules

# Setup indexes
firebase deploy --only firestore:indexes

# Initialize collections
firebase firestore:delete --all-collections  # ΠΡΟΣΟΧΗ: Μόνο για clean setup
```

**Security Rules Deployment:**
```javascript
// firestore.rules παράμετροι production
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Production-ready security rules
    function isAuthenticated() {
      return request.auth != null;
    }

    function isVerified() {
      return request.auth.token.email_verified == true;
    }

    function hasRole(role) {
      return isVerified() && request.auth.token.role == role;
    }

    function hasMfa() {
      return request.auth.token.mfa == true;
    }

    // Apply strict rules
    match /{document=**} {
      allow read, write: if false;  // Default deny
    }

    // Specific collections με proper security
    match /users/{userId} {
      allow read, write: if isVerified() && request.auth.uid == userId;
    }

    match /projects/{projectId} {
      allow read: if isVerified();
      allow write: if isVerified() &&
                      (!request.auth.token.role in ['broker', 'builder', 'admin'] || hasMfa());
    }

    match /admin/{document=**} {
      allow read, write: if isVerified() && hasMfa() && hasRole('admin');
    }
  }
}
```

### 3. Cloud Functions Deployment
```bash
# Set Firebase project
firebase use your_project_id

# Deploy functions
firebase deploy --only functions

# Monitor function logs
firebase functions:log --limit 50
```

**Functions Configuration:**
```typescript
// functions/src/config.ts
export const config = {
  region: 'europe-west1',
  runtime: 'nodejs18' as const,
  memory: '256MB' as const,
  timeout: 60,
  environment: {
    NODE_ENV: 'production',
    LOG_LEVEL: 'info'
  },
  cors: {
    origin: ['https://your-domain.com'],
    credentials: true
  }
};
```

### 4. Storage Setup
```bash
# Deploy storage rules
firebase deploy --only storage

# Configure CORS
gsutil cors set cors.json gs://your_project.appspot.com
```

**Storage Rules:**
```javascript
// storage.rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/profile/{filename} {
      allow read: if request.auth != null && request.auth.token.email_verified;
      allow write: if request.auth != null &&
                      request.auth.token.email_verified &&
                      request.auth.uid == userId &&
                      request.resource.size < 5 * 1024 * 1024 &&
                      request.resource.contentType.matches('image/.*');
    }

    match /projects/{projectId}/{filename} {
      allow read: if request.auth != null && request.auth.token.email_verified;
      allow write: if request.auth != null &&
                      request.auth.token.email_verified &&
                      request.auth.token.role in ['broker', 'builder', 'admin'] &&
                      request.auth.token.mfa == true &&
                      request.resource.size < 10 * 1024 * 1024;
    }
  }
}
```

## 🌐 Production Deployment

### 1. Full Deployment
```bash
# Complete deployment pipeline
#!/bin/bash

set -e  # Exit on any error

echo "🚀 Starting Layera ID deployment..."

# 1. Pre-deployment checks
echo "📋 Running pre-deployment checks..."
npm run test:all
npm run lint:all
npm audit --audit-level high

# 2. Build all components
echo "🏗️ Building application..."
cd apps/layera-id && npm run build && cd ../..
cd functions && npm run build && cd ..

# 3. Deploy infrastructure
echo "🔧 Deploying Firebase infrastructure..."
firebase deploy --only firestore:rules,firestore:indexes
firebase deploy --only storage
firebase deploy --only functions

# 4. Deploy frontend
echo "🌐 Deploying frontend..."
firebase deploy --only hosting

# 5. Post-deployment verification
echo "✅ Running post-deployment verification..."
npm run test:e2e:production
npm run lighthouse:production

echo "🎉 Deployment completed successfully!"
```

### 2. Hosting Configuration
```json
// firebase.json
{
  "hosting": {
    "public": "apps/layera-id/dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      },
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
          },
          {
            "key": "Content-Security-Policy",
            "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://apis.google.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://*.firebaseapp.com https://*.googleapis.com"
          }
        ]
      }
    ]
  },
  "functions": {
    "source": "functions",
    "runtime": "nodejs18",
    "predeploy": [
      "npm --prefix \"$RESOURCE_DIR\" run build"
    ]
  },
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "storage": {
    "rules": "storage.rules"
  }
}
```

### 3. Custom Domain Setup
```bash
# Add custom domain
firebase hosting:channel:deploy production --alias your-domain.com

# SSL Certificate (automatic με Firebase)
# DNS Configuration
# A record: @ → Firebase IP
# CNAME record: www → your-project.web.app
```

## 📊 Monitoring & Analytics

### 1. Firebase Analytics Setup
```javascript
// Analytics configuration
import { getAnalytics, logEvent } from 'firebase/analytics';

const analytics = getAnalytics(app);

// Track custom events
export const trackUserAction = (action: string, parameters?: any) => {
  logEvent(analytics, action, {
    ...parameters,
    timestamp: Date.now(),
    user_role: currentUser?.role || 'anonymous'
  });
};

// Track security events
export const trackSecurityEvent = (event: string, details: any) => {
  logEvent(analytics, 'security_event', {
    event_type: event,
    ...details,
    timestamp: Date.now()
  });
};
```

### 2. Performance Monitoring
```javascript
// Performance monitoring
import { getPerformance } from 'firebase/performance';

const perf = getPerformance(app);

// Custom traces
const trace = perf.trace('custom_trace');
trace.start();
// ... κώδικας που θέλουμε να μετρήσουμε
trace.stop();
```

### 3. Error Monitoring
```typescript
// Error tracking service
class ErrorTracker {
  static logError(error: Error, context?: any) {
    console.error('Application Error:', error);

    // Log στο Firestore για analysis
    admin.firestore().collection('error_logs').add({
      message: error.message,
      stack: error.stack,
      context,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });

    // Send to external monitoring (optional)
    // Sentry.captureException(error);
  }

  static logSecurityIssue(issue: string, severity: 'low' | 'medium' | 'high' | 'critical') {
    admin.firestore().collection('security_incidents').add({
      issue,
      severity,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      resolved: false
    });
  }
}
```

## 🔄 CI/CD Pipeline

### 1. GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy to Firebase

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: |
          cd apps/layera-id && npm ci
          cd ../../functions && npm ci

      - name: Run tests
        run: |
          cd apps/layera-id && npm run test -- --run
          cd ../../functions && npm run test

      - name: Lint code
        run: |
          cd apps/layera-id && npm run lint
          cd ../../functions && npm run lint

      - name: Security audit
        run: |
          cd apps/layera-id && npm audit --audit-level high
          cd ../../functions && npm audit --audit-level high

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: |
          cd apps/layera-id && npm ci
          cd ../../functions && npm ci

      - name: Build application
        run: |
          cd apps/layera-id && npm run build
          cd ../../functions && npm run build

      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          projectId: your_project_id
```

### 2. Deployment Environments
```bash
# Development
firebase use dev-project-id
firebase deploy

# Staging
firebase use staging-project-id
firebase deploy

# Production
firebase use prod-project-id
firebase deploy --only hosting,functions
```

## 🛡️ Security Hardening

### 1. Production Security Checklist
```typescript
const productionSecurityChecklist = {
  authentication: [
    '✅ Email verification enabled',
    '✅ MFA enforced for privileged roles',
    '✅ Strong password requirements',
    '✅ Account lockout after failed attempts',
    '✅ Session timeout configured'
  ],

  authorization: [
    '✅ RBAC properly implemented',
    '✅ Principle of least privilege',
    '✅ Custom claims validated',
    '✅ Admin functions protected',
    '✅ API rate limiting enabled'
  ],

  dataProtection: [
    '✅ HTTPS enforced everywhere',
    '✅ Security headers configured',
    '✅ CORS properly set up',
    '✅ Input validation implemented',
    '✅ SQL injection prevention'
  ],

  monitoring: [
    '✅ Error logging enabled',
    '✅ Security events tracked',
    '✅ Performance monitoring',
    '✅ Audit trail implemented',
    '✅ Alert system configured'
  ]
};
```

### 2. Environment Secrets Management
```bash
# Firebase functions environment
firebase functions:config:set encryption.key="your_encryption_key"
firebase functions:config:set admin.email="admin@your-domain.com"
firebase functions:config:set external_api.key="your_api_key"

# GitHub secrets
FIREBASE_SERVICE_ACCOUNT='{service_account_json}'
FIREBASE_TOKEN='firebase_ci_token'
ENCRYPTION_KEY='your_encryption_key'
```

## 📋 Post-Deployment Tasks

### 1. Verification Checklist
```bash
# 1. Health checks
curl https://your-domain.com/health
curl https://your-domain.com/api/status

# 2. Authentication flow test
# - Register new user
# - Email verification
# - Login process
# - MFA enrollment
# - Role assignment

# 3. Security validation
# - HTTPS redirect
# - Security headers
# - CORS configuration
# - Rate limiting

# 4. Performance test
# - Page load times
# - API response times
# - Database queries
# - Function cold starts
```

### 2. Monitoring Setup
```typescript
// Post-deployment monitoring
const monitoringSetup = {
  alerts: [
    'Error rate > 5%',
    'Response time > 2s',
    'Failed login attempts > 10/min',
    'Security rule violations',
    'Function timeout errors'
  ],

  dashboards: [
    'User activity metrics',
    'Authentication success rates',
    'MFA enrollment rates',
    'API usage statistics',
    'Security incident tracking'
  ],

  reportSchedule: [
    'Daily error summary',
    'Weekly security report',
    'Monthly performance review',
    'Quarterly security audit'
  ]
};
```

## 🔧 Troubleshooting

### Common Deployment Issues
```bash
# 1. Build failures
# Check Node.js version compatibility
# Verify all dependencies installed
# Review TypeScript compilation errors

# 2. Function deployment errors
# Check IAM permissions
# Verify billing account (Blaze plan required)
# Review function logs

# 3. Security rules deployment
# Validate rules syntax
# Test rules με emulator
# Check for breaking changes

# 4. Custom domain issues
# Verify DNS configuration
# Check SSL certificate status
# Review CNAME/A records
```

### Recovery Procedures
```bash
# Rollback deployment
firebase hosting:channel:deploy previous-version
firebase functions:shell  # Test functions locally

# Database restore
# Use Firebase Admin SDK για data recovery
# Restore from backup if available

# Emergency procedures
# Disable compromised accounts
# Rotate API keys
# Update security rules
# Contact Firebase support
```

---

**Τελευταία ενημέρωση**: 17/10/2025
**Έκδοση**: 1.0
**DevOps Team**: Layera Infrastructure Team