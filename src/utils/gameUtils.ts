import { Direction } from '../types';
import { DIRECTIONS, DIRECTION_LABELS } from '../constants';

export { DIRECTIONS };

export const getRandomDirection = (): Direction => {
  const randomIndex = Math.floor(Math.random() * DIRECTIONS.length);
  return DIRECTIONS[randomIndex];
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const getDirectionLabel = (direction: Direction, useCardinal: boolean): string => {
  return useCardinal ? DIRECTION_LABELS.cardinal[direction] : DIRECTION_LABELS.standard[direction];
};
