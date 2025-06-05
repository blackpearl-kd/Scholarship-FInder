import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import ScholarshipCard from '../components/Scholarship/ScholarshipCard';
import { Filter, Search } from 'lucide-react';

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

const API_URL = 'http://localhost:5000/api';

const Scholarships: React.FC = () => {
  const location = useLocation();
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredScholarships, setFilteredScholarships] = useState<Scholarship[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch all scholarships
  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        console.log('Fetching scholarships from API...');
        const response = await fetch(`${API_URL}/scholarships`);
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
  }, []);

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
      const response = await fetch(`${API_URL}/scholarships/search?query=${encodeURIComponent(query)}`);
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
    setActiveFilters(prev => {
      if (prev.includes(filter)) {
        return prev.filter(f => f !== filter);
      } else {
        return [...prev, filter];
      }
    });
  };

  // Get all unique tags from eligibility criteria
  const allTags = React.useMemo(() => {
    const tags = new Set<string>();
    scholarships.forEach(scholarship => {
      if (scholarship.eligibility && scholarship.eligibility.criteria) {
        scholarship.eligibility.criteria.forEach(criterion => {
          const words = criterion.split(' ').filter(word => word.length > 3);
          words.forEach(word => tags.add(word.toLowerCase()));
        });
      }
    });
    return Array.from(tags);
  }, [scholarships]);

  // Apply filters
  useEffect(() => {
    if (activeFilters.length === 0) {
      setFilteredScholarships(scholarships);
    } else {
      setFilteredScholarships(
        scholarships.filter(scholarship =>
          scholarship.eligibility.criteria.some(criterion =>
            activeFilters.some(filter =>
              criterion.toLowerCase().includes(filter.toLowerCase())
            )
          )
        )
      );
    }
  }, [activeFilters, scholarships]);

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
          
          {showFilters && (
            <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
              <h2 className="font-semibold text-gray-700 mb-3">Filter by:</h2>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
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
              {filteredScholarships.map(scholarship => (
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