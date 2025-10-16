import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError('Οι κωδικοί δεν ταιριάζουν');
    }

    if (password.length < 6) {
      return setError('Ο κωδικός πρέπει να έχει τουλάχιστον 6 χαρακτήρες');
    }

    try {
      setError('');
      setLoading(true);

      // Δημιουργία λογαριασμού
      const { user } = await signup(email, password);

      // Ενημέρωση προφίλ με όνομα χρήστη
      if (displayName) {
        await updateUserProfile(displayName, null);
      }

      navigate('/dashboard');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Το email χρησιμοποιείται ήδη');
      } else if (error.code === 'auth/weak-password') {
        setError('Ο κωδικός είναι πολύ αδύναμος');
      } else if (error.code === 'auth/invalid-email') {
        setError('Μη έγκυρη διεύθυνση email');
      } else {
        setError('Αποτυχία εγγραφής. Παρακαλώ προσπαθήστε ξανά.');
      }
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Εγγραφή</h2>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="displayName">Όνομα Χρήστη</label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Εισάγετε το όνομά σας"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Εισάγετε το email σας"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Κωδικός *</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Τουλάχιστον 6 χαρακτήρες"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Επιβεβαίωση Κωδικού *</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Εισάγετε ξανά τον κωδικό"
            />
          </div>

          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Εγγραφή...' : 'Εγγραφή'}
          </button>
        </form>

        <div className="auth-links">
          <p>
            Έχετε ήδη λογαριασμό; <Link to="/login">Σύνδεση</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;