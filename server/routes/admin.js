import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/database.js';
import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880') },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Authentication middleware
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = db.prepare('SELECT * FROM admin_users WHERE username = ? AND is_active = 1').get(username);
    
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    const validPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!validPassword) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    // Update last login
    db.prepare('UPDATE admin_users SET last_login = CURRENT_TIMESTAMP WHERE id = ?').run(user.id);
    
    // Generate token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

// All routes below require authentication
router.use(authMiddleware);

// Dashboard stats
router.get('/dashboard', (req, res) => {
  try {
    const visitors = db.prepare('SELECT COUNT(*) as count FROM visitors').get();
    const subscribers = db.prepare('SELECT COUNT(*) as count FROM newsletter_subscribers WHERE is_active = 1').get();
    const donations = db.prepare('SELECT COUNT(*) as count, SUM(amount) as total FROM donations WHERE status = "completed"').get();
    const news = db.prepare('SELECT COUNT(*) as count FROM news WHERE is_published = 1').get();
    const comments = db.prepare('SELECT COUNT(*) as count FROM comments WHERE is_approved = 0').get();
    
    res.json({
      success: true,
      stats: {
        visitors: visitors.count,
        subscribers: subscribers.count,
        donations: {
          count: donations.count || 0,
          total: donations.total || 0
        },
        news: news.count,
        pendingComments: comments.count
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ success: false, message: 'Failed to load dashboard' });
  }
});

// News management
router.get('/news', (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    const news = db.prepare(`
      SELECT * FROM news
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `).all(parseInt(limit), offset);
    
    const total = db.prepare('SELECT COUNT(*) as count FROM news').get();
    
    res.json({
      success: true,
      news,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: total.count,
        pages: Math.ceil(total.count / limit)
      }
    });
  } catch (error) {
    console.error('News fetch error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch news' });
  }
});

router.post('/news', upload.single('image'), async (req, res) => {
  try {
    const {
      title_ko, title_en, title_vi,
      content_ko, content_en, content_vi,
      excerpt_ko, excerpt_en, excerpt_vi,
      category, tags, author, is_published
    } = req.body;
    
    let image_url = null;
    
    if (req.file) {
      const optimizedPath = `optimized_${req.file.filename}`;
      await sharp(req.file.path)
        .resize(1200, 800, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 85 })
        .toFile(path.join(__dirname, '../uploads', optimizedPath));
      
      image_url = `/uploads/${optimizedPath}`;
    }
    
    const result = db.prepare(`
      INSERT INTO news (
        title_ko, title_en, title_vi,
        content_ko, content_en, content_vi,
        excerpt_ko, excerpt_en, excerpt_vi,
        image_url, category, tags, author, is_published
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      title_ko, title_en, title_vi,
      content_ko, content_en, content_vi,
      excerpt_ko, excerpt_en, excerpt_vi,
      image_url, category, tags, author, is_published ? 1 : 0
    );
    
    res.json({
      success: true,
      id: result.lastInsertRowid,
      message: 'News article created'
    });
  } catch (error) {
    console.error('News creation error:', error);
    res.status(500).json({ success: false, message: 'Failed to create news' });
  }
});

router.put('/news/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title_ko, title_en, title_vi,
      content_ko, content_en, content_vi,
      excerpt_ko, excerpt_en, excerpt_vi,
      category, tags, author, is_published
    } = req.body;
    
    let image_url = req.body.image_url;
    
    if (req.file) {
      const optimizedPath = `optimized_${req.file.filename}`;
      await sharp(req.file.path)
        .resize(1200, 800, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 85 })
        .toFile(path.join(__dirname, '../uploads', optimizedPath));
      
      image_url = `/uploads/${optimizedPath}`;
    }
    
    db.prepare(`
      UPDATE news SET
        title_ko = ?, title_en = ?, title_vi = ?,
        content_ko = ?, content_en = ?, content_vi = ?,
        excerpt_ko = ?, excerpt_en = ?, excerpt_vi = ?,
        image_url = ?, category = ?, tags = ?, author = ?,
        is_published = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      title_ko, title_en, title_vi,
      content_ko, content_en, content_vi,
      excerpt_ko, excerpt_en, excerpt_vi,
      image_url, category, tags, author, is_published ? 1 : 0, id
    );
    
    res.json({
      success: true,
      message: 'News article updated'
    });
  } catch (error) {
    console.error('News update error:', error);
    res.status(500).json({ success: false, message: 'Failed to update news' });
  }
});

router.delete('/news/:id', (req, res) => {
  try {
    const { id } = req.params;
    db.prepare('DELETE FROM news WHERE id = ?').run(id);
    
    res.json({
      success: true,
      message: 'News article deleted'
    });
  } catch (error) {
    console.error('News delete error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete news' });
  }
});

