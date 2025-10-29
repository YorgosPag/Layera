# 🛡️ Layera ID - Security Documentation

## 🎯 Επισκόπηση Ασφάλειας

Το Layera ID υλοποιεί προηγμένα μέτρα ασφάλειας που ακολουθούν industry best practices για enterprise εφαρμογές. Το σύστημα προστατεύει από κοινές απειλές και παρέχει πολλαπλά επίπεδα ασφάλειας.

## 🔐 Στρατηγική Ασφάλειας

### 1. Defense in Depth
```
🌐 Frontend Security        ← Client-side validation & protection
🔒 Authentication Layer     ← Firebase Auth με MFA
👥 Authorization Layer      ← RBAC με custom claims
🛡️ Database Security       ← Firestore Security Rules
🔧 Function Security        ← Secure Cloud Functions
📡 Network Security         ← HTTPS, CORS, Rate Limiting
```

### 2. Zero Trust Architecture
- **Κανένας χρήστης δεν είναι trusted by default**
- **Όλες οι αιτήσεις απαιτούν επαλήθευση**
- **Συνεχής έλεγχος δικαιωμάτων**
- **Principle of Least Privilege**

## 🔑 Authentication Security

### Email Verification (Υποχρεωτικό)
```javascript
// Υποχρεωτική επαλήθευση email για όλες τις λειτουργίες
const checkEmailVerification = (user) => {
  if (!user.emailVerified) {
    throw new Error('Email verification required');
  }
};

// Security rule implementation
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isVerified() {
      return request.auth.token.email_verified == true;
    }

    // Όλες οι λειτουργίες απαιτούν verified email
    match /{document=**} {
      allow read, write: if isVerified();
    }
  }
}
```

### Multi-Factor Authentication (2FA)
```javascript
// Υποχρεωτικό 2FA για privileged roles
const requiresMFA = ['broker', 'builder', 'admin'];

// Security rule για MFA check
function hasMfa() {
  return request.auth.token.mfa == true;
}

function requiresMfaRole() {
  return request.auth.token.role in ['broker', 'builder', 'admin'];
}

// Εφαρμογή στα sensitive data
match /projects/{projectId} {
  allow write: if isVerified() && (
    !requiresMfaRole() || hasMfa()
  );
}
```

### Password Security
```javascript
// Firebase Authentication Password Requirements
const passwordRequirements = {
  minLength: FORM_VALIDATION.PASSWORD_MIN,               // Firebase minimum
  recommended: {
    minLength: FORM_VALIDATION.PASSWORD_STRONG,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    preventCommonPasswords: true
  }
};

// Client-side password validation
const validatePassword = (password) => {
  const rules = [
    { test: (p) => p.length >= 12, message: 'Τουλάχιστον 12 χαρακτήρες' },
    { test: (p) => /[A-Z]/.test(p), message: 'Κεφαλαίο γράμμα' },
    { test: (p) => /[a-z]/.test(p), message: 'Πεζό γράμμα' },
    { test: (p) => /\\d/.test(p), message: 'Αριθμό' },
    { test: (p) => /[!@#$%^&*]/.test(p), message: 'Ειδικό χαρακτήρα' }
  ];

  return rules.map(rule => ({
    valid: rule.test(password),
    message: rule.message
  }));
};
```

## 🔒 Authorization Security (RBAC)

### Role-Based Access Control Matrix
```typescript
interface SecurityMatrix {
  private: {
    users: ['read:own'],
    projects: ['read:public'],
    admin: []
  },
  broker: {
    users: ['read:own', 'update:own'],
    projects: ['read:all', 'create', 'update:assigned'],
    admin: []
  },
  builder: {
    users: ['read:own', 'update:own'],
    projects: ['read:all', 'create', 'update:assigned', 'delete:own'],
    admin: []
  },
  admin: {
    users: ['read:all', 'update:all', 'delete:all', 'manage:roles'],
    projects: ['read:all', 'create', 'update:all', 'delete:all'],
    admin: ['read:all', 'create', 'update:all', 'delete:all']
  }
}
```

