import type { Direction } from '../../types';
import { THEME } from '../../constants';

interface HighlightVisualsProps {
  targetDirection: Direction;
}

export const HighlightVisuals = ({ targetDirection }: HighlightVisualsProps) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {targetDirection === 'UP' && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '15vh', background: `linear-gradient(to bottom, ${THEME.COLORS.HIGHLIGHT}, transparent)` }} />
      )}
      {targetDirection === 'DOWN' && (
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '15vh', background: `linear-gradient(to top, ${THEME.COLORS.HIGHLIGHT}, transparent)` }} />
      )}
      {targetDirection === 'LEFT' && (
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '15vw', background: `linear-gradient(to right, ${THEME.COLORS.HIGHLIGHT}, transparent)` }} />
      )}
      {targetDirection === 'RIGHT' && (
        <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '15vw', background: `linear-gradient(to left, ${THEME.COLORS.HIGHLIGHT}, transparent)` }} />
      )}
    </div>
  );
};
