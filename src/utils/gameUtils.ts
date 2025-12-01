import { Direction } from '../types';

export const DIRECTIONS: Direction[] = [Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT];

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
  if (!useCardinal) return direction;
  
  switch (direction) {
    case Direction.UP: return 'NORTH';
    case Direction.DOWN: return 'SOUTH';
    case Direction.LEFT: return 'WEST';
    case Direction.RIGHT: return 'EAST';
  }
};
