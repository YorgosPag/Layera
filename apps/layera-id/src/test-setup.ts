import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

// Mock Firebase Auth
const mockAuth = {
  currentUser: null,
  onAuthStateChanged: vi.fn(),
  signOut: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  sendEmailVerification: vi.fn(),
};

// Mock Firebase
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => mockAuth),
  onAuthStateChanged: vi.fn(),
  signOut: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  sendEmailVerification: vi.fn(),
  GoogleAuthProvider: vi.fn(),
  signInWithPopup: vi.fn(),
}));

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(),
  getApps: vi.fn(() => []),
}));

// Mock environment variables - TEST DATA ONLY
Object.defineProperty(import.meta, 'env', {
  value: {
    VITE_FIREBASE_API_KEY: 'MOCK_TEST_API_KEY_NOT_REAL',
    VITE_FIREBASE_AUTH_DOMAIN: 'mock-test.firebaseapp.com',
    VITE_FIREBASE_PROJECT_ID: 'mock-test-project',
    VITE_FIREBASE_STORAGE_BUCKET: 'mock-test.appspot.com',
    VITE_FIREBASE_MESSAGING_SENDER_ID: 'MOCK_123456789',
    VITE_FIREBASE_APP_ID: 'MOCK_TEST_APP_ID_NOT_REAL',
  },
  writable: true,
});

// Global test utilities
declare global {
  var renderWithProviders: (ui: React.ReactElement, options?: any) => any;
}

global.renderWithProviders = (ui: React.ReactElement, options = {}) => {
  // Helper function για rendering με providers
  return render(ui, options);
};