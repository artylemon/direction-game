import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import { Direction, InputType } from '../types';
import { useSettings } from '../context/SettingsContext';
import { getDirectionLabel } from '../utils/gameUtils';

interface ControlsProps {
  onDirectionClick: (direction: Direction) => void;
  disabled?: boolean;
  isWrong?: boolean; // To trigger the shake animation/red color
  isCorrect?: boolean; // To trigger the pop animation/green color
  inputType?: InputType;
  buttonOrder?: Direction[]; // For TEXT mode
}

export const Controls = ({ 
  onDirectionClick, 
  disabled, 
  isWrong, 
  isCorrect,
  inputType = InputType.ARROWS,
  buttonOrder = [Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT]
}: ControlsProps) => {
  const { useCardinalDirections } = useSettings();

  const handleInteraction = (direction: Direction) => {
    if (!disabled) {
      onDirectionClick(direction);
    }
  };

  const baseButtonClass = "flex items-center justify-center rounded-lg border-none cursor-pointer transition-all duration-100 shadow-md active:scale-95 active:shadow-inner disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-70";
  
  const getButtonClass = (extraClass?: string) => clsx(
    baseButtonClass,
    extraClass,
    isWrong ? "bg-red-500 animate-shake" : isCorrect ? "bg-green-500 animate-pop" : "bg-blue-500 text-white",
    inputType === InputType.TEXT ? "aspect-[2/1] font-extrabold text-xl tracking-wider" : "aspect-square"
  );

  if (inputType === InputType.TEXT) {
    return (
      <div className="grid grid-cols-2 gap-4 max-w-[500px] mx-auto my-8 w-full">
        {buttonOrder.map((dir) => (
          <button
            key={dir}
            className={getButtonClass()}
            onClick={() => handleInteraction(dir)}
            disabled={disabled}
          >
            {getDirectionLabel(dir, useCardinalDirections)}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-4 max-w-[360px] w-full mx-auto my-8">
      <button
        className={getButtonClass("col-start-2 row-start-1")}
        onClick={() => handleInteraction(Direction.UP)}
        disabled={disabled}
        aria-label="Up"
      >
        <ArrowUp size={48} />
      </button>
      
      <button
        className={getButtonClass("col-start-1 row-start-2")}
        onClick={() => handleInteraction(Direction.LEFT)}
        disabled={disabled}
        aria-label="Left"
      >
        <ArrowLeft size={48} />
      </button>
      
      <button
        className={getButtonClass("col-start-3 row-start-2")}
        onClick={() => handleInteraction(Direction.RIGHT)}
        disabled={disabled}
        aria-label="Right"
      >
        <ArrowRight size={48} />
      </button>
      
      <button
        className={getButtonClass("col-start-2 row-start-3")}
        onClick={() => handleInteraction(Direction.DOWN)}
        disabled={disabled}
        aria-label="Down"
      >
        <ArrowDown size={48} />
      </button>
    </div>
  );
};
