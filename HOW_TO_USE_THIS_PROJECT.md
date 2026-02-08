# 🎯 엘림G선교회 웹사이트 - 완벽 사용 설명서

> **목표**: 코딩을 전혀 몰라도 웹사이트를 수정하고 관리할 수 있도록!

---

## 📖 이 프로젝트는 무엇인가요?

엘림G선교회를 위한 **완전히 작동하는 웹사이트**입니다:

✅ **지금 바로 볼 수 있습니다**: https://3000-ikfnvt0ididz4vgesiz23-5c13a017.sandbox.novita.ai  
✅ **다국어 지원**: 한국어, 영어, 베트남어  
✅ **실시간 후원 시스템**: 온라인 후원 가능  
✅ **관리자 기능**: 뉴스, 댓글, 후원 관리  
✅ **모바일 최적화**: 스마트폰에서 완벽 작동  

---

## 🚀 3가지 주요 질문

### Q1. "웹사이트를 수정하려면?"

**가장 쉬운 방법 3가지:**

#### 1️⃣ GitHub에서 직접 수정 (5분) ⭐ 추천!
```
1. https://github.com/JinJun-han/elimgweb 접속
2. public/index.html 파일 클릭
3. 연필 아이콘(✏️) 클릭
4. 내용 수정
5. "Commit changes" 클릭
→ 끝! 1-2분 후 자동 반영
```

📚 **자세한 가이드**: [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) (2분 읽기)

---

#### 2️⃣ VS Code로 수정 (10분)
```
1. VS Code 다운로드: https://code.visualstudio.com/
2. 저장소 클론: git clone https://github.com/JinJun-han/elimgweb.git
3. 파일 수정
4. 저장 후 Git 푸시
```

📚 **자세한 가이드**: [HOW_TO_EDIT.md](./HOW_TO_EDIT.md) (10분 읽기)

---

#### 3️⃣ 자주 수정하는 내용
| 내용 | 파일 | 검색어 | 난이도 |
|------|------|--------|--------|
| 전화번호 | public/index.html | `010-2083-3106` | ⭐ |
| 이메일 | public/index.html | `kodhjj@gmail.com` | ⭐ |
| 계좌번호 | public/index.html | `301-0296-7179-91` | ⭐ |
| 제목 | public/index.html | `세상을 향한` | ⭐ |
| 색상 | public/index.html | `--primary-color` | ⭐⭐ |
| 뉴스 | server/init-db.js | `sampleNews` | ⭐⭐ |

📚 **실전 예시**: [EDITING_EXAMPLES.md](./EDITING_EXAMPLES.md) (15분 읽기)

---

### Q2. "elimg.com 도메인으로 연결하려면?"

**3가지 방법 중 선택:**

#### 방법 1: Railway (가장 쉬움!) ⭐⭐⭐⭐⭐
```
시간: 30분
비용: 무료 ~ $5/월
난이도: ⭐ (매우 쉬움)

1. https://railway.app 접속
2. GitHub으로 로그인
3. elimgweb 저장소 배포
4. 환경 변수 설정
5. 가비아에서 DNS 연결
→ 완료!
```

📚 **자세한 가이드**: [QUICK_START.md](./QUICK_START.md) - "방법 1: Railway" 섹션

---

#### 방법 2: Vultr VPS (가장 안정적) ⭐⭐⭐⭐⭐
```
시간: 1시간
비용: $6/월 (~8,000원)
난이도: ⭐⭐ (보통)

장점:
- 서울 서버 사용 (빠름!)
- 완전한 제어
- 확장 가능

1. Vultr 가입
2. 서버 생성 (서울)
3. SSH 접속
4. 자동 설치 스크립트 실행
5. Nginx + SSL 설정
6. 가비아 DNS 연결
→ 완료!
```

📚 **자세한 가이드**: [QUICK_START.md](./QUICK_START.md) - "방법 2: Vultr VPS" 섹션  
📚 **더 자세히**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) (전체 과정)

---

#### 방법 3: 카페24 (가장 익숙함) ⭐⭐⭐
```
시간: 30분 + 상담 시간
비용: 10,000~30,000원/월
난이도: ⭐ (쉬움)

1. 카페24 고객센터 전화: 1588-0602
2. "Node.js 호스팅으로 변경하고 싶습니다"
3. 플랜 업그레이드
4. FTP로 파일 업로드
→ 완료!
```

