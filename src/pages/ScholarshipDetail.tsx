import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { 
  Calendar, 
  DollarSign, 
  Award, 
  BookOpen, 
  User, 
  GraduationCap,
  MapPin,
  Bookmark,
  BookmarkCheck,
  Share2,
  FileText,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getScholarshipById } from '../data/scholarships';

export const ScholarshipDetail: React.FC = () => {
  // In a real app, we would get the id from URL params
  // For demo, we'll use a hardcoded ID
  const scholarshipId = '1';
  const scholarship = getScholarshipById(scholarshipId);
  const { user, saveScholarship, unsaveScholarship } = useAuth();
  
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  if (!scholarship) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Scholarship Not Found
          </h1>
          <div className="text-center">
            <a href="/scholarships">
              <Button>View All Scholarships</Button>
            </a>
          </div>
        </div>
      </Layout>
    );
  }
  
  const isSaved = user?.savedScholarships.includes(scholarship.id) || false;
  const isApplied = user?.appliedScholarships.includes(scholarship.id) || false;
  
  const formatDeadline = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'long',
      month: 'long', 
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

  // Calculate days until deadline
  const deadlineDate = new Date(scholarship.deadline);
  const today = new Date();
  const daysUntilDeadline = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const isDeadlinePassed = daysUntilDeadline < 0;

  return (
    <Layout>
      <div className="bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumbs */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li>
                <a href="/" className="hover:text-blue-600">Home</a>
              </li>
              <li className="px-2">/</li>
              <li>
                <a href="/scholarships" className="hover:text-blue-600">Scholarships</a>
              </li>
              <li className="px-2">/</li>
              <li className="text-gray-700 font-medium truncate">
                {scholarship.name}
              </li>
            </ol>
          </nav>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Scholarship Details (Left Column) */}
            <div className="lg:w-2/3">
              <Card className="mb-8">
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    {scholarship.logoUrl ? (
                      <img 
                        src={scholarship.logoUrl} 
                        alt={scholarship.provider} 
                        className="w-16 h-16 object-cover rounded-md mr-4"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-blue-100 flex items-center justify-center rounded-md mr-4">
                        <Award className="w-8 h-8 text-blue-600" />
                      </div>
                    )}
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 mb-1">
                        {scholarship.name}
                      </h1>
                      <p className="text-lg text-gray-600">
                        Provided by {scholarship.provider}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Award Amount</p>
                        <p className="font-semibold text-gray-900">{formatAmount(scholarship.amount)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className={`h-5 w-5 ${isDeadlinePassed ? 'text-red-500' : 'text-amber-600'} mr-2`} />
                      <div>
                        <p className="text-sm text-gray-500">Application Deadline</p>
                        <p className={`font-semibold ${isDeadlinePassed ? 'text-red-500' : 'text-gray-900'}`}>
                          {formatDeadline(scholarship.deadline)}
                          {!isDeadlinePassed && (
                            <span className="text-sm font-normal text-amber-600 ml-2">
                              ({daysUntilDeadline} days left)
                            </span>
                          )}
                          {isDeadlinePassed && (
                            <span className="text-sm font-normal text-red-500 ml-2">
                              (Deadline passed)
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {scholarship.categoryTags.map((tag) => (
                      <span 
                        key={tag} 
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {tag.replace('-', ' ')}
                      </span>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 pt-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      About This Scholarship
                    </h2>
                    <div className={`text-gray-700 ${showFullDescription ? '' : 'line-clamp-4'}`}>
                      <p>{scholarship.description}</p>
                      <p className="mt-4">
                        The {scholarship.name} aims to support talented students pursuing degrees in {scholarship.requirements.majors?.join(', ') || 'various fields'}. Recipients will join a community of scholars dedicated to academic excellence and making a positive impact in their fields.
                      </p>
                      <p className="mt-4">
                        This scholarship can be used to cover tuition fees, books, and other educational expenses for the academic year.
                      </p>
                    </div>
                    <button 
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      className="flex items-center text-blue-600 hover:text-blue-700 mt-2 text-sm font-medium"
                    >
                      {showFullDescription ? (
                        <>
                          Show less
                          <ChevronUp className="ml-1 h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Read more
                          <ChevronDown className="ml-1 h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </Card>

              <Card className="mb-8">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Eligibility Requirements
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-md font-medium text-gray-900 mb-2 flex items-center">
                        <GraduationCap className="h-5 w-5 text-blue-600 mr-2" />
                        Academic Requirements
                      </h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1 ml-7">
                        {scholarship.requirements.minimumGPA && (
                          <li>Minimum GPA of {scholarship.requirements.minimumGPA}</li>
                        )}
                        <li>
                          Open to students pursuing {scholarship.requirements.educationLevel.join(', ')} degrees
                        </li>
                        {scholarship.requirements.majors && (
                          <li>
                            Fields of study: {scholarship.requirements.majors.join(', ')}
                          </li>
                        )}
                      </ul>
                    </div>

                    {scholarship.requirements.demographics && (
                      <div>
                        <h3 className="text-md font-medium text-gray-900 mb-2 flex items-center">
                          <User className="h-5 w-5 text-blue-600 mr-2" />
                          Demographic Eligibility
                        </h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-7">
                          {scholarship.requirements.demographics.ethnicity && (
                            <li>
                              Open to students of {scholarship.requirements.demographics.ethnicity.join(', ')} descent
                            </li>
                          )}
                          {scholarship.requirements.demographics.gender && (
                            <li>
                              Open to {scholarship.requirements.demographics.gender} students
                            </li>
                          )}
                          {scholarship.requirements.demographics.firstGeneration && (
                            <li>
                              Must be a first-generation college student
                            </li>
                          )}
                          {scholarship.requirements.demographics.disability && (
                            <li>
                              Open to students with disabilities
                            </li>
                          )}
                        </ul>
                      </div>
                    )}

                    <div>
                      <h3 className="text-md font-medium text-gray-900 mb-2 flex items-center">
                        <FileText className="h-5 w-5 text-blue-600 mr-2" />
                        Application Requirements
                      </h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1 ml-7">
                        <li>Completed application form</li>
                        <li>Academic transcripts</li>
                        <li>Personal statement or essay</li>
                        <li>Letters of recommendation</li>
                        <li>Resume or curriculum vitae</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Application Process
                  </h2>
                  
                  <ol className="space-y-4 mb-6">
                    <li className="flex">
                      <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm mr-4">
                        1
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Create an account</h3>
                        <p className="text-gray-600 text-sm">
                          Sign up on ScholarHub to access the application portal
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex">
                      <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm mr-4">
                        2
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Complete your profile</h3>
                        <p className="text-gray-600 text-sm">
                          Fill out your personal and academic information to pre-populate application fields
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex">
                      <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm mr-4">
                        3
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Prepare required documents</h3>
                        <p className="text-gray-600 text-sm">
                          Upload transcripts, write your personal statement, and request recommendation letters
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex">
                      <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm mr-4">
                        4
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Submit your application</h3>
                        <p className="text-gray-600 text-sm">
                          Review all information and submit before the deadline
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex">
                      <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm mr-4">
                        5
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Track your application</h3>
                        <p className="text-gray-600 text-sm">
                          Monitor your application status through your ScholarHub dashboard
                        </p>
                      </div>
                    </li>
                  </ol>
                  
                  <div className="bg-blue-50 p-4 rounded-md flex items-start mt-6">
                    <div className="flex-shrink-0 mt-1">
                      <Award className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Selection Process</h3>
                      <p className="mt-1 text-sm text-blue-700">
                        Applications are reviewed by a committee of educators and professionals. Finalists may be invited for an interview. Recipients will be notified by email approximately 4-6 weeks after the application deadline.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar (Right Column) */}
            <div className="lg:w-1/3 space-y-6">
              <Card className="overflow-visible">
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Application Summary
                    </h3>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Award:</span>
                        <span className="font-medium text-gray-900">{formatAmount(scholarship.amount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Deadline:</span>
                        <span className={`font-medium ${isDeadlinePassed ? 'text-red-500' : 'text-gray-900'}`}>
                          {new Date(scholarship.deadline).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Education Level:</span>
                        <span className="font-medium text-gray-900">
                          {scholarship.requirements.educationLevel.join(', ')}
                        </span>
                      </div>
                    </div>
                    
                    {isDeadlinePassed ? (
                      <Button
                        disabled
                        fullWidth
                        variant="danger"
                        className="mb-3"
                      >
                        Deadline Passed
                      </Button>
                    ) : isApplied ? (
                      <Button
                        disabled
                        fullWidth
                        variant="success"
                        className="mb-3"
                      >
                        Application Submitted
                      </Button>
                    ) : (
                      <a href={scholarship.applicationLink}>
                        <Button
                          fullWidth
                          className="mb-3"
                          icon={<ExternalLink className="h-4 w-4" />}
                        >
                          Apply Now
                        </Button>
                      </a>
                    )}
                    
                    <button
                      onClick={handleSaveToggle}
                      className={`flex items-center justify-center w-full py-2 px-4 border rounded-md transition-colors ${
                        isSaved 
                          ? 'border-blue-600 text-blue-600 bg-blue-50 hover:bg-blue-100' 
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {isSaved ? (
                        <>
                          <BookmarkCheck className="h-4 w-4 mr-2" />
                          Saved
                        </>
                      ) : (
                        <>
                          <Bookmark className="h-4 w-4 mr-2" />
                          Save Scholarship
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-center border-t border-gray-100 pt-4">
                    <button className="flex items-center text-gray-500 hover:text-gray-700 mr-6">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </button>
                    <a 
                      href="#" 
                      className="flex items-center text-gray-500 hover:text-gray-700"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Provider Website
                    </a>
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    About the Provider
                  </h3>
                  
                  <div className="flex items-center mb-4">
                    {scholarship.logoUrl ? (
                      <img 
                        src={scholarship.logoUrl} 
                        alt={scholarship.provider} 
                        className="w-12 h-12 object-cover rounded-md mr-4"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-blue-100 flex items-center justify-center rounded-md mr-4">
                        <Award className="w-6 h-6 text-blue-600" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-medium text-gray-900">{scholarship.provider}</h4>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        Los Angeles, CA
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    The {scholarship.provider} is dedicated to supporting education and fostering the next generation of leaders in {scholarship.requirements.majors?.join(', ') || 'various fields'}.
                  </p>
                  
                  <div className="text-sm">
                    <a 
                      href="#" 
                      className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
                    >
                      Learn more about {scholarship.provider}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Related Scholarships
                  </h3>
                  
                  <div className="space-y-4">
                    <a 
                      href="/scholarship/2" 
                      className="block hover:bg-gray-50 -mx-6 px-6 py-3 transition-colors"
                    >
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-blue-100 flex items-center justify-center rounded-md flex-shrink-0">
                          <BookOpen className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-gray-900">Women in STEM Grant</h4>
                          <p className="text-xs text-gray-500 mt-1">$7,500 • Due May 30, 2025</p>
                        </div>
                      </div>
                    </a>
                    
                    <a 
                      href="/scholarship/6" 
                      className="block hover:bg-gray-50 -mx-6 px-6 py-3 transition-colors"
                    >
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-blue-100 flex items-center justify-center rounded-md flex-shrink-0">
                          <BookOpen className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-gray-900">Arts & Humanities Fellowship</h4>
                          <p className="text-xs text-gray-500 mt-1">$6,000 • Due Aug 15, 2025</p>
                        </div>
                      </div>
                    </a>
                    
                    <a 
                      href="/scholarship/8" 
                      className="block hover:bg-gray-50 -mx-6 px-6 py-3 transition-colors"
                    >
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-blue-100 flex items-center justify-center rounded-md flex-shrink-0">
                          <BookOpen className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-gray-900">Entrepreneurship Innovation Grant</h4>
                          <p className="text-xs text-gray-500 mt-1">$12,000 • Due Sep 1, 2025</p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};