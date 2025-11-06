# 구구단 산성비 게임 (Multiplication Rain)

초등학교 5학년 학생들이 재미있게 곱셈 구구단을 학습하고 연습할 수 있는 교육용 게임입니다.

## 🎮 게임 특징

### 게임 모드
- **연습 모드**: 2~9단 중 특정 단을 선택하여 집중 연습
- **도전 모드**: 전체 구구단 랜덤 출제 (생명 3개, 레벨 시스템)
- **시간 제한 모드**: 2분 동안 최대한 많은 문제 해결

### 주요 기능
- 하늘에서 떨어지는 곱셈 문제 빗방울
- 콤보 시스템 (5콤보: 1.5배, 10콤보: 2배, 20콤보: 3배)
- 레벨업 시스템 (10개 정답마다 레벨업)
- 빠른 정답 보너스
- 단별 정확도 통계
- LocalStorage를 통한 기록 저장
- 효과음 및 애니메이션

## 🚀 시작하기

### 필요 조건
- Node.js 18.0 이상
- npm 또는 yarn

### 설치 방법

1. 의존성 패키지 설치
```bash
npm install
```

2. 개발 서버 실행
```bash
npm run dev
```

3. 브라우저에서 접속
```
http://localhost:5173
```

### 빌드

프로덕션 빌드:
```bash
npm run build
```

빌드된 파일 미리보기:
```bash
npm run preview
```

## 📁 프로젝트 구조

```
multiplication-rain-game/
├── src/
│   ├── components/          # React 컴포넌트
│   │   ├── MainMenu.tsx     # 메인 메뉴
│   │   ├── Game.tsx         # 게임 화면
│   │   ├── Raindrop.tsx     # 빗방울 컴포넌트
│   │   ├── GameOver.tsx     # 게임 오버 화면
│   │   ├── Stats.tsx        # 통계 화면
│   │   └── Settings.tsx     # 설정 화면
│   ├── utils/               # 유틸리티 함수
│   │   ├── gameLogic.ts     # 게임 로직
│   │   ├── storage.ts       # LocalStorage 관리
│   │   └── sounds.ts        # 사운드 관리
│   ├── styles/              # CSS 스타일
│   │   ├── index.css        # 전역 스타일
│   │   └── App.css          # 앱 스타일
│   ├── types.ts             # TypeScript 타입 정의
│   ├── App.tsx              # 메인 앱 컴포넌트
│   └── main.tsx             # 앱 진입점
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎯 게임 방법

1. **메인 메뉴**에서 원하는 게임 모드를 선택합니다.
2. 화면 상단에서 떨어지는 곱셈 문제를 확인합니다.
3. 하단 입력창에 **정답을 입력**하고 Enter 키를 누릅니다.
4. 빗방울이 바닥에 닿기 전에 정답을 맞춰야 합니다!
5. 연속으로 정답을 맞추면 **콤보 보너스**가 적용됩니다.

## 📊 점수 시스템

- **기본 점수**: 10점
- **콤보 보너스**:
  - 5콤보: 1.5배
  - 10콤보: 2배
  - 20콤보: 3배
- **빠른 정답 보너스**: 빗방울이 상단 30%에 있을 때 +5점

## 🎨 디자인

- **주색상**: 밝은 파란색 (#4A90E2)
- **보조색**: 노란색 (#FFD700)
- **부드러운 애니메이션**으로 학습에 재미를 더했습니다.

## 🛠️ 기술 스택

- **React 18** - UI 프레임워크
- **TypeScript** - 타입 안정성
- **Vite** - 빠른 개발 환경
- **CSS3** - 스타일링 및 애니메이션
- **Web Audio API** - 사운드 효과

## 📝 기능 로드맵

### ✅ MVP (완료)
- [x] 기본 게임 메커니즘
- [x] 연습/도전/시간제한 모드
- [x] 점수 및 콤보 시스템
- [x] LocalStorage 저장
- [x] 효과음
- [x] 통계 및 설정 화면

### 🔜 향후 계획
- [ ] 캐릭터 및 테마 시스템
- [ ] 업적 시스템
- [ ] 리더보드 (백엔드 필요)
- [ ] 모바일 반응형 개선
- [ ] PWA 지원

## 🎓 교육적 가치

- 곱셈 구구단 암기 및 숙달
- 빠른 계산 능력 향상
- 집중력 및 순발력 향상
- 게임화를 통한 학습 동기 부여

## 🚀 GitHub Pages 배포

이 프로젝트는 GitHub Pages로 배포할 수 있습니다.

### 빠른 배포

```bash
# 1. GitHub 저장소 생성 후
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/multiplication-rain-game.git
git push -u origin main

# 2. GitHub 저장소 Settings → Pages → Source를 "GitHub Actions"로 설정

# 3. 완료! 자동으로 배포됩니다.
```

자세한 배포 가이드는 [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)를 참고하세요.

### 배포 URL

```
https://YOUR_USERNAME.github.io/multiplication-rain-game/
```

## 📄 라이선스

이 프로젝트는 교육용으로 제작되었습니다.

## 👨‍💻 개발자

Product Requirements Document를 바탕으로 제작된 교육용 게임입니다.

---

**즐겁게 학습하세요! 💧📚**

