import React from 'react';
import Layout from '../components/Layout/Layout';
import { FileText, Book, DollarSign, HelpCircle, Download, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Resources: React.FC = () => {
  const resources = [
    {
      category: "Application Guides",
      items: [
        {
          title: "Scholarship Essay Writing Guide",
          description: "Learn how to write compelling scholarship essays that stand out.",
          link: "/resources/essay-writing",
          icon: FileText
        },
        {
          title: "Application Checklist",
          description: "A comprehensive checklist to ensure your application is complete.",
          link: "/resources/checklist",
          icon: Download
        },
        {
          title: "Letters of Recommendation Tips",
          description: "How to request and secure strong letters of recommendation.",
          link: "/resources/recommendation-letters",
          icon: FileText
        }
      ]
    },
    {
      category: "Financial Aid Resources",
      items: [
        {
          title: "FAFSA Guide",
          description: "Step-by-step guide to completing your FAFSA application.",
          link: "/resources/fafsa-guide",
          icon: DollarSign
        },
        {
          title: "Financial Aid Types Explained",
          description: "Understanding different types of financial aid available.",
          link: "/resources/aid-types",
          icon: Book
        },
        {
          title: "Scholarship FAQ",
          description: "Answers to commonly asked questions about scholarships.",
          link: "/resources/faq",
          icon: HelpCircle
        }
      ]
    }
  ];

  return (
    <Layout>
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Scholarship Resources</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about finding and applying for scholarships successfully.
            </p>
          </div>

          {resources.map((section, index) => (
            <div key={index} className="mb-16">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">{section.category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {section.items.map((item, itemIndex) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={itemIndex}
                      to={item.link}
                      className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start">
                        <div className="bg-blue-100 rounded-full p-3 mr-4">
                          <IconComponent className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                          <p className="text-gray-600 text-sm">{item.description}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">External Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a
                href="https://studentaid.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
              >
                <div className="bg-blue-100 rounded-full p-3 mr-4">
                  <ExternalLink className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Federal Student Aid</h3>
                  <p className="text-gray-600 text-sm">Official government resource for student financial aid</p>
                </div>
              </a>
              <a
                href="https://collegeboard.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
              >
                <div className="bg-blue-100 rounded-full p-3 mr-4">
                  <ExternalLink className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">College Board</h3>
                  <p className="text-gray-600 text-sm">Comprehensive college planning resources</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Resources;