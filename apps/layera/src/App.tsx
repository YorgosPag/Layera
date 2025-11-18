import React from 'react';
import { ThemeProvider } from '../../../packages/theme-switcher/src';
import { TolgeeProvider } from '@layera/tolgee';
import { AuthProvider, initializeFirebaseApp } from '@layera/auth-bridge';
import { AppContent } from './components/AppContent';
import { useColorPersistence } from './hooks/useColorPersistence';
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
    console.log('✅ Firebase αρχικοποιήθηκε επιτυχώς');

    // Αρχικοποίηση εργοστασιακών ρυθμίσεων
    setTimeout(async () => {
      try {
        console.log('🚀 Αρχικοποίηση εργοστασιακών ρυθμίσεων στο Firebase...');

        await FactorySettingsService.initializeFactorySettings();
        console.log('✅ Εργοστασιακές ρυθμίσεις αρχικοποιήθηκαν επιτυχώς');

        await FactorySettingsService.deleteAllUserSettings();
        console.log('✅ Παλιές ρυθμίσεις χρηστών διαγράφηκαν');

      } catch (error: unknown) {
        console.error('❌ Σφάλμα εργοστασιακών ρυθμίσεων:', error instanceof Error ? (error.code || error.message) : String(error));
        console.log('💡 Χρήση τοπικών εργοστασιακών ρυθμίσεων');
      }
    }, 1000);

  } catch (error) {
    console.error('❌ Firebase αρχικοποίηση απέτυχε:', error);
  }
} else {
  // Demo mode - δεν υπάρχουν Firebase credentials
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