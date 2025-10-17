import React, { useState } from 'react';
import { useAuthContext } from '@layera/auth-bridge';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, loading } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setIsLoading(true);

    const result = await signIn({
      email,
      password,
      rememberMe: true
    });

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Αποτυχία σύνδεσης. Παρακαλώ ελέγξτε τα στοιχεία σας.');
    }

    setIsLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Σύνδεση</h2>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
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
            <label htmlFor="password">Κωδικός</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Εισάγετε τον κωδικό σας"
            />
          </div>

          <button type="submit" disabled={isLoading || loading} className="submit-button">
            {(isLoading || loading) ? 'Σύνδεση...' : 'Σύνδεση'}
          </button>
        </form>

        <div className="auth-links">
          <Link to="/forgot-password">Ξεχάσατε τον κωδικό σας;</Link>
          <p>
            Δεν έχετε λογαριασμό; <Link to="/register">Εγγραφή</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;