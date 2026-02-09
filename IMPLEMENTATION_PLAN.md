# 🚀 웹사이트 개선 구현 계획

## 📋 구현할 4가지 개선사항

### 1️⃣ 히어로 애니메이션 슬라이드쇼 (하동 스타일)

**변경 위치:** `IMAGES` 객체 및 히어로 섹션 로직

**Before:**
```javascript
const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80',
  // ...
};
```

**After:**
```javascript
const HERO_IMAGES = [
  '/images/hero/bridge-night.jpg',      // 거제 야경 다리
  '/images/hero/mountain-rock.jpg',     // 지리산 바위  
  '/images/hero/sunset-city.jpg',       // 도시 석양
  '/images/hero/sunset-mountain.jpg'    // 산 석양
];

// 5초마다 자동 전환
const [heroIndex, setHeroIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
  }, 5000);
  return () => clearInterval(interval);
}, []);
```

**CSS 추가:**
```css
@keyframes heroFade {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.hero-slideshow {
  position: absolute;
  inset: 0;
  transition: opacity 1.5s ease-in-out;
}
```

---

### 2️⃣ 글로컬 선교 성경 구절 섹션

**추가 위치:** 히어로 섹션 다음, 통계 섹션 전

**HTML 구조:**
```javascript
<section id="scripture" style={{
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: '#fff',
  padding: '100px 20px',
  textAlign: 'center'
}}>
  <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
    <h2 style={{
      fontSize: 'clamp(2rem, 5vw, 3rem)',
      marginBottom: '60px',
      fontWeight: 700
    }}>
      하나님의 마음으로
    </h2>
    
    {SCRIPTURE_VERSES.map((verse, idx) => (
      <div key={idx} className="fade-in" style={{
        margin: '40px auto',
        maxWidth: '800px',
        borderLeft: '4px solid rgba(255,255,255,0.5)',
        paddingLeft: '30px',
        textAlign: 'left'
      }}>
        <p style={{
          fontFamily: "'Lora', 'Noto Serif KR', serif",
          fontStyle: 'italic',
          fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
          lineHeight: 1.8,
          marginBottom: '16px'
        }}>
          "{verse.text}"
        </p>
        <p style={{
          fontSize: '1.1rem',
          opacity: 0.9
        }}>
          — {verse.reference}
        </p>
      </div>
    ))}
  </div>
</section>
```

**데이터:**
```javascript
const SCRIPTURE_VERSES = [
  {
    text: "내가 나그네 되었을 때에 영접하였고",
    reference: "마태복음 25:35"
  },
  {
    text: "땅 끝까지 이르러 내 증인이 되리라",
    reference: "사도행전 1:8"
  },
  {
    text: "너희는 가서 모든 민족을 제자로 삼아",
    reference: "마태복음 28:19"
  },
  {
    text: "하나님이 세상을 이처럼 사랑하사",
    reference: "요한복음 3:16"
  },
  {
    text: "광야에서 엘림으로, 엘림에서 가나안으로",
    reference: "출애굽기 15:27"
  }
];
```

---

### 3️⃣ 해외 선교지 섹션

**추가 위치:** 파트너 섹션 전

