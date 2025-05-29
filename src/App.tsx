import React from 'react';
import { Home } from './pages/Home';
import { Scholarships } from './pages/Scholarships';
import { ScholarshipDetail } from './pages/ScholarshipDetail';
import { Dashboard } from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';
import { ScholarshipProvider } from './context/ScholarshipContext';

function App() {
  // For demo purposes, we'll implement a simple routing mechanism
  const path = window.location.pathname;

  // Wrap the entire app with providers
  return (
    <AuthProvider>
      <ScholarshipProvider>
        {renderRoutes(path)}
      </ScholarshipProvider>
    </AuthProvider>
  );
}

function renderRoutes(path: string) {
  if (path === '/' || path === '') {
    return <Home />;
  } else if (path === '/scholarships') {
    return <Scholarships />;
  } else if (path.startsWith('/scholarship/')) {
    return <ScholarshipDetail />;
  } else if (path === '/dashboard') {
    return <Dashboard />;
  } else {
    // Default to home page
    return <Home />;
  }
}

export default App;