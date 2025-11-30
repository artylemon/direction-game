import { useState, useEffect, useCallback, useRef } from 'react';
import type { Direction, GameMode } from '../types';
import { getRandomDirection } from '../utils/gameUtils';

const BASE_POINTS = 10;
const PENALTY_TIME = 1; // Seconds to stun the player

export const useGameLogic = (_mode: GameMode, initialTime: number = 60) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [targetDirection, setTargetDirection] = useState<Direction>('UP');
  const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'GAME_OVER'>('IDLE');
  const [isWrong, setIsWrong] = useState(false);
  
  // Ref to track when the current question appeared for speed bonus
  const questionStartTime = useRef<number>(0);

  // Timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (gameState === 'PLAYING' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
            if (prev <= 1) {
                setGameState('GAME_OVER');
                return 0;
            }
            return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState, timeLeft]);

  const generateNewQuestion = useCallback(() => {
    setTargetDirection(getRandomDirection());
    questionStartTime.current = Date.now();
  }, []);

  const startGame = useCallback(() => {
    setScore(0);
    setTimeLeft(initialTime);
    setGameState('PLAYING');
    setIsWrong(false);
    generateNewQuestion();
  }, [generateNewQuestion, initialTime]);

  const handleAnswer = useCallback((selectedDirection: Direction) => {
    if (gameState !== 'PLAYING' || isWrong) return;

    if (selectedDirection === targetDirection) {
      // Correct
      const timeTaken = (Date.now() - questionStartTime.current) / 1000; // seconds
      // Bonus: +5 if under 1s, +3 if under 2s, +1 if under 3s
      let speedBonus = 0;
      if (timeTaken < 1.0) speedBonus = 5;
      else if (timeTaken < 2.0) speedBonus = 3;
      else if (timeTaken < 3.0) speedBonus = 1;

      setScore((prev) => prev + BASE_POINTS + speedBonus);
      generateNewQuestion();
    } else {
      // Wrong
      setIsWrong(true);
      setTimeout(() => {
        setIsWrong(false);
      }, PENALTY_TIME * 1000);
    }
  }, [gameState, targetDirection, generateNewQuestion, isWrong]);

  return {
    score,
    timeLeft,
    targetDirection,
    gameState,
    isWrong,
    startGame,
    handleAnswer
  };
};
