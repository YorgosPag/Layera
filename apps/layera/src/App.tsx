import React from 'react';
import { ThemeProvider } from '../../../packages/theme-switcher/src';
import { TolgeeProvider } from '@layera/tolgee';
import { AuthProvider, initializeFirebaseApp } from '@layera/auth-bridge';
import { AppContent } from './components/AppContent';
import { useColorPersistence } from './hooks/useColorPersistence';

// Initialize Firebase για auth-bridge
try {
  const firebaseConfig = {
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo-project',
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-api-key',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'demo-project.firebaseapp.com',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'demo-project.appspot.com',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:123456789:web:demo-app-id',
  };

  // Έλεγχος αν έχουμε πραγματικά credentials
  if (firebaseConfig.apiKey === 'demo-api-key') {
  } else {
    initializeFirebaseApp(firebaseConfig);
  }
} catch (error) {
}

function App(): React.ReactElement {
  // Αυτόματη φόρτωση και εφαρμογή αποθηκευμένων χρωμάτων
  useColorPersistence();

  return (
    <TolgeeProvider>
      <ThemeProvider>
        <AuthProvider
          callbacks={{
            onSignIn: (_user) => {},
            onSignOut: () => {},
            onRoleChange: (_newRole, _oldRole) => {},
            onMfaChange: (_status) => {}
          }}
        >
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </TolgeeProvider>
  );
}

export default App;