**HTML 구조:**
```javascript
<section id="overseas-missions" style={{
  padding: '100px 20px',
  background: '#FAF9F6'
}}>
  <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
    <h2 style={{
      fontSize: 'clamp(2rem, 5vw, 3rem)',
      textAlign: 'center',
      marginBottom: '20px',
      fontWeight: 700
    }}>
      해외 선교지
    </h2>
    <div className="gline"></div>
    <p style={{
      textAlign: 'center',
      fontSize: '1.1rem',
      color: '#666',
      marginTop: '20px',
      marginBottom: '60px'
    }}>
      소수민족 목회자 신학교육 사역
    </p>
    
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '32px'
    }}>
      {OVERSEAS_MISSIONS.map((mission, idx) => (
        <div key={idx} className="card" style={{
          background: '#fff',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
        }}>
          <img src={mission.image} alt={mission.title} style={{
            width: '100%',
            height: '240px',
            objectFit: 'cover'
          }}/>
          <div style={{ padding: '32px' }}>
            <h3 style={{
              fontSize: '1.8rem',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>{mission.flag}</span>
              <span>{mission.country}</span>
            </h3>
            <h4 style={{
              fontSize: '1.3rem',
              color: '#C77B3F',
              marginBottom: '16px'
            }}>
              {mission.title}
            </h4>
            <p style={{
              fontSize: '1rem',
              color: '#666',
              marginBottom: '24px',
              lineHeight: 1.7
            }}>
              {mission.description}
            </p>
            <ul style={{
              listStyle: 'none',
              marginBottom: '24px'
            }}>
              {mission.programs.map((prog, i) => (
                <li key={i} style={{
                  padding: '8px 0',
                  fontSize: '0.95rem',
                  color: '#444'
                }}>
                  ✅ {prog}
                </li>
              ))}
            </ul>
            <button className="btn" style={{
              background: 'linear-gradient(135deg, #C77B3F, #B0683A)',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 600,
              width: '100%'
            }}>
              더 알아보기 →
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

**데이터:**
```javascript
const OVERSEAS_MISSIONS = [
  {
    flag: '🇻🇳',
    country: '베트남',
    title: 'MBA (메콩 바이블 아카데미)',
    description: '소수민족 목회자 신학교육 사역',
    image: '/images/gallery/vietnam-mission.jpg',
    programs: [
      '소수민족 리더 양성',
      '체계적인 신학교육',
      '현지 교회 개척 지원',
      '메콩 델타 지역 중심'
    ]
  },
  {
    flag: '🇹🇭',
    country: '태국',
    title: '카렌족 목회자 신학교육',
    description: '카렌족 교회 지도자 양성 사역',
    image: '/images/gallery/thailand-church.jpg',
    programs: [
      '카렌족 목회자 교육',
      '성경 기반 리더십 훈련',
      '산악 지역 교회 지원',
      '문화 적합형 신학교육'
    ]
  }
];
```

---

### 4️⃣ 갤러리 실제 사진 교체

**변경 위치:** `IMAGES` 객체 → `GALLERY_IMAGES` 배열

**Before:**
```javascript
const IMAGES = {
  community: 'https://images.unsplash.com/...',
  hands: 'https://images.unsplash.com/...',
  church: 'https://images.unsplash.com/...',
  // ...
};
```

**After:**
```javascript
const GALLERY_IMAGES = [
  // 예배 (3장)
  { src: '/images/gallery/stone-church.jpg', title: '오산교회', category: '예배' },
  { src: '/images/gallery/church-group.jpg', title: '교회 단체', category: '예배' },
  { src: '/images/gallery/christmas-family.jpg', title: '크리스마스 예배', category: '예배' },
  
  // 사역 현장 (5장)
  { src: '/images/gallery/indoor-group.jpg', title: '실내 모임', category: '사역' },
  { src: '/images/gallery/vietnam-mission.jpg', title: '베트남 선교', category: '해외' },
  { src: '/images/gallery/korea-seminar.jpg', title: '한국 세미나', category: '교육' },
  { src: '/images/gallery/thailand-group.jpg', title: '태국 카렌족 모임', category: '해외' },
  { src: '/images/gallery/thailand-church.jpg', title: '태국 교회', category: '해외' },
  
  // 자연 및 시설 (15장)
  { src: '/images/gallery/lake-mountain.jpg', title: '호수와 산', category: '자연' },
  { src: '/images/gallery/building-garden.jpg', title: '건물과 정원', category: '시설' },
  { src: '/images/gallery/snowy-mountain.jpg', title: '설악산 겨울', category: '자연' },
  { src: '/images/gallery/mountain-hiker.jpg', title: '산 등반', category: '자연' },
  { src: '/images/gallery/rainbow-landscape.jpg', title: '무지개 풍경', category: '자연' },
  { src: '/images/gallery/city-view.jpg', title: '도시 전망', category: '지역' },
  { src: '/images/gallery/garden-pond.jpg', title: '정원 연못', category: '시설' },
  { src: '/images/gallery/wooden-stairs.jpg', title: '나무 계단', category: '자연' },
  { src: '/images/gallery/bamboo-path.jpg', title: '대나무 길', category: '자연' },
  { src: '/images/gallery/golden-cliff.jpg', title: '황금 절벽', category: '자연' },
  { src: '/images/gallery/industrial-view.jpg', title: '산업 지역', category: '지역' },
  { src: '/images/gallery/golden-sunset.jpg', title: '황금 석양', category: '자연' },
  { src: '/images/gallery/garden-bench.jpg', title: '정원 벤치', category: '시설' },
  { src: '/images/gallery/lotus-pond.jpg', title: '연꽃 연못', category: '자연' },
  { src: '/images/gallery/fountain-flowers.jpg', title: '분수와 꽃', category: '시설' }
];
```

**갤러리 렌더링:**
```javascript
<div className="img-gallery">
  {GALLERY_IMAGES.map((img, idx) => (
    <div key={idx} style={{ position: 'relative' }}>
      <img 
        src={img.src} 
        alt={img.title}
        onClick={() => openImageModal(img.src)}
      />
      <div style={{
        position: 'absolute',
        bottom: '12px',
        left: '12px',
        right: '12px',
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(8px)',
        padding: '12px',
        borderRadius: '12px',
        color: '#fff'
      }}>
        <p style={{ fontWeight: 600, marginBottom: '4px' }}>{img.title}</p>
        <span style={{
          fontSize: '0.85rem',
          padding: '2px 8px',
          background: 'rgba(199,123,63,0.8)',
          borderRadius: '8px'
        }}>
          {img.category}
        </span>
      </div>
    </div>
  ))}
</div>
```

---

## 🎯 구현 순서

1. **IMAGES 객체 업데이트** - HERO_IMAGES, GALLERY_IMAGES 추가
2. **히어로 애니메이션** - useState + useEffect로 5초마다 전환
3. **성경 구절 섹션** - 새 섹션 추가 (히어로 다음)
4. **해외 선교지 섹션** - 새 섹션 추가 (파트너 전)
5. **갤러리 교체** - GALLERY_IMAGES 사용

---

## ✅ 완료 체크리스트

- [ ] HERO_IMAGES 배열 추가
- [ ] 히어로 애니메이션 로직 구현
- [ ] SCRIPTURE_VERSES 데이터 추가
- [ ] 성경 구절 섹션 추가
- [ ] OVERSEAS_MISSIONS 데이터 추가
- [ ] 해외 선교지 섹션 추가
- [ ] GALLERY_IMAGES 배열 추가
- [ ] 갤러리 렌더링 로직 변경
- [ ] CSS 애니메이션 추가
- [ ] 테스트 및 검증

---

**작성일:** 2026-02-09
**작성자:** Claude AI
**목적:** 엘림G 웹사이트 4대 개선사항 구현 가이드
