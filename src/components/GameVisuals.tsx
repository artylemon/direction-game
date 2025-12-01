import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import type { Direction, GameMode } from '../types';
import { useSettings } from '../context/SettingsContext';
import { getDirectionLabel } from '../utils/gameUtils';

interface GameVisualsProps {
  mode: GameMode;
  targetDirection: Direction;
  isWrong?: boolean;
  isCorrect?: boolean;
}

export const GameVisuals = ({ mode, targetDirection, isWrong, isCorrect }: GameVisualsProps) => {
  const { useCardinalDirections } = useSettings();

  // Highlight Mode (Special case)
  if (mode === 'HIGHLIGHT') {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {targetDirection === 'UP' && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '15vh', background: 'linear-gradient(to bottom, rgba(250, 204, 21, 0.8), transparent)' }} />
        )}
        {targetDirection === 'DOWN' && (
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '15vh', background: 'linear-gradient(to top, rgba(250, 204, 21, 0.8), transparent)' }} />
        )}
        {targetDirection === 'LEFT' && (
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '15vw', background: 'linear-gradient(to right, rgba(250, 204, 21, 0.8), transparent)' }} />
        )}
        {targetDirection === 'RIGHT' && (
          <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '15vw', background: 'linear-gradient(to left, rgba(250, 204, 21, 0.8), transparent)' }} />
        )}
      </div>
    );
  }

  // Common Card Logic for WORD and ARROW modes
  const iconSize = 140;
  const getIcon = () => {
    switch (targetDirection) {
      case 'UP': return <ArrowUp size={iconSize} />;
      case 'DOWN': return <ArrowDown size={iconSize} />;
      case 'LEFT': return <ArrowLeft size={iconSize} />;
      case 'RIGHT': return <ArrowRight size={iconSize} />;
    }
  };

  const content = mode === 'WORD' 
    ? <span className="text-8xl font-black uppercase tracking-wider">{getDirectionLabel(targetDirection, useCardinalDirections)}</span>
    : getIcon();

  // Explicit styles for colors to ensure they apply correctly
  const cardStyle = {
    backgroundColor: isWrong ? '#ef4444' : isCorrect ? '#22c55e' : '#ffffff', // red-500, green-500, white
    borderColor: isWrong ? '#dc2626' : isCorrect ? '#16a34a' : '#e5e7eb',     // red-600, green-600, gray-200
    color: (isWrong || isCorrect) ? '#ffffff' : '#1f2937',                     // white, gray-800
  };

  return (
    <div 
      className={clsx(
        "p-12 rounded-3xl border-4 flex items-center justify-center min-w-[300px] min-h-[200px] shadow-lg transition-all duration-150",
        isWrong && "animate-shake shadow-xl",
        isCorrect && "scale-110 shadow-xl"
      )}
      style={cardStyle}
    >
      {content}
    </div>
  );
};
