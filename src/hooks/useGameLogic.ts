import { useState, useEffect, useCallback, useRef } from 'react';
import { Direction, type GameMode, GameState } from '../types';
import { getRandomDirection } from '../utils/gameUtils';
import { GAME_CONFIG } from '../constants';

export const useGameLogic = (_mode: GameMode) => {
  const [score, setScore] = useState(0);
  const [lastScore, setLastScore] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [targetDirection, setTargetDirection] = useState<Direction>(Direction.UP);
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);
  const [isWrong, setIsWrong] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  // Ref to track when the current question appeared for speed bonus
  const questionStartTime = useRef<number>(0);
  const scoreRef = useRef(score);
  const successTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
    };
  }, []);

  // Timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (gameState === GameState.PLAYING && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
            if (prev <= 1) {
                setLastScore(scoreRef.current);
                setGameState(GameState.IDLE);
                return 0;
            }
            return prev - 1;
        });
      }, GAME_CONFIG.TIMER_INTERVAL_MS);
    }
    return () => clearInterval(interval);
  }, [gameState, timeLeft]);

  const generateNewQuestion = useCallback(() => {
    setTargetDirection(getRandomDirection());
    questionStartTime.current = Date.now();
  }, []);

  const startGame = useCallback((duration: number) => {
    setScore(0);
    setTimeLeft(duration);
    setGameState(GameState.PLAYING);
    setIsWrong(false);
    setIsCorrect(false);
    generateNewQuestion();
  }, [generateNewQuestion]);

  const resetGame = useCallback(() => {
    setGameState(GameState.IDLE);
    setScore(0);
    setTimeLeft(0);
  }, []);

  const handleAnswer = useCallback((selectedDirection: Direction) => {
    if (gameState !== GameState.PLAYING || isWrong) return;

    if (selectedDirection === targetDirection) {
      // Correct
      const timeTaken = (Date.now() - questionStartTime.current) / 1000; // seconds
      
      // Calculate speed bonus based on response time
      const { SPEED_BONUS } = GAME_CONFIG;
      let speedBonus = 0;
      if (timeTaken < SPEED_BONUS.FAST.threshold) speedBonus = SPEED_BONUS.FAST.points;
      else if (timeTaken < SPEED_BONUS.MEDIUM.threshold) speedBonus = SPEED_BONUS.MEDIUM.points;
      else if (timeTaken < SPEED_BONUS.SLOW.threshold) speedBonus = SPEED_BONUS.SLOW.points;

      setScore((prev) => prev + GAME_CONFIG.BASE_POINTS + speedBonus);
      
      // Trigger success animation
      if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
      setIsCorrect(true);
      successTimeoutRef.current = setTimeout(() => {
        setIsCorrect(false);
        successTimeoutRef.current = null;
      }, GAME_CONFIG.SUCCESS_ANIMATION_DURATION_MS);
      
      generateNewQuestion();
    } else {
      // Wrong
      setIsWrong(true);
      setTimeout(() => {
        setIsWrong(false);
      }, GAME_CONFIG.PENALTY_TIME_SECONDS * 1000);
    }
  }, [gameState, targetDirection, generateNewQuestion, isWrong]);

  return {
    score,
    lastScore,
    timeLeft,
    targetDirection,
    gameState,
    isWrong,
    isCorrect,
    startGame,
    resetGame,
    handleAnswer
  };
};
