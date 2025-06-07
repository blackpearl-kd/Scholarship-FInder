import cron from 'node-cron';
import { deleteExpiredScholarships } from '../controllers/scholarshipController';

// Schedule the cleanup task to run at midnight every day
export const scheduleCleanup = () => {
  // Run at midnight (00:00) every day
  cron.schedule('0 0 * * *', async () => {
    console.log('Running scheduled cleanup of expired scholarships...');
    try {
      const deletedCount = await deleteExpiredScholarships();
      console.log(`Cleanup completed. Deleted ${deletedCount || 0} expired scholarships.`);
    } catch (error) {
      console.error('Failed to run scheduled cleanup:', error);
    }
  });
  
  console.log('Scheduled cleanup task for expired scholarships is active');
}; 