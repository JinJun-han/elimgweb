# 📸 갤러리 사진 관리 가이드

> 웹사이트의 갤러리 사진을 쉽게 추가하고 변경하는 방법

---

## 🎯 갤러리 사진이란?

웹사이트 중간에 있는 **"사역 현장 갤러리"** 섹션의 사진들입니다:
- 커뮤니티 지원
- 교회 예배
- 선교 활동
- 교육 프로그램
- 기도 모임
- 해외 선교

---

## 🖼️ 방법 1: 기존 사진 변경 (가장 쉬움!)

### 1️⃣ GitHub에서 직접 수정

**파일**: `public/index.html`

1. **GitHub 접속**
   ```
   https://github.com/JinJun-han/elimgweb
   → public 폴더 클릭
   → index.html 클릭
   → 연필 아이콘(✏️) 클릭
   ```

2. **검색하기** (Ctrl+F)
   ```
   const IMAGES=
   ```

3. **찾은 부분 예시**
   ```javascript
   const IMAGES={
     hero:'https://images.unsplash.com/photo-...',
     community:'https://images.unsplash.com/photo-...',
     hands:'https://images.unsplash.com/photo-...',
     church:'https://images.unsplash.com/photo-...',  ← 이런 부분들
     kids:'https://images.unsplash.com/photo-...',
     work:'https://images.unsplash.com/photo-...',
     // ... 더 많은 이미지
   };
   ```

4. **이미지 URL 변경**
   ```javascript
   // 예시: 교회 사진 변경
   church:'https://새로운-이미지-URL',
   
   // 예시: 커뮤니티 사진 변경
   community:'https://새로운-이미지-URL',
   ```

5. **저장**
   - 페이지 하단 "Commit changes" 클릭
   - 변경 내용 입력 (예: "갤러리 사진 변경")
   - "Commit changes" 최종 클릭

---

## 📷 방법 2: 이미지 URL 얻기

### 옵션 A: Unsplash (무료, 고품질) ⭐ 추천

1. **Unsplash 접속**
   ```
   https://unsplash.com/
   ```

2. **검색**
   ```
   영어로 검색:
   - "church service" (교회 예배)
   - "community gathering" (커뮤니티 모임)
   - "education children" (교육)
   - "prayer meeting" (기도 모임)
   - "mission work" (선교)
   ```

3. **이미지 선택 및 URL 복사**
   - 원하는 이미지 클릭
   - 우측 "Download free" 옆 화살표 클릭
   - "Copy Image Address" 또는 우클릭 → "Copy Image Address"

4. **URL 형식 변경**
   ```
   복사한 URL:
   https://images.unsplash.com/photo-1234567890?ixlib=...&lots of parameters
   
   간단하게 변경:
   https://images.unsplash.com/photo-1234567890?w=800&q=80
   ```
   💡 **팁**: `?` 이후 부분을 `w=800&q=80`으로 변경하면 빠르게 로드됩니다!

---

### 옵션 B: 직접 찍은 사진 업로드

#### 1) 이미지 호스팅 서비스 사용

**Imgur (무료, 간단):**
```
1. https://imgur.com 접속
2. "New post" 클릭
3. 사진 업로드
4. 업로드된 이미지 우클릭 → "Copy Image Address"
5. URL 복사
```

**Cloudinary (무료 플랜):**
```
1. https://cloudinary.com 가입
2. "Upload" 클릭
3. 사진 업로드
4. URL 복사
```

#### 2) GitHub에 직접 업로드 (추천!)

```
1. GitHub 저장소 접속
2. public/assets 폴더로 이동 (없으면 생성)
3. "Add file" → "Upload files"
4. 사진 드래그 앤 드롭
5. "Commit changes" 클릭
6. 업로드된 파일 클릭
7. "Raw" 버튼 클릭하여 URL 확인

URL 형식:
https://raw.githubusercontent.com/JinJun-han/elimgweb/main/public/assets/your-image.jpg
```

---

## 🎨 방법 3: 갤러리 사진 종류별 변경

### 현재 갤러리 구성 (6개)

**파일 위치**: `public/index.html`에서 `const GALLERY=` 검색

