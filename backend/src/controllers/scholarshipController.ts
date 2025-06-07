import { Request, Response } from 'express';
import { Scholarship } from '../models/Scholarship';

const isScholarshipExpired = (scholarship: any): boolean => {
  if (!scholarship?.eligibility?.deadline_date) {
    return true; // Consider scholarships without deadlines as expired
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const deadline = new Date(scholarship.eligibility.deadline_date);
    if (isNaN(deadline.getTime())) {
      return true; // Consider invalid dates as expired
    }
    
    deadline.setHours(0, 0, 0, 0);
    return deadline < today;
  } catch (error) {
    console.log(`Error checking expiration for scholarship: ${scholarship.title}`, error);
    return true; // Consider scholarships with date processing errors as expired
  }
};

const filterExpiredScholarships = (scholarships: any[]) => {
  const filtered = scholarships.filter(scholarship => !isScholarshipExpired(scholarship));
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

    // Check if scholarship is expired
    if (isScholarshipExpired(scholarship)) {
      console.log('Scholarship is expired:', scholarship.title);
      return res.status(404).json({ message: 'This scholarship has expired' });
    }

    console.log('Found active scholarship:', scholarship.title);
    res.json(scholarship);
  } catch (error) {
    console.error('Error in getScholarshipById:', error);
    res.status(500).json({ message: 'Error fetching scholarship', error });
  }
};

export const deleteExpiredScholarships = async () => {
  try {
    console.log('Starting cleanup of expired scholarships...');
    const scholarships = await Scholarship.find({});
    console.log(`Found ${scholarships.length} total scholarships`);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    console.log('Current date for comparison:', today.toISOString());

    const expiredScholarships = scholarships.filter(scholarship => {
      const isExpired = isScholarshipExpired(scholarship);
      if (isExpired) {
        console.log(`\nExpired scholarship found:`);
        console.log(`Title: ${scholarship.title}`);
        console.log(`Deadline: ${scholarship.eligibility?.deadline_date}`);
        if (scholarship.eligibility?.deadline_date) {
          const deadline = new Date(scholarship.eligibility.deadline_date);
          console.log(`Parsed deadline: ${deadline.toISOString()}`);
          console.log(`Days until deadline: ${Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))}`);
        }
      }
      return isExpired;
    });

    console.log(`\nFound ${expiredScholarships.length} expired scholarships to delete`);

    if (expiredScholarships.length === 0) {
      console.log('No expired scholarships to delete');
      return 0;
    }

    const expiredIds = expiredScholarships.map(scholarship => scholarship._id);
    const result = await Scholarship.deleteMany({ _id: { $in: expiredIds } });
    
    console.log(`\nCleanup Summary:`);
    console.log(`Total scholarships: ${scholarships.length}`);
    console.log(`Expired scholarships found: ${expiredScholarships.length}`);
    console.log(`Successfully deleted: ${result.deletedCount}`);
    
    return result.deletedCount;
  } catch (error) {
    console.error('Error deleting expired scholarships:', error);
    throw error;
  }
};