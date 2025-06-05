import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Scholarship, ScholarshipContextType } from '../types';
import { scholarshipsData } from '../data/scholarships';

const defaultScholarshipContext: ScholarshipContextType = {
  scholarships: [],
  savedScholarships: [],
  toggleSaveScholarship: () => {},
  searchScholarships: () => [],
};

const ScholarshipContext = createContext<ScholarshipContextType>(defaultScholarshipContext);

export function useScholarships() {
  return useContext(ScholarshipContext);
}

export function ScholarshipProvider({ children }: { children: ReactNode }) {
  const [scholarships, setScholarships] = useState<Scholarship[]>(scholarshipsData);
  const [savedScholarships, setSavedScholarships] = useState<string[]>([]);

  // Load saved scholarships from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedScholarships');
    if (saved) {
      setSavedScholarships(JSON.parse(saved));
    }
  }, []);

  // Update localStorage when saved scholarships change
  useEffect(() => {
    localStorage.setItem('savedScholarships', JSON.stringify(savedScholarships));
    
    // Update scholarship objects with saved status
    setScholarships(scholarships.map(scholarship => ({
      ...scholarship,
      isSaved: savedScholarships.includes(scholarship.id),
    })));
  }, [savedScholarships]);

  const toggleSaveScholarship = (id: string) => {
    setSavedScholarships(prev => {
      if (prev.includes(id)) {
        return prev.filter(scholarshipId => scholarshipId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const searchScholarships = (query: string): Scholarship[] => {
    if (!query) return scholarships;
    
    const lowercaseQuery = query.toLowerCase();
    return scholarships.filter(scholarship => 
      scholarship.title.toLowerCase().includes(lowercaseQuery) ||
      scholarship.provider.toLowerCase().includes(lowercaseQuery) ||
      scholarship.description.toLowerCase().includes(lowercaseQuery) ||
      scholarship.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  };

  const value = {
    scholarships,
    savedScholarships,
    toggleSaveScholarship,
    searchScholarships,
  };

  return <ScholarshipContext.Provider value={value}>{children}</ScholarshipContext.Provider>;
}