```javascript
const GALLERY=[
  IMAGES.community,   // 1. 커뮤니티 지원
  IMAGES.church,      // 2. 교회 예배
  IMAGES.kids,        // 3. 어린이 교육
  IMAGES.work,        // 4. 일터 사역
  IMAGES.pray,        // 5. 기도 모임
  IMAGES.mission      // 6. 해외 선교
];
```

### 변경 예시

#### 예시 1: 교회 사진만 변경
```javascript
// 1. IMAGES 객체에서 church 찾기
const IMAGES={
  // ...
  church:'https://새로운-교회-사진-URL',
  // ...
};

// 2. 저장 및 커밋
// → 갤러리의 두 번째 사진이 자동으로 변경됩니다!
```

#### 예시 2: 여러 사진 동시 변경
```javascript
const IMAGES={
  community:'https://새로운-커뮤니티-사진-URL',
  church:'https://새로운-교회-사진-URL',
  kids:'https://새로운-어린이-사진-URL',
  // ... 나머지는 그대로
};
```

---

## 🔄 방법 4: 새로운 갤러리 사진 추가

### 1️⃣ 새 이미지 추가

```javascript
const IMAGES={
  hero:'...',
  community:'...',
  // ... 기존 이미지들
  
  // 새로운 이미지 추가
  volunteer:'https://images.unsplash.com/photo-xxx',
  outreach:'https://images.unsplash.com/photo-yyy',
};
```

### 2️⃣ 갤러리 배열에 추가

```javascript
const GALLERY=[
  IMAGES.community,
  IMAGES.church,
  IMAGES.kids,
  IMAGES.work,
  IMAGES.pray,
  IMAGES.mission,
  IMAGES.volunteer,    // 새로 추가
  IMAGES.outreach      // 새로 추가
];
```

→ 이제 갤러리에 8개 사진이 표시됩니다!

---

## 📝 갤러리 제목 및 설명 변경

갤러리 사진에 마우스를 올리면 나타나는 텍스트를 변경하려면:

**검색**: `const GALLERY_TITLES=` (현재는 없음, 추가 가능)

**추가 방법**: 아래 섹션 찾기
```javascript
<div className="gallery-item" data-aos="zoom-in" onclick="openImageModal(this)">
  <img src={갤러리이미지} alt="커뮤니티 지원">
  <div className="gallery-overlay">
    <h3>커뮤니티 지원</h3>      ← 이 부분 변경
    <p>함께 나누는 사랑</p>       ← 이 부분 변경
  </div>
</div>
```

---

## 🎯 추천 이미지 키워드 (Unsplash)

### 교회/예배 관련
```
- "church service"
- "worship hands"
- "prayer meeting"
- "bible study group"
- "community church"
```

### 이주민/다문화 관련
```
- "multicultural community"
- "diverse people gathering"
- "international students"
- "immigrant family"
- "cultural exchange"
```

### 교육 관련
```
- "children learning"
- "classroom teaching"
- "education program"
- "tutoring session"
- "study group"
```

### 봉사/선교 관련
```
- "volunteer work"
- "community service"
- "helping hands"
- "mission trip"
- "charity work"
```

---

## ✅ 이미지 선택 가이드라인

### 좋은 이미지 특징
- ✅ **밝고 따뜻한 분위기**
- ✅ **사람들의 얼굴이 선명하게**
- ✅ **한국/아시아인 포함**
- ✅ **자연스러운 상황**
- ✅ **고해상도 (최소 800px 이상)**

### 피해야 할 이미지
- ❌ 너무 어둡거나 흐릿한 사진
- ❌ 지나치게 연출된 느낌
- ❌ 상업적인 느낌이 강한 사진
- ❌ 저작권 문제가 있는 이미지
- ❌ 저해상도 이미지

---

## 🎨 이미지 최적화 팁

### 1. 이미지 크기
```
권장 크기:
- 갤러리: 800x600px 정도
- 히어로 이미지: 1920x1080px
- 뉴스 썸네일: 800x450px
```

### 2. 파일 형식
```
- JPG: 사진에 적합 (용량 작음)
- PNG: 로고/그래픽 (투명 배경)
- WebP: 최신 형식 (용량 매우 작음)
```

