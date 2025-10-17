# 🆔 Layera ID - Identity & Access Management System

## 📋 Επισκόπηση

Το **Layera ID** είναι ένα σύγχρονο σύστημα διαχείρισης ταυτότητας και πρόσβασης (Identity & Access Management) που σχεδιάστηκε για enterprise εφαρμογές. Υλοποιεί προηγμένα χαρακτηριστικά ασφάλειας συμπεριλαμβανομένου του Role-Based Access Control (RBAC) και υποχρεωτικού Multi-Factor Authentication (2FA).

## 🎯 Κύριες Λειτουργίες

### 🔐 Σύστημα Πιστοποίησης
- **Firebase Authentication** με Email/Password
- **Υποχρεωτική Email Verification** για όλους τους χρήστες
- **Multi-Factor Authentication (2FA)** με SMS για ειδικούς ρόλους
- **Ασφαλής Password Reset** με email verification

### 👥 Διαχείριση Ρόλων (RBAC)
- **private**: Βασικός χρήστης (default role)
- **broker**: Μεσίτης με ειδικά δικαιώματα (απαιτεί 2FA)
- **builder**: Κατασκευαστής με εκτεταμένα δικαιώματα (απαιτεί 2FA)
- **admin**: Διαχειριστής με πλήρη δικαιώματα (απαιτεί 2FA)

### 🛡️ Ασφάλεια
- **Email verification** υποχρεωτικό για όλες τις λειτουργίες
- **2FA enforcement** για broker, builder και admin ρόλους
- **Firestore Security Rules** με έλεγχο ρόλων και MFA
- **Secure Cloud Functions** για admin operations
- **Comprehensive Audit Logging** για όλες τις ενέργειες

## 🏗️ Αρχιτεκτονική

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React App     │    │  Cloud Functions │    │   Firestore     │
│   (Frontend)    │◄──►│   (Backend API)  │◄──►│   (Database)    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                        │                       │
         ▼                        ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│ Firebase Auth   │    │  Admin Tools     │    │ Security Rules  │
│ (Identity)      │    │  (CLI Scripts)   │    │ (Authorization) │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🔧 Τεχνολογικό Stack

### Frontend
- **React 19.1.1** - Modern UI framework
- **Vite 7.1.7** - Fast build tool και development server
- **Tailwind CSS 4.1.14** - Utility-first CSS framework
- **React Router DOM 7.9.4** - Client-side routing

### Backend & Database
- **Firebase Authentication** - Identity management
- **Cloud Firestore** - NoSQL document database με security rules
- **Firebase Cloud Functions** - Serverless backend logic
- **Firebase Storage** - File storage με access control

### Development & Testing
- **Vitest 3.2.4** - Unit testing framework
- **React Testing Library 16.3.0** - Component testing utilities
- **ESLint 9.36.0** - Code linting και style enforcement
- **TypeScript** - Type safety για Cloud Functions

## 🚀 Quick Start

### 1. Εγκατάσταση Dependencies
```bash
# Root dependencies
npm install

# Frontend dependencies
cd apps/layera-id
npm install

# Functions dependencies
cd ../../functions
npm install
```

### 2. Environment Setup
Δημιούργησε `.env.local` στο `apps/layera-id/`:
```bash
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 3. Firebase Setup
```bash
# Login στο Firebase
firebase login

# Initialize project
firebase init

# Start emulators για development
firebase emulators:start
```

### 4. Development Server
```bash
# Start React development server
cd apps/layera-id
npm run dev

# Server runs on http://localhost:5173
```

## 📁 Δομή Project

```
layera/
├── apps/
│   └── layera-id/              # React Frontend Application
│       ├── src/
│       │   ├── components/     # Reusable UI components
│       │   ├── contexts/       # React contexts (Auth, etc.)
│       │   ├── pages/          # Application pages
│       │   ├── test/           # Test setup και utilities
│       │   └── firebase.js     # Firebase configuration
│       ├── package.json
│       └── vite.config.js
├── functions/                  # Firebase Cloud Functions
│   ├── src/
│   │   └── index.ts           # Admin role management APIs
│   └── package.json
├── tools/
│   └── admin/                 # CLI administration tools
│       ├── set-role.mjs       # Role assignment script
│       └── check-user.mjs     # User status verification
├── docs/                      # Enterprise Documentation
│   ├── ARCHITECTURE.md        # System architecture
│   ├── API.md                 # API documentation
│   ├── SECURITY.md           # Security guidelines
│   ├── DEPLOYMENT.md         # Deployment procedures
│   └── README.md             # This file
├── firestore.rules           # Database security rules
├── storage.rules             # File storage security rules
├── firebase.json             # Firebase configuration
├── export-code.ps1          # Backup automation script
└── export-code.bat          # Backup automation (batch)
```

## 🔒 Μοντέλο Ασφάλειας

### Authentication Flow
1. **Email Registration** με αυτόματη verification
2. **Email Verification** υποχρεωτικό για όλες τις λειτουργίες
3. **Role Assignment** από admin (default: private)
4. **MFA Enrollment** για privileged roles (broker/builder/admin)
5. **Continuous Authorization** με custom claims validation

### Security Layers
```
┌─────────────────────────────────────────┐
│ 🌐 HTTPS & Security Headers            │
├─────────────────────────────────────────┤
│ 🔐 Firebase Authentication             │
├─────────────────────────────────────────┤
│ 📧 Email Verification (Required)       │
├─────────────────────────────────────────┤
│ 🔑 Multi-Factor Authentication (2FA)   │
├─────────────────────────────────────────┤
│ 👥 Role-Based Access Control (RBAC)    │
├─────────────────────────────────────────┤
│ 🛡️ Firestore Security Rules            │
├─────────────────────────────────────────┤
│ 📊 Audit Logging & Monitoring          │
└─────────────────────────────────────────┘
```

## 📚 Documentation Structure

### 🎯 Enterprise Documentation Suite
Το Layera ID documentation suite ακολουθεί enterprise standards με **bidirectional traceability** μεταξύ κώδικα και documentation.

### Για Developers
- **[Architecture Documentation](./ARCHITECTURE.md)** - Αρχιτεκτονική συστήματος και data flow
  - Cross-references: `AuthContext.jsx`, `PrivateRoute.jsx`, database schema
- **[API Documentation](./API.md)** - Πλήρης API reference με παραδείγματα
  - Cross-references: Cloud Functions, Authentication flows, Firestore APIs
- **[Security Documentation](./SECURITY.md)** - Security guidelines και best practices
  - Cross-references: Security rules, MFA implementation, audit logging

### Για DevOps
- **[Deployment Guide](./DEPLOYMENT.md)** - Production deployment procedures
  - Cross-references: Firebase configuration, CI/CD pipelines
- **[Code Mapping](./CODE_MAPPING.md)** - **Enterprise traceability matrix**
  - Bidirectional mapping μεταξύ κώδικα και documentation
- **[Backup Strategy](../README-EXPORT.md)** - Automated backup procedures

### 🔗 Documentation Cross-References
```
📄 README.md (this file)
├── 🏗️ ARCHITECTURE.md    ← System design & data flow
├── 🔌 API.md             ← Complete API reference
├── 🛡️ SECURITY.md        ← Security implementation
├── 🚀 DEPLOYMENT.md      ← Production procedures
└── 🗺️ CODE_MAPPING.md    ← Code-to-docs traceability
```

### 📖 Documentation Standards
- **Enterprise Compliance**: ISO 27001, SOC 2, GDPR traceability
- **Code Comments**: JSDoc με @see references σε documentation
- **Bidirectional Links**: Documentation → Code και Code → Documentation
- **Version Control**: Synchronized updates μεταξύ code και docs

## 🧪 Testing

### Unit Tests
```bash
# Frontend tests
cd apps/layera-id
npm run test

# Functions tests
cd functions
npm run test
```

### E2E Tests
```bash
# Start emulators
firebase emulators:start

# Run E2E tests
npm run test:e2e
```

### Security Testing
```bash
# Security audit
npm audit --audit-level high

# Firestore rules testing
firebase emulators:exec "npm run test:rules"
```

## 🔧 Development Commands

```bash
# Frontend development
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build
npm run test            # Run unit tests
npm run lint            # Lint code

# Functions development
npm run serve           # Start functions emulator
npm run shell           # Functions shell
npm run deploy          # Deploy functions
npm run logs            # View function logs

# Database
npm run db:backup       # Backup database
npm run db:restore      # Restore database
npm run rules:test      # Test security rules
```

## 📦 Production Deployment

### Prerequisites
```bash
# Firebase Blaze plan (για Cloud Functions)
# Custom domain configured
# SSL certificate active
# Environment variables set
```

### Deployment Process
```bash
# 1. Build και test
npm run build:all
npm run test:all

# 2. Deploy infrastructure
firebase deploy --only firestore:rules,functions

# 3. Deploy frontend
firebase deploy --only hosting

# 4. Verify deployment
npm run verify:production
```

## 👥 Team & Contributions

### Development Team
- **Frontend**: React specialists με Firebase experience
- **Backend**: Cloud Functions και Firestore experts
- **Security**: Enterprise security architects
- **DevOps**: Firebase και CI/CD specialists

### Contributing Guidelines
1. **Fork** the repository
2. **Create** feature branch (`git checkout -b feature/amazing-feature`)
3. **Follow** coding standards (ESLint configuration)
4. **Write** comprehensive tests
5. **Update** documentation
6. **Submit** pull request με detailed description

## 📈 Roadmap

### Phase 1 - Core Platform (Completed ✅)
- [x] Firebase Authentication setup
- [x] RBAC implementation
- [x] MFA enforcement
- [x] Security rules implementation
- [x] Admin tools development

### Phase 2 - Enhanced Security (In Progress 🚧)
- [ ] OAuth providers integration (Google, Microsoft)
- [ ] Advanced audit logging
- [ ] Real-time security monitoring
- [ ] Automated threat detection

### Phase 3 - Enterprise Features (Planned 📋)
- [ ] Single Sign-On (SSO) integration
- [ ] Advanced user management UI
- [ ] Compliance reporting (GDPR, SOC2)
- [ ] Multi-tenant architecture

## 🆘 Support & Documentation

### Getting Help
- **Documentation**: Comprehensive docs στο `/docs` folder
- **Issues**: GitHub Issues για bug reports
- **Discussions**: GitHub Discussions για questions
- **Email**: security@layera.com για security issues

### Emergency Contacts
- **Security Incidents**: security@layera.com
- **Critical Bugs**: urgent@layera.com
- **Infrastructure Issues**: devops@layera.com

## 📄 License

This project is proprietary software owned by Layera Ltd. All rights reserved.

**Enterprise License** - Contact licensing@layera.com για enterprise usage.

---

**Version**: 1.0
**Last Updated**: 17/10/2025
**Maintainer**: Layera Development Team
**Status**: Production Ready ✅