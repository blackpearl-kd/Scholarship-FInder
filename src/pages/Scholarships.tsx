import React from 'react';
import { Layout } from '../components/layout/Layout';
import { ScholarshipList } from '../components/scholarships/ScholarshipList';

export const Scholarships: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Browse Scholarships
          </h1>
          <p className="text-lg text-gray-600">
            Find and filter scholarships that match your academic profile and interests
          </p>
        </div>
        
        <ScholarshipList />
      </div>
    </Layout>
  );
};