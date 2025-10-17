import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PrivateRoute({ children, requirePro = false }) {
  const { currentUser, loading, claims } = useAuth();

  if (loading) return null;
  if (!currentUser) return <Navigate to="/login" replace />;
  if (!currentUser.emailVerified) return <Navigate to="/verify" replace />;

  // Για επαγγελματικές σελίδες απαιτείται 2FA
  if (requirePro && !claims?.mfa) {
    return <Navigate to="/mfa-enroll" replace />;
  }

  return children;
}