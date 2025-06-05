import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
  question: String,
  answer: String
});

const linkSchema = new mongoose.Schema({
  text: String,
  href: String
});

const eligibilitySchema = new mongoose.Schema({
  deadline_date: String,
  criteria: [String],
  eligibility_summary: String
});

const howToApplySchema = new mongoose.Schema({
  instructions: [String],
  notes: [String]
});

const scholarshipSchema = new mongoose.Schema({
  title: String,
  link: String,
  amount: String,
  benefits: [String],
  contact_details: String,
  documents: [String],
  eligibility: eligibilitySchema,
  faqs: [faqSchema],
  how_to_apply: howToApplySchema,
  important_dates: String,
  important_links: [linkSchema],
  last_updated: String,
  selection_criteria: String,
  image_url: String
});

export const Scholarship = mongoose.model('Scholarship', scholarshipSchema, 'scholarships'); 