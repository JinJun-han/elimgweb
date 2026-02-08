# ⚡ 빠른 참조 가이드

> 웹사이트 수정 시 자주 찾는 내용만 모았습니다!

---

## 📞 가장 많이 수정하는 5가지

### 1. 연락처 정보 변경

**파일**: `public/index.html`  
**검색어**: `010-2083-3106` 또는 `kodhjj@gmail.com`

```html
<!-- 전화번호 -->
<p><i class="fas fa-phone"></i> 010-2083-3106</p>
→ <p><i class="fas fa-phone"></i> 새-전화번호</p>

<!-- 이메일 -->
<p><i class="fas fa-envelope"></i> kodhjj@gmail.com</p>
→ <p><i class="fas fa-envelope"></i> 새-이메일</p>

<!-- 주소 -->
<p><i class="fas fa-map-marker-alt"></i> 경남 거제시 장평동</p>
→ <p><i class="fas fa-map-marker-alt"></i> 새-주소</p>
```

---

### 2. 후원 계좌번호 변경

**파일**: `public/index.html`  
**검색어**: `301-0296-7179-91`

```html
<div class="bank-name">NH농협은행</div>
<div class="account-number">301-0296-7179-91</div>
<div class="account-holder">엘림G선교회</div>
```

---

### 3. 메인 제목 변경

**파일**: `public/index.html`  
**검색어**: `세상을 향한 하나님의 사랑`

```html
<h1 class="hero-title">
  세상을 향한 하나님의 사랑
</h1>
```

---

### 4. 로고 이미지 변경

**파일**: `public/index.html`  
**검색어**: `ELIM+G`

```html
<img src="https://via.placeholder.com/150x50/4A90E2/ffffff?text=ELIM+G" alt="엘림G선교회">
→ <img src="본인-로고-URL" alt="엘림G선교회">
```

---

### 5. 통계 숫자 변경

**파일**: `public/index.html`  
**검색어**: `data-count=`

```html
<div class="stat-number" data-count="3247">0</div>
→ <div class="stat-number" data-count="5000">0</div>
```

---

## 🎨 색상 변경

**파일**: `public/index.html`  
**위치**: `<style>` 태그 안, 맨 위  
**검색어**: `:root {`

```css
:root {
  --primary-color: #4A90E2;     /* 메인 파란색 */
  --secondary-color: #50C878;   /* 서브 초록색 */
  --accent-color: #FF6B6B;      /* 강조 빨간색 */
}
```

### 인기 색상 조합

**파란색 테마 (현재)**
```css
--primary-color: #4A90E2;
--secondary-color: #50C878;
```

**초록색 테마**
```css
--primary-color: #27AE60;
--secondary-color: #3498DB;
```

**보라색 테마**
```css
--primary-color: #9B59B6;
--secondary-color: #E67E22;
```

---

## 📝 자주 사용하는 Git 명령어

### 수정 후 GitHub에 올리기
```bash
git add .
git commit -m "수정 내용 설명"
git push origin main
```

### 최신 코드 가져오기
```bash
git pull origin main
```

### 백업 브랜치 만들기
```bash
git branch backup-20260208
```

---

## 🚀 배포 명령어

### 로컬 테스트
```bash
npm run dev
# http://localhost:3000 접속
```

### 데이터베이스 초기화
```bash
npm run init
```

### 서버 재시작 (PM2 사용 시)
```bash
pm2 restart elimg
pm2 logs elimg
```

---

## 🔍 검색 팁

### VS Code에서
- **파일 내 검색**: `Ctrl + F` (Mac: `Cmd + F`)
- **전체 파일 검색**: `Ctrl + Shift + F`
- **바꾸기**: `Ctrl + H`

### GitHub에서
- **파일 내 검색**: 파일 열고 `Ctrl + F`
- **저장소 전체 검색**: 상단 검색창

---

## 📂 파일 위치 빠른 찾기

| 수정 내용 | 파일 경로 |
|----------|----------|
| 웹페이지 내용 | `public/index.html` |
| 한국어 번역 | `i18n/ko.json` |
| 영어 번역 | `i18n/en.json` |
| 베트남어 번역 | `i18n/vi.json` |
| 초기 뉴스 데이터 | `server/init-db.js` |
| API 엔드포인트 | `server/routes/api.js` |
| 환경 설정 | `.env` |

---

## ⚠️ 주의사항

### ❌ 하지 말아야 할 것
- `.env` 파일을 GitHub에 올리지 마세요
- `node_modules/` 폴더를 수정하지 마세요
- 다른 사람의 커밋을 강제로 덮어쓰지 마세요

### ✅ 꼭 해야 할 것
- 수정 전 백업 (Git 커밋)
- 로컬에서 먼저 테스트
- 의미 있는 커밋 메시지 작성

---

## 🆘 문제 해결 빠른 가이드

### 문제: 수정이 반영되지 않음
```bash
# 1. 브라우저 캐시 삭제
Ctrl + Shift + R (강력 새로고침)

# 2. 서버 재시작
npm run dev

# 3. 시크릿 모드로 확인
```

### 문제: Git 푸시 오류
```bash
# 최신 코드 먼저 가져오기
git pull origin main

# 충돌 해결 후 다시 푸시
git add .
git commit -m "충돌 해결"
git push origin main
```

### 문제: 서버 시작 안 됨
```bash
# 포트 확인 및 종료
lsof -ti:3000 | xargs kill -9

# 재시작
npm run dev
```

---

## 📞 긴급 연락처

**엘림G선교회**
- 📧 kodhjj@gmail.com
- ☎️ 010-2083-3106
- 💬 카카오톡: https://pf.kakao.com/_YIULn

**GitHub 저장소**
- 🔗 https://github.com/JinJun-han/elimgweb

---

## 📚 상세 가이드 링크

더 자세한 내용은 아래 문서를 참조하세요:

- 📖 [HOW_TO_EDIT.md](./HOW_TO_EDIT.md) - 종합 수정 가이드
- 📝 [EDITING_EXAMPLES.md](./EDITING_EXAMPLES.md) - 실전 예시 모음
- 🎬 [VIDEO_TUTORIAL_SCRIPT.md](./VIDEO_TUTORIAL_SCRIPT.md) - 비디오 튜토리얼
- 🚀 [QUICK_START.md](./QUICK_START.md) - 30분 빠른 시작
- 📄 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - 배포 가이드
- 📋 [FINAL_SUMMARY.md](./FINAL_SUMMARY.md) - 전체 요약

---

## 💡 한눈에 보는 수정 체크리스트

배포 전 확인:
- [ ] 연락처 정보 업데이트
- [ ] 후원 계좌 확인
- [ ] 관리자 비밀번호 변경
- [ ] 로고 이미지 교체
- [ ] 뉴스/공지사항 최신화
- [ ] 로컬 테스트 완료
- [ ] Git 커밋 및 푸시
- [ ] 실제 사이트 확인

---

**이 가이드를 북마크하세요!** ⭐  
수정할 때마다 참조하시면 됩니다.
