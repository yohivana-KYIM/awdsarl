import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import contactRoutes from './routes/contact.js';
import devisRoutes from './routes/devis.js';

// Load environment variables from root .env
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.API_PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://awdsarl.com', 'https://www.awdsarl.com'],
  methods: ['POST', 'GET'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api', contactRoutes);
app.use('/api', devisRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`API Server running on http://localhost:${PORT}`);
  console.log(`SMTP Host: ${process.env.SMTP_HOST}`);
});