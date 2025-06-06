import React from 'react';
import { Link } from 'react-router-dom';
import NotificationPanel from '../Notification/NotificationPanel';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              Scholarship Finder
            </Link>
            <div className="flex items-center space-x-6">
              <Link to="/scholarships" className="text-gray-600 hover:text-gray-900">
                Scholarships
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
              <Link to="/resources" className="text-gray-600 hover:text-gray-900">
                Resources
              </Link>
              <NotificationPanel />
            </div>
          </div>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="bg-white border-t mt-auto">
        <div className="container mx-auto px-6 py-8">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} Scholarship Finder. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;