import React from 'react';
import { ScholarshipCard } from './ScholarshipCard';
import { ScholarshipFilters } from './ScholarshipFilters';
import { useScholarships } from '../../context/ScholarshipContext';
import { Sparkles } from 'lucide-react';

export const ScholarshipList: React.FC = () => {
  const { filteredScholarships } = useScholarships();

  return (
    <div>
      <ScholarshipFilters />
      
      {filteredScholarships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScholarships.map((scholarship) => (
            <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
            <Sparkles className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No scholarships found</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Try adjusting your filters or search criteria to find more scholarship opportunities.
          </p>
        </div>
      )}
    </div>
  );
};