import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      setError('Αποτυχία σύνδεσης. Παρακαλώ ελέγξτε τα στοιχεία σας.');
      console.error(error);
    }

    setLoading(false);
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

          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Σύνδεση...' : 'Σύνδεση'}
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