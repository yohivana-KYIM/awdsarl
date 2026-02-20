import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import contactRoutes from './routes/contact.js';
import devisRoutes from './routes/devis.js';

// Load environment variables (local dev only, Vercel uses dashboard env vars)
const __dirname = dirname(fileURLToPath(import.meta.url));
if (process.env.VERCEL !== '1') {
  dotenv.config({ path: resolve(__dirname, '..', '.env') });
}

const app = express();
const PORT = process.env.API_PORT || 3001;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://awdsarl.com',
    'https://www.awdsarl.com',
    'https://awdsarl.vercel.app',
    /\.vercel\.app$/
  ],
  methods: ['POST', 'GET'],
  credentials: true
}));
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'AWD SARL Backend API' });
});

// Routes
app.use('/api', contactRoutes);
app.use('/api', devisRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// Start server only in local dev (not on Vercel)
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`API Server running on http://localhost:${PORT}`);
    console.log(`SMTP Host: ${process.env.SMTP_HOST}`);
  });
}

// Export for Vercel serverless
export default app;