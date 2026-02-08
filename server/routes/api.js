import express from 'express';
import db from '../models/database.js';
import nodemailer from 'nodemailer';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: process.env.EMAIL_USER ? {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  } : undefined
});

// Get visitor count
router.get('/visitors', (req, res) => {
  try {
    // Record visit
    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('user-agent');
    
    db.prepare('INSERT INTO visitors (ip_address, user_agent) VALUES (?, ?)').run(ip, userAgent);
    
    // Get total count
    const result = db.prepare('SELECT COUNT(*) as count FROM visitors').get();
    
    // Get setting
    const setting = db.prepare('SELECT value FROM settings WHERE key = ?').get('visitor_count');
    const baseCount = setting ? parseInt(setting.value) : 0;
    
    res.json({ 
      success: true, 
      count: baseCount + result.count 
    });
  } catch (error) {
    console.error('Error recording visit:', error);
    res.status(500).json({ success: false, message: 'Failed to record visit' });
  }
});

// Newsletter subscription
router.post('/newsletter', async (req, res) => {
  try {
    const { email, language = 'ko' } = req.body;
    
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Invalid email address' });
    }
    
    // Insert subscriber
    db.prepare(`
      INSERT INTO newsletter_subscribers (email, language) 
      VALUES (?, ?)
      ON CONFLICT(email) DO UPDATE SET is_active = 1
    `).run(email, language);
    
    // Send welcome email (if configured)
    if (process.env.EMAIL_USER) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: email,
          subject: language === 'ko' ? '엘림G선교회 뉴스레터 구독을 환영합니다!' : 'Welcome to Elim G Mission Newsletter!',
          html: `
            <h2>${language === 'ko' ? '구독해주셔서 감사합니다!' : 'Thank you for subscribing!'}</h2>
            <p>${language === 'ko' ? '매월 사역 소식과 기도제목을 보내드리겠습니다.' : 'We will send you monthly ministry updates and prayer topics.'}</p>
          `
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
      }
    }
    
    res.json({ success: true, message: 'Subscription successful' });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ success: false, message: 'Subscription failed' });
  }
});

// Get donation progress
router.get('/donation/progress', (req, res) => {
  try {
    const goal = db.prepare('SELECT value FROM settings WHERE key = ?').get('donation_goal');
    const current = db.prepare('SELECT value FROM settings WHERE key = ?').get('donation_current');
    
    // Also get from actual donations
    const actualTotal = db.prepare(`
      SELECT COALESCE(SUM(amount), 0) as total 
      FROM donations 
      WHERE status = 'completed'
    `).get();
    
    const goalAmount = parseInt(goal?.value || '50000000');
    const currentAmount = parseInt(current?.value || '0') + (actualTotal?.total || 0);
    
    res.json({
      success: true,
      goal: goalAmount,
      current: currentAmount,
      percentage: Math.round((currentAmount / goalAmount) * 100)
    });
  } catch (error) {
    console.error('Error getting donation progress:', error);
    res.status(500).json({ success: false, message: 'Failed to get donation progress' });
  }
});

// Create donation (PortOne payment)
router.post('/donation', async (req, res) => {
  try {
    const { 
      donor_name, 
      donor_email, 
      donor_phone, 
      amount, 
      payment_method = 'card',
      message = '',
      is_recurring = false,
      language = 'ko'
    } = req.body;
    
    if (!amount || amount < 1000) {
      return res.status(400).json({ success: false, message: 'Invalid donation amount' });
    }
    
    // Insert donation record
    const result = db.prepare(`
      INSERT INTO donations (
        donor_name, donor_email, donor_phone, amount, 
        payment_method, message, is_recurring, language, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      donor_name, donor_email, donor_phone, amount,
      payment_method, message, is_recurring ? 1 : 0, language, 'pending'
    );
    
    // In production, integrate with PortOne payment gateway
    // For now, return payment info
    res.json({
      success: true,
      donation_id: result.lastInsertRowid,
      message: 'Donation recorded. Proceed to payment.',
      // PortOne integration would happen here
      payment_url: `/payment/${result.lastInsertRowid}`
    });
  } catch (error) {
    console.error('Donation error:', error);
    res.status(500).json({ success: false, message: 'Donation failed' });
  }
});

// Get news articles
router.get('/news', (req, res) => {
  try {
    const { page = 1, limit = 10, language = 'ko', category } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT 
        id,
        title_${language} as title,
        content_${language} as content,
        excerpt_${language} as excerpt,
        image_url,
        category,
        tags,
        author,
        view_count,
        created_at,
        updated_at
      FROM news
      WHERE is_published = 1
    `;
    
    const params = [];
    
    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }
    
    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);
    
    const news = db.prepare(query).all(...params);
    
    const total = db.prepare(`
      SELECT COUNT(*) as count 
      FROM news 
      WHERE is_published = 1 ${category ? 'AND category = ?' : ''}
    `).get(...(category ? [category] : []));
    
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
    console.error('Error getting news:', error);
    res.status(500).json({ success: false, message: 'Failed to get news' });
  }
});

