import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '@layera/auth-bridge';

interface PrivateRouteProps {
  children: React.ReactNode;
  requirePro?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requirePro = false }) => {
  const { user: currentUser, loading } = useAuthContext();
  const claims = currentUser?.layeraClaims;

  if (loading) return null;
  if (!currentUser) return <Navigate to="/login" replace />;
  if (!currentUser.emailVerified) return <Navigate to="/verify" replace />;

  // Για επαγγελματικές σελίδες απαιτείται 2FA
  if (requirePro && !claims?.mfaVerified) {
    return <Navigate to="/mfa-enroll" replace />;
  }

  return children;
};

export default PrivateRoute;