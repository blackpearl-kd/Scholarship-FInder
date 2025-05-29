// User types
export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  education: {
    currentLevel: 'high-school' | 'undergraduate' | 'graduate' | 'doctorate';
    institution?: string;
    major?: string;
    gpa?: number;
  };
  demographics?: {
    ethnicity?: string[];
    gender?: string;
    firstGeneration?: boolean;
    disability?: boolean;
  };
  interests?: string[];
  savedScholarships: string[];
  appliedScholarships: string[];
}

// Scholarship types
export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  amount: number;
  description: string;
  deadline: string;
  requirements: {
    minimumGPA?: number;
    educationLevel: string[];
    majors?: string[];
    demographics?: {
      ethnicity?: string[];
      gender?: string;
      firstGeneration?: boolean;
      disability?: boolean;
    };
  };
  applicationLink?: string;
  categoryTags: string[];
  featured?: boolean;
  logoUrl?: string;
}

export type ScholarshipCategory = 'merit-based' | 'need-based' | 'minority' | 'women' | 'first-generation' | 'subject' | 'athletics' | 'community-service' | 'international' | 'military';

export interface ApplicationStatus {
  scholarshipId: string;
  status: 'draft' | 'submitted' | 'in-review' | 'accepted' | 'rejected';
  submittedDate?: string;
  lastUpdated: string;
}