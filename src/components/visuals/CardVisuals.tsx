import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import { Direction, GameMode } from '../../types';
import { useSettings } from '../../context/SettingsContext';
import { getDirectionLabel } from '../../utils/gameUtils';
import { THEME } from '../../constants';

interface CardVisualsProps {
  mode: GameMode;
  targetDirection: Direction;
  isWrong?: boolean;
  isCorrect?: boolean;
}

export const CardVisuals = ({ mode, targetDirection, isWrong, isCorrect }: CardVisualsProps) => {
  const { useCardinalDirections } = useSettings();

  const iconSize = THEME.ICON_SIZE;
  const getIcon = () => {
    switch (targetDirection) {
      case Direction.UP: return <ArrowUp size={iconSize} />;
      case Direction.DOWN: return <ArrowDown size={iconSize} />;
      case Direction.LEFT: return <ArrowLeft size={iconSize} />;
      case Direction.RIGHT: return <ArrowRight size={iconSize} />;
    }
  };

  const content = mode === GameMode.WORD 
    ? <span className="text-4xl font-black uppercase tracking-wider">{getDirectionLabel(targetDirection, useCardinalDirections)}</span>
    : getIcon();

  // Explicit styles for colors to ensure they apply correctly
  const cardStyle = {
    backgroundColor: isWrong ? THEME.COLORS.ERROR : isCorrect ? THEME.COLORS.SUCCESS : THEME.COLORS.NEUTRAL,
    borderColor: isWrong ? THEME.COLORS.ERROR_BORDER : isCorrect ? THEME.COLORS.SUCCESS_BORDER : THEME.COLORS.NEUTRAL_BORDER,
    color: (isWrong || isCorrect) ? THEME.COLORS.TEXT_LIGHT : THEME.COLORS.TEXT_DARK,
  };

  return (
    <div 
      className={clsx(
        "rounded-3xl border-4 flex items-center justify-center w-[360px] h-[180px] shadow-lg transition-all duration-150",
        isWrong && "animate-shake shadow-xl",
        isCorrect && "scale-110 shadow-xl"
      )}
      style={cardStyle}
    >
      {content}
    </div>
  );
};
