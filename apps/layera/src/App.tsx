import React from 'react';
import { ThemeProvider } from '../../../packages/theme-switcher/src';
import { TolgeeProvider } from '@layera/tolgee';
import { AuthProvider, initializeFirebaseApp } from '@layera/auth-bridge';
import { AppContent } from './components/AppContent';

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
    console.log('🔧 Using demo Firebase credentials - database features disabled');
  } else {
    initializeFirebaseApp(firebaseConfig);
    console.log('🔥 Firebase initialized successfully');
  }
} catch (error) {
  console.warn('⚠️ Firebase initialization failed:', error);
  console.log('🔄 Application will continue without Firebase features');
}

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