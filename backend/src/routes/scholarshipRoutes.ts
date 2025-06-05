import express from 'express';
import { getAllScholarships, searchScholarships, getScholarshipById } from '../controllers/scholarshipController';

const router = express.Router();

router.get('/', getAllScholarships);
router.get('/search', searchScholarships);
router.get('/:id', getScholarshipById);

export default router; 