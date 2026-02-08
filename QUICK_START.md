# 🚀 빠른 시작 가이드 - elimg.com 배포

## 📞 당장 시작하기 (가장 쉬운 방법)

### ⏱️ 30분 안에 완료!

---

## 🎯 방법 1: Railway (가장 빠름! 무료~$5/월)

### 1️⃣ Railway 계정 만들기 (2분)
1. https://railway.app 접속
2. "Start a New Project" 클릭
3. GitHub으로 로그인

### 2️⃣ 프로젝트 배포 (3분)
1. "Deploy from GitHub repo" 클릭
2. `elimgweb` 저장소 선택
3. "Deploy Now" 클릭

### 3️⃣ 환경 변수 설정 (5분)
1. 프로젝트 클릭 → Variables 탭
2. 아래 변수 추가:

```
NODE_ENV=production
PORT=3000
JWT_SECRET=랜덤한-긴-문자열-여기에-입력
ADMIN_PASSWORD=강력한-비밀번호
```

### 4️⃣ 도메인 연결 (10분)

**Railway에서:**
1. Settings → Domains
2. "Custom Domain" 클릭
3. `elimg.com` 입력
4. CNAME 값 복사 (예: your-app.up.railway.app)

**가비아에서:**
1. My가비아 로그인
2. 서비스 관리 → 도메인
3. elimg.com 선택 → DNS 정보 → DNS 관리
4. 레코드 수정:

```
타입: CNAME
호스트: www
값: your-app.up.railway.app
```

```
타입: A
호스트: @
값: Railway가 제공한 IP
```

### 5️⃣ 완료! ✅
- 1-2시간 후 https://elimg.com 접속 가능
- 첫 접속 시 약간 느릴 수 있음 (정상)

---

## 🎯 방법 2: Vultr VPS (추천! 안정적, $6/월)

### 1️⃣ Vultr 계정 만들기 (5분)
1. https://www.vultr.com 접속
2. 회원가입 (이메일 인증)
3. 결제 정보 등록 ($10 크레딧 받기)

### 2️⃣ 서버 생성 (5분)
1. Deploy 클릭
2. 설정:
   - Type: Cloud Compute
   - Location: **Seoul, Korea** (중요!)
   - OS: Ubuntu 22.04 LTS
   - Plan: $6/mo (1GB RAM)
3. Deploy Now

### 3️⃣ 서버 접속 (3분)
```bash
# IP와 비밀번호는 Vultr 대시보드에서 확인
ssh root@your-server-ip
# 비밀번호 입력
```

### 4️⃣ 자동 설치 스크립트 실행 (10분)

서버에서 아래 명령어 복사/붙여넣기:

```bash
# 1. 시스템 업데이트 및 Node.js 설치
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt update && sudo apt install -y nodejs nginx git
sudo npm install -g pm2

# 2. 프로젝트 클론
cd /var/www
sudo git clone https://github.com/JinJun-han/elimgweb.git
cd elimgweb

# 3. 설치 및 초기화
sudo npm install
sudo cp .env.example .env

# 4. 환경 변수 편집
sudo nano .env
# JWT_SECRET과 ADMIN_PASSWORD를 변경하세요!
# Ctrl+X, Y, Enter로 저장

# 5. 데이터베이스 초기화 및 서버 시작
sudo npm run init
sudo pm2 start npm --name "elimg" -- start
sudo pm2 save
sudo pm2 startup
```

### 5️⃣ Nginx 설정 (5분)

```bash
# Nginx 설정 파일 생성
sudo nano /etc/nginx/sites-available/elimg.com
```

아래 내용 붙여넣기:
```nginx
server {
    listen 80;
    server_name elimg.com www.elimg.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

```bash
# 설정 활성화
sudo ln -s /etc/nginx/sites-available/elimg.com /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx

# 방화벽 설정
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable
```

### 6️⃣ SSL 인증서 설치 (5분)

```bash
# Certbot 설치
sudo apt install -y certbot python3-certbot-nginx

