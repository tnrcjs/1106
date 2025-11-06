import { useState, useEffect } from 'react';
import { getSettings, saveSettings, resetStats } from '../utils/storage';
import { soundManager } from '../utils/sounds';

interface SettingsProps {
  onBack: () => void;
}

function Settings({ onBack }: SettingsProps) {
  const [settings, setSettings] = useState(getSettings());
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  useEffect(() => {
    soundManager.setEnabled(settings.soundEnabled);
  }, [settings.soundEnabled]);

  const handleToggleSound = () => {
    const newSettings = { ...settings, soundEnabled: !settings.soundEnabled };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const handleToggleMusic = () => {
    const newSettings = { ...settings, musicEnabled: !settings.musicEnabled };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const handleDifficultyChange = (difficulty: 'easy' | 'normal' | 'hard') => {
    const newSettings = { ...settings, difficulty };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const handleResetStats = () => {
    resetStats();
    setShowConfirmReset(false);
    alert('기록이 초기화되었습니다.');
  };

  return (
    <div className="settings-screen">
      <div className="settings-container">
        <h1>⚙️ 설정</h1>

        <div className="settings-section">
          <h2>사운드</h2>
          <div className="setting-item">
            <label>
              효과음
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={handleToggleSound}
              />
            </label>
          </div>
          <div className="setting-item">
            <label>
              배경음악
              <input
                type="checkbox"
                checked={settings.musicEnabled}
                onChange={handleToggleMusic}
              />
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h2>난이도</h2>
          <div className="difficulty-buttons">
            <button
              className={`difficulty-button ${settings.difficulty === 'easy' ? 'active' : ''}`}
              onClick={() => handleDifficultyChange('easy')}
            >
              쉬움
            </button>
            <button
              className={`difficulty-button ${settings.difficulty === 'normal' ? 'active' : ''}`}
              onClick={() => handleDifficultyChange('normal')}
            >
              보통
            </button>
            <button
              className={`difficulty-button ${settings.difficulty === 'hard' ? 'active' : ''}`}
              onClick={() => handleDifficultyChange('hard')}
            >
              어려움
            </button>
          </div>
        </div>

        <div className="settings-section danger-zone">
          <h2>데이터 관리</h2>
          {!showConfirmReset ? (
            <button
              className="reset-button"
              onClick={() => setShowConfirmReset(true)}
            >
              기록 초기화
            </button>
          ) : (
            <div className="confirm-reset">
              <p>정말로 모든 기록을 초기화하시겠습니까?</p>
              <button className="confirm-yes" onClick={handleResetStats}>
                예, 초기화합니다
              </button>
              <button
                className="confirm-no"
                onClick={() => setShowConfirmReset(false)}
              >
                취소
              </button>
            </div>
          )}
        </div>

        <button className="back-button" onClick={onBack}>
          ← 메인 메뉴로
        </button>
      </div>
    </div>
  );
}

export default Settings;

