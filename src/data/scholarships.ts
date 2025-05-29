import { Scholarship } from '../types';

// Mock data for scholarships
export const scholarships: Scholarship[] = [
  {
    id: '1',
    name: 'Future Leaders Scholarship',
    provider: 'Bright Futures Foundation',
    amount: 10000,
    description: 'A prestigious scholarship for students demonstrating exceptional leadership abilities and academic excellence. Recipients will join a network of high-achieving scholars and gain access to mentorship opportunities.',
    deadline: '2025-06-15',
    requirements: {
      minimumGPA: 3.5,
      educationLevel: ['undergraduate', 'graduate'],
      majors: ['Business', 'Public Policy', 'Political Science']
    },
    applicationLink: '/apply/1',
    categoryTags: ['merit-based', 'leadership'],
    featured: true,
    logoUrl: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: '2',
    name: 'Women in STEM Grant',
    provider: 'TechForward Initiative',
    amount: 7500,
    description: 'Supporting women pursuing careers in Science, Technology, Engineering, and Mathematics to address gender disparities in these fields and foster innovation.',
    deadline: '2025-05-30',
    requirements: {
      minimumGPA: 3.2,
      educationLevel: ['undergraduate', 'graduate'],
      majors: ['Computer Science', 'Engineering', 'Mathematics', 'Biology', 'Chemistry', 'Physics'],
      demographics: {
        gender: 'female'
      }
    },
    applicationLink: '/apply/2',
    categoryTags: ['women', 'subject'],
    logoUrl: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: '3',
    name: 'First Generation College Fund',
    provider: 'Pathway to Success Organization',
    amount: 5000,
    description: 'Dedicated to supporting first-generation college students as they navigate higher education and break new ground for their families.',
    deadline: '2025-07-01',
    requirements: {
      educationLevel: ['undergraduate'],
      demographics: {
        firstGeneration: true
      }
    },
    applicationLink: '/apply/3',
    categoryTags: ['first-generation', 'need-based'],
    logoUrl: 'https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: '4',
    name: 'Global Citizens Scholarship',
    provider: 'International Education Foundation',
    amount: 15000,
    description: 'Supporting international students pursuing education abroad to foster global understanding and exchange of ideas across cultures.',
    deadline: '2025-04-30',
    requirements: {
      minimumGPA: 3.0,
      educationLevel: ['undergraduate', 'graduate', 'doctorate']
    },
    applicationLink: '/apply/4',
    categoryTags: ['international', 'merit-based'],
    logoUrl: 'https://images.pexels.com/photos/7942429/pexels-photo-7942429.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: '5',
    name: 'Community Service Excellence Award',
    provider: 'Community Foundation',
    amount: 3000,
    description: 'Recognizing students who have made significant contributions to their communities through volunteer work and service projects.',
    deadline: '2025-06-30',
    requirements: {
      educationLevel: ['undergraduate', 'graduate']
    },
    applicationLink: '/apply/5',
    categoryTags: ['community-service', 'merit-based'],
    logoUrl: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: '6',
    name: 'Arts & Humanities Fellowship',
    provider: 'Cultural Heritage Foundation',
    amount: 6000,
    description: 'Supporting students pursuing degrees in the arts, humanities, and social sciences to foster creative thinking and cultural understanding.',
    deadline: '2025-08-15',
    requirements: {
      minimumGPA: 3.0,
      educationLevel: ['undergraduate', 'graduate'],
      majors: ['Art', 'Music', 'Literature', 'History', 'Anthropology', 'Philosophy']
    },
    applicationLink: '/apply/6',
    categoryTags: ['subject', 'merit-based'],
    logoUrl: 'https://images.pexels.com/photos/6147276/pexels-photo-6147276.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: '7',
    name: 'Healthcare Heroes Scholarship',
    provider: 'MediCare Association',
    amount: 8500,
    description: 'Supporting the next generation of healthcare professionals dedicated to improving patient care and advancing medical knowledge.',
    deadline: '2025-05-15',
    requirements: {
      minimumGPA: 3.3,
      educationLevel: ['undergraduate', 'graduate'],
      majors: ['Nursing', 'Medicine', 'Public Health', 'Pharmacy', 'Physical Therapy']
    },
    applicationLink: '/apply/7',
    categoryTags: ['subject', 'merit-based'],
    featured: true,
    logoUrl: 'https://images.pexels.com/photos/5214949/pexels-photo-5214949.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: '8',
    name: 'Entrepreneurship Innovation Grant',
    provider: 'Startup Foundation',
    amount: 12000,
    description: 'Fueling the next generation of entrepreneurs who are developing innovative solutions to address real-world problems.',
    deadline: '2025-09-01',
    requirements: {
      educationLevel: ['undergraduate', 'graduate'],
      majors: ['Business', 'Entrepreneurship', 'Computer Science', 'Engineering']
    },
    applicationLink: '/apply/8',
    categoryTags: ['merit-based', 'subject'],
    logoUrl: 'https://images.pexels.com/photos/8867437/pexels-photo-8867437.jpeg?auto=compress&cs=tinysrgb&w=200'
  }
];

// Get a scholarship by ID
export const getScholarshipById = (id: string): Scholarship | undefined => {
  return scholarships.find(scholarship => scholarship.id === id);
};