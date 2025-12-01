import { useNavigate, Link } from 'react-router-dom';
import type { GameMode } from '../types';

const GAME_MODES: { id: GameMode; label: string; description: string }[] = [
  { id: 'WORD', label: 'Word Mode', description: 'Read the word, press the direction.' },
  { id: 'ARROW', label: 'Arrow Mode', description: 'Follow the arrow direction.' },
  { id: 'HIGHLIGHT', label: 'Highlight Mode', description: 'Press the highlighted area.' },
];

export const Home = () => {
  const navigate = useNavigate();

  const handleSelectMode = (mode: GameMode) => {
    navigate('/game', { state: { mode } });
  };

  return (
    <div className="p-4 flex flex-col items-center max-w-md mx-auto">
      <h1 className="text-4xl font-bold mb-2 text-blue-600">Direction Game</h1>
      
      <div className="w-full flex flex-col gap-4 mb-8">
        {GAME_MODES.map((mode) => (
          <button
            key={mode.id}
            onClick={() => handleSelectMode(mode.id)}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-left border-2 border-transparent hover:border-blue-500 group"
          >
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600">{mode.label}</h3>
            <p className="text-gray-500 mt-1">{mode.description}</p>
          </button>
        ))}
      </div>

      <nav className="flex flex-col gap-4 w-full">
        <Link 
          to="/settings" 
          className="text-center p-3 bg-gray-100 rounded-lg text-gray-700 font-medium hover:bg-gray-200 transition-colors"
        >
          Settings
        </Link>
      </nav>
    </div>
  );
};
