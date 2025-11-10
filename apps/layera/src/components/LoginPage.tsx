import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center la-bg-surface-light">
      <div className="la-auth-card la-bg-primary">
        <div className="text-center la-mb-8">
          <h1 className="la-text-3xl la-font-bold la-text-primary la-leading-tight la-mb-2">Είσοδος</h1>
          <p className="la-text-base la-text-secondary la-leading-normal">Συνδεθείτε στο λογαριασμό σας</p>
        </div>

        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="la-form-label la-text-sm la-font-medium la-text-primary">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="la-form-input"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="la-form-label la-text-sm la-font-medium la-text-primary">
              Κωδικός
            </label>
            <input
              type="password"
              id="password"
              className="la-form-input"
              placeholder="Εισάγετε τον κωδικό σας"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg la-btn-primary"
          >
            Είσοδος
          </button>
        </form>

        <div className="la-mt-6 text-center">
          <p className="la-text-secondary">
            Δεν έχετε λογαριασμό;{' '}
            <a href="#" className="la-text-primary la-transition-opacity la-hover-opacity">
              Εγγραφείτε εδώ
            </a>
          </p>
        </div>

        <div className="la-mt-8 text-center">
          <Link to="/" className="la-text-primary la-transition-opacity la-hover-opacity">
            ← Επιστροφή στην Αρχική
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;