// Get single news article
router.get('/news/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { language = 'ko' } = req.query;
    
    const article = db.prepare(`
      SELECT 
        id,
        title_${language} as title,
        content_${language} as content,
        excerpt_${language} as excerpt,
        image_url,
        category,
        tags,
        author,
        view_count,
        created_at,
        updated_at
      FROM news
      WHERE id = ? AND is_published = 1
    `).get(id);
    
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    
    // Increment view count
    db.prepare('UPDATE news SET view_count = view_count + 1 WHERE id = ?').run(id);
    
    // Get comments
    const comments = db.prepare(`
      SELECT id, author_name, content, created_at, parent_id
      FROM comments
      WHERE news_id = ? AND is_approved = 1
      ORDER BY created_at DESC
    `).all(id);
    
    res.json({
      success: true,
      article: { ...article, view_count: article.view_count + 1 },
      comments
    });
  } catch (error) {
    console.error('Error getting article:', error);
    res.status(500).json({ success: false, message: 'Failed to get article' });
  }
});

// Post comment
router.post('/comments', async (req, res) => {
  try {
    const { news_id, author_name, author_email, content, language = 'ko', parent_id } = req.body;
    
    if (!news_id || !author_name || !content) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    
    const result = db.prepare(`
      INSERT INTO comments (news_id, author_name, author_email, content, language, parent_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(news_id, author_name, author_email, content, language, parent_id || null);
    
    res.json({
      success: true,
      comment_id: result.lastInsertRowid,
      message: 'Comment submitted for approval'
    });
  } catch (error) {
    console.error('Comment error:', error);
    res.status(500).json({ success: false, message: 'Failed to post comment' });
  }
});

// Get translations
router.get('/i18n/:lang', (req, res) => {
  try {
    const { lang } = req.params;
    const supportedLangs = ['ko', 'en', 'vi'];
    
    if (!supportedLangs.includes(lang)) {
      return res.status(400).json({ success: false, message: 'Unsupported language' });
    }
    
    const filePath = path.join(__dirname, `../../i18n/${lang}.json`);
    const translations = JSON.parse(readFileSync(filePath, 'utf8'));
    
    res.json({
      success: true,
      language: lang,
      translations
    });
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ success: false, message: 'Failed to load translations' });
  }
});

// Search
router.get('/search', (req, res) => {
  try {
    const { q, language = 'ko' } = req.query;
    
    if (!q || q.length < 2) {
      return res.status(400).json({ success: false, message: 'Search query too short' });
    }
    
    const searchTerm = `%${q}%`;
    
    const results = db.prepare(`
      SELECT 
        id,
        title_${language} as title,
        excerpt_${language} as excerpt,
        image_url,
        category,
        created_at
      FROM news
      WHERE is_published = 1
      AND (
        title_${language} LIKE ? OR
        content_${language} LIKE ? OR
        excerpt_${language} LIKE ?
      )
      ORDER BY created_at DESC
      LIMIT 20
    `).all(searchTerm, searchTerm, searchTerm);
    
    res.json({
      success: true,
      query: q,
      count: results.length,
      results
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ success: false, message: 'Search failed' });
  }
});

// Get gallery images
router.get('/gallery', (req, res) => {
  try {
    const { category, language = 'ko' } = req.query;
    
    let query = `
      SELECT 
        id,
        title_${language} as title,
        description_${language} as description,
        image_url,
        thumbnail_url,
        category,
        tags
      FROM gallery
      WHERE is_active = 1
    `;
    
    const params = [];
    
    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }
    
    query += ' ORDER BY order_index ASC, created_at DESC';
    
    const images = db.prepare(query).all(...params);
    
    res.json({
      success: true,
      images
    });
  } catch (error) {
    console.error('Gallery error:', error);
    res.status(500).json({ success: false, message: 'Failed to get gallery' });
  }
});

// Get partners
router.get('/partners', (req, res) => {
  try {
    const { category, language = 'ko' } = req.query;
    
    let query = `
      SELECT 
        id,
        name_${language} as name,
        category,
        industry,
        location,
        description_${language} as description,
        website_url,
        contact_email,
        contact_phone,
        logo_url
      FROM partners
      WHERE is_active = 1
    `;
    
    const params = [];
    
    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }
    
    query += ' ORDER BY order_index ASC, name_ko ASC';
    
    const partners = db.prepare(query).all(...params);
    
    res.json({
      success: true,
      partners
    });
  } catch (error) {
    console.error('Partners error:', error);
    res.status(500).json({ success: false, message: 'Failed to get partners' });
  }
});

export default router;
