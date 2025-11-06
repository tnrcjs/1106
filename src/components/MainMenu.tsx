import { useState } from 'react';
import { GameMode } from '../types';

interface MainMenuProps {
  onStartGame: (mode: GameMode, table?: number) => void;
  onShowStats: () => void;
  onShowSettings: () => void;
}

function MainMenu({ onStartGame, onShowStats, onShowSettings }: MainMenuProps) {
  const [showModeSelect, setShowModeSelect] = useState(false);
  const [showTableSelect, setShowTableSelect] = useState(false);

  const handlePracticeMode = (table: number) => {
    onStartGame('practice', table);
  };

  return (
    <div className="main-menu">
      <div className="menu-container">
        <h1 className="game-title">
          💧 구구단 산성비 게임 💧
        </h1>
        <p className="game-subtitle">Multiplication Rain</p>

        {!showModeSelect && !showTableSelect && (
          <div className="menu-buttons">
            <button
              className="menu-button primary"
              onClick={() => setShowModeSelect(true)}
            >
              🎮 게임 시작
            </button>
            <button
              className="menu-button"
              onClick={onShowStats}
            >
              📊 내 기록
            </button>
            <button
              className="menu-button"
              onClick={onShowSettings}
            >
              ⚙️ 설정
            </button>
          </div>
        )}

        {showModeSelect && !showTableSelect && (
          <div className="mode-select">
            <h2>모드 선택</h2>
            <div className="mode-buttons">
              <button
                className="mode-button"
                onClick={() => setShowTableSelect(true)}
              >
                <div className="mode-icon">📚</div>
                <div className="mode-title">연습 모드</div>
                <div className="mode-description">
                  특정 단을 집중 연습
                </div>
              </button>

              <button
                className="mode-button"
                onClick={() => onStartGame('challenge')}
              >
                <div className="mode-icon">🏆</div>
                <div className="mode-title">도전 모드</div>
                <div className="mode-description">
                  전체 구구단 실전 연습
                </div>
              </button>

              <button
                className="mode-button"
                onClick={() => onStartGame('timed')}
              >
                <div className="mode-icon">⏱️</div>
                <div className="mode-title">시간 제한</div>
                <div className="mode-description">
                  2분간 최대한 많이!
                </div>
              </button>
            </div>
            <button
              className="back-button"
              onClick={() => setShowModeSelect(false)}
            >
              ← 뒤로
            </button>
          </div>
        )}

        {showTableSelect && (
          <div className="table-select">
            <h2>구구단 선택</h2>
            <div className="table-buttons">
              {[2, 3, 4, 5, 6, 7, 8, 9].map((table) => (
                <button
                  key={table}
                  className="table-button"
                  onClick={() => handlePracticeMode(table)}
                >
                  {table}단
                </button>
              ))}
            </div>
            <button
              className="back-button"
              onClick={() => setShowTableSelect(false)}
            >
              ← 뒤로
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainMenu;

