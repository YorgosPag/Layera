import React, { useState } from 'react';
import { useAuthContext, GoogleSignInButton } from '@layera/auth-bridge';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp, signInWithGoogle } = useAuthContext();
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

      // Δημιουργία λογαριασμού με auth-bridge
      const result = await signUp({
        email,
        password,
        displayName: displayName || undefined
      });

      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Αποτυχία εγγραφής. Παρακαλώ προσπαθήστε ξανά.');
      }
    } catch (error) {
      setError('Αποτυχία εγγραφής. Παρακαλώ προσπαθήστε ξανά.');
      console.error(error);
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);

      const result = await signInWithGoogle();

      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Αποτυχία σύνδεσης με Google');
      }
    } catch (error) {
      setError('Αποτυχία σύνδεσης με Google');
      console.error(error);
    } finally {
      setLoading(false);
    }
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

        <div className="auth-divider">
          <span>ή</span>
        </div>

        <GoogleSignInButton
          onClick={handleGoogleSignIn}
          disabled={loading}
        />

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