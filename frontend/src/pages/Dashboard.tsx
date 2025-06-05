import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bell, Settings, Book, Award, PieChart, Bookmark } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import { useScholarships } from '../context/ScholarshipContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { scholarships, savedScholarships } = useScholarships();
  
  const savedScholarshipsList = scholarships.filter(scholarship => 
    savedScholarships.includes(scholarship.id)
  );

  // Mock data for the dashboard
  const applicationStats = {
    submitted: 3,
    inProgress: 2,
    drafts: 1
  };

  const upcomingDeadlines = scholarships
    .filter(s => new Date(s.deadline) > new Date())
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 3);

  return (
    <Layout>
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name}</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button className="bg-white p-2 rounded-full shadow-sm text-gray-500 hover:text-blue-600">
                <Bell className="h-5 w-5" />
              </button>
              <button className="bg-white p-2 rounded-full shadow-sm text-gray-500 hover:text-blue-600">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Applications</p>
                  <h3 className="text-2xl font-semibold text-gray-800">{applicationStats.submitted + applicationStats.inProgress}</h3>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <Bookmark className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Saved Scholarships</p>
                  <h3 className="text-2xl font-semibold text-gray-800">{savedScholarshipsList.length}</h3>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <PieChart className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Profile Completion</p>
                  <h3 className="text-2xl font-semibold text-gray-800">85%</h3>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="font-semibold text-gray-800">Your Applications</h2>
              </div>
              <div className="p-6">
                <div className="flex space-x-4 mb-6">
                  <button className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm">All</button>
                  <button className="bg-gray-100 text-gray-700 px-4 py-1 rounded-full text-sm hover:bg-gray-200">Submitted</button>
                  <button className="bg-gray-100 text-gray-700 px-4 py-1 rounded-full text-sm hover:bg-gray-200">In Progress</button>
                  <button className="bg-gray-100 text-gray-700 px-4 py-1 rounded-full text-sm hover:bg-gray-200">Drafts</button>
                </div>
                
                {applicationStats.submitted + applicationStats.inProgress + applicationStats.drafts > 0 ? (
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-800">Future Leaders Scholarship</h3>
                          <p className="text-gray-600 text-sm">Bright Futures Foundation</p>
                        </div>
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Submitted</span>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        Submitted on: June 5, 2025
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-800">Global Scholars Program</h3>
                          <p className="text-gray-600 text-sm">International Education Institute</p>
                        </div>
                        <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">In Progress</span>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        Last updated: May 28, 2025
                      </div>
                      <button className="mt-3 text-blue-600 hover:text-blue-800 text-sm">
                        Continue Application
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Book className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-gray-600 font-medium mb-2">No applications yet</h3>
                    <p className="text-gray-500 text-sm mb-4">Start applying to scholarships to track your progress here.</p>
                    <Link 
                      to="/scholarships" 
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Browse Scholarships
                    </Link>
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <h2 className="font-semibold text-gray-800">Upcoming Deadlines</h2>
                </div>
                <div className="p-6">
                  {upcomingDeadlines.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingDeadlines.map(scholarship => (
                        <div key={scholarship.id} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                          <div>
                            <h3 className="font-medium text-gray-800">{scholarship.title}</h3>
                            <p className="text-red-500 text-sm">
                              Deadline: {new Date(scholarship.deadline).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                          <Link 
                            to={`/scholarships/${scholarship.id}`}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            View
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-center py-4">No upcoming deadlines at the moment.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;