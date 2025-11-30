import type { Direction } from '../types';

export const DIRECTIONS: Direction[] = ['UP', 'DOWN', 'LEFT', 'RIGHT'];

export const getRandomDirection = (): Direction => {
  const randomIndex = Math.floor(Math.random() * DIRECTIONS.length);
  return DIRECTIONS[randomIndex];
};
