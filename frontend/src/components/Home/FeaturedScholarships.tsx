import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScholarshipCard from '../Scholarship/ScholarshipCard';

const API_URL = 'http://localhost:5000/api';

const FeaturedScholarships: React.FC = () => {
  const [scholarships, setScholarships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await fetch(`${API_URL}/scholarships`);
        const data = await response.json();
        setScholarships(data.slice(0, 6)); // Take the top 6
      } catch (error) {
        setScholarships([]);
      } finally {
        setLoading(false);
      }
    };
    fetchScholarships();
  }, []);

  if (loading) {
    return <div>Loading featured scholarships...</div>;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-3">
          Featured Scholarships
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Explore these highlighted scholarship opportunities with upcoming deadlines
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scholarships.map(scholarship => (
            <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/scholarships"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            View All Scholarships
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedScholarships;