# 엘림G선교회 - 풀스택 글로컬 선교 플랫폼

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)

> **🎉 완성된 웹사이트를 지금 바로 확인하세요!**  
> 라이브 데모: [여기를 클릭](https://3000-ikfnvt0ididz4vgesiz23-5c13a017.sandbox.novita.ai)

## 📚 빠른 가이드 링크

처음 사용하시나요? 아래 가이드를 확인하세요:

| 가이드 | 설명 | 소요 시간 |
|--------|------|-----------|
| [⚡ QUICK_REFERENCE.md](./QUICK_REFERENCE.md) | 가장 자주 수정하는 내용만 모음 | 2분 |
| [📝 HOW_TO_EDIT.md](./HOW_TO_EDIT.md) | 웹사이트 수정 완벽 가이드 | 10분 |
| [💡 EDITING_EXAMPLES.md](./EDITING_EXAMPLES.md) | 실전 수정 예시 모음 (5/10/30분) | 15분 |
| [🚀 QUICK_START.md](./QUICK_START.md) | elimg.com 실제 배포 (3가지 방법) | 30분 |
| [📄 DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) | 상세 배포 가이드 | 1시간 |
| [🎬 VIDEO_TUTORIAL_SCRIPT.md](./VIDEO_TUTORIAL_SCRIPT.md) | 비디오 튜토리얼 스크립트 | - |
| [📋 FINAL_SUMMARY.md](./FINAL_SUMMARY.md) | 전체 프로젝트 요약 | 5분 |
| [✨ FULLSTACK_COMPLETE.md](./FULLSTACK_COMPLETE.md) | 풀스택 기능 상세 설명 | 10분 |

## 🌍 프로젝트 개요

엘림G선교회 웹사이트는 **단순한 정보 제공을 넘어 실제 작동하는 풀스택 선교 플랫폼**입니다.

### 주요 특징

- 🌐 **다국어 지원** - 한국어, 영어, 베트남어 (향후 18개국 지원 예정)
- 💳 **온라인 후원 시스템** - PortOne(구 아임포트) PG 연동
- 📊 **실시간 데이터** - 방문자 추적, 후원 진행률, 통계
- 🔒 **관리자 대시보드** - 뉴스 관리, 댓글 승인, 후원 관리
- 📧 **이메일 통합** - 뉴스레터 자동 발송
- 🔍 **검색 기능** - 다국어 콘텐츠 검색
- 💬 **댓글 시스템** - 승인 워크플로우
- 🖼️ **갤러리 관리** - 이미지 최적화 및 썸네일 생성
- 📱 **반응형 디자인** - 모바일 최적화
- ⚡ **성능 최적화** - 이미지 lazy loading, SEO, 접근성

## 🚀 빠른 시작

### 필수 요구사항

- Node.js >= 18.0.0
- npm >= 8.0.0

### 설치 및 실행

```bash
# 1. 저장소 클론
git clone https://github.com/JinJun-han/elimgweb.git
cd elimgweb

# 2. 의존성 설치
npm install

# 3. 환경 변수 설정
cp .env.example .env
# .env 파일을 편집하여 필요한 설정을 입력하세요

# 4. 데이터베이스 초기화
npm run init

# 5. 개발 서버 실행
npm run dev

# 서버가 http://localhost:3000 에서 실행됩니다
```

## 📁 프로젝트 구조

```
elimgweb/
├── server/                 # 백엔드 서버
│   ├── models/            # 데이터베이스 모델
│   │   └── database.js    # SQLite 스키마 및 초기화
│   ├── routes/            # API 라우트
│   │   ├── api.js         # 공개 API 엔드포인트
│   │   └── admin.js       # 관리자 API 엔드포인트
│   ├── middleware/        # Express 미들웨어
│   ├── utils/             # 유틸리티 함수
│   ├── uploads/           # 업로드된 파일
│   ├── index.js           # 메인 서버 파일
│   ├── init-db.js         # 데이터베이스 초기화 스크립트
│   └── database.sqlite    # SQLite 데이터베이스 (자동 생성)
├── public/                # 정적 파일
│   ├── assets/           # 이미지, 아이콘
│   └── index.html        # 프론트엔드 SPA
├── i18n/                  # 다국어 번역 파일
│   ├── ko.json           # 한국어
│   ├── en.json           # 영어
│   └── vi.json           # 베트남어
├── .env.example          # 환경 변수 예시
├── package.json          # 프로젝트 설정
└── README.md             # 이 파일
```

## 🔧 환경 변수 설정

`.env` 파일을 생성하고 다음 변수들을 설정하세요:

### 서버 설정
```env
NODE_ENV=development
PORT=3000
HOST=0.0.0.0
```

### 데이터베이스
```env
DB_PATH=./server/database.sqlite
```

### JWT 인증
```env
JWT_SECRET=your-super-secret-jwt-key-change-this
```

### 이메일 설정 (Nodemailer)
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=no-reply@elimg.com
```

### PG 결제 (PortOne)
```env
PORTONE_API_KEY=your-api-key
PORTONE_API_SECRET=your-api-secret
PORTONE_STORE_ID=your-store-id
```

### 관리자 계정
```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change-this-password
```

## 📡 API 엔드포인트

### 공개 API

#### 방문자 통계
```http
GET /api/visitors
```

#### 뉴스레터 구독
```http
POST /api/newsletter
Content-Type: application/json

{
  "email": "user@example.com",
  "language": "ko"
}
```

#### 후원하기
```http
POST /api/donation
Content-Type: application/json

{
  "donor_name": "홍길동",
  "donor_email": "hong@example.com",
  "donor_phone": "010-1234-5678",
  "amount": 50000,
  "payment_method": "card",
  "is_recurring": false,
  "language": "ko"
}
```

#### 후원 진행률
```http
GET /api/donation/progress
```

#### 뉴스 목록
```http
GET /api/news?page=1&limit=10&language=ko
```

#### 뉴스 상세
```http
GET /api/news/:id?language=ko
```

#### 댓글 작성
```http
POST /api/comments
Content-Type: application/json

{
  "news_id": 1,
  "author_name": "홍길동",
  "author_email": "hong@example.com",
  "content": "좋은 소식 감사합니다!",
  "language": "ko"
}
```

#### 검색
```http
GET /api/search?q=선교&language=ko
```

#### 다국어 번역
```http
GET /api/i18n/:lang
```

### 관리자 API (인증 필요)

#### 로그인
```http
POST /api/admin/login
Content-Type: application/json

{
  "username": "admin",
  "password": "your-password"
}
```

#### 대시보드 통계
```http
GET /api/admin/dashboard
Authorization: Bearer <token>
```

#### 뉴스 관리
```http
GET /api/admin/news
POST /api/admin/news
PUT /api/admin/news/:id
DELETE /api/admin/news/:id
```

#### 댓글 관리
```http
GET /api/admin/comments
PUT /api/admin/comments/:id/approve
DELETE /api/admin/comments/:id
```

#### 후원 관리
```http
GET /api/admin/donations
PUT /api/admin/donations/:id/status
```

#### 설정 관리
```http
GET /api/admin/settings
PUT /api/admin/settings
```

## 🎨 기술 스택

### 백엔드
- **Node.js** - 런타임 환경
- **Express** - 웹 프레임워크
- **SQLite (better-sqlite3)** - 데이터베이스
- **JWT** - 인증
- **Bcrypt** - 비밀번호 해싱
- **Nodemailer** - 이메일 발송
- **Multer** - 파일 업로드
- **Sharp** - 이미지 최적화

### 프론트엔드
- **React 18** - UI 라이브러리
- **Babel Standalone** - JSX 변환
- **Vanilla CSS** - 스타일링
- **IntersectionObserver** - 스크롤 애니메이션
- **Clipboard API** - 복사 기능

### 보안 & 성능
- **Helmet** - HTTP 보안 헤더
- **CORS** - Cross-Origin Resource Sharing
- **Rate Limiting** - API 요청 제한
- **Compression** - Gzip 압축

## 🛡️ 보안

### 구현된 보안 기능
- ✅ JWT 기반 인증
- ✅ Bcrypt 비밀번호 해싱
- ✅ Helmet 보안 헤더
- ✅ CORS 설정
- ✅ Rate Limiting
- ✅ SQL Injection 방어 (prepared statements)
- ✅ XSS 방어
- ✅ 파일 업로드 검증

### 권장 사항
- 프로덕션 환경에서 HTTPS 사용
- 환경 변수에 민감한 정보 저장
- 정기적인 의존성 업데이트
- 강력한 JWT 시크릿 사용

## 📊 데이터베이스 스키마

### 주요 테이블

#### visitors
방문자 추적
- id, ip_address, user_agent, visited_at

#### newsletter_subscribers
뉴스레터 구독자
- id, email, language, subscribed_at, is_active

#### donations
후원 내역
- id, donor_name, donor_email, amount, payment_id, status, is_recurring

#### news
뉴스 기사 (다국어)
- id, title_ko/en/vi, content_ko/en/vi, image_url, category, is_published

#### comments
댓글
- id, news_id, author_name, content, is_approved, parent_id

#### admin_users
관리자 계정
- id, username, password_hash, role, last_login

#### partners
협력 파트너 (BAM 기업)
- id, name_ko/en, category, industry, website_url

#### gallery
갤러리 이미지
- id, image_url, thumbnail_url, category

#### settings
사이트 설정
- key, value

## 🌐 다국어 지원

### 지원 언어
- 🇰🇷 한국어 (ko)
- 🇺🇸 영어 (en)
- 🇻🇳 베트남어 (vi)

### 번역 파일 위치
```
i18n/
├── ko.json
├── en.json
└── vi.json
```

### 사용 예시
```javascript
// API 요청 시 language 파라미터 사용
GET /api/news?language=vi
GET /api/i18n/en
```

## 💳 결제 연동 (PortOne)

### 설정 방법

1. [PortOne](https://portone.io/) 가입
2. 가맹점 ID 및 API 키 발급
3. `.env` 파일에 설정

```env
PORTONE_API_KEY=your-api-key
PORTONE_API_SECRET=your-api-secret
PORTONE_STORE_ID=your-store-id
```

### 결제 흐름

1. 사용자가 후원 양식 작성
2. POST `/api/donation` 으로 후원 정보 전송
3. 서버에서 PortOne 결제 페이지 URL 반환
4. 사용자가 결제 완료
5. PortOne 웹훅으로 서버에 결제 완료 알림
6. 데이터베이스 업데이트 및 이메일 발송

## 📧 이메일 설정

### Gmail 사용 시

1. Gmail 계정에서 2단계 인증 활성화
2. 앱 비밀번호 생성
3. `.env` 파일에 설정

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 기능
- ✅ 뉴스레터 구독 환영 이메일
- ✅ 후원 완료 감사 이메일
- ✅ 관리자에게 알림 이메일

## 🔍 SEO 최적화

### 구현된 기능
- ✅ 메타 태그 (title, description, og:*)
- ✅ Sitemap (추가 예정)
- ✅ robots.txt (추가 예정)
- ✅ 구조화된 데이터 (Schema.org)
- ✅ 시맨틱 HTML
- ✅ Alt 텍스트
- ✅ 로딩 최적화

## ♿ 접근성

### WCAG 2.1 준수
- ✅ 키보드 네비게이션
- ✅ ARIA 레이블
- ✅ 색상 대비율
- ✅ 포커스 인디케이터
- ✅ 스크린 리더 지원

## 📱 모바일 최적화

- ✅ 반응형 디자인
- ✅ 터치 친화적 UI
- ✅ 모바일 메뉴
- ✅ 이미지 최적화
- ✅ 빠른 로딩 시간

## 🚀 배포

### 프로덕션 빌드

```bash
# 환경 변수 설정
NODE_ENV=production

# 서버 실행
npm start
```

### 권장 호스팅
- **서버**: AWS EC2, DigitalOcean, Heroku
- **데이터베이스**: SQLite (소규모) 또는 PostgreSQL (대규모)
- **정적 파일**: AWS S3, Cloudflare
- **도메인**: Cloudflare DNS

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 연락처

**엘림G선교회**
- 웹사이트: https://elimg.com
- 이메일: kodhjj@gmail.com
- 전화: 010-2083-3106
- 카카오톡: https://pf.kakao.com/_YIULn

## 🙏 후원

이 프로젝트가 도움이 되었다면 후원을 고려해주세요:

**계좌번호**: 농협은행 301-0296-7179-91 (엘림G선교회)

---

Made with ❤️ by Elim G Mission | © 2026 All rights reserved
