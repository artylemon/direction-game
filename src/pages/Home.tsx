import { useNavigate, Link } from 'react-router-dom';
import { GameMode } from '../types';

const GAME_MODES: { id: GameMode; label: string; description: string }[] = [
  { id: GameMode.WORD, label: 'Word Mode', description: 'Read the word, press the direction.' },
  { id: GameMode.ARROW, label: 'Arrow Mode', description: 'Follow the arrow direction.' },
  { id: GameMode.HIGHLIGHT, label: 'Highlight Mode', description: 'Press the highlighted area.' },
];

export const Home = () => {
  const navigate = useNavigate();

  const handleSelectMode = (mode: GameMode) => {
    navigate('/game', { state: { mode } });
  };

  return (
    <div className="p-4 flex flex-col items-center max-w-md mx-auto min-h-screen justify-center">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">Direction Game</h1>
      
      <div className="w-full flex flex-col gap-4 mb-8">
        {GAME_MODES.map((mode) => (
          <button
            key={mode.id}
            onClick={() => handleSelectMode(mode.id)}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 text-left border-2 border-transparent hover:border-blue-500 hover:-translate-y-1 group"
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600">{mode.label}</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{mode.description}</p>
          </button>
        ))}
      </div>

      <nav className="flex flex-col gap-4 w-full">
        <Link 
          to="/settings" 
          className="text-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          Settings
        </Link>
      </nav>
    </div>
  );
};