---

### Q3. "관리자 기능은 어떻게 사용하나요?"

#### 관리자 로그인
```
URL: https://your-domain.com/api/admin/login
Username: admin
Password: change-this-password (반드시 변경!)
```

#### 주요 기능
1. **뉴스 관리** - 새 소식 작성/수정/삭제
2. **댓글 관리** - 댓글 승인/삭제
3. **후원 관리** - 후원 내역 확인
4. **통계 대시보드** - 방문자, 후원 현황

📚 **API 문서**: [FULLSTACK_COMPLETE.md](./FULLSTACK_COMPLETE.md) - "관리자 API" 섹션

---

## 📁 파일 구조 (알아두면 좋아요)

```
elimgweb/
├── public/
│   └── index.html          ⭐ 메인 웹페이지 (가장 자주 수정)
├── server/
│   ├── index.js            서버 메인 파일
│   ├── routes/
│   │   ├── api.js          API 엔드포인트
│   │   └── admin.js        관리자 기능
│   └── init-db.js          초기 데이터 (뉴스 샘플)
├── i18n/
│   ├── ko.json             🇰🇷 한국어 번역
│   ├── en.json             🇺🇸 영어 번역
│   └── vi.json             🇻🇳 베트남어 번역
├── .env                    ⚙️ 환경 설정 (비밀번호 등)
└── package.json            📦 프로젝트 정보
```

---

## ✅ 체크리스트: 처음 시작할 때

### 1. 웹사이트 확인
- [ ] 라이브 데모 접속: https://3000-ikfnvt0ididz4vgesiz23-5c13a017.sandbox.novita.ai
- [ ] 모든 섹션 살펴보기
- [ ] 모바일에서도 확인

### 2. GitHub 계정 준비
- [ ] GitHub 계정 만들기: https://github.com
- [ ] elimgweb 저장소 확인: https://github.com/JinJun-han/elimgweb

### 3. 첫 수정 해보기
- [ ] QUICK_REFERENCE.md 읽기 (2분)
- [ ] GitHub에서 전화번호 변경 시도
- [ ] 변경사항 확인

### 4. 배포 방법 선택
- [ ] QUICK_START.md 읽기 (10분)
- [ ] Railway, Vultr, 카페24 중 선택
- [ ] 선택한 방법 따라하기

### 5. 관리자 설정
- [ ] 관리자 비밀번호 변경
- [ ] 첫 뉴스 작성해보기
- [ ] 통계 확인

---

## 🆘 문제가 생겼을 때

### 자주 묻는 질문 (FAQ)

#### Q: "수정했는데 웹사이트에 반영이 안 돼요!"
```
A: 
1. 브라우저 새로고침 (Ctrl+Shift+R)
2. 시크릿 모드로 확인
3. 1-2분 대기 (자동 배포 시간)
4. Git 푸시 확인: git status
```

#### Q: "Git 푸시가 안 돼요!"
```
A:
1. 최신 코드 가져오기: git pull origin main
2. 충돌 해결
3. 다시 푸시: git push origin main
```

#### Q: "서버가 시작되지 않아요!"
```
A:
1. 포트 확인: lsof -ti:3000 | xargs kill -9
2. 데이터베이스 초기화: npm run init
3. 재시작: npm run dev
```

#### Q: "비밀번호를 잊어버렸어요!"
```
A:
1. .env 파일 열기
2. ADMIN_PASSWORD 확인
3. 변경 후 서버 재시작
```

---

## 📞 도움 요청하기

### 연락처
- 📧 이메일: kodhjj@gmail.com
- ☎️ 전화: 010-2083-3106
- 💬 카카오톡: https://pf.kakao.com/_YIULn

### 문의 시 포함할 내용
```
1. 무엇을 하려고 했는지
2. 어떤 문제가 발생했는지
3. 에러 메시지 (있다면)
4. 스크린샷
```

---

## 🎓 학습 경로 (추천)

### 1단계: 기초 (30분)
1. ✅ 이 문서 읽기 (10분)
2. ✅ 라이브 데모 확인 (5분)
3. ✅ QUICK_REFERENCE.md (5분)
4. ✅ GitHub에서 간단한 수정 (10분)

