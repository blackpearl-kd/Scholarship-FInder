export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Scholarship {
  id: string;
  title: string;
  provider: string;
  amount: number;
  deadline: string;
  description: string;
  isSaved?: boolean;
  tags: string[];
  image: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface ScholarshipContextType {
  scholarships: Scholarship[];
  savedScholarships: string[];
  toggleSaveScholarship: (id: string) => void;
  searchScholarships: (query: string) => Scholarship[];
}