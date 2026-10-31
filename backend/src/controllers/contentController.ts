import { Request, Response } from 'express';
import fs from 'fs';
import { resolveDataPath } from '../utils/pathResolver';

export const getFaqs = (_req: Request, res: Response) => {
  try {
    const faqsPath = resolveDataPath('faqs.json');
    const raw = fs.readFileSync(faqsPath, 'utf-8');
    const faqs = JSON.parse(raw);
    res.json({
      success: true,
      count: faqs.length,
      data: faqs
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to load FAQs' });
  }
};

export const getReviews = (_req: Request, res: Response) => {
  try {
    const reviewsPath = resolveDataPath('reviews.json');
    const raw = fs.readFileSync(reviewsPath, 'utf-8');
    const reviews = JSON.parse(raw);
    res.json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to load reviews' });
  }
};
