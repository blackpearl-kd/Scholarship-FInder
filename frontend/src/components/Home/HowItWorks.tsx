import React from 'react';
import { UserCircle, Search, GraduationCap } from 'lucide-react';

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-5 inline-flex items-center justify-center mb-6">
              <UserCircle className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Create Your Profile</h3>
            <p className="text-gray-600">
              Sign up and create your profile with educational details and preferences to get personalized scholarship recommendations.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 rounded-full p-5 inline-flex items-center justify-center mb-6">
              <Search className="h-10 w-10 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Discover Scholarships</h3>
            <p className="text-gray-600">
              Browse through thousands of scholarships and use filters to find the perfect match for your academic journey.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-amber-100 rounded-full p-5 inline-flex items-center justify-center mb-6">
              <GraduationCap className="h-10 w-10 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Apply and Succeed</h3>
            <p className="text-gray-600">
              Submit your applications through our platform and track your application status all in one place.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;