### Custom Claims Security
```javascript
// Secure custom claims στο Firebase Auth token
const customClaims = {
  role: 'private' | 'broker' | 'builder' | 'admin',
  mfa: boolean,
  iat: number,    // Token issued at
  exp: number     // Token expires at (1 hour)
};

// Token validation
const validateClaims = (claims) => {
  const now = Date.now() / 1000;

  if (claims.exp < now) {
    throw new Error('Token expired');
  }

  if (!['private', 'broker', 'builder', 'admin'].includes(claims.role)) {
    throw new Error('Invalid role claim');
  }

  return true;
};
```

## 🛡️ Database Security (Firestore Rules)

### Comprehensive Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper functions
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

    function isOwner(userId) {
      return request.auth.uid == userId;
    }

    function requiresMfaForRole() {
      return request.auth.token.role in ['broker', 'builder', 'admin'];
    }

    // Users collection - strict user data protection
    match /users/{userId} {
      allow read: if isVerified() && isOwner(userId);
      allow write: if isVerified() && isOwner(userId) &&
                     validateUserData(request.resource.data);
    }

    // Projects collection - role-based με MFA requirement
    match /projects/{projectId} {
      allow read: if isVerified();
      allow create: if isVerified() &&
                       (!requiresMfaForRole() || hasMfa()) &&
                       (hasRole('broker') || hasRole('builder') || hasRole('admin'));
      allow update: if isVerified() &&
                       (!requiresMfaForRole() || hasMfa()) &&
                       (isProjectOwner(projectId) ||
                        isAssignedToProject(projectId) ||
                        hasRole('admin'));
      allow delete: if isVerified() && hasMfa() &&
                       (isProjectOwner(projectId) || hasRole('admin'));
    }

    // Admin collection - maximum security
    match /admin/{document=**} {
      allow read, write: if isVerified() && hasMfa() && hasRole('admin');
    }

    // Audit logs - read-only για admins
    match /audit/{logId} {
      allow read: if isVerified() && hasRole('admin');
      allow write: if false; // Μόνο server-side writes
    }

    // Data validation functions
    function validateUserData(data) {
      return data.keys().hasAll(['email', 'displayName']) &&
             data.email is string &&
             data.displayName is string &&
             data.email.matches('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
    }

    function isProjectOwner(projectId) {
      return get(/databases/$(database)/documents/projects/$(projectId)).data.ownerId == request.auth.uid;
    }

    function isAssignedToProject(projectId) {
      let project = get(/databases/$(database)/documents/projects/$(projectId)).data;
      return request.auth.uid in project.assignedBrokers ||
             request.auth.uid in project.assignedBuilders;
    }
  }
}
```

### Storage Security Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {

    // User profile images
    match /users/{userId}/profile/{filename} {
      allow read: if isAuthenticated() && isVerified();
      allow write: if isAuthenticated() && isVerified() &&
                      isOwner(userId) &&
                      isValidImageFile(filename) &&
                      request.resource.size < 5 * 1024 * 1024; // 5MB limit
    }

    // Project documents
    match /projects/{projectId}/documents/{filename} {
      allow read: if isAuthenticated() && isVerified() &&
                     canAccessProject(projectId);
      allow write: if isAuthenticated() && isVerified() &&
                      (!requiresMfaForRole() || hasMfa()) &&
                      canModifyProject(projectId) &&
                      isValidDocumentFile(filename) &&
                      request.resource.size < 10 * 1024 * 1024; // 10MB limit
    }

    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }

    function isVerified() {
      return request.auth.token.email_verified == true;
    }

    function isOwner(userId) {
      return request.auth.uid == userId;
    }

    function hasMfa() {
      return request.auth.token.mfa == true;
    }

    function requiresMfaForRole() {
      return request.auth.token.role in ['broker', 'builder', 'admin'];
    }

    function isValidImageFile(filename) {
      return filename.matches('.*\\.(jpg|jpeg|png|gif|webp)$');
    }

    function isValidDocumentFile(filename) {
      return filename.matches('.*\\.(pdf|doc|docx|txt|md)$');
    }
  }
}
```

## 🔧 Cloud Functions Security

