export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export type GameMode = 'WORD' | 'HIGHLIGHT' | 'ARROW';

export interface GameSettings {
  useCardinalDirections: boolean; // North, South, East, West
  soundEnabled: boolean;
}

export interface Score {
  mode: GameMode;
  points: number;
  date: string;
}
