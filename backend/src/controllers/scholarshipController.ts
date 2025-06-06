import { Request, Response } from 'express';
import { Scholarship } from '../models/Scholarship';

const filterExpiredScholarships = (scholarships: any[]) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison
  
  console.log('Today\'s date for comparison:', today.toISOString());
  
  const filtered = scholarships.filter(scholarship => {
    // Skip scholarships with missing or invalid deadline dates
    if (!scholarship?.eligibility?.deadline_date) {
      console.log(`Skipping scholarship with missing deadline: ${scholarship?.title || 'Unknown'}`);
      return false;
    }

    try {
      const deadline = new Date(scholarship.eligibility.deadline_date);
      // Check if date is valid by comparing with itself
      if (isNaN(deadline.getTime())) {
        console.log(`Skipping scholarship with invalid deadline date: ${scholarship.title}`);
        return false;
      }
      
      deadline.setHours(0, 0, 0, 0);
      const isActive = deadline >= today;
      console.log(`Scholarship: ${scholarship.title}, Deadline: ${deadline.toISOString()}, Is Active: ${isActive}`);
      return isActive;
    } catch (error) {
      console.log(`Error processing deadline for scholarship: ${scholarship.title}`, error);
      return false;
    }
  });
  
  console.log(`Filtered out ${scholarships.length - filtered.length} expired or invalid scholarships`);
  return filtered;
};

const sortScholarships = (scholarships: any[], sortBy: string, order: 'asc' | 'desc') => {
  return [...scholarships].sort((a, b) => {
    let valueA, valueB;

    if (sortBy === 'date') {
      valueA = new Date(a.eligibility?.deadline_date || 0).getTime();
      valueB = new Date(b.eligibility?.deadline_date || 0).getTime();
    } else if (sortBy === 'amount') {
      // Extract numeric value from amount string
      valueA = parseInt(a.amount?.replace(/[^\d]/g, '') || '0');
      valueB = parseInt(b.amount?.replace(/[^\d]/g, '') || '0');
    } else {
      return 0;
    }

    return order === 'asc' ? valueA - valueB : valueB - valueA;
  });
};

export const getAllScholarships = async (req: Request, res: Response) => {
  try {
    console.log('Fetching all scholarships...');
    const { sortBy, order } = req.query;
    console.log('Sort parameters:', { sortBy, order });

    const scholarships = await Scholarship.find({});
    console.log('Raw scholarships from database:', scholarships.length);
    
    if (scholarships.length === 0) {
      console.log('No scholarships found in database');
      return res.json([]);
    }
    
    // Log first scholarship for debugging
    console.log('Sample scholarship:', {
      title: scholarships[0].title,
      deadline: scholarships[0].eligibility?.deadline_date,
      amount: scholarships[0].amount
    });
    
    // Filter out expired scholarships
    let activeScholarships = filterExpiredScholarships(scholarships);
    console.log('Active scholarships after filtering:', activeScholarships.length);

    // Apply sorting if sort parameters are provided
    if (sortBy && order) {
      activeScholarships = sortScholarships(
        activeScholarships,
        String(sortBy),
        String(order) as 'asc' | 'desc'
      );
      console.log('Scholarships sorted by:', sortBy, 'in', order, 'order');
    }
    
    res.json(activeScholarships);
  } catch (error) {
    console.error('Error in getAllScholarships:', error);
    res.status(500).json({ message: 'Error fetching scholarships', error });
  }
};

export const searchScholarships = async (req: Request, res: Response) => {
  try {
    const { query, sortBy, order } = req.query;
    console.log('Search parameters:', { query, sortBy, order });
    const searchRegex = new RegExp(String(query), 'i');
    
    const scholarships = await Scholarship.find({
      $or: [
        { title: searchRegex },
        { 'eligibility.eligibility_summary': searchRegex },
        { amount: searchRegex }
      ]
    });
    
    console.log('Found scholarships in search before filtering:', scholarships.length);
    
    // Filter out expired scholarships
    let activeScholarships = filterExpiredScholarships(scholarships);
    console.log('Active scholarships after filtering:', activeScholarships.length);

    // Apply sorting if sort parameters are provided
    if (sortBy && order) {
      activeScholarships = sortScholarships(
        activeScholarships,
        String(sortBy),
        String(order) as 'asc' | 'desc'
      );
      console.log('Scholarships sorted by:', sortBy, 'in', order, 'order');
    }
    
    res.json(activeScholarships);
  } catch (error) {
    console.error('Error in searchScholarships:', error);
    res.status(500).json({ message: 'Error searching scholarships', error });
  }
};

export const getScholarshipById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log('Fetching scholarship by ID:', id);
    const scholarship = await Scholarship.findById(id);
    if (!scholarship) {
      console.log('Scholarship not found for ID:', id);
      return res.status(404).json({ message: 'Scholarship not found' });
    }
    console.log('Found scholarship:', scholarship.title);
    res.json(scholarship);
  } catch (error) {
    console.error('Error in getScholarshipById:', error);
    res.status(500).json({ message: 'Error fetching scholarship', error });
  }
};