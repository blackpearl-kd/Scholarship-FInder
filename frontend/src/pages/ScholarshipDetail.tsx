import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

const API_URL = 'http://localhost:5000/api';

const ScholarshipDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [scholarship, setScholarship] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        const response = await fetch(`${API_URL}/scholarships/${id}`);
        if (!response.ok) throw new Error('Scholarship not found');
        const data = await response.json();
        setScholarship(data);
      } catch (error) {
        setScholarship(null);
      } finally {
        setLoading(false);
      }
    };
    fetchScholarship();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-12 text-center">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!scholarship) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Scholarship not found</h2>
          <Link to="/scholarships" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            Back to scholarships
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-6">
          <div className="mb-6">
            <button onClick={() => navigate(-1)} className="inline-flex items-center text-gray-600 hover:text-blue-600">
              Back
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{scholarship.title}</h1>
              <div className="mb-4">
                <strong>Contact Details:</strong>
                <div className="text-gray-700">{scholarship.contact_details}</div>
              </div>
              <div className="mb-4">
                <strong>Eligibility:</strong>
                <div className="text-gray-700 whitespace-pre-line">
                  <div><b>Deadline:</b> {scholarship.eligibility?.deadline_date}</div>
                  <div><b>Summary:</b> {scholarship.eligibility?.eligibility_summary}</div>
                  <div><b>Criteria:</b>
                    <ul className="list-disc ml-6">
                      {scholarship.eligibility?.criteria?.map((c: string, i: number) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <strong>FAQs:</strong>
                <ul className="list-disc ml-6">
                  {scholarship.faqs?.map((faq: any, i: number) => (
                    <li key={i}><b>{faq.question}</b> {faq.answer}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <strong>How to Apply:</strong>
                <ul className="list-disc ml-6">
                  {scholarship.how_to_apply?.instructions?.map((ins: string, i: number) => (
                    <li key={i}>{ins}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <strong>Important Dates:</strong>
                <div className="text-gray-700">{scholarship.important_dates}</div>
              </div>
              <div className="mb-4">
                <strong>Important Links:</strong>
                <ul>
                  {scholarship.important_links?.map((link: any, i: number) => (
                    <li key={i}>
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <strong>Last Updated:</strong>
                <div className="text-gray-700">{scholarship.last_updated}</div>
              </div>
              <div className="mb-4">
                <strong>Selection Criteria:</strong>
                <div className="text-gray-700">{scholarship.selection_criteria}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ScholarshipDetail;