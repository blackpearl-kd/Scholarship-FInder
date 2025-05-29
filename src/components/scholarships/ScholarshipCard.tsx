import React from 'react';
import { Calendar, DollarSign, Award, Bookmark, BookmarkCheck } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Scholarship } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface ScholarshipCardProps {
  scholarship: Scholarship;
}

export const ScholarshipCard: React.FC<ScholarshipCardProps> = ({ scholarship }) => {
  const { user, saveScholarship, unsaveScholarship } = useAuth();
  
  const isSaved = user?.savedScholarships.includes(scholarship.id) || false;
  const isApplied = user?.appliedScholarships.includes(scholarship.id) || false;
  
  const formatDeadline = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };
  
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  const handleSaveToggle = () => {
    if (isSaved) {
      unsaveScholarship(scholarship.id);
    } else {
      saveScholarship(scholarship.id);
    }
  };

  return (
    <Card hover className="h-full flex flex-col">
      <div className="p-5 flex flex-col h-full">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            {scholarship.logoUrl ? (
              <img 
                src={scholarship.logoUrl} 
                alt={scholarship.provider} 
                className="w-12 h-12 object-cover rounded-md mr-3"
              />
            ) : (
              <div className="w-12 h-12 bg-blue-100 flex items-center justify-center rounded-md mr-3">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                {scholarship.name}
              </h3>
              <p className="text-sm text-gray-500">{scholarship.provider}</p>
            </div>
          </div>
          {user && (
            <button 
              onClick={handleSaveToggle}
              className="ml-2 text-gray-400 hover:text-blue-600 transition-colors"
              aria-label={isSaved ? "Unsave scholarship" : "Save scholarship"}
            >
              {isSaved ? (
                <BookmarkCheck className="h-5 w-5 text-blue-600" />
              ) : (
                <Bookmark className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
        
        <div className="mt-4 flex-grow">
          <p className="text-sm text-gray-600 line-clamp-3 mb-4">
            {scholarship.description}
          </p>
          
          <div className="space-y-2 mt-4">
            <div className="flex items-center text-sm">
              <DollarSign className="h-4 w-4 text-green-600 mr-2" />
              <span className="font-medium text-gray-900">
                {formatAmount(scholarship.amount)}
              </span>
            </div>
            
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 text-red-500 mr-2" />
              <span className={`font-medium ${new Date(scholarship.deadline) < new Date() ? 'text-red-500' : 'text-gray-900'}`}>
                Deadline: {formatDeadline(scholarship.deadline)}
              </span>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-1">
            {scholarship.categoryTags.slice(0, 3).map((tag) => (
              <span 
                key={tag} 
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {tag.replace('-', ' ')}
              </span>
            ))}
            {scholarship.categoryTags.length > 3 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                +{scholarship.categoryTags.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        <div className="mt-6 flex gap-2">
          <a href={`/scholarship/${scholarship.id}`} className="flex-grow">
            <Button variant="outline" fullWidth>
              View Details
            </Button>
          </a>
          <a href={isApplied ? '#' : scholarship.applicationLink} className="flex-grow">
            <Button 
              fullWidth 
              disabled={isApplied}
              variant={isApplied ? 'success' : 'primary'}
            >
              {isApplied ? 'Applied' : 'Apply Now'}
            </Button>
          </a>
        </div>
      </div>
    </Card>
  );
};