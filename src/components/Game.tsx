import { useState, useEffect, useRef, useCallback } from 'react';
import { GameMode, Raindrop } from '../types';
import {
  createRaindrop,
  getMaxRaindrops,
  calculateScore,
  shouldLevelUp,
} from '../utils/gameLogic';
import { updateStats } from '../utils/storage';
import { soundManager } from '../utils/sounds';
import RaindropComponent from './Raindrop';
import GameOver from './GameOver';

interface GameProps {
  mode: GameMode;
  selectedTable?: number;
  onBack: () => void;
}

function Game({ mode, selectedTable, onBack }: GameProps) {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(mode === 'practice' ? 999 : 3);
  const [combo, setCombo] = useState(0);
  const [raindrops, setRaindrops] = useState<Raindrop[]>([]);
  const [input, setInput] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(mode === 'timed' ? 120 : null);
  const [shake, setShake] = useState(false);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalWrong, setTotalWrong] = useState(0);
  const [tableResults, setTableResults] = useState<{
    [key: number]: { correct: number; total: number };
  }>({});

  const gameAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const animationFrameRef = useRef<number>();
  const lastSpawnTimeRef = useRef<number>(0);
  const bestComboRef = useRef(0);

  const CANVAS_HEIGHT = 600;
  const CANVAS_WIDTH = 800;

  // 게임 오버 처리
  const handleGameOver = useCallback(() => {
    setIsGameOver(true);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    // 통계 저장
    updateStats(score, totalCorrect, totalWrong, bestComboRef.current, tableResults);
    soundManager.play('gameOver');
  }, [score, totalCorrect, totalWrong, tableResults]);

  // 빗방울 생성
  const spawnRaindrop = useCallback(() => {
    const maxRaindrops = getMaxRaindrops(level);
    if (raindrops.length < maxRaindrops) {
      const newRaindrop = createRaindrop(level, CANVAS_WIDTH, selectedTable);
      setRaindrops((prev) => [...prev, newRaindrop]);
    }
  }, [level, raindrops.length, selectedTable]);

  // 정답 체크
  const checkAnswer = useCallback(() => {
    const answer = parseInt(input);
    if (isNaN(answer)) return;

    const matchingRaindrop = raindrops.find((drop) => drop.answer === answer);

    if (matchingRaindrop) {
      // 정답!
      const points = calculateScore(combo, matchingRaindrop, CANVAS_HEIGHT);
      setScore((prev) => prev + points);
      setCombo((prev) => prev + 1);
      setTotalCorrect((prev) => prev + 1);

      // 단별 통계 업데이트
      setTableResults((prev) => {
        const table = matchingRaindrop.num1;
        const current = prev[table] || { correct: 0, total: 0 };
        return {
          ...prev,
          [table]: { correct: current.correct + 1, total: current.total + 1 },
        };
      });

      // 빗방울 제거
      setRaindrops((prev) => prev.filter((drop) => drop.id !== matchingRaindrop.id));

      soundManager.play(combo >= 5 ? 'combo' : 'correct');

      // 레벨업 체크
      if (shouldLevelUp(totalCorrect + 1, level)) {
        setLevel((prev) => prev + 1);
        soundManager.play('levelUp');
      }

      // 최고 콤보 업데이트
      if (combo + 1 > bestComboRef.current) {
        bestComboRef.current = combo + 1;
      }
    } else {
      // 오답
      setCombo(0);
      setTotalWrong((prev) => prev + 1);
      soundManager.play('wrong');
      
      // 화면 흔들기
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }

    setInput('');
  }, [input, raindrops, combo, level, totalCorrect]);

  // 빗방울 업데이트 및 바닥 충돌 체크
  const updateRaindrops = useCallback(() => {
    setRaindrops((prev) => {
      const updated = prev.map((drop) => ({
        ...drop,
        y: drop.y + drop.speed,
      }));

      // 바닥에 닿은 빗방울 체크
      const { passed, remaining } = updated.reduce(
        (acc, drop) => {
          if (drop.y > CANVAS_HEIGHT) {
            acc.passed.push(drop);
          } else {
            acc.remaining.push(drop);
          }
          return acc;
        },
        { passed: [] as Raindrop[], remaining: [] as Raindrop[] }
      );

      // 생명 감소
      if (passed.length > 0 && mode !== 'practice') {
        setLives((prev) => {
          const newLives = prev - passed.length;
          if (newLives <= 0) {
            handleGameOver();
          }
          return Math.max(0, newLives);
        });
        setCombo(0);

        // 단별 통계 업데이트 (오답)
        passed.forEach((drop) => {
          setTableResults((prev) => {
            const table = drop.num1;
            const current = prev[table] || { correct: 0, total: 0 };
            return {
              ...prev,
              [table]: { correct: current.correct, total: current.total + 1 },
            };
          });
        });
      }

      return remaining;
    });
  }, [mode, handleGameOver]);

  // 게임 루프
  const gameLoop = useCallback(
    (timestamp: number) => {
      if (isPaused || isGameOver) return;

      // 빗방울 업데이트
      updateRaindrops();

      // 빗방울 생성 (레벨에 따라 간격 조정)
      const spawnInterval = Math.max(2000 - level * 100, 800);
      if (timestamp - lastSpawnTimeRef.current > spawnInterval) {
        spawnRaindrop();
        lastSpawnTimeRef.current = timestamp;
      }

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    },
    [isPaused, isGameOver, level, spawnRaindrop, updateRaindrops]
  );

  // 게임 시작
  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameLoop]);

  // 시간 제한 모드 타이머
  useEffect(() => {
    if (mode === 'timed' && timeLeft !== null && !isPaused && !isGameOver) {
      if (timeLeft <= 0) {
        handleGameOver();
        return;
      }

      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [mode, timeLeft, isPaused, isGameOver, handleGameOver]);

  // 입력 포커스 유지
  useEffect(() => {
    if (!isGameOver && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isGameOver]);

  // 키보드 이벤트
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  if (isGameOver) {
    return (
      <GameOver
        score={score}
        level={level}
        combo={bestComboRef.current}
        correct={totalCorrect}
        wrong={totalWrong}
        onRestart={() => window.location.reload()}
        onMenu={onBack}
      />
    );
  }

  return (
    <div className="game-screen">
      {/* 상단 UI */}
      <div className="game-header">
        <div className="game-info">
          {mode !== 'practice' && (
            <div className="lives">
              {Array.from({ length: lives }).map((_, i) => (
                <span key={i}>❤️</span>
              ))}
            </div>
          )}
          <div className="level">Level {level}</div>
          <div className="score">점수: {score}</div>
          {combo > 0 && <div className="combo">콤보: {combo}🔥</div>}
          {timeLeft !== null && (
            <div className="timer">⏱️ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</div>
          )}
        </div>
        <div className="game-controls">
          <button onClick={() => setIsPaused(!isPaused)}>
            {isPaused ? '▶️ 계속' : '⏸️ 일시정지'}
          </button>
          <button onClick={onBack}>🏠 메뉴</button>
        </div>
      </div>

      {/* 게임 영역 */}
      <div
        ref={gameAreaRef}
        className={`game-area ${shake ? 'shake' : ''}`}
        style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
      >
        {isPaused && (
          <div className="pause-overlay">
            <h2>일시정지</h2>
            <p>계속하려면 계속 버튼을 누르세요</p>
          </div>
        )}

        {raindrops.map((raindrop) => (
          <RaindropComponent key={raindrop.id} raindrop={raindrop} />
        ))}

        {/* 캐릭터 */}
        <div className="character">🧑‍🎓</div>
      </div>

      {/* 입력 영역 */}
      <div className="input-area">
        <label htmlFor="answer-input">답: </label>
        <input
          ref={inputRef}
          id="answer-input"
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="정답을 입력하세요"
          disabled={isPaused || isGameOver}
        />
        <button onClick={checkAnswer} disabled={isPaused || isGameOver}>
          확인
        </button>
      </div>

      {/* 모드 정보 */}
      {mode === 'practice' && selectedTable && (
        <div className="mode-info">
          연습 모드: {selectedTable}단
        </div>
      )}
    </div>
  );
}

export default Game;

