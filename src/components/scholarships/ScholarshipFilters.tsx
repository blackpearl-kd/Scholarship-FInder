import React, { useState } from 'react';
import { Search, Filter, X, ChevronDown, CheckSquare, Square } from 'lucide-react';
import { Button } from '../common/Button';
import { useScholarships } from '../../context/ScholarshipContext';

export const ScholarshipFilters: React.FC = () => {
  const { filters, setFilters, sortBy, setSortBy, resetFilters } = useScholarships();
  const [showFilters, setShowFilters] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    amount: true,
    educationLevel: true,
    categories: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section as keyof typeof expandedSections],
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  const handleAmountChange = (type: 'min' | 'max', value: string) => {
    const numValue = parseInt(value) || 0;
    setFilters((prev) => ({
      ...prev,
      amount: {
        ...prev.amount,
        [type]: numValue,
      },
    }));
  };

  const handleEducationLevelChange = (level: string) => {
    setFilters((prev) => {
      const currentLevels = [...prev.educationLevel];
      if (currentLevels.includes(level)) {
        return {
          ...prev,
          educationLevel: currentLevels.filter((l) => l !== level),
        };
      } else {
        return {
          ...prev,
          educationLevel: [...currentLevels, level],
        };
      }
    });
  };

  const handleCategoryChange = (category: string) => {
    setFilters((prev) => {
      const currentCategories = [...prev.categories];
      if (currentCategories.includes(category)) {
        return {
          ...prev,
          categories: currentCategories.filter((c) => c !== category),
        };
      } else {
        return {
          ...prev,
          categories: [...currentCategories, category],
        };
      }
    });
  };

  const educationLevels = [
    { value: 'high-school', label: 'High School' },
    { value: 'undergraduate', label: 'Undergraduate' },
    { value: 'graduate', label: 'Graduate' },
    { value: 'doctorate', label: 'Doctorate' },
  ];

  const categories = [
    { value: 'merit-based', label: 'Merit-Based' },
    { value: 'need-based', label: 'Need-Based' },
    { value: 'minority', label: 'Minority' },
    { value: 'women', label: 'Women' },
    { value: 'first-generation', label: 'First Generation' },
    { value: 'subject', label: 'Subject-Specific' },
    { value: 'athletics', label: 'Athletics' },
    { value: 'community-service', label: 'Community Service' },
    { value: 'international', label: 'International' },
  ];

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="search"
            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm"
            placeholder="Search scholarships..."
            value={filters.search}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="!py-2"
            icon={<Filter className="h-4 w-4" />}
          >
            Filters
          </Button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
          >
            <option value="deadline">Deadline (Earliest)</option>
            <option value="amount-high">Amount (High to Low)</option>
            <option value="amount-low">Amount (Low to High)</option>
            <option value="name">Name (A to Z)</option>
          </select>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white p-4 rounded-md shadow-md mb-4 animate-fadeIn">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Filter Scholarships</h3>
            <div className="flex items-center gap-2">
              <Button
                onClick={resetFilters}
                variant="ghost"
                size="sm"
                className="text-gray-600"
              >
                Reset All
              </Button>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {/* Amount Filter */}
            <div className="py-4">
              <button
                className="flex justify-between items-center w-full text-left font-medium"
                onClick={() => toggleSection('amount')}
              >
                <span>Scholarship Amount</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    expandedSections.amount ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {expandedSections.amount && (
                <div className="mt-3 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-1/2">
                      <label htmlFor="min-amount" className="block text-sm text-gray-600 mb-1">
                        Minimum ($)
                      </label>
                      <input
                        type="number"
                        id="min-amount"
                        min="0"
                        value={filters.amount.min}
                        onChange={(e) => handleAmountChange('min', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="w-1/2">
                      <label htmlFor="max-amount" className="block text-sm text-gray-600 mb-1">
                        Maximum ($)
                      </label>
                      <input
                        type="number"
                        id="max-amount"
                        min="0"
                        value={filters.amount.max}
                        onChange={(e) => handleAmountChange('max', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Education Level Filter */}
            <div className="py-4">
              <button
                className="flex justify-between items-center w-full text-left font-medium"
                onClick={() => toggleSection('educationLevel')}
              >
                <span>Education Level</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    expandedSections.educationLevel ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {expandedSections.educationLevel && (
                <div className="mt-3 space-y-2">
                  {educationLevels.map((level) => (
                    <div key={level.value} className="flex items-center">
                      <button
                        type="button"
                        onClick={() => handleEducationLevelChange(level.value)}
                        className="flex items-center"
                      >
                        {filters.educationLevel.includes(level.value) ? (
                          <CheckSquare className="h-5 w-5 text-blue-600" />
                        ) : (
                          <Square className="h-5 w-5 text-gray-400" />
                        )}
                        <span className="ml-2 text-sm text-gray-700">{level.label}</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Categories Filter */}
            <div className="py-4">
              <button
                className="flex justify-between items-center w-full text-left font-medium"
                onClick={() => toggleSection('categories')}
              >
                <span>Categories</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    expandedSections.categories ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {expandedSections.categories && (
                <div className="mt-3 grid grid-cols-2 gap-y-2">
                  {categories.map((category) => (
                    <div key={category.value} className="flex items-center">
                      <button
                        type="button"
                        onClick={() => handleCategoryChange(category.value)}
                        className="flex items-center"
                      >
                        {filters.categories.includes(category.value) ? (
                          <CheckSquare className="h-5 w-5 text-blue-600" />
                        ) : (
                          <Square className="h-5 w-5 text-gray-400" />
                        )}
                        <span className="ml-2 text-sm text-gray-700">{category.label}</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button onClick={() => setShowFilters(false)}>Apply Filters</Button>
          </div>
        </div>
      )}
    </div>
  );
};