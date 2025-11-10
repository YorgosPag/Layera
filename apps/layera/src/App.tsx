import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import RealEstatePage from './components/RealEstatePage';
import JobsPage from './components/JobsPage';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen la-bg-surface-light">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/marketplace" element={<RealEstatePage />} />
          <Route path="/jobs" element={<JobsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;