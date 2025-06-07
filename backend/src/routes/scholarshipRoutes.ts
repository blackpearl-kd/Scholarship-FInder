import express from 'express';
import { getAllScholarships, searchScholarships, getScholarshipById, deleteExpiredScholarships } from '../controllers/scholarshipController';

const router = express.Router();

router.get('/', getAllScholarships);
router.get('/search', searchScholarships);
router.get('/:id', getScholarshipById);

// Temporary endpoint to trigger cleanup
router.post('/cleanup-expired', async (req, res) => {
  try {
    const deletedCount = await deleteExpiredScholarships();
    res.json({ message: 'Cleanup completed', deletedCount });
  } catch (error) {
    res.status(500).json({ message: 'Error during cleanup', error });
  }
});

export default router; 