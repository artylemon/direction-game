export const Direction = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
} as const;

export type Direction = typeof Direction[keyof typeof Direction];

export const GameMode = {
  WORD: 'WORD',
  ARROW: 'ARROW',
  HIGHLIGHT: 'HIGHLIGHT'
} as const;

export type GameMode = typeof GameMode[keyof typeof GameMode];

export const GameState = {
  IDLE: 'IDLE',
  PLAYING: 'PLAYING',
  GAME_OVER: 'GAME_OVER'
} as const;

export type GameState = typeof GameState[keyof typeof GameState];

export const InputType = {
  ARROWS: 'ARROWS',
  TEXT: 'TEXT'
} as const;

export type InputType = typeof InputType[keyof typeof InputType];

export interface GameSettings {
  useCardinalDirections: boolean; // North, South, East, West
  soundEnabled: boolean;
}

export interface Score {
  mode: GameMode;
  points: number;
  date: string;
}
