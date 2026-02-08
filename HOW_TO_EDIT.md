# 🛠️ 엘림G선교회 웹사이트 수정 가이드

## 📋 목차
1. [빠른 수정 방법](#빠른-수정-방법)
2. [파일 구조 이해하기](#파일-구조-이해하기)
3. [주요 수정 항목](#주요-수정-항목)
4. [고급 수정](#고급-수정)
5. [수정 후 배포](#수정-후-배포)

---

## 🚀 빠른 수정 방법

### 방법 1: GitHub에서 직접 수정 (가장 쉬움!)

1. **GitHub 저장소 접속**
   - https://github.com/JinJun-han/elimgweb

2. **파일 찾기**
   - 수정할 파일을 클릭 (예: `public/index.html`)

3. **편집 버튼 클릭**
   - 파일 우측 상단의 연필 아이콘 (✏️) 클릭

4. **내용 수정**
   - 원하는 내용 수정

5. **저장 (커밋)**
   - 페이지 하단 "Commit changes" 버튼 클릭
   - 수정 내용 간단히 입력 (예: "로고 이미지 변경")

6. **자동 배포**
   - Railway/Vercel 등에 연결했다면 자동으로 배포됨
   - 1-2분 후 웹사이트에 반영

---

### 방법 2: 로컬 컴퓨터에서 수정

#### 1단계: 프로젝트 다운로드

```bash
# Git 설치 후 실행
git clone https://github.com/JinJun-han/elimgweb.git
cd elimgweb
```

#### 2단계: 에디터로 열기

**추천 에디터:**
- **VS Code** (무료, 가장 추천!)
  - https://code.visualstudio.com/
  - 다운로드 → 설치 → elimgweb 폴더 열기

- **Sublime Text** (무료)
- **Notepad++** (무료)

#### 3단계: 파일 수정

- 원하는 파일 열어서 수정
- `Ctrl + S` (Windows) / `Cmd + S` (Mac)으로 저장

#### 4단계: 로컬에서 테스트

```bash
# 터미널에서 실행
npm install        # 처음 한 번만
npm run init       # 처음 한 번만
npm run dev        # 서버 시작

# 브라우저에서 열기
http://localhost:3000
```

#### 5단계: GitHub에 업로드

```bash
git add .
git commit -m "수정 내용 설명"
git push origin main
```

---

## 📁 파일 구조 이해하기

```
elimgweb/
├── public/
│   └── index.html          ⭐ 메인 웹페이지 (여기를 가장 많이 수정)
├── server/
│   ├── index.js            ⭐ 서버 메인 파일
│   ├── routes/
│   │   ├── api.js          ⭐ API 엔드포인트
│   │   └── admin.js        ⭐ 관리자 기능
│   ├── models/
│   │   └── database.js     📊 데이터베이스 구조
│   └── init-db.js          🔧 초기 데이터 설정
├── i18n/
│   ├── ko.json             🇰🇷 한국어 번역
│   ├── en.json             🇺🇸 영어 번역
│   └── vi.json             🇻🇳 베트남어 번역
├── .env                    ⚙️ 환경 설정 (비밀번호 등)
├── package.json            📦 프로젝트 정보
└── README.md               📖 프로젝트 설명
```

### 🎯 자주 수정하는 파일

| 파일 | 수정 내용 | 난이도 |
|------|----------|--------|
| `public/index.html` | 텍스트, 이미지, 디자인 | ⭐ 쉬움 |
| `i18n/ko.json` | 한국어 번역 | ⭐ 쉬움 |
| `server/init-db.js` | 초기 뉴스/데이터 | ⭐⭐ 보통 |
| `.env` | 비밀번호, 설정 | ⭐⭐ 보통 |
| `server/routes/api.js` | API 기능 추가 | ⭐⭐⭐ 어려움 |

---

## ✏️ 주요 수정 항목

### 1. 텍스트 수정 (가장 쉬움!)

**파일**: `public/index.html`

#### 예시 1: 메인 제목 변경

**찾기:**
```html
<h1 class="hero-title">세상을 향한 하나님의 사랑</h1>
```

**수정:**
```html
<h1 class="hero-title">사랑으로 섬기는 글로컬 선교</h1>
```

#### 예시 2: 소개 문구 변경

**찾기:**
```html
<p class="hero-subtitle">글로컬 선교와 비즈니스로 복음을 전합니다</p>
```

**수정:**
```html
<p class="hero-subtitle">이주민과 함께 하나님 나라를 세웁니다</p>
```

---

### 2. 이미지 변경

**파일**: `public/index.html`

#### 예시 1: 로고 변경

**찾기:**
```html
<img src="https://via.placeholder.com/150x50/4A90E2/ffffff?text=ELIM+G" alt="엘림G선교회">
```

**수정:** (본인 이미지 URL로 교체)
```html
<img src="https://elimg.com/logo.png" alt="엘림G선교회">
```

#### 예시 2: 배경 이미지 변경

**찾기:**
```css
.hero {
  background: url('https://images.unsplash.com/photo-1517486808906-6ca8b3f04846');
}
```

**수정:**
```css
.hero {
  background: url('https://elimg.com/hero-background.jpg');
}
```

---

### 3. 색상 변경

**파일**: `public/index.html`의 `<style>` 섹션

#### 메인 색상 변경

**찾기:**
```css
:root {
  --primary-color: #4A90E2;
  --secondary-color: #50C878;
}
```

**수정:** (원하는 색상 코드로)
```css
:root {
  --primary-color: #FF6B6B;  /* 빨간색 계열 */
  --secondary-color: #4ECDC4; /* 청록색 계열 */
}
```

💡 **색상 코드 찾기**: https://htmlcolorcodes.com/

---

### 4. 연락처 정보 변경

**파일**: `public/index.html`

#### 예시: 전화번호 변경

**찾기:**
```html
<p>📞 010-2083-3106</p>
```

**수정:**
```html
<p>📞 010-1234-5678</p>
```

#### 예시: 이메일 변경

**찾기:**
```html
<p>✉️ kodhjj@gmail.com</p>
```

**수정:**
```html
<p>✉️ contact@elimg.com</p>
```

---

### 5. 후원 계좌 변경

**파일**: `public/index.html`

**찾기:**
```html
<div class="account-number" id="accountNumber">
  301-0296-7179-91
</div>
```

**수정:**
```html
<div class="account-number" id="accountNumber">
  123-456-7890-12
</div>
```

---

### 6. 뉴스/공지사항 추가

**파일**: `server/init-db.js`

**찾기:**
```javascript
const sampleNews = [
  {
    title_ko: '거제 참빛힐링센터 개소식',
    // ...
  }
];
```

**추가:**
```javascript
const sampleNews = [
  {
    title_ko: '거제 참빛힐링센터 개소식',
    // ... 기존 내용
  },
  {
    title_ko: '새로운 소식 제목',
    title_en: 'New News Title',
    title_vi: 'Tiêu đề tin mới',
    content_ko: '새로운 소식 내용...',
    content_en: 'New news content...',
    content_vi: 'Nội dung tin mới...',
    category: '공지',
    author: '관리자',
    image_url: 'https://images.unsplash.com/photo-xxx'
  }
];
```

**적용:**
```bash
npm run init  # 데이터베이스 재초기화
```

---

### 7. 다국어 번역 수정

**파일**: `i18n/ko.json`, `i18n/en.json`, `i18n/vi.json`

#### 한국어 수정 (`i18n/ko.json`)

**찾기:**
```json
{
  "nav": {
    "home": "홈",
    "about": "소개"
  }
}
```

**수정:**
```json
{
  "nav": {
    "home": "메인",
    "about": "우리는"
  }
}
```

---

### 8. FAQ 수정

**파일**: `public/index.html`

**찾기:**
```html
<div class="faq-item">
  <div class="faq-question">
    <h3>Q. 후원금은 어떻게 사용되나요?</h3>
    <span class="faq-icon">+</span>
  </div>
  <div class="faq-answer">
    <p>후원금은 100% 이주민 지원 사역에 사용됩니다...</p>
  </div>
</div>
```

**수정/추가:**
```html
<div class="faq-item">
  <div class="faq-question">
    <h3>Q. 새로운 질문 제목?</h3>
    <span class="faq-icon">+</span>
  </div>
  <div class="faq-answer">
    <p>새로운 답변 내용을 여기에 작성합니다...</p>
  </div>
</div>
```

---

## 🎨 고급 수정

### 1. 새로운 섹션 추가

**파일**: `public/index.html`

**추가할 위치 찾기** (예: FAQ 섹션 다음)
```html
</section> <!-- FAQ 끝 -->

<!-- 여기에 새 섹션 추가 -->
<section class="my-new-section">
  <div class="container">
    <h2>새로운 섹션 제목</h2>
    <p>내용...</p>
  </div>
</section>

<footer> <!-- 푸터 시작 -->
```

**CSS 스타일 추가** (index.html의 `<style>` 태그 안)
```css
.my-new-section {
  padding: 80px 0;
  background: #f5f5f5;
}

.my-new-section h2 {
  text-align: center;
  margin-bottom: 40px;
  color: var(--primary-color);
}
```

---

### 2. API 엔드포인트 추가

**파일**: `server/routes/api.js`

**예시: 새로운 통계 API**

```javascript
// 기존 코드 아래에 추가
router.get('/statistics', (req, res) => {
  try {
    const stats = db.prepare(`
      SELECT 
        COUNT(*) as total_news,
        (SELECT COUNT(*) FROM partners) as total_partners,
        (SELECT SUM(amount) FROM donations) as total_donations
      FROM news
    `).get();
    
    res.json({
      success: true,
      stats
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: '통계 조회 실패' 
    });
  }
});
```

**사용:**
```
GET https://elimg.com/api/statistics
```

---

### 3. 관리자 기능 추가

**파일**: `server/routes/admin.js`

**예시: 방문자 통계 리셋 기능**

```javascript
// 관리자 전용 엔드포인트
router.post('/reset-visitors', authenticateAdmin, (req, res) => {
  try {
    db.prepare('UPDATE settings SET value = 0 WHERE key = "visitor_count"').run();
    
    res.json({
      success: true,
      message: '방문자 수가 초기화되었습니다'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: '초기화 실패' 
    });
  }
});
```

---

### 4. 데이터베이스 테이블 추가

**파일**: `server/models/database.js`

**예시: 이벤트 테이블 추가**

```javascript
// 테이블 생성 함수에 추가
db.exec(`
  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title_ko TEXT NOT NULL,
    title_en TEXT,
    title_vi TEXT,
    date DATE NOT NULL,
    location TEXT,
    description TEXT,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
```

---

## 🚀 수정 후 배포

### 방법 1: GitHub을 통한 자동 배포

```bash
# 1. 변경사항 확인
git status

# 2. 모든 변경사항 스테이징
git add .

# 3. 커밋 (수정 내용 설명)
git commit -m "연락처 정보 업데이트"

# 4. GitHub에 푸시
git push origin main
```

**Railway/Vercel 연결 시**: 자동으로 1-2분 내 배포 완료!

---

### 방법 2: Railway 수동 배포

1. Railway 대시보드 접속
2. 프로젝트 선택
3. "Deployments" 탭
4. "Redeploy" 버튼 클릭

---

### 방법 3: Vultr VPS 수동 배포

```bash
# 1. 서버 접속
ssh root@your-server-ip

# 2. 프로젝트 폴더로 이동
cd /var/www/elimgweb

# 3. 최신 코드 가져오기
git pull origin main

# 4. 의존성 업데이트 (필요시)
npm install

# 5. 서버 재시작
pm2 restart elimg
```

---

## ✅ 수정 체크리스트

배포 전 확인사항:

### 기본 체크
- [ ] 텍스트에 오타가 없는가?
- [ ] 이미지 링크가 작동하는가?
- [ ] 연락처 정보가 정확한가?
- [ ] 색상이 잘 보이는가?

### 기능 테크
- [ ] 로컬에서 테스트했는가? (`npm run dev`)
- [ ] 모든 링크가 작동하는가?
- [ ] 모바일에서 잘 보이는가?
- [ ] API가 정상 작동하는가?

### 보안 체크
- [ ] `.env` 파일이 GitHub에 업로드되지 않았는가?
- [ ] 관리자 비밀번호를 변경했는가?
- [ ] API 키가 노출되지 않았는가?

---

## 🆘 문제 해결

### 문제 1: 수정이 반영되지 않음

**해결:**
```bash
# 브라우저 캐시 삭제
Ctrl + Shift + R (Windows)
Cmd + Shift + R (Mac)

# 또는 시크릿 모드로 접속
```

### 문제 2: 서버가 시작되지 않음

**해결:**
```bash
# 로그 확인
npm run dev

# 또는 PM2 로그
pm2 logs elimg

# 데이터베이스 재초기화
npm run init
```

### 문제 3: Git 푸시 오류

**해결:**
```bash
# 최신 코드 먼저 가져오기
git pull origin main

# 충돌 해결 후 다시 푸시
git add .
git commit -m "충돌 해결"
git push origin main
```

---

## 🎓 추가 학습 자료

### HTML/CSS 기초
- 📚 [MDN Web Docs](https://developer.mozilla.org/ko/)
- 🎥 [생활코딩 HTML/CSS](https://opentutorials.org/course/3084)

### JavaScript 기초
- 📚 [JavaScript.info](https://ko.javascript.info/)
- 🎥 [코딩앙마 JavaScript](https://www.youtube.com/@codingangma)

### Node.js/Express
- 📚 [Node.js 공식 문서](https://nodejs.org/ko/docs/)
- 📚 [Express 공식 가이드](https://expressjs.com/ko/)

### Git/GitHub
- 🎥 [Git 입문](https://backlog.com/git-tutorial/kr/)
- 📚 [GitHub 가이드](https://docs.github.com/ko)

---

## 📞 도움이 필요하신가요?

### 엘림G선교회 연락처
- 📧 kodhjj@gmail.com
- ☎️ 010-2083-3106
- 💬 [카카오톡 채널](https://pf.kakao.com/_YIULn)

### 기술 지원
- GitHub Issues: https://github.com/JinJun-han/elimgweb/issues
- 이메일로 문의 시 스크린샷 첨부해주세요!

---

## 💡 팁 & 트릭

### 1. 빠른 수정 팁
- **작은 수정**: GitHub에서 직접 수정 (가장 빠름)
- **큰 수정**: VS Code로 로컬에서 작업
- **긴급 수정**: Railway에서 환경 변수만 변경

### 2. 백업 팁
```bash
# 수정 전 항상 백업!
git branch backup-$(date +%Y%m%d)
```

### 3. 테스트 팁
```bash
# 로컬에서 프로덕션 모드 테스트
NODE_ENV=production npm start
```

---

**이 가이드를 북마크하세요!** 📌

수정할 때마다 참고하시면 됩니다. 궁금한 점이 있으면 언제든지 문의해주세요! 🚀
