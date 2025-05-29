import React from 'react';
import { Search, Award, Users, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Layout } from '../components/layout/Layout';
import { useScholarships } from '../context/ScholarshipContext';
import { ScholarshipCard } from '../components/scholarships/ScholarshipCard';

export const Home: React.FC = () => {
  const { scholarships } = useScholarships();
  const featuredScholarships = scholarships.filter(s => s.featured).slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Find the Perfect Scholarships for Your Education
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8">
                Discover thousands of scholarships personalized to your academic goals, background, and interests.
              </p>
              
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="search"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md text-gray-900"
                    placeholder="Search scholarships by name, provider, or keyword..."
                  />
                </div>
                <div className="mt-3 flex gap-2">
                  <Button variant="primary" fullWidth>
                    Search Scholarships
                  </Button>
                </div>
              </div>

              <div className="mt-8 flex items-center space-x-8 text-sm">
                <div className="flex items-center">
                  <div className="flex-shrink-0 rounded-full bg-blue-500 p-1">
                    <Award className="h-4 w-4" />
                  </div>
                  <span className="ml-2">1000+ Scholarships</span>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 rounded-full bg-blue-500 p-1">
                    <Users className="h-4 w-4" />
                  </div>
                  <span className="ml-2">10,000+ Students</span>
                </div>
              </div>
            </div>
            
            <div className="hidden md:block">
              <img
                src="https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Students together"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="text-white fill-current">
            <path d="M0,64L60,58.7C120,53,240,43,360,48C480,53,600,75,720,80C840,85,960,75,1080,69.3C1200,64,1320,64,1380,64L1440,64L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"></path>
          </svg>
        </div>
      </section>

      {/* Featured Scholarships */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Scholarships</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore these highlighted scholarship opportunities with upcoming deadlines
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {featuredScholarships.map((scholarship) => (
              <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
            ))}
          </div>

          <div className="text-center">
            <a href="/scholarships">
              <Button 
                variant="outline"
                size="lg"
                icon={<ArrowRight className="h-5 w-5" />}
                className="mt-4"
              >
                View All Scholarships
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How ScholarHub Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Start your scholarship journey with these simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Create Your Profile</h3>
              <p className="text-gray-600">
                Sign up and create your profile with educational details and preferences to get personalized scholarship recommendations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Discover Scholarships</h3>
              <p className="text-gray-600">
                Browse through thousands of scholarships and use filters to find the perfect match for your academic journey.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Apply and Succeed</h3>
              <p className="text-gray-600">
                Submit your applications through our platform and track your application status all in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Student Success Stories</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from students who found and won scholarships through our platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/3771089/pexels-photo-3771089.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Student"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">Sophia Williams</h4>
                  <p className="text-sm text-gray-500">Computer Science, Stanford</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Thanks to ScholarHub, I secured the Women in STEM scholarship that covered 75% of my tuition. The platform made it easy to find and apply!"
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Student"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">Marcus Johnson</h4>
                  <p className="text-sm text-gray-500">Business, NYU</p>
                </div>
              </div>
              <p className="text-gray-600">
                "As a first-generation college student, I was overwhelmed by the scholarship process. ScholarHub simplified everything and I won three scholarships!"
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Student"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">Emma Chen</h4>
                  <p className="text-sm text-gray-500">Environmental Science, UCLA</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I'd spent months searching for specific scholarships in my field with no luck. Within weeks of using ScholarHub, I found and won a perfect match!"
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-700 py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Scholarship?</h2>
            <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have discovered and secured funding for their education through ScholarHub.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/signup">
                <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100">
                  Create Free Account
                </Button>
              </a>
              <a href="/scholarships">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-purple-500">
                  Browse Scholarships
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};