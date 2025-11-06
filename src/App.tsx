import { useState } from 'react';
import { GameMode } from './types';
import MainMenu from './components/MainMenu';
import Game from './components/Game';
import Stats from './components/Stats';
import Settings from './components/Settings';
import './styles/App.css';

type Screen = 'menu' | 'game' | 'stats' | 'settings';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu');
  const [gameMode, setGameMode] = useState<GameMode>(null);
  const [selectedTable, setSelectedTable] = useState<number | undefined>(undefined);

  const handleStartGame = (mode: GameMode, table?: number) => {
    setGameMode(mode);
    setSelectedTable(table);
    setCurrentScreen('game');
  };

  const handleBackToMenu = () => {
    setCurrentScreen('menu');
    setGameMode(null);
    setSelectedTable(undefined);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'game':
        return (
          <Game
            mode={gameMode!}
            selectedTable={selectedTable}
            onBack={handleBackToMenu}
          />
        );
      case 'stats':
        return <Stats onBack={handleBackToMenu} />;
      case 'settings':
        return <Settings onBack={handleBackToMenu} />;
      default:
        return (
          <MainMenu
            onStartGame={handleStartGame}
            onShowStats={() => setCurrentScreen('stats')}
            onShowSettings={() => setCurrentScreen('settings')}
          />
        );
    }
  };

  return (
    <div className="app">
      {renderScreen()}
    </div>
  );
}

export default App;

