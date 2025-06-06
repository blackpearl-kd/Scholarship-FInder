import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email_id: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  course: { type: String },
  location: { type: String },
  citizenship: { type: String },
  degree_level: { type: String },
  start_date: { type: String },
  income_status: { type: String },
  categories: [{ type: String }],
  current_status: { type: String },
  interests: [{ type: String }],
  recommended_scholarships: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Scholarship' }],
}, { timestamps: true });

export const UserProfile = mongoose.model('UserProfile', userProfileSchema, 'user_profile'); 