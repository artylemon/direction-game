import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { Controls } from '../components/Controls';
import { ScoreBoard } from '../components/ScoreBoard';
import { GameVisuals } from '../components/GameVisuals';
import { useGameLogic } from '../hooks/useGameLogic';
import { shuffleArray, DIRECTIONS } from '../utils/gameUtils';
import type { GameMode, Direction } from '../types';

const TIME_OPTIONS = [15, 30, 60];

export const Game = () => {
  const location = useLocation();
  const mode = (location.state?.mode as GameMode) || 'WORD';
  const [selectedTime, setSelectedTime] = useState(60);
  const [randomizeButtons, setRandomizeButtons] = useState(false);
  const [buttonOrder, setButtonOrder] = useState<Direction[]>(DIRECTIONS);

  const { 
    score, 
    lastScore,
    timeLeft, 
    targetDirection, 
    gameState, 
    isWrong, 
    isCorrect,
    startGame,
    handleAnswer 
  } = useGameLogic(mode);  // Shuffle buttons when target changes (new question) if randomization is on
  useEffect(() => {
    if (randomizeButtons && gameState === 'PLAYING') {
      setButtonOrder(shuffleArray(DIRECTIONS));
    } else {
      setButtonOrder(DIRECTIONS);
    }
  }, [targetDirection, randomizeButtons, gameState]);

  const handleStart = () => {
    startGame(selectedTime);
  };

  const inputType = mode === 'WORD' ? 'ARROWS' : 'TEXT';

  return (
    <div className="p-4 flex flex-col items-center max-w-md mx-auto min-h-screen">
      <div className="w-full flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold text-gray-700">{mode} MODE</h1>
      </div>

      {gameState === 'IDLE' && (
        <div className="flex-1 flex flex-col justify-center items-center w-full">
            <div className="text-center mb-12">
                {lastScore !== null && (
                  <div className="mb-8 animate-fade-in">
                    <p className="text-gray-500 text-lg">Last Score</p>
                    <p className="text-4xl font-bold text-blue-600">{lastScore}</p>
                  </div>
                )}

                <p className="text-gray-500 text-lg mb-4">Select Time</p>
                <div className="flex justify-center gap-2 mb-8">
                    {TIME_OPTIONS.map(t => (
                        <button
                            key={t}
                            onClick={() => setSelectedTime(t)}
                            className={clsx(
                                "px-4 py-2 rounded-lg text-lg font-bold transition-colors border-2",
                                selectedTime === t 
                                    ? "bg-blue-500 text-white border-blue-600" 
                                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
                            )}
                        >
                            {t}s
                        </button>
                    ))}
                </div>
                
                <p className="text-gray-500 text-lg mb-8">Ready to start?</p>
                
                {mode !== 'WORD' && (
                  <div className="mb-8 flex items-center justify-center gap-2">
                    <input 
                      type="checkbox" 
                      id="randomize"
                      checked={randomizeButtons}
                      onChange={(e) => setRandomizeButtons(e.target.checked)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="randomize" className="text-gray-700 font-medium">
                      Randomize Button Order
                    </label>
                  </div>
                )}

                <button
                    onClick={handleStart}
                    className="bg-green-500 text-white text-2xl font-bold px-12 py-6 rounded-2xl shadow-lg hover:bg-green-600 transform transition-all active:scale-95"
                >
                    START
                </button>
            </div>
        </div>
      )}
      
      {gameState === 'PLAYING' && (
        <>
          <ScoreBoard score={score} timeLeft={timeLeft} />
          
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="mb-12 flex items-center justify-center h-48 w-full">
                <GameVisuals 
                  mode={mode} 
                  targetDirection={targetDirection} 
                  isWrong={isWrong}
                  isCorrect={isCorrect}
                />
            </div>

            <Controls 
                onDirectionClick={handleAnswer} 
                disabled={false}
                isWrong={mode === 'HIGHLIGHT' ? isWrong : false}
                isCorrect={mode === 'HIGHLIGHT' ? isCorrect : false}
                inputType={inputType}
                buttonOrder={buttonOrder}
            />
          </div>
        </>
      )}

      {gameState === 'GAME_OVER' && null}

      <Link to="/" className="text-gray-400 hover:text-gray-600 mt-auto py-4 text-sm font-medium">
        Back to Menu
      </Link>
    </div>
  );
};
