import { getStats } from '../utils/storage';

interface StatsProps {
  onBack: () => void;
}

function Stats({ onBack }: StatsProps) {
  const stats = getStats();

  return (
    <div className="stats-screen">
      <div className="stats-container">
        <h1>📊 내 기록</h1>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">총 게임 수</div>
            <div className="stat-value">{stats.totalGames}</div>
          </div>

          <div className="stat-card highlight">
            <div className="stat-label">최고 점수</div>
            <div className="stat-value">{stats.highScore}</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">총 정답 수</div>
            <div className="stat-value">{stats.totalCorrect}</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">정확도</div>
            <div className="stat-value">
              {stats.accuracy.toFixed(1)}%
            </div>
          </div>

          <div className="stat-card highlight">
            <div className="stat-label">최고 콤보</div>
            <div className="stat-value">{stats.bestCombo}</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">총 오답 수</div>
            <div className="stat-value">{stats.totalWrong}</div>
          </div>
        </div>

        <div className="table-accuracy">
          <h2>단별 정확도</h2>
          <div className="accuracy-grid">
            {[2, 3, 4, 5, 6, 7, 8, 9].map((table) => {
              const accuracy = stats.tableAccuracy[table] || 0;
              return (
                <div key={table} className="accuracy-item">
                  <div className="accuracy-label">{table}단</div>
                  <div className="accuracy-bar">
                    <div
                      className="accuracy-fill"
                      style={{ width: `${accuracy}%` }}
                    />
                  </div>
                  <div className="accuracy-value">{accuracy.toFixed(0)}%</div>
                </div>
              );
            })}
          </div>
        </div>

        <button className="back-button" onClick={onBack}>
          ← 메인 메뉴로
        </button>
      </div>
    </div>
  );
}

export default Stats;

