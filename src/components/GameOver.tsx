interface GameOverProps {
  score: number;
  level: number;
  combo: number;
  correct: number;
  wrong: number;
  onRestart: () => void;
  onMenu: () => void;
}

function GameOver({ score, level, combo, correct, wrong, onRestart, onMenu }: GameOverProps) {
  const accuracy = correct + wrong > 0 ? (correct / (correct + wrong)) * 100 : 0;

  return (
    <div className="game-over-screen">
      <div className="game-over-container">
        <h1>게임 종료!</h1>

        <div className="final-stats">
          <div className="final-stat highlight">
            <div className="stat-label">최종 점수</div>
            <div className="stat-value large">{score}</div>
          </div>

          <div className="stats-row">
            <div className="final-stat">
              <div className="stat-label">레벨</div>
              <div className="stat-value">{level}</div>
            </div>

            <div className="final-stat">
              <div className="stat-label">최고 콤보</div>
              <div className="stat-value">{combo}</div>
            </div>
          </div>

          <div className="stats-row">
            <div className="final-stat">
              <div className="stat-label">정답</div>
              <div className="stat-value correct">{correct}</div>
            </div>

            <div className="final-stat">
              <div className="stat-label">오답</div>
              <div className="stat-value wrong">{wrong}</div>
            </div>

            <div className="final-stat">
              <div className="stat-label">정확도</div>
              <div className="stat-value">{accuracy.toFixed(1)}%</div>
            </div>
          </div>
        </div>

        <div className="game-over-buttons">
          <button className="restart-button" onClick={onRestart}>
            🔄 다시 하기
          </button>
          <button className="menu-button" onClick={onMenu}>
            🏠 메인 메뉴
          </button>
        </div>

        <div className="encouragement">
          {accuracy >= 90 && '🎉 완벽해요! 천재인가요?'}
          {accuracy >= 70 && accuracy < 90 && '👍 잘했어요! 조금만 더 노력하면 완벽해질 거예요!'}
          {accuracy >= 50 && accuracy < 70 && '💪 좋아요! 계속 연습하면 더 잘할 수 있어요!'}
          {accuracy < 50 && '😊 괜찮아요! 다시 도전해봐요!'}
        </div>
      </div>
    </div>
  );
}

export default GameOver;