### 3. URL 파라미터 활용
```javascript
// Unsplash 이미지 최적화
'https://images.unsplash.com/photo-1234567890?w=800&q=80'
                                               ↑      ↑
                                            너비  품질(80%)

// 다른 옵션:
?w=1200&q=90  // 더 큰 이미지, 더 높은 품질
?w=400&q=70   // 작은 이미지, 낮은 품질 (빠른 로딩)
```

---

## 🔍 갤러리 관련 파일 위치

| 항목 | 파일 | 라인 (대략) |
|------|------|-------------|
| 이미지 URL | `public/index.html` | 89-102줄 (`const IMAGES=`) |
| 갤러리 배열 | `public/index.html` | 310줄 (`const GALLERY=`) |
| 갤러리 HTML | `public/index.html` | 1200줄 근처 |
| 갤러리 스타일 | `public/index.html` | `<style>` 태그 안 |

---

## 🚀 변경 후 확인 절차

### 로컬 테스트
```bash
# 1. 변경 사항 저장
git pull origin main

# 2. 서버 시작
npm run dev

# 3. 브라우저에서 확인
http://localhost:3000

# 4. 갤러리 섹션으로 스크롤
# 5. 각 이미지 클릭하여 모달 확인
```

### 배포 후 확인
```
1. GitHub에 커밋 후 1-2분 대기
2. 실제 사이트 접속 (elimg.com)
3. 강력 새로고침 (Ctrl+Shift+R)
4. 갤러리 확인
```

---

## 📱 모바일에서 확인

```
1. 데스크톱 브라우저에서 F12 (개발자 도구)
2. 스마트폰 아이콘 클릭 (Toggle device toolbar)
3. iPhone 12 Pro 또는 Galaxy S20 선택
4. 갤러리 사진이 잘 보이는지 확인
```

---

## 🆘 자주 하는 실수

### 문제 1: "이미지가 안 보여요!"

**원인**: 잘못된 URL
```javascript
// ❌ 잘못된 예
church:'www.example.com/image.jpg'  // http:// 없음
church:'C:/Users/Desktop/photo.jpg'  // 로컬 경로

// ✅ 올바른 예
church:'https://images.unsplash.com/photo-xxx'
```

### 문제 2: "이미지가 너무 느려요!"

**해결**: URL 파라미터 최적화
```javascript
// ❌ 원본 크기 (느림)
church:'https://images.unsplash.com/photo-xxx'

// ✅ 최적화 (빠름)
church:'https://images.unsplash.com/photo-xxx?w=800&q=80'
```

### 문제 3: "변경했는데 반영이 안 돼요!"

**해결**:
```
1. Git 커밋 확인: git status
2. 브라우저 캐시 삭제: Ctrl+Shift+R
3. 시크릿 모드로 확인
4. 1-2분 대기 (자동 배포 시간)
```

---

## 💡 고급 팁

### 팁 1: 이미지에 필터 적용
```javascript
// 갤러리 이미지를 약간 어둡게 (오버레이 효과)
<img src={이미지} style={{filter:'brightness(0.9)'}} />
```

### 팁 2: 로딩 속도 개선
```javascript
// Lazy loading 적용 (화면에 보일 때만 로드)
<img src={이미지} loading="lazy" />
```

### 팁 3: 대체 텍스트 개선
```javascript
// SEO 및 접근성 향상
<img src={이미지} alt="엘림G선교회 거제 참빛힐링센터 개소식" />
```

---

## 📞 도움이 필요하신가요?

**이미지 찾기 도움**:
- 📧 kodhjj@gmail.com
- ☎️ 010-2083-3106
- 원하는 사진 설명해주시면 함께 찾아드립니다!

**기술 지원**:
- GitHub Issues: https://github.com/JinJun-han/elimgweb/issues
- 스크린샷과 함께 문의해주세요

---

## 🎉 빠른 실습

**5분 안에 해보기:**

1. ✅ Unsplash에서 "church service" 검색
2. ✅ 마음에 드는 사진 URL 복사
3. ✅ GitHub에서 `public/index.html` 열기
4. ✅ `church:'...'` 찾아서 URL 변경
5. ✅ Commit changes
6. ✅ 1-2분 후 웹사이트에서 확인!

---

**이 가이드로 갤러리 사진을 자유롭게 관리하세요!** 📸✨
