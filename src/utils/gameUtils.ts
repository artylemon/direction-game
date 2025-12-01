import type { Direction } from '../types';

export const DIRECTIONS: Direction[] = ['UP', 'DOWN', 'LEFT', 'RIGHT'];

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
    case 'UP': return 'NORTH';
    case 'DOWN': return 'SOUTH';
    case 'LEFT': return 'WEST';
    case 'RIGHT': return 'EAST';
  }
};
