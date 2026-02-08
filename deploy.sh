#!/bin/bash

# 엘림G선교회 웹사이트 배포 스크립트
# 사용법: ./deploy.sh

set -e

echo "🚀 엘림G선교회 웹사이트 배포 시작..."
echo ""

# 색상 정의
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. 환경 확인
echo -e "${BLUE}📋 1단계: 환경 확인${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}⚠️  Node.js가 설치되지 않았습니다.${NC}"
    echo "Node.js 18 이상을 설치하세요: https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v)
echo -e "${GREEN}✅ Node.js 버전: $NODE_VERSION${NC}"

if ! command -v npm &> /dev/null; then
    echo -e "${YELLOW}⚠️  npm이 설치되지 않았습니다.${NC}"
    exit 1
fi

NPM_VERSION=$(npm -v)
echo -e "${GREEN}✅ npm 버전: $NPM_VERSION${NC}"
echo ""

# 2. 의존성 설치
echo -e "${BLUE}📦 2단계: 의존성 설치${NC}"
npm install
echo -e "${GREEN}✅ 의존성 설치 완료${NC}"
echo ""

# 3. 환경 변수 확인
echo -e "${BLUE}⚙️  3단계: 환경 변수 확인${NC}"
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  .env 파일이 없습니다. .env.example을 복사합니다.${NC}"
    cp .env.example .env
    echo -e "${YELLOW}📝 .env 파일을 편집하여 설정을 완료하세요!${NC}"
    echo ""
    echo "필수 설정 항목:"
    echo "  - JWT_SECRET (강력한 랜덤 문자열)"
    echo "  - ADMIN_PASSWORD (관리자 비밀번호)"
    echo "  - EMAIL_* (이메일 설정)"
    echo ""
    read -p "지금 .env 파일을 편집하시겠습니까? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        ${EDITOR:-nano} .env
    else
        echo -e "${YELLOW}나중에 반드시 .env 파일을 편집하세요!${NC}"
    fi
else
    echo -e "${GREEN}✅ .env 파일 존재${NC}"
fi
echo ""

# 4. 데이터베이스 초기화
echo -e "${BLUE}💾 4단계: 데이터베이스 초기화${NC}"
if [ -f server/database.sqlite ]; then
    read -p "⚠️  기존 데이터베이스가 있습니다. 재초기화하시겠습니까? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm server/database.sqlite
        npm run init
        echo -e "${GREEN}✅ 데이터베이스 재초기화 완료${NC}"
    else
        echo -e "${BLUE}ℹ️  기존 데이터베이스 유지${NC}"
    fi
else
    npm run init
    echo -e "${GREEN}✅ 데이터베이스 초기화 완료${NC}"
fi
echo ""

# 5. 프로덕션 빌드 (선택사항)
echo -e "${BLUE}🔨 5단계: 프로덕션 준비${NC}"
export NODE_ENV=production
echo -e "${GREEN}✅ 프로덕션 모드 설정${NC}"
echo ""

# 6. PM2 확인 및 설치
echo -e "${BLUE}🔧 6단계: PM2 프로세스 관리자${NC}"
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}⚠️  PM2가 설치되지 않았습니다.${NC}"
    read -p "PM2를 설치하시겠습니까? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        sudo npm install -g pm2
        echo -e "${GREEN}✅ PM2 설치 완료${NC}"
    else
        echo -e "${YELLOW}⚠️  PM2 없이 계속합니다 (수동 서버 관리 필요)${NC}"
    fi
else
    PM2_VERSION=$(pm2 -v)
    echo -e "${GREEN}✅ PM2 버전: $PM2_VERSION${NC}"
fi
echo ""

# 7. 서버 시작 방법 선택
echo -e "${BLUE}🚀 7단계: 서버 시작${NC}"
echo ""
echo "서버 시작 방법을 선택하세요:"
echo "  1) 개발 모드 (npm run dev) - 로그 출력"
echo "  2) PM2로 프로덕션 실행 (백그라운드)"
echo "  3) 직접 시작 (나중에)"
echo ""
read -p "선택 (1/2/3): " -n 1 -r
echo
echo ""

case $REPLY in
    1)
        echo -e "${GREEN}🎯 개발 모드로 서버 시작...${NC}"
        echo ""
        npm run dev
        ;;
    2)
        if command -v pm2 &> /dev/null; then
            echo -e "${GREEN}🎯 PM2로 프로덕션 서버 시작...${NC}"
            pm2 delete elimg 2>/dev/null || true
            pm2 start npm --name "elimg" -- start
            pm2 save
            echo ""
            echo -e "${GREEN}✅ 서버가 백그라운드에서 실행 중입니다!${NC}"
            echo ""
            echo "유용한 PM2 명령어:"
            echo "  - pm2 status        : 서버 상태 확인"
            echo "  - pm2 logs elimg    : 로그 확인"
            echo "  - pm2 restart elimg : 서버 재시작"
            echo "  - pm2 stop elimg    : 서버 중지"
            echo ""
            pm2 status
        else
            echo -e "${YELLOW}⚠️  PM2가 설치되지 않았습니다. 옵션 1을 선택하거나 PM2를 설치하세요.${NC}"
        fi
        ;;
    3)
        echo -e "${BLUE}ℹ️  나중에 직접 서버를 시작하세요:${NC}"
        echo "  - 개발: npm run dev"
        echo "  - 프로덕션: npm start"
        echo "  - PM2: pm2 start npm --name elimg -- start"
        ;;
    *)
        echo -e "${YELLOW}⚠️  잘못된 선택입니다.${NC}"
        ;;
esac

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎉 배포 완료!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "📍 다음 단계:"
echo ""
echo "1. 서버 접속:"
echo "   http://localhost:3000"
echo ""
echo "2. API 테스트:"
echo "   http://localhost:3000/health"
echo "   http://localhost:3000/api/news?language=ko"
echo ""
echo "3. 관리자 로그인:"
echo "   POST http://localhost:3000/api/admin/login"
echo "   { username: 'admin', password: '설정한 비밀번호' }"
echo ""
echo "4. 실제 서버 배포:"
echo "   DEPLOYMENT_GUIDE.md 참조"
echo ""
echo -e "${YELLOW}⚠️  중요: .env 파일의 보안 설정을 반드시 확인하세요!${NC}"
echo ""
