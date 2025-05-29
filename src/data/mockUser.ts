import { User } from '../types';

// Mock user data for demonstration
export const currentUser: User = {
  id: 'user1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  profileImage: 'https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg?auto=compress&cs=tinysrgb&w=200',
  education: {
    currentLevel: 'undergraduate',
    institution: 'State University',
    major: 'Computer Science',
    gpa: 3.7
  },
  demographics: {
    ethnicity: ['Asian'],
    gender: 'male',
    firstGeneration: true,
    disability: false
  },
  interests: ['technology', 'entrepreneurship', 'sustainability'],
  savedScholarships: ['1', '8'],
  appliedScholarships: ['2']
};