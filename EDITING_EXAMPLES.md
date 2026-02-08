# 📝 실전 수정 예시 모음

## 🎯 목차
1. [5분 만에 할 수 있는 수정](#5분-만에-할-수-있는-수정)
2. [10분 만에 할 수 있는 수정](#10분-만에-할-수-있는-수정)
3. [30분 만에 할 수 있는 수정](#30분-만에-할-수-있는-수정)
4. [자주 하는 수정 TOP 10](#자주-하는-수정-top-10)

---

## ⏱️ 5분 만에 할 수 있는 수정

### 1. 전화번호 바꾸기

**📍 위치**: `public/index.html` - 1798줄 근처

**변경 전:**
```html
<p><i class="fas fa-phone"></i> 010-2083-3106</p>
```

**변경 후:**
```html
<p><i class="fas fa-phone"></i> 010-9999-8888</p>
```

---

### 2. 이메일 주소 바꾸기

**📍 위치**: `public/index.html` - 1799줄 근처

**변경 전:**
```html
<p><i class="fas fa-envelope"></i> kodhjj@gmail.com</p>
```

**변경 후:**
```html
<p><i class="fas fa-envelope"></i> contact@elimg.com</p>
```

---

### 3. 후원 계좌번호 바꾸기

**📍 위치**: `public/index.html` - 1500줄 근처

**변경 전:**
```html
<div class="account-info">
  <div class="bank-name">NH농협은행</div>
  <div class="account-number" id="accountNumber">301-0296-7179-91</div>
  <div class="account-holder">엘림G선교회</div>
</div>
```

**변경 후:**
```html
<div class="account-info">
  <div class="bank-name">신한은행</div>
  <div class="account-number" id="accountNumber">110-123-456789</div>
  <div class="account-holder">엘림G선교회</div>
</div>
```

---

### 4. 메인 제목 바꾸기

**📍 위치**: `public/index.html` - 500줄 근처

**변경 전:**
```html
<h1 class="hero-title" data-aos="fade-up">
  세상을 향한 하나님의 사랑
</h1>
```

**변경 후:**
```html
<h1 class="hero-title" data-aos="fade-up">
  글로컬 선교로 세계를 품다
</h1>
```

---

### 5. 소개 문구 바꾸기

**📍 위치**: `public/index.html` - 505줄 근처

**변경 전:**
```html
<p class="hero-subtitle" data-aos="fade-up" data-aos-delay="100">
  글로컬 선교와 비즈니스로 복음을 전합니다
</p>
```

**변경 후:**
```html
<p class="hero-subtitle" data-aos="fade-up" data-aos-delay="100">
  이주민과 함께 만드는 하나님 나라
</p>
```

---

## ⏱️ 10분 만에 할 수 있는 수정

### 6. 통계 숫자 변경

**📍 위치**: `public/index.html` - 600줄 근처

**변경 전:**
```html
<div class="stat-item" data-aos="fade-up">
  <div class="stat-icon">👥</div>
  <div class="stat-number" data-count="3247">0</div>
  <div class="stat-label">방문자</div>
</div>
```

**변경 후:**
```html
<div class="stat-item" data-aos="fade-up">
  <div class="stat-icon">👥</div>
  <div class="stat-number" data-count="5000">0</div>
  <div class="stat-label">누적 방문자</div>
</div>
```

💡 **팁**: `data-count` 값만 변경하면 자동으로 카운트 애니메이션됩니다!

---

### 7. 후원 진행률 변경

**📍 위치**: `public/index.html` - 1450줄 근처

**변경 전:**
```html
<div class="progress-info">
  <span class="progress-label">달성률</span>
  <span class="progress-percentage">64%</span>
</div>
<div class="progress-bar">
  <div class="progress-fill" style="width: 64%"></div>
</div>
```

**변경 후:**
```html
<div class="progress-info">
  <span class="progress-label">달성률</span>
  <span class="progress-percentage">75%</span>
</div>
<div class="progress-bar">
  <div class="progress-fill" style="width: 75%"></div>
</div>
```

💡 **주의**: 두 곳의 퍼센트를 모두 같은 값으로 변경해야 합니다!

---

### 8. 소셜 미디어 링크 변경

**📍 위치**: `public/index.html` - 1820줄 근처

**변경 전:**
```html
<div class="social-links">
  <a href="https://www.facebook.com/elimgmission" target="_blank">
    <i class="fab fa-facebook"></i>
  </a>
  <a href="https://www.instagram.com/elimgmission" target="_blank">
    <i class="fab fa-instagram"></i>
  </a>
  <a href="https://www.youtube.com/@elimgmission" target="_blank">
    <i class="fab fa-youtube"></i>
  </a>
</div>
```

**변경 후:** (실제 계정으로)
```html
<div class="social-links">
  <a href="https://www.facebook.com/YourActualPage" target="_blank">
    <i class="fab fa-facebook"></i>
  </a>
  <a href="https://www.instagram.com/your_account" target="_blank">
    <i class="fab fa-instagram"></i>
  </a>
  <a href="https://www.youtube.com/@YourChannel" target="_blank">
    <i class="fab fa-youtube"></i>
  </a>
</div>
```

---

### 9. 로고 이미지 변경

**📍 위치**: `public/index.html` - 450줄 근처

**방법 A: 텍스트 로고 (쉬움)**

**변경 전:**
```html
<div class="logo">
  <img src="https://via.placeholder.com/150x50/4A90E2/ffffff?text=ELIM+G" alt="엘림G선교회">
</div>
```

**변경 후:**
```html
<div class="logo">
  <h1 style="color: white; margin: 0;">엘림G선교회</h1>
</div>
```

**방법 B: 실제 로고 이미지 (추천)**

```html
<div class="logo">
  <img src="https://elimg.com/images/logo.png" alt="엘림G선교회">
</div>
```

💡 **이미지 업로드 방법**:
1. 로고 이미지를 `public/assets/` 폴더에 업로드
2. `src="/assets/logo.png"` 로 경로 지정

---

### 10. 주소 변경

**📍 위치**: `public/index.html` - 1800줄 근처

**변경 전:**
```html
<p><i class="fas fa-map-marker-alt"></i> 경남 거제시 장평동</p>
```

**변경 후:**
```html
<p><i class="fas fa-map-marker-alt"></i> 경남 거제시 장평3로 21 참빛힐링센터</p>
```

---

## ⏱️ 30분 만에 할 수 있는 수정

### 11. 새로운 뉴스 카드 추가

**📍 위치**: `public/index.html` - 900줄 근처

**추가할 위치:**
```html
<div class="news-grid">
  <!-- 기존 뉴스 카드들 -->
  
  <!-- 여기에 새 뉴스 추가 -->
  <div class="news-card" data-aos="fade-up">
    <div class="news-image">
      <img src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80" 
           alt="새로운 소식">
      <span class="news-category">공지</span>
    </div>
    <div class="news-content">
      <div class="news-meta">
        <span class="news-date">
          <i class="far fa-calendar"></i> 2026-02-15
        </span>
        <span class="news-author">
          <i class="far fa-user"></i> 관리자
        </span>
      </div>
      <h3>새로운 프로그램 시작</h3>
      <p>이주민을 위한 새로운 교육 프로그램이 시작됩니다...</p>
      <a href="#" class="read-more">자세히 보기 →</a>
    </div>
  </div>
</div>
```

💡 **이미지 찾기**: https://unsplash.com/ (무료 고품질 이미지)

---

### 12. FAQ 추가하기

**📍 위치**: `public/index.html` - 1600줄 근처

**추가할 위치:**
```html
<div class="faq-list">
  <!-- 기존 FAQ들 -->
  
  <!-- 새 FAQ 추가 -->
  <div class="faq-item" data-aos="fade-up">
    <div class="faq-question">
      <h3>Q. 자원봉사는 어떻게 신청하나요?</h3>
      <span class="faq-icon">+</span>
    </div>
    <div class="faq-answer">
      <p>
        자원봉사는 이메일(kodhjj@gmail.com) 또는 전화(010-2083-3106)로 
        신청하실 수 있습니다. 매주 토요일 오전 10시에 
        참빛힐링센터에서 활동이 진행됩니다.
      </p>
    </div>
  </div>
</div>
```

---

### 13. 색상 테마 변경

**📍 위치**: `public/index.html` - 100줄 근처 (`<style>` 태그 안)

**파란색 테마 (기본):**
```css
:root {
  --primary-color: #4A90E2;
  --secondary-color: #50C878;
  --accent-color: #FF6B6B;
}
```

**초록색 테마:**
```css
:root {
  --primary-color: #27AE60;
  --secondary-color: #3498DB;
  --accent-color: #E74C3C;
}
```

**보라색 테마:**
```css
:root {
  --primary-color: #9B59B6;
  --secondary-color: #3498DB;
  --accent-color: #E67E22;
}
```

**빨간색 테마:**
```css
:root {
  --primary-color: #E74C3C;
  --secondary-color: #F39C12;
  --accent-color: #16A085;
}
```

💡 **미리보기 팁**: 색상 코드를 https://coolors.co/ 에서 확인!

---

### 14. 갤러리 이미지 변경

**📍 위치**: `public/index.html` - 1200줄 근처

**변경 전:**
```html
<div class="gallery-item" data-aos="zoom-in" onclick="openImageModal(this)">
  <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80" 
       alt="커뮤니티 지원">
  <div class="gallery-overlay">
    <h3>커뮤니티 지원</h3>
    <p>함께 나누는 사랑</p>
  </div>
</div>
```

**변경 후:**
```html
<div class="gallery-item" data-aos="zoom-in" onclick="openImageModal(this)">
  <img src="https://elimg.com/photos/event-2026-02.jpg" 
       alt="2월 특별 집회">
  <div class="gallery-overlay">
    <h3>2월 특별 집회</h3>
    <p>베트남 이주민과 함께</p>
  </div>
</div>
```

---

### 15. 메뉴 항목 추가

**📍 위치**: `public/index.html` - 460줄 근처

**변경 전:**
```html
<nav class="nav-menu">
  <a href="#home">홈</a>
  <a href="#about">소개</a>
  <a href="#ministry">사역</a>
  <a href="#news">소식</a>
  <a href="#contact">연락처</a>
</nav>
```

**변경 후:** (갤러리 메뉴 추가)
```html
<nav class="nav-menu">
  <a href="#home">홈</a>
  <a href="#about">소개</a>
  <a href="#ministry">사역</a>
  <a href="#gallery">갤러리</a>
  <a href="#news">소식</a>
  <a href="#contact">연락처</a>
</nav>
```

💡 **주의**: 해당 섹션에 `id="gallery"` 속성이 있어야 스크롤이 작동합니다!

---

## 🏆 자주 하는 수정 TOP 10

### 빈도별 정리

| 순위 | 수정 항목 | 빈도 | 난이도 | 소요시간 |
|------|----------|------|--------|----------|
| 1️⃣ | 연락처 정보 | ⭐⭐⭐⭐⭐ | ⭐ | 5분 |
| 2️⃣ | 뉴스/공지사항 | ⭐⭐⭐⭐⭐ | ⭐⭐ | 10분 |
| 3️⃣ | 이미지 교체 | ⭐⭐⭐⭐ | ⭐ | 5분 |
| 4️⃣ | 텍스트 수정 | ⭐⭐⭐⭐ | ⭐ | 5분 |
| 5️⃣ | 후원 정보 | ⭐⭐⭐ | ⭐ | 5분 |
| 6️⃣ | 통계 숫자 | ⭐⭐⭐ | ⭐ | 5분 |
| 7️⃣ | FAQ 추가 | ⭐⭐ | ⭐⭐ | 15분 |
| 8️⃣ | 색상 변경 | ⭐⭐ | ⭐⭐ | 10분 |
| 9️⃣ | 메뉴 구조 | ⭐ | ⭐⭐ | 20분 |
| 🔟 | 새 섹션 추가 | ⭐ | ⭐⭐⭐ | 30분 |

---

## 📱 모바일 최적화 팁

### 모바일에서 텍스트 크기 조정

**📍 위치**: `public/index.html` - `<style>` 태그 안

**추가:**
```css
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem !important; /* 기본: 3rem */
  }
  
  .hero-subtitle {
    font-size: 1rem !important; /* 기본: 1.2rem */
  }
}
```

---

## 🎨 디자인 변경 예시

### 둥근 버튼 → 각진 버튼

**📍 위치**: `public/index.html` - `<style>` 태그 안

**찾기:**
```css
.btn {
  border-radius: 50px;
}
```

**변경:**
```css
.btn {
  border-radius: 5px; /* 또는 0 (완전 각짐) */
}
```

---

### 카드 그림자 강도 조절

**찾기:**
```css
.card {
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
```

**약하게:**
```css
.card {
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
```

**강하게:**
```css
.card {
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}
```

---

## 🔧 고급 수정 (개발자용)

### 다국어 텍스트 추가

**📍 위치**: `i18n/ko.json`

**추가:**
```json
{
  "greeting": "환영합니다",
  "my_custom_text": "여기에 원하는 텍스트"
}
```

**📍 사용**: `public/index.html`
```html
<h2 data-i18n="my_custom_text">기본 텍스트</h2>
```

---

### API 데이터로 뉴스 자동 로드

**📍 위치**: `public/index.html` - `<script>` 태그 안

**추가:**
```javascript
async function loadNews() {
  const response = await fetch('/api/news?language=ko&limit=3');
  const data = await response.json();
  
  const newsGrid = document.querySelector('.news-grid');
  newsGrid.innerHTML = data.news.map(item => `
    <div class="news-card">
      <div class="news-image">
        <img src="${item.image_url}" alt="${item.title}">
        <span class="news-category">${item.category}</span>
      </div>
      <div class="news-content">
        <h3>${item.title}</h3>
        <p>${item.excerpt}</p>
      </div>
    </div>
  `).join('');
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', loadNews);
```

---

## ✅ 수정 후 체크리스트

### 로컬 테스트
```bash
# 1. 서버 시작
npm run dev

# 2. 브라우저에서 확인
http://localhost:3000

# 3. 모바일 뷰 테스트
브라우저 개발자 도구 (F12) → 모바일 모드
```

### 확인 사항
- [ ] 텍스트가 잘 보이는가?
- [ ] 이미지가 로드되는가?
- [ ] 링크가 작동하는가?
- [ ] 모바일에서 잘 보이는가?
- [ ] 오타가 없는가?

### 배포
```bash
git add .
git commit -m "수정 내용 설명"
git push origin main
```

---

## 📞 도움 요청 템플릿

문제가 생겼을 때 이렇게 문의하세요:

```
제목: [수정 문의] 전화번호 변경이 반영되지 않습니다

내용:
1. 수정한 파일: public/index.html
2. 수정한 내용: 전화번호를 010-1234-5678로 변경
3. 발생한 문제: 웹사이트에 여전히 이전 번호가 표시됨
4. 시도한 방법: 브라우저 새로고침, 캐시 삭제
5. 스크린샷: [첨부]
```

---

## 🎯 마무리 팁

### 💡 실수 방지 팁
1. 수정 전 항상 백업! (`git branch backup`)
2. 한 번에 하나씩 수정
3. 수정 후 바로 로컬 테스트
4. 의미 있는 커밋 메시지 작성

### 🚀 효율성 팁
1. VS Code 단축키 활용 (`Ctrl+F` 검색)
2. 자주 쓰는 수정은 메모 저장
3. Git 커밋 자주 하기 (되돌리기 쉬움)

### 🛡️ 보안 팁
1. `.env` 파일은 절대 GitHub에 업로드 금지
2. 관리자 비밀번호 정기적 변경
3. API 키는 환경 변수로 관리

---

**이 가이드로 대부분의 수정을 스스로 할 수 있습니다!** 🎉

막히는 부분이 있으면 언제든 문의하세요!
