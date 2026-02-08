# 엘림G선교회 웹사이트 실제 배포 가이드

## 📋 현재 상황
- **도메인**: elimg.com (가비아)
- **기존 호스팅**: 카페24 (워드프레스 - 거의 사용 안 함)
- **새 웹사이트**: Node.js 풀스택 애플리케이션

---

## 🎯 배포 방법 3가지 옵션

### ⭐ **추천 옵션 1: 카페24 호스팅 유지 + 서버 추가 (가장 안정적)**

#### 장점
- 도메인 설정 간단 (서브도메인 추가만)
- 기존 워드프레스 유지 가능 (백업용)
- 비용 효율적

#### 단계별 가이드

##### 1️⃣ Node.js 지원 호스팅 선택 (월 5,000~10,000원)

**A. Cafe24 웹호스팅 업그레이드**
```
- Cafe24 Node.js 호스팅으로 업그레이드
- 또는 추가 호스팅 신청
- 월 약 10,000원
```

**B. 저렴한 대안 추천 (추천!)**

1. **Vultr** (추천!)
   - 가격: $6/월 (약 8,000원)
   - Node.js 완벽 지원
   - 한국 리전 있음 (서울)
   - 설정 간단
   - 가입: https://www.vultr.com

2. **DigitalOcean**
   - 가격: $6/월 (약 8,000원)
   - Node.js 완벽 지원
   - 한국 서버 (싱가포르)
   - 가입: https://www.digitalocean.com

3. **AWS Lightsail**
   - 가격: $5/월 (약 6,500원)
   - 한국 리전 (서울)
   - Node.js 지원
   - 가입: https://lightsail.aws.amazon.com

##### 2️⃣ 서버 설정 (Vultr 예시)

**서버 생성:**
```bash
1. Vultr 가입 및 로그인
2. Deploy New Server 클릭
3. 서버 선택:
   - Type: Cloud Compute
   - Location: Seoul, Korea (추천)
   - Server Type: Ubuntu 22.04 LTS
   - Server Size: $6/mo (1 CPU, 1GB RAM)
4. Deploy Now 클릭
```

**SSH 접속:**
```bash
# Vultr 대시보드에서 IP 주소와 비밀번호 확인
ssh root@your_server_ip
```

##### 3️⃣ 서버에 Node.js 설치

```bash
# 1. 시스템 업데이트
sudo apt update && sudo apt upgrade -y

# 2. Node.js 18 설치 (공식 저장소)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# 3. 확인
node --version  # v18.x.x
npm --version   # 9.x.x

# 4. PM2 설치 (프로세스 관리자)
sudo npm install -g pm2

# 5. Nginx 설치 (웹서버)
sudo apt install -y nginx

# 6. Git 설치
sudo apt install -y git
```

##### 4️⃣ 프로젝트 배포

```bash
# 1. 프로젝트 클론
cd /var/www
sudo git clone https://github.com/JinJun-han/elimgweb.git
cd elimgweb

# 2. 의존성 설치
sudo npm install

# 3. 환경 변수 설정
sudo nano .env
```

**.env 파일 내용:**
```env
NODE_ENV=production
PORT=3000
HOST=0.0.0.0

# 데이터베이스
DB_PATH=/var/www/elimgweb/server/database.sqlite

# JWT Secret (강력한 랜덤 문자열로 변경!)
JWT_SECRET=your-super-secret-jwt-key-CHANGE-THIS-NOW-2026

# 이메일 설정 (Gmail 사용)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_FROM=no-reply@elimg.com

# PG 결제 (나중에 설정)
PORTONE_API_KEY=
PORTONE_API_SECRET=
PORTONE_STORE_ID=

# 관리자 계정 (반드시 변경!)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=YourStrongPassword123!

# CORS
CORS_ORIGIN=https://elimg.com

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100

# 파일 업로드
MAX_FILE_SIZE=5242880
UPLOAD_PATH=/var/www/elimgweb/server/uploads
```

```bash
# 4. 데이터베이스 초기화
sudo npm run init

# 5. PM2로 서버 시작
sudo pm2 start npm --name "elimg" -- start
sudo pm2 save
sudo pm2 startup

# 6. 서버 상태 확인
sudo pm2 status
sudo pm2 logs elimg
```

