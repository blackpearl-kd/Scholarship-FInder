import React from 'react';
import Layout from '../components/Layout/Layout';
import { Users, Award, Search, Shield } from 'lucide-react';

const About: React.FC = () => {
  return (
    <Layout>
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">About ScholarHub</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connecting ambitious students with scholarship opportunities to help them achieve their educational dreams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                At ScholarHub, we believe that financial constraints should never prevent talented students from accessing quality education. Our mission is to democratize access to educational funding by connecting students with scholarship opportunities that match their unique profiles and aspirations.
              </p>
              <p className="text-gray-600">
                We've helped thousands of students discover and secure scholarships, making their educational dreams a reality while reducing the burden of student debt.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">What Sets Us Apart</h2>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="bg-blue-100 p-2 rounded-full mr-3">
                    <Search className="h-5 w-5 text-blue-600" />
                  </span>
                  <div>
                    <strong className="block text-gray-800">Smart Search</strong>
                    Personalized scholarship matching based on your academic profile, interests, and eligibility criteria.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 p-2 rounded-full mr-3">
                    <Users className="h-5 w-5 text-green-600" />
                  </span>
                  <div>
                    <strong className="block text-gray-800">Comprehensive Database</strong>
                    Access to thousands of verified scholarships from reputable providers across various fields and levels.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-100 p-2 rounded-full mr-3">
                    <Award className="h-5 w-5 text-purple-600" />
                  </span>
                  <div>
                    <strong className="block text-gray-800">Success Rate</strong>
                    Higher application success rates through our curated opportunities and application guidance.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">$50M+</div>
                <p className="text-gray-600">Scholarship Funding Secured</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
                <p className="text-gray-600">Students Helped</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">1,000+</div>
                <p className="text-gray-600">Active Scholarships</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Commitment to Privacy</h2>
            <div className="flex justify-center mb-6">
              <Shield className="h-16 w-16 text-blue-600" />
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We take your privacy seriously. All your personal information is encrypted and securely stored. We never share your data with third parties without your explicit consent.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;