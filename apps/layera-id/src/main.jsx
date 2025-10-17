import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider, initializeFirebaseApp } from '@layera/auth-bridge'
import './index.css'
import App from './App.jsx'

// Initialize Firebase with Layera configuration
initializeFirebaseApp({
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  requireEmailVerification: true,
  mfaEnabled: true,
  defaultRole: 'private'
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider
      callbacks={{
        onSignIn: (user) => {
          console.log('User signed in:', user.email, 'Role:', user.layeraClaims.role)
        },
        onSignOut: () => {
          console.log('User signed out')
        },
        onRoleChange: (newRole, oldRole) => {
          console.log('Role changed from', oldRole, 'to', newRole)
        }
      }}
    >
      <App />
    </AuthProvider>
  </StrictMode>,
)
