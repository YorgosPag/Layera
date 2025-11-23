import React from 'react';
import { ThemeProvider } from '../../../packages/theme-switcher/src';
import { TolgeeProvider } from '@layera/tolgee';
import { AuthProvider, initializeFirebaseApp } from '@layera/auth-bridge';
import { AppContent } from './components/AppContent';
// useColorPersistence functionality merged into useStorage
import { FactorySettingsService } from './services/factorySettingsService';

// Initialize Firebase πρώτα
const firebaseConfig = {
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Αρχικοποίηση Firebase
if (firebaseConfig.apiKey && firebaseConfig.projectId) {
  try {
    initializeFirebaseApp(firebaseConfig);
    // Firebase αρχικοποιήθηκε επιτυχώς

    // Αρχικοποίηση εργοστασιακών ρυθμίσεων
    setTimeout(async () => {
      try {
        // Αρχικοποίηση εργοστασιακών ρυθμίσεων

        await FactorySettingsService.initializeFactorySettings();
        // Εργοστασιακές ρυθμίσεις αρχικοποιήθηκαν επιτυχώς

        await FactorySettingsService.deleteAllUserSettings();
        // Παλιές ρυθμίσεις χρηστών διαγράφηκαν

      } catch (error: unknown) {
        const errorMessage = error instanceof Error
          ? (('code' in error ? (error as Error & { code?: string }).code : undefined) || error.message)
          : String(error);
        // Σφάλμα εργοστασιακών ρυθμίσεων
        // Χρήση τοπικών εργοστασιακών ρυθμίσεων
      }
    }, 1000);

  } catch (error) {
    // Firebase αρχικοποίηση απέτυχε
  }
} else {
  // Demo mode - δεν υπάρχουν Firebase credentials
}

function App(): React.ReactElement {
  // Color persistence now handled by useStorage hook in playground components

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