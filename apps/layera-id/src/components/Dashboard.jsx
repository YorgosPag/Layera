import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { currentUser, logout, claims } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Σφάλμα κατά την αποσύνδεση:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <h1>Leyera</h1>
        </div>
        <div className="nav-user">
          <span className="user-email">{currentUser?.email}</span>
          <button onClick={handleLogout} className="logout-button">
            Αποσύνδεση
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>Καλώς ήρθατε στο Leyera!</h2>
          <p>Συνδεθήκατε επιτυχώς με το email: <strong>{currentUser?.email}</strong></p>

          {currentUser?.displayName && (
            <p>Όνομα χρήστη: <strong>{currentUser.displayName}</strong></p>
          )}

          <div className="user-info">
            <h3>Πληροφορίες Χρήστη</h3>
            <ul>
              <li><strong>User ID:</strong> {currentUser?.uid}</li>
              <li><strong>Email Verified:</strong> {currentUser?.emailVerified ? 'Ναι' : 'Όχι'}</li>
              <li><strong>Ρόλος:</strong> {claims?.role === 'admin' ? 'Διαχειριστής' : claims?.role === 'broker' ? 'Μεσίτης' : claims?.role === 'builder' ? 'Κατασκευαστής' : 'Ιδιώτης'}</li>
              <li><strong>2FA:</strong> {claims?.mfa ? 'Ενεργό' : 'Ανενεργό'}</li>
              <li><strong>Account Created:</strong> {currentUser?.metadata?.creationTime}</li>
              <li><strong>Last Sign In:</strong> {currentUser?.metadata?.lastSignInTime}</li>
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;