##### 5️⃣ Nginx 설정 (리버스 프록시)

```bash
# Nginx 설정 파일 생성
sudo nano /etc/nginx/sites-available/elimg.com
```

**Nginx 설정 내용:**
```nginx
server {
    listen 80;
    server_name elimg.com www.elimg.com;

    # 클라이언트 최대 업로드 크기
    client_max_body_size 10M;

    # 로그
    access_log /var/log/nginx/elimg-access.log;
    error_log /var/log/nginx/elimg-error.log;

    # Node.js 앱으로 프록시
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # 정적 파일 직접 제공
    location /uploads/ {
        alias /var/www/elimgweb/server/uploads/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location /assets/ {
        alias /var/www/elimgweb/public/assets/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

```bash
# 심볼릭 링크 생성
sudo ln -s /etc/nginx/sites-available/elimg.com /etc/nginx/sites-enabled/

# 기본 사이트 비활성화
sudo rm /etc/nginx/sites-enabled/default

# Nginx 테스트
sudo nginx -t

# Nginx 재시작
sudo systemctl restart nginx
```

##### 6️⃣ SSL 인증서 설치 (HTTPS)

```bash
# Certbot 설치
sudo apt install -y certbot python3-certbot-nginx

# SSL 인증서 발급 (자동 Nginx 설정)
sudo certbot --nginx -d elimg.com -d www.elimg.com

# 이메일 입력 및 약관 동의
# Let's Encrypt가 자동으로 SSL 설정 완료!

# 자동 갱신 테스트
sudo certbot renew --dry-run
```

##### 7️⃣ 가비아 도메인 설정

**A. 기존 워드프레스를 서브도메인으로 이동 (선택사항)**

```
가비아 DNS 관리
1. old.elimg.com → 기존 Cafe24 IP
2. elimg.com → 새 서버 IP
3. www.elimg.com → 새 서버 IP
```

**B. 새 서버로 완전 이전 (추천)**

```
가비아 DNS 관리
1. 로그인 → My가비아 → 서비스 관리 → 도메인
2. elimg.com 선택 → DNS 정보 → DNS 관리
3. A 레코드 수정:
   - 호스트: @
   - 값/위치: [새 서버 IP 주소]
   - TTL: 3600
   
4. A 레코드 추가 (www):
   - 호스트: www
   - 값/위치: [새 서버 IP 주소]
   - TTL: 3600
```

**DNS 전파 대기 (1~24시간)**
```bash
# DNS 전파 확인
nslookup elimg.com
ping elimg.com
```

##### 8️⃣ 방화벽 설정

```bash
# UFW 방화벽 활성화
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

##### 9️⃣ 최종 확인

```bash
# 서버 상태 확인
sudo pm2 status
sudo systemctl status nginx

# 로그 확인
sudo pm2 logs elimg --lines 50

# 웹사이트 접속 테스트
curl -I https://elimg.com
```

---

### 🔄 **옵션 2: 카페24 Node.js 호스팅으로 전환**

#### 장점
- 도메인 설정 자동
- 관리 편리
- 기술 지원

#### 단계

1. **카페24 고객센터 문의**
   - 전화: 1588-0602
   - 문의: "Node.js 호스팅으로 전환 문의"

2. **호스팅 플랜 확인**
   - Node.js 지원 여부
   - 가격 (월 10,000~30,000원)
   - 서버 스펙

3. **프로젝트 업로드**
   - FTP로 파일 업로드
   - 또는 Git 연동
   - PM2 설정

4. **도메인 연결**
   - 카페24에서 자동 처리

---

### 💰 **옵션 3: Vercel/Netlify (프론트엔드) + Railway/Render (백엔드)**

#### 장점
- 무료 또는 저렴
- 배포 자동화
- Git 연동

#### 단점
- 프론트/백엔드 분리 필요
- 초기 설정 복잡

#### 단계

**백엔드 배포 (Railway - 추천)**

1. **Railway 가입**
   - https://railway.app
   - GitHub 계정으로 로그인

2. **프로젝트 배포**
   ```
   1. New Project 클릭
   2. Deploy from GitHub repo
   3. elimgweb 선택
   4. 환경 변수 설정
   5. Deploy
   ```