### 2단계: 실습 (1시간)
1. ✅ HOW_TO_EDIT.md 읽기 (15분)
2. ✅ EDITING_EXAMPLES.md 따라하기 (30분)
3. ✅ 로컬에서 테스트 (15분)

### 3단계: 배포 (2시간)
1. ✅ QUICK_START.md 읽기 (20분)
2. ✅ 배포 방법 선택 (10분)
3. ✅ 실제 배포 진행 (1시간)
4. ✅ DNS 연결 (30분)

### 4단계: 마스터 (계속)
1. ✅ FULLSTACK_COMPLETE.md 읽기
2. ✅ 관리자 기능 활용
3. ✅ 고급 수정 시도
4. ✅ 최적화 및 개선

---

## 💡 팁 모음

### 수정할 때
- ✅ 작은 수정부터 시작
- ✅ 수정 전 백업 (Git 커밋)
- ✅ 로컬에서 먼저 테스트
- ✅ 의미 있는 커밋 메시지

### 배포할 때
- ✅ .env 파일 확인
- ✅ 관리자 비밀번호 변경
- ✅ HTTPS 적용
- ✅ 백업 설정

### 관리할 때
- ✅ 정기적으로 뉴스 업데이트
- ✅ 댓글 모니터링
- ✅ 통계 확인
- ✅ 보안 업데이트

---

## 🎯 목표 달성 로드맵

### Phase 1: 기본 운영 (1주)
- [x] 웹사이트 완성
- [ ] elimg.com 도메인 연결
- [ ] 연락처 정보 업데이트
- [ ] 첫 뉴스 작성

### Phase 2: 콘텐츠 충실화 (1개월)
- [ ] 주간 뉴스 업데이트
- [ ] 사진 갤러리 확장
- [ ] FAQ 추가
- [ ] 파트너 정보 업데이트

### Phase 3: 기능 확장 (3개월)
- [ ] 온라인 후원 활성화
- [ ] 뉴스레터 발송
- [ ] 이벤트 관리
- [ ] 통계 분석

### Phase 4: 글로벌 확장 (6개월)
- [ ] 다국어 콘텐츠 확장
- [ ] 모바일 앱 검토
- [ ] AI 챗봇 도입
- [ ] 글로벌 파트너십

---

## 📚 전체 문서 가이드

| 문서 | 내용 | 소요 시간 | 난이도 |
|------|------|-----------|--------|
| [⚡ QUICK_REFERENCE.md](./QUICK_REFERENCE.md) | 빠른 참조 (자주 찾는 것) | 2분 | ⭐ |
| [📝 HOW_TO_EDIT.md](./HOW_TO_EDIT.md) | 수정 완벽 가이드 | 10분 | ⭐ |
| [💡 EDITING_EXAMPLES.md](./EDITING_EXAMPLES.md) | 실전 수정 예시 | 15분 | ⭐ |
| [🚀 QUICK_START.md](./QUICK_START.md) | 30분 빠른 배포 | 30분 | ⭐⭐ |
| [📄 DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) | 상세 배포 가이드 | 1시간 | ⭐⭐ |
| [🎬 VIDEO_TUTORIAL_SCRIPT.md](./VIDEO_TUTORIAL_SCRIPT.md) | 비디오 튜토리얼 | - | ⭐ |
| [📋 FINAL_SUMMARY.md](./FINAL_SUMMARY.md) | 전체 프로젝트 요약 | 5분 | ⭐ |
| [✨ FULLSTACK_COMPLETE.md](./FULLSTACK_COMPLETE.md) | 풀스택 기능 설명 | 10분 | ⭐⭐⭐ |
| [📖 README.md](./README.md) | 프로젝트 소개 | 5분 | ⭐ |

---

## 🎉 시작하기

**준비되셨나요?**

1. ✅ 이 문서를 북마크하세요
2. ✅ [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)를 열어보세요 (2분)
3. ✅ 첫 수정을 시도해보세요!

---

**엘림G선교회 웹사이트와 함께 글로컬 선교를 펼쳐나가세요!** 🌍❤️

Made with ❤️ by Elim G Mission | © 2026
