import { Router } from 'express';
import { getFaqs, getReviews } from '../controllers/contentController';

const router = Router();

router.get('/faqs', getFaqs);
router.get('/reviews', getReviews);

export default router;
