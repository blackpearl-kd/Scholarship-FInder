import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';

const API_URL = 'http://localhost:5000/api/user-profile';

const initialProfileData = {
  name: '',
  course: '',
  location: '',
  citizenship: '',
  degree_level: '',
  start_date: '',
  income_status: '',
  categories: [''],
  current_status: '',
  interests: [''],
};

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(initialProfileData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Assume userId and token are available (replace with your actual logic)
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  // Load profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError('');
      try {
        if (!userId) {
          setError('User not logged in.');
          setLoading(false);
          return;
        }
        const response = await fetch(`${API_URL}/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
          },
        });
        if (!response.ok) {
          throw new Error('Failed to load profile');
        }
        const data = await response.json();
        setProfileData({
          ...initialProfileData,
          ...data,
          categories: Array.isArray(data.categories) ? data.categories : [''],
          interests: Array.isArray(data.interests) ? data.interests : [''],
        });
      } catch (err: any) {
        setError(err.message || 'Error loading profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
    // eslint-disable-next-line
  }, [userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setProfileData({
      ...profileData,
      [key]: e.target.value.split(',').map((item) => item.trim()),
    });
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (!userId) {
        setError('User not logged in.');
        return;
      }
      const response = await fetch(`${API_URL}/complete-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ userId, ...profileData }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || 'Error saving profile');
    }
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-10 min-h-screen">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Your Profile</h1>
            {!isEditing && !loading && (
              <button 
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-sm font-medium transition"
              >
                Edit Profile
              </button>
            )}
          </div>
          {error && <div className="mb-4 text-red-600 font-medium">{error}</div>}
          {loading ? (
            <div className="text-center py-20 text-gray-500 text-lg">Loading profile...</div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white flex flex-col items-center">
                <img 
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.name || 'User')}&background=4f46e5&color=fff&size=128`}
                  alt={profileData.name}
                  className="h-28 w-28 rounded-full object-cover border-4 border-white shadow-lg mb-4" 
                />
                <h2 className="text-2xl font-bold mb-1">{profileData.name || 'Your Name'}</h2>
                <p className="opacity-90 text-lg">{profileData.course || 'Your Course'}</p>
              </div>
              <div className="p-8">
                {isEditing ? (
                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input type="text" name="name" value={profileData.name} onChange={handleInputChange} className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                        <input type="text" name="course" value={profileData.course} onChange={handleInputChange} className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <input type="text" name="location" value={profileData.location} onChange={handleInputChange} className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Citizenship</label>
                        <input type="text" name="citizenship" value={profileData.citizenship} onChange={handleInputChange} className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Degree Level</label>
                        <input type="text" name="degree_level" value={profileData.degree_level} onChange={handleInputChange} className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Start Date (YYYY-MM)</label>
                        <input type="month" name="start_date" value={profileData.start_date} onChange={handleInputChange} className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Income Status</label>
                        <input type="text" name="income_status" value={profileData.income_status} onChange={handleInputChange} className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Categories (comma separated)</label>
                        <input type="text" name="categories" value={profileData.categories.join(', ')} onChange={e => handleArrayChange(e, 'categories')} className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Status</label>
                        <input type="text" name="current_status" value={profileData.current_status} onChange={handleInputChange} className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Interests (comma separated)</label>
                        <input type="text" name="interests" value={profileData.interests.join(', ')} onChange={e => handleArrayChange(e, 'interests')} className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-4 pt-4">
                      <button type="button" onClick={() => setIsEditing(false)} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">Cancel</button>
                      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow">Save Changes</button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div><span className="font-semibold text-gray-700">Full Name:</span> <span className="text-gray-900">{profileData.name}</span></div>
                      <div><span className="font-semibold text-gray-700">Course:</span> <span className="text-gray-900">{profileData.course}</span></div>
                      <div><span className="font-semibold text-gray-700">Location:</span> <span className="text-gray-900">{profileData.location}</span></div>
                      <div><span className="font-semibold text-gray-700">Citizenship:</span> <span className="text-gray-900">{profileData.citizenship}</span></div>
                      <div><span className="font-semibold text-gray-700">Degree Level:</span> <span className="text-gray-900">{profileData.degree_level}</span></div>
                    </div>
                    <div className="space-y-4">
                      <div><span className="font-semibold text-gray-700">Start Date:</span> <span className="text-gray-900">{profileData.start_date}</span></div>
                      <div><span className="font-semibold text-gray-700">Income Status:</span> <span className="text-gray-900">{profileData.income_status}</span></div>
                      <div><span className="font-semibold text-gray-700">Categories:</span> <span className="flex flex-wrap gap-2">{profileData.categories.filter(Boolean).map((cat, i) => (<span key={i} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">{cat}</span>))}</span></div>
                      <div><span className="font-semibold text-gray-700">Current Status:</span> <span className="text-gray-900">{profileData.current_status}</span></div>
                      <div><span className="font-semibold text-gray-700">Interests:</span> <span className="flex flex-wrap gap-2">{profileData.interests.filter(Boolean).map((int, i) => (<span key={i} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs">{int}</span>))}</span></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;