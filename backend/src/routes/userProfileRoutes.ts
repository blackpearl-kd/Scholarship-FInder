import express from 'express';
import { signup, signin, signout, completeProfile, getRecommendedScholarships, getProfile } from '../controllers/userProfileController';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);
router.post('/complete-profile', completeProfile);
router.get('/:userId', getProfile);
router.get('/:userId/recommended-scholarships', getRecommendedScholarships);

export default router; 