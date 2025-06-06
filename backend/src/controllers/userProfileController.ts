import { Request, Response } from 'express';
import { UserProfile } from '../models/UserProfile';
import { Scholarship } from '../models/Scholarship';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const signup = async (req: Request, res: Response) => {
  const { name, email_id, password } = req.body;
  try {
    const existingUser = await UserProfile.findOne({ email_id });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserProfile({ name, email_id, password: hashedPassword });
    await user.save();
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error } );
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email_id, password } = req.body;
  try {
    const user = await UserProfile.findOne({ email_id });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id, email_id: user.email_id }, JWT_SECRET, { expiresIn: '1d' });
    return res.status(200).json({ token, user: { name: user.name, email_id: user.email_id, _id: user._id }, userId: user._id });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

export const completeProfile = async (req: Request, res: Response) => {
  const { userId } = req.body; // Should be extracted from JWT in production
  const {
    name,
    course,
    location,
    citizenship,
    degree_level,
    start_date,
    income_status,
    categories,
    current_status,
    interests
  } = req.body;
  try {
    const user = await UserProfile.findByIdAndUpdate(
      userId,
      {
        name,
        course,
        location,
        citizenship,
        degree_level,
        start_date,
        income_status,
        categories,
        current_status,
        interests
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

export const signout = async (req: Request, res: Response) => {
  // For JWT, signout is handled on the client by deleting the token
  return res.status(200).json({ message: 'Signed out successfully' });
};

export const getRecommendedScholarships = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await UserProfile.findById(userId).populate('recommended_scholarships');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ recommended_scholarships: user.recommended_scholarships });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await UserProfile.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
}; 