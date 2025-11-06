import { GameStats, GameSettings } from '../types';

const STATS_KEY = 'multiplicationRain_stats';
const SETTINGS_KEY = 'multiplicationRain_settings';

// 기본 통계
const defaultStats: GameStats = {
  totalGames: 0,
  highScore: 0,
  totalCorrect: 0,
  totalWrong: 0,
  accuracy: 0,
  tableAccuracy: {},
  bestCombo: 0,
};

// 기본 설정
const defaultSettings: GameSettings = {
  soundEnabled: true,
  musicEnabled: true,
  difficulty: 'normal',
};

// 통계 가져오기
export const getStats = (): GameStats => {
  try {
    const data = localStorage.getItem(STATS_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Failed to load stats:', error);
  }
  return defaultStats;
};

// 통계 저장
export const saveStats = (stats: GameStats): void => {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error('Failed to save stats:', error);
  }
};

// 게임 결과 업데이트
export const updateStats = (
  score: number,
  correct: number,
  wrong: number,
  combo: number,
  tableResults: { [key: number]: { correct: number; total: number } }
): void => {
  const stats = getStats();
  
  stats.totalGames += 1;
  stats.highScore = Math.max(stats.highScore, score);
  stats.totalCorrect += correct;
  stats.totalWrong += wrong;
  stats.accuracy = stats.totalCorrect / (stats.totalCorrect + stats.totalWrong) * 100;
  stats.bestCombo = Math.max(stats.bestCombo, combo);
  
  // 각 단별 정확도 업데이트
  Object.keys(tableResults).forEach((table) => {
    const tableNum = parseInt(table);
    const { correct, total } = tableResults[tableNum];
    
    if (!stats.tableAccuracy[tableNum]) {
      stats.tableAccuracy[tableNum] = 0;
    }
    
    const prevAccuracy = stats.tableAccuracy[tableNum];
    const newAccuracy = (correct / total) * 100;
    
    // 이동 평균으로 업데이트
    stats.tableAccuracy[tableNum] = (prevAccuracy * 0.7) + (newAccuracy * 0.3);
  });
  
  saveStats(stats);
};

// 설정 가져오기
export const getSettings = (): GameSettings => {
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Failed to load settings:', error);
  }
  return defaultSettings;
};

// 설정 저장
export const saveSettings = (settings: GameSettings): void => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
};

// 통계 초기화
export const resetStats = (): void => {
  saveStats(defaultStats);
};

