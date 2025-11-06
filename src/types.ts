// 게임 모드
export type GameMode = 'practice' | 'challenge' | 'timed' | null;

// 빗방울 객체
export interface Raindrop {
  id: string;
  num1: number;
  num2: number;
  answer: number;
  x: number;
  y: number;
  speed: number;
}

// 게임 상태
export interface GameState {
  mode: GameMode;
  score: number;
  level: number;
  lives: number;
  combo: number;
  raindrops: Raindrop[];
  currentInput: string;
  isGameOver: boolean;
  isPaused: boolean;
  selectedTable?: number; // 연습 모드에서 선택한 단
  timeLeft?: number; // 시간 제한 모드용
}

// 게임 통계
export interface GameStats {
  totalGames: number;
  highScore: number;
  totalCorrect: number;
  totalWrong: number;
  accuracy: number;
  tableAccuracy: { [key: number]: number }; // 각 단별 정확도
  bestCombo: number;
}

// 사운드 타입
export type SoundType = 'correct' | 'wrong' | 'gameOver' | 'levelUp' | 'combo';

// 게임 설정
export interface GameSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  difficulty: 'easy' | 'normal' | 'hard';
}

