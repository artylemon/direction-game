import type { Direction, GameMode } from '../types';
import { HighlightVisuals } from './visuals/HighlightVisuals';
import { CardVisuals } from './visuals/CardVisuals';

interface GameVisualsProps {
  mode: GameMode;
  targetDirection: Direction;
  isWrong?: boolean;
  isCorrect?: boolean;
}

export const GameVisuals = ({ mode, targetDirection, isWrong, isCorrect }: GameVisualsProps) => {
  if (mode === 'HIGHLIGHT') {
    return <HighlightVisuals targetDirection={targetDirection} />;
  }

  return (
    <CardVisuals 
      mode={mode} 
      targetDirection={targetDirection} 
      isWrong={isWrong} 
      isCorrect={isCorrect} 
    />
  );
};
