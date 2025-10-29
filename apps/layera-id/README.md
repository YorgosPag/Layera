# Layera ID - Enterprise Authentication System

Συστήμα επιχειρηματικής ταυτοποίησης για την πλατφόρμα Layera με πλήρη υποστήριξη i18n και MFA.

## Τεχνολογίες

- **React 19** με Vite για γρήγορη ανάπτυξη
- **Firebase Authentication** με MFA (SMS-based)
- **Enterprise i18n System** (@layera/tolgee) με δυναμική εναλλαγή γλωσσών
- **Monorepo Architecture** με shared packages
- **React Router v6** για navigation
- **Modern CSS** με responsive design

## Χαρακτηριστικά

### 🔐 Ασφάλεια & Ταυτοποίηση
- Σύνδεση με email/password
- Google OAuth integration
- Two-Factor Authentication (2FA) με SMS
- Role-based access control (admin, broker, builder, private)
- Email verification

### 🌍 Διεθνοποίηση (i18n)
- **Πλήρης υποστήριξη Ελληνικών και Αγγλικών**
- Dynamic language switching με LanguageSwitcher component
- Enterprise-grade translation system με namespace organization
- Template variables υποστήριξη: `{{name}}`, `{{email}}`
- Hierarchical translation keys structure

### 📱 Διεπαφή Χρήστη
- Modern responsive design
- Professional navigation με user avatars
- Dashboard με user information και quick actions
- Account management σελίδα
- Settings με security και appearance options
- Data management και export functionality
- Consistent styling across all pages

### 🏗️ Αρχιτεκτονική
- Monorepo structure με shared packages
- `@layera/auth-bridge` για authentication logic
- `@layera/tolgee` για internationalization
- Modular component design
- Enterprise-ready code organization

## Σελίδες & Λειτουργίες

### Dashboard (`/dashboard`)
- Welcome message με username display
- User information panel με status indicators
- Quick actions: Account, Settings, Data, Enable 2FA
- Admin panel access για admin users

### Account Management (`/account`)
- User profile information
- MFA status και email verification status
- Role display με badges
- Account security messages

### Settings (`/settings`)
- **Security & Personal Data**: Password change, 2FA management, Email verification
- **Notifications**: Email και SMS notifications toggle
- **Appearance**: Theme selection (Light/Dark/Auto), Language selection
- **Danger Zone**: Account deletion

### Data Management (`/data`)
- Personal information display
- Security status overview
- Device και connection information
- **Data Export**: PDF, JSON, CSV formats
- Privacy policy information
- GDPR compliance information

### MFA Enrollment (`/mfa-enroll`)
- SMS-based 2FA setup
- Phone number validation με international format
- Security benefits explanation
- Error handling για Firebase MFA issues

## Translation System

### Namespace Organization
```
common.json       # Shared translations (navigation, auth, errors, etc.)
dashboard.json    # Dashboard-specific translations
```

### Translation Keys Structure
```javascript
// Navigation
t('navigation.dashboard')     // "Dashboard" / "Πίνακας Ελέγχου"
t('navigation.logout')        // "Logout" / "Αποσύνδεση"

// User roles
t('roles.admin')             // "Administrator" / "Διαχειριστής"
t('roles.private')           // "Private" / "Ιδιώτης"

// Status indicators
t('status.verified')         // "Verified" / "Επιβεβαιωμένο"
t('status.enabled')          // "Enabled" / "Ενεργοποιημένο"

// MFA system
t('mfa.title')              // "Enable 2FA" / "Ενεργοποίηση 2FA"
t('mfa.errors.invalidPhoneNumber') // Error messages

// Template variables
t('dashboard:welcome', { name: user.displayName }) // "Welcome, {{name}}!"
t('dashboard:user.successfulLogin', { email: user.email })
```

### Language Switcher
Κάθε σελίδα περιλαμβάνει LanguageSwitcher component στο header:
```tsx
import React from 'react';
import { LanguageSwitcher } from '@layera/tolgee';

<LanguageSwitcher
  variant="toggle"
  className="language-switcher-nav"
  showFlags={true}
/>
```

## Εγκατάσταση & Εκτέλεση

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Serve production build
npm run serve
```

## Environment Variables

Απαιτείται `.env` αρχείο με Firebase configuration:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
```

## Firebase Setup

1. **Authentication Methods**: Email/Password, Google
2. **MFA Configuration**: SMS-based 2FA enabled
3. **Custom Claims**: Role management (admin, broker, builder, private)
4. **Security Rules**: Proper role-based access control

## Code Quality

- **No mixed language expressions** - Όλα τα strings χρησιμοποιούν translation keys
- **Consistent styling** με modern CSS practices
- **Enterprise naming conventions**
- **Proper error handling** για authentication και MFA
- **Responsive design** για mobile και desktop
- **Type safety** με prop validation

## Δομή Project

```
src/
├── components/
│   ├── Dashboard.jsx       # Main dashboard με user info
│   ├── MfaEnroll.jsx      # 2FA enrollment page
│   └── *.css              # Component-specific styles
├── pages/
│   ├── Account.jsx        # Account management
│   ├── Settings.jsx       # User settings
│   ├── Data.jsx           # Data management
│   └── *.css             # Page-specific styles
└── firebase.js           # Firebase configuration
```

## Development Notes

- Χρησιμοποιεί React 19 με modern hooks και patterns
- Enterprise-ready monorepo architecture
- Full TypeScript support στα packages
- Modern CSS με gradients και animations
- Consistent error handling και user feedback
- GDPR compliance considerations

## Recent Updates

- ✅ Πλήρης μετάφραση όλων των σελίδων (Dashboard, Account, Settings, Data, MFA)
- ✅ LanguageSwitcher integration σε όλες τις σελίδες
- ✅ Fixed namespace issues στο translation system
- ✅ Enterprise-grade i18n organization
- ✅ Removed mixed language expressions
- ✅ Modern responsive UI με consistent styling