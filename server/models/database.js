import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = process.env.DB_PATH || path.join(__dirname, '../database.sqlite');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize database schema
export function initDatabase() {
  // Visitors table
  db.exec(`
    CREATE TABLE IF NOT EXISTS visitors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ip_address TEXT,
      user_agent TEXT,
      visited_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Newsletter subscribers
  db.exec(`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      language TEXT DEFAULT 'ko',
      subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      is_active INTEGER DEFAULT 1
    )
  `);

  // Donations
  db.exec(`
    CREATE TABLE IF NOT EXISTS donations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      donor_name TEXT,
      donor_email TEXT,
      donor_phone TEXT,
      amount INTEGER NOT NULL,
      payment_method TEXT,
      payment_id TEXT UNIQUE,
      status TEXT DEFAULT 'pending',
      message TEXT,
      is_recurring INTEGER DEFAULT 0,
      language TEXT DEFAULT 'ko',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // News/Updates
  db.exec(`
    CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title_ko TEXT NOT NULL,
      title_en TEXT,
      title_vi TEXT,
      content_ko TEXT NOT NULL,
      content_en TEXT,
      content_vi TEXT,
      excerpt_ko TEXT,
      excerpt_en TEXT,
      excerpt_vi TEXT,
      image_url TEXT,
      category TEXT,
      tags TEXT,
      author TEXT,
      is_published INTEGER DEFAULT 0,
      view_count INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Comments
  db.exec(`
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      news_id INTEGER NOT NULL,
      author_name TEXT NOT NULL,
      author_email TEXT,
      content TEXT NOT NULL,
      language TEXT DEFAULT 'ko',
      is_approved INTEGER DEFAULT 0,
      parent_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (news_id) REFERENCES news(id) ON DELETE CASCADE,
      FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
    )
  `);

  // Admin users
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      email TEXT,
      role TEXT DEFAULT 'admin',
      is_active INTEGER DEFAULT 1,
      last_login DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Partners (BAM businesses)
  db.exec(`
    CREATE TABLE IF NOT EXISTS partners (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name_ko TEXT NOT NULL,
      name_en TEXT,
      category TEXT,
      industry TEXT,
      location TEXT,
      description_ko TEXT,
      description_en TEXT,
      website_url TEXT,
      contact_email TEXT,
      contact_phone TEXT,
      logo_url TEXT,
      is_active INTEGER DEFAULT 1,
      order_index INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Gallery images
  db.exec(`
    CREATE TABLE IF NOT EXISTS gallery (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title_ko TEXT,
      title_en TEXT,
      description_ko TEXT,
      description_en TEXT,
      image_url TEXT NOT NULL,
      thumbnail_url TEXT,
      category TEXT,
      tags TEXT,
      order_index INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Site settings
  db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Insert default settings
  const insertSetting = db.prepare(`
    INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)
  `);

  insertSetting.run('donation_goal', '50000000');
  insertSetting.run('donation_current', '0');
  insertSetting.run('visitor_count', '0');
  insertSetting.run('site_name_ko', '엘림G선교회');
  insertSetting.run('site_name_en', 'Elim G Mission');
  insertSetting.run('default_language', 'ko');

  console.log('✅ Database initialized successfully');
}

export default db;
