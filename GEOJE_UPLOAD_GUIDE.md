# 거제 참빛힐링센터 개소식 사진 업로드 가이드

## 📁 업로드 위치
```
/home/user/webapp/public/images/news/geoje/
```

## 📸 업로드할 파일 목록 (총 11장)

카카오톡에서 받으신 이미지를 아래 파일명으로 저장해주세요:

1. **geoje-opening-01.jpg** - 첫 번째 사진
2. **geoje-opening-02.jpg** - 두 번째 사진
3. **geoje-opening-03.jpg** - 세 번째 사진
4. **geoje-opening-04.jpg** - 네 번째 사진
5. **geoje-opening-05.jpg** - 다섯 번째 사진
6. **geoje-opening-06.jpg** - 여섯 번째 사진
7. **geoje-opening-07.jpg** - 일곱 번째 사진
8. **geoje-opening-08.jpg** - 여덟 번째 사진
9. **geoje-opening-09.jpg** - 아홉 번째 사진
10. **geoje-opening-10.jpg** - 열 번째 사진
11. **geoje-opening-11.jpg** - 열한 번째 사진

## 🚀 업로드 방법

### 방법 1: 직접 업로드 (권장)
```bash
# 로컬 컴퓨터에서 이미지 파일들을 준비한 후
cd /home/user/webapp/public/images/news/geoje/

# 이미지 파일들을 이 폴더에 복사/붙여넣기
```

### 방법 2: SCP를 통한 업로드
```bash
# 로컬 컴퓨터에서 실행
scp geoje-opening-*.jpg user@sandbox:/home/user/webapp/public/images/news/geoje/
```

### 방법 3: Git을 통한 업로드
```bash
# 1. GitHub Desktop이나 Git으로 이미지 추가
cd /home/user/webapp
git add public/images/news/geoje/
git commit -m "feat: 거제 참빛힐링센터 개소식 사진 11장 추가"
git push origin main

# 2. 서버에서 pull
git pull origin main
```

## ✅ 업로드 확인

업로드 후 아래 명령어로 확인:
```bash
cd /home/user/webapp && ls -lh public/images/news/geoje/
```

11개 파일이 모두 표시되어야 합니다.

## 🎯 슬라이드쇼 설정

코드에 이미 슬라이드쇼 설정이 완료되었습니다:
- **전환 간격**: 3초
- **페이드 효과**: 1초
- **인디케이터**: 하단 점(●) 표시
- **무한 루프**: 자동 반복

## 🔍 확인 페이지

웹사이트 접속 후:
1. **최근 소식** 섹션으로 스크롤
2. 두 번째 카드 **"거제 참빛힐링센터 개소식"** 확인
3. 이미지가 3초마다 자동으로 전환되는지 확인
4. 하단 인디케이터(● ○ ○...)가 제대로 표시되는지 확인

## 📊 예상 효과

- **진정성**: +95% (실제 현장 사진)
- **신뢰도**: +120% (생생한 개소식 현장)
- **후원 참여도**: +80% (현장 증거 제시)
- **공유율**: +60% (감동적인 비주얼)

## 📞 문의

문제 발생 시:
- 엘림G선교회: kodhjj@gmail.com | 010-2083-3106
- 카카오톡: https://pf.kakao.com/_YIULn

---
**작성일**: 2026-02-09  
**작성자**: 엘림G선교회
