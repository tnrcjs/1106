# 🚀 GitHub Pages 배포 가이드

이 문서는 구구단 산성비 게임을 GitHub Pages에 배포하는 방법을 안내합니다.

## 📋 사전 준비

1. **GitHub 계정** 필요
2. **Git** 설치 필요
3. **Node.js** 설치 필요

---

## 🎯 배포 방법 (2가지)

### 방법 1: GitHub Actions 자동 배포 (권장) ⭐

#### 1단계: GitHub 저장소 생성

1. GitHub에 로그인
2. 우측 상단 `+` 버튼 클릭 → `New repository`
3. Repository name: `multiplication-rain-game` (또는 원하는 이름)
4. Public 선택
5. `Create repository` 클릭

#### 2단계: 로컬 프로젝트를 Git 저장소로 초기화

```bash
# 프로젝트 디렉토리로 이동
cd C:\Users\hyg64\Downloads\test

# Git 초기화
git init

# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: 구구단 산성비 게임"

# 원격 저장소 연결 (YOUR_USERNAME을 본인 GitHub 아이디로 변경)
git remote add origin https://github.com/YOUR_USERNAME/multiplication-rain-game.git

# main 브랜치로 푸시
git branch -M main
git push -u origin main
```

#### 3단계: GitHub Pages 설정

1. GitHub 저장소 페이지에서 `Settings` 탭 클릭
2. 왼쪽 메뉴에서 `Pages` 클릭
3. **Source** 섹션에서:
   - Source: `GitHub Actions` 선택
4. 자동으로 배포가 시작됩니다!

#### 4단계: 배포 완료 확인

1. `Actions` 탭에서 배포 진행 상황 확인
2. 배포 완료 후 접속 주소: `https://YOUR_USERNAME.github.io/multiplication-rain-game/`

---

### 방법 2: 수동 배포 (gh-pages 사용)

#### 1단계: 의존성 설치

```bash
npm install
```

#### 2단계: 배포

```bash
npm run deploy
```

이 명령어는 자동으로:
- 프로젝트 빌드
- `gh-pages` 브랜치 생성
- GitHub Pages에 배포

#### 3단계: GitHub Pages 설정

1. GitHub 저장소 → `Settings` → `Pages`
2. **Source** 섹션에서:
   - Branch: `gh-pages` 선택
   - Folder: `/ (root)` 선택
3. `Save` 클릭

#### 4단계: 접속

배포 완료 후: `https://YOUR_USERNAME.github.io/multiplication-rain-game/`

---

## 🔧 중요 설정 파일

### vite.config.ts

```typescript
base: '/multiplication-rain-game/'
```

⚠️ **주의**: 저장소 이름을 다르게 했다면, base 경로도 동일하게 변경해야 합니다!

예시:
- 저장소 이름이 `gugudan-game`이면 → `base: '/gugudan-game/'`
- 저장소 이름이 `test`이면 → `base: '/test/'`

---

## 🔄 업데이트 배포

### 방법 1 사용 시 (GitHub Actions)

```bash
# 파일 수정 후
git add .
git commit -m "업데이트 내용"
git push
```

→ 자동으로 배포됩니다!

### 방법 2 사용 시 (gh-pages)

```bash
npm run deploy
```

---

## 🐛 문제 해결

### 1. 페이지가 제대로 표시되지 않는 경우

**문제**: 흰 화면만 보이거나 스타일이 안 보임

**해결책**:
1. `vite.config.ts`의 `base` 경로 확인
2. GitHub 저장소 이름과 `base` 경로가 일치하는지 확인
3. 예시: 저장소가 `multiplication-rain-game`이면 `base: '/multiplication-rain-game/'`

### 2. GitHub Actions 배포 실패

**문제**: Actions 탭에서 빨간색 X 표시

**해결책**:
1. `Settings` → `Pages` → Source를 `GitHub Actions`로 설정했는지 확인
2. `Settings` → `Actions` → `General` → Workflow permissions를 `Read and write permissions`로 설정

### 3. 404 에러

**문제**: 페이지 접속 시 404 에러

**해결책**:
1. GitHub Pages가 활성화되었는지 확인 (Settings → Pages)
2. 배포 완료까지 2-3분 대기
3. 브라우저 캐시 삭제 후 새로고침 (Ctrl + Shift + R)

---

## 📱 배포 후 확인사항

- [ ] 메인 메뉴가 정상적으로 표시되는가?
- [ ] 게임 모드 선택이 작동하는가?
- [ ] 게임이 정상적으로 시작되는가?
- [ ] 빗방울이 떨어지는가?
- [ ] 정답 입력이 작동하는가?
- [ ] 점수와 콤보가 정상적으로 표시되는가?
- [ ] 통계 화면이 잘 보이는가?
- [ ] 효과음이 재생되는가?

---

## 🎉 배포 완료!

배포가 완료되면 친구들과 선생님께 링크를 공유하세요:

```
https://YOUR_USERNAME.github.io/multiplication-rain-game/
```

---

## 📞 도움이 필요하신가요?

- GitHub 저장소에 Issues 탭에서 질문하기
- README.md 파일 참고하기

---

**행운을 빕니다! 🚀**

