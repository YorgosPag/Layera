import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Είσοδος</h1>
          <p className="text-gray-600">Συνδεθείτε στο λογαριασμό σας</p>
        </div>

        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Κωδικός
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Εισάγετε τον κωδικό σας"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Είσοδος
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Δεν έχετε λογαριασμό;{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700">
              Εγγραφείτε εδώ
            </a>
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            ← Επιστροφή στην Αρχική
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;