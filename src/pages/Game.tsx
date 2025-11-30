import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Controls } from '../components/Controls';
import { ScoreBoard } from '../components/ScoreBoard';
import { useGameLogic } from '../hooks/useGameLogic';

export const Game = () => {
  const location = useLocation();
  const initialTime = location.state?.initialTime || 60;

  const { 
    score, 
    timeLeft, 
    targetDirection, 
    gameState, 
    isWrong, 
    startGame, 
    handleAnswer 
  } = useGameLogic('WORD', initialTime);

  // Auto-start game when entering the page (optional, or we can have a start button)
  useEffect(() => {
    startGame();
  }, [startGame]);

  return (
    <div className="p-4 flex flex-col items-center max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Word Mode</h1>
      
      {gameState === 'PLAYING' && (
        <>
          <ScoreBoard score={score} timeLeft={timeLeft} />
          
          <div className="my-12 flex flex-col items-center justify-center h-32">
            <span className="text-6xl font-black uppercase tracking-wider">
              {targetDirection}
            </span>
          </div>

          <Controls 
            onDirectionClick={handleAnswer} 
            disabled={false}
            isWrong={isWrong}
          />
        </>
      )}

      {gameState === 'GAME_OVER' && (
        <div className="text-center my-8">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Game Over!</h2>
          <p className="text-xl mb-6">Final Score: {score}</p>
          <button 
            onClick={startGame}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-600 transition-colors"
          >
            Play Again
          </button>
        </div>
      )}

      <Link to="/" className="text-gray-500 hover:underline mt-12 block text-sm">
        Back to Menu
      </Link>
    </div>
  );
};
