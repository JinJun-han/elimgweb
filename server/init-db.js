import bcrypt from 'bcryptjs';
import db, { initDatabase } from './models/database.js';
import dotenv from 'dotenv';

dotenv.config();

console.log('🔧 Initializing Elim G Mission Database...\n');

// Initialize database schema
initDatabase();

// Create default admin user
const adminUsername = process.env.ADMIN_USERNAME || 'admin';
const adminPassword = process.env.ADMIN_PASSWORD || 'elimg2026!';

const existingAdmin = db.prepare('SELECT * FROM admin_users WHERE username = ?').get(adminUsername);

if (!existingAdmin) {
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  
  db.prepare(`
    INSERT INTO admin_users (username, password_hash, email, role)
    VALUES (?, ?, ?, ?)
  `).run(adminUsername, passwordHash, 'admin@elimg.com', 'admin');
  
  console.log('✅ Admin user created');
  console.log(`   Username: ${adminUsername}`);
  console.log(`   Password: ${adminPassword}`);
  console.log('   ⚠️  Please change the password after first login!\n');
} else {
  console.log('ℹ️  Admin user already exists\n');
}

// Insert sample news
const sampleNews = [
  {
    title_ko: '거제 참빛힐링센터 개소식',
    title_en: 'Geoje Chambit Healing Center Opening',
    title_vi: 'Lễ khai trương Trung tâm Chữa lành Chambit Geoje',
    content_ko: '한화오션 외국인 근로자 1,800명을 위한 종합 지원 센터가 개소했습니다. 의료, 법률, 한국어 교육 등 원스톱 서비스를 제공합니다.',
    content_en: 'A comprehensive support center for 1,800 foreign workers at Hanwha Ocean has opened. It provides one-stop services including medical care, legal counsel, and Korean language education.',
    content_vi: 'Một trung tâm hỗ trợ toàn diện cho 1.800 công nhân nước ngoài tại Hanwha Ocean đã được khai trương. Nó cung cấp các dịch vụ một cửa bao gồm chăm sóc y tế, tư vấn pháp lý và giáo dục tiếng Hàn.',
    excerpt_ko: '한화오션 외국인 근로자 1,800명 종합 지원',
    excerpt_en: 'Comprehensive support for 1,800 foreign workers',
    excerpt_vi: 'Hỗ trợ toàn diện cho 1.800 công nhân nước ngoài',
    category: '현장',
    image_url: 'https://images.unsplash.com/photo-1484069560501-87d72b0c3669?w=800&q=80',
    author: '한진준 목사',
    is_published: 1
  },
  {
    title_ko: '베트남어 한국어 교육 플랫폼 오픈',
    title_en: 'Vietnamese-Korean Education Platform Launch',
    title_vi: 'Ra mắt nền tảng giáo dục tiếng Việt-Hàn',
    content_ko: '700개 단어, 20단계로 체계화된 한국어 학습 플랫폼이 오픈했습니다. AI 음성 인식과 퀴즈 기능으로 효과적인 학습이 가능합니다.',
    content_en: 'A systematized Korean learning platform with 700 words and 20 levels has launched. Effective learning is possible with AI voice recognition and quiz functions.',
    content_vi: 'Một nền tảng học tiếng Hàn có hệ thống với 700 từ và 20 cấp độ đã ra mắt. Học tập hiệu quả với nhận dạng giọng nói AI và chức năng câu đố.',
    excerpt_ko: '700개 단어, 20단계 체계화 학습 과정',
    excerpt_en: '700 words, 20-level systematized learning',
    excerpt_vi: '700 từ, học tập có hệ thống 20 cấp độ',
    category: '교육',
    image_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
    author: '엘림G 교육팀',
    is_published: 1
  }
];

const newsCount = db.prepare('SELECT COUNT(*) as count FROM news').get();
if (newsCount.count === 0) {
  const insertNews = db.prepare(`
    INSERT INTO news (
      title_ko, title_en, title_vi,
      content_ko, content_en, content_vi,
      excerpt_ko, excerpt_en, excerpt_vi,
      category, image_url, author, is_published
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  sampleNews.forEach(news => {
    insertNews.run(
      news.title_ko, news.title_en, news.title_vi,
      news.content_ko, news.content_en, news.content_vi,
      news.excerpt_ko, news.excerpt_en, news.excerpt_vi,
      news.category, news.image_url, news.author, news.is_published
    );
  });
  
  console.log('✅ Sample news articles created\n');
}

// Insert sample partners
const samplePartners = [
  {
    name_ko: '하동 이주민선교센터',
    name_en: 'Hadong Migration Mission Center',
    category: '선교',
    industry: '인구소멸 대응·이주민 선교',
    location: '경남 하동',
    description_ko: '인구소멸 위기 지역 하동에서 이주민 선교와 지역 재생을 실천하는 글로컬 선교 거점',
    description_en: 'Glocal mission hub addressing population decline through migrant ministry in Hadong',
    website_url: 'https://hadong-elimg.netlify.app'
  },
  {
    name_ko: '(주)에스알씨',
    name_en: 'SRC Co., Ltd.',
    category: 'BAM',
    industry: '건설·G.R공법',
    location: '김해',
    description_ko: '지반 보강 전문 건설 기업',
    description_en: 'Ground reinforcement construction specialist',
    website_url: 'https://elimg-src.netlify.app'
  },
  {
    name_ko: '은혜OK 공인중개사',
    name_en: 'Grace OK Real Estate',
    category: 'BAM',
    industry: '부동산',
    location: '양산 물금',
    description_ko: '이주민 주거 지원 부동산',
    description_en: 'Real estate supporting migrant housing',
    website_url: 'https://grace-ok.netlify.app'
  }
];

const partnersCount = db.prepare('SELECT COUNT(*) as count FROM partners').get();
if (partnersCount.count === 0) {
  const insertPartner = db.prepare(`
    INSERT INTO partners (
      name_ko, name_en, category, industry, location,
      description_ko, description_en, website_url, is_active
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
  `);
  
  samplePartners.forEach(partner => {
    insertPartner.run(
      partner.name_ko, partner.name_en, partner.category,
      partner.industry, partner.location, partner.description_ko,
      partner.description_en, partner.website_url
    );
  });
  
  console.log('✅ Sample partners created\n');
}

console.log('✅ Database initialization complete!\n');
console.log('📊 Database Summary:');
console.log(`   - Admin users: ${db.prepare('SELECT COUNT(*) as count FROM admin_users').get().count}`);
console.log(`   - News articles: ${db.prepare('SELECT COUNT(*) as count FROM news').get().count}`);
console.log(`   - Partners: ${db.prepare('SELECT COUNT(*) as count FROM partners').get().count}`);
console.log(`   - Settings: ${db.prepare('SELECT COUNT(*) as count FROM settings').get().count}\n`);

console.log('🚀 You can now start the server with: npm run dev\n');

process.exit(0);
