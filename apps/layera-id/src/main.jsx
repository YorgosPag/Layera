import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider, initializeFirebaseApp } from '@layera/auth-bridge'
import './index.css'
import App from './App.jsx'

// Initialize Firebase with Layera configuration
initializeFirebaseApp({
  projectId: 'layera-auth',
  apiKey: 'AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  authDomain: 'layera-auth.firebaseapp.com',
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
