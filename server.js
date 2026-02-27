import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import contactRoutes from './routes/contact.js';
import devisRoutes from './routes/devis.js';

// Load environment variables (local dev only, Vercel uses dashboard env vars)
// Load environment variables
const __dirname = dirname(fileURLToPath(import.meta.url));
if (process.env.VERCEL !== '1') {
  // Look for .env in the backend directory first, then root as fallback
  dotenv.config({ path: resolve(__dirname, '.env') });
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

// Error handling middleware for JSON parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Bad JSON:', err.message);
    return res.status(400).json({
      success: false,
      message: 'Format de données invalide'
    });
  }
  next();
});

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

// Global error handler - ensures all errors return JSON
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  
  // Ensure we always send JSON
  if (!res.headersSent) {
    res.status(err.status || 500).json({
      success: false,
      message: 'Une erreur interne est survenue',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// 404 handler - return JSON for API routes
app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({
      success: false,
      message: 'Route non trouvée'
    });
  }
  res.status(404).send('Not Found');
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