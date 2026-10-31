import { Router } from 'express';
import {
  getPuppies,
  getPuppyBySlug,
  getFeaturedPuppies,
  getGoneHomePuppies
} from '../controllers/puppyController';

const router = Router();

router.get('/', getPuppies);
router.get('/featured', getFeaturedPuppies);
router.get('/gone-home', getGoneHomePuppies);
router.get('/:slug', getPuppyBySlug);

export default router;
