import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';

export const Settings = () => {
  const { useCardinalDirections, toggleCardinalDirections } = useSettings();

  return (
    <div className="p-4 flex flex-col items-center max-w-md mx-auto min-h-screen justify-center">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Settings</h1>
      
      <div className="w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <div className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-700">
          <div>
            <h3 className="font-bold text-lg text-gray-800 dark:text-white">Cardinal Directions</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Use North/South/East/West instead of Up/Down/Left/Right</p>
          </div>
          <button 
            onClick={toggleCardinalDirections}
            className={`w-14 h-8 rounded-full p-1 transition-colors duration-200 ease-in-out ${useCardinalDirections ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}
          >
            <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${useCardinalDirections ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>
      </div>

      <Link to="/" className="text-blue-500 hover:underline mt-4 block font-medium">Back to Menu</Link>
    </div>
  );
};
