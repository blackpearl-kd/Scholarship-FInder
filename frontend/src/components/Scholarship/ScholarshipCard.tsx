import React from 'react';
import { Link } from 'react-router-dom';
import { format, isValid } from 'date-fns';
import { Bookmark, DollarSign, Calendar } from 'lucide-react';

interface ScholarshipCardProps {
  scholarship: any;
}

const ScholarshipCard: React.FC<ScholarshipCardProps> = ({ scholarship }) => {
  // Fallbacks for missing fields
  const image = scholarship.image_url || '';
  const deadline = scholarship.eligibility?.deadline_date || scholarship.important_dates || '';
  const tags = scholarship.eligibility_summary ? [scholarship.eligibility_summary] : [];
  const amount = scholarship.amount || '';
  const id = scholarship._id;

  const formatCurrency = (amount: string | number) => {
    let num: number;
    if (typeof amount === 'number') {
      num = amount;
    } else if (typeof amount === 'string') {
      num = parseInt(amount.replace(/[^\d]/g, ''));
    } else {
      return '';
    }
    if (isNaN(num)) return String(amount);
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  function formatDate(dateString: string) {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (!isValid(date)) return dateString;
    return format(date, 'dd MMM yyyy');
  }

  // Determine if deadline is approaching (within 30 days)
  const isDeadlineApproaching = () => {
    if (!deadline) return false;
    const date = new Date(deadline);
    if (!isValid(date)) return false;
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-transform hover:shadow-lg hover:-translate-y-1">
      <div className="relative">
        <img 
          src={image} 
          alt={scholarship.title} 
          className="w-full h-40 object-cover"
        />
      </div>
      
      <div className="p-5">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{scholarship.title}</h3>
        </div>
        <p className="text-gray-600 text-sm mb-3">{scholarship.contact_details || ''}</p>
        <div className="flex items-center mb-4">
          <DollarSign className="h-4 w-4 text-green-600 mr-1" />
          <span className="text-green-600 font-semibold">{amount}</span>
        </div>
        <div className="flex items-center mb-4">
          <Calendar className="h-4 w-4 mr-1 text-gray-500" />
          <span className={`text-sm ${
            isDeadlineApproaching() ? 'text-red-500 font-medium' : 'text-gray-500'
          }`}>
            Deadline: {formatDate(deadline)}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {Array.isArray(tags) && tags.map((tag: string, index: number) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex space-x-3">
          <Link 
            to={`/scholarships/${id}`}
            className="text-blue-600 hover:text-blue-800 border border-blue-600 px-4 py-2 rounded-lg text-center w-1/2"
          >
            View Details
          </Link>
          <a 
            href={scholarship.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg text-center w-1/2"
          >
            Apply Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard;
