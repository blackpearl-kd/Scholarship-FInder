const mongoose = require('mongoose');
const { Scholarship } = require('../models/Scholarship');

const MONGODB_URI = 'mongodb+srv://test:test12345678!!@cluster0.ywto1wl.mongodb.net/scholarship_db';

const sampleScholarships = [
  {
    title: "Merit Scholarship for Engineering Students",
    link: "https://example.com/merit-scholarship",
    amount: "$5,000 per year",
    benefits: ["Full tuition coverage", "Living stipend", "Research opportunities"],
    contact_details: "scholarships@university.edu",
    documents: ["Transcript", "Letter of recommendation", "Personal statement"],
    eligibility: {
      deadline_date: "2025-03-15",
      criteria: ["GPA 3.5+", "Engineering major", "Full-time student", "Indian citizen"],
      eligibility_summary: "Open to engineering students with excellent academic record from India"
    },
    faqs: [
      {
        question: "What is the application deadline?",
        answer: "March 15, 2025"
      },
      {
        question: "Is this renewable?",
        answer: "Yes, renewable for up to 4 years with maintained GPA"
      }
    ],
    how_to_apply: {
      instructions: ["Complete online application", "Submit required documents", "Interview if selected"],
      notes: ["Applications open January 1, 2025"]
    },
    important_dates: "Application Deadline: March 15, 2025",
    important_links: [
      { text: "Apply Now", href: "https://example.com/apply" },
      { text: "Guidelines", href: "https://example.com/guidelines" }
    ],
    last_updated: "2024-12-01",
    selection_criteria: "Academic excellence, leadership potential, and financial need",
    image_url: "https://example.com/scholarship1.jpg"
  },
  {
    title: "Women in STEM Scholarship",
    link: "https://example.com/women-stem",
    amount: "$3,000 per year",
    benefits: ["Tuition assistance", "Mentorship program", "Networking events"],
    contact_details: "womeninstem@foundation.org",
    documents: ["Transcript", "Essay", "Resume"],
    eligibility: {
      deadline_date: "2025-04-30",
      criteria: ["Female student", "STEM major", "Sophomore or higher", "USA resident"],
      eligibility_summary: "Supporting women pursuing degrees in STEM fields in the United States"
    },
    faqs: [
      {
        question: "Who can apply?",
        answer: "Female students in STEM majors with sophomore standing or higher"
      }
    ],
    how_to_apply: {
      instructions: ["Submit online application", "Write personal essay", "Provide references"],
      notes: ["Essay should describe career goals in STEM"]
    },
    important_dates: "Application Deadline: April 30, 2025",
    important_links: [
      { text: "Application Form", href: "https://example.com/women-stem-apply" }
    ],
    last_updated: "2024-12-01",
    selection_criteria: "Academic achievement, passion for STEM, and career goals",
    image_url: "https://example.com/scholarship2.jpg"
  },
  {
    title: "International Student Excellence Award",
    link: "https://example.com/international-award",
    amount: "$4,000 per year",
    benefits: ["Tuition reduction", "Cultural exchange programs", "Language support"],
    contact_details: "international@university.edu",
    documents: ["Passport copy", "Academic records", "English proficiency"],
    eligibility: {
      deadline_date: "2025-02-28",
      criteria: ["International student", "F-1 visa", "GPA 3.0+", "Any country"],
      eligibility_summary: "Supporting outstanding international students from any country"
    },
    faqs: [
      {
        question: "Do I need to be a full-time student?",
        answer: "Yes, you must maintain full-time enrollment"
      }
    ],
    how_to_apply: {
      instructions: ["Complete international student application", "Submit visa documents", "Provide academic references"],
      notes: ["Must maintain F-1 status throughout award period"]
    },
    important_dates: "Application Deadline: February 28, 2025",
    important_links: [
      { text: "International Office", href: "https://example.com/international" }
    ],
    last_updated: "2024-12-01",
    selection_criteria: "Academic excellence, cultural contribution, and leadership",
    image_url: "https://example.com/scholarship3.jpg"
  },
  {
    title: "Community Service Leadership Scholarship",
    link: "https://example.com/community-service",
    amount: "$2,500 per year",
    benefits: ["Service learning opportunities", "Leadership development", "Community connections"],
    contact_details: "service@university.edu",
    documents: ["Service verification", "Leadership essay", "Letters of recommendation"],
    eligibility: {
      deadline_date: "2025-05-15",
      criteria: ["Demonstrated community service", "Leadership experience", "GPA 3.0+", "Maharashtra resident"],
      eligibility_summary: "Recognizing students who make a difference in their communities in Maharashtra"
    },
    faqs: [
      {
        question: "What counts as community service?",
        answer: "Volunteer work with non-profit organizations, schools, or community groups"
      }
    ],
    how_to_apply: {
      instructions: ["Document service hours", "Write leadership essay", "Submit recommendations"],
      notes: ["Minimum 100 service hours required"]
    },
    important_dates: "Application Deadline: May 15, 2025",
    important_links: [
      { text: "Service Verification Form", href: "https://example.com/service-form" }
    ],
    last_updated: "2024-12-01",
    selection_criteria: "Service commitment, leadership potential, and academic achievement",
    image_url: "https://example.com/scholarship4.jpg"
  },
  {
    title: "First-Generation College Student Grant",
    link: "https://example.com/first-gen",
    amount: "$3,500 per year",
    benefits: ["Academic support", "Peer mentoring", "Career guidance"],
    contact_details: "firstgen@university.edu",
    documents: ["Family income verification", "Personal statement", "Academic records"],
    eligibility: {
      deadline_date: "2025-03-31",
      criteria: ["First-generation college student", "Demonstrated financial need", "GPA 2.8+", "Class 12 completed"],
      eligibility_summary: "Supporting students who are the first in their family to attend college"
    },
    faqs: [
      {
        question: "What defines a first-generation student?",
        answer: "Neither parent has completed a four-year college degree"
      }
    ],
    how_to_apply: {
      instructions: ["Complete FAFSA", "Submit family income documents", "Write personal statement"],
      notes: ["Must demonstrate financial need through FAFSA"]
    },
    important_dates: "Application Deadline: March 31, 2025",
    important_links: [
      { text: "FAFSA Information", href: "https://example.com/fafsa" }
    ],
    last_updated: "2024-12-01",
    selection_criteria: "First-generation status, financial need, and academic potential",
    image_url: "https://example.com/scholarship5.jpg"
  },
  {
    title: "Graduate Research Fellowship",
    link: "https://example.com/graduate-research",
    amount: "$25,000 per year",
    benefits: ["Research funding", "Conference travel", "Publication support"],
    contact_details: "research@university.edu",
    documents: ["Research proposal", "CV", "Letters of recommendation"],
    eligibility: {
      deadline_date: "2025-01-15",
      criteria: ["Graduate student", "Research focus", "Faculty recommendation", "PhD program"],
      eligibility_summary: "Supporting graduate students conducting innovative research in PhD programs"
    },
    faqs: [
      {
        question: "What research areas are supported?",
        answer: "All academic disciplines with faculty approval"
      }
    ],
    how_to_apply: {
      instructions: ["Develop research proposal", "Secure faculty advisor", "Submit application package"],
      notes: ["Research proposal should be 5-10 pages"]
    },
    important_dates: "Application Deadline: January 15, 2025",
    important_links: [
      { text: "Research Guidelines", href: "https://example.com/research-guidelines" }
    ],
    last_updated: "2024-12-01",
    selection_criteria: "Research quality, academic excellence, and innovation potential",
    image_url: "https://example.com/scholarship6.jpg"
  }
];

async function addSampleData() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    console.log('Adding sample scholarship data...');
    const result = await Scholarship.insertMany(sampleScholarships);
    console.log(`Successfully added ${result.length} scholarships`);

    console.log('Verifying data...');
    const count = await Scholarship.countDocuments();
    console.log(`Total scholarships in database: ${count}`);

    console.log('Sample scholarship data:');
    const sample = await Scholarship.findOne();
    console.log(JSON.stringify(sample, null, 2));

    console.log('Sample data added successfully!');
  } catch (error) {
    console.error('Error adding sample data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

addSampleData(); 