// Comments management
router.get('/comments', (req, res) => {
  try {
    const { is_approved } = req.query;
    
    let query = 'SELECT * FROM comments';
    const params = [];
    
    if (is_approved !== undefined) {
      query += ' WHERE is_approved = ?';
      params.push(is_approved === 'true' ? 1 : 0);
    }
    
    query += ' ORDER BY created_at DESC';
    
    const comments = db.prepare(query).all(...params);
    
    res.json({
      success: true,
      comments
    });
  } catch (error) {
    console.error('Comments fetch error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch comments' });
  }
});

router.put('/comments/:id/approve', (req, res) => {
  try {
    const { id } = req.params;
    db.prepare('UPDATE comments SET is_approved = 1 WHERE id = ?').run(id);
    
    res.json({
      success: true,
      message: 'Comment approved'
    });
  } catch (error) {
    console.error('Comment approval error:', error);
    res.status(500).json({ success: false, message: 'Failed to approve comment' });
  }
});

router.delete('/comments/:id', (req, res) => {
  try {
    const { id } = req.params;
    db.prepare('DELETE FROM comments WHERE id = ?').run(id);
    
    res.json({
      success: true,
      message: 'Comment deleted'
    });
  } catch (error) {
    console.error('Comment delete error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete comment' });
  }
});

// Donations management
router.get('/donations', (req, res) => {
  try {
    const { status, page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = 'SELECT * FROM donations';
    const params = [];
    
    if (status) {
      query += ' WHERE status = ?';
      params.push(status);
    }
    
    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);
    
    const donations = db.prepare(query).all(...params);
    
    const totalQuery = status ? 
      'SELECT COUNT(*) as count FROM donations WHERE status = ?' :
      'SELECT COUNT(*) as count FROM donations';
    const total = db.prepare(totalQuery).get(...(status ? [status] : []));
    
    res.json({
      success: true,
      donations,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: total.count,
        pages: Math.ceil(total.count / limit)
      }
    });
  } catch (error) {
    console.error('Donations fetch error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch donations' });
  }
});

router.put('/donations/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    db.prepare('UPDATE donations SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .run(status, id);
    
    res.json({
      success: true,
      message: 'Donation status updated'
    });
  } catch (error) {
    console.error('Donation update error:', error);
    res.status(500).json({ success: false, message: 'Failed to update donation' });
  }
});

// Settings management
router.get('/settings', (req, res) => {
  try {
    const settings = db.prepare('SELECT * FROM settings').all();
    
    const settingsObj = {};
    settings.forEach(s => {
      settingsObj[s.key] = s.value;
    });
    
    res.json({
      success: true,
      settings: settingsObj
    });
  } catch (error) {
    console.error('Settings fetch error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch settings' });
  }
});

router.put('/settings', (req, res) => {
  try {
    const settings = req.body;
    
    const stmt = db.prepare(`
      INSERT INTO settings (key, value, updated_at) 
      VALUES (?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(key) DO UPDATE SET value = ?, updated_at = CURRENT_TIMESTAMP
    `);
    
    Object.entries(settings).forEach(([key, value]) => {
      stmt.run(key, value, value);
    });
    
    res.json({
      success: true,
      message: 'Settings updated'
    });
  } catch (error) {
    console.error('Settings update error:', error);
    res.status(500).json({ success: false, message: 'Failed to update settings' });
  }
});

// Gallery management (similar to news)
router.post('/gallery', upload.single('image'), async (req, res) => {
  try {
    const {
      title_ko, title_en,
      description_ko, description_en,
      category, tags, order_index
    } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Image is required' });
    }
    
    const optimizedPath = `optimized_${req.file.filename}`;
    const thumbnailPath = `thumb_${req.file.filename}`;
    
    await sharp(req.file.path)
      .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 90 })
      .toFile(path.join(__dirname, '../uploads', optimizedPath));
    
    await sharp(req.file.path)
      .resize(400, 300, { fit: 'cover' })
      .jpeg({ quality: 80 })
      .toFile(path.join(__dirname, '../uploads', thumbnailPath));
    
    const result = db.prepare(`
      INSERT INTO gallery (
        title_ko, title_en, description_ko, description_en,
        image_url, thumbnail_url, category, tags, order_index
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      title_ko, title_en, description_ko, description_en,
      `/uploads/${optimizedPath}`, `/uploads/${thumbnailPath}`,
      category, tags, order_index || 0
    );
    
    res.json({
      success: true,
      id: result.lastInsertRowid,
      message: 'Gallery image added'
    });
  } catch (error) {
    console.error('Gallery add error:', error);
    res.status(500).json({ success: false, message: 'Failed to add gallery image' });
  }
});

export default router;
