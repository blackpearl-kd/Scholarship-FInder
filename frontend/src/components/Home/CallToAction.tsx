import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CallToAction: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Find Your Perfect Scholarship?
        </h2>
        <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
          Join thousands of students who have discovered and secured funding for their education through ScholarHub.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          {!isAuthenticated && (
            <Link 
              to="/signup"
              className="bg-white text-indigo-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition duration-200"
            >
              Create Free Account
            </Link>
          )}
          <Link 
            to="/scholarships"
            className="bg-transparent hover:bg-indigo-700 text-white border border-white px-8 py-3 rounded-lg font-medium transition duration-200"
          >
            Browse Scholarships
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;