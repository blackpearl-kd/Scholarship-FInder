import { Request, Response } from 'express';
import { Scholarship } from '../models/Scholarship';

export const getAllScholarships = async (req: Request, res: Response) => {
  try {
    console.log('Fetching all scholarships...');
    const scholarships = await Scholarship.find({});
    console.log('Found scholarships:', scholarships.length);
    console.log('First scholarship:', scholarships[0]);
    res.json(scholarships);
  } catch (error) {
    console.error('Error in getAllScholarships:', error);
    res.status(500).json({ message: 'Error fetching scholarships', error });
  }
};

export const searchScholarships = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    console.log('Searching scholarships with query:', query);
    const searchRegex = new RegExp(String(query), 'i');
    
    const scholarships = await Scholarship.find({
      $or: [
        { title: searchRegex },
        { 'eligibility.eligibility_summary': searchRegex },
        { amount: searchRegex }
      ]
    });
    
    console.log('Found scholarships in search:', scholarships.length);
    res.json(scholarships);
  } catch (error) {
    console.error('Error in searchScholarships:', error);
    res.status(500).json({ message: 'Error searching scholarships', error });
  }
}; 

export const getScholarshipById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const scholarship = await Scholarship.findById(id);
    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }
    res.json(scholarship);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching scholarship', error });
  }
};