import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { RoleGuard, useAuthContext } from '@layera/auth-bridge'
import { ThemeProvider } from '@layera/theme-switcher'
import '../../../packages/theme-switcher/dist/styles.css'
import Login from './components/Login'
import Register from './components/Register'
import NewDashboard from './components/NewDashboard'
import Verify from './components/Verify'
import MfaEnroll from './components/MfaEnroll'
import Account from './pages/Account'
import Settings from './pages/Settings'
import Data from './pages/Data'
import AdminRoles from './pages/AdminRoles'
import Support from './components/Support'
import './App.css'

// Protected Route wrapper που χρησιμοποιεί το νέο RoleGuard
function ProtectedRoute({ children, requiredRole, allowedRoles }) {
  const { user, loading } = useAuthContext()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Φόρτωση...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <RoleGuard
      requiredRole={requiredRole}
      allowedRoles={allowedRoles}
      fallback={<Navigate to="/login" replace />}
      emailVerificationRequired={<Navigate to="/verify" replace />}
      mfaRequired={<Navigate to="/mfa-enroll" replace />}
    >
      {children}
    </RoleGuard>
  )
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="layera-id-theme">
      <Router>
        <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/mfa-enroll" element={<MfaEnroll />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <NewDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/data"
          element={
            <ProtectedRoute>
              <Data />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/roles"
          element={
            <ProtectedRoute allowedRoles={['broker', 'builder', 'admin']}>
              <AdminRoles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-roles"
          element={
            <ProtectedRoute allowedRoles={['private', 'broker', 'builder', 'admin']}>
              <AdminRoles />
            </ProtectedRoute>
          }
        />
        <Route path="/support" element={<Support />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
