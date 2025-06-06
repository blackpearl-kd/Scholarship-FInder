import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bell, Settings, Calendar, User, ChevronRight } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import { useScholarships } from '../context/ScholarshipContext';

interface ProfileData {
  name: string;
  course: string;
  location: string;
  citizenship: string;
  degree_level: string;
  start_date: string;
  income_status: string;
  categories: string[];
  current_status: string;
  interests: string[];
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { scholarships } = useScholarships();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendedScholarships, setRecommendedScholarships] = useState<any[]>([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);

  const upcomingDeadlines = scholarships
    .filter(s => new Date(s.eligibility?.deadline_date) > new Date())
    .sort((a, b) => new Date(a.eligibility?.deadline_date).getTime() - new Date(b.eligibility?.deadline_date).getTime())
    .slice(0, 3);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        
        if (!userId) {
          console.log('No userId found in localStorage');
          setError('User not logged in');
          setLoading(false);
          return;
        }

        console.log('Fetching profile data for userId:', userId);
        const response = await fetch(`http://localhost:5000/api/user-profile/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch profile data');
        }

        const data = await response.json();
        console.log('Received profile data:', data);
        
        if (!data) {
          throw new Error('No profile data received');
        }

        setProfileData({
          name: data.name || '',
          course: data.course || '',
          location: data.location || '',
          citizenship: data.citizenship || '',
          degree_level: data.degree_level || '',
          start_date: data.start_date || '',
          income_status: data.income_status || '',
          categories: Array.isArray(data.categories) ? data.categories : [],
          current_status: data.current_status || '',
          interests: Array.isArray(data.interests) ? data.interests : [],
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    const fetchRecommendedScholarships = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        
        if (!userId) {
          console.log('No userId found in localStorage');
          setLoadingRecommendations(false);
          return;
        }

        console.log('Fetching recommended scholarships for userId:', userId);
        const response = await fetch(`http://localhost:5000/api/user-profile/${userId}/recommended-scholarships`, {
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch recommended scholarships');
        }

        const data = await response.json();
        console.log('Received recommended scholarships:', data);
        
        if (data.recommended_scholarships) {
          setRecommendedScholarships(data.recommended_scholarships);
        }
      } catch (error) {
        console.error('Error fetching recommended scholarships:', error);
      } finally {
        setLoadingRecommendations(false);
      }
    };

    fetchRecommendedScholarships();
  }, []);

  const calculateProfileCompletion = (profile: ProfileData | null) => {
    if (!profile) return { percentage: 0, remainingItems: [] };

    const requiredFields = [
      { key: 'name', label: 'Add your full name' },
      { key: 'course', label: 'Add your course details' },
      { key: 'location', label: 'Add your location' },
      { key: 'citizenship', label: 'Add your citizenship' },
      { key: 'degree_level', label: 'Add your degree level' },
      { key: 'start_date', label: 'Add your start date' },
      { key: 'income_status', label: 'Add your income status' },
      { key: 'current_status', label: 'Add your current status' }
    ];

    const arrayFields = [
      { key: 'categories', label: 'Add your categories' },
      { key: 'interests', label: 'Add your interests' }
    ];

    const completedFields = requiredFields.filter(field => 
      profile[field.key as keyof ProfileData] && 
      String(profile[field.key as keyof ProfileData]).trim() !== ''
    ).length;

    const completedArrayFields = arrayFields.filter(field => 
      Array.isArray(profile[field.key as keyof ProfileData]) && 
      (profile[field.key as keyof ProfileData] as string[]).length > 0
    ).length;

    const totalFields = requiredFields.length + arrayFields.length;
    const completedTotal = completedFields + completedArrayFields;
    const percentage = Math.round((completedTotal / totalFields) * 100);

    const remainingItems = [
      ...requiredFields.filter(field => 
        !profile[field.key as keyof ProfileData] || 
        String(profile[field.key as keyof ProfileData]).trim() === ''
      ).map(field => field.label),
      ...arrayFields.filter(field => 
        !Array.isArray(profile[field.key as keyof ProfileData]) || 
        (profile[field.key as keyof ProfileData] as string[]).length === 0
      ).map(field => field.label)
    ];

    return { percentage, remainingItems };
  };

  const { percentage, remainingItems } = calculateProfileCompletion(profileData);

  const displayScholarships = recommendedScholarships.length > 0 
    ? recommendedScholarships 
    : upcomingDeadlines;

  const sectionTitle = recommendedScholarships.length > 0 
    ? "Recommended Scholarships" 
    : "Upcoming Deadlines";

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-6 py-10">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, {user?.name}</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button className="bg-white p-2 rounded-full shadow-sm text-gray-500 hover:text-blue-600 transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <button className="bg-white p-2 rounded-full shadow-sm text-gray-500 hover:text-blue-600 transition-colors">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Completion Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">Profile Completion</h2>
                    <Link 
                      to="/profile" 
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                    >
                      Complete Profile
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                  
                  {loading ? (
                    <div className="flex justify-center items-center h-32">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  ) : error ? (
                    <div className="text-center py-4">
                      <p className="text-gray-600">Unable to load profile completion</p>
                      <Link 
                        to="/profile" 
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 inline-block"
                      >
                        Go to Profile
                      </Link>
                    </div>
                  ) : (
                    <>
                      {/* Progress Circle */}
                      <div className="relative w-32 h-32 mx-auto mb-6">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#E5E7EB"
                            strokeWidth="3"
                          />
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#3B82F6"
                            strokeWidth="3"
                            strokeDasharray={`${percentage}, 100`}
                            className="transition-all duration-500 ease-in-out"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold text-gray-800">{percentage}%</span>
                        </div>
                      </div>

                      {/* Remaining Items */}
                      {remainingItems.length > 0 && (
                        <div className="space-y-3">
                          <h3 className="text-sm font-medium text-gray-700 mb-2">Complete your profile by:</h3>
                          {remainingItems.map((item, index) => (
                            <div key={index} className="flex items-center text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-2"></div>
                              {item}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Scholarships Card */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="font-semibold text-gray-800 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                    {sectionTitle}
                  </h2>
                  <Link 
                    to="/scholarships" 
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View All
                  </Link>
                </div>
                <div className="p-6">
                  {loadingRecommendations ? (
                    <div className="flex justify-center items-center h-32">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  ) : displayScholarships.length > 0 ? (
                    <div className="space-y-4">
                      {displayScholarships.map(scholarship => (
                        <div 
                          key={scholarship._id || scholarship.id} 
                          className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="bg-blue-50 p-2 rounded-lg">
                              <Calendar className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-800">{scholarship.title}</h3>
                              <p className="text-red-500 text-sm mt-1">
                                Deadline: {new Date(scholarship.eligibility?.deadline_date).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </p>
                              {recommendedScholarships.length > 0 && scholarship.match_percentage && (
                                <p className="text-green-600 text-sm mt-1">
                                  Match: {Math.round(scholarship.match_percentage)}%
                                </p>
                              )}
                            </div>
                          </div>
                          <Link 
                            to={`/scholarships/${scholarship._id || scholarship.id}`}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                          >
                            View Details
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-gray-600 font-medium mb-2">No scholarships available</h3>
                      <p className="text-gray-500 text-sm mb-4">Complete your profile to get personalized recommendations.</p>
                      <Link 
                        to="/scholarships" 
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Browse Scholarships
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
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