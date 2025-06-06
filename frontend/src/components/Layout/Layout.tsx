import React from 'react';
import { Link } from 'react-router-dom';
import NotificationPanel from '../Notification/NotificationPanel';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
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