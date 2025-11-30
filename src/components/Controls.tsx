import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import type { Direction } from '../types';
import styles from './Controls.module.css';

interface ControlsProps {
  onDirectionClick: (direction: Direction) => void;
  disabled?: boolean;
  isWrong?: boolean; // To trigger the shake animation/red color
}

export const Controls = ({ onDirectionClick, disabled, isWrong }: ControlsProps) => {
  const handleInteraction = (direction: Direction) => {
    if (!disabled) {
      onDirectionClick(direction);
    }
  };

  // Common button class
  const getButtonClass = (extraClass: string) => clsx(
    styles.button,
    extraClass,
    { [styles.buttonError]: isWrong }
  );

  return (
    <div className={styles.container}>
      <button
        className={getButtonClass(styles.up)}
        onClick={() => handleInteraction('UP')}
        disabled={disabled}
        aria-label="Up"
      >
        <ArrowUp size={32} />
      </button>
      
      <button
        className={getButtonClass(styles.left)}
        onClick={() => handleInteraction('LEFT')}
        disabled={disabled}
        aria-label="Left"
      >
        <ArrowLeft size={32} />
      </button>
      
      <button
        className={getButtonClass(styles.right)}
        onClick={() => handleInteraction('RIGHT')}
        disabled={disabled}
        aria-label="Right"
      >
        <ArrowRight size={32} />
      </button>
      
      <button
        className={getButtonClass(styles.down)}
        onClick={() => handleInteraction('DOWN')}
        disabled={disabled}
        aria-label="Down"
      >
        <ArrowDown size={32} />
      </button>
    </div>
  );
};
