import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Import routes
import apiRoutes from './routes/api.js';
import adminRoutes from './routes/admin.js';

// Import database
import { initDatabase } from './models/database.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable for development
  crossOriginEmbedderPolicy: false
}));

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));

// Compression
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || '15') * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX || '100'),
  message: 'Too many requests from this IP, please try again later.'
});

app.use('/api/', limiter);

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, './uploads')));
app.use('/assets', express.static(path.join(__dirname, '../public/assets')));

// API routes
app.use('/api', apiRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Initialize database
initDatabase();

// Start server
app.listen(PORT, HOST, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🌍 Elim G Mission - Glocal Platform Server 🌍      ║
║                                                       ║
║   Server running on: http://${HOST}:${PORT}${' '.repeat(Math.max(0, 13 - HOST.length - PORT.toString().length))}║
║   Environment: ${process.env.NODE_ENV || 'development'}${' '.repeat(Math.max(0, 29 - (process.env.NODE_ENV || 'development').length))}║
║                                                       ║
║   API Endpoints:                                      ║
║   - GET  /health              Health check           ║
║   - GET  /api/visitors        Visitor stats          ║
║   - POST /api/newsletter      Newsletter subscribe   ║
║   - POST /api/donation        Make donation          ║
║   - GET  /api/news            Get news               ║
║   - POST /api/comments        Post comment           ║
║   - GET  /api/i18n/:lang      Get translations       ║
║   - POST /api/admin/*         Admin endpoints        ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
  `);
});

export default app;
