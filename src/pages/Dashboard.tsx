import React from 'react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Bookmark, Award, FileCheck, Bell, Clock, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { scholarships, getScholarshipById } from '../data/scholarships';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Please log in to view your dashboard
            </h2>
            <a href="/login">
              <Button>Log In</Button>
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  // Get the user's saved and applied scholarships
  const savedScholarships = user.savedScholarships
    .map((id) => getScholarshipById(id))
    .filter(Boolean);

  const appliedScholarships = user.appliedScholarships
    .map((id) => getScholarshipById(id))
    .filter(Boolean);

  // Get recommended scholarships based on user profile
  const recommendedScholarships = scholarships
    .filter((scholarship) => {
      // Match education level
      const levelMatch = scholarship.requirements.educationLevel.includes(user.education.currentLevel);
      
      // Match major if available
      const majorMatch = !scholarship.requirements.majors || 
        !user.education.major || 
        scholarship.requirements.majors.some(m => 
          user.education.major?.toLowerCase().includes(m.toLowerCase()));
      
      // Match GPA if available
      const gpaMatch = !scholarship.requirements.minimumGPA || 
        !user.education.gpa || 
        user.education.gpa >= scholarship.requirements.minimumGPA;
      
      return levelMatch && majorMatch && gpaMatch;
    })
    .filter(s => !user.savedScholarships.includes(s.id) && !user.appliedScholarships.includes(s.id))
    .slice(0, 3);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Welcome back, {user.name.split(' ')[0]}!
              </h1>
              <p className="mt-1 text-gray-500">
                Here's an overview of your scholarship journey.
              </p>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <a href="/profile">
                <Button variant="outline" className="mr-3" icon={<FileCheck className="h-4 w-4" />}>
                  Update Profile
                </Button>
              </a>
              <a href="/scholarships">
                <Button icon={<Search className="h-4 w-4" />}>
                  Find Scholarships
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                <Bookmark className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Saved Scholarships</p>
                <h3 className="text-lg font-semibold text-gray-900">{user.savedScholarships.length}</h3>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                <FileCheck className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Applications Submitted</p>
                <h3 className="text-lg font-semibold text-gray-900">{user.appliedScholarships.length}</h3>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-amber-100 rounded-md p-3">
                <Award className="h-6 w-6 text-amber-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">New Recommendations</p>
                <h3 className="text-lg font-semibold text-gray-900">{recommendedScholarships.length}</h3>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                <Clock className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Upcoming Deadlines</p>
                <h3 className="text-lg font-semibold text-gray-900">
                  {savedScholarships.filter(s => new Date(s!.deadline) > new Date()).length}
                </h3>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recommended Scholarships */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Recommended For You</h2>
                  <a href="/scholarships" className="text-sm text-blue-600 hover:text-blue-500">
                    View All
                  </a>
                </div>
              </div>
              
              <div className="px-6 py-5">
                {recommendedScholarships.length > 0 ? (
                  <div className="space-y-5">
                    {recommendedScholarships.map((scholarship) => (
                      <div key={scholarship.id} className="flex items-start border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                        {scholarship.logoUrl ? (
                          <img 
                            src={scholarship.logoUrl} 
                            alt={scholarship.provider} 
                            className="w-12 h-12 object-cover rounded-md"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-blue-100 flex items-center justify-center rounded-md">
                            <Award className="w-6 h-6 text-blue-600" />
                          </div>
                        )}
                        <div className="ml-4 flex-1">
                          <h3 className="text-md font-semibold text-gray-900">
                            {scholarship.name}
                          </h3>
                          <p className="text-sm text-gray-500">{scholarship.provider}</p>
                          <div className="mt-1 flex items-center text-sm">
                            <span className="font-medium text-gray-900">
                              ${scholarship.amount.toLocaleString()}
                            </span>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="text-gray-500">
                              Deadline: {new Date(scholarship.deadline).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="mt-3 flex space-x-3">
                            <a href={`/scholarship/${scholarship.id}`}>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </a>
                            <a href={scholarship.applicationLink}>
                              <Button size="sm">
                                Apply Now
                              </Button>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Award className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">
                      Complete your profile to get personalized recommendations
                    </p>
                    <a href="/profile" className="mt-4 inline-block">
                      <Button variant="outline" size="sm">
                        Update Profile
                      </Button>
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Recently Applied */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mt-8">
              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Your Applications</h2>
              </div>
              
              <div className="px-6 py-5">
                {appliedScholarships.length > 0 ? (
                  <div className="space-y-5">
                    {appliedScholarships.map((scholarship) => (
                      <div key={scholarship!.id} className="flex items-start">
                        {scholarship!.logoUrl ? (
                          <img 
                            src={scholarship!.logoUrl} 
                            alt={scholarship!.provider} 
                            className="w-12 h-12 object-cover rounded-md"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-green-100 flex items-center justify-center rounded-md">
                            <FileCheck className="w-6 h-6 text-green-600" />
                          </div>
                        )}
                        <div className="ml-4 flex-1">
                          <h3 className="text-md font-semibold text-gray-900">
                            {scholarship!.name}
                          </h3>
                          <p className="text-sm text-gray-500">{scholarship!.provider}</p>
                          <div className="mt-1 flex items-center">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Applied
                            </span>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="text-sm text-gray-500">
                              ${scholarship!.amount.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileCheck className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">You haven't applied to any scholarships yet</p>
                    <a href="/scholarships" className="mt-4 inline-block">
                      <Button size="sm">
                        Find Scholarships
                      </Button>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Profile Completion */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Completion</h3>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">80% Complete</span>
                  <span className="text-sm font-medium text-blue-600">4/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="bg-green-100 rounded-full p-1 mr-3">
                    <FileCheck className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-600">Personal Information</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-100 rounded-full p-1 mr-3">
                    <FileCheck className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-600">Education Details</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-100 rounded-full p-1 mr-3">
                    <FileCheck className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-600">Demographic Info</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-100 rounded-full p-1 mr-3">
                    <FileCheck className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-600">Interests</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-gray-100 rounded-full p-1 mr-3">
                    <Clock className="h-4 w-4 text-gray-400" />
                  </div>
                  <span className="text-sm text-gray-600">Achievements & Activities</span>
                </div>
              </div>
              <a href="/profile" className="mt-4 inline-block w-full">
                <Button fullWidth>
                  Complete Profile
                </Button>
              </a>
            </Card>

            {/* Saved Scholarships */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Saved Scholarships</h3>
                <a href="/saved" className="text-sm text-blue-600 hover:text-blue-500">
                  View All
                </a>
              </div>

              {savedScholarships.length > 0 ? (
                <div className="space-y-4">
                  {savedScholarships.slice(0, 3).map((scholarship) => (
                    <a 
                      key={scholarship!.id} 
                      href={`/scholarship/${scholarship!.id}`}
                      className="block hover:bg-gray-50 -mx-6 px-6 py-3 transition-colors"
                    >
                      <div className="flex items-center">
                        {scholarship!.logoUrl ? (
                          <img 
                            src={scholarship!.logoUrl} 
                            alt={scholarship!.provider} 
                            className="w-10 h-10 object-cover rounded-md"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-blue-100 flex items-center justify-center rounded-md">
                            <Award className="w-5 h-5 text-blue-600" />
                          </div>
                        )}
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                            {scholarship!.name}
                          </h4>
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-gray-500">
                              ${scholarship!.amount.toLocaleString()}
                            </span>
                            <span className="mx-1 text-gray-300">•</span>
                            <span className="text-xs text-gray-500">
                              Due {new Date(scholarship!.deadline).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <Bookmark className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No saved scholarships yet</p>
                </div>
              )}
            </Card>

            {/* Upcoming Deadlines */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
              
              {savedScholarships.filter(s => new Date(s!.deadline) > new Date()).length > 0 ? (
                <div className="space-y-3">
                  {savedScholarships
                    .filter(s => new Date(s!.deadline) > new Date())
                    .sort((a, b) => new Date(a!.deadline).getTime() - new Date(b!.deadline).getTime())
                    .slice(0, 3)
                    .map((scholarship) => (
                      <div key={scholarship!.id} className="flex items-center">
                        <div className="mr-3 p-2 rounded-md bg-red-100">
                          <Clock className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 line-clamp-1">{scholarship!.name}</p>
                          <p className="text-xs text-red-600">
                            Due in {Math.ceil((new Date(scholarship!.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                          </p>
                        </div>
                      </div>
                    ))
                  }
                </div>
              ) : (
                <div className="text-center py-4">
                  <Clock className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No upcoming deadlines</p>
                </div>
              )}
            </Card>

            {/* Notifications */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                <a href="/notifications" className="text-sm text-blue-600 hover:text-blue-500">
                  View All
                </a>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-3 p-2 rounded-md bg-blue-100">
                    <Bell className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">New scholarship match found</p>
                    <p className="text-xs text-gray-500">Based on your profile, we found a new match</p>
                    <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 p-2 rounded-md bg-amber-100">
                    <Clock className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Deadline reminder</p>
                    <p className="text-xs text-gray-500">The "Future Leaders Scholarship" deadline is approaching</p>
                    <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};