3. **도메인 연결**
   ```
   Settings → Domains → Custom Domain
   → api.elimg.com 추가
   ```

**프론트엔드 배포 (Netlify)**

1. **Netlify 가입**
   - https://netlify.com
   - GitHub 계정으로 로그인

2. **사이트 배포**
   ```
   1. New site from Git
   2. elimgweb 선택
   3. Build settings:
      - Build command: (없음)
      - Publish directory: public
   4. Deploy
   ```

3. **도메인 연결**
   ```
   Domain settings → Custom domains
   → elimg.com 추가
   ```

4. **가비아 DNS 설정**
   ```
   A 레코드:
   - @: 75.2.60.5 (Netlify IP)
   
   CNAME 레코드:
   - www: your-site.netlify.app
   - api: your-app.up.railway.app
   ```

---

## 📋 배포 후 체크리스트

### ✅ 필수 확인 사항

1. **보안**
   - [ ] HTTPS 작동 확인
   - [ ] JWT_SECRET 변경
   - [ ] 관리자 비밀번호 변경
   - [ ] 방화벽 설정 확인

2. **기능**
   - [ ] 메인 페이지 로딩
   - [ ] API 엔드포인트 작동
   - [ ] 다국어 전환 확인
   - [ ] 이미지 업로드 테스트
   - [ ] 이메일 발송 테스트

3. **성능**
   - [ ] 로딩 속도 확인
   - [ ] 모바일 반응형 확인
   - [ ] 이미지 최적화 확인

4. **SEO**
   - [ ] Google Search Console 등록
   - [ ] 사이트맵 제출
   - [ ] 메타 태그 확인

---

## 🔧 유지보수 가이드

### 일상적인 관리

```bash
# SSH 접속
ssh root@your_server_ip

# 서버 상태 확인
cd /var/www/elimgweb
sudo pm2 status

# 로그 확인
sudo pm2 logs elimg --lines 100

# 서버 재시작
sudo pm2 restart elimg

# 코드 업데이트
git pull origin main
npm install
sudo pm2 restart elimg
```

### 백업

```bash
# 데이터베이스 백업
sudo cp /var/www/elimgweb/server/database.sqlite \
        /var/www/backups/database-$(date +%Y%m%d).sqlite

# 자동 백업 스크립트 (cron)
sudo crontab -e

# 매일 새벽 3시 백업
0 3 * * * cp /var/www/elimgweb/server/database.sqlite /var/www/backups/database-$(date +\%Y\%m\%d).sqlite
```

---

## 💰 비용 예상

### 옵션 1: VPS 호스팅 (추천)
- Vultr/DigitalOcean: $6/월 (약 8,000원)
- 도메인(가비아): 유지
- **총 월 비용: 약 8,000원**

### 옵션 2: 카페24 Node.js
- 호스팅: 10,000~30,000원/월
- 도메인: 유지
- **총 월 비용: 10,000~30,000원**

### 옵션 3: Railway + Netlify
- Railway: $5/월 또는 무료 (제한)
- Netlify: 무료
- 도메인: 유지
- **총 월 비용: 0~6,500원**

---

## 📞 도움이 필요하시면

### 추천 순서

1. **Vultr VPS 배포** (가장 안정적)
   - 위 가이드 따라하기
   - 문제 발생 시 연락주세요

2. **카페24 문의**
   - 1588-0602
   - "Node.js 호스팅 전환 상담"

3. **Railway 배포** (가장 쉬움)
   - https://railway.app
   - GitHub 연동 클릭 몇 번

---

## 🎯 추천 방법

**상황별 추천:**

- **예산 중요**: Railway (무료~$5)
- **안정성 중요**: Vultr VPS ($6)
- **관리 편의성**: 카페24 Node.js ($10~30)

**개인적 추천: Vultr VPS**
- 가성비 최고
- 완전한 제어
- 한국 서버 있음
- 확장 가능

---

## 📝 다음 단계

1. 배포 방법 선택
2. 서버 준비
3. 프로젝트 배포
4. 도메인 연결
5. SSL 설정
6. 테스트
7. 런칭! 🚀

필요하시면 각 단계별로 더 상세한 가이드 제공 가능합니다!