# SSL 인증서 자동 발급
sudo certbot --nginx -d elimg.com -d www.elimg.com
# 이메일 입력 및 약관 동의
```

### 7️⃣ 가비아 도메인 연결 (2분)

**가비아 DNS 관리:**
1. My가비아 로그인
2. 서비스 관리 → 도메인 → elimg.com
3. DNS 정보 → DNS 관리
4. A 레코드 수정:

```
타입: A
호스트: @
값: [Vultr 서버 IP 주소]
```

```
타입: A
호스트: www
값: [Vultr 서버 IP 주소]
```

### 8️⃣ 완료! ✅
- 1-2시간 후 https://elimg.com 접속 가능
- 서버 관리: `ssh root@your-server-ip`

---

## 🎯 방법 3: 카페24 Node.js 호스팅

### 1️⃣ 카페24 고객센터 문의
- 전화: **1588-0602**
- 문의: "Node.js 호스팅으로 변경하고 싶습니다"

### 2️⃣ 호스팅 변경
- Node.js 지원 플랜으로 업그레이드
- 가격: 월 10,000~30,000원
- 자동 설치 가능 여부 확인

### 3️⃣ FTP로 파일 업로드
```bash
# FileZilla 사용
호스트: ftp.cafe24.com
사용자명: [카페24 ID]
비밀번호: [카페24 비밀번호]

# 프로젝트 전체 업로드
```

### 4️⃣ 카페24에서 설정
- SSH 접속 또는 웹 콘솔
- `npm install`
- `npm run init`
- `npm start`

### 5️⃣ 완료! ✅
- 카페24에서 자동으로 도메인 연결

---

## 📊 비교표

| 방법 | 난이도 | 시간 | 비용/월 | 추천도 |
|------|--------|------|---------|--------|
| Railway | ⭐ 쉬움 | 30분 | 무료~$5 | ⭐⭐⭐⭐⭐ |
| Vultr | ⭐⭐ 보통 | 1시간 | $6 | ⭐⭐⭐⭐⭐ |
| 카페24 | ⭐ 쉬움 | 30분 | 만원~3만원 | ⭐⭐⭐ |

---

## ✅ 배포 후 확인 사항

### 1. 웹사이트 접속
```
https://elimg.com
```

### 2. API 테스트
```
https://elimg.com/health
https://elimg.com/api/news?language=ko
```

### 3. 관리자 로그인
```
POST https://elimg.com/api/admin/login
{
  "username": "admin",
  "password": "설정한_비밀번호"
}
```

---

## 🆘 문제 해결

### DNS 전파가 안 돼요
- 1-24시간 대기
- https://dnschecker.org 에서 확인

### 서버가 안 떠요
```bash
# Railway: 로그 확인
# Vultr: SSH 접속 후
sudo pm2 logs elimg
sudo pm2 restart elimg
```

### SSL 인증서 오류
```bash
# Vultr에서
sudo certbot renew
sudo systemctl restart nginx
```

---

## 📞 추가 도움

### 1순위: Railway (가장 쉬움)
- 클릭 몇 번으로 완료
- 자동 HTTPS
- 무료 시작

### 2순위: Vultr (가장 안정적)
- 완전한 제어
- 한국 서버
- 빠른 속도

### 3순위: 카페24 (가장 익숙함)
- 기존 환경 유지
- 전화 상담 가능
- 관리 편함

---

## 🎯 추천 선택

**초보자**: Railway 선택  
**기술에 익숙**: Vultr 선택  
**관리 편의성**: 카페24 선택

---

## 🚨 급할 때 연락처

**엘림G선교회**
- 📧 kodhjj@gmail.com
- ☎️ 010-2083-3106

**기술 지원 필요 시:**
- 위 연락처로 문의
- 원격 지원 가능

---

## ✨ 마지막 체크리스트

배포 전:
- [ ] .env 파일 설정 (JWT_SECRET, ADMIN_PASSWORD)
- [ ] 이메일 설정 (Gmail 앱 비밀번호)
- [ ] 결제 정보 준비 (Railway/Vultr)

배포 후:
- [ ] HTTPS 작동 확인
- [ ] 관리자 비밀번호 변경
- [ ] 백업 설정
- [ ] 모니터링 설정

---

**준비되셨나요? 지금 바로 시작하세요!** 🚀
