import React, { createContext, useContext, useState } from 'react';
import { Scholarship } from '../types';
import { scholarships } from '../data/scholarships';

interface FilterOptions {
  search: string;
  amount: {
    min: number;
    max: number;
  };
  educationLevel: string[];
  categories: string[];
  deadlineBefore?: Date;
}

interface ScholarshipContextType {
  scholarships: Scholarship[];
  filteredScholarships: Scholarship[];
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  resetFilters: () => void;
}

const initialFilters: FilterOptions = {
  search: '',
  amount: {
    min: 0,
    max: 50000,
  },
  educationLevel: [],
  categories: [],
};

const ScholarshipContext = createContext<ScholarshipContextType | undefined>(undefined);

export const ScholarshipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  const [sortBy, setSortBy] = useState<string>('deadline');

  // Apply filters and sorting
  const filteredScholarships = scholarships
    .filter((scholarship) => {
      // Search filter
      if (filters.search && !scholarship.name.toLowerCase().includes(filters.search.toLowerCase()) &&
          !scholarship.description.toLowerCase().includes(filters.search.toLowerCase()) &&
          !scholarship.provider.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Amount filter
      if (scholarship.amount < filters.amount.min || scholarship.amount > filters.amount.max) {
        return false;
      }

      // Education level filter
      if (filters.educationLevel.length > 0 && 
          !filters.educationLevel.some(level => scholarship.requirements.educationLevel.includes(level))) {
        return false;
      }

      // Categories filter
      if (filters.categories.length > 0 && 
          !filters.categories.some(category => scholarship.categoryTags.includes(category))) {
        return false;
      }

      // Deadline filter
      if (filters.deadlineBefore) {
        const scholarshipDeadline = new Date(scholarship.deadline);
        if (scholarshipDeadline > filters.deadlineBefore) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'amount-high':
          return b.amount - a.amount;
        case 'amount-low':
          return a.amount - b.amount;
        case 'deadline':
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const resetFilters = () => {
    setFilters(initialFilters);
    setSortBy('deadline');
  };

  return (
    <ScholarshipContext.Provider
      value={{
        scholarships,
        filteredScholarships,
        filters,
        setFilters,
        sortBy,
        setSortBy,
        resetFilters,
      }}
    >
      {children}
    </ScholarshipContext.Provider>
  );
};

export const useScholarships = () => {
  const context = useContext(ScholarshipContext);
  if (context === undefined) {
    throw new Error('useScholarships must be used within a ScholarshipProvider');
  }
  return context;
};