### Function-Level Security
```typescript
// Admin role verification
function assertAdmin(context: functions.https.CallableContext) {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Authentication required');
  }

  if (!context.auth.token.email_verified) {
    throw new functions.https.HttpsError('permission-denied', 'Email verification required');
  }

  if (context.auth.token.role !== 'admin') {
    throw new functions.https.HttpsError('permission-denied', 'Admin access required');
  }

  if (!context.auth.token.mfa) {
    throw new functions.https.HttpsError('permission-denied', 'MFA required for admin operations');
  }
}

// Rate limiting implementation
const rateLimiter = new Map<string, { count: number, resetTime: number }>();

function checkRateLimit(uid: string, maxRequests = 100, windowMs = 60000) {
  const now = Date.now();
  const userLimit = rateLimiter.get(uid);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimiter.set(uid, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (userLimit.count >= maxRequests) {
    throw new functions.https.HttpsError('resource-exhausted', 'Rate limit exceeded');
  }

  userLimit.count++;
  return true;
}

// Input validation
function validateInput(data: any, schema: any) {
  const errors: string[] = [];

  for (const [key, rules] of Object.entries(schema)) {
    const value = data[key];

    if (rules.required && (value === undefined || value === null)) {
      errors.push(`${key} is required`);
      continue;
    }

    if (value !== undefined) {
      if (rules.type && typeof value !== rules.type) {
        errors.push(`${key} must be of type ${rules.type}`);
      }

      if (rules.pattern && !rules.pattern.test(value)) {
        errors.push(`${key} format is invalid`);
      }

      if (rules.enum && !rules.enum.includes(value)) {
        errors.push(`${key} must be one of: ${rules.enum.join(', ')}`);
      }
    }
  }

  if (errors.length > 0) {
    throw new functions.https.HttpsError('invalid-argument', errors.join('; '));
  }
}
```

### Secure Function Implementation
```typescript
export const setRole = functions.region('europe-west1').https.onCall(async (data, context) => {
  // 1. Authentication & authorization
  assertAdmin(context);

  // 2. Rate limiting
  checkRateLimit(context.auth!.uid, 100, 60000);

  // 3. Input validation
  validateInput(data, {
    role: {
      required: true,
      type: 'string',
      enum: ['private', 'broker', 'builder', 'admin']
    },
    email: { type: 'string', pattern: /^[\w\.-]+@[\w\.-]+\.\w+$/ },
    uid: { type: 'string', pattern: /^[a-zA-Z0-9]{28}$/ }
  });

  // 4. Business logic με audit logging
  try {
    const { email, uid, role } = data;
    const auth = admin.auth();

    const user = uid ? await auth.getUser(uid) : await auth.getUserByEmail(email);
    const previousClaims = user.customClaims || {};

    await auth.setCustomUserClaims(user.uid, {
      ...previousClaims,
      role,
      updatedAt: Date.now(),
      updatedBy: context.auth!.uid
    });

    // Audit log
    await admin.firestore().collection('audit').add({
      action: 'role_change',
      targetUserId: user.uid,
      targetUserEmail: user.email,
      previousRole: previousClaims.role || 'private',
      newRole: role,
      performedBy: context.auth!.uid,
      performedAt: admin.firestore.FieldValue.serverTimestamp(),
      ip: context.rawRequest.ip,
      userAgent: context.rawRequest.get('user-agent')
    });

    return {
      success: true,
      uid: user.uid,
      role,
      message: `Role updated to ${role}`
    };

  } catch (error) {
    // Error logging
    console.error('Role update failed:', error);

    await admin.firestore().collection('audit').add({
      action: 'role_change_failed',
      error: error.message,
      performedBy: context.auth!.uid,
      performedAt: admin.firestore.FieldValue.serverTimestamp(),
      ip: context.rawRequest.ip
    });

    throw new functions.https.HttpsError('internal', 'Role update failed');
  }
});
```

## 🚨 Security Monitoring & Incident Response

### Audit Logging
```typescript
interface AuditLog {
  action: string;                    // Ενέργεια που εκτελέστηκε
  targetUserId?: string;             // Στόχος της ενέργειας
  targetUserEmail?: string;          // Email του στόχου
  performedBy: string;               // UID του χρήστη που εκτέλεσε
  performedAt: FirebaseFirestore.Timestamp;
  ip: string;                        // IP address
  userAgent?: string;                // Browser/client info
  success: boolean;                  // Επιτυχία ή αποτυχία
  error?: string;                    // Error message αν απέτυχε
  metadata?: Record<string, any>;    // Επιπλέον δεδομένα
}

// Παραδείγματα audit events
const auditEvents = [
  'user_login',
  'user_logout',
  'user_registration',
  'email_verification',
  'mfa_enrollment',
  'mfa_challenge',
  'role_change',
  'password_reset',
  'profile_update',
  'project_create',
  'project_update',
  'project_delete',
  'admin_action',
  'security_violation'
];
```

### Security Alerts
```typescript
// Real-time security monitoring
const securityMonitoring = {

  // Detect suspicious login patterns
  detectSuspiciousLogin: (uid: string, ip: string) => {
    // Multiple failed attempts
    // Login from unusual location
    // Login outside business hours
    // Multiple simultaneous sessions
  },

  // Monitor privilege escalation
  detectPrivilegeEscalation: (uid: string, newRole: string, oldRole: string) => {
    if (['admin', 'builder'].includes(newRole) && oldRole === 'private') {
      // Alert for direct elevation to high privileges
      sendSecurityAlert('privilege_escalation', { uid, newRole, oldRole });
    }
  },

  // Monitor data access patterns
  detectDataAccessAnomaly: (uid: string, documentPath: string) => {
    // Unusual data access patterns
    // Access to sensitive collections
    // Bulk data operations
  },

  // Rate limiting violations
  detectRateLimitViolation: (uid: string, endpoint: string) => {
    sendSecurityAlert('rate_limit_violation', { uid, endpoint });
  }
};

// Security alert system
const sendSecurityAlert = async (alertType: string, metadata: any) => {
  await admin.firestore().collection('security_alerts').add({
    type: alertType,
    metadata,
    severity: getAlertSeverity(alertType),
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    status: 'open',
    investigatedBy: null,
    resolution: null
  });

  // Send notification to security team
  // await sendSlackAlert(alertType, metadata);
  // await sendEmailAlert(alertType, metadata);
};
```

## 🔍 Security Testing

### Penetration Testing Checklist
```typescript
const securityTests = {
  authentication: [
    'SQL injection in login forms',
    'Brute force attack protection',
    'Session fixation attacks',
    'CSRF token validation',
    'Password complexity bypass',
    'Email verification bypass'
  ],

  authorization: [
    'Horizontal privilege escalation',
    'Vertical privilege escalation',
    'Direct object reference',
    'Missing function level access control',
    'JWT token manipulation'
  ],

  dataProtection: [
    'PII data exposure',
    'Sensitive data in logs',
    'Unencrypted data transmission',
    'Database injection attacks',
    'File upload vulnerabilities'
  ],

  infrastructure: [
    'HTTPS enforcement',
    'Security headers validation',
    'CORS misconfiguration',
    'Rate limiting bypass',
    'Error message information disclosure'
  ]
};
```

### Automated Security Scanning
```bash
# Firebase Security Rules Unit Tests
npm install --save-dev @firebase/rules-unit-testing

# Security dependencies audit
npm audit --audit-level high

# OWASP dependency check
npm install -g audit-ci
audit-ci --moderate

# Code security analysis
npm install -g eslint-plugin-security
```

## 📋 Compliance & Standards

### GDPR Compliance
- **Right to Access**: Users μπορούν να δουν τα δεδομένα τους
- **Right to Rectification**: Users μπορούν να διορθώσουν τα δεδομένα τους
- **Right to Erasure**: Admin μπορεί να διαγράψει user data
- **Data Portability**: Export functionality για user data
- **Privacy by Design**: Default privacy settings

### Security Standards Adherence
- **OWASP Top 10 2021** - Προστασία από κοινές vulnerabilities
- **NIST Cybersecurity Framework** - Comprehensive security approach
- **ISO 27001** - Information security management
- **SOC 2 Type II** - Security και availability controls

---

**Τελευταία ενημέρωση**: 17/10/2025
**Έκδοση**: 1.0
**Security Officer**: Layera Security Team