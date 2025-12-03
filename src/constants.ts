import { Direction } from './types';

export const DIRECTIONS: Direction[] = [
  Direction.UP,
  Direction.DOWN,
  Direction.LEFT,
  Direction.RIGHT,
];

export const DIRECTION_LABELS = {
  standard: {
    [Direction.UP]: 'UP',
    [Direction.DOWN]: 'DOWN',
    [Direction.LEFT]: 'LEFT',
    [Direction.RIGHT]: 'RIGHT',
  },
  cardinal: {
    [Direction.UP]: 'NORTH',
    [Direction.DOWN]: 'SOUTH',
    [Direction.LEFT]: 'WEST',
    [Direction.RIGHT]: 'EAST',
  },
} as const;

export const GAME_CONFIG = {
  BASE_POINTS: 10,
  PENALTY_TIME_SECONDS: 1,
  SUCCESS_ANIMATION_DURATION_MS: 150,
  TIMER_INTERVAL_MS: 1000,
  TIME_OPTIONS: [15, 30, 60],
  SPEED_BONUS: {
    FAST: { threshold: 1.0, points: 5 },
    MEDIUM: { threshold: 2.0, points: 3 },
    SLOW: { threshold: 3.0, points: 1 },
  },
};

export const THEME = {
  COLORS: {
    SUCCESS: '#22c55e', // green-500
    SUCCESS_BORDER: '#16a34a', // green-600
    ERROR: '#ef4444', // red-500
    ERROR_BORDER: '#dc2626', // red-600
    NEUTRAL: '#ffffff', // white
    NEUTRAL_BORDER: '#e5e7eb', // gray-200
    TEXT_LIGHT: '#ffffff',
    TEXT_DARK: '#1f2937', // gray-800
    HIGHLIGHT: 'rgba(250, 204, 21, 0.8)', // yellow-400 with opacity
  },
  ICON_SIZE: 140,
};
