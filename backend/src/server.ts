import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import puppyRoutes from './routes/puppyRoutes';
import enquiryRoutes from './routes/enquiryRoutes';
import contentRoutes from './routes/contentRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middlewares
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Static media delivery (cloned images)
const mediaPath = path.join(__dirname, '../../scraped_data/media');
app.use('/media', express.static(mediaPath));

// API Routes
app.use('/api/puppies', puppyRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/enquiry', enquiryRoutes);
app.use('/api/content', contentRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'TeddyPups Backend API'
  });
});

app.get('/', (_req, res) => {
  res.send({
    message: 'Welcome to the TeddyPups U.A.E. Backend API',
    documentation: {
      health: '/api/health',
      puppies: '/api/puppies',
      featured: '/api/puppies/featured',
      goneHome: '/api/puppies/gone-home',
      enquiries: '/api/enquiries',
      faqs: '/api/content/faqs',
      reviews: '/api/content/reviews'
    }
  });
});

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🐾 TeddyPups Backend Server running on port ${PORT}`);
  console.log(`🐾 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`===============================================`);
});

export default app;
