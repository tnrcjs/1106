import { Raindrop } from '../types';

// 랜덤 곱셈 문제 생성
export const generateProblem = (selectedTable?: number): { num1: number; num2: number } => {
  if (selectedTable) {
    // 연습 모드: 특정 단만
    return {
      num1: selectedTable,
      num2: Math.floor(Math.random() * 9) + 2,
    };
  } else {
    // 도전 모드: 2~9단 랜덤
    return {
      num1: Math.floor(Math.random() * 8) + 2,
      num2: Math.floor(Math.random() * 8) + 2,
    };
  }
};

// 빗방울 생성
export const createRaindrop = (
  level: number,
  canvasWidth: number,
  selectedTable?: number
): Raindrop => {
  const problem = generateProblem(selectedTable);
  
  // 레벨에 따른 속도 조정
  const baseSpeed = 1;
  const speed = baseSpeed + (level - 1) * 0.3;
  
  return {
    id: `${Date.now()}-${Math.random()}`,
    num1: problem.num1,
    num2: problem.num2,
    answer: problem.num1 * problem.num2,
    x: Math.random() * (canvasWidth - 100) + 50, // 화면 양쪽 여백
    y: -50,
    speed,
  };
};

// 레벨별 동시 빗방울 개수
export const getMaxRaindrops = (level: number): number => {
  if (level <= 3) return 1;
  if (level <= 6) return 2;
  if (level <= 9) return 3;
  return 4;
};

// 콤보에 따른 점수 배율
export const getComboMultiplier = (combo: number): number => {
  if (combo >= 20) return 3;
  if (combo >= 10) return 2;
  if (combo >= 5) return 1.5;
  return 1;
};

// 빠른 정답 보너스 (빗방울이 상단 30%에 있을 때)
export const getFastAnswerBonus = (raindrop: Raindrop, canvasHeight: number): number => {
  const topThreshold = canvasHeight * 0.3;
  return raindrop.y < topThreshold ? 5 : 0;
};

// 점수 계산
export const calculateScore = (
  combo: number,
  raindrop: Raindrop,
  canvasHeight: number
): number => {
  const baseScore = 10;
  const multiplier = getComboMultiplier(combo);
  const bonus = getFastAnswerBonus(raindrop, canvasHeight);
  
  return Math.floor(baseScore * multiplier) + bonus;
};

// 레벨업 조건 확인 (10개 정답마다 레벨업)
export const shouldLevelUp = (totalCorrect: number, currentLevel: number): boolean => {
  return totalCorrect >= currentLevel * 10;
};

