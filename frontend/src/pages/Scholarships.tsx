// src/pages/Scholarships.tsx

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import ScholarshipCard from '../components/Scholarship/ScholarshipCard';
import { Filter, Search, ChevronDown } from 'lucide-react';

interface Scholarship {
  _id: string;
  title: string;
  link: string;
  amount: string;
  benefits: string[];
  contact_details: string;
  documents: string[];
  eligibility: {
    deadline_date: string;
    criteria: string[];
    eligibility_summary: string;
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  how_to_apply: {
    instructions: string[];
    notes: string[];
  };
  important_dates: string;
  important_links: Array<{
    text: string;
    href: string;
  }>;
  last_updated: string;
  selection_criteria: string;
  image_url: string;
}

//  CHANGE: point to localhost:5000 (not /api)
const API_URL = 'http://localhost:5000';

const Scholarships: React.FC = () => {
  const location = useLocation();
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredScholarships, setFilteredScholarships] = useState<Scholarship[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedState, setSelectedState] = useState('');
  const [selectedReligion, setSelectedReligion] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedEducation, setSelectedEducation] = useState('');

  // Fetch all scholarships
  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        console.log('Fetching scholarships from API...');
        const response = await fetch(
          `${API_URL}/api/scholarships?sortBy=${sortBy}&order=${sortOrder}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Received scholarships:', data.length);
        console.log('First scholarship:', data[0]);
        setScholarships(data);
        setFilteredScholarships(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching scholarships:', error);
        setLoading(false);
      }
    };

    fetchScholarships();
  }, [sortBy, sortOrder]);

  // Extract search query from URL if present
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q');
    if (query) {
      setSearchQuery(query);
      handleSearch(query);
    }
  }, [location.search]);

  const handleSearch = async (query: string) => {
    try {
      const response = await fetch(
        `${API_URL}/api/scholarships/search?query=${encodeURIComponent(query)}&sortBy=${sortBy}&order=${sortOrder}`
      );
      const data = await response.json();
      setFilteredScholarships(data);
    } catch (error) {
      console.error('Error searching scholarships:', error);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) => {
      if (prev.includes(filter)) {
        return prev.filter((f) => f !== filter);
      } else {
        return [...prev, filter];
      }
    });
  };

  // Get all unique tags from eligibility criteria
  const allTags = React.useMemo(() => {
    const tags = new Set<string>();
    scholarships.forEach((scholarship) => {
      if (scholarship.eligibility && scholarship.eligibility.criteria) {
        scholarship.eligibility.criteria.forEach((criterion) => {
          const words = criterion.split(' ').filter((word) => word.length > 3);
          words.forEach((word) => tags.add(word.toLowerCase()));
        });
      }
    });
    return Array.from(tags);
  }, [scholarships]);

  // Apply filters
  useEffect(() => {
    let filtered = scholarships;

    // Existing tag/criteria filter
    if (activeFilters.length > 0) {
      filtered = filtered.filter((scholarship) =>
        scholarship.eligibility.criteria.some((criterion) =>
          activeFilters.some((filter) =>
            criterion.toLowerCase().includes(filter.toLowerCase())
          )
        )
      );
    }

    if (selectedState) {
      filtered = filtered.filter(s => s.eligibility?.criteria?.some(c => c.toLowerCase().includes(selectedState.toLowerCase())));
    }
    if (selectedReligion) {
      filtered = filtered.filter(s => s.eligibility?.criteria?.some(c => c.toLowerCase().includes(selectedReligion.toLowerCase())));
    }
    if (selectedCountry) {
      filtered = filtered.filter(s => s.eligibility?.criteria?.some(c => c.toLowerCase().includes(selectedCountry.toLowerCase())));
    }
    if (selectedEducation) {
      const keywords = {
        "Class 10": ["class 10", "matric", "10th", "tenth"],
        "Class 12": ["class 12", "intermediate", "12th", "twelfth", "senior secondary"],
        "UG": ["undergraduate", "bachelor", "b.tech", "b.e", "bsc", "ba", "bcom"],
        "PG": ["postgraduate", "master", "m.tech", "m.e", "msc", "ma", "mcom"],
        "PhD": ["phd", "doctoral", "doctorate", "research scholar"]
      }[selectedEducation];
      filtered = filtered.filter(s =>
        s.eligibility?.criteria?.some(c =>
          keywords?.some(k => c.toLowerCase().includes(k))
        )
      );
    }

    setFilteredScholarships(filtered);
  }, [activeFilters, scholarships, selectedState, selectedReligion, selectedCountry, selectedEducation]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Scholarships</h1>

          <div className="mb-8">
            <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search scholarships..."
                  className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition duration-200"
              >
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </button>
            </form>
          </div>

          {/* Sorting Controls */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <label htmlFor="sortBy" className="text-gray-700 font-medium">Sort by:</label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'amount')}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="date">Deadline Date</option>
                <option value="amount">Amount</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="sortOrder" className="text-gray-700 font-medium">Order:</label>
              <select
                id="sortOrder"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>

          {/* Advanced Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            {/* State Filter */}
            <div>
              <label className="block text-gray-700">State</label>
              <select
                value={selectedState}
                onChange={e => setSelectedState(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">All</option>
                {["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
                  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
                  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
                  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
                  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
                  "Uttar Pradesh", "Uttarakhand", "West Bengal",
                  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
                  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
                ].map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            {/* Religion Filter */}
            <div>
              <label className="block text-gray-700">Religion</label>
              <select
                value={selectedReligion}
                onChange={e => setSelectedReligion(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">All</option>
                {["Hindu", "Muslim", "Christian", "Sikh", "Jain", "Buddhist"].map(religion => (
                  <option key={religion} value={religion}>{religion}</option>
                ))}
              </select>
            </div>
            {/* Country Filter */}
            <div>
              <label className="block text-gray-700">Country</label>
              <select
                value={selectedCountry}
                onChange={e => setSelectedCountry(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">All</option>
                {["India", "USA", "UK", "Canada", "Australia"].map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            {/* Education Level Filter */}
            <div>
              <label className="block text-gray-700">Education Level</label>
              <select
                value={selectedEducation}
                onChange={e => setSelectedEducation(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">All</option>
                {Object.keys({
                  "Class 10": ["class 10", "matric", "10th", "tenth"],
                  "Class 12": ["class 12", "intermediate", "12th", "twelfth", "senior secondary"],
                  "UG": ["undergraduate", "bachelor", "b.tech", "b.e", "bsc", "ba", "bcom"],
                  "PG": ["postgraduate", "master", "m.tech", "m.e", "msc", "ma", "mcom"],
                  "PhD": ["phd", "doctoral", "doctorate", "research scholar"]
                }).map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          {showFilters && (
            <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
              <h2 className="font-semibold text-gray-700 mb-3">Filter by:</h2>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleFilter(tag)}
                    className={`px-3 py-1.5 rounded-full text-sm ${
                      activeFilters.includes(tag)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              {activeFilters.length > 0 && (
                <button
                  onClick={() => setActiveFilters([])}
                  className="text-blue-600 hover:text-blue-800 text-sm mt-3"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}

          {filteredScholarships.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredScholarships.map((scholarship) => (
                <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No scholarships found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filters to find more results.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Scholarships;
