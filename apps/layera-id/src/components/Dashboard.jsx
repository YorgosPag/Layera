import React from 'react';
import { useAuthContext, UserDisplay, UserAvatar } from '@layera/auth-bridge';
import { useNavigate, Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { user, signOut } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await signOut();
    if (result.success) {
      navigate('/login');
    } else {
      console.error('Σφάλμα κατά την αποσύνδεση:', result.error);
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <h1>Layera</h1>
        </div>
        <div className="nav-user">
          {user && (
            <>
              <UserAvatar
                user={user}
                size="medium"
                onClick={() => navigate('/account')}
              />
              <span className="user-email">{user.email}</span>
              <button onClick={handleLogout} className="logout-button">
                Αποσύνδεση
              </button>
            </>
          )}
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>Καλώς ήρθατε στο Layera!</h2>
          {user && (
            <>
              <p>Συνδεθήκατε επιτυχώς με το email: <strong>{user.email}</strong></p>

              {user.displayName && (
                <p>Όνομα χρήστη: <strong>{user.displayName}</strong></p>
              )}

              <div className="user-info">
                <h3>Πληροφορίες Χρήστη</h3>

                {/* Χρήση του νέου UserDisplay component */}
                <UserDisplay
                  user={user}
                  showEmail
                  showRole
                  showMfaStatus
                  showEmailVerification
                  size="large"
                />

                <ul className="mt-4">
                  <li><strong>User ID:</strong> {user.uid}</li>
                  <li><strong>Account Created:</strong> {user.metadata?.creationTime}</li>
                  <li><strong>Last Sign In:</strong> {user.metadata?.lastSignInTime}</li>
            </ul>
          </div>

          <div className="dashboard-actions">
            <h3>Ενέργειες</h3>
            <div className="action-buttons">
              <Link to="/account">
                <button className="action-button">Ο λογαριασμός μου</button>
              </Link>
              <button className="action-button">Ρυθμίσεις</button>
              <button className="action-button">Δεδομένα</button>
              {!claims?.mfa && (
                <Link to="/mfa-enroll">
                  <button className="action-button" style={{ backgroundColor: '#28a745' }}>
                    Ενεργοποίηση 2FA
                  </button>
                </Link>
              )}
              {claims?.role === 'admin' && (
                <Link to="/admin/roles">
                  <button className="action-button" style={{ backgroundColor: '#dc3545' }}>
                    Διαχείριση ρόλων
                  </button>
                </Link>
              )}
            </div>
          </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;