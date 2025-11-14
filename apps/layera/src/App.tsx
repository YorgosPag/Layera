import React from 'react';
import { ThemeProvider } from '../../../packages/theme-switcher/src';
import { TolgeeProvider } from '@layera/tolgee';
import { AuthProvider, initializeFirebaseApp } from '@layera/auth-bridge';
import { AppContent } from './components/AppContent';

// Initialize Firebase για auth-bridge
initializeFirebaseApp({
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
});

function App(): React.ReactElement {
  return (
    <TolgeeProvider>
      <ThemeProvider>
        <AuthProvider
          callbacks={{
            onSignIn: (user) => console.log('🔐 User signed in:', user.email),
            onSignOut: () => console.log('🔐 User signed out'),
            onRoleChange: (newRole, oldRole) => console.log('👤 Role changed:', { newRole, oldRole }),
            onMfaChange: (status) => console.log('🔒 MFA status:', status)
          }}
        >
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </TolgeeProvider>
  );
}

export default App;