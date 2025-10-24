/**
 * 🧪 Enterprise Test Setup
 * Jest configuration για ESCO database testing
 */

import { initializeApp, deleteApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// Global test configuration
const TEST_CONFIG = {
  firebaseConfig: {
    projectId: 'layera-esco-test',
    storageBucket: 'layera-esco-test.appspot.com'
  },
  emulator: {
    host: 'localhost',
    port: 8080
  }
};

// Initialize Firebase για testing
let testApp: any;
let testDb: any;

beforeAll(async () => {
  // Initialize Firebase app για tests
  testApp = initializeApp(TEST_CONFIG.firebaseConfig, 'test-app');
  testDb = getFirestore(testApp);

  // Connect to Firestore emulator
  try {
    connectFirestoreEmulator(testDb, TEST_CONFIG.emulator.host, TEST_CONFIG.emulator.port);
    console.log('🔧 Connected to Firestore Emulator για testing');
  } catch (error) {
    console.warn('⚠️ Could not connect to Firestore Emulator:', error);
  }
});

afterAll(async () => {
  // Cleanup after tests
  if (testApp) {
    await deleteApp(testApp);
  }
});

// Export για use στα tests
export { testDb, TEST_CONFIG };

// Global mocks
global.console = {
  ...console,
  // Suppress debug logs during tests
  debug: jest.fn(),
  log: